import * as echarts from 'echarts';
import 'echarts-liquidfill'

// export function RightChart(myChart: echarts.ECharts) {
//     let seriesData = [
//         {
//             value: 8,
//             name: "气象站",
//           },
//           {
//             value: 7,
//             name: "水质设备",
//           },
//           {
//             value: 5,
//             name: "高位摄像",
//           },
//     ]
//     let title = '设备总数'
//     let formatNumber = function(num:any) {
//         let reg = /(?=(\B)(\d{3})+$)/g;
//         return num.toString().replace(reg, ',');
//     }
//     let total = seriesData.reduce((a, b) => {
//         return a + b.value * 1
//     }, 0);
//     let b = seriesData[0].value + seriesData[1].value + seriesData[2].value
//   myChart.setOption({
//     title:{
//         text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
//         top: 'center',
//         left: '24%',
//         textStyle: {
//             align:'center',
//             rich: {
//                 name: {
//                     fontSize: 12,
//                     fontWeight: 'normal',
//                     color: '#ffffff',
//                     padding: [5, 0]
//                 },
//                 val: {
//                     fontSize: 12,
//                     fontWeight: 'bold',
//                     color: '#ffffff',
//                 }
//             }
//         }
//     },
    // legend: {
    //   orient: "vertical", // 'vertical horizontal'
    //   icon: "circle",
    //   x: "right", // 'center' | 'left' | {number},
    //   y: "center", // 'center' | 'bottom' | {number}
    //   padding: [5, 0], // [5, 10, 15, 20]
    //   itemGap: 4,
    //   textStyle: { 
    //     color: "#c3cad9",
    //     fontSize: 13,
    //     },
    //   formatter: (name:string) => {
    //         if (seriesData.length) {
    //             const item = seriesData.filter((item) => item.name === name)[0];
    //             console.log(item);
    //             // return item.name +  ' ' +item.value +  ' ' + ((item.value / b) * 100) + '%'
    //             return item.name +  ' ' +item.value +  ' '
    //         }
    //     },
    // },
    // tooltip: {
    //     trigger: "item",
    //     formatter: "{a}：{b} {d}% ({c})",
    // },
//     series: [
//       {
//         name: "设备",
//         type: "pie",
//         radius: ['55%', '80%'],
//         // radius: '70%',
//         center: ["35%", "50%"],
//         color: ["#43cadd", "#3893e5", "#FCC708", "#03B48E"], //'#FBFE27','rgb(11,228,96)','#FE5050'
//         labelLine:{  //删除指示线
//             show:false
//           },
//           label: {
//               show:false
//           },
//         data: seriesData,
//       },
//     ],
//   });
// }
export function RightChart(myChart: echarts.ECharts) {
  var sexData = [
    {
      name: "气象站",
      value: 8,
    },
    {
      name: "水质设备",
      value: 7,
    },
    {
      name: "高位摄影",
      value: 5,
    }
  ];
  
  var data = [];
  var color = ["#f1ef53", "#69ffac","#23fcff"];
  for (var i = 0; i < sexData.length; i++) {
    data.push(
      {
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
      },
      // {
      //   value: 1,
      //   itemStyle: {
      //     normal: {
      //       label: {
      //         show: false,
      //       },
      //       labelLine: {
      //         show: false,
      //       },
      //       color: "rgba(0, 0, 0, 0)",
      //       borderColor: "rgba(0, 0, 0, 0)",
      //       borderWidth: 0,
      //     },
      //   },
      // }
    );
  }
  var seriesOption = [
    {
      name: "设备",
      type: "pie",
      radius: ["66%", "80%"],
      center: ["30%", "50%"],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
        },
      },
      data: data,
    },
    {
      type: "pie",
      radius: ["0", "50%"],
      center: ["30%", "50%"],
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
                  color: "#001738",
                },
                {
                  offset: 1,
                  color: "#06d3ff",
                },
              ]),
            },
          },
          label: {
            normal: {
              rich: {
                a: {
                  color: "#ffffff",
                  align: "center",
                  fontSize: 11,
                  padding: [5,0]
                },
                b: {
                  color: "#ffffff",
                  align: "center",
                  fontSize: 14,
                },
              },
              formatter: function (params:any) {
                return (
                  "{a|" + "设备总数" + "}\n" + "{b|" + "20" + "}"
                );
              },
              position: "center",
              show: true,
            },
          },
          labelLine: {
            show: false,
          }
        },
      ],
    },
    {
        name: '外边框',
        type: 'pie',
        z: 5,
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        center: ['30%', '50%'],
        radius: ['50%', '50%'],
        label: {
            normal: {
                show: false
            }
        },
        data: [{
            value: 9,
            name: '',
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: 'rgba(193,216,255,0.08)'
                }
            }
        }]
    },
  ];
  myChart.setOption({
    color: color,
    tooltip: {
      trigger: "item",
      formatter: "{a}：{b} {d}% ({c})",
    },
    toolbox: {
      show: false,
    },
    legend: {
      orient: "vertical", // 'vertical horizontal'
      icon: "circle",
      x: "right", // 'center' | 'left' | {number},
      y: "center", // 'center' | 'bottom' | {number}
      padding: [5, 10, 15, 20], // [5, 10, 15, 20]
      itemGap: 4,
      textStyle: { 
        color: "#c3cad9",
        fontSize: 13,
      },
      formatter: (name:string) => {
          if (sexData.length) {
              const item = sexData.filter((item) => item.name === name)[0];
              return item.name +  ' ' +item.value +  ' '
          }
      },
    },
    series: seriesOption,
  })
}

