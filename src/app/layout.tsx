// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import "@/styles/style.css";
// import {AuthProvider} from "@/context/AuthContext"

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

// Assuming layout.tsx is your root layout file
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/style.css";
import { AuthProvider } from "@/context/AuthContext"; // Ensure this path matches the location of your AuthContext file
import { BalanceProvider } from "@/context/BalanceContext"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <BalanceProvider>
            {children}
          </BalanceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
