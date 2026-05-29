type PasswordStrength = {
  score: number;
  isMinLength: boolean;
  hasUpperLower: boolean;
  hasNumberOrSymbol: boolean;
  hasNumberAndSymbol: boolean;
  strengthText: string;
  strengthColorClass: string;
  strengthTextColorClass: string;
};

export function usePasswordStrength(password: string): PasswordStrength {
  const isMinLength = password.length >= 8;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumberOrSymbol = /[^a-zA-Z\s]/.test(password);
  const hasNumberAndSymbol =
    /[0-9]/.test(password) && /[^a-zA-Z0-9\s]/.test(password);

  let score = 0;

  if (isMinLength) score++;
  if (hasUpperLower) score++;
  if (hasNumberOrSymbol) score++;
  if (hasNumberAndSymbol) score++;

  const strengthColorClass = getStrengthColor(score);
  const strengthText = getStrengthText(score);
  const strengthTextColorClass = getStrengthTextColor(score);

  return {
    score,
    isMinLength,
    hasUpperLower,
    hasNumberOrSymbol,
    hasNumberAndSymbol,
    strengthText,
    strengthColorClass,
    strengthTextColorClass,
  };
}

function getStrengthColor(score: number) {
  if (score === 0) return "bg-border-input";
  if (score === 1) return "bg-danger";
  if (score === 2) return "bg-password-medium";
  if (score >= 3) return "bg-password-strong";

  return "bg-border-input";
}

function getStrengthText(score: number) {
  if (score === 0) return "";
  if (score === 1) return "Lemah";
  if (score === 2) return "Sedang";
  if (score === 3) return "Kuat";

  return "Sangat Kuat";
}

function getStrengthTextColor(score: number) {
  if (score === 1) return "text-danger";
  if (score === 2) return "text-password-medium";
  if (score >= 3) return "text-password-strong";

  return "text-icon-muted";
}
