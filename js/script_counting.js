var array = [];
let originalArray = [...array];
let speed = 500; // Default speed
let isPaused = false;
let isReset = false;
let isSorted = false;
let isDownloadPdfMsgVisibleInLog = false;

const { jsPDF } = window.jspdf; // Correctly access jsPDF

const snapshots = []; // Array to store image snapshots
let pdfDoc;

const arrayContainer = document.getElementById('array-container');
const countContainer = document.getElementById('count-container');
const sortedArrayContainer = document.getElementById('sorted-array-container');
const logTracer = document.getElementById('log-tracer');
const startButton = document.getElementById('startSort');
const pauseButton = document.getElementById('pauseSort');
const rerunButton = document.getElementById('clear-page');
const speedControl = document.getElementById('speed');
const graphContainer = document.getElementById('visualization');
const numbers = document.getElementById("nums-input");
const selectAlgorithm = document.getElementById('select-algorithm');
const clearPage = document.getElementById('resetSort');
const randomArraySize = document.getElementById('size');
const maxArraySize = document.getElementById('max-size');
const minArraySize = document.getElementById('min-size');
const generateRandomArrayBtn = document.getElementById('generate');
const downloadBtn = document.getElementById('download-page');
// const generateNumberFilterSelectedValue = document.querySelector('input[name="filter"]:checked').value;


// Initialize and display the array
function displayArray(container, array, className = '') {
    container.innerHTML = '';
    container.classList.remove('tracer');
    container.classList.remove('radix-bucket-container');
    container.classList.add('array-container');
    array.forEach((value, index) => {
        const element = document.createElement('div');
        element.textContent = value;
        container.appendChild(element);
    });
}

// Utility function to create delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function deactivateStartBtn(){
    startButton.classList.add('deactivate-btn');
    startButton.disabled= true;
}
function activateStartBtn(){
    startButton.classList.remove('deactivate-btn');
    startButton.disabled= false;
}

// Log the steps in Log Tracer
function log(message) {
    const logMessage = document.createElement('div');
    logMessage.textContent = message;
    logTracer.appendChild(logMessage);
    logTracer.scrollTop = logTracer.scrollHeight; // Auto-scroll to bottom
}

// Counting Sort algorithm with visualization
async function countingSort() {
    deactivateStartBtn();

    const max = Math.max(...array);
    const count = new Array(max + 1).fill(0);
    const sortedArray = new Array(array.length).fill(0);

    // Display initial state
    displayArray(arrayContainer, array);
    displayArray(countContainer, count);

    // Step 1: Count each element in the array
    for (let i = 0; i < array.length; i++) {
        if (isPaused) await handlePause();
        if (isReset) return; // Stop if reset

        const currentElement = array[i];
        count[currentElement]++;
        log(`Counting: ${currentElement}`);

        // Highlight the current element and update the count array
        arrayContainer.children[i].classList.add('active');
        countContainer.children[currentElement].classList.add('active');
        countContainer.children[currentElement].textContent = count[currentElement];
        await captureSnapshot();
        await sleep(speed);

        arrayContainer.children[i].classList.remove('active');
        countContainer.children[currentElement].classList.remove('active');
    }

    // Accumulate counts
    for (let i = 1; i < count.length; i++) {
        if (isPaused) await handlePause();
        if (isReset) return; // Stop if reset

        countContainer.children[i].classList.add('active');
        countContainer.children[i - 1].classList.add('active');
        count[i] += count[i - 1];

        await captureSnapshot();
        await sleep(speed);
        log(`Accumulating: count[${i}] = ${count[i]}`);
        countContainer.children[i].textContent = count[i];
        countContainer.children[i].classList.remove('active');
        countContainer.children[i - 1].classList.remove('active');

        await captureSnapshot();
        await sleep(speed);
    }

    // Step 2: Sort the array
    for (let i = array.length - 1; i >= 0; i--) {
        if (isPaused) await handlePause();
        if (isReset) return; // Stop if reset

        const currentElement = array[i];
        arrayContainer.children[i].classList.add('active');
        await captureSnapshot();
        await sleep(speed);
        const sortedIndex = count[currentElement] - 1;
        sortedArray[sortedIndex] = currentElement;
        log(`Placing ${currentElement} at index ${sortedIndex}`);
        arrayContainer.children[i].classList.remove('active');

        // Update count array and sorted array
        count[currentElement]--;
        countContainer.children[currentElement].textContent = count[currentElement];
        sortedArrayContainer.children[sortedIndex].textContent = currentElement;
        sortedArrayContainer.children[sortedIndex].classList.add('sorted');
        await captureSnapshot();
        await sleep(speed);
    }

    // Display sorted array at the end
    displayArray(sortedArrayContainer, sortedArray, 'sorted');
    await captureSnapshot();
    isSorted = true;
    log('Sorting Complete');
    activateStartBtn();
}

