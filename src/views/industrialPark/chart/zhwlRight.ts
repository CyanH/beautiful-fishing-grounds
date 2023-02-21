import * as echarts from 'echarts';
import 'echarts-liquidfill'

export function RightChart(myChart: echarts.ECharts) {
    let seriesData = [
        {
            value: 8,
            name: "气象站",
          },
          {
            value: 7,
            name: "水质设备",
          },
          {
            value: 5,
            name: "高位摄像",
          },
    ]
    let title = '设备总数'
    let formatNumber = function(num:any) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ',');
    }
    let total = seriesData.reduce((a, b) => {
        return a + b.value * 1
    }, 0);
    let b = seriesData[0].value + seriesData[1].value + seriesData[2].value
  myChart.setOption({
    title:{
        text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
        top: 'center',
        left: '24%',
        textStyle: {
            align:'center',
            rich: {
                name: {
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: '#ffffff',
                    padding: [5, 0]
                },
                val: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#ffffff',
                }
            }
        }
    },
    legend: {
      orient: "vertical", // 'vertical horizontal'
      icon: "circle",
      x: "right", // 'center' | 'left' | {number},
      y: "center", // 'center' | 'bottom' | {number}
      padding: [5, 0], // [5, 10, 15, 20]
      itemGap: 4,
      textStyle: { 
        color: "#c3cad9",
        fontSize: 13,
        },
      formatter: (name:string) => {
            if (seriesData.length) {
                const item = seriesData.filter((item) => item.name === name)[0];
                console.log(item);
                // return item.name +  ' ' +item.value +  ' ' + ((item.value / b) * 100) + '%'
                return item.name +  ' ' +item.value +  ' '
            }
        },
    },
    tooltip: {
        trigger: "item",
        formatter: "{a}：{b} {d}% ({c})",
    },
    series: [
      {
        name: "设备",
        type: "pie",
        radius: ['45%', '70%'],
        // radius: '70%',
        center: ["35%", "50%"],
        color: ["#43cadd", "#3893e5", "#FCC708", "#03B48E"], //'#FBFE27','rgb(11,228,96)','#FE5050'
        labelLine:{  //删除指示线
            show:false
          },
          label: {
              show:false
          },
        data: seriesData,
      },
    ],
  });
}

