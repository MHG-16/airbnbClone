import './globals.css'
import { Nunito } from 'next/font/google';

import NavBar from './components/navbar/NavBar';
import ClientOnly from './components/share/ClientOnly';
import Modal from './components/modal/Modal';


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
          <Modal isOpen title="Login" actionLabel='Continue'/>
          <NavBar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
