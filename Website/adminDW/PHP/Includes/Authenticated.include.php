<?php
// setup db, this is used in all includes also, but req once should maintain
require_once('PHP/Includes/AdminDatabaseSetup.include.php');

// handle form actions (add arrest, cache season state, arrests, or last arrests. send email)
include_once('PHP/Includes/HandleAdminFormAction.include.php');

// GET HTML Select Options For Crimes, Teams, Legal Levels, Resolution_Categories
include_once('PHP/Includes/GetArrestSelectOptions.include.php');

// Get Email List info
include_once('PHP/Includes/GetEmailListInfo.include.php');

// Admin Dashboard HTML & JS include
include('PHP/Includes/AdminDashboard.include.php');
?>
