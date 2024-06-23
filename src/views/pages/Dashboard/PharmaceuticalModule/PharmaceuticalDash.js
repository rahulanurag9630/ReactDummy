import { Box, Grid, Typography, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';
const useStyle = makeStyles(() => ({
  mainDashBox: {
    "& .dashCard": {
      background: '#fff',
      padding: '10px',
      borderRadius: '10px',
      gap: '15px'
    },
    '& h5': {
      fontSize: '22px',
    },
  },
}));
function PharmaceuticalDash() {
  const classes = useStyle();
  const series = [
    {
      name: "Product",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
    },
    {
      name: "Order",
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
    },

  ]
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false,
      },
    },


    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [5, 5, 5],
      curve: 'smooth',
      dashArray: [0, 0, 0]
    },
    title: {
      //   text: 'Page Statistics',
      align: 'left'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      tooltipHoverFormatter: function (val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
      }
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },

    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val;
            }
          }
        }
      ]
    },
    grid: {
      borderColor: '#f1f1f1',
    },
    colors: ['#00A3FF', '#F09'],
  });
  return (

    <Box className={classes.mainDashBox}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box className="dashCard displayStart">
            <img src="images/totalPolicy.png" alt="img" />
            <Box>
              <Typography variant='h5'>Total Products</Typography>
              <Typography variant='h3'>03</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box className="dashCard displayStart">
            <img src="images/totalPolicy.png" alt="img" />
            <Box>
              <Typography variant='h5'>Total Orders Received</Typography>
              <Typography variant='h3'>03</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box className="dashCard displayStart">
            <img src="images/totalPolicy.png" alt="img" />
            <Box>
              <Typography variant='h5'>Total Delivered Orders</Typography>
              <Typography variant='h3'>03</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box className="dashCard">
          <Typography variant="h5">Product Vs Orders</Typography>
            <ReactApexChart options={options} series={series} type="line" height={350} />
          </Box>
        </Grid>
      </Grid>
    </Box>

  )
}

export default PharmaceuticalDash