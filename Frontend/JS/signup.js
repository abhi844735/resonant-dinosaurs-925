import navbar from "../components/index1.js"
let div3 = document.getElementById("navbar");
div3.innerHTML = navbar();

document.querySelector(".logo-img").addEventListener("click",()=>{
    window.location.href="index.html";
})