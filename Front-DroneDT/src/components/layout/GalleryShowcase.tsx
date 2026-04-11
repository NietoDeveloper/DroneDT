"use client";

import React, { useState, useEffect, useCallback } from 'react';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  category: string;
  span?: string; 
}

const FAL
