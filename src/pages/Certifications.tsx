import React from 'react';
import Header from '../components/organisms/Header';
import Certifications from '../components/organisms/Certifications';

const CertificationsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <Certifications />
    </div>
  );
};

export default CertificationsPage;