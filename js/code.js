function getCountSortPython(array) {
    return `
  def count_sort(input_array):
    # Finding the maximum element of input_array.
    M = max(input_array)

    # Initializing count_array with 0
    count_array = [0] * (M + 1)

    # Mapping each element of input_array as an index of count_array
    for num in input_array:
        count_array[num] += 1

    # Calculating prefix sum at every index of count_array
    for i in range(1, M + 1):
        count_array[i] += count_array[i - 1]

    # Creating output_array from count_array
    output_array = [0] * len(input_array)

    for i in range(len(input_array) - 1, -1, -1):
        output_array[count_array[input_array[i]] - 1] = input_array[i]
        count_array[input_array[i]] -= 1

    return output_array

  # Driver code
  if __name__ == "__main__":
    # Input array
    input_array = [${array}]

    # Output array
    output_array = count_sort(input_array)

    for num in output_array:
        print(num, end=" ")
`;
}
function getCountSortC(array) {
    return `
#include <stdio.h>
#include <stdlib.h>

void countSort(int inputArray[], int N) {

    // Finding the maximum element of 
    // array inputArray[]
    int M = 0;
    for (int i = 0; i < N; i++)
        if (inputArray[i] > M)
            M = inputArray[i];
    
    // Initializing countArray[] with 0
    int* countArray = (int*)calloc(M + 1, sizeof(int));
    
    // Mapping each element of inputArray[] 
    // as an index of countArray[] array
    for (int i = 0; i < N; i++)
        countArray[inputArray[i]]++;
    
    // Calculating prefix sum at every index
    // of array countArray[]
    for (int i = 1; i <= M; i++)
        countArray[i] += countArray[i - 1];
    
    // Creating outputArray[] from countArray[] array
    int* outputArray = (int*)malloc(N * sizeof(int));
    for (int i = N - 1; i >= 0; i--) {
        outputArray[countArray[inputArray[i]] - 1] = inputArray[i];
        countArray[inputArray[i]]--;
    }
    
    // Copying sorted elements back to inputArray[]
    for (int i = 0; i < N; i++)
        inputArray[i] = outputArray[i];
    
    // Freeing dynamically allocated memory
    free(countArray);
    free(outputArray);
}

// Driver code
int main() {

    // Input array
    int inputArray[] = {${array}};
    int N = sizeof(inputArray) / sizeof(inputArray[0]);
    
    // Sorting the array
    countSort(inputArray, N);
    
    // Printing the sorted array
    for (int i = 0; i < N; i++)
        printf("%d ", inputArray[i]);
    
    return 0;
}
  `
}
function getCountSortCpp(array) {
    return `
#include <bits/stdc++.h>
using namespace std;

vector<int> countSort(vector<int>& inputArray)
{

    int N = inputArray.size();

    // Finding the maximum element of array inputArray[].
    int M = 0;

    for (int i = 0; i < N; i++)
        M = max(M, inputArray[i]);

    // Initializing countArray[] with 0
    vector<int> countArray(M + 1, 0);

    // Mapping each element of inputArray[] as an index
    // of countArray[] array

    for (int i = 0; i < N; i++)
        countArray[inputArray[i]]++;

    // Calculating prefix sum at every index
    // of array countArray[]
    for (int i = 1; i <= M; i++)
        countArray[i] += countArray[i - 1];

    // Creating outputArray[] from countArray[] array
    vector<int> outputArray(N);

    for (int i = N - 1; i >= 0; i--)

    {
        outputArray[countArray[inputArray[i]] - 1]
            = inputArray[i];

        countArray[inputArray[i]]--;
    }

    return outputArray;
}

// Driver code
int main()

{

    // Input array
    vector<int> inputArray = {${array}};

    // Output array
    vector<int> outputArray = countSort(inputArray);

    for (int i = 0; i < inputArray.size(); i++)
        cout << outputArray[i] << " ";

    return 0;
}

  `
}
function getCountSortJava(array) {
    return `
import java.util.Arrays;

public class CountSort {
    public static int[] countSort(int[] inputArray) {
        int N = inputArray.length;
        int M = 0;

        for (int i = 0; i < N; i++) {
            M = Math.max(M, inputArray[i]);
        }

        int[] countArray = new int[M + 1];

        for (int i = 0; i < N; i++) {
            countArray[inputArray[i]]++;
        }

        for (int i = 1; i <= M; i++) {
            countArray[i] += countArray[i - 1];
        }

        int[] outputArray = new int[N];

        for (int i = N - 1; i >= 0; i--) {
            outputArray[countArray[inputArray[i]] - 1] = inputArray[i];
            countArray[inputArray[i]]--;
        }

        return outputArray;
    }

    public static void main(String[] args) {
        int[] inputArray = {${array}};
        int[] outputArray = countSort(inputArray);

        for (int i = 0; i < inputArray.length; i++) {
            System.out.print(outputArray[i] + " ");
        }
    }
}

  `
}
function getRadixSortPython(array) {
    return `
# Python program for implementation of Radix Sort
# A function to do counting sort of arr[] according to
# the digit represented by exp.


def countingSort(arr, exp1):

    n = len(arr)

    # The output array elements that will have sorted arr
    output = [0] * (n)

    # initialize count array as 0
    count = [0] * (10)

    # Store count of occurrences in count[]
    for i in range(0, n):
        index = arr[i] // exp1
        count[index % 10] += 1

    # Change count[i] so that count[i] now contains actual
    # position of this digit in output array
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Build the output array
    i = n - 1
    while i >= 0:
        index = arr[i] // exp1
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1

    # Copying the output array to arr[],
    # so that arr now contains sorted numbers
    i = 0
    for i in range(0, len(arr)):
        arr[i] = output[i]

# Method to do Radix Sort


def radixSort(arr):

    # Find the maximum number to know number of digits
    max1 = max(arr)

    # Do counting sort for every digit. Note that instead
    # of passing digit number, exp is passed. exp is 10^i
    # where i is current digit number
    exp = 1
    while max1 / exp >= 1:
        countingSort(arr, exp)
        exp *= 10


# Driver code
arr = [${array}]

# Function Call
radixSort(arr)

for i in range(len(arr)):
    print(arr[i], end=" ")

`
}
function getRadixSortC(array) {
    return `
#include <stdio.h>

// A utility function to get the maximum 
// value in arr[]
int getMax(int arr[], int n) {
    int mx = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > mx)
            mx = arr[i];
    return mx;
}

// A function to do counting sort of arr[] 
// according to the digit represented by exp
void countSort(int arr[], int n, int exp) {
    int output[n]; // Output array
    int count[10] = {0}; // Initialize count array as 0

    // Store count of occurrences in count[]
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    // Change count[i] so that count[i] now 
    // contains actual position of this digit
    // in output[]
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];

    // Build the output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    // Copy the output array to arr[], 
    // so that arr[] now contains sorted 
    // numbers according to current digit
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

// The main function to sort arr[] of size 
// n using Radix Sort
void radixSort(int arr[], int n) {
  
    // Find the maximum number to know 
    // the number of digits
    int m = getMax(arr, n); 

    // Do counting sort for every digit
    // exp is 10^i where i is the current 
    // digit number
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}

// A utility function to print an array
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\n");
}

// Driver code
int main() {
    int arr[] = {${array}};
    int n = sizeof(arr) / sizeof(arr[0]);

    // Function call
    radixSort(arr, n);
    printArray(arr, n);
    return 0;
}

`
}
function getRadixSortCpp(array) {
    return `
// C++ implementation of Radix Sort

#include <iostream>
using namespace std;

// A utility function to get maximum
// value in arr[]
int getMax(int arr[], int n)
{
    int mx = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > mx)
            mx = arr[i];
    return mx;
}

// A function to do counting sort of arr[]
// according to the digit
// represented by exp.
void countSort(int arr[], int n, int exp)
{

    // Output array
    int output[n];
    int i, count[10] = { 0 };

    // Store count of occurrences
    // in count[]
    for (i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    // Change count[i] so that count[i]
    // now contains actual position
    // of this digit in output[]
    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];

    // Build the output array
    for (i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    // Copy the output array to arr[],
    // so that arr[] now contains sorted
    // numbers according to current digit
    for (i = 0; i < n; i++)
        arr[i] = output[i];
}

// The main function to that sorts arr[]
// of size n using Radix Sort
void radixsort(int arr[], int n)
{

    // Find the maximum number to
    // know number of digits
    int m = getMax(arr, n);

    // Do counting sort for every digit.
    // Note that instead of passing digit
    // number, exp is passed. exp is 10^i
    // where i is current digit number
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}

// A utility function to print an array
void print(int arr[], int n)
{
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
}

// Driver Code
int main()
{
    int arr[] = { 170, 45, 75, 90, 802, 24, 2, 66 };
    int n = sizeof(arr) / sizeof(arr[0]);

    // Function Call
    radixsort(arr, n);
    print(arr, n);
    return 0;
}


`
}
function getRadixSortJava(array) {
    return `
// Radix sort Java implementation

import java.io.*;
import java.util.*;

class Radix {

    // A utility function to get maximum value in arr[]
    static int getMax(int arr[], int n)
    {
        int mx = arr[0];
        for (int i = 1; i < n; i++)
            if (arr[i] > mx)
                mx = arr[i];
        return mx;
    }

    // A function to do counting sort of arr[] according to
    // the digit represented by exp.
    static void countSort(int arr[], int n, int exp)
    {
        int output[] = new int[n]; // output array
        int i;
        int count[] = new int[10];
        Arrays.fill(count, 0);

        // Store count of occurrences in count[]
        for (i = 0; i < n; i++)
            count[(arr[i] / exp) % 10]++;

        // Change count[i] so that count[i] now contains
        // actual position of this digit in output[]
        for (i = 1; i < 10; i++)
            count[i] += count[i - 1];

        // Build the output array
        for (i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }

        // Copy the output array to arr[], so that arr[] now
        // contains sorted numbers according to current
        // digit
        for (i = 0; i < n; i++)
            arr[i] = output[i];
    }

    // The main function to that sorts arr[] of
    // size n using Radix Sort
    static void radixsort(int arr[], int n)
    {
        // Find the maximum number to know number of digits
        int m = getMax(arr, n);

        // Do counting sort for every digit. Note that
        // instead of passing digit number, exp is passed.
        // exp is 10^i where i is current digit number
        for (int exp = 1; m / exp > 0; exp *= 10)
            countSort(arr, n, exp);
    }

    // A utility function to print an array
    static void print(int arr[], int n)
    {
        for (int i = 0; i < n; i++)
            System.out.print(arr[i] + " ");
    }

    // Main driver method
    public static void main(String[] args)
    {
        int arr[] = {${array}};
        int n = arr.length;

        // Function Call
        radixsort(arr, n);
        print(arr, n);
    }
}

`
}
function getBucketSortPython(array) {
    return `
def insertion_sort(bucket):
    for i in range(1, len(bucket)):
        key = bucket[i]
        j = i - 1
        while j >= 0 and bucket[j] > key:
            bucket[j + 1] = bucket[j]
            j -= 1
        bucket[j + 1] = key

def bucket_sort(arr):
    n = len(arr)
    buckets = [[] for _ in range(n)]

    # Put array elements in different buckets
    for num in arr:
        bi = int(n * num)
        buckets[bi].append(num)

    # Sort individual buckets using insertion sort
    for bucket in buckets:
        insertion_sort(bucket)

    # Concatenate all buckets into arr[]
    index = 0
    for bucket in buckets:
        for num in bucket:
            arr[index] = num
            index += 1

arr = [${array}]
bucket_sort(arr)
print("Sorted array is:")
print(" ".join(map(str, arr)))

`
}
function getBucketSortC(array) {
    return `
#include <stdio.h>  
int getMax(int a[], int n) // function to get maximum element from the given array  
{  
  int max = a[0];  
  for (int i = 1; i < n; i++)  
    if (a[i] > max)  
      max = a[i];  
  return max;  
}  
void bucket(int a[], int n) // function to implement bucket sort  
{  
  int max = getMax(a, n); //max is the maximum element of array  
  int bucket[max], i;  
  for (int i = 0; i <= max; i++)  
  {  
    bucket[i] = 0;  
  }  
  for (int i = 0; i < n; i++)  
  {  
    bucket[a[i]]++;  
  }  
  for (int i = 0, j = 0; i <= max; i++)  
  {  
    while (bucket[i] > 0)  
    {  
      a[j++] = i;  
      bucket[i]--;  
    }  
  }  
}  
void printArr(int a[], int n) // function to print array elements  
{  
  for (int i = 0; i < n; ++i)  
    printf("%d  ", a[i]);  
}  
int main()  
{  
  int a[] = {${array}};  
  int n = sizeof(a) / sizeof(a[0]); // n is the size of array  
  printf("Before sorting array elements are - \n");  
  printArr(a, n);  
  bucket(a, n);  
  printf("\nAfter sorting array elements are - \n");  
  printArr(a, n);  
}  

`
}
function getBucketSortCpp(array) {
    return `
  #include <iostream>
  #include <vector>
  using namespace std;
  
  // Insertion sort function to sort individual buckets
  void insertionSort(vector<float>& bucket) {
      for (int i = 1; i < bucket.size(); ++i) {
          float key = bucket[i];
          int j = i - 1;
          while (j >= 0 && bucket[j] > key) {
              bucket[j + 1] = bucket[j];
              j--;
          }
          bucket[j + 1] = key;
      }
  }
  
  // Function to sort arr[] of size n using bucket sort
  void bucketSort(float arr[], int n) {
      // 1) Create n empty buckets
      vector<float> b[n];
  
      // 2) Put array elements in different buckets
      for (int i = 0; i < n; i++) {
          int bi = n * arr[i];
          b[bi].push_back(arr[i]);
      }
  
      // 3) Sort individual buckets using insertion sort
      for (int i = 0; i < n; i++) {
          insertionSort(b[i]);
      }
  
      // 4) Concatenate all buckets into arr[]
      int index = 0;
      for (int i = 0; i < n; i++) {
          for (int j = 0; j < b[i].size(); j++) {
              arr[index++] = b[i][j];
          }
      }
  }
  
  // Driver program to test above function
  int main() {
      float arr[] = {${array}};
      int n = sizeof(arr) / sizeof(arr[0]);
      bucketSort(arr, n);
  
      cout << "Sorted array is \n";
      for (int i = 0; i < n; i++) {
          cout << arr[i] << " ";
      }
      return 0;
  }  
`
}
function getBucketSortJava(array) {
    return `
import java.util.ArrayList;
import java.util.List;

public class Main {
    // Insertion sort function to sort individual buckets
    public static void insertionSort(List<Float> bucket) {
        for (int i = 1; i < bucket.size(); ++i) {
            float key = bucket.get(i);
            int j = i - 1;
            while (j >= 0 && bucket.get(j) > key) {
                bucket.set(j + 1, bucket.get(j));
                j--;
            }
            bucket.set(j + 1, key);
        }
    }

    // Function to sort arr[] of size n using bucket sort
    public static void bucketSort(float[] arr) {
        int n = arr.length;

        // 1) Create n empty buckets
        List<Float>[] buckets = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            buckets[i] = new ArrayList<>();
        }

        // 2) Put array elements in different buckets
        for (int i = 0; i < n; i++) {
            int bi = (int) (n * arr[i]);
            buckets[bi].add(arr[i]);
        }

        // 3) Sort individual buckets using insertion sort
        for (int i = 0; i < n; i++) {
            insertionSort(buckets[i]);
        }

        // 4) Concatenate all buckets into arr[]
        int index = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < buckets[i].size(); j++) {
                arr[index++] = buckets[i].get(j);
            }
        }
    }

    // Driver program to test above function
    public static void main(String[] args) {
        float[] arr = {${array}};
        bucketSort(arr);

        System.out.println("Sorted array is:");
        for (float num : arr) {
            System.out.print(num + " ");
        }
    }
}

`
}

