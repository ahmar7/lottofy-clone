// window.addEventListener("scroll", function () {
//   let header = this.document.querySelector("#strip2");
//   let logo = this.document.querySelector("#left-logo");
//   let right = this.document.querySelector("#right-item");

//   var value = header.offsetTop;
//   if (window.pageYOffset > 200) {
//     logo.classList.add("zero");
//     right.classList.add("zero");
//     header.classList.add("sticky");
//     console.log("sticky");
//   } else if (window.pageYOffset < 50) {
//     header.classList.remove("sticky");
//     logo.classList.remove("zero");
//     right.classList.remove("zero");
//     console.log("nonsticky");
//   }
// });


    
    
                let toggleMenu=()=>{
               let   mobileMenu= document.getElementById("mobileMenu")
                let  mobileGamesMenu= document.getElementById("mobileGamesMenu")
                  mobileMenu.classList.add("is-open")
                  mobileGamesMenu.style.display="block"
                  mobileGamesMenu.style.opacity=1
                  mobileGamesMenu.classList.add("is-open")
                }
              
   
                let toggleMenuOff=()=>{
               let   mobileMenu= document.getElementById("mobileMenu")
                let  mobileGamesMenu= document.getElementById("mobileGamesMenu")
                  mobileMenu.classList.remove("is-open")
                  mobileGamesMenu.style.opacity=0
                  mobileGamesMenu.style.display="none"
                  mobileGamesMenu.classList.remove("is-open")
                }

              
              
              let closeMenu=()=>{
               let   hasSub= document.getElementById("has-sub")
               let   accountToggle= document.getElementById("accountToggle")
              hasSub.classList.toggle("is-opened") 
              accountToggle.classList.toggle("hide-it")  

}



  let closeLottery=()=>{
  let   hasSub= document.getElementById("has-sub2")
  
               let   accountToggle= document.getElementById("accountToggle2")
              hasSub.classList.toggle("is-opened") 
              accountToggle.classList.toggle("show-it")  
}

   
 
window.addEventListener("scroll", function () {
  let header = this.document.querySelector("#strip2");
  let logo = this.document.querySelector("#left-logo");
  let right = this.document.querySelector("#right-item");

  var value = header.offsetTop;
  if (window.pageYOffset > 80) {
    logo.classList.add("zero");
    right.classList.add("zero");
    
     header.classList.add("top-submenu-scroll");
    header.classList.add("sticky");
    console.log("sticky");
  } else if (window.pageYOffset < 50) {
    header.classList.remove("sticky");
    logo.classList.remove("zero");
    
    header.classList.remove("top-submenu-scroll");
    right.classList.remove("zero");
    console.log("nonsticky");
  }
});
 
//     window.addEventListener("scroll", function () {
//   let header = this.document.getElementById("strip2");
  
//   var value = header.offsetTop;
//   if (window.pageYOffset > 80) {
//      header.classList.add("top-submenu-scroll")
//     } else if (window.pageYOffset < 50) {
//     header.classList.remove("top-submenu-scroll")
    
//   }
// }); 