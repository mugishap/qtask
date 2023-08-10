export const parseDate = (originalDateString: string) => {
    const transformedDate = new Date(originalDateString);
    transformedDate.setHours(0, 0, 0, 0);
    const isoString = transformedDate.toISOString();
    return isoString
}
export const parseDateString = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}