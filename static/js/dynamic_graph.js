import {
    resMap,
    reResMap,
    provinces,
    countryColors
} from '/static/js/data.js'

function init1(chart) {

    const updateFrequency = 2000;
    const dimension = 0;
    const dataList = [];
    var data = [];
    chart.clear();
    window.onresize = function (event) {
        chart.resize();
    };




    $.ajaxSettings.async = false;
    for (let i = 0; i < provinces.length; i++) {
        $.getJSON("/static/map/province/" + provinces[i] + ".json", function (datap) {
            dataList.push(datap.data);
            data[i] = datap.data[0].existing;
        })
    }
    $.ajaxSettings.async = true;

    let goDown = 1,
        stop = 1,
        goUp = 1;
    var k = 0;

    chart.on('click', params => {
        console.log(params.event.target.style.text);
        let p = params.event.target.style.text;
        option.title.subtextStyle.rich.a.color = "#4967C4";
        option.title.subtextStyle.rich.b.color = "#4967C4";
        chart.setOption(option)
        if (p === "暂停") {
            stop = 0;
            option.title.subtextStyle.rich.a.color = "#F8120A";
        } else if (p === "继续") {
            stop = 1;
            option.title.subtextStyle.rich.b.color = "#F8120A";
        }
        chart.setOption(option);
    })


    let option = {
        title: {
            show: true,
            text: "各省疫情动态图(包括直辖市,特别行政区)",
            left: "center",
            triggerEvent: true,
            subtext: "{a|暂停}    {b|继续}",
            subtextStyle: {
                rich: {
                    a: {
                        fontSize: 15,
                        color: '#4967C4',
                        height: 25,
                        width: 45,
                        borderRadius: 10,
                        backgroundColor: '#98EC0F',
                    },
                    b: {
                        fontSize: 15,
                        color: '#4967C4',
                        height: 25,
                        width: 45,
                        borderRadius: 10,
                        backgroundColor: '#98EC0F',
                    },
                    c: {
                        fontSize: 15,
                        color: '#4967C4',
                        height: 25,
                        width: 45,
                        borderRadius: 10,
                        backgroundColor: '#98EC0F',
                    }

                }

            }
        },
        tooltip: {
            show: true,
            trigger: "item",
            position: "left"
        },
        xAxis: {
            max: 'dataMax'
        },
        yAxis: {
            type: 'category',
            data: provinces.map(function (item) {
                return resMap[item];
            }),
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 10
        },
        series: [{
            realtimeSort: true,
            type: 'bar',
            data: data,
            itemStyle: {
                color: function (param) {
                    return countryColors[reResMap[param.name]] || '#5470c6';
                }
            },
            label: {
                show: true,
                position: 'right',
                valueAnimation: true
            }
        }],
        legend: {
            show: true
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
            elements: [{
                type: 'text',
                right: 160,
                bottom: 60,
                style: {
                    text: "2020.1.15",
                    font: 'bolder 80px monospace',
                    fill: 'rgba(100, 100, 100, 0.25)'
                },
                z: 100
            }]
        }
    };



    function run() {

        if (stop == 0) return;
        if (k == 54) k = 0;
        for (var i = 0; i < data.length; ++i) {
            data[i] = dataList[i][k].existing
        }
        option.graphic.elements[0].style.text = dataList[0][k].time;
        option.series[0].data = data;
        chart.setOption(option)
        k++;

    }
    setTimeout(function () {
        run();
    }, 100);
    setInterval(function () {
        run();
    }, 3000);

    chart.on('click', params => {
        console.log(params.event.target.style.text);
        let p = params.event.target.style.text;
        option.title.subtextStyle.rich.a.color = "#4967C4";
        option.title.subtextStyle.rich.b.color = "#4967C4";
        chart.setOption(option)
        if (p === "暂停") {
            stop = 0;
            option.title.subtextStyle.rich.a.color = "#F8120A";
        } else if (p === "继续") {
            stop = 1;
            option.title.subtextStyle.rich.b.color = "#F8120A";
        }
        chart.setOption(option);
    })
}

export {
    init1
}
