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

  const formatData = (whoArray: any[], apiMeasurements: any[]) => {
    return whoArray.map((std) => {
      const match = apiMeasurements.find(
        (m: any) => m.age_month === Number(std.bulan),
      );
      return {
        ...std,
        aktualAnak: match ? match.value : null,
      };
    });
  };

  return {
    bb: formatData(whoBB, apiGraphData?.weight || []),
    tb: formatData(whoTB, apiGraphData?.height || []),
    lk: formatData(whoLK, apiGraphData?.head_circumference || []),
  };
}

export const mapApiToGrowthDataPoints = (
  apiGraphData: any,
): GrowthDataPoint[] => {
  if (!apiGraphData || !apiGraphData.weight) return [];

  return apiGraphData.weight.map((w: any) => {
    const t = apiGraphData.height?.find(
      (h: any) => h.age_month === w.age_month,
    );
    const lk = apiGraphData.head_circumference?.find(
      (l: any) => l.age_month === w.age_month,
    );

    return {
      month: `Bulan ${w.age_month}`,
      weight: w.value,
      height: t?.value || 0,
      head: lk?.value || 0,
    };
  });
};
