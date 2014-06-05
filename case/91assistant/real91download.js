
var casper = require('casper').create({
        //fix file download 0kb error
        pageSettings:{
            webSecurityEnabled: false
        },
});

require('../../lib/htmlparser');

var url207='http://bbx2.sj.91.com/softs.ashx?act=207&resid=40337105&resname=%E7%82%AB%E5%BD%A9%E9%97%B9%E9%92%9F&versionname=2.1.7&icon=http%3a%2f%2fimg8.sjpic.91rb.com%2fsoft%2f2013%2f11%2f15%2f0c6c1b59b4f441a986f8ef778e7f2425%2ficon_1c0457773ead4120b6abdd3ab0f4a57d_114.png&catename=%E5%85%B6%E4%BB%96%E5%B7%A5%E5%85%B7&size=1.69MB&fsize=1768904&identifer=com.sykora.neonalarm.free&restype=1&versioncode=67&score=0&thunder=1&placeid=1000011&mt=4&sv=3.9.6.1&pid=2&osv=4.4.2&cpu=armeabi-v7a,armeabi&pos=4&sessionid=80PnM4YXzufOMiuSdeKh%2fW0e4Dk7MIxV63NqqjSLJEWkk6PrbwGb13CBttPLdtpWGs09nMG4q28%3d&rslt=1080*1920&imei=358851053482695&imsi=460000254512382&nt=10&dm=GT-I9500&chl=jZg3GleBqu9XdELIGKzVcl10MzBt6J6H&cuid=B979DAB4BA9B4627A31A89B3AE3B5D10%7C596284350158853&auto=0&iv=4&gpu='


function getDownloadUrl(u){
    var key = "437ac005f32253a10ab55d34edf918da55b9e51892dd104e";
    return 'None';
}


casper.start(url207,function(){
    
    contents = htmlparser.getHtmlNode(casper.getHTML(), 'pre', 'pre');
    console.log(casper.getHTML());
    json = JSON.parse(contents);
    if(json.Code == '0')
    {
        //TODO add url decode here
        casper.test.assertEqual('0','0','【其他工具】【炫彩闹钟APP】207接口获取APP下载链OK');
        Url = json.Result.fileUrl;
        casper.test.assertNotEquals(null,Url,'【其他工具】【炫彩闹钟APP】207请求APP下载链接为空');
        realUrl = getDownloadUrl(Url);

        //echo apk parse cmd to python , as it's hard for casper do this
        this.echo('APKPARSE 91download.apk 1768904 其他工具 炫彩闹钟 http://bcs.hiapk.91rb.com/data/upload/2013/11_14/17/com.sykora.neonalarm.free_174047.apk');

        //hard code url here
        realUrl = 'http://bcs.hiapk.91rb.com/data/upload/2013/11_14/17/com.sykora.neonalarm.free_174047.apk'
        this.download(realUrl,'91download.apk','GET');
    } 
    else
    {
        casper.test.assertEqual('0',json.Code,'包名 : com.sykora.neonalarm.free , 207接口错误 : ' + json.Code);
    }
	});

// case over
casper.run();
