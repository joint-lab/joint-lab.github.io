import React from 'react';
import classnames from 'classnames';

// Utils
import { FlexLayout } from 'components/core/layout';
import { Link } from 'gatsby';

export function HighlightedNews({ title, date, excerpt, slug, imgSrc, className }){
  return  <div className={classnames('bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 shadow px-3 py-3 lg:px-6 lg:py-6 rounded h-full flex items-end', className)}>
              <Link to={slug}>
                {/*<img src={imgSrc} alt={'news-highlight'}/>*/}  
                <p className='mt-3 text-gray-500 text-sm uppercase'>{date}</p>
                <p className='font-medium text-xl'>{title} </p>
                <p className='mb-3 text-gray-700'>
                   {excerpt}
                </p>
              </Link>   
           </div>
}

export function HighlightedNewsContainer({ news }){
  return <div>
          <FlexLayout className='space-y-2 lg:space-y-0 lg:space-x-6 items-stretch'>
            <FlexLayout.Item size='md' className='items-center'>
              <HighlightedNews key={0} className='h-full' {...news[0].node.frontmatter} {...news[0].node.fields} excerpt={news[0].node.excerpt}/>
            </FlexLayout.Item>
            <FlexLayout.Item size='md' className="flex flex-col space-y-2 lg:space-y-5">
                <HighlightedNews key={1} {...news[1].node.frontmatter} {...news[1].node.fields} excerpt={news[1].node.excerpt}/>
                <HighlightedNews key={2} {...news[2].node.frontmatter} {...news[2].node.fields} excerpt={news[2].node.excerpt}/>
            </FlexLayout.Item>
          </FlexLayout>
         </div>
}