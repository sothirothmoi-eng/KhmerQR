import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import QRSection from './components/QRSection';
import AppsSection from './components/AppsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { Language } from './types';
import { TRANSLATIONS, APPS_LIST } from './constants';

function App() {
  const [lang, setLang] = useState<Language>('km');
  const [darkMode, setDarkMode] = useState(false);
  
  const t = TRANSLATIONS[lang];
  const isKhmer = lang === 'km';

  // Toggle dark mode class on html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-slate-800 dark:text-gray-100 transition-colors duration-300">
      <Navbar lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main>
        <QRSection t={t} isKhmer={isKhmer} />
        <AppsSection t={t} apps={APPS_LIST} isKhmer={isKhmer} />
        <ContactSection t={t} isKhmer={isKhmer} />
      </main>

      <Footer t={t} isKhmer={isKhmer} />
    </div>
  );
}

export default App;