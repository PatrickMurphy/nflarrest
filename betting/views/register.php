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
</style>
<div class="row">
<!-- register form -->
<form method="post" action="index.php?register" name="registerform" id="registerForm" class="four columns">
<h2>Register</h2>
    <!-- the user name input field uses a HTML5 pattern check -->
    <label for="login_input_username">Username (only letters and numbers, 2 to 64 characters)</label>
    <input id="login_input_username" class="login_input" type="text" pattern="[a-zA-Z0-9]{2,64}" name="user_name" required />
<br/>
    <!-- the email input field uses a HTML5 email type check -->
    <label for="login_input_email">User's email</label>
    <input id="login_input_email" class="login_input" type="email" name="user_email" required />
		<br/>
		<label for="login_newsletter">Sign up for the NFL Arrest Newsletter and Learn of NFL arrests first!</label>
		<input type="checkbox" name="newsletter" class="login_input" checked />
<br/>
    <label for="login_input_password_new">Password (min. 6 characters)</label>
    <input id="login_input_password_new" class="login_input" type="password" name="user_password_new" pattern=".{6,}" required autocomplete="off" />
		<br/>
    <label for="login_input_password_repeat">Repeat password</label>
    <input id="login_input_password_repeat" class="login_input" type="password" name="user_password_repeat" pattern=".{6,}" required autocomplete="off" />
    <br/>
	<input type="submit"  name="register" value="Register" />

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
