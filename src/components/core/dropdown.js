import React, { Fragment } from 'react';
import classnames from 'classnames';

// Components
import { Menu, Transition } from '@headlessui/react'
import { FiChevronDown, FiArrowRight } from 'react-icons/fi';

export function DropdownItem({ name, className, href, onClick }){
  return <Menu.Item>
            {({ active }) => (
              <a
                href={href || '#'}
                onClick={onClick}
                className={classnames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm online whitespace-nowrap',
                  className
                )}
              >
                <span className='inline-flex items-center w-full'>{String(name)} {href? <span className='ml-auto'><FiArrowRight/></span>: null}</span>
               
              </a>
            )}
          </Menu.Item>
}
function DropdownTitle({ label, vanilla, className }){
  if (vanilla){
    return <Menu.Button className={classnames("focus:ring-0 outline-none", className)}>
            {label}
            </Menu.Button>
  }
  return (<Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            {label}
            <FiChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </Menu.Button>)
}
export function Dropdown({ children, label, vanilla, onlyIcon, disabled, orientation, className }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <DropdownTitle label={label} vanilla={vanilla} className={className}/>
          </div>

          <Transition
            show={disabled? false: open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className={classnames("origin-top-right absolute mt-2 w-auto z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none", orientation==='left'? 'left-0':'right-0')}
            >
              <div className="py-1">
                {children}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

Dropdown.Item = DropdownItem;
export function ControlledBasicDropdown({ values, onChange, ...props }){
    return <Dropdown {...props}>
              {values.map(val=><DropdownItem key={val} name={val} onClick={()=>onChange(val)}/>)}
            </Dropdown>
}

export function ControlledDropdown({ values, onChange, ...props }){
    return <Dropdown {...props}>
              {values.map(val=><DropdownItem key={val.name} {...val}/>)}
            </Dropdown>
}