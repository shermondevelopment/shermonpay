import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "./globals.css";
import type { Metadata } from "next";
import { QueryProviderShermon } from '@/providers/queryProvider';



export const metadata: Metadata = {
  title: "Payment open finance",
  description: "Generate payment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProviderShermon>
       <body>{children}</body>
      </QueryProviderShermon>
    </html>
  );
}
