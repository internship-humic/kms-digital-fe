import { classifyBBU, classifyTBU, classifyBBTB } from "@/lib/utils/zscore";
import { getCombinedGrowthDataFromAPI } from "@/features/parent/growth/utils/getChartData";

export function transformApiToMetrics(childInfo: any, apiGraphData: any) {
  const safeGraphData = apiGraphData || {
    weight: [],
    height: [],
    head_circumference: [],
    nutrition: [],
  };

  const combinedChartData = getCombinedGrowthDataFromAPI(
    childInfo.gender,
    safeGraphData,
  ).bb;

  const riwayat = safeGraphData.weight
    .map((w: any) => {
      const t =
        safeGraphData.height.find((h: any) => h.age_month === w.age_month) ||
        {};
      const n =
        safeGraphData.nutrition.find((n: any) => n.age_month === w.age_month) ||
        {};

      const dateObj = new Date(w.measurement_date);
      const dateStr = dateObj.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return {
        tanggal: dateStr,
        berat: w.value.toString(),
        tinggi: t.value?.toString() || "0",
        zBB: w.zscore?.toFixed(2) || "0.00",
        statusBB: classifyBBU(w.zscore),
        zTB: t.zscore?.toFixed(2) || "0.00",
        statusTB: classifyTBU(t.zscore),
        zBBTB: n.zscore?.toFixed(2) || "0.00",
        statusBBTB: classifyBBTB(n.zscore),
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
  const latestLK =
    safeGraphData.head_circumference?.slice(-1)[0]?.value?.toString() || "0";

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
    riwayat: [],
  };

  return {
    mappedData,
    combinedChartData,
    riwayatDenganZScoreAsli: riwayat,
    macroStatusInfo,
  };
}
