var array = [];
let originalArray = [...array];
let speed = 500; // Default speed
let isPaused = false;
let isReset = false;
let isSorted = false;

const { jsPDF } = window.jspdf; // Correctly access jsPDF

const snapshots = []; // Array to store image snapshots
let pdfDoc;


// document.getElementById('downloadPDF').addEventListener('click', function () {
//     if(isSorted){
//         generatePDF();
//     } // Call your sorting function
// });


const arrayContainer = document.getElementById('array-container');
const countContainer = document.getElementById('count-container');
const sortedArrayContainer = document.getElementById('sorted-array-container');
const logTracer = document.getElementById('log-tracer');
const startButton = document.getElementById('startSort');
const pauseButton = document.getElementById('pauseSort');
const resetButton = document.getElementById('resetSort');
const speedControl = document.getElementById('speed');
const graphContainer = document.getElementById('visualization');
const numbers = document.getElementById("nums-input");
const selectAlgorithm = document.getElementById('select-algorithm');
const clearPage  = document.getElementById('clear-page');
const randomArraySize = document.getElementById('size');
const maxArraySize = document.getElementById('max-size');
const minArraySize = document.getElementById('min-size');
const generateRandomArrayBtn = document.getElementById('generate');


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

// Log the steps in Log Tracer
function log(message) {
    const logMessage = document.createElement('div');
    logMessage.textContent = message;
    logTracer.appendChild(logMessage);
    logTracer.scrollTop = logTracer.scrollHeight; // Auto-scroll to bottom
}

// Counting Sort algorithm with visualization
async function countingSort() {
    const max = Math.max(...array);
    const count = new Array(max+1).fill(0);
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
        // await captureSnapshot();
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
        // await captureSnapshot();

        await sleep(speed);
        log(`Accumulating: count[${i}] = ${count[i]}`);
        countContainer.children[i].textContent = count[i];
        countContainer.children[i].classList.remove('active');
        countContainer.children[i - 1].classList.remove('active');

        // await captureSnapshot();
        await sleep(speed);
    }

    // Step 2: Sort the array
    for (let i = array.length - 1; i >= 0; i--) {
        if (isPaused) await handlePause();
        if (isReset) return; // Stop if reset

        const currentElement = array[i];
        arrayContainer.children[i].classList.add('active');
        // await captureSnapshot();
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
        // await captureSnapshot();
        await sleep(speed);
    }

    // Display sorted array at the end
    displayArray(sortedArrayContainer, sortedArray, 'sorted');
    // await captureSnapshot();
    isSorted = true;
    log('Sorting Complete');

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
function displayDigitBuckets(buckets,digit) {
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

// Function for Radix Sort
async function radixSort() {
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
            displayDigitBuckets(buckets,digit); // Show current buckets for the digit
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

            displayDigitBuckets(buckets,digit); // Show current buckets for the digit
            await sleep(speed);
        }

        // isSorted = true;
        displaySortedArrayRadix(array);
        log(`After sorting by digit ${digit}, array is: ${array}`);
        // displaySortedArrayRadix(array);
        // await sleep(speed);
        if (isPaused) await handlePause();
        if (isReset) return;
    }
    log('Sorting Complete');
}
async function bucketSort() {
    maxDigit = Math.max(...array).toString().length;
    for (let digit = 0; digit < maxDigit; digit++) {
        
        if (isPaused) await handlePause();
        if (isReset) return;

        const numBuckets = Math.ceil(Math.sqrt(array.length)); // Optimal number of buckets
        let buckets = Array.from({ length: numBuckets }, () => []);

        // Place array elements into corresponding buckets
        for (let i = 0; i < array.length; i++) {
            if (isPaused) await handlePause();
            if (isReset) return;

            let digitValue = Math.floor(array[i] / Math.pow(10, digit)) % 10;
            buckets[digitValue].push(array[i]);
            log(`Placing ${array[i]} into bucket ${digitValue} based on digit ${digit}`);
            displayArrayRadix(array, i);
            displayDigitBuckets(buckets,digit); // Show current buckets for the digit
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

            displayDigitBuckets(buckets,digit); // Show current buckets for the digit
            await sleep(speed);
        }

        // isSorted = true;
        displaySortedArrayRadix(array);
        log(`After sorting by digit ${digit}, array is: ${array}`);
        // displaySortedArrayRadix(array);
        // await sleep(speed);
        if (isPaused) await handlePause();
        if (isReset) return;
    }
    log('Sorting Complete');
}


// Event listener to handle pause
pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
});

// Handle pause state
async function handlePause() {
    while (isPaused) {
        await sleep(100); // Check every 100ms if paused
    }
}

// Reset sorting
resetButton.addEventListener('click', () => {
    isReset = true;
    isPaused = false;
    pauseButton.textContent = 'Pause';
    resetVisualization();
});

// Speed control
speedControl.addEventListener('input', (event) => {
    speed = 1000 - event.target.value; // Inverse speed control
});

// Reset visualization to original state
function resetVisualization() {
    array = [...originalArray];
    if(selectAlgorithm.value=='count-sort'){
        displayArray(arrayContainer, array);
        displayArray(countContainer, new Array(10).fill(0)); // Reset count container
        displayArray(sortedArrayContainer, new Array(array.length).fill('')); // Clear sorted array
    }
    else{
        displayArray(arrayContainer, array);
        displayDigitBuckets(Array.from({ length: 10 }, () => []),0)
        displaySortedArrayRadix(Array.from({ length: array.length }, () => []));
    }
    logTracer.innerHTML = ''; // Clear logs
}

// Start sorting
startButton.addEventListener('click', () => {

    if (numbers.value.length == 0) {
        alert("Enter Numbers");
    }
    else if(selectAlgorithm.value=='null'){
        alert('Select Algorithm');
    }
    else {
        graphContainer.style.display = "block";
        array = []
        for (let x of numbers.value.split(',')) {
            array.push(Number(x));
        }
        originalArray = [...array]


        isReset = false;
        resetVisualization(); // Reset before starting

        if(selectAlgorithm.value=='count-sort'){
            countingSort();
        }
        else if(selectAlgorithm.value=='radix-sort'){
            radixSort();
        }
        else{
            bucketSort();
        }
        initCodeSection();
    }
});
generateRandomArrayBtn.addEventListener('click',()=>{
    numbers.value = '';
    let n = Number(randomArraySize.value);
    for (let i=0; i<n;i++) {
        numbers.value +=(Math.floor((Math.random() * Number(maxArraySize.value)) + Number(minArraySize.value) )).toString();
        if(i<n-1){
            numbers.value+=',';
        }
    }
    randomArraySize.value ='';
    maxArraySize.value ='';
    minArraySize.value ='';

});

clearPage.addEventListener('click',()=>{
    graphContainer.style.display = "none";
    numbers.value='';
    selectAlgorithm.value='null'

})

async function captureSnapshot() {
    const element = document.getElementById('visualization');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    snapshots.push(imgData); // Store the image data
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
