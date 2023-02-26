let total = 0;
let totalMRP = 0;

let items_in_cart = document.querySelector("#cart_items");
let flag = false;

let data = [
  {
    name: "Wrangler",
    description: "great quality",
    url: "https://5.imimg.com/data5/SELLER/Default/2022/2/TM/BC/ET/27399423/check-shirt-500x500.jpg",
    price: "5000",
  },
  {
    name: "Puma",
    description: "great quality",
    url: "https://m.media-amazon.com/images/I/41K8J6J3fUL._AC._SR360,460.jpg",
    price: "7800",
  },
  {
    name: "Nike",
    description: "great quality",
    url: "https://5.imimg.com/data5/SELLER/Default/2022/2/TM/BC/ET/27399423/check-shirt-500x500.jpg",
    price: "5000",
  },
  {
    name: "Bewakoof",
    description: "great quality",
    url: "https://m.media-amazon.com/images/I/41K8J6J3fUL._AC._SR360,460.jpg",
    price: "7800",
  },
];
let discount = 0;
let totalmrp = document.getElementById("itm_total");

let priceDiscount = document.getElementById("ttl_dsc1");

let subTotal = document.getElementById("ttl");

let totalSaving = document.getElementById("ttl_dsc");
//=================code for append========================================
let append = (data) => {
  discount = data.length * 99;
  data.forEach((el) => {
    let id = el._id;
    let n = 1;
    let div = document.createElement("div");
    div.setAttribute("id", "items");

    //================image in divleft=====================================
    let divleft = document.createElement("div");
    divleft.setAttribute("id", "photo_div");

    let img = document.createElement("img");
    img.setAttribute("id", "itemincart");
    img.src = el.url;

    divleft.append(img);
    //===================details in divright=================================
    let divright = document.createElement("div");
    divright.setAttribute("id", "details_div");
    //=====================brand in div1=====================================
    let div1 = document.createElement("div");
    div1.setAttribute("id", "name_div");

    let name = document.createElement("p");
    name.innerText = el.name;

    div1.append(name);
    //=================description in div2====================================
    let div2 = document.createElement("div");
    div2.setAttribute("id", "desc_div");

    let desc = document.createElement("p");
    desc.innerText = el.description;

    div2.append(desc);
    //=================mrp in div3============================================

    let div3 = document.createElement("div");
    div3.setAttribute("id", "mrp_div");

    let MRP = document.createElement("p");
    MRP.innerText = "MRP";

    let MRPprice = document.createElement("p");
    MRPprice.innerText = `Rs. ${+el.price + 99}.00/-`;
    totalMRP = totalMRP + (+el.price + 99);
    localStorage.setItem("totalcartvalue", JSON.stringify(totalMRP - discount));
    localStorage.setItem("totalmrp", JSON.stringify(totalMRP));
    localStorage.setItem("discount", JSON.stringify(discount));
    MRPprice.style.textDecoration = "line-through";

    div3.append(MRP, MRPprice);
    //================sell price in div4================================

    let div4 = document.createElement("div");
    div4.setAttribute("id", "sell_div");
    let Sell_price = document.createElement("p");
    Sell_price.innerText = "Sell Price";

    let price = document.createElement("p");
    price.innerText = `Rs. ${+el.price}.00/-`;
    total = total + +el.price;

    div4.append(Sell_price, price);

    //=================remove add in div5================================
    let div5 = document.createElement("div");
    div5.setAttribute("id", "addremove");

    let div5l = document.createElement("div");
    div5l.setAttribute("id", "remove");

    let remove = document.createElement("img");
    remove.src = "https://img.1mg.com/images/delete_icon.svg";
    remove.style.cursor = "pointer";
    div5l.append(remove);

    remove.addEventListener("click", () => {
      alert(`${el.name} will be removed from list`);
      del_cart_Data(id);
    });

    let div5r = document.createElement("div");
    div5r.setAttribute("id", "add");

    let div5r1 = document.createElement("div");
    let minus = document.createElement("img");
    minus.src =
      "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/512/external-glyph-shapes-tanah-basah-glyph-tanah-basah-32.png";
    minus.style.width = "15px";

    minus.style.cursor = "pointer";
    div5r1.append(minus);

    minus.addEventListener("click", () => {
      n--;

      if (flag == false) {
        price.innerText = `Rs. ${+el.price * n}.00/-`;
        MRPprice.innerText = `Rs. ${(+el.price + 99) * n}.00/-`;

        totalMRP = totalMRP - (+el.price + 99);
        localStorage.setItem(
          "totalcartvalue",
          JSON.stringify(totalMRP - discount)
        );
        localStorage.setItem("totalmrp", JSON.stringify(totalMRP));

        totalmrp.innerText = `Rs. ${totalMRP}/-`;
        discount = discount - 99;
        localStorage.setItem("discount", JSON.stringify(discount));
        priceDiscount.innerText = `- Rs. ${discount}/-`;
        subTotal.innerText = `Rs. ${totalMRP - discount}.00/-`;
        totalSaving.innerText = `Rs. ${discount}/-`;
      } else {
        price.innerText = `Rs. ${+el.price * n}.00/-`;
        MRPprice.innerText = `Rs. ${(+el.price + 99) * n}.00/-`;

        totalMRP = totalMRP - (+el.price + 99);
        localStorage.setItem(
          "totalcartvalue",
          JSON.stringify(totalMRP - discount)
        );
        localStorage.setItem("totalmrp", JSON.stringify(totalMRP));

        totalmrp.innerText = `Rs. ${totalMRP}/-`;
        discount = discount - 99;
        localStorage.setItem("discount", JSON.stringify(discount));
        priceDiscount.innerText = `- Rs. ${discount}/-`;
        subTotal.innerText = `Rs. ${totalMRP - discount - 200}.00/-`;
        totalSaving.innerText = `Rs. ${discount + 200}/-`;
      }
      if (n >= 1) {
        p2.innerText = n;
      } else if (n == 0) {
        alert(`${el.name} will be removed from list`);
        del_cart_Data(id);
      }
    });

    let div5r2 = document.createElement("div");
    let p2 = document.createElement("h3");
    p2.innerText = n;
    div5r2.append(p2);

    let div5r3 = document.createElement("div");
    let plus = document.createElement("img");
    plus.src = "https://img.icons8.com/tiny-glyph/512/plus-math.png";
    plus.style.width = "15px";
    plus.style.cursor = "pointer";
    div5r3.append(plus);

    plus.addEventListener("click", () => {
      n++;
      if (n <= 10) {
        p2.innerText = n;
      }
      if (n > 10) {
        n = 10;
        return alert(
          "Sorry, You Can't Add More Than 10 Products of Same Type!!!"
        );
      }
      if (flag == false) {
        price.innerText = `Rs. ${+el.price * n}.00/-`;

        MRPprice.innerText = `Rs. ${(+el.price + 99) * n}.00/-`;
        total = total + +el.price * n;
        totalMRP = totalMRP + (+el.price + 99);
        localStorage.setItem(
          "totalcartvalue",
          JSON.stringify(totalMRP - discount)
        );
        localStorage.setItem("totalmrp", JSON.stringify(totalMRP));

        discount = discount + 99;
        localStorage.setItem("discount", JSON.stringify(discount));
        totalmrp.innerText = `Rs. ${totalMRP}/-`;

        priceDiscount.innerText = `- Rs. ${discount}/-`;

        subTotal.innerText = `Rs. ${totalMRP - discount}.00/-`;

        totalSaving.innerText = `Rs. ${discount}/-`;
      } else {
        price.innerText = `Rs. ${+el.price * n}.00/-`;

        MRPprice.innerText = `Rs. ${(+el.price + 99) * n}.00/-`;
        total = total + +el.price * n;
        totalMRP = totalMRP + (+el.price + 99);
        localStorage.setItem(
          "totalcartvalue",
          JSON.stringify(totalMRP - discount)
        );
        localStorage.setItem("totalmrp", JSON.stringify(totalMRP));

        discount = discount + 99;
        localStorage.setItem("discount", JSON.stringify(discount));
        totalmrp.innerText = `Rs. ${totalMRP}/-`;

        priceDiscount.innerText = `- Rs. ${discount}/-`;

        subTotal.innerText = `Rs. ${totalMRP - discount - 200}.00/-`;

        totalSaving.innerText = `Rs. ${discount + 200}/-`;
        //===================================
      }
    });
    div5r.append(div5r1, div5r2, div5r3);
    div5.append(div5l, div5r);
    divright.append(div1, div2, div3, div4, div5);
    div.append(divleft, divright);
    items_in_cart.append(div);
  });
  totalmrp.innerText = `Rs. ${totalMRP}/-`;
  priceDiscount.innerText = `- Rs. ${discount}/-`;
  subTotal.innerText = `Rs. ${totalMRP - discount}.00/-`;
  totalSaving.innerText = `Rs. ${discount}/-`;
  //==============================================

  let redeem = document.getElementById("coupon");
  redeem.addEventListener("click", () => {
    if (flag == false) {
      if (totalMRP > 15000) {
        console.log("clicked");
        let val = prompt("Enter Promo Code");
        // console.log(val);
        if (val == "upstyle200") {
          flag = true;
          totalmrp.innerText = `Rs. ${totalMRP}/-`;
          priceDiscount.innerText = `- Rs. ${discount}/-`;
          subTotal.innerText = `Rs. ${totalMRP - discount - 200}.00/-`;
          localStorage.setItem(
            "totalcartvalue",
            JSON.stringify(totalMRP - discount - 200)
          );
          localStorage.setItem("totalmrp", JSON.stringify(totalMRP));
          localStorage.setItem("discount", JSON.stringify(discount + 200));

          totalSaving.innerText = `Rs. ${discount + 200}/-`;
        } else {
          alert("Please Enter Valid Coupan code");
        }
      } else {
        alert("Your Cart Value of Total Items Should Be More Than Rs. 15000/-");
      }
    } else {
      alert("\u{274C} You have already applied for coupon");
    }
  });
};
append(data);
//========================================

async function get_cart_data() {
  let res = await fetch(`https://excited-deer-headscarf.cyclic.app/cart/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  let data = await res.json();
  append(data);
}
get_cart_data();
//===============delete function================
async function del_cart_Data(id) {
  await fetch(`https://excited-deer-headscarf.cyclic.app/cart/remove/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  document.location.reload();
}
