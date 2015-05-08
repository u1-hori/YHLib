// JavaScript Document
var ua={
	agent:"",
	isIE8:false,isIE9:false,
	checkAgent:function(){
		if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') >0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
			ua.agent="sp";
		}else{
			ua.agent="pc";
		}
		
		//ieバージョン判別
		if(navigator.userAgent.indexOf("MSIE 8.") != -1){
			ua.isIE8=true;
		}
		if(navigator.userAgent.indexOf("MSIE 9.") != -1){
			ua.isIE9=true;
		}
	}
}
