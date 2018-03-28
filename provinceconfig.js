var config = {
    title: "浙江省数字城市监控平台 | 省级统一监控",
    copyrightCompany: "浙江省地理信息中心",
    copyrightUrl: "http://www.zjgis.com",
    ProxyUrl: "../../proxy.ashx?",
    ProxyUrlforportal: "../proxy.ashx?",
    ProxyUrlForLogin: "proxy.ashx?",
   
    serviceUrl: "http://localhost/OM_ZJ/ServiceLogin/",
    ptServicejyUrl: "http://localhost/OM_ZJ/ptServicejy/",
    provincesiteUrl: "../OM_ZJ/province.html",

    countyutl:"../../../OM_COUNTY",
    county1: "http://lsggpt.htgis.com/geosoc/",//丽水
    county2: "http://lsggpt.htgis.com/geosoc/",//德清
    county3: "http://lsggpt.htgis.com/geosoc/",//缙云

    county4: "http://lsggpt.htgis.com/geosoc/",//龙泉

countyArray: ["http://lsggpt.htgis.com/geosoc/" , "http://lsggpt.htgis.com/geosoc/", "http://lsggpt.htgis.com/geosoc/","http://lsggpt.htgis.com/geosoc/"],
    ptserviceUrlArray:["http://localhost/OM_COUNTY/ptServicejh/", "http://localhost/OM_COUNTY/ptServicejy/", "http://localhost/OM_COUNTY/ptServicelq/", "http://localhost/OM_COUNTY/ptServicedq/"],

    getUserNum: "rest/Authentic/UserService/QueryUsers",
    getServiceNum: "getmapService/GetMapServiceInfo?f=json",
    getApplicationNum: "InfoService/GetApplicationInfo?state=-1",
    getServiceVisitNum: "rest/Logger/ServiceLogService/QueryLogs",
    getServiceVisitInfo: "rest/Logger/ServiceLogService/SearchLogs?",


   //运行分析
    StaticSingServices: "rest/StaticService/StaticSingServices?_dc=1491646934167&begin=",
    ServiceLogSearchService: "rest/Logger/ServiceLogService/SearchLogs?_dc=1492046675436&username=&begin=",
    UserService:"rest/Authentic/UserService/QueryUsers?_dc=1495182424801&page=1&start=0&pagesize=25",
    highchartsExportService: "http://localhost/OM_ZJ/HighchartsExport/HighchartsExport.axd",

    cookie: {
        tokenCookieName: "ZJGIS_USER_TOKEN",
        //cookie到期时间(小时)
        cookieExpire: 24
    },





};