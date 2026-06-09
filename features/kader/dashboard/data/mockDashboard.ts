import { DashboardKaderData } from "../types";

export const getKaderDashboardMockData =
  async (): Promise<DashboardKaderData> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    return {
      kaderName: "Aghnia",
      posyanduName: "Posyandu Melati 04",
      location: "Jakarta Selatan",
      totalBalita: {
        value: 128,
        trend: "+4%",
      },
      kasusRisiko: {
        value: 12,
        label: "Perlu Pantau",
      },
      pemeriksaanTerbaru: [
        {
          id: 1,
          inisial: "AC",
          nama: "Abe Cekut",
          jenisPemeriksaan: "Pemeriksaan Bulanan",
          waktu: "2 jam lalu",
          status: "Normal",
        },
        {
          id: 2,
          inisial: "NA",
          nama: "Nadlyne Aurora",
          jenisPemeriksaan: "Pemeriksaan Tambahan",
          waktu: "2 jam lalu",
          status: "Normal",
        },
      ],
    };
  };
