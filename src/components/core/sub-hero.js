import React from 'react';
import classnames from 'classnames';

// Components
import { Container } from 'components/core/layout';

export function PulseCircle({ dark }){

  return <svg
            className="transform w-full lg:-translate-y-24 overflow-visible "
            width={100}
            height={100}
            fill="none"
            viewBox="0 0 100 100"
          >
              <circle cx="25" cy="200" r="250" fill={dark? "#31a354":"white"} opacity="0.1" className="animate-ping-xxslow-finite"/>
              <circle cx="25" cy="200" r="200" fill={dark? "#31a354":"white"} opacity="0.1" className="animate-ping-xxslow-finite"/>
              <circle cx="25" cy="200" r="150" fill={dark? "#31a354":"white"} opacity="0.1" className="animate-ping-xxslow-finite"/>
          </svg>
}


export function SubHero({ title, className, children }){
  return <div className={classnames('relative z-0 items-center text-gray-900 -mt-16 pt-16 lg:pt-32 bg-gradient-to-r from-gray-600 to-gray-800 overflow-hidden', className)}>
          <Container className={"justify-center py-8 lg:py-16"}>
            <div className='text-xl lg:text-4xl tracking-wide text-gray-200 font-light'>
              {title}
            </div>
            { children }
          </Container>
          {!title?<PulseCircle/>:null}
         </div>
}