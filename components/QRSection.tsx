import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { Upload, Download, QrCode, Image as ImageIcon, Link as LinkIcon, Square, Circle, Grid } from 'lucide-react';
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

  // Helper to draw rounded rectangles
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

      // Create QR data manually to get modules
      // @ts-ignore - qrcode types might not expose create perfectly in all environments but it exists
      const qrData = QRCode.create(url, { 
        errorCorrectionLevel: 'H',
        version: undefined 
      });
      
      const moduleCount = qrData.modules.size;
      const size = 300; // Fixed canvas size
      const margin = 20;
      const availableSize = size - (margin * 2);
      const cellSize = availableSize / moduleCount;

      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Set dimensions
      canvas.width = size;
      canvas.height = size;

      // Fill Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      // Draw Modules
      ctx.fillStyle = '#000000';
      
      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          // Check if module is dark
          if (qrData.modules.get(row, col)) {
            const x = margin + (col * cellSize);
            const y = margin + (row * cellSize);

            if (qrStyle === 'dots') {
              // Draw Circle
              const radius = cellSize / 2;
              ctx.beginPath();
              ctx.arc(x + radius, y + radius, radius * 0.9, 0, Math.PI * 2);
              ctx.fill();
            } else if (qrStyle === 'rounded') {
              // Draw Rounded Square
              drawRoundedRect(ctx, x, y, cellSize, cellSize, cellSize * 0.4);
            } else {
              // Draw Square (Default)
              // Add slight overlap to prevent subpixel white lines
              ctx.fillRect(x, y, cellSize + 0.5, cellSize + 0.5); 
            }
          }
        }
      }

      // Draw Logo if active
      if (activeTab === 'logo' && logo) {
        const img = new Image();
        img.src = logo;
        await new Promise((resolve) => { img.onload = resolve; });
        
        const logoSize = 60;
        const x = (size - logoSize) / 2;
        const y = (size - logoSize) / 2;

        // Draw white background container for logo
        ctx.fillStyle = '#ffffff';
        drawRoundedRect(ctx, x - 5, y - 5, logoSize + 10, logoSize + 10, 10);
        
        // Save context for clipping
        ctx.save();
        // Create clipping region for logo
        ctx.beginPath();
        // Standard rounded rect path for clip
        const r = 8;
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + logoSize, y, x + logoSize, y + logoSize, r);
        ctx.arcTo(x + logoSize, y + logoSize, x, y + logoSize, r);
        ctx.arcTo(x, y + logoSize, x, y, r);
        ctx.arcTo(x, y, x + logoSize, y, r);
        ctx.closePath();
        ctx.clip();
        
        // Draw image
        ctx.drawImage(img, x, y, logoSize, logoSize);
        ctx.restore();
      }
    } catch (err) {
      console.error("QR Generation Error:", err);
    }
  };

  // Auto-generate when inputs change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (url) generateQR();
    }, 300);
    return () => clearTimeout(timer);
  }, [url, logo, activeTab, qrStyle]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'khmer-qr-code.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <section id="qr-tool" className="pt-28 pb-10 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div 
        ref={ref}
        className={`container max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center fade-up ${isInView ? 'visible' : ''}`}
      >
        {/* Left: Controls */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight ${isKhmer ? 'font-khmer' : ''}`}>
              {t.hero_title}
            </h1>
            <p className={`text-lg text-gray-600 dark:text-gray-300 ${isKhmer ? 'font-khmer' : ''}`}>
              {t.hero_subtitle}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors">
            {/* Tabs */}
            <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-xl mb-6">
              <button
                onClick={() => setActiveTab('simple')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'simple' ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                } ${isKhmer ? 'font-khmer' : ''}`}
              >
                <QrCode size={18} />
                {t.tab_simple}
              </button>
              <button
                onClick={() => setActiveTab('logo')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'logo' ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                } ${isKhmer ? 'font-khmer' : ''}`}
              >
                <ImageIcon size={18} />
                {t.tab_logo}
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-6">
              {/* URL Input */}
              <div className="space-y-2">
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${isKhmer ? 'font-khmer' : ''}`}>
                  {t.label_url}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t.placeholder_url}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-gray-50 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Pattern Selection */}
              <div className="space-y-2">
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${isKhmer ? 'font-khmer' : ''}`}>
                  {t.label_style}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setQrStyle('square')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      qrStyle === 'square' 
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 ring-1 ring-indigo-600' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="w-8 h-8 bg-current rounded-sm mb-2"></div>
                    <span className={`text-xs font-medium ${isKhmer ? 'font-khmer' : ''}`}>{t.style_square}</span>
                  </button>

                  <button
                    onClick={() => setQrStyle('dots')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      qrStyle === 'dots' 
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 ring-1 ring-indigo-600' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="w-8 h-8 bg-current rounded-full mb-2"></div>
                    <span className={`text-xs font-medium ${isKhmer ? 'font-khmer' : ''}`}>{t.style_dots}</span>
                  </button>
                  
                  <button
                    onClick={() => setQrStyle('rounded')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      qrStyle === 'rounded' 
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 ring-1 ring-indigo-600' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="w-8 h-8 bg-current rounded-lg mb-2"></div>
                    <span className={`text-xs font-medium ${isKhmer ? 'font-khmer' : ''}`}>{t.style_rounded}</span>
                  </button>
                </div>
              </div>

              {/* Logo Upload (Conditional) */}
              {activeTab === 'logo' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${isKhmer ? 'font-khmer' : ''}`}>
                    {t.label_logo}
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {logo ? (
                         <div className="relative">
                           <img src={logo} alt="Selected logo" className="h-16 w-16 object-contain mb-2 shadow-sm rounded-lg" />
                           <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs">
                             Change
                           </div>
                         </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mb-3 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 transition-colors" />
                          <p className={`text-sm text-gray-500 dark:text-gray-400 ${isKhmer ? 'font-khmer' : ''}`}>{t.label_logo}</p>
                        </>
                      )}
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                </div>
              )}

              <button
                onClick={generateQR}
                className={`w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:translate-y-[-2px] mt-2 ${isKhmer ? 'font-khmer' : ''}`}
              >
                {t.btn_generate}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 transform transition-transform hover:scale-[1.02] duration-300">
             {/* Canvas Container */}
             <div className="bg-white rounded-2xl overflow-hidden" style={{ width: '300px', height: '300px' }}>
                {!url ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                    <QrCode size={64} className="opacity-20 mb-4" />
                    <p className={`text-sm opacity-60 ${isKhmer ? 'font-khmer' : ''}`}>
                      Preview Area
                    </p>
                  </div>
                ) : null}
                <canvas ref={canvasRef} className={!url ? 'hidden' : 'block'} />
             </div>
          </div>

          {url && (
            <button
              onClick={downloadQR}
              className={`flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-full font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-indigo-300 transition-colors ${isKhmer ? 'font-khmer' : ''}`}
            >
              <Download size={18} />
              {t.btn_download}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QRSection;