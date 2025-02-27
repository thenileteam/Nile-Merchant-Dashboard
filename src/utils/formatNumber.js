import {visa, master} from '../assets'

export function formatNumber(number) {
  // If the number is negative, convert it to a positive number for formatting
let changeToNumber = Number(number)
  const isNegative = changeToNumber < 0;
  changeToNumber = Math.abs(changeToNumber);

  // Check if the number is greater than or equal to a million
  if (changeToNumber >= 1_000_000_000) {
    // Format billions
    const billions = (changeToNumber/ 1_000_000_000).toFixed(1);
    return `${isNegative ? "-" : ""}${billions}B`;
  } else if (changeToNumber >= 1_000_000) {
    // Format millions
    const millions = (changeToNumber / 1_000_000).toFixed(1);
    return `${isNegative ? "-" : ""}${millions}M`;
  } else if (changeToNumber >= 1_000) {
    // Format thousands with commas
    return `${isNegative ? "-" : ""}${changeToNumber.toLocaleString()}`;
  }

  // For numbers less than 1000, return as is
  return `${isNegative ? "-" : ""}${changeToNumber}`;
}

export const getCardType = (cardNumber) => {
    const checkCardNumber = cardNumber?.replace(/\D/g, ""); // Remove non-digits
  //card cases for types
    if (/^4/.test(checkCardNumber)) {
      return "Visa";
    } else if (/^5[1-5]/.test(checkCardNumber)) {
      return "MasterCard";
    } else if (/^3[47]/.test(checkCardNumber)) {
      return "American Express";
    } else if (/^6(?:011|5)/.test(checkCardNumber)) {
      return "Discover";
    } else if (/^5061|^6500/.test(checkCardNumber)) {
      return "Verve"; // Detect Verve cards
    } else if (/^3(?:0[0-5]|[68])/.test(checkCardNumber)) {
      return "Diners Club";
    } else if (/^35/.test(checkCardNumber)) {
      return "JCB";
    } else {
      return "Unknown";
    }
  };
  
// images
  const cardTypeImages = {
    Visa: visa,
    MasterCard: master,
    // Verve: verve,
    // "American Express": amexImg,
    Unknown: '',
  };
export const getCardImage= (cardNumber) => {
   return cardTypeImages[getCardType(cardNumber)]||'Unknown';
 }


 //dollar
 export const convertNairaToDollar = (nairaAmount, exchangeRate = 1600) => {
  // Convert Naira to Dollar
  const dollarAmount = nairaAmount / exchangeRate;
  return dollarAmount;
};


 