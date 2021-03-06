import React, { useContext, useMemo } from 'react';
import classnames from 'classnames';

// Components
import { CheckboxList, RadioList } from 'components/core/forms';
import { Dropdown } from 'components/core/dropdown';
import { EmptyView } from 'components/core/empty_view';
import { FiArrowRight } from 'react-icons/fi';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// Contexts
import { MediaContext } from 'contexts/media';

// Utils
import { capitalizeFirstLetter } from 'utils/capitalize';

/*
Main view for media row.
*/
function Media({ title, description, year, authors, type, imageURL, youtubeID, url }){
  const { updateAuthors, filters } = useContext(MediaContext);
  const image = useMemo(()=>imageURL? getImage(imageURL): null, [imageURL]);
  return <div className='py-12'>
          <div className='flex'>
            <div className={classnames("text-xs uppercase text-green-600")}>{year} |</div>
            <div className={classnames("ml-1 text-xs uppercase text-gray-600")}>{type}</div>
          </div>
          <Link to={url}><h3 className='font-medium sm:text-2xl mt-2 hover:underline'>{title}</h3></Link>
          {description?<p className="text-gray-600">{description}</p>:null}
          <div className='text-gray-600 mb-3'>
            {authors.map((author, index)=>(<span key={author.alias}>
              {author.isLabMember?
                <Dropdown label={author.alias} vanilla className={filters.authors.includes(author.alias)? 'bg-green-50 text-uvm-green':'hover:bg-gray-100 text-green-600'}>
                  <Dropdown.Item className={filters.authors.includes(author.alias)? 'text-red-600': ''} name={filters.authors.includes(author.alias)? 'Remove filter':'All medias'} onClick={()=>updateAuthors(author.alias)}/>
                  <Dropdown.Item name='Profile' href={author.info.slug}/>
                </Dropdown>
               :
                <span className={''}>{author.alias}</span>
              }
              <span className='mr-1'>{(index===authors.length-2)? ', and': ((index===authors.length-1)? '': ',')}</span></span>))}
          </div>

          {image?<Link to={url}><GatsbyImage image={image} alt={title} imgClassName="rounded-lg mb-2"/></Link>:null}
          {type==="simplecast"? <iframe title="simplecast" height="200px" width="100%" frameborder="no" scrolling="no" seamless="" src={url}/>:null}
          {youtubeID? <div className="aspect-w-16 aspect-h-9"><iframe className="w-full " src={`https://www.youtube.com/embed/${youtubeID}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></div>:null}
         </div>
}


/*
Uncontrolled list of medias. The data comes from MediaContext.
*/
export function MediasList({ emptyView, hideMediaCount }){
  const { media } = useContext(MediaContext);
  if (media.length===0){
    if (emptyView){
      return emptyView;
    }
    return <div className="border py-16 mb-8 ">
            <EmptyView title='No media with these filters' description={'Remove some filters to get back results'}/>
          </div>
  }
  return <div>
          <div className='divide-y '>
            {media.map(data=><Media key={data.id} {...data}/>)}
          </div>
          </div>
}

/*
 View to show the medias filters. The filter selection is passed to MediaContext.
*/
export function MediaFilters(){
  const { filters, updateType, updateYear, types, updateAuthors, labMembers } = useContext(MediaContext);

    const { allMediaJson } = useStaticQuery(graphql`
    query distinctMediaYears {
      allMediaJson {
        distinct(field: year)
      }
    }
  `)

  const yearOptions = useMemo(()=>{
    if (!allMediaJson) return [];
    return [
             {
              title: 'Any time',
              onClick: ((e)=>updateYear([0, 9999], e.currentTarget.checked)),
              checked: filters.date[0]===0,
              readOnly: true
            },
            ...allMediaJson.distinct.sort((a,b)=>parseInt(b)-parseInt(a))
            .map(d=>({title: d, onClick: (e=>updateYear([parseInt(d), parseInt(d)])), checked: parseInt(filters.date[0])===parseInt(d)}))]
  }, [allMediaJson, updateYear, filters])


  return <div className=''>
          <div className='my-8 lg:my-0 lg:mb-8'>
            <div className='mb-8'>
              <CheckboxList title={'Types'} 
                          values={types.map(type=>({name: type,  readOnly:true, checked: filters.types.includes(type), title: capitalizeFirstLetter(type), onClick:((e)=>updateType(type))}))}/>
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



export function ButtonToAllMedias({ page }){
  return <Link to={'/medias'}><div className='flex items-center space-x-1 inline-flex text-uvm-green hover:opacity-80'><span>Explore more medias</span><FiArrowRight/></div></Link>
}
