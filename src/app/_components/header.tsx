"use client"
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, } from '@heroicons/react/20/solid'
import PopoverGroups from './popoverGroups'
import { IoMdSearch } from "react-icons/io"
import { products } from '../_lib/data'
import DisclosureTab from './disclosure'




function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <nav className="flex w-full items-center justify-between px-6 pt-6 lg:px-8" aria-label="Header">
        <div className="flex flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-10 w-auto active:scale-95" src="logo.png" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <IoMdSearch className="text-primary w-[1.3rem] h-8 mr-4" />
            <Bars3Icon className="h-8 w-8 text-primary" aria-hidden="true" />
            
          </button>
        </div>
        <div className="gap-2 bg-gray-200/50 rounded-full hidden lg:flex  ">
          <PopoverGroups />  
        </div>
        
        
        <div className="hidden lg:flex lg:flex-1  lg:justify-end  px-2 gap-8 ">
          <div className='flex pl-6'><button className="px-6 py-2 w-full whitespace-nowrap text-primary font-medium rounded-full border-2 border-primary transition-all duration-400 hover:scale-105 hover:bg-primary hover:text-white active:scale-100">Find a Station</button>
          </div>
          <button className="text-primary font-medium">Search</button>
          <div className="-ml-6 ">
          <IoMdSearch className="text-primary w-[1.3rem] h-10" />
          </div>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-10 w-auto"
                src="logo.png"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <DisclosureTab/>   
              </div>
              <div className='flex justify-center'>
              <div className=" w-[12rem]  py-6">
              <button className="px-6 p-2 w-full whitespace-nowrap text-primary font-medium rounded-full border-2 border-primary transition-all duration-400 hover:scale-105 hover:bg-primary hover:text-white active:scale-100">Find a Station</button>
              </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
export default Header