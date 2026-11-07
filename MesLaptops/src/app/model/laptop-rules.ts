// Same limits as the catalog service (Laptop and Model entities), so the form
// explains a problem before the server refuses it.
export const BRAND_MAX = 100;
export const SPECS_MAX = 1000;
export const PRICE_MAX = 10_000_000;
export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

interface LaptopFields {
  brandLaptop?: string;
  prixLaptop?: number;
  caracteristiquesLaptop?: string;
  dateCreation?: Date | string;
}

/** Problems with the form values, in French, or an empty list when it can be saved. */
export function laptopProblems(laptop: LaptopFields, hasModel: boolean): string[] {
  const problems: string[] = [];
  const brand = (laptop.brandLaptop ?? '').trim();
  if (!brand) problems.push('Indiquez la marque.');
  else if (brand.length > BRAND_MAX) problems.push(`La marque ne doit pas dépasser ${BRAND_MAX} caractères.`);

  const price = Number(laptop.prixLaptop);
  if (laptop.prixLaptop === undefined || laptop.prixLaptop === null || String(laptop.prixLaptop) === '') {
    problems.push('Indiquez le prix.');
  } else if (!(price > 0)) {
    problems.push('Le prix doit être supérieur à 0.');
  } else if (price > PRICE_MAX) {
    problems.push('Le prix ne doit pas dépasser 10 000 000.');
  }

  if ((laptop.caracteristiquesLaptop ?? '').length > SPECS_MAX) {
    problems.push(`Les caractéristiques ne doivent pas dépasser ${SPECS_MAX} caractères.`);
  }

  if (laptop.dateCreation) {
    const date = new Date(laptop.dateCreation);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    if (isNaN(date.getTime())) problems.push('La date de mise en service est invalide.');
    else if (date > endOfToday) problems.push('La date de mise en service ne peut pas être dans le futur.');
  }

  if (!hasModel) problems.push('Choisissez un modèle.');
  return problems;
}

/** Why an image file cannot be used, or null when it is fine. */
export function imageProblem(file: File): string | null {
  if (!IMAGE_TYPES.includes(file.type)) return "L'image doit être au format JPG, PNG, GIF ou WebP.";
  if (file.size > IMAGE_MAX_BYTES) return "L'image ne doit pas dépasser 5 Mo.";
  return null;
}

/** Readable message from an API error, using the field messages of a 400 response. */
export function apiErrorMessage(error: any): string {
  const errors = error?.error?.errors;
  if (errors && typeof errors === 'object') {
    const messages = Array.isArray(errors) ? errors.map((e: any) => e.message) : Object.values(errors);
    if (messages.length) return messages.join(' ');
  }
  if (error?.status === 401 || error?.status === 403) return "Votre session a expiré ou vous n'avez pas les droits d'administrateur. Reconnectez-vous.";
  if (error?.status === 0) return 'Le service ne répond pas. Réessayez dans un instant.';
  return "L'enregistrement a échoué. Réessayez.";
}
