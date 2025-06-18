import React, { useState } from 'react';

function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="py-16">
        <div className="container mx-auto px-6">
            <div 
                className="relative bg-slate-100 rounded-lg shadow-lg p-12 text-center overflow-hidden"
                style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-22 4h4v2H14v4H12v-4H8v-2h4v-4h2v4zM22 0h4v2h-4v4h-2V2h-4V0h4zM4 38h4v4H4v4H2v-4H0v-2h2v-4h2v4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}
            >
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Want to create your own<br/>Event just in a minutes?</h2>
                    <p className="text-gray-600 mb-8">All in one event manager!</p>
                    <button 
                      onClick={openModal}
                      className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-lg">
                        Create Now!
                    </button>
                </div>
            </div>
        </div>
        
        {/* Coming Soon Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Modal Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" 
              onClick={closeModal}
            ></div>
            
            {/* Modal Content */}
            <div className="bg-white rounded-xl shadow-xl transform transition-all w-[400px] h-[400px] p-8 z-10 relative">
              <button 
                onClick={closeModal} 
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center flex flex-col items-center justify-center h-full">
                {/* Coming Soon Icon */}
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Coming Soon!</h3>
                <p className="text-gray-600 mb-8 max-w-xs mx-auto">This feature will be available in the next update. Stay tuned for more exciting features!</p>
                
                <button 
                  onClick={closeModal} 
                  className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  I'll wait for it!
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default CTA; 