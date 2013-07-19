var myScroll;
var a = 0;

function loaded() {
	setHeight();
	// Set the wrapper height. Not strictly needed, see setHeight() function below.
	// Please note that the following is the only line needed by iScroll to work.
	//Everything else here is to make this demo fancier.
	myScroll = new iScroll('scroller', {desktopCompatibility:true});
}

	// Change wrapper height based on device orientation.
	//Not strictly needed by iScroll, you may also use pure CSS techniques.

function setHeight() {
	var headerH = document.getElementById('header').offsetHeight,
		footerH = document.getElementById('footer').offsetHeight,
		wrapperH = window.innerHeight - headerH - footerH;
	document.getElementById('wrapper').style.height = wrapperH + 'px';
}
	// Check screen size on orientation change
	window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', setHeight, false);

	// Prevent the whole screen to scroll when dragging elements outside of the scroller (ie:header/footer).
	// If you want to use iScroll in a portion of the screen and still be able to use the native scrolling, do *not* preventDefault on touchmove.
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	// Load iScroll when DOM content is ready.
	document.addEventListener('DOMContentLoaded', loaded, false);
	//取消页面动画
	$(document).bind("mobileinit", function(){
         $.mobile.defaultPageTransition = 'none'
     });
	
	/*//页面按钮响应
	$(function() {
	  	$('#myCanvas').bind('tap', function(event){
	        alert("myCanvas");
	     });  
		$('#show').mobiscroll().date({
			//invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] },
			theme : 'android-ics light',
			//theme : 'ios',
			display : 'modal',
			mode : 'scroller',
			dateOrder : 'yyyy-mm-dd',
			dateFormat : 'yyyy-mm-dd',
			onSelect : function(val, inst) {
				//I would think this is where it's supposed to go, no luck thus far though!
				// console.log(this);
				// alert(val);
				initline(val);
			},
		});

		//$('#demo').mobiscroll("hide");

		$('#show').click(function() {
			$('#show').mobiscroll('show');
			// document.write("show");
			//return false;
			//var p = $('#show').mobiscroll('getValue');
			// initline(p[2]+"-"+p[0]+1+"-"+p[1]);
		});
		
	
        	
                 
	});	
	
	
	
	*/