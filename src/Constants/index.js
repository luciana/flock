import { pt_br_lang, en_us_lang } from "./Languages";
import { pt_br_routes, en_us_routes } from "./Routes";

export const STATENAME = process.env.REACT_APP_STATE || "FlockAppState";

export const TYPES = {
  UPDATE_LANG: "UPDATE_LANG",
  UPDATE_USER: "UPDATE_USER",
};

export const LANGUAGES = {
  "en-US": en_us_lang,
  "pt-BR": pt_br_lang,
};

export const ROUTES = {
  "en-US": en_us_routes,
  "pt-BR": pt_br_routes,
};


export const TAGS = [
  "", 
  "parent",
  "designer",
  "nutricionist",
  "technologist",
  "cook",
  "mechanic",
  "teacher",
  "fashion_designer",
  "interion_designer",
  "lawyer",
  "life_coach",
  "financial_analyst",
];

export const GENDER = [
  "",
  "female",
  "male",
  "non-binary",
];

export const GENERATIONS = [
  {
      label: "The Silent Generation",
      start: 1925,
      end: 1945,
  },
  {
      label: "The Baby Boomer Generation",
      start: 1946,
      end: 1964,
  },
  {
      label: "Generation X",
      start: 1965,
      end: 1979,
  },
  {
      label: "Millennials",
      start: 1980,
      end: 1994,
  },
  {
      label: "Generation Z",
      start: 1995,
      end: 2012,
  },
  {
      label: "Gen Alpha",
      start: 2023,
      end: 2032,
  },
];
