import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-headingColor text-gainsboro pt-16 pb-8 border-t-4 border-gold">
      <div className="mx-auto px-4 sm:px-8 w-full max-w-[1900px] min-w-[310px]">
        
        {/* Grid Principal - Responsive Dinámico */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-10 mb-12">

          {/* Identidad DroneDT */}
          <div className="flex flex-col space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-black text-2xl tracking-tighter uppercase">
              DRONE<span className="text-yellowColor">DT</span>
            </h3>
            <p className="text-xs leading-relaxed opacity-60 uppercase tracking-widest">


export default Footer;