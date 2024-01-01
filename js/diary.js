let c_event = document.querySelector(".c-event")
let event_1 = document.querySelector(".event_1")
let event_2 = document.querySelector(".event_2")
let btn_down = document.querySelector(".icon_down")
let btn_up = document.querySelector(".icon_up")
let diary = document.querySelector(".c-card_big")

let e1 = document.querySelector(".g_social.g_inside").children
let e2 = document.querySelector(".g_interest.g_inside").children
let e3 = document.querySelector(".g_sleep.g_inside").children
let e4 = document.querySelector(".g_food.g_inside").children
let e5 = document.querySelector(".g_food_2.g_inside").children
let e = [e1, e2, e3, e4, e5]
let arr_event = []

let btn_finish = document.querySelector(".finish")
let date = document.querySelector(".date")
let time = document.querySelector(".time")
let index = tmp_diary.length - 1
var count = 0
let date_store = "";

eventColor()
getTime()

// diary.addEventListener("change", () => {

// })

btn_down.addEventListener("click", () => {
  c_event.classList.add("is-active")
  event_1.style = "display: none"
  event_2.style = "display: flex"
  event_2.classList.remove("up")
  event_2.classList.add("down")
})

btn_up.addEventListener("click", () => {
  event_2.classList.remove("down")
  event_2.classList.add("up")
  setTimeout(function () {
    c_event.classList.remove("is-active")
    event_1.style = "display: flex"
    event_2.style = "display: none"
  }, 1000)
})



btn_finish.addEventListener("click", () => {
  const a = diary.value
  const icon_emo = localStorage.getItem('icon_emo');
  const arr_words = localStorage.getItem('arr_words');
  const form = new FormData();
  form.append("date", date_store);
  form.append("feeling", icon_emo);
  form.append("mood", arr_words);
  form.append("activity", arr_event);
  form.append("social", a);
  console.log(typeof (form.get('feeling')));

  $.ajax({
    url: 'https://jybluega.com/mood-backend/diarylist',
    type: 'POST',
    // contentType: 'multipart/form-data',
    headers: { "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtX2lkIjoiNSIsIm1fYWNjb3VudCI6InRpbmEwNzA3IiwibV9uYW1lIjoidiJ9.3N4nX0QmIwluxE01FkL_yIBbkMmjp09rTN1bmpnGTp8' },
    data: form,
    processData: false,  // 必須設置為 false，以防止 jQuery 將 data 轉換為字符串
    contentType: false,  // 必須設置為 false，以防止 jQuery 設置 Content-Type
    success: function (data) {
      window.location.assign("index.html");
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    }
  });
})

function eventColor() {
  e.forEach(element => {
    for (let i = 0; i < element.length; i++) {
      element[i].addEventListener("click", () => {
        switch (element[i].style.color) {
          case "rgb(0, 0, 0)":
            element[i].style = "color: rgba(#000, 0.5)"
            const j = arr_event.indexOf(element[i].children[1].textContent)
            delete arr_event[j]
            arr_event.sort()
            arr_event.pop()
            console.log(arr_event)
            break
          default:
            element[i].style = "color: #000"
            arr_event.push(element[i].children[1].textContent)
            console.log(arr_event)
            break
        }
      })
    }
  })
}

function getTime() {
  let d = new Date();
  const dateText = (d.getMonth() + 1) + "月" + d.getDate() + "日";
  date_store = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  // date_store = d;

  console.log(date_store);
  // const timeText = d.getHours() + ":" + d.getMinutes();
  const hour = d.getHours()
  const min = d.getMinutes()
  const hourString = (hour < 10) ? ('0' + hour) : ('' + hour)
  const minString = (min < 10) ? ('0' + min) : ('' + min)
  date.textContent = dateText;
  time.innerHTML = hourString + ':' + minString;
  // console.log(time);  
}