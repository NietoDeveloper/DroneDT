'use client';

import React, { useState, useEffect } from 'react';
import { Preloader } from '@/components/ui/Preloader';
import { motion, AnimatePresence } from 'framer-motion';sponibles)
  const productMetrics = {
      const now = new Date();
      setSystemTime(now.toTimeString().split(' ')[0]);
    }, 1000);


      <AnimatePresence mode="wait">
        {/* INTERFAZ 1: GATEWAY DE INGRESO (BYPASS) */}
        {currentFlow === 'LOGIN' && (
          <motion.div