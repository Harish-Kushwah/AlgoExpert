const bodySection = document.querySelector('.body-section');
const contentSection = document.querySelector(".content-section");

function createHeaderSection(data) {
    const headerSection = document.querySelector('.header-section');
    // Add Title and Subtitle
    const title = document.createElement('h4');
    title.textContent = data.title;
    title.classList.add("algo-title");
    headerSection.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.textContent = data.subtitle;
    subtitle.classList.add(".algo-des");
    headerSection.appendChild(subtitle);
}
function addSection(data) {
    data.sections.forEach(section => {
        const sectionDiv = document.createElement('section');

        // Section Heading
        const heading = document.createElement('p');
        heading.textContent = section.heading;
        heading.classList.add("content-title");
        sectionDiv.appendChild(heading);


        // Section Content
        if (section.content) {
            const content = document.createElement('p');
            content.innerHTML += section.content;
            sectionDiv.appendChild(content);
        }

        // Steps (ordered list)
        if (section.steps) {
            const ol = document.createElement('ol');
            section.steps.forEach(step => {
                const li = document.createElement('li');
                li.innerHTML += step;
                ol.appendChild(li);
            });
            sectionDiv.appendChild(ol);
        }

        // List (unordered list)
        if (section.list) {
            const ul = document.createElement('ul');
            section.list.forEach(item => {
                const li = document.createElement('li');
                li.textContent += item;
                ul.appendChild(li);
            });
            sectionDiv.appendChild(ul);
        }
        contentSection.appendChild(sectionDiv);
    });
};
function createComplexityAnalysis(data) {
    // Create the main div container
    const rightContainer = document.querySelector('.l-right-container');

    // Create the ul element for the list
    const list = document.createElement('ul');
    list.classList.add('list');

    // Create the first list item for Time Complexity
    const timeComplexity = document.createElement('li');
    timeComplexity.classList.add('li');
    timeComplexity.textContent = 'Time Complexity:';

    // Create the inner ul for Time Complexity details
    const timeComplexityDetails = document.createElement('ul');

    const bestCase = document.createElement('li');
    bestCase.classList.add('li-content');
    bestCase.textContent = `Best Case:${data.complexity.timeComplexity.bestCase}`;
    timeComplexityDetails.appendChild(bestCase);

    const avgCase = document.createElement('li');
    avgCase.classList.add('li-content');
    avgCase.textContent = `Average Case: ${data.complexity.timeComplexity.averageCase}`;
    timeComplexityDetails.appendChild(avgCase);

    const worstCase = document.createElement('li');
    worstCase.classList.add('li-content');
    worstCase.textContent = `Worst Case: ${data.complexity.timeComplexity.worstCase}`;
    timeComplexityDetails.appendChild(worstCase);

    // Append the inner ul to the Time Complexity li
    timeComplexity.appendChild(timeComplexityDetails);
    list.appendChild(timeComplexity);

    // Create the second list item for Space Complexity
    const spaceComplexity = document.createElement('li');
    spaceComplexity.classList.add('li');
    spaceComplexity.textContent = `Space Complexity: ${data.complexity.spaceComplexity}`;
    list.appendChild(spaceComplexity);

    // Append the list to the main container
    rightContainer.appendChild(list);
    // bodySection.appendChild(rightContainer);
}


function createAlgorithmSection(algorithms) {
    const algoSection = document.querySelector(".algo-section")
   
    algorithms.forEach((algo,index)=>{

         // Create the div element with the class 'algorithm'
    const algorithmTitleDiv = document.createElement('div');
    algorithmTitleDiv.classList.add('algorithm');
    algorithmTitleDiv.id = index;
    algorithmTitleDiv.addEventListener("click",()=>{
        showPage(algorithmTitleDiv.id);
        algorithmTitleDiv.classList.add("active-bar");
    })
    

    // Create the paragraph element
    const paragraph = document.createElement('p');
    paragraph.textContent = algo.title // Set the text content

    // Append the paragraph to the div
    algorithmTitleDiv.appendChild(paragraph);

    // Return the created div
    algoSection.appendChild(algorithmTitleDiv);

    })
}
function addClassToActiveBar(index){
    const bars = document.querySelectorAll(".algorithm");
    for(let bar of bars){
        bar.classList.remove("active-bar");
    }
    document.getElementById(index).classList.add("active-bar");
}
function showPage(index=0){
    // bodySection.innerHTML = '';
    clearHtml();
    createHeaderSection(data[index]);
    addSection(data[index]);
    createComplexityAnalysis(data[index]);
    new ComplexityChart(contentSection,data[index]).paintChart();
    addClassToActiveBar(index);

}
createAlgorithmSection(data);
showPage(0);

function clearHtml(){
    document.querySelector(".content-section").innerHTML = "";
    document.querySelector(".header-section").innerHTML = "";
    document.querySelector(".l-right-container").innerHTML = "";
   
}



