export type GrowthDataPoint = {
  month: string;
  weight: number;
  height: number;
  head: number;
};

export type RiwayatPemeriksaan = {
  id: number;
  tanggal: string;
  lokasi: string;
  keterangan: string;
  bb: number;
  tb: number;
};

export type JadwalImunisasi = {
  id: number;
  namaVaksin: string;
  bulanKe: string;
  keterangan: string;
  status: "selesai" | "mendatang";
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
  riwayatPemeriksaan?: RiwayatPemeriksaan[];
  jadwalImunisasi?: JadwalImunisasi[];
};
