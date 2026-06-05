"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FormTambahBalita() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    namaLengkap: "",
    jenisKelamin: "",
    tanggalLahir: "",
    beratLahir: "",
    tinggiLahir: "",
    alamatRumah: ""
  });
  
  const [showModal, setShowModal] = useState(false);
  
  // State untuk peringatan (error) input angka
  const [errors, setErrors] = useState({
    beratLahir: false,
    tinggiLahir: false
  });

  const handleNumberInput = (field: 'beratLahir' | 'tinggiLahir', value: string) => {
    // Cek jika ada karakter selain angka dan titik
    const hasInvalidChar = /[^0-9.]/.test(value);
    
    // Set peringatan merah jika ada teks/huruf yang dicoba dimasukkan
    setErrors(prev => ({ ...prev, [field]: hasInvalidChar }));

    // Hapus karakter yang bukan angka/titik
    let cleanValue = value.replace(/[^0-9.]/g, '');
    
    // Cegah titik lebih dari satu (misal: 12.5.3)
    const parts = cleanValue.split('.');
    if (parts.length > 2) {
      cleanValue = parts[0] + '.' + parts.slice(1).join('');
    }

    setFormData({ ...formData, [field]: cleanValue });
    
    // Sembunyikan peringatan merah setelah 3 detik
    if (hasInvalidChar) {
      setTimeout(() => {
        setErrors(prev => ({ ...prev, [field]: false }));
      }, 3000);
    }
  };

  const isFormValid = 
    formData.namaLengkap.trim() !== "" && 
    formData.jenisKelamin !== "" &&
    formData.tanggalLahir !== "" &&
    formData.beratLahir.trim() !== "" &&
    formData.tinggiLahir.trim() !== "" &&
    formData.alamatRumah.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    // Tampilkan modal sukses
    setShowModal(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showModal) {
      timeoutId = setTimeout(() => {
        router.push("/kader/balita");
      }, 2500);
    }
    return () => clearTimeout(timeoutId);
  }, [showModal, router]);

  return (
    <div className="flex-1 bg-white flex flex-col relative min-h-screen">
      <div className="flex items-center px-6 pt-10 pb-6 bg-white sticky top-0 z-30">
        <button 
          onClick={() => router.back()}
          className="mr-4 text-btn-primary hover:bg-blue-50 p-2 -ml-2 rounded-full transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        <h1 className="text-[20px] font-bold text-btn-primary flex-1 text-center pr-10">
          Tambah Data Balita
        </h1>
      </div>

      <div className="flex-1 px-6 pb-32">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-gray-700">Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Masukan Nama Lengkap"
              value={formData.namaLengkap}
              onChange={(e) => setFormData({...formData, namaLengkap: e.target.value})}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary transition-all text-[15px] placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-gray-700">Jenis Kelamin</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, jenisKelamin: "Laki-laki"})}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border transition-all text-[14.5px] font-medium ${
                  formData.jenisKelamin === "Laki-laki" 
                    ? "bg-btn-primary border-btn-primary text-white shadow-md shadow-blue-500/20" 
                    : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
                }`}
              >
                <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
                  <path d="M7 5C8.38071 5 9.5 3.88071 9.5 2.5C9.5 1.11929 8.38071 0 7 0C5.61929 0 4.5 1.11929 4.5 2.5C4.5 3.88071 5.61929 5 7 5Z"/>
                  <path d="M7 6C4.23858 6 2 8.23858 2 11V15H4V20H10V15H12V11C12 8.23858 9.76142 6 7 6Z"/>
                </svg>
                Laki-laki
              </button>
              
              <button
                type="button"
                onClick={() => setFormData({...formData, jenisKelamin: "Perempuan"})}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border transition-all text-[14.5px] font-medium ${
                  formData.jenisKelamin === "Perempuan" 
                    ? "bg-btn-primary border-btn-primary text-white shadow-md shadow-blue-500/20" 
                    : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
                }`}
              >
                <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
                  <path d="M7 5C8.38071 5 9.5 3.88071 9.5 2.5C9.5 1.11929 8.38071 0 7 0C5.61929 0 4.5 1.11929 4.5 2.5C4.5 3.88071 5.61929 5 7 5Z"/>
                  <path d="M11 6H3C1.34315 6 0 7.34315 0 9V14H14V9C14 7.34315 12.6569 6 11 6Z"/>
                  <path d="M6 15H8V20H6V15Z"/>
                </svg>
                Perempuan
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-gray-700">Tanggal Lahir</label>
            <div className="relative">
              <input 
                type="date" 
                value={formData.tanggalLahir}
                onChange={(e) => setFormData({...formData, tanggalLahir: e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary transition-all text-[15px] text-gray-700 bg-transparent"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-gray-700">Berat Lahir (kg)</label>
            <input 
              type="text" 
              inputMode="decimal"
              placeholder="Masukan Berat Lahir"
              value={formData.beratLahir}
              onChange={(e) => handleNumberInput('beratLahir', e.target.value)}
              className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none transition-all text-[15px] placeholder:text-gray-400 ${
                errors.beratLahir 
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50" 
                  : "border-gray-200 focus:border-btn-primary focus:ring-1 focus:ring-btn-primary"
              }`}
            />
            {errors.beratLahir && (
              <span className="text-[12px] text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
                Harus angka
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-gray-700">Tinggi Lahir (cm)</label>
            <input 
              type="text" 
              inputMode="decimal"
              placeholder="Masukan Tinggi Lahir"
              value={formData.tinggiLahir}
              onChange={(e) => handleNumberInput('tinggiLahir', e.target.value)}
              className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none transition-all text-[15px] placeholder:text-gray-400 ${
                errors.tinggiLahir 
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50" 
                  : "border-gray-200 focus:border-btn-primary focus:ring-1 focus:ring-btn-primary"
              }`}
            />
            {errors.tinggiLahir && (
              <span className="text-[12px] text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
                Harus angka
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-gray-700">Alamat Rumah</label>
            <textarea 
              placeholder="Masukkan alamat domisili saat ini"
              rows={4}
              value={formData.alamatRumah}
              onChange={(e) => setFormData({...formData, alamatRumah: e.target.value})}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary transition-all text-[15px] placeholder:text-gray-400 resize-none"
            />
          </div>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white border-t border-gray-100 p-6 z-40">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-[14px] font-bold text-[15px] transition-all duration-300 ${
            isFormValid 
              ? "bg-btn-primary text-white shadow-[0_8px_20px_-4px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 active:scale-[0.98]" 
              : "bg-[#C8CDE0] text-white cursor-not-allowed"
          }`}
        >
          Simpan Perubahan
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-[340px] p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="mb-6">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50.4 36H24C19.5817 36 16 39.5817 16 44V88C16 92.4183 19.5817 96 24 96H84.1837C90.3546 96 94.6146 89.6253 92.0527 84.1504L83.6385 66.166C81.9332 62.5226 78.2618 60 74.2201 60H57.6C53.1817 60 49.6 56.4183 49.6 52V42.5028C49.6 39.5785 52.4185 36 55.6 36C59.0833 36 62.4777 36 62.4777 36L66.7027 42H96C100.418 42 104 45.5817 104 50V56" fill="#4B9BFC"/>
                <path d="M56.8 30L64.8 42H96C100.418 42 104 45.5817 104 50V52H102.503C98.4111 52 94.8872 55.4542 93.4475 59.3908L84.8142 83.0034C82.1643 90.2483 75.3188 95 67.587 95H33.153C26.1555 95 21.055 88.0837 23.0116 81.3093L30.9329 53.882C32.4045 48.7845 37.0709 45.1958 42.3951 45.0682L49.6 44.8958V36H49.3333L56.8 30Z" fill="#5EBCFF"/>
                <path d="M56 36L60.8 42H64.8L56.8 30H49.3333C49.3333 30 52.5167 36 56 36Z" fill="#69E7B3"/>
                <circle cx="60" cy="74" r="28" fill="#69E7B3"/>
                <path d="M60 58V90M44 74H76" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="text-[20px] font-bold text-btn-primary mb-3">
              Data Berhasil Ditambahkan!
            </h2>
            
            <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
              Proses penambahan data balita telah berhasil diselesaikan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
