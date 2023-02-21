import * as echarts from 'echarts';

export function loadLineChart(myChart: echarts.ECharts, year: number[], cyyAvg: number[], qqAvg: number[]) {
  myChart.setOption({
    legend: {
      x: 'right',
      y: '6%',
      textStyle: {
        color: '#fff',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0, 255, 233,0)',
              },
              {
                offset: 0.5,
                color: 'rgba(255, 255, 255,1)',
              },
              {
                offset: 1,
                color: 'rgba(0, 255, 233,0)',
              },
            ],
            global: false,
          },
        },
      },
    },
    grid: {
      top: '18%',
      left: '15%',
      right: '5%',
      bottom: '15%',
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
          color: '#fff',
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        data: year,
      },
    ],
    yAxis: {
      name: '单位(元)',

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
      max: (value: any) => {
        return Math.round((value.max + 1000) / 1000) * 1000;
      },
      min: (value: any) => {
        return Math.round((value.min - 1000) / 1000) * 1000;
      },
    },
    series: [
      {
        name: '产业园',
        type: 'line',
        smooth: true, //是否平滑
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          normal: {
            color: '#11FCFF',
          },
        },
        itemStyle: {
          color: '#11FCFF',
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(17, 252, 255,0.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(17, 252, 255,0)',
                },
              ],
              false
            ),
          },
        },
        data: cyyAvg,
      },
      {
        name: '全区',
        type: 'line',
        smooth: true, //是否平滑
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          normal: {
            color: '#FC9010',
          },
        },
        itemStyle: {
          color: '#FC9010',
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(252, 144, 16,0.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(252, 144, 16,0)',
                },
              ],
              false
            ),
          },
        },
        data: qqAvg,
      },
    ],
  });
}
