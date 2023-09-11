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
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <div className="flex-grow flex relative">
          <div className="flex-grow">
            
            <div className="min-h-full"> {/* Add some margin top for space below navbar */}
              {children}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Footer />
        </div>
      </body>
    </html>
  )
}
