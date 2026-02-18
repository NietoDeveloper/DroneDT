"use client";

import dynamic from 'next/dynamic';
import Link from "next/link";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });
const Banner = dynamic(() => import("@/components/layout/Banner"), { ssr: false });
const ProductShow = dynamic(() => import("@/components/layout/ProductShow"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });


        


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