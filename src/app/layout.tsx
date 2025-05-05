import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Cursor Tokoku",
  description:
    "Temukan pengalaman berbelanja yang lebih cepat dan aman dengan teknologi Next.js terbaru! Nikmati kemudahan bertransaksi dan jangan khawatir lagi dengan keamanan yang terjamin.",
  keywords: ["next.js", "react", "typescript"],
  authors: [{ name: "Somwan" }],
  openGraph: {
    title: "Rajwa Cilok",
    description:
      "Temukan pengalaman berbelanja yang lebih cepat dan aman dengan teknologi Next.js terbaru! Nikmati kemudahan bertransaksi dan jangan khawatir lagi dengan keamanan yang terjamin.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`h-[100vh] ${quicksand.variable} ${quicksand.className}`}
      >
        {children}
      </body>
    </html>
  );
}
