import {BsFuelPumpFill} from 'react-icons/bs';
import {FaTabletAlt} from 'react-icons/fa';
import {services} from '../_lib/data';
import Link from 'next/link';

const Hero = () => {
    return (
        <div className="flex flex-col lg:px-8 pt-[4rem] w-full">
            <section className="hidden xl:flex xl:justify-center ">
                <div className="flex justify-center max-w-[80rem] h-[37rem] relative ">
                    <h1 className="text-[2.6rem] font-medium absolute left-[5rem] top-3">Z is for New Zealand</h1>
                    <img src="hero.png" className="" />
                    <div className="flex flex-col top-[11rem] left-[5rem] absolute w-[25rem]">
                        <h2 className="text-[2rem] text-white">We're here to keep our communities and whānau moving</h2>
                        <div className="flex w-[12rem] pt-8 ml-1">
                            <Link href="/location">
                                <button className="px-8 p-3 mt-2 w-full whitespace-nowrap text-black text-lg font-normal rounded-full bg-action transition-all duration-400 hover:scale-105 active:scale-100">
                                    Find a Station
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/*---------- Mobile hero ----------*/}
            <section className="flex justify-center xl:hidden ">
                <div className="flex flex-col  justify-center max-w-[80rem] h-[37rem] relative -mt-10">
                    <h1 className="text-[2.6rem] mx-auto pb-10 font-medium left-[5rem] -mt-[8rem] lg:mt-[2rem]">
                        Z is for New Zealand
                    </h1>
                    <img src="hero-mobile.png" className="h-[20rem]  lg:h-[30rem]" />
                    <div className="flex flex-col top-[11rem] pl-2 sm:left-[5rem] absolute w-[25rem]">
                        <h2 className="text-[2rem] text-white">We're here to keep our communities and whānau moving</h2>
                        <div className="flex w-[12rem] pt-8 ml-1">
                            <Link href="/location">
                                <button className="px-8 p-3 mt-2 w-full whitespace-nowrap text-black text-lg font-normal rounded-full bg-action transition-all duration-400 hover:scale-105 active:scale-100">
                                    Find a Station
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* ------------------------------- */}

            {/*---------- Mobile Second Section ----------*/}
            <section className="flex flex-col mx-auto xl:hidden">
                <div className="flex justify-center -mt-[5rem] lg:mt-[5rem]">
                    <h2 className="text-4xl ">Make the most of Z</h2>
                </div>

                <div className="flex flex-col mx-auto w-[27rem] pt-[4rem] gap-10  xl:flex xl:flex-row xl:justify-center xl:gap-[11rem]">
                    <div className="flex p-2">
                        <div className="flex mt-1  w-[6rem] h-[6rem] mr-6 text-4xl text-white bg-primary rounded-full relative">
                            <BsFuelPumpFill className="absolute top-[1.9rem] left-[2rem] " />
                        </div>
                        <div className="flex flex-col w-[18.8rem]">
                            <p className="text-sm text-primary font-medium">Rewards and promotions</p>
                            <h3 className="text-xl font-semibold pb-3 -mt-1">Pumped</h3>
                            <p className="text-base font-normal">
                                Save 6c per litre every time you fill up to 50 litres. Or stack your discount for later.
                                Plus earn Flybuys or Airpoints Dollars.
                            </p>
                        </div>
                    </div>

                    <div className="flex p-2">
                        <div className="flex mt-1  w-[6rem] h-[6rem] mr-6 text-4xl text-white bg-primary rounded-full relative">
                            <FaTabletAlt className=" absolute top-[1.9rem] left-[2rem] " />
                        </div>
                        <div className="flex flex-col w-[18.8rem]">
                            <p className="text-sm  text-primary font-medium">Z-App</p>
                            <h3 className="text-xl font-semibold pb-3 -mt-1">Z in the palm of your hand</h3>
                            <p className="text-base font-normal">
                                Z App lets you experience Z your way. Pay for fuel, pre-buy with Sharetank, pre-order
                                drinks, offset your carbon emissions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* ----------------------------------------- */}

            <section className="hidden xl:flex xl:flex-col ">
                <div className="flex justify-center pt-[9rem] ">
                    <h2 className="text-4xl ">Make the most of Z</h2>
                </div>

                <div className="flex flex-col mx-auto pt-[4rem] gap-10  xl:flex xl:flex-row xl:justify-center xl:gap-[11rem]">
                    <div className="flex ">
                        <div className="flex mt-1  w-[8rem] h-[8rem] mr-6 text-4xl text-primary bg-gray-200/50 rounded-full relative">
                            <BsFuelPumpFill className="absolute top-[2.9rem] left-[3rem] " />
                        </div>
                        <div className="flex flex-col w-[21rem]">
                            <p className="text-primary font-medium">Rewards and promotions</p>
                            <h3 className="text-2xl font-semibold pb-3 -mt-1">Pumped</h3>
                            <p className="text-lg font-normal">
                                Save 6c per litre every time you fill up to 50 litres. Or stack your discount for later.
                                Plus earn Flybuys or Airpoints Dollars.
                            </p>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex mt-1  w-[8rem] h-[8rem] mr-6 text-4xl text-primary bg-gray-200/50 rounded-full relative">
                            <FaTabletAlt className=" absolute top-[2.9rem] left-[2.8rem] " />
                        </div>
                        <div className="flex flex-col w-[21rem]">
                            <p className="text-primary font-medium">Z-App</p>
                            <h3 className="text-2xl font-semibold pb-3 -mt-1">Z in the palm of your hand</h3>
                            <p className="text-lg font-normal">
                                Z App lets you experience Z your way. Pay for fuel, pre-buy with Sharetank, pre-order
                                drinks, offset your carbon emissions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex w-full justify-center bg-gray-200/80 lg:bg-white lg:-mx-8 pt-[10rem]">
                <div className="hidden xl:flex xl:flex-1 h-[27rem] ">
                    <img src="home.png" className="w-[50rem]" />
                </div>
                <div className="pl-2  xl:flex xl:flex-1 xl:pl-[8rem]">
                    <div className="flex flex-col w-[26rem] -mt-20 xl:mt-2 xl:w-[29rem]">
                        <div className="">
                            <h2 className="text-4xl ">Power your home</h2>
                            <p className="text-lg font-normal py-9">
                                Z's been committed to keeping you moving on the road for over a decade and now we're
                                here to help you keep moving at home too.
                            </p>
                            <p className="text-lg font-normal">
                                Our specialised home power plans will help you keep your home and vehicle running, with
                                plans for both EV and non-EV drivers.
                            </p>
                        </div>
                        <div className="flex w-[13rem] py-9 ">
                            <Link href="/reports">
                                <button className="px-9 py-2 w-full whitespace-nowrap text-primary text-lg font-medium rounded-full border-2 border-primary transition-all duration-400 hover:scale-105 hover:bg-primary hover:text-white active:scale-100">
                                    Find out more
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-row w-full justify-center py-10 p-2 xl:py-[10rem]">
                <div className="flex flex-col  xl:flex xl:flex-row gap-14">
                    <div className="flex flex-col mx-auto w-[26rem] xl:w-[29rem]">
                        <h2 className="text-4xl ">What you need, made easy</h2>
                        <p className="text-lg font-normal py-4">
                            Moving furniture? Hangry for a pie and barista made coffee? Have a dirty car that needs some
                            love? Come on in — we've got you covered.
                        </p>
                        <div className="flex w-[12rem] py-9 ">
                            <button className="px-6 py-2 w-full whitespace-nowrap text-primary text-lg font-medium rounded-full border-2 border-primary transition-all duration-400 hover:scale-105 hover:bg-primary hover:text-white active:scale-100">
                                Services
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 h-[10rem] -mt-4 mb-[11rem] xl:-mb-0  xl:mt-6 mx-auto ">
                        {services.map((service, index) => (
                            <div key={index} className="h-8">
                                <div className="flex text-primary">
                                    <div className="text-3xl pr-4">{service.icon}</div>
                                    <div className="text-lg">{service.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Hero;
