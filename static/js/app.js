//地图容器
var chart = echarts.init(document.getElementById('main'));

window.onresize = function (event) {
    chart.resize();
    //console.log(event.type)
};

//34个省、市、自治区的名字拼音映射数组
var provinces = {
    //23个省
    "台湾": "taiwan",
    "河北": "hebei",
    "山西": "shanxi",
    "辽宁": "liaoning",
    "吉林": "jilin",
    "黑龙江": "heilongjiang",
    "江苏": "jiangsu",
    "浙江": "zhejiang",
    "安徽": "anhui",
    "福建": "fujian",
    "江西": "jiangxi",
    "山东": "shandong",
    "河南": "henan",
    "湖北": "hubei",
    "湖南": "hunan",
    "广东": "guangdong",
    "海南": "hainan",
    "四川": "sichuan",
    "贵州": "guizhou",
    "云南": "yunnan",
    "陕西": "shanxi1",
    "甘肃": "gansu",
    "青海": "qinghai",
    //5个自治区
    "新疆": "xinjiang",
    "广西": "guangxi",
    "内蒙古": "neimenggu",
    "宁夏": "ningxia",
    "西藏": "xizang",
    //4个直辖市
    "北京": "beijing",
    "天津": "tianjin",
    "上海": "shanghai",
    "重庆": "chongqing",
    //2个特别行政区
    "香港": "xianggang",
    "澳门": "aomen"
};

//直辖市和特别行政区-只有二级地图，没有三级地图
var special = ["北京", "天津", "上海", "重庆", "香港", "澳门"];
var mapdata = [];
//绘制全国地图
$.getJSON('static/map/china.json', function (data) {
    d = [];
    for (var i = 0; i < data.features.length; i++) {
        d.push({
            name: data.features[i].properties.name,
            value: data.features[i].properties.value
        })

    }
    console.log(d);
    mapdata = d;
    //注册地图
    echarts.registerMap('china', data);
    //绘制地图
    renderMap('china', d);
});

// //地图点击事件
// chart.on('click', function (params) {
//     console.log(params);
//     if (params.name in provinces) {
//         //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
//         $.getJSON('static/map/province/' + provinces[params.name] + '.json', function (data) {
//             echarts.registerMap(params.name, data);
//             var d = [];
//             for (var i = 0; i < data.features.length; i++) {
//                 d.push({
//                     name: data.features[i].properties.name
//                 })
//             }
//             renderMap(params.name, d);
//         });
//     } else if (params.seriesName in provinces) {
//         //如果是【直辖市/特别行政区】只有二级下钻
//         if (special.indexOf(params.seriesName) >= 0) {
//             renderMap('china', mapdata);
//         } else {
//             //显示县级地图
//             $.getJSON('static/map/city/' + cityMap[params.name] + '.json', function (data) {
//                 echarts.registerMap(params.name, data);
//                 var d = [];
//                 for (var i = 0; i < data.features.length; i++) {
//                     d.push({
//                         name: data.features[i].properties.name
//                     })
//                 }
//                 renderMap(params.name, d);
//             });
//         }
//     } else {
//         renderMap('china', mapdata);
//     }
// });

//初始化绘制全国地图配置
var option = {
    backgroundColor: '#fff',
    title: {
        text: '4.14疫情信息',
        subtext: 'china',
        left: 'center',
        textStyle: {
            color: '#000',
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: "Microsoft YaHei"
        },
        subtextStyle: {
            color: '#6A6467',
            fontSize: 13,
            fontWeight: 'normal',
            fontFamily: "Microsoft YaHei"
        }
    },

    //echarts中tooltip的位置设置
    tooltip: {
        trigger: 'item',
        //直接设置position的值（必须设置trigger: 'item'）
        formatter: '{b}',
        //position: 'top'
    },
    toolbox: {
        //工具栏是否可见
        show: true,
        //默认值为horizontal，工具栏 icon 的布局朝向。可选项为“horizontal”和“vertical”
        orient: 'vertical',
        //水平位置
        left: 'left',
        //竖直位置
        top: 'center',
        feature: {
            dataView: {
                readOnly: false
            },
            restore: {},
            saveAsImage: {}
        },
        iconStyle: {
            normal: {
                color: '#F04F28'
            }
        }
    },


    animationDuration: 1000,
    animationEasing: 'cubicOut',
    animationDurationUpdate: 1000

};

function renderMap(map, dataList) {
    chart.setOption({
            title: {
                subtext: map
            },
            visualMap: {
                min: 0, //疫情人数最小值
                max: 500, //疫情人数最大值
                left: 'right',
                top: 'center', //右中
                itemHeight: 300,
                itemWidth: 20, //长宽
                text: ['500', '0'], //两端文本的数据
                //取值范围的文字
                //Range: [0, 3000],
                inRange: {
                    //color: ['#e0ffff', '#006edd'], //取值范围的颜色
                    color: ['#e2ebf4', '#de1f05'], //取值范围的颜
                    symbolSize: [30, 100]
                },
                show: true, //是否图注
                calculable: true, //是否改变鼠标形状
                realtime: true, //实时更新
                continuous: {
                    dimension: 1, //datalist对应的value
                    seriesIndex: dataList,
                    //calculable: false,
                }

            },
            //通过series 中的data更新数据
            series: {
                data: dataList,
                //type: 'scatter',
                name: map,
                type: 'map',
                mapType: map,
                roam: true,
                // name: 'USA PopEstimates',
                nameMap: {
                    'china': '中国'
                },

                label: {
                    show: true,
                    // 标签的文字。
                    formatter: '{b}'
                },
                // 高亮样式。
                emphasis: {

                    label: {
                        show: true,
                        // 高亮时标签的文字。
                        formatter: '{c}'
                    }
                },
            },
        }),
        //渲染地图
        chart.setOption(option);
}