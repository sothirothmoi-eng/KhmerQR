import React, { useRef } from 'react';
import { ScanEye, FileText, Mic, Volume2, PenTool, ArrowRight } from 'lucide-react';
import { AppShowcaseItem, Translations } from '../types';
import { useInView } from '../hooks/useInView';

interface AppsSectionProps {
  t: Translations;
  apps: AppShowcaseItem[];
  isKhmer: boolean;
}

const iconMap = {
  ScanEye: ScanEye,
  FileText: FileText,
  Mic: Mic,
  Volume2: Volume2,
  PenTool: PenTool,
};

const AppsSection: React.FC<AppsSectionProps> = ({ t, apps, isKhmer }) => {
  const { ref, isInView } = useInView();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Looping scroll logic
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 340; // Approx card width
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (direction === 'right') {
        // If we are near the end, loop back to start
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        // If we are near the start, loop to end
        if (container.scrollLeft <= 10) {
          container.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section id="apps" className="py-8 bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50 dark:bg-indigo-950/20 rounded-l-full blur-3xl opacity-60 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-50 dark:bg-blue-950/20 rounded-t-full blur-3xl opacity-60 -z-10"></div>

      <div 
        ref={ref}
        className={`container max-w-full mx-auto px-4 fade-up ${isInView ? 'visible' : ''}`}
      >
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-10 px-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <h2 className={`text-4xl font-bold text-gray-900 dark:text-white mb-4 ${isKhmer ? 'font-khmer' : ''}`}>
              {t.apps_title}
            </h2>
            <p className={`text-gray-600 dark:text-gray-400 text-lg ${isKhmer ? 'font-khmer' : ''}`}>
              {t.apps_subtitle}
            </p>
          </div>
          
          {/* Navigation Buttons (Visible on Mobile too) */}
          <div className="flex gap-3 mt-4 md:mt-0">
             <button 
                onClick={() => handleScroll('left')}
                className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transition-all dark:text-white"
             >
               ←
             </button>
             <button 
                onClick={() => handleScroll('right')}
                className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-200 hover:shadow-lg transition-all"
             >
               →
             </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-12 px-4 md:px-8 max-w-[100vw] snap-x snap-mandatory no-scrollbar"
        >
          {apps.map((app, index) => {
            const Icon = iconMap[app.iconName];
            return (
              <div 
                key={app.id} 
                className="snap-center shrink-0 w-[300px] md:w-[380px] h-[450px] relative group"
              >
                {/* Card */}
                <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-3xl p-8 flex flex-col justify-between shadow-sm group-hover:shadow-2xl group-hover:translate-y-[-5px] transition-all duration-500">
                  
                  {/* Top: Icon & Badge */}
                  <div>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center mb-8 shadow-lg text-white transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                      <Icon size={32} />
                    </div>
                    
                    <h3 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight ${isKhmer ? 'font-khmer' : ''}`}>
                      {isKhmer ? app.titleKm : app.titleEn}
                    </h3>
                    
                    <p className={`text-gray-600 dark:text-gray-300 leading-relaxed ${isKhmer ? 'font-khmer' : ''}`}>
                      {isKhmer ? app.descriptionKm : app.descriptionEn}
                    </p>
                  </div>

                  {/* Bottom: Action */}
                  <div className="pt-6 border-t border-gray-100 dark:border-gray-700/50">
                    <a href="#" className={`inline-flex items-center gap-2 font-semibold ${app.color} group-hover:gap-3 transition-all`}>
                      {isKhmer ? 'សាកល្បងឥឡូវនេះ' : 'Try it now'} 
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
                
                {/* Glow Effect behind card */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${app.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
              </div>
            );
          })}
          
          {/* Spacer for right padding */}
          <div className="w-4 shrink-0"></div>
        </div>
      </div>
    </section>
  );
};

export default AppsSection;