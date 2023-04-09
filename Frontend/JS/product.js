

let preloader= document.getElementById("loading");
function loadingFun(){
  preloader.style.display="none"
}
document.addEventListener('DOMContentLoaded', () => {
    
    // const Big_screen_sreachbar=document.getElementById("search_bar");
    // const small_screen_sreachbar=document.querySelector(".input-box");

    // -----------------------big display search bar---------------------------------- 
    const search=document.getElementById("input");
    const search_bar=document.getElementById("search-bar");

    // -----------------------small display search bar---------------------------------- 
    const mobile_search=document.querySelector(".search");

    // -------------------search by enter key press----------------------------
    search.addEventListener("keypress",(e)=>{
        if(e.key=="Enter"){
            let value=document.getElementById("input").value;
            let key="types"
            // let 
            fetchProducts(key,value)
         console.log(value)   
        }
    })
    // -------------------search by clicking on search bar----------------------------

    search_bar.addEventListener("click",(e)=>{
        // if(e.key=="Enter"){
            let value=document.getElementById("input").value;
            // let key="description"
            // fetchProducts(key,value)
         console.log(value)   
        // }
    })
    mobile_search.addEventListener("click",(e)=>{
        // if(e.key=="Enter"){
            let value=document.getElementById("mobile-input").value;
            // let key="description"
            // fetchProducts(key,value)
         console.log(value)   
        // }
    })
    // Big_screen_sreachbar.style.display="none"
    // small_screen_sreachbar.style.display="none"
})


// Super Combed Cotton

//  ***********************    Deployed Url *************************

let baseurl="http://localhost:4500";
let producturl=`${baseurl}/products/`

const cartadd=`${baseurl}/cart/add`
// const token=localStorage.getItem("token");
// *********************gender key**************************** 
let gender=localStorage.getItem("gender")
// ************************ category key ************************ 
let category=localStorage.getItem("category")


let dataArr=[]

// ---------------------------products fetch Function -------------------------------------------------------- 

async function fetchProducts(key,value){
    try {
        let res;
            if(key && value){
                // res= await fetch(`https://excited-deer-headscarf.cyclic.app/products/search?gender=${gender}&category=${category}&${key}=${value}`);
                res= await fetch(`${baseurl}/products/search?gender=${gender}&category=${category}&${key}=${value}`);

            }
            else{
                res= await fetch(`${baseurl}/products/search?gender=${gender}&category=${category}`);

            }
         
            if(res.ok){
                let data=await res.json();
                console.log(data)
                dataArr=[...data]
                dataFuntion(data)
            }
        
    } catch (error) {
        console.log(error)
    }
    }
fetchProducts()

// ---------------------------products Filters fetch Function -------------------------------------------------------- 

async function fetchProductFilters(){
    let filterRes= await fetch(`${producturl}/filters?product=${category}`);
    let filterData= await  filterRes.json()
    console.log(filterData)
    FilterDataFun(filterData)
}
fetchProductFilters()


// -------------------------------------sorting function--------------------------------------------------------- 
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





let categories_div= document.getElementById("categories-div")
let brands_div= document.getElementById("brands-div")
function FilterDataFun(filterData){
    categories_div.innerHTML="";
    brands_div.innerHTML="";
console.log(filterData.categories)
    let categoriesData= filterData.categories.map((item)=>{
        return `<div>
        <input value="${item}" type="checkbox" class="size-checkbox" name="filter"
            onclick="categories(this)"><label for="">${item}</label>
    </div>
    `
    })
    let brandssData= filterData.brands.map((item)=>{
        return `<div>
        <input value="${item}" type="checkbox" class="size-checkbox" name="filter"
            onclick="brandRange(this)"><label for="">${item}</label>
    </div>
    `
    })

    categories_div.innerHTML=categoriesData.join(" ")
    brands_div.innerHTML=brandssData.join(" ")
}
// -------------------------------------------------categories filter function-------------------------------------------------------------- 

