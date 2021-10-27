import React from 'react';
import { Line } from 'react-chartjs-2';


const chart = (props) => {

  const dataHigh = props.dataMax;
  const dataLow = props.dataMin;


  const data = {
    labels: ['', '', '', '', '', '',''],
    datasets: [
      {
          label: 'Low',
          data: dataLow,
          fill: false,
          backgroundColor: 'rgb(54, 162, 235)',
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          borderColor: 'rgba(54, 162, 235, 0.9)',
          yAxisID: 'y-axis-1',
          borderWidth: 3
        },
      {
        label: 'High',
        data: dataHigh,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        borderColor: 'rgba(255, 99, 132, 0.9)',
        yAxisID: 'y-axis-1',
        borderWidth: 3
      },
    ],
  };
  
  const options = { 
      maintainAspectRatio: false,
      plugins: {
          legend: {
            display: false
          }
        }
  }

  return ( 
    <Line data={data} options={options} style={{height: 120}} />
   );
}
 
export default chart;