import { Category } from "./catalogType";

export type Chapter = {
  id: string;
  name: string;
  photo: string;
  description: string;
  category: Category[];
};
