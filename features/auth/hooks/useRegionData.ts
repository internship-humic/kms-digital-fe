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
    getProvinces().then((data) =>
      setProvinces(
        data.map((d: RegionResponseDTO) => ({ id: d.id, label: d.name })),
      ),
    );
  }, []);

  useEffect(() => {
    if (selectedProv) {
      getRegencies(selectedProv).then((data) =>
        setRegencies(
          data.map((d: RegionResponseDTO) => ({ id: d.id, label: d.name })),
        ),
      );
    }
    setRegencies([]);
    setDistricts([]);
    setVillages([]);
    setClinics([]);
    setSelectedReg("");
    setSelectedDist("");
    setSelectedVill("");
    setValue("posyanduId", "");
  }, [selectedProv, setValue]);

  useEffect(() => {
    if (selectedReg) {
      getDistricts(selectedReg).then((data) =>
        setDistricts(
          data.map((d: RegionResponseDTO) => ({ id: d.id, label: d.name })),
        ),
      );
    }
    setDistricts([]);
    setVillages([]);
    setClinics([]);
    setSelectedDist("");
    setSelectedVill("");
    setValue("posyanduId", "");
  }, [selectedReg, setValue]);

  useEffect(() => {
    if (selectedDist) {
      getVillages(selectedDist).then((data) =>
        setVillages(
          data.map((d: RegionResponseDTO) => ({ id: d.id, label: d.name })),
        ),
      );
    }
    setVillages([]);
    setClinics([]);
    setSelectedVill("");
    setValue("posyanduId", "");
  }, [selectedDist, setValue]);

  useEffect(() => {
    if (selectedVill) {
      getClinics(selectedVill).then((data) =>
        setClinics(
          data.map((d: RegionResponseDTO) => ({ id: d.id, label: d.name })),
        ),
      );
    }
    setClinics([]);
    setValue("posyanduId", "");
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
