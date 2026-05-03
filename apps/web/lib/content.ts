/**
 * Centralized content data layer.
 * 
 * Currently uses static data but structured for easy migration to:
 * - Database (MongoDB, PostgreSQL, etc.)
 * - Google Sheets / Google Drive JSON
 * - CMS (Sanity, Strapi, Contentful)
 * - Cloud storage (Firebase, Supabase)
 * - External API endpoints
 * 
 * To migrate: replace the static arrays below with fetch() calls
 * to your data source. The TypeScript interfaces stay the same.
 */

// ── Types ──

export interface ImportantWord {
  id: string;
  tai: string;
  english: string;
  assamese?: string;
  pronunciation?: string;
  category?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  date: string;       // ISO date string
  category: 'news' | 'event' | 'announcement' | 'article';
  imageUrl?: string;  // Google Drive link, cloud URL, or local path
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;   // supports: local /images/*, Google Drive, cloud URLs
  category: 'dress' | 'monastery' | 'festival' | 'manuscript' | 'village' | 'food' | 'weaving';
  credit?: string;
}

export interface TimelineEvent {
  id: string;
  era: string;
  year?: number;
  title: string;
  description: string;
  bar: string;
}

export interface Village {
  id: string;
  name: string;
  district: string;
  state: string;
  monastery?: string;
  population?: string;
  lat?: number;
  lng?: number;
  description: string;
}

export interface Phrase {
  id: string;
  tai: string;
  english: string;
  assamese?: string;
  pronunciation?: string;
  category: 'greeting' | 'number' | 'daily' | 'food' | 'nature' | 'family' | 'religion';
  audioUrl?: string;  // Google Drive, cloud, or local
}

export interface Dish {
  id: string;
  name: string;
  taiName?: string;
  description: string;
  ingredients?: string[];
  imageUrl?: string;
  category: 'rice' | 'fish' | 'vegetable' | 'sweet' | 'drink' | 'festival';
}

// ── Data Fetchers ──
// Replace these with API calls when migrating to a database

export async function getImportantWords(): Promise<ImportantWord[]> {
  return IMPORTANT_WORDS;
}

export async function getNews(): Promise<NewsItem[]> {
  return NEWS_ITEMS;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return GALLERY_ITEMS;
}

export async function getTimeline(): Promise<TimelineEvent[]> {
  return TIMELINE_EVENTS;
}

export async function getVillages(): Promise<Village[]> {
  return VILLAGES;
}

export async function getPhrases(): Promise<Phrase[]> {
  return PHRASES;
}

export async function getDishes(): Promise<Dish[]> {
  return DISHES;
}

// ── Static Data (replace with DB/API later) ──

