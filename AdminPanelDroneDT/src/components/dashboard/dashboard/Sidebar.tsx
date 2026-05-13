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
    { name: 'HANGAR', icon: <Box size={20} />, path: '/dashboard' },
    { name: 'OPERATORS', icon: <Users size={20} />, path: '/dashboard/users' },
    { name: 'SYSTEM_LOGS', icon: <Terminal size={20} />, path: '/dashboard/logs' },
    { nam
