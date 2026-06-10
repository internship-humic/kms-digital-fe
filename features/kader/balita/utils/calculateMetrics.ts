import { BalitaDetail } from "../types";
import {
  calculateZScore,
  classifyBBU,
  classifyTBU,
  classifyBBTB,
} from "@/lib/utils/zscore";

import zScoreBBLakiLaki from "@/data/who/ZScoreBeratBadanLakiLaki.json";
import zScoreBBPerempuan from "@/data/who/ZScoreBeratBadanPerempuan.json";
import zScoreTBLakiLaki from "@/data/who/ZScorePanjangBadanLakiLaki.json";
import zScoreTBPerempuan from "@/data/who/ZScorePanjangBadanPerempuan.json";
import zScoreBBTBLakiLaki24 from "@/data/who/ZScoreBeratTinggiBadanLakiLaki24.json";
import zScoreBBTBLakiLaki60 from "@/data/who/ZScoreBeratTinggiBadanLakiLaki60.json";
import zScoreBBTBPerempuan24 from "@/data/who/ZScoreBeratTinggiBadanPerempuan24.json";
import zScoreBBTBPerempuan60 from "@/data/who/ZScoreBeratTinggiBadanPerempuan60.json";

export function calculateDetailBalitaMetrics(data: BalitaDetail) {
  const whoDataBB =
    data.jk === "Laki-laki" ? zScoreBBLakiLaki : zScoreBBPerempuan;
  const whoDataTB =
    data.jk === "Laki-laki" ? zScoreTBLakiLaki : zScoreTBPerempuan;

  const currentMonth = parseInt(data.usia.split(" ")[0]) || 24;

  const combinedChartData = whoDataBB.map((std) => {
    const riwayatMatch = data.riwayat.find((r, index) => {
      const rMonth = currentMonth - index;
      return rMonth === Number(std.bulan);
    });

    return {
      ...std,
      aktualAnak: riwayatMatch ? parseFloat(riwayatMatch.berat) : null,
    };
  });

  const riwayatDenganZScoreAsli = data.riwayat.map((row, index) => {
    const rMonthNum = currentMonth - index;

    const refBBU = whoDataBB.find((w) => Number(w.bulan) === rMonthNum);
    const refTBU = whoDataTB.find((w) => Number(w.bulan) === rMonthNum);

    let refBBTBList: any[] = [];
    if (data.jk === "Laki-laki") {
      refBBTBList =
        rMonthNum < 24 ? zScoreBBTBLakiLaki24 : zScoreBBTBLakiLaki60;
    } else {
      refBBTBList =
        rMonthNum < 24 ? zScoreBBTBPerempuan24 : zScoreBBTBPerempuan60;
    }

    const tinggiNum = parseFloat(row.tinggi);
    const beratNum = parseFloat(row.berat);

    const tinggiDibulatkan = Math.round(tinggiNum * 2) / 2;
    const refBBTB = refBBTBList.find(
      (w) => parseFloat(w.pb as string) === tinggiDibulatkan,
    );

    let zBB = 0,
      zTB = 0,
      zBBTB = 0;

    if (refBBU) {
      zBB = calculateZScore(beratNum, {
        median: Number(refBBU.median),
        SD1neg: Number(refBBU.SD1neg),
        SD1pos: Number(refBBU.SD1pos),
      });
    }

    if (refTBU) {
      zTB = calculateZScore(tinggiNum, {
        median: Number(refTBU.median),
        SD1neg: Number(refTBU.SD1neg),
        SD1pos: Number(refTBU.SD1pos),
      });
    }

    if (refBBTB) {
      zBBTB = calculateZScore(beratNum, {
        median: Number(refBBTB.median),
        SD1neg: Number(refBBTB.SD1neg),
        SD1pos: Number(refBBTB.SD1pos),
      });
    }

    return {
      ...row,
      zBB: zBB.toFixed(2),
      statusBB: classifyBBU(zBB),
      zTB: zTB.toFixed(2),
      statusTB: classifyTBU(zTB),
      zBBTB: zBBTB.toFixed(2),
      statusBBTB: classifyBBTB(zBBTB),
    };
  });

  const latest = riwayatDenganZScoreAsli[0];
  let macroStatusInfo = { label: "NORMAL" };

  if (latest) {
    const isBad =
      latest.statusBB.includes("Sangat") ||
      latest.statusTB.includes("Sangat") ||
      latest.statusBBTB.includes("Buruk") ||
      latest.statusBBTB.includes("Obesitas");

    const isWarn =
      latest.statusBB.includes("Kurang") ||
      latest.statusTB.includes("Pendek") ||
      latest.statusBBTB.includes("Kurang") ||
      latest.statusBBTB.includes("Berisiko");

    if (isBad) macroStatusInfo.label = "HIGH RISK";
    else if (isWarn) macroStatusInfo.label = "LOW RISK";
  }

  return { combinedChartData, riwayatDenganZScoreAsli, macroStatusInfo };
}