const IMPORTANT_WORDS: ImportantWord[] = [
  { id: 'w1', tai: 'ၶမ်', english: 'Gold', assamese: 'সোণ', pronunciation: 'kham', category: 'noun' },
  { id: 'w2', tai: 'ၼမ်ႉ', english: 'Water', assamese: 'পানী', pronunciation: 'nam', category: 'noun' },
  { id: 'w3', tai: 'မိူင်း', english: 'Country / Kingdom', assamese: 'দেশ', pronunciation: 'mueang', category: 'noun' },
  { id: 'w4', tai: 'ၶဝ်ႈ', english: 'Rice', assamese: 'ভাত', pronunciation: 'khao', category: 'food' },
  { id: 'w5', tai: 'ဝတ်ႉ', english: 'Monastery', assamese: 'মঠ', pronunciation: 'wat', category: 'religion' },
  { id: 'w6', tai: 'ၽြႃး', english: 'Lord Buddha', assamese: 'ভগৱান বুদ্ধ', pronunciation: 'phra', category: 'religion' },
  { id: 'w7', tai: 'မႄႈ', english: 'Mother', assamese: 'মা', pronunciation: 'mae', category: 'family' },
  { id: 'w8', tai: 'ပေႃႈ', english: 'Father', assamese: 'দেউতা', pronunciation: 'pho', category: 'family' },
  { id: 'w9', tai: 'လိၵ်ႈ', english: 'Script / Writing', assamese: 'লিপি', pronunciation: 'lik', category: 'noun' },
  { id: 'w10', tai: 'ၵျွင်း', english: 'Monastery (Kyong)', assamese: 'মন্দিৰ', pronunciation: 'kyong', category: 'religion' },
  { id: 'w11', tai: 'မူး', english: 'Village Head', assamese: 'গাওঁবুঢ়া', pronunciation: 'mu', category: 'social' },
  { id: 'w12', tai: 'ၾႆး', english: 'Fire', assamese: 'জুই', pronunciation: 'fai', category: 'noun' },
  { id: 'w13', tai: 'လိူၼ်', english: 'Moon', assamese: 'চন্দ্ৰ', pronunciation: 'luen', category: 'nature' },
  { id: 'w14', tai: 'ဝၼ်း', english: 'Day / Sun', assamese: 'দিন / সূৰ্য', pronunciation: 'wan', category: 'nature' },
  { id: 'w15', tai: 'ပွႆ', english: 'Festival', assamese: 'উৎসৱ', pronunciation: 'poi', category: 'culture' },
  { id: 'w16', tai: 'သင်ႇၶႃ', english: 'Sangha (Monks)', assamese: 'সংঘ', pronunciation: 'sangkha', category: 'religion' },
];

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Last Guardian of Khamyang: Digital Preservation Efforts',
    summary: 'Bhogeswar Thomung, 84, is the sole proficient speaker. Digital archiving of 650 manuscript leaves underway.',
    url: 'https://www.devdiscourse.com/article/entertainment/3776425-last-guardian-of-khamyang-digital-efforts-to-preserve-endangered-assamese-languages',
    source: 'DevDiscourse',
    date: '2025-01-15',
    category: 'news',
  },
  {
    id: 'n2',
    title: 'Assam Archives Three Endangered Languages',
    summary: 'The Endangered Language Programme digitized Khamyang, Tai Phake, and Singpho records across 8 months.',
    url: 'https://theprint.in/india/assam-archives-three-endangered-languages-as-lone-khamyang-speaker-battles-extinction/2832131/',
    source: 'ThePrint',
    date: '2025-01-10',
    category: 'news',
  },
  {
    id: 'n3',
    title: 'Poi Sangken 2025 — Water Festival Celebrated',
    summary: 'The vibrant Tai New Year water festival was celebrated across Arunachal Pradesh and upper Assam.',
    url: 'https://bharatarticles.com/sangken-2025-a-vibrant-water-festival-celebrated-in-arunachal-pradesh-and-assam/',
    source: 'Bharat Articles',
    date: '2025-04-16',
    category: 'event',
  },
  {
    id: 'n4',
    title: 'First International Tai Youth Festival',
    summary: 'Tai communities from India, Thailand, Myanmar, and China gathered to strengthen cross-border cultural bonds.',
    url: 'https://assamtribune.com/assam/first-international-tai-youth-festival-strengthens-cross-border-cultural-bonds-1565671',
    source: 'Assam Tribune',
    date: '2024-12-20',
    category: 'event',
  },
  {
    id: 'n5',
    title: 'ELAR: Tai Khamyang Oral Literature Documented',
    summary: 'Audio and video recordings of oral traditions deposited by researcher Palash Kumar Nath.',
    url: 'https://elararchive.org/blog/2019/01/17/eldp-project-highlight-documentation-of-the-oral-literature-of-the-tai-khamyang-community-in-upper-assam-india/',
    source: 'ELAR',
    date: '2019-01-17',
    category: 'article',
  },
  {
    id: 'n6',
    title: 'Reviving Heritage, Strengthening Identity',
    summary: 'Government initiative for Tai Khamyang heritage preservation in Arunachal Pradesh.',
    url: 'https://arunachal.mygov.in/group-issue/reviving-heritage-strengthening-identity/',
    source: 'MyGov India',
    date: '2024-06-01',
    category: 'announcement',
  },
];

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', title: 'Poi Sangken Water Festival', description: 'Community members celebrating the Tai New Year with water rituals at the monastery.', imageUrl: '/images/gallery/sangken.jpg', category: 'festival', credit: 'Tai Khamyang Heritage Society' },
  { id: 'g2', title: 'Traditional Handloom Weaving', description: 'A Khamyang woman weaving flower-patterned textiles on a traditional 2-foot handloom.', imageUrl: '/images/gallery/weaving.jpg', category: 'weaving', credit: 'IIAD Documentation' },
  { id: 'g3', title: 'Buddhist Monastery (Kyong)', description: 'Chalapather Buddhist Monastery — over 150 years old, the spiritual center of the community.', imageUrl: '/images/gallery/monastery.jpg', category: 'monastery' },
  { id: 'g4', title: 'Palm Leaf Manuscript', description: 'Sacred text written in Lik Tai script on preserved palm leaves, stored in monastery chests.', imageUrl: '/images/gallery/manuscript.jpg', category: 'manuscript' },
  { id: 'g5', title: 'Traditional Tai Khamyang Dress', description: 'Women wearing Mekhela Sador with the distinctive Nungwat/Riha waist cloth.', imageUrl: '/images/gallery/dress.jpg', category: 'dress' },
  { id: 'g6', title: 'Village Life in Shyam Gaon', description: 'A typical Khamyang village organized around the central kyong with traditional stilt houses.', imageUrl: '/images/gallery/village.jpg', category: 'village' },
  { id: 'g7', title: 'Khaulam — Bamboo Rice', description: 'Sticky rice cooked inside a bamboo hollow, a signature Tai Khamyang dish served during festivals.', imageUrl: '/images/gallery/khaulam.jpg', category: 'food' },
  { id: 'g8', title: 'Mai-Ko-Sum-Phai Fire Festival', description: 'Community gathering around the ceremonial fire on Maghi Purnima, symbolizing impermanence.', imageUrl: '/images/gallery/maikosumphai.jpg', category: 'festival' },
];

