﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Editor.aspx.cs" Inherits="cips_beta.Editor" %>

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
		<link rel="stylesheet" type="text/css" href="http://js.arcgis.com/3.15/esri/css/esri.css">
		<link rel="stylesheet" type="text/css" href="fonts/font-awesome/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="//js.arcgis.com/3.15compact/dijit/themes/claro/claro.css">
		<link rel="stylesheet" type="text/css" href="css/bootstrapmap.css">
		<link rel="stylesheet" type="text/css" href="css/bootstrap-toggle.min.css">
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
					<a id="about-cips" class="action" style="display: none;"><i class="fa fa-info-circle fa-lg" title="About CIPS"></i></a>
				</li>
				<li>
				    <a id="cips-dashboard" class="action" href="index.aspx" style="display: none;"><i class="fa fa-dashboard fa-lg" title="Return to CIPS Dashboard"></i></a>
				</li>
				<li id="openModeler">
					<a id="open-modeler" class="action" href="modeler.aspx" style="display: none;"><i class="fa fa-cogs fa-lg" title="Launch CIPS Modeler"></i></a>
				</li>
				<li id="personalizedPanel">
					<a id="sign-out" class="action" style="display: none;" href="Logout.aspx"><i class="fa fa-sign-out fa-lg" title="Sign Out"></i></a>
				</li>
			</ul>
			<div class="navbar-header pull-right">
				<img class="logo-right visible-lg visible-md visible-sm" src="img/logo-right.png">
			</div>
		</div>
 
        <!-- Initialization -->
		<div id="appInit" class="sectionLogin text-center" style="display: none;">
			Access to CIPS is restricted to authorized users only.
			<br/>
			<br/>
			<div id="sign-in" class="action btn btn-default" style="display: none;">
				Sign In
			</div>
			<br/>
			<br/>
		</div>
		
        <!-- In-Role Content -->
		<div id="appContent" class="sectionContent">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12 box-header-area">
						<!-- Header navbar (menu) -->
						<div class="navbar navbar-menu">
							<div class="tab-header-text">
								<i class="fa fa-dashboard"></i> Map
							</div>
							<div id="ribbon-bar-header" class="navbar-header">
								<button title="Show/hide Map menu" type="button" class="navbar-toggle" data-toggle="collapse" data-target="#ribbonTabs">
									<i class="fa fa-bars"></i>
								</button>
							</div>
							<div class="collapse navbar-collapse" id="ribbonTabs">

								<ul class="nav navbar-nav">
									<li>
										<a href="#menu6" class="tabItems" role="tab" data-toggle="tab" id="menuEdit" onclick="app.menuChange(this);"><i class="fa fa-pencil-square-o fa-lg">&nbsp;</i>Edit Tools</a>
									</li>
									<li>
										<a href="#menu1" class="tabItems" role="tab" data-toggle="tab" id="menuSearch" onclick="app.menuChange(this);"><i class="fa fa-search fa-lg">&nbsp;</i>Search</a>
									</li>
									<li>
										<a href="#menu2" class="tabItems" role="tab" data-toggle="tab" id="menuLayers" onclick="app.menuChange(this);"><i class="fa fa-list fa-lg">&nbsp;</i>Layers</a>
									</li>
									<li>
										<a href="#menu3" class="tabItems" role="tab" data-toggle="tab" id="menuBasemap" onclick="app.menuChange(this);"><i class="fa fa-map-o fa-lg">&nbsp;</i>Basemap</a>
									</li>
									<li>
										<a href="#menu4" class="tabItems" role="tab" data-toggle="tab" id="menuAnalysis" onclick="app.menuChange(this);"><i class="fa fa-cog fa-lg">&nbsp;</i>Analysis</a>
									</li>
									<li>
										<a href="#menu5" class="tabItems" role="tab" data-toggle="tab" id="menuMapTools" onclick="app.menuChange(this);"><i class="fa fa-wrench fa-lg">&nbsp;</i>Map Tools</a>
									</li>
								</ul>
							</div>
						</div>

						<!-- Header ribbonbar (menu items) -->
						<div id="ribbon-bar" class="tab-content">

							<!-- Search menu -->
							<div id="menu1" class="tab-pane ribbon-bar-tab">
								<div class="menuLevel3">
									An address, place name, or Long/Lat (ex: -122.45, 40.25)
									<div id="searchBasic"></div>
								</div>
								<div class="menuLevel3">
									A Regional Water Quality Control Board boundary
									<select class="form-control" id="frmSearchRegion" onchange="app.findRegion()">
										<option>Select a Region</option>
										<option value="1" title="North Coast" class="option-data">R1 (North Coast)</option>
										<option value="2" title="San Francisco">R2 (San Francisco)</option>
										<option value="3" title="Central Coast">R3 (Central Coast)</option>
										<option value="4" title="Los Angeles">R4 (Los Angeles)</option>
										<option value="5" title="Central Valley" class="option-data">R5 (Central Valley)</option>
										<option value="6" title="Lahontan">R6 (Lahontan)</option>
										<option value="7" title="Colorado River">R7 (Colorado River)</option>
										<option value="8" title="Santa Ana">R8 (Santa Ana)</option>
										<option value="9" title="San Diego">R9 (San Diego)</option>
									</select>
									Regions with CIPS data are highlighted in <span class="option-data">bold</span>.
								</div>
								<div class="menuLevel3">
									An Interpretation Area
									<select class="form-control" id="frmSearchInterp" onchange="app.findInterpArea()">
										<option>Select an Interpretation Area</option>
										<option class="option-data">Bear Creek</option>
										<option class="option-data">Cottonwood Creek</option>
										<option class="option-data">Deer Creek</option>
										<option class="option-data">Feather River</option>
										<option class="option-data">Navarro River</option>
										<option class="option-data">Redwood Creek</option>
										<option>Robinson Creek</option>
										<option class="option-data">South Fork Trinity River</option>
										<option>Region 1 South of Ferndale</option>
										<option class="option-data">Willow Creek</option>
									</select>
									Completed Interpretation Areas are highlighted in <span class="option-data">bold</span>.
								</div>
								<div class="menuLevel3">
									A Watershed (HUC12)
									<div id="searchWatershed"></div>
								</div>
								<!--<div class="menuLevel3">
								A Grow Site (Under development)
								<select class="form-control" id="frm" name="frmSearchSite" disabled>
								<option>Select a Grow</option>
								</select>
								</div>-->
							</div>

							<!-- Layer toggle -->
							<div id="menu2" class="tab-pane ribbon-bar-tab">
								<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

									<!-- Layers on/off -->
									<div class="panel panel-default in">
										<div class="panel-heading" role="tab" id="menu2panel3">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#menu2collapse3" aria-expanded="false" aria-controls="collapseThree"> Turn Layers On/Off </a></h4>
										</div>
										<div id="menu2collapse3" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="menu2panel3">
											<div class="panel-body">
												<div id="allLayerToggle">
													<button id="toggle-layers" onclick="app.toggleAllLayers(false);" class="btn btn-block" title="Turn off all layers on the map.">
														Turn off all map layers
													</button><br/>
												</div>
												<div id="mapTocDiv"></div>
											</div>
										</div>
									</div>

								</div>
							</div>

							<!-- Basemap toggle -->
							<div id="menu3" class="tab-pane ribbon-bar-tab">
								<div id="basemapGallery"></div>
							</div>

							<div id="menu4" class="tab-pane ribbon-bar-tab">
								<div class="panel-group" id="accordion4" role="tablist" aria-multiselectable="true">
									
									<!-- Show Grow Site features -->
									<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="menu4panel3">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion4" href="#menu4collapse3" aria-expanded="false" aria-controls="collapseThree"> View/Summarize Grow Site</a></h4>
										</div>
										<div id="menu4collapse3" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="menu4panel3">
											<div class="panel-body">
												<label class="checkbox-inline">
													<input id="sumSite-toggle" type="checkbox" data-toggle="toggle">
													Grow Site Summary </label>
												<div class="menuLevel3" id="sumSiteText" style="display: none;">
													Click on a Grow Site to display summary.
												</div>
											</div>
										</div>
									</div>
									
									<!-- this portion commented out, for the editor, we don't include the watershed summary tool. If implemented, the logic associated with this tool
										would need to be added to JS code. See Dashboard code for this -->
									<!--<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="menu4panel1">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion4" href="#menu4collapse1" aria-expanded="false" aria-controls="collapseOne"> Watershed Stats</a></h4>
										</div>
										<div id="menu4collapse1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="menu4panel1">
											<div class="panel-body">
												<label class="checkbox-inline">
													<input id="sumWshd-toggle" type="checkbox" data-toggle="toggle">
													Grow Summary </label>
												<div class="menuLevel3" id="sumWshdText" style="display: none;">
													Click on a watershed boundary to display summary.
												</div>
											</div>
										</div>
									</div>
									<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="menu4panel2">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion4" href="#menu4collapse2" aria-expanded="false" aria-controls="collapseTwo" onclick="app.buildElevProfile();"> Elevation Profile</a></h4>
										</div>
										<div id="menu4collapse2" class="panel-collapse collapse" role="tabpanel" aria-labelledby="menu4panel2">
											<div class="panel-body">
												<div id="elevInfo">
													<label class="checkbox-inline">
														<input id="elev-toggle" type="checkbox" data-toggle="toggle">
														Enable Profile Tool </label>
													<div class="menuLevel3" id="elevText" style="display: block;">
														After enabling the Profile Tool, use single clicks on the map to draw a line. Double click to end.
													</div>
													<label>Select unit measure:</label>
													<select id="unitsSelect">
														<option value="esriMiles">Miles</option>
														<option value="esriKilometers">Kilometers</option>
														<option value="esriMeters">Meters</option>
														<option value="esriNauticalMiles">Nautical Miles</option>
														<option value="esriYards">Yards</option>
														<option value="esriFeet">Feet</option>
													</select>
												</div>
												<div id="profileChartNode"></div>
											</div>
										</div>
									</div>-->
								</div>

							</div>

							<!-- Map tools -->
							<div id="menu5" class="tab-pane ribbon-bar-tab">
								<div class="panel-group" id="accordion5" role="tablist" aria-multiselectable="true">
									<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="menu5panel1">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion5" href="#menu5collapse1" aria-expanded="false" aria-controls="collapseOne"> Measurement</a></h4>
										</div>
										<div id="menu5collapse1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="menu5panel1">
											<div class="panel-body">
												<div id="measurement"></div>
											</div>
										</div>
									</div>
									<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="menu5panel2">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion5" href="#menu5collapse2" aria-expanded="false" aria-controls="collapseTwo"> Print</a></h4>
										</div>
										<div id="menu5collapse2" class="panel-collapse collapse" role="tabpanel" aria-labelledby="menu5panel2">
											<div class="panel-body">
