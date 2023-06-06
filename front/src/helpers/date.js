export const parseDataToBr = (date) => {
    const partesData = date.split("-")
    return partesData[2] + "/" + partesData[1] + "/" + partesData[0]
}

export const parseToISO = (date) => {
    const dates = date.split("/")
    const dateISO = dates[2] + "-" + dates[1].padStart(2, "0") + "-" + dates[0].padStart(2, "0")
    return dateISO
}

export const validateDate = (value) => {
    const dates = value.split('/');
    const day = parseInt(dates[0], 10);
    const month = parseInt(dates[1], 10) - 1;
    const year = parseInt(dates[2], 10);
    const date = new Date(year, month, day);

    const today = new Date();

    if (date > today) return false

    return (
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
    );
}