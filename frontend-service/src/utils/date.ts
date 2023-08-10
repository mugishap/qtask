export const parseDate = (originalDateString: string) => {
    const transformedDate = new Date(originalDateString);
    transformedDate.setHours(0, 0, 0, 0);
    const isoString = transformedDate.toISOString();
    return isoString
}