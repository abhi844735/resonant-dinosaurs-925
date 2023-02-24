import navbar from "../components/index1.js"
let div3 = document.getElementById("navbar");
div3.innerHTML = navbar();

document.querySelector(".logo-img").addEventListener("click",()=>{
    window.location.href="index.html";
})
document.getElementById("sign").addEventListener("click",()=>{
    window.location.href="signup.html";
})

import {footer} from "../components/footer.js"

// console.log(footer())

const footerdiv=document.querySelector(".footer");
footerdiv.innerHTML = footer()