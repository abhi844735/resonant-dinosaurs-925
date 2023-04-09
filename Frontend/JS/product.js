

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
let title;
if(gender==="male"){
    title="MEN"
}
if(gender==="female"){
    title="WOMEN"
}
if(gender==="both"||gender===undefined||gender===null){
    title=""
}
let pageTitle=document.querySelector(".page-header");
pageTitle.innerText=`${title} ${category.toLocaleUpperCase()}`
let dataArr=[]
let sortArr=[]

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
                // console.log(data)
                dataArr=[...data]
                sortArr=dataArr
                dataFuntion(data)
            }
        
    } catch (error) {
        console.log(error)
    }
    }
fetchProducts()
// sortArr=dataArr
console.log(sortArr)
// ---------------------------products Filters fetch Function -------------------------------------------------------- 

async function fetchProductFilters(){
    let filterRes= await fetch(`${producturl}/filters?product=${category}`);
    let filterData= await  filterRes.json()
    // console.log(filterData)
    FilterDataFun(filterData)
}
fetchProductFilters()







let brand=undefined;
let color=undefined;
let price=undefined;
let discount=undefined;

let brands_div= document.getElementById("brands-div")
function FilterDataFun(filterData){
    brands_div.innerHTML="";
    let brandssData= filterData.brands.map((item)=>{
        return `<div>
        <input value="${item}" type="checkbox" class="size-checkbox" name="brand-filter"
            onclick="brandRange(this)"><label for="">${item}</label>
    </div>
    `
    })

    brands_div.innerHTML=brandssData.join(" ")
}
// -------------------------------------------------brand filter function-------------------------------------------------------------- 

