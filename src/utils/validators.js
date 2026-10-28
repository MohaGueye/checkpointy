export const validateRequired = (value, fieldName) => {
  if (value === undefined || value === null || `${value}`.trim() === '') {
    throw new Error(`${fieldName} is required.`);
  }
};

export const validatePositiveNumber = (value, fieldName) => {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${fieldName} must be a positive number.`);
  }
};

export const normalizeMemberType = (memberType) => {
  const normalized = `${memberType || 'STANDARD'}`.trim().toUpperCase();
  return ['STANDARD', 'PREMIUM'].includes(normalized) ? normalized : 'STANDARD';
};
