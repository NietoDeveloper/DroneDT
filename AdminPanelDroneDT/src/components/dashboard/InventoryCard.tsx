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