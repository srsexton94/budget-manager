$(() => {
  // loads the stored total & limit upon doc load
  chrome.storage.sync.get(['total', 'limit'], budget => {
    $('#total').text(budget.total)
    $('#limit').text(budget.limit)
  })

  // increments `Total Spending` with User entered amount
  $('#spendAmount').on('click', () => {
    chrome.storage.sync.get(['total', 'limit'], budget => {
      let newTotal = 0
      if (budget.total) {
        newTotal += parseFloat(budget.total)
      }

      const amount = $('#amount').val()
      if (amount) {
        newTotal += parseFloat(amount)
      }

      chrome.storage.sync.set({ 'total': newTotal }, () => {
        if (amount && newTotal >= budget.limit) {
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
      $('#total').text(newTotal)
      $('#amount').val('')
    })
  })
})
