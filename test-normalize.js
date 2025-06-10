const normalizeStatusEffectName = (name) => {
  return name
    .replace(/\[\[X\]\]/g, '') // Remove X placeholders
    .replace(/\[\[Y\]\]/g, '') // Remove Y placeholders
    .replace(/\s+for\s+$/i, '') // Remove trailing 'for' (case insensitive)
    .replace(/\s+for\s+/i, ' ') // Replace 'for' in middle with single space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing whitespace
};

console.log('Testing normalization:');
console.log('Frenzied [[X]] for [[Y]] =>', normalizeStatusEffectName('Frenzied [[X]] for [[Y]]'));
console.log('Immolated [[X]] for [[Y]] =>', normalizeStatusEffectName('Immolated [[X]] for [[Y]]'));
console.log('Enslumbered for [[X]] =>', normalizeStatusEffectName('Enslumbered for [[X]]'));
console.log('Blinded [[X]] =>', normalizeStatusEffectName('Blinded [[X]]'));
console.log('Pure =>', normalizeStatusEffectName('Pure'));
