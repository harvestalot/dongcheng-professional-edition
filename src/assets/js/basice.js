export default {
    // data_server_url : "http://114.64.228.103:8902/",
    reachability_url: "http://114.64.228.103/reachcircle/walkServlet",//可达性覆盖范围服务地址
    icon_url: "http://114.64.228.104/professional/",
    timer:"",
    colors: ["#85ccc8",'#a7add7',"#d8a79b",'#85b6db',"#b4d89c","#ceb1a8",
        "#89cbe8", "#d6a2c7",'#dfb27e',"#00FFFF",'#E0F319',"#00FF59", "#DE61FA",
        "#3A8281","#F51B04","#630B7C","#C2B6F2","#05534F","#055317","#51C46C",
        "#BFDC3F","#C88A78","#F702A4"],
    chromatic_gradient:["#C8C8A9", "#83AF9B", "#8A977B", "#F9CDAD", "#FC9D9A",
         "#E58308", "#DC5712", "#FE4365",],
    grid: {//图表整体
        containLabel:false,
        left: 30,
        top: 100,
        bottom:70,
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
        top: 35,
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