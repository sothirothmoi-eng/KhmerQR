import { AppShowcaseItem, Translations } from './types';

export const TRANSLATIONS: Record<'km' | 'en', Translations> = {
  km: {
    nav_home: 'បង្កើត QR',
    nav_apps: 'កម្មវិធីផ្សេងទៀត',
    nav_contact: 'ទំនាក់ទំនង',
    
    hero_title: 'បង្កើត QR Code ងាយៗ',
    hero_subtitle: 'ដំណោះស្រាយសម្រាប់ការងារ អាជីវកម្ម និងការប្រើប្រាស់ផ្ទាល់ខ្លួន',
    
    tab_simple: 'QR ធម្មតា',
    tab_logo: 'QR មានរូប Logo',
    
    label_url: 'ដាក់តំណភ្ជាប់ (Link) នៅទីនេះ',
    placeholder_url: 'https://...',
    label_logo: 'ដាក់រូប Logo របស់អ្នក (ចុចទីនេះ)',
    
    label_style: 'ជ្រើសរើសម៉ូត QR',
    style_square: 'ជ្រុង',
    style_dots: 'ចំណុច',
    style_rounded: 'មូល',
    
    btn_generate: 'បង្កើត QR Code',
    btn_download: 'រក្សាទុកជារូបភាព',
    
    apps_title: 'កម្មវិធីឆ្លាតវៃរបស់យើង',
    apps_subtitle: 'បច្ចេកវិទ្យា AI ដែលជួយសម្រួលការរស់នៅប្រចាំថ្ងៃរបស់អ្នក',
    
    contact_title: 'ទំនាក់ទំនងមកយើង',
    contact_subtitle: 'ចង់បង្កើតកម្មវិធី ឬមានចម្ងល់បន្ថែម?',
    contact_name: 'ឈ្មោះ',
    contact_email: 'ទំនាក់ទំនង',
    contact_message: 'សារ',
    contact_submit: 'ផ្ញើសារ',
    contact_sending: 'កំពុងផ្ញើ...',
    contact_success: 'សាររបស់អ្នកត្រូវបានផ្ញើជូនរួចរាល់ហើយ!',
    contact_error: 'មានបញ្ហាបន្តិចបន្តួច សូមព្យាយាមម្តងទៀត។',

    placeholder_name: 'សរសេរឈ្មោះនៅទីនេះ...',
    placeholder_email: 'សរសេរលេខទូរស័ព្ទ ឬ អ៊ីមែល...',
    placeholder_message: 'សរសេរខ្លឹមសារដែលចង់សួរ...',
    
    footer_text: 'បង្កើតឡើងដោយកូនខ្មែរ លោក សុធិរ័ត្ន',
  },
  en: {
    nav_home: 'QR Tool',
    nav_apps: 'Our Apps',
    nav_contact: 'Contact',
    
    hero_title: 'Simple QR Generator',
    hero_subtitle: 'The easiest way to create QR codes for your needs.',
    
    tab_simple: 'Simple QR',
    tab_logo: 'QR with Logo',
    
    label_url: 'Paste your Link (URL)',
    placeholder_url: 'https://...',
    label_logo: 'Upload your Logo',
    
    label_style: 'QR Pattern',
    style_square: 'Square',
    style_dots: 'Dots',
    style_rounded: 'Rounded',
    
    btn_generate: 'Generate QR',
    btn_download: 'Download Image',
    
    apps_title: 'Our Smart Apps',
    apps_subtitle: 'AI technologies designed to make your digital life easier.',
    
    contact_title: 'Get in Touch',
    contact_subtitle: 'Interested in a custom app or have questions?',
    contact_name: 'Name',
    contact_email: 'Contact',
    contact_message: 'Message',
    contact_submit: 'Send Message',
    contact_sending: 'Sending...',
    contact_success: 'Your message has been sent successfully!',
    contact_error: 'Something went wrong. Please try again.',

    placeholder_name: 'Enter your name here...',
    placeholder_email: 'Enter phone or email...',
    placeholder_message: 'How can we help you?',
    
    footer_text: 'Developed by Mr. Sothiroth',
  }
};

export const APPS_LIST: AppShowcaseItem[] = [
  {
    id: '1',
    titleEn: 'Khmer AI Truth Lens',
    titleKm: 'កម្មវិធីពិនិត្យការពិត AI',
    descriptionEn: 'A forensic AI-generated image detector built with React and Gemini 3. Supports dual-language for deep analysis of digital artifacts.',
    descriptionKm: 'បច្ចេកវិទ្យា AI សម្រាប់ត្រួតពិនិត្យរូបភាព ដើម្បីដឹងថាជាររូបពិត ឬរូបដែលបង្កើតដោយ AI។',
    iconName: 'ScanEye',
    color: 'text-rose-500',
    gradient: 'from-rose-500 to-orange-500',
  },
  {
    id: '2',
    titleEn: 'Khmer Text Extractor',
    titleKm: 'កម្មវិធីដកស្រង់អក្សរខ្មែរ',
    descriptionEn: 'Extract text from images or documents in Khmer language with high precision using OCR technology.',
    descriptionKm: 'បម្លែងរូបភាពដែលមានអក្សរខ្មែរ ទៅជាអក្សរដែលអាចកែបាន (OCR)។',
    iconName: 'FileText',
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: '3',
    titleEn: 'Khmer Voiceover',
    titleKm: 'កម្មវិធីបញ្ចូលសំឡេងខ្មែរ',
    descriptionEn: 'Convert text to natural-sounding Khmer speech for videos, presentations, and accessibility.',
    descriptionKm: 'បម្លែងអត្ថបទទៅជាសំឡេងនិយាយភាសាខ្មែរបានយ៉ាងធម្មជាតិ។',
    iconName: 'Mic',
    color: 'text-violet-500',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    id: '4',
    titleEn: 'Khmer AI Reader',
    titleKm: 'កម្មវិធីអានអត្ថបទខ្មែរ AI',
    descriptionEn: 'An intelligent AI assistant that reads Khmer text aloud for you, perfect for learning or multitasking.',
    descriptionKm: 'ជំនួយការ AI ដែលអាចអានអត្ថបទខ្មែរឲ្យអ្នកស្តាប់ បានយ៉ាងច្បាស់លាស់។',
    iconName: 'Volume2',
    color: 'text-emerald-500',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: '5',
    titleEn: 'Correcting Khmer Text',
    titleKm: 'កម្មវិធីកែសម្រួលអក្ខរាវិរុទ្ធ',
    descriptionEn: 'Automatically correct grammar, spelling, and sentence structure for professional Khmer writing.',
    descriptionKm: 'ត្រួតពិនិត្យនិងកែសម្រួលអក្ខរាវិរុទ្ធ និងឃ្លាប្រយោគភាសាខ្មែរឲ្យត្រឹមត្រូវ។',
    iconName: 'PenTool',
    color: 'text-amber-500',
    gradient: 'from-amber-500 to-yellow-500',
  }
];
