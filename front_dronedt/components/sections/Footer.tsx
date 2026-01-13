"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bot, ShoppingBag } from 'lucide-react';

const Footer: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-CO', { 
        hour: '2-digit', 

       

      }));
    };

   

  }, []);

