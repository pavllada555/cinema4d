// src/pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { IBM_Plex_Serif } from '@next/font/google'

const ibmplex = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600', '700'],
  style: ['normal', 'italic'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={ibmplex.className}>
      <Component {...pageProps} />
    </main>
  )
}
