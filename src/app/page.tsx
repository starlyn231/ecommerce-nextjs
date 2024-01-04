"use client"
import { useEffect } from 'react';

import { redirect } from 'next/navigation';

export default function HomeMain() {

  useEffect(() => {

    // Redirige a la página '/otra-pagina'
    redirect('/auth/login');

    // Limpia el temporizador al desmontar el componente

  }, []); // La dependencia vacía asegura que useEffect solo se ejecute una vez al montar el componente

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/*  <LoginPage /> */}
    </main>
  )
}
