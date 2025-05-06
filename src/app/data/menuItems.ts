export interface MenuItemInterface {
  id: string;
  name: string;
  price: number;
  category?: "" | "terlaris" | "terbaru"; // Properti opsional untuk kategori
  image?: string; // Properti opsional untuk gambar
  ongkir?: "" | "free"; // Properti opsional untuk ongkir
  description?: string; // Properti opsional untuk deskripsi
}

export const menuItems: Array<MenuItemInterface> = [
  {
    id: "a1b2c3d4",
    name: "Cilok Isi Telur",
    price: 5000,
    image:
      "https://th.bing.com/th/id/OIP.oLvUjv1-fTEhu9OlSkEeAgHaFP?w=217&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    category: "terlaris",
    ongkir: "free",
    description:
      "Cilok Isi Telur adalah camilan khas Indonesia yang terbuat dari adonan tepung tapioka dengan isian telur di dalamnya. Teksturnya kenyal dengan rasa gurih yang cocok dinikmati kapan saja. Hidangan ini sangat populer dan menjadi favorit banyak orang karena kelezatannya.",
  },
  {
    id: "e5f6g7h8",
    name: "Tacisa (Tahu Cilok Sayur)",
    price: 6000,
    image:
      "https://img-global.cpcdn.com/recipes/7b468566fd923c70/680x482cq70/cilok-tahu-gluten-free-foto-resep-utama.jpg",
    category: "",
    ongkir: "free",
    description:
      "Tacisa adalah perpaduan unik antara tahu, cilok, dan sayuran yang memberikan rasa lezat dan sehat. Dengan tekstur lembut dari tahu dan kenyalnya cilok, hidangan ini cocok untuk Anda yang mencari camilan bergizi namun tetap nikmat.",
  },
  {
    id: "i9j0k1l2",
    name: "Pentol Ayam",
    price: 7000,
    image:
      "https://th.bing.com/th/id/OIP.ue19EOIVnbBDsQ2Gjpj9gwHaFP?w=244&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    category: "terlaris",
    ongkir: "free",
    description:
      "Pentol Ayam adalah bola-bola daging ayam yang lembut dan gurih, cocok untuk dinikmati sebagai camilan atau pelengkap makanan. Hidangan ini kaya akan rasa dan menjadi salah satu menu favorit pelanggan.",
  },
  {
    id: "m3n4o5p6",
    name: "Tahu Walit",
    price: 8000,
    image:
      "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/06/03/3118303455.jpg",
    category: "",
    ongkir: "free",
    description:
      "Tahu Walit adalah camilan berbahan dasar tahu yang digoreng hingga renyah di luar namun tetap lembut di dalam. Rasanya yang gurih dan teksturnya yang unik membuatnya menjadi pilihan yang sempurna untuk menemani waktu santai Anda.",
  },
];
