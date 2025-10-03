import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../state';
import LanguageSwitcher from '../atoms/LanguageSwitcher';
import AdminButton from '../atoms/AdminButton';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const isHome = location.pathname === '/';

  const navItems = useMemo(() => isHome ? [
    { id: 'accueil', label: t('nav.home'), href: '#hero' },
    { id: 'apropos', label: t('nav.about'), href: '#about' },
    { id: 'competences', label: t('nav.skills'), href: '#skills' },
    { id: 'projets', label: t('nav.projects'), href: '#projects' },
    { id: 'experience', label: 'Expérience', href: '#experience' },
    { id: 'contact', label: t('nav.contact'), href: '#contact' },
  ] : [
    { id: 'home', label: t('nav.home'), href: '/' },
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'certifications', label: 'Certifications', href: '/certifications' },
    { id: 'upload', label: 'Upload', href: '/upload' },
  ], [isHome, t]);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i] === 'accueil' ? 'hero' : sections[i]);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, navItems]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              isHome ? (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={`font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-blue-600'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.id}
                  to={item.href}
                  className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
<div className="flex items-center space-x-4">
  {/* Language Switcher */}
  <LanguageSwitcher />

  {/* Admin Button */}
  <AdminButton />

  {/* Theme Toggle */}
  <button
    onClick={toggleTheme}
    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
  >
    {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
  </button>

  {/* Mobile Menu Button */}
  <button
    className="md:hidden"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
  >
    {isMenuOpen ? (
      <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
    ) : (
      <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
    )}
  </button>
</div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              {navItems.map((item) => (
                isHome ? (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      activeSection === item.id
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;