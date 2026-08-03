import React, { useState, useEffect, useMemo, useCallback, createContext } from "react";

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

const sortPublications = (a, b) => {
  if (a.year !== b.year) return b.year - a.year;
  if (a.date && b.date) return b.date.localeCompare(a.date);
  if (a.date) return -1; // a has full date, b doesn't
  if (b.date) return 1;
  return 0;
};


const PublicationsContextProvider = ({ children, query, people, allPublications, allHighlightPublications }) => {

  const processedPublications = useMemo(()=>splitAuthors(allPublications, people), [allPublications, people]);
  const processedHighlightedPublications = useMemo(()=>splitAuthors(allHighlightPublications, people), [allHighlightPublications, people]);
  const publicationTypes = useMemo(()=>getUniquePublicationTypes(allPublications), [allPublications]);
  const [publications, setPublications] = useState([]);
  const [highlightPublications, setHighlightPublications] = useState([]);
  const [filters, setFilters] = useState({authors: [], query: '', date: [0,9999], types: []});

  // The updaters below use the functional form of setFilters so they keep a stable
  // identity. Depending on `filters` would make them change on every filter update,
  // which re-triggers any effect that lists them as a dependency.
  const updateQuery = useCallback((query)=>{
    setFilters(filters=>({...filters, query}));
  }, []);

  const updateType = useCallback((type)=>{
    setFilters(filters=>{
      const filteredTypes = filters.types.filter(a=>a!==type);
      if (filteredTypes.length===filters.types.length){
        // Add alias
        return {...filters, types:[...filters.types, type]};
      }
      return {...filters, types:filteredTypes};
    });
  }, []);

  const updateAuthors = useCallback((authorAlias)=>{
    setFilters(filters=>{
      const filteredAuthors = filters.authors.filter(a=>a!==authorAlias);
      if (filteredAuthors.length===filters.authors.length){
        // Add alias
        return {...filters, authors:[...filters.authors, authorAlias]};
      }
      return {...filters, authors:filteredAuthors};
    });
  }, []);

  const updateYear = useCallback((date)=>{
    setFilters(filters=>({...filters, date}));
  }, []);

  useEffect(()=>{
    // Filter allPublications
    const filteredPublications = processedPublications.filter(d=>{
      var _bool = d.title.includes(filters.query);
      // If type is activated
      if (filters.types && filters.types.length>0){ _bool = _bool*(filters.types.includes(d.type))}

      // Check if ANY of the selected authors is in the publication (OR logic)
      const authorsAliases = d.authors.map(d=>d.alias);
      if (filters.authors && filters.authors.length>0){ 
        // Use OR logic: publication passes if ANY selected author is included
        const hasAnySelectedAuthor = filters.authors.some(a => authorsAliases.includes(a));
        _bool = _bool * (hasAnySelectedAuthor ? 1 : 0);
      }
      if (filters.date){ _bool = _bool*(d.year>=filters.date[0])*(d.year<=filters.date[1])}
      return _bool
    })
    const sortedFilteredPublications = filteredPublications.sort(sortPublications);
    setPublications(sortedFilteredPublications);
    
    
    if (!processedHighlightedPublications){return;}
    // Filter highlightedPubalications
    const filteredHighlightedPublications = processedHighlightedPublications.filter(d=>{
      var _bool = d.title.includes(filters.query);
      // If type is activated
      if (filters.types && filters.types.length>0){ _bool = _bool*(filters.types.includes(d.type))}

      // Check if ANY of the selected authors is in the publication (OR logic)
      const authorsAliases = d.authors.map(d=>d.alias);
      if (filters.authors && filters.authors.length>0){ 
        // Use OR logic: publication passes if ANY selected author is included
        const hasAnySelectedAuthor = filters.authors.some(a => authorsAliases.includes(a));
        _bool = _bool * (hasAnySelectedAuthor ? 1 : 0);
      }
      if (filters.date){ _bool = _bool*(d.year>=filters.date[0])*(d.year<=filters.date[1])}
      return _bool
    })
    const sortedFilteredHighlightedPublications = filteredHighlightedPublications.sort(sortPublications);
    setHighlightPublications(sortedFilteredHighlightedPublications);

  }, [filters, processedHighlightedPublications, processedPublications])

  // Fetch the author as query parameter. This assigns the selection rather than
  // toggling it, so re-running the effect is a no-op instead of a flip-flop.
  useEffect(()=>{
    const params = new URLSearchParams(query);
    if (!params.has('author')){return;}
    const authors = params.getAll('author');
    setFilters(filters=>({...filters, authors}));
  }, [query]);

  // Get all unique author aliases from all publications
  const allAuthorAliases = useMemo(() => {
    if (!allPublications) return [];
    // Create a set of all author aliases to ensure uniqueness
    const uniqueAuthors = new Set();
    allPublications.forEach(pub => {
      const authorsList = pub.authors.replace(' and ', ' ').split(', ');
      authorsList.forEach(author => uniqueAuthors.add(author.trim()));
    });
    return Array.from(uniqueAuthors);
  }, [allPublications]);

  const activeLabMembers = useMemo(()=>{
    if (people){
      // Only include active members who have at least one publication
      return people.filter(d => 
        d.group !== "alumni" && 
        allAuthorAliases.includes(d.alias.trim())
      );
    }
    return [];
  }, [people, allAuthorAliases]);

  // Add alumni members who have publications
  const alumniMembers = useMemo(()=>{
    if (people){
      // Only include alumni who have at least one publication
      return people.filter(d => 
        d.group === "alumni" && 
        allAuthorAliases.includes(d.alias.trim())
      );
    }
    return [];
  }, [people, allAuthorAliases]);

  return (
    <PublicationsContext.Provider value={{ 
      publications, 
      highlightedPublications: highlightPublications, 
      filters, 
      publicationTypes: publicationTypes, 
      updateQuery, 
      updateType, 
      updateAuthors, 
      updateYear, 
      labMembers: activeLabMembers,
      alumniMembers: alumniMembers
    }}>
      {children}
    </PublicationsContext.Provider>
  );
};

export { PublicationsContext, PublicationsContextProvider };