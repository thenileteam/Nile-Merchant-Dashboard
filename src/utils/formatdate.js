import { format, parseISO } from "date-fns";
import { toast } from "sonner";
export const formatDate = (dateString) => {
  const formattedDate = format(parseISO(dateString), "dd MMMM yyyy");
  return formattedDate;
};

export const validateForm = (requiredFields, tableDetails) => {
  const errors = [];
  requiredFields.forEach((field) => {
    if (!tableDetails[field]) {
      errors.push(`Please provide ${field.replace("_", " ").toUpperCase()}`);
    }
  });

  if (errors.length > 0) {
    errors.forEach((error) => toast.error(error));
    return false;
  }

  return true;
};

export const policies = [
  {
    id: 0,
    title: "1. Acceptance of terms",
    text: ["-By creating an account on nile you agree to these terms, and our privacy policy, if you do not agree pls do not use our app or services"],
  },
  {
    id: 1,
    title: "2. Eligibility",
    text: ["-You must be at least 28 years ol to use the Nile App. By signing up, you confirm that you meet this requirement."],
  },
  {
    id: 2,
    title: "3. Account Responsibilities",
    text: [
      "-You are responsible for maintaining confidentiality pf your account credentials",
      "-You agree to notify Nile immediately of ant unauthorized use of your account",
      "-Nile is not liable to any losses or damage resulting from unauthorized",
    ],
  },

  {
    id: 3,
    title: "4. Use of the Service",
    text: [
      "-You agree to use the Nile app only for lawful purposes",
      "-Prohibited activities include, but are not limited to.",
      "-Misrepresenting your identity or providing false information.",
      "-Engaging in any fraudulent or malicious activities.",
      "-Violating any applicable laws or regulations.",
    ],
  },
  {
    id: 4,
    title: "5. Data Collection and Privacy ",
    text: [
      "Your personal information is collected and used in accordance with our Privacy Policy. By using the Nile app, you consent to the collection and use of your information as described in the policy.",
    ],
  },
  {
    id: 5,
    title: "7. Payment Terms",
    text: [
      "-If applicable, you agree to pay any fees associated with your use of the Nile app.",
      "-All payments are non-refundable unless otherwise stated.",
    ],
  },
  {
    id: 6,
    title: "8. Termination of Account",
    text: [
      "Nile reserves the right to suspend or terminate your account at its sole discretion, with or without notice, if you violate these terms.",
      "-You may terminate your account at any time by contacting our support team.",
    ],
  },
  {
    id: 7,
    title: "9. Limitation of Liability",
    text: [
      "-Nile is not liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the app.",
      "-Nile’s total liability to you for all claims arising from the app shall not exceed the amount you have paid to use the app, if any.",
    ],
  },
  {
    id: 8,
    title: "10. Modifications to Terms ",
    text: [
      "Nile reserves the right to modify these terms at any time. Changes will be effective upon posting. Your continued use of the app after changes are posted constitutes your acceptance of the modified terms.",
    ],
  },
  {
    id: 9,
    title: " 11. Governing Law ",
    text: [
      "These terms are governed by and construed in accordance with the laws of Nigeria. Any disputes will be resolved exclusively in the courts of Lagos, Nigeria.",
    ],
  },
];


//get future 5 days
export const getFutureDate =(dateString)=> {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 5); // Add 5 days

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  // Function to add ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) return `${day}th`;
    const lastDigit = day % 10;
    return `${day}${['st', 'nd', 'rd'][lastDigit - 1] || 'th'}`;
  };

  return `${getOrdinalSuffix(day)} of ${month} ${year}`;
}

console.log(getFutureDate("2025-03-03T15:35:23.931Z")); // Output: "8th of March"
