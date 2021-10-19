import React from 'react';
import classnames from 'classnames';

// Components
import { Container } from 'components/core/layout';

const titleClassName = 'text-lg'

function MediaBadge({ type }){
  const style = {
    article: 'text-green-800',
    simpleCast: 'text-indigo-800',
    core: 'text-gray-800',
    youtube: 'text-red-800',
  }
  return <span className={classnames("inline-flex items-center rounded text-xs font-medium uppercase text-gray-500", style[type])}>
          {type}
        </span>
}

function MediaArticle({ title }){
  return <div>
            <MediaBadge type={'article'}/>
            <h1 className={titleClassName}>{title}</h1>
          </div>
}
function MediaSimpleCast({ title }){
  return <div>
            <MediaBadge type={'simpleCast'}/>
            <h1 className={titleClassName}>{title}</h1>
          </div>
}

function MediaCore({ title }){
  return <div>
            <MediaBadge type={'core'}/>
            <h1 className={titleClassName}>{title}</h1>
          </div>
}

function MediaYoutube({ title }){
  return <div>
            <MediaBadge type={'youtube'}/>
            <h1 className={titleClassName}>{title}</h1>
          </div>
}

function MediaRow({ format, excerpt, slug, url, ...props }){
  return <a href={url} target={'blank'} className="px-3 py-3 rounded border h-full flex items-end hover:border-green-400">
          {
            (format==='article')? <MediaArticle {...props}/>:
            (format==='simplecast')? <MediaSimpleCast {...props}/>:
            (format==='media')? <MediaCore {...props}/>:
            (format==='youtube')? <MediaYoutube {...props}/>:null
          }
         </a>
}

const gridParams = "xs:grid grid grid-cols-1 sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3 gap-x-4 gap-y-4";

/*
Main component to display
*/
export function MediaList({ edges, title }){
  return <div>
          {/*<h1 className={headerParams}>{title}</h1>*/}
          <Container className="mt-3">
            <ul className={gridParams}>
              {edges.map((el, index)=><MediaRow key={el.node.id} excerpt={el.node.excerpt} {...el.node.fields} {...el.node.frontmatter}/>)}
            </ul>
          </Container>
         </div>
}