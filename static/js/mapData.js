function getMapData() {
    let mapData, dataList;
    $.ajaxSettings.async = false;
    $.getJSON('/static/map/china.json', function (data) {
        let d = [];
        for (var i = 0; i < data.features.length; i++) {
            d.push({
                name: data.features[i].properties.name,
                value: data.features[i].properties.value,
            })
        }
        mapData = data;
        dataList = d;
    });
    return [mapData, dataList];
}

function getMapOption() {
    let dataList = getMapData()[1];
    let mapOption = {
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
        tooltip: {
            formatter: '{b}<br/>确诊人数: {c}',
        },
        visualMap: {
            type: 'piecewise',
            show: true, //是否图注
            calculable: true, //是否改变鼠标形状
            realtime: true, //实时更新
            left: 'right',
            top: 'center',
            piecewise: {
                dimension: 1,
            },
            pieces: [{
                    gt: 500,
                    color: '#8A3310',
                },
                {
                    gt: 100,
                    lte: 500,
                    color: '#C64918',
                },
                {
                    gt: 50,
                    lte: 100,
                    color: '#E55B25'
                },
                {
                    gt: 5,
                    lte: 50,
                    color: '#F2AD92'
                },
                {
                    lt: 5,
                    color: '#F9DCD1'
                }
            ]

        },
        //通过series 中的data更新数据
        series: [{
            name: 'map',
            data: dataList,
            type: 'map',
            map: 'china',
            label: {
                normal: {
                    show: true,
                    formatter: '{b}'
                }

            },
        }]
    }
    return mapOption
}



export {
    getMapData,
    getMapOption
}