let preloader= document.getElementById("loading");

// let section_product=document.getElementById("product-view-section")

// section_product.addEventListener("load",loadFun)


const product_Id=localStorage.getItem("product-id")
function loadingFun(){
  preloader.style.display="none"
}
document.querySelector("#cl233").addEventListener("click",()=>{
    window.location.href="cart_page.html"
})
let token=localStorage.getItem("token");
document.getElementById("line1").innerText=localStorage.getItem("name")||"Welcome";
if(token){
    document.getElementById("sing").innerText="Logout"
}
if(token){
    document.getElementById("sing").addEventListener("click",async(e)=>{
        e.preventDefault();
      await   fetch("http:localhost:4500/users/logout",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":JSON.stringify(localStorage.get("token"))
            }
        }).then((res)=>res.json())
        .then((res)=>console.log(res))
    })
}
 





document.addEventListener("click",function (e){
    if(e.target.classList.contains("gallery-item")){
          const src = e.target.getAttribute("src");
          document.querySelector(".modal-img").src = src;
          const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
          myModal.show();
    }
  })

  function clickimg(smallImg) {
    let fullImg = document.getElementById("imagebox");
    fullImg.src = smallImg.src
}

// let size=""||localStorage.getItem("size");

  
//   console.log(size)

let baseurl = "https://powerful-erin-jewelry.cyclic.app"
let dataArr = []
async function productfetch() {
    let productId = "63c942c315630b618b393faa";
    // let productId = localStorage.getItem("product-id");
    // console.log(productId)
    try {
        let res = await fetch(`${baseurl}/products?id=${product_Id}`);
        if (res.ok) {
            let dataPro = await res.json();
            console.log(dataPro)
            // dataArr = [...dataPro]
            productFun(dataPro)

        }
    } catch (error) {
        console.log(error)
    }
}
productfetch();

let container = document.querySelector("#product-view-div")


