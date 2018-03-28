var serviceVisitChart = echarts.init(document.getElementById('serviceVisitContainer'));
var mapChart = echarts.init(document.getElementById('mapContainer'));
var userAndServiceChart = echarts.init(document.getElementById('userAndServiceStatContainer'));

var appStatChart = echarts.init(document.getElementById('appStatContainer'));


(function (window) {
	createMap();
    intervalFunc();
    setInterval(intervalFunc, '30000');
    createRandomError();
    setInterval(createRandomError, '30000');

    //init();
    //check();
    //bindEvents();
}(window));

function intervalFunc() {
    //createRandomData();
    initPage();
}
function createRandomError() {
    //var str = '拱墅区　上城区　下城区　江干区　西湖区　滨江区　萧山区　余杭区　建德市　富阳市　临安市　桐庐县　淳安县　海曙区　江东区　江北区　北仑区　镇海区　鄞州区　余姚市　慈溪市　奉化市　象山县　宁海县　鹿城区　龙湾区　瓯海区　瑞安市　乐清市　洞头县　永嘉县　平阳县　苍南县　文成县　泰顺县　南湖区　秀洲区　海宁市　平湖市　桐乡市　嘉善县　海盐县　吴兴区　南浔区　德清县　长兴县　安吉县　越城区　诸暨市　上虞市userAndServiceChart　嵊州市　绍兴县　新昌县　婺城区　金东区　兰溪市　义乌市　东阳市　永康市　武义县　浦江县　磐安县　柯城区　衢江区　江山市　常山县　开化县　龙游县　定海区　普陀区　岱山县　嵊泗县　椒江区　黄岩区　路桥区　温岭市　临海市　玉环县　三门县　天台县　仙居县　莲都区　龙泉市　青田县　缙云县　遂昌县　松阳县　云和县　庆元县　';
    var str = '金华市 德清县 龙泉市 缙云县';
    var zhejiangDistrict = str.split(" ");
    var myDate = new Date();
    var date = myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate();

    var url = [];
    for (var i = 0; i < 4; i++) {
        var u = config.ProxyUrl + config.countyArray[i] + config.getServiceVisitInfo + "&username=&begin=2012/01/01&end="+date+"&page=1&start=0&limit=1";
        url.push(u);
    }
    $.when(getData(url[0]), getData(url[1]), getData(url[2]), getData(url[3])
    ).then(function (data1, data2, data3, data4) {
        if (data1[0].ResultSets == null && data2[0].ResultSets == null && data3[0].ResultSets == null && data4[0].ResultSets == null) { $('.serverStatTableContainer tbody').html("暂无访问记录！"); }
        else {
            var res = data1[0].ResultSets;
            var d = new Date(parseInt(res[0].BEGINTIME.substring(6, res[0].BEGINTIME.length - 7))).toLocaleTimeString();
			   var lastUsername=res[0].USERNAME;
			if(res[0].USERNAME==""||res[0].USERNAME==null)
			{
				lastUsername="访客";				
			}
            var oneRequest = '<tr><td>' + lastUsername + '</td><td>' + res[0].REQUESTURL.substr(27, 10) + '</td><td>' + zhejiangDistrict[0] + '</td><td>' + d + '</td></tr>';
            if ($('.serverStatTableContainer tbody tr').length > 3) {
                $('.serverStatTableContainer tbody tr').eq(0).remove();
            }
            $('.serverStatTableContainer tbody').append(oneRequest);
            res = data2[0].ResultSets;
            d = new Date(parseInt(res[0].BEGINTIME.substring(6, res[0].BEGINTIME.length - 7))).toLocaleTimeString();
				   var lastUsername=res[0].USERNAME;
			if(res[0].USERNAME==""||res[0].USERNAME==null)
			{
				lastUsername="访客";				
			}
            oneRequest = '<tr><td>' + lastUsername + '</td><td>' + res[0].REQUESTURL.substr(27, 10) + '</td><td>' + zhejiangDistrict[1] + '</td><td>' + d + '</td></tr>';
            if ($('.serverStatTableContainer tbody tr').length > 3) {
                $('.serverStatTableContainer tbody tr').eq(0).remove();
            }
            $('.serverStatTableContainer tbody').append(oneRequest);
            res = data3[0].ResultSets;
            d = new Date(parseInt(res[0].BEGINTIME.substring(6, res[0].BEGINTIME.length - 7))).toLocaleTimeString();
				   var lastUsername=res[0].USERNAME;
			if(res[0].USERNAME==""||res[0].USERNAME==null)
			{
				lastUsername="访客";				
			}
            oneRequest = '<tr><td>' + lastUsername + '</td><td>' + res[0].REQUESTURL.substr(27, 10) + '</td><td>' + zhejiangDistrict[2] + '</td><td>' + d + '</td></tr>';
            if ($('.serverStatTableContainer tbody tr').length > 3) {
                $('.serverStatTableContainer tbody tr').eq(0).remove();
            }
            $('.serverStatTableContainer tbody').append(oneRequest);
            res = data4[0].ResultSets;
            d = new Date(parseInt(res[0].BEGINTIME.substring(6, res[0].BEGINTIME.length - 7))).toLocaleTimeString();
				   var lastUsername=res[0].USERNAME;
			if(res[0].USERNAME==""||res[0].USERNAME==null)
			{
				lastUsername="访客";				
			}
            oneRequest = '<tr><td>' + lastUsername + '</td><td>' + res[0].REQUESTURL.substr(27, 10) + '</td><td>' + zhejiangDistrict[3] + '</td><td>' + d + '</td></tr>';
            if ($('.serverStatTableContainer tbody tr').length > 3) {
                $('.serverStatTableContainer tbody tr').eq(0).remove();
            }
            $('.serverStatTableContainer tbody').append(oneRequest);

            $('.serverStatTableContainer').scrollTop($('.serverStatTableContainer table').height() - $('.serverStatTableContainer').height());
        }
    }, function (result) {
        //$("#result").append("请求失败。原因：" + (result.responseText || result));
    });

    var iurl = [];
    for (var i = 0; i < 4; i++) {
        var u = config.ProxyUrl + config.ptserviceUrlArray[i] + config.getServiceNum;
        iurl.push(u);
    }
    $.when(getData(iurl[0]), getData(iurl[1]), getData(iurl[2]), getData(iurl[3])
    ).then(function (data1, data2, data3, data4) {
        //$('.bugAlertTableContainer tbody').html("");
        var res1 = JSON.parse(data1[0]);
        $.each(res1, function (k, item) {
            $.ajax({
                async: true,
                type: 'GET',
                timeout: 30,
                url: item.BACKURL,
                dataType: 'json',
                success: function () {
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //debugger;
                    var myDate = new Date();
                    var d = myDate.toLocaleTimeString();
                    var STATUS = "";
                    if (XMLHttpRequest.status == "400") {
                        STATUS = "响应超时";
                    }
                    if (XMLHttpRequest.status == "timeout") {
                        STATUS = "响应超时";
                    }
                    if (XMLHttpRequest.status == "404") {
                        STATUS = "未找到";
                    }
                    if (XMLHttpRequest.status == "500") {
                        STATUS = "未响应";
                    }
                    if (STATUS != "") {
                        var oneErrorRequest = '<tr><td>' + item.NAME + '</td><td>' + zhejiangDistrict[0] + '</td><td>' + STATUS + '</td><td>' + d + '</td></tr>';

                        if ($('.bugAlertTableContainer tbody tr').length > 3) {
                            $('.bugAlertTableContainer tbody tr').eq(0).remove();
                        }
                        $('.bugAlertTableContainer tbody').append(oneErrorRequest);

                        $('.bugAlertTableContainer').scrollTop($('.bugAlertTableContainer table').height() - $('.bugAlertTableContainer').height());

                    }
                    //console.error(textStatus + errorThrown);
                }

            });


        });
        var res2 = JSON.parse(data2[0]);
        $.each(res2, function (k, item) {
            $.ajax({
                async: true,
                type: 'GET',
                timeout: 30,
                url: item.BACKURL,
                dataType: 'json',
                success: function () {
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //debugger;
                    var myDate = new Date();
                    var d = myDate.toLocaleTimeString();
                    var STATUS = "";
                    if (XMLHttpRequest.status == "400") {
                        STATUS = "响应超时";
                    }
                    if (XMLHttpRequest.status == "timeout") {
                        STATUS = "响应超时";
                    }
                    if (XMLHttpRequest.status == "404") {
                        STATUS = "未找到";
                    }
                    if (XMLHttpRequest.status == "500") {
                        STATUS = "未响应";
                    }
                    if (STATUS != "") {
                        var oneErrorRequest = '<tr><td>' + item.NAME + '</td><td>' + zhejiangDistrict[0] + '</td><td>' + STATUS + '</td><td>' + d + '</td></tr>';

                        if ($('.bugAlertTableContainer tbody tr').length > 3) {
                            $('.bugAlertTableContainer tbody tr').eq(0).remove();
                        }
                        $('.bugAlertTableContainer tbody').append(oneErrorRequest);

                        $('.bugAlertTableContainer').scrollTop($('.bugAlertTableContainer table').height() - $('.bugAlertTableContainer').height());

                    }
                    //console.error(textStatus + errorThrown);
                }

            });


        });
        var res3 = JSON.parse(data3[0]);
        $.each(res3, function (k, item) {
            $.ajax({
                async: true,
                type: 'GET',
                timeout: 30,
                url: item.BACKURL,
                dataType: 'json',
                success: function () {
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //debugger;
                    var myDate = new Date();
                    var d = myDate.toLocaleTimeString();
                    var STATUS = "";
                    if (XMLHttpRequest.status == "400") {
                        STATUS = "响应超时";
                    }
                    if (XMLHttpRequest.status == "timeout") {
                        STATUS = "响应超时";
                    }
                    if (XMLHttpRequest.status == "404") {
                        STATUS = "未找到";
                    }
                    if (XMLHttpRequest.status == "500") {
                        STATUS = "未响应";
                    }
                    if (STATUS != "") {
                        var oneErrorRequest = '<tr><td>' + item.NAME + '</td><td>' + zhejiangDistrict[0] + '</td><td>' + STATUS + '</td><td>' + d + '</td></tr>';

                        if ($('.bugAlertTableContainer tbody tr').length > 3) {
                            $('.bugAlertTableContainer tbody tr').eq(0).remove();
                        }
                        $('.bugAlertTableContainer tbody').append(oneErrorRequest);

                        $('.bugAlertTableContainer').scrollTop($('.bugAlertTableContainer table').height() - $('.bugAlertTableContainer').height());

                    }
                    //console.error(textStatus + errorThrown);
                }

            });


        });
        var res4 = JSON.parse(data4[0]);
        $.each(res4, function (k, item) {
            $.ajax({
                async: true,
                type: 'GET',
                timeout: 30,
                url: item.BACKURL,
                dataType: 'json',
                success: function () {
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //debugger;
                    var myDate = new Date();
                    var d = myDate.toLocaleTimeString();
                    var STATUS = "";
                    if (XMLHttpRequest.status == "400") {
                        STATUS = "响应超时";
                    }
                    if (XMLHttpRequest.status == "timeout") {
                        STATUS = "响应超时";
                    }
                    if (XMLHttpRequest.status == "404") {
                        STATUS = "未找到";
                    }
                    if (XMLHttpRequest.status == "500") {
                        STATUS = "未响应";
                    }
                    if (STATUS != "") {
                        var oneErrorRequest = '<tr><td>' + item.NAME + '</td><td>' + zhejiangDistrict[0] + '</td><td>' + STATUS + '</td><td>' + d + '</td></tr>';

                        if ($('.bugAlertTableContainer tbody tr').length > 3) {
                            $('.bugAlertTableContainer tbody tr').eq(0).remove();
                        }
                        $('.bugAlertTableContainer tbody').append(oneErrorRequest);

                        $('.bugAlertTableContainer').scrollTop($('.bugAlertTableContainer table').height() - $('.bugAlertTableContainer').height());

                    }
                    //console.error(textStatus + errorThrown);
                }

            });


        });
    }, function (result) {
        //$("#result").append("请求失败。原因：" + (result.responseText || result));
    });
}


