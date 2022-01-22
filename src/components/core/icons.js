import React from 'react';

export function LSDIcon(){
  return <svg
            className="transform opacity-60 rotate-45 scale-75 translate-x-8 overflow-visible"
            width={100}
            height={100}
            fill="none"
            viewBox="0 0 100 100"
          >
            <circle cx="10" cy="20" r="6"  fill="white" className="animate-ping-slow origin-top "/>
            <circle cx="10" cy="20" r="6"  fill="white" className="animate-ping-xxxslow origin-left "/>
            <circle cx="60" cy="50" r="6"  fill="white" className="animate-ping-xxslow origin-left "/>
            <circle cx="10" cy="80" r="6"  fill="white" className="animate-ping-xslow origin-top-left "/>

            <circle cx="10" cy="20" r="6" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="60" cy="50" r="6" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="10" cy="80" r="6" stroke="white" strokeWidth="2" fill="none"/>

            <path d="M 10,75 10,25" stroke="white" strokeWidth="2" />
            <path d="M 14,77 56,53" stroke="white" strokeWidth="2" />
            <path d="M 14,24 56,47" stroke="white" strokeWidth="2" />
          </svg>
}

export function CDLIcon(){
  return <svg
            className="transform opacity-60 rotate-60 scale-75 overflow-visible"
            width={100}
            height={100}
            fill="none"
            viewBox="0 0 100 100"
          >
            <circle cx="35" cy="50" r="40" fill="white" opacity="0.1" className="animate-ping-slow origin-center"/>

            <circle cx="10" cy="20" r="6" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="60" cy="50" r="6" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="10" cy="80" r="6" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M 10,75 10,25" stroke="white" strokeWidth="2" />
            <path d="M 14,77 56,53" stroke="white" strokeWidth="2" />
            <path d="M 14,24 56,47" stroke="white" strokeWidth="2" />
          </svg>
}

export function JointIcon({ dark }){

  return <svg
            className="transform scale-90 rotate-12 translate-x-8 -translate-y-6 lg:-translate-y-12 overflow-visible "
            width={100}
            height={100}
            fill="none"
            viewBox="0 0 100 100"
          >
              <circle cx="60" cy="50" r="90" fill={dark? "#31a354":"white"} opacity="0.1" className=""/>
              <circle cx="60" cy="50" r="120" fill={dark? "#31a354":"white"} opacity="0.1" className=""/>

              <circle cx="60" cy="50" r="120" stroke={dark? "#31a354":"white"}  opacity="0.8" className="animate-ping-xslow origin-center"/>
              <circle cx="60" cy="50" r="120" stroke={dark? "#31a354":"white"} opacity="0.8" className="animate-ping-slow origin-center"/>

              <circle cx="10" cy="20" r="6" strokeWidth="2" stroke="white" fill="#fed976" className="animate-ping-fast origin-right "/>
              <circle cx="10" cy="80" r="6" strokeWidth="2" stroke="white" fill="#fed976" className="animate-ping-xxxslow origin-right "/>
              <circle cx="110" cy="20" r="6" strokeWidth="2" stroke="white" fill="#fed976" className="animate-ping-xxslow origin-right "/>
              <circle cx="110" cy="80" r="6" strokeWidth="2" stroke="white" fill="#fed976" className="animate-ping-xslow origin-right "/>

              <circle cx="10" cy="20" r="6" stroke={dark? "#00441b":"white"} strokeWidth="2" fill="none"/>
              <circle cx="60" cy="50" r="6" stroke={dark? "#00441b":"white"} strokeWidth="2" fill="none"/>
              <circle cx="10" cy="80" r="6" stroke={dark? "#00441b":"white"} strokeWidth="2" fill="none"/>
              <circle cx="110" cy="20" r="6" stroke={dark? "#00441b":"white"} strokeWidth="2" fill="none"/>
              <circle cx="110" cy="80" r="6" stroke={dark? "#00441b":"white"} strokeWidth="2" fill="none"/>
    
              <path d="M 10,75 10,25" stroke={dark? "#00441b":"white"} strokeWidth="2" />
              <path d="M 110,75 110,25" stroke={dark? "#00441b":"white"} strokeWidth="2" />
              <path d="M 14,77 56,53" stroke={dark? "#00441b":"white"} strokeWidth="2" />
              <path d="M 14,24 56,47" stroke={dark? "#00441b":"white"} strokeWidth="2" />
              <path d="M 107,25 64,47" stroke={dark? "#00441b":"white"} strokeWidth="2" />
              <path d="M 107,75 64,53" stroke={dark? "#00441b":"white"} strokeWidth="2" />
              
          </svg>
}
