const randomNumber = () => {
  const randomNum = Math.floor(Math.random() * 10000000000);

  return String(randomNum).padStart(10, "0");
};

export default randomNumber;
