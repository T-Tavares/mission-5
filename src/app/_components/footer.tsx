import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { products } from "../_lib/data";
import { forBusiness } from "../_lib/data";
import { sustainability } from "../_lib/data";
import { about } from "../_lib/data";
import { FaL } from "react-icons/fa6";


const Footer = () => {
  return (

      <footer className="w-full  bg-gray-200">

        <div className="flex flex-col">

        <div className="flex flex-col sm:flex sm:flex-row sm:justify-evenly p-8">

        <div className="flex pb-8 sm:flex sm:flex-1">
          <a href="/" className="-m-1.5 p-1.5 pt-6">
            <span className="sr-only">Your Company</span>
            <img className="h-10 w-auto active:scale-95" src="logo.png" alt="" />
          </a>
        </div>

        <div className="flex flex-col gap-1 pb-2 xl:hidden">
          <p>Products & Services</p>
          <p>For Business</p>
          <p>Sustainability</p>
          <p>About</p>
          </div>  

        <div className="hidden xl:flex xl:gap-5">

        <div className="p-4">
          <h3 className="font-semibold text-black text-lg pl-1 pb-1">Product & Services</h3>
          
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-full p-1"
                  >
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className=" font-medium text-black w-[14rem] text-base"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

        <div className="p-4">
          <h3 className="font-semibold text-black text-lg pl-1 pb-1">For Business</h3>
          
                {forBusiness.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-full p-1"
                  >
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className=" font-medium text-black w-[14rem] text-base"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

        <div className="p-4">
          <h3 className="font-semibold text-black text-lg pl-1 pb-1">Sustainability</h3>
          
                {sustainability.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-full p-1"
                  >
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className=" font-medium text-black w-[14rem] text-base"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
        <div className="p-4">
          <h3 className="font-semibold text-black text-lg pl-1 pb-1">About</h3>
          
                {about.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-full p-1"
                  >
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className=" font-medium text-black w-[14rem] text-base"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

        </div>

        <div className="flex justify-center sm:flex sm:flex-1 sm:justify-end">
          <div className="flex flex-col">
        <div className=" w-[10rem]  py-4 ">
              <button className="px-6 p-2 w-full whitespace-nowrap text-primary font-medium rounded-full border-2 border-primary transition-all duration-400 hover:scale-105 hover:bg-primary hover:text-white active:scale-100">Contact Us</button>
              </div>
        <div className="flex justify-center text-primary text-4xl gap-4">
          <FaFacebook/>
          <FaLinkedin/>
          <FaInstagram/>
        </div>
        </div>
        </div>

        </div>

        <div className="flex flex-col border-t-[0.12rem] border-gray-400/60 mx-10 py-2 xl:flex xl:flex-row">   

        <div className="flex flex-col py-2 xl:gap-[4rem] xl:flex xl:flex-1 xl:flex-row">
          <p>Privacy</p>
          <p>Terms of use</p>
          <p>Fuel Safety Data Sheets</p>
          <p>Investor Relations</p>
        </div>
        <div className="py-2">
          <a>Z Energy Limited</a>
        </div>

        </div>

        </div>
        
      </footer>

  )
}
export default Footer