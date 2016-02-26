<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Modeler_Unauthorized.aspx.cs" Inherits="cips_beta.Modeler_Unauthorized" %>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="CIPS">
		<meta name="author" content="VESTRA Resources, Inc.">
		<link rel="shortcut icon" href="img/favicon.png">
		<title>CIPS</title>
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="fonts/font-awesome/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="css/cips.css">
	</head>

	<body class="claro">

		<!-- Header -->
		<div id="header-container" class="navbar navbar-fixed-top">
			<div class="navbar-header pull-left">
				<img class="logo" src="img/app-editor.png" title="Cannabis Identification and Prioritization System">
				<!--<a class="navbar-brand" id="appTitle" href="javascript:void(0);"></a>-->
			</div>
			<div class="navbar-header">
				<button title="Show/hide the top menu" type="button" class="navbar-toggle" data-toggle="collapse" data-target="#headerTabs">
					<i class="fa fa-bars"></i>
				</button>
			</div>
			<ul class="collapse navbar-collapse nav navbar-nav navbar-right" id="headerTabs">
				<li id="aboutCips">
					<a id="about-cips" class="action"><i class="fa fa-info-circle fa-lg" title="About CIPS"></i></a>
				</li>
				<li>
				    <a id="cips-dashboard" class="action" href="index.aspx"><i class="fa fa-dashboard fa-lg" title="Return to CIPS Dashboard"></i></a>
				</li>
				<li id="openEditor">
					<a id="open-editor" class="action" href="editor.aspx"><i class="fa fa-pencil-square-o fa-lg" title="Launch CIPS Editor"></i></a>
				</li>
				<li id="personalizedPanel">
					<a id="sign-out" class="action" href="Logout.aspx"><i class="fa fa-sign-out fa-lg" title="Sign Out"></i></a>
				</li>
			</ul>
			<div class="navbar-header pull-right">
				<img class="logo-right visible-lg visible-md visible-sm" src="img/logo-right.png">
			</div>
		</div>
 
        <!-- In-Role Content -->
		<div id="appContent" class="sectionContent">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12">
                        <br /><br />
                        <ul><li>
						This user account does not have CIPS modeler permission.
                        </li></ul>
					</div>
				</div>
			</div>
		</div>

		<!-- JS libraries, placed at the end of the document so the pages load faster -->
		<script type="text/javascript" src="js/lib/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="js/lib/moment.js"></script>
		<script type="text/javascript" src="js/lib/bootstrap.min.js"></script>

	</body>
</html>