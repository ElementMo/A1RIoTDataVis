var chart = echarts.init(document.getElementById('container'));
var ui_color = 'rgb(48, 170, 238)'
var ui_color_dark = 'rgb(4, 17, 23, 50)'
var ui_color_light = 'rgb(100, 200, 255)'

// My token (not public token)
mapboxgl.accessToken = "pk.eyJ1IjoiZWxlbWVudG1vIiwiYSI6ImNrM2Y4dm55MjAwNnczbG80M2hrZ3Q3dzEifQ._AmTHcuM701F6x6iBmt_yA";

var dotSize = 2;
if (window.devicePixelRatio > 1) {
    dotSize = 4;
}

var option = {
    mapbox3D: {
        style: "mapbox://styles/mapbox/dark-v10",
        center: [-95, 38],
        pitch: 50,
        zoom: 3.9,
    },
    // tooltip: {
    //     trigger: 'item',
    //     formatter: "{a} <br/>{b}: {c} ({d}%)"
    // },
    legend: {
        orient: 'vertical',
        x: '8px',
        y: '200px',
        itemWidth: 40,
        itemHeight: 20,
        textStyle: {
            color: 'ui_color_light'
        },
        data: ['drone', 'building_box', 'o2_bar', 'c0_bar', 'h2s_bar', 'hcn_bar', 'lel_bar', "particle_bar", "firefighter", "Pulse", "spo2"]
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        scale: '100%',
        type: 'value',
        splitLine: {
            show: false
        },
    },
    grid: [{
        show: true,
        left: 0,
        right: 0,
        top: 0,
        bottom: window.innerHeight - 80,
        borderColor: 'transparent',
    }],
    visualMap: {
        max: 1200,
        calculable: true,
        // realtime: false,
        seriesIndex: 10,
        inRange: {
            color: ['#fdae61', '#f46d43', '#d73027', '#a50026']
        },
    },
  
    series: [
        // {
        //     name: "mapdots",
        //     type: "scatter3D",
        //     progressive: 1e6,
        //     coordinateSystem: 'mapbox3D',
        //     symbolSize: dotSize,
        //     blendMode: 'lighter',
        //     // large: true,
        //     // postEffect: {
        //     //     enable: false
        //     // },
        //     symbolSize: 5,
        //     itemStyle: {
        //         normal: {
        //             color: ui_color //'#30AAEE' //20AADD
        //         },
        //         silent: true,
        //     },
        //     dimensions: ['lng', 'lat'],
        //     data:  [
        //         // [-77.045, 38.896]
        //     ],
        //     z: 99
        // },


        // Air Quality Display
        {
            name: "o2_bar",
            type: 'bar3D',
            coordinateSystem: 'mapbox3D',
            data: [],
            barSize: 0.2,
            minHeight: 1,
            silent: true,
            itemStyle: {
                color: 'green',
            }
        },
        {
            name: "co_bar",
            type: 'bar3D',
            coordinateSystem: 'mapbox3D',
            data: [],
            barSize: 0.2,
            minHeight: 1,
            silent: true,
            itemStyle: {
                color: 'gray',
            }
        },
        {
            name: "h2s_bar",
            type: 'bar3D',
            coordinateSystem: 'mapbox3D',
            data: [],
            barSize: 0.2,
            minHeight: 1,
            silent: true,
            itemStyle: {
                color: 'orange',
            }
        },
        {
            name: "hcn_bar",
            type: 'bar3D',
            coordinateSystem: 'mapbox3D',
            data: [],
            barSize: 0.2,
            minHeight: 1,
            silent: true,
            itemStyle: {
                color: 'rgb(248,135,135)',
            }
        },
        {
            name: "lel_bar",
            type: 'bar3D',
            coordinateSystem: 'mapbox3D',
            data: [],
            barSize: 0.2,
            minHeight: 1,
            silent: true,
            itemStyle: {
                color: 'rgb(112,150,126)',
            }
        },
        {
            name: "particle_bar",
            type: 'bar3D',
            coordinateSystem: 'mapbox3D',
            data: [],
            barSize: 0.2,
            minHeight: 1,
            silent: true,
            itemStyle: {
                color: ui_color,
            }
        },

        // Vital Display
        {
            name: "firefighter",
            type: 'scatter3D',
            coordinateSystem: 'mapbox3D',
            data: [],
            symbolSize: 15,
            silent: false,
            itemStyle: {
                color: 'red',
            }
        },
        {
            name: "Pulse",
            type: "line",
            smooth: true,
            symbol: 'none',
            itemStyle: {
                color: ui_color
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'red'
                }, {
                    offset: 1,
                    color: 'rgb(51, 51, 50)'
                }])
            },
            data: []
        },
        {
            name: "spo2",
            type: "line",
            smooth: true,
            symbol: 'none',
            itemStyle: {
                color: ui_color
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#8ec6ad'
                }, {
                    offset: 1,
                    color: 'rgb(51, 51, 50)'
                }])
            },
            data: []
        },
        // Building Display
        {
            name: "building_box",
            type: 'bar3D',
            shading: 'lambert',
            coordinateSystem: 'mapbox3D',
            data: [],
            barSize: 1.5,
            minHeight: 100,
            itemStyle: {
                color: ui_color,
            }
        },
        // Drone Thermal Display
        {
            name: "drone",
            type: 'scatter3D',
            coordinateSystem: 'mapbox3D',
            data: [],
            symbolSize: 20,
            silent: false,
            itemStyle: {
                color: 'red',
            }
        },


        // {
        //     name: "Statistics",
        //     type: "pie",
        //     radius: ['8%', '16%'],
        //     center: ["190px", "160px"],
        //     avoidLabelOverlap: true,
        //     itemStyle: {
        //         normal: {
        //             color: ui_color,
        //             shadowBlur: 5
        //         }
        //     },
        //     label: {
        //         emphasis: {
        //             show: true,
        //             textStyle: {
        //                 fontSize: '18',
        //                 fontWeight: 'bold'
        //             }
        //         }
        //     },
        //     data: []
        // }
    ]
}
chart.setOption(option);

var map = chart.getModel().getComponent('mapbox3D').getMapbox();
map.addControl(new mapboxgl.NavigationControl());

window.addEventListener("mousewheel", function (event) {
    event.preventDefault();
}, { passive: false });
window.addEventListener("DOMMouseScroll", function (event) {
    event.preventDefault();
}, { passive: false });