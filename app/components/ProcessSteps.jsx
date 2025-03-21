'use client';

export default function ProcessSteps() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-green-100 transform -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 text-center relative z-10 shadow-sm hover:shadow-md transition-shadow hover:scale-105 transform transition-transform">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-4">
                👨‍🌾
              </div>
              <p className="text-gray-800 font-medium">Farmers list their fresh produce on our platform</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center relative z-10 shadow-sm hover:shadow-md transition-shadow hover:scale-105 transform transition-transform">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-4">
                🛒
              </div>
              <p className="text-gray-800 font-medium">Customers browse and order fresh local products</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center relative z-10 shadow-sm hover:shadow-md transition-shadow hover:scale-105 transform transition-transform">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-4">
                🚚
              </div>
              <p className="text-gray-800 font-medium">Products are delivered fresh within 24 hours</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center relative z-10 shadow-sm hover:shadow-md transition-shadow hover:scale-105 transform transition-transform">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-4">
                😋
              </div>
              <p className="text-gray-800 font-medium">Customers enjoy farm-fresh products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 