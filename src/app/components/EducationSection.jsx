'use client'
import React, { useRef, useEffect } from "react" 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const educationCardRef = useRef(null);
  useEffect(() => {
    if (!educationCardRef.current) return;
    const cardChildren = educationCardRef.current.querySelectorAll('.edu-item');
    gsap.fromTo(
        cardChildren,
        { y: 50, opacity: 0 }, 
        { 
            y: 0, 
            opacity: 1,
            duration: 3.5,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: educationCardRef.current,
                start: "top 80%",
                toggleActions: "play reverse play reverse",
            }
        }
    );
}, []);
  const education = [
    {
      institution: "มหาวิทยาลัยรังสิต (Rangsit University)",
      degree: "ปริญญาตรี วิทยาศาสตรบัณฑิต (วท.บ.)",
      focus: "สาขาวิชาวิทยาการคอมพิวเตอร์ (Computer Science)",
      duration: "พ.ศ. 2564 - พ.ศ. 2566 (สำเร็จการศึกษา)",
      achievements: [
        "หลักสูตรพื้นฐาน: โครงสร้างข้อมูล, การจัดการฐานข้อมูล, ความปลอดภัยของเครือข่าย, การพัฒนาเว็บ",
        "Big Data Analytics, Data Mining, Data Science, ปัญญาประดิษฐ์ (AI), Machine Learning, Blockchain, IOT, Cloud Computing",
        "โครงการพัฒนา: พัฒนาระบบลงทะเบียนสมัครสอบของราชการ",
        "โครงการพัฒนา: พัฒนาแอพพลิเคชั่น MAXME",
      ],
    },
  ];

  return (
    <div ref={educationCardRef} className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <section id="education" className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-10 text-indigo-700 dark:text-indigo-400 edu-item">
        Education
      </h2>
      {education.map((item, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl hover:shadow-xl transition duration-300 mb-6 border-l-4 border-indigo-500 dark:border-indigo-400"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 edu-item">{item.degree}</h3>
              <p className="text-lg font-medium text-indigo-600 dark:text-indigo-300 edu-item">{item.institution}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 edu-item">{item.focus}</p>
            </div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-100 bg-indigo-100 dark:bg-indigo-700 px-3 py-1 rounded-full edu-item">
              {item.duration}
            </p>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mt-4 edu-item">
            {item.achievements.map((achievement, i) => (
              <li key={i} className="pl-2">
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
    </div>
  );
};

export default EducationSection