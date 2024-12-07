export const getDate = (unix) => {
    const date = new Date(unix * 1000);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return minutes <= 9 ? hour + ":" + "0" + minutes : hour + ":" + minutes;
};
