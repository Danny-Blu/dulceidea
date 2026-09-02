import React, { useState, useEffect } from 'react';
import { AppPage, ProductCategory, ProductItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { CtaFinalSection } from './components/CtaFinalSection';
import { CategoriesSection } from './components/CategoriesSection';
import { MenuSection } from './components/MenuSection';
import { FlavorsSection } from './components/FlavorsSection';
import { GallerySection } from './components/GallerySection';
import { ProcessSection } from './components/ProcessSection';
import { AvailabilitySection } from './components/AvailabilitySection';
import { CotizadorWizard } from './components/CotizadorWizard';
import { PageNavigationBanner } from './components/PageNavigationBanner';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ArrowLeft, ArrowRight, Cake, Sparkles } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<AppPage>('inicio');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [wizardProduct, setWizardProduct] = useState<string>('Torta Personalizada');
  const [wizardBase, setWizardBase] = useState<string>('Vainilla Francesa Clásica');
  const [wizardFilling, setWizardFilling] = useState<string>('Frambuesa Confitada Natural');
  const [wizardReference, setWizardReference] = useState<string>('');
  const [wizardDate, setWizardDate] = useState<string>('2026-09-04');

  // Handle URL hash sync on mount and on hash changes
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash || hash === 'inicio') {
        setActivePage('inicio');
      } else if (hash === 'menu' || hash === 'sabores' || hash === 'categorias' || hash === 'menu-sabores') {
        setActivePage('menu-sabores');
      } else if (hash === 'galeria' || hash === 'inspiracion') {
        setActivePage('inspiracion');
      } else if (hash === 'proceso' || hash === 'como-pedir') {
        setActivePage('como-pedir');
      } else if (hash === 'cotizador' || hash === 'disponibilidad' || hash === 'cotizar-disponibilidad') {
        setActivePage('cotizar-disponibilidad');
      } else if (hash === 'nosotros' || hash === 'faq' || hash === 'testimonios') {
        setActivePage('inicio');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Centralized navigation handler
  const handleNavigate = (page: AppPage, anchor?: string) => {
    setActivePage(page);
    window.location.hash = anchor || page;

    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Category selection handler from Categories (within menu-sabores)
  const handleSelectCategoryFromHome = (catId: string) => {
    setSelectedCategory(catId as ProductCategory);
    setTimeout(() => {
      const menuEl = document.getElementById('menu');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Quote a specific category directly
  const handleQuoteCategory = (catId: string) => {
    const categoryNames: Record<string, string> = {
      tortas: 'Torta Personalizada',
      minicakes: 'Mini Bento Cake',
      cupcakes: 'Caja de Cupcakes Artesanales',
      cookies: 'Cookies New York Style',
      boxes: 'Box Dulce Degustación',
      postres: 'Cheesecake Frutos Rojos',
    };
    if (categoryNames[catId]) {
      setWizardProduct(categoryNames[catId]);
    }
    handleNavigate('cotizar-disponibilidad', 'cotizador');
  };

  // Product selection handler from Menu
  const handleSelectProductForQuote = (product: ProductItem) => {
    setWizardProduct(product.name);
    if (product.flavorsAvailable.length > 0) {
      setWizardBase(product.flavorsAvailable[0]);
    }
    handleNavigate('cotizar-disponibilidad', 'cotizador');
  };

  // Flavor selection handler from Flavors section
  const handlePreselectFlavors = (base: string, filling: string) => {
    setWizardBase(base);
    setWizardFilling(filling);
    handleNavigate('cotizar-disponibilidad', 'cotizador');
  };

  // Reference from Gallery
  const handleUseReferenceForQuote = (referenceTitle: string) => {
    setWizardReference(referenceTitle);
    handleNavigate('cotizar-disponibilidad', 'cotizador');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2] text-[#432818] font-sans selection:bg-[#F7D5D9] selection:text-[#432818] flex flex-col justify-between">
      {/* Sticky Header with 5 Page Tabs */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenOrderModal={() => handleNavigate('cotizar-disponibilidad', 'cotizador')}
      />

      {/* Main Content Area */}
      <main className="grow">
        {/* Secondary Page Breadcrumb Banner */}
        <PageNavigationBanner currentPage={activePage} onNavigate={handleNavigate} />

        {/* =========================================================================
            HOJITA 1: INICIO (Hero + Nosotros + Testimonios + FAQ + CTA Final)
            "pon nosotros después de inicio, FAQ esta bien, se queda en el inicio"
        ========================================================================== */}
        {activePage === 'inicio' && (
          <div key="page-inicio" className="animate-fadeIn">
            {/* 1. Hero */}
            <Hero onNavigate={handleNavigate} />

            {/* Quick Teaser Strip between Hero & Nosotros */}
            <div className="bg-[#FBE8EC]/60 py-6 border-y border-[#F2E6DA]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-xl shadow-xs text-[#C44E72]">
                    <Cake className="w-5 h-5" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#432818] font-semibold">
                    ¿Buscás nuestro catálogo o querés inspirarte con fotos de diseños?
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleNavigate('menu-sabores')}
                    className="text-xs font-bold text-[#C44E72] hover:text-[#a63d5d] bg-white px-4 py-2 rounded-full border border-[#F7D5D9] shadow-xs cursor-pointer"
                  >
                    Ver Menú & Sabores →
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('inspiracion')}
                    className="text-xs font-bold text-[#432818] hover:text-[#C44E72] bg-white/70 px-4 py-2 rounded-full border border-[#F2E6DA] cursor-pointer"
                  >
                    Ver Galería →
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Nosotros (Sobre Nosotros & Sofía - right after Hero as requested) */}
            <AboutSection />

            {/* 3. Testimonios */}
            <TestimonialsSection />

            {/* 4. Preguntas Frecuentes (FAQ se queda en el inicio como solicitado) */}
            <FaqSection />

            {/* 5. CTA Final Emocional */}
            <CtaFinalSection onNavigate={handleNavigate} />
          </div>
        )}

        {/* =========================================================================
            HOJITA 2: MENÚ & SABORES (Categorías + Menú + Sabores)
            "pon las categorias, menu y sabores en uno"
        ========================================================================== */}
        {activePage === 'menu-sabores' && (
          <div key="page-menu-sabores" className="animate-fadeIn">
            {/* Categorías Destacadas */}
            <CategoriesSection
              onSelectCategory={handleSelectCategoryFromHome}
              onQuoteCategory={handleQuoteCategory}
            />

            {/* Menú Completo de Autor */}
            <MenuSection
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onSelectProductForQuote={handleSelectProductForQuote}
            />

            {/* Sabores de Bizcochos & Rellenos */}
            <FlavorsSection onPreselectFlavors={handlePreselectFlavors} />

            {/* Bottom Page Transition Navigator */}
            <div className="py-12 bg-white border-t border-[#F2E6DA]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => handleNavigate('inicio')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#8A645A] hover:text-[#C44E72] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a Inicio</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleNavigate('inspiracion')}
                    className="inline-flex items-center gap-2 bg-[#FBE8EC] hover:bg-[#F7D5D9] text-[#C44E72] px-6 py-3 rounded-full font-bold text-sm transition-colors cursor-pointer"
                  >
                    <span>Ver Galería de Inspiración</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate('cotizar-disponibilidad')}
                    className="inline-flex items-center gap-2 bg-[#C44E72] hover:bg-[#a63d5d] text-white px-6 py-3 rounded-full font-bold text-sm shadow-md transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#F5C49D]" />
                    <span>Cotizar mi pedido</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            HOJITA 3: INSPIRACIÓN (Galería suelta)
            "inspiracion suelta"
        ========================================================================== */}
        {activePage === 'inspiracion' && (
          <div key="page-inspiracion" className="animate-fadeIn">
            {/* Galería / Portafolio tipo Pinterest */}
            <GallerySection onUseReferenceForQuote={handleUseReferenceForQuote} />

            {/* Bottom Page Transition Navigator */}
            <div className="py-12 bg-white border-t border-[#F2E6DA]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => handleNavigate('menu-sabores')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#8A645A] hover:text-[#C44E72] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a Menú & Sabores</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleNavigate('como-pedir')}
                    className="inline-flex items-center gap-2 bg-[#FBE8EC] hover:bg-[#F7D5D9] text-[#C44E72] px-6 py-3 rounded-full font-bold text-sm transition-colors cursor-pointer"
                  >
                    <span>Ver Cómo Pedir</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate('cotizar-disponibilidad')}
                    className="inline-flex items-center gap-2 bg-[#C44E72] hover:bg-[#a63d5d] text-white px-6 py-3 rounded-full font-bold text-sm shadow-md transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#F5C49D]" />
                    <span>Cotizar con un diseño</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            HOJITA 4: CÓMO PEDIR (Proceso suelto)
            "como pedir suelta"
        ========================================================================== */}
        {activePage === 'como-pedir' && (
          <div key="page-como-pedir" className="animate-fadeIn">
            {/* 6 Pasos para Personalizar Tu Pedido & Cuidados */}
            <ProcessSection onNavigate={handleNavigate} />

            {/* Bottom Page Transition Navigator */}
            <div className="py-12 bg-white border-t border-[#F2E6DA]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => handleNavigate('inspiracion')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#8A645A] hover:text-[#C44E72] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a Inspiración</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate('cotizar-disponibilidad')}
                  className="inline-flex items-center gap-2 bg-[#C44E72] hover:bg-[#a63d5d] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#F5C49D]" />
                  <span>Ir a Cotizar & Ver Disponibilidad</span>
                  <ArrowRight className="w-4 h-4 text-[#F5C49D]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            HOJITA 5: COTIZAR & DISPONIBILIDAD (Disponibilidad + Cotizador en uno)
            "cotizar y disponibilidad en uno"
        ========================================================================== */}
        {activePage === 'cotizar-disponibilidad' && (
          <div key="page-cotizar-disponibilidad" className="animate-fadeIn">
            {/* Disponibilidad & Calendario en vivo (Semáforo de Cupos) */}
            <AvailabilitySection onSelectDate={(dateStr) => setWizardDate(dateStr)} />

            {/* Formulario Guiado / Cotizador Wizard */}
            <CotizadorWizard
              key={`${wizardProduct}-${wizardBase}-${wizardFilling}-${wizardReference}-${wizardDate}`}
              initialProduct={wizardProduct}
              initialBase={wizardBase}
              initialFilling={wizardFilling}
              initialReference={wizardReference}
              initialDate={wizardDate}
            />

            {/* Bottom Page Transition Navigator */}
            <div className="py-12 bg-white border-t border-[#F2E6DA]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => handleNavigate('menu-sabores')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#8A645A] hover:text-[#C44E72] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver al Menú & Sabores</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate('inicio')}
                  className="inline-flex items-center gap-2 bg-[#FFF8F2] hover:bg-[#FBE8EC] text-[#432818] border border-[#F2E6DA] px-6 py-3 rounded-full font-bold text-sm transition-colors cursor-pointer"
                >
                  <Cake className="w-4 h-4 text-[#C44E72]" />
                  <span>Volver a Inicio</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Premium with Page Navigation */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp Quick Action */}
      <FloatingWhatsApp onNavigate={handleNavigate} />
    </div>
  );
}