const pythonBtn = document.getElementById('python-btn');
const javaBtn = document.getElementById('java-btn');
const cppBtn = document.getElementById('cpp-btn');
const cBtn = document.getElementById('c-btn');
var codeSection = document.querySelector('.code-section');

function getArray() {
    array = []
    for (let x of numbers.value.split(',')) {
        array.push(x);
    }
    return array;
}

function addPythonCode(array) {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.classList.add('language-python');

    if (selectAlgorithm.value === 'count-sort') {
        code.textContent = getCountSortPython(array);
    }
    else if (selectAlgorithm.value === 'radix-sort') {
        code.textContent = getRadixSortPython(array);
    }
    else if (selectAlgorithm.value === 'bucket-sort') {
        code.textContent = getBucketSortPython(array);

    }

    pre.appendChild(code);
    codeSection.innerHTML = '';
    codeSection.append(pre);
    Prism.highlightElement(code);
}
function addCCode(array) {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.classList.add('language-clike');

    if (selectAlgorithm.value === 'count-sort') {
        code.textContent = getCountSortC(array);
    }
    else if (selectAlgorithm.value === 'radix-sort') {
        code.textContent = getRadixSortC(array);
    }
    else if (selectAlgorithm.value === 'bucket-sort') {
        code.textContent = getBucketSortC(array);


    }
    pre.appendChild(code);

    codeSection.innerHTML = '';

    codeSection.append(pre);
    Prism.highlightElement(code);
}
function addCppCode(array) {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.classList.add('language-clike');

    if (selectAlgorithm.value === 'count-sort') {
        code.textContent = getCountSortCpp(array);
    }
    else if (selectAlgorithm.value === 'radix-sort') {
        code.textContent = getRadixSortCpp(array);
    }
    else if (selectAlgorithm.value === 'bucket-sort') {
        code.textContent = getBucketSortCpp(array);

    }

    pre.appendChild(code);
    codeSection.innerHTML = '';

    codeSection.append(pre);
    Prism.highlightElement(code);
}
function addJavaCode(array) {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.classList.add('language-java');

    if (selectAlgorithm.value === 'count-sort') {
        code.textContent = getCountSortJava(array);
    }
    else if (selectAlgorithm.value === 'radix-sort') {
        code.textContent = getRadixSortJava(array);
    }
    else if (selectAlgorithm.value === 'bucket-sort') {
        code.textContent = getBucketSortJava(array);

    }

    pre.appendChild(code);
    codeSection.innerHTML = '';

    codeSection.append(pre);
    Prism.highlightElement(code);
}

