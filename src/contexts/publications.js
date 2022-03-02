import React, { useState, useEffect, useMemo, useCallback,  createContext } from "react";

const PublicationsContext = createContext({publications: [], updateType:null, updateQuery: null, publicationTypes: [], filters: {}});

export function splitAuthors(publications, people){
  if (!publications){return;}
  return publications.map(publi=>{
    const authors = publi.authors.replace(' and ', ' ').split(', ');
    const memberAliases = people.map(d=>d.alias.trim());
    const extendedAuthors = authors.map(d=>{
      const index = memberAliases.indexOf(d.trim());
      return {alias: d, isLabMember: index!==-1, info: people[index]}
    })
    return {...publi, authors: extendedAuthors}
  })
}

function getUniquePublicationTypes(publications){
  const types = publications.map(d=>d.type);
  return types.filter((val, index, self)=>self.indexOf(val)===index)
}

const PublicationsContextProvider = ({ children, query, people, allPublications, allHighlightPublications }) => {

  const processedPublications = useMemo(()=>splitAuthors(allPublications, people), [allPublications, people]);
  const processedHighlightedPublications = useMemo(()=>splitAuthors(allHighlightPublications, people), [allHighlightPublications, people]);
  const publicationTypes = useMemo(()=>getUniquePublicationTypes(allPublications), [allPublications]);
  const [publications, setPublications] = useState([]);
  const [highlightPublications, setHighlightPublications] = useState([]);
  const [filters, setFilters] = useState({authors: [], query: '', date: [0,9999], types: []});

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

  const updateYear = useCallback((date)=>{
    setFilters({...filters, date});
  }, [filters]);

  useEffect(()=>{
    // Filter allPublications
    const filteredPublications = processedPublications.filter(d=>{
      var _bool = d.title.includes(filters.query);
      // If type is activated
      if (filters.types && filters.types.length>0){ _bool = _bool*(filters.types.includes(d.type))}

      // Check the intersection between the authors and filters.authors
      const authorsAliases = d.authors.map(d=>d.alias);
      if (filters.authors && filters.authors.length>0){ _bool = _bool*(filters.authors.filter(a=> authorsAliases.includes(a)).length===filters.authors.length)}
      if (filters.date){ _bool = _bool*(d.year>=filters.date[0])*(d.year<=filters.date[1])}
      return _bool
    })
    const sortedFilteredPublications = filteredPublications.sort((a,b)=>b.year-a.year);
    setPublications(sortedFilteredPublications);

    if (!processedHighlightedPublications){return;}
    // Filter highlightedPubalications
    const filteredHighlightedPublications = processedHighlightedPublications.filter(d=>{
      var _bool = d.title.includes(filters.query);
      // If type is activated
      if (filters.types && filters.types.length>0){ _bool = _bool*(filters.types.includes(d.type))}

      // Check the intersection between the authors and filters.authors
      const authorsAliases = d.authors.map(d=>d.alias);
      if (filters.authors && filters.authors.length>0){ _bool = _bool*(filters.authors.filter(a=> authorsAliases.includes(a)).length===filters.authors.length)}
      if (filters.date){ _bool = _bool*(d.year>=filters.date[0])*(d.year<=filters.date[1])}
      return _bool
    })
    const sortedFilteredHighlightedPublications = filteredHighlightedPublications.sort((a,b)=>b.year-a.year);
    setHighlightPublications(sortedFilteredHighlightedPublications);

  }, [filters, processedHighlightedPublications, processedPublications])

  // Fetch the author as query parameter
  useEffect(()=>{
    const params = new URLSearchParams(query);
    if (params.has('author')){
      const author = params.get('author');
      updateAuthors(author);
    }
  }, [query]);

  const activeLabMembers = useMemo(()=>{
    if (people){
      return people.filter(d=>d.group!=="alumni")
    }
    return [];
  }, [people]);

  return (
    <PublicationsContext.Provider value={{ publications, highlightedPublications: highlightPublications, filters, publicationTypes:publicationTypes, updateQuery, updateType, updateAuthors, updateYear, labMembers: activeLabMembers}}>
      {children}
    </PublicationsContext.Provider>
  );
};

export { PublicationsContext, PublicationsContextProvider };