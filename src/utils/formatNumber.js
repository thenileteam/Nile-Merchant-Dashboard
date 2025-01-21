export function formatNumber(number) {
  // If the number is negative, convert it to a positive number for formatting
  const isNegative = number < 0;
  number = Math.abs(number);

  // Check if the number is greater than or equal to a million
  if (number >= 1_000_000_000) {
    // Format billions
    const billions = (number / 1_000_000_000).toFixed(1);
    return `${isNegative ? "-" : ""}${billions}B`;
  } else if (number >= 1_000_000) {
    // Format millions
    const millions = (number / 1_000_000).toFixed(1);
    return `${isNegative ? "-" : ""}${millions}M`;
  } else if (number >= 1_000) {
    // Format thousands with commas
    return `${isNegative ? "-" : ""}${number.toLocaleString()}`;
  }

  // For numbers less than 1000, return as is
  return `${isNegative ? "-" : ""}${number}`;
}

// Example Usage:
console.log(formatNumber(1500)); // Output: "1,500"
console.log(formatNumber(1500000)); // Output: "1.5M"
console.log(formatNumber(3500000000)); // Output: "3.5B"
console.log(formatNumber(-250000)); // Output: "-250,000"
console.log(formatNumber(999)); // Output: "999"
