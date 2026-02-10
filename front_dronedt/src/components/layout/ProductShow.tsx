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



export default ProductShow;