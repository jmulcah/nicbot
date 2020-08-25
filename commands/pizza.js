module.exports = function pizza() {
  toppingsArr = [
    "Pepperoni",
    "Mushrooms",
    "Onions",
    "Sausage",
    "Bacon",
    "Olives",
    "Peppers",
    "Extra cheese",
    "Spinach",
    "Tomato"
  ];
  const pizza = `Right now, I'm feeling like ${
    toppingsArr[Math.round(Math.random() * 10)]
  } and ${toppingsArr[Math.round(Math.random() * 10)]}.`;
  return pizza;
};