function sortNumber(a, b) {
    return b.num - a.num
}
function createRandomData() {

    serviceVisit();

    var str = '金华市 德清县 龙泉市 缙云县';
    var zheJiangShi = ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'];
    var zhejiangDistrict = str.split(" ");
    var url = [];
    //接入系统数
    $('#sumDataShow #sumSysNum').html(zhejiangDistrict.length);
    for (var i = 0; i < 4; i++) {
        var u = config.ProxyUrl + config.countyArray[i] + config.getUserNum;
        url.push(u);
    }
    for (var i = 0; i < 4; i++) {
        var u = config.ProxyUrl + config.ptserviceUrlArray[i] + config.getServiceNum;
        url.push(u);
    }
    for (var i = 0; i < 4; i++) {
        var u = config.ProxyUrl + config.ptserviceUrlArray[i] + config.getApplicationNum;
        url.push(u);
    }

    $.when(getData(url[0]), getData(url[1]), getData(url[2]), getData(url[3]), getData(url[4]), getData(url[5]), getData(url[6]), getData(url[7]), getData(url[8]), getData(url[9]), getData(url[10]), getData(url[11])).then(function (data0, data1, data2, data3,data4, data5, data6, data7, data8,data9, data10, data11) {
        //用户
        var u = [];
        u[0] = strToJson(data0[0]);
        u[1] = strToJson(data1[0]);
        u[2] = strToJson(data2[0]);
        u[3] = strToJson(data3[0]);
        var user=[];
        var sumUserNum = 0;
        var usersort = [];
        for(var i = 0;i<4;i++){
            user[i]={
                name: zhejiangDistrict[i],
                num: u[i].TotalCount
            }
            sumUserNum += u[i].TotalCount;
            usersort.push(user[i]);
        }
        $('#sumDataShow #sumUserNum').html(sumUserNum);

        usersort.sort(sortNumber);
        $('#topUserDataContainer .top1Num').html(usersort[0]['name'] + usersort[0]['num']);
        $('#topUserDataContainer .top2Num').html(usersort[1]['name'] + usersort[1]['num']);
        $('#topUserDataContainer .top3Num').html(usersort[2]['name'] + usersort[2]['num']);
        //服务
        var s = [];
        s[0] = strToJson(data4[0]);
        s[1] = strToJson(data5[0]);
        s[2] = strToJson(data6[0]);
        s[3] = strToJson(data7[0]);
        var service=[];
        var sumServiceNum = 0;
        var servicesort = [];
        for(var i = 0;i<4;i++){
            service[i]={
                name: zhejiangDistrict[i],
                num: s[i].length
            }
            servicesort.push(service[i]);
            sumServiceNum += s[i].length;
        }
        $('#sumDataShow #sumServiceNum').html(sumServiceNum);

        servicesort.sort(sortNumber);
        $('#topServiceDataContainer .top1Num').html(servicesort[0]['name'] + servicesort[0]['num']);
        $('#topServiceDataContainer .top2Num').html(servicesort[1]['name'] + servicesort[1]['num']);
        $('#topServiceDataContainer .top3Num').html(servicesort[2]['name'] + servicesort[2]['num']);
        //应用
        var a = [];
        a[0] = strToJson(data8[0]);
        a[1] = strToJson(data9[0]);
        a[2] = strToJson(data10[0]);
        a[3] = strToJson(data11[0]);
        var app=[];
        var sumAppNum = 0;
        var appsort = [];
        for(var i = 0;i<4;i++){
            app[i]={
                name: zhejiangDistrict[i],
                num: a[i].length
            }
            appsort.push(app[i]);
            sumAppNum += a[i].length;
        }
        $('#sumDataShow #sumAppNum').html(sumAppNum);
        appsort.sort(sortNumber);
        $('#topAppDataContainer .top1Num').html(appsort[0]['name'] + appsort[0]['num']);
        $('#topAppDataContainer .top2Num').html(appsort[1]['name'] + appsort[1]['num']);
        $('#topAppDataContainer .top3Num').html(appsort[2]['name'] + appsort[2]['num']);


        datashow(user,service,app);

    }, function (result) {
        $("#result").append("请求失败。原因：" + (result.responseText || result));
    })

    }

