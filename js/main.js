let btn_add = document.querySelector(".btn_add")
let card_mood = document.querySelector(".c-mood")


// let btn_analyze = document.querySelector(".btn_analyze")

// btn_analyze.addEventListener("click", () => {
//   console.log("analyze page")
//   window.location.assign("analyze.html")
// })

// let data_diary = []
var tmp_diary = [{}]
if (JSON.parse(localStorage.getItem('diary')) != null) {
  tmp_diary = JSON.parse(localStorage.getItem('diary'))
  // tmp_diary[0]["date"] = "12月15日"
  // tmp_diary[1]["date"] = "12月18日"
  // tmp_diary[2]["date"] = "12月30日"
  // tmp_diary[3]["date"] = "1月2日"
  // localStorage.setItem('diary', JSON.stringify(tmp_diary))
}

btn_add.addEventListener("click", () => {
  console.log("click");
  card_mood.style = "display: flex"
  btn_add.innerHTML = "下一個"
  btn_add.classList.add('btn_next')

  //將"添加"的按鈕改為"下一個"的按鈕
  //之後增加"點擊後跳轉到日記頁面"的功能
  let btn_next = document.querySelector(".btn_next")
  btn_next.addEventListener("click", () => {
    console.log("diary page")
    localStorage.setItem('icon_emo', icon_emo)//(key,value)
    localStorage.setItem('arr_words', arr_words)//(key,value)
    window.location.assign("diary.html")
  })
})