import React, { useState, useRef, useEffect } from 'react';
import {
  Warehouse,
  Truck,
  Boxes,
  LifeBuoy,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Building2,
  Wrench,
  Users,
  Landmark,
  HardHat,
  Building,
  Play,
  Lock,
} from 'lucide-react';
import {
  SITE_IMAGES,
  ProductItem,
  ProductCategory,
  WHATSAPP_NUMBER,
} from './data/catalog';
import { ProductCard } from './components/ProductCard';
import { BulkQuoteModal } from './components/BulkQuoteModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { AiAssistantChat } from './components/AiAssistantChat';
import { CatalogProvider, useCatalog } from './context/CatalogContext';
import { OwnerControlBar } from './components/OwnerControlBar';
import { OwnerPortalModal } from './components/OwnerPortalModal';
import { ProductEditorModal } from './components/ProductEditorModal';
import { OwnerCatalogManagerModal } from './components/OwnerCatalogManagerModal';

type FilterTab = 'all' | ProductCategory;

const NadBrandMark: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);
  const heightClass =
    size === 'sm' ? 'h-7' : size === 'lg' ? 'h-11 sm:h-12' : 'h-8 sm:h-9';

  return (
    <span className={`inline-flex items-center gap-2 select-none ${className}`}>
      {!imgError ? (
        <img
          src="/assets/nad-logo-clean.png"
          alt="NAD Furniture"
          className={`${heightClass} w-auto object-contain`}
          loading="eager"
          decoding="async"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="inline-flex items-center gap-2">
          <span
            className="text-[32px] font-black uppercase text-[#c2171a] leading-none tracking-[-0.02em]"
            style={{ fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif" }}
          >
            NAD
          </span>
          <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-white border-l-2 border-[#c2171a] pl-2 leading-none">
            Furniture
          </span>
        </span>
      )}
    </span>
  );
};

function MainAppContent() {
  const { products, openLoginModal } = useCatalog();
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'blogs' | 'career'>('home');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const secretClickCountRef = useRef(0);
  const secretClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  
  const openEmailOptions = () => {
    const choice = window.confirm(
      "OK = Gmail | Cancel = Outlook"
    );

    if (choice) {
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=info%40nad.furniture",
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      window.open(
        "https://outlook.office.com/mail/deeplink/compose?to=info%40nad.furniture",
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  // Hidden owner access: shortcut Ctrl+Shift+O / Alt+Shift+O or URL hash #owner
  // NOT shown publicly to any visitor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey && (e.key === 'O' || e.key === 'o')) {
        e.preventDefault();
        openLoginModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (window.location.hash === '#owner' || window.location.search.includes('owner=true')) {
      openLoginModal();
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openLoginModal]);

  const handleSecretOwnerClick = () => {
    secretClickCountRef.current += 1;
    if (secretClickTimerRef.current) clearTimeout(secretClickTimerRef.current);
    if (secretClickCountRef.current >= 4) {
      secretClickCountRef.current = 0;
      openLoginModal();
    } else {
      secretClickTimerRef.current = setTimeout(() => {
        secretClickCountRef.current = 0;
      }, 1500);
    }
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  };

  const openBulkQuote = (productTitle = '') => {
    setQuoteProduct(productTitle);
    setQuoteModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleCategorySelect = (category: FilterTab) => {
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setActiveFilter(category);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('featured-items');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, currentView !== 'home' ? 60 : 0);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutUsClick = () => {
    setCurrentView('about');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectGalleryClick = () => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        scrollToSection('category-showcase');
      }, 60);
    } else {
      scrollToSection('category-showcase');
    }
  };

  const handleBlogsClick = () => {
    setCurrentView('blogs');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCareerClick = () => {
    setCurrentView('career');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setCurrentView('home');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bunkBeds = products.filter((p) => p.category === 'bunk-beds');
  const steelLockers = products.filter((p) => p.category === 'steel-lockers');
  const mattresses = products.filter((p) => p.category === 'mattress');
  const officeTables = products.filter((p) => p.category === 'office-tables');
  const officeWorkstations = products.filter((p) => p.category === 'office-workstation');
  const wardrobes = products.filter((p) => p.category === 'wardrobe');
  const kingBeds = products.filter((p) => p.category === 'king-beds');
  const queenBeds = products.filter((p) => p.category === 'queen-beds');
  const doubleBeds = products.filter((p) => p.category === 'double-beds');
  const singleBeds = products.filter((p) => p.category === 'single-beds');
  const bedroomBeds = products.filter((p) =>
    ['beds', 'king-beds', 'queen-beds', 'double-beds', 'single-beds'].includes(p.category)
  );


  const filteredProducts =
    activeFilter === 'all'
      ? []
      : products.filter((item) => {
          if (activeFilter === 'mattress') {
            return item.category === 'mattress';
          }
          if (activeFilter === 'beds') {
            return ['beds', 'king-beds', 'queen-beds', 'double-beds', 'single-beds'].includes(item.category);
          }
          if (activeFilter === 'office-furniture') {
            return item.category === 'office-tables' || item.category === 'office-workstation';
          }
          return item.category === activeFilter;
        });

  return (
    <div id="wrapper" className="min-h-screen flex flex-col bg-white text-[#2D3748]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1A202C] focus:shadow-md"
      >
        Skip to content
      </a>

      {/* Header */}
      <header id="masthead" className="w-full bg-[#000000] text-white relative z-30">
        {/* Top Utility Bar (Desktop) */}
        <div
          className="hidden lg:block bg-[#131313]"
          style={{
            backgroundImage: `url(${SITE_IMAGES.subtlePattern})`,
            backgroundPosition: '0% 56%',
          }}
        >
          <div className="mx-auto flex max-w-[1290px] items-center justify-between px-6 py-2 text-[14px] text-[#EDF2F7]">
            <nav aria-label="Secondary" className="flex items-center gap-5">
              <button
                type="button"
                onClick={handleAboutUsClick}
                className="hover:text-[#b82105] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={handleProjectGalleryClick}
                className="hover:text-[#b82105] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Project Gallery
              </button>
              <button
                type="button"
                onClick={handleBlogsClick}
                className="hover:text-[#b82105] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Blogs
              </button>
              <button
                type="button"
                onClick={handleCareerClick}
                className="hover:text-[#b82105] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Career
              </button>
              <button
                type="button"
                onClick={() => openBulkQuote()}
                className="hover:text-[#b82105] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request a Furniture Quote
              </button>
            </nav>

            <div className="flex items-center gap-3 text-[15px] font-semibold whitespace-nowrap shrink-0">
              <a
                href="mailto:info@NAD.furniture"
                className="inline-flex items-center gap-1.5 text-[#EDF2F7] hover:text-white transition-colors"
              >
                <span aria-hidden="true" className="text-[12px]">
                  ✉
                </span>
                <span>info@NAD.furniture</span>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-[#25D366] transition-colors"
              >
                <img
                  src={SITE_IMAGES.whatsappIcon}
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  className="h-6 w-6 object-contain"
                />
                <span className="tabular-nums">+971 50 631 6560</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="bg-[#000000]">
          <div className="mx-auto flex min-h-[80px] max-w-[1290px] items-center justify-between px-6">
            {/* Left: Red NAD Brand Logo */}
            <button
              type="button"
              onClick={handleHomeClick}
              className="flex items-center py-2 whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="NAD Furniture Home"
            >
              <NadBrandMark />
            </button>

            {/* Center: Primary Navigation (Desktop) */}
            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center gap-7 text-[15px] xl:text-[16px] font-semibold tracking-wide uppercase text-[#EDF2F7]"
            >
              {/* Labour Camp Furniture Dropdown */}
              <div className="relative group py-3">
                <button
                  type="button"
                  onClick={() => handleCategorySelect('bunk-beds')}
                  className="inline-flex items-center gap-1 hover:text-[#cf251d] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>LABOUR CAMP FURNITURE</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 top-full w-[220px] bg-[#1A202C] shadow-[0_2px_13px_0_rgba(0,0,0,0.1)] z-40">
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('bunk-beds')}
                    className="block w-full px-4 py-3 text-left text-[14px] capitalize text-[#F7FAFC] hover:bg-[#2D3748] border-b border-white/10 cursor-pointer"
                  >
                    Bunk Bed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('steel-lockers')}
                    className="block w-full px-4 py-3 text-left text-[14px] capitalize text-[#F7FAFC] hover:bg-[#2D3748] border-b border-white/10 cursor-pointer"
                  >
                    Steel Locker Cabinets
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('mattress')}
                    className="block w-full px-4 py-3 text-left text-[14px] capitalize text-[#F7FAFC] hover:bg-[#2D3748] cursor-pointer"
                  >
                    Mattress
                  </button>
                </div>
              </div>

              {/* Office Furniture Dropdown */}
              <div className="relative group py-3">
                <button
                  type="button"
                  onClick={() => handleCategorySelect('office-furniture')}
                  className="inline-flex items-center gap-1 hover:text-[#cf251d] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>OFFICE FURNITURE</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 top-full w-[200px] bg-[#1A202C] shadow-[0_2px_13px_0_rgba(0,0,0,0.1)] z-40">
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('office-tables')}
                    className="block w-full px-4 py-3 text-left text-[14px] capitalize text-[#F7FAFC] hover:bg-[#2D3748] border-b border-white/10 cursor-pointer"
                  >
                    Office Tables
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('office-workstation')}
                    className="block w-full px-4 py-3 text-left text-[14px] capitalize text-[#F7FAFC] hover:bg-[#2D3748] cursor-pointer"
                  >
                    Office Workstation
                  </button>
                </div>
              </div>

              {/* Bedroom Furniture Dropdown */}
              <div className="relative group py-3">
                <button
                  type="button"
                  onClick={() => handleCategorySelect('wardrobe')}
                  className="inline-flex items-center gap-1 hover:text-[#cf251d] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>BEDROOM FURNITURE</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 top-full w-[220px] bg-[#1A202C] shadow-[0_2px_13px_0_rgba(0,0,0,0.1)] z-40">
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('wardrobe')}
                    className="block w-full px-4 py-3 text-left text-[14px] capitalize text-[#F7FAFC] hover:bg-[#2D3748] border-b border-white/10 cursor-pointer"
                  >
                    Wardrobe
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('beds')}
                    className="block w-full px-4 py-2.5 text-left text-[13px] font-semibold uppercase tracking-wider text-[#cf251d] hover:bg-[#2D3748] border-b border-white/10 cursor-pointer"
                  >
                    All Bedroom Beds
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('king-beds')}
                    className="block w-full px-4 py-2.5 text-left text-[14px] capitalize text-[#F7FAFC] hover:bg-[#2D3748] border-b border-white/10 cursor-pointer"
                  >
                    King Size Bed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('queen-beds')}
                    className="block w-full px-4 py-2.5 text-left text-[14px] capitalize text-[#F7FAFC] hover:bg-[#2D3748] border-b border-white/10 cursor-pointer"
                  >
                    Queen Size Bed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('double-beds')}
                    className="block w-full px-4 py-2.5 text-left text-[14px] capitalize text-[#F7FAFC] hover:bg-[#2D3748] border-b border-white/10 cursor-pointer"
                  >
                    Double Bed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('single-beds')}
                    className="block w-full px-4 py-2.5 text-left text-[14px] capitalize text-[#F7FAFC] hover:bg-[#2D3748] cursor-pointer"
                  >
                    Single Bed
                  </button>
                </div>
              </div>
            </nav>

            {/* Right spacer on desktop / Mobile Menu Toggle */}
            <div className="flex items-center shrink-0">
              <div className="hidden lg:block w-[120px]" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-[#F7FAFC] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/70">
          <div
            className="fixed inset-0"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-80 max-w-[85vw] bg-[#131313] text-white h-full flex flex-col justify-between overflow-y-auto p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <NadBrandMark />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-4 divide-y divide-white/10 text-sm">
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSubmenu(mobileSubmenu === 'camp' ? null : 'camp')
                    }
                    className="flex w-full items-center justify-between py-3.5 text-left font-medium text-[#F7FAFC] cursor-pointer"
                  >
                    <span>LABOUR CAMP FURNITURE</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileSubmenu === 'camp' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileSubmenu === 'camp' && (
                    <div className="pl-4 pb-3 space-y-2 text-xs text-[#CBD5E0]">
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('bunk-beds')}
                        className="block py-1.5 hover:text-white cursor-pointer"
                      >
                        Bunk Bed
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('steel-lockers')}
                        className="block py-1.5 hover:text-white cursor-pointer"
                      >
                        Steel Locker Cabinets
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('mattress')}
                        className="block py-1.5 hover:text-white cursor-pointer"
                      >
                        Mattress
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSubmenu(mobileSubmenu === 'office' ? null : 'office')
                    }
                    className="flex w-full items-center justify-between py-3.5 text-left font-medium text-[#F7FAFC] cursor-pointer"
                  >
                    <span>OFFICE FURNITURE</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileSubmenu === 'office' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileSubmenu === 'office' && (
                    <div className="pl-4 pb-3 space-y-2 text-xs text-[#CBD5E0]">
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('office-tables')}
                        className="block py-1.5 hover:text-white cursor-pointer"
                      >
                        Office Tables
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('office-workstation')}
                        className="block py-1.5 hover:text-white cursor-pointer"
                      >
                        Office Workstation
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSubmenu(mobileSubmenu === 'bedroom' ? null : 'bedroom')
                    }
                    className="flex w-full items-center justify-between py-3.5 text-left font-medium text-[#F7FAFC] cursor-pointer"
                  >
                    <span>BEDROOM FURNITURE</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileSubmenu === 'bedroom' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileSubmenu === 'bedroom' && (
                    <div className="pl-4 pb-3 space-y-2 text-xs text-[#CBD5E0]">
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('wardrobe')}
                        className="block py-1.5 hover:text-white cursor-pointer"
                      >
                        Wardrobe
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('beds')}
                        className="block py-1.5 font-semibold text-[#cf251d] hover:text-white cursor-pointer"
                      >
                        All Bedroom Beds
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('king-beds')}
                        className="block py-1.5 hover:text-white cursor-pointer"
                      >
                        King Size Bed
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('queen-beds')}
                        className="block py-1.5 hover:text-white cursor-pointer"
                      >
                        Queen Size Bed
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('double-beds')}
                        className="block py-1.5 hover:text-white cursor-pointer"
                      >
                        Double Bed
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('single-beds')}
                        className="block py-1.5 hover:text-white cursor-pointer"
                      >
                        Single Bed
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAboutUsClick}
                  className="block w-full py-3.5 text-left font-medium text-[#F7FAFC] cursor-pointer"
                >
                  About Us
                </button>
                <button
                  type="button"
                  onClick={handleProjectGalleryClick}
                  className="block w-full py-3.5 text-left font-medium text-[#F7FAFC] cursor-pointer"
                >
                  Project Gallery
                </button>
                <button
                  type="button"
                  onClick={handleBlogsClick}
                  className="block w-full py-3.5 text-left font-medium text-[#F7FAFC] cursor-pointer"
                >
                  Blogs
                </button>
                <button
                  type="button"
                  onClick={handleCareerClick}
                  className="block w-full py-3.5 text-left font-medium text-[#F7FAFC] cursor-pointer"
                >
                  Career
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('who-we-serve')}
                  className="block w-full py-3.5 text-left font-medium text-[#F7FAFC] cursor-pointer"
                >
                  Who We Serve
                </button>
                <button
                  type="button"
                  onClick={() => openBulkQuote()}
                  className="block w-full py-3.5 text-left font-semibold text-[#cf251d] cursor-pointer"
                >
                  Request a Furniture Quote
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-[#CBD5E0]">
              <p>NAD Building, Naif Street, Dubai, UAE</p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-md bg-[#25D366] py-3 px-4 text-sm font-bold text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>+971 50 631 6560</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main id="main" className="flex-1">
        {/* Dedicated About Us Page (from top left options) */}
        {currentView === 'about' && (
          <section className="min-h-[70vh] bg-white py-12 px-6">
            <div className="mx-auto max-w-[1000px]">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-[#718096]">
                  <button
                    type="button"
                    onClick={handleHomeClick}
                    className="hover:text-[#b82105] transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                  <span>/</span>
                  <span className="text-[#1A202C] font-semibold">About Us</span>
                </div>
                <button
                  type="button"
                  onClick={handleHomeClick}
                  className="text-xs font-semibold text-[#b82105] hover:underline cursor-pointer"
                >
                  ← Back to Home
                </button>
              </div>

              <div className="space-y-6">
                <h1 className="text-[32px] sm:text-[38px] md:text-[42px] font-bold text-[#1A202C] leading-tight">
                  About Us
                </h1>
                <h2 className="text-[20px] sm:text-[24px] md:text-[26px] font-bold text-[#c2171a]">
                  Your Trusted Furniture Supplier in the UAE
                </h2>

                <div className="space-y-4 text-[16px] sm:text-[17px] leading-relaxed text-[#2D3748]">
                  <p>
                    NAD Furniture is a trusted furniture supplier in the UAE, providing reliable furniture solutions for businesses, contractors, accommodation facilities, offices, retailers and residential customers.
                  </p>
                  <p>
                    As part of the established NAD Group of Companies, we combine extensive industry experience with a wide product selection and strong supply capabilities to meet furniture requirements of all sizes — from individual orders to complete commercial and accommodation projects.
                  </p>
                  <p>
                    With access to 5,000+ furniture products, an established network of showrooms and extensive warehousing facilities, NAD Furniture is well positioned to serve customers across Dubai, Abu Dhabi, Sharjah, Ajman and the wider UAE.
                  </p>
                  <p className="font-semibold text-[#1A202C]">
                    Our focus is simple: quality furniture, competitive pricing, dependable supply and professional customer service.
                  </p>
                </div>

                <div className="pt-6 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => openBulkQuote()}
                    className="inline-flex items-center gap-3 rounded-[6px] bg-[#b82105] px-6 py-3 text-[16px] font-semibold text-white hover:bg-[#8f1a05] transition-colors cursor-pointer shadow-md"
                  >
                    <span>Request a Furniture Quote</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[6px] bg-[#25D366] px-6 py-3 text-[16px] font-bold text-white hover:bg-[#1ebe5d] transition-colors shadow-md"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    <span>WhatsApp: +971 50 631 6560</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blank view for Blogs as requested */}
        {currentView === 'blogs' && (
          <section className="min-h-[70vh] bg-white py-12 px-6">
            <div className="mx-auto max-w-[1290px]">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-[#718096]">
                  <button
                    type="button"
                    onClick={handleHomeClick}
                    className="hover:text-[#b82105] transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                  <span>/</span>
                  <span className="text-[#1A202C] font-semibold">Blogs</span>
                </div>
                <button
                  type="button"
                  onClick={handleHomeClick}
                  className="text-xs font-semibold text-[#b82105] hover:underline cursor-pointer"
                >
                  ← Back to Home
                </button>
              </div>
              <div className="min-h-[360px] flex items-center justify-center">
                {/* Intentionally blank */}
              </div>
            </div>
          </section>
        )}

        {/* Blank view for Career as requested */}
        {currentView === 'career' && (
          <section className="min-h-[70vh] bg-white py-12 px-6">
            <div className="mx-auto max-w-[1290px]">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-[#718096]">
                  <button
                    type="button"
                    onClick={handleHomeClick}
                    className="hover:text-[#b82105] transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                  <span>/</span>
                  <span className="text-[#1A202C] font-semibold">Career</span>
                </div>
                <button
                  type="button"
                  onClick={handleHomeClick}
                  className="text-xs font-semibold text-[#b82105] hover:underline cursor-pointer"
                >
                  ← Back to Home
                </button>
              </div>
              <div className="min-h-[360px] flex items-center justify-center">
                {/* Intentionally blank */}
              </div>
            </div>
          </section>
        )}

        {currentView === 'home' && (
          <>
            {/* 1. Hero Section */}
            <section
              className="w-full bg-[#000000] text-white relative overflow-hidden"
              style={{
                backgroundImage: `url(${SITE_IMAGES.subtlePattern})`,
                backgroundSize: 'contain',
                backgroundPosition: '0% 34%',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="mx-auto max-w-[1290px] px-6 py-10 sm:py-12 md:py-14 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4 lg:pr-8">
                    <h1 className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] xl:text-[46px] font-bold leading-[1.2] text-white">
                      Direct-from-Factory Accommodation Furniture at Unbeatable Wholesale Rates
                    </h1>
                    <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#CBD5E0] max-w-2xl">
                      Cut out the middleman. We manufacture and supply heavy-duty bunk beds,
                      staff housing furniture, and bulk accommodation solutions across the
                      UAE.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => openBulkQuote()}
                        className="inline-flex items-center gap-3 rounded-[6px] border-2 border-[#b82105] bg-[#191919] px-6 py-3 text-[16px] font-semibold text-white hover:bg-[#b82105] transition-colors cursor-pointer"
                      >
                        <span>Request a Furniture Quote</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex justify-center items-center">
                    <img
                      src="/assets/aistudio/image_49ef6ff0.png"
                      alt="NAD Heavy Duty Bunk Beds"
                      width={500}
                      height={400}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== SITE_IMAGES.heroBunkBedsFallback) {
                          target.src = SITE_IMAGES.heroBunkBedsFallback;
                        }
                      }}
                      className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[450px] aspect-auto object-contain relative -translate-y-5 sm:-translate-y-8 lg:-translate-y-12 drop-shadow-2xl transition-transform"
                    />
                  </div>
                </div>
              </div>
            </section>

        {/* 2. 4-Column Feature Strip */}
        <section className="w-full bg-[#191919] text-white py-5">
          <div className="mx-auto max-w-[1290px] px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Warehouse className="h-[24px] w-[24px] text-white mb-2" aria-hidden="true" />
                <h3 className="font-sans text-[17px] font-bold text-white">
                  UAE Manufactured
                </h3>
                <p className="text-[14px] text-[#CBD5E0]">Quality furniture made locally</p>
              </div>

              <div className="flex flex-col items-center">
                <Truck className="h-[24px] w-[24px] text-white mb-2" aria-hidden="true" />
                <h3 className="font-sans text-[17px] font-bold text-white">
                  Fast UAE Delivery
                </h3>
                <p className="text-[14px] text-[#CBD5E0]">Direct to your site or project</p>
              </div>

              <div className="flex flex-col items-center">
                <Boxes className="h-[24px] w-[24px] text-white mb-2" aria-hidden="true" />
                <h3 className="font-sans text-[17px] font-bold text-white">
                  Bulk Order Supply
                </h3>
                <p className="text-[14px] text-[#CBD5E0]">For projects of all sizes</p>
              </div>

              <div className="flex flex-col items-center">
                <LifeBuoy className="h-[24px] w-[24px] text-white mb-2" aria-hidden="true" />
                <h3 className="font-sans text-[17px] font-bold text-white">
                  24/7 Customer Service
                </h3>
                <p className="text-[14px] text-[#CBD5E0]">Contact us anytime</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. About Us & Company Overview */}
        <section id="about-us" className="w-full pt-12 md:pt-16 pb-6 bg-white">
          <div className="mx-auto max-w-[1290px] px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div>
                <h2 className="text-[32px] sm:text-[36px] font-bold text-[#1A202C]">About Us</h2>
                <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.7] text-[#2D3748]">
                  NAD Furniture is a leading{' '}
                  <span className="underline font-medium text-[#1A202C]">
                    UAE furniture manufacturer
                  </span>{' '}
                  and wholesale supplier, delivering factory-direct furniture for labour
                  camps, offices, schools, accommodation projects and commercial
                  facilities.
                </p>

                <ul className="mt-5 space-y-2.5">
                  {[
                    '5,000+ Products',
                    'UAE Manufacturer',
                    'Factory Direct Pricing',
                    'Bulk Project Supply',
                    'Fast Delivery Across UAE',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[15px] sm:text-[16px] text-[#2D3748]"
                    >
                      <span className="text-[#cf251d] text-base select-none leading-none" aria-hidden="true">
                        👉
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-1">
                <div className="overflow-hidden rounded-[8px] border border-[#2D3748] bg-[#131313] shadow-md">
                  <div className="relative aspect-video w-full overflow-hidden bg-[#000000] flex items-center justify-center group">
                    <video
                      ref={videoRef}
                      controls
                      playsInline
                      preload="metadata"
                      poster="./videos/nad_video_poster.jpg"
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      onEnded={() => setIsVideoPlaying(false)}
                      aria-label="NAD Furniture UAE Manufacturing & Accommodation Facility Tour"
                      className="h-full w-full object-contain bg-black cursor-pointer"
                    >
                      <source src="/videos/nad_furniture_tour.mp4?v=nad-email-v3" type="video/mp4" />
                      <source src="./videos/nad_furniture_tour.mp4?v=nad-email-v3" type="video/mp4" />
                      <source src="/videos/nad_furniture_optimized.mp4?v=nad-email-v3" type="video/mp4" />
                      <source src="/assets/aistudio/1107__2__a1ee38c1.mp4?v=nad-email-v3" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Persistent Video Tour Top Banner with clickable email */}
<div className="absolute top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 z-20 select-none">
  <div className="rounded-[14px] sm:rounded-[18px] bg-white px-3.5 sm:px-5 py-1.5 sm:py-2 shadow-xl text-center border border-white/90">
    <p className="text-[12px] sm:text-[14px] md:text-[15px] font-bold text-[#c2171a] leading-tight whitespace-nowrap">
      For Orders: +971 50 631 6560
    </p>
    <a
      href="mailto:info@nad.furniture"
      className="block text-[12px] sm:text-[14px] md:text-[15px] font-bold text-[#c2171a] leading-tight whitespace-nowrap hover:underline cursor-pointer"
    >
      info@NAD.furniture
    </a>
  </div>
</div>

                    {!isVideoPlaying && (
                      <button
                        type="button"
                        onClick={toggleVideoPlay}
                        aria-label="Play NAD Furniture UAE Tour"
                        className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#b82105] text-white shadow-2xl hover:bg-[#8a1803] hover:scale-105 transition-all cursor-pointer z-10"
                      >
                        <Play className="h-8 w-8 ml-1 fill-white" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-[#191919] px-4 py-3 text-sm text-white border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-[#CBD5E0]">For orders:</span>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[#25D366] hover:text-[#1ebe5d] transition-colors tabular-nums"
                      >
                        +971 50 631 6560
                      </a>
                    </div>
                    <a
                      href="mailto:info@NAD.furniture"
                      className="inline-flex items-center gap-1.5 font-medium text-[#EDF2F7] hover:text-[#cf251d] transition-colors"
                    >
                      <span aria-hidden="true">✉</span>
                      <span>info@NAD.furniture</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 4-Column Category Showcase (1fr 1fr 1fr 2fr) */}
        <section id="category-showcase" className="w-full py-12 md:py-16 bg-white">
          <div className="mx-auto max-w-[1290px] px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
              <button
                type="button"
                onClick={() => handleCategorySelect('bunk-beds')}
                className="group text-center cursor-pointer"
              >
                <h3 className="text-[20px] md:text-[22px] font-bold text-[#1A202C] mb-3 group-hover:text-[#b82105] transition-colors">
                  Bunk Beds
                </h3>
                <div className="aspect-square w-full overflow-hidden bg-white">
                  <img
                    src={SITE_IMAGES.catBunkBed}
                    alt="bunk bed"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== SITE_IMAGES.catBunkBedFallback) {
                        target.src = SITE_IMAGES.catBunkBedFallback;
                      }
                    }}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySelect('wardrobe')}
                className="group text-center cursor-pointer"
              >
                <h3 className="text-[20px] md:text-[22px] font-bold text-[#1A202C] mb-3 group-hover:text-[#b82105] transition-colors">
                  Wardrobes
                </h3>
                <div className="aspect-square w-full overflow-hidden bg-white">
                  <img
                    src={SITE_IMAGES.catWardrobe}
                    alt="two door wardrobe"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== SITE_IMAGES.catWardrobeFallback) {
                        target.src = SITE_IMAGES.catWardrobeFallback;
                      }
                    }}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySelect('steel-lockers')}
                className="group text-center cursor-pointer"
              >
                <h3 className="text-[20px] md:text-[22px] font-bold text-[#1A202C] mb-3 group-hover:text-[#b82105] transition-colors">
                  Lockers
                </h3>
                <div className="aspect-square w-full overflow-hidden bg-white">
                  <img
                    src={SITE_IMAGES.catLockers}
                    alt="steel lockers"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== SITE_IMAGES.catLockersFallback) {
                        target.src = SITE_IMAGES.catLockersFallback;
                      }
                    }}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>

              <div className="sm:col-span-2 lg:col-span-2 lg:pl-6 space-y-3.5">
                <h2 className="text-[26px] md:text-[30px] font-bold text-[#1A202C]">
                  Bedroom Furniture
                </h2>
                <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#2D3748]">
                  Create comfortable and practical bedrooms with furniture designed for
                  homes across the UAE. Explore beds, wardrobes and coordinated bedroom
                  solutions for master bedrooms, guest rooms and everyday spaces.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('wardrobe')}
                    className="inline-flex items-center gap-2.5 rounded-[6px] bg-[#b82105] px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#8a1803] transition-colors cursor-pointer"
                  >
                    <span>Explore Bedroom Furniture</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Featured Items Catalog */}
        <section id="featured-items" className="w-full pb-16 md:pb-20 bg-white">
          <div className="mx-auto max-w-[1290px] px-6">
            <div className="text-center max-w-[580px] mx-auto">
              <h2 className="text-[26px] md:text-[30px] font-bold text-[#1A202C]">Featured Items</h2>
              <p className="mt-2 text-[15px] sm:text-[16px] leading-relaxed text-[#2D3748]">
                As a trusted UAE manufacturer of steel bunk beds and single beds, NAD
                Furniture combines durable construction, modern designs, and exceptional
                value to meet the needs of homes, staff accommodations, hostels, schools,
                and commercial projects.
              </p>
            </div>

            {/* Category Filter Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {(
                [
                  { id: 'all', label: 'All Categories' },
                  { id: 'bunk-beds', label: 'Bunk Beds' },
                  { id: 'steel-lockers', label: 'Steel Lockers' },
                  { id: 'mattress', label: 'Mattresses' },
                  { id: 'office-tables', label: 'Office Tables' },
                  { id: 'office-workstation', label: 'Workstations' },
                  { id: 'wardrobe', label: 'Wardrobes' },
                  { id: 'beds', label: 'All Bedroom Beds' },
                  { id: 'king-beds', label: 'King Beds' },
                  { id: 'double-beds', label: 'Double Beds' },
                  { id: 'single-beds', label: 'Single Beds' },
                ] as { id: FilterTab; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-[6px] transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeFilter === tab.id
                      ? 'bg-[#b82105] text-white shadow-sm'
                      : 'bg-[#EDF2F7] text-[#2D3748] hover:bg-[#E2E8F0]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeFilter === 'all' ? (
              <div className="mt-10 space-y-12">
                {/* Category Row 1: Bunk Beds */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#EDF2F7] border-l-[5px] border-l-[#b82105] px-4 py-2 mb-5">
                    <div>
                      <h3 className="text-[22px] font-bold text-[#1A202C]">Bunk Beds</h3>
                      <p className="text-xs text-gray-500">Heavy-duty steel bunk beds for staff accommodation &amp; camps</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveFilter('bunk-beds')}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#000000] hover:text-[#cf251d] transition-colors cursor-pointer"
                    >
                      <span>View All ({bunkBeds.length})</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {bunkBeds.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                </div>

                {/* Category Row 2: Steel Lockers & Cabinets */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#EDF2F7] border-l-[5px] border-l-[#b82105] px-4 py-2 mb-5">
                    <div>
                      <h3 className="text-[22px] font-bold text-[#1A202C]">
                        Steel Lockers &amp; Cabinets
                      </h3>
                      <p className="text-xs text-gray-500">2-door, 3-door, 4-door, 6-door, 8-door &amp; 12-door security lockers</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveFilter('steel-lockers')}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#000000] hover:text-[#cf251d] transition-colors cursor-pointer"
                    >
                      <span>View All ({steelLockers.length})</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {steelLockers.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                </div>

                {/* Category Row 3: Mattresses (Medical & Labour Camp) */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#EDF2F7] border-l-[5px] border-l-[#b82105] px-4 py-2 mb-5">
                    <div>
                      <h3 className="text-[22px] font-bold text-[#1A202C]">
                        Labour Camp &amp; Medicated Mattresses
                      </h3>
                      <p className="text-xs text-gray-500">High-density medicated &amp; semi-medicated mattresses for bulk camps</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveFilter('mattress')}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#000000] hover:text-[#cf251d] transition-colors cursor-pointer"
                    >
                      <span>View All ({mattresses.length})</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {mattresses.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                </div>

                {/* Category Row 4: Office Tables & Desks */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#EDF2F7] border-l-[5px] border-l-[#b82105] px-4 py-2 mb-5">
                    <div>
                      <h3 className="text-[22px] font-bold text-[#1A202C]">
                        Office Tables &amp; Executive Desks
                      </h3>
                      <p className="text-xs text-gray-500">Executive manager desks, computer tables &amp; meeting tables</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveFilter('office-tables')}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#000000] hover:text-[#cf251d] transition-colors cursor-pointer"
                    >
                      <span>View All ({officeTables.length})</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {officeTables.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                </div>

                {/* Category Row 5: Office Modular Workstations */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#EDF2F7] border-l-[5px] border-l-[#b82105] px-4 py-2 mb-5">
                    <div>
                      <h3 className="text-[22px] font-bold text-[#1A202C]">
                        Office Modular Workstations
                      </h3>
                      <p className="text-xs text-gray-500">2-person, 4-person &amp; 6-person workstations with acoustic divider screens</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveFilter('office-workstation')}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#000000] hover:text-[#cf251d] transition-colors cursor-pointer"
                    >
                      <span>View All ({officeWorkstations.length})</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {officeWorkstations.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                </div>

                {/* Category Row 6: Wardrobes */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#EDF2F7] border-l-[5px] border-l-[#b82105] px-4 py-2 mb-5">
                    <div>
                      <h3 className="text-[22px] font-bold text-[#1A202C]">Wardrobes</h3>
                      <p className="text-xs text-gray-500">2-door &amp; 3-door wooden and steel wardrobes with storage shelves</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveFilter('wardrobe')}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#000000] hover:text-[#cf251d] transition-colors cursor-pointer"
                    >
                      <span>View All ({wardrobes.length})</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {wardrobes.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                </div>

                {/* Category Row 7: Bedroom Beds */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#EDF2F7] border-l-[5px] border-l-[#b82105] px-4 py-2 mb-5">
                    <div>
                      <h3 className="text-[22px] font-bold text-[#1A202C]">
                        Bedroom Beds (King, Queen, Double &amp; Single)
                      </h3>
                      <p className="text-xs text-gray-500">Premium upholstered, wooden &amp; single beds for master &amp; guest bedrooms</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveFilter('beds')}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#000000] hover:text-[#cf251d] transition-colors cursor-pointer"
                    >
                      <span>View All Beds ({bedroomBeds.length})</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {bedroomBeds.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <div className="flex flex-wrap items-center justify-between border-b border-[#EDF2F7] border-l-[5px] border-l-[#b82105] px-4 py-2.5 mb-6">
                  <div>
                    <h3 className="text-[22px] font-bold text-[#1A202C]">
                      {activeFilter === 'mattress' && 'Labour Camp & Medicated Mattresses'}
                      {activeFilter === 'bunk-beds' && 'Heavy-Duty Steel Bunk Beds'}
                      {activeFilter === 'steel-lockers' && 'Steel Lockers & Cabinets'}
                      {activeFilter === 'office-tables' && 'Office Tables & Executive Desks'}
                      {activeFilter === 'office-workstation' && 'Office Modular Workstations'}
                      {activeFilter === 'office-furniture' && 'Office Furniture & Workstations'}
                      {activeFilter === 'wardrobe' && 'Bedroom & Staff Wardrobes'}
                      {activeFilter === 'beds' && 'All Bedroom Beds (King, Queen, Double & Single)'}
                      {activeFilter === 'king-beds' && 'King Size Beds'}
                      {activeFilter === 'queen-beds' && 'Queen Size Beds'}
                      {activeFilter === 'double-beds' && 'Double Beds'}
                      {activeFilter === 'single-beds' && 'Single Beds'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Showing {filteredProducts.length} products
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('all')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b82105] hover:text-[#8a1803] transition-colors cursor-pointer"
                  >
                    <span>View All Categories</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={setSelectedProduct}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section> 
            
        {/* SEO Content: UAE Labour Camp & Wholesale Furniture */}
        <section
          id="uae-furniture-seo"
          className="w-full bg-[#F7FAFC] py-12 md:py-16"
        >
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="space-y-8 text-[#2D3748]">
              <div className="text-center">
                <h2 className="text-[26px] md:text-[32px] font-bold text-[#1A202C]">
                  Wholesale Labour Camp &amp; Staff Accommodation Furniture in UAE
                </h2>
                <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.8]">
                  NAD Furniture supplies factory-direct wholesale furniture
                  for labour camps, staff accommodation, offices, schools and
                  commercial projects. Our product range includes heavy-duty
                  steel bunk beds, steel storage lockers, accommodation
                  mattresses, office tables and workstations, wardrobes and
                  bedroom beds. We cater to bulk furniture enquiries from
                  commercial buyers and project customers.
                </p>
              </div>

              <div>
                <h3 className="text-[21px] font-bold text-[#1A202C]">
                  Labour Camp Furniture Supplier UAE &amp; Dubai
                </h3>
                <p className="mt-2 text-[15px] leading-[1.8]">
                  Looking for labour camp furniture in Dubai or elsewhere
                  in the UAE? Explore practical furniture solutions for
                  staff housing, worker accommodation, construction
                  facilities and large-scale accommodation projects.
                  Contact NAD Furniture for wholesale and bulk enquiries.
                </p>
              </div>

              <div>
                <h3 className="text-[21px] font-bold text-[#1A202C]">
                  Steel Bunk Beds UAE – Heavy Duty Steel Bunk Beds
                </h3>
                <p className="mt-2 text-[15px] leading-[1.8]">
                  Explore heavy-duty steel bunk beds for labour camps,
                  staff accommodation, hostels and institutional projects.
                  Contact us for product details and bulk order enquiries.
                </p>
              </div>

              <div>
                <h3 className="text-[21px] font-bold text-[#1A202C]">
                  Steel Storage Lockers UAE
                </h3>
                <p className="mt-2 text-[15px] leading-[1.8]">
                  Discover steel storage lockers and multi-door locker
                  cabinets for staff rooms, worker accommodation, offices
                  and commercial facilities.
                </p>
              </div>

              <div>
                <h3 className="text-[21px] font-bold text-[#1A202C]">
                  Staff Accommodation Mattresses UAE
                </h3>
                <p className="mt-2 text-[15px] leading-[1.8]">
                  Find accommodation mattresses for staff housing,
                  labour camps and institutional requirements.
                  Wholesale and bulk enquiries are welcome.
                </p>
              </div>

              <div>
                <h3 className="text-[21px] font-bold text-[#1A202C]">
                  Staff Accommodation Furniture UAE
                </h3>
                <p className="mt-2 text-[15px] leading-[1.8]">
                  NAD Furniture offers furniture options for staff
                  accommodation, including bunk beds, lockers, mattresses,
                  wardrobes and other practical furniture solutions.
                </p>
              </div>

              <div>
                <h3 className="text-[21px] font-bold text-[#1A202C]">
                  Wholesale Furniture Supplier UAE – Bulk &amp; Factory Direct
                </h3>
                <p className="mt-2 text-[15px] leading-[1.8]">
                  NAD Furniture welcomes wholesale furniture supplier
                  enquiries, bulk furniture orders and factory-direct
                  furniture requirements for commercial and accommodation
                  projects across Dubai, Sharjah, Ajman, Abu Dhabi and
                  other UAE locations.
                </p>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => openBulkQuote()}
                  className="inline-flex items-center gap-2 rounded-[6px] bg-[#b82105] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#8a1803] transition-colors cursor-pointer"
                >
                  Request Wholesale Furniture Quote
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

            {/* 6. Parallax / Full-Width Highlight Banner */}
        <section
          className="w-full relative bg-cover bg-center py-28"
          style={{
            backgroundImage: `url(${SITE_IMAGES.parallaxBg}), url(${SITE_IMAGES.parallaxBgFallback})`,
          }}
        >
          <div className="mx-auto max-w-[1290px] px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('bunk-beds')}
                  className="group flex w-[240px] items-center rounded-[100px] bg-[#EDF2F7] p-2 hover:bg-[#b82105] hover:shadow-[0_0_14px_0_rgba(0,0,0,0.2)] transition-all cursor-pointer"
                >
                  <img
                    src={SITE_IMAGES.bestSellerThumb}
                    alt="Bunk Beds"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== SITE_IMAGES.catBunkBedFallback) {
                        target.src = SITE_IMAGES.catBunkBedFallback;
                      }
                    }}
                    className="h-[45px] w-[45px] rounded-full object-cover mx-[15px] shrink-0"
                  />
                  <h3 className="font-sans text-[20px] font-bold text-[#1A202C] group-hover:text-white transition-colors">
                    Bunk Beds
                  </h3>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('steel-lockers')}
                  className="group flex w-[240px] items-center rounded-[100px] bg-[#EDF2F7] p-2 hover:bg-[#b82105] hover:shadow-[0_0_14px_0_rgba(0,0,0,0.2)] transition-all cursor-pointer"
                >
                  <img
                    src={SITE_IMAGES.newArrivalsThumb}
                    alt="Steel Lockers"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== SITE_IMAGES.catLockersFallback) {
                        target.src = SITE_IMAGES.catLockersFallback;
                      }
                    }}
                    className="h-[45px] w-[45px] rounded-full object-cover mx-[15px] shrink-0"
                  />
                  <h3 className="font-sans text-[20px] font-bold text-[#1A202C] group-hover:text-white transition-colors">
                    Steel Lockers
                  </h3>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('office-furniture')}
                  className="group flex w-[240px] items-center rounded-[100px] bg-[#EDF2F7] p-2 hover:bg-[#b82105] hover:shadow-[0_0_14px_0_rgba(0,0,0,0.2)] transition-all cursor-pointer"
                >
                  <img
                    src={SITE_IMAGES.onSaleThumb}
                    alt="Office Furniture"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== SITE_IMAGES.officeFallback) {
                        target.src = SITE_IMAGES.officeFallback;
                      }
                    }}
                    className="h-[45px] w-[45px] rounded-full object-cover mx-[15px] shrink-0"
                  />
                  <h3 className="font-sans text-[20px] font-bold text-[#1A202C] group-hover:text-white transition-colors">
                    Office Furniture
                  </h3>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Beds & Accommodation Furniture Split Section */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="mx-auto max-w-[1290px] px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="lg:pr-12 space-y-3.5">
                <h2 className="text-[26px] md:text-[30px] font-bold text-[#1A202C]">
                  Beds &amp; Accommodation Furniture
                </h2>
                <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#2D3748]">
                  Durable beds, bunk beds and accommodation furniture for homes, labour
                  camps, staff housing, hotels and commercial projects across the UAE.
                  Available for individual orders and bulk project supply.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('beds')}
                    className="inline-flex items-center gap-2.5 rounded-[6px] bg-[#b82105] px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#9e1c06] transition-colors cursor-pointer"
                  >
                    <span>Shop Beds</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-0 items-start">
                <div className="md:mt-[40px] md:-mr-[20px] md:ml-[20px] relative z-10 overflow-hidden rounded-[8px] border border-[#2D3748] bg-white shadow-sm">
                  <img
                    src={SITE_IMAGES.kingBed2}
                    alt="king size bed"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== SITE_IMAGES.bedroomFallback) {
                        target.src = SITE_IMAGES.bedroomFallback;
                      }
                    }}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-[8px] border border-[#2D3748] bg-white shadow-sm">
                  <img
                    src={SITE_IMAGES.kingBed1}
                    alt="king size bed"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== SITE_IMAGES.bedroomFallback) {
                        target.src = SITE_IMAGES.bedroomFallback;
                      }
                    }}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Who We Serve */}
        <section id="who-we-serve" className="w-full py-8 md:py-10 bg-white">
          <div className="mx-auto max-w-[1290px] px-6">
            <div className="text-center mb-6">
              <h2 className="text-[26px] md:text-[30px] font-bold text-[#1A202C]">Who We Serve</h2>
              <p className="mt-2 text-[15px] sm:text-[16px] text-[#2D3748]">
                We deliver end-to-end staff accommodation furnishings—outfitting thousands
                of units every month for:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {[
                { label: 'Construction Companies', Icon: Building2 },
                { label: 'Facility Management', Icon: Wrench },
                { label: 'Manpower Agencies', Icon: Users },
                { label: 'Real Estate Developers', Icon: Landmark },
                { label: 'Labour Camps', Icon: HardHat },
                { label: 'Government Housing Projects', Icon: Building },
              ].map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center border border-[#1A202C] p-3.5 text-center"
                >
                  <Icon
                    className="h-[52px] w-[52px] text-[#b82105] mb-2 stroke-[1.5]"
                    aria-hidden="true"
                  />
                  <p className="text-[14px] sm:text-[15px] text-[#2D3748] leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Office Furniture for Modern Workspaces in UAE */}
        <section className="w-full py-12 md:py-16 bg-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div
              className="min-h-[240px] md:min-h-[320px] lg:min-h-[440px] bg-cover bg-center lg:rounded-r-[60px]"
              style={{
                backgroundImage: `url(${SITE_IMAGES.homeFurniture}), url(${SITE_IMAGES.bedroomFallback})`,
                backgroundPosition: '50% 90%',
              }}
              aria-label="Home furniture"
            />

            <div className="p-6 lg:p-10 space-y-3.5">
              <h2 className="text-[26px] md:text-[30px] font-bold text-[#1A202C]">
                Office Furniture for Modern Workspaces in UAE
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#2D3748]">
                Create productive and professional workspaces with durable office furniture
                for corporate offices, staff areas and commercial projects. Explore office
                desks, workstations, ergonomic chairs, storage solutions and more, with bulk
                supply available across Dubai and the UAE.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => handleCategorySelect('office-furniture')}
                  className="inline-flex items-center gap-2.5 rounded-[6px] bg-[#b82105] px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#8f1a05] transition-colors cursor-pointer"
                >
                  <span>Shop Office Furniture</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              className="min-h-[240px] md:min-h-[320px] lg:min-h-[440px] bg-cover bg-center lg:rounded-l-[60px]"
              style={{
                backgroundImage: `url(${SITE_IMAGES.officeFurniture}), url(${SITE_IMAGES.officeFallback})`,
              }}
              aria-label="Office furniture"
            />
          </div>
        </section>
        </>
        )}
      </main>

      {/* Footer */}
      <footer id="colophon" className="w-full bg-[#131313] text-white">
        <div className="mx-auto max-w-[1290px] px-6 pt-16 md:pt-20 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Col 1: Brand & Social */}
            <div className="space-y-3.5">
              <div className="mb-2">
                <NadBrandMark />
              </div>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#CBD5E0]">
                NAD Group of Companies is a trusted UAE manufacturer of office furniture
                and steel furniture, delivering quality craftsmanship, innovative designs,
                and reliable solutions for businesses, institutions, and commercial
                projects.
              </p>
              <div className="flex items-center gap-4 pt-1">
                <a
                  href="https://www.facebook.com/nadfurniturellc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="text-white hover:text-[#cf251d] transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V9.5A3.5 3.5 0 0 1 15.5 6H18v3h-2a1 1 0 0 0-1 1v1h3l-.5 3H15v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/nadfurnituredubai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="text-white hover:text-[#cf251d] transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.pinterest.com/nadfurnituredubai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  title="Pinterest"
                  className="text-white hover:text-[#cf251d] transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-6.8 14.2c-.9 0-1.7-.4-2.1-.9l-.6 2.3c-.2.7-.6 1.5-1 2-.1.1-.2.1-.2-.1-.1-.7-.1-1.7.1-2.5l.8-3.3s-.2-.4-.2-1c0-.9.5-1.6 1.2-1.6.6 0 .8.4.8 1 0 .6-.4 1.5-.6 2.3-.2.7.3 1.2 1 1.2 1.2 0 2.1-1.3 2.1-3.1 0-1.6-1.2-2.8-2.9-2.8-2 0-3.1 1.5-3.1 3 0 .6.2 1.2.5 1.6.1.1.1.2 0 .3l-.2.7c0 .1-.1.2-.3.1-1-.5-1.6-1.9-1.6-3.1 0-2.5 1.8-4.8 5.2-4.8 2.7 0 4.9 2 4.9 4.6 0 2.7-1.7 4.9-4.1 4.9z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Company */}
            <div>
              <div className="text-[19px] sm:text-[20px] font-bold text-white mb-3">Company</div>
              <ul className="space-y-2 text-[14px] sm:text-[15px] text-[#E2E8F0]">
                <li>
                  <button
                    type="button"
                    onClick={handleAboutUsClick}
                    className="hover:text-[#cf251d] transition-colors cursor-pointer"
                  >
                    ▸ About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleProjectGalleryClick}
                    className="hover:text-[#cf251d] transition-colors cursor-pointer"
                  >
                    ▸ Project Gallery
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleBlogsClick}
                    className="hover:text-[#cf251d] transition-colors cursor-pointer"
                  >
                    ▸ Blogs
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleCareerClick}
                    className="hover:text-[#cf251d] transition-colors cursor-pointer"
                  >
                    ▸ Career
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openBulkQuote()}
                    className="hover:text-[#cf251d] transition-colors cursor-pointer"
                  >
                    ▸ Request a Quote
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Shop */}
            <div>
              <div className="text-[19px] sm:text-[20px] font-bold text-white mb-3">Shop</div>
              <ul className="space-y-2 text-[14px] sm:text-[15px] text-[#E2E8F0]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('bunk-beds')}
                    className="hover:text-[#cf251d] transition-colors cursor-pointer"
                  >
                    ▸ Bunk Bed
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('steel-lockers')}
                    className="hover:text-[#cf251d] transition-colors cursor-pointer"
                  >
                    ▸ Steel Lockers &amp; Cabinets
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('office-furniture')}
                    className="hover:text-[#cf251d] transition-colors cursor-pointer"
                  >
                    ▸ Office Tables
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('office-furniture')}
                    className="hover:text-[#cf251d] transition-colors cursor-pointer"
                  >
                    ▸ Office Workstations
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('wardrobe')}
                    className="hover:text-[#cf251d] transition-colors cursor-pointer"
                  >
                    ▸ Wardrobe
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('beds')}
                    className="hover:text-[#cf251d] transition-colors cursor-pointer"
                  >
                    ▸ Beds
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact NAD Furniture */}
            <div className="space-y-3">
              <div className="text-[19px] sm:text-[20px] font-bold text-white mb-3">
                Contact NAD Furniture
              </div>
              <p className="text-[14px] sm:text-[15px] text-[#E2E8F0]">
                📍 NAD Building, Naif Street, Dubai, UAE
              </p>
              <p className="text-[14px] text-[#E2E8F0]">
                ☎ <strong>Call:</strong> +971 50 631 6560
                <br />
                ✉️ <strong>Email:</strong>{' '}
                <a
                  href="mailto:info@NAD.furniture"
                  className="hover:text-[#cf251d] transition-colors"
                >
                  info@NAD.furniture
                </a>
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 pb-2 text-[14px] text-[#A0AEC0] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="select-none">
              &copy; 2026 NAD Furniture UAE. All rights reserved.
            </p>
            <button
              type="button"
              onClick={openLoginModal}
              className="inline-flex items-center gap-1.5 text-xs text-[#718096] hover:text-[#cf251d] transition-colors cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Chat Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp us"
        title="WhatsApp us"
        className="fixed bottom-[76px] lg:bottom-[200px] right-[10px] z-40 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe5d] transition-colors"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      {/* Floating AI Assistant Chat below WhatsApp */}
      <AiAssistantChat onOpenBulkQuote={() => openBulkQuote()} />

      {/* Modals */}
      <BulkQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={quoteProduct}
      />

      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestQuote={(title) => openBulkQuote(title)}
      />

      {/* Owner-Only Administration & Editing Modals */}
      <OwnerControlBar />
      <OwnerPortalModal />
      <ProductEditorModal />
      <OwnerCatalogManagerModal />
    </div>
  );
}

export default function App() {
  return (
    <CatalogProvider>
      <MainAppContent />
    </CatalogProvider>
  );
}
