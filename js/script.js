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


function bucketSort1(arr,n,k){
    let maxElement = arr[0];
    for(let i=1;i<n;i++){
        maxElement = Math.max(maxElement,arr[i]);
    }

    maxElement++;

    let buckets = Array.from({length:k},()=>[]);

    for(let i=0;i<n;i++){
        let bucketIndex = Math.floor((arr[i]*k)/maxElement);
        buckets[bucketIndex].push(arr[i]);
    }

    console.log(buckets);
    for(let i=0;i<k;i++){
        buckets[i].sort((a,b)=>a-b);
    }

    let index = 0;
    for(let i=0;i<k;i++){
        for(let j =0;j<buckets[i].length;j++){
            arr[index++] = buckets[i][j];
        }
    }
}

let arr = [30,20,40,20,5]
let n = arr.length;
let k = 4;
bucketSort1(arr,n,k);

console.log(arr.join(","));