drone-dt-frontend/
├── src/
│   ├── app/                    # 🟢 Ruteo y Server Components
│   │   ├── (shop)/             # Route Group: Para la tienda (sin afectar URL)
│   │   │   ├── drones/
│   │   │   └── tienda/
│   │   ├── (dashboard)/        # Route Group: Para el panel de control
│   │   │   └── mi-cuenta/
│   │   ├── api/                # Route Handlers (BFF)
│   │   ├── layout.tsx          # Layout con Navbar tipo Tesla
│   │   └── page.tsx            # Hero Landing
│   ├── components/             # 🔵 Componentes Atómicos (Globales)
│   │   ├── ui/                 # Elementos puros (Boton, Input, Badge)
