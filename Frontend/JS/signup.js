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
    let mobile_number=document.getElementById("mobile").value;
    if(mobile_number.length==10){
        fetch("http://localhost:4500/users/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                
            },
            body:JSON.stringify({mobile:mobile_number})
        }).then((res)=>res.json)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>console.log(err));
    }else{
        alert("Incorrect Number")
    }
})