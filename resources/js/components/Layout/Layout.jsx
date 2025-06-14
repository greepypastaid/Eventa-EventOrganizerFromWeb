import React from 'react';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout; 