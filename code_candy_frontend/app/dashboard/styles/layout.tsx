import Head from 'next/head';
import { Inter } from 'next/font/google';
import '../../globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

   
 export default function Layout({ children }: { children: React.ReactNode }) {
   return (
       <div className="flex-grow md:overflow-y-auto">{children}</div>
   );
 }
 export const experimental_ppr = true;
     

