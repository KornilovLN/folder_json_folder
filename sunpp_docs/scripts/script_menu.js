document.addEventListener('DOMContentLoaded', function() {
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const headerLinks = document.querySelectorAll('header nav ul li a');
    const pageLinks = document.querySelectorAll('.page-content a');
    const mainContent = document.querySelector('.main-content-container .main-content');
  
    // Обработчик кликов для бокового меню
    if (sidebarMenu) {
      sidebarMenu.addEventListener('click', handleMenuClick);
    }
  
    // Обработчик кликов для ссылок в шапке
    if (headerLinks) {
      headerLinks.forEach(link => {
        link.addEventListener('click', handleLinkClick);
      });
    }
  
    // Обработчик кликов для текстовых ссылок на странице
    if (pageLinks) {
      pageLinks.forEach(link => {
        link.addEventListener('click', handleLinkClick);
      });
    }
  
    function handleMenuClick(event) {
      event.preventDefault();
  
      const target = event.target;
      if (target.tagName === 'A') {
        const url = target.getAttribute('data-url');
        if (url) {
          loadContent(url);
        }
  
        toggleSubmenu(target);
      }
    }
  
    function handleLinkClick(event) {
      event.preventDefault();
  
      const url = event.currentTarget.getAttribute('href') || event.currentTarget.getAttribute('data-url');
      if (url) {
        if (url.startsWith('#')) {
          scrollToSection(url);
        } else {
          loadContent(url);
        }
      }
    }
  
    function toggleSubmenu(menuItem) {
      const submenu = menuItem.nextElementSibling;
      if (submenu && submenu.classList.contains('submenu')) {
        submenu.classList.toggle('open');
      }
  
      const childSubmenu = menuItem.querySelector('.submenu');
      if (childSubmenu) {
        childSubmenu.classList.toggle('open');
      }
    }
  
    function scrollToSection(sectionId) {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
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