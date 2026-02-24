$(document).ready( function(){
	//colorbox
	var ua = checkAgent();
	if(ua == "smp" || ua == "tab"){
		$('.cb').colorbox({maxWidth:"90%"/* ,maxHeight:"90%" */});
          $('.ilcb').colorbox({inline: true,maxWidth:"90%"/* ,maxHeight:"90%" */});
	}else if(ua == "pc"){
          $('.cb').colorbox({maxWidth:"97%"/* ,maxHeight:"97%" */});
          $('.ilcb').colorbox({inline: true,maxWidth:"97%"/* ,maxHeight:"97%" */});
		$('.youtube').colorbox({iframe:true, innerWidth:960, innerHeight:540});
		animate_css_hover();
	}
	//URL変更
     //$("#Header .navi-rt li:eq(1) a").attr("href","/product/music.html");
	//disable navigation
	//$("#Navi nav ul li:eq(7)").addClass("cs");
	$('ul.navi li.cs a').click(function(){
		return false;
	})
	$('ul.navi-footer li.cs a').click(function(){
		return false;
	})
	rollOverInit();
	cb_self_init();
	cb_thumb_init();
});
/* ◆colorbox self ------------------------------ */
function cb_self_init(){
	$(".cb-self").click(function(){
		var imgsrc = $(this).attr("src");
		//console.log(imgsrc);
		$.colorbox({href:imgsrc, maxWidth:"95%"});
	});
}
/* ◆colorbox thumb ------------------------------ */
function cb_thumb_init(){
	$(".cb-thumb").click(function(){
		var imgsrc = $(this).attr("src");
		//パスから「/th」を取る
		var imghref = splitExt(imgsrc)[0].replace( "/th" , "" ) + "" + splitExt(imgsrc)[1];
		//console.log(imghref);
		$.colorbox({href:imghref, maxWidth:"95%"});
	});
}
function splitExt(filename) {
    return filename.split(/(?=\.[^.]+$)/);
}
/* ◆Animate.css hoverアクション ------------------------------ */
function animate_css_hover(){
	$(".pc_hv_swing").hover(function(){
		$(this).addClass("animated swing");
	},function(){
		$(this).removeClass("animated swing");
	});
	$(".pc_hv_pulse").hover(function(){
		$(this).addClass("animated pulse");
	},function(){
		$(this).removeClass("animated pulse");
	});
}
/* ◆SPメニュー展開 ------------------------------ */
function spMenuTgl(){
}
function spMenuOpen(){
	$(".gloval-nav-block").show();
	$("#SpMenu").hide();
}
function spMenuClose(){
	$(".gloval-nav-block").hide();
	$("#SpMenu").show();
}
/* ◆ソーシャルブックマーク ------------------------------ */
function socShare(typ){
	var url="http://hitoribocchi.jp/";
	var title="TVアニメ「ひとりぼっちの○○生活」公式サイト";
	var hashtags="ぼっち生活";//カンマ区切りで複数指定
	switch(typ){
		case "tw":
			window.open("http://twitter.com/intent/tweet?hashtags=" + hashtags+"&url="+url+"&text="+title, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
			break;
		case "fb":
			window.open("http://www.facebook.com/sharer.php?u="+url+"&amp;t="+title, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
			break;
		case "gp":
			window.open("https://plus.google.com/share?url="+url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
			break;
	}
}
/* ◆ニュース記事スクレイプ ------------------------------ */
function newsGet(number,newsurl){
	var target_url="/news/index.html";
	if(newsurl) target_url=newsurl;
	$.ajax({
		url: target_url,
		success : function(data){
			$("#news-hd dl").remove();
			var entry_list= $("#Entries",data);
			var count=0;
			var max_length=5;
			if(number) max_length=number;
			//var entries=[];
			$(".entry",entry_list).slice(0,max_length).each(function() {
				var entry_date=$(".entry-date",this).text();
				entry_date = entry_date.slice(0, 4) + '.' + entry_date.slice(4);//４文字目に.を追加
				var entry_id=$(this).attr("id");
				var entry_title=$(".entry-title",this).text();
				
				var cnt='<dl><dt>'+entry_date+'</dt><dd><a href="'+target_url+'#'+ entry_id +'">'+entry_title+'</a></dt></dl>'
				
				$("#news-hd").append(cnt);
				
				//console.log(cnt)
			});
		},
		error: function(data){
			$("#news-hd").html("<dl><dd>Error. Failed to load data.</dd></dl>");
		}
	});
}
/* ◆アンカー削除 ------------------------------ */
function unwrapAnchor(){
		$('.dis > a > span').each(function(){
			$(this).unwrap();
		});
}
/* ◆縮尺計算 ------------------------------ */
function resizeScale(maxWidth){
	var windowWidth = Math.max( $(window).innerWidth(), window.innerWidth);
	//IE8以下対応
	if(jQuery.browser.msie && jQuery.browser.version<=8){
		windowWidth = $(window).innerWidth();
	}
	
	var scaleD = 1;
	
	if(windowWidth < maxWidth){
		//指定フレームサイズより画面が小さい場合
		scaleD=windowWidth / maxWidth;
	}
	
	return scaleD;
}

/* ◆機種判別 ------------------------------ */
function checkAgentVer(){
	var agent = navigator.userAgent;
	var os = "";
	var size="";
	var version=0;
	
	if(agent.search(/iPhone/) != -1){
		//iPhone
		os="iPhone";
		size="small";
		var versionStr = agent.substr(agent.indexOf('OS')+3, 3);
		version = Number(versionStr.substr(0,1));
		version = version + (Number(versionStr.substr(2,1)))*0.1;
	}else if(agent.search(/iPod/) != -1){
		//iPod
		os="iPod";
		size="small";
		var versionStr = agent.substr(agent.indexOf('OS')+3, 3);
		version = Number(versionStr.substr(0,1));
		version = version + (Number(versionStr.substr(2,1)))*0.1;
	}else if(agent.search(/iPad/) != -1){
		//iPad
		os="iPad";
		size="large";
		var versionStr = agent.substr(agent.indexOf('OS')+3, 3);
		version = Number(versionStr.substr(0,1));
		version = version + (Number(versionStr.substr(2,1)))*0.1;
	}else if(agent.search(/Android/) != -1 && agent.search(/Mobile/) != -1){
		//Android smart
		os="Android";
		size="small";
		var versionStr = agent.substr(agent.indexOf('Android')+8, 3);
		version = Number(versionStr.substr(0,1));
		version = version + (Number(versionStr.substr(2,1)))*0.1;
	}else if(agent.search(/Android/) != -1){
		//Android tablet
		os="Android";
		size="large";
		var versionStr = agent.substr(agent.indexOf('Android')+8, 3);
		version = Number(versionStr.substr(0,1));
		version = version + (Number(versionStr.substr(2,1)))*0.1;
	}else{
		//PCその他
		os="PC";
		size="large";
	}
	return {"os":os,"version":version,"size":size};
}

function checkAgent(){
	var agent = navigator.userAgent;
	if(agent.search(/iPhone/) != -1 || agent.search(/iPod/) != -1){
		//iPhone or iPod
		return("smp");
	}else if(agent.search(/iPad/) != -1){
		//iPad
		return("tab");
	}else if(agent.search(/Android/) != -1 && agent.search(/mobile/) != -1){
		//Android tablet
		return("tab");
	}else if(agent.search(/Android/) != -1){
		//Android smartphone
		return("smp");
	}else{
		//PCその他
		return("pc");
	}
}

/* ◆マウスオーバー ------------------------------ */
// img.btn のsrcをhoverで変更 マウスカーソルも指にする
function rollOverInit(){
	//ロールオーバーを削除して、ボタンをONに固定
	//$('img.btn_crt').attr('src', $('img.btn_crt').attr('src').replace('_off', '_on'));
	//別画像版
	$('img.rollover').hover(function(){
		$(this).css("cursor","pointer");
		$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
	}, function(){
		$(this).css("cursor","default");
		$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
	});
	//透明度版
	$("img.btn_fade").hover(function(){
		$(this).css("cursor","pointer");
		$(this).fadeTo(100, 0.6); // マウスオーバー時にmormal速度で、透明度を60%にする
	},function(){
		$(this).css("cursor","default");
		$(this).fadeTo(100, 1.0); // マウスアウト時にmormal速度で、透明度を100%に戻す
	});
}
/* ◆マウスオーバー ------------------------------ */
// img.btn のsrcをhoverで変更 マウスカーソルも指にする
function blinkInit(){
	setInterval(function(){
		$('.blink').fadeOut(500,function(){$(this).fadeIn(500)});
	},1000);
}

