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
  title: "Rajwa Cilok - Jajanan Kekinian",
  description:
    "Nikmati cilok dan aneka jajanan lainnya yang enak, murah, dan bikin nagih! Belanja online di Rajwa Cilok, praktis dan kekinian!",
  keywords: ["cilok", "jajanan", "makanan ringan", "next.js", "react"],
  authors: [{ name: "Rajwa Cilok Team" }],
  openGraph: {
    title: "Rajwa Cilok - Jajanan Kekinian",
    description:
      "Nikmati cilok dan aneka jajanan lainnya yang enak, murah, dan bikin nagih! Belanja online di Rajwa Cilok, praktis dan kekinian!",
    type: "website",
  },
  icons: {
    icon: "/images/thecilokmini.png",
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
