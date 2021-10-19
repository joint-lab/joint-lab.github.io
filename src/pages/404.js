import React from "react"
import { Link } from "gatsby"

// Components
import { FiArrowRight } from  'react-icons/fi';
import { JointIcon } from 'components/core/icons';

// Data
import { navigation } from 'components/core/layout';

function LinkToExistingPage({ name, description, Icon, href}){
  return (<li className="relative py-6 flex items-start space-x-4">
            <div className="flex-shrink-0">
              <span className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-50">
                <Icon className="h-6 w-6 text-green-700" aria-hidden="true" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-medium text-gray-900">
                <span className="rounded-sm focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                  <Link to={href} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {name}
                  </Link>
                </span>
              </h3>
              <p className="text-base text-gray-500">{description}</p>
            </div>
            <div className="flex-shrink-0 self-center">
              <FiArrowRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </li>)
}
/*
  404 page
  Source:
  https://tailwindui.com/components/marketing/feedback/404-pages
*/
export default function NotFoundPage(){
  return <div className="bg-white">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-xl mx-auto py-16 sm:py-24">
          <div className="flex w-full">
              <div className="mx-auto lg:pt-16">
               <JointIcon dark/>
              </div>
            </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">404 error</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              This page does not exist.
            </h1>
            <p className="mt-2 text-lg text-gray-500">You are on the Joint Lab official website but we could not find the page you are looking for.</p>
          </div>
          <div className="mt-12">
            <h2 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">pages</h2>

            <ul className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
              {navigation.map((link)=><LinkToExistingPage  key={link.name} {...link}/>)}
            </ul>
            <div className="mt-8">
              <Link to="/" className="text-base font-medium text-green-600 hover:text-green-500">
                Or go back home<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
};