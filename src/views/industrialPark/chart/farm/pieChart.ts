import * as echarts from 'echarts';

export function loadPieChart(myChart: echarts.ECharts, data: any[]) {
  myChart.setOption({
    color: [
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#061BEB' },
        { offset: 1, color: '#0C90FF' },
      ]),
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#C31C00' },
        { offset: 1, color: '#FF4E21' },
      ]),
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#21FFA9' },
        { offset: 1, color: '#007213' },
      ]),
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#7C48FF' },
        { offset: 1, color: '#4100D6' },
      ]),
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#FFD648' },
        { offset: 1, color: '#AD6600' },
      ]),
    ],
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['40%', '65%'],

        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data,
      },
    ],
  });
}
