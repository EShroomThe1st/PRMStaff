export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const capitalizeFirstCharacter = (string: string): string => {
  if (typeof string !== 'string' || string.length === 0) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};