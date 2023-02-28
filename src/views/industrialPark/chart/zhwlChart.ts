import * as echarts from 'echarts';
import 'echarts-liquidfill';

export function loadChart(myChart: echarts.ECharts, dataValue: any) {
  var sexData = [
    {
      name: '气象站',
      value: 1,
    },
    {
      name: '水质设备',
      value: 2,
    },
    {
      name: '高位摄影',
      value: 5,
    },
  ];

  var data = [];
  var color = ['#f1ef53', '#69ffac', '#23fcff'];
  for (var i = 0; i < sexData.length; i++) {
    data.push({
      value: sexData[i].value,
      name: sexData[i].name,
      itemStyle: {
        normal: {
          borderWidth: 4,
          shadowBlur: 10,
          // borderColor: color[i],
          shadowColor: color[i],
        },
      },
    });
  }
  var seriesOption = [
    {
      name: '设备',
      type: 'pie',
      radius: ['50%', '60%'],
      center: ['28%', '50%'],
      itemStyle: {
        normal: {
          label: {
            show: false,
          },
        },
      },
      data: data,
    },
    {
      type: 'pie',
      radius: ['0', '42%'],
      center: ['28%', '50%'],
      z: 4,
      hoverAnimation: false,
      data: [
        {
          value: 20,
          itemStyle: {
            normal: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                {
                  offset: 0,
                  color: '#001738',
                },
                {
                  offset: 1,
                  color: '#06d3ff',
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
                  padding: [5, 0],
                },
                b: {
                  color: '#ffffff',
                  align: 'center',
                  fontSize: 14,
                },
              },
              formatter: function (params: any) {
                return '{a|' + '设备总数' + '}\n' + '{b|' + '20' + '}';
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
      center: ['28%', '50%'],
      radius: ['50%', '50%'],
      label: {
        normal: {
          show: false,
        },
      },
      data: [
        {
          value: 9,
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

    {
      type: 'liquidFill',
      radius: '48%',
      center: ['76%', '50%'],
      data: [dataValue / 100, dataValue / 100, dataValue / 100], // data个数代表波浪数
      backgroundStyle: {
        borderWidth: 1,
        color: 'rgb(255,0,255,0.1)',
      },
      label: {
        normal: {
          position: ['50%', '50%'],
          rich: {
            a: {
              color: '#ffffff',
              align: 'center',
              fontSize: 22,
              fontFamily: 'DIN',
              padding: [6, 0],
            },
            b: {
              color: '#ffffff',
              align: 'center',
              fontSize: 14,
            },
          },
          formatter: function (params: any) {
            return '{a|' + dataValue + '%' + '}\n' + '{b|' + '覆盖率' + '}';
          },
          show: true,
        },
      },
      outline: {
        show: false,
      },
    },
    {
      type: 'pie',
      center: ['76%', '50%'],
      radius: ['55%', '60%'],
      hoverAnimation: false,
      data: [
        {
          name: '',
          value: dataValue,
          labelLine: {
            show: false,
          },
          itemStyle: {
            color: '#5886f0',
          },
          emphasis: {
            labelLine: {
              show: false,
            },
            // itemStyle: {
            //   color: "#5886f0",
            // },
          },
        },
        {
          //画中间的图标
          name: '',
          value: 2,
          labelLine: {
            show: false,
          },
          itemStyle: {
            color: '#ffffff',
            normal: {
              color: '#5886f0',
              borderColor: '#5886f0',
              borderWidth: 5,
              // borderRadius: '100%'
            },
          },
          label: {
            borderRadius: '100%',
          },
          emphasis: {
            labelLine: {
              show: false,
            },
            // itemStyle: {
            //   color: "#5886f0",
            // },
          },
        },
        {
          // 解决圆点过大后续部分显示明显的问题
          name: '',
          value: 1,
          labelLine: {
            show: false,
          },
          itemStyle: {
            color: '#5886f0',
          },
          emphasis: {
            labelLine: {
              show: false,
            },
            // itemStyle: {
            //   color: "#5886f0",
            // },
          },
        },
        {
          //画剩余的刻度圆环
          name: '',
          value: 100 - dataValue,
          itemStyle: {
            color: '#050038',
          },
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            labelLine: {
              show: false,
            },
            // itemStyle: {
            //   color: "rgba(255,255,255,0)",
            // },
          },
        },
      ],
    },
  ];
  myChart.setOption({
    color: color,

    toolbox: {
      show: false,
    },
    legend: {
      orient: 'horizontal', // 'vertical horizontal'
      icon: 'circle',

      itemHeight: 12,
      // x: "right", // 'center' | 'left' | {number},
      y: 'bottom', // 'center' | 'bottom' | {number}
      padding: [5, 10, 15, 20], // [5, 10, 15, 20]
      itemGap: 8,
      textStyle: {
        color: '#c3cad9',
        fontSize: 13,
      },
      formatter: (name: string) => {
        if (sexData.length) {
          const item = sexData.filter((item) => item.name === name)[0];
          return item.name + ' ' + item.value + ' ';
        }
      },
    },
    series: seriesOption,
  });
}
