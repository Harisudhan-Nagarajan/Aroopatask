const inventorylist = [];

const add = (product) => {
  //adding the product to the inventorylist
  inventorylist.push(product);
};

const remove = (product) => {
  //removing the product from the inventorylist
  inventorylist.splice(inventorylist.indexOf(product), 1);
};

const getlist = () => {
  //getting the inventorylist
  console.log(inventorylist.join(","));
};

add("Coffee");
add("Tea");
add("Milk");
getlist();
remove("Milk");
getlist();
