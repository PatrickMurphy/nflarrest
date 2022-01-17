$(document).ready(function(){
  $.each(ReleaseHistoryCacheTable, function( key, value ) {
      console.log( key + ": " + value );
      $('#historyContainer').append('<div>'+value['build_release_version'] + ' ' +  value['build_environment_name'] +' '+value['build_release_description'] +' Date: '+ value['build_release_date'] +'</div>');
    });
});