
var casper = require('casper').create({
        //fix file download 0kb error
        pageSettings:{
            webSecurityEnabled: false
        },
});

require('../../../lib/htmlparser');
require('../../../conf/downloadUrlConf');

casper.start();
casper.each(downloadUrlConf,function(self,info){
    
    infos = info.split('--');
    var appname = infos[0];
    var url207 = infos[1];
    var downloadurl = infos[2]
    this.echo(appname);
    casper.thenOpen(url207,function(){
	    var contents = htmlparser.getHtmlNode(casper.getHTML(),'pre','pre');
	    json = JSON.parse(contents);
	    if(json.Code == '0'){
		    casper.test.assertEqual('0','0',appname + ' 207接口获取APP下载链OK');
		    url = json.Result.fileUrl;
            if((url==null)||(url==''))
            {
                casper.test.assertNotEquals('aa',url,appname + ' 207请求APP下载链接为空');
            }
            else{
            casper.test.assertNotEquals(null,url,appname+' 207请求APP下载链接OK');
            }
            size = json.Result.size;

		    this.echo('APKPARSE ' + appname + '.apk ' + size + ' ' + appname +' ' + downloadurl);
		    this.download(downloadurl,appname+'.apk' , 'GET');
	    }
	    else {
		    casper.test.assertEqual('0',json.Code,appname + ' 207接口错误 : ' + json.Code);
	    }
    });

});

casper.run();
