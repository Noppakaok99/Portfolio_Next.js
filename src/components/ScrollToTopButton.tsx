'use client';

import React, { useState, useEffect } from 'react';
import { useLenis } from '@/app/components/context/LenisContext';
import { ArrowUp } from 'lucide-react'; 

interface LenisScrollEvent {
    scroll: number;
    velocity: number;
    direction: number;
}

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false); 
    const { lenis } = useLenis();
    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, {
                duration: 1.0, 
            });
        }
    };
    useEffect(() => {
        if (!lenis) return;
        const handleScroll = (scroll: LenisScrollEvent) => { 
            if (scroll.scroll > 100) { 
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        lenis.on('scroll', handleScroll);
        return () => {
            lenis.off('scroll', handleScroll);
        };
    }, [lenis]);

    return (
        <button
            id="scroll-to-top-button"
            onClick={scrollToTop}
            className={`
                fixed bottom-6 right-6 p-3 rounded-full 
                bg-indigo-600 dark:bg-indigo-500 text-white 
                shadow-xl hover:bg-indigo-700 dark:hover:bg-indigo-400 
                z-[999] 
                transition-all duration-500 ease-out 
                
                ${isVisible 
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }
            `} 
            aria-label="Scroll to top"
        >
            <ArrowUp className="w-6 h-6" />
        </button>
    );
};

export default ScrollToTopButton;
