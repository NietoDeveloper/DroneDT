export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="es" 
      className={`${inter.variable} ${montserrat.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className={`
          ${montserrat.className} 
          antialiased 
          bg-black 
          text-white 
          min-h-screen 
          /* CAMBIO: Eliminado overflow-hidden para permitir que main gestione el scroll */
          overflow-x-hidden
          selection:bg-[#FFD700] selection:text-black
        `}
      >
        {/* SISTEMA DE CARGA AEROESPACIAL */}
        <Preloader />

        {/* TEXTURA DE RUIDO INDUSTRIAL */}
        <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* IMPORTANTE: El main de children (page.tsx) ya tiene h-screen y overflow-y-scroll.
           Si RootLayout tiene overflow-hidden, el main queda "muerto".
        */}
        <main className="w-full relative z-10">
          {children}
        </main>

        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          ::selection { background: #FFD700; color: #000000; }
          
          /* Forzar suavidad de scroll para el snap */
          html, body {
            height: 100%;
          }
        `}} />
      </body>
    </html>
  );
}