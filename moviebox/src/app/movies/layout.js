import '../globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ["400"],   
  display: "swap",
  subsets: ["latin"],
  variable: "--poppins-font",
});

export const metadata = {
  title: 'moviebox',
  description: 'hngx stage2 promotion task',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex  flex-col min-h-screen ${poppins.className}`}>
        
          
            
            <div className="min-h-full relative w-full flex"> 
              {children}
            </div>  
          
        
       
      </body>
    </html>
  )
}
