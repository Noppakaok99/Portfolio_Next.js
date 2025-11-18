'use client'
import React, { useRef, useEffect } from "react"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const skillssectionCardRef = useRef(null);
    useEffect(() => {
      if (!skillssectionCardRef.current) return;
      const cardChildren = skillssectionCardRef.current.querySelectorAll('.skills-section');
      gsap.fromTo(
          cardChildren,
          { y: 50, opacity: 0 }, 
          { 
              y: 0, 
              opacity: 1,
              duration: 2.5,
              ease: "power2.out",
              stagger: 0.15,
              scrollTrigger: {
                  trigger: skillssectionCardRef.current,
                  start: "top 80%",
                  toggleActions: "play reverse play reverse",
              }
          }
      );
  }, []);
  const skillsData = [
    {
      category: "Network & Systems",
      description: "เน้นทักษะด้านโครงสร้างพื้นฐานและการจัดการระบบปฏิบัติการ",
      skills: ["Troubleshooting (Connectivity/Hardware)", "TCP/IP, DNS, DHCP (Basic Config)", "Windows Server (User/Group Mgmt)", "Linux OS (CLI Basic)", "Active Directory"],
      icon: "🌐"
    },
    {
      category: "IT Support & Tools",
      description: "เน้นทักษะการทำงานจริงกับผู้ใช้งานและเครื่องมือ IT",
      skills: ["Hardware/Software Diagnosis", "Ticketing Systems (e.g., Jira)", "Microsoft 365/Office Suite", "Printer/Peripheral Setup", "Backup & Recovery"],
      icon: "🛠️"
    },
    {
      category: "Web Development (Complementary)",
      description: "ทักษะเสริมที่ช่วยให้เข้าใจ Client-Server Architecture",
      skills: ["HTML & CSS", "JavaScript / React.js", "Tailwind CSS", "Git & GitHub", "Client-Server Architecture"],
      icon: "💻"
    },
  ];

  return (
    <div ref={skillssectionCardRef} className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <section id="my-skills" className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-indigo-700 dark:text-indigo-400 skills-section">
        My Core Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border-t-4 border-indigo-500 dark:border-indigo-400 hover:shadow-2xl transition duration-300"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3 skills-section">{item.icon}</span>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 skills-section">{item.category}</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 skills-section">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-200 rounded-full skills-section"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default SkillsSection;