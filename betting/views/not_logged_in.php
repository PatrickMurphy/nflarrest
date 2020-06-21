<!-- Google Analytics Content Experiment code -->
<script>function utmx_section(){}function utmx(){}(function(){var
k='106835784-1',d=document,l=d.location,c=d.cookie;
if(l.search.indexOf('utm_expid='+k)>0)return;
function f(n){if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.
indexOf(';',i);return escape(c.substring(i+n.length+1,j<0?c.
length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;d.write(
'<sc'+'ript src="'+'http'+(l.protocol=='https:'?'s://ssl':
'://www')+'.google-analytics.com/ga_exp.js?'+'utmxkey='+k+
'&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='+new Date().
valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'')+
'" type="text/javascript" charset="utf-8"><\/sc'+'ript>')})();
</script><script>utmx('url','A/B');</script>
<!-- End of Google Analytics Content Experiment code -->

<?php
// show potential errors / feedback (from login object)
if (isset($login)) {
    if ($login->errors) {
        foreach ($login->errors as $error) {
            echo $error;
        }
    }
    if ($login->messages) {
        foreach ($login->messages as $message) {
            echo $message;
        }
    }
}
?>
<div class="seven columns">
<h3>NFL Arrest Fantasy Betting<sup>Beta</sup></h3>
<P>Guess the team, crime, or player position of the next NFL arrest and see your self rise on the leaderboards. You can also predict how many more days you think the <a href="http://nflarrest.com/arrest-o-meter.html">NFL streak</a> will last! You start with $100 fake dollars, you receive $5 when you login, redeemable once every 24 hours. This is the beta version, with a few bugs and the visual appearance is not at all perfected. Email any suggestions or problems you have to <a href="mailto:info@nflarrest.com">info@nflarrest.com</a>.</p>

<p>Click the Create Account button below to start now in the beta league! Beta testers will recieve bonus flair and more prizes when the site leaves beta. This is not a gambling website, you will never be able to redeem winnings for real cash.</p>
<div class="five columns" >
<img src="http://nflarrest.com/images/placebetPreview.PNG" width="94%"/><br/>
Preview of placing a wager. <a href="http://nflarrest.com/images/placebetPreview.PNG">Fullsize</a>
</div>
<div class="six columns">
<form method="post" action="index.php" name="loginform" >
		<h4>Login</h4>
    <label for="login_input_username">Username: </label>
    <input id="login_input_username" class="login_input" type="text" style="width:100%;" name="user_name" required />
		<br/>
    <label for="login_input_password">Password: </label>
    <input id="login_input_password" class="login_input" type="password" style="width:100%;" name="user_password" autocomplete="off" required />
		<br/>
    <a href="index.php?register" class="button">Create Account</a> <input type="submit"  name="login" class="button-primary" value="Log in" />

</form>
</div>
<!-- login form box -->

</div>
