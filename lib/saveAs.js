// 保存方式
var fs = require('fs');
saveAs = {
	// 保存为本地快捷方式
	urlFile:function (casper,url,pos){
		var urlContent = "[internetshortcut]\nurl="+url;
		var file =pos+".url";
		fs.write(file,urlContent,function(err){
			if(err){
				casper.emit('urlfile error',file,err);
			}else{
				casper.emit('urlfile success',file);
			}
		});
	},
	//保存为截图
	capture:function(casper,url,pos){
		casper.thenOpen(url,function(){
			casper.capture(pos+"capture.jpg");
		});
	}
};
