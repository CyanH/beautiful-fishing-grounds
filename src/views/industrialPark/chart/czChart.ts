import * as echarts from 'echarts';

export function loadChart(myChart: echarts.ECharts) {
  myChart.setOption({
    series: [
      {
        name: '产业园农业产业总产值',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: ['80%', '70%'],
        center: ['50%', '50%'],
        label: { show: false },
        itemStyle: { color: '#4C87FF' },
        data: [
          { value: 82, name: '产业园农业产业总产值' },
          { value: 28, name: '', itemStyle: { color: 'rgba(0, 0, 0, 0.6)' } },
        ],
      },
      {
        name: '产业园一产值',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: ['60%', '50%'],
        center: ['50%', '50%'],
        label: { show: false },
        itemStyle: { color: '#8B71FF' },
        data: [
          { value: 64, name: '产业园一产值' },
          { value: 36, name: '', itemStyle: { color: 'rgba(0, 0, 0, 0.6)' } },
        ],
      },

      {
        name: '产业园二三产值',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: ['40%', '30%'],
        center: ['50%', '50%'],
        label: { show: false },
        itemStyle: { color: '#DD5B86' },
        data: [
          { value: 43, name: '产业园二产值' },
          { value: 57, name: '', itemStyle: { color: 'rgba(0, 0, 0, 0.6)' } },
        ],
      },
      {
        name: '产业园主导产业总产值',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: ['20%', '10%'],
        center: ['50%', '50%'],
        label: { show: false },
        itemStyle: { color: '#E2963C' },
        data: [
          { value: 31, name: '产业园三产值' },
          { value: 69, name: '', itemStyle: { color: 'rgba(0, 0, 0, 0.6)' } },
        ],
      },
    ],
  });
}
