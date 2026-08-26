/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ActivitySection } from './components/ActivitySection';
import { ProgramSection } from './components/ProgramSection';
import { TrackingSection } from './components/TrackingSection';
import { EventListSection } from './components/EventListSection';
import { TestimonialBookingSection } from './components/TestimonialBookingSection';
import { FooterSection } from './components/FooterSection';
import {
  GetInTouchModal,
  BookingModal,
  SettingsModal,
} from './components/Modals';
import { UserProfile, OrderItem, OrderRecord, BookingRecord } from './types';

import { ProductsPage } from './components/ProductsPage';
import { EventsPage } from './components/EventsPage';
import { AboutPage } from './components/AboutPage';
import { AuthPage } from './components/AuthPage';
import { CheckoutPage } from './components/CheckoutPage';
import { DashboardPage } from './components/DashboardPage';
import { LabPage } from './components/LabPage';
import { BookingPage } from './components/BookingPage';
import { ArenaHubPage } from './components/ArenaHubPage';

const INITIAL_USER: UserProfile = {
  id: 'usr_granger_9821',
  name: 'Alex Granger',
  email: 'alex.granger@athletics.io',
  role: 'Athlete',
  membershipTier: 'Pro Athlete',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  campusPoints: 1450,
  qrToken: 'GR-SD-88219',
  joinedDate: 'OCTOBER 2025',
  phone: '+1 (858) 492-7700',
  emergencyContact: 'Dr. Arthur Granger (+1 858-555-0199)',
  primarySport: 'Basketball',
  readinessScore: 88,
};

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'GR-ORD-8812',
    date: 'Feb 20, 2026',
    items: [
      {
        id: '1',
        name: 'Granger Apex Official Hardwood Basketball',
        price: 110,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
        category: 'Equipment',
        sport: 'Basketball',
      },
      {
        id: '4',
        name: 'Hyper-Recovery Hydro Electrolyte Matrix',
        price: 48,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
        category: 'Nutrition',
        sport: 'All-Sport',
      },
    ],
    totalAmount: 206,
    shippingMethod: 'Campus Smart Locker Pickup',
    shippingAddress: 'San Diego Campus HQ - Bay Locker #14',
    paymentMethod: 'Credit Card',
    status: 'Ready for Pickup / Delivered',
    trackingNumber: 'TRK-GR77192',
    estimatedDelivery: 'Ready in Bay Locker #14',
  },
];

const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'bk-101',
    facilityName: 'Roland Clay Tennis Stadium (Court #02)',
    category: 'Roland Clay Tennis',
    coachName: 'Coach Marcus Sterling',
    date: 'TODAY, FEB 26, 2026',
    timeSlot: '04:30 PM - 06:00 PM',
    courtNumber: 'Clay #02',
    status: 'Confirmed',
    price: '$99',
    qrPassCode: 'PASS-CLAY-02-FEB26',
  },
  {
    id: 'bk-102',
    facilityName: 'Hardwood Championship Arena (Main Court)',
    category: 'Hardwood Court',
    coachName: 'Maya Thorne',
    date: 'SATURDAY, FEB 28, 2026',
    timeSlot: '10:00 AM - 12:00 PM',
    courtNumber: 'Hardwood #01',
    status: 'Confirmed',
    price: '$120',
    qrPassCode: 'PASS-HARDWOOD-01-MAR02',
  },
];

