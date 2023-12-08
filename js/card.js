let card = document.querySelector(".card_1")
let month = document.querySelector(".month")
let diary_1 = JSON.parse(localStorage.getItem('diary'))
let i_card = 1

for (let i = 0; i <= diary_1.length - 1; i++) {

  console.log(i)
  console.log(diary_1)
  let path_icon_emo = ""
  console.log(JSON.stringify(diary_1[i]["icon_emo"]))
  switch (diary_1[i]["icon_emo"]) {
    case "0":
      path_icon_emo = "./img/emotion/disappointed.png"
      break
    case "1":
      path_icon_emo = "./img/emotion/sad.png"
      break
    case "2":
      path_icon_emo = "./img/emotion/bored.png"
      break
    case "3":
      path_icon_emo = "./img/emotion/smile.png"
      break
    case "4":
      path_icon_emo = "./img/emotion/happy.png"
      break
  }


  // getData()
  let tmp = ".card_" + i_card
  console.log(tmp.substring(1))

  const icon = document.createElement('img')
  // 先用 JS 寫好要增加的內容
  icon.src = path_icon_emo
  // 動態掛一個 class 屬性
  // icon.setAttribute('class', 'blue')
  // 用 appendChild() 把上面寫好的子節點掛在既有的 h1 下面，新增的內容會依序排列在後面，不會被洗掉
  document.querySelector(`.emo_icon${tmp}`).appendChild(icon)
  // const word = document.createElement('div')
  document.querySelector(`.arr_word${tmp}`).innerHTML = JSON.stringify(diary_1[i]["arr_words"])
  console.log(JSON.stringify(diary_1[i]["arr_words"]))
  const str = diary_1[i]["date"]
  const j = str.indexOf("月")
  console.log(str.substring(0, j + 1))
  document.querySelector(`.month${tmp}`).innerHTML = str.substring(0, j + 1)
  document.querySelector(`.date${tmp}`).innerHTML = str.substring(j + 1)
  document.querySelector(`.arr_event${tmp}`).innerHTML = JSON.stringify(diary_1[i]["arr_event"])
  document.querySelector(`.diary${tmp}`).innerHTML = JSON.stringify(diary_1[i]["diary"])
  document.querySelector(".month").innerHTML = str.substring(0, j + 1)
  document.querySelector(`.time${tmp}`).innerHTML = diary_1[i]["time"]

  i_card++
}