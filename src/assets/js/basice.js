export default {
    data_server_url : "http://114.64.228.103:8902/",
    // file_server_url : "http://peking.caupdcloud.com/dongcheng/assets/mapdata/json/",
    // icon_url: "http://peking.caupdcloud.com/dongcheng/assets/mapdata/images/",
    // server_img_url: "http://114.64.228.103:8089/",
    colors: ["#85ccc8",'#a7add7',"#d8a79b",'#85b6db',"#b4d89c","#ceb1a8",
        "#89cbe8", "#d6a2c7",'#dfb27e',"#00FFFF",'#E0F319',"#00FF59", "#DE61FA",
        "#3A8281","#F51B04","#630B7C","#C2B6F2","#05534F","#055317","#51C46C",
        "#BFDC3F","#C88A78","#F702A4"],
    grid: {//图表整体
        containLabel:false,
        left: 30,
        top: 90,
        bottom:50,
    },
    echart_title: {//统计图title
        left:10,
        top:10,
        textStyle:{
            color: '#222',
            fontSize: 16
        }
    },
    legend: {//图例
        show: true,
        icon:"circle",
        // left:10,
        top:40,
        textStyle: {
            fontSize: 12,
            color: "#222"
        },
    },
    coordinate_axis_style: {//折线、柱状x、y轴样式配置
        axisLine: {
            show: true,
            lineStyle: {
                color: "#666",
            }
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: "#666",
            },
        },
        splitLine: {
            lineStyle: {
                type: 'dashed',
                color: '#ddd'
            }
        },
    }
}