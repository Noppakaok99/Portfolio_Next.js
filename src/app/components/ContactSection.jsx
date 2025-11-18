'use client'
import React, { useRef, useEffect } from "react"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const contactsectionCardRef = useRef(null);
      useEffect(() => {
        if (!contactsectionCardRef.current) return;
        const cardChildren = contactsectionCardRef.current.querySelectorAll('.contact-section');
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
                    trigger: contactsectionCardRef.current,
                    start: "top 80%",
                    toggleActions: "play reverse play reverse",
                }
            }
        );
    }, []);
  const contacts = [
    { label: "Email", value: "noppakao.k99@gmail.com", icon: "📧" },
    { label: "Phone", value: "+66 947974282", icon: "📱" },
    { label: "LinkedIn", value: "linkedin.com/in/Noppakao Kharanon", icon: "🔗", link: "https://www.linkedin.com/in/noppakao-kharanon/" },
    { label: "GitHub", value: "github.com/Noppakaok99", icon: "💻", link: "https://github.com/Noppakaok99" }
  ];
  return (
    <div ref={contactsectionCardRef} className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <section id="contact-me" className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-indigo-700 dark:text-indigo-400 contact-section">
        Get In Touch
      </h2>
      <div className="max-w-3xl mx-auto text-center mb-8">
        <p className="text-lg text-gray-600 dark:text-gray-300 contact-section">
          ผมกระตือรือร้นที่จะเรียนรู้และพร้อมรับโอกาสในร่วมงานในสายงาน Network และ IT Support ครับ ติดต่อผมได้ตามช่องทางด้านล่างนี้เลย!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {contacts.map((contact, index) => (
          <a 
            key={index} 
            href={contact.link ? contact.link : (contact.label === 'Email' ? `mailto:${contact.value}` : '#')}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex items-center space-x-4 border border-gray-200 dark:border-gray-700"
          >
            <span className="text-3xl contact-section">{contact.icon}</span>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 contact-section">{contact.label}</p>
              <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 break-words contact-section">{contact.value}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
    </div>
  );
};

export default ContactSection;