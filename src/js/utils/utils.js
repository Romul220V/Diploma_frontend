export const getDate = () => new Date().toISOString().slice(0, 10);

export const previousDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7);
    return currentDate.toISOString().slice(0, 10);
}