function categories(checkbox) {
    var checkboxes = document.getElementsByName('filter');
    checkboxes.forEach((item) => {
        if (item !== checkbox) {
            item.checked = false;
        }
    });
  
    let box = true;
    if (checkbox.checked) {
        let size_range=document.querySelector('input[name="filter"]:checked').value;
        value=size_range
        key="brand"
        fetchProducts(key,value);
        box = false; 
    } else {
        console.log(false);
        fetchProducts();
    }
 
    
}
// -------------------------------------------------brand filter function-------------------------------------------------------------- 

function brandRange(checkbox) {
    
    var checkboxes = document.getElementsByName('filter')
    checkboxes.forEach((item) => {
     if (item !== checkbox) {
         item.checked = false;
     }
    });
   let box= true;
    if(checkbox.checked){
        let size_range=document.querySelector('input[name="filter"]:checked').value;
        value=size_range
        key="brand"
        box = false;
        fetchProducts(key,value);
        console.log(value,key)

        return;

    }else{
        console.log(false);
        fetchProducts();
        return;
    }
}
// -------------------------------------------------price filter function-------------------------------------------------------------- 

function priceRange(checkbox) {
    
    var checkboxes = document.getElementsByName('filter')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
    let box = true;
    if (checkbox.checked) {
        let size_range=document.querySelector('input[name="filter"]:checked').value;

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
        box = false; 

    }
    else{
        console.log(false);
        fetchProducts();
        return;
    }

}
// -------------------------------------------------color filter function-------------------------------------------------------------- 

function colorRange(checkbox) {
    
    var checkboxes = document.getElementsByName('filter')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
    let box = true;
    if (checkbox.checked) {
    let size_range=document.querySelector('input[name="filter"]:checked').value;
    value=size_range
    key="color"
    fetchProducts(key,value)
    box = false;

}
else{
    console.log(false);
    fetchProducts();
    return;
}
}

// -------------------------------------------------discount filter function-------------------------------------------------------------- 

function discountRange(){
    let priceVal=document.querySelector('input[name="discount-range"]:checked').value;
   let priceData=+(priceVal);
   value=+(priceVal)
    key="discount"
    console.log(value)
    fetchProducts(key,value)
    console.log(priceData);
}





// ---------------------------------------------products fetching------------------------------------------------------------------------- 
let dataContainer=document.getElementById("wrapper")
function dataFuntion(data){
    dataContainer.innerHTML="";
   let allData= data.map((item)=>{
        
        return`<figure data-id=${item._id} class="shop-items-child-div">
        <div class="hover-animation" data-id=${item._id} >
            <img class="img-back" src="${item.image_1}" alt="">
            <img class="img-front" data-id=${item._id} src="${item.image_2}" alt="">
            <div class="product-view-rating-div">
                        <p class="product-view-star" >${item.rating}<span><i class="fa-solid fa-star"></i></span></p>
                        <hr>
                    <p class="product-view-total-rating">${Math.floor(Math.random() * 5) + 1}k</p>
                </div>
            </div>
            <figcaption>
            <p>${item.title.substring(0, 22) + "..."}</p>
            <div class="similar-products-price-div">
            <h5>Rs.${item.price}</h5>
            <strike>Rs. ${item.price+500}</strike>
            </div>
            <p class="discount">(${item.discount}% OFF)</p>
        </figcaption>
    </figure>`
    })
    dataContainer.innerHTML=allData.join(" ")

    // -------------------------------------on shop-items-child-div div click redirect to product view page------------------------------------------------------ 

    let details_click = document.querySelectorAll(".shop-items-child-div");
      for(let btn of details_click){
          btn.addEventListener("click",(event)=>{ 
			let data_id = event.target.dataset.id;

            localStorage.setItem("product-id",data_id)
            window.location.href='product-view.html'

		});
      }

}
