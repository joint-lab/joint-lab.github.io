import React, { Fragment } from 'react'
import classnames from 'classnames';
import { StaticQuery, Link, graphql } from "gatsby"

// Components
import { Footer } from 'components/core/footer';
import { Popover, Transition } from '@headlessui/react'
import { FiX, FiMenu, FiUsers, FiFileText, FiGrid, FiCoffee, FiHeart } from 'react-icons/fi';
import { WebsiteHeader } from 'components/core/seo';

// Metadata
import MetaImage from '../../images/meta-image.png';

export const navigation = [
  { name: 'People', href: '/people', Icon: FiUsers, description: 'Discover the active members and alumni.' },
  { name: 'Publications', href: '/publications', Icon: FiFileText,  description: 'Check all of articles, thesis, and conferences.'},
  { name: 'Media', href: '/media', Icon: FiGrid, description: 'Navigate throught media links of our science.' },
  { name: 'Lab', href: '/lab', Icon: FiHeart, description: 'Read what defines our lab.' },
  { name: 'News', href: '/news/1', Icon: FiCoffee, description: 'Get the latest news from the lab.' },
]

export function Page({ children, title, description, image, location, contentOverNav, className, light }) {
  return (<StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
      `}
      render={data => (
        <div>
          <WebsiteHeader url={`${data.site.siteMetadata.siteUrl}${location.pathname}`}
              title={title||data.site.siteMetadata.title}
              description={description||data.site.siteMetadata.description}
              image={`${data.site.siteMetadata.siteUrl}${image|| MetaImage}`}
              twitter={data.site.siteMetadata.twitter}/>
          <div className={classnames("min-h-screen flex flex-col", className)}>
          
          <div className="">
            <Popover>
              <nav
                className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 z-10"
                aria-label="Global"
              >
                <div className={classnames("flex items-center flex-1", contentOverNav? "-mb-16 pt-6": "pt-6")}> {/*Remove -mb-16 to remove overlab with hero*/}
                  <div className="flex items-center justify-between w-full md:w-auto mr-auto ">
                    <Link to="/" className='text-white font-medium text-xl hover:text-gray-200 font-bold max-w-32 focus:outline-none  focus:ring-0'>
                      The Joint Lab
                    </Link>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className={classnames("rounded-md p-2 inline-flex items-center justify-center focus:outline-none  focus:ring-0", light? 'text-gray-200': 'text-gray-800')}>
                        <span className="sr-only">Open main menu</span>
                        <FiMenu className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="hidden space-x-10 md:flex md:ml-10">
                    {navigation.map((item) => (
                      <Link key={item.name} to={item.href} className={classnames("text-base font-normal tracking-wide pb-2", 
                                          location.pathname.includes(item.href)? 
                                            (light?'text-gray-400 hover:text-gray-100': 'text-green-600'): 
                                            (light? 'text-gray-200 hover:text-gray-100': 'text-gray-500 hover:text-gray-900'))}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10"
                >
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-inset focus:ring-0">
                          <span className="sr-only">Close menu</span>
                          <FiX className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1 divide-y">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <main className="">
              { children }
            </main>
            
          </div>
          <div className='z-0 mt-auto'>
            <Footer/>
          </div>
          </div>
        </div>
      )}
    />)
}

export function Container({ children, className, ...props }){
  return (<div className={classnames("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)} {...props}><div className="mx-auto">{children}</div></div>)
}

export function ContainerLarger({ children, className, ...props }){
  return (<div style={{maxWidth: "88em"}}className={classnames("mx-auto px-4 sm:px-6 lg:px-8", className)} {...props}><div className="mx-auto">{children}</div></div>)
}

export function ContainerFull({ children, className, ...props }){
  return (<div className={classnames("w-full", className)} {...props}><div className="mx-auto">{children}</div></div>)
}

export function SmallContainer({ children, className, ...props }){
  return (<div className={classnames("max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", className)} {...props}><div className="mx-auto">{children}</div></div>)
}

export function TopBar({ children, className }){
  return <div className={classnames("flex-1 px-4 flex justify-between h-8 border-b bg-gray-100", className)}>{ children }</div>
}

export function ToolBar({ children, className }){
  return <div className={classnames("flex-1 px-4 flex justify-between h-12 border-b items-center", className)}>{ children }</div>
}

export function TwoColumnLayout({ children, className }){
  return <div className={classnames("flex-1 relative z-0 flex h-full ", className)}>{children}</div>
}

export function TwoColumnLayoutMain({ children, className, first, last }){
  return <main className={classnames("flex-1 relative focus:outline-none ", first? 'order-first': '', last? 'order-last': '', className)}>
          {children}
          </main>
}
export function TwoColumnLayoutSecondary({ children, className, first, last }){
  return <aside className={classnames("relative xl:flex xl:flex-col flex-shrink-0 w-96 max-w-full oveflow-auto", first? 'order-first': '', last? 'order-last': '' , className)}>
          {children}
          </aside>
}

export function FlexLayout({ className, noMargin, border, children }){
  return <div className={classnames('block lg:py-6 lg:flex', noMargin? "py-0": "py-3", border? 'border-b border-gray-200': '', className)}>{children}</div>
}

function FlexLayoutItem({ className, size, children }){
  const sizes = {
    'sm': 'lg:w-3/12',
    '4/12': 'lg:w-4/12',
    '5/12': 'lg:w-5/12',
    '7/12': 'lg:w-7/12',
    '8/12': 'lg:w-8/12',
    'md': 'lg:w-6/12',
    'lg': 'lg:w-9/12',
    'full': 'w-full',
  }
  return (<div className={classnames("w-full ", sizes[size], className)}>
            {children}
          </div>)
}

FlexLayout.Item = FlexLayoutItem;
TwoColumnLayout.Main = TwoColumnLayoutMain;
TwoColumnLayout.Secondary = TwoColumnLayoutSecondary;