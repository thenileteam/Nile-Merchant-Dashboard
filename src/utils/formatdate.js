import { format, parseISO } from 'date-fns';
export const formatDate = (dateString) => {
    const formattedDate = format(parseISO(dateString), 'dd MMMM yyyy');
    return formattedDate
}