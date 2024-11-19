class ComplexityChart {
    constructor(parent, data) {
        this.initChartHtml(parent);
        this.ctx = document.getElementById('complexityChart').getContext('2d');
        this.chart = false;
        this.data = data;
    }

    paintChart(n = 10, k = 10, timeComplexityFunc = this.data.timeComplexityFunc, spaceComplexityFunc = this.data.spaceComplexityFunc) {
        // Get the context of the canvas

        if (this.chart) {
            this.chart.destroy();
        }

        const min = 100; // Minimum value for the random range
        const max = 1000; // Maximum value for the random range

        // Generate an array of n random numbers between min and max
        const inputSizes = Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min).sort();

        // Sample data for different input sizes
        const timeComplexity = inputSizes.map(timeComplexityFunc);
        const spaceComplexity = inputSizes.map(spaceComplexityFunc);

        // Create the Chart.js line chart with two datasets
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: inputSizes,
                datasets: [
                    {
                        label: `Time Complexity (${this.data.complexity.timeComplexity.worstCase})`,
                        data: timeComplexity,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        tension: 0.3,
                        pointRadius: 5,
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    },
                    {
                        label: `Space Complexity (${this.data.complexity.spaceComplexity})`,
                        data: spaceComplexity,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        tension: 0.3,
                        pointRadius: 5,
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    }
                ]
            },
            options: {
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
                            text: 'Complexity'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        })
    };

    initChartHtml(parent) {
        // Create the section element
        const section = document.createElement('section');
        section.classList.add('chart-section');

        // Create the title paragraph
        const title = document.createElement('p');
        title.classList.add('content-title');
        title.textContent = 'Visualize complexity chart';
        section.appendChild(title);

        // Create the div for the input group
        const group = document.createElement('div');
        group.classList.add('group');

        // Create the first input for "n"
        const inputN = document.createElement('input');
        inputN.type = 'text';
        inputN.classList.add('inputs');
        inputN.name = 'n';
        inputN.id = 'total-size';
        inputN.placeholder = 'Enter n';
        group.appendChild(inputN);

        // Create the second input for "k"
        const inputK = document.createElement('input');
        inputK.type = 'text';
        inputK.classList.add('inputs');
        inputK.name = 'k';
        inputK.id = 'max-no';
        inputK.placeholder = 'Enter k';
        group.appendChild(inputK);

        // Create the Plot Chart button
        const plotButton = document.createElement('button');
        plotButton.classList.add('mbtn', 'reset', 'generate', 'inputs', 'plot-chart');
        plotButton.id = 'plot-chart';
        plotButton.textContent = 'Plot Chart';
        group.appendChild(plotButton);

        plotButton.addEventListener("click", () => {
            const n = document.getElementById("total-size").value;
            const k = document.getElementById("max-no").value;

            if (n.length == 0) {
                alert("Enter Value of n");
            }
            else if (k.length == 0) {
                alert("Enter Value of k");

            }
            else {
                this.paintChart(n, k, this.data.timeComplexityFunc, this.data.spaceComplexityFunc);
            }

        });

        // Append the group to the section
        section.appendChild(group);

        // Create the chart container
        const chartContainer = document.createElement('div');
        chartContainer.classList.add('chart-container');

        // Create the canvas for the chart
        const canvas = document.createElement('canvas');
        canvas.id = 'complexityChart';
        chartContainer.appendChild(canvas);

        // Append the chart container to the section
        section.appendChild(chartContainer);

        parent.appendChild(section);
    }
}
