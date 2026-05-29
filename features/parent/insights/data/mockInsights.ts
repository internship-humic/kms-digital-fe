import { InsightData } from "../types";

export const getInsightsMockData = async (): Promise<InsightData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    categories: ["Semua", "Nutrisi", "Kesehatan", "Aktivitas"],
    featuredTip: {
      title: "Tips Harian: Jadwal Tidur Konsisten",
      description:
        "Membangun rutinitas tidur yang sama setiap hari membantu mengatur jam biologis anak, meningkatkan kualitas istirahat, dan mendukung pertumbuhan otak yang optimal.",
    },
    articles: [
      {
        id: 1,
        title: "Tips Gizi MPASI untuk Bayi 6 Bulan Pertama",
        category: "Nutrisi",
        timeToRead: "5 menit baca",
        description:
          "Memasuki usia 6 bulan, kebutuhan nutrisi bayi tidak lagi bisa dipenuhi hanya dengan ASI. Inilah saatnya memperkenalkan Makanan Pendamping ASI...",
        image:
          "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop",
      },
    ],
  };
};
