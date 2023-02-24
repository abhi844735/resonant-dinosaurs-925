import navbar from "../components/index1.js"
let div3 = document.getElementById("navbar");
div3.innerHTML = navbar();

document.querySelector(".logo-img").addEventListener("click",()=>{
    window.location.href="index.html";
})


document.querySelector(".anuq").addEventListener("click",()=>{
    window.location.href="product.html";
})

document.getElementById("sign").addEventListener("click",()=>{
    window.location.href="signup.html";
})
let otp_btn=document.getElementById("otp_btn");
otp_btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let mobile=document.getElementById("mobile").value;
    mobile= +mobile
    let password=document.getElementById("password").value;
    
    if(mobile==""||password==""){
        alert("all fields are mandatory");
    }else{
        let obj={
            mobile,password
        }
        console.log(obj)
    }
    
    
});