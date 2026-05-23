'use client';

import React from 'react';
/* FIX: Importación de motion necesaria para las animaciones del núcleo */
import { motion } from 'framer-motion'; 
import { 
  Package, 
  Cpu, 
  Battery, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Navigation 
} from 'lucide-react';

interface DroneProduct {
  _id: string;
  name: string;
  status: 'active' | 'maintenance' | 'offline';
  stock: number;
  batteryLevel?: number;
  sku?: string;
  firmwareVersion?: string;
}

/**
 * COMPONENT: InventoryCard
 * Nivel: L5 Architecture - Industrial Telemetry
 * Optimización: Responsive High-Density (310px - 1900px)
 */
export const InventoryCard = ({ product }: { product: DroneProduct }) => {
  
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active': 
        return {
          text: 'text-emerald-400',
          border: 'border-emerald-500
          text: 'text-amber-400',,0