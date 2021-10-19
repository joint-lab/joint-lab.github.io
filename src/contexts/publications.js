import React, { useState, useEffect, useCallback, useRef, createContext } from "react";

const PublicationsContext = createContext({publications: [], updateType:null, updateQuery: null, publicationTypes: [], filters: {}});

function splitAuthors(publications, people){
  return publications.map(d=>{
    const authors = d.authors.replace(', and ', ', ').split(', ');
    const memberAliases = people.map(d=>d.alias);
    const extendedAuthors = authors.map(d=>{
      const index = memberAliases.indexOf(d.trim());
      return {alias: d, isLabMember: index!==-1, info: people[index]}
    })
    return {...d, authors: extendedAuthors}
  })
}

function getUniquePublicationTypes(publications){
  const types = publications.map(d=>d.type);
  return types.filter((val, index, self)=>self.indexOf(val)===index)
}

const PublicationsContextProvider = ({ children, query, people, allPublications }) => {
  const processedPublications = useRef(splitAuthors(allPublications, people));
  const publicationTypes = useRef(getUniquePublicationTypes(allPublications));
  const [publications, setPublications] = useState([]);
  const [filters, setFilters] = useState({authors: [], query: '', since: 0, types: []});

  const updateQuery = useCallback((query)=>{
    setFilters({...filters, query});
  }, [filters]);

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

  const updateYear = useCallback((since)=>{
    setFilters({...filters, since});
  }, [filters]);

  useEffect(()=>{
    // Filter allPublications
    const filteredPublications = processedPublications.current.filter(d=>{
      var _bool = d.title.includes(filters.query);
      // If type is activated
      if (filters.types && filters.types.length>0){ _bool = _bool*(filters.types.includes(d.type))}

      // Check the intersection between the authors and filters.authors
      const authorsAliases = d.authors.map(d=>d.alias);
      if (filters.authors && filters.authors.length>0){ _bool = _bool*(filters.authors.filter(a=> authorsAliases.includes(a)).length===filters.authors.length)}
      if (filters.since){ _bool = _bool*(d.year>=filters.since)}
      return _bool
    })

    const sortedFilteredPublications = filteredPublications.sort((a,b)=>b.year-a.year);
    setPublications(sortedFilteredPublications);
  }, [filters])

  // Fetch the author as query parameter
  useEffect(()=>{
    const params = new URLSearchParams(query);
    if (params.has('author')){
      const author = params.get('author');
      updateAuthors(author);
    }
  }, [query, updateAuthors]);

  return (
    <PublicationsContext.Provider value={{ publications, filters, publicationTypes:publicationTypes.current, updateQuery, updateType, updateAuthors, updateYear, labMembers: people}}>
      {children}
    </PublicationsContext.Provider>
  );
};

export { PublicationsContext, PublicationsContextProvider };