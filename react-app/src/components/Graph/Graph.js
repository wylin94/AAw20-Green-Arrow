import './Graph.css'
import { Line } from 'react-chartjs-2';

// const data = {
//   labels: ['1', '2', '3', '4', '5', '6'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       fill: false,
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgba(255, 99, 132, 0.2)',
//     },
//   ],
// };

// const options = {
//   scales: {
//     y: {
//       beginAtZero: true
//     }
//   }
// };


const data = {
  datasets: [
    {
			type: 'line',
			data: [{x: 10, y: 20}, {x: 15, y: 10}, {x: 12, y: 4}],
      backgroundColor: 'rgb(255, 255, 255)',
      borderColor: '#5AC53B',
			borderWidth: 2,
			pointBorderColor: 'rgb(0, 0, 0, 0)',
			pointBackgroundColor: 'rgb(0, 0, 0, 0)',
			pointHoverBackgroundColor: '#5AC53B',
			pointHoverBorderColor: '#000000',
			pointHoverBorderWidth: 4,
			pointHoverRadius: 6,

    },
  ],
};

const options = {
	legend: {
		display: false
	},
	tooltips: {
		mode: 'index',
		intersect: false
	},
  scales: {
    y: {
			gridLines: {
				display: false
			},
			ticks: {
				display: false
			}
    },
		x: {
			ticks: {
				display: false
			}
    }
  }
	// scales: {
	// 	yAxes: [{
	// 		gridLines: {
	// 			display: false,
	// 		},
	// 		ticks: {
	// 			display: false
	// 		}
	// 	}]
	// }

};

function Graph() {
	return(
		<>
			<Line data={data} options={options} />
		</>
	)
}

export default Graph;