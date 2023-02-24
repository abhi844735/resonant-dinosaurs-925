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
let signup_btn=document.getElementById("signup_btn");
signup_btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let name=document.getElementById("name").value;
let mobile = document.getElementById("mobile").value;
mobile= parseInt(mobile)
let email = document.getElementById("email").value;
let gender = document.getElementById("gender").value;
let password=document.getElementById("password").value;
if(name==""||mobile==""||email==""||gender==""||password==""){
    alert("fill all the details");
}else{
    let obj={
        name,mobile,email,gender,password
    }
    console.log(obj);
}

})