Click the button below to begin the printing process. When complete, the printout will automatically load in a new window — or the Print button will turn into a "Printout" link. Click the link to launch the printed PDF in a new window.
												<div id="printButton"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- Edit tools -->
							<div id="menu6" class="tab-pane ribbon-bar-tab">
								<div class="panel-group" id="accordion6" role="tablist" aria-multiselectable="true">
									<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="menu6panel1">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" href="#menu6collapse1" aria-expanded="false" aria-controls="collapseOne"> I want to:</a></h4>
										</div>
										<div id="menu6collapse1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="menu6panel1">
											<div class="panel-body" id="editOptions">
												<p class="bg-info" id="editLabelAdd">Add a New:</p>
												<div class="radio" id="editRadios1">
													<label>
														<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" onclick="app.startDraw('red', 'grow');"> Grow Footprint</label>
												</div>
												<div class="radio" id="editRadios2">
													<label>
														<input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" onclick="app.startDraw('red', 'disturbed');"> Disturbed Area</label>
												</div>
												<div class="radio" id="editRadios3">
													<label>
														<input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" onclick="app.startDraw('blue', 'tank');"> Water Tank</label>
												</div>
												<div class="radio" id="editRadios4">
													<label>
														<input type="radio" name="optionsRadios" id="optionsRadios4" value="option4" onclick="app.startDraw('blue', 'reservoir');"> Reservoir</label>
												</div>
												<div class="radio" id="editRadios9">
													<label>
														<input type="radio" name="optionsRadios" id="optionsRadios9" value="option9" onclick="app.startGrowSite();"> Grow Site</label>
												</div>
												<div class="radio" id="editRadios10">
													<label>
														<input type="radio" name="optionsRadios" id="optionsRadios10" value="option10" onclick="app.startGrowSiteParcel();" title="Add a Parcel to an existing Grow Site"> Grow Site Parcel</label>
												</div>
												<p class="bg-info" id="editLabelEdit">Edit:</p>
												<div class="radio" id="editRadios5">
													<label>
														<input type="radio" name="optionsRadios" id="optionsRadios5" value="option5" onclick="app.startEdit('attribute');"> A Feature's Attributes</label>
												</div>
												<div class="radio" id="editRadios6">
													<label>
														<input type="radio" name="optionsRadios" id="optionsRadios6" value="option6" onclick="app.startEdit('shape')"> A Feature's Shape</label>
												</div>
												<div class="radio" id="editRadios11">
													<label>
														<input type="radio" name="optionsRadios" id="optionsRadios11" value="option11" onclick="app.startAddGrowToSite()"> Add Grow to Grow Site</label>
												</div>
												<div class="radio" id="editRadios7">
													<label>
														<input type="radio" name="optionsRadios" id="optionsRadios7" value="option7" onclick="app.startEdit('merge')"> Merge Grow Sites</label>
												</div>
												<p class="bg-info" id="editLabelDelete">Delete:</p>
												<div class="radio" id="editRadios8">
													<label>
														<input type="radio" name="optionsRadios" id="optionsRadios8" value="option8" onclick="app.startDelete();"> Delete a Feature</label>
												</div>
												<div id="editorDiv"></div>
												<div id="attributesDiv" style="display:none;"></div>
												
											</div>
										</div>
									</div>
									<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="menu6panel2">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" href="#menu6collapse2" aria-expanded="false" aria-controls="collapseTwo"> Instructions</a></h4>
										</div>
										<div id="menu6collapse2" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="menu6panel2">
											<div class="panel-body">
												<div id="editInstructions">Select an editing option.</div>
											</div>
										</div>
									</div>
									<div id="editButtons" class="panel panel-default" style="display:none;">
										<div class="panel-heading" role="tab" id="menu6panel3">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" href="#menu6collapse3" aria-expanded="false" aria-controls="collapseThree"> Save / Cancel</a></h4>
										</div>
										<div id="menu6collapse3" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="menu6panel3">
											<div class="panel-body">
												<button id="saveGraphic" onclick="app.saveGraphic();" style="display: none;" class="btn btn-block">Continue</button>
												<button id="saveEdits" onclick="app.saveEdits()" style="display: none;" class="btn btn-block">Save</button>
												<button id="stopEdit" onclick="app.stopEdit();" style="display: none;" class="btn btn-block">Cancel</button>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
						<button id="ribbon-bar-toggle" onclick="app.hideRibbonMenu();" style="display:none;" title="Close Menu">
							<span class="fa fa-minus-square"></span>
						</button>

						<!-- Bootstrap-map-js -->
						<div id="mapDiv"></div>
						<img id="mapLoading" src='img/loading.gif' class='loadingImg' />

						<div id="coordsBox">
							Map Coords: <span id="coordsText"> </span>
						</div>

						<div id="zoomControls" class="zoomControl">
							<a href="#" id="mapNavPrev">
							<div class="zoomPrev">
								<i class="fa fa-mail-reply"></i>
							</div></a>
							<a href="#" id="mapNavNext">
							<div class="zoomNext">
								<i class="fa fa-mail-forward"></i>
							</div></a>
							<a href="#" id="mapNavFull">
							<div class="zoomFull">
								<i class="fa fa-home fa-large"></i>
							</div></a>
						</div>

					</div>

				</div>
			</div>
		</div>

		<!-- JS libraries, placed at the end of the document so the pages load faster -->
		<script type="text/javascript" src="js/lib/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="js/lib/moment.js"></script>
		<script type="text/javascript" src="js/lib/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/lib/jquery.blockUI.js"></script>
		<script type="text/javascript" >
			$.blockUI({
				message : "Welcome to CIPS.<br/><br/>Please wait while the page loads.",
			});
		</script>
		<script type="text/javascript" src="js/lib/bootbox.min.js"></script>
		<script type="text/javascript" src="js/lib/Chart.min.js"></script>
		<script type="text/javascript" src="js/lib/bootstrap-toggle.min.js"></script>
		<script type="text/javascript" src="http://js.arcgis.com/3.15compact"></script>
		<script type="text/javascript" src="js/cips-editor-webmap.js"></script>
		<script type="text/javascript" src="js/cips-editor-config.js"></script>
		<script type="text/javascript" src="js/cips-editor.js"></script>
	</body>
</html>