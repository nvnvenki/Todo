function Toast(text,width,height)
{
	
	this.toast_text = text||'Please enter a text';
	this.width = width||'280';
	this.height = height||'35';
	this.border_radius ='0px';
	this.marginTop = "50px";
	this.div='body';
	this.toast = this.createToast();
}

Toast.prototype.createToast = function()
{
	//This is creatin a toast with desired properties and appending to the body of the document
	var $toast = this;
	var toast = $('<div></div>')
	.css({
		'display':'none',
		'position':'absolute',
		'top':'120px',
		'background-color':'rgba(0,0,0,0.6)',
		'width':$toast.width,
		'height':$toast.height,
		'border-radius':$toast.border_radius,
		'color':'white',
		'text-align':'center',
		'padding-top':$toast.height/2,
		'padding-left':'5',
		'font-family':'helvetica',
		'font-size':'14',
		'font-weight':'bold',
		'padding':'10px',
		'margin-left':function(){

		 	return  ($(window).width()/2)- (parseInt($toast.width)/2);
		 },
	})
	.appendTo($toast.div);

	return toast;
}

Toast.prototype.makeToast = function()
{
	
	var $toast = this.toast;

	$toast
	.text(this.toast_text)
	.fadeIn({

		duration:3000,
		complete:function(){
			$toast.fadeOut(3000);
			$toast.remove();
		}

	});


}
