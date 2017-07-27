/**
 * Created by wayne on 2017/7/26.
 */

function getParams() {
    var aQuery = window.location.href.split("?");//取得Get参数
    var aGET = [];
    if (aQuery.length > 1) {
        var aBuf = aQuery[1].split("&");
        aGET.length = aBuf.length;
        for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
            var aTmp = aBuf[i].split("=");//分离key与Value
            aGET[aTmp[0]] = decodeURIComponent(aTmp[1]);
        }
    }
    return aGET;
}

function resolveData(data) {
    var dataArray = data.data;
    $('#table-body').empty();
    $.each(dataArray,function(n,object) {
        var tr = '<tr><td>'+(n+1)+'</td><td>'+object.score+'</td><td>'+object.name+'</td></tr>';
        $('#table-body').append(tr);
    });
}

$(function () {
    var params = getParams();
    if(params.length>0&&null!==params['rank']&&null!==params['score']&&null!==params['name']){
        var tr = '<tr><td>'+params['rank']+'</td><td>'+params['score']+'</td><td>'+params['name']+'</td></tr>';
        $("#table-body").append(tr);
        var btn = '<button type="button" class="btn btn-info" style="vertical-align:middle;width: 100%" onclick="btnTopClick()" id="btn-top">查看TOP10</button>';
        $('table').after(btn);
    }else{
        top10();
    }
});

function btnTopClick(){
    $('#btn-top').hide();

    top10();
}

function top10() {
    $.post("http://wycode.cn/api/score/getTopScores",
        {
            gameId: "1"
        },
        function (data) {
            resolveData(data);
        });
}

function download() {
    if(is_weixin()){
        alert('请在右上角点击三个点，选择用浏览器打开！')
    }else{
        location.href='roll.apk'
    }
}

function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
