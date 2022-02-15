import React from 'react';

// Components
import { Link } from 'gatsby';
import { FiArrowRight } from 'react-icons/fi';

export function ButtonToAllNews({ page }){
  return <Link to={'/news/'+(page? page: '1')}><div className='px-3 lg:px-6 flex items-center space-x-1 inline-flex text-uvm-green hover:opacity-80'><span>See older news</span><FiArrowRight/></div></Link>
}

export function RowNews({ title, date, excerpt, slug }){
  return <div className='px-3 lg:px-6 py-3 lg:py-6 rounded group'>
            <Link to={slug} className=''>
              <p className='text-gray-400 uppercase text-sm w-52'>{date}</p>
              <p className='font-medium text-lg  text-uvm-green group-hover:underline'>{title} </p>
              <p className='text-gray-700 hidden lg:block'>{excerpt} </p>
            </Link>
          </div>
}

export function RowNewsContainer({ news }){
  return <div className='divide-y'>
            {news.map((el, index)=><RowNews key={index} {...el.node.frontmatter} {...el.node.fields} excerpt={el.node.excerpt}/>)}
          </div>
}