// Function to display array in the visualization
function displayArrayRadix(array, highlightIndex = -1) {
    arrayContainer.innerHTML = '';
    array.forEach((num, idx) => {
        const div = document.createElement('div');
        div.classList.add('array-item');
        div.textContent = num;
        if (idx === highlightIndex) {
            div.style.backgroundColor = '#7b2bf4';
        }
        arrayContainer.appendChild(div);
    });
}
function displaySortedArrayRadix(array, highlightIndex = -1) {
    sortedArrayContainer.innerHTML = '';
    array.forEach((num, idx) => {
        const div = document.createElement('div');
        div.classList.add('array-item');
        div.textContent = num;
        if (idx === highlightIndex) {
            div.style.backgroundColor = '#7b2bf4';
        }
        sortedArrayContainer.appendChild(div);
    });
}
// Function to display the digit buckets during sorting
function displayDigitBuckets(buckets, digit) {
    countContainer.innerHTML = `Based on ${digit} place value`;
    countContainer.classList.add('tracer');
    countContainer.classList.add('radix-bucket-container');
    countContainer.classList.remove('array-container');
    buckets.forEach((bucket, idx) => {
        const div = document.createElement('div');
        div.classList.add('bucket');
        div.textContent = `${idx} => [${bucket.join(', ')}]`; // Format: "0 => [array]"
        countContainer.appendChild(div);
    });
}
// Function to display the digit buckets during sorting
function displayDigitBucketsForBucketSort(buckets, bucketInfo) {
    countContainer.innerHTML = '';
    countContainer.classList.add('tracer');
    countContainer.classList.add('radix-bucket-container');
    countContainer.classList.remove('array-container');
    buckets.forEach((bucket, idx) => {
        const div = document.createElement('div');
        div.classList.add('bucket');
        div.textContent = `${idx + 1} (${bucketInfo[idx][0]}->${bucketInfo[idx][1]}) => [${bucket.join(', ')}]`; // Format: "0 => [array]"
        countContainer.appendChild(div);
    });
}

