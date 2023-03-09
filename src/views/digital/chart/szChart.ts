import * as echarts from 'echarts';
let timer: any;

export function loadChart(myChart: echarts.ECharts, chartData: number[][], dateDate: string[]) {
  let i = 0;
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      textStyle: {
        fontSize: 14,
        color: '#fff',
      },
      selectedMode: 'single',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#305541',
          },
        },
        axisLabel: {
          color: '#fff',
        },
        data: dateDate,
      },
    ],
    yAxis: [
      {
        name: '',
        nameTextStyle: {
          color: '#fff',
        },
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#305541',
          },
        },
        axisLabel: {
          color: '#fff',
        },
        min: (value: any) => {
          return value.min - 0.5 > 0 ? value.min : value.min;
        },
      },
    ],
    series: [
      {
        name: '水温',
        type: 'line',
        areaStyle: {},
        data: chartData[4],
      },
      {
        name: 'pH值',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData[0],
      },
      {
        name: '溶解氧',
        type: 'line',
        areaStyle: {},
        data: chartData[2],
      },
      {
        name: '电导率',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData[1],
      },
      {
        name: '浊度',
        type: 'line',
        areaStyle: {},
        data: chartData[3],
      },
    ],
  });

  myChart.on('legendselectchanged', (obj: any) => {
    //  legend点击事件
    let option: any = myChart.getOption();
    switch (obj.name) {
      case '水温':
        option.yAxis[0].name = '℃';
        i = 0;
        break;
      case 'pH值':
        option.yAxis[0].name = '';
        i = 1;
        break;
      case '溶解氧':
        option.yAxis[0].name = 'mg/L';
        i = 2;
        break;
      case '电导率':
        option.yAxis[0].name = 'ms/cm';
        i = 3;
        break;
      case '浊度':
        option.yAxis[0].name = 'NTU';
        i = 4;
        break;
    }
    myChart.setOption(option);
  });

  timer = setInterval(() => {
    i++;
    if (i === 5) {
      i = 0;
    }
    let obj = {
      0: '水温',
      1: 'pH值',
      2: '溶解氧',
      3: '电导率',
      4: '浊度',
    };
    myChart.dispatchAction({ type: 'legendToggleSelect', name: obj[i as keyof typeof obj] });
  }, 5000);
}

export function clearTimer() {
  clearInterval(timer);
}
