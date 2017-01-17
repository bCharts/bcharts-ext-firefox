var tableID;
var created = false;
var htmlParsing = false;
var data;
var trigger = true;
var css = browser.extension.getURL('../../parsehtml/css/background.css');
$(document.body).append('<link name="css_injected" href="' + css + '" rel="stylesheet">');

browser.runtime.onMessage.addListener(
 function(request, sender) {
 	switch (request.message)
 	{
        case 'highlightCode':
           if ($('table').length>0)
           {
           		var str = 'We found '+$('table').length+' tables on this web page';
           		toastr.success(str, 'Success')
           		highlight_tables();
           		htmlParsing = true;
          		trigger = true;
           }
           else
           {
           		toastr.error('We found no tables on this web page', 'Ooops!')
           }
           
        break;

        default:
        	sendResponse({data: 'Invalid arguments'});
        break;
    }
  });

$(window).keyup(function (e) {
    // esc key
    if (e.keyCode == 27) {
        $(".hlrect").remove();
        $("#btn").remove();
        $(".tableToCSV").removeClass("tableToCSV");
        created = false;
        trigger = false;
    }
});

function highlight_tables(){
	$('table').each(function() {
  		var position = $(this).offset();
		var width = $(this).width();
		var height = $(this).height();
		var tag = '<div class="hlrect" name="rectname" style="position: absolute; padding: 0px; margin: 0px; border-style: dotted; border-width: 2px; border-color: #2980b9; background-color: #3498db; opacity: 0.3; top: ' + position.top + 'px; left: ' + position.left + 'px; width: ' + width + 'px; height: ' + height + 'px; z-index: "1147483646"></div>';
		$(tag).appendTo(document.body);
	});


	
	

}

$(document).on("mouseover", ".hlrect",function(event) {
	if (htmlParsing == true){
    var rect = $(this);
		$( 'table' )
    .filter(function() {
     return ($(this).offset().top == rect.offset().top && $(this).offset().top == rect.offset().top && $(this).width() == rect.width() && $(this).height == rect.height) ;
    })
    .addClass("tableToCSV");
		var position = $(this).offset();
		var width = $(this).width();
		var height = $(this).height();
		tableID =  $(this).attr("id");
	    var btnblock = '<div id="btn" style="position: absolute; padding: 0px; margin: 0px; top: ' + (position.top+10) + 'px; left: ' + (position.left+10) + 'px; z-index: "2147483646"><a href="#" id="grabber"><img id="beelogo" style="display: block; width: 95%; height:auto; padding: 5%;"></img></a></div>';
		
		if (!created && trigger) {
			$(btnblock).appendTo(document.body);
			created = true;
			$('#beelogo').attr('src', browser.extension.getURL('resourses/img/beelogo-old.png'));

     

		}
	}

	

});

$(document).on("mouseout", ".hlrect",function(event) {
	if (created==true){
 	 	if ((event.pageX<$(this).position().left) ||  (event.pageX>$(this).position().left+$(this).width()) || (event.pageY<$(this).position().top) || (event.pageY>$(this).position().top+$(this).height())){
 	 		$("#btn").remove();
 	 		$(".tableToCSV").removeClass("tableToCSV");
 		 	created = false;
 		 }
 	}
});


$(document).on("click", "#grabber",function() {
	// replace just a table with ID of the right one
 	 var text = $(".tableToCSV").TableCSVExport();
 	 var text_formatted = text.replace(/\t/g, ",").replace(/[^\x00-\x7F]/g, "");
 	 data = {
    'redirect_uri': "http://beta.bcharts.xyz/chartdesigner" ,
    'payload': text_formatted,
    'redirect_type': 'redirect',
  }


  browser.runtime.sendMessage({'message':'htmlParsed','data': data});

  $(".hlrect").remove();
  $("#btn").remove();
  $(".tableToCSV").removeClass("tableToCSV");
  created = false;
  trigger = false;
 		

});