const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: 't1', era: '13th Century', year: 1228, title: 'The Great Migration', description: 'Tai groups begin crossing the Patkai Hills from Mong-Mao (Yunnan, China) into the Brahmaputra valley. The Khamyangs settle near Nong Yang Lake.', bar: 'bar-ocean' },
  { id: 't2', era: '14th Century', year: 1350, title: 'Settlement Under Ahom Kingdom', description: 'Khamyangs establish villages in Assam under the Ahom Kingdom. Monasteries (kyong) and Pali schools are founded in each settlement.', bar: 'bar-amber' },
  { id: 't3', era: '1524', year: 1524, title: 'Royal Marriage Alliance', description: 'Swargadeo Chukungmong marries the daughter of the Nora Raja. The Nora Raja is honored with a Khamyang damsel, strengthening ties.', bar: 'bar-rose' },
  { id: 't4', era: '1576', year: 1576, title: 'Second Migration Wave', description: 'Swargadeo Chukhamfa marries a Nora princess. A Nora prince, priest, and 1000 people accompany the princess to Assam.', bar: 'bar-violet' },
  { id: 't5', era: '18th Century', year: 1750, title: 'Patkai to Assam', description: 'Due to conflicts with Kachins and local superstitions about cobras in Nong Yang Lake, the Khamyangs cross the Patkai Hills and settle in Arunachal Pradesh.', bar: 'bar-jade' },
  { id: 't6', era: '19th Century', year: 1826, title: 'British Colonial Period', description: 'Treaty of Yandaboo. British ethnographers document the Khamyang as a distinct Tai group. Community maintains Buddhist identity through colonial changes.', bar: 'bar-fire' },
  { id: 't7', era: '1947', year: 1947, title: 'Post-Independence', description: 'India gains independence. Khamyangs recognized as a Scheduled Tribe. Begin engaging with modern education while preserving traditions.', bar: 'bar-green' },
  { id: 't8', era: '2015', year: 2015, title: 'Language Documentation', description: 'ELAR archives audio/video recordings of Tai Khamyang oral literature. Palash Kumar Nath leads field documentation in Upper Assam.', bar: 'bar-violet' },
  { id: 't9', era: '2025', year: 2025, title: 'Digital Preservation', description: '~7,000 people, fewer than 15 fluent speakers. 650 manuscript leaves digitized. Community Hub launched for heritage preservation.', bar: 'bar-ocean' },
];