// Function for Radix Sort
async function radixSort() {
    deactivateStartBtn();


    maxDigit = Math.max(...array).toString().length;
    for (let digit = 0; digit < maxDigit; digit++) {

        if (isPaused) await handlePause();
        if (isReset) return;

        let buckets = Array.from({ length: 10 }, () => []);

        // Place array elements into corresponding buckets
        for (let i = 0; i < array.length; i++) {
            if (isPaused) await handlePause();
            if (isReset) return;

            let digitValue = Math.floor(array[i] / Math.pow(10, digit)) % 10;
            buckets[digitValue].push(array[i]);
            log(`Placing ${array[i]} into bucket ${digitValue} based on digit ${digit}`);
            displayArrayRadix(array, i);
            displayDigitBuckets(buckets, digit); // Show current buckets for the digit

            await captureSnapshot();
            await sleep(speed);
        }
        displayArrayRadix(array);

        // Place values from buckets to array
        // Rebuild the array from the buckets
        array = [].concat(...buckets);
        for (let i = 0; i < array.length; i++) {
            if (isPaused) await handlePause();
            if (isReset) return;

            let digitValue = Math.floor(array[i] / Math.pow(10, digit)) % 10;
            buckets[digitValue].pop(array[i]);
            log(`Placing  ${array[i]} from bucket ${digitValue} based on digit ${digit}`);
            sortedArrayContainer.children[i].textContent = array[i];
            sortedArrayContainer.children[i].classList.add('sorted');

            displayDigitBuckets(buckets, digit); // Show current buckets for the digit

            await captureSnapshot();
            await sleep(speed);
        }


        displaySortedArrayRadix(array);
        log(`After sorting by digit ${digit}, array is: ${array}`);

        if (isPaused) await handlePause();
        if (isReset) return;

        await captureSnapshot();
    }
    isSorted = true;
    log('Sorting Complete');
    activateStartBtn();

}
function getBucket(array) {
    let len = array.length;
    let maxElement = Math.max(...array);
    let minElement = Math.min(...array);

    let k = Math.floor(Math.sqrt(len));
    let range = (maxElement - minElement + 1) / k;

    let buckets = Array.from({ length: k }, () => []);
    let bucketInfo = []
    for (let i = 0; i < k; i++) {
        let start = minElement + i * range;
        let end = start + range - 1;
        bucketInfo.push([Math.floor(start), Math.floor(end)]);
    }
    return {
        buckets: buckets,
        bucketInfo: bucketInfo,
        range: range,
        bucketSize:k,
    };
}
async function bucketSort() {
    deactivateStartBtn();

    let len = array.length;
    let minElement = Math.min(...array);
   
    let bucket = getBucket(array);
    let buckets = bucket.buckets;
    let bucketInfo = bucket.bucketInfo;
    let k = bucket.bucketSize;

    for (let i = 0; i < len; i++) {
        if (isPaused) await handlePause();
        if (isReset){
            console.log('reset the bucket sort')
            return;
        }

        let bucketIndex = Math.floor((array[i] - minElement) / bucket.range);
        bucket.buckets[bucketIndex].push(array[i]);
       
        log(`Placing ${array[i]} into bucket ${bucketIndex + 1} from unsorted array`);
       
        displayArrayRadix(array, i);
        displayDigitBucketsForBucketSort(buckets, bucketInfo) // Show current buckets for the digit
       
        await captureSnapshot();
        await sleep(speed);
    }
    displayArrayRadix(array);
  
    
    for (let i = 0; i < k; i++) {
        log(`Sorting ${i+1} th bucket`);
        bucket.buckets[i].sort((a, b) => a - b);
      
        displayDigitBucketsForBucketSort(buckets, bucketInfo) // Show current buckets for the digit
      
        await captureSnapshot();
        await sleep(speed);
    }

    let index = 0;
    for (let i = 0; i < k; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            array[index] = buckets[i][j];

            if (isPaused) await handlePause();
            if (isReset) return;

            log(`Placing  ${buckets[i][j]} into sorted array from ${i} th bucket`);
            sortedArrayContainer.children[index].textContent = array[index];
            sortedArrayContainer.children[index].classList.add('sorted');

            displayDigitBucketsForBucketSort(buckets, bucketInfo) // Show current buckets for the digit
            await captureSnapshot();
            await sleep(speed);
            index++;
        }
    }
    displaySortedArrayRadix(array);
    if (isPaused) await handlePause();
    if (isReset) return;
    await captureSnapshot();

    isSorted = true;
    log('Sorting Complete');
    activateStartBtn();

}

// Event listener to handle pause
pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
});

// Handle pause state
async function handlePause() {
    while (isPaused) {
        await sleep(speed); // Check every 100ms if paused
    }
}

// Reset sorting
rerunButton.addEventListener('click', async () => {
    resetVisualization();
    activateStartBtn();
});

// Speed control
speedControl.addEventListener('input', (event) => {
    speed = 1000 - event.target.value; // Inverse speed control
});

