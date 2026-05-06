'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/store/useInventoryStore';

}

ABLE: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'IN_STOCK' },



      {/* Header: SKU & Status Indicator */}
      <div className="z-10 flex items-start justify-between">
   
          </span>

        </div>
        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-sm ${currentStatus.bg}`}>
          <div className={`h-1 w-1 rounded-full animate-pulse ${currentStatus.color.replace('text', 'bg')}`} />
          <span className={`font-mono text-[8px] font-bold ${currentStatus.color}`}>
            {currentStatus.label}
          </span>
        </div>
      </div>

      <ShieldCheck className="absolute bottom-2 right-2 h-12 w-12 text-white/[0.02] pointer-events-none" />
    </motion.div>
  );
};