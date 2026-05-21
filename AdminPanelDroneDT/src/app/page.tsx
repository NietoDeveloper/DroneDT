'use client';

import React, { useState, useEffect } from 'react';
import { Preloader } from '@/components/ui/Preloader';
import { motion, AnimatePresence } from 'framer-motion';

// IMPORTACIÓN EXACTA DE TUS 8 COMPONENTES DEL DASHBOARD
import { DroneCard } from '@/components/dashboard/DroneCard';
import { DroneSkeleton } from '@/components/dashboard/DroneSkeleton';
import { ErrorShield } from '@/components/dashboard/ErrorShield';
import { InventoryCard } from '@/components/dashboard/InventoryCard';
import { Inventory } from '@/components/dashboard/Inventory';

