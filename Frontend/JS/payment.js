
// change =>click=> variable ID 

// --------------------------------------------------
let click= document.getElementById("ttl");
// ------------------------------------------------
click.addEventListener("click",buyNow)
async function buyNow(){
    const data={
      "purpose" :  "Upstyle Payment",
      "amount" : localStorage.getItem("totalcartvalue")||200,
      "buyer_name" :  localStorage.getItem("name")||"Test",
      "email" :  localStorage.getItem("email")||"Test@gmail.com",
      "phone" :  "9007060666",
      "webhook":'/webhook/',
      "redirect_url" :  "https://excited-deer-headscarf.cyclic.app/api/bid/callback",
    }
    console.log(data)
    let res= await fetch("https://excited-deer-headscarf.cyclic.app/api/bid/pay",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",

    },
    body:JSON.stringify(data)
    })
    if(res.ok){
    let url= await res.json()
    console.log(url.msg)
    window.location.href=url.msg
    }
  // console.log(res.data)
}