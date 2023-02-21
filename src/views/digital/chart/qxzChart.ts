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
        name: '℃',
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
        name: '温度',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData[0],
      },
      {
        name: '湿度',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData[1],
      },
      {
        name: '雨量',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData[2],
      },
      {
        name: '风速',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData[3],
      },
      {
        name: '光照',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData[4],
      },
    ],
  });

  myChart.on('legendselectchanged', (obj: any) => {
    //  legend点击事件
    let option: any = myChart.getOption();
    switch (obj.name) {
      case '温度':
        option.yAxis[0].name = '℃';
        break;
      case '湿度':
        option.yAxis[0].name = '%';
        break;
      case '雨量':
        option.yAxis[0].name = 'mm';
        break;
      case '风速':
        option.yAxis[0].name = 'm/s';
        break;
      case '光照':
        option.yAxis[0].name = 'lux';
        break;
    }
    myChart.setOption(option);
  });
}
