import React from 'react';
import classnames from 'classnames'

// Components
import { Link } from 'gatsby';
import { FiArrowLeft, FiArrowRight} from 'react-icons/fi';

export function Paginate({ total, currentPage, className }){

  const activeClass = 'text-indigo-600 bg-gray-100';

  return <div className={classnames("flex items-center", className)}>
          {/*Left section*/}
          <div className='mr-auto'>
            {currentPage<2?
             <div className="space-x-2 flex items-center text-gray-400"><FiArrowLeft/> <span className="hidden md:block">Previous</span></div>:
              <Link to={`/news/${currentPage-1}`}>
                <div className="space-x-2 flex items-center"><FiArrowLeft/> <span className="hidden md:block">Previous</span></div>
              </Link>
            }
          </div>
          {/*Center section*/}
          <div className='flex items-center space-x-3'>
            {currentPage>1? 
              Array.from(Array(Math.min(currentPage-2, 3)).keys()).map((index)=><Link key={`down-${index}`} to={`/news/${index+1}`}>
                                                <div className={classnames("px-2 py-2  hover:bg-gray-100", (currentPage===index+1? activeClass: ''))}>{index+1}</div>
                                              </Link>): null
            }
            {
              (Math.min(currentPage-2, 3)+1>currentPage-1)?<div>{currentPage-1} {Math.min(currentPage-2, 3)+1}</div>: null
            }
            {
              Array(3).fill().map((_, index)=>
                {
                  if ((currentPage+index-1)<=0){return null;}
                  if ((currentPage+index-1)>total){return null;}
                  return <Link key={`center-${index}`} to={`/news/${currentPage+index-1}`}>
                    <div className={classnames("px-2 py-2 hover:bg-gray-100", (currentPage===currentPage+index-1? activeClass: ''))}>{currentPage+index-1}</div>
                  </Link>
                })
            }
            {
              ((total-Math.min(total-currentPage-2, 3)>currentPage-1) & (Math.min(total-currentPage-2, 3)>0))?<div>...</div>: null
            }
            {currentPage<=total-3? 
              Array.from(Array(Math.min(total-currentPage-2, 3)).keys()).reverse().map((index)=><Link key={`up-${index}`} to={`/news/${total-index}`}>
                                                <div className={classnames("px-2 py-2 hover:bg-gray-100", (currentPage===total-index? activeClass: ''))}>{total-index}</div>
                                              </Link>): null
            }
          </div>
          {/* Right section*/}
          <div className='ml-auto'>
            {currentPage===total?
              <div className="space-x-2 flex items-center text-gray-400"><span className="hidden md:block">Next</span><FiArrowRight/></div>:
              <Link to={`/news/${currentPage+1}`}>
                <div className="space-x-2 flex items-center"><span className="hidden md:block">Next</span><FiArrowRight/></div>
              </Link>
            }
          </div>
         </div>
}