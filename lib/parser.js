// return year, month, day, hours
parse = (requestTime) => {
  const year = requestTime.slice(0, 4);
  const month = requestTime.slice(4, 6);
  const day = requestTime.slice(6, 8);
  const hour = requestTime.slice(8, 10);

  const date = `${year}-${month}-${day}`;
  const time = `${hour}:00`

  return { date: date, time: time };
}

const Parser = {
  parse
};

module.exports = Parser;
