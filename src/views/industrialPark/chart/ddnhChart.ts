import * as echarts from 'echarts';

export function loadChart(myChart: echarts.ECharts, data: any) {
  myChart.setOption({
    grid: {
      show: false,
      top: 10,
      bottom: 10,
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      show: false,
    },
    yAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    series: [
      {
        type: 'effectScatter',
        rippleEffect: {
          number: 2,
          period: 3,
          scale: 1.7,
        },
        symbol: 'circle',
        label: {
          normal: {
            show: true,
            formatter: '{b}',
            textStyle: {
              fontSize: 14,
              lineHeight: 20,
            },
            rich: {
              name: {
                color: '#fff',
                fontSize: 12,
                fontWeight: '400',
                align: 'center',
              },
              value: {
                color: '#fff',
                fontSize: 18,
                fontFamily: 'DIN',
                align: 'center',
              },
              unit: {
                color: '#fff',
                fontSize: 12,
                align: 'center',
              },
            },
          },
        },
        data: [
          {
            name: `{value|${data.jmxNumber}}{unit|户}\n{name|紧密型}`,
            value: [10, 65],
            symbolSize: 75,
            itemStyle: {
              normal: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  {
                    offset: 0,
                    color: 'rgba(255, 216, 0, 0.1)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255, 216, 0, 0.3)',
                  },
                  {
                    offset: 1,
                    color: '#FFD800',
                  },
                ]),
              },
            },
          },
          {
            name: `{value|${data.allNumber}}{unit|户}\n{name|带动农户}`,
            value: [55, 60],
            symbolSize: 100,
            itemStyle: {
              normal: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  {
                    offset: 0,
                    color: 'rgba(0, 255, 0, 0.1)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(0, 255, 0, 0.3)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 255, 0, 1)',
                  },
                ]),
              },
            },
          },
          {
            name: `{value|${data.ssxNumber}}{unit|户}\n{name|松散型}`,
            value: [95, 75],
            symbolSize: 75,
            itemStyle: {
              normal: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  {
                    offset: 0,
                    color: 'rgba(0, 240, 255, 0.1)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(0, 240, 255, 0.3)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 240, 255, 1)',
                  },
                ]),
              },
            },
          },
          {
            name: `{value|${data.noMoneyNum}}{unit|户}\n{name|带动贫困人口}`,
            value: [28, 20],
            symbolSize: 75,
            itemStyle: {
              normal: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  {
                    offset: 0,
                    color: 'rgba(67, 164, 255, 0.1)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(67, 164, 255, 0.3)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(67, 164, 255, 1)',
                  },
                ]),
              },
            },
          },
          {
            name: `{value|${data.fsxNumber}}{unit|户}\n{name|辐射型}`,
            value: [80, 23],
            data: 5,
            symbolSize: 62,
            label: { normal: { textStyle: { fontSize: 14, color: '#1E5597' } } },
            itemStyle: {
              normal: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  {
                    offset: 0,
                    color: 'rgba(255, 67, 240, 0.1)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255, 67, 240, 0.3)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 67, 240, 1)',
                  },
                ]),
              },
            },
          },
        ],
      },
    ],
  });
}
