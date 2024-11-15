const data = [
    {
        "title": "Count Sort",
        "subtitle": "Linear Sorting Algorithm",
        "sections": [
            {
                "heading": "Introduction",
                "content": "Count Sort is a non-comparative sorting algorithm suitable for sorting integers or objects that can be converted into integers. It works by counting the occurrences of each distinct element in the input, then calculating the positions of each element in the sorted output."
            },
            {
                "heading": "How Count Sort Works",
                "steps": [
                    "Find the maximum element in the array.",
                    "Initialize a count array with a size equal to the maximum element + 1.",
                    "Count the occurrences of each element in the input array and store them in the count array.",
                    "Modify the count array by adding the previous counts to get cumulative counts, which indicate the final position of each element.",
                    "Build the sorted array by placing each element at its corresponding position based on the cumulative counts."
                ]
            },

            {
                "heading": "Advantages",
                "list": [
                    "Efficient for sorting integers with a limited range.",
                    "Outperforms comparison-based sorting algorithms for narrow ranges.",
                    "Stable and works well for objects that can be sorted by integer keys."
                ]
            },
            {
                "heading": "Disadvantages",
                "list": [
                    "Not suitable for large ranges of integers due to memory usage.",
                    "Not a comparison-based sort, so it doesn't work for non-integer data directly."
                ]
            },
            {
                "heading": "Example",
                "content": "Consider sorting the array <code> [4, 2, 2, 8, 3, 3, 1] </code>.",
                "steps": [
                    "Count occurrences: <code> [0, 1, 2, 2, 1, 0, 0, 0, 1]</code>",
                    "Cumulative count:<code> [0, 1, 3, 5, 6, 6, 6, 6, 7]</code>",
                    "Place elements in sorted order based on cumulative count.",
                    "Final sorted array: <code>[1, 2, 2, 3, 3, 4, 8]</code>"
                ]
            },
        ],
        "complexity": {
            "heading": "Complexity Analysis",
            "timeComplexity": {
                "bestCase": "O(n + k)",
                "averageCase": "O(n + k)",
                "worstCase": "O(n + k)"
            },
            "spaceComplexity": "O(n + k)"
        },
        timeComplexityFunc : (n,k)=>{ return n+k},
        spaceComplexityFunc : (n,k)=>{ return n+k},
    },
    {
        "title": "Radix Sort",
        "subtitle": "Efficient Non-Comparative Sorting Algorithm",
        "sections": [
            {
                "heading": "Introduction",
                "content": "Radix Sort is a non-comparative sorting algorithm that works by distributing elements into buckets based on their individual digits, starting from the least significant digit to the most significant digit."
            },
            {
                "heading": "How Radix Sort Works",
                "steps": [
                    "Determine the maximum number in the array to identify the number of digits.",
                    "Sort the array digit by digit, starting from the least significant digit to the most significant digit.",
                    "Use a stable sorting algorithm like Count Sort to sort the digits at each significant place.",
                    "Repeat the process for all digits until the array is fully sorted."
                ]
            },
            {
                "heading": "Advantages",
                "list": [
                    "Efficient for sorting large datasets with fixed-length numbers.",
                    "Stable sorting algorithm that preserves the relative order of elements with equal keys.",
                    "Performs well on datasets with small key ranges."
                ]
            },
            {
                "heading": "Disadvantages",
                "list": [
                    "Not suitable for sorting non-integer data directly.",
                    "Requires additional memory for bucket storage.",
                    "Dependent on a stable intermediate sorting algorithm like Count Sort."
                ]
            },
            {
                "heading": "Example",
                "content": "Consider sorting the array <code>[170, 45, 75, 90, 802, 24, 2, 66]</code>.",
                "steps": [
                    "Sort by the least significant digit: <code>[170, 90, 802, 2, 24, 45, 75, 66]</code>",
                    "Sort by the next digit: <code>[802, 2, 24, 45, 66, 170, 75, 90]</code>",
                    "Sort by the most significant digit: <code>[2, 24, 45, 66, 75, 90, 170, 802]</code>",
                    "Final sorted array: <code>[2, 24, 45, 66, 75, 90, 170, 802]</code>"
                ]
            },
        ],
        "complexity": {
            "heading": "Complexity Analysis",
            "timeComplexity": {
                "bestCase": "O(nk)",
                "averageCase": "O(nk)",
                "worstCase": "O(nk)"
            },
            "spaceComplexity": "O(n + k)"
        },
        timeComplexityFunc : (n,k)=>{ return n*k},
        spaceComplexityFunc : (n,k)=>{ return n+k},
    },
    {
        "title": "Bucket Sort",
        "subtitle": "Distribution-Based Sorting Algorithm",
        "sections": [
            {
                "heading": "Introduction",
                "content": "Bucket Sort is a distribution-based sorting algorithm that divides the input array into buckets. Each bucket is sorted individually using another sorting algorithm or recursively applying Bucket Sort."
            },
            {
                "heading": "How Bucket Sort Works",
                "steps": [
                    "Determine the range of input data and divide it into several buckets.",
                    "Distribute elements from the array into their respective buckets based on their range.",
                    "Sort each bucket individually using another sorting algorithm or recursively using Bucket Sort.",
                    "Concatenate the sorted buckets to get the final sorted array."
                ]
            },
            {
                "heading": "Advantages",
                "list": [
                    "Efficient for sorting datasets that are uniformly distributed.",
                    "Can achieve linear time complexity in the best case when buckets are evenly distributed.",
                    "Highly parallelizable due to independent sorting of buckets."
                ]
            },
            {
                "heading": "Disadvantages",
                "list": [
                    "Performance depends heavily on the distribution of the input data.",
                    "Requires additional memory for bucket storage.",
                    "Not suitable for datasets with large key ranges and uneven distributions."
                ]
            },
            {
                "heading": "Example",
                "content": "Consider sorting the array <code>[0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51]</code>.",
                "steps": [
                    "Distribute elements into buckets: <code>[[0.23, 0.25], [0.32], [0.42], [0.47, 0.51, 0.52]]</code>",
                    "Sort each bucket: <code>[[0.23, 0.25], [0.32], [0.42], [0.47, 0.51, 0.52]]</code>",
                    "Concatenate sorted buckets: <code>[0.23, 0.25, 0.32, 0.42, 0.47, 0.51, 0.52]</code>",
                    "Final sorted array: <code>[0.23, 0.25, 0.32, 0.42, 0.47, 0.51, 0.52]</code>"
                ]
            },
        ],
        "complexity": {
            "heading": "Complexity Analysis",
            "timeComplexity": {
                "bestCase": "O(n + k)",
                "averageCase": "O(n + k)",
                "worstCase": "O(n²)"
            },
            "spaceComplexity": "O(n + k)"
        },
        timeComplexityFunc : (n,k)=>{ return n*n},
        spaceComplexityFunc : (n,k)=>{ return n+k},
    }
]