function brandRange(checkbox) {
    
    var checkboxes = document.getElementsByName('brand-filter')
    checkboxes.forEach((item) => {
     if (item !== checkbox) {
         item.checked = false;
     }
    });
   let box= true;
    if(checkbox.checked){
        let size_range=document.querySelector('input[name="brand-filter"]:checked').value;
        value=size_range
        key="brand"
        brand=size_range;
        box = false;
        fetchProducts(key,value);
        console.log(value,key)

        return;

    }else{
        // console.log(false);
        brand=undefined
        fetchProducts();
        return;
    }
}
// -------------------------------------------------price filter function-------------------------------------------------------------- 
function priceRange(checkbox) {
    const checkboxes = document.getElementsByName('price-filter');
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
  
    let sizeRange = null;
    const checkedInput = document.querySelector('input[name="price-filter"]:checked');
    if (checkedInput) {
        sizeRange = checkedInput.value;
    }
    let data;
  
    switch (sizeRange) {
      case '3850':
        if (brand) {
          price=sizeRange
          const dataBrand = dataArr.filter(item => item.brand === brand);
          data = dataBrand.filter(item => item.price > 199 && item.price <= 3850);
          sortArr=[...data]
          dataFuntion(data);

        } else if (color) {
          price=sizeRange
          const dataColor = dataArr.filter(item => item.color === color);
          data = dataColor.filter(item => item.price > 199 && item.price <= 3850);
          sortArr=[...data]

          dataFuntion(data);

        } else if (discount) {
          price=sizeRange
          const dataDiscount = dataArr.filter(item => item.discount === discount);
          data = dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
          sortArr=[...data]

          dataFuntion(data);

        }
        if(brand && color && discount){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(brand && color){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            data = dataColor.filter(item => item.price > 199 && item.price <= 3850);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(brand && discount){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataDiscount = dataBrand.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(color && discount){
            price=sizeRange
            const dataColor = dataArr.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
            sortArr=[...data]
            dataFuntion(data);
        }

         else {
          price=sizeRange
          data = dataArr.filter(item => item.price > 199 && item.price <= 3850);
          sortArr=[...data]

          dataFuntion(data);

        }
        break;
  
      case '7501':
        if (brand) {
          price=sizeRange
          const dataBrand = dataArr.filter(item => item.brand === brand);
          data = dataBrand.filter(item => item.price > 3850 && item.price <= 7501);
          sortArr=[...data]

          dataFuntion(data)

        } else if (color) {
          price=sizeRange
          const dataColor = dataArr.filter(item => item.color === color);
          data = dataColor.filter(item => item.price > 3850 && item.price <= 7501);
          sortArr=[...data]

          dataFuntion(data)

        } else if (discount) {
          price=sizeRange
          const dataDiscount = dataArr.filter(item => item.discount === discount);
          data = dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
          sortArr=[...data]
          dataFuntion(data)

        }
        if(brand && color && discount){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(brand && color){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            data = dataColor.filter(item => item.price > 3850 && item.price <= 7501);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(brand && discount){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataDiscount = dataBrand.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(color && discount){
            price=sizeRange
            const dataColor = dataArr.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
            sortArr=[...data]
            dataFuntion(data);
        }
         else {
          price=sizeRange


          data = dataArr.filter(item => item.price > 3850 && item.price <= 7501);
          sortArr=[...data]

          dataFuntion(data)

        }
        break;
      case '11152':
        if (brand) {
          price=sizeRange
          const dataBrand = dataArr.filter(item => item.brand === brand);
          data = dataBrand.filter(item => item.price > 7501 && item.price <= 11152);
          sortArr=[...data]
          dataFuntion(data)
        } else if (color) {
          price=sizeRange
          const dataColor = dataArr.filter(item => item.color === color);
          data = dataColor.filter(item => item.price > 7501 && item.price <=11152);
          sortArr=[...data]
          dataFuntion(data)
        } else if (discount) {
          price=sizeRange
          const dataDiscount = dataArr.filter(item => item.discount === discount);
          data = dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
          sortArr=[...data]
          dataFuntion(data)
        } 
        if(brand && color && discount){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(brand && color){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            data = dataColor.filter(item => item.price > 7501 && item.price <= 11152);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(brand && discount){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataDiscount = dataBrand.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(color && discount){
            price=sizeRange
            const dataColor = dataArr.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
            sortArr=[...data]
            dataFuntion(data);
        }
        else {
          price=sizeRange
          data = dataArr.filter(item => item.price > 7501 && item.price <= 11152);
          sortArr=[...data]
          dataFuntion(data)
        }
        break;
      case '14803':
        if (brand) {
          price=sizeRange


          const dataBrand = dataArr.filter(item => item.brand === brand);
          data = dataBrand.filter(item => item.price > 11152 && item.price <= 14803);
          sortArr=[...data]
           dataFuntion(data)
        } else if (color) {
          price=sizeRange


          const dataColor = dataArr.filter(item => item.color === color);
          data = dataColor.filter(item => item.price > 11152 && item.price <= 14803);
          sortArr=[...data]
           dataFuntion(data)
        } else if (discount) {
          price=sizeRange


          const dataDiscount = dataArr.filter(item => item.discount === discount);
          data = dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
          sortArr=[...data]
           dataFuntion(data)
        }
        if(brand && color && discount){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(brand && color){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            data = dataColor.filter(item => item.price > 11152 && item.price <= 14803);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(brand && discount){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataDiscount = dataBrand.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(color && discount){
            price=sizeRange
            const dataColor = dataArr.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
            sortArr=[...data]
            dataFuntion(data);
        }
         else {
          price=sizeRange


          data = dataArr.filter(item => item.price > 11152 && item.price <= 14803);
          sortArr=[...data]

           dataFuntion(data)
        }
        break;
        case null:
    //   default:
        if (brand) {
            const dataBrand = dataArr.filter(item => item.brand === brand);
            sortArr=[...dataBrand]
            dataFuntion(dataBrand);
        }
         else if (color) {
            const dataColor = dataArr.filter(item => item.color === color);
            sortArr=[...dataColor]
            dataFuntion(dataColor);
        } 
         else if (discount) {
            const dataDiscount = dataArr.filter(item => item.discount === discount);
            sortArr=[...dataDiscount]
            dataFuntion(dataDiscount);
        } 
        else {
            fetchProducts();
            return;
        }
        break;
    }

  }
// -------------------------------------------------color filter function-------------------------------------------------------------- 
function colorRange(checkbox) {
    const checkboxes = document.getElementsByName('color-filter')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
    let colorRange = null;
    const checkedInput = document.querySelector('input[name="color-filter"]:checked');
    if (checkedInput) {
        colorRange = checkedInput.value;
    }
    let data;
    
    if(colorRange){
        if(brand){
              color=colorRange;
              const dataBrand = dataArr.filter(item => item.brand === brand);
              data = dataBrand.filter(item => item.color=== colorRange);
              sortArr=[...data]
              return  dataFuntion(data);
        }
        if(discount){
            color=colorRange;
            const dataDiscount = dataArr.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.color=== colorRange);
            sortArr=[...data]
            return  dataFuntion(data);
        }
        if(price){
            color=colorRange;
            if(price ==3850){
                const dataPrice= dataArr.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataArr.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataArr.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataArr.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        if(brand && price && discount){
            color=colorRange;
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataDiscount = dataBrand.filter(item => item.discount === discount);
            if(price ==3850){
                const dataPrice= dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        if(brand && discount){
            color=colorRange;
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataDiscount = dataBrand.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.color=== colorRange);
            sortArr=[...data]
            return  dataFuntion(data);
        }
        if(brand && price){
            color=colorRange;
            const dataBrand = dataArr.filter(item => item.brand === brand);
            if(price ==3850){
                const dataPrice= dataBrand.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataBrand.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataBrand.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataBrand.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        if(discount && price){
            color=colorRange;
            const dataDiscount = dataArr.filter(item => item.discount === discount);
            if(price ==3850){
                const dataPrice= dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        else{
            color=colorRange;
            data= dataArr.filter((item)=>item.color=== colorRange)
            sortArr=[...data]
            return  dataFuntion(data);
        }
    }
    else{
                if (brand) {
                    const dataBrand = dataArr.filter(item => item.brand === brand);
                    sortArr=[...dataBrand]
                    dataFuntion(dataBrand);
                }
                if(price){
                    if(price ==3850){
                        const dataPrice= dataArr.filter(item => item.price > 199 && item.price <= 3850);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==7501){
                        const dataPrice= dataArr.filter(item => item.price > 3850 && item.price <= 7501);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==11152){
                        const dataPrice= dataArr.filter(item => item.price > 7501 && item.price <= 11152);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==14803){
                        const dataPrice= dataArr.filter(item => item.price > 11152 && item.price <= 14803);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                }
                if (discount) {
                    const dataDiscount = dataArr.filter(item => item.discount === discount);
                    sortArr=[...dataDiscount]
                    dataFuntion(dataDiscount);
    
                } 
                if(brand && price && discount){
                    const dataBrand = dataArr.filter(item => item.brand === brand);
                    const dataDiscount = dataBrand.filter(item => item.discount === discount);
                    if(price ==3850){
                        const dataPrice= dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==7501){
                        const dataPrice= dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==11152){
                        const dataPrice= dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==14803){
                        const dataPrice= dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                }
                if(brand && discount){
                    const dataBrand = dataArr.filter(item => item.brand === brand);
                    const dataDiscount = dataBrand.filter(item => item.discount === discount);
                    sortArr=[...dataDiscount]
                    dataFuntion(dataDiscount);
                    
                }
                if(brand && price){
                    const dataBrand = dataArr.filter(item => item.brand === brand);
                    if(price ==3850){
                        const dataPrice= dataBrand.filter(item => item.price > 199 && item.price <= 3850);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==7501){
                        const dataPrice= dataBrand.filter(item => item.price > 3850 && item.price <= 7501);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==11152){
                        const dataPrice= dataBrand.filter(item => item.price > 7501 && item.price <= 11152);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==14803){
                        const dataPrice= dataBrand.filter(item => item.price > 11152 && item.price <= 14803);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                }
                if(discount && price){
                    const dataDiscount = dataArr.filter(item => item.discount === discount);
                    if(price ==3850){
                        const dataPrice= dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==7501){
                        const dataPrice= dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==11152){
                        const dataPrice= dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==14803){
                        const dataPrice= dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                }
                
    }
  }
// -------------------------------------------------discount filter function-------------------------------------------------------------- 

function discountRange(){
    // let priceVal=document.querySelector('input[name="discount-range"]:checked').value;
    let discounteRange = null;
    const checkedInput = document.querySelector('input[name="discount-range"]:checked');
    if (checkedInput) {
        discounteRange = +(checkedInput.value);
    }
    let data;
    if(discounteRange){
        if(brand){
            discount=discounteRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            data=dataBrand.filter(item => item.discount === discounteRange)
            sortArr=[...data]
            dataFuntion(data);
        }
        if(color){
            discount=discounteRange
            const dataColor = dataArr.filter(item => item.color === color);
            data=dataColor.filter(item => item.discount === discounteRange);
            sortArr=[...data]
            dataFuntion(data);
        }
        if(price){
            discount=discounteRange;
            if(price ==3850){
                const dataPrice= dataArr.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataArr.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataArr.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataArr.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        if(brand && price && color){
            discount=discounteRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            if(price ==3850){
                const dataPrice= dataColor.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.discount===discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataColor.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataColor.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataColor.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        if(brand && color){
            discount=discounteRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            data=dataColor.filter(item => item.discount === discounteRange)
            sortArr=[...data];
            dataFuntion(data);
        }
        if(brand && price){
            discount=discounteRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            if(price ==3850){
                const dataPrice= dataBrand.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataBrand.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataBrand.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataBrand.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                dataFuntion(data);
            }
        }
        if(color && price){
            discount=discounteRange
            const dataColor = dataArr.filter(item => item.color === color);
            if(price ==3850){
                const dataPrice= dataColor.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataColor.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataColor.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataColor.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        else{
            discount=discounteRange;
            data=dataArr.filter(item => item.discount === discounteRange);
            sortArr=[...data]
            dataFuntion(data);
        }
    }
}

// -------------------------------------sorting function--------------------------------------------------------- 
function sortFilter() {
    let select = document.getElementById('filter');
    let option = select.options[select.selectedIndex];
   let sortValue = option.value;
    if(sortValue==="HighToLow"){
        sortArr.sort((a,b)=>b.price-a.price)
        // console.log(sortArr)
        dataFuntion(sortArr)
    }else if(sortValue==="LowToHigh"){
        sortArr.sort((a,b)=>a.price-b.price)
        console.log(sortArr)

        dataFuntion(sortArr)
    }
    console.log(sortValue)
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
