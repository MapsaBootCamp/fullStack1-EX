exports.getDateInFormat = (datetime, format) => {

    let year = datetime.getFullYear();
    let month = ("0" + (datetime.getMonth() + 1)).slice(-2);
    let day = ("0" + datetime.getDate()).slice(-2);
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let seconds = datetime.getSeconds();

    return format.replace("YYYY",year).replace("MM",month).replace("DD",day).replace("hh",hour).replace("mm",minute).replace("ss",seconds);

}