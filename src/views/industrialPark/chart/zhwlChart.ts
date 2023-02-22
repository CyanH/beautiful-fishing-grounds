import * as echarts from 'echarts';
import 'echarts-liquidfill'
export function loadXmChart(myChart: echarts.ECharts,data: any) {
  myChart.setOption({
    // backgroundColor: '#485C6D', //背景色
    series: [
        {
            type: 'liquidFill', //水位图
            radius: '80%', //显示比例
            center: ['50%', '50%'], //中心点
            amplitude: 5, //水波振幅
            data: [data / 100], // data个数代表波浪数
            color: ['#0fe0ff'], //波浪颜色
            backgroundStyle: {
                borderWidth: 1, //外边框
                borderColor: '#0fe0ff', //边框颜色
                color: 'rgba(72,92,109,0.6)', //边框内部填充部分颜色
            },
            label: {
                //标签设置
                normal: {
                    position: ['50%', '50%'],
                    formatter: '覆盖率 '+ data + '%', //显示文本,
                    textStyle: {
                        fontSize: '11px', //文本字号,
                        color: '#0fe0ff',
                    },
                },
            },
            emphasis: {
                itemStyle: {
                    opacity: 0.9//设置hover时候的透明度
                }
            },
            outline: {
                show: false,//最外层边框显示控制
            },
        },
    ],
  });
}

