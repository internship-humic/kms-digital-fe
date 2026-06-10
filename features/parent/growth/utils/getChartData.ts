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
