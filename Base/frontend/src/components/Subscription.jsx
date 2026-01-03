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
           w arri
          </p>
        </div>
>
      </div>
    </div>
  );
};

export default Subscription;