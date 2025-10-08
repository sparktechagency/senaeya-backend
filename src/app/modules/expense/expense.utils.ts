export const convertToDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('-');
    // Create a Date object in the format YYYY-MM-DD
    return new Date(`${year}-${month}-${day}`);
};