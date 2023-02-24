let baseurl="http://localhost:4500";
let producturl=`${baseurl}/products/`

const cartadd=`${baseurl}/cart/add`
const token=localStorage.getItem("token");

let preloader= document.getElementById("loading");
function loadingFun(){
  preloader.style.display="none"
}


// let size=""
// function sortFilter() {
//     let select = document.getElementById('filter');
//     let option = select.options[select.selectedIndex];
//    let sortValue = option.value;
//     if(sortValue==="acd"){
//         priceFetch(sortValue)
//     }else if(sortValue==="dcd"){
//         priceFetch(sortValue)
//     }else if(sortValue==="top"){
//         ratingFetch(sortValue)
//     }
//     console.log(sortValue)
// }



 function searchProduct() {
        let value = document.getElementById("input").value;
        let key="title"
        fetchProducts(key,value)
}



function sizeRange(checkbox) {
    let key;
    var checkboxes = document.getElementsByName('size-range')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })

    let size_range=document.querySelector('input[name="size-range"]:checked').value;
    // console.log(size_range);
    // query=""
    value=size_range
    key="category"
    console.log(value)
    fetchProducts(key,value)
}
function brandRange(checkbox) {
    
    var checkboxes = document.getElementsByName('brand-range')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })

    let size_range=document.querySelector('input[name="brand-range"]:checked').value;
    value=size_range
    key="brand"
    console.log(value)
    fetchProducts(key,value)
    // sizeFetchProducts(value)
}

function priceRange(checkbox) {
    
    var checkboxes = document.getElementsByName('price-range')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })

    let size_range=document.querySelector('input[name="price-range"]:checked').value;
    value=size_range
    key="price"
    console.log(value)
    fetchProducts(key,value)
    // sizeFetchProducts(value)
}
function colorRange(checkbox) {
    
    var checkboxes = document.getElementsByName('color-range')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })

    let size_range=document.querySelector('input[name="color-range"]:checked').value;
    value=size_range
    key="color"
    console.log(value)
    fetchProducts(key,value)
    // sizeFetchProducts(value)
}
// function sizeRange(){
//     let size_range=document.querySelector('input[name="size-range"]:checked').value;
//     console.log(size_range)
// }

// let divbtn=document.querySelector(".shop-items-child-div");
// divbtn.addEventListener("click",aclick)


// function cartAdd(){
//     console.log("Added to cart")
// }
let querry;
let value;

function discountRange(){
    let priceVal=document.querySelector('input[name="discount-range"]:checked').value;
   let priceData=+(priceVal);
   value=+(priceVal)
    key="discount"
    console.log(value)
    fetchProducts(key,value)
    console.log(priceData);
    // priceFetch(priceData)
}




// async function ratingFetch(sortValue){
// try {
//         let res= await fetch(`${baseurl}/products/rating?rating=${sortValue}`);
//         if(res.ok){
//             let data=await res.json();
//             dataFuntion(data)
//             // console.log(data)
//         }
    
// } catch (error) {
//     console.log(error)
//     // alert("Fetching problem")
// }
// }
// async function priceFetch(priceData){
// try {
//         let res= await fetch(`${baseurl}/products/price?price=${priceData}`);
//         if(res.ok){
//             let data=await res.json();
//             dataFuntion(data)
//             // console.log(data)
//         }
    
// } catch (error) {
//     console.log(error)
//     // alert("Fetching problem")
// }
// }
// async function sizeFetchProducts(value){
// try {
//         let res= await fetch(`${baseurl}/products?sizerange=${value}`);
//         if(res.ok){
//             let data=await res.json();
//             dataFuntion(data)
//         }
    
// } catch (error) {
//     console.log(error)
// }
// }
async function fetchProducts(key,value){
try {
        // let res= await fetch(`${producturl}/search?${key||"gender"}=${value||"male"}`);
        let res= await fetch(`${producturl}/search?gender=male&${key}=${value}`)
        if(res.ok){
            let data=await res.json();
            dataFuntion(data)
            console.log(data)
        }
    
} catch (error) {
    console.log(error)
}
}
fetchProducts()

