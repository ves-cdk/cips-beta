﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="cips_beta.Index" %>

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
				<img class="logo" src="img/logo.png" title="Cannabis Identification and Prioritization System">
				<!--<a class="navbar-brand" id="appTitle" href="javascript:void(0);"></a>-->
			</div>
			<div class="navbar-header">
				<button title="Show/hide the top menu" type="button" class="navbar-toggle" data-toggle="collapse" data-target="#headerTabs">
					<i class="fa fa-bars"></i>
				</button>
			</div>
			<ul class="collapse navbar-collapse nav navbar-nav navbar-right" id="headerTabs">
				<li id="openEditor">
					<a id="open-editor" class="action" href="editor.aspx" style="display: none;"><i class="fa fa-pencil-square-o fa-lg" title="Launch CIPS Editor"></i></a>
				</li>
				<li id="openModeler">
					<a id="open-modeler" class="action" href="modeler.aspx" style="display: none;"><i class="fa fa-cogs fa-lg" title="Launch CIPS Modeler"></i></a>
				</li>
				<li id="aboutCips">
					<a id="about-cips" class="action" style="display: none;"><i class="fa fa-info-circle fa-lg" title="About CIPS"></i></a>
				</li>
				<li id="personalizedPanel">
					<a id="sign-out" class="action" style="display: none;" href="Logout.aspx"><i class="fa fa-sign-out fa-lg" title="Sign Out"></i></a>
				</li>
			</ul>
			<div class="navbar-header pull-right">
				<img class="logo-right visible-lg visible-md visible-sm" src="img/logo-right.png">
			</div>
		</div>
		
		<!-- sign-in prompt -->
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

		<!-- page content -->
		<div id="appContent" class="sectionContent">

			<!-- Summary section, a bootstrap carousel -->
			<div class="container-fluid">
				<div class="row">
					<div id="summary-container" class="col-lg-12 box-header-area">
						<div class="box">
							<div class="box-header">
								<div class="box-header-text">
									<i class="fa fa-dashboard"></i> Summary
								</div>
								<div class="box-icon">
									<a href="#" id="boxToggle" onclick="app.toggleBox('box-content', this)" class="btn-minimize" title="Show/hide Summary Dashboard"><i class="fa fa-chevron-up"></i></a>
								</div>
							</div>
							<div id="box-content" style="display: block;" class="box-content">

								<div id="statsCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
									<!-- Carousel Indicators -->
									<ol class="carousel-indicators">
										<li data-target="#statsCarousel" data-slide-to="0" class="active"></li>
										<li data-target="#statsCarousel" data-slide-to="1"></li>
										<li data-target="#statsCarousel" data-slide-to="2"></li>
										<li data-target="#statsCarousel" data-slide-to="3"></li>
									</ol>

									<!-- Carousel Wrapper for slides -->
									<div class="carousel-inner" role="listbox">
										<!-- Slide 1 -->
										<div id="slide1" class="item active">
											<div class="row">
												<div class="col-lg-12">
													<div class="carousel-title">
														Statewide Summary
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-6">
													<div class="info-graph info-graph-1">
														<div class="info-graph-title info-graph-title-1">
															Quick Stats
														</div>
														<div class="info-graph-content-1">
															<div class="row">
																<div class="col-md-6">
																	Evaluated Area:<br/>
																	<span class="badge-sum badge-1" id="quickStatInterpArea">&nbsp;</span>Interpretation Areas
																	<br/>
																	<span class="badge-sum badge-2" id="quickStatWatersheds">&nbsp;</span>HUC 12 Watersheds
																	<br/>
																	<span class="badge-sum badge-3" id="quickStatTotalAcreage">&nbsp;</span>Total Acreage
																	<br/>
																</div>
																<div class="col-md-6">
																	Grow Summmary:<br/>
																	<span class="badge-sum badge-4" id="quickStatGrows">&nbsp;</span>Number of Grows Identified
																	<br/>
																	<span class="badge-sum badge-4" id="quickStatGrowSiteParcels" title="Grow Site Parcels represent one or more parcel boundaries that contain Grows. NOTE: the parcels data on-hand currently does not include all Counties, thus the total represented here is not comprehensive for all Grows.">&nbsp;</span>Grow Site Parcels
																	<br/>
																	<span class="badge-sum badge-3" id="quickStatGrowAcreage">&nbsp;</span>Total Grow Acreage
																	<br/>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="col-sm-3">
													<div class="info-graph info-graph-2">
														<div class="info-graph-title info-graph-title-2">
															# of Grows by Type
														</div>
														<div class="info-graph-content">
															<div id="titleChart1S"></div>
															<canvas id="chart1S"></canvas>
														</div>

													</div>
												</div>
												<div class="col-sm-3">
													<div class="info-graph info-graph-4">
														<div class="info-graph-title info-graph-title-4">
															Prioritization Modeling
														</div>
														<div class="info-graph-content text-center">
															<div id="titleChart2S"></div>

															<canvas id="chart2S"></canvas>
														</div>
													</div>
												</div>

											</div>
										</div>
										<!-- Slide 2 -->

										<div id="slide2" class="item">
											<div class="row">
												<div class="col-lg-12">
													<div class="carousel-title" id="sumTitleR1">
														Region Summary
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-6">
													<div class="info-graph info-graph-1">
														<div class="info-graph-title info-graph-title-1">
															Quick Stats
														</div>
														<div class="info-graph-content-1">
															<div class="row">
																<div class="col-md-6">
																	Evaluated Area:<br/>
																	<span class="badge-sum badge-1" id="quickStatInterpAreaR1">&nbsp;</span>Interpretation Areas
																	<br/>
																	<span class="badge-sum badge-2" id="quickStatWatershedsR1">&nbsp;</span>HUC 12 Watersheds
																	<br/>
																	<span class="badge-sum badge-3" id="quickStatTotalAcreageR1">&nbsp;</span>Total Acreage
																	<br/>
																</div>
																<div class="col-md-6">
																	Grow Summmary:<br/>
																	<span class="badge-sum badge-4" id="quickStatGrowsR1">&nbsp;</span>Number of Grows Identified
																	<br/>
																	<span class="badge-sum badge-4" id="quickStatGrowSiteParcelsR1" title="Grow Site Parcels represent one or more parcel boundaries that contain Grows. NOTE: the parcels data on-hand currently does not include all Counties, thus the total represented here is not comprehensive for all Grows.">&nbsp;</span>Grow Site Parcels
																	<br/>
																	<span class="badge-sum badge-3" id="quickStatGrowAcreageR1">&nbsp;</span>Total Grow Acreage
																	<br/>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="col-sm-3">
													<div class="info-graph info-graph-2">
														<div class="info-graph-title info-graph-title-2">
															# of Grows by Type
														</div>
														<div class="info-graph-content">
															<div id="titleChart1R1"></div>
															<canvas id="chart1R1"></canvas>
														</div>

													</div>
												</div>
												<div class="col-sm-3">
													<div class="info-graph info-graph-4">
														<div class="info-graph-title info-graph-title-4">
															Prioritization Modeling
														</div>
														<div class="info-graph-content text-center">
															<div id="titleChart2R1"></div>
															<canvas id="chart2R1"></canvas>
														</div>
													</div>
												</div>

											</div>
										</div>

										<div id="slide3" class="item">
											<div class="row">
												<div class="col-lg-12">
													<div class="carousel-title" id="sumTitleR5">
														Region Summary
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-6">
													<div class="info-graph info-graph-1">
														<div class="info-graph-title info-graph-title-1">
															Quick Stats
														</div>
														<div class="info-graph-content-1">
															<div class="row">
																<div class="col-md-6">
																	Evaluated Area:<br/>
																	<span class="badge-sum badge-1" id="quickStatInterpAreaR5">&nbsp;</span>Interpretation Areas
																	<br/>
																	<span class="badge-sum badge-2" id="quickStatWatershedsR5">&nbsp;</span>HUC 12 Watersheds
																	<br/>
																	<span class="badge-sum badge-3" id="quickStatTotalAcreageR5">&nbsp;</span>Total Acreage
																	<br/>																	
																</div>
																<div class="col-md-6">
																	Grow Summmary:<br/>
																	<span class="badge-sum badge-4" id="quickStatGrowsR5">&nbsp;</span>Number of Grows Identified
																	<br/>
																	<span class="badge-sum badge-4" id="quickStatGrowSiteParcelsR5" title="Grow Site Parcels represent one or more parcel boundaries that contain Grows. NOTE: the parcels data on-hand currently does not include all Counties, thus the total represented here is not comprehensive for all Grows.">&nbsp;</span>Grow Site Parcels
																	<br/>
																	<span class="badge-sum badge-3" id="quickStatGrowAcreageR5">&nbsp;</span>Total Grow Acreage
																	<br/>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="col-sm-3">
													<div class="info-graph info-graph-2">
														<div class="info-graph-title info-graph-title-2">
															# of Grows by Type
														</div>
														<div class="info-graph-content">
															<div id="titleChart1R5"></div>
															<canvas id="chart1R5"></canvas>
														</div>

													</div>
												</div>
												<div class="col-sm-3">
													<div class="info-graph info-graph-4">
														<div class="info-graph-title info-graph-title-4">
															Prioritization Modeling
														</div>
														<div class="info-graph-content text-center">
															<div id="titleChart2R5"></div>
															<canvas id="chart2R5"></canvas>
														</div>
													</div>
												</div>

											</div>
										</div>

										<div id="slide4" class="item">
											<div class="row">
												<div class="col-lg-12">
													<div class="carousel-title" id="sumTitleWater">
														Water Use Estimates
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-7">
													<div class="info-graph info-graph-2">
														<div class="info-graph-title info-graph-title-2">
															Statewide Summary
														</div>
														<div class="info-graph-content-1">
															<div class="row">
																<div class="col-md-12 text-left" style="padding: 5px 0 10px 34px;">
																	<span><b>Seasonal Water Use (Based on 185-day, 2014 Season)</b></span></br>
																	Total Water Use: <span class="badge-sum badge-2" id="quickStatWaterAcFt">&nbsp;</span>Acre Feet, <span class="badge-sum badge-2" id="quickStatWaterGal">&nbsp;</span>Gallons
																	<br/>
																	<b>Prioritization Modeling - Peak Daily Water Useage</b>
																	<br/>
																	<a href="#" title="Less than 600 gallons per day">Risk Level 1 Grows: </a><span class="badge-sum badge-3" id="quickStatWaterTotScore1">&nbsp;</span>Total Grows, <span class="badge-sum badge-3" id="quickStatWaterNumScore1">&nbsp;</span>Acre Feet
																	<br/>
																	<a href="#" title="> 600 and < 4500 gallons per day">Risk Level 2 Grows: </a><span class="badge-sum badge-3" id="quickStatWaterTotScore2">&nbsp;</span>Total Grows, <span class="badge-sum badge-3" id="quickStatWaterNumScore2">&nbsp;</span>Acre Feet
																	<br/>
																	<a href="#" title="> 4500 gallons per day">Risk Level 3 Grows: </a><span class="badge-sum badge-3" id="quickStatWaterTotScore3">&nbsp;</span>Total Grows, <span class="badge-sum badge-3" id="quickStatWaterNumScore3">&nbsp;</span>Acre Feet
																	<br/>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="col-sm-5">
													<div class="info-graph info-graph-4" >
														<div class="info-graph-title info-graph-title-4">
															Number of Grows by Risk Level
														</div>
														<div class="info-graph-content">
															<div id="titleGraph1"></div>
															<canvas id="bar1" style="max-height: 215px;"></canvas>
														</div>
													</div>
												</div>
											</div>
										</div>

										<!-- Carousel Controls -->
										<a class="left carousel-control" href="#statsCarousel" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a>
										<a class="right carousel-control" href="#statsCarousel" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>

			</div>

			<!-- Map Section -->
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
									<li>
										<a href="#menu7" class="tabItems" role="tab" data-toggle="tab" id="menuPrModel" onclick="app.menuChange(this);"><i class="fa fa-sort-amount-asc fa-lg">&nbsp;</i>View Prioritization Model</a>
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
										<option>Bear Creek</option>
										<option>Cottonwood Creek</option>
										<option>Deer Creek</option>
										<option>Feather River</option>
										<option>Navarro River</option>
										<option>Redwood Creek</option>
										<option>Robinson Creek</option>
										<option>South Fork Trinity River</option>
										<option>Region 1 South of Ferndale</option>
										<option>Willow Creek</option>
									</select>
									
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

										<input type="checkbox" id="soilLayerOnOff"> USA Soil Mapunits 2014<br>
										<input type="checkbox" id="geoLayerOnOff"> USA Geology Units<br>

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
									<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="menu4panel1">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion4" href="#menu4collapse1" aria-expanded="false" aria-controls="collapseOne"> Watershed Stats</a></h4>
										</div>
										<div id="menu4collapse1" class="panel-collapse collapse" role="tabpanel" aria-labelledby="menu4panel1">
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
									</div>
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
										<div class="panel-heading" role="tab" id="menu4panel2">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion5" href="#menu5collapse2" aria-expanded="false" aria-controls="collapseTwo"> Print</a></h4>
										</div>
										<div id="menu5collapse2" class="panel-collapse collapse" role="tabpanel" aria-labelledby="menu5panel2">
											<div class="panel-body">
