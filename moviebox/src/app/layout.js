import Footer from './components/footer'

import './globals.css'
import { DM_Sans } from 'next/font/google'

const inter = DM_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'moviebox',
  description: 'hngx stage2 promotion task',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex  flex-col min-h-screen ${inter.className}`}>
        
          
            
            <div className="min-h-full relative w-full flex"> 
              {children}
            </div>
          
        
       
      </body>
    </html>
  )
}
