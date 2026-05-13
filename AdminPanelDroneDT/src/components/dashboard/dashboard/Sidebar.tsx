'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Box, Settings, LogOut, Terminal } from 'lucide-react';

/**
 * SIDEBAR L5 - COMMAND CENTER
 * Estética: SpaceX Minimalist / Fixed Position
 */
export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'HANGAR', icon: <Box size={20} />
    { nam
