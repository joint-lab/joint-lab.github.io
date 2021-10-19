import React from 'react';
import classnames from 'classnames';

export function EducationList({ children, className }){
  return <div className={classnames('divide-y', className)}>{children}</div>
}

export function EducationItem({ advisor, degree, university, title, misc, years, className }){
  return <div className={classnames('md:flex py-4', className)}>
          <div className='md:hidden'>
            <div>{years}</div>
          </div>
          <div className='mr-auto'>
            <div className='flex'>
              <div className='text-green-800 font-medium'>{degree}</div>
              {university? <div className='mx-1'>at</div>: null}
              <div className='text-gray-700'>{university}</div>
            </div>
            <div className="text-gray-600 italic">{title}</div>
            <div className="text-gray-600">{advisor}</div>
            <div className="text-gray-600">{misc}</div>
          </div>
          <div>
            <div className='hidden md:block'>{years}</div>
          </div>
          </div>
}