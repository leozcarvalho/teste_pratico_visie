export const parseDataToBr = (date) => {
    const partesData = date.split("-");
    return partesData[2] + "/" + partesData[1] + "/" + partesData[0]
}