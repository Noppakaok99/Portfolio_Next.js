'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap'; // 💥 Import GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // 💥 Import ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. สร้าง Context (เพิ่ม activeId เข้าไปใน Type)
const LenisContext = createContext<{ lenis: Lenis | null, activeId: string | null }>({ lenis: null, activeId: null });

// 2. Hook สำหรับดึง Lenis Instance
export const useLenis = () => useContext(LenisContext);

// 3. Provider Component
export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null); // 💥 State ใหม่
    // 💥 รายการ ID ของ Sections ที่ใช้ใน Navbar (ใช้ตัวพิมพ์เล็กและขีดกลาง)
    const sections = ['home', 'about-me', 'services', 'my-work', 'contact-me']; 
    
    // 💥 ฟังก์ชันตรวจสอบตำแหน่ง Scroll และอัปเดต activeId
    const handleScroll = () => {
        if (!lenis) return;
        
        // เราตั้งค่า Offset (ชดเชยความสูง Navbar) ไว้ที่ 80px
        const offset = 80; 
        let currentActiveId: string | null = null;
        let minDistance = Infinity; // ใช้หา Section ที่ "ใกล้" ขอบบนสุดที่สุด

        // วนลูปตรวจสอบตำแหน่งของทุก Section
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            const rect = el.getBoundingClientRect();
            
            // ใช้ rect.top เพื่อดูว่า Section นี้อยู่ตรงไหนเมื่อเทียบกับขอบบนของ viewport
            const distance = Math.abs(rect.top - offset); 

            // เงื่อนไข: 
            // 1. ส่วนหัวของ Section ต้องอยู่เหนือหรือตรงกับเส้น offset (rect.top <= offset) 
            // 2. ต้องเป็น Section ที่อยู่ใกล้เส้น offset ที่สุด (distance < minDistance)
            if (rect.top <= offset && distance < minDistance) {
                minDistance = distance;
                currentActiveId = id;
            }
        });
        
        // หากไม่มี Section ใดตรงตามเงื่อนไข (เช่น อยู่ระหว่าง Section) ให้ใช้ ID เดิม
        if (currentActiveId && currentActiveId !== activeId) {
            setActiveId(currentActiveId);
        }
    };

useEffect(() => {
        const lenisInstance = new Lenis({
        duration: 2.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.02,
        wheelMultiplier: 1, // เลื่อนแรงขึ้น 50%
        });

        setLenis(lenisInstance);

        // 1. ผูก Lenis Event กับ ScrollTrigger.update 
            //    (บอก GSAP ว่า Lenis เลื่อนแล้วนะ อัปเดต ScrollTrigger ได้เลย)
        lenisInstance.on('scroll', ScrollTrigger.update); 
        
        // 2. ผูกฟังก์ชัน Active Link เข้ากับ Event ของ Lenis
        lenisInstance.on('scroll', handleScroll); 

            // 3. ใช้ GSAP Ticker เพื่อเรียก lenis.raf (แทน requestAnimationFrame)
        gsap.ticker.add((time) => {
                // GSAP ส่งค่าเวลาเป็นวินาที, Lenis ต้องการมิลลิวินาที
        lenisInstance.raf(time * 1000); 
        });
        // 4. ปิด Lag Smoothing ของ GSAP
        gsap.ticker.lagSmoothing(0); 

        // ❌ ลบ function raf(time: number) {...} และ requestAnimationFrame(raf); ออก
        //    เพราะ GSAP ticker ทำหน้าที่นี้แทนแล้ว

        return () => {
        lenisInstance.destroy();
        // ยกเลิก Listener ของ ScrollTrigger และ Active Link
                lenisInstance.off('scroll', ScrollTrigger.update);
        lenisInstance.off('scroll', handleScroll); 
                // ยกเลิก GSAP Ticker
                gsap.ticker.remove(lenisInstance.raf.bind(lenisInstance)); 
        };
        }, []);

    // 💥 ส่ง activeId เข้า Context ด้วย
    return (
        <LenisContext.Provider value={{ lenis, activeId }}>
            {children}
        </LenisContext.Provider>
    );
};