let totalitem = document.querySelector("#pricedetail span");

//if cart length is 1 then inserts item otherwise items
totalitem.innerHTML = `${2} Items`;

let addbtn = document.getElementById("addbutton");
addbtn.addEventListener("click", () => {
  let user_address = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    pin: document.getElementById("pin").value,
    house: document.getElementById("house").value,
    locality: document.getElementById("local").value,
    city: document.getElementById("incity").value,
    state: document.getElementById("instate").value,
  };
  console.log(user_address);
});
