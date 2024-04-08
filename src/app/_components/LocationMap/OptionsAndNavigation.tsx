import {IoMdSearch} from 'react-icons/io';
import {MdMyLocation} from 'react-icons/md';

export default function OptionsAndNavigation() {
    return (
        <div className="flex flex-col pt-8">
            <h1 className="text-2xl font-medium">Find a station</h1>
            <div className="hidden xl:flex  pt-4">
                <div className="flex flex-1">
                    <div className="flex relative">
                        <input
                            placeholder="Search a location"
                            className="w-[35rem] p-1 border-2 border-primary rounded-full pl-5 placeholder-[#7e3b98] placeholder:font-medium focus:outline-none"
                        ></input>
                        <IoMdSearch className="text-primary text-xl absolute top-3 right-4" />
                    </div>
                    <div className="flex justify-center  pl-6 w-[16rem] relative">
                        <button className="relative py-2 w-full whitespace-nowrap text-primary font-medium rounded-full  transition-all duration-400  bg-gray-200/70 hover:scale-105 active:scale-100">
                            <MdMyLocation className="text-2xl absolute left-6 " /> Use my location
                        </button>
                    </div>
                </div>
                <div className="flex pl-[3rem] gap-4">
                    <div className="flex">
                        <button className="px-8 py-2 w-full whitespace-nowrap text-primary font-medium rounded-full border-2 border-primary transition-all duration-400 hover:scale-105   active:scale-100">
                            Select a fuel type
                        </button>
                    </div>
                    <div className="flex">
                        <button className="px-6 py-2 w-full whitespace-nowrap bg-primary text-white font-medium rounded-full border-2 border-primary transition-all duration-400 hover:scale-105 active:scale-100">
                            Show prices
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
