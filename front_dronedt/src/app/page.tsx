"use client";

import dynamic from 'next/dynamic';
import Link from "next/link";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });
const Banner = dynamic(() =>e="flex-1 h-16 flex items-center justify-center bg-[#FFD700] text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105">
                    EXPLORAR TIENDA
                  </Link>
                  <Link href="/services" className="flex-1 h-16 flex items-center justify-center text-white border-2 border-white/20 text-xs font-black uppercase tracking-widest hover:border-[#FFD700] hover:text-[#FFD700] transition-all transform hover:scale-105">
                    MANTENIMIENTO
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: FOOTER */}
        <section className="snap-start snap-always bg-black h-auto">
          <Footer />
        </section>
      </main>

      <style jsx global>{`
        html, body { overflow: hidden; height: 100%; margin: 0; background: #DCDCDC; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 10px; }
      `}</style>
    </div>
  );
}