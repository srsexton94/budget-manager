$(() => {
  // loads the stored total & limit upon doc load
  chrome.storage.sync.get(['total', 'limit'], budget => {
    $('#total').text(budget.total)
    $('#limit').text(budget.limit)
  })

  // increments `Total Spending` with User entered amount
  $('#spendAmount').on('click', () => {
    chrome.storage.sync.get('total', budget => {
      let newTotal = 0
      if (budget.total) {
        newTotal += parseFloat(budget.total)
      }
      const amount = $('#amount').val()
      if (amount) {
        newTotal += parseFloat(amount)
      }
      chrome.storage.sync.set({ 'total': newTotal })
      $('#total').text(newTotal)
      $('#amount').val('')
    })
  })
})