const VILLAGES: Village[] = [
  { id: 'v1', name: 'Balijaan Shyam Gaon', district: 'Jorhat', state: 'Assam', monastery: 'Balijaan Vihara', description: 'One of the oldest Khamyang settlements near Titabor.', lat: 26.73, lng: 94.20 },
  { id: 'v2', name: 'Na Shyam Gaon', district: 'Jorhat', state: 'Assam', monastery: 'Na Shyam Gaon Vihara', description: 'Active Pali school and manuscript preservation center.', lat: 26.72, lng: 94.21 },
  { id: 'v3', name: 'Betbari Shyam Gaon (Betoni)', district: 'Jorhat', state: 'Assam', monastery: 'Betbari Kyong', description: 'Home to an elder manuscript collection and traditional weaving.', lat: 26.71, lng: 94.22 },
  { id: 'v4', name: 'Chalapather Shyam Gaon', district: 'Sivasagar', state: 'Assam', monastery: 'Chalapather Buddhist Monastery', population: '~500', description: 'The largest Khamyang settlement with a monastery over 150 years old. Cultural center with Paramita Korea wing.', lat: 26.98, lng: 94.63 },
  { id: 'v5', name: 'Rahan Shyam Gaon', district: 'Sivasagar', state: 'Assam', description: 'Settlement near Sapekhati with close ties to Chalapather.', lat: 26.97, lng: 94.64 },
  { id: 'v6', name: 'Disangpani', district: 'Sivasagar', state: 'Assam', description: 'Riverside settlement known for traditional fishing and rice cultivation.', lat: 26.96, lng: 94.60 },
  { id: 'v7', name: 'Pawaimukh Khamyang Gaon', district: 'Tinsukia', state: 'Assam', monastery: 'Pawaimukh Kyong', population: '~200', description: 'The last village where Khamyang is still spoken by a few elders. Located 7 miles from Margherita.', lat: 27.48, lng: 95.68 },
  { id: 'v8', name: 'Rajmai Shyam Gaon', district: 'Golaghat', state: 'Assam', description: 'Settlement near Sarupathar with links to Tai Aiton community.', lat: 26.38, lng: 93.90 },
  { id: 'v9', name: 'Rajapukhuri Shyam Gaon', district: 'Golaghat', state: 'Assam', description: 'Southern Khamyang settlement in Golaghat district.', lat: 26.37, lng: 93.88 },
  { id: 'v10', name: 'Namsai Settlements', district: 'Namsai', state: 'Arunachal Pradesh', description: 'Small Khamyang families living alongside Tai Khamti communities in eastern Arunachal.', lat: 27.69, lng: 95.87 },
];