pythonBtn.addEventListener('click', () => {
    activeBtn("python");
    addPythonCode(getArray());
})
cBtn.addEventListener('click', () => {
    activeBtn("c");
    addCCode(getArray());
})
cppBtn.addEventListener('click', () => {
    activeBtn("cpp");
    addCppCode(getArray());

})
javaBtn.addEventListener('click', () => {
    activeBtn("java");
    addJavaCode(getArray());

})

function activeBtn(str) {
    deactivateAllBtn();

    if (str === "python") {
        pythonBtn.classList.add("active-icon");
    }
    else if (str === "c") {
        cBtn.classList.add("active-icon");
    }
    else if (str === "cpp") {
        cppBtn.classList.add("active-icon");
    }
    else if (str === "java") {
        javaBtn.classList.add("active-icon");
    }
}

function deactivateAllBtn() {
    pythonBtn.classList.remove("active-icon");
    cBtn.classList.remove("active-icon");
    cppBtn.classList.remove("active-icon");
    javaBtn.classList.remove("active-icon");
}

function initCodeSection() {
    activeBtn("c");
    addCCode(getArray());
}

function copyCode(button) {
    // Find the <code> element inside the same .code-section as the button
    const codeBlock = document.querySelector('.code-section');
    // Copy the code to the clipboard
    navigator.clipboard.writeText(codeBlock.textContent)
        .then(() => {
            // Show feedback to the user
            button.classList.add('active-copy-icon');
            showToast("Code Copied", "info", TOAST_ANIMATION_TIME);
            setTimeout(() => {
                button.classList.remove('active-copy-icon');
            }, 2000);
        })
        .catch((err) => {
            console.error("Failed to copy: ", err);
        });
}
