var host = "http://192.168.0.105:8777";
$(function(){

	get_list();
	get_wechat_login();
})


function get_list(){
	$.ajax({
		type:"get",
		url:host+"/video-server/api/v1/video/page?size=10&page=1",
		dataType:"json",
		success:function(res){
			var data = res.data;
			for(var i=0;i<data.length;i++){
				var video = data[i];
				var template = '<div class="col-sm-6 col-md-3">'+
							   		'<div class="thumbnail">'+
							   			'<img src="'+video.coverImg+'"/>'+
							   		'</div>'+
							   		'<div class="caption">'+
							   			'<h3>'+video.title+'</h3>'+
							   			'<p>价格:'+video.price+'元</p>'+
							   			'<p><a href="#" onclick="save_order('+video.id+')" class="btn btn-primary" role="button" data-toggle="modal" data-target="#scanModal">按钮</a></p>'+
							   		'</div>'+
							   	'</div>';
				$(".row").append(template);			   	
			}
		}
	});
}
//微信登录获取二维码
function get_wechat_login(){
	var current_page = window.location.href;
	$.ajax({
		type:"get",
		url:host + "/video-server/api/v1/wechat/login_url?access_page="+current_page,
		dataType:'json',
		async:true,
		success:function(res){
			console.info(res.data);
		}
	});
}

//获取url上的参数
function get_param(){
	var url = window.location.search;
	var obj = new Object();
	if(url.indexOf("?")!=-1){
		var str = url.substr(1);
		strs = str.split("&");
		for(var i=0;i<str.length;i++){
			obj[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		}
	}
	return obj;
}

//设置头像和昵称
function set_user_info(){
	var user_info = get_param();
	if(JSON.stringify(user_info) != '{}'){
		var name = user_info['name'];
		var head_img = user_info['head_img'];
		var token = user_info['token'];
		$('#login').html(name);
		$("#head_img").attr("src",head_img);
		$.cookie('token',token,{expires:7,path:'/'});
	}else{
		
	}
}

function save_order(id){
	var token = $.cookie("token");
	if(!token || token == ""){
		//登录
		
	}
	var url = host+"/user/api/v1/order/add?token="+token+"&video_id="+id;
	$("#pay_img").attr("src",url);
}


