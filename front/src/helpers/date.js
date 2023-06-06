export const parseDataToBr = (date) => {
    const partesData = date.split("-")
    return partesData[2] + "/" + partesData[1] + "/" + partesData[0]
}

export const parseToISO = (date) => {
    const dates = date.split("/")
    const dateISO = dates[2] + "-" + dates[1].padStart(2, "0") + "-" + dates[0].padStart(2, "0")
    return dateISO
}