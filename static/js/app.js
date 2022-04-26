import {
    getMapData,
    getMapOption
} from '/static/js/mapData.js';
import {
    reResMap
} from '/static/js/data.js'
import {
    run1,
    run2
} from '/static/js/lineData.js'
import {
    init1
} from '/static/js/app2.js'


let leftTopChart, leftBomtoonChart, rightTopChart, rightBomtoonChart;
$.ajaxSettings.async = false;
function init() {
    //地图容器
    leftTopChart = echarts.init(document.getElementById('leftTop'));
    leftBomtoonChart = echarts.init(document.getElementById('leftBomtoon'));
    rightTopChart = echarts.init(document.getElementById('rightTop'));
    rightBomtoonChart = echarts.init(document.getElementById('rightBomtoon'))

    let mapData = getMapData()[0]; //获取地图数据
    let mapOption = getMapOption(); //获取地图option
    echarts.registerMap('china', mapData); //注册地图
    leftTopChart.setOption(mapOption) //绘制地图
    //默认为北京
    UpdateMap("北京")
}

function UpdateMap(name){
    $.getJSON("/static/map/province/" + reResMap[name] + '.json', function (param) {
        var mp = [];
        mp.push(['count', 'time', 'message']);
        let data = param.data;
        for (let i = 0; i < data.length; i++) {
            mp.push([data[i].existing, i, '现存确诊人数']);
            mp.push([data[i].death, i, '累计死亡人数']);
            mp.push([data[i].cumulative, i, '累计确诊人数']);
        }
        run1(rightTopChart, mp, name);
        run2(rightBomtoonChart, mp,name);
    })
}

init();

init1(leftBomtoonChart)

let mm;

leftTopChart.on('click', function (param) {
    let pro = param.data
    mm = pro.name;
    UpdateMap(mm);

})


export {
    init
}
