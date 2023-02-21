import * as echarts from 'echarts';
var data=[{name:'已缴',value:35},{name:'未缴',value:65},{name:'未缴',value:65}];
var percent=data[0]["value"]

//职称结构图表
export function loadZcChart(myChart: echarts.ECharts,data_s:any) {
  myChart.setOption({
    tooltip:{
      trigger:'item',
      formatter: function(params:any) {
            let judge = /^_*[边框]{0}$/.test(params.name);
            if (judge) {
                //隐藏提示
                return ''
            } else {
                var value = params.value
                return `${params.name} <br/> ${params.percent}%`
            }
        },
    },
    title: {
        text: '资金组成',
        textStyle: {
            color: '#ffffff',
            fontSize: 12,
        },
        x: 'center',
        y: 'center',
    },
    color:["#2892ff","#ff6172","#28ffab"],
    series: [
        {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ["50%", "50%"],
        label:{show:false},
        data: data_s,
    },{
        name:'边框',
        itemStyle: {
            normal: {
                color: 'rgba(34,41,69,0.4)',
            }
        },
        type: 'pie',
        hoverAnimation: false,
        radius: ['37%', '63%'],
        center: ["50%", "50%"],
        label: {
            normal: {
                show:false
            }
        },
        data: [{
                value: 1,
            }],
        z:-1
    }]
  });
}

