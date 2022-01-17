$(document).ready(function(){
    $('#historyContainer').html(''); // clear
  $.each(ReleaseHistoryCacheTable, function( key, value ) {
      //console.log( key + ": " + value );
      var str = `<div>
                    <h2>${value['build_release_version']}</h2>
                    <h4>${value['build_environment_name']}</h4> 
                    <p>${value['build_release_description']}</p>
                    <p><b>Date</b>: ${value['build_release_date']}</p>
                    <p><b>Files Changed Count</b>: ${value['build_release_detail_filecount']}</p>
                    <p><b>Files Changed</b>: ${value['build_release_detail_commitfiles']}</p>
                    <p><b>Commit Hash</b>: ${value['build_release_detail_commithash']}</p>
                </div>`;
      
      //$('#historyContainer').append('<div>'+value['build_release_version'] + ' ' +  value['build_environment_name'] +' '+value['build_release_description'] +' Date: '+ value['build_release_date'] +'</div>');
      $('#historyContainer').append(str);
    });
});