function getHistoryHTML(history) {
  return ` <div class="history-field" id=${history.id} onclick="loadHistoryData('${history.id}')">
          <div class="left-section">
            <div class="status-icons">
               <img src="./assets/${history.status_icon}" alt="" width="16px" height="16px"/>
            </div>
          </div>
          <div class="middle-section">
            <div class="number">
              <p>${history.numbers}</p>
            </div>
            <div class="des">
              <div class="algorithm">
                <p>${history.algorithm}</p>
              </div>
              <div class="time">
                <p>${history.date}</p>
              </div>
            </div>
          </div>
          <div class="right-section">
            <div class="status-icons" onclick="removeHistory('${history.id}')">
              <img src="./assets/delete.png" alt="" width="30px" height="30px" class="delete-icon"/>
           </div>
          </div>
        </div>`;
}
const historyContainer = document.getElementById('history-container');
const clearHistory = document.getElementById("clearHistory");


function addHistoryList(allHistory) {
  historyContainer.innerHTML = '';

  if (allHistory.length > 0) {
    allHistory.forEach(history => {
      historyContainer.innerHTML += getHistoryHTML(history);

    });
    updateStorage(allHistory);

    clearHistory.style.display = 'block';
  }
  else {
    // historyContainer.innerHTML = "No History";
    clearHistory.style.display = 'none';
    const img = document.createElement("img");
    img.src = "./assets/no_history.gif";
    img.classList.add("history-gif");
    historyContainer.appendChild(img);

    const info = document.createElement("h5");
    info.textContent = "Oops! No Visualization History";
    info.style.textAlign = 'center';
    historyContainer.appendChild(info);

    const div = document.createElement("div");
    div.classList.add("start-visualization-section");
    const anchor = document.createElement("a");
    anchor.href = "/AlgoExpert/playground.html?page=playground"
    div.appendChild(anchor);
    anchor.classList.add("start-visualization")
    anchor.textContent = "Start Visualization"
    historyContainer.appendChild(div);

  }
}

function addHistory(history) {
  let allHistory = getAllHistory();
  allHistory.push(history);
  addHistoryList(allHistory);
  updateStorage(allHistory);

}

function removeHistory(id) {
  let allHistory = getAllHistory()
  allHistory = allHistory.filter((history) => {
    return history.id != id;
  })
  addHistoryList(allHistory);
  updateStorage(allHistory);
}

function clearAllHistory() {
  let allHistory = getAllHistory()
  if (allHistory.length > 0) {
    localStorage.setItem("history", JSON.stringify([]));
    addHistoryList(getAllHistory());
  }
}

function initStorage() {
  if (localStorage.getItem("history") == null || localStorage.getItem("history") === undefined) {
    localStorage.setItem("history", JSON.stringify([]));
  }
}
function updateStorage(allHistory) {
  localStorage.setItem("history", JSON.stringify(allHistory));
}
function getAllHistory() {
  return JSON.parse(localStorage.getItem("history"));
}

initStorage();
addHistoryList(getAllHistory());

clearHistory.addEventListener('click', clearAllHistory);

function updateIcon(id){
  let allHistory = getAllHistory()
  allHistory.map((history) => {
    if(history.id == id){
      history.status_icon = 'check.png';
    }
  })
  addHistoryList(allHistory);
  updateStorage(allHistory);
}
