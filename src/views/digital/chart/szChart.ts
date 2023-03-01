import * as echarts from 'echarts';

export function loadChart(myChart: echarts.ECharts, chartData: number[][], dateDate: string[]) {
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
        name: 'pH值',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData[0],
      },
      {
        name: '电导率',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData[1],
      },
      {
        name: '溶解氧',
        type: 'line',
        areaStyle: {},
        data: chartData[2],
      },
      {
        name: '浊度',
        type: 'line',
        areaStyle: {},
        data: chartData[3],
      },
      {
        name: '水温',
        type: 'line',
        areaStyle: {},
        data: chartData[4],
      },
    ],
  });

  myChart.on('legendselectchanged', (obj: any) => {
    //  legend点击事件
    let option: any = myChart.getOption();
    switch (obj.name) {
      case 'pH值':
        option.yAxis[0].name = '';
        break;
      case '电导率':
        option.yAxis[0].name = 'ms/cm';
        break;
      case '溶解氧':
        option.yAxis[0].name = 'mg/L';
        break;
      case '浊度':
        option.yAxis[0].name = 'NTU';
        break;
      case '水温':
        option.yAxis[0].name = '℃';
        break;
    }
    myChart.setOption(option);
  });
}
