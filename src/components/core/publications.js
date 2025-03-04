import React, { useState, useEffect, useMemo, useContext } from 'react';
import classnames from 'classnames';

// Components
import { CheckboxList, RadioList } from 'components/core/forms';
import { Dropdown } from 'components/core/dropdown';
import { EmptyView } from 'components/core/empty_view';
import { FiUnlock, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { Transition } from '@headlessui/react'
import { useStaticQuery, graphql, Link } from 'gatsby';

// Contexts
import { PublicationsContext } from 'contexts/publications';

// Utils
import { capitalizeFirstLetter } from 'utils/capitalize';


export const PublicationsContext = createContext();

export function PublicationsProvider({ children, publications: initialPublications, highlighted }) {
  // Publications state
  const [publications, setPublications] = useState([]);
  const [highlightedPublications, setHighlightedPublications] = useState([]);
  const [sortOption, setSortOption] = useState('newest'); // Add this line for sort state
  
  // Filter states
  const [filters, setFilters] = useState({
    authors: [],
    types: [],
    date: [0, 9999]
  });

  // Derived values from publications
  const publicationTypes = useMemo(() => {
    if (!initialPublications) return [];
    return [...new Set(initialPublications.map(pub => pub.type))];
  }, [initialPublications]);

  const labMembers = useMemo(() => {
    if (!initialPublications) return [];
    const members = [];
    initialPublications.forEach(pub => {
      pub.authors.forEach(author => {
        if (author.isLabMember && !members.some(m => m.alias === author.alias)) {
          members.push(author);
        }
      });
    });
    return members;
  }, [initialPublications]);

  // Sort publications function
  const sortPublications = (option) => {
    setSortOption(option);
    
    // Create a new sorted array based on the option
    let sortedPublications = [...publications];
    
    switch(option) {
      case 'newest':
        sortedPublications.sort((a, b) => {
          // First try to sort by full date if available
          if (a.date && b.date) {
            return new Date(b.date) - new Date(a.date);
          }
          // Fall back to year if full date isn't available
          return parseInt(b.year) - parseInt(a.year);
        });
        break;
      case 'oldest':
        sortedPublications.sort((a, b) => {
          // First try to sort by full date if available
          if (a.date && b.date) {
            return new Date(a.date) - new Date(b.date);
          }
          // Fall back to year if full date isn't available
          return parseInt(a.year) - parseInt(b.year);
        });
        break;
      default:
        // Default to newest first
        sortedPublications.sort((a, b) => {
          if (a.date && b.date) {
            return new Date(b.date) - new Date(a.date);
          }
          return parseInt(b.year) - parseInt(a.year);
        });
    }
    
    setPublications(sortedPublications);
  };

  // Filter update functions
  const updateAuthors = (author) => {
    setFilters(prev => {
      const newAuthors = prev.authors.includes(author) 
        ? prev.authors.filter(a => a !== author) 
        : [...prev.authors, author];
      
      return { ...prev, authors: newAuthors };
    });
  };

  const updateYear = (yearRange) => {
    setFilters(prev => ({ ...prev, date: yearRange }));
  };

  const updateType = (type) => {
    setFilters(prev => {
      const newTypes = prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type];
      
      return { ...prev, types: newTypes };
    });
  };

  // Initialize publications and apply initial sorting
  useEffect(() => {
    if (initialPublications) {
      setPublications(initialPublications);
      // Apply default sort (newest first) when publications are first loaded
      setTimeout(() => sortPublications('newest'), 0);
    }
  }, [initialPublications]);
  
  // Effect for applying filters
  useEffect(() => {
    if (!initialPublications) return;
    
    // Apply filters
    let filtered = initialPublications;
    
    // Filter by author
    if (filters.authors.length > 0) {
      filtered = filtered.filter(pub => 
        pub.authors.some(author => 
          filters.authors.includes(author.alias)
        )
      );
    }
    
    // Filter by type
    if (filters.types.length > 0) {
      filtered = filtered.filter(pub => 
        filters.types.includes(pub.type)
      );
    }
    
    // Filter by year range
    filtered = filtered.filter(pub => 
      parseInt(pub.year) >= filters.date[0] && 
      parseInt(pub.year) <= filters.date[1]
    );
    
    setPublications(filtered);
    
    // After applying filters, make sure to maintain the current sort order
    if (filtered.length > 0) {
      sortPublications(sortOption);
    }
  }, [filters, initialPublications]);

  // Set highlighted publications
  useEffect(() => {
    if (highlighted && initialPublications) {
      const highlightedIds = highlighted.map(h => h.id);
      const highlightedPubs = initialPublications.filter(pub => 
        highlightedIds.includes(pub.id)
      );
      setHighlightedPublications(highlightedPubs);
    }
  }, [highlighted, initialPublications]);

  return (
    <PublicationsContext.Provider
      value={{
        publications,
        highlightedPublications,
        filters,
        updateAuthors,
        updateYear,
        updateType,
        labMembers,
        publicationTypes,
        sortOption,
        sortPublications
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
}

// Modified PublicationsList component with sorting UI
export function PublicationsList({ emptyView, hidePublicationCount }) {
  const { publications, highlightedPublications, sortPublications, sortOption } = useContext(PublicationsContext);
  
  if (publications.length === 0) {
    if (emptyView) {
      return emptyView;
    }
    return <div className="border py-16 mb-8 ">
            <EmptyView title='No publications with these filters' description={'Remove some filters to get back results'}/>
          </div>
  }
  
  return <div>
          <Transition
            show={highlightedPublications.length > 0}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="transform opacity-100 "
            leaveTo="transform opacity-0 "
          >
              <div className="font-medium text-center mb-3 text-lg">
                Latest publications
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {highlightedPublications.map(d => <HighlightPublication key={d.id} {...d}/>)}
              </div>
          </Transition>
          
          <div className="flex justify-between items-center border-b-2 border-gray-800 pb-2">
            {hidePublicationCount ? null :
              <div className="uppercase text-xs text-uvm-green">
                {publications.length} result{publications.length > 1 ? 's' : ''}
              </div>
            }
            
            {/* Add Sort Dropdown */}
            <div className="flex items-center">
              <span className="text-xs text-gray-600 mr-2">Sort by:</span>
              <Dropdown 
                label={
                  <div className="flex items-center text-xs">
                    <FiCalendar className="mr-1" />
                    <span>{sortOption === 'newest' ? 'Newest first' : 'Oldest first'}</span>
                  </div>
                } 
                vanilla
                className="text-uvm-green hover:bg-gray-100"
              >
                <Dropdown.Item 
                  name="Newest first" 
                  onClick={() => sortPublications('newest')}
                  className={sortOption === 'newest' ? 'bg-green-50 text-green-700' : ''}
                />
                <Dropdown.Item 
                  name="Oldest first" 
                  onClick={() => sortPublications('oldest')}
                  className={sortOption === 'oldest' ? 'bg-green-50 text-green-700' : ''}
                />
              </Dropdown>
            </div>
          </div>
          
          <div className='divide-y'>
            {publications.map(data => <Publication key={data.id} {...data}/>)}
          </div>
        </div>
}

// Optional standalone sort control component
export function PublicationSortControl() {
  const { sortOption, sortPublications } = useContext(PublicationsContext);

  return (
    <div className="flex items-center mb-4">
      <span className="text-gray-600 mr-2">Sort by:</span>
      <Dropdown 
        label={
          <div className="flex items-center">
            <FiCalendar className="mr-1" />
            <span>{sortOption === 'newest' ? 'Newest first' : 'Oldest first'}</span>
          </div>
        } 
        className="bg-white border border-gray-300 text-gray-700 rounded px-3 py-1 hover:bg-gray-50"
      >
        <Dropdown.Item 
          name="Newest first" 
          onClick={() => sortPublications('newest')}
          className={sortOption === 'newest' ? 'bg-green-50 text-green-700' : ''}
        />
        <Dropdown.Item 
          name="Oldest first" 
          onClick={() => sortPublications('oldest')}
          className={sortOption === 'oldest' ? 'bg-green-50 text-green-700' : ''}
        />
      </Dropdown>
    </div>
  );
}


/*
Main view for publication row.
*/
function Publication({ title, year, authors, journal, conference, location, type, preprintURL, textURL, proceedingsURL, slidesURL, journalURL, isOpenAccess, flavor, software, removeAllPublicationDropdown }){
  const { updateAuthors, filters } = useContext(PublicationsContext);

  return <div className='py-5'>
          {flavor? <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 my-2">{flavor}</div>: null}
          <div className='flex'>
            <div className={classnames("text-xs uppercase text-uvm-green")}>{year} |</div>
            <div className={classnames("ml-1 text-xs uppercase text-gray-600")}>{type}</div>
            {isOpenAccess?<div className={classnames("ml-auto inline text-xs uppercase flex space-x-2 text-gray-600")}><FiUnlock/><span>Open access</span></div>: null}
          </div>

          <h3 className='font-medium sm:text-lg'>{title}</h3>
          <div className='text-gray-600'>
            {authors.map((author, index)=>(<span key={author.alias}>
              {author.isLabMember?
                <Dropdown label={author.alias} vanilla className={filters.authors.includes(author.alias)? 'bg-green-50 text-green-700':'hover:bg-gray-100 text-uvm-green'}>
                  {removeAllPublicationDropdown?null:<Dropdown.Item className={filters.authors.includes(author.alias)? 'text-red-600': ''} name={filters.authors.includes(author.alias)? 'Remove filter':`With ${author.alias}`} onClick={()=>updateAuthors(author.alias)}/>}
                  <Dropdown.Item name='Profile' href={author.info.slug}/>
                </Dropdown>
               :
                <span className={''}>{author.alias}</span>
              }
              <span className='mr-1'>{(index===authors.length-2)? ', and': ((index===authors.length-1)? '': ',')}</span></span>))}
          </div>
          {journal?<div className='text-gray-600 font-medium'>{journal}</div>:null}
          {conference?<div className='text-gray-600'>{conference}, {location}</div>:null}
          <div className='flex space-x-2 md:space-x-4'>
            {preprintURL? <a href={preprintURL} className={classnames("text-uvm-green hover:underline")}>Preprint</a>: null}
            {textURL? <a href={textURL} className={classnames("text-uvm-green hover:underline")}>Text</a>: null}
            {slidesURL? <a href={slidesURL} className={classnames("text-uvm-green hover:underline")}>Slides</a>: null}
            {proceedingsURL? <a href={proceedingsURL} className={classnames("text-uvm-green hover:underline")}>Proceedings</a>: null}
            {journalURL? <a href={journalURL} className={classnames("text-uvm-green hover:underline")}>Journal</a>: null}
            {software? <a href={software} className={classnames("text-uvm-green hover:underline")}>Software</a>: null}
           </div>
         </div>
}

/*
Highlighted publication cell
*/
function HighlightPublication({ title, year, authors, journal, conference, location, type, preprintURL, textURL, proceedingsURL, slidesURL, journalURL, isOpenAccess, flavor, software }){
  const { updateAuthors, filters } = useContext(PublicationsContext);

  return <div className='bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 shadow px-3 py-3 lg:px-6 lg:py-6 rounded h-full  '>
          {flavor? <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 my-2">{flavor}</div>: null}
          <div className='flex'>
            <div className={classnames("text-xs uppercase text-uvm-green")}>{year} |</div>
            <div className={classnames("ml-1 text-xs uppercase text-gray-600")}>{type}</div>
            {isOpenAccess?<div className={classnames("ml-auto inline text-xs uppercase flex space-x-2 text-gray-600")}><FiUnlock/><span>Open access</span></div>: null}
          </div>

          <h3 className='font-medium sm:text-lg'>{title}</h3>
          <div className='text-gray-600 mb-2'>
            {authors.map((author, index)=>(<span key={author.alias}>
              {author.isLabMember?
                <Dropdown label={author.alias} vanilla className={filters.authors.includes(author.alias)? 'bg-green-50 text-green-700':'hover:bg-gray-100 text-uvm-green'}>
                  <Dropdown.Item className={filters.authors.includes(author.alias)? 'text-red-600': ''} name={filters.authors.includes(author.alias)? 'Remove filter':`With ${author.alias}`} onClick={()=>updateAuthors(author.alias)}/>
                  <Dropdown.Item name='Profile' href={author.info.slug}/>
                </Dropdown>
               :
                <span className={''}>{author.alias}</span>
              }
              <span className='mr-1'>{(index===authors.length-2)? ', and': ((index===authors.length-1)? '': ',')}</span></span>))}
          </div>
          {journal?<div className='text-gray-500'>{journal}</div>:null}
          {conference?<div className='text-gray-500'>{conference}, {location}</div>:null}
          <div className='flex space-x-2 md:space-x-4'>
            {preprintURL? <a href={preprintURL} className={classnames("text-uvm-green hover:underline")}>preprint</a>: null}
            {textURL? <a href={textURL} className={classnames("text-uvm-green hover:underline")}>text</a>: null}
            {slidesURL? <a href={slidesURL} className={classnames("text-uvm-green hover:underline")}>slides</a>: null}
            {proceedingsURL? <a href={proceedingsURL} className={classnames("text-uvm-green hover:underline")}>proceedings</a>: null}
            {journalURL? <a href={journalURL} className={classnames("text-uvm-green hover:underline")}>journal</a>: null}
            {software? <a href={software} className={classnames("text-uvm-green hover:underline")}>software</a>: null}
           </div>
         </div>
}

/*
Uncontrolled list of highlighted publications. The data comes from PublicationsContext.
*/
export function HighlightedPublicationListIndex({ removeAllPublicationDropdown }){
  const { highlightedPublications } = useContext(PublicationsContext);
  return <div>
              <div className="grid grid-cols-1  gap-4">
                {highlightedPublications.map(d=><Publication key={d.id} removeAllPublicationDropdown={removeAllPublicationDropdown} {...d}/>)}
              </div>
         
        </div>
}

/*
Uncontrolled list of publications. The data comes from PublicationsContext.
*/
export function PublicationsList({ emptyView, hidePublicationCount }){
  const { publications, highlightedPublications } = useContext(PublicationsContext);
  if (publications.length===0){
    if (emptyView){
      return emptyView;
    }
    return <div className="border py-16 mb-8 ">
            <EmptyView title='No publications with these filters' description={'Remove some filters to get back results'}/>
          </div>
  }
  return <div>
          <Transition
            show={highlightedPublications.length>0}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="transform opacity-100 "
            leaveTo="transform opacity-0 "
          >
              <div className="font-medium text-center mb-3 text-lg">
                Latest publications
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {highlightedPublications.map(d=><HighlightPublication key={d.id} {...d}/>)}
              </div>
          </Transition>
          {hidePublicationCount? <div className="border-b-2 border-gray-800"/>:
            <div className="uppercase text-xs text-uvm-green border-b-2 border-gray-800">
               {publications.length} result{publications.length>1? 's': ''}
            </div>
          }
          <div className='divide-y '>
            {publications.map(data=><Publication key={data.id} {...data}/>)}
          </div>
          </div>
}

/*
 View to show the publications filters. The filter selection is passed to PublicationsContext.
*/
export function PublicationFilters(){
  const { filters, updateType, updateYear, publicationTypes, updateAuthors, labMembers } = useContext(PublicationsContext);
  const { allPublicationsJson } = useStaticQuery(graphql`
    query distinctYears {
      allPublicationsJson {
        distinct(field: year)
      }
    }
  `)

  const yearOptions = useMemo(()=>{
    if (!allPublicationsJson) return [];
    return [
             {
              title: 'Any time',
              onClick: ((e)=>updateYear([0, 9999], e.currentTarget.checked)),
              checked: filters.date[0]===0,
              readOnly: true
            },
            ...allPublicationsJson.distinct.sort((a,b)=>parseInt(b)-parseInt(a))
            .map(d=>({title: d, onClick: (e=>updateYear([parseInt(d), parseInt(d)])), checked: parseInt(filters.date[0])===parseInt(d)}))]
  }, [allPublicationsJson, updateYear, filters])

  return <div className=''>
          <div className='my-8 lg:my-0 lg:mb-8'>
            <div className='mb-8'>
              <CheckboxList title={'Types'} 
                          values={publicationTypes.map(type=>({name: type,  readOnly:true, checked: filters.types.includes(type), title: capitalizeFirstLetter(type), onClick:((e)=>updateType(type))}))}/>
            </div>
            <div className=''>
              <RadioList title={'Date'} 
                          numValuesShown={3}
                          values={yearOptions}/>
            </div>
            <div className='pt-8'>
              <CheckboxList title={'Active members'} 
                          values={labMembers.map(member=>({name: member.alias, readOnly: true, checked: filters.authors.includes(member.alias), title: member.alias, onClick:(()=>updateAuthors(member.alias))}))}/>
            </div>
          </div>
         </div>
}



export function ButtonToAllPublications({ page }){
  return <Link to={'/publications'}><div className='flex items-center space-x-1 inline-flex text-green-700 hover:text-green-900'><span>Explore more publications</span><FiArrowRight/></div></Link>
}
