"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronRight, Circle } from 'lucide-react';

interface MenuItem {
  id: string;
  _id?: string;
  name: string;
  price?: string;
  desc?: string;
  img: string;
  category?: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const [menuContent, setMenuContent] = useState<Record<string, MenuItem[]>>({
    Modelos: [],
    Accesorios: [],
    Flota: [],
  });

  const fetchMenuData = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL no definida.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/products/menu`);
      if (!response.ok) throw new Error('Error de conexión con la flota');

      const data = await response.json();

      if (Array.isArray(data)) {
        const categorized = data.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
          const cat = item.category || 'Modelos';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push({
            ...item,




export default Navbar;