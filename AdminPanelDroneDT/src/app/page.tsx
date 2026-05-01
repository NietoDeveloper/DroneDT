"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';

/** * LoginPage - Drone DT Intelligence System
 * Engineered by: NietoDeveloper (Top 1 Colombia)
 */
export default function LoginPage() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthorizing(true);

  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-main">

