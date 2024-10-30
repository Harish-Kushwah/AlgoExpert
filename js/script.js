function toggleImage(){
    const image = document.getElementById("toggleImage");
    if(!image.classList.contains("activeMenu")){
          image.src = "asets/close.png";
          image.classList.add("activeMenu");
    }
    else{
        image.src = "asets/open.png";
        image.classList.remove("activeMenu");
    }
}
// scroll code implementation page to top 
var anchor = document.getElementById("ide-page");
anchor.addEventListener('click', function(event) {
    var target = document.getElementById("code-container");
     window.scrollTo({
        top: target.offsetTop-180,
        behavior: 'smooth'
     });   
}
);