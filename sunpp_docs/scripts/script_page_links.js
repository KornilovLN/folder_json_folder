document.addEventListener('DOMContentLoaded', function() {
  const pageLinks = document.querySelectorAll('a');

  if (pageLinks) {
    pageLinks.forEach(link => {
      link.addEventListener('click', handlePageLinkClick);
    });
  }

  function handlePageLinkClick(event) {
    const target = event.target;
    if (target.tagName === 'A') {
      event.preventDefault();

      const url = target.getAttribute('href');
      if (url) {
        loadContent(url);
      }
    }
  }

  function loadContent(url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.querySelector('body').innerHTML = data;
      })
      .catch(error => {
        console.error('Ошибка загрузки содержимого:', error);
      });
  }
});
