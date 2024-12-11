import { format, parseISO } from 'date-fns';
import {toast} from 'sonner'
export const formatDate = (dateString) => {
    const formattedDate = format(parseISO(dateString), 'dd MMMM yyyy');
    return formattedDate
}

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