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
    
};

export default Subscription;