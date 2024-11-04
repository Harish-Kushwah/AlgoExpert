function getRandomArray(){
    return Array.from({ length: Math.floor(Math.random()*10+5) }, () => [Math.floor(Math.random()*10)]);
}
var allHistory = [
    {
        id:1,
        status_icon:'mark.png',
        numbers:getRandomArray(),
        algorithm:'Count Sort',
        date:'25 Aug 2024'
    },
    {
        id:2,
        status_icon:'check.png',
        numbers:getRandomArray(),
        algorithm:'Bucket Sort',
        date:'25 Sep 2024'
    },
    {
        id:4,
        status_icon:'check.png',
        numbers:getRandomArray(),
        algorithm:'Bucket Sort',
        date:'25 Sep 2024'
    },
    {
        id:5,
        status_icon:'mark.png',
        numbers:getRandomArray(),
        algorithm:'Bucket Sort',
        date:'25 Sep 2024'
    },
]