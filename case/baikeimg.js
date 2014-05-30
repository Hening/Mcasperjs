
var casper = require('casper').create({
    pageSettings:{
    userAgent: 'Mozilla/5.0 (Linux; U; Android 4.2.2; zh-cn; Coolpad 9970 Build/JDQ39) A    ppleWebKit/534.24 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.24 T5/2.0 baiduboxapp/5.0 (Baidu; P1 4.2    .2)'
    },
});

//var searchWord = ["！@#"];
var searchWord = ["玫瑰"];
var indexHost = "http://m.baidu.com";
var dataAttr = 'data-log'; 
var tpl = 'baikeimg';
var srcid = '81';
var selector = 'div[srcid=\'' + srcid + '\']';
var checkJsonUrl = true;
var searchResultPageUrl = indexHost + '/s?word='+searchWord+'&st=11104i&sa=bb&ts=1287257&tn=zbios&ss=10';

casper.start(searchResultPageUrl,function(){

	this.test.assert(this.getCurrentUrl() === searchResultPageUrl , 'url is the one expected : ' + this.getCurrentUrl());
	this.test.assertHttpStatus(200, 'm.baidu.com' + ' is up'); 

	});
/*
casper.waitForSelector('div.pagebar',function(){
        casper.click('div.pagebar');
});
*/

casper.waitForSelector('div.pagebar',function(){
        casper.capture('mbaikeimg.png');
        var appidInfo = casper.evaluate(function(s,attr){
            var element = document.querySelector(s);
            return element.getAttribute(attr);
        },{s:selector,attr:dataAttr});

	this.echo(appidInfo);

	});

// case over
casper.run();
