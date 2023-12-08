let btn_dis = document.querySelector(".disappointed")
let btn_sad = document.querySelector(".sad")
let btn_bored = document.querySelector(".bored")
let btn_smile = document.querySelector(".smile")
let btn_happy = document.querySelector(".happy")
let mood_1 = document.querySelector(".mood_1")
let mood_2 = document.querySelector(".mood_2")
let emo_photo = document.querySelector(".emo_photo")
let emo_words = document.querySelector(".emo_words")

let c1 = document.querySelector(".words_1").children
let c2 = document.querySelector(".words_2").children
let c3 = document.querySelector(".words_3").children
let arr_words = []
let c = [c1, c2, c3]

let icon_emo = 0

changeColor()

btn_dis.addEventListener("click", () => {
  emoWords()
  emo_photo.innerHTML = '<img src="img/emotion/disappointed.png">'
  emo_words.scrollTo(250, 0)
  // console.log(c[2].innerHTML)
})

btn_sad.addEventListener("click", () => {
  emoWords()
  emo_photo.innerHTML = '<img src="img/emotion/sad.png">'
  emo_words.scrollTo(120, 0)
  icon_emo = 1
})

btn_bored.addEventListener("click", () => {
  emoWords()
  emo_photo.innerHTML = '<img src="img/emotion/bored.png">'
  emo_words.scrollTo(90, 0)
  icon_emo = 2
})

btn_smile.addEventListener("click", () => {
  emoWords()
  emo_photo.innerHTML = '<img src="img/emotion/smile.png">'
  emo_words.scrollTo(50, 0)
  icon_emo = 3
})

btn_happy.addEventListener("click", () => {
  emoWords()
  emo_photo.innerHTML = '<img src="img/emotion/happy.png">'
  icon_emo = 4
})

function emoWords() {
  mood_1.style = "display: none"
  mood_2.style = "display: flex"
  // mood_2.classList.add('is_active')
}

function changeColor() {
  c.forEach(element => {
    for (let i = 0; i < element.length; i++) {
      element[i].addEventListener("click", () => {
        //判斷情緒文字是什麼顏色，點擊能選取或取消
        switch (element[i].style.color) {
          case "rgb(0, 0, 0)":
            element[i].style = "color: rgba(#000, 0.5)"
            const j = arr_words.indexOf(element[i].innerHTML)
            delete arr_words[j]
            arr_words.sort()
            arr_words.pop()
            console.log(arr_words)
            break
          default:
            element[i].style = "color: #000"
            arr_words.push(element[i].innerHTML)
            console.log(arr_words)
            break
        }
      })
    }
  });
}