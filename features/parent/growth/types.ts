export type GrowthDataPoint = {
  month: string;
  weight: number;
  height: number;
};

export type ChildData = {
  id: number;
  name: string;
  details: string;
  image: string;
  stats: {
    weight: string;
    height: string;
    head: string;
    status: string;
  };
};
