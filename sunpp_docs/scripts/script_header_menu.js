document.addEventListener('DOMContentLoaded', function() {
  const headerLinks = document.querySelectorAll('header nav ul li a');
  const footerLinks = document.querySelectorAll('footer nav ul li a');
  const mainContent = document.querySelector('.main-content-container .main-content');

  if (headerLinks) {
      headerLinks.forEach(link => {
          link.addEventListener('click', handleHeaderLinkClick);
      });
  }

  if (footerLinks) {
      footerLinks.forEach(link => {
          link.addEventListener('click', handleFooterLinkClick);
      });
  }

  function handleHeaderLinkClick(event) {
      event.preventDefault();

      const url = event.currentTarget.getAttribute('data-url');
      if (url) {
          loadContent(url);
      }
  }

  function handleFooterLinkClick(event) {
      event.preventDefault();

      const url = event.currentTarget.getAttribute('data-url');
      if (url) {
          loadContent(url);
      }
  }

  function loadContent(url) {
      fetch(url)
          .then(response => response.text())
          .then(data => {
              mainContent.innerHTML = data;
          })
          .catch(error => {
              console.error('Ошибка загрузки содержимого:', error);
          });
  }
});