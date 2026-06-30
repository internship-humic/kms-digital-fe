import { useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { SelectOption } from "@/components/ui/CustomSelect";
import { RegionResponseDTO } from "../types";
import {
  getProvinces,
  getRegencies,
  getDistricts,
  getVillages,
  getClinics,
} from "@/services/region.service";

export const useRegionData = (setValue: UseFormSetValue<any>) => {
  const [provinces, setProvinces] = useState<SelectOption[]>([]);
  const [regencies, setRegencies] = useState<SelectOption[]>([]);
  const [districts, setDistricts] = useState<SelectOption[]>([]);
  const [villages, setVillages] = useState<SelectOption[]>([]);
  const [clinics, setClinics] = useState<SelectOption[]>([]);

  const [selectedProv, setSelectedProv] = useState<string>("");
  const [selectedReg, setSelectedReg] = useState<string>("");
  const [selectedDist, setSelectedDist] = useState<string>("");
  const [selectedVill, setSelectedVill] = useState<string>("");

  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(
        data.map((d: RegionResponseDTO) => ({
          id: d.id,
          label: d.name,
        })),
      );
    });
  }, []);

  useEffect(() => {
    setRegencies([]);
    setDistricts([]);
    setVillages([]);
    setClinics([]);
    setSelectedReg("");
    setSelectedDist("");
    setSelectedVill("");
    setValue("posyanduId", "");

    if (!selectedProv) return;

    getRegencies(selectedProv).then((data) => {
      setRegencies(
        data.map((d: RegionResponseDTO) => ({
          id: d.id,
          label: d.name,
        })),
      );
    });
  }, [selectedProv, setValue]);

  useEffect(() => {
    setDistricts([]);
    setVillages([]);
    setClinics([]);
    setSelectedDist("");
    setSelectedVill("");
    setValue("posyanduId", "");

    if (!selectedReg) return;

    getDistricts(selectedReg).then((data) => {
      setDistricts(
        data.map((d: RegionResponseDTO) => ({
          id: d.id,
          label: d.name,
        })),
      );
    });
  }, [selectedReg, setValue]);

  useEffect(() => {
    setVillages([]);
    setClinics([]);
    setSelectedVill("");
    setValue("posyanduId", "");

    if (!selectedDist) return;

    getVillages(selectedDist).then((data) => {
      setVillages(
        data.map((d: RegionResponseDTO) => ({
          id: d.id,
          label: d.name,
        })),
      );
    });
  }, [selectedDist, setValue]);

  useEffect(() => {
    setClinics([]);
    setValue("posyanduId", "");

    if (!selectedVill) return;

    getClinics(selectedVill).then((data) => {
      setClinics(
        data.map((d: RegionResponseDTO) => ({
          id: d.id,
          label: d.name,
        })),
      );
    });
  }, [selectedVill, setValue]);

  return {
    provinces,
    regencies,
    districts,
    villages,
    clinics,
    selectedProv,
    setSelectedProv,
    selectedReg,
    setSelectedReg,
    selectedDist,
    setSelectedDist,
    selectedVill,
    setSelectedVill,
  };
};
