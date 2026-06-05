export type TipeNotifikasi = 'peringatan' | 'jadwal' | 'informasi' | 'sistem';

export type IkonSistem = 'settings' | 'check';

export type NotifikasiItem = {
  id: string;
  tipe: TipeNotifikasi;
  ikonSistem?: IkonSistem; // Khusus untuk tipe sistem yang memiliki 2 jenis ikon (pengaturan / centang)
  judul: string;
  waktu: string;
  pesan: string;
};
