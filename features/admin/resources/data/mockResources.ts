import { PosyanduData } from "../types";

const desaList = ["Sukarame", "Karanganyar", "Sidomulyo", "Sukamaju", "Cipedes", "Mangkubumi", "Indihiang", "Bungursari", "Tamansari", "Cibeureum"];
const jalanList = ["Jl. Ki Hajar Dewantara", "Gg. Manggis", "Jl. Pahlawan Perjuangan", "Jl. Merdeka", "Jl. Jend. Sudirman", "Jl. Ahmad Yani", "Jl. Gatot Subroto", "Gg. Anggrek", "Jl. Diponegoro", "Jl. Imam Bonjol"];

export const mockPosyanduList: PosyanduData[] = Array.from({ length: 24 }).map((_, i) => ({
  id: (i + 1).toString(),
  nama: `Posyandu ${['Melati', 'Mawar', 'Teratai', 'Anggrek', 'Kenanga', 'Cempaka'][i % 6]} ${i + 1}`,
  desa: desaList[i % 10],
  alamat: `${jalanList[i % 10]} No. ${Math.floor(Math.random() * 100) + 1}, RT 0${Math.floor(Math.random() * 5) + 1}/RW 0${Math.floor(Math.random() * 9) + 1}`,
}));
