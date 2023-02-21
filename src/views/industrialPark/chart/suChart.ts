import * as echarts from 'echarts';

export function loadChart(myChart: echarts.ECharts, progress_array: any, tzjd_array: any, time_data: any) {
  myChart.setOption({
    grid: {
      top: '28%',
      bottom: 8,
      left: 15,
      right: 15,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      right: 0,
      textStyle: {
        color: '#fff',
      },
    },
    xAxis: [
      {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
        data: time_data,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '资金投入进度',
        nameTextStyle: {
          color: '#fff',
        },
        axisLabel: {
          color: '#fff',
        },
        splitLine: {
          lineStyle: {
            color: '#6C6C6C',
          },
        },
      },
      {
        type: 'value',
        name: '项目建设进度',
        nameTextStyle: {
          color: '#fff',
        },
        axisLabel: {
          color: '#fff',
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '资金投入进度',
        type: 'line',
        color: '#00f6ff',
        data: tzjd_array,
      },
      {
        name: '项目建设进度',
        type: 'bar',
        yAxisIndex: 1,
        color: '#47D6FF',
        data: progress_array,
      },
    ],
  });
}
