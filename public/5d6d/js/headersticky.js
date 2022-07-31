window.addEventListener("scroll", function () {
  let header = this.document.querySelector("#strip2");
  let logo = this.document.querySelector("#left-logo");
  let right = this.document.querySelector("#right-item");

  var value = header.offsetTop;
  if (window.pageYOffset > 200) {
    logo.classList.add("zero");
    right.classList.add("zero");
    header.classList.add("sticky");
    console.log("sticky");
  } else if (window.pageYOffset < 50) {
    header.classList.remove("sticky");
    logo.classList.remove("zero");
    right.classList.remove("zero");
    console.log("nonsticky");
  }
});
