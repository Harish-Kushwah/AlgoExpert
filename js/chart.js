const ctx = document.getElementById('complexityChart').getContext('2d');

var chart ;
function paintChart(array) {

    if(chart){
        chart.destroy();
    }
    const size = array.length;
    function getArrayData(){
        var data = []
        for(let i = 10; i<100;i+=10){
            data.push(i);
        }
        return data;
    }
    // Example data
    const inputSizes = getArrayData()
    const timeComplexity = inputSizes.map(n => n * Math.log(n)); // O(n log n) approximation
    const spaceComplexity = inputSizes.map(n => n); // O(n) approximation

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: inputSizes,
            datasets: [
                {
                    label: 'Time Complexity (O(n log n))',
                    data: timeComplexity,
                    borderColor: 'blue',
                    borderWidth: 1,
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Space Complexity (O(n))',
                    data: spaceComplexity,
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                      },
                },
                title: {
                    display: true,
                    text: 'Radix Sort Time and Space Complexity'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Input Size (n)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Operations'
                    },
                    beginAtZero: true
                }
            }
        }
    });
    
}
