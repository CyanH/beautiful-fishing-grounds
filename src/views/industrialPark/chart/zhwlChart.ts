import * as echarts from 'echarts';

import 'echarts-liquidfill';
export function loadXmChart(myChart: echarts.ECharts, data: any) {
  //   myChart.setOption({
  //     // backgroundColor: '#485C6D', //背景色
  //     series: [
  //         {
  //             type: 'liquidFill', //水位图
  //             radius: '80%', //显示比例
  //             center: ['50%', '50%'], //中心点
  //             amplitude: 5, //水波振幅
  //             data: [data / 100], // data个数代表波浪数
  //             color: ['#0fe0ff'], //波浪颜色
  //             backgroundStyle: {
  //                 borderWidth: 1, //外边框
  //                 borderColor: '#0fe0ff', //边框颜色
  //                 color: 'rgba(72,92,109,0.6)', //边框内部填充部分颜色
  //             },
  // label: {
  //     //标签设置
  //     normal: {
  //         position: ['50%', '50%'],
  //         formatter: '覆盖率 '+ data + '%', //显示文本,
  //         textStyle: {
  //             fontSize: '11px', //文本字号,
  //             color: '#0fe0ff',
  //             // fontFamily: 'DIN'
  //         },
  //     },
  // },
  //             emphasis: {
  //                 itemStyle: {
  //                     opacity: 0.9//设置hover时候的透明度
  //                 }
  //             },
  //             outline: {
  //                 show: false,//最外层边框显示控制
  //             },
  //         },
  //     ],
  //   });
  myChart.setOption({
    //   title: {
    //     text: "",
    //     textStyle: {
    //       fontWeight: "normal",
    //       fontSize: 25,
    //       color: "rgb(97, 142, 205)",
    //     },
    //   },
    series: [
      {
        type: 'liquidFill',
        radius: '75%',
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
        radius: ['88%', '83%'],
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
