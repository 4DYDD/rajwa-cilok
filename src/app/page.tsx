import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { fetchMenuItems } from "./fetcher/fetchMenuItems";
import { MenuItemInterface } from "./interfaces/MenuItem.interface";
import StoreHours from "@/components/StoreHours";

export default async function Home() {
  const menuItems: Array<MenuItemInterface> = await fetchMenuItems();

  return (
    <main className="h-screen bg-gray-200">
      <Header />
      <Menu menuItems={menuItems} />
      <StoreHours />
    </main>
  );
}
