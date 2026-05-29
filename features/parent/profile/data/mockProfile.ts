import { ProfileData } from "../types";

export const getProfileMockData = async (): Promise<ProfileData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    fullName: "Arjanti Atma",
    email: "arjanti@gmail.com",
    phone: "+62 812-3456-7890",
    posyandu: "Posyandu Melati 1",
    address:
      "Jl. Kenangan Indah No. 42, RT 03/RW 05, Kelurahan Damai, Jakarta Selatan",
    avatar: "https://i.pravatar.cc/150?img=1",
    isVerified: true,
  };
};
