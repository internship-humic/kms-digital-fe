import { GrowthDataPoint } from "../types";
import zScoreBBLakiLaki from "@/data/who/ZScoreBeratBadanLakiLaki.json";
import zScoreBBPerempuan from "@/data/who/ZScoreBeratBadanPerempuan.json";
import zScoreTBLakiLaki from "@/data/who/ZScorePanjangBadanLakiLaki.json";
import zScoreTBPerempuan from "@/data/who/ZScorePanjangBadanPerempuan.json";
import zScoreLKLakiLaki from "@/data/who/ZScoreLingkarKepalaLakiLaki.json";
import zScoreLKPerempuan from "@/data/who/ZScoreLingkarKepalaPerempuan.json";

export function getCombinedGrowthData(
  gender: "Laki-laki" | "Perempuan",
  childData: GrowthDataPoint[],
) {
  const whoBB = gender === "Laki-laki" ? zScoreBBLakiLaki : zScoreBBPerempuan;
  const whoTB = gender === "Laki-laki" ? zScoreTBLakiLaki : zScoreTBPerempuan;
  const whoLK = gender === "Laki-laki" ? zScoreLKLakiLaki : zScoreLKPerempuan;

  const formatChildData = (
    metric: "weight" | "height" | "head",
    whoArray: any[],
  ) => {
    return whoArray.map((std) => {
      const childMatch = childData.find(
        (c) =>
          Number(c.month.replace("Bulan ", "").trim()) === Number(std.bulan),
      );
      return {
        ...std,
        aktualAnak: childMatch ? childMatch[metric] : null,
      };
    });
  };

  return {
    bb: formatChildData("weight", whoBB),
    tb: formatChildData("height", whoTB),
    lk: formatChildData("head", whoLK),
  };
}

export function getCombinedGrowthDataFromAPI(
  gender: "Laki-laki" | "Perempuan",
  apiGraphData: any,
) {
  const whoBB = gender === "Laki-laki" ? zScoreBBLakiLaki : zScoreBBPerempuan;
  const whoTB = gender === "Laki-laki" ? zScoreTBLakiLaki : zScoreTBPerempuan;
  const whoLK = gender === "Laki-laki" ? zScoreLKLakiLaki : zScoreLKPerempuan;

  const rawMeasurements = Array.isArray(apiGraphData) ? apiGraphData : [];

  const formatData = (whoArray: any[], metricKey: string) => {
    return whoArray.map((std) => {
      const match = rawMeasurements.find(
        (m: any) => m.age_month === Number(std.bulan),
      );
      return {
        ...std,
        aktualAnak: match ? match[metricKey] : null,
      };
    });
  };

  return {
    bb: formatData(whoBB, "body_weight"),
    tb: formatData(whoTB, "body_height"),
    lk: formatData(whoLK, "head_circumference"),
  };
}

export const mapApiToGrowthDataPoints = (
  apiGraphData: any,
): GrowthDataPoint[] => {
  if (!Array.isArray(apiGraphData)) return [];

  return [...apiGraphData]
    .sort((a, b) => a.age_month - b.age_month)
    .map((m: any) => {
      return {
        month: `Bulan ${m.age_month}`,
        weight: m.body_weight || 0,
        height: m.body_height || 0,
        head: m.head_circumference || 0,
      };
    });
};
