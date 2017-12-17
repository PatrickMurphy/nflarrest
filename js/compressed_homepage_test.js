function renderActivePlayerArrests(){$.getJSON("http://nflarrest.com/api/overall/activePlayerArrests.php",function(t){var e='<span class="kpi"><span class="kpi-value-large">'+(100*t[0].percent).toFixed(2)+'%</span><span class="kpi-description-smaller">Active Players Arrested</span><span><span style="display:inline-block;"><span class="kpi-value-small">'+t[0].arrested+'</span><span class="kpi-description-x-small">arrested</span></span><span style="display:inline-block;margin-left:.5em;"><span class="kpi-value-small">'+t[0].active+'</span><span class="kpi-description-x-small">active</span></span></span>';$("#activePlayerArrestRate").html(e)})}function loadTeamLinks(t){$.each(t,function(t,e){$("#bottomTeamLinks").append('<a href="team/'+e.Team+"/\"><span style=\"display:inline-block;width:20px;height:20px;vertical-align: text-bottom;background:url('images/NFLTeamLogos.png') 0px -"+20*e.Team_logo_id+'px;background-size:100%;"></span> '+e.Team_preffered_name+"</a> ")})}function loadingFinished(){setupArrestOMeter(),nflLoadingBar.hideLoading(),listsReturned=!1,mainChartReturned=!1,setupFacebook(),setupTwitter(),$("#newsletterForm").submit(function(t){t.preventDefault(),$.ajax({url:"http://patrickmurphywebdesign.com/Projects/emails/emailList.php",type:"POST",data:{email:$("input[name=email]").val()}}),$("#newsletterForm").html("<p>Thanks for Subscribing! Expect Emails when Players are arrested or when records are broken!</p>"),googleTracking.sendTrackEvent("Email List","Subscribe")}),$("#newsletterForm input[name=email]").focus(function(){googleTracking.sendTrackEvent("Email List","Focus")})}function setupArrestOMeter(){$.getJSON("http://nflarrest.com/api/v1/meter",function(t){var e=t.current.daysSince,a=t.alltime.record,n=t.alltime.average,o=parseInt(e)/a;$("#arrest_meter_text").html("It has been <b>"+e+"</b> Days since the last arrest.</p>"),$("#arrest_meter_subtext").html("Average: <b>"+n+"</b> Days | Record W/O arrest: <b>"+a+"</b> Days"),$(".recordHolder").html(a),$(".avgRecord").html(n),$(".meter-fg").animate({width:100*o+"%"},1750)})}function changeTopChart(){setupChart(),1==mainChartStyleID?($(".mainChartBtn").removeClass("button-primary"),$("#mainChartByYearBtn").addClass("button-primary")):0==mainChartStyleID?($(".mainChartBtn").removeClass("button-primary"),$("#mainChartByTeamBtn").addClass("button-primary")):2==mainChartStyleID?($(".mainChartBtn").removeClass("button-primary"),$("#mainChartBySeasonBtn").addClass("button-primary")):3==mainChartStyleID?($(".mainChartBtn").removeClass("button-primary"),$("#mainChartByConfBtn").addClass("button-primary")):4==mainChartStyleID&&($(".mainChartBtn").removeClass("button-primary"),$("#mainChartByConfDivBtn").addClass("button-primary"))}function getOverallChartData(t){1==mainChartStyleID?$.getJSON("http://nflarrest.com/api/overall/customStackedBar.php?bar_col=Year&stack_col=Crime&bar_order_dir=ASC&order_dir=DESC&bar_order_col=Year&legend_order_col=Measure&start_date="+dateRangeNFL.getStart()+"&end_date="+dateRangeNFL.getEnd(),t):0==mainChartStyleID?$.getJSON("http://nflarrest.com/api/overall/topTeams.php?graph=true&start_date="+dateRangeNFL.getStart()+"&end_date="+dateRangeNFL.getEnd(),t):2==mainChartStyleID?$.getJSON("http://nflarrest.com/api/v1/ArrestsSeasonState?start_date="+dateRangeNFL.getStart()+"&end_date="+dateRangeNFL.getEnd(),t):3==mainChartStyleID?$.getJSON("http://nflarrest.com/api/overall/customStackedBar.php?bar_col=Day&stack_col=Crime&bar_order_dir=ASC&order_dir=DESC&bar_order_col=DayOrder&legend_order_col=Measure&start_date="+dateRangeNFL.getStart()+"&end_date="+dateRangeNFL.getEnd(),t):4==mainChartStyleID&&$.getJSON("http://nflarrest.com/api/overall/conferenceDivisionByYear.php?graph=true&start_date="+dateRangeNFL.getStart()+"&end_date="+dateRangeNFL.getEnd(),t)}function setupChart(){void 0!==stackedBarChart.stackedChart&&stackedBarChart.stackedChart.destroy(),getOverallChartData(function(t){stackedBarChart.init({data:t,targetElement:"#chart",targetExpandBtn:"#details_summary_btn",hideBtn:"#hideAll_btn",showBtn:"#showAll_btn"}),mainChartReturned=!0,listsReturned&&loadingFinished()})}function load_top_list(t,e,a,n,o,r){(r=r||!1)&&(last_start_pos=0);var i=[];t.length>0?$.each(t,function(t,n){var r='<a href="'+e+"/"+n[o[0]]+'/">',s="</a>";""==e&&(r="",s=""),i.push("<li id='"+a+t+"'>"+r+"<span>"+n[o[0]]+"</span><span class='value-cell'>"+n[o[1]]+"</span>"+s+"</li>")}):r&&i.push('<li class="list-no-data-msg-item">No Data Available for this Date Range</li>'),r?$(n).html(i.join("")):$(n).append(i.join(""))}function load_top_crimes_list(t){load_top_list("http://nflarrest.com/api/overall/topCrimes.php?limit=5&start_pos="+last_start_pos,"crime","top_crime_","#top_crimes_list",["Category","arrest_count"],t=t||!1)}function load_top_players_list(t){load_top_list("http://nflarrest.com/api/overall/topPlayers.php?limit=5&start_pos="+last_start_pos,"player","top_player_","#top_players_list",["Name","arrest_count"],t=t||!1)}function load_top_positions_list(t){load_top_list("http://nflarrest.com/api/overall/topPositions.php?limit=5&start_pos="+last_start_pos,"position","top_pos_","#top_positions_list",["Position","arrest_count"],t=t||!1)}function load_top_lists(t,e){t=t||"not first",e=e||!1,$(".list-no-data-msg-item").remove(),"first"!=t&&googleTracking.sendTrackEvent("TopLists","Load Next Page");var a="http://nflarrest.com/api/overall/topLists.php?limit=5&start_pos="+last_start_pos+"&start_date="+dateRangeNFL.getStart()+"&end_date="+dateRangeNFL.getEnd();$.getJSON(a,function(t){var a=t[0],n=t[1],o=t[2];a.length+n.length+o.length<=0&&0==last_start_pos&&console.log("no data returned"),load_top_list(a,"crime","top_crime_","#top_crimes_list",["Category","arrest_count"],e),load_top_list(n,"player","top_player_","#top_players_list",["Name","arrest_count"],e),load_top_list(o,"position","top_pos_","#top_positions_list",["Position","arrest_count"],e),listsReturned=!0,listsReturnCount=0,last_start_pos+=5,!0===mainChartReturned&&loadingFinished()})}function reload_top_lists(){last_start_pos=0,load_top_lists("not first",!0)}function gaEvent(t,e,a,n,o){googleTracking.sendTrackEvent(a,n)}function setupFacebook(){console.log("FB Setup"),window.fbAsyncInit=function(){FB.init({appId:"563956043742586",xfbml:!0,version:"v2.4"}),FB.Event.subscribe("edge.create",function(t){gaEvent("send","social","facebook","like",t)}),FB.Event.subscribe("edge.remove",function(t){gaEvent("send","social","facebook","unlike",t)}),FB.Event.subscribe("message.send",function(t){gaEvent("send","social","facebook","send",t)})},function(t,e,a){var n,o=t.getElementsByTagName(e)[0];t.getElementById(a)||((n=t.createElement(e)).id=a,n.src="//connect.facebook.net/en_US/sdk.js",o.parentNode.insertBefore(n,o))}(document,"script","facebook-jssdk")}function setupTwitter(){console.log("twitter setup"),window.twttr=function(t,e,a){var n,o=t.getElementsByTagName(e)[0],r=window.twttr||{};return t.getElementById(a)?r:(n=t.createElement(e),n.id=a,n.src="https://platform.twitter.com/widgets.js",o.parentNode.insertBefore(n,o),r._e=[],r.ready=function(t){r._e.push(t)},r)}(document,"script","twitter-wjs"),twttr.ready(function(t){t.events.bind("tweet",function(t){if(t){var e=window.location.href;t.target&&"IFRAME"==t.target.nodeName&&(e=extractParamFromUri(t.target.src,"url")),gaEvent("send","social","twitter","tweet",e),console.log("thanks for sharing",e)}})})}function extractParamFromUri(t,e){if(!t)return null;var a=new RegExp("[\\?&#]"+e+"=([^&#]*)").exec(t);return null!=a?decodeURI(unescape(a[1])):null}function saveCanvasAsPNG(t){var e=document.getElementById(t).toDataURL("image/png").replace("image/png","image/octet-stream");window.location.href=e}function update_hash(){var t=window.location.pathname.split("/");return pageID=window.location.hash||extractParamFromUri(window.location.search,"id")||t.pop()||t.pop()||"#!ID Not Set",pageID=decodeURI(pageID),pageID=pageID.replace("#!",""),pageID=pageID.replace("#",""),$("#pageTitle").append(pageID),pageID}function loadCSS(t){!function(e,a){var n=e.createElement(a),o=e.getElementsByTagName(a)[0];n.href=t,n.rel="stylesheet",o.parentNode.insertBefore(n,o)}(document,"LINK")}var dateRangeNFL,mainChartReturned=!1,last_start_pos=0,listsReturnCount=0,listsReturned=!1,ytdChart=!1,mainChartStyleID=0;$(window).load(function(){dateRangeController.init(function(t){nflLoadingBar.init(),dateRangeNFL=t,window.location.hash&&(mainChartStyleID="#ByYear"==window.location.hash?1:"#BySeason"==window.location.hash?2:0),changeTopChart(),load_top_lists("first"),$("#dateRangeJquery").on("dateRangeChanged",function(t){nflLoadingBar.showLoading(),setupChart(),reload_top_lists()}),$("#loadMoreLists").click(load_top_lists),renderActivePlayerArrests(),$.getJSON("http://nflarrest.com/api/v1/team",loadTeamLinks),$("#mainChartByTeamBtn").click(function(){ytdChart=!1,mainChartStyleID=0,window.location.hash="ByTeam",changeTopChart(),googleTracking.sendTrackEvent("mainChart","switchToByTeam")}),$("#mainChartByYearBtn").click(function(){ytdChart=!0,mainChartStyleID=1,window.location.hash="ByYear",changeTopChart(),googleTracking.sendTrackEvent("mainChart","switchToByYear")}),$("#mainChartBySeasonBtn").click(function(){ytdChart=!1,mainChartStyleID=2,window.location.hash="BySeason",changeTopChart(),googleTracking.sendTrackEvent("mainChart","switchToBySeason")}),$("#mainChartByConfBtn").click(function(){ytdChart=!0,mainChartStyleID=3,window.location.hash="ByDayOfWeek",changeTopChart(),googleTracking.sendTrackEvent("mainChart","switchToByDayOfWeek")}),$("#mainChartByConfDivBtn").click(function(){ytdChart=!0,mainChartStyleID=4,window.location.hash="ByDivision",changeTopChart(),googleTracking.sendTrackEvent("mainChart","switchToByDivision")})}),$(".top-list ol li").click(function(){return window.location=$(this).find("a").attr("href"),!1})}),window.mobileCheck=function(){var t=!1;return function(e){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0)}(navigator.userAgent||navigator.vendor||window.opera),t},window.mobileAndTabletCheck=function(){var t=!1;return function(e){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0)}(navigator.userAgent||navigator.vendor||window.opera),t};var isFirstHover=!0,stackedBarChart={stackedChart:void 0,options:{targetElement:"#theElementSelector",targetExpandBtn:"#btnSelector",showBtn:"#btnSelector",hideBtn:"#btnSelector",data:{},isExpanded:!1,customLegend:!0,zoomEnabled:!1},init:function(t){this.options.data={},$.extend(!0,this.options,t);var e=this;console.log("Initialize Chart:  "+this.options.targetElement),e.options.$targetElement=$(this.options.targetElement),e.options.$expandBtnElement=$(this.options.targetExpandBtn),e.options.$showBtnElement=$(this.options.showBtn),e.options.$hideBtnElement=$(this.options.hideBtn),stackedBarChart.options.$expandBtnElement.off("click"),stackedBarChart.options.$expandBtnElement.click(e.toggleExpand),stackedBarChart.options.$hideBtnElement.click(e.hideAllCategories),stackedBarChart.options.$showBtnElement.click(e.showAllCategories),e.renderChart()},renderChart:function(){if($(document).width()<800)t=20;else var t=6;stackedBarChart.stackedChart=c3.generate({bindto:stackedBarChart.options.targetElement,data:{empty:{label:{text:"No Data Available for this Date Range"}},x:"x",columns:stackedBarChart.options.data.columns,groups:[stackedBarChart.options.data.groups],order:"asc",type:"bar",onclick:function(t,e){void 0!==mainChartStyleID&&0==mainChartStyleID&&(googleTracking.sendTrackEvent("mainChart","teamLink"),setTimeout(function(){window.location.href="team/"+stackedBarChart.options.data.columns[0][t.index+1]+"/"},100))}},zoom:{enabled:stackedBarChart.options.zoomEnabled},padding:{bottom:t},legend:{show:!stackedBarChart.options.customLegend},axis:{x:{type:"category"}},color:{pattern:["#1F77B4","#FF7F0E","#2CA02C","#D62728","#9467BD","#8C564B","#E377C2","#7F7F7F","#BCBD22","#17BECF","#154F78","#B0580A","#248224","#7D1717"]}}),stackedBarChart.options.customLegend&&stackedBarChart.renderCustomLegend()},renderCustomLegend:function(){$(".customLegend").remove(),d3.select(".chart-container").insert("div",".chart-options").attr("class","customLegend").selectAll("span").data(stackedBarChart.options.data.groups).enter().append("span").attr("data-id",function(t){return t}).attr("class",function(t){var e=t.replace("/","");return"customLegend-item customLegend-item-"+(e=e.split(" ").join(""))}).html(function(t){return'<span class="customLegend-item-color" style="background-color:'+stackedBarChart.stackedChart.color(t)+';"></span> '+t}).on("mouseover",function(t){stackedBarChart.stackedChart.focus(t),isFirstHover&&(isFirstHover=!1,googleTracking.sendTrackEvent("mainChart","legendMouseover"))}).on("mouseout",function(t){stackedBarChart.stackedChart.revert()}).on("click",function(t){stackedBarChart.stackedChart.toggle(t);var e=t.replace("/","");e=e.split(" ").join("");var a=d3.select(".customLegend-item-"+e);console.log(a),a.classed("transparent",!a.classed("transparent")),googleTracking.sendTrackEvent("mainChart","legendClick")})},toggleExpand:function(){stackedBarChart.options.$targetElement.toggleClass("expanded"),stackedBarChart.options.isExpanded=!stackedBarChart.options.isExpanded,stackedBarChart.options.isExpanded?stackedBarChart.options.$expandBtnElement.html("Collapse"):stackedBarChart.options.$expandBtnElement.html("Expand"),googleTracking.sendTrackEvent("mainChart","expand toggle"),stackedBarChart.renderChart()},hideAllCategories:function(){stackedBarChart.stackedChart.hide(),googleTracking.sendTrackEvent("mainChart","hideAll"),$(".customLegend-item").addClass("transparent")},showAllCategories:function(){stackedBarChart.stackedChart.show(),googleTracking.sendTrackEvent("mainChart","showAll"),$(".customLegend-item").removeClass("transparent")}},dateRangeController={start_date:"2000-01-01",end_date:"",init:function(t){if("undefined"!=typeof pageID)"#!"+(pageID||"");else;$("#dateRangeJquery").daterangepicker({presetRanges:[{text:"Last 3 Months",dateStart:function(){return moment().subtract("months",3)},dateEnd:function(){return moment()}},{text:"Last 6 Months",dateStart:function(){return moment().subtract("months",6)},dateEnd:function(){return moment()}},{text:"Last Year",dateStart:function(){return moment().subtract("years",1)},dateEnd:function(){return moment()}},{text:"Last 5 Years",dateStart:function(){return moment().subtract("years",5)},dateEnd:function(){return moment()}},{text:"All Records",dateStart:function(){return moment("2000-01-01")},dateEnd:function(){return moment()}}],datepickerOptions:{minDate:new Date("2000-01-01"),maxDate:0}});var e=moment().format("YYYY-MM-DD");this.start_date=this.getCookie("start_date")||"2000-01-01",this.end_date=this.getCookie("end_date")||e,$("#dateRangeJquery").daterangepicker("setRange",{start:moment(this.start_date).toDate(),end:moment(this.end_date).toDate()}),$("#dateRangeJquery").on("change",this.changeDateRange),$("#dateRangeJquery").on("open",function(){googleTracking.sendTrackEvent("DateRange","OpenDialog")}),t(this)},resetTime:function(t){googleTracking.sendTrackEvent("DateRange","Reset"),t=t||!1;var e,a,n=new Date;e=n.getMonth()<9?"0"+(n.getMonth()+1):n.getMonth()+1,a=n.getDate()<10?"0"+n.getDate():n.getDate();var o=n.getFullYear()+"-"+e+"-"+a;dateRangeController.setDates("2000-01-01",o)},getStart:function(){return this.start_date},getEnd:function(){return this.end_date},changeDateRange:function(){var t=JSON.parse($("#dateRangeJquery").val());console.log(t);var e=t.start,a=t.end;if(new Date(e)>new Date(a)){var n=e;e=a,a=n}dateRangeController.setDates(e,a)},setDates:function(t,e){if(dateRangeController.setCookie("start_date",t),dateRangeController.setCookie("end_date",e),dateRangeController.start_date=t,dateRangeController.end_date=e,window.CustomEvent){new Event("dateRangeChanged");$("#dateRangeJquery").trigger("dateRangeChanged"),googleTracking.sendTrackEvent("DateRange","DateChanged")}},setCookie:function(t,e,a){var n=new Date;a=a||.5,n.setTime(n.getTime()+24*a*60*60*1e3);var o="expires="+n.toUTCString();document.cookie=t+"="+e+"; "+o},getCookie:function(t){for(var e=t+"=",a=document.cookie.split(";"),n=0;n<a.length;n++){for(var o=a[n];" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(e))return o.substring(e.length,o.length)}return""}},hashervar=window.location.hash||"",pagePath=window.location.pathname+hashervar;!function(t,e,a,n,o,r,i){t.GoogleAnalyticsObject=o,t[o]=t[o]||function(){(t[o].q=t[o].q||[]).push(arguments)},t[o].l=1*new Date,r=e.createElement(a),i=e.getElementsByTagName(a)[0],r.async=1,r.src="//www.google-analytics.com/analytics.js",i.parentNode.insertBefore(r,i)}(window,document,"script",0,"ga"),ga("create","UA-66360026-1","auto"),ga("send","pageview",pagePath);var googleTracking={tracker:void 0,initialize:function(t){googleTracking.tracker=t},sendTrackEvent:function(t,e){arguments.length<3&&ga("send","event",t,e)}};googleTracking.initialize(ga),$(document).ready(function(){$(".donate").click(function(){googleTracking.sendTrackEvent("Donate","Click")})});var nflLoadingBar={options:{targetEl:"body",loadingElID:"loading-bar",message:"Loading..."},init:function(){$(this.options.targetEl).append('<div id="'+this.options.loadingElID+'">'+this.options.message+"</div>"),this.showLoading()},hideLoading:function(){$("#"+nflLoadingBar.options.loadingElID).fadeOut()},showLoading:function(){$("#"+nflLoadingBar.options.loadingElID).fadeIn()}};loadCSS("css/styles.min.css"),loadCSS("//fonts.googleapis.com/css?family=Raleway:400,300,500,600"),loadCSS("css/vendor/normalize.min.css"),loadCSS("css/vendor/skeleton.min.css"),loadCSS("css/vendor/c3.css"),loadCSS("css/vendor/jquery-ui.min.css"),loadCSS("css/vendor/jquery.comiseo.daterangepicker.css");