export default function App() {
  const [activeNav, setActiveNav] = useState<string>('Program');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_USER);
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [checkoutCart, setCheckoutCart] = useState<OrderItem[]>([
    {
      id: '1',
      name: 'Granger Apex Official Hardwood Basketball',
      price: 110,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
      category: 'Equipment',
      sport: 'Basketball',
    },
  ]);

  const [touchModalOpen, setTouchModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    title: 'Single Session with Professional Trainer',
    price: '$99',
  });
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('dark');

    // Sync initial route from URL path or hash
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (
      path.includes('login') ||
      path.includes('auth') ||
      path.includes('register') ||
      hash.includes('auth') ||
      hash.includes('login')
    ) {
      setActiveNav('Auth');
    } else if (path.includes('booking') || hash.includes('booking')) {
      setActiveNav('Booking');
    } else if (path.includes('lab') || hash.includes('lab')) {
      setActiveNav('Lab');
    } else if (path.includes('arena') || path.includes('hub') || hash.includes('arena')) {
      setActiveNav('Arena Hub');
    } else if (path.includes('product') || path.includes('shop') || hash.includes('product')) {
      setActiveNav('Product');
    } else if (path.includes('event') || hash.includes('event')) {
      setActiveNav('Events');
    } else if (path.includes('about') || hash.includes('about')) {
      setActiveNav('About');
    } else if (path.includes('dashboard') || hash.includes('dashboard')) {
      setActiveNav('Dashboard');
    } else if (path.includes('checkout') || hash.includes('checkout')) {
      setActiveNav('Checkout');
    }

    const handlePopState = () => {
      const currentPath = window.location.pathname.toLowerCase();
      if (currentPath.includes('login') || currentPath.includes('auth') || currentPath.includes('register')) {
        setActiveNav('Auth');
      } else if (currentPath.includes('booking')) {
        setActiveNav('Booking');
      } else if (currentPath.includes('lab')) {
        setActiveNav('Lab');
      } else if (currentPath.includes('arena') || currentPath.includes('hub')) {
        setActiveNav('Arena Hub');
      } else if (currentPath.includes('product') || currentPath.includes('shop')) {
        setActiveNav('Product');
      } else if (currentPath.includes('event')) {
        setActiveNav('Events');
      } else if (currentPath.includes('about')) {
        setActiveNav('About');
      } else if (currentPath.includes('dashboard')) {
        setActiveNav('Dashboard');
      } else if (currentPath.includes('checkout')) {
        setActiveNav('Checkout');
      } else {
        setActiveNav('Program');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavSelect = (nav: string) => {
    setActiveNav(nav);
    const slug = nav === 'Program' ? '/' : `/${nav.toLowerCase().replace(/\s+/g, '-')}`;
    try {
      window.history.pushState(null, '', slug);
    } catch {
      // safe fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = (cartItems: OrderItem[]) => {
    setCheckoutCart(cartItems);
    setActiveNav('Checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderCompleted = (newOrder: OrderRecord) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCheckoutCart([]);
  };

  const handleBookingConfirmed = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setActiveNav('Dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveNav('Program');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookSingleSession = () => {
    setBookingDetails({
      title: 'Single Session with Professional Trainer',
      price: '$99',
    });
    setBookingModalOpen(true);
  };

  const handleJoinVisionary = () => {
    setBookingDetails({
      title: 'Visionary Precision Play Membership',
      price: '$180 / Month',
    });
    setBookingModalOpen(true);
  };

  const handleMeetCoaches = () => {
    setBookingDetails({
      title: '1-on-1 Elite Coach Consultation',
      price: '$120 / Session',
    });
    setBookingModalOpen(true);
  };

  const handleSelectEvent = (eventName: string, price: string = '$45 / Entry') => {
    setBookingDetails({
      title: eventName,
      price: price,
    });
    setBookingModalOpen(true);
  };

  const handleBookTour = () => {
    setBookingDetails({
      title: 'VIP Granger Campus & Facilities Tour',
      price: 'Complimentary',
    });
    setBookingModalOpen(true);
  };

  const scrollToActivitySection = () => {
    const el = document.getElementById('activity-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#0A0A0A] selection:bg-[#FF671C] selection:text-white flex flex-col font-sans transition-colors duration-300">
      {/* Top Fixed Header */}
      <Navbar
        activeNav={activeNav}
        currentUser={currentUser}
        onSelectNav={handleNavSelect}
        onOpenGetInTouch={() => setTouchModalOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
        onNavigateAuth={() => handleNavSelect('Auth')}
        onNavigateDashboard={() => handleNavSelect('Dashboard')}
        onLogout={handleLogout}
      />

      {/* Main Content View Switcher with Smooth AnimatePresence */}
      <main className="flex-grow w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {activeNav === 'Auth' ? (
            <motion.div
              key="auth-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <AuthPage
                onLoginSuccess={handleLoginSuccess}
                onNavigateHome={() => handleNavSelect('Program')}
              />
            </motion.div>
          ) : activeNav === 'Checkout' ? (
            <motion.div
              key="checkout-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <CheckoutPage
                cart={checkoutCart}
                currentUser={currentUser}
                onOrderCompleted={handleOrderCompleted}
                onNavigateShop={() => handleNavSelect('Product')}
                onNavigateDashboard={() => handleNavSelect('Dashboard')}
              />
            </motion.div>
          ) : activeNav === 'Dashboard' && currentUser ? (
            <motion.div
              key="dashboard-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <DashboardPage
                currentUser={currentUser}
                orders={orders}
                bookings={bookings}
                onLogout={handleLogout}
                onNavigateShop={() => handleNavSelect('Product')}
                onNavigateEvents={() => handleNavSelect('Events')}
                onBookNewSession={handleBookSingleSession}
              />
            </motion.div>
          ) : activeNav === 'Lab' ? (
            <motion.div
              key="lab-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <LabPage
                onBookLabSession={() => handleNavSelect('Booking')}
                onNavigateHome={() => handleNavSelect('Program')}
              />
            </motion.div>
          ) : activeNav === 'Booking' ? (
            <motion.div
              key="booking-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <BookingPage
                currentUser={currentUser}
                onBookingConfirmed={handleBookingConfirmed}
                onNavigateDashboard={() => handleNavSelect('Dashboard')}
              />
            </motion.div>
          ) : activeNav === 'Arena Hub' ? (
            <motion.div
              key="arena-hub-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArenaHubPage
                currentUser={currentUser}
                onOpenBooking={() => handleNavSelect('Booking')}
              />
            </motion.div>
          ) : activeNav === 'Product' ? (
            <motion.div
              key="product-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductsPage
                onBackToHome={() => handleNavSelect('Program')}
                onOpenGetInTouch={() => setTouchModalOpen(true)}
                onProceedToCheckout={handleProceedToCheckout}
              />
            </motion.div>
          ) : activeNav === 'Events' ? (
            <motion.div
              key="events-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <EventsPage
                onSelectEvent={handleSelectEvent}
                onOpenGetInTouch={() => setTouchModalOpen(true)}
              />
            </motion.div>
          ) : activeNav === 'About' ? (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <AboutPage
                onOpenGetInTouch={() => setTouchModalOpen(true)}
                onBookTour={handleBookTour}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* 1. Hero Section with Top-Down Basketball Court & Direct CTAs */}
              <HeroSection
                onExplorePrograms={scrollToActivitySection}
                onJoinOrBook={() => handleNavSelect('Booking')}
              />

              {/* 2. Activity Section (The Benefit, Explore flexible activity, Bento cards) */}
              <div id="activity-section">
                <ActivitySection onJoinNow={() => handleNavSelect('Booking')} />
              </div>

              {/* 3. Program Section (The coach experts, Premium facilities) */}
              <ProgramSection
                onMeetCoaches={handleMeetCoaches}
                onExploreFacilities={() => handleNavSelect('About')}
              />

              {/* 4. Tracking Section (Activity / Diet / Sleep interactive chart) */}
              <TrackingSection onViewDashboard={() => handleNavSelect('Lab')} />

              {/* 5. Events List (Dark high-contrast interactive list with inline drawers) */}
              <div id="events-section">
                <EventListSection
                  onSelectEvent={(name, price) => {
                    handleSelectEvent(name, price);
                  }}
                  onNavigateEvents={() => handleNavSelect('Events')}
                />
              </div>

              {/* 6. Testimonial Carousel & Trainer Single Session Booking */}
              <TestimonialBookingSection onBookNow={() => handleNavSelect('Booking')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 7. Footer Section with Interactive Navigation */}
      <FooterSection
        onNavigate={handleNavSelect}
        isMinimal={['Auth', 'Checkout', 'Dashboard'].includes(activeNav)}
      />

      {/* Interactive Modals */}
      <GetInTouchModal
        isOpen={touchModalOpen}
        onClose={() => setTouchModalOpen(false)}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title={bookingDetails.title}
        price={bookingDetails.price}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />
    </div>
  );
}
