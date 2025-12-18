export type Language = 'km' | 'en';

export interface Translations {
  nav_home: string;
  nav_apps: string;
  nav_contact: string;
  
  hero_title: string;
  hero_subtitle: string;
  
  tab_simple: string;
  tab_logo: string;
  
  label_url: string;
  placeholder_url: string;
  label_logo: string;
  
  label_style: string;
  style_square: string;
  style_dots: string;
  style_rounded: string;
  
  btn_generate: string;
  btn_download: string;
  
  apps_title: string;
  apps_subtitle: string;
  
  contact_title: string;
  contact_subtitle: string;
  contact_name: string;
  contact_email: string;
  contact_message: string;
  contact_submit: string;
  contact_sending: string;
  contact_success: string;
  contact_error: string;
  
  placeholder_name: string;
  placeholder_email: string;
  placeholder_message: string;
  
  footer_text: string;
}

export interface AppShowcaseItem {
  id: string;
  titleEn: string;
  titleKm: string;
  descriptionEn: string;
  descriptionKm: string;
  iconName: 'ScanEye' | 'FileText' | 'Mic' | 'Volume2' | 'PenTool';
  color: string;
  gradient: string;
}
