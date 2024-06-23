import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#00D9E9', '#FF66C3', '#FFD666', '#FF4666', '#FF7666'];

const BarChart = () => {
  const [chartData, setChartData] = useState({
    series: [{
      data: [21, 22, 10, 28, 16, 21, 13, 30, 50 , 54, 44 , 34]
    }],
    options: {
      chart: {
        height: 450,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          }
        },
        toolbar: {
          show: false,
        },

        
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: 25,
          distributed: true,
          borderRadius:20,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          }
        }
      }
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
