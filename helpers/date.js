

export function date(){
    const timestamp =new Date().getTime(); // Obtener el valor de tiempo en milisegundos
    const date = new Date(timestamp);
    const year = date.getFullYear(); // Obtener el año (por ejemplo, 2023)
    const month = date.getMonth() + 1; // Obtener el mes (ten en cuenta que los meses son indexados desde 0, por lo que se agrega 1)
    const day = date.getDate(); // Obtener el día
    const hours = date.getHours(); // Obtener las horas
    const minutes = date.getMinutes(); // Obtener los minutos
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate
}

export default date;