Click the button below to begin the printing process. When complete, the printout will automatically load in a new window — or the Print button will turn into a "Printout" link. Click the link to launch the printed PDF in a new window.
												<div id="printButton"></div>
											</div>
										</div>
									</div>
									<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="menu4panel3">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion5" href="#menu5collapse3" aria-expanded="false" aria-controls="collapseTwo"> Time Slider</a></h4>
										</div>
										<div id="menu5collapse3" class="panel-collapse collapse" role="tabpanel" aria-labelledby="menu5panel3">
											<div class="panel-body">
												<button id="enable-time" onclick="app.buildTimeSlider();" class="btn btn-block" title="Enable the Time Slider, allowing you to view time-enabled layers by year.">
													Enable Time Slider
												</button><br/>
												<button id="disable-time" onclick="app.removeTimeSlider();" class="btn btn-block" title="Enable the Time Slider, allowing you to view time-enabled layers by year." style="display:none;" >
													Disable Time Slider
												</button><br/>
												When enabled, the Time Slider will display at the bottom of the map.<br/><br/>
												The following layers are time-enabled:<br/>
												- Timber Harvest Plans<br/>
												- Nonindustrial Timber Management Plans
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- Load Prioritization Model -->
							<div id="menu7" class="tab-pane ribbon-bar-tab">
								<div class="panel-group" id="accordion7" role="tablist" aria-multiselectable="true">
									<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="menu7panel1">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" href="#menu7collapse1" aria-expanded="false" aria-controls="collapse7One"> Load Prioritization Model:</a></h4>
										</div>
										<div id="menu7collapse1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="menu7panel1">
											<div class="panel-body" id="">
												<!--<p class="bg-info" id="loadModelTitle">Select a Model:</p>-->
												<div class="radio" id="editRadios10">
													<label>
														<input type="radio" name="optionsRadios10" id="optionsRadios10" value="option1" onclick="app.initLoadModel(this)"> Select by Clicking on Prioritization Model</label>
												</div>
												<div class="radio" id="editRadios11">
													<label>
														<input type="radio" name="optionsRadios11" id="optionsRadios11" value="option2" onclick="app.initLoadModel(this)"> Select from List</label>
												</div>
												<div id="loadModelFromList" style="display:none;">
													Region<br/>
										      		<select class="form-control" id="selectLoadPrRegion" onchange="app.initLoadModelList()">
										      			<option></option>
													</select><br/>
													Prioritization Area<br/>
										      		<select class="form-control" id="selectLoadPrModel" disabled onchange="app.loadModel($('#selectLoadPrModel').val(), $('#selectLoadPrModel option:selected').text())">
										      			<option></option>
													</select>	
												</div>	
												<div id="loadModelStatus"></div>										
											</div>
										</div>
									</div>
									<div class="panel panel-default" id="modelResults" style="display:none;">
										<div class="panel-heading" role="tab" id="menu7panel4">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" href="#menu7collapse4" aria-expanded="false" aria-controls="collapse7Four"> Prioritization Model Information</a></h4>
										</div>
										<div id="menu7collapse4" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="menu7panel4">
											<div class="panel-body">
												<div id="modelResultsSummary">Summary</div>
												<div id="modelResultsDisplay">
													Display Grows by:<br/>
										      		<select class="form-control" id="modelDisplayBy" onchange="app.updateRenderer()">
										      			<option></option>
													</select>
												</div><br/>
												<label class="checkbox-inline">
													<input id="heatmap-toggle" checked type="checkbox" data-toggle="toggle" data-size="small">
													Show/Hide Model Heat Map
												</label><br/>
												<!--<label class="checkbox-inline">
													<input id="factor-toggle" disabled type="checkbox" data-toggle="toggle" data-size="small">
													Show/Hide Displayed Source Layer
												</label><br/>-->
												
												<div id="modelResultsSumTotals">Totals</div>
												<div id="modelResultsIndividual"></div>
											</div>
										</div>
									</div>
									<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="menu7panel2">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" href="#menu7collapse2" aria-expanded="false" aria-controls="collapse7Two"> Instructions</a></h4>
										</div>
										<div id="menu7collapse2" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="menu7panel2">
											<div class="panel-body">
												<div id="modelInstructions">Select an option.</div>
											</div>
										</div>
									</div>
									<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="menu7panel3">
											<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" href="#menu7collapse3" aria-expanded="false" aria-controls="collapse7Three"> Reset</a></h4>
										</div>
										<div id="menu7collapse3" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="menu7panel3">
											<div class="panel-body">
												<div id="loadResetMenu">
													<button id="loadResetBtn" onclick="app.resetLoadModel();" class="btn btn-block">Reset</button>
												</div>
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
						<img id="mapLoading" src="img/loading.gif" class="loadingImg" />
						<div id="timeInfo" class="time-slider" style="display: none;">
				          	<div id="timeSliderDiv"></div>
				        </div>

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
		
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modalTable" data-backdrop="static">
			<div class="modal-dialog modal-xl">
				<div class="modal-content">
					<div class="modal-header">
			        	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        	<h4 class="modal-title">Table View</h4>
			      	</div>
			      	<div class="modal-body" style="height: 600px;">
			      		<button title="Create comma separated content (CSV) that can be pasted into Excel" type="button" onclick="app.exportTable();">
							Export
						</button>
			      		<div id="tblGrid" data-dojo-type="dijit/layout/ContentPane" style="height:90%">
				        	<div id="myTableNode"></div>
				    	</div>
			      	</div>
			    </div>
			 </div>
		</div>

		<!-- JS libraries, placed at the end of the document so the pages load faster -->
		<script src="js/lib/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="js/lib/moment.js"></script>
		<script type="text/javascript" src="js/lib/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/lib/jquery.blockUI.js"></script>
		<script type="text/javascript">
		    $.blockUI({
		        message: "Welcome to CIPS.<br/><br/>Please wait while the page loads.",
		    });
		</script>
		<script type="text/javascript" src="js/lib/bootbox.min.js"></script>
		<script type="text/javascript" src="js/lib/Chart.min.js"></script>
		<script type="text/javascript" src="js/lib/bootstrap-toggle.min.js"></script>
		
		<script type="text/javascript" src="http://js.arcgis.com/3.15compact"></script>
		<script type="text/javascript" src="js/cips-dashboard-webmap.js"></script>
		<script type="text/javascript" src="js/cips-dashboard-config.js"></script>
		<script type="text/javascript" src="js/cips-dashboard.js"></script>
	</body>
</html>