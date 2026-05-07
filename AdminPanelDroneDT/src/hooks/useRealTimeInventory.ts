'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useInventoryStore } from '@/store/useInventoryStore';

/**
 * HOOK: useRealTimeInventory
 * Nivel: L5 Security & Performance
 * Descripción: Gestiona el flujo de datos entre el backend (Railway/AWS) y la Store.
