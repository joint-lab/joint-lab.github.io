import React, { Fragment, useState } from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

// Components
import { Dialog, Transition } from '@headlessui/react'
import { FiX } from 'react-icons/fi'

export function SlideOver({ children, size, title, className, open, setOpen }) {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="fixed inset-0 overflow-hidden z-50" open={open} onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden z-60">
         <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-2 md:pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className={classnames("w-screen h-full", size==='sm'?'max-w-md': 'max-w-2xl')}>
                <div className={classnames("h-full flex flex-col bg-white shadow-xl overflow-y-auto", className)}>
                  <div className="px-4 sm:px-6 pt-6 pb-2 bg-gray-100 border-b">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">{ title }</Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <FiX className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='flex-shrink mt-auto h-full'>
                    { children }
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}


SlideOver.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool, 
  setOpen: PropTypes.func,
  icon: PropTypes.element, 
  size: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
}

// Spécifie les valeurs par défaut des props :
SlideOver.defaultProps = {
  size: 'sm',
};

export function UncontrolledSlideOver({ defaultOpen, ...props}) {
  const [open, setOpen] = useState(defaultOpen)
  return <SlideOver {...props} open={open} setOpen={setOpen}/>
}

// Spécifie les valeurs par défaut des props :
UncontrolledSlideOver.defaultProps = {
  defaultOpen: false
};