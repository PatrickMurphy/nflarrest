/*
var dummyFieldForTesting = {
    "build_release_id": 84,
    "build_environment_id": 1,
    "build_environment_name": "Development",
    "build_environment_description": "Development Environment, nflarrest.com/development/",
    "build_release_type_id": 3,
    "build_release_type_name": "Development WIP",
    "build_release_type_description": "A release to the development environment without a version number or message",
    "build_release_version": "2.11.11",
    "build_release_description": "BUILD development 2.11.11: update db to have more data in release history view || 1/17/2022 03:54",
    "build_release_date": "2022-01-17T08:00:00.000Z",
    "build_release_detail_filecount": "4",
    "build_release_detail_commithash": "7a4193186f164384721283716f7be9bbb28483de",
    "build_release_detail_commitfiles": "development/js/compressed/DetailPage.min.js, development/js/compressed/index.min.js, development/js/data/ReleaseHistory_data.js, development/js/data/lastUpdate_data.js",
    "build_release_detail_commitfiles_json": "['development/js/compressed/DetailPage.min.js', 'development/js/compressed/index.min.js', 'development/js/data/ReleaseHistory_data.js', 'development/js/data/lastUpdate_data.js']"
};
*/
class BuildHistoryPage extends WebPage {
	constructor() {
        super('BuildHistory',true);
        
        this.StyleManager.loadCSS('css/modules/styles-buildhistory.css');
        $('#BuildHistoryVersionList').html(''); // clear version list
        $('#historyContainer').html(''); // clear html of loading msg
        
        var lastItemWasProd = false;
        if(ReleaseHistoryCacheTable[0]['build_environment_name'] === 'Production'){
            lastItemWasProd = true;
        }
        
        var last_prod_release = 'ReleaseAheadOfProd';
        $.each(ReleaseHistoryCacheTable, function (key, value) {
            // add version link
            var ifFirstRels = last_prod_release === 'ReleaseAheadOfProd';
            var styleBold = 'style="font-weight:bold;"';
            var devIndent = '----';
            var versionLink = `<li><a href="#v${value['build_release_version']}" ${styleBold}>V${value['build_release_version']}</a></li>`;
            if(value['build_environment_name'] === 'Development'){
                // remove dev links
                var versionLink = '';//`<li><a href="#v${value['build_release_version']}">${devIndent+"V"+value['build_release_version']}</a></li>`;
            }
            //if(lastItemWasProd){
              //  versionLink += value['build_release_version'] + ' <ol><li';
            //}
            
            // add link
            //versionLink += `<a href="#v${value['build_release_version'].replace('.','-')}">${value['build_release_version']}</a>`;
            if(value['build_environment_name'] !== "Development"){
                last_prod_release = "Release"+value['build_release_id']
            }
            var headerTag = value['build_environment_name'] === "Development" ? 'h3' : 'h2';
            var envStyleClass = '';
            if(value['build_environment_name'] === "Development"){
                if(ifFirstRels){
                    envStyleClass = 'BuildReleaseEnvironmentDevelopmentPreRelease';
                }else{
                    envStyleClass = 'BuildReleaseEnvironmentDevelopment';
                }
            }else{
                envStyleClass = 'BuildReleaseEnvironmentProduction';
            }
            //var envStyleClass = value['build_environment_name'] === "Development" ? 'BuildReleaseEnvironmentDevelopment' : 'BuildReleaseEnvironmentProduction';
            var str =   `<div id="BuildReleaseContainer" class="BuildReleaseContainer ${envStyleClass} ${last_prod_release}">
                            <div class="BuildReleaseContainerHeader row" id="v${value['build_release_version']}">
                                <a class="four columns" href="https://github.com/PatrickMurphy/nflarrest/commit/${value['build_release_detail_commithash']}">
                                    <${headerTag}>${value['build_release_version']}</${headerTag}>
                                </a>
                                <p class="BuildReleaseDate four columns"><b>Date</b>: ${value['build_release_date'].substring(0,10)}</p>
                                <p id="BuildReleaseEnvironmentLabel" class="BuildReleaseEnvironment four columns ${envStyleClass}">${value['build_environment_name']}</p>
                            </div>
                            <div class="BuildReleaseContainerBody">
                                <p>${value['build_release_description']}</p>
                                <p><b>Arrest Count</b>: ${value['build_release_detail_ArrestCount']}</p>
                                <p>
                                    <b>Files Changed</b>: 
                                    <a href="#" onClick="document.getElementById('filesChanged${value['build_release_id']}').style.display='block'; return false;">${value['build_release_detail_filecount']}</a>
                                </p>
                                <p style="display:none;" id="filesChanged${value['build_release_id']}">
                                    <b>Files Changed</b>: ${value['build_release_detail_commitfiles']}
                                </p>
                            </div>
                    </div>`;
            if(value['build_environment_name'] !== 'Development'){
                str += "<a href='#' onClick=\"$('.BuildReleaseEnvironmentDevelopment." + last_prod_release + "').show(); $('#showDevRelButton"+last_prod_release+"').hide(); $('#hideDevRelButton"+last_prod_release+"').show(); return false;\" class=\"button showDevRelBtn\" id=\"showDevRelButton"+last_prod_release+"\">Show Development Releases</a>";
                str += "<a href='#' onClick=\"$('.BuildReleaseEnvironmentDevelopment." + last_prod_release + "').hide(); $('#showDevRelButton"+last_prod_release+"').show(); $('#hideDevRelButton"+last_prod_release+"').hide(); return false;\" class=\"button hideDevRelBtn\" id=\"hideDevRelButton"+last_prod_release+"\">Hide Development Releases</a>"
            }

            $('#historyContainer').append(str);
            $('#BuildHistoryVersionList').append(versionLink);
        });
    }
};

$(document).ready(function () {
    var page = new BuildHistoryPage();
});