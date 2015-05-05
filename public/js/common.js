$(document).ready(function(){
	
	$("table td").attr("align","center");
	$("table td").attr("valign","middle");
	$("table td").attr("height","40");
	
	$(".left ul li").eq(0).click(function(){
		window.location.href="/admin";
	});
	$(".left ul li").eq(1).click(function(){
		window.location.href="/menu_two";
	});
	
	
});
