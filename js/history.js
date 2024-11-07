function getHistoryHTML(history) {
  return ` <div class="history-field" id=${history.id} onclick="loadHistoryData('${history.id}')">
          <div class="left-section">
            <div class="status-icons">
               <img src="./asets/${history.status_icon}" alt="" width="16px" height="16px"/>
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
              <img src="./asets/delete.png" alt="" width="30px" height="30px" class="delete-icon"/>
           </div>
          </div>
        </div>`;
}
const historyContainer = document.getElementById('history-container');

function addHistoryList(allHistory) {
  historyContainer.innerHTML = '';

  allHistory.forEach(history => {
    historyContainer.innerHTML += getHistoryHTML(history);

  });
  updateStorage(allHistory);
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

function initStorage() {
  if (localStorage.getItem("history") === undefined) {
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
