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