let date = new Date();
date = date.toString()
date = date.split(" ").splice(1,3)

let months = {
  "Jan": "01",
  "Feb": "02",
  "Mar": "03",
  "Apr": "04",
  "May": "05",
  "Jun": "06",
  "Jul": "07",
  "Aug": "08",
  "Sep": "09",
  "Oct": "10",
  "Nov": "11",
  "Dec": "12",  
}
date[0] = months[date[0]];
date = date.reverse().join('-');

console.log(date);

