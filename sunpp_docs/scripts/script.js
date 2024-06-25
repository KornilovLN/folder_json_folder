function loadContent(url) {
    console.log('Attempting to load content from:', url);
    fetch(url)
        .then(response => {
            console.log('Response status:', response.status);
            return response.text();
        })
        .then(data => {
            console.log('Received data length:', data.length);
            console.log('First 100 characters:', data.substring(0, 100));
            document.getElementById('content').innerHTML = data;
            console.log('Content updated');
        })
        .catch(error => {
            console.error('Error in loadContent:', error);
        });
}