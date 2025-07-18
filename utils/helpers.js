export function normalizeKeywords(input) {
    if (!input) return undefined;
  
    if (Array.isArray(input)) {
      return input.map((k) => k.trim()).filter(Boolean);
    }
  
    // String olarak geldiyse virgüllerden ayır ve boşları temizle
    return input
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
  }
  