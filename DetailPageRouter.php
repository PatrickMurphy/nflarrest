<?php

switch($_GET['page_id']){
	case 'team':
        $page_details['title'] = 'Team';
        $page_details['description'] = 'Findout how many arrests your rival football team has, read about what went down with police, find out what crimes each team commonly is charged with.';
        $page_details['javascript']['main'] = 'js/TeamDetailPage.js';
        $page_details['show_share_buttons'] = true;
        $page_details['chartsHTML'] = '<div class="four columns top-list">'.
					'<h3>Top Players</h3>'.
					'<div id="playerchart"></div>'.
				'</div>'.
				'<div class="four columns top-list"></div>'.
				'<div class="four columns top-list">'.
					'<h3>Top Crimes</h3>'.
					'<div id="crimechart"></div>'.
				'</div>';
	break;
	case 'player':
        $page_details['title'] = 'Player';
        $page_details['description'] = 'Detailed information about individual NFL players arrest records. For example you can learn about each of Adam \'Pacman\' Jones\' nine encounters with law enforcement, their outcomes, and what football team he was playing for at the time.';
        $page_details['javascript']['main'] = 'js/PlayerDetailPage.js';
        $page_details['show_share_buttons'] = false;
        $page_details['chartsHTML'] = '<div class="four columns top-list">'.
					'<h3>Common Crimes</h3>'.
					'<div id="crimeschart"></div>'.
				'</div>'.
				'<div class="four columns top-list">&nbsp;</div>'.
				'<div class="four columns top-list">'.
					'<h3>Teams Arrested Under</h3>'.
					'<div id="teamchart"></div>'.
				'</div>';
	break;
	case 'crime':
        $page_details['title'] = 'Crime';
        $page_details['description'] = 'Find details about individual crimes that are most often left NFL Players in cuffs, Find and compare trends of popular crimes like DUI, Domestic Violence, and Drugs.';
        $page_details['javascript']['main'] = 'js/CrimeDetailPage.js';
        $page_details['javascript']['timeSeries'] = 'js/timeSeriesChart.js';
        $page_details['show_share_buttons'] = true;
        $page_details['chartsHTML'] = '<div class="four columns top-list">' .
					'<h3>Top Teams</h3>' .
					'<div id="teamchart"></div>' .
				'</div>' .
				'<div class="four columns top-list">' .
					'<h3>Top Players</h3>' .
					'<div id="playerchart"></div>' .
				'</div>' .
				'<div class="four columns top-list">' .
					'<h3>Top Positions</h3>' .
					'<div id="poschart"></div>' .
				'</div>';        
	break;
	case 'position':
        $page_details['title'] = 'Position';
        $page_details['description'] = 'Find out what crimes are commited most often by NFLs individual football positions like Quarter back, wide reciever and more. What NFL positions do you think is most likely to be arrested?';
        $page_details['javascript']['main'] = 'js/PositionDetailPage.js';
        $page_details['show_share_buttons'] = false;
        $page_details['chartsHTML'] = '<div class="four columns top-list">' .
                '<h3>Top Team</h3>' .
                '<div id="teamchart"></div>' .
                '</div>' . 
                '<div class="four columns top-list"></div>' .
                '<div class="four columns top-list">' .
                '<h3>Top Crimes</h3>' .
                '<div id="crimechart"></div>' .
                '</div>';
        break;
        
    // if unexpected path, default to index
	default:
		include('index.html');
        exit(); // exit code after loading.html, switch to header to 404?
}

include("templates/DetailPageTemplate.php");

?>