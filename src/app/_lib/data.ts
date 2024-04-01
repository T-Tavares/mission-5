import React from "react";
import { BiMaleFemale, BiSolidCarWash } from "react-icons/bi";
import { FaOilCan, FaTrailer, FaUtensils } from "react-icons/fa6";
import { GiCarWheel } from "react-icons/gi";
import { MdGasMeter, MdLocalAtm } from "react-icons/md";
import { RiChargingPileFill } from "react-icons/ri";


export const products = [
  { name: "At the station", href: "#" },
  { name: "Power your home with Z", href: "#" },
  { name: "Z App", href: "#" },
  { name: "Rewards and promotions", href: "#" },
] as const;

export const forBusiness = [
  { name: "Z business fuel card", href: "#" },
  { name: "Fuels and services", href: "#" },
  { name: "Sign up for Z Business Plus", href: "#" },
  { name: "Business tips and stories", href: "#" },
  { name: "Apply", href: "#" },
  { name: "Login", href: "#" },
] as const;

export const sustainability = [
  { name: "Our sustainability goals", href: "#" },
  { name: "Tackling carbon emissions", href: "#" },
  { name: "Nature restoration", href: "#" },
  { name: "Digital sustainability", href: "#" },
  { name: "Supplier Code of Conduct", href: "#" },
  { name: "Supporting electric vehicles", href: "#" },
] as const;

export const about = [
  { name: "Our story", href: "#" },
  { name: "What we stand for", href: "#" },
  { name: "Our people", href: "#" },
  { name: "We’re moving with the times", href: "#" },
  { name: "Careers at Z", href: "#" },
  { name: "Corporate centre", href: "#" },
] as const;


export const services = [
  {
    name: "Trailer Hire",
    icon: React.createElement(FaTrailer),
  },
  {
    name: "Tyre Pressure",
    icon: React.createElement(GiCarWheel),
  },
  {
    name: "EV Charging",
    icon: React.createElement(RiChargingPileFill),
  },
  {
    name: "LPG bottle swap",
    icon: React.createElement(MdGasMeter),
  },
  {
    name: "Food and drink",
    icon: React.createElement(FaUtensils),
  },
  {
    name: "Toilets",
    icon: React.createElement(BiMaleFemale),
  },
  {
    name: "Car wash",
    icon: React.createElement(BiSolidCarWash),
  },
  {
    name: "Engine Oils",
    icon: React.createElement(FaOilCan),
  },
  {
    name: "ATM",
    icon: React.createElement(MdLocalAtm),
  },
] as const;