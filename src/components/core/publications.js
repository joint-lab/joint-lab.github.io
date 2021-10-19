import React, { useContext } from 'react';
import classnames from 'classnames';

// Components
import { CheckboxList, RadioList } from 'components/core/forms';
import { Dropdown } from 'components/core/dropdown';
import { EmptyView } from 'components/core/empty_view';

// Contexts
import { PublicationsContext } from 'contexts/publications';

// Utils
import { capitalizeFirstLetter } from 'utils/capitalize';

/*
Main view for publication row.
*/
function Publication({ title, year, authors, journal, conference, location, type, arxivURL, biorxivURL, textURL, slidesURL, journalURL, software }){
  const { updateAuthors, filters } = useContext(PublicationsContext);

  return <div className='py-5'>
          <div className='flex'>
            <div className={classnames("text-xs uppercase text-green-600")}>{year} |</div>
            <div className={classnames("ml-1 text-xs uppercase text-gray-600")}>{type}</div>
          </div>

          <h3 className='font-medium sm:text-lg'>{title}</h3>
          <div className='text-gray-600'>
            {authors.map((author, index)=>(<span key={author.alias}>
              {author.isLabMember?
                <Dropdown label={author.alias} vanilla className={filters.authors.includes(author.alias)? 'bg-green-100 text-green-700':'hover:bg-gray-100 text-green-600'}>
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
          <div className='flex space-x-2 '>
            {arxivURL? <a href={arxivURL} className={classnames("text-green-600 hover:underline")}>arxiv</a>: null}
            {biorxivURL? <a href={biorxivURL} className={classnames("text-green-600 hover:underline")}>biorxiv</a>: null}
            {textURL? <a href={textURL} className={classnames("text-green-600 hover:underline")}>text</a>: null}
            {slidesURL? <a href={slidesURL} className={classnames("text-green-600 hover:underline")}>slides</a>: null}
            {journalURL? <a href={journalURL} className={classnames("text-green-600 hover:underline")}>journal</a>: null}
            {software? <a href={software} className={classnames("text-green-600 hover:underline")}>software</a>: null}
           </div>
         </div>
}

/*
Uncontrolled list of publications. The data comes from PublicationsContext.
*/
export function PublicationsList({ emptyView }){
  const { publications } = useContext(PublicationsContext);
  if (publications.length===0){
    if (emptyView){
      return emptyView;
    }
    return <div className="border py-16 mb-8 ">
            <EmptyView title='No publications with these filters' description={'Remove some filters to get back results'}/>
          </div>
  }
  return <div>
          <div className="uppercase text-xs text-green-600 border-b-2 border-gray-800">
             {publications.length} result{publications.length>1? 's': ''}
          </div>
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
      onClick: ((e)=>updateYear(0, e.currentTarget.checked))
    },
    {
      title: 'Since 2021',
      onClick: ((e)=>updateYear(2021, e.currentTarget.checked))
    },
    {
      title: 'Since 2020',
      onClick: ((e)=>updateYear(2020, e.currentTarget.checked))
    },
    {
      title: 'Since 2018',
      onClick: ((e)=>updateYear(2018, e.currentTarget.checked))
    }
  ]

  return <div className=''>
          <div className='my-8 lg:my-0 lg:mb-8'>
            <div className='mb-8'>
              <CheckboxList title={'Types'} 
                          values={publicationTypes.map(type=>({name: type,  readOnly:true, checked: filters.types.includes(type), title: capitalizeFirstLetter(type), onClick:((e)=>{updateType(type)})}))}/>
            </div>
            <div className=''>
              <RadioList title={'Since'} 
                          values={yearOptions}/>
            </div>
            <div className='pt-8'>
              <CheckboxList title={'Authors'} 
                          values={labMembers.map(member=>({name: member.alias, readOnly: true, checked: filters.authors.includes(member.alias), title: member.alias, onClick:(()=>{updateAuthors(member.alias)})}))}/>
            </div>
          </div>
         </div>
}
