import * as echarts from 'echarts';

export function pie_Chart(myChart: echarts.ECharts, progress_1: string, progress_2: number) {
  myChart.setOption({
    grid: {
      top: '20%',
      bottom: 8,
      left: 10,
      right: 10,
      containLabel: true,
    },
    title: [
      {
        text: '已完成',
        x: 'center',
        top: '52%',
        textStyle: {
          color: '#FFFFFF',
          fontSize: '10',
          fontWeight: '100',
        },
      },
      {
        text: progress_1,
        x: 'center',
        y: '30%',
        textStyle: {
          fontSize: '20',
          color: '#FFFFFF',
          fontFamily: 'DIN',
          foontWeight: '600',
        },
      },
    ],
    // backgroundColor: '#111',
    polar: {
      radius: ['82%', '92%'],
      center: ['50%', '50%'],
    },
    angleAxis: {
      max: 100,
      show: false,
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: '',
        type: 'bar',
        roundCap: true,
        barWidth: 100,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(66, 66, 66, .3)',
        },
        data: [progress_2], // 控制进度条
        coordinateSystem: 'polar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: '#0df1ff',
              },
              {
                offset: 1,
                color: '#568aff',
              },
            ]),
          },
        },
      },
      {
        name: '',
        type: 'pie',
        startAngle: 200,
        radius: ['96%'],
        hoverAnimation: false,
        center: ['50%', '50%'],
        itemStyle: {
          color: 'rgba(66, 66, 66, .1)',
          borderWidth: 1,
          borderColor: '#5269EE',
        },
        data: [100],
      },
      {
        name: '',
        type: 'pie',
        startAngle: 80,
        radius: ['78%'],
        hoverAnimation: false,
        center: ['50%', '50%'],
        itemStyle: {
          color: 'rgba(66, 66, 66, .1)',
          borderWidth: 1,
          borderColor: '#5269EE',
        },
        data: [100],
      },
    ],
  });
}
