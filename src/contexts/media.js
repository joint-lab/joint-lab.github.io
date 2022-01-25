import React from "react";

// Hooks
import { useState, createContext, useMemo, useCallback } from 'react';

// Utils
import { splitAuthors } from 'contexts/publications';

function getUniqueTypes(media){
  const types = media.map(d=>d.type);
  return types.filter((val, index, self)=>self.indexOf(val)===index)
}

const MediaContext = createContext({});

const MediaContextProvider = ({ children, people, media }) => {
  const types = useMemo(()=>getUniqueTypes(media), [media]);
  const processedMedia = useMemo(()=>splitAuthors(media, people), [media, people]);

  const [filters, setFilters] = useState({authors: [], query: '', date: [0,9999], types: []});

  const updateType = useCallback((type)=>{
    const filteredTypes = filters.types.filter(a=>a!==type);
    if (filteredTypes.length===filters.types.length){
      // Add alias
      setFilters({...filters, types:[...filters.types, type]});
    }
    else {
      setFilters({...filters, types:filteredTypes});
    }
  }, [filters]);

  const updateAuthors = useCallback((authorAlias)=>{
    const filteredAuthors = filters.authors.filter(a=>a!==authorAlias);
    if (filteredAuthors.length===filters.authors.length){
      // Add alias
      setFilters({...filters, authors:[...filters.authors, authorAlias]});
    }
    else {
      setFilters({...filters, authors:filteredAuthors});
    }
  }, [filters]);

  const updateYear = useCallback((date)=>{
    setFilters({...filters, date});
  }, [filters]);

  const labMembers = useMemo(()=>people, []);

  const filteredMedia = useMemo(()=>{
    if (!processedMedia) return [];
    return processedMedia.filter(d=>{
      var _bool = true;
      if (filters.types && filters.types.length>0){ _bool = _bool*(filters.types.includes(d.type))}
      // Check the intersection between the authors and filters.authors
      const authorsAliases = d.authors.map(d=>d.alias);
      if (filters.authors && filters.authors.length>0){ _bool = _bool*(filters.authors.filter(a=> authorsAliases.includes(a)).length===filters.authors.length)}
      if (filters.date){ _bool = _bool*(parseInt(d.year)>=filters.date[0])*(parseInt(d.year)<=filters.date[1])}
      return _bool
    }).sort((a,b)=>b.year-a.year);
  }, [processedMedia, filters]);

  return (
    <MediaContext.Provider value={{ media:filteredMedia, labMembers, types, updateType, updateAuthors, updateYear, filters }}>
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaContextProvider };