let diary = document.querySelector(".c-card_big");

let btn_finish = document.getElementById("finish");
let btn_delete = document.getElementById("delete");
let date = document.querySelector(".date");
let time = document.querySelector(".time");

let date_store = "";
const dateTimeString = localStorage.getItem('dateTimeString');
console.log(dateTimeString);

const diaryID = localStorage.getItem('diaryID');
const diaryMID = localStorage.getItem('diaryMID');
showTime();
showDiary();

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

btn_finish.addEventListener("click", () => {
  const token = getCookie("jwtToken") ?? null;
  const a = diary.value
  const icon_emo = localStorage.getItem('icon_emo');
  const arr_words = localStorage.getItem('arr_words');
  const form = new FormData();
  form.append("date", date_store);
  form.append("feeling", icon_emo);
  form.append("mood", arr_words);
  form.append("social", a);
  $.ajax({
    url: 'https://jybluega.com/mood-backend/diarylist/' + diaryID,
    type: 'PUT',
    // contentType: 'multipart/form-data',
    headers: { "Authorization": "Bearer "+ token},
    processData: false,  // 必須設置為 false，以防止 jQuery 將 data 轉換為字符串
    contentType: false,  // 必須設置為 false，以防止 jQuery 設置 Content-Type
    data: JSON.stringify(Object.fromEntries(form)),
    success: function (data) {
      window.parent.location.reload();
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    }
  });
})

btn_delete.addEventListener("click", () => {
  const token = getCookie("jwtToken") ?? null;
  $.ajax({
    url: 'https://jybluega.com/mood-backend/diarylist/' + diaryID,
    type: 'DELETE',
    // contentType: 'multipart/form-data',
    headers: { "Authorization": "Bearer "+ token},
    processData: false,  // 必須設置為 false，以防止 jQuery 將 data 轉換為字符串
    contentType: false,  // 必須設置為 false，以防止 jQuery 設置 Content-Type
    success: function (data) {
      window.parent.location.reload();
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    }
  });
})

function showTime() {
  const dateObject = new Date(dateTimeString);
  const dateObject2 = new Date(dateString);
  
  const dateText = (dateObject2.getMonth() + 1) + "月" + dateObject2.getDate() + "日";
  console.log(dateText);
  const hour = dateObject.getHours()
  const min = dateObject.getMinutes()
  const hourString = (hour < 10) ? ('0' + hour) : ('' + hour)
  const minString = (min < 10) ? ('0' + min) : ('' + min)
  date.textContent = dateText;
  time.innerHTML = hourString + ':' + minString;
  // console.log(time);  
}

function showDiary() {
  const token = getCookie("jwtToken") ?? null;
  $.ajax({
    url: 'https://jybluega.com/mood-backend/diarylist/' + diaryID,
    type: 'GET',
    // contentType: 'multipart/form-data',
    headers: { "Authorization": "Bearer "+ token},
    processData: false,  // 必須設置為 false，以防止 jQuery 將 data 轉換為字符串
    contentType: false,  // 必須設置為 false，以防止 jQuery 設置 Content-Type
    success: function (data) {
      diary.value = data.data.diaryData.d_social;
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    }
  });
}
