"use client";
import { useState, useEffect, useRef } from "react";

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <div className="mb-4 font-semibold text-lg">Color Code</div>
      <div className="flex space-x-4 mb-4">
        <div>
          <input
            type="color"
           
            className="w-full p-2 border rounded-md"
          />
          <label className="block mt-2 text-sm text-gray-600">Hex</label>
        </div>
        <div>
          <input
            type="text"
           
            className="w-full p-2 border rounded-md"
            placeholder="R"
          />
          <label className="block mt-2 text-sm text-gray-600">R</label>
        </div>
        <div>
          <input
            type="text"
           
            className="w-full p-2 border rounded-md"
            placeholder="G"
          />
          <label className="block mt-2 text-sm text-gray-600">G</label>
        </div>
        <div>
          <input
            type="text"
            
            className="w-full p-2 border rounded-md"
            placeholder="B"
          />
          <label className="block mt-2 text-sm text-gray-600">B</label>
        </div>
        <div>
          <input
            type="text"
            
            className="w-full p-2 border rounded-md"
            placeholder="A"
          />
          <label className="block mt-2 text-sm text-gray-600">A</label>
        </div>
      </div>
      <div
        ref={paletteRef}
        className="relative h-6 bg-gradient-to-r from-black via-gray-500 to-white"
      >
        <div
          className="absolute w-4 h-4 bg-white rounded-full shadow-md cursor-pointer"
          
        ></div>
      </div>
    </div>
  );
};

const ColorStop: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="flex items-center">
      <div className={`w-8 h-8 ${color} rounded-full`}></div>
      <input type="text" className="ml-4 p-2 border rounded-md flex-grow" />
      <button className="ml-4 text-red-500">×</button>
    </div>
  );
};

const Stops: React.FC = () => {
  const [stops, setStops] = useState<Stop[]>([
    { color: "bg-blue-500" },
    { color: "bg-green-400" },
  ]);

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-lg">Stops</div>
        <button
          className="text-blue-500"
          onClick={() => setStops([...stops, { color: "bg-blue-500" }])}
        >
          ⊕
        </button>
      </div>
      <div className="mt-4 space-y-4">
        {stops.map((stop, index) => (
          <ColorStop key={index} color={stop.color} />
        ))}
      </div>
    </div>
  );
};

const GradientType: React.FC = () => {
  const [repeating, setRepeating] = useState<boolean>(false);

  return (
    <div className="mt-8 bg-white p-4 shadow-md rounded-md">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none">
          Linear
        </button>
        <button className="py-2 px-4 bg-gray-200 rounded-md focus:outline-none">
          Radial
        </button>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={repeating}
            onChange={() => setRepeating(!repeating)}
          />
          <label>Repeating</label>
        </div>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Position"
          style={{ display: "none" }}
        />
        <div className="col-span-2">
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Generated CSS"
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <div className="w-full">
      <div className="min-h-screen bg-gray-100">
        <section className="p-4">
          <section className="bg-white p-4 shadow-md rounded-md">
            <div className="relative overflow-hidden h-64 bg-gradient-to-r from-blue-500 to-green-400">
              <div className="absolute inset-0">
                <div className="absolute w-8 h-8 bg-blue-500 rounded-full top-1/2 left-0 transform -translate-y-1/2 cursor-pointer"></div>
                <div className="absolute w-8 h-8 bg-green-400 rounded-full top-1/2 right-0 transform -translate-y-1/2 cursor-pointer"></div>
              </div>
            </div>
          </section>

          <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-4 shadow-md rounded-md">
              <div className="relative h-64 bg-green-400">
                <div className="absolute w-8 h-8 bg-blue-500 rounded-full top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-800"></div>
              </div>
            </div>

            <Stops />
          </section>

          <GradientType />
        </section>
      </div>
    </div>
  );
};

export default Page;
