export type PemeriksaanTerbaru = {
  id: number;
  inisial: string;
  nama: string;
  jenisPemeriksaan: string;
  waktu: string;
  status: string;
};

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
  pemeriksaanTerbaru: PemeriksaanTerbaru[];
};
