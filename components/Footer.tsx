import React from 'react';
import { Heart } from 'lucide-react';
import { Translations } from '../types';

interface FooterProps {
  t: Translations;
  isKhmer: boolean;
}

const Footer: React.FC<FooterProps> = ({ t, isKhmer }) => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
          <span className={isKhmer ? 'font-khmer' : ''}>{t.footer_text}</span>
          <Heart size={16} className="text-red-500 fill-red-500" />
          <span className="font-bold text-gray-800 dark:text-gray-200">KhmerQR</span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;