function datashow(userData, serviceData, appData) {

    var data = [];
    var sumAppNum = 0;
    var sumServiceNum = 0;
    var sumUserNum = 0;
    for (var i = 0; i < appData.length; i++) {
        var oneData = {
            disTrictName: userData[i].name,
            userNum: userData[i].num,
            serviceNum: serviceData[i].num,
            appNum: appData[i].num
        }
        data.push(oneData);
        sumAppNum += appData[i].num;
        sumServiceNum += serviceData[i].num;
        sumUserNum += userData[i].num;

    }

    var str = '金华市 德清县 龙泉市 缙云县';
    var zheJiangShi = ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'];
    var zhejiangDistrict = str.split(" ");
    var sysData = [];
    var errorInLinkDis = "";
    for (var i = 0 ; i < zheJiangShi.length; i++) {

        var dis = zheJiangShi[i];
        var oneData = {
            disTrictName: dis,
            sysNum: GetRandomNum(0, 10)
        }
        sysData.push(oneData);
        var hh = GetRandomNum(0, 100);
        errorInLinkDis += (hh > 98 ? (dis + '  ') : '');
    }
    
    var afterRandomData = {
        data: data,
        sysData: sysData,
        errorInLinkDis: errorInLinkDis,
        sumUserNum: sumUserNum,
        sumServiceNum: sumServiceNum,
        sumAppNum: sumAppNum,
        sumSysNum: zhejiangDistrict.length,//sumSysNum,

    };


    
    statAppNum(afterRandomData);
    setUserAndService(afterRandomData);

}
function strToJson(str) {
    var json = eval('(' + str + ')');
    return json;
}





