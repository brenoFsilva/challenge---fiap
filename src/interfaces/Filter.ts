import type Data from "./Data";

export type Filter = {
  [key in keyof Data]?: string[];
};
