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

}
init();

init1(leftBomtoonChart)

let mm;
$.ajaxSettings.async = false;
leftTopChart.on('click', function (param) {
    let pro = param.data
    mm = pro.name;
    $.getJSON("/static/map/province/" + reResMap[pro.name] + '.json', function (param) {
        var mp = [];
        mp.push(['count', 'time', 'message']);
        let data = param.data;
        for (let i = 0; i < data.length; i++) {
            mp.push([data[i].existing, i, '现存确诊人数']);
            mp.push([data[i].death, i, '累计死亡人数']);
            mp.push([data[i].cumulative, i, '累计确诊人数']);
        }
        run1(rightTopChart, mp, mm);
        run2(rightBomtoonChart, mp, mm);
    })

})


export {
    init
}
