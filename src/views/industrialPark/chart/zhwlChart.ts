import * as echarts from 'echarts';

import 'echarts-liquidfill';
export function loadXmChart(myChart: echarts.ECharts, data: any) {
  myChart.setOption({
    series: [
      {
        type: 'liquidFill',
        radius: '70%',
        center: ['50%', '50%'],
        data: [data / 100, data / 100, data / 100], // data个数代表波浪数
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
              return '{a|' + data + '%' + '}\n' + '{b|' + '覆盖率' + '}';
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
        center: ['50%', '50%'],
        radius: ['83%', '78%'],
        hoverAnimation: false,
        data: [
          {
            name: '',
            value: data,
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
            value: 100 - data,
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
    ],
  });
}
