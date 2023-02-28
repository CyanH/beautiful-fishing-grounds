import * as echarts from 'echarts';

export function znyz(myChart: echarts.ECharts) {
  const chartData = [
    {
      value: 7,
      name: '正常',
    },
    {
      value: 1,
      name: '报警',
    },
  ];
  const colorList = [
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#189dff',
      },
      {
        offset: 1,
        color: '#189dff',
      },
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#f7752e',
      },
      {
        offset: 1,
        color: '#f7752e',
      },
    ]),
  ];
  const sum = chartData.reduce((per, cur) => per + cur.value, 0);
  const gap = (1 * sum) / 100;
  const pieData1 = [];
  const pieData2 = [];
  const gapData = {
    name: '',
    value: gap,
    itemStyle: {
      color: 'transparent',
    },
  };
  for (let i = 0; i < chartData.length; i++) {
    pieData1.push({
      ...chartData[i],
      itemStyle: {
        borderRadius: 100,
        shadowColor: '#2a2a34',
        shadowBlur: 5,
        shadowOffsetY: 0,
        shadowOffsetX: 0,
        borderColor: '#2a2a34',
        borderWidth: 2,
      },
    });
    pieData1.push(gapData);

    pieData2.push({
      ...chartData[i],
      itemStyle: {
        borderRadius: 10,
        color: colorList[i],
        opacity: 0.1,
        shadowColor: '#000',
        shadowBlur: 1,
        shadowOffsetY: 5,
        shadowOffsetX: 0,
      },
    });
    pieData2.push(gapData);
  }
  myChart.setOption({
    legend: {
      show: false,
    },

    color: colorList,

    series: [
      {
        type: 'pie',
        z: 3,
        roundCap: true,
        radius: ['80%', '61%'],
        center: ['50%', '50%'],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: pieData1,
      },
      {
        type: 'pie',
        z: 2,
        radius: ['75%', '65%'],
        center: ['50%', '50%'],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        silent: true,
        data: pieData2,
      },
      // 内圆
      {
        type: 'pie',
        radius: ['0', '50%'],
        center: ['50%', '50%'],
        z: 4,
        hoverAnimation: false,
        data: [
          {
            value: 5,
            itemStyle: {
              normal: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 2, [
                  {
                    offset: 0,
                    color: '#050d18',
                  },
                  {
                    offset: 1,
                    color: '#286aff',
                  },
                ]),
              },
            },
            label: {
              normal: {
                rich: {
                  a: {
                    color: '#ffffff',
                    align: 'center',
                    fontSize: 11,
                  },
                  b: {
                    color: '#ffffff',
                    align: 'center',
                    fontSize: 16,
                  },
                },
                formatter: function (params: any) {
                  return '{a|' + '在线率' + '}\n\n' + '{b|' + '100%' + '}';
                },
                position: 'center',
                show: true,
              },
            },
            labelLine: {
              show: false,
            },
          },
        ],
      },
      {
        name: '外边框',
        type: 'pie',
        z: 5,
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        center: ['50%', '50%'],
        radius: ['50%', '50%'],
        label: {
          normal: {
            show: false,
          },
        },
        data: [
          {
            value: 1,
            name: '',
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: 'rgba(193,216,255,0.08)',
              },
            },
          },
        ],
      },
    ],
  });
}
