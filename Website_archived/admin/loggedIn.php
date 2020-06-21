<?php
// setup db, this is used in all includes also, but req once should maintain
require_once('AdminDatabaseSetup.include.php');

// handle form actions (add arrest, cache season state, arrests, or last arrests. send email)
include_once('HandleAdminFormAction.include.php');

// GET HTML Select Options For Crimes, Teams, Legal Levels, Resolution_Categories
include_once('GetArrestSelectOptions.include.php');

// Get Email List info
include_once('GetEmailListInfo.include.php');

// Admin Dashboard HTML & JS include
include('AdminDashboard.include.php');
?>
