import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { fetchMenuItems } from "./fetcher/fetchMenuItems";
import { MenuItemInterface } from "./data/menuItems";
import { checkIsMobile } from "./utils/checkIsMobile";

export default async function Home() {
  const menuItems: Array<MenuItemInterface> = await fetchMenuItems();

  // cek, apakah perangkat pengguna adalah mobile
  const isMobile = await checkIsMobile();

  if (!isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <p>Versi Desktop belum tersedia</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-200">
      <Header />
      <Menu menuItems={menuItems} />
    </main>
  );
}
