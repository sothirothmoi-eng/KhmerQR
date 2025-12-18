import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const toggleLang = () => {
    setLang(lang === 'km' ? 'en' : 'km');
  };

  const navLinks = [
    { href: '#qr-tool', label: t.nav_home },
    { href: '#apps', label: t.nav_apps },
    { href: '#contact', label: t.nav_contact },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Find the element by ID
    const element = document.querySelector(href);
    if (element) {
      // Offset for fixed header (80px is approx header height)
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      // Smooth scroll via JavaScript
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const FlagKH = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24" className="w-8 h-6 rounded shadow-sm object-cover border border-gray-100">
      <rect width="32" height="24" fill="#032ea4"/>
      <rect y="6" width="32" height="12" fill="#e00025"/>
      {/* Angkor Wat Silhouette */}
      <path d="M16 8l-2 4h-2l-1.5 3.5h11L20 12h-2l-2-4z M9 15.5h14v1H9z" fill="#fff"/> 
      <path d="M16 8.5 L14.5 11.5 H17.5 Z M12.5 12.5 L11.5 15 H13.5 Z M19.5 12.5 L20.5 15 H18.5 Z" fill="#fff"/>
      <path d="M7 16h18v1H7z" fill="#fff"/>
    </svg>
  );

  const FlagUS = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24" className="w-8 h-6 rounded shadow-sm object-cover border border-gray-100">
      <rect width="32" height="24" fill="#b22234"/>
      <path d="M0 3h32M0 7h32M0 11h32M0 15h32M0 19h32M0 23h32" stroke="#fff" strokeWidth="2"/>
      <rect width="14" height="13" fill="#3c3b6e"/>
      <g fill="#fff">
        <text x="1" y="4" fontSize="3">★</text>
        <text x="4" y="4" fontSize="3">★</text>
        <text x="7" y="4" fontSize="3">★</text>
        <text x="10" y="4" fontSize="3">★</text>
      </g>
    </svg>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-lg flex items-center justify-center shadow-indigo-200 dark:shadow-none shadow-lg">
              <span className="text-white font-bold text-lg">QR</span>
            </div>
            <span className={`font-bold text-xl text-gray-800 dark:text-white ${lang === 'km' ? 'font-khmer' : ''}`}>
              KhmerQR
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium text-sm lg:text-base ${lang === 'km' ? 'font-khmer' : ''}`}
              >
                {link.label}
              </a>
            ))}
            
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={lang === 'km' ? 'Switch to English' : 'ប្តូរទៅភាសាខ្មែរ'}
              >
                {lang === 'km' ? <FlagKH /> : <FlagUS />}
              </button>
            </div>
          </div>

          {/* Mobile menu button & Controls */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

             <button 
              onClick={toggleLang}
              className="p-1 rounded-md"
            >
              {lang === 'km' ? <FlagKH /> : <FlagUS />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 ${lang === 'km' ? 'font-khmer' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
