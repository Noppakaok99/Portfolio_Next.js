'use client';
import React from 'react';

const SectionDivider = ({ className = '' }) => {
    return (
        <div className={`bg-gray-50 dark:bg-gray-900 w-full flex justify-center items-center py-8 ${className}`}>
            <div 
                className="w-1/4 h-1 rounded-full 
                           bg-gradient-to-r from-transparent 
                           via-gray-300 dark:via-gray-600 
                           to-gray-300 dark:to-gray-600 // 💡 จบด้วยสีทึบ (แทนที่โปร่งใส)
                           opacity-75 transition-all duration-300"
            />
            <div 
                className="w-4 h-4 rounded-full mx-4 // 💡 mx-4: ช่องว่างระหว่างเส้นกับวงกลม
                           bg-indigo-500 dark:bg-indigo-400 // 💥 สีเน้นของวงกลม
                           shadow-md shadow-indigo-500/50 dark:shadow-indigo-400/50 // เพิ่มเงาเล็กน้อย
                           transition-all duration-300 flex-shrink-0"
            />
            <div 
                className="w-1/4 h-1 rounded-full 
                           bg-gradient-to-l from-transparent 
                           via-gray-300 dark:via-gray-600 
                           to-gray-300 dark:to-gray-600 // 💡 จบด้วยสีทึบ (แทนที่โปร่งใส)
                           opacity-75 transition-all duration-300"
            />
        </div>
    );
};

export default SectionDivider;
