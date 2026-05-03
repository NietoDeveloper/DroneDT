import type { Metadata } from "next";
import "./globals.css"; 
import Preloader from "@/components/ui/Preloader";
import Logo from "@/components/ui/Logo";

/**
 * Metadata - Drone DT Intelligence System
 * World-Class Engineering by NietoDeveloper
 */
export const metadata: Metadata = {
  title: {
    template: '%s | Panel Control Empresa Drone DT',
    d

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono">
                  <a 
                    href="https://softwaredt.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="opacity-80 hover:text
                    © 2026 <span className="font-bold">Software DT</span> — Industry Standard
                  </a>
                  
                  <div className="flex items-center gap-6">
                    {/* Status de Conexión Simulado */}
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-600/80 uppercase">Atlas-MERN: Online</span>
                    </div>
                    
                    {/* Créditos Nieto Lab */}
                    <span className="font-bold text-heading tracking-widest uppercase">
                      System by{" "}
                      <a 
                        href="https://github.com/NietoDeveloper" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gold hover:text-yellowColor transition-all underline underline-offset-4 decoration-gold/30"
                      >
                        NietoDeveloper
                      </a>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}