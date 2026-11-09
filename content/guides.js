import { GUIDES_CA } from "./guides-ca";
import { GUIDES_US } from "./guides-us";
import { GUIDES_GENERAL } from "./guides-general";

export const GUIDES = [...GUIDES_GENERAL, ...GUIDES_CA, ...GUIDES_US];
export const getGuide = (slug) => GUIDES.find((g) => g.slug === slug);
export const guidesFor = (country) => GUIDES.filter((g) => g.country === country || g.country === "ALL");
export const AUTHOR = "Mortgage Helpline Editorial Team";
