import React from 'react';

const MyResponsiveComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] max-h-[50vh] overflow-hidden bg-gray-100 p-4">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-xl p-8 transform transition duration-500 ease-in-out hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-indigo-700 text-center mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
          Título Principal
        </h1>
        <p className="text-gray-600 text-base text-center sm:text-lg md:text-xl lg:text-2xl">
          Este es un componente React y Tailwind con una altura fija de 50vh y diseño responsivo.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-150">
            Acción 1
          </button>
          <button className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-150">
            Acción 2
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyResponsiveComponent;