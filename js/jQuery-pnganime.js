// JavaScript Document
// 連番画像アニメーション用
// 2014.09.09 @u1.hori





var animationID=new Array();

var pnganime={
	fps:10,
	
	set:function(tag,src,w,h,fps,max_frame){
			//set（ロード前に設定）========================
			//'tag' -- ターゲット　idのみ ※classは指定不可
			//'src' -- 画像URL　連番部分4桁をxxxxとする（Ex. img/hoge_xxxx.jpg）
			//=============================================
		
		
		if(animationID[tag])console.log('pnganime : ターゲットが重複しています')
		
		$("#"+tag).css({
			"width":w+'px',
			"height":h+'px',
			'position':'absolute'
		});
		
		var animeObj={
			id:tag,
			src:src,
			w:w,
			h:h,
			frame:0,
			end:max_frame,
			fps:fps,
			max_frame:max_frame,
			loop:'loop',
			timerID:'tID-'+tag,
			callback:null,
			px:0
		}
		animationID[tag]=animeObj;
		
		for(var i=1;i<=max_frame;i++){
			var num=addZero(i,4);
			var url=animeObj.src.replace('xxxx',num)
			$("#"+tag).append('<img src="' + url + '" />');
			//console.log(url);
		}
		
		$('#'+tag+' img').css({
			'position':'absolute',
			'display':'none'
		});
		$('#'+tag+' img').eq(animeObj.frame).css('display','block').addClass('view');
		
	},
	
	play:function(tag,loop,start_frame,end_frame,callback){
		
		var obj=animationID[tag];
		if(!obj.timerID)obj.timerID='tID-'+tag;
		clearInterval( obj.timerID );
		if(loop!=undefined)obj.loop=loop;
		
		//loopType========================
		//'loop' -- 無限ループ(default)
		//'none' -- ループなし
		// frame数 -- 再起フレームを指定(ループ後戻るフレーム)
		//================================
		
		if(callback)obj.callback=callback;
		obj.frame=start_frame || 0;
		obj.end=end_frame || obj.max_frame;
		obj.px=0;

		var interval = 1/obj.fps*1000;
		
		//連続イベント
		var intervalEvent=function(){

			$("#"+obj.id+' .view').css('display','none');
			$('#'+obj.id+' img').eq(obj.frame).css('display','block').addClass('view');
			obj.frame++;
			
			if(obj.frame>obj.end-1){
				if(obj.loop=='none'){ clearInterval( obj.timerID );}
				else if(obj.loop=='loop'){ obj.frame = 0;}
				else{ obj.frame = obj.loop};
			};
		}
		
		obj.timerID = setInterval(intervalEvent, interval);
		
	},
	
	stop:function(tag,stopFrame){
		
		var sf
		if(stopFrame){
			sf=stopFrame;
		}else{
			sf=0;
		}
		
		var obj=animationID[tag];
		clearInterval(obj.timerID);
		
		$("#"+obj.id+' .view').css('display','none');
		$('#'+obj.id+' img').eq(sf).css('display','block').addClass('view');
		
		obj.frame=sf;
		
	},
	
	pause:function(tag){
		
		var obj=animationID[tag];
		
		clearInterval(obj.timerID);
	}
}

//指定桁だけ頭に"0"を付ける
function addZero(num,n){
	var r='0000000000'+String(num);
	return r.slice(-n);
}


