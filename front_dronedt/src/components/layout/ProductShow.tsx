"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  brand?: string; // Opcional por si no viene de Atlas
  description: string;
  price: number;
  // Ajustado para aceptar string[] (como lo pusimos en Atlas) o el objeto previo
  images: any[]; 
  category: any;
}

const ProductShow = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();


export default ProductShow;