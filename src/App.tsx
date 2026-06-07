import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Search,
  User,
  Instagram,
  Youtube,
  Send,
  Plus,
  Compass,
  Sparkles,
  Award,
  Shield,
  HelpCircle,
  Menu,
  X,
  BookOpen,
  Wine,
  Leaf,
  Globe,
  Grid,
  MapPin,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { FRAGRANCES, COLLECTIONS } from './data';
import { Fragrance, CartItem } from './types';
import DetailModal from './components/DetailModal';
import CartSidebar from './components/CartSidebar';
import ScentGuide from './components/ScentGuide';
import CustomEngraving from './components/CustomEngraving';
import ExclusiveClub from './components/ExclusiveClub';

export default function App() {
  // Navigation / Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [language, setLanguage] = useState<'FR' | 'EN'>('FR');

  // Interactive Feature Modals & Sidebars
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isScentGuideOpen, setIsScentGuideOpen] = useState<boolean>(false);
  const [isEngravingOpen, setIsEngravingOpen] = useState<boolean>(false);
  const [isClubOpen, setIsClubOpen] = useState<boolean>(false);
  
  // Custom engraving globally configured or for current item
  const [userEngravingText, setUserEngravingText] = useState<string>('');

  // Cart Local Persistence & Management
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('maison_lumiere_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save Cart
  useEffect(() => {
    localStorage.setItem('maison_lumiere_cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (fragrance: Fragrance, volume: string) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.fragrance.id === fragrance.id && item.selectedVolume === volume
      );
      if (existingIdx > -1) {
        const next = [...prevCart];
        next[existingIdx].quantity += 1;
        return next;
      }
      return [...prevCart, { fragrance, quantity: 1, selectedVolume: volume }];
    });
  };

  const handleUpdateCartQty = (index: number, change: number) => {
    setCart((prevCart) => {
      const next = [...prevCart];
      const nextQty = next[index].quantity + change;
      if (nextQty <= 0) {
        next.splice(index, 1);
      } else {
        next[index].quantity = nextQty;
      }
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prevCart) => {
      const next = [...prevCart];
      next.splice(index, 1);
      return next;
    });
  };

  // Scent Guide recommendation alignment handler
  const handleLocateScentResult = (categoryTag: string) => {
    setSelectedCategory(categoryTag);
    const element = document.getElementById('collection-header-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Checkout handling
  const handleCheckout = () => {
    alert(
      language === 'FR'
        ? "Votre commande d'exception a été transmise à notre conciergerie Parisienne. Un conseiller de l'Atelier entrera en contact avec vous prochainement."
        : "Your exclusive order has been transmitted to our Parisian concierge. A specialist from the Atelier will contact you shortly."
    );
    setCart([]);
    setIsCartOpen(false);
  };

  const filteredFragrances = FRAGRANCES.filter((f) => {
    const matchesCategory = selectedCategory === 'all' || f.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.scentProfile.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  // Active slide state (hero gallery can slide horizontally if desired)
  const [activeHeroSlide, setActiveHeroSlide] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#070707] text-[#cccccc] font-sans antialiased relative">
      
      {/* 1. Header Banner & Delivery notice */}
      <div id="header-topbar" className="bg-[#0b0b0b] border-b border-[#c5a880]/10 text-center py-2 px-4 select-none">
        <p className="text-[10px] tracking-[0.25em] text-[#c5a880] uppercase font-sans font-medium flex items-center justify-center gap-1.5">
          <span className="h-1.5 w-1.5 bg-[#c5a880] rounded-full animate-pulse" />
          {language === 'FR' ? 'LIVRAISON COLISSIMO SÉCURISÉE OFFERTE EN FRANCE DES 150€' : 'FREE SECURED INTERNATIONAL COLISSIMO DELIVERY'}
        </p>
      </div>

      <div className="flex min-h-screen">
        
        {/* 2. Left Side Utility Sidebar (Matches image exactly) */}
        <aside id="main-rail-sidebar" className="hidden lg:flex w-72 flex-col justify-between border-r border-[#c5a880]/15 bg-[#0a0a0a] z-20 select-none p-8 text-center relative shrink-0">
          
          {/* Logo Brand Brandings (Aesthetic high-concept lettering) */}
          <div className="space-y-6">
            <div className="text-center pt-2">
              <a href="#" className="block group">
                <span className="text-[10px] tracking-[0.45em] text-gray-500 font-sans block mb-1">MAISON</span>
                <span className="text-2xl font-display font-medium tracking-[0.16em] text-[#fff] group-hover:text-[#c5a880] transition-colors duration-300">
                  LUMIÈRE
                </span>
                <span className="text-[10px] tracking-[0.5em] text-gray-400 block mt-1">PARIS</span>
              </a>
            </div>

            <div className="flex justify-center py-2">
              <button 
                onClick={() => setIsClubOpen(true)}
                className="p-3 border border-[#c5a880]/20 hover:border-[#c5a880]/75 bg-transparent rounded-full text-[#c5a880] transition-all duration-300 transform hover:scale-105 cursor-pointer"
                title="Salon Privé"
              >
                <Sparkle size={18} className="animate-spin" style={{ animationDuration: '15s' }} />
              </button>
            </div>

            {/* Menu Links navigation (styled identically to left column) */}
            <nav className="space-y-3.5 pt-8 text-left max-w-[140px] mx-auto">
              {[
                { label: language === 'FR' ? 'PARFUMS' : 'FRAGRANCES', value: 'all' },
                { label: language === 'FR' ? 'COLLECTIONS' : 'COLLECTIONS', value: 'Les Origines' },
                { label: language === 'FR' ? 'LA MAISON' : 'THE MAISON', value: 'Les Intenses' },
                { label: language === 'FR' ? 'ART & CULTURE' : 'ART & DESIGN', value: 'Les Florales' },
                { label: language === 'FR' ? 'EXPÉRIENCES' : 'EXPERIENCES', value: 'expert' },
                { label: language === 'FR' ? 'BOUTIQUES' : 'BOUTIQUES', value: 'boutiques' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.value === 'expert') {
                      setIsScentGuideOpen(true);
                    } else if (item.value === 'boutiques') {
                      const boutiquesEl = document.getElementById('parisian-heritage-section');
                      if (boutiquesEl) boutiquesEl.scrollIntoView({ behavior: 'smooth' });
                    } else if (item.value === 'all') {
                      setSelectedCategory('all');
                      const collectionEl = document.getElementById('collection-header-section');
                      if (collectionEl) collectionEl.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setSelectedCategory(item.value);
                      const collectionEl = document.getElementById('collection-header-section');
                      if (collectionEl) collectionEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`block text-[10px] font-sans tracking-[0.3em] transition-all font-semibold cursor-pointer w-full text-left uppercase ${
                    selectedCategory.toLowerCase() === item.value.toLowerCase()
                      ? 'text-[#c5a880] translate-x-1'
                      : 'text-gray-400 hover:text-[#f5f5f5] hover:translate-x-1'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Slogan vertical text in left-hand side matching graphic exactly */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 origin-right rotate-90 pb-8 pointer-events-none whitespace-nowrap">
            <span className="text-[7.5px] font-sans tracking-[0.45em] text-gray-600 block uppercase">
              {language === 'FR' ? "L'art du parfum depuis 1924" : "The Art of Perfumery since 1924"}
            </span>
          </div>

          {/* Sidebar utilities */}
          <div className="space-y-6 pt-4 border-t border-gray-900/60">
            {/* Search Input Widget inside rail */}
            <div className="relative max-w-[170px] mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'FR' ? 'Rechercher...' : 'Search sillage...'}
                className="w-full bg-[#121212] border border-gray-800 focus:border-[#c5a880]/40 rounded py-2 pl-3 pr-8 text-[10px] tracking-wide outline-none text-[#f5f5f5] placeholder-gray-600 transition-all"
              />
              <Search size={11} className="absolute right-2.5 top-2.5 text-gray-500" />
            </div>

            {/* Quick Lang Selection & Privé */}
            <div className="flex items-center justify-center gap-5 text-[9px] font-mono tracking-widest text-gray-500 font-semibold">
              <button
                onClick={() => setLanguage('FR')}
                className={`cursor-pointer transition-colors ${language === 'FR' ? 'text-[#c5a880]' : 'hover:text-white'}`}
              >
                FR
              </button>
              <span className="text-gray-800">|</span>
              <button
                onClick={() => setLanguage('EN')}
                className={`cursor-pointer transition-colors ${language === 'EN' ? 'text-[#c5a880]' : 'hover:text-white'}`}
              >
                EN
              </button>
            </div>

            <div className="text-[8px] font-mono text-gray-600">
              © MAISON LUMIÈRE 2026
            </div>
          </div>
        </aside>

        {/* 3. Main Body Container */}
        <main className="flex-1 flex flex-col bg-[#070707] overflow-hidden">
          
          {/* Header Mobile / Responsive Navigation bar */}
          <header id="responsive-brand-header" className="flex items-center justify-between p-4 md:p-6 lg:px-10 border-b border-[#c5a880]/10 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-30 select-none">
            
            {/* Toggle mobile list/filter or reset category */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsScentGuideOpen(true)}
                className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] font-mono text-[#c5a880] hover:text-[#e5c8a0] bg-[#c5a880]/5 hover:bg-[#c5a880]/10 px-3 py-1.5 border border-[#c5a880]/20 rounded transition-all"
              >
                <Sparkles size={11} className="animate-pulse" />
                {language === 'FR' ? "L'ATELIER DIAGNOSTIC" : "SCENT GUIDE ADVISOR"}
              </button>
            </div>

            {/* Mobile Title */}
            <div className="lg:hidden text-center cursor-pointer" onClick={() => setSelectedCategory('all')}>
              <h1 className="text-sm font-display tracking-[0.3em] font-bold text-white">MAISON LUMIÈRE</h1>
              <p className="text-[7px] tracking-[0.4em] text-[#c5a880] uppercase">PARIS</p>
            </div>

            {/* Header Right interactive utilities */}
            <div className="flex items-center gap-4 md:gap-6 text-gray-400">
              {/* Salon Privé Trigger */}
              <button
                onClick={() => setIsClubOpen(true)}
                className="text-[10px] tracking-widest uppercase text-xs font-mono font-bold hover:text-[#c5a880] transition-colors hidden md:block cursor-pointer"
              >
                {language === 'FR' ? 'MON COMPTE' : 'MY CABINET'}
              </button>

              {/* Cart triggers */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 text-gray-300 hover:text-[#c5a880] transition-all bg-[#111] hover:bg-white/[0.03] px-3.5 py-1.5 border border-white/[0.05] rounded-full cursor-pointer relative"
              >
                <span className="text-[9px] uppercase tracking-widest text-[#c5a880] font-mono font-bold md:block hidden">
                  {language === 'FR' ? 'PANIER' : 'CABINET'}
                </span>
                <span className="relative">
                  <ShoppingBag size={14} className="text-[#c5a880]" />
                  {cartTotalItems > 0 && (
                    <span className="absolute -top-2 -right-2 text-[8px] bg-red-600 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono animate-bounce font-bold">
                      {cartTotalItems}
                    </span>
                  )}
                </span>
              </button>
            </div>
          </header>

          {/* 4. HERO SECTION IMAGE - Pure Parisien Luxury */}
          <section id="hero-luxury" className="relative w-full h-[55vh] md:h-[65vh] xl:h-[72vh] overflow-hidden border-b border-[#c5a880]/15 select-none font-display">
            {/* The main background generated image of Paris & Perfume */}
            <div className="absolute inset-0">
              <img
                src="/src/assets/images/hero_lumiere_1780836503023.png"
                alt="Maison Lumiere Paris Skyline sunset fragrance bottle"
                className="w-full h-full object-cover brightness-[0.80] contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-black/35" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
            </div>

            {/* Float content details over the hero */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16 max-w-4xl space-y-4">
              <div>
                <span className="text-[10px] tracking-[0.4em] text-[#c5a880] uppercase block font-semibold mb-2 lg:mb-3">
                  {language === 'FR' ? 'NOUVEAU PARFUM' : 'NOUVEAU'}
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-wide leading-tight drop-shadow-md">
                  L'ÉMOTION<br className="hidden md:block"/> DEVENUE ESSENCE
                </h2>
                <p className="text-xs md:text-sm text-gray-300 max-w-md leading-relaxed mt-4 drop-shadow font-sans font-light">
                  {language === 'FR'
                    ? "Des fragrances rares, créées à Paris avec l'obsession du détail et le respect du temps."
                    : "Rare olfactory masterpieces, sculpted in Paris with absolute devotion to detail and timeless processes."}
                </p>
              </div>

              {/* Action and carousel markers */}
              <div className="flex flex-wrap items-center gap-6 pt-3">
                <button
                  onClick={() => {
                    const firstProd = FRAGRANCES[0];
                    setSelectedFragrance(firstProd);
                    setIsDetailOpen(true);
                  }}
                  className="bg-[#c5a880] hover:bg-[#e5c8a0] text-black font-display font-semibold text-[10px] tracking-widest uppercase py-3.5 px-8 transition-colors duration-300 flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  {language === 'FR' ? 'DÉCOUVRIR LA COLLECTION' : 'DISCOVER THE SELECTION'}
                  <ChevronRight size={12} className="mt-[1px]" />
                </button>

                <button
                  onClick={() => setIsEngravingOpen(true)}
                  className="border border-[#c5a880]/40 hover:border-[#c5a880] text-white hover:bg-[#c5a880]/5 font-display text-[10px] tracking-widest uppercase py-3.5 px-6 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{language === 'FR' ? 'GRAVER VOTRE FLACON' : 'ENGRAVE YOUR BOTTLE'}</span>
                  {userEngravingText && <span className="bg-[#c5a880] text-black text-[8px] px-1.5 py-0.5 rounded uppercase font-mono font-bold animate-pulse">{userEngravingText}</span>}
                </button>
              </div>

              {/* Carousel Indicators bottom left */}
              <div className="pt-4 flex items-center gap-2">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveHeroSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeHeroSlide === idx ? 'w-6 bg-[#c5a880]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* 5. COLLECTION SECTION (Exquisite grids of items Matching graphic exactly) */}
          <section id="collection-grid-and-shop" className="p-6 md:p-12 lg:p-16 space-y-12">
            
            {/* Fine headers */}
            <div id="collection-header-section" className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-950 pb-6 gap-4 select-none">
              <div>
                <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase block font-semibold mb-1">
                  {language === 'FR' ? 'COLLECTIONS MAISON' : 'COUTURE COLLECTIONS'}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wider uppercase">
                  {language === 'FR' ? "L'EXCEPTION EN HÉRITAGE" : "HERITAGE OF EXCEPTIONS"}
                </h3>
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-wrap gap-2">
                {['all', 'Les Origines', 'Les Intenses', 'Les Florales', 'Les Coffrets'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[9px] tracking-[0.2em] uppercase py-2 px-4 border transition-all cursor-pointer ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-[#c5a880] text-[#0d0d0d] border-[#c5a880] font-semibold'
                        : 'border-gray-900 text-gray-400 hover:text-[#fff] hover:border-[#c5a880]/30'
                    }`}
                  >
                    {cat === 'all' ? (language === 'FR' ? 'TOUT VOIR' : 'ALL ENTRIES') : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List of items filtered by interactive tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredFragrances.map((fragrance, index) => (
                  <motion.div
                    key={fragrance.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="group bg-[#0e0e0e] border border-white/[0.03] hover:border-[#c5a880]/30 rounded-lg p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Visual glowing touch behind luxury item */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a880]/[0.02] rounded-full blur-2xl pointer-events-none group-hover:bg-[#c5a880]/[0.05] transition-all" />

                    <div>
                      {/* Interactive Item Image Container */}
                      <div
                        onClick={() => {
                          setSelectedFragrance(fragrance);
                          setIsDetailOpen(true);
                        }}
                        className="w-full h-64 bg-[#141414] rounded overflow-hidden flex items-center justify-center p-6 border border-white/[0.01] cursor-pointer relative"
                      >
                        <img
                          src={fragrance.image}
                          alt={fragrance.name}
                          className="max-h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Overlay quick see details icon */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-[10px] tracking-[0.25em] text-[#c5a880] uppercase border border-[#c5a880]/45 px-4 py-2 font-display">
                            {language === 'FR' ? 'VOIR L\'ESSENCE' : 'EXPLORE PROFILE'}
                          </span>
                        </div>
                      </div>

                      {/* Content metadata */}
                      <div className="mt-5 space-y-1">
                        <span className="text-[9px] uppercase tracking-widest text-[#c5a880] font-mono block">
                          {fragrance.category}
                        </span>
                        <h4 className="text-sm font-serif text-white tracking-wide group-hover:text-[#c5a880] transition-colors">
                          {fragrance.name}
                        </h4>
                        <p className="text-xs text-gray-400 font-sans line-clamp-2 leading-relaxed pt-1 select-none">
                          {fragrance.description}
                        </p>
                      </div>
                    </div>

                    {/* Scent notes summary line */}
                    <div className="mt-4 pt-3.5 border-t border-gray-900/60 flex items-center justify-between">
                      <span className="text-[9.5px] font-mono text-gray-500 italic block">
                        {fragrance.scentProfile}
                      </span>
                      <span className="text-xs font-mono text-[#c5a880] font-semibold font-display">
                        {fragrance.price} €
                      </span>
                    </div>

                    {/* Interactive triggers */}
                    <div className="mt-3.5 flex gap-2">
                      <button
                        onClick={() => handleAddToCart(fragrance, fragrance.volume)}
                        className="flex-1 bg-transparent hover:bg-[#c5a880] hover:text-[#0d0d0d] border border-gray-800 hover:border-[#c5a880] transition-all text-gray-300 font-display text-[9px] tracking-widest uppercase py-2.5 font-bold cursor-pointer text-center"
                      >
                        {language === 'FR' ? 'AJOUTER AU COMPTE' : 'ADD TO CAROUSEL'}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFragrance(fragrance);
                          setIsDetailOpen(true);
                        }}
                        className="bg-[#121212] hover:bg-[#1c1c1c] text-gray-400 hover:text-white px-3.5 py-2.5 border border-gray-800 rounded flex items-center justify-center cursor-pointer"
                        title="Détails"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* 6. BRAND STORY WITH ARCHITECTURE PHOTOGRAPHY (Matching graphic EXACTLY) */}
          <section id="parisian-heritage-section" className="bg-[#0b0b0b] border-t border-b border-[#c5a880]/15 select-none font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:px-16 flex flex-col xl:flex-row items-center gap-12 xl:gap-20">
              
              {/* Left Column Text Details */}
              <div className="w-full xl:w-1/2 space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase block font-semibold mb-1">
                    LA MAISON LUMIÈRE
                  </span>
                  <h3 className="text-2xl md:text-4xl font-serif text-white tracking-wide uppercase">
                    {language === 'FR' ? "L'ART DU PARFUM DEPUIS 1924" : "THE ART OF PERFUMERY SINCE 1924"}
                  </h3>
                </div>

                <div className="space-y-4 font-serif text-gray-300 text-sm italic leading-relaxed">
                  <p>
                    {language === 'FR'
                      ? "Indépendante et familiale, la Maison Lumière élabore chaque parfum comme une œuvre d'art à part entière. Des ingrédients précieux d'exception, un savoir-faire français d'artiste, et une élégance parisienne sans compromis."
                      : "Independent and family-owned, Maison Lumière designs each and every fragrance as a distinct masterpiece. Highly precious materials, unparalleled French expertise, and raw Parisian elegance."}
                  </p>
                  <p className="text-xs font-mono font-semibold text-gray-400 not-italic uppercase tracking-widest pt-1 flex items-center gap-1.5">
                    <Award size={12} className="text-[#c5a880]" />
                    {language === 'FR' ? "AUTHENTICITÉ ET TRAÇABILITÉ CERTIFIÉES" : "CERTIFIED MASTER PERFUMERS & INGREDIENT TRACEABILITY"}
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setIsClubOpen(true)}
                    className="bg-[#c5a880] hover:bg-[#e5c8a0] text-black font-display font-semibold text-[10px] tracking-widest uppercase py-3.5 px-8 transition-colors cursor-pointer"
                  >
                    {language === 'FR' ? 'REJOINDRE LE SALON PRIVÉ' : 'ENTER SALON PRIVÉ'}
                  </button>
                  <button
                    onClick={() => setIsScentGuideOpen(true)}
                    className="border border-gray-800 hover:border-[#c5a880] text-gray-300 hover:text-white font-display text-[10px] tracking-widest uppercase py-3.5 px-6 transition-all cursor-pointer"
                  >
                    {language === 'FR' ? 'DÉCOUVRIR NOTRE HISTOIRE' : 'EXPLORE HOUSE HISTORY'}
                  </button>
                </div>
              </div>

              {/* Right Column atmospheric visual frame matching layout */}
              <div className="w-full xl:w-1/2 relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#c5a880]/20 max-w-xl mx-auto shadow-2xl relative">
                  <img
                    src="/src/assets/images/l_atelier_1780836578852.png"
                    alt="Atelier of Maison Lumiere with master perfume ingredients"
                    className="w-full h-full object-cover brightness-[0.7] hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  
                  {/* Miniature decorative floating card inside visual frame matches absolute layout */}
                  <div className="absolute bottom-6 right-6 bg-[#090909]/95 border border-[#c5a880]/30 p-5 rounded max-w-xs space-y-2 select-none">
                    <span className="text-[8px] uppercase tracking-widest text-[#c5a880] font-mono block">ATELIER PRIVÉ</span>
                    <h4 className="text-xs font-serif text-white uppercase tracking-wider">L'Atelier Lumière</h4>
                    <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                      {language === 'FR'
                        ? "Bénéficiez d'une visite d'exception sur rendez-vous à notre salon du Faubourg Saint-Honoré."
                        : "Book an exclusive discovery session on appointment in our historic Saint-Honoré cabinet."}
                    </p>
                    <button
                      onClick={() => setIsClubOpen(true)}
                      className="text-[9px] font-mono tracking-widest text-[#c5a880] hover:text-[#e5c8a0] uppercase block pt-1.5 font-bold cursor-pointer transition-colors"
                    >
                      {language === 'FR' ? 'PRENDRE RENDEZ-VOUS →' : 'BOOK SESSION →'}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* 7. RECOURS ET CERTIFICATS DE CONFIANCE (The 4 iconic items matching image) */}
          <section id="trust-pillars" className="border-b border-[#c5a880]/15 select-none">
            <div className="max-w-7xl mx-auto px-6 py-12 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              
              {/* Pillar 1 */}
              <div className="text-center space-y-2 group">
                <div className="text-[#c5a880] flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <Leaf size={24} strokeWidth={1} />
                </div>
                <h5 className="text-[10px] tracking-[0.2em] font-display text-white uppercase font-bold">
                  {language === 'FR' ? "INGRÉDIENTS RARES" : "INGREDIENT PURITY"}
                </h5>
                <p className="text-[10px] text-gray-500 font-sans max-w-[180px] mx-auto leading-relaxed">
                  {language === 'FR' ? "Sourcing d'exception et éthique de grands récoltants." : "Pure, high-integrity raw materials from certified origins."}
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="text-center space-y-2 group">
                <div className="text-[#c5a880] flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkle size={24} strokeWidth={1} />
                </div>
                <h5 className="text-[10px] tracking-[0.2em] font-display text-white uppercase font-bold">
                  {language === 'FR' ? "CRÉATION PARISIENNE" : "PARISIAN ARTISTRY"}
                </h5>
                <p className="text-[10px] text-gray-500 font-sans max-w-[180px] mx-auto leading-relaxed">
                  {language === 'FR' ? "Chaque parfum est formulé et mis en flacon à Paris." : "Meticulously blended and bottle handcrafted in Paris."}
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="text-center space-y-2 group">
                <div className="text-[#c5a880] flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield size={24} strokeWidth={1} />
                </div>
                <h5 className="text-[10px] tracking-[0.2em] font-display text-white uppercase font-bold">
                  {language === 'FR' ? "EMBALLAGE D'EXCEPTION" : "LUXURY WRAPPING"}
                </h5>
                <p className="text-[10px] text-gray-500 font-sans max-w-[180px] mx-auto leading-relaxed">
                  {language === 'FR' ? "Vos écrins sont scellés à la cire pour un cadeau idéal." : "Each order is hand-packaged with custom stamp-wax finish."}
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="text-center space-y-2 group">
                <div className="text-[#c5a880] flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <Globe size={24} strokeWidth={1} />
                </div>
                <h5 className="text-[10px] tracking-[0.2em] font-display text-white uppercase font-bold">
                  {language === 'FR' ? "ÉCO-CONCEPTION" : "CIRCULAR LUXURY"}
                </h5>
                <p className="text-[10px] text-gray-500 font-sans max-w-[180px] mx-auto leading-relaxed">
                  {language === 'FR' ? "Flacon rechargeable et utilisation du verre recyclable d'art." : "Refillable precious glass bottles honoring French nature."}
                </p>
              </div>

            </div>
          </section>

          {/* 8. FOOTER CONFIDENTIAUX ET FORMULAIRE */}
          <footer id="main-brand-footer" className="bg-[#090909] py-12 px-6 md:px-12 lg:px-16 border-t border-[#c5a880]/10 select-none">
            <div className="max-w-7xl mx-auto space-y-12">
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-gray-900 pb-8">
                
                {/* Brand Logo in Footer */}
                <div className="space-y-3">
                  <h4 className="text-lg font-display tracking-[0.25em] text-white">MAISON LUMIÈRE</h4>
                  <p className="text-[10px] text-gray-500 max-w-sm leading-relaxed font-serif italic">
                    {language === 'FR' 
                      ? "Depuis 1924, élever le sillage au rang d'œuvre d'art éternelle."
                      : "Since 1924, transforming personal trails into eternal Parisian memories."}
                  </p>
                </div>

                {/* Newsletter Form */}
                <div className="w-full max-w-sm space-y-2">
                  <span className="text-[9px] uppercase tracking-widest text-[#c5a880] font-mono block">
                    {language === 'FR' ? 'RECEVOIR NOS PORTRAITS CONFIDENTIELS' : 'GET CONFIDENTIAL UPDATES'}
                  </span>
                  <div className="flex bg-[#121212] border border-gray-800 rounded overflow-hidden focus-within:border-[#c5a880]/50 transition-all">
                    <input
                      type="email"
                      placeholder="votre@adresse.com"
                      className="flex-1 bg-transparent px-4 py-2.5 text-xs outline-none text-[#f5f5f5] placeholder-gray-700"
                    />
                    <button
                      onClick={() => setIsClubOpen(true)}
                      className="bg-[#c5a880] hover:bg-[#e5c8a0] text-[#0d0d0d] font-semibold text-xs tracking-widest px-4 transition-colors cursor-pointer"
                    >
                      <Send size={12} />
                    </button>
                  </div>
                </div>

              </div>

              {/* Link items bottom and fine text */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-mono text-gray-500 font-semibold tracking-widest">
                <div className="flex flex-wrap justify-center gap-6">
                  <a href="#" className="hover:text-white transition-colors">
                    {language === 'FR' ? 'MENTIONS LÉGALES' : 'LEGAL NOTICE'}
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === 'FR' ? 'CONFIDENTIALITÉ' : 'PRIVACY SCHEME'}
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === 'FR' ? 'CGV & LIVRAISON' : 'CGV & SHIPMENT'}
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === 'FR' ? 'ACCESSIBILITÉ' : 'ACCESSIBILITY'}
                  </a>
                </div>

                <div className="flex items-center gap-4 text-gray-600">
                  <a href="#" className="hover:text-[#c5a880] transition-colors"><Instagram size={14} /></a>
                  <a href="#" className="hover:text-[#c5a880] transition-colors"><Youtube size={14} /></a>
                </div>
              </div>

            </div>
          </footer>

        </main>
      </div>

      {/* 9. INTERACTIVE OVERLAYS & PORTALS */}

      {/* Scent diagnostic guide expert panel */}
      <ScentGuide
        isOpen={isScentGuideOpen}
        onClose={() => setIsScentGuideOpen(false)}
        onLocateMatches={handleLocateScentResult}
      />

      {/* Engraving personalization option panel */}
      <CustomEngraving
        isOpen={isEngravingOpen}
        onClose={() => setIsEngravingOpen(false)}
        onConfirmEngraving={(txt) => setUserEngravingText(txt)}
      />

      {/* Cart sidebar side drawers */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
      />

      {/* Detail view of active scent selected */}
      <DetailModal
        fragrance={selectedFragrance}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedFragrance(null);
        }}
        onAddToCart={handleAddToCart}
      />

      {/* Exclusive Salon Privé Club signup portal */}
      <ExclusiveClub
        isOpen={isClubOpen}
        onClose={() => setIsClubOpen(false)}
      />

    </div>
  );
}
