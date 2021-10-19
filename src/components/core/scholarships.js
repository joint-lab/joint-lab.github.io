import React from 'react';
import classnames from 'classnames';

export function ScholarshipList({ children, className }){
  return <div className={classnames('divide-y', className)}>{children}</div>
}

export function ScholarshipItem({ title, years, amount, donor, misc, className }){
  return <div className={classnames('md:flex py-4', className)}>
          <div className='md:hidden'>
            <div>{years}</div>
          </div>
          <div className='mr-auto'>
            <div className='flex'>
              <div className='text-green-800 font-medium'>{title}</div>
              {amount? <div className='mx-1'></div>: null}
              {amount ?<div className='text-gray-700'>{`($${amount})`}</div>:null}
            </div>
            <div className="text-gray-600">{donor}</div>
            <div className="text-gray-600">{misc}</div>
          </div>
          <div>
            <div className='hidden md:block'>{years}</div>
          </div>
          </div>
}