$(() => {
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
