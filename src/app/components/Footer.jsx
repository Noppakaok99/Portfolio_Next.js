import React from "react"
// Footer.jsx

const Footer = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <footer>
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-gray-400 dark:text-gray-200">
          &copy; {new Date().getFullYear()} Noppakao Kharanon. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
    </div>
  );
};

export default Footer;