// header();
let calendarEvent = { "events": [] };
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
$(document).ready(function () {
  const token = getCookie("jwtToken") ?? null;
  console.log(token);
  $.ajax({
    url: 'https://jybluega.com/mood-backend/diarylist',
    type: 'GET',
    contentType: 'application/json',
    headers: { "Authorization": "Bearer "+ token},
    // data: JSON.stringify({ 'sentance': sentance }),
    success: function (data) {
      diaryData = data.data.diaryData;
      calendarEvent = diaryList(diaryData);
      console.log(calendarEvent["events"]);
      fullCalendar(calendarEvent["events"]);
    },
    error: function (xhr, status, error) {
      console.log(error);
    }
  });
})


function diaryList(diaryData) {
  diaryData.forEach(element => {
    let image = '';
    console.log(element.d_feeling);
    switch (element.d_feeling) {
      case '1':
        image = "../img/emotion/sad.png";
        break;
      case '2':
        image = "../img/emotion/disappointed.png";
        break;
      case '3':
        image = "../img/emotion/bored.png";
        break;
      case '4':
        image = "../img/emotion/smile.png";
        break;
      case '5':
        image = "../img/emotion/happy.png";
        break;
    }
    calendarEvent["events"].push({ "title": element.d_mood, "feeling": element.d_feeling, "imageurl": image, "id": element.d_id, "mid": element.m_id, "start": element.d_date, "createTime": element.created_at });
    if (element.d_social != null && element.d_social != "") {
      calendarEvent["events"].push({ "title": element.d_social, "start": element.d_date + "T00:00:00", end: element.d_date + "T01:00:00" });
    }
    // "url": "../diaryShow.html",
  });
  return calendarEvent;
}

function fullCalendar() {
  $('#calendar').fullCalendar({
    themeSystem: 'bootstrap4',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listMonth'
    },
    bootstrapFontAwesome: {
      month: 'fa-table',
      agendaWeek: 'fa-columns',
      agendaDay: 'fa-calendar',
      listMonth: 'fa-list',
      prev: 'fa-chevron-left',
      next: 'fa-chevron-right',
      prevYear: 'fa-angle-double-left',
      nextYear: 'fa-angle-double-right'
    },
    // slotDuration: '24:00',
    editable: true,
    navLinks: true, // can click day/week names to navigate views
    // weekNumbers: true,
    eventLimit: false, // allow "more" link when too many events
    displayEventTime: false,
    events: calendarEvent["events"],
    eventRender: function (event, eventElement) {
      if (event.imageurl) {
        eventElement.find("div.fc-content").prepend("<img src='" + event.imageurl + "' width='16' height='16'>");
        eventElement.find("td.fc-list-item-title").prepend("<img src='" + event.imageurl + "' width='16' height='16'>");
      }
    },
    eventClick: function (info) {

      // info.jsEvent.preventDefault(); // don't let the browser navigate


      console.log(info);
      console.log(info.createTime);
      const dateTimeString = info.createTime;
      const dateObject = new Date(dateTimeString);
      console.log(dateObject.getDate());
      localStorage.setItem('dateTimeString', dateTimeString)//(key,value);
      localStorage.setItem('diaryID', info.id)//(key,value);
      localStorage.setItem('diaryMID', info.mid)//(key,value);
      localStorage.setItem('icon_emo', info.feeling)//(key,value);
      localStorage.setItem('arr_words', info.title)//(key,value);
      var myWindow = window.open("", "_self", "background-color: #eee");
      myWindow.document.write('<iframe width="100%" height="100%" src = "../diaryShow.html" > </iframe >');

    }
  });

};


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
  fetch('../calendar.html')
    .then(response => response.text())
    .then(html => {
      document.querySelector('.list').innerHTML = "";
      document.querySelector('.daily').innerHTML = "";
      document.querySelector('.weekly').innerHTML = "";
      document.querySelector('.monthly').innerHTML = html;
      console.log(html);
    })
    .catch(error => console.error('Error fetching list.html:', error));
  ;
}