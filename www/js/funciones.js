function cambiaPag(pag)
{
	$.get(pag, function( data ) {
		$("#pagContainer").html(data);
		});
	
}