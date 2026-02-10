"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  brand?: string;
  description: string;
  price: number;
  imageUrl?: string; // Prioridad para rendimiento
  images: { url: string; public_id?: string }[]; 
  category: string | Category;
}

const ProductShow = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();



  const getCategoryName = (category: string | Category) => {
    if (typeof category === 'object' && category !== null) return category.name;
    return typeof category === 'string' ? category : "General";
  };


export default ProductShow;