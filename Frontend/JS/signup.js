// import navbar from "../components/index1.js"
// let div3 = document.getElementById("navbar");
// div3.innerHTML = navbar();
import navbar from "../components/header.js";
let div3 = document.querySelector(".header");
div3.innerHTML = navbar();
document.addEventListener('DOMContentLoaded', () => {
    
    const Big_screen_sreachbar=document.getElementById("search_bar");
    const small_screen_sreachbar=document.querySelector(".input-box");
    Big_screen_sreachbar.style.display="none"
    small_screen_sreachbar.style.display="none"
})


let signup_btn=document.getElementById("signup_btn");
signup_btn.addEventListener("click",async(e)=>{
    e.preventDefault();
    let first_name=document.getElementById("first_name").value;
    let last_name=document.getElementById("last_name").value
let mobile = document.getElementById("mobile").value;
mobile= parseInt(mobile)
let email = document.getElementById("email").value;
let gender = document.getElementById("gender").value;
let password=document.getElementById("password").value;
if(first_name==""||last_name==""||mobile==""||email==""||gender==""||password==""){
   await swal("fill all the details");
}else if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*['@', '$', '#']).*$/.test(password))){
   await swal("should contains a lowercase, uppercase, number and any of the special characters")
}
else if(!email.includes("@gmail.com")){
   await swal("right in gmail format please")
}
else{
    let obj={
        first_name,last_name,mobile,email,gender,password
    }
    signup(obj);
}

});
let signup =async(obj)=>{
   let res = await fetch("http://localhost:4500/users/signup",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(obj)
   });
   let data = await res.json();
   if(res.ok){
    await swal(data.message);
    window.location.href="login.html"
   }else{
   await swal(data.message);
   }
}
let token=localStorage.getItem("token");
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
              await  swal("log out succussfully");
                localStorage.clear();
                window.location.reload()
        }
        })
    }
}else{
    document.querySelector(".login").style.display="block";
    document.querySelector(".logout").style.display="none";
}
 
 