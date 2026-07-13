import Growth from "@/features/parent/growth/components/GrowthTracker";
import { getParentDashboard } from "@/services/dashboard.service";
import { getMeasurementsByChild } from "@/services/measurement.service";
import type {
  ChildData,
  MeasurementApiDTO,
  MeasurementResponseDTO,
} from "@/features/parent/growth/types";

export const metadata = {
  title: "Tumbuh | JagaCilik",
  description: "Pantau metrik pertumbuhan anak sesuai standar WHO",
};

export default async function GrowthPage() {
  const dashboardData = await getParentDashboard();

  const childrenDataPromises = dashboardData.map(
    async (child): Promise<ChildData> => {
      const rawMeasurementsRes = (await getMeasurementsByChild(
        child.id.toString(),
      )) as MeasurementApiDTO[] | MeasurementResponseDTO | null;

      let rawMeasurements: MeasurementApiDTO[] = [];

      if (Array.isArray(rawMeasurementsRes)) {
        rawMeasurements = rawMeasurementsRes;
      } else if (rawMeasurementsRes && Array.isArray(rawMeasurementsRes.data)) {
        rawMeasurements = rawMeasurementsRes.data;
      } else if (
        rawMeasurementsRes &&
        "items" in rawMeasurementsRes &&
        Array.isArray(rawMeasurementsRes.items)
      ) {
        rawMeasurements = rawMeasurementsRes.items;
      }

      const riwayatPemeriksaan = rawMeasurements.map(
        (m: MeasurementApiDTO) => ({
          id: m.id,
          tanggal: new Date(m.measurement_date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          lokasi: m.clinic?.name || "Posyandu",
          keterangan: m.description || "Pemeriksaan Rutin",
          bb: m.body_weight,
          tb: m.body_height,
        }),
      );

      return {
        id: child.id,
        name: child.name,
        details: `${child.gender} • ${child.age}`,
        image: "",
        stats: {
          weight:
            rawMeasurements.length > 0
              ? rawMeasurements[0].body_weight.toString()
              : child.weight.replace(" kg", ""),
          height:
            rawMeasurements.length > 0
              ? rawMeasurements[0].body_height.toString()
              : child.height.replace(" cm", ""),
          head:
            rawMeasurements.length > 0
              ? (rawMeasurements[0].head_circumference || 0).toString()
              : "0",
          status: child.status || "NORMAL",
        },
        riwayatPemeriksaan,
        jadwalImunisasi: [],
      };
    },
  );

  const childrenData = await Promise.all(childrenDataPromises);

  return (
    <div className="flex-1 bg-background flex flex-col relative overflow-y-auto pb-6">
      <div className="flex items-center px-6 pt-10 pb-4 sticky top-0 bg-background/95 backdrop-blur-md z-30 border-b border-border-input/10 relative">
        <h1 className="text-3xl font-bold text-btn-primary w-full text-center">
          Pertumbuhan
        </h1>
      </div>

      {childrenData.length > 0 ? (
        <Growth initialData={childrenData} />
      ) : (
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <p className="text-sm text-icon-muted">
            Belum ada data pertumbuhan anak.
          </p>
        </div>
      )}
    </div>
  );
}
