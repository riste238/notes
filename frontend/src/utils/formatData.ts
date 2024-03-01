export function formatDate(dateString: string): string {
    
//toLocaleString = Converts a date and time to a string by using the current or specified locale.
    return new Date(dateString).toLocaleString('en-US', {
        year: "numeric", // what is numeris and what's shorT?
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    })
}