function productFun(dataPro) {
  container.innerHTML=""
  let data = dataPro[0];
  console.log(data)
  let productData =
    `<div class="product-view-img-div">
    <div class="product-view-img"><img class="gallery-item" src="${data["img-1"]}" alt=""></div>
    <div class="product-view-img"><img class="gallery-item" src="${data["img-2"]}" alt=""></div>
     <div class="product-view-img"><img class="gallery-item" src="${data["img-3"]}" alt=""></div>
     <div class="product-view-img"><img class="gallery-item" src="${data["img-4"]}" alt=""></div>
 </div>
 
 <div class="wraper">
     <div class="product-box"> 
         <div class="all-images">

             <div class="small-images">
                 <img src="${data["img-1"]}"
                     onclick="clickimg(this)">
                 <img src="${data["img-2"]}"
                     onclick="clickimg(this)">
                 <img src="${data["img-3"]}"
                     onclick="clickimg(this)">
                 <img src="${data["img-4"]}"
                     onclick="clickimg(this)">
             </div>
             <div class="main-images">
                 <img src="${data["img-1"]}"
                     id="imagebox">

             </div>
         </div>

     </div>
 </div>    

 <div class="product-view-details-div">
     <h1 class="product-view-heading">Jockey</h1>
     <h3 class="product-view-category-heading">Men White Super Combed Cotton T-shirt</h3>

     <div class="product-view-rating-div">

             <p class="product-view-star" >4 <span><i class="fa-solid fa-star"></i></span></p>
             <hr>
         <p class="product-view-total-rating">15k reviews</p>
     </div>

     <div class="product-view-price-div">
         <h1 class="product-view-price">₹749</h1>
         <h3 class="product-view-real-price">MRP <strike> ₹1099</strike></h3>
     </div>
     <p class="product-view-tax-p">inclusive of all taxes</p>

     <div class="product-view-size-chart">
         <div class="product-view-size-heading">
             <p>SELECT SIZE</p>
             <p>SIZE CHART <span><i class="fa-solid fa-arrow-up-right-from-square"></i></span></p>
         </div>
         <div class="size-options">
             <button id="S" class="sizeBtn" onclick='sizeFun(this)'>S</button>
             <button id="M" class="sizeBtn" onclick='sizeFun(this)'>M</button>
             <button id="L" class="sizeBtn" onclick='sizeFun(this)'>L</button>
             <button id="XL" class="sizeBtn" onclick='sizeFun(this)' >XL</button>
         </div>
     </div>
     <div class="product-view-btn-div">
         <button id="add-to-cart-btn" onclick="addToCart()"><i class="fa-solid fa-bag-shopping"></i> ADD TO BAG</button>
         <button id="go-to-cart-btn"><a href="./cart_page.html" target="_blank">GO TO BAG <i class="fa-solid fa-arrow-right-long"></i></a></button>
         <button id="wishlist-btn"> <i class="fa-regular fa-heart"></i> WISHLIST</button>
     </div>
     <div class="product-view-delivery-div">
         <p class="delivery-details-heading">DELIVERY DETAILS</p>
         <div class="product-view-delivery-flex-div">
             <div><img src="./Payment-Img/fast-delivery.png" alt=""> <p>Get it by Wed, Feb 22</p></div>
             <div><img src="./Payment-Img/cash-on-delivery.png" alt=""> <p>Pay on delivery available</p></div>
             <div><img src="./Payment-Img/easy-return.png" alt=""> <p>Easy 30 days return & exchange available</p></div>
         </div>
     </div>

     <p class="ori">100% Original Products</p>

     <div class="product-view-offer-div">
         <h4>BEST OFFERS <span><i class="fa-solid fa-tag"></i></span></h4>
         <p class="best-price-p" >Best Price: <span class="best-price">Rs. 562</span></p>
         <ul>
             <li>Applicable on: Orders above Rs. 799 (only on first purchase)</li>
             <li>Coupon code: MYNTRA200</li>
             <li>Coupon Discount: Rs. 187 off (check cart for final savings)</li>
             <p>View Eligible Products</p>
             <h4>EMI option available</h4>
             <li>EMI starting from Rs.35/month</li>
             <p>View Plan</p>
         </ul>
     </div>

     <div class="product-view-more-details-div">
         <h3>PRODUCT DETAILS</h3>
         <p>Green T-shirt for men</p>
         <p>Solid</p>
         <p>Regular length</p>
         <p>Polo collar</p>
         <p>Short, regular sleeves</p>
         <p>Knitted cotton fabric</p>
         <p>Button closure</p>
         <h3>Size & Fit</h3>
         <p>Regular Fit</p>
         <p>The model (height 6') is wearing a size M</p>
         <h3>Material & Care</h3>
         <p>60% Cotton, 40% Polyester</p>
         <p>Machine Wash</p>
     </div>
 </div>
 <div class="modal fade" id="gallery-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered modal-lg">
       <div class="modal-content">
         <div class="modal-header">
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
            <img src="${data["img-1"]}" class="modal-img" alt="modal img">
         </div>
       </div>
     </div>
   </div>`;

  container.innerHTML = productData;
}

function sizeFun(el){

    let buttons = document.querySelectorAll('.sizeBtn');
    let value;
    buttons.forEach(b => {
      if (b === el) {
              value=b.textContent;
              b.style.border = '#ff446d';
              b.style.color = '#ff446d';
            } else {
              
              b.style.border= '';
              b.style.color = '';
            }
          });
          size_selected(value)
          
        }
        
      function  size_selected(value){
        console.log(value)
      };

//       const button = document.querySelector(".addtocart");
// const add=document.querySelector(".pretext")
// const done = document.querySelector(".done");
// console.log(button);
// let added = false;
// button.addEventListener('click',()=>{
//   if(added){
//     // done.style.transform = "translate(-110%) skew(-40deg)";
//     add.innerText="Add To"
//     added = false;
//   }
//   else{
//     // done.style.transform = "translate(0px)";
//     add.innerText="Added"
//     added = true;
//   }
    
