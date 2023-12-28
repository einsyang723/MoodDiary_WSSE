header();
$(document).ready(function () {
  $('#list').click(function () {
    list();
  })

  $('#day').click(function () {
    day();
  })

  $('#week').click(function () {
    week();
  })

  $('#month').click(function () {
    console.log(898);
    month();
  })
})

function header() {
  fetch('../header.html')
    .then(response => response.text())
    .then(html => {
      document.querySelector('.l-header').innerHTML = html;
    })
    .catch(error => console.error('Error fetching header.html:', error));
  ;
}

function list() {
  fetch('../list.html')
    .then(response => response.text())
    .then(html => {
      document.querySelector('.list').innerHTML = html;
      document.querySelector('.daily').innerHTML = "";
      document.querySelector('.weekly').innerHTML = "";
    })
    .catch(error => console.error('Error fetching list.html:', error));
  ;
}

function day() {
  console.log(456);
  fetch('../day.html')
    .then(response => response.text())
    .then(html => {
      document.querySelector('.daily').innerHTML = html;
      document.querySelector('.list').innerHTML = "";
      document.querySelector('.weekly').innerHTML = "";
      document.querySelector('.monthly').innerHTML = "";
    })
    .catch(error => console.error('Error fetching list.html:', error));
  ;
}

function week() {
  console.log(666);
  fetch('../week.html')
    .then(response => response.text())
    .then(html => {
      document.querySelector('.weekly').innerHTML = html;
      document.querySelector('.list').innerHTML = "";
      document.querySelector('.daily').innerHTML = "";
    })
    .catch(error => console.error('Error fetching list.html:', error));
  ;
}

function month() {
  console.log(777);
  fetch('../month.html')
    .then(response => response.text())
    .then(html => {
      document.querySelector('.monthly').innerHTML = html;
      document.querySelector('.list').innerHTML = "";
      document.querySelector('.daily').innerHTML = "";
      document.querySelector('.weekly').innerHTML = html;
    })
    .catch(error => console.error('Error fetching list.html:', error));
  ;
}