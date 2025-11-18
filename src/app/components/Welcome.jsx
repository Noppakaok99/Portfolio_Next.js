'use client';
import React, { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from 'gsap';

const FacebookIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3 8h-2v5h-3v-5H8V7h2V6a3 3 0 0 1 3-3h2v3h-2v1h2l1 3z"/>
    </svg>
);
const LineChatIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
);
const Welcome = () => {
    const imageRef = useRef(null); 
    const textCardRef = useRef(null);
    const homeCardRef = useRef(null);
    useEffect(() => {
        if (!imageRef.current || !textCardRef.current || !homeCardRef.current) return;
        const cardChildren = homeCardRef.current.querySelectorAll('.home-item');
        gsap.fromTo(
                cardChildren,
                { y: 20, opacity: 0 }, 
                { 
                    y: 0, 
                    opacity: 1,
                    duration: 2.5,
                    ease: "power2.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: homeCardRef.current,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse",
                    }
                }
            );
    }, []);
  return (
    <>
      <div ref={homeCardRef} className="bg-gray-50 dark:bg-gray-900">
        
        <section id="home" className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div ref={imageRef} className="mb-6 md:mb-0 flex flex-col items-center text-center home-item">
              <Image 
                src="/NPK5.jpg"
                alt="Profile" 
                width={200} 
                height={200}
                className="rounded-full shadow-lg border-4 border-indigo-500/50 dark:border-indigo-400/50" 
              />
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-2 text-gray-900 dark:text-[#F8F8F8] leading-tight text-center"> 
                <span className="block text-base sm:text-2xl md:text-3xl font-semibold text-gray-600 dark:text-[#AAAAAA] mb-1 home-item">
                  Noppakao Kharanon
                </span>
                <span className="block">
                  <span className="text-gray-900 dark:text-[#F8F8F8] home-item">IT</span>
                  <span className="text-blue-600 dark:text-[#6EC1E4] home-item">Support</span>
                  <span className="text-yellow-600 dark:text-[#a75ed8] home-item"> Engineer</span>
                </span>
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1">
            <div 
              ref={textCardRef}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl hover:shadow-xl transition duration-300 mb-6 border-l-4 border-indigo-500 dark:border-indigo-400 items-center"
            >
              <span className="text-xl text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 home-item">Welcome to my Portfolio</span>
              <p className="text-gray-700 dark:text-gray-300 mt-2 max-w-xl home-item">
                สวัสดีครับ ผมเรียน วิทย์คอม (Computer Science) จากคณะ เทคโนโลยีดิจิทัลและสารสนเทศ ครับ พื้นฐานที่แน่นมากๆ คือ Front-end เลยทำให้เข้าใจภาพรวมของ Client-Server และรู้ว่าแอปพลิเคชันต่างๆ มันทำงานสื่อสารกันบนเน็ตเวิร์กยังไง
                จริงๆ แล้วผมสนใจงานด้าน Network มากๆ และมีความเข้าใจหลักการเน็ตเวิร์กพื้นฐาน พวกอุปกรณ์สำคัญๆ อย่าง Router กับ Switch รวมถึงเรื่องการจัดการระบบคอมพิวเตอร์ทั่วไป
                จุดเด่นที่สุดของผมคือ ประสบการณ์ตรงจากการเป็น IT Support เลยครับ ทำให้ได้สกิลการ Troubleshoot (แก้ไขปัญหา) จริงๆ ในการวิเคราะห์และแก้ปัญหาเน็ตเวิร์กและการเชื่อมต่อต่างๆ ที่ User เจอมา ซึ่งทักษะนี้มันเอามาใช้กับงาน Network ได้ตรงๆ เลย
                ตอนนี้ผมพร้อมเปิดรับและอยากเรียนรู้เทคโนโลยีใหม่ๆ มากๆ และกำลังมองหาโอกาสที่จะได้นำความรู้และทักษะการแก้ปัญหามาช่วยพัฒนาและดูแลระบบเครือข่ายขององค์กรให้เสถียรครับ
              </p>
            </div>
            <div className="flex flex-wrap gap-4"> 
              <button className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-xl transform hover:scale-[1.05] home-item">
                <a href="Resume-Noppakao.pdf" download className="flex items-center space-x-2">
                  <span>Resume</span> <span className="w-5 h-5">🧾</span>
                </a>
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-xl transform hover:scale-[1.05] home-item">
                <a href="Profile-Noppakao.pdf" download className="flex items-center space-x-2">
                  <span>CV</span> <span className="w-5 h-5">📩</span>
                </a>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-xl transform hover:scale-[1.05] home-item">
                <a href="https://www.facebook.com/K.Noppakao.k99/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <span>Facebook</span> <FacebookIcon className="w-5 h-5"/>
                </a>
              </button>
              <button className="bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-xl transform hover:scale-[1.05] home-item">
                <a href="https://line.me/ti/p/pPJ-6fQCnZ" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <span>Line</span> <LineChatIcon className="w-5 h-5"/>
                </a>
              </button>
            </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Welcome