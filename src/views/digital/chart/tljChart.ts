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
        name: 'kg',
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
        name: '投料量',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData[0],
      },
      {
        name: '投料次数',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData[1],
      },
      {
        name: '投料时长',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData[2],
      },
    ],
  });

  myChart.on('legendselectchanged', (obj: any) => {
    //  legend点击事件
    let option: any = myChart.getOption();
    switch (obj.name) {
      case '投料量':
        option.yAxis[0].name = 'kg';
        break;
      case '投料次数':
        option.yAxis[0].name = '次';
        break;
      case '投料时长':
        option.yAxis[0].name = 'h';
        break;
    }
    myChart.setOption(option);
  });
}
