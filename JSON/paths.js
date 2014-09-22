$(document).ready(function(){
	$.getJSON('paths.json', function(json){
		//alert(json.paths.customer.mortgage.name);
		var customer = json.paths.customer;
		var personal = json.paths.personal;
		var business = json.paths.business;
		var about = json.paths.about;
		$.each(customer,function(key, val){
			$('body').append("<li class='load_link load_link_li' id='"+key+"'>"+val.name+"</li>");
		});
		$.each(personal,function(key, val){
			$('body').append("<li class='load_link load_link_li' id='"+key+"'>"+val.name+"</li>");
		});
		$.each(business,function(key, val){
			$('body').append("<li class='load_link load_link_li' id='"+key+"'>"+val.name+"</li>");
		});
		$.each(about,function(key, val){
			$('body').append("<li class='load_link load_link_li' id='"+key+"'>"+val.name+"</li>");
		});
	});
});