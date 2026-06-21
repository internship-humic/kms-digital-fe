import { PosyanduData } from "../types";

const desaList = [
  "Sukarame",
  "Karanganyar",
  "Sidomulyo",
  "Sukamaju",
  "Cipedes",
  "Mangkubumi",
  "Indihiang",
  "Bungursari",
  "Tamansari",
  "Cibeureum",
];

const jalanList = [
  "Jl. Ki Hajar Dewantara",
  "Gg. Manggis",
  "Jl. Pahlawan Perjuangan",
  "Jl. Merdeka",
  "Jl. Jend. Sudirman",
  "Jl. Ahmad Yani",
  "Jl. Gatot Subroto",
  "Gg. Anggrek",
  "Jl. Diponegoro",
  "Jl. Imam Bonjol",
];

export const mockPosyanduList: PosyanduData[] = Array.from({ length: 24 }).map(
  (_, i) => {
    const noRumah = ((i * 13) % 100) + 1;
    const noRT = (i % 5) + 1;
    const noRW = (i % 9) + 1;

    return {
      id: (i + 1).toString(),
      nama: `Posyandu ${
        ["Melati", "Mawar", "Teratai", "Anggrek", "Kenanga", "Cempaka"][i % 6]
      } ${i + 1}`,
      desa: desaList[i % 10],
      alamat: `${jalanList[i % 10]} No. ${noRumah}, RT 0${noRT}/RW 0${noRW}`,
    };
  },
);