const PHRASES: Phrase[] = [
  { id: 'p1', tai: 'သဝၼ်ႇၻီ', english: 'Hello / Greetings', assamese: 'নমস্কাৰ', pronunciation: 'sawadee', category: 'greeting' },
  { id: 'p2', tai: 'ၶွပ်ႇၸႂ်', english: 'Thank you', assamese: 'ধন্যবাদ', pronunciation: 'khop chai', category: 'greeting' },
  { id: 'p3', tai: 'ၵိၼ်ၶဝ်ႈ', english: 'Eat rice (Let\'s eat)', assamese: 'ভাত খাওঁ আহা', pronunciation: 'kin khao', category: 'daily' },
  { id: 'p4', tai: 'ပႆ', english: 'Go', assamese: 'যাওঁ', pronunciation: 'pai', category: 'daily' },
  { id: 'p5', tai: 'မႃး', english: 'Come', assamese: 'আহা', pronunciation: 'ma', category: 'daily' },
  { id: 'p6', tai: 'ၼိုင်ႈ', english: 'One', assamese: 'এক', pronunciation: 'nueng', category: 'number' },
  { id: 'p7', tai: 'သွင်', english: 'Two', assamese: 'দুই', pronunciation: 'song', category: 'number' },
  { id: 'p8', tai: 'သၢမ်', english: 'Three', assamese: 'তিনি', pronunciation: 'sam', category: 'number' },
  { id: 'p9', tai: 'သီႇ', english: 'Four', assamese: 'চাৰি', pronunciation: 'si', category: 'number' },
  { id: 'p10', tai: 'ႁႃႈ', english: 'Five', assamese: 'পাঁচ', pronunciation: 'ha', category: 'number' },
  { id: 'p11', tai: 'ၼမ်ႉ', english: 'Water', assamese: 'পানী', pronunciation: 'nam', category: 'nature' },
  { id: 'p12', tai: 'ၾႆး', english: 'Fire', assamese: 'জুই', pronunciation: 'fai', category: 'nature' },
  { id: 'p13', tai: 'လိူၼ်', english: 'Moon', assamese: 'চন্দ্ৰ', pronunciation: 'luen', category: 'nature' },
  { id: 'p14', tai: 'မႄႈ', english: 'Mother', assamese: 'মা', pronunciation: 'mae', category: 'family' },
  { id: 'p15', tai: 'ပေႃႈ', english: 'Father', assamese: 'দেউতা', pronunciation: 'pho', category: 'family' },
  { id: 'p16', tai: 'ပီႈ', english: 'Elder sibling', assamese: 'ককাই/বাইদেউ', pronunciation: 'pi', category: 'family' },
  { id: 'p17', tai: 'ၼွင်ႉ', english: 'Younger sibling', assamese: 'ভাই/ভনী', pronunciation: 'nong', category: 'family' },
  { id: 'p18', tai: 'ၶဝ်ႈ', english: 'Rice', assamese: 'ভাত', pronunciation: 'khao', category: 'food' },
  { id: 'p19', tai: 'ပႃ', english: 'Fish', assamese: 'মাছ', pronunciation: 'pa', category: 'food' },
  { id: 'p20', tai: 'ဝတ်ႉ', english: 'Monastery', assamese: 'মঠ', pronunciation: 'wat', category: 'religion' },
  { id: 'p21', tai: 'ၽြႃး', english: 'Lord Buddha', assamese: 'ভগৱান বুদ্ধ', pronunciation: 'phra', category: 'religion' },
  { id: 'p22', tai: 'သင်ႇၶႃ', english: 'Sangha (Monks)', assamese: 'সংঘ', pronunciation: 'sangkha', category: 'religion' },
];

const DISHES: Dish[] = [
  { id: 'd1', name: 'Khau Hou', taiName: 'ၶဝ်ႈႁေႃႇ', description: 'Steamed sticky rice wrapped in Ko leaves (Phrynium imbricatum). Often served during ceremonies and festivals.', category: 'rice' },
  { id: 'd2', name: 'Khaulam', taiName: 'ၶဝ်ႈလၢမ်', description: 'Sticky rice stuffed inside a bamboo hollow and slow-cooked over fire. The bamboo imparts a smoky, sweet aroma.', category: 'rice' },
  { id: 'd3', name: 'Pa Daek', description: 'Fermented fish paste — a staple condiment in Tai Khamyang cuisine, similar to Thai pla ra.', category: 'fish' },
  { id: 'd4', name: 'Pa Nung', description: 'Steamed fish with herbs wrapped in banana leaves. Seasoned with local spices and garden herbs.', category: 'fish' },
  { id: 'd5', name: 'Khao Piak', description: 'Rice porridge often prepared for monks during morning offerings and for the sick.', category: 'rice' },
  { id: 'd6', name: 'Laap Pa', description: 'Minced fish salad with fresh herbs, lime juice, and roasted rice powder. A celebratory dish.', category: 'fish' },
  { id: 'd7', name: 'Khao Tom', description: 'Boiled rice wrapped in leaves with sweet or savory fillings. Common during Poi Sangken.', category: 'festival' },
  { id: 'd8', name: 'Nam Phrik', description: 'Spicy chili dip made with roasted chilies, garlic, and fermented fish. Served with fresh vegetables.', category: 'vegetable' },
];
