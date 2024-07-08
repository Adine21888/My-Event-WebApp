import React from 'react';

const CarouselComponent = () => {
  return (
    <div className="relative">
      <div className="flex overflow-x-scroll scrollbar-hide p-4 space-x-4">
        <div className="relative w-64 h-40 flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/75 rounded-lg">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">The Beauty of Nature</h1>
              <p className="opacity-80 mb-4">It is not so much for its beauty that the forest makes a claim upon men&apos;s hearts, as for that subtle something, that quality of air that emanation from old trees, that so wonderfully changes and renews a weary spirit.</p>
              <div className="flex justify-center gap-2">
                <button className="bg-white text-black px-4 py-2 rounded-lg">Explore</button>
                <button className="text-white border border-white px-4 py-2 rounded-lg">Gallery</button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-64 h-40 flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="h-full w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/75 rounded-lg">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">The Beauty of Nature</h1>
              <p className="opacity-80 mb-4">It is not so much for its beauty that the forest makes a claim upon men&apos;s hearts, as for that subtle something, that quality of air that emanation from old trees, that so wonderfully changes and renews a weary spirit.</p>
              <div className="flex justify-center gap-2">
                <button className="bg-white text-black px-4 py-2 rounded-lg">Explore</button>
                <button className="text-white border border-white px-4 py-2 rounded-lg">Gallery</button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-64 h-40 flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="h-full w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/75 rounded-lg">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">The Beauty of Nature</h1>
              <p className="opacity-80 mb-4">It is not so much for its beauty that the forest makes a claim upon men&apos;s hearts, as for that subtle something, that quality of air that emanation from old trees, that so wonderfully changes and renews a weary spirit.</p>
              <div className="flex justify-center gap-2">
                <button className="bg-white text-black px-4 py-2 rounded-lg">Explore</button>
                <button className="text-white border border-white px-4 py-2 rounded-lg">Gallery</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
