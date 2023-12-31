"use client"
import "./globals.css";
import { Inter } from "next/font/google";
// import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ThemeProvider } from 'next-themes';
import { useTheme } from "next-themes";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const { theme, setTheme } = useTheme('dark');
  return (
    <html lang="en">
      <ThemeProvider attribute="class">
      <head>
      </head>
      <body className={`${inter.className} bg-[#2008f310] w-full m-auto h-full flex`}>
        <div className="w-full m-auto h-full">

        {children}
        </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
