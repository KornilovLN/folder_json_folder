/*
const sidebarMenu = document.querySelector('.sidebar-menu');
const mainContent = document.querySelector('.main-content-container .main-content');
const headerLinks = document.querySelectorAll('.container nav ul li a');

// Добавляем обработчик кликов для бокового меню
if (sidebarMenu) {
  sidebarMenu.addEventListener('click', handleMenuClick);
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

function handleHeaderLinkClick(event) {
  event.preventDefault();

  //const url = event.target.getAttribute('data-url');
  const url = event.currentTarget.getAttribute('data-url');
  if (url) {
    loadContent(url);
  }
}

function toggleSubmenu(menuItem) {
  const parentLi = menuItem.parentElement;
  const submenu = parentLi.querySelector('.submenu');

  if (submenu) {
    submenu.classList.toggle('open');
  }
}

function loadContent(url) {
  console.log("Загрузка контента по URL:", url);
  fetch(url)
    .then(response => response.text())
    .then(data => {
      mainContent.innerHTML = data;
    })
    .catch(error => {
      console.error('Ошибка загрузки содержимого:', error);
    });
}
*/

/*
document.addEventListener('DOMContentLoaded', function() {
  const sidebarMenu = document.querySelector('.sidebar-menu');
  const mainContent = document.querySelector('.main-content-container .main-content');


  // Добавляем обработчик кликов для бокового меню
  if (sidebarMenu) {
    sidebarMenu.addEventListener('click', handleMenuClick);
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

  function toggleSubmenu(menuItem) {
    const parentLi = menuItem.parentElement;
    const submenu = parentLi.querySelector('.submenu');
    if (submenu) {
      submenu.classList.toggle('open');
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
*/

const sidebarMenu = document.querySelector('.sidebar-menu');
const mainContent = document.querySelector('.main-content-container .main-content');

sidebarMenu.addEventListener('click', handleMenuClick);

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