var comments = (function () {
var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
};
    
    var formControls = '<textarea id="commentBox" style="width:100%; display:block;"></textarea><input type="submit" id="submitButton" value="Submit Comment" style="width:100%;display:block;">';
 $('#comments').html('<h5>Comments</h5><ol id="commentList" style="list-style:none"></ol><form id="submitComment">'+formControls+'</form>');
    var getComments = function(callback){
        callback = callback || function(data){console.log(data);};
        $.getJSON('http://nflarrest.com/api/v1/bets/comments?target='+getQueryString('user'), callback);
    };
    var fillComments = function (callback){
        callback = callback || function(data){console.log(data);};
        $('#commentList').html('');
        getComments(function(data){
            if(data.length > 0){
                for(var index in data){
                    var theComment  = data[index];
                    console.log(theComment);
                    $('#commentList').append('<li><div style="background:#d9d9d9;color:#232323;border-radius:3px;"><b>'+theComment['user_name']+'</b><span style="float:right;">'+theComment['comment_date']+'</span></div>'+theComment['comment_msg']+'</li>');
                }
            }else{
                $('#commentList').append('<li>No Comments yet!</li>')                
            }
            callback();
        });
    };
    
    // initialize
    fillComments();
    
    $('#submitButton').click(function(e){
        e.preventDefault();
        ga('send', 'event', 'betting', 'comment', 'target: '+getQueryString('user'));
        $.post('http://nflarrest.com/api/v1/bets/comments', {comment:$('#commentBox').val(),target: getQueryString('user')}, function(data){
            console.log(data);
            comments.fillComments();
            $('#commentBox').val('');
        });
    });
    
  return {
      getComments:getComments,
      fillComments:fillComments
  };
 
})();