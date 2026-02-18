"use client";

import dynamic from 'next/dynamic';
import Link from "next/link";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });
const Banner = dynamic(() => import("@/components/layout/Banner"), { ssr: false });
const ProductShow = dynamic(() => import("@/components/layout/ProductShow"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });


        


              <div className="flex flex-col items-center space-y-10">
                <h1 className="text-7xl md:text-9xl lg:text-[120px] font-black uppercase leading-none text-white tracking-tighter">
                  DRONE <span className="text-[#FFD700] italic">DT</span>
                </h1>
                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                  <Link href="/shop" className="flex-1 h-16 flex items-center justify-center bg-[#FFD700] text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105">
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