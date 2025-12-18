import React from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { Translations } from '../types';
import { useInView } from '../hooks/useInView';

interface ContactSectionProps {
  t: Translations;
  isKhmer: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ t, isKhmer }) => {
  const { ref, isInView } = useInView();

  return (
    <section id="contact" className="py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div 
        ref={ref}
        className={`container max-w-2xl mx-auto px-4 fade-up ${isInView ? 'visible' : ''}`}
      >
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-4 ${isKhmer ? 'font-khmer' : ''}`}>
            {t.contact_title}
          </h2>
          <p className={`text-gray-600 dark:text-gray-400 text-lg ${isKhmer ? 'font-khmer' : ''}`}>
            {t.contact_subtitle}
          </p>
        </div>

        {/* Modern Centered Form */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          {/* Subtle Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/30 rounded-bl-full -z-10"></div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isKhmer ? 'font-khmer' : ''}`}>
                  {t.contact_name}
                </label>
                <input
                  type="text"
                  placeholder={t.placeholder_name}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow text-gray-900 dark:text-white placeholder-gray-400 ${isKhmer ? 'font-khmer' : ''}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isKhmer ? 'font-khmer' : ''}`}>
                  {t.contact_email}
                </label>
                <input
                  type="text"
                  placeholder={t.placeholder_email}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow text-gray-900 dark:text-white placeholder-gray-400 ${isKhmer ? 'font-khmer' : ''}`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isKhmer ? 'font-khmer' : ''}`}>
                {t.contact_message}
              </label>
              <textarea
                rows={4}
                placeholder={t.placeholder_message}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow resize-none text-gray-900 dark:text-white placeholder-gray-400 ${isKhmer ? 'font-khmer' : ''}`}
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 ${isKhmer ? 'font-khmer' : ''}`}
            >
              <Send size={18} />
              {t.contact_submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;