// Reset visualization to original state
function resetVisualization() {

    isReset = true;
    isPaused = false;
    pauseButton.textContent = 'Pause';
    startButton.classList.remove('deactivate-icon');



    // remove the previous snapshots
    while (snapshots.length) {
        snapshots.pop();
    }

    array = [...originalArray];
    if (selectAlgorithm.value == 'count-sort') {
        displayArray(arrayContainer, array);
        displayArray(countContainer, new Array(10).fill(0)); // Reset count container
        displayArray(sortedArrayContainer, new Array(array.length).fill('')); // Clear sorted array
    }
    else if (selectAlgorithm.value == 'radix-sort') {
        displayArray(arrayContainer, array);
        displayDigitBuckets(Array.from({ length: 10 }, () => []), 0)
        displaySortedArrayRadix(Array.from({ length: array.length }, () => []));
    }
    else {
        displayArray(arrayContainer, array);
        let bucket = getBucket(array);
        displayDigitBucketsForBucketSort(bucket.buckets, bucket.bucketInfo);
        displaySortedArrayRadix(Array.from({ length: array.length }, () => []));

    }
    logTracer.innerHTML = ''; // Clear logs
}
function startVisualization(){
    if (numbers.value.length == 0) {
        alert("Enter Numbers");
    }
    else if (selectAlgorithm.value == 'null') {
        alert('Select Algorithm');
    }
    else {
        graphContainer.style.display = "block";
        array = []
        for (let x of numbers.value.split(',')) {
            array.push(Number(x));
        }
        originalArray = [...array]
      
        resetVisualization(); // Reset before starting
        isReset = false;
        isSorted = false;
        isDownloadPdfMsgVisibleInLog = false;

        if (selectAlgorithm.value == 'count-sort') {
            countingSort();
        }
        else if (selectAlgorithm.value == 'radix-sort') {
            radixSort();
        }
        else {
            bucketSort();
        }
        initCodeSection();

        // paintChart(originalArray);

    }
}

// Start sorting
startButton.addEventListener('click', () => {
    startVisualization();
});
generateRandomArrayBtn.addEventListener('click', () => {
    let randomArray  = [];
    let n = Number(randomArraySize.value);
    for (let i = 0; i < n; i++) {
        randomArray.push(Math.floor((Math.random() *
                         Number(maxArraySize.value)) + 
                         Number(minArraySize.value)));
    }
  

    if (document.getElementById('nearly-sorted').checked) {
        let count = n/2;
        randomArray.sort((a,b)=>{
           if(a-b<0 && count!=0){
             count--;
             return a-b;
           }
        })
    }
    else  if (document.getElementById('increasing').checked) {
        randomArray.sort((a,b)=>a-b);
    }
    else  if (document.getElementById('decreasing').checked) {
        randomArray.sort((a,b)=>b-a);

    }

    numbers.value = '';
    for (let i = 0; i < n; i++) {
        numbers.value += randomArray[i].toString();
        if (i < n - 1) {
            numbers.value += ',';
        }
    }

    // randomArraySize.value = '';
    // maxArraySize.value = '';
    // minArraySize.value = '';


});

clearPage.addEventListener('click', () => {
    resetVisualization();
    graphContainer.style.display = "none";
    numbers.value = '';
    selectAlgorithm.value = 'null'
    activateStartBtn();

})

async function captureSnapshot() {
    if (array.length < 11) {
        const element = document.querySelector('.field');
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        snapshots.push(imgData); // Store the image data
    }
}

async function generatePDF() {
    pdfDoc = new jsPDF(); // Create PDF document instance
    for (let i = 0; i < snapshots.length; i++) {
        if (i > 0) {
            pdfDoc.addPage(); // Add a new page after the first snapshot
        }
        pdfDoc.addImage(snapshots[i], 'PNG', 10, 10, 180, 160); // Adjust dimensions
    }
    pdfDoc.save('Algorithm_Visualization.pdf'); // Save the PDF

}
setInterval(() => {
    if (!isSorted || array.length > 10) {
        downloadBtn.classList.add('deactivate-icon');
    }
    else {
        downloadBtn.classList.remove('deactivate-icon');
        if (!isDownloadPdfMsgVisibleInLog) {
            log(`Visualization PDF is ready for download`);
            isDownloadPdfMsgVisibleInLog = true;
        }
    }
}, 2000);

downloadBtn.addEventListener('click', function () {
    if (isSorted) {
        generatePDF();
    }
    else {
        alert('Sorting Is not completed');
    } // Call your sorting function
});