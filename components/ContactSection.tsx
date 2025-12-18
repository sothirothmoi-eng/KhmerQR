import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Mail, User, MessageSquare, ExternalLink } from 'lucide-react';
import { Translations } from '../types';
import { useInView } from '../hooks/useInView';

interface ContactSectionProps {
  t: Translations;
  isKhmer: boolean;
}

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

// Your verified Formspree ID
const FORM_ENDPOINT = 'https://formspree.io/f/mlgreegd'; 

const ContactSection: React.FC<ContactSectionProps> = ({ t, isKhmer }) => {
  const { ref, isInView } = useInView();
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('_subject', '🚀 New Inquiry from KhmerQR');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900 transition-colors">
      <div 
        ref={ref}
        className={`container max-w-4xl mx-auto px-4 reveal ${isInView ? 'visible' : ''}`}
      >
        <div className="text-center mb-16 space-y-4">
          <h2 className={`text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white ${isKhmer ? 'font-khmer' : ''}`}>
            {t.contact_title}
          </h2>
          <p className={`text-gray-600 dark:text-gray-400 text-xl max-w-2xl mx-auto ${isKhmer ? 'font-khmer' : ''}`}>
            {t.contact_subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Info Card - The design you liked */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8 bg-indigo-600 rounded-[2rem] text-white shadow-2xl shadow-indigo-500/20">
              <h3 className={`text-2xl font-bold mb-6 ${isKhmer ? 'font-khmer' : ''}`}>
                {isKhmer ? 'ព័ត៌មានបន្ថែម' : 'Quick Connect'}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className={`text-indigo-100 text-sm ${isKhmer ? 'font-khmer' : ''}`}>{isKhmer ? 'ផ្ញើអ៊ីមែល' : 'Email us'}</p>
                    <a href="mailto:sothiroth.moi@gmail.com" className="font-bold hover:underline break-all">sothiroth.moi@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <p className={`text-indigo-100 text-sm ${isKhmer ? 'font-khmer' : ''}`}>{isKhmer ? 'តេឡេក្រាម' : 'Telegram'}</p>
                    <a href="https://t.me/sothiroth" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline flex items-center gap-1">
                      t.me/sothiroth
                      <ExternalLink size={14} className="opacity-70" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem]">
               <p className={`text-gray-500 dark:text-gray-400 text-sm italic ${isKhmer ? 'font-khmer' : ''}`}>
                 {isKhmer ? '* សាររបស់អ្នកនឹងត្រូវបញ្ជូនដោយផ្ទាល់ទៅកាន់អ្នកបង្កើតតាមរយៈប្រព័ន្ធសុវត្ថិភាព។' : '* Your message will be securely transmitted directly to the developer.'}
               </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-3 bg-gray-50 dark:bg-gray-800/50 p-8 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className={`block text-sm font-bold text-gray-700 dark:text-gray-300 ${isKhmer ? 'font-khmer' : ''}`}>
                  {t.contact_name}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    required type="text" name="Name" placeholder={t.placeholder_name} disabled={status === 'sending'}
                    className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all dark:text-white disabled:opacity-50 ${isKhmer ? 'font-khmer' : ''}`}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className={`block text-sm font-bold text-gray-700 dark:text-gray-300 ${isKhmer ? 'font-khmer' : ''}`}>
                  {t.contact_email}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    required type="text" name="Contact" placeholder={t.placeholder_email} disabled={status === 'sending'}
                    className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all dark:text-white disabled:opacity-50 ${isKhmer ? 'font-khmer' : ''}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-bold text-gray-700 dark:text-gray-300 ${isKhmer ? 'font-khmer' : ''}`}>
                  {t.contact_message}
                </label>
                <textarea
                  required name="Message" rows={4} placeholder={t.placeholder_message} disabled={status === 'sending'}
                  className={`w-full px-4 py-4 bg-white dark:bg-gray-900 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all resize-none dark:text-white disabled:opacity-50 ${isKhmer ? 'font-khmer' : ''}`}
                ></textarea>
              </div>

              <button
                type="submit" disabled={status === 'sending'}
                className={`w-full relative group bg-gray-900 dark:bg-indigo-600 hover:bg-black dark:hover:bg-indigo-700 text-white font-extrabold py-5 rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-3 ${isKhmer ? 'font-khmer' : ''}`}
              >
                {status === 'sending' ? (
                  <><Loader2 size={22} className="animate-spin" /> {t.contact_sending}</>
                ) : (
                  <><Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> {t.contact_submit}</>
                )}
              </button>

              {status === 'success' && (
                <div className={`p-5 bg-emerald-50 dark:bg-emerald-900/30 border-2 border-emerald-100 dark:border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 animate-in fade-in slide-in-from-top-4 ${isKhmer ? 'font-khmer' : ''}`}>
                  <CheckCircle size={24} /> {t.contact_success}
                </div>
              )}

              {status === 'error' && (
                <div className={`p-5 bg-rose-50 dark:bg-rose-900/30 border-2 border-rose-100 dark:border-rose-800 rounded-2xl flex items-center gap-3 text-rose-700 dark:text-rose-400 animate-in fade-in slide-in-from-top-4 ${isKhmer ? 'font-khmer' : ''}`}>
                  <AlertCircle size={24} /> {t.contact_error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
