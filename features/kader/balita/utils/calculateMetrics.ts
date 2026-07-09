import { classifyBBU, classifyTBU, classifyBBTB } from "@/lib/utils/zscore";
import { getCombinedGrowthDataFromAPI } from "@/features/parent/growth/utils/getChartData";

export function transformApiToMetrics(childInfo: any, apiGraphData: any) {
  const rawMeasurements = Array.isArray(apiGraphData) ? apiGraphData : [];

  const combinedChartData = getCombinedGrowthDataFromAPI(
    childInfo.gender,
    rawMeasurements,
  ).bb;

  const riwayat = rawMeasurements
    .map((m: any) => {
      const dateObj = new Date(m.measurement_date);
      const dateStr = dateObj.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return {
        id: m.id,
        rawDate: m.measurement_date.split("T")[0],
        tanggal: dateStr,
        berat: m.body_weight?.toString() || "0",
        tinggi: m.body_height?.toString() || "0",
        lingkarKepala: m.head_circumference?.toString() || "",
        keterangan: m.description || "",
        zBB: m.zscore_bb?.toFixed(2) || "0.00",
        statusBB: classifyBBU(m.zscore_bb),
        zTB: m.zscore_tb?.toFixed(2) || "0.00",
        statusTB: classifyTBU(m.zscore_tb),
        zBBTB: m.zscore_gizi?.toFixed(2) || "0.00",
        statusBBTB: classifyBBTB(m.zscore_gizi),
      };
    })
    .reverse();

  const macroStatusInfo = {
    label:
      childInfo.status === "HIGHRISK"
        ? "HIGH RISK"
        : childInfo.status === "LOWRISK"
          ? "LOW RISK"
          : "NORMAL",
  };

  const latestWeight = riwayat[0]?.berat || "0";
  const latestHeight = riwayat[0]?.tinggi || "0";

  const latestRaw = rawMeasurements[rawMeasurements.length - 1];
  const latestLK = latestRaw?.head_circumference?.toString() || "0";

  const mappedData = {
    id: childInfo.id.toString(),
    nama: childInfo.name,
    jk: childInfo.gender,
    usia: childInfo.age,
    status: childInfo.status,
    stats: {
      berat: latestWeight,
      tinggi: latestHeight,
      lingkarKepala: latestLK,
    },
    riwayat: riwayat,
  };

  return {
    mappedData,
    combinedChartData,
    riwayatDenganZScoreAsli: riwayat,
    macroStatusInfo,
  };
}
