"use client"
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    const navElement = document.getElementById('nav');
    if (navElement) {
      navElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`fixed bottom-4 right-4 lg:bottom-16 lg:right-16 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <button
        onClick={scrollToTop}
        className="bg-slate-100 text-gray-500 p-4 rounded-full shadow-lg"
        aria-label="Scroll to top"
      >
        <ChevronUp/>
      </button>
    </div>
  );
};

export default ScrollToTopButton;
