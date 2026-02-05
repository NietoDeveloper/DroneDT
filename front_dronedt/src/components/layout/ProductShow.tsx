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



export default ProductShow;