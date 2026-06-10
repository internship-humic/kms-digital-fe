export type ZScoreReference = {
  median: number;
  SD1neg: number;
  SD1pos: number;
};

/**
 * Menghitung nilai Z-Score aktual berdasarkan titik referensi WHO.
 * Rumus:
 * Jika Nilai Aktual < Median: Z-Score = (Aktual - Median) / (Median - SD1neg)
 * Jika Nilai Aktual >= Median: Z-Score = (Aktual - Median) / (SD1pos - Median)
 */
export const calculateZScore = (
  aktual: number,
  ref: ZScoreReference,
): number => {
  const { median, SD1neg, SD1pos } = ref;

  if (aktual < median) {
    return (aktual - median) / (median - SD1neg);
  } else {
    return (aktual - median) / (SD1pos - median);
  }
};

export const classifyBBU = (zScore: number): string => {
  if (zScore < -3) return "Gizi Buruk (Severely Underweight)";
  if (zScore >= -3 && zScore < -2) return "Gizi Kurang (Underweight)";
  if (zScore >= -2 && zScore <= 1) return "Berat Badan Normal";
  return "Risiko Berat Badan Lebih";
};

export const classifyTBU = (zScore: number): string => {
  if (zScore < -3) return "Sangat Pendek (Severely Stunted)";
  if (zScore >= -3 && zScore < -2) return "Pendek (Stunted)";
  if (zScore >= -2 && zScore <= 3) return "Normal";
  return "Tinggi";
};

export const classifyBBTB = (zScore: number): string => {
  if (zScore < -3) return "Gizi Buruk (Severely Wasted)";
  if (zScore >= -3 && zScore < -2) return "Gizi Kurang (Wasted)";
  if (zScore >= -2 && zScore <= 1) return "Gizi Baik (Normal)";
  if (zScore > 1 && zScore <= 2) return "Berisiko Gizi Lebih";
  if (zScore > 2 && zScore <= 3) return "Gizi Lebih (Overweight)";
  return "Obesitas (Obese)";
};
