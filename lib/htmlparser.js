htmlparser = {

	/*
	generateCuid : function(){

		var str = 'TESTONLINE';
		var loop = 0;
		var random = 0;

		for(;loop<22;loop++){
			random = Math.floor(Math.random()*26)+65;
			str = str + String.fromCharCode(random);
		}

		str = str + '|';
		for(loop=0;loop<15;loop++){
			random = Math.floor(Math.random()*10);
			str = str + random;
		}

		return str;

	},
	*/

	checkResponse : function(casper,times,type){

		if(3 == times){
			return "return";
		}

		if(type == 'novel'){
			if(!casper.exists('div[class="novel"]')){
				return "retry";
			}
		}else if(type == "ding"){
			if(casper.exists('aladdin')||"no aladdin"==casper.getTitle()){
				return "retry";
			}
		}else{
			if(!casper.exists('commonfile')){
				return "retry";
			}
		}

		return "true";
	},

	retry : function(casper, id_word, loop, caseFunc, type, format, aiws, version){

		var response = searchboxAction.checkResponse(casper,loop,type);

		if("return" == response){
			//casper.test.assert(false,id_word[1] + '请求失败');
			return false;
		}else if("retry" == response){
			if("ding" == type){
				var queryUrl = searchboxUrlAction.dingUrl(id_word,format,aiws,version);
				casper.thenOpen(searchboxCaseConfig.host+queryUrl,function(){
					caseFunc(casper,id_word,loop+1,type,format,aiws,version);
				});
			}else if("novel" == type){
 				var novelUrl = searchboxUrlAction.generateNovelUrl(id_word[0]);
 				casper.thenOpen(searchboxCaseConfig.host+novelUrl,function(){
 					caseFunc(casper,id_word,loop+1,type);
 				});
 			}else{
				if("xml" == format){
                         		var get = searchboxUrlAction.queryallCardsGetParams(format,version,id_word[1]);
                      	 		var post = searchboxUrlAction.queryallCardsPostParams("51","本地天气",type);
				}else{
					var get = searchboxUrlAction.queryallCardsGetParams();
                      	 		var post = searchboxUrlAction.queryallCardsPostParams(id_word[0],id_word[1],type);
				}

                         	casper.thenOpen(searchboxCaseConfig.host+get+'&'+post,function(){
					caseFunc(casper,id_word,loop+1,type,format,version);
				});
 			}
			return false;

		}else{
			//go on
			return true;
		}
		
		return true;
	},

	getXmlNode : function(str,node){

		var reg = new RegExp("(?:<"+node+">)(.*)(?:<\/"+node+">)");
		var res = str.match(reg);

		if(res){//标准格式
			return res[1];
		}else{//半节点格式
			reg = new RegExp("(?:<"+node+"=\")(.*?)(?:\">)");
			res = str.match(reg);
			return res[1];
		}
		return str.match(reg)[1];
	},

	getHtmlNode : function(str, nodeHead, nodetail){

		var reg = new RegExp("(?:<"+nodeHead+".*?>)(.*?)(?:<\/"+nodetail+">)","g");
		var reginside = new RegExp("(?:<"+nodeHead+".*?>)(.*?)(?:<\/"+nodetail+">)");
		var res = str.match(reg);

		if(null == res){
			return null;
		}

		for(var index =0;index<res.length;index++){
			res[index] = res[index].match(reginside)[1];
		}
		return res.length == 1 ? res[0] : res;
	},

	getAttribute : function(str,attribute){

		var reg = new RegExp("(?:"+attribute+"=\")(.*?)(?:\")","g");
		var reginside = new RegExp("(?:"+attribute+"=\")(.*?)(?:\")");
		var res = str.match(reg);

		if(null == res){
			return null;
		}

		for(var index=0;index<res.length;index++){
			res[index] = res[index].match(reginside)[1];
		}

		return res.length == 1? res[0] : res;
	},

	getTextFromCDATA : function(str){
		return str.match(/(?:CDATA\[)(.*)(?:\]\])/)[1];
	},

	getNotNullLength : function(array){

		var length = 0;
		for(var index =0;index<array.length;index++){
			if(searchboxAction.trim(array[index])){
				length++;
			}
		}

		return length;
	},

	trim : function(str){

		var index;
		for(index=0;index<str.length;index++){
			if(str.charAt(index)!=" "){
				break;
			}
		}
		str = str.substring(index,str.length);

		for(index=str.length-1;index>=0;index--){
			if(str.charAt(index)!=" "){
				break;
			}
		}
		str = str.substring(0,index+1);

		return str;
	},

  search : function(casper, indexHost, word){
		var searchUrl = indexHost + '/s?word='+encodeURIComponent(word)+'&st=11104i&sa=bb&ts=1287257&tn=zbios&ss=10';
    casper.thenOpen(searchUrl, function(){
		
    }); 
  },  

};

