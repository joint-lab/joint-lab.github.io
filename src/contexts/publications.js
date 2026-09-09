import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

const PublicationsContext = createContext({});
const EMPTY_LIST = [];

export function splitAuthors(publications = EMPTY_LIST, people = EMPTY_LIST) {
  const membersByAlias = new Map(
    people.map(person => [person.alias.trim(), person])
  );

  return publications.map(publication => {
    const aliases = publication.authors.replace(' and ', ' ').split(', ');
    const authors = aliases.map(alias => {
      const info = membersByAlias.get(alias.trim());
      return { alias, info, isLabMember: Boolean(info) };
    });

    return { ...publication, authors };
  });
}

function comparePublications(first, second) {
  if (first.year !== second.year) {
    return second.year - first.year;
  }
  if (first.date && second.date) {
    return second.date.localeCompare(first.date);
  }
  if (first.date) return -1;
  if (second.date) return 1;
  return 0;
}

function filterPublications(publications, filters) {
  const matchesFilters = publication => {
    const matchesTitle = publication.title.includes(filters.query);
    const matchesType =
      filters.types.length === 0 || filters.types.includes(publication.type);
    const matchesAuthor =
      filters.authors.length === 0 ||
      publication.authors.some(author => filters.authors.includes(author.alias));
    const matchesYear =
      publication.year >= filters.date[0] && publication.year <= filters.date[1];

    return matchesTitle && matchesType && matchesAuthor && matchesYear;
  };

  return publications.filter(matchesFilters).sort(comparePublications);
}

function toggleValue(values, value) {
  return values.includes(value)
    ? values.filter(selected => selected !== value)
    : [...values, value];
}

function PublicationsContextProvider({
  children,
  query,
  people = EMPTY_LIST,
  allPublications = EMPTY_LIST,
  allHighlightPublications = EMPTY_LIST,
}) {
  const [filters, setFilters] = useState({
    authors: [],
    query: '',
    date: [0, 9999],
    types: [],
  });
  const processedPublications = useMemo(
    () => splitAuthors(allPublications, people),
    [allPublications, people]
  );
  const processedHighlights = useMemo(
    () => splitAuthors(allHighlightPublications, people),
    [allHighlightPublications, people]
  );

  // Render the lists at build time as well as after filter changes.
  const publications = useMemo(
    () => filterPublications(processedPublications, filters),
    [processedPublications, filters]
  );
  const highlightedPublications = useMemo(
    () => filterPublications(processedHighlights, filters),
    [processedHighlights, filters]
  );
  const publicationTypes = useMemo(
    () => [...new Set(allPublications.map(publication => publication.type))],
    [allPublications]
  );
  const membersWithPublications = useMemo(() => {
    const aliases = new Set(
      processedPublications.flatMap(publication =>
        publication.authors.map(author => author.alias.trim())
      )
    );
    return people.filter(person => aliases.has(person.alias.trim()));
  }, [processedPublications, people]);

  const updateQuery = useCallback(query => {
    setFilters(current => ({ ...current, query }));
  }, []);

  const updateType = useCallback(type => {
    setFilters(current => ({
      ...current,
      types: toggleValue(current.types, type),
    }));
  }, []);

  const updateAuthors = useCallback(alias => {
    setFilters(current => ({
      ...current,
      authors: toggleValue(current.authors, alias),
    }));
  }, []);

  const updateYear = useCallback(date => {
    setFilters(current => ({ ...current, date }));
  }, []);

  // Apply URL filters after hydration to match the generated, unfiltered HTML.
  useEffect(() => {
    const params = new URLSearchParams(query);
    if (params.has('author')) {
      const authors = params.getAll('author');
      setFilters(current => ({ ...current, authors }));
    }
  }, [query]);

  return (
    <PublicationsContext.Provider
      value={{
        publications,
        highlightedPublications,
        filters,
        publicationTypes,
        updateQuery,
        updateType,
        updateAuthors,
        updateYear,
        labMembers: membersWithPublications.filter(
          person => person.group !== 'alumni'
        ),
        alumniMembers: membersWithPublications.filter(
          person => person.group === 'alumni'
        ),
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
}

export { PublicationsContext, PublicationsContextProvider };
