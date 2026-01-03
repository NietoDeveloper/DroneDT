import React, { useState } from 'react';

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulación de una llamada a API
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
      // Opcional: ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1500);
  };

  return (
    // Contenedor principal: min-h-[50vh] para garantizar la altura requerida
    <div className="w-full min-h-[50vh] flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-2xl p-6 md:p-10 bg-white shadow-2xl rounded-xl transition-all duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <p className="text-3xl sm:text-4xl font-extrabold text-indigo-700 tracking-tight">
            Subscribe Now & Get 20% Off
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-lg">
           w arrivals, exclusive sales, and exciting promos!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          {isSubscribed ? (
            <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm font-medium text-center transition-opacity duration-500">
              Subscription successful! Check your email for your 20% discount code.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                className="w-full flex-1 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors disabled:opacity-60"
                type="email"
                required
                placeholder="Enter your email address"
                value={email}                disabled={isLoading}
              />
              <button
                type="submit"
                className={`flex-shrink-0 px-6 py-4 rounded-lg text-white font-semibold shadow-md transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center ${
                  isLoading
                    ? 'bg-indigo-400'
                    : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    
                  </svg>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Subscription;