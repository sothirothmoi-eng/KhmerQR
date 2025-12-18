import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { Upload, Download, QrCode, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Translations } from '../types';
import { useInView } from '../hooks/useInView';

interface QRSectionProps {
  t: Translations;
  isKhmer: boolean;
}

type Tab = 'simple' | 'logo';
type QRStyle = 'square' | 'dots' | 'rounded';

const QRSection: React.FC<QRSectionProps> = ({ t, isKhmer }) => {
  const { ref, isInView } = useInView();
  const [activeTab, setActiveTab] = useState<Tab>('simple');
  const [url, setUrl] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [qrStyle, setQrStyle] = useState<QRStyle>('square');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();
  };

  const generateQR = async () => {
    if (!url || !canvasRef.current) return;
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const qrData = QRCode.create(url, { errorCorrectionLevel: 'H' });
      const moduleCount = qrData.modules.size;
      const size = 600; 
      const margin = 40;
      const availableSize = size - (margin * 2);
      const cellSize = availableSize / moduleCount;

      canvas.width = size;
      canvas.height = size;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = '#000000';
      
      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (qrData.modules.get(row, col)) {
            const x = margin + (col * cellSize);
            const y = margin + (row * cellSize);
            if (qrStyle === 'dots') {
              const radius = cellSize / 2;
              ctx.beginPath();
              ctx.arc(x + radius, y + radius, radius * 0.9, 0, Math.PI * 2);
              ctx.fill();
            } else if (qrStyle === 'rounded') {
              drawRoundedRect(ctx, x, y, cellSize, cellSize, cellSize * 0.4);
            } else {
              ctx.fillRect(x, y, cellSize + 0.5, cellSize + 0.5); 
            }
          }
        }
      }

      if (activeTab === 'logo' && logo) {
        const img = new Image();
        img.src = logo;
        await new Promise((resolve) => { img.onload = resolve; });
        const logoSize = 120;
        const x = (size - logoSize) / 2;
        const y = (size - logoSize) / 2;
        ctx.fillStyle = '#ffffff';
        drawRoundedRect(ctx, x - 10, y - 10, logoSize + 20, logoSize + 20, 20);
        ctx.save();
        ctx.beginPath();
        const r = 16;
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + logoSize, y, x + logoSize, y + logoSize, r);
        ctx.arcTo(x + logoSize, y + logoSize, x, y + logoSize, r);
        ctx.arcTo(x, y + logoSize, x, y, r);
        ctx.arcTo(x, y, x + logoSize, y, r);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, x, y, logoSize, logoSize);
        ctx.restore();
      }
    } catch (err) {
      console.error("QR Generation Error:", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => { if (url) generateQR(); }, 150);
    return () => clearTimeout(timer);
  }, [url, logo, activeTab, qrStyle]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'Khmer-QR.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <section id="qr-tool" className="pt-24 pb-12 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[100px] float-animation"></div>
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[120px] float-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      <div ref={ref} className={`container max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8 md:gap-16 items-center reveal ${isInView ? 'visible' : ''}`}>
        <div className="space-y-6 md:space-y-10">
          <div className="space-y-3 md:space-y-4 text-center lg:text-left">
            <span className={`inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs tracking-wide ${isKhmer ? 'font-khmer' : ''}`}>
              {isKhmer ? 'បច្ចេកវិទ្យាខ្មែរ' : 'Powered by AI'}
            </span>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight ${isKhmer ? 'font-khmer' : ''}`}>
              {t.hero_title}
            </h1>
            <p className={`text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 ${isKhmer ? 'font-khmer' : ''}`}>
              {t.hero_subtitle}
            </p>
          </div>

          <div className="glass dark:bg-gray-800/80 p-5 md:p-8 rounded-[2rem] shadow-2xl shadow-indigo-200/50 dark:shadow-none border border-white/50 dark:border-gray-700">
            <div className="flex p-1 bg-gray-100 dark:bg-gray-700/50 rounded-2xl mb-6 md:mb-8">
              <button
                onClick={() => setActiveTab('simple')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${activeTab === 'simple' ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-white shadow-lg shadow-indigo-100/50' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'} ${isKhmer ? 'font-khmer' : ''}`}
              >
                <QrCode size={16} /> {t.tab_simple}
              </button>
              <button
                onClick={() => setActiveTab('logo')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${activeTab === 'logo' ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-white shadow-lg shadow-indigo-100/50' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'} ${isKhmer ? 'font-khmer' : ''}`}
              >
                <ImageIcon size={16} /> {t.tab_logo}
              </button>
            </div>

            <div className="space-y-5 md:space-y-6">
              <div className="space-y-2">
                <label className={`block text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 ${isKhmer ? 'font-khmer' : ''}`}>{t.label_url}</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LinkIcon size={18} className="text-indigo-500 group-focus-within:text-indigo-600 transition-colors" />
                  </div>
                  <input
                    type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder={t.placeholder_url}
                    className="block w-full pl-11 pr-4 py-3.5 md:py-4 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all text-sm md:text-base text-gray-900 dark:text-white shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className={`block text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 ${isKhmer ? 'font-khmer' : ''}`}>{t.label_style}</label>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {[
                    { id: 'square', label: t.style_square, icon: 'rounded-sm' },
                    { id: 'dots', label: t.style_dots, icon: 'rounded-full' },
                    { id: 'rounded', label: t.style_rounded, icon: 'rounded-lg' }
                  ].map((style) => (
                    <button
                      key={style.id} onClick={() => setQrStyle(style.id as QRStyle)}
                      className={`flex flex-col items-center p-2.5 md:p-3 rounded-2xl border-2 transition-all ${qrStyle === style.id ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-white' : 'border-gray-100 dark:border-gray-700 hover:border-indigo-300 text-gray-500'}`}
                    >
                      <div className={`w-6 h-6 md:w-8 md:h-8 bg-current ${style.icon} mb-1.5 md:mb-2`}></div>
                      <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${isKhmer ? 'font-khmer' : ''}`}>{style.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'logo' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
                  <label className={`block text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 ${isKhmer ? 'font-khmer' : ''}`}>{t.label_logo}</label>
                  <label className="flex flex-col items-center justify-center w-full h-28 md:h-32 border-2 border-gray-200 dark:border-gray-700 border-dashed rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group">
                    <div className="flex flex-col items-center justify-center">
                      {logo ? (
                        <div className="relative">
                          <img src={logo} alt="Logo" className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-xl shadow-md" />
                          <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-white text-[10px] md:text-xs font-bold">Change</span></div>
                        </div>
                      ) : (
                        <><Upload className="w-6 h-6 md:w-8 md:h-8 mb-1.5 md:mb-2 text-gray-400 group-hover:text-indigo-500" />
                        <p className={`text-[10px] md:text-xs text-gray-500 ${isKhmer ? 'font-khmer' : ''}`}>{t.label_logo}</p></>
                      )}
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="relative group w-full max-w-[360px] flex justify-center">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative w-full bg-white dark:bg-gray-800 p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-white dark:border-gray-700 transform transition-transform lg:hover:scale-[1.02] duration-500">
               <div className="bg-white rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden shadow-inner flex items-center justify-center w-full aspect-square max-w-[320px] mx-auto">
                  {!url ? (
                    <div className="text-center px-6">
                      <QrCode size={64} className="mx-auto text-gray-100 dark:text-gray-700 mb-4" />
                      <p className={`text-xs md:text-sm text-gray-400 font-medium ${isKhmer ? 'font-khmer' : ''}`}>
                        {isKhmer ? 'បញ្ចូលតំណភ្ជាប់ដើម្បីមើល' : 'Enter URL to see preview'}
                      </p>
                    </div>
                  ) : (
                    <canvas ref={canvasRef} className="w-full h-full object-contain p-2 md:p-4" />
                  )}
               </div>
            </div>
          </div>

          {url && (
            <button
              onClick={downloadQR}
              className={`mt-8 md:mt-10 flex items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold shadow-xl hover:shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all text-sm md:text-base ${isKhmer ? 'font-khmer' : ''}`}
            >
              <Download size={20} />
              {t.btn_download}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QRSection;
