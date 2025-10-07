// Utility to clean a slug segment by removing undesired characters (e.g., '#')
const cleanSlugValue = (value: string): string => {
     return value.replace(/#/g, '').trim();
};

// Payload type for Saudi plate number slug generation
export type PlateNumberSaudiPayload = {
     symbol: string;
     numberEnglish: string;
     numberArabic: string;
     alphabetsCombinations: string[]; // max length 3
};

// Generates slug like: 68ce336db675f376f9f2e68c-1234-١٢٣٤-1١-1٢-1٣
export const generateSlug = (payload: PlateNumberSaudiPayload): string => {
     const parts: string[] = [];

     const pushPart = (val?: string) => {
          if (!val) return;
          const cleaned = cleanSlugValue(String(val));
          if (cleaned) parts.push(cleaned);
     };

     // Fixed order: symbol, numberEnglish, numberArabic, then up to first 3 combinations
     pushPart(payload.symbol);
     pushPart(payload.numberEnglish);
     pushPart(payload.numberArabic);

     const combos = Array.isArray(payload.alphabetsCombinations)
          ? payload.alphabetsCombinations.slice(0, 3)
          : [];
     combos.forEach(pushPart);

     return parts.join('-');
};


