let baseurl="https://excited-deer-headscarf.cyclic.app";
let producturl=`${baseurl}/products/`

const cartadd=`${baseurl}/cart/add`
const token=localStorage.getItem("token");

let preloader= document.getElementById("loading");
function loadingFun(){
  preloader.style.display="none"
}
let dataArr=[]
async function fetchProducts(key,value){
    try {
            // let res= await fetch(`${producturl}/search?${key||"gender"}=${value||"male"}`);
            let res= await fetch(`${producturl}/search?gender=male&${key}=${value}`)
            if(res.ok){
                let data=await res.json();
                dataArr=[...data]
                dataFuntion(data)
                // console.log(data)
            }
        
    } catch (error) {
        console.log(error)
    }
    }
    fetchProducts()





// let search=document.getElementById("input");

// search.addEventListener("keypress",(e)=>{
//     if(e.key=="Enter"){
//         let value=document.getElementById("input").value;
//      console.log(value)   
//     }
// })

// let size=""
function sortFilter() {
    let select = document.getElementById('filter');
    let option = select.options[select.selectedIndex];
   let sortValue = option.value;
    if(sortValue==="HighToLow"){
        dataArr.sort((a,b)=>b.price-a.price)
        dataFuntion(dataArr)
    }else if(sortValue==="LowToHigh"){
        dataArr.sort((a,b)=>a.price-b.price)
        dataFuntion(dataArr)
    }
    console.log(sortValue)
}



//  function searchProduct() {
//         let value = document.getElementById("input").value;
//         let key="title"
//         fetchProducts(key,value)
// }



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
    if(size_range==3850){
        console.log("hello")
        let data=dataArr.filter(item=>item.price > 199 && item.price <= 3850)
        dataFuntion(data)
        console.log(data)
    }
    else if(size_range==7501){
        let data=dataArr.filter(item=>item.price > 3850 && item.price <= 7501)
        dataFuntion(data)
    }
    else if(size_range==11152){
        let data=dataArr.filter(item=>item.price > 7501 && item.price <= 11152)
        dataFuntion(data)
    }
    else if(size_range==14803){
        let data=dataArr.filter(item=>item.price > 11152 && item.price <= 14803)
        dataFuntion(data)
    }
    // fetchProducts(key,value)
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

}

// function cartAdd(){
//     console.log("hello")
// }
// document.querySelector("#cl233").addEventListener("click",()=>{
//     window.location.href="cart_page.html"
// })
// let token=localStorage.getItem("token");
// document.getElementById("line1").innerText=localStorage.getItem("name")||"Welcome";
// if(token){
//     document.querySelector(".login").style.display="none"
//     if(token){
//         document.querySelector(".logout").addEventListener("click",async(e)=>{
//             e.preventDefault();
//          let res= await   fetch("http://localhost:4500/users/logout",{
//                 method:"POST",
//                 headers:{
//                     "Content-Type":"application/json",
//                     "authorization":localStorage.getItem("token")
//                 }
//             })
//         let data = await res.json();
//         if(data.message=="Logout Sucessfull"){
//                 alert("log out succussfully");
//                 localStorage.clear();
                
//         }
//         })
//     }
// }else{
//     document.querySelector(".login").style.display="block";
//     document.querySelector(".logout").style.display="none";
// }
 