//根据参数初始化页面信息
function initPage() {

    var data = createRandomData();


}
//中部地图
function createMap() {

    var geoCoordMap = {
        "杭州市": [120.19, 30.26],
        "宁波市": [121.56, 29.86],
        "温州市": [120.65, 28.01],
        "嘉兴市": [120.76, 30.77],
        "湖州市": [120.10, 30.86],
        "绍兴市": [120.58, 30.01],
        "金华市": [119.64, 29.12],
        "衢州市": [118.88, 28.97],
        "舟山市": [122.06, 30.0],
        "丽水市": [119.92, 28.45],
        "台州市": [121.42, 28.66]

    };
	var zheJiangShi = ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'];
    var num = [7,8,8,5,3,5,7,4,2,6,8];
    var randomData = [];
        for(var key in geoCoordMap){
            var oneData = {
                name: key
            }
            randomData.push(oneData);
        }

    var convertData = function (randomData) {
        var res = [];
        for (var i = 0; i < randomData.length; i++) {
            var geoCoord = geoCoordMap[randomData[i].name];
            if (geoCoord) {
                res.push({
                    name: randomData[i].name,
                    value: geoCoord.concat(num[i])
                });
            }
        }
        return res;
    };

    var convertedData = convertData(randomData);

    //	randomData.sort(function(a,b){
    //		return    a.value-b.value;
    //	})

    var selectedItems = [];
    var categoryData = [];
    var barData = [];

    var count = randomData.length;
    for (var i = 0; i < num.length; i++) {
        categoryData.push(zheJiangShi[i]);
        barData.push(num[i]);
    }
     categoryData.reverse();
     barData.reverse();
	 
    option = {
        backgroundColor: '',
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',

        title: {
            text: '已建成数字城市('+ eval(num.join("+"))+'个)',
            textStyle: {
                color: '#fff',
                fontWeight: 'bolder',
            },

            left: '65%',
            top: 15

        },
        geo: {
            map: 'zhejiang',
            left: '20',
            right: '35%',
            center: [120.5, 29.26],
            zoom: 0.65,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    borderColor: '#FFFACD',
                    areaColor: '#36648B',
                    opacity: 0.5,
                    shadowColor: '#FFFACD',
                    shadowBlur: 10
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        tooltip: {
            trigger: 'item',
			
			formatter: function (params, ticket, callback) {
                //console.log(params.data.value[2])
                return params.name + '：' + params.data.value[2];
            }

        },
        grid: {
            right: 40,
            top: 60,
            bottom:10,
            width: '30%'
        },
        xAxis: {
            type: 'value',
            scale: true,
            position: 'top',
            min: 0,
            max: 10,
            interval: 2,
            boundaryGap: false,
            splitLine: {
                show: false
            },
            //        axisLine: {
            //            show: false
            //        },
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 2,
                textStyle: {
                    color: '#aaa'
                }
            },
        },
        yAxis: {
            type: 'category',
            nameGap: 16,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisTick: {
                show: false,
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#ddd'
                }
            },
            data: categoryData
        },
        series: [{
            //  mapShow,
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertedData,
            symbolSize: function (val) {
                return (val[2]) * 3;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }, {
            id: 'bar',
            zlevel: 2,
            type: 'bar',
            symbol: 'none',
            label: {
                normal: {
                    show: true,
                    position: 'right'
                }
            },
            itemStyle: {
                normal: {
                    color: '#ddb926'
                }
            },

            data: barData
        }]
    };
    mapChart.setOption(option);
	mapChart.on('click', function (params) {
			window.open("../../../OM_city/citypages/monitorCenterShow/");	
	});

}
//左下角应用统计
function statAppNum(data) {
    var XData = [];
    var YData = [];
    for (var i = 0 ; i < data['data'].length ; i++) {
        XData.push(data['data'][i]["disTrictName"]);
        YData.push(data['data'][i]["appNum"]);
    }

    option = {

        tooltip: {
            trigger: 'axis'
        },
        grid: {
            width: '85%',
            height: '80%',
            left: '7.5%',
            bottom: '5%',
            containLabel: true
        },
        textStyle: {
            color: '#fff',
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: XData
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '示范应用个数',
                type: 'line',
                stack: '数量',
                areaStyle: {
                    normal: {
                        color: '#20B2AA',
                        opacity: 0.5,
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#20B2AA',
                        width: 2,
                        opacity: 0.8,
                    }
                },
                data: YData
            },

        ]
    };

    appStatChart.setOption(option);

}
//中间底部用户与服务数量
function setUserAndService(data) {

    var XData = [];
    var userYData = [];
    var serviceYData = [];

    for (var i = 0 ; i < data['data'].length ; i++) {
        XData.push(data['data'][i]["disTrictName"]);
        serviceYData.push(data['data'][i]["serviceNum"]);
        userYData.push(data['data'][i]["userNum"]);
    }

    option = {
        grid: {
            width: '85%',
            height: '70%',
            left: '7.5%',
            bottom: '12.5%'
        },
        tooltip: {
            trigger: 'axis'
        },
        textStyle: {
            color: '#fff',
            fontStyle: 'normal',
        },
        legend: {
            data: ['用户', '服务'],
            textStyle: {
                color: '#fff',
                backgroundColor: 'rgba(232,163,0,0.2)'
            },
        },
        xAxis: [
            {
                type: 'category',
                data: XData
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '用户',
                min: 0,
                max: 20,
                interval: 4,
                axisLabel: {
                    formatter: '{value} 人'
                }
            },
            {
                type: 'value',
                name: '服务',
                min: 0,
                max: 100,
                interval: 20,
                axisLabel: {
                    formatter: '{value} 个'
                }
            }
        ],
        series: [

            {
                name: '用户',
                type: 'bar',
                data: userYData,
                itemStyle: {
                    normal: {
                        color: '#00868B',
                        opacity: 0.8
                    }
                }
            },
            {
                name: '服务',
                type: 'line',
                lineStyle: {
                    normal: {
                        color: '#f4e925',
                        width: 2,
                        opacity: 0.8,
                        type: 'dotted'
                    }
                },
                smooth: true,
                yAxisIndex: 1,
                data: serviceYData
            }
        ]
    };

    userAndServiceChart.setOption(option);


}
//右上角服务访问
function serviceVisit() {

    var str = '金华市 德清县 龙泉市 缙云县';
    var zhejiangDistrict = str.split(" ");
    var chartdata = [];
    $.when(getData(config.ProxyUrl + config.countyArray[0] + config.getServiceVisitNum), getData(config.ProxyUrl + config.countyArray[1] + config.getServiceVisitNum), getData(config.ProxyUrl + config.countyArray[2] + config.getServiceVisitNum), getData(config.ProxyUrl + config.countyArray[3] + config.getServiceVisitNum)
).then(function (data1, data2, data3, data4) {
    var row1 = {
        value: parseInt(data1[0].TotalCount),
        name: zhejiangDistrict[0]
    }
    var row2 = {
        value: parseInt(data2[0].TotalCount),
        name: zhejiangDistrict[1]
    }
    var row3 = {
        value: parseInt(data3[0].TotalCount),
        name: zhejiangDistrict[2]
    }
    var row4 = {
        value: parseInt(data4[0].TotalCount),
        name: zhejiangDistrict[3]
    }
    chartdata.push(row1);
    chartdata.push(row2);
    chartdata.push(row3);
    chartdata.push(row4);
    option = {
        color: ['#7AC8D6', '#83B37B', '#BFDB81', '#D9C484'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        itemStyle: {
            normal: {
            }
        },
        series: [
            {
                name: '服务访问',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        formatter: '{b}: {c}'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: chartdata
            }
        ]
    };
    serviceVisitChart.setOption(option)
}, function (result) {
    //$("#result").append("请求失败。原因：" + (result.responseText || result));
});



}
//用于并发请求
function getData(requesturl) {
    return ajaxUtil.get(requesturl);
}
//获取随机数函数
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}



