import * as echarts from 'echarts';
let timer: any;

export function loadChart(myChart: echarts.ECharts, array_all: any, time_data: any, name: any) {
  let i = 0;
  myChart.setOption({
    grid: {
      top: '22%',
      bottom: 8,
      left: 15,
      right: 15,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: 20,
      right: 0,
      textStyle: {
        color: '#fff',
      },
    },
    xAxis: [
      {
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(40, 146, 255, 0.2)',
          },
        },
        axisLabel: {
          color: 'rgba(255,255,255,0.8)',
          rotate: 45,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        data: time_data,
      },
    ],
    yAxis: {
      name: name,
      nameTextStyle: {
        color: 'rgba(255,255,255,0.8)',
      },
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(40, 146, 255, 0.2)',
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(40, 146, 255, 0.2)',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#fff',
        },
      },
      axisTick: {
        show: false,
      },
    },
    series: array_all,
  });

  timer = setInterval(() => {
    i++;
    if (i === 6) {
      i = 0;
    }

    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: i,
    });
  }, 3000);
}

export function clearTimer() {
  clearInterval(timer);
}
