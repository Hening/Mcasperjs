var require = patchRequire(require);

var apiNum = null;
var options = {
	pageSettings:{
		webSecurityEnabled: false
	},
	onError:function(self,m){
		this.capture("error.png");
		console.log("FATAL:"+m);
		self.exit();
	},
	httpStatusHandlers: {
		404: function(self, resource) {
			self.echo(resource.url + ' not found (404)');
		},
		500: function(self, resource) {
			self.echo(resource.url + ' gave an error (500)');
		}
	}
};
var casper = require('casper').create(options);
casper.on('capture.saved', function(targetFile) {
	this.echo('['+apiNum+'] The capture file is ' + targetFile);
});
casper.on('downloaded.file', function(targetPath) {
	this.echo('['+apiNum+'] The downLoad file is ' + targetPath);
});
casper.on('json parse error',function(url,error){
	this.echo('['+apiNum+'] Json parse error :'+url);
	this.echo('[error]'+error.stack);
});
casper.on('code ok',function(name){
	this.echo('['+apiNum+']['+name+'] Json Code is ok.')
});
casper.on('urlfile error',function(file,error){
	this.echo('['+apiNum+']UrlFile write error :'+file);
	this.echo('[error]'+error.stack);
});
casper.on('urlfile success',function(file){
	this.echo('['+apiNum+']The urlFile is '+file);
});

exports.create = function create(num){
	apiNum = num;
	return casper;
};