chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchSafeSport') {
    fetch(request.url, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        console.log('Successfully fetched SafeSport data');
        sendResponse({ status: 'success', html: data, uscfId: request.uscfId });
      })
      .catch(error => {
        console.error('Error fetching SafeSport data:', error);
        sendResponse({ status: 'error', error: error.message });
      });
    return true;
  }
});