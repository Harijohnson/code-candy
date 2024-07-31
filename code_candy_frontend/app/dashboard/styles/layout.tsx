import Head from 'next/head';
import { Inter } from 'next/font/google';
import '../../globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

   
 export default function Layout({ children }: { children: React.ReactNode }) {
   return (
       <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
   );
 }
 export const experimental_ppr = true;
     

