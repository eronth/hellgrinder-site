// Helper function to normalize status effect names for comparison
export const normalizeStatusEffectName = (name?: string): string => {
  if (!name) { return ''; }
  return name
    .replace(/\[\[X\]\]/g, '') // Remove X placeholders
    .replace(/\[\[Y\]\]/g, '') // Remove Y placeholders
    .replace(/\s+for\s+$/i, '') // Remove trailing "for" (case insensitive)
    .replace(/\s+for\s+/i, ' ') // Replace "for" in middle with single space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing whitespace
};