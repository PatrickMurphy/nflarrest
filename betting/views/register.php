<?php
// show potential errors / feedback (from registration object)
if (isset($registration)) {
    if ($registration->errors) {
        foreach ($registration->errors as $error) {
            echo $error;
        }
    }
    if ($registration->messages) {
        foreach ($registration->messages as $message) {
            echo $message;
        }
    }
}
?>
<style>
input {
	width:100%;
}

	/*for the on off*/
	.onoffswitch {
    position: relative; width: 76px;
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
}
.onoffswitch-checkbox {
    display: none;
}
.onoffswitch-label {
    display: block; overflow: hidden; cursor: pointer;
    border: 2px solid #999999; border-radius: 13px;
}
.onoffswitch-inner {
    display: block; width: 200%; margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
    display: block; float: left; width: 50%; height: 21px; padding: 0; line-height: 21px;
    font-size: 13px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
    box-sizing: border-box;
}
.onoffswitch-inner:before {
    content: "Yes";
    padding-left: 10px;
    background-color: #1EAEDB; color: #FFFFFF;
}
.onoffswitch-inner:after {
    content: "No";
    padding-right: 10px;
    background-color: #EEEEEE; color: #999999;
    text-align: right;
}
.onoffswitch-switch {
    display: block; width: 20px; margin: 0.5px;
    background: #FFFFFF;
    position: absolute; top: 0; bottom: 0;
    right: 51px;
    border: 2px solid #999999; border-radius: 13px;
    transition: all 0.3s ease-in 0s;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
    right: 0px;
}
	.onoffswitch-checkbox {
		display:none !important;
	}
</style>
<div class="row" style="margin-top:5px;">
<!-- register form -->
<form method="post" action="index.php?register" name="registerform" id="registerForm" style="padding:6px;background:rgba(204, 135, 40, 0.22);border-radius:8px;" class="four columns">
<h2>Register</h2>
    <!-- the user name input field uses a HTML5 pattern check -->
    <label for="login_input_username">Username <sup>(only letters and numbers, 2 to 64 characters)</sup></label>
    <input id="login_input_username" class="login_input" type="text" pattern="[a-zA-Z0-9]{2,64}" name="user_name" required />
<br/>
    <!-- the email input field uses a HTML5 email type check -->
    <label for="login_input_email">User's email</label>
    <input id="login_input_email" class="login_input" type="email" name="user_email" required />
		<br/>
		<label for="login_newsletter">Sign up for NFL Arrest Newsletter, Learn of NFL arrests first!</label>
		<!--<input type="checkbox"  class="login_input" checked />--->
		<div class="onoffswitch">
			<input type="checkbox" name="newsletter" class="onoffswitch-checkbox" id="myonoffswitch" checked>
			<label class="onoffswitch-label" for="myonoffswitch">
				<span class="onoffswitch-inner"></span>
				<span class="onoffswitch-switch"></span>
			</label>
		</div>
<br/>
    <label for="login_input_password_new">Password <sup>(min. 6 characters)</sup></label>
    <input id="login_input_password_new" class="login_input" type="password" name="user_password_new" pattern=".{6,}" required autocomplete="off" />
		<br/>
    <label for="login_input_password_repeat">Repeat password</label>
    <input id="login_input_password_repeat" class="login_input" type="password" name="user_password_repeat" pattern=".{6,}" required autocomplete="off" />
    <br/>
	<input type="submit"  name="register" value="Register" class="button button-primary" />

</form>
<div class="five columns">
<h5>NFL Arrest Fantasy Betting<sup>Beta</sup></h5>
<P>Guess the team, crime, or player position of the next NFL arrest and see your self rise on the leaderboards. You can also predict how many more days you think the <a href="http://nflarrest.com/arrest-o-meter.html">NFL streak</a> will last! You start with $100 fake dollars, you receive $5 when you login, redeemable once every 24 hours. This is the beta version, with a few bugs and the visual appearance is not at all perfected.</p>
<p>This is not a gambling website, you will never be able to redeem winnings for real cash.</p>
<a href="index.php">Back to More info</a></div>
</div>
<script>

var on_submit_function = function(evt){
    evt.preventDefault(); //The form wouln't be submitted Yet.
    function doSubmit(){
            ga('send', 'event', 'betting', 'register', $('input[name=user_name]').val());
	    	$('#registerForm').off('submit', on_submit_function); //It will remove this handle and will submit the form again if it's all ok.
            $('#registerForm').submit();
    }
    if($("input[name=newsletter]").is(':checked')){
	    $.ajax({
	        url:'http://patrickmurphywebdesign.com/Projects/emails/emailList.php',
	        type:'POST',
	        data:{'email':$('input[name=user_email]').val()}
	    }).done(function(data){
	    	googleTracking.sendTrackEvent('Email List','Subscribe');
	    	doSubmit();
	    });
    }else{
    	doSubmit();
    }

}

$('#registerForm').on('submit', on_submit_function);


</script>
<!-- backlink -->
