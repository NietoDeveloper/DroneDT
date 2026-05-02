"use client";

import React, { useState } from 'react';
import Logo from '@/components/ui/Logo';
import { ShieldCheck, UserMinus, UserPlus, ShieldAlert, Search } from 'lucide-react';

// Tipos específicos para administración de usuarios
type UserStatus = 'ACTIVE' | 'BANNED' | 'PENDING';
type UserRole = 'ADMIN' | 'EMPLOYEE' | 'CLIENT';

interface User {
  id: string;
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className="text-[10px] font-medium">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {user.status === 'ACTIVE' ? (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'BANNED')}
                            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                            title="Banear Usuario"
                          >
                            <UserMinus size={14} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'ACTIVE')}
                            className="p-1.5 text-zinc-400 hover:text-green-500 hover:bg-green-50 rounded-md transition-all"
                            title="Activar Usuario"
                          >
                            <ShieldCheck size={14} />
                          </button>
                        )}
                        <button className="p-1.5 text-zinc-400 hover:text-gold hover:bg-gold/5 rounded-md transition-all">
                          <ShieldAlert size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}