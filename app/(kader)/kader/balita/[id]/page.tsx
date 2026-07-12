import DetailBalitaFeed from "@/features/kader/balita/components/DetailBalitaFeed";
import { transformApiToMetrics } from "@/features/kader/balita/utils/calculateMetrics";
import { getChildrens } from "@/services/children.service";
import { getMeasurementGraph, getMeasurementsByChild } from "@/services/measurement.service";
import { getProfile } from "@/services/auth.service";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Detail Balita #${id} | JagaCilik`,
    description: "Rincian profil dan pengukuran pertumbuhan balita",
  };
}

export default async function DetailBalitaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const profile = await getProfile<any>();
  const clinicId = profile?.user?.clinic_id || "";

  const childrenList = await getChildrens(undefined, 1, 50, clinicId);
  const childInfo = childrenList.find((item) => item.id.toString() === id);

  if (!childInfo) {
    notFound();
  }

  const apiGraphData = await getMeasurementGraph(id);
  const rawMeasurementsRes = await getMeasurementsByChild(id);
  let rawMeasurements = [];
  if (Array.isArray(rawMeasurementsRes)) {
    rawMeasurements = rawMeasurementsRes;
  } else if (rawMeasurementsRes && Array.isArray(rawMeasurementsRes.data)) {
    rawMeasurements = rawMeasurementsRes.data;
  } else if (rawMeasurementsRes?.data && Array.isArray(rawMeasurementsRes.data.items)) {
    rawMeasurements = rawMeasurementsRes.data.items;
  }

  const {
    mappedData,
    combinedChartData,
    riwayatDenganZScoreAsli,
    macroStatusInfo,
  } = transformApiToMetrics(childInfo, apiGraphData, rawMeasurements);

  // removed profile fetch since it is done at the top

  return (
    <DetailBalitaFeed
      data={mappedData}
      metrics={{ combinedChartData, riwayatDenganZScoreAsli, macroStatusInfo }}
      clinicId={clinicId}
    />
  );
}
