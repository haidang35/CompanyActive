
export const convertDateTime = (datetime) => {
    let newDate = new Date(datetime);
    const dd = String(newDate.getDate()).padStart(2, "0") ;
    const mm = String(newDate.getMonth() + 1).padStart(2, "0");
    const YY = newDate.getFullYear();
    const min = String(newDate.getMinutes()).padStart(2, "0");
    const hour = String(newDate.getHours()).padStart(2, "0");
    const sec = String(newDate.getSeconds()).padStart(2, "0");
    const dateTimeConverted = hour + ":" + min + ":" + sec + " " + dd + "/" + mm + "/" + YY;
    return dateTimeConverted;
}