"use client";
import { useState } from "react";
import { Disclosure } from "@headlessui/react";
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

const DisclosureTab = () => {
    
    const [open1, toggleOpen1] = useToggle(false);
    const [open2, toggleOpen2] = useToggle(false);
    const [open3, toggleOpen3] = useToggle(false);
    const [open4, toggleOpen4] = useToggle(false);

  return (
    <>
      <Disclosure as="div" className="-mx-3">
        {({ open }) => (
          <>
            <Disclosure.Button onClick={toggleOpen1} className={`flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-primary ${
              open1 ? " text-black" : "text-primary"
            }`}>
              Product & Services
              <ChevronDownIcon
                className={classNames(
                  open ? "rotate-180" : "",
                  "h-5 w-5 flex-none"
                )}
                aria-hidden="true"
              />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-2 space-y-2">
              {[...products].map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-primary hover:bg-gray-50"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as="div" className="-mx-3">
        {({ open }) => (
          <>
            <Disclosure.Button onClick={toggleOpen2} className={`flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-primary ${
              open2 ? " text-black" : "text-primary"
            }`}>
              For Business
              <ChevronDownIcon
                className={classNames(
                  open ? "rotate-180" : "",
                  "h-5 w-5 flex-none"
                )}
                aria-hidden="true"
              />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-2 space-y-2">
              {[...forBusiness].map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-primary hover:bg-gray-50"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as="div" className="-mx-3">
        {({ open }) => (
          <>
            <Disclosure.Button onClick={toggleOpen3} className={`flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-primary ${
              open3 ? " text-black" : "text-primary"
            }`}>
              Sustainability
              <ChevronDownIcon
                className={classNames(
                  open ? "rotate-180" : "",
                  "h-5 w-5 flex-none"
                )}
                aria-hidden="true"
              />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-2 space-y-2">
              {[...sustainability].map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-primary hover:bg-gray-50"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as="div" className="-mx-3">
        {({ open }) => (
          <>
            <Disclosure.Button onClick={toggleOpen4} className={`flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-primary ${
              open4 ? " text-black" : "text-primary"
            }`}>
              About
              <ChevronDownIcon
                className={classNames(
                  open ? "rotate-180" : "",
                  "h-5 w-5 flex-none"
                )}
                aria-hidden="true"
              />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-2 space-y-2">
              {[...about].map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-primary hover:bg-gray-50"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      
    </>
  );
};
export default DisclosureTab;
