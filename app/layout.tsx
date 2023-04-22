import './globals.css'
import { Nunito } from 'next/font/google';

import NavBar from './components/navbar/NavBar';
import ClientOnly from './components/share/ClientOnly';
import RegisterModal from './components/modal/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';


export const metadata = {
  title: 'Airbnb clone',
  description: 'Airbnb clone react app',
}

const font = Nunito({
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <NavBar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
