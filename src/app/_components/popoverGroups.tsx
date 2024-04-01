"use client";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { products } from "../_lib/data";
import { forBusiness } from "../_lib/data";
import { sustainability } from "../_lib/data";
import { about } from "../_lib/data";


const useToggle = (
  initialState = false
): [boolean, (event: React.MouseEvent<HTMLButtonElement>) => void] => {
  const [state, setState] = useState(initialState);
  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setState(!state);
  };

  return [state, toggle];
};

const PopoverGroups = () => {
  const [open1, toggleOpen1] = useToggle(false);
  const [open2, toggleOpen2] = useToggle(false);
  const [open3, toggleOpen3] = useToggle(false);
  const [open4, toggleOpen4] = useToggle(false);

  // const handleOpen1 = () => {
  //     setOpen1(!open1);
  //   }
  // const handleOpen = () => {
  //     setOpen2(!open2);
  //   }

  return (
    <>
      

      <Popover.Group className="hidden sm:flex sm:gap-x-12">
        <Popover className="relative">
          <Popover.Button
            onClick={toggleOpen1}
            className={`flex items-center gap-x-1 rounded-full p-2 px-4 font-medium leading-6 outline-none transition-colors duration-500 ${
              open1 ? "bg-[#7e3b98] bg-opacity-80 text-white" : "text-primary"
            }`}
          >
            Product & Services
            <ChevronDownIcon
              className={classNames(
                open1 ? "rotate-180" : "",
                "h-5 w-5 flex-none"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="flex justify-center absolute -left-14 top-full z-10 mt-3 w-[17.7rem] max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-full p-2 py-[0.7rem] hover:bg-[#c499d0] hover:bg-opacity-20"
                  >
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="flex justify-center font-medium text-primary w-[14rem] text-base"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </Popover.Group>
      <Popover.Group className="hidden sm:flex sm:gap-x-12">
        <Popover className="relative">
          <Popover.Button
            onClick={toggleOpen2}
            className={`flex items-center gap-x-1 rounded-full p-2 px-4 font-medium leading-6 outline-none transition-colors duration-500 ${
              open2 ? "bg-[#7e3b98] bg-opacity-80 text-white" : "text-primary"
            }`}
          >
            For Business
            <ChevronDownIcon
              className={classNames(
                open2 ? "rotate-180" : "",
                "h-5 w-5 flex-none"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="flex justify-center absolute -left-20 top-full z-10 mt-3 w-[17.7rem] max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {forBusiness.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-full p-2 py-[0.7rem] hover:bg-[#c499d0] hover:bg-opacity-20"
                  >
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="flex justify-center font-medium text-primary w-[14rem] text-base"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </Popover.Group>
      <Popover.Group className="hidden sm:flex sm:gap-x-12">
        <Popover className="relative">
          <Popover.Button
            onClick={toggleOpen3}
            className={`flex items-center gap-x-1 rounded-full p-2 px-4 font-medium leading-6 outline-none transition-colors duration-500 ${
              open3 ? "bg-[#7e3b98] bg-opacity-80 text-white" : "text-primary"
            }`}
          >
            Sustainability
            <ChevronDownIcon
              className={classNames(
                open3 ? "rotate-180" : "",
                "h-5 w-5 flex-none"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="flex justify-center absolute -left-20 top-full z-10 mt-3 w-[17.7rem] max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {sustainability.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-full p-2 py-[0.7rem] hover:bg-[#c499d0] hover:bg-opacity-20"
                  >
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="flex justify-center font-medium text-primary w-[14rem] text-base"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </Popover.Group>
      <Popover.Group className="hidden sm:flex sm:gap-x-12">
        <Popover className="relative">
          <Popover.Button
            onClick={toggleOpen4}
            className={`flex items-center gap-x-1 rounded-full p-2 px-4 font-medium leading-6 outline-none transition-colors duration-500 ${
              open4 ? "bg-[#7e3b98] bg-opacity-80 text-white" : "text-primary"
            }`}
          >
            About
            <ChevronDownIcon
              className={classNames(
                open4 ? "rotate-180" : "",
                "h-5 w-5 flex-none"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="flex justify-center absolute -left-24 top-full z-10 mt-3 w-[17.7rem] max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {about.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-full p-2 py-[0.7rem] hover:bg-[#c499d0] hover:bg-opacity-20"
                  >
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="flex justify-center font-medium text-primary w-[14rem] text-base"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </Popover.Group>

      
      
    </>
  );
};
export default PopoverGroups;
