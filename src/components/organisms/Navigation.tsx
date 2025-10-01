import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`flex items-center space-x-4 ${className}`}>
      {navItems.map((item) => (
        <Link key={item.href} to={item.href}>
          <Button variant="outline" size="sm">
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;