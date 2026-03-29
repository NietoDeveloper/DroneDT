// src/app/auth/Login.tsx
'use client';

            {/* Botón de Acción */}
            <button
              type="submit"
              className="w-full bg-[#000000] hover:bg-[#FFD700] text-[#FFD700] hover:text-[#000000] font-black py-4 uppercase tracking-widest transition-all duration-300 shadow-lg"
            >
              Authorize Entry
            </button>
          </form>

          {/* Enlaces de Recuperación y Registro */}
          <div className="mt-10 pt-6 border-t border-[#DCDCDC] flex flex-col gap-3 text-center">
            <Link 
              href="/auth/forgot-password" 
              className="text-[10px] font-bold text-gray-500 hover:text-[#FEB60D] uppercase transition-colors"
            >
              Forgot your credentials?
            </Link>
            <p className="text-xs text-gray-400">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-[#000000] font-black hover:underline">
                Register Fleet
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Técnico */}
        <div className="bg-[#F8F8F8] py-4 px-8 border-t border-[#DCDCDC]">
          <p className="text-[9px] text-center text-gray-400 font-mono italic">
            Encryption: AES-256-GCM | Node v20.x | Software DT Security Protocol
          </p>
        </div>
      </div>
    </div>
  );
};