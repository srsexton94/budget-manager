$(() => {
  chrome.storage.sync.get('limit', budget => {
    $('#limit').val(budget.limit)
  })

  // sets limit to user entered value & closes options window
  $('#save-limit').on('click', () => {
    let limit = $('#limit').val()
    if (limit) {
      chrome.storage.sync.set({ 'limit': limit }, function() {
        close()
      })
    }
  })

  // sets total back to 0
  $('#reset-total').on('click', () => {
    chrome.storage.sync.set({ 'total': 0 })
  })

})