let dataContainer=document.getElementById("wrapper")
function dataFuntion(data){
    dataContainer.innerHTML="";
   let allData= data.map((item)=>{
        
        return`<figure class="shop-items-child-div">
        <div class="hover-animation" data-id=${item._id} >
            <img class="img-back" src="${item.image_1}" alt="">
            <img class="img-front" data-id=${item._id} src="${item.image_2}" alt="">
            <div class="product-view-rating-div">
                        <p class="product-view-star" >${Math.floor(Math.random() * 5) + 1}<span><i class="fa-solid fa-star"></i></span></p>
                        <hr>
                    <p class="product-view-total-rating">${Math.floor(Math.random() * 5) + 1}k</p>
                </div>
            <div class="btn-add" >
                <button id="wishlist-btn" class="wishlist-btn" data-id=${item._id}> <i class="fa-regular fa-heart"></i> <span class="change-wishlist"> WISHLIST</button>
            </div>
            </div>
            <figcaption>
            <p>${item.description}</p>
            <div class="similar-products-price-div">
            <h5>Rs.${item.price}</h5>
            <strike>Rs. ${item.price+500}</strike>
            <p>(${item.discount}% OFF)</p>
        </div>
        </figcaption>
    </figure>`
    })
    dataContainer.innerHTML=allData.join(" ")
    let img_click = document.querySelectorAll("img");
      for(let btn of img_click){
          btn.addEventListener("click",(event)=>{ 
			let data_id = event.target.dataset.id;

            localStorage.setItem("product-id",data_id)
            window.open('product-view.html', "_blank")
			// DeleteBtn(data_id);
		});
      }
    let details_click = document.querySelectorAll("figcaption");
      for(let btn of details_click){
          btn.addEventListener("click",(event)=>{ 
			let data_id = event.target.dataset.id;

            localStorage.setItem("product-id",data_id)
            window.open('product-view.html', "_blank")

			// DeleteBtn(data_id);
		});
      }
    let wishlist_btn = document.querySelectorAll(".wishlist-btn");

    let added = false;
      for(let btn of wishlist_btn){

          btn.addEventListener("click",async (event)=>{ 
			let data_id = event.target.dataset.id;

            if(added){
                // event.target.innerText=""
                // async function addToCart(){
                    try {
                
                        let res = await fetch(`${cartadd}/${data_id}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization:token ,
                            },
                            // body: JSON.stringify(obj)
                        })
                        let msg=await res.json()
                        // console.log(await res.json())
                
                        if (msg.message=="Product added to cart") {
                            event.target.querySelector("span").innerHTML="WISHLISTED";
                            event.target.querySelector("span").style.color="#fff";
                            event.target.querySelector("i").style.color="#ff446d"
                            event.target.style.backgroundColor="#535766"
                            added = false;
                            alert("Added To cart");
                            // window.location.reload()
                            // return
                            // container.innerHTML=""
                        }
                        if(msg.message=="Access Denied"){
                            return alert("Please log in or create an account to add this item to your bag.")
                        }
                        if(msg.message=="Product already in cart"){
                            // container.innerHTML=""
                            // let add_to_bag=document.getElementById("add-to-cart-btn")
                            // let go_to_bag=document.getElementById("go-to-cart-btn");
                            // add_to_bag.style.display="none"
                            // go_to_bag.style.display="block"
                            return alert("Product already in your bag")
                        }
                
                    }
                    catch (error) {
                        console.log(error)
                    }
                // }


                // event.target.querySelector("span").innerHTML="WISHLISTED";
                // event.target.querySelector("span").style.color="#fff";
                // event.target.querySelector("i").style.color="#ff446d"
                // event.target.style.backgroundColor="#535766"
                //     added = false;
                }
                else{
                   
                    console.log(event)
                    console.log(data_id)
                    event.target.querySelector("span").innerHTML="WISHLIST"
                    event.target.style.backgroundColor="#fff";
                    event.target.querySelector("span").style.color="black";
                    added = true;
                  }
		});
      }
}

// function cartAdd(){
//     console.log("hello")
// }
document.querySelector("#cl233").addEventListener("click",()=>{
    window.location.href="cart_page.html"
})
// let token=localStorage.getItem("token");
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
 