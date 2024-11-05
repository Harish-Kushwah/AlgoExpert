function getHistoryHTML(history){
    return ` <div class="history-field" id=${history.id}>
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


function addHistoryList(allHistory){
    historyContainer.innerHTML = '';
    allHistory.forEach(history => {
        historyContainer.innerHTML+=getHistoryHTML(history);
    
    });
}

function addHistory(history){
    allHistory.push(history);   
    addHistoryList(allHistory); 
}

addHistoryList(allHistory);

function removeHistory(id){
   
    allHistory = allHistory.filter((history)=>{
       return history.id !=id;
    })
    addHistoryList(allHistory);
}
