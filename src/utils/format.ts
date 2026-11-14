/**
 * Formats a number to Indian Rupee (INR) representation with standard grouping (e.g., ₹1,34,900)
 */
export const formatINR = (amount: number | undefined | null): string => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0';
  }
  return '₹' + Math.round(amount).toLocaleString('en-IN');
};
