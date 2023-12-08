var ctx = document.getElementById('myChart').getContext('2d')
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['12/15', '12/18', '12/30', '1/2', '1/3'],
    datasets: [{
      label: '心情折線圖',
      data: [5, 2, 1, 3, 2],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
    }]
  },
})



// document.querySelector(".average").innerHTML = ()
// const data = {
//   '12/15': 5,
//   '12/18': 2,
//   '12/30': 1,
//   '1/2': 3,
//   '1/3': 2
// }

// const myChart = new Chart(ctx, {
// 	type: 'bar',
// 	data: {
// 		labels: frameworks,
// 		datasets: [
// 			{
// 				label: 'Number of GitHub Stars',
// 				data: stars,
// 			},
// 		],
// 	},
// })

