import React from 'react';

function CTA() {
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
                    <a href="#" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-lg">
                        Create Now!
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default CTA; 