import type { Metadata } from "next";
import "./globals.css"; 
import Preloader from "@/components/ui/Preloader";
import Logo from "@/components/ui/Logo";
xport default f
                  
                  <div className="flex items-center gap-6">
                    {/* Indicador de Conexión en Tiempo Real */}
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-600/80">Atlas-MERN: Connected</span>
                    </div>
                    
                    {/* Créditos del Desarrollador #1 Colombia con Link a GitHub */}
                    <span className="font-bold text-heading tracking-widest">
                      System by{" "}
      
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