/*     
    Role && functionality: 
    In this javascript file we make the darkmode button working. When the user
    clicks the darkmode button on the top right the color of the background of
    of the page and the color of the text flips. This is stored in localstorage,
    so if the user leaves the pages and comes back, his/her preferences are 
    stored.  
*/


let darkMode = localStorage.getItem('darkMode'); 

const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add('darkmode');
  // 2. Update darkMode in localStorage
  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('darkmode');
  // 2. Update darkMode in localStorage 
  localStorage.setItem('darkMode', null);
}
 

if (darkMode === 'enabled') {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {

  darkMode = localStorage.getItem('darkMode'); 
  

  if (darkMode !== 'enabled') {
    enableDarkMode();

  //if it has been enabled, turn it off  
  } else {  
    disableDarkMode(); 
  }
});