// });

async function addToCart(){
    // try {

    //     let res = await fetch(`${baseurl}/cart/add/${product_Id}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: localStorage.getItem("token"),
    //         },
    //         // body: JSON.stringify(obj)
    //     })
    //     if (res.message=="Product added to cart") {
    //         alert("Added To cart");
            // container.innerHTML=""
            let add_to_bag=document.getElementById("add-to-cart-btn")
            let go_to_bag=document.getElementById("go-to-cart-btn");
            add_to_bag.style.display="none"
            go_to_bag.style.display="block"
            // window.location.reload()
    //     }

    // }
    // catch (error) {
    //     console.log(error)
    // }
}


async function fetchProducts(){
    try {
            let res= await fetch(`${baseurl}/products`);
            if(res.ok){
                let data=await res.json();
                dataFuntion(data)
                console.log(data)
            }
        
    } catch (error) {
        console.log(error)
        // alert("Fetching problem")
    }
    }
    fetchProducts()




let dataContainer=document.getElementById("similar-products-div")
function dataFuntion(data){
    dataContainer.innerHTML="";

   let allData= data.map((item)=>{
        
        return`<div class="similar-products" data-id=${item._id}>
        <div class="similar-products-img-div">
            <img src="${item["img-1"]}" data-id=${item._id} alt="">
            <div class="similar-products-rating-div">
                <p class="similar-products-star" >4 <span><i class="fa-solid fa-star"></i></span></p>
                <hr>
            <p class="similar-products-rating">15k reviews</p>
            </div>
            <div class="similar-products-details-div" data-id=${item._id}>
                <h3 data-id=${item._id}>Roadster</h3>
                <p data-id=${item._id}>${item.title}</p>
                <div class="similar-products-price-div" data-id=${item._id}>
                    <h3 data-id=${item._id}>Rs.365</h3>
                    <strike data-id=${item._id}>Rs. 599</strike>
                    <p data-id=${item._id}>(39% OFF)</p>
                </div>
            </div>
        </div>
        </div>`
    }).slice(0, 10);
    dataContainer.innerHTML=allData.join(" ")
    let img_click = document.querySelectorAll(".similar-products");
      for(let btn of img_click){
          btn.addEventListener("click",(event)=>{ 
			let data_id = event.target.dataset.id;

            localStorage.setItem("product-id",data_id)
            window.open('product-view.html', "_blank")
			// DeleteBtn(data_id);
		});
      }
   
}

/* <div class="similar-products" data-id=${item._id}>
        <div class="similar-products-img-div">
            <img src="${item["img-1"]}" data-id=${item._id} alt="">
        <div class="similar-products-rating-div">
            <p class="similar-products-star" >4 <span><i class="fa-solid fa-star"></i></span></p>
            <hr>
        <p class="similar-products-rating">15k reviews</p>
        </div>
    <div class="similar-products-details-div">
        <h3>Roadster</h3>
        <p>${item.title}</p>
        <div class="similar-products-price-div">
            <h3>Rs.365</h3>
            <strike>Rs. 599</strike>
            <p>(39% OFF)</p>
        </div>
    </div>
</div>
</div> */

                console.log(product_Id)

               
document.getElementById("line1").innerText=localStorage.getItem("name")||"Welcome";
if(token){
    document.querySelector(".login").style.display="none"
    if(token){
        document.querySelector(".logout").addEventListener("click",async(e)=>{
            e.preventDefault();
         let res= await   fetch("http://localhost:4500/users/logout",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":localStorage.getItem("token")
                }
            })
        let data = await res.json();
        if(data.message=="Logout Sucessfull"){
                alert("log out succussfully");
                localStorage.clear();
                
        }
        })
    }
}else{
    document.querySelector(".login").style.display="block";
    document.querySelector(".logout").style.display="none";
}
 