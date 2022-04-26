function run1(chart, _rawData, pro) {
    var countries = ['hubei'];
    let messages = [
        "现存确诊人数",
    ]
    const datasetWithFilters = [];
    const seriesList = [];

    echarts.util.each(messages, function (message) {
        //console.log(_rawData)
        var datasetId = 'dataset_' + message;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: {
                type: 'filter',
                config: {
                    and: [{
                            dimension: 'time',
                            gte: 0
                        },
                        {
                            dimension: 'message',
                            '=': message
                        }
                    ]
                }
            }
        });
        seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: false,
            name: message,
            endLabel: {
                show: true,
                formatter: function (params) {

                    return params.data[2] + ': ' + params.value[0];
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
    let option = {
        animationDuration: 10000,
        dataset: [{
                id: 'dataset_raw',
                source: _rawData
            },
            ...datasetWithFilters
        ],
        title: {
            text: pro + '现存确诊信息',
            right: 'middle'
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
            name: '人数'
        },
        grid: {
            right: 140
        },
        series: seriesList
    };
    chart.clear();
    chart.setOption(option);
}


function run2(chart, _rawData, pro) {
    var countries = ['hubei'];
    let messages = [
        "累计确诊人数",
    ]
    const datasetWithFilters = [];
    const seriesList = [];

    echarts.util.each(messages, function (message) {
        //console.log(_rawData)
        var datasetId = 'dataset_' + message;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: {
                type: 'filter',
                config: {
                    and: [{
                            dimension: 'time',
                            gte: 0
                        },
                        {
                            dimension: 'message',
                            '=': message
                        }
                    ]
                }
            }
        });
        seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: false,
            name: message,
            endLabel: {
                show: true,
                formatter: function (params) {

                    return params.data[2] + ': ' + params.value[0];
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
    let option = {
        animationDuration: 10000,
        dataset: [{
                id: 'dataset_raw',
                source: _rawData
            },
            ...datasetWithFilters
        ],
        title: {
            text: pro + '累计确诊信息',
            right: 'middle'
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
            name: '人数'
        },
        grid: {
            right: 140
        },
        series: seriesList
    };
    chart.clear();
    chart.setOption(option);
}



export {
    run1,
    run2
}