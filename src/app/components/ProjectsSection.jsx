'use client';
import React, { useRef, useEffect, useState, useCallback} from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft,  ArrowRight } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

const ProjectCarousel = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = slides.length;
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? totalSlides - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === totalSlides - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const currentSlide = slides[currentIndex];
    const slideRef = useRef(null);
    useEffect(() => {
        if (typeof window.gsap !== 'undefined' && slideRef.current) {
            window.gsap.fromTo(slideRef.current, 
                { opacity: 0, y: 10 }, 
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [currentIndex]);

    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 shadow-xl">
            <div ref={slideRef} className="p-6 md:p-8 min-h-[400px]">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 w-full md:w-1/1 aspect-[16/9] rounded-lg overflow-hidden border border-gray-400 dark:border-gray-600 shadow-lg">
                        <img 
                            src={currentSlide.image || `https://placehold.co/600x450/4f46e5/ffffff?text=Slide+${currentIndex+1}+Mockup`} 
                            alt={currentSlide.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x450/4f46e5/ffffff?text=Image+Not+Available" }}
                        />
                    </div>
                </div>
            </div>
            <div className="absolute top-1/1.1 left-0 right-0 transform -translate-y-1/2 flex justify-between px-4">
                <button
                    onClick={goToPrevious}
                    className="p-3 rounded-full bg-indigo-600/90 text-white shadow-xl backdrop-blur-sm hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous slide"
                >
                    <ArrowLeft />
                </button>
                <button
                    onClick={goToNext}
                    className="p-3 rounded-full bg-indigo-600/90 text-white shadow-xl backdrop-blur-sm hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next slide"
                >
                    <ArrowRight />
                </button>
            </div>
            <div className="p-3 flex justify-center space-x-2 bg-gray-200 dark:bg-gray-800 border-t dark:border-gray-700">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex ? 'bg-indigo-600 w-6' : 'bg-gray-400 hover:bg-gray-500'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    const modalRef = useRef(null);
    useEffect(() => {
        if (typeof window.gsap !== 'undefined' && modalRef.current) {
            window.gsap.fromTo(modalRef.current, 
                { opacity: 0, scale: 0.9 }, 
                { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }, [project]);


    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl transition-opacity duration-300"
            style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
            onClick={onClose} 
        >
            <div 
                ref={modalRef}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto transform transition-all duration-300 border border-indigo-500"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start border-b pb-3 mb-6 border-gray-200 dark:border-gray-700">
                        <div>
                            <h3 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{project.title}</h3>
                            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 uppercase">{project.type}</p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 leading-none transition-transform duration-200 hover:rotate-90"
                            aria-label="Close modal"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="mb-8">
                        {project.slides && project.slides.length > 0 ? (
                            <ProjectCarousel slides={project.slides} />
                        ) : (
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                    {project.description}
                                </p>
                                <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200">
                                     *โครงการนี้ไม่มีสไลด์รายละเอียดเพิ่มเติมแสดงในรูปแบบ Carousel แต่มีรายละเอียดอยู่ที่ Description ด้านบน
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="space-y-4 border-t pt-6 border-gray-200 dark:border-gray-700">
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">ทักษะที่ใช้ (Skills Used)</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.skills.map((skill, i) => (
                                    <span 
                                        key={i} 
                                        className="px-3 py-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full shadow-md"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectsSection = () => {
    const projectssectionCardRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const scrolltotopButtonRef = useRef(null);

    useEffect(() => {
        const buttonElement = document.getElementById("scroll-to-top-button");
        if (buttonElement) {
            scrolltotopButtonRef.current = buttonElement;
        }
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    const handleViewProject = useCallback((project) => {
  setSelectedProject(project);
  setIsModalOpen(true);
  if (scrolltotopButtonRef.current) {
    scrolltotopButtonRef.current.style.display = 'none';
  }
}, []);
            
 const handleCloseModal = useCallback(() => {
  setIsModalOpen(false);
  setSelectedProject(null);
  if (scrolltotopButtonRef.current) {
    scrolltotopButtonRef.current.style.display = 'block';
  }
}, []);
  useEffect(() => {
    if (!projectssectionCardRef.current) return;
    const cardChildren = projectssectionCardRef.current.querySelectorAll('.projects-section');

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
          trigger: projectssectionCardRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
const projectsData = [
    {
      title: "Frontend (ฝึกงาน): ระบบลงทะเบียนสมัครสอบ กพ.",
      type: "เมื่อเดือน มกราคม ปี 2564 ถึง มิถุนายน ปี 2564",
      description: "พัฒนาระบบลงทะเบียนสมัครสอบของสำนักงานคณะกรรมการข้าราชการพลเรือน (กพ.) โดยใช้ HTML, CSS และ JavaScript เพื่อสร้างหน้าเว็บที่ใช้งานง่ายและตอบสนองได้ดี จัดการฟอร์มลงทะเบียนและการตรวจสอบข้อมูลผู้ใช้",
      skills: ["HTML", "CSS", "USE CASE DIAGRAM", "JavaScript"],
      link: "#",
      slides: [
        {
            image: "/Examapplicationsystem/15.jpg"
        },
        {
            image: "/Examapplicationsystem/16.jpg"
        },
        {
            image: "/Examapplicationsystem/17.jpg"
        },
        {
            image: "/Examapplicationsystem/18.jpg"
        },
        {
            image: "/Examapplicationsystem/19.jpg"
        },
        {
            image: "/Examapplicationsystem/20.jpg"
        },
        {
            image: "/Examapplicationsystem/21.jpg"
        },
        {
            image: "/Examapplicationsystem/22.jpg"
        },
        {
            image: "/Examapplicationsystem/23.jpg"
        },
        {
            image: "/Examapplicationsystem/24.jpg"
        },
        {
            image: "/Examapplicationsystem/25.jpg"
        },
        {
            image: "/Examapplicationsystem/26.jpg"
        },
        {
            image: "/Examapplicationsystem/27.jpg"
        },
        {
            image: "/Examapplicationsystem/28.jpg"
        },
        {
            image: "/Examapplicationsystem/29.jpg"
        },
        {
            image: "/Examapplicationsystem/30.jpg"
        },
        {
            image: "/Examapplicationsystem/31.jpg"
        },
        {
            image: "/Examapplicationsystem/32.jpg"
        },
      ]
    },
    {
      title: "Frontend (ฝึกงาน): แอพพลิเคชั่น MAXME",
      type: "เมื่อเดือน มกราคม ปี 2565 ถึง มีนาคม ปี 2565",
      description: "พัฒนาแอพพลิเคชั่น MAXME ในบริษัท แมกซ์ มี คอร์ป จำกัด ให้กับ บริษัท พีทีจี เอ็นเนอยี จำกัด (มหาชน) โดยใช้ HTML, CSS และ JavaScript เพื่อปรับปรุงประสบการณ์ผู้ใช้และเพิ่มประสิทธิภาพการทำงานของแอพพลิเคชั่น",
      skills: ["HTML", "CSS", "Fixed Bug", "Blockchain"],
      link: "#",
      slides: [
        {
            image: "/MaxME/1.jpg"
        },
        {
            image: "/MaxME/2.jpg"
        },
        {
            image: "/MaxME/3.jpg"
        },
        {
            image: "/MaxME/4.jpg"
        },
        {
            image: "/MaxME/5.jpg"
        },
        {
            image: "/MaxME/6.jpg"
        },
        {
            image: "/MaxME/7.jpg"
        },
        {
            image: "/MaxME/8.jpg"
        },
        {
            image: "/MaxME/9.jpg"
        },
        {
            image: "/MaxME/10.jpg"
        },
        {
            image: "/MaxME/11.jpg"
        },
        {
            image: "/MaxME/12.jpg"
        },
        {
            image: "/MaxME/13.jpg"
        },
      ]
    },
    {
      title: "IT Support & Infrastructure",
      type: "เมื่อเดือน กันยายน ปี 2565 ถึง มิถุนายน ปี 2566",
      description: "ดูแลระบบเครือข่ายและอุปกรณ์คอมพิวเตอร์ในองค์กร ให้คำปรึกษาและแก้ไขปัญหาทางเทคนิคแก่พนักงาน รวมถึงติดตั้งและอัปเดตซอฟต์แวร์เพื่อให้ระบบทำงานได้อย่างราบรื่น ซ่อมบำรุงรักษาอุปกรณ์ฮาร์ดแวร์ และจัดการสำรองข้อมูลอย่างสม่ำเสมอ",
      skills: ["Networking Fundamentals", "System & Infrastructure Management", "Troubleshooting"],
      link: "#",
      slides: []
    },
    {
      title: "Pre-sale Engineer (CCTV & VMS Solutions)",
      type: "เมื่อเดือน กรกฎาคม ปี 2566 ถึง ปัจจุบัน",
      description: "รับฟังและทำความเข้าใจปัญหาและความต้องการทางธุรกิจของลูกค้า จัดการสาธิตหรือการทดสอบผลิตภัณฑ์ เพื่อแสดงให้เห็นถึงคุณสมบัติและประโยชน์ของโซลูชันที่นำเสนอ ทำงานร่วมกับฝ่ายขายและแผนกอื่นๆ เพื่อให้แน่ใจว่าโซลูชันที่นำเสนอมีความสมจริงและสามารถติดตั้งได้",
      skills: ["CCTV & Security Systems", "Video Management System (VMS)", "Network & Storage", "Tools & Documentation"],
      link: "#",
      slides: []
    },
  ];

  return (
    <>
    <div
      ref={projectssectionCardRef}
      className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <section
        id="my-work"
        className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-indigo-700 dark:text-indigo-400 projects-section">
          My Work & Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border-b-4 border-blue-500 dark:border-blue-400 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 my-1 projects-section">
                  {project.title}
                </h3>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase projects-section">
                  {project.type}
                </span>
                <p className="text-gray-600 dark:text-gray-300 mb-4 projects-section">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg projects-section"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button 
                    onClick={() => handleViewProject(project)} 
                    className="inline-block px-1 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition duration-150 projects-section"
                  >
                   View Project Details 📂
                  </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
        {isModalOpen && <ProjectModal project={selectedProject} onClose={handleCloseModal} />}
    </>
  );
};

export default ProjectsSection;