'use client';
import React, { useState } from "react"
import ModeToggle from "./toggle-click"
import { useLenis } from '@/app/components/context/LenisContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lenis, activeId } = useLenis();
  const Links = ['Home', 'Education', 'My Skills', 'My Work', 'Contact me'];
  const handleLenisScroll = (e, targetId) => {
        e.preventDefault(); 
        setIsOpen(false); 
        if (lenis) {
            lenis.scrollTo(targetId, {
                duration: 1.2,
                offset: -80,
            });
        }
    };
  return (
    <>
      <nav className="bg-gray-200 dark:bg-gray-800 shadow-md transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
            Portfolio
          </div> 
          <div className="flex items-center space-x-6"> 
            <div className="space-x-6 hidden md:flex"> 
            {Links.map((link) => {
                const sectionId = `#${link.toLowerCase().replace(' ', '-')}`;
                const isActive = activeId === sectionId;
                return (
                    <a 
                        key={link} 
                        href={`#${sectionId}`}
                        onClick={(e) => handleLenisScroll(e, sectionId)} 
                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition duration-150 cursor-pointer"
                    >
                        {link}
                    </a>
                );
            })}
        </div>
            <ModeToggle/>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar