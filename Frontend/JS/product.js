let baseurl="https://powerful-erin-jewelry.cyclic.app"

let preloader= document.getElementById("loading");

// let section_product=document.getElementById("product-view-section")

// section_product.addEventListener("load",loadFun)

function loadingFun(){
  preloader.style.display="none"
}
// let size=""
function sortFilter() {
    let select = document.getElementById('filter');
    let option = select.options[select.selectedIndex];
   let sortValue = option.value;
    if(sortValue==="acd"){
        priceFetch(sortValue)
    }else if(sortValue==="dcd"){
        priceFetch(sortValue)
    }else if(sortValue==="top"){
        ratingFetch(sortValue)
    }
    console.log(sortValue)
}


async function searchProduct() {
    try {
        let searchItem = document.getElementById("search").value;
        let allData_res = await fetch(`${baseurl}/products/search?title=${searchItem}`)
        if (allData_res.ok) {
            let data = await allData_res.json();;
            // cartItme=[...data]
            dataFuntion(data);
            // total()
        }
    } catch (error) {
        console.log(error)
    }
}



function sizeRange(checkbox) {
    
    var checkboxes = document.getElementsByName('size-range')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })

    let size_range=document.querySelector('input[name="size-range"]:checked').value;
    // console.log(size_range);
    // query=""
    value=size_range||"tall"
    console.log(value)
    sizeFetchProducts(value)
}
function brandRange(checkbox) {
    
    var checkboxes = document.getElementsByName('brand-range')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })

    let size_range=document.querySelector('input[name="brand-range"]:checked').value;
    // console.log(size_range);
    // query=""
    value=size_range||"Roadster"
    console.log(value)
    // sizeFetchProducts(value)
}
function priceRange(checkbox) {
    
    var checkboxes = document.getElementsByName('price-range')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })

    let size_range=document.querySelector('input[name="price-range"]:checked').value;
    value=size_range||14803
    console.log(value)
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

// function price(){
//     let priceVal=document.querySelector('input[name="price"]:checked').value;
//    let priceData=+(priceVal)||500;
//     console.log(typeof(priceData),priceData);
//     priceFetch(priceData)
// }




async function ratingFetch(sortValue){
try {
        let res= await fetch(`${baseurl}/products/rating?rating=${sortValue}`);
        if(res.ok){
            let data=await res.json();
            dataFuntion(data)
            // console.log(data)
        }
    
} catch (error) {
    console.log(error)
    // alert("Fetching problem")
}
}
async function priceFetch(priceData){
try {
        let res= await fetch(`${baseurl}/products/price?price=${priceData}`);
        if(res.ok){
            let data=await res.json();
            dataFuntion(data)
            // console.log(data)
        }
    
} catch (error) {
    console.log(error)
    // alert("Fetching problem")
}
}
async function sizeFetchProducts(value){
try {
        let res= await fetch(`${baseurl}/products?sizerange=${value}`);
        if(res.ok){
            let data=await res.json();
            dataFuntion(data)
            // console.log(data)
        }
    
} catch (error) {
    console.log(error)
    // alert("Fetching problem")
}
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

let dataContainer=document.getElementById("wrapper")
function dataFuntion(data){
    dataContainer.innerHTML="";
   let allData= data.map((item)=>{
        
        return`<figure class="shop-items-child-div"  >
        <div class="hover-animation" data-id=${item._id} >
            <img class="img-back" src="${item["img-1"]}" alt="">
            <img class="img-front" data-id=${item._id} src="${item["img-2"]}" alt="">
            <div class="product-view-rating-div">
                        <p class="product-view-star" >4 <span><i class="fa-solid fa-star"></i></span></p>
                        <hr>
                    <p class="product-view-total-rating">15k</p>
                </div>
            <div class="btn-add" >
                <button id="wishlist-btn" onclick="cartAdd()"> <i class="fa-regular fa-heart"></i> WISHLIST</button>

            </div>
            </div>
            <figcaption>
            <p>${item.title}</p>
            <div class="similar-products-price-div">
            <h5>Rs.365</h5>
            <strike>Rs. 599</strike>
            <p>(39% OFF)</p>
        </div>
        </figcaption>
    </figure>`
    })
    dataContainer.innerHTML=allData.join(" ")
    let click = document.querySelectorAll(".shop-items-child-div");
      for(let btn of click){
        // console.log(btn)
          btn.addEventListener("click",(event)=>{ 
			let data_id = event.target.dataset.id;
			// console.log(data_id,typeof data_id);
            // console.log(data_id)
            localStorage.setItem("product-id",data_id)
            window.location.href="product.html"
			// DeleteBtn(data_id);
		});
      }
}

function cartAdd(){
    console.log("hello")
}