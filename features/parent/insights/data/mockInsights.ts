import { InsightData, Article } from "../types";

export interface DetailedArticle extends Article {
  content: string[];
  author: {
    name: string;
    role: string;
  };
  date: string;
}

export const mockArticles: DetailedArticle[] = [
  {
    id: 1,
    title: "Tips Gizi MPASI untuk Bayi 6 Bulan Pertama",
    category: "Nutrisi",
    timeToRead: "5 menit baca",
    description:
      "Memasuki usia 6 bulan, kebutuhan nutrisi bayi tidak lagi bisa dipenuhi hanya dengan ASI. Inilah saatnya memperkenalkan Makanan Pendamping ASI...",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop",
    date: "12 Okt 2026",
    author: {
      name: "Dr. Sarah Anindita, Sp.A",
      role: "Dokter Spesialis Anak - RSIA Harapan Kita",
    },
    content: [
      "Memasuki usia 6 bulan, kebutuhan nutrisi bayi tidak lagi bisa dipenuhi hanya dengan ASI. Inilah saatnya memperkenalkan Makanan Pendamping ASI (MPASI) yang bergizi seimbang untuk mendukung tumbuh kembang optimalnya.",
      "Pada tahap awal ini, pencernaan bayi masih beradaptasi, sehingga penting untuk memulai dengan tekstur yang sangat halus (puree) dan perlahan ditingkatkan kekentalannya seiring bertambahnya usia.",
      "Salah satu nutrisi paling kritis di usia 6 bulan adalah zat besi. Cadangan zat besi bawaan dari lahir mulai habis di usia ini. Berikan makanan kaya zat besi seperti hati ayam, daging sapi cincang halus, atau sereal yang difortifikasi.",
      "Pastikan juga setiap porsi makanan mengandung karbohidrat (nasi/kentang tumbuk), protein hewani, lemak tambahan (minyak kelapa/zaitun mentega), serta sedikit sayur atau buah untuk pengenalan serat.",
    ],
  },
];

export const getInsightsMockData = async (): Promise<InsightData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    categories: ["Semua", "Nutrisi", "Kesehatan", "Aktivitas"],
    featuredTip: {
      title: "Tips Harian: Jadwal Tidur Konsisten",
      description:
        "Membangun rutinitas tidur yang sama setiap hari membantu mengatur jam biologis anak, meningkatkan kualitas istirahat, dan mendukung pertumbuhan otak yang optimal.",
    },
    articles: mockArticles,
  };
};

export const getArticleDetailMockData = async (
  id: string,
): Promise<DetailedArticle> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const found = mockArticles.find((art) => art.id === Number(id));
  if (!found) {
    throw new Error("Artikel tidak ditemukan");
  }
  return found;
};
