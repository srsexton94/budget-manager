const contextMenuItem = {
  "id": "spendMoney",
  "title": "SpendMoney",
  "contexts": ["selection"]
}

chrome.contextMenus.create(contextMenuItem)

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId === "spendMoney" && clickData.selectionText) {
    if (!isNaN(clickData.selectionText)) {
      chrome.storage.sync.get(['total', 'limit'], budget => {
        let newTotal = 0
        if (budget.total) {
          newTotal += parseFloat(budget.total)
        }
        newTotal += parseFloat(clickData.selectionText)
        chrome.storage.sync.set({ 'total': newTotal }, () => {
          if (newTotal >= budget.limit) {
            let notifOptions = {
              type: 'basic',
              iconUrl: 'images/calc_48.png',
              title: 'Limit reached!',
              message: "Uh oh! Looks like you've reached your limit!"
            }
            // uses `notifOptions` object to create the chrome notification
            chrome.notifications.create('limitNotif', notifOptions)
          }
        })
      })
    }
  }
})
