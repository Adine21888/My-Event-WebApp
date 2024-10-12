import React from 'react';
import './styles/CarouselComponent.css'; // Import CSS if needed

const CarouselComponent = () => {
  return (
    <div className="relative overflow-hidden w-full h-48 flex items-center justify-center">
      <div className="flex space-x-4">
        <div className="relative w-64 h-40 group transform transition-transform duration-300 ease-in-out hover:scale-105">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="Nature"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">The Beauty of Nature</h2>
              <p className="mb-4">Explore the serene beauty of natural landscapes.</p>
              <a href="#explore" className="bg-yellow-500 text-black px-4 py-2 rounded-lg">Explore</a>
            </div>
          </div>
        </div>
        <div className="relative w-64 h-40 group transform transition-transform duration-300 ease-in-out hover:scale-105">
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="Adventure"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Adventure Awaits</h2>
              <p className="mb-4">Discover breathtaking adventures in the great outdoors.</p>
              <a href="#adventure" className="bg-yellow-500 text-black px-4 py-2 rounded-lg">Discover</a>
            </div>
          </div>
        </div>
        <div className="relative w-64 h-40 group transform transition-transform duration-300 ease-in-out hover:scale-105">
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="Retreat"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Peaceful Retreat</h2>
              <p className="mb-4">Find tranquility and peace in secluded retreats.</p>
              <a href="#retreat" className="bg-yellow-500 text-black px-4 py-2 rounded-lg">Find Out More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
