//汎用ライブラリ
//@auther: u1.hori<hori@vons.co.jp>
//



//----------------------------------------------------------
//テキストを省略して、moreを付ける
//class:fold のデータを指定文字数で折り畳み
//----------------------------------------------------------
var saveAry=[];

var foldText={
	init:function(showNum){
		
		$('.fold').css({'overflow':'hidden','display':'block'});
		
		$('.fold').each(function(i, element) {
			
			var obj={
				initialText:"",
				initialHeight:0,
				shortText:"",
				shortHeight:0
			};
			
      obj.initialText=$(this).text();
			obj.initialHeight=$(this).height()-10;
			
			obj.shortText=obj.initialText.substr(0,showNum)+' ...';
			
			$(this).text(obj.shortText);
			obj.shortHeight=$(this).height();
			
			saveAry[i]=obj;
			$(this).css('height',obj.shortHeight+'px');
			
			$(this).parent('div').find('a').attr('data-id',i).click(function(){
				var id=$(this).attr('data-id');
				
				if($(this).hasClass('fold-open')){
					//たたむ
					$(this).text('つづきを読む');
					
					$(this).removeClass('fold-open');
					$('.fold:eq('+id+')').animate({'height':saveAry[id].shortHeight+'px'},300,'easeOutSine',function(){
						$(this).text(saveAry[id].shortText)
					});
				}else{
					//拡げる
					$(this).text('閉じる');
					
					$(this).addClass('fold-open');
					$(this).parent().parent().find('.fold').text(saveAry[id].initialText);
					$('.fold:eq('+id+')').animate({'height':saveAry[id].initialHeight+'px'},300,'easeOutSine');
				}
				return false;
			})
    });
	}
	
}

//----------------------------------------------------------
// #で始まるアンカーをクリックした場合に処理
// jQuery.easingを読み込むこと。
//----------------------------------------------------------


var smoothAncor={

	init:function(){
		$('a[href^=#]').click(function() {
      // スクロールの速度
      var speed = 500; // ミリ秒
      // アンカーの値取得
      var href= $(this).attr("href");
      // 移動先を取得
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を数値で取得
      var position = target.offset().top-50;
      // スムーススクロール
      $('body,html').animate({scrollTop:position}, speed, 'easeOutSine');
      return false;
   });
	}
};

//----------------------------------------------------------
//要素の高さを揃える
//selectorに2個以上のブロックのクラスを指定
//----------------------------------------------------------


function uniformHeight(selector){
  var $foo = $(selector);
  //div 要素（class="foo"）の総数
  var foo_length = $foo.length;
  
  //横の列（行）それぞれについて実行
  for(var i = 0 ; i < Math.ceil(foo_length / 4) ; i++) {
    var maxHeight = 0;
    //同じ横の列（行）のそれぞれの要素について実行
    for(var j = 0; j < 4; j++){
      if ($foo.eq(i * 4 + j).height() > maxHeight) { 
        maxHeight = $foo.eq(i * 4 + j).height(); 
      }
    }
    //要素の高さの最大値をそれぞれの要素の高さとして設定
    for(var k = 0; k < 4; k++){
      $foo.eq(i * 4 + k).height(maxHeight); 
    }
  }
}