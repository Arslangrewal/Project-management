export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password = "") => {
  const checks = {
    minLength: password.length >= 8,
    maxLength: password.length <= 20,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  return {
    isValid: Object.values(checks).every(Boolean),
    checks,
  };
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};