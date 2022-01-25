import React, { useContext } from 'react';
import classnames from 'classnames';

// Components
import { CheckboxList, RadioList } from 'components/core/forms';
import { Dropdown } from 'components/core/dropdown';
import { EmptyView } from 'components/core/empty_view';
import { FiUnlock, FiArrowRight } from 'react-icons/fi';
import { Transition } from '@headlessui/react'
import { Link } from 'gatsby';

// Contexts
import { PublicationsContext } from 'contexts/publications';

// Utils
import { capitalizeFirstLetter } from 'utils/capitalize';

/*
Main view for publication row.
*/
function Publication({ title, year, authors, journal, conference, location, type, preprintURL, textURL, proceedingsURL, slidesURL, journalURL, isOpenAccess, flavor, software }){
  const { updateAuthors, filters } = useContext(PublicationsContext);

  return <div className='py-5'>
          {flavor? <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 my-2">{flavor}</div>: null}
          <div className='flex'>
            <div className={classnames("text-xs uppercase text-green-600")}>{year} |</div>
            <div className={classnames("ml-1 text-xs uppercase text-gray-600")}>{type}</div>
            {isOpenAccess?<div className={classnames("ml-auto inline text-xs uppercase flex space-x-2 text-gray-600")}><FiUnlock/><span>Open access</span></div>: null}
          </div>

          <h3 className='font-medium sm:text-lg'>{title}</h3>
          <div className='text-gray-600'>
            {authors.map((author, index)=>(<span key={author.alias}>
              {author.isLabMember?
                <Dropdown label={author.alias} vanilla className={filters.authors.includes(author.alias)? 'bg-green-50 text-green-700':'hover:bg-gray-100 text-green-600'}>
                  <Dropdown.Item className={filters.authors.includes(author.alias)? 'text-red-600': ''} name={filters.authors.includes(author.alias)? 'Remove filter':'All publications'} onClick={()=>updateAuthors(author.alias)}/>
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
            {preprintURL? <a href={preprintURL} className={classnames("text-green-600 hover:underline")}>Preprint</a>: null}
            {textURL? <a href={textURL} className={classnames("text-green-600 hover:underline")}>Text</a>: null}
            {slidesURL? <a href={slidesURL} className={classnames("text-green-600 hover:underline")}>Slides</a>: null}
            {proceedingsURL? <a href={proceedingsURL} className={classnames("text-green-600 hover:underline")}>Proceedings</a>: null}
            {journalURL? <a href={journalURL} className={classnames("text-green-600 hover:underline")}>Journal</a>: null}
            {software? <a href={software} className={classnames("text-green-600 hover:underline")}>Software</a>: null}
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
            <div className={classnames("text-xs uppercase text-green-600")}>{year} |</div>
            <div className={classnames("ml-1 text-xs uppercase text-gray-600")}>{type}</div>
            {isOpenAccess?<div className={classnames("ml-auto inline text-xs uppercase flex space-x-2 text-gray-600")}><FiUnlock/><span>Open access</span></div>: null}
          </div>

          <h3 className='font-medium sm:text-lg'>{title}</h3>
          <div className='text-gray-600 mb-2'>
            {authors.map((author, index)=>(<span key={author.alias}>
              {author.isLabMember?
                <Dropdown label={author.alias} vanilla className={filters.authors.includes(author.alias)? 'bg-green-50 text-green-700':'hover:bg-gray-100 text-green-600'}>
                  <Dropdown.Item className={filters.authors.includes(author.alias)? 'text-red-600': ''} name={filters.authors.includes(author.alias)? 'Remove filter':'All publications'} onClick={()=>updateAuthors(author.alias)}/>
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
            {preprintURL? <a href={preprintURL} className={classnames("text-green-600 hover:underline")}>preprint</a>: null}
            {textURL? <a href={textURL} className={classnames("text-green-600 hover:underline")}>text</a>: null}
            {slidesURL? <a href={slidesURL} className={classnames("text-green-600 hover:underline")}>slides</a>: null}
            {proceedingsURL? <a href={proceedingsURL} className={classnames("text-green-600 hover:underline")}>proceedings</a>: null}
            {journalURL? <a href={journalURL} className={classnames("text-green-600 hover:underline")}>journal</a>: null}
            {software? <a href={software} className={classnames("text-green-600 hover:underline")}>software</a>: null}
           </div>
         </div>
}

/*
Uncontrolled list of highlighted publications. The data comes from PublicationsContext.
*/
export function HighlightedPublicationListIndex(){
  const { highlightedPublications } = useContext(PublicationsContext);
  return <div>
              <div className="font-medium text-center mb-3 text-lg">
                Latest publications
              </div>
              <div className="divide-y ">
                {highlightedPublications.map(d=><Publication key={d.id} {...d}/>)}
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
            <div className="uppercase text-xs text-green-600 border-b-2 border-gray-800">
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

  const yearOptions = [
    {
      title: 'Any time',
      onClick: ((e)=>updateYear([0, 9999], e.currentTarget.checked)),
      checked: filters.date[0]===0,
      readOnly: true
    },
    {
      title: 'Since 2021',
      onClick: ((e)=>updateYear([2021, 9999], e.currentTarget.checked)),
      checked: filters.date[0]===2021,
      readOnly: true
    },
    {
      title: 'Since 2020',
      onClick: ((e)=>updateYear([2020, 9999], e.currentTarget.checked)),
      checked: filters.date[0]===2020,
      readOnly: true
    },
    ...[...Array(10).keys()].map(d=>({title: `${2019-d}`, checked: filters.date[0]===2019-d, onClick: ((e)=>updateYear([2019-d, 2019-d], e.currentTarget.checked))}))
  ]

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
