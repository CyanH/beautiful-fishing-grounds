import * as echarts from 'echarts';

export function loadChart(myChart: echarts.ECharts, data: any) {
  myChart.setOption({
    color: ['#00DCFD', '#2892FF', '#28FFAB', '#fae150', '#FF6172'],
    series: [
      {
        name: '产品',
        type: 'pie',
        radius: ['50%', '95%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: data.yrProduct, name: '引入产品数量' },
          { value: data.yrTechnology, name: '引入技术数量' },
          { value: data.zhProduct, name: '转化产品数量' },
          { value: data.zhTechnology, name: '转化技术数量' },
          { value: data.zhProject, name: '转化项目数量' },
        ],
      },
    ],
  });
}
