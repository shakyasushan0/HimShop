const logger = (req, res, next) => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}T${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  console.log(date, req.method, req.url);

  next();
};

export default logger;
