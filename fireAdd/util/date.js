export function getFormattedDate(date){
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}  /  ${date.getHours()}:${date.getMinutes()}`;
}



export function getDateMinusDays(date,days){
    return new Date(date.getFullYear(),date.getMonth(),date.getDate()- days);
}