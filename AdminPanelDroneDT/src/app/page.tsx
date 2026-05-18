'use client';

import React, { useState } from 'react';
import { UserStats } from '@/components/users/UserStats';
import { UserRow } from '@/components/users/UserRow';
import { useUserManagement } from '@/hooks/useUserManagement';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  UserPlus, 
  ShieldAlert,
  Zap
} from 'lucide-react';

/**
 * PAGE: Personnel Control Center (L5)
 * Architecture: No-Scroll Viewport // 310px - 1900px Responsive
 * Design: SpaceX / Industrial Laboratory Aesthetics
 */
export default function UsersPage() {
  const { operators, manualRefresh, isLoading } = useUserManagement();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrado en tiempo real para eficiencia de datos
  const filteredOperators = operators.filter(op => 
    op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div -full shadow-[0_0_15px_rgba(16,185,1
          </p>
            <div className="divide-y divide-dx} />
              ))}
            NODE: BOG_S1n>
        </div>ion-500'}`} />
            REFRESH_SYSTEM
          </button>
    

    </div>
  );
}