$(function() {
	$.ajaxSetup({
		//		contentType:"application/x-www-form-urlencoded;charset=utf-8",
		//		dataFilter:function(data,type){
		//			var res =  eval("("+data+")");
		//			if(res.code == -1 && res.msg === '请登录'){
		//				window.location.href="login.html";
		//			}else{
		//				return res;
		//			}
		//		}
		beforeSend: function(xhr) {
			xhr.setRequestHeader('token', window.localStorage.getItem('token'));
		},
		complete: function(xhr) {
			if(xhr.responseJSON.code === -1 && xhr.responseJSON.msg === '请登录') {
				window.location.href = "login.html";
			};
		}
	});
})

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for(var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable) {
			return pair[1];
		}
	}
	return(false);
}

function checkRequired(param) {
	for(var key in param) {
		if($('#' + key).hasClass('Required') && $('#' + key).val().trim() == '') {
			$('#checkForm').show();
			return;
		} else {
			$('#checkForm').hide();
		}
	}
}

function propSuccess(res, callback) {
	layer.msg(res.msg, {
		offset: 'rb',
		icon: 1,
		area: ['270px', '70px'],
		time: 3000
	}, callback)
}

function propFailReload(res, callback) {
	layer.msg(res.msg, {
			offset: 'rb',
			icon: 2,
			area: ['270px', '70px'],
			time: 3000
	},callback)
}
