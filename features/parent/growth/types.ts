export type GrowthDataPoint = {
  month: string;
  weight: number;
  height: number;
};

export type ChildData = {
  id: number;
  name: string;
  details: string;
  image: string;
  stats: {
    weight: string;
    height: string;
    head: string;
    status: string;
  };
  riwayatPemeriksaan: Array<{
    id: string;
    tanggal: string;
    lokasi: string;
    keterangan: string;
    bb: string;
    tb: string;
  }>;
  jadwalImunisasi: Array<{
    id: string;
    namaVaksin: string;
    keterangan: string;
    waktu: string;
    bulanKe: string;
    status: 'mendatang' | 'selesai';
  }>;
};
