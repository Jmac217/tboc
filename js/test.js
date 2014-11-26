	$.ajax({
		url: 'json/tiles.json',
		dataType: 'json',
		async: false,
		success: function(json){
			var name = jsonPath.eval(json, '$.paths['+title+'].links.['+id+'].name');
			var path = jsonPath.eval(json, '$.paths['+title+'].links.['+id+'].path');
			var location = jsonPath.eval(json, '$.paths['+title+'].links.['+id+'].location');
			var win = jsonPath.eval(json, '$.paths['+title+'].links.['+id+'].win');
			alert(name+', '+path+', '+location+', '+win);
			/*
			$.ajax({
				type:"post",
				url:path,
				async:false,
				success:function(data){
				
					_.each(data,function(key,value,field){
						console.log(key + ':' + value);
					});
				*/
				/*
					$('#body_container').css({'visibility':'hidden'});
					$('#pages').html(data).css({'visibility':'visible'});
					var height = $('#pages')[0].scrollHeight;
					height+=50; // #pages height is weird
					$('#pages').css({'height':height});
					set_footer(height);

					
					
					var nav_has_value = false;
					for(var i = 0; i < nav_obj.nav.length; i++){
						//alert('name: '+name+' | nav_obj.name: '+nav_obj.nav[i].name);
						//alert(name==nav_obj.nav[i].name);
						if(name == nav_obj.nav[i].name){
							nav_has_value = true;
							//alert(nav_has_value);
						}
					}
					
					//alert(nav_has_value);
					if (nav_has_value===false){
						push_nav(name, id, title);
						get_nav();
					}
					

				}
				*/
				/*
			}});
			
			_.each(json,function(key,value,field){
				console.log(key + ':' + value);
			});
		*/
		}
	});
