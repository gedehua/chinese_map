var ROOT_PATH =
    'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;
var pn = [];

var provinces = [
    "anhui",
    "aomen",
    "beijing",
    "chongqing",
    "fujian",
    "gansu",
    "guangdong",
    "guangxi",
    "guizhou",
    "hainan",
    "hebei",
    "heilongjiang",
    "henan",
    "hubei",
    "hunan",
    "jiangsu",
    "jiangxi",
    "jilin",
    "liaoning",
    "neimenggu",
    "ningxia",
    "qinghai",
    "shaanxi",
    "shandong",
    "shanghai",
    "shanxi",
    "sichuan",
    "taiwan",
    "tianjin",
    "xianggang",
    "xinjiang",
    "xizang",
    "yunnan",
    "zhejiang"
];



var reResMap = {
    安徽: "anhui",
    澳门: "aomen",
    北京: "beijing",
    重庆: "chongqing",
    福建: "fujian",
    甘肃: "gansu",
    广东: "guangdong",
    广西: "guangxi",
    贵州: "guizhou",
    海南: "hainan",
    河北: "hebei",
    黑龙江: "heilongjiang",
    河南: "henan",
    湖北: "hubei",
    湖南: "hunan",
    江苏: "jiangsu",
    江西: "jiangxi",
    吉林: "jilin",
    辽宁: "liaoning",
    内蒙古: "neimenggu",
    宁夏: "ningxia",
    青海: "qinghai",
    陕西: "shaanxi",
    山东: "shandong",
    上海: "shanghai",
    山西: "shanxi",
    四川: "sichuan",
    台湾: "taiwan",
    天津: "tianjin",
    香港: "xianggang",
    新疆: "xinjiang",
    西藏: "xizang",
    云南: "yunnan",
    浙江: "zhejiang"
}


var resMap = {
    anhui: "安徽",
    aomen: "澳门",
    beijing: "北京",
    chongqing: "重庆",
    fujian: "福建",
    gansu: "甘肃",
    guangdong: "广东",
    guangxi: "广西",
    guizhou: "贵州",
    hainan: "海南",
    hebei: "河北",
    heilongjiang: "黑龙江",
    henan: "河南",
    hubei: "湖北",
    hunan: "湖南",
    jiangsu: "江苏",
    jiangxi: "江西",
    jilin: "吉林",
    liaoning: "辽宁",
    neimenggu: "内蒙古",
    ningxia: "宁夏",
    qinghai: "青海",
    shaanxi: "陕西",
    shandong: "山东",
    shanghai: "上海",
    shanxi: "山西",
    sichuan: "四川",
    taiwan: "台湾",
    tianjin: "天津",
    xianggang: "香港",
    xinjiang: "新疆",
    xizang: "西藏",
    yunnan: "云南",
    zhejiang: "浙江"
}

$.ajaxSettings.async = false;
var dataList = [],
    mp = [];
for (let i = 0; i < provinces.length; i++) {
    $.get('/static/map/province/' + provinces[i] + '.json', function (datap) {
        dataList.push(datap);

    })
}
$.ajaxSettings.async = true;
mp.push(['count', 'province', 'time'])
for (let i = 0; i < 54; i++) {
    for (let j = 0; j < provinces.length; j++) {
        let p = dataList[j].data;
        mp.push([p[i].existing, dataList[j].name, i]);
    }
}
console.log(mp);
run(mp);


function run(_rawData) {
    var countries = ['hubei'];

    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(provinces, function (country) {
        console.log(_rawData)
        var datasetId = 'dataset_' + country;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: {
                type: 'filter',
                config: {
                    and: [{
                            dimension: 'time',
                            gte: 10
                        },
                        {
                            dimension: 'province',
                            '=': resMap[country]
                        }
                    ]
                }
            }
        });
        seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: false,
            name: country,
            endLabel: {
                show: true,
                formatter: function (params) {
                    console.log(params);
                    return params.value[1] + ': ' + params.value[0];
                }
            },
            labelLayout: {
                moveOverlap: 'shiftY'
            },
            emphasis: {
                focus: 'series'
            },
            encode: {
                x: 'time',
                y: 'count',

            }
        });
    });
    option = {
        animationDuration: 10000,
        dataset: [{
                id: 'dataset_raw',
                source: mp
            },
            ...datasetWithFilters
        ],
        title: {
            text: 'Income of Germany and France since 1950'
        },
        tooltip: {
            order: 'valueDesc',
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            nameLocation: 'middle'
        },
        yAxis: {
            name: 'Incoe'
        },
        grid: {
            right: 140
        },
        series: seriesList
    };
    myChart.setOption(option);
}