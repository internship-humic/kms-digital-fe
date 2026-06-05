export type DashboardKaderData = {
  kaderName: string;
  posyanduName: string;
  location: string;
  totalBalita: {
    value: number;
    trend: string;
  };
  kasusRisiko: {
    value: number;
    label: string;
  };
  pemeriksaanTerbaru: Array<{
    id: string;
    nama: string;
    inisial: string;
    jenisPemeriksaan: string;
    waktu: string;
    status: string;
  }>;
};
