// import navbar from "../components/index1.js";
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


let otp_btn = document.getElementById("login_form");
otp_btn.addEventListener("submit", async(e) => {
  e.preventDefault();
  let mobile = document.getElementById("mobile").value;
  mobile = +mobile;
  let password = document.getElementById("password").value;

  if (mobile == "" || password == "") {
   await swal("all fields are mandatory");
  } else {
    let obj = {
      mobile,
      password,
    };
    login(obj);
  }
});

let login =async(obj)=>{
    let res = await fetch("http://localhost:4500/users/login",{
     method:"POST",
     headers:{
         "Content-Type":"application/json"
     },
     body:JSON.stringify(obj)
    });
    let data = await res.json();
    if(res.ok){
     await swal(data.name,"has logged in");
     localStorage.setItem("token",data.token);
     localStorage.setItem("name",data.name);
     localStorage.setItem("email",data.email);
     localStorage.setItem("mobile",data.mobile);
     window.location.href="index.html"
      
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
              await   swal("log out succussfully");
                 localStorage.clear();
                 window.location.reload()
         }
         })
     }
 }else{
     document.querySelector(".login").style.display="block";
     document.querySelector(".logout").style.display="none";
 }
  
