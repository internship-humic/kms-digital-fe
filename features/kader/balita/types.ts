export type GenderApi = "MALE" | "FEMALE";
export type GenderLabel = "Laki-laki" | "Perempuan";
export type ChildStatus = "NORMAL" | "LOWRISK" | "HIGHRISK";

export type BalitaData = {
  id: string;
  name: string;
  gender: GenderLabel;
  genderApi: GenderApi;
  age: string;
  status: ChildStatus;
  address: string;
  birthDate: string;
  parentId: string;
  parentName?: string;
  parentPhone?: string;
};

export type ChildPayload = {
  name: string;
  birth_date: string;
  parent_id: string;
  gender: GenderApi;
  address: string;
  status?: ChildStatus;
  body_weight: number;
  body_height: number;
  head_circumference?: number | null;
};
