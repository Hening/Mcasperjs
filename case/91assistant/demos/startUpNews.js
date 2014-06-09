
var casper = require('casper').create({
    pageSettings:{
    userAgent: 'Mozilla/5.0 (Linux; U; Android 4.2.2; zh-cn; Coolpad 9970 Build/JDQ39) A    ppleWebKit/534.24 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.24 T5/2.0 baiduboxapp/5.0 (Baidu; P1 4.2    .2)'
    },
});

//var searchWord = ["！@#"];
var searchWord = ["玫瑰"];
var host = "http://news.dbanotes.net/";
var selector = 'div[srcid=\'' + srcid + '\']';

casper.start();

casper.thenOpen(host,function(){
    casper.capture('startUpNews.png');
});

casper.then(function(){
    elements = casper.evaluate(function(){
        es =  __utils__.findAll('a');
        arr = [];
        for(var i=0;i<es.length;i++){
            if(es[i].getAttribute('target')!='_blank'){
                continue;
            }
            arr.push(es[i].getAttribute('href'));
        }
        //casper.click(es[0]);
        return arr;
    });

casper.each(elements,function(self,info){
    casper.thenOpen(info,function(){
        this.echo('get link done');
        casper.capture(casper.getTitle()+'.png');
    });
});
});

/*
casper.waitForSelector('div.pagebar',function(){
        casper.click('div.pagebar');
});


casper.waitForSelector('div.pagebar',function(){
        casper.capture('mbaikeimg.png');
        var appidInfo = casper.evaluate(function(s,attr){
            var element = document.querySelector(s);
            return element.getAttribute(attr);
        },{s:selector,attr:dataAttr});

	this.echo(appidInfo);

	});
*/
// case over
casper.run();
