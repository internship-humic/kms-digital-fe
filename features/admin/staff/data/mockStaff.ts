import { StaffData } from "../types";

const namaList = ["Siti Nurhaliza", "Budi Raharjo", "Ani Wulandari", "Dewi Lestari", "Agus Setiawan", "Rina Amelia", "Dedi Mulyadi", "Fitri Yani", "Hendra Gunawan", "Maya Sari"];
const emailList = ["siti.nur", "budi.r", "ani.w", "dewi.l", "agus.s", "rina.a", "dedi.m", "fitri.y", "hendra.g", "maya.s"];
const desaList = ["Sukamaju", "Sukamaju", "Karanganyar", "Karanganyar", "Sidomulyo", "Sidomulyo", "Cipedes", "Cipedes", "Mangkubumi", "Mangkubumi"];
const posyanduList = ["Melati 1", "Anggrek 2", "Kenanga 1", "Mawar 3", "Teratai 1", "Cempaka 2", "Melati 2", "Anggrek 1", "Kenanga 2", "Mawar 1"];

export const mockStaffList: StaffData[] = Array.from({ length: 128 }).map((_, i) => {
  const isSiti = i === 0;
  const isBudi = i === 1;
  const isAni = i === 2;
  
  let nama = isSiti ? "Siti Nurhaliza" : isBudi ? "Budi Raharjo" : isAni ? "Ani Wulandari" : namaList[i % 10] + ` ${i}`;
  let email = isSiti ? "siti.nur@posyandu.id" : isBudi ? "budi.r@posyandu.id" : isAni ? "ani.w@posyandu.id" : `${emailList[i % 10]}${i}@posyandu.id`;
  let desa = isSiti ? "Sukamaju" : isBudi ? "Sukamaju" : isAni ? "Karanganyar" : desaList[i % 10];
  let posyandu = isSiti ? "Melati 1" : isBudi ? "Anggrek 2" : isAni ? "Kenanga 1" : posyanduList[i % 10];
  
  const words = nama.split(' ');
  const inisial = words.length > 1 ? words[0][0] + words[1][0] : words[0].substring(0, 2).toUpperCase();

  return {
    id: (i + 1).toString(),
    nama,
    inisial: inisial.toUpperCase(),
    email,
    desa,
    posyandu,
    status: isBudi ? "Nonaktif" : "Aktif",
  };
});
