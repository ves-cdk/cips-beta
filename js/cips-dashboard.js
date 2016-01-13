// -- Section 1: Global Variables ----------------------------------------------------
var map, mapDeferred, mapResponse, mapNav, toc, loading; // core map objects
var layers, clickHandler, clickListener, lyrInfoTemplate = []; // used for popups
var clusterLayer, clusterLayerClickHandler; // used for clustered grow location display
var basemapGallery, measurement, tb, epWidget, lineSymbol, timeSlider; // map widgets
var showInfoWindow = "default"; // used to control map behavior based upon selected tool
var cred = "esri_jsapi_id_manager_data"; // cookie/localStorage variable for ArcGIS for Server authentication
var popupInfo, featureInfoTemplate, prModelPoly, prModelPoint, renderer, pointFtrLayer, layerFromQuery; // for dynamic layer load and rendering
var statsLoaded = [null,true,false,false,false,false,false,false,false,false,false]; // this is used to initialize stats carousels
var sumDataRegion, sumDataInterp; // used for query results for summary statistics 
var sumRegion = {}, sumInterp = {}; // region and interpretation objects storing summary stats
var featureCollection, popupInfo, featureInfoTemplate, addLayers = [], renderer, pointFtrLayer, layerFromQuery; // for dynamic layer load and rendering
var wshdLyrIndex, interpLyrIndex, interpWshdLyrIndex, regionLyrIndex, growLyrIndex, growLocLyrIndex, heatmapLyrIndex, growSiteLyrIndex, growSiteParcLyrIndex; // used for getting onClick results from specific layers
var editRadios = ["optionsRadios10", "optionsRadios11"];
var myFeatureLayer;
var loadedModelResults; // records for a loaded model, used for summary display
var modelHeatMapLayer, imageServiceLayer; // image layer for prioritization model heat map
var testvar; //generic variable for testing

// -- Section 2: Requires -------------------------------------------------------------
require([
    "esri/arcgis/utils", 
    "esri/config",
    "esri/dijit/BasemapGallery",
    "esri/dijit/Basemap", 
    "esri/dijit/BasemapLayer", 
    "esri/Color", 
    "esri/symbols/Font", 
    "esri/InfoTemplate", 
    "esri/urlUtils", 
    "esri/graphic", 
    "esri/graphicsUtils", 
    "esri/symbols/SimpleMarkerSymbol", 
    "esri/symbols/PictureMarkerSymbol", 
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/CartographicLineSymbol",
    "esri/geometry/webMercatorUtils",
    "esri/geometry/Extent",
    "esri/geometry/Point", 
    "esri/renderers/ClassBreaksRenderer",
    "esri/renderers/UniqueValueRenderer",
    "esri/renderers/SimpleRenderer",
    "esri/renderers/smartMapping",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "esri/tasks/RelationshipQuery",
    "esri/tasks/locator",
    "esri/tasks/GeometryService",
    "esri/tasks/Geoprocessor",
    "esri/dijit/Print",
    "esri/dijit/Measurement",
    "esri/units",
    "esri/toolbars/draw",
    "esri/dijit/ElevationProfile",
    "esri/toolbars/navigation", 
    "esri/dijit/Search", 
    "esri/layers/FeatureLayer",
    "esri/dijit/PopupTemplate",
    "esri/request",
    "esri/arcgis/Portal", 
    "esri/arcgis/OAuthInfo", 
    "esri/IdentityManager",
    "esri/TimeExtent",
    "esri/dijit/TimeSlider",
    "esri/dijit/FeatureTable",
    "esri/layers/ArcGISImageServiceLayer", 
    "esri/layers/ImageServiceParameters",
    //"./js/ClusterLayer.js",
    //"./js/clusterfeaturelayer.js",
    "./js/lib/ClusterFeatureLayer.js",
    "./js/lib/bootstrapmap.js",
    "dojo/dom", "dojo/on", "dojo/_base/array", "dojo/_base/lang", "dijit/registry", "dojo/dom-construct", "./js/agsjs/dijit/TOC.js", "dojo/domReady!"], 

function(

    arcgisUtils,
    esriConfig,
    BasemapGallery, 
    Basemap, 
    BasemapLayer, 
    Color, 
    Font, 
    InfoTemplate, 
    urlUtils, 
    Graphic,
   	graphicsUtils,
    SimpleMarkerSymbol, 
    PictureMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
    CartographicLineSymbol,
	webMercatorUtils, 
	Extent,  
	Point,
    ClassBreaksRenderer, 
    UniqueValueRenderer,
    SimpleRenderer, 
    smartMapping,
    Query, 
    QueryTask, 
    RelationshipQuery, 
    Locator, 
    GeometryService, 
    Geoprocessor, 
    Print, 
    Measurement,
    Units,
    Draw,
    ElevationsProfileWidget,
    Navigation, 
    Search, 
    FeatureLayer,
    PopupTemplate,
    esriRequest,
    arcgisPortal, 
    OAuthInfo, 
    esriId, 
    TimeExtent,
    TimeSlider,
    FeatureTable,
    ArcGISImageServiceLayer, 
    ImageServiceParameters,
    //ClusterLayer,
    ClusterFeatureLayer,
    BootstrapMap,
    dom, on, arrayUtil, lang, registry, domConstruct, TOC) {

    // -- Section 3: On-Load Settings -------------------------------------------------------------
        
    //var basemapGallery;
    
    document.title = appConfig.APP_NAME_HTML_TITLE;
    
    var app = dojo.getObject('app', true); // Global object to allow function calls from the app. Most functions are constructed with this (ex: app.buildMap = function() {};
    
    // Proxy settings
    esriConfig.defaults.geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    esriConfig.defaults.io.alwaysUseProxy = false;
    esriConfig.defaults.io.corsEnabledServers.push("tasks.arcgisonline.com");
    esriConfig.defaults.io.corsEnabledServers.push("mapserver2.vestra.com");
    esriConfig.defaults.io.corsEnabledServers.push("mapserver.vestra.com");    
    esriConfig.defaults.io.corsEnabledServers.push("map.dfg.ca.gov");
    esriConfig.defaults.io.corsEnabledServers.push("utility.arcgisonline.com");
    //esriConfig.defaults.io.corsEnabledServers.push("sampleserver6.arcgisonline.com");
    esriConfig.defaults.io.corsEnabledServers.push("localhost");  
    esriConfig.defaults.io.timeout = 120000;   
    //esriConfig.defaults.io.proxyUrl = appConfig.PROXY_PAGE;
    
    urlUtils.addProxyRule({
	  urlPrefix: "tasks.arcgisonline.com",
	  proxyUrl: appConfig.PROXY_PAGE
	});
	urlUtils.addProxyRule({
	  urlPrefix: "sampleserver6.arcgisonline.com",
	  proxyUrl: appConfig.PROXY_PAGE
	});
	urlUtils.addProxyRule({
	  urlPrefix: "utility.arcgisonline.com",
	  proxyUrl: appConfig.PROXY_PAGE
	});

	// Carousel settings - for charts to work, they have to be initialized after the slide is loaded.
	//$('.carousel').carousel({  interval: false }); // prevent auto-cycle of carousel
	$('#statsCarousel').on('slid.bs.carousel', function (e) {
	    // when a new slide is loaded:
		switch(e.relatedTarget.id) {
			case "slide2":
				if (!(statsLoaded[2])) {
					app.initStatsReg(1);
					statsLoaded[2] = true;
				}
			break;
			case "slide3":
				if (!(statsLoaded[3])) {
					app.initStatsReg(5);
					statsLoaded[3] = true;
				}
			break;
			case "slide4":
				if (!(statsLoaded[4])) {
					app.initStatsWater();
					statsLoaded[4] = true;
				}
			break;
		}
	});

    // for the map toolbar menu items
    var showing = false;
	$(document).on("click", ".tabItems", function(e) {
		var elementToShow = $(this).attr("href");		
		if (!showing) {
				showing = true;
				$(elementToShow).addClass("slide-out");
		} else {
				if (!$(elementToShow).hasClass("showing")) {
						$(elementToShow).addClass("showing");
				}
				if ($(elementToShow).hasClass("slide-out")) {
						$(elementToShow).removeClass("slide-out");
				}
		}
		$(elementToShow).addClass("active");
		var toggleButtonHeight = ($('#ribbon-bar-header').height()) + ($('#ribbonTabs').height()) + ($('#topTabs').height()) + 10;
		$("#ribbon-bar-toggle").show();
	});
    
    // -- Section 4: Summary Charts/Stats -------------------------------------------------------------
        
    app.numberWithCommas = function (x) {
        // converts number to a string with comma separators (used for summary section)
        x = x.toFixed(0);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
        
    app.initStats = function () {
        // create results for first carousel content (Statewide summary)
        // charting uses the open source Chart.js library: http://www.chartjs.org/
        
        // Get chart input data from the Region and Interpretation Summary tables
        var queryParams = "DateClosed is null";
        
        var totalInterpAreas = 0, totalInterpWatersheds = 0, totalInterpAcreage = 0;
        //var regInterpAreas = "", regInterpWatersheds = "", regInterpAcreage = "";
        var totalNumGrows = 0, totalGrowAcreage = 0, totalGrowOutdoor = 0, totalGrowGreenhouse = 0;
        var totalWaterUse = 0, totalLevel1 = 0, totalLevel2 = 0, totalLevel3 = 0, totalGrowSiteParcels = 0, totalGrowSites = 0, totalGrowPotential = 0;
        
        $.when(app.runQuery(appConfig.URL_SUMMARY_REGION, queryParams, false, function(qryResultsRegion) {
            sumDataRegion = qryResultsRegion;
            // put the attribute: value pairs for each region into an object
            $.each(qryResultsRegion.features, function(i) {
                var regionId = qryResultsRegion.features[i].attributes.SWRCBRegID;
                sumRegion[regionId] = qryResultsRegion.features[i].attributes;
            });
            $.when(app.runQuery(appConfig.URL_SUMMARY_INTERP_AREA, queryParams, false, function(qryResultsInterp) {
                sumDataInterp = qryResultsInterp;
                // put the attribute: value pairs for each interpretation area into an object
                $.each(qryResultsInterp.features, function(i) {
                    var interpId = qryResultsInterp.features[i].attributes.InterpAreaKey;
                    sumInterp[interpId] = qryResultsInterp.features[i].attributes;
                });
                // loop through the value pairs for each region and get totals
                $.each(sumRegion, function(i) {
                    totalInterpAreas += sumRegion[i].NumInterpAreas;
                    totalInterpWatersheds += sumRegion[i].NumHuc12InInterpAreas;
                    totalInterpAcreage += sumRegion[i].TotalAcreageInterpAreas;
                    totalNumGrows += sumRegion[i].NumGrows;
                    totalGrowAcreage += sumRegion[i].TotalAcreageGrows;
                    totalGrowOutdoor += sumRegion[i].NumOutdoorGrows;
                    totalGrowGreenhouse += sumRegion[i].NumGreenHouseGrows;
                    totalWaterUse += sumRegion[i].AnnualWaterUse_acft;
                    totalLevel1 += sumRegion[i].NumCultAreaScore1Grows;
                    totalLevel2 += sumRegion[i].NumCultAreaScore2Grows;
                    totalLevel3 += sumRegion[i].NumCultAreaScore3Grows;
                    totalGrowSiteParcels += sumRegion[i].NumGrowSiteParcels;
                    totalGrowSites += sumRegion[i].NumGrowSites;
                });
                
                totalGrowPotential = totalNumGrows - totalGrowOutdoor - totalGrowGreenhouse;
                // set the values on the page
                dojo.byId('quickStatInterpArea').innerHTML = totalInterpAreas;
                dojo.byId('quickStatWatersheds').innerHTML = app.numberWithCommas(totalInterpWatersheds);
                dojo.byId('quickStatTotalAcreage').innerHTML = app.numberWithCommas(totalInterpAcreage);
                dojo.byId('quickStatGrows').innerHTML = app.numberWithCommas(totalNumGrows);
                dojo.byId('quickStatGrowAcreage').innerHTML = app.numberWithCommas(totalGrowAcreage);
                dojo.byId('quickStatGrowSiteParcels').innerHTML = app.numberWithCommas(totalGrowSiteParcels);
                //dojo.byId('quickStatGrowSites').innerHTML = app.numberWithCommas(totalGrowAcreage);
                
                // build pie chart1
                var chart1Data = [
                    {
                        value: totalGrowGreenhouse,
                        color:"#58eb7b",
                        highlight: "#aafbbd",
                        label: "Greenhouse"
                    },
                    {
                        value: totalGrowOutdoor,
                        color: "#e1b474",
                        highlight: "#f8c884",
                        label: "Outdoor"
                    },
                    {
                        value: totalGrowPotential,
                        color: "#727272",
                        highlight: "#949494",
                        label: "Potential"
                    }
                ];
                dojo.byId('titleChart1S').innerHTML = "Outdoor vs Greenhouse";
                var chart1 = document.getElementById("chart1S").getContext("2d");
                window.myDoughnut = new Chart(chart1).Doughnut(chart1Data, {
                   responsive : false,
                   animation: false
                });
                
                // build pie chart2
                var chart2Data = [
                    {
                        value: totalLevel1,
                        color:"#fee6ce",
                        highlight: "#fdd0a2",
                        label: "Level 1"
                    },
                    {
                        value: totalLevel2,
                        color: "#fdae6b",
                        highlight: "#fd8d3c",
                        label: "Level 2"
                    },
                    {
                        value: totalLevel3,
                        color: "#f16913",
                        highlight: "#d94801",
                        label: "Level 3"
                    }
                ];
                dojo.byId('titleChart2S').innerHTML = "Cultivated Area";
                var chart2 = document.getElementById("chart2S").getContext("2d");
                window.myDoughnut = new Chart(chart2).Doughnut(chart2Data, {
                    responsive : false,
                    animation: false
                });
                }));
            }));
        };
        
        app.initStatsReg = function(regNum) {
            // create results for Region-specific charts
            var totalInterpAreas = 0, totalInterpWatersheds = 0, totalInterpAcreage = 0;
            var totalNumGrows = 0, totalGrowAcreage = 0, totalGrowOutdoor = 0, totalGrowGreenhouse = 0;
            var totalWaterUse = 0, totalLevel1 = 0, totalLevel2 = 0, totalLevel3 = 0, totalGrowPotential = 0, totalGrowSiteParcels = 0, totalGrowSites = 0;
            
            totalInterpAreas = sumRegion[regNum].NumInterpAreas;
            totalInterpWatersheds = sumRegion[regNum].NumHuc12InInterpAreas;
            totalInterpAcreage = sumRegion[regNum].TotalAcreageInterpAreas;
            totalNumGrows = sumRegion[regNum].NumGrows;
            totalGrowAcreage = sumRegion[regNum].TotalAcreageGrows;
            totalGrowOutdoor = sumRegion[regNum].NumOutdoorGrows;
            totalGrowGreenhouse = sumRegion[regNum].NumGreenHouseGrows;
            totalWaterUse = sumRegion[regNum].AnnualWaterUse_acft;
            totalLevel1 = sumRegion[regNum].NumCultAreaScore1Grows;
            totalLevel2 = sumRegion[regNum].NumCultAreaScore2Grows;
            totalLevel3 = sumRegion[regNum].NumCultAreaScore3Grows;
            totalGrowSiteParcels += sumRegion[regNum].NumGrowSiteParcels;
            totalGrowSites += sumRegion[regNum].NumGrowSites;
            
            totalGrowPotential = totalNumGrows - totalGrowOutdoor - totalGrowGreenhouse;
            
            // set the values on the page
            dojo.byId("sumTitleR" + regNum).innerHTML = "Region <b>" + regNum + "</b> Summary";
            dojo.byId("quickStatInterpAreaR" + regNum).innerHTML = totalInterpAreas;
            dojo.byId("quickStatWatershedsR" + regNum).innerHTML = app.numberWithCommas(totalInterpWatersheds);
            dojo.byId("quickStatTotalAcreageR" + regNum).innerHTML = app.numberWithCommas(totalInterpAcreage);
            dojo.byId("quickStatGrowsR" + regNum).innerHTML = app.numberWithCommas(totalNumGrows);
            dojo.byId("quickStatGrowAcreageR" + regNum).innerHTML = app.numberWithCommas(totalGrowAcreage);
            dojo.byId('quickStatGrowAcreageR' + regNum).innerHTML = app.numberWithCommas(totalGrowAcreage);
            dojo.byId('quickStatGrowSiteParcelsR' + regNum).innerHTML = app.numberWithCommas(totalGrowSiteParcels);
        
            // build pie chart1
            var chart1Data = [{
                value : totalGrowGreenhouse,
                color : "#58eb7b",
                highlight : "#aafbbd",
                label : "Greenhouse"
            }, {
                value : totalGrowOutdoor,
                color : "#e1b474",
                highlight : "#f8c884",
                label : "Outdoor"
            },
            {
                value: totalGrowPotential,
                color: "#727272",
                highlight: "#949494",
                label: "Potential"
            }];
            dojo.byId("titleChart1R" + regNum).innerHTML = "Outdoor vs Greenhouse";
            var chart1 = document.getElementById("chart1R" + regNum).getContext("2d");
            window.myDoughnut = new Chart(chart1).Doughnut(chart1Data, {
                responsive : false
            });
        
            // build pie chart2
            var chart2Data = [{
                value : totalLevel1,
                color : "#fee6ce",
                highlight : "#fdd0a2",
                label : "Level 1"
            }, {
                value : totalLevel2,
                color : "#fdae6b",
                highlight : "#fd8d3c",
                label : "Level 2"
            }, {
                value : totalLevel3,
                color : "#f16913",
                highlight : "#d94801",
                label : "Level 3"
            }];
            dojo.byId("titleChart2R" + regNum).innerHTML = "Cultivated Area";
            var chart2 = document.getElementById("chart2R" + regNum).getContext("2d");
            window.myDoughnut = new Chart(chart2).Doughnut(chart2Data, {
                responsive : false
            });
        };
        
        app.initStatsWater = function() {
        // Generate water usage estimates
        
            var totalWaterUse = 0, totalWaterUseScore1Grows = 0, totalWaterUseScore2Grows = 0, totalWaterUseScore3Grows = 0;
            var numWaterUseScore1Grows = 0, numWaterUseScore2Grows = 0, numWaterUseScore3Grows = 0;
        
            $.each(sumRegion, function(i) {
               totalWaterUse += sumRegion[i].AnnualWaterUse_acft;
               totalWaterUseScore1Grows += sumRegion[i].NumWaterUseScore1Grows;
               totalWaterUseScore2Grows += sumRegion[i].NumWaterUseScore2Grows;
               totalWaterUseScore3Grows += sumRegion[i].NumWaterUseScore3Grows;
               numWaterUseScore1Grows += sumRegion[i].PeakMoWaterUseScore1Grows;
               numWaterUseScore2Grows += sumRegion[i].PeakMoWaterUseScore2Grows;
               numWaterUseScore3Grows += sumRegion[i].PeakMoWaterUseScore3Grows;
            });
        
            var totalWaterUseGal = totalWaterUse * 325851;
        
            // set the values on the page
            dojo.byId('quickStatWaterAcFt').innerHTML = app.numberWithCommas(totalWaterUse);
            dojo.byId('quickStatWaterGal').innerHTML = app.numberWithCommas(totalWaterUseGal);
            dojo.byId('quickStatWaterNumScore1').innerHTML = app.numberWithCommas(numWaterUseScore1Grows);
            dojo.byId('quickStatWaterTotScore1').innerHTML = app.numberWithCommas(totalWaterUseScore1Grows);
            dojo.byId('quickStatWaterNumScore2').innerHTML = app.numberWithCommas(numWaterUseScore2Grows);
            dojo.byId('quickStatWaterTotScore2').innerHTML = app.numberWithCommas(totalWaterUseScore2Grows);
            dojo.byId('quickStatWaterNumScore3').innerHTML = app.numberWithCommas(numWaterUseScore3Grows);
            dojo.byId('quickStatWaterTotScore3').innerHTML = app.numberWithCommas(totalWaterUseScore3Grows);
            
            var valR1S1 = sumRegion[1].NumWaterUseScore1Grows;
            var valR1S2 = sumRegion[1].NumWaterUseScore2Grows;
            var valR1S3 = sumRegion[1].NumWaterUseScore3Grows;
            var valR5S1 = sumRegion[5].NumWaterUseScore1Grows;
            var valR5S2 = sumRegion[5].NumWaterUseScore2Grows;
            var valR5S3 = sumRegion[5].NumWaterUseScore3Grows;
            
            console.log(valR1S1, valR1S2, valR1S3,valR5S1,valR5S2,valR5S3);
            
            
            // Bar Chart for Water Use by Risk Level
            var barChartData = {
            labels : ["Risk Level 1","Risk Level 2", "Risk Level 3"],
            datasets : [
                {
                    label: "Region 1",
                    fillColor : "#58eb7b",
                    strokeColor : "#FFF",
                    highlightFill: "#aafbbd",
                    highlightStroke: "#FFF",
                    data : [valR1S1,valR1S2,valR1S3]
                },
                {
                    label: "Region 5",
                    fillColor : "#e1b474",
                    strokeColor : "#FFF",
                    highlightFill: "#f8c884",
                    highlightStroke: "#FFF",
                    data : [valR5S1,valR5S2,valR5S3]
                },
            ]
        };
        
        var bar1 = document.getElementById("bar1").getContext("2d");
        var bar1Chart = new Chart(bar1).Bar(barChartData, {
            responsive : true,
            animation: false,
            multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
        });
        /*window.myBar = new Chart(bar1).Bar(barChartData, {
            responsive : true,
            animation: false,
            multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
        });*/
    };

    // -- Section 5: Build Map Elements -------------------------------------------------------------
        
    // Initialize the map
    app.buildMap = function() {
    	
    	loading = dojo.byId("mapLoading");
		esri.show(loading);
		
		// Get the map extent from previous session or page.
		// If it exists, we replace the web map JSON content with the new extent, so that it is set before the map is created.
		if (localStorage.extent) {
			var ext = $.parseJSON(localStorage.extent);
			var startExtent = new esri.geometry.Extent(ext.xmin, ext.ymin, ext.xmax, ext.ymax, 
				new esri.SpatialReference({wkid:102100}));
			var convExt = esri.geometry.webMercatorToGeographic(startExtent);
			appWebMap.WEBMAP_JSON.item.extent = [[convExt.xmin, convExt.ymin],[convExt.xmax,convExt.ymax]];
			//console.log(convExt, appWebMap.WEBMAP_JSON.item.extent);
		}
		
	
        var webMapIDorJson, urlObj = urlUtils.urlToObject(document.location.href);

        if (urlObj.query && urlObj.query.mapId) {
            webMapIDorJson = urlObj.query.mapId;
        } else if (appConfig.WEBMAP_ID !== "") {
            webMapIDorJson = appConfig.WEBMAP_ID;
        } else {
            webMapIDorJson = appConfig.WEBMAP_JSON;
        }
		
		// Use this if not using the Bootstrapmap library
		/*mapDeferred = arcgisUtils.createMap(appWebMap.WEBMAP_JSON, "mapDiv", { 
			mapOptions: {
            	nav: false,
            	logo: false
        	}
		});*/
		
		// Using the BootstrapMap library to create a map
		mapDeferred = BootstrapMap.createWebMap(appWebMap.WEBMAP_JSON, "mapDiv",
          {
              slider: true,
              nav: false,
              logo : false,
              sliderPosition : 'top-right',
              scrollWheelZoom: true,
              //extent: startExtent,            
              smartNavigation: false
          });

        mapDeferred.then(function(response) {
            
            mapResponse = response;
            map = response.map;
            
            // defining the layers allows for access to attributes per layer
            layers = esri.arcgis.utils.getLegendLayers(response);
           	$.each(layers, function(i, lyr) {
            	lyrInfoTemplate.push({infoTemplate: lyr.layer.infoTemplate,lyrTitle: lyr.title});
            	
            	if (lyr.title === appConfig.LAYER_NAME_WSHD) {
            		wshdLyrIndex = i;
            	}
            	if (lyr.title === appConfig.LAYER_NAME_INTERP) {
            		interpLyrIndex = i;
            	}
            	if (lyr.title === appConfig.LAYER_NAME_INTERP_WSHD) {
            		interpWshdLyrIndex = i;
            	}
            	if (lyr.title === appConfig.LAYER_NAME_SWRCB_REGIONS) {
            		regionLyrIndex = i;
            	}
            	if (lyr.title === appConfig.LAYER_NAME_GROW_FOOTPRINTS) {
            		growLyrIndex = i;
            	}
            	if (lyr.title === appConfig.LAYER_NAME_GROW_LOCATIONS) {
            		growLocLyrIndex = i;
            	}
            	if (lyr.title === appConfig.LAYER_NAME_MAIN_HEATMAPS) {
            		heatmapLyrIndex = i;
            	}
            	if (lyr.title === appConfig.LAYER_NAME_SITES) {
            		growSiteLyrIndex = i;
            	}
            	if (lyr.title === appConfig.LAYER_NAME_SITES_PARCELS) {
            		growSiteParcLyrIndex = i;
            	}
            });
 
            clickHandler = response.clickEventHandle;
            clickListener = response.clickEventListener;
            
            on(map, "update-start", function() {
	        	esri.show(loading);
	        });
	    	on(map, "update-end", function() {
	    		esri.hide(loading);
	    		//console.log("update end");
	    	});
	    	on(map, "extent-change", function() {
	    		app.syncMaps(map);
	    	});
	    	
	    	//hide the popup if its outside the map's extent (use this if not using Bootstrapmap library)
	        /*map.on("mouse-drag", function(evt) {
	          if (map.infoWindow.isShowing) {
	            var loc = map.infoWindow.getSelectedFeature().geometry;
	            if (!map.extent.contains(loc)) {
	              map.infoWindow.hide();
	            }
	          }
	        });*/

            mapNav = new Navigation(map);

            if (map.loaded) {
                app.buildMapElements(layers);
                app.buildMapItems(response);
            } else {
                on(map, "load", function() {
                    app.buildMapElements(layers);
                    app.buildMapItems(response);
                });
            }

        }, function(error) {
            alert("An error occurred loading the map. Refresh the page and try again.");
        });
        
        
    };
    
    app.buildMapItems = function (response) {
		//esri.show(loading);
		app.buildPopup();
    	app.buildTOC(response);
    	app.buildBasemap();
    	app.buildSearch();
    	app.buildSearchWatershed();
    	//app.buildPrint();
    	app.buildMeasure();
    	
    	$.when(app.buildClusterLayer(appConfig.GROW_POINTS_NAME, appConfig.URL_GROW_POINTS, appConfig.GROW_POINTS_SCALE, null, function(callback) {
    		console.log("buildCluster done");
		}));
		
		var subHeight = $("#summary-container").height() + $("#header-container").height() + $("#ribbonTabs").height() + 10;
		    $('.tab-pane').css("max-height", (($(window).height()) - subHeight));
    };

    app.buildMapElements = function (layers) {
        on(map, "mouse-move", app.showCoordinates);
        on(map, "mouse-drag", app.showCoordinates);
    };

    app.buildTOC = function (response) {
        var webmapLayerInfos = []; // this is for TOC
        var layerInfo = []; //this is for Legend

        dojo.forEach(response.itemInfo.itemData.operationalLayers, function(olayer) {
            webmapLayerInfos.push({
                layer : olayer.layerObject,
                title : olayer.resourceInfo.name,
                slider : true,
                collapsed : false
            });
            layerInfo.push({
                layer : olayer.layerObject,
                title : olayer.resourceInfo.name
            });
        });

        // add TOC
        webmapLayerInfos.reverse();
        toc = new agsjs.dijit.TOC({
            map : map,
            layerInfos : webmapLayerInfos
        }, "mapTocDiv");
        toc.startup();
    };
    
    app.buildBasemap = function() {
    	// builds the basemap from definition set in config file.
    	var basemaps = [];
    	
    	$.each(appConfig.BASEMAPS, function(i) {
    		switch(appConfig.BASEMAPS[i].numberOfLayers) {
				case 1:
	    			var base = new Basemap({
		    			layers:[ new BasemapLayer({
		    				url: appConfig.BASEMAPS[i].url
		    			})],
		    			title: appConfig.BASEMAPS[i].title,
		    			thumbnailUrl: appConfig.BASEMAPS[i].thumbnailUrl
		    		});
		    		basemaps.push(base);
		    	break;
		    	case 2:
    				var base = new Basemap({
		    			layers:[ 
		    				new BasemapLayer({
		    					url: appConfig.BASEMAPS[i].url1
		    				}),
		    				new BasemapLayer({
		    					url: appConfig.BASEMAPS[i].url2
		    				})],
		    			title: appConfig.BASEMAPS[i].title,
		    			thumbnailUrl: appConfig.BASEMAPS[i].thumbnailUrl
		    		});
		    		basemaps.push(base);
    			break;
		    	case 3:
    				var base = new Basemap({
		    			layers:[ 
		    				new BasemapLayer({
		    					url: appConfig.BASEMAPS[i].url1
		    				}),
		    				new BasemapLayer({
		    					url: appConfig.BASEMAPS[i].url2
		    				}),
		    				new BasemapLayer({
		    					url: appConfig.BASEMAPS[i].url3
		    				})],
		    			title: appConfig.BASEMAPS[i].title,
		    			thumbnailUrl: appConfig.BASEMAPS[i].thumbnailUrl
		    		});
		    		basemaps.push(base);
    			break;
    		};
    		
    	});
    	//console.log(basemaps);
    	
    	basemapGallery = new BasemapGallery({
            showArcGISBasemaps : false,
            map : map,
            basemaps: basemaps,
        }, "basemapGallery");
        basemapGallery.startup();
        
        basemapGallery.on("error", function() {
			bootbox.alert("An error occured while trying to load the basemap.<br/><br/>Please try a different basemap.");
			//console.log("error loading basemap");
		});
        
        // set a listener for changing the basemap. if changed, save this to localStorage to be used next time the app loads
	    basemapGallery.on("selection-change", function(){  
			var currentBasemap = basemapGallery.getSelected();
		  	localStorage.currentBasemap = currentBasemap.id;
		  	//esri.hide(loading);
		});
		
		if (localStorage.currentBasemap) {
			//console.log(localStorage.currentBasemap, basemapGallery.getSelected());
			if (!(localStorage.currentBasemap === "basemap_0")) {
				basemapGallery.select(localStorage.currentBasemap);
			};
		};
    };
    
    
    app.buildBasemapOLD = function () {
    /* OLD METHOD OF BASEMAPS, CAN DELETE */	
    	var basemaps = [];
    	
    	/*var baseAerial = new Basemap({
    		layers:[new BasemapLayer({
	    		url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
	    	})],
    		title: "World Imagery",
    		thumbnailUrl: "img/imagery.jpg"
    	});
      	basemaps.push(baseAerial); */
      	
    	var baseTopo = new Basemap({
    		layers:[new BasemapLayer({
	    		url: "http://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer"
	    	})],
    		title: "Topographic",
    		thumbnailUrl: "img/topo_map_2.jpg"
    	});
     	basemaps.push(baseTopo);  
     	
     	/*var baseNG = new Basemap({
    		layers:[new BasemapLayer({
	    		url: "http://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer"
	    	})],
    		title: "National Geographic",
    		thumbnailUrl: "img/natgeo.jpg"
    	});
     	basemaps.push(baseNG);*/
    	
    	var baseAerialOverlay = new Basemap({
    		layers:[new BasemapLayer({
	    		url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
	    	}),
	    		new BasemapLayer({
	    		url: "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer"
	    	}),
	    		new BasemapLayer({
	    		url: "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer"
	    	})],
	    	
    		title: "Esri Imagery with Transportation Overlay",
    		thumbnailUrl: "img/imagery_hybrid.jpg"
    	});
      	basemaps.push(baseAerialOverlay); 
    	
    	/*var baseAerialOverlay = new Basemap({
    		layers:[new BasemapLayer({
	    		url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2014/ImageServer"
	    	}),
	    		new BasemapLayer({
	    		url: "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer"
	    	}),
	    		new BasemapLayer({
	    		url: "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer"
	    	})],
	    	
    		title: "2014 Imagery (CA NAIP) with Transportation",
    		thumbnailUrl: "img/base-image-trans.png"
    	});
      	basemaps.push(baseAerialOverlay); */
    	
    	var baseNaipCA2014 = new Basemap({
    		layers:[new BasemapLayer({
	    		url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2014/ImageServer"
	    	})],
    		title: "2014 Imagery (CA NAIP)",
    		thumbnailUrl: "img/base-image-14.png"
    	});
      	basemaps.push(baseNaipCA2014);
    	
     	var baseNaipCIR = new Basemap({
    		layers:[new BasemapLayer({
	    		url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2014_CIR/ImageServer"
	    	})],
    		title: "2014 Imagery (CA NAIP) Color Infrared",
    		//rasterFunction: "FalseColorComposit",
    		thumbnailUrl: "img/base-infra.png"
    	});
      	basemaps.push(baseNaipCIR);
      	
      	/*var baseNaip2014NDVI = new Basemap({
    		layers:[new BasemapLayer({
	    		url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2014_NDVI/ImageServer"
	    	})],
    		title: "2014 Imagery (CA NAIP) NDVI",
    		thumbnailUrl: "img/base-ndvi.png"
    	});
      	basemaps.push(baseNaip2014NDVI);*/
      	
      	var baseNaipCA2012 = new Basemap({
    		layers:[new BasemapLayer({
	    		url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2012/ImageServer"
	    	})],
    		title: "2012 Imagery (CA NAIP)",
    		thumbnailUrl: "img/base-image-12.png"
    	});
      	basemaps.push(baseNaipCA2012);
    	
    	var baseNaipCA2010 = new Basemap({
    		layers:[new BasemapLayer({
	    		url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2010/ImageServer"
	    	})],
    		title: "2010 Imagery (CA NAIP)",
    		thumbnailUrl: "img/base-image-10.png"
    	});
      	basemaps.push(baseNaipCA2010);
    	
    	var baseNaipCA2009 = new Basemap({
    		layers:[new BasemapLayer({
	    		url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2009/ImageServer"
	    	})],
    		title: "2009 Imagery (CA NAIP)",
    		thumbnailUrl: "img/base-image-09.png"
    	});
      	basemaps.push(baseNaipCA2009);
    	
    	var baseNaipCA2005 = new Basemap({
    		layers:[new BasemapLayer({
	    		url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2005/ImageServer"
	    	})],
    		title: "2005 Imagery (CA NAIP)",
    		thumbnailUrl: "img/base-image-05.png"
    	});
      	basemaps.push(baseNaipCA2005);
    	
    	basemapGallery = new BasemapGallery({
            showArcGISBasemaps : false,
            map : map,
            basemaps: basemaps,
        }, "basemapGallery");
        basemapGallery.startup();
        
        basemapGallery.on("error", function() {
			bootbox.alert("An error occured while trying to load the basemap.<br/><br/>Please try a different basemap.");
			//console.log("error loading basemap");
		});
        
        // set a listener for changing the basemap. if changed, save this to localStorage to be used next time the app loads
	    basemapGallery.on("selection-change", function(){  
			var currentBasemap = basemapGallery.getSelected();
		  	localStorage.currentBasemap = currentBasemap.id;
		  	//esri.hide(loading);
		});
		
		if (localStorage.currentBasemap) {
			//console.log(localStorage.currentBasemap, basemapGallery.getSelected());
			if (!(localStorage.currentBasemap === "basemap_0")) {
				basemapGallery.select(localStorage.currentBasemap);
			};
		};
	};
	
	app.isolatePopup = function(item) {
		// sets the popup results to a single layer, identified with the layer Title passed to the function.
		//console.log("isolatePopup:", item);
		$.each(layers, function(i, lyr) {
		  //console.log(lyr.title);
		  if (!(lyr.title === item)) {
		    lyr.layer.infoTemplate = null;
		  }
		});
	};
	
	app.resetPopup = function() {
		// resets popup results to default for all layers.
		$.each(layers, function(i, lyr) {
		  //console.log(lyr.title);
		    lyr.layer.infoTemplate = lyrInfoTemplate[i].infoTemplate;
		});
	};
    
    app.buildPopup = function () {
	    // Customize popup behavior when editing features
        var popup = map.infoWindow;
        
        on(popup, "SetFeatures", function() {
        	//console.log(popup);
        	//esri.show(loading);
        	// loop through edit options to control popup behavior
        	//var editRadios = ["optionsRadios0", "optionsRadios1", "optionsRadios2", "optionsRadios3", "optionsRadios4", "optionsRadios5", "optionsRadios6", "optionsRadios7", "optionsRadios8", "optionsRadios9", "optionsRadios10", "optionsRadios11"];
        	var selectedRadio;
        	$.each(editRadios, function(i) {
        		if ($("#" + editRadios[i] + ":checked").prop("checked")) {
        			selectedRadio = editRadios[i];
        		};
        	});
        	//console.log(selectedRadio);
        	switch (selectedRadio) {
        		
        		case "optionsRadios10":
        			// Loading Prioritization Model - user clicked on a Pr Area boundary
        			$(".esriPopupWrapper").css("display","none");
        			var selCount = popup.count;
            		var modelFtr = popup.getSelectedFeature();
            		var modelFtrName = modelFtr.attributes.PrioritizAreaName;
            		//console.log(modelFtr, modelFtrName);
            		if ((modelFtr._layer._url.path).toLowerCase() === (appConfig.URL_PRIOR_AREA).toLowerCase()) {
            			if (selCount === 1) { // one Pr Area exists under the map click
            				bootbox.confirm("<b>" + modelFtrName + "</b> was selected, continue with this Prioritization Area?", function(result) {
	            				if (result) {
	 								app.loadModel(modelFtr.attributes.PrioritizAreaKey, modelFtrName);
	            				} else {
	            					popup.clearFeatures();
	            					esri.hide(loading);
	            				}
	            			});
            			} else { // multiple Pr Areas, loop through them
            				var modelFtrMult = [];
            				modelFtrMult.push(modelFtr);
            				for (i = 1; i < selCount; i++) { 
            					popup.selectNext();
            					var modelFtr = popup.getSelectedFeature();
            					modelFtrMult.push(modelFtr);
            				};
            				console.log(modelFtrMult);
            				var selectArea;
							var modelList = "";
							$.each(modelFtrMult, function(i) {
								modelList += "<option value='" + i + "'>" + modelFtrMult[i].attributes.PrioritizAreaName + "</option>";
							});
            				bootbox.dialog({
								title: "Multiple Prioritization Areas exist at this location, please select one, then click 'Proceed'",
								message: '<select id="selAreaList" class="form-control">' +
									modelList +
									'</select>',
								buttons: {
									success: {
										label: "Proceed",
										callback: function() {
											selectArea = $("#selAreaList").val();
											app.loadModel(modelFtrMult[selectArea].attributes.PrioritizAreaKey, modelFtrMult[selectArea].attributes.PrioritizAreaName);
										}
									}
								}
							});
            			}
            			
            		} else {
            			popup.clearFeatures();
            			bootbox.alert("A Prioritization Area feature was not selected.<br/><br/>Try turning off any other layers that might be selected instead.");
            			esri.hide(loading);
            		}
        		break;
        		default:
        			// Check to see if Grow Site summary tool is active
        			if ($("#sumSite-toggle").prop('checked') === true) {
        				$("#sumSiteText").html("Generating Summary - please wait.");
        				map.graphics.clear();
        				$(".esriPopupWrapper").css("display","none");
        				
        				var sitePointSymbol = new SimpleMarkerSymbol();
						sitePointSymbol.outline.setWidth(2);
						var siteLineSymbol = new CartographicLineSymbol();
						sitePointSymbol.outline.setColor(new Color([0,225,255,1]));
						siteLineSymbol.setColor(new Color([0,225,255,1]));
						
        				var growSite = popup.getSelectedFeature();
        				
        				var siteGraphic = new Graphic(growSite.geometry, sitePointSymbol);
            			map.graphics.add(siteGraphic);
        				
        				var GrowSiteKey = growSite.attributes.GrowSiteKey;
						var query = new Query();
						query.where = "GrowSiteKey = '" + GrowSiteKey + "'";
						var sumText = "<b>Summary for Grow Site: " + GrowSiteKey + "</b><br/><br/>";
						//console.log(GrowSiteKey);
						layers[growSiteParcLyrIndex].layer.queryFeatures(query, function(siteParcFeatures) {
							var resultCount = siteParcFeatures.features.length;
							var sumParcelText = "Grow Site Parcels:<br/>";
							if (resultCount > 0) {
								console.log("Site Parcels", siteParcFeatures);
								$.each(siteParcFeatures.features, function(i) {
									sumParcelText += "&nbsp;&nbsp;APN: " + siteParcFeatures.features[i].attributes.APN + "<br/>";
									var siteParcelGraphic = new Graphic(siteParcFeatures.features[i].geometry, siteLineSymbol);
									map.graphics.add(siteParcelGraphic);
								});
							} else {
								sumParcelText += "&nbsp;&nbsp;No Grow Site Parcels associated with Grow Site.";
							}
						
							layers[growLyrIndex].layer.queryFeatures(query, function(growFeatures) {
								var sumGrowText = "Grows:<br/>";
								var resultCount = growFeatures.features.length;
								if (resultCount > 0) {
									$.each(growFeatures.features, function(i) {
										sumGrowText += "&nbsp;&nbsp;Grow: " + growFeatures.features[i].attributes.GrowID + ", Acres: " + growFeatures.features[i].attributes.GrowAcres + "<br/>";
										var siteGrowGraphic = new Graphic(growFeatures.features[i].geometry, siteLineSymbol);
										map.graphics.add(siteGrowGraphic);
									});
								} else {
									sumGrowText += "&nbsp;&nbsp;No Grows associated with Grow Site.";
								}
								
								popup.clearFeatures();
								$("#sumSiteText").html(sumText + sumParcelText + sumGrowText);
								
							});
						});
						
        				
        			} else {
        				// Default popup
        				$(".esriPopupWrapper").css("display","block");
        			}
        		break;
        	}
        });
    };
    
    app.buildSearch = function () {
        // Generic search by address or place name
    	var s = new Search({
            map: map
         }, "searchBasic");
         s.startup();
    };
    
    app.buildSearchWatershed = function () {
		// Uses the Search function to search specified layers
		var sL = new Search({	
			enableButtonMode: false, // this enables the search widget to display as a single button
	        enableLabel: false,
	        enableInfoWindow: true,
	        showInfoWindowOnSelect: false,
	        sources: [], // using a empty object removes default use of address locator
	        map: map
	     }, "searchWatershed");
	
	     var sources = sL.get("sources");
	    
	     sources.push({
	        featureLayer: new FeatureLayer(appConfig.URL_WATERSHED),
	        searchFields: ["Name"],
	        suggestionTemplate: "${Name}, HUC12: ${HUC12}",
	        displayField: "Name",
	        exactMatch: false,
	        outFields: ["Name"],
	        name: "HUC 12 Name",
	        placeholder: "Watershed Name",
	        maxResults: 10,
	        maxSuggestions: 10,
	
	        //Create an InfoTemplate and include three fields
	        infoTemplate: new InfoTemplate("Name", "HUC12 Name: ${Name}</br>"),
	        enableSuggestions: true,
	        minCharacters: 0
	     });

	     //Set the sources above to the search widget
	     sL.set("sources", sources);
	
	     sL.startup();
	};
	
	app.buildPrint = function () {
		var printer = new Print({
			map: map,
			url: appConfig.PRINT_SERVICE,
			templates: [{
				format: "PDF",
				layout: "A3 Landscape",
				layoutOptions: {
					titleText: "CIPS"
				}
			}]
		}, dom.byId("printButton"));
		printer.startup();
		
		printer.on('print-complete',function(){
	  console.log('print complete.');
	  });
	  
	  printer.on('error',function(err){
		  console.log('print error', err);
	  });
		
	};
	
	app.createPrint = function (){
        //Set up print stuff
        var printUrl = "http://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";
        var printTask = new esri.tasks.PrintTask(printUrl, {async: true});
        var params = new esri.tasks.PrintParameters();
        var template = new esri.tasks.PrintTemplate();

        params.map = map;
        template.exportOptions = {
            width: 595,
            height: 842,
            dpi: 96
        };
        template.layout = "MAP_ONLY";
        template.preserveScale = false;

        params.template = template;

        //dojo.connect(map, "onLoad", function() {//Fire the print task
        //printTask.execute(params, printResult, printError);
        setTimeout(function(){printTask.execute(params, printResult, printError);},2500);
    };

    function printResult(result){
        console.log(result.url);
    }
    
    function printError(result){
        console.log(result);
    }
	
	app.buildMeasure = function () {
		measurement = new Measurement({
		    map: map
		}, dom.byId('measurement'));
		measurement.startup();
	};
	
	app.buildElevProfile = function() {
		// Create the profile widget the first time loaded
		if (!(epWidget)) {
			$("#elev-toggle").change(function() {
				if ($("#elev-toggle").prop('checked') === true) {
					app.initElevToolbar("polyline");
					$("#sumWshd-toggle").bootstrapToggle("off");
					dojo.disconnect(clickHandler);
					clickHandler = null;
				} else {
					app.disableElevTool();
				}
			});
	
			on(dom.byId("unitsSelect"), "change", function(evt) {
				if (epWidget) {
					epWidget.set("measureUnits", evt.target.options[evt.target.selectedIndex].value);
				}
			});
	
			// lineSymbol used for freehand polyline and line.
			if (!(epWidget)) {
				lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([38, 110, 235]), 4);
	
				var profileParams = {
					map : map,
					profileTaskUrl : "https://elevation.arcgis.com/arcgis/rest/services/Tools/ElevationSync/GPServer",
					scalebarUnits : Units.MILES
				};
				epWidget = new ElevationsProfileWidget(profileParams, dom.byId("profileChartNode"));
				epWidget.startup();
			}
			tb = new Draw(map);
		}

	}; 
	
	app.buildTimeSlider = function() {
		$("#timeInfo").show();

		timeSlider = new TimeSlider({
			style : "width: 100%;"
		}, dom.byId("timeSliderDiv"));
		map.setTimeSlider(timeSlider);

		var timeExtent = new TimeExtent();
		timeExtent.startTime = new Date("1/1/1997 UTC");
		timeExtent.endTime = new Date("12/31/2015 UTC");
		timeSlider.setThumbCount(2);
		timeSlider.createTimeStopsByTimeInterval(timeExtent, 1, "esriTimeUnitsYears");
		timeSlider.setThumbIndexes([15, 15]);
		timeSlider.setThumbMovingRate(4000);
		timeSlider.startup();

		//add labels for every other time stop
		var labels = arrayUtil.map(timeSlider.timeStops, function(timeStop, i) {
			if (i % 2 === 0) {
				return timeStop.getUTCFullYear();
			} else {
				return "";
			}
		});

		timeSlider.setLabels(labels);

		$("#enable-time").hide();
		$("#disable-time").show();

		/*timeSlider.on("time-extent-change", function(evt) {
		 var startValString = evt.startTime.getUTCFullYear();
		 var endValString = evt.endTime.getUTCFullYear();
		 dom.byId("daterange").innerHTML = "<i>" + startValString + " and " + endValString  + "<\/i>";
		 });*/
	}; 

    
    app.removeTimeSlider = function() {
    	if (timeSlider) {
    		timeSlider.destroy();
    		$("#timeInfo").html("<div id='timeSliderDiv'></div>");
    		$("#enable-time").show();
          	$("#disable-time").hide();
          	$("#timeInfo").hide();
    	}
    };
    
    
	app.buildFeatureTable = function(tblSource, defExp) {
		// TEST - show an attribute table using the featureTable widget
		//   Call by passing the url of a layer, and a definition expression (optional). 
		//   Example: app.buildFeatureTable("http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_Operational/FeatureServer/7", "InterpAreaKey = '1_1'");
		
		$("#modalTable").modal("show");

		myFeatureLayer = new FeatureLayer(tblSource, {
			mode : FeatureLayer.MODE_ONDEMAND,
			//outFields:  ["*"],
			visible : true,
			id : "fLayer"
		});

		if (defExp) {
			myFeatureLayer.setDefinitionExpression(defExp);
		}

		/*on(myFeatureLayer, "load", function(evt){
		 console.log("Layer loaded");
		 var extent = myFeatureLayer.fullExtent;
		 if (webMercatorUtils.canProject(extent, map)) {
		 map.setExtent( webMercatorUtils.project(extent, map) );
		 }
		 });*/

		if (registry.byId("myTableNode")) {
			registry.byId("myTableNode").destroy();
			domConstruct.create("div", {
				id : "myTableNode"
			}, dom.byId("tblGrid"));
			console.log("re-creating table");
		}

		// Add the feature layer to the map
		/*var oldLayer = map.getLayer("fLayer");
		 if(oldLayer){
		 map.removeLayer(oldLayer);
		 }
		 map.addLayer(myFeatureLayer);*/

		myTable = new FeatureTable({
			"featureLayer" : myFeatureLayer//,
			//"dateOptions": {
			//  "timeEnabled" : true,
			//  "timePattern" : "HH:mm:ss",
			//  "datePattern" : "YYYY-MM-DD"
			//},
			//"hiddenFields": [],  // field that end-user can show, but is hidden on startup
			//"map" : map
		}, 'myTableNode');

		// load event (must be before startup)
		on(myTable, "load", function(evt) {
			console.log("The load event - ", evt);
		});

		myTable.startup();

		on(myTable, "dgrid-refresh-complete", function(evt) {
			console.log("The dgrid-refresh-complete event - ", evt);
		});

		on(myTable, "dgrid-select", function(evt) {
			console.log("The dgrid-select event - ", evt);
		});

		on(myTable, "dgrid-deselect", function(evt) {
			console.log("The dgrid-deselect event - ", evt);
		});
	}; 

    
    app.exportTable = function() {
    	var grid = registry.byId("myTableNode");
    	var expTable = exportCSV(grid.dataStore.data);
    	bootbox.alert("<b>Instructions:</b> Highlight the following table content, copy it, then paste into Excel:<br/><br/><br/>" + expTable + "<br/>");
        
        // Returns a csv from an array of objects with
		// values separated by tabs and rows separated by newlines
		function exportCSV(array) {
		    // Use first element to choose the keys and the order
		    var keys = [];
		    for (var k in array[0]) keys.push(k);
		
		    // Build header
		    var result = keys.join("\t") + "\n";
		
		    // Add the rows
		    array.forEach(function(obj){
		        keys.forEach(function(k, ix){
		            if (ix) result += "\t";
		            result += obj[k];
		        });
		        result += "\n";
		    });
		
		    return result;
		}
	};
        
    // -- Section 6: Map Functionality -------------------------------------------------------------
    
    app.toggleAllLayers = function(option) {
    	// turn all layers on or off by passing true or false
    	$.each(layers, function(i) {
    		layers[i].layer.setVisibility(option); 
    	});
    };
	
    app.runQuery = function(layerUrl, queryWhere, geomTrueFalse, callback) {
		// Query task
		var query = new Query();
		var queryTask = new QueryTask(layerUrl);
		query.where = queryWhere;
		query.outSpatialReference = {
			wkid : 102100
		};
		query.returnGeometry = geomTrueFalse;
		query.outFields = ["*"];
		queryTask.execute(query, function(res) {	
			callback(res);
		});
	};
	
	app.runQueryDistinctVal = function(layerUrl, queryWhere, outFields, geomTrueFalse, callback) {
		// Query task to get distinct (unique) values
		var query = new Query();
		var queryTask = new QueryTask(layerUrl);
		query.where = queryWhere;
		query.outSpatialReference = {
			wkid : 102100
		};
		query.returnGeometry = geomTrueFalse;
		query.returnDistinctValues = true;
		query.outFields = [outFields];
		queryTask.execute(query, function(res) {	
			callback(res);
		});
	};
        
    app.syncMaps = function(mapObj) {
        // when map extent changes, write it to localStorage.extent variable
		var mapExtent = mapObj.extent;
		var mapCetner = mapObj.extent.getCenter;
		localStorage.extent = JSON.stringify(mapObj.extent);
	};
	
	app.initElevToolbar = function(toolName) {
		//Clear profile
        epWidget.clearProfile();
		dojo.disconnect(clickHandler);
		clickHandler = null;
		map.graphics.clear();
		tb.on("draw-end", app.addElevGraphic);
		tb.activate(toolName);
		if ($("#sumSite-toggle").prop('checked') === true) {
			$("#sumSite-toggle").bootstrapToggle("off");
		}
		//map.disableMapNavigation();
	};

	app.addElevGraphic = function(evt) {
		// deactivate the elevation toolbar and clear existing graphics when tool is not active
		tb.deactivate();
		map.enableMapNavigation();
		var symbol = lineSymbol;
		map.graphics.add(new Graphic(evt.geometry, symbol));
		epWidget.set("profileGeometry", evt.geometry);

		var sel = dom.byId("unitsSelect");
		if (sel) {
			var val = sel.options[sel.selectedIndex].value;
			epWidget.set("measureUnits", val);
		}
	};
        
    app.disableElevTool = function() {
        // turning off elevation profile functionality when the tool is not active
        tb.deactivate();
        epWidget.clearProfile();
        map.graphics.clear();
        if ($("#sumWshd-toggle").prop('checked') === false) {
            clickHandler = dojo.connect(map, "onClick", clickListener);
        };
    };

    app.showCoordinates = function (evt) {
        // the map is in web mercator but display coordinates in geographic (lat, long)
        var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
        // display mouse coordinates
        $('#coordsText').html(mp.x.toFixed(3) + ", " + mp.y.toFixed(3));
    };
        
    app.isolatePopup = function(item) {
     	// sets the popup results to a single layer, identified with the layer Title passed to the function.
		$.each(layers, function(i, lyr) {
		  if (!(lyr.title === item)) {
		    lyr.layer.infoTemplate = null;
		  }
		});
	};
	
	app.resetPopup = function() {
        // resets popup results to default for all layers.
        $.each(layers, function(i, lyr) {
		    lyr.layer.infoTemplate = lyrInfoTemplate[i].infoTemplate;
		});
	};

	app.findRegion = function() {
		// Search and zoom to a specified region. Used for Search by Region drop down.
		$.when(app.runQuery(appConfig.URL_REGION, "RB=" + $('#frmSearchRegion').val(), true, function(callback) {
			var extent = callback.features[0].geometry.getExtent();
			map.setExtent(extent);
		}));
		
	};
	
	app.findInterpArea = function() {
		// Search and zoom to a specified Interpretation Area. Used for Search by Interpretation Area drop down.
		$.when(app.runQuery(appConfig.URL_INTERP_AREA, "InterpAreaName='" + $('#frmSearchInterp').val() + "'", true, function(callback) {
			var extent = callback.features[0].geometry.getExtent();
			map.setExtent(extent);
		}));
	};
        
    app.buildClusterLayer = function(newLyrName, sourceUrl, maxScale, minScale, callback) {
		// Create clustered layer for grow locations
		clusterLayer = new ClusterFeatureLayer({
			"url" : sourceUrl,
			"distance" : 50,
			"id" : newLyrName,
			"labelColor" : "#fff",
			"labelOffset" : -5,
			"resolution" : map.extent.getWidth() / map.width,
			"useDefaultSymbol" : false,
			"singleColor" : "#888"//,
			//"showSingles" : true,
			//"webmap" : true//,
			//"singleTemplate" : infoTemplate
		});
		var defaultSym = new SimpleMarkerSymbol('circle', 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([252, 174, 145, 0.5]), 6), new Color([165, 15, 21, 1]));
		var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");
		var group1 = new SimpleMarkerSymbol('circle', 15, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([251, 106, 74, 0.25]), 10), new Color([251, 106, 74, 0.7]));
		var group2 = new SimpleMarkerSymbol('circle', 20, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([222, 45, 38, 0.25]), 15), new Color([222, 45, 38, 0.7]));
		var group3 = new SimpleMarkerSymbol('circle', 30, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([165, 15, 21, 0.25]), 15), new Color([165, 15, 21, 0.7]));

		renderer.addBreak(2, 5, group1);
		renderer.addBreak(5, 20, group2);
		renderer.addBreak(20, 50000, group3);
		clusterLayer.setRenderer(renderer);
		if (maxScale) {
			clusterLayer.setMaxScale(maxScale);
		}
		if (minScale) {
			clusterLayer.setMinScale(minScale);
		}
		//clusterLayer.setVisibility(false);
		
		map.addLayers([clusterLayer]);
		toc.layerInfos.push({
			"layer" : clusterLayer,
			"title" : newLyrName
		});
		toc.refresh();
		callback("complete");	
		
		/*clusterLayer.on("clusters-shown", function() {
			esri.hide(loading);
			console.log("clusters shown");
		});
		clusterLayer.on("update", function() {
			//esri.hide(loading);
			console.log("cl graphic update");
		});*/
	};
		
	app.summarizeWshd = function(option) {
		// Generate a summary of a watershed after map-click
		switch(option) {
			case true:
				if ($("#sumSite-toggle").prop('checked') === true) {
					$("#sumSite-toggle").bootstrapToggle("off");
				}
				if (epWidget) {
					app.disableElevTool();
					$("#elev-toggle").bootstrapToggle("off");
				}				
				$("#sumWshdText").show();
				dojo.disconnect(clickHandler);
				if (clusterLayer) {
					clusterLayer._onClickHandler = null;
				}
				showInfoWindow = "sumWshd";
				var currentClick = null;
				var queryTask = new QueryTask(appConfig.URL_WATERSHED);
				var queryTaskGrow = new QueryTask(appConfig.URL_GROW_POLYS);
				var query = new Query();
				var results1, results2, results3;
				query.returnGeometry = true;
				query.outFields = ["*"];
				
				map.on("click", function(evt) {
					map.graphics.clear();
					results1 = evt;
					if (showInfoWindow === "sumWshd") {
						$("#sumWshdText").html("Generating Summary - please wait.");
						currentClick = query.geometry = evt.mapPoint;
						query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
						queryTask.execute(query);
					}
				});
				queryTask.on("complete", function(evt) {
					testObj = evt;
					results2 = evt;					
					var symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([38, 110, 235]), 4);
					var resultShape = evt.featureSet.features[0];
					resultShape.setSymbol(symbol);
					map.graphics.add(resultShape);
					query.geometry = evt.featureSet.features[0].geometry;
					queryTaskGrow.execute(query);
				});
				queryTaskGrow.on("complete", function(evt) {
					results3 = evt;
					var totalGrows = evt.featureSet.features.length;
					var totalOutdoor = 0, totalGreenhouse = 0, totalArea = 0;
					$.each(evt.featureSet.features, function(i) {
						var ftrAttr = evt.featureSet.features[i].attributes;
						totalArea += ftrAttr.GrowSqFt;
						if (ftrAttr.GrowType === "Outdoor") {
							totalOutdoor += 1;
						}
						if (ftrAttr.GrowType === "Greenhouse") {
							totalGreenhouse += 1;
						}
					});
					totalArea = (totalArea * 0.000022956841138659).toFixed(2);
					var sumResult = "<b>Summary Results for: <u>" + results2.featureSet.features[0].attributes.Name + "</u></b><br/>";
					sumResult += " Outdoor Grows: " + totalOutdoor + "<br/>";
					sumResult += " Greenhouse Grows: " + totalGreenhouse + "<br/>";
					sumResult += " Total Grow Acreage: " + totalArea + "<br/>";
					
					$("#sumWshdText").html(sumResult);
					var lyrExtent = results2.featureSet.features[0].geometry.getExtent();
					var resultExtent = lyrExtent.expand(1.4);
					map.setExtent(resultExtent);
				});
			break;
			case false:
				$("#sumWshdText").hide();
				map.graphics.clear();
				clickHandler = dojo.connect(map, "onClick", clickListener);
				if (clusterLayer) {
					clusterLayer._onClickHandler = clusterLayerClickHandler;
				}
				showInfoWindow = "default";
				$("#sumWshdText").html("Click on a watershed boundary to display summary.");
			break;
		}
	};
	
	app.summarizeSite = function(option) {
		// Summarize a Grow Site

		if (!(layers[growSiteLyrIndex].layer.visible)) {
			layers[growSiteLyrIndex].layer.setVisibility(true);
		}
		switch(option) {
			case true:
				clickHandler = dojo.connect(map, "onClick", clickListener);
				$("#sumSiteText").show();
				app.isolatePopup(appConfig.LAYER_NAME_SITES);
				// Turn off any other toggles
				if (showInfoWindow === "sumWshd") {
					$("#sumWshd-toggle").bootstrapToggle("off");
				};
				if (epWidget) {
					app.disableElevTool();
					$("#elev-toggle").bootstrapToggle("off");
				}	
			break;
			case false:
				app.resetPopup();
				$("#sumSiteText").hide();
				map.graphics.clear();
				$("#sumSiteText").html("Click on a Grow Site to display summary.");
			break;
		};
		
			
	};

	app.zoomToLayerExtent  = function(layerName) {
		var extentLayer = map.getLayer(layerName);
		var lyrExtent = esri.graphicsExtent(extentLayer.graphics);
		var newExtent = lyrExtent.expand(1.25);
		map.setExtent(newExtent);
	};
    
    // -- Section 7: Map Menu Items -------------------------------------------------------------
        
    app.hideRibbonMenu = function() {
 		var tabs = $('.tabItems');
		var containers = $('#menu1, #menu2, #menu3, #menu4, #menu5, #menu7');
        containers.removeClass("slide-out");
        containers.removeClass("showing");
        containers.removeClass("active");
        showing = false;
		$("#ribbon-bar-toggle").hide();
 	};
 	
 	app.updateRibbonToggle = function() {
 		var toggleButtonHeight = ($('#ribbon-bar-header').height()) + ($('#ribbonTabs').height()) + ($('#topTabs').height()) + 10;
		$('#ribbon-bar-toggle').css('top', toggleButtonHeight);
 	};
 	
 	app.toggleBox = function(item, element) {
 		// Show or hide the Summary Dashboard
 		if ($("#" + item).css('display') !== 'none') {
            $("#" + item).hide();
            $('#' + element.id).html('<i class="fa fa-chevron-down"></i>');
            if (($(window).width()) > 800) {
            	var subHeight = $("#summary-container").height() + $("#header-container").height() + $("#ribbonTabs").height() + 10;
            	if (subHeight)
	            $('#mapDiv').height(($(window).height()) - subHeight);
			    map.resize();
			    $('.tab-pane').css("max-height", (($(window).height()) - subHeight));
		    }
        } else {
       		$("#" + item).show();
       		$('#' + element.id).html('<i class="fa fa-chevron-up"></i>');
       		if (($(window).width()) > 800) {
       			var subHeight = $("#summary-container").height() + $("#header-container").height() + $("#ribbonTabs").height() + 10;
	            $('#mapDiv').height(($(window).height()) - subHeight);
	            map.resize();
	            $('.tab-pane').css("max-height", (($(window).height()) - subHeight));
		    }
     	}	
 	};
 
	app.menu1Select = function(item) {
		
		// find and show the target div by searching with item's id
		var element = document.getElementById("menu" + item.id);
		$(element).show();
		
		// hide the rest of the level 1 menu items
		$('.btn-level1').each(function() {
			var itemId = $(this).attr('id');
			if (!(item.id === itemId)) {
				$(this).hide();
			} else {
				$(this).css("background", "#e5e5e5");
			}
		});	
		
		$("#btnLeftPanelToggle").css('left', $('#leftPanel').outerWidth()).addClass('btn-left-toggle-open');

	};
	
	app.menu2Select = function(item) {
		
		// find and show the target div by searching with item's id
		var element = document.getElementById("menu" + item.id);
		$(element).show();
		
		// hide the rest of the level 1 menu items
		$('.btn-level2').each(function() {
			var itemId = $(this).attr('id');
			if (!(item.id === itemId)) {
				$(this).hide();
			} else {
				$(this).css("background", "#e5e5e5");
			}
		});	
		
		$("#btnLeftPanelToggle").css('left', $('#leftPanel').outerWidth()).addClass('btn-left-toggle-open');
		
	};
	
	app.menuReset = function() {
		// Set menu items back to default state
		
		$('.btn-level1').each(function(){
			$(this).css("background", "");
			$(this).show();
		});
		
		$('.menu-level-2').each(function(){  
		    $(this).hide();
		});
		
		$('.menu-level-3').each(function(){ 
		    $(this).hide();
		});
		
		$('.btn-level2').each(function(){
			$(this).css("background", "");
			$(this).show();
		});
		$("#btnLeftPanelToggle").css('left', $('#leftPanel').outerWidth()).addClass('btn-left-toggle-open');
		
	};
        
    app.menuChange = function(option) {
		// called when top menu items are selected
		if (showInfoWindow === "sumWshd") {
			$("#sumWshd-toggle").bootstrapToggle("off");
		};
		if (option.id === "menuMapTools") {
			dojo.disconnect(clickHandler);
			clickHandler = null;
		} else {
			
			measurement.setTool("area", false);
			measurement.setTool("distance", false);
			measurement.setTool("location", false);
			measurement.clearResult();
		};
		if ((option.id === "menuSearch") || (option.id === "menuBasemap") || (option.id === "menuLayers")) {
			if (!(clickHandler)) {
				clickHandler = dojo.connect(map, "onClick", clickListener);
			}
		}
	};
    
    
    // -- Section 7: Load Prioritization Model Results  ----------------------------------------------------
	
	app.initLoadModel = function(option) {
		// radio button options for loading model
		var selOption = option.id;

		switch(selOption) {
			case "optionsRadios10":
				// select Model by clicking on Pr Area from 
				$("#editRadios11").hide();
				$("#modelInstructions").html("Click on the Prioritization Model boundary from the map.");
				app.isolatePopup("Prioritization Areas");
			break;
			case "optionsRadios11":
				// select Model from a list
				app.initLoadRegionList();
				$("#loadModelFromList").show();
				$("#editRadios10").hide();
			break;
		};
	};	
	
	app.initLoadRegionList = function() {
		// Populates drop down lists based on regions and models available
		var regionList = [];
		regionList += "<option value=''>Select a Region</option>";
		$.when(app.runQueryDistinctVal(appConfig.URL_PRIOR_MODELS, "0=0", "SWRCBRegID", false, function(res1) {
			$.each(res1.features, function(i) {
				//console.log(res.features[i].attributes.ModelRunName);
				regionList += "<option value='" + res1.features[i].attributes.SWRCBRegID + "'>" + res1.features[i].attributes.SWRCBRegID + "</option>";
				//modelList += "<option value='" + res.features[i].attributes.ModelRunKey + "'>" + res.features[i].attributes.ModelRunName + "</option>";
			});
			$("#selectLoadPrRegion").html(regionList);
		}));
		//$.when(app.runQuery(appConfig.URL_PRIOR_MODELS, "0=0", false, true, function(res2) {
		//	priorModelsRecs = res2;
			//$("#selectLoadPrModel").html(modelList);
		//}));
		$.when(app.runQuery(appConfig.URL_PRIOR_AREA, "0=0", false, function(res2) {
			priorAreaRecs = res2;
			//$("#selectLoadPrModel").html(modelList);
		}));
	};
	
	app.initLoadModelList = function() {
		// Populates drop down lists based on regions and models available
		var modelList = [];
		modelList += "<option value=''>Select a Prioritization Area</option>";
		$.each(priorAreaRecs.features, function(i) {
			if (priorAreaRecs.features[i].attributes.SWRCBRegID === $("#selectLoadPrRegion").val()) {
				modelList += "<option value='" + priorAreaRecs.features[i].attributes.PrioritizAreaKey + "'>" + priorAreaRecs.features[i].attributes.PrioritizAreaName + "</option>";
			}
		});
		$("#selectLoadPrModel").html(modelList);
		$("#selectLoadPrModel").prop('disabled', false);
	};
	
	//app.initLoadModelFromList = function() {
	//	var selReg = $('#selectLoadPrModel option:selected').text();
	//	var selModel = $('#selectLoadPrModel option:selected').text();		
	//};
	
	app.resetLoadModel = function() {
		// Reset load model menu to default state
		$("#modelInstructions").html("Select an option.");
		$("#loadModelFromMap").hide();
		$("#loadModelFromList").hide();
		$("#editRadios10").show();
		$("#editRadios11").show();
		$("#optionsRadios10:checked").prop("checked",false);
		$("#optionsRadios11:checked").prop("checked",false);
		$("#selectLoadPrModel").prop('disabled', true);
		$("#modelResultsSummary").html("Summary");
		$("#modelResultsSumTotals").html("Totals");
		$("#modelResults").hide();
		$("#loadModelStatus").html("");
		$("#modelResultsIndividual").html("");
		
		if (prModelPoly) {
			$.when(app.removeMapLayer(prModelPoly.id, function(callback) {
			$.when(app.removeMapLayer(prModelPoint.id, function(callback) {
				esri.hide(loading);
				prModelPoly = null;
				prModelPoint = null;
			}));
		}));
		}
		
		if (imageServiceLayer) {
			map.removeLayer(imageServiceLayer);
			imageServiceLayer = null;
			var tocIndex = 0;
			toc.layerInfos.forEach(function(i) {
				if(i.title === appConfig.LAYER_NAME_PRIORITIZ_HEATMAPS) { 
					toc.layerInfos.splice(tocIndex,1);
					toc.refresh();
					//callback("complete");
				} else {
					tocIndex += 1;
				}
			});
		}
		
		ftrLayer = null;
		pointFtrLayer = null;
		map.graphics.clear();
	};
	
	app.loadModel = function(prioritizAreaID, modelFtrName) {
		// Load prioritization area model. Called after the prioritization area and model name have been identified.
		if (clusterLayer) {
			clusterLayer.setVisibility(false); // automatically turn off clustered point layer
		}
		if (heatmapLyrIndex) {
			layers[heatmapLyrIndex].layer.setVisibility(false);
		}
		
		/*if ($("#optionsRadios5:checked").prop("checked") || $("#optionsRadios4:checked").prop("checked")) {
			// loading the model after a model run.
			app.stopEdit();
			$("#menuPrModel").click();
		}*/
		esri.show(loading);
		//console.log(prioritizAreaID, modelFtrName);
		// Loads a prioritization model - the PrioritizationGrows polygons + related results
		$.when(app.runQuery(appConfig.URL_PRIOR_MODELS, "PrioritizAreaKey = '" + prioritizAreaID + "'", false, function(resModels) {
			//console.log(resModels);
			var modelCount = resModels.features.length;
			if (modelCount === 0) {
				bootbox.alert("No Prioritization Models have been created for this Prioritization Area.");
				esri.hide(loading);
				map.graphics.clear();
				//app.resetLoadModel();
			} else {
				if (modelCount > 1) {
					var selectModel;
					var modelList = "";
					$.each(resModels.features, function(i) {
						modelList += "<option value='" + i + "'>" + resModels.features[i].attributes.ModelRunName + "</option>";
					});
					bootbox.dialog({
						title: "Multiple models exist for this prioritization area. Select one.",
						message: '<select id="selModelList" class="form-control">' +
							modelList +
							'</select>',
						buttons: {
							success: {
								label: "Proceed",
								callback: function() {
									selectModel = $("#selModelList").val();
									//console.log(selectModel);
									selectModelName = resModels.features[selectModel].attributes.ModelRunName;
									if (resModels.features[selectModel].attributes.ModelRunCompleted) {
										$.when(app.runQuery(appConfig.URL_PRIOR_MODELS_SUMMARY, "ModelRunKey = '" + resModels.features[selectModel].attributes.ModelRunKey + "'", false, function(resSummary) {
											showResults(resSummary.features[0].attributes);
										}));
									} else {
										bootbox.alert("Modeling is still processing for this Prioritization Model. Please try again later.");
										map.graphics.clear();
										esri.hide(loading);
									}
									
								}
							}
						}
					});
				} else {
					selectModelName = resModels.features[0].attributes.ModelRunName;
					if (resModels.features[0].attributes.ModelRunCompleted) {
						$.when(app.runQuery(appConfig.URL_PRIOR_MODELS_SUMMARY, "ModelRunKey = '" + resModels.features[0].attributes.ModelRunKey + "'", false, function(resSummary) {
							showResults(resSummary.features[0].attributes);
						}));
					} else {
						bootbox.alert("Modeling is still processing for this Prioritization Model. Please try again later.");
					}
	
				}
			}
		}));
		
		
		function showResults(sumAttr) {
			loadedModelResults = sumAttr;
			console.log(sumAttr);
			$("#modelResults").show();
			
			// Loop through the input factors and create a drop down for displaying points by each
			var inputList = [];
			inputList += "<option value='0'>Weighted Average Score</option>";
			for (i = 1; i < appConfig.PRIOR_MODEL_NUM_FACTORS + 1; i++) { 
				var attrRecord = sumAttr["Input" + i + "DataSourceName"];
			    if (!(attrRecord === "")) {
			    	//console.log(attrRecord);
			    	inputList += "<option value='" + i + "'>" + attrRecord + "</option>";
			    }
			}
			$("#modelDisplayBy").html(inputList);
			
			// Generate short summary of model results
			var modelSummary = ""
				+ "Prioritization Area: <b> " + modelFtrName + "</b><br/>"
				+ "Model Name: <b> " + selectModelName + "</b><br/><br/>";
			$("#modelResultsSummary").html(modelSummary);
			
			var totalsSummary = ""
				+ "Totals:"
				+ "<dl class='dl-horizontal'>"
				+ "<dt>Total Grow Count</dt><dd>" + sumAttr.NumGrows + "</dd>"
				+ "<dt>Outdoor Grows</dt><dd>" + sumAttr.NumOutdoorGrows + "</dd>"
				+ "<dt>Greenhouse Grows</dt><dd>" + sumAttr.NumGreenHouseGrows + "</dd>"
				+ "<dt>Total Grow Acreage</dt><dd>" + app.numberWithCommas(sumAttr.TotalAcreageGrows) + "</dd>"
				+ "</dl>";
			$("#modelResultsSumTotals").html(totalsSummary);

			$.when(app.createAppendedLayer(appConfig.URL_PRIOR_MODELS_RESULTS, appConfig.URL_PRIOR_MODELS_RESULTS_RELATE, "ModelRunKey='" + sumAttr.ModelRunKey + "'", "PrioritizGrowKey", selectModelName, function(complete) {
				
				$.when(app.polyToPointLayer(selectModelName + " - point", appConfig.URL_PRIOR_MODELS_RESULTS, "ModelRunKey='" + sumAttr.ModelRunKey + "'", appConfig.URL_PRIOR_MODELS_RESULTS_RELATE, "ModelRunKey='" + sumAttr.ModelRunKey + "'", "PrioritizGrowKey", function(ptCallback) {
					
					app.updateRenderer();
					$("#optionsRadios10:checked").prop("checked",false);
					$("#optionsRadios11:checked").prop("checked",false);
					$("#editRadios10").hide();
					$("#editRadios11").hide();
					$("#loadModelFromList").hide();
					$("#loadModelStatus").html("Prioritization Model Loaded.");
					$("#modelInstructions").show();
					$("#modelInstructions").html("Prioritization Model Loaded.<br/>Click Reset to remove and start over.");
					app.resetPopup();
					//app.zoomToLayerExtent(selectModelName);
					esri.hide(loading);
					//layers[growLyrIndex].layer.setVisibility(false);
					//layers[growLocLyrIndex].layer.setVisibility(false);
					map.graphics.clear();
					
					app.loadModelHeatMap("Name = 'CIPS_PrioritizModel_"+ sumAttr.ModelRunKey + "'");
					
				}));
			}));
		}
	};
	
	app.loadModelHeatMap = function(defExpr) {
	// Loading a prioritization model - add the Heat Map for this model
		
		// check to make sure an existing heat map layer isn't loaded. If it is, remove it.
		if (imageServiceLayer) {
			map.removeLayer(imageServiceLayer);
			imageServiceLayer = null;
			var tocIndex = 0;
			toc.layerInfos.forEach(function(i) {
				if(i.title === appConfig.LAYER_NAME_PRIORITIZ_HEATMAPS) { 
					toc.layerInfos.splice(tocIndex,1);
					toc.refresh();
					//callback("complete");
				} else {
					tocIndex += 1;
				}
			});
		}
		
		var params = new ImageServiceParameters();
        params.noData = 0;
        
        imageServiceLayer = new ArcGISImageServiceLayer(appConfig.URL_PRIOR_MODELS_HEATMAP, {
          imageServiceParameters: params,
          opacity: 0.75
        });
        
        console.log(imageServiceLayer);
        
        map.addLayer(imageServiceLayer);
        modelHeatMapLayer = imageServiceLayer;
        
        map.addLayers([imageServiceLayer]);
		/*toc.layerInfos.push({
			"layer" : imageServiceLayer,
			"title" : "Prioritization Model Heat Map"
		});
		toc.refresh();*/
		
		// Use the definition expression to identify the unique heat map for the Prior Model.
        if (defExpr) {
        	imageServiceLayer.setDefinitionExpression(defExpr);
        }
	};
	
	app.togglePrFactor = function(option) {
		// Show or hide individual prioritization model factor source layers
		switch(option) {
			case true:
				console.log("true", $("#modelDisplayBy option:selected").html());
			break;
			case false:
				console.log("false", $("#modelDisplayBy option:selected").html());
			break;
		}
	};
	
	app.updateModelSummary = function() {
		var selFactor = $("#modelDisplayBy").val();
		
		//if (selFactor === "0") {
		//	$("#modelResultsIndividual").html("");
		//} else {
			var level1Grows = loadedModelResults["NumGrowsInput" + selFactor + "Level1"];
			var level2Grows = loadedModelResults["NumGrowsInput" + selFactor + "Level2"];
			var level3Grows = loadedModelResults["NumGrowsInput" + selFactor + "Level3"];
			
			var factorSummary = ""
					+ "Total Grow Count by Selected Factor:"
					+ "<dl class='dl-horizontal'>"
					+ "<dt>Threat Level 1</dt><dd>" + level1Grows + "</dd>"
					+ "<dt>Threat Level 2</dt><dd>" + level2Grows + "</dd>"
					+ "<dt>Threat Level 3</dt><dd>" + level3Grows + "</dd>"
					+ "</dl>";
			$("#modelResultsIndividual").html(factorSummary);
		//}
	};
	
	app.createAppendedLayer = function(featureUrl, relateUrl, qryWhere, relateField, featureName, callback) {
		var ftrLayer, relateLayer;

		$.when(app.runQuery(featureUrl, qryWhere, true, function(qryResultsLyr) {
			ftrLayer = qryResultsLyr;
			$.when(app.runQuery(relateUrl, qryWhere, false, function(qryResultsRelate) {
				relateLayer = qryResultsRelate;

				$.extend(ftrLayer.fields, relateLayer.fields);
				var relateLayerAttr = [];
				var threat1 = 0, threat2 = 0, threat3 = 0;
				relateCount = 0;
				
				$.each(relateLayer.features, function(i) {
					relateLayerAttr.push(relateLayer.features[i].attributes);
					
					// Dynamically counting the totals for the Weighted Average Score since this isn't done in the summary table
					var valWtAveScore = relateLayer.features[i].attributes.WtAveScore;
					if (valWtAveScore < 2) {
						threat1 += 1;
					};
					if (valWtAveScore >= 2 && valWtAveScore < 3) {
						threat2 += 1;
					};
					if (valWtAveScore >= 3) {
						threat3 += 1;
					};
				});
				
				// Adding the totals to the object used for displaying summary totals.
				loadedModelResults.NumGrowsInput0Level1 = threat1;
				loadedModelResults.NumGrowsInput0Level2 = threat2;
				loadedModelResults.NumGrowsInput0Level3 = threat3;
				
				//console.log(threat1, threat2, threat3);

				$.each(ftrLayer.features, function(i) {
					var relateId = ftrLayer.features[i].attributes[relateField];
					var relateObjects = $.grep(relateLayerAttr, function(item) {
						return item[relateField] === relateId;
					});
					$.extend(ftrLayer.features[i].attributes, ftrLayer.features[i].attributes, relateObjects[0]);
				});
				
				testvar = ftrLayer.features;

				$.when(app.createPolyFC(featureName, ftrLayer, function(createdFC) {
					//console.log(createdFC);
					$.when(app.addToFeature(createdFC, ftrLayer, function(addedFeature) {
						//console.log("Create feature complete: ", addedFeature);
						//addLayers.push(addedFeature);
						
						$.each(addedFeature.fields, function(i) {
							var fldName = addedFeature.fields[i].name;
							$('#frmModelFields').append($('<option>', {
								value : fldName
							}).text(fldName));
						});

						callback("Load Complete");
					}));
				}));
			}));
		}));
	}; 

	app.createPolyFC = function(fcTitle, qryResults, callback) {
		
		if (!(fcTitle)) {
			fcTitle = "Poly Layer";
		}
		
		var featureCollection = {
			"layerDefinition" : null,
			"featureSet" : { "features" : [], "geometryType" : "esriGeometryPoly"}
		};
		featureCollection.layerDefinition = {
			"geometryType" : "esriGeometryPolygon",
			"objectIdField" : "ObjectID",
			/*"drawingInfo" : {
				"renderer" : {
					"type" : "simple",
					"symbol" : {
						"type" : "esriPMS",
						"url" : "http://static.arcgis.com/images/Symbols/Basic/RedSphere.png",
						//"imageData" : "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAAB3VJREFUeF7tmPlTlEcexnve94U5mANQbgQSbgiHXHINlxpRIBpRI6wHorLERUmIisKCQWM8cqigESVQS1Kx1piNi4mW2YpbcZONrilE140RCTcy3DDAcL/zbJP8CYPDL+9Ufau7uqb7eZ7P+/a8PS8hwkcgIBAQCAgEBAICAYGAQEAgIBAQCAgEBAICAYGAQEAgIBAQCDx/AoowKXFMUhD3lQrioZaQRVRS+fxl51eBTZUTdZ41U1Rox13/0JF9csGJ05Qv4jSz/YPWohtvLmSKN5iTGGqTm1+rc6weICOBRbZs1UVnrv87T1PUeovxyNsUP9P6n5cpHtCxu24cbrmwKLdj+osWiqrVKhI0xzbmZ7m1SpJ+1pFpvE2DPvGTomOxAoNLLKGLscZYvB10cbYYjrJCb7A5mrxleOBqim+cWJRakZY0JfnD/LieI9V1MrKtwokbrAtU4Vm0A3TJnphJD4B+RxD0u0LA7w7FTE4oprOCMbklEGNrfdGf4IqnQTb4wc0MFTYibZqM7JgjO8ZdJkpMln/sKu16pHZGb7IfptIWg389DPp9kcChWODoMuDdBOhL1JgpisbUvghM7AqFbtNiaFP80RLnhbuBdqi0N+1dbUpWGde9gWpuhFi95yL7sS7BA93JAb+Fn8mh4QujgPeTgb9kAZf3Apd2A+fXQ38yHjOHozB1IAJjOSEY2RSIwVUv4dd4X9wJccGHNrJ7CYQ4GGjLeNNfM+dyvgpzQstKf3pbB2A6m97uBRE0/Ergcxr8hyqg7hrwn0vAtRIKIRX6Y2pMl0RhIj8co9nBGFrvh55l3ngU7YObng7IVnFvGS+BYUpmHziY/Ls2zgP9SX50by/G9N5w6I+ogYvpwK1SoOlHQNsGfWcd9Peqof88B/rTyzF9hAIopAByQzC0JQB9ST5oVnvhnt+LOGsprvUhxNIwa0aY7cGR6Cp7tr8+whkjawIxkRWC6YJI6N+lAKq3Qf/Tx+B77oGfaQc/8hB8w2Xwtw9Bf3kzZspXY/JIDEbfpAB2BKLvVV90Jvjgoac9vpRxE8kciTVCBMMkNirJ7k/tRHyjtxwjKV4Yp3t/6s+R4E+/DH3N6+BrS8E314Dvvg2+/Sb4hxfBf5sP/up2TF3ZhonK1zD6dhwGdwail26DzqgX8MRKiq9ZBpkSkmeYOyPM3m9Jjl+1Z9D8AgNtlAq6bZ70qsZi+q+bwV/7I/hbB8D/dAr8Axq89iz474p/G5++koHJy1sx/lkGdBc2YjA3HF0rHNHuboomuQj/5DgclIvOGCGCYRKFFuTMV7YUAD3VDQaLMfyqBcZORGPy01QKYSNm/rYV/Nd/Av9NHvgbueBrsjDzRQamKKDxT9Kgq1iLkbIUDOSHoiNcgnYHgnYZi+9ZExSbiSoMc2eE2flKcuJLa4KGRQz6/U0wlGaP0feiMH4uFpMXEjBVlYjp6lWY+SSZtim0kulYMiYuJEJXuhTDJ9UYPByOvoIwdCxfgE4bAo0Jh39xLAoVpMwIEQyTyFCQvGpLon9sJ0K3J4OBDDcMH1dj9FQsxkrjMPFRPCbOx2GyfLal9VEcxstioTulxjAFNfROJPqLl6Bnfyg6V7ugz5yBhuHwrZjBdiU5YJg7I8wOpifAKoVIW7uQ3rpOBH2b3ekVjYT2WCRG3o+mIGKgO0OrlIaebU/HYOQDNbQnojB4NJyGD0NPfjA0bwTRE6Q7hsUcWhkWN8yZqSQlWWGECAZLmJfJmbrvVSI8taK37xpbdB/wQW8xPee/8xIGjvlj8IQ/hk4G0JbWcX8MHPVDX4kveoq8ocn3xLM33NCZRcPHOGJYZIKfpQyq7JjHS6yJjcHujLHADgkpuC7h8F8zEVqXSNC2awE69lqhs8AamkO26HrbDt2H7dBVQov2NcW26CiwQtu+BWjdY4n2nZboTbfCmKcCnRyDO/YmyLPnDlHvjDH8G6zhS9/wlEnYR7X00fWrFYuWdVI0ZpuhcbcczW/R2qdAcz6t/bRov4mONeaaoYl+p22rHF0bVNAmKtBvweIXGxNcfFH8eNlC4m6wMWMusEnKpn5hyo48pj9gLe4SNG9QoGGLAk8z5XiaJUd99u8122/IpBA2K9BGg2vWWKAvRYVeLzEa7E1R422m2+MsSTem97nSYnfKyN6/mzATv7AUgqcMrUnmaFlLX3ysM0fj+t/b5lQLtK22QEfyAmiSLKFZpUJ7kBRPXKW4HqCYynWVHKSG2LkyZex1uO1mZM9lKem9Tx9jjY5iNEYo0bKMhn7ZAu0r6H5PpLXCAq0rKJClSjSGynE/QIkrQYqBPe6S2X+AJsY2Ped6iWZk6RlL0c2r5szofRsO9R5S1IfQLRCpQL1aifoYFerpsbkuTImaUJXuXIDiH6/Ys8vm3Mg8L2i20YqsO7fItKLcSXyn0kXccclVqv3MS6at9JU/Ox+ouns+SF6Z4cSupz7l8+z1ucs7LF1AQjOdxfGZzmx8Iu1TRcfnrioICAQEAgIBgYBAQCAgEBAICAQEAgIBgYBAQCAgEBAICAQEAv8H44b/6ZiGvGAAAAAASUVORK5CYII=",
						"width" : 15,
						"height" : 15
					}
				}
			},*/
			"fields" : [
				{ "name" : "ObjectID", "alias" : "ObjectID", "type" : "esriFieldTypeOID" }
			]
		};
		
		featureInfoTemplate = new InfoTemplate();
		featureInfoTemplate.setTitle(fcTitle);
		var featureInfoTemplateContent = "";
		
		$.each(qryResults.fields, function(i) { 
			//pointFeature.fields.push(qryResults.fields[i]);
			featureCollection.layerDefinition.fields.push(qryResults.fields[i]);
			featureInfoTemplateContent += "'" + qryResults.fields[i].name + ": ${" + qryResults.fields[i].name + "}<br/>'";
		});
		
		polyFeature = new FeatureLayer(featureCollection, { id: fcTitle , mode: FeatureLayer.MODE_SNAPSHOT});
		polyFeature.infoTemplate =  featureInfoTemplate;
		
		callback(polyFeature);
			
	};
	
	app.addToFeature = function(addFeature, qryResults, callback) {
		var graphic;
		$.each(qryResults.features, function(i) {
			graphic = new Graphic(qryResults.features[i].geometry);
			graphic.setAttributes(qryResults.features[i].attributes);
			addFeature.add(graphic);//, null, null, featureInfoTemplate);		
		});
		
		addFeature.setMinScale(72000);
		map.addLayers([addFeature]);
		prModelPoly = addFeature;
		//console.log("addFeature: ", addFeature);
		toc.layerInfos.push({
			"layer" : addFeature,
			"title" : addFeature.id
		});
		toc.refresh();
		callback(addFeature);
		
	};
	
	app.removeMapLayer = function(layerName, callback) {
		// remove an added layer from map
		var layerToRemove = map.getLayer(layerName);
		map.removeLayer(layerToRemove);
		// remove an added layer from TOC
		var tocIndex = 0;
		toc.layerInfos.forEach(function(i) {
			if(i.title === layerName) { 
				toc.layerInfos.splice(tocIndex,1);
				toc.refresh();
				callback("complete");
			} else {
				tocIndex += 1;
			}
		});
		
	};
	
	app.updateRenderer = function() {
		app.classBreakRendererPoly("Input" + $("#modelDisplayBy").val() + "PreProcScore", prModelPoly);
		app.classBreakRendererPoint("Input" + $("#modelDisplayBy").val() + "PreProcScore", prModelPoint);
		app.updateModelSummary();
		if ($("#modelDisplayBy").val() === "0") {
			$("#factor-toggle").bootstrapToggle("off");
			$("#factor-toggle").prop("disabled", true).change();
		} else {
			$("#factor-toggle").bootstrapToggle("off");
			$("#factor-toggle").prop("disabled", false).change();
		}
	};
	
	app.classBreakRendererPoly = function(renderField, renderLayer) {
		if (renderField === "Input0PreProcScore" || renderField === "WtAveScore") {
			renderField = "WtAveScore";
			// simple class break renderer with 3 classes
			var symbol = new SimpleFillSymbol();
			symbol.setColor(new Color([150, 150, 150, 0.5]));
			var renderer = new ClassBreaksRenderer(symbol, renderField);
	        /*renderer.addBreak(1, 1.5, new SimpleFillSymbol().setColor(new Color([255,182,14, 0.6])));
	        renderer.addBreak(1.5, 2, new SimpleFillSymbol().setColor(new Color([255,146,0, 0.6])));
	        renderer.addBreak(2, 2.5, new SimpleFillSymbol().setColor(new Color([230,19,19, 0.6])));
	        renderer.addBreak(2.5, 3, new SimpleFillSymbol().setColor(new Color([168,41,41, 0.6])));*/
	        var val1 = new SimpleFillSymbol();
				val1.setColor(new Color([255,146,0, 0.6]));
				val1.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([245,136,0, 0.3]), 5));
	        	renderer.addBreak(1, 2, val1);
	        var val2 = new SimpleFillSymbol();
	        	val2.setColor(new Color([230,19,19, 0.6]));
				val2.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([240,9,9, 0.3]), 5));
	        	renderer.addBreak(2, 3, val2);
	        var val3 = new SimpleFillSymbol();
		        val3.setColor(new Color([168,41,41, 0.6]));
				val3.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([158,31,31, 0.3]), 5));
		        renderer.addBreak(3, 4, val3);
	        // customizing the toc labels:
	        renderer.infos[0].label = "1";
	        renderer.infos[1].label = "2";
	        renderer.infos[2].label = "3";
	        renderLayer.setRenderer(renderer);
	        renderLayer.refresh();
	        toc.refresh();
		} else {
			var symbol = new SimpleFillSymbol();
			symbol.setColor(new Color([150, 150, 150, 0.5]));
			var renderer = new UniqueValueRenderer(symbol, renderField);
			var val1 = new SimpleFillSymbol();
				val1.setColor(new Color([255,146,0, 0.6]));
				val1.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([245,136,0, 0.3]), 5));
	        	renderer.addValue(1, val1);
	        var val2 = new SimpleFillSymbol();
	        	val2.setColor(new Color([230,19,19, 0.6]));
				val2.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([240,9,9, 0.3]), 5));
	        	renderer.addValue(2, val2);
	        var val3 = new SimpleFillSymbol();
		        val3.setColor(new Color([168,41,41, 0.6]));
				val3.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([158,31,31, 0.3]), 5));
		        renderer.addValue(3, val3);
	        //renderer.addValue(2, new SimpleFillSymbol().setColor(new Color([230,19,19, 0.6])));
	        //renderer.addValue(3, new SimpleFillSymbol().setColor(new Color([168,41,41, 0.6])));
	        //console.log(renderer);
	        renderLayer.setRenderer(renderer);
	        renderLayer.refresh();
	        toc.refresh();
		}
	};
	
	app.classBreakRendererPoint = function(renderField, renderLayer) {
		if (renderField === "Input0PreProcScore" || renderField === "WtAveScore") {
			renderField = "WtAveScore";
			var ptSymbol = new SimpleMarkerSymbol();
	        ptSymbol.setColor(new Color([150, 150, 150, 0.5]));
			var renderer = new ClassBreaksRenderer(ptSymbol, renderField);
	        renderer.addBreak(1, 2, new SimpleMarkerSymbol('circle', 8, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,146,0, 0.25]), 6), new Color([255,146,0, 0.9])));
	        renderer.addBreak(2, 3, new SimpleMarkerSymbol('circle', 8, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([230,19,19, 0.25]), 6), new Color([230,19,19, 0.9])));
	        renderer.addBreak(3, 4, new SimpleMarkerSymbol('circle', 9, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([168,41,41, 0.25]), 7), new Color([168,41,41, 0.9])));
	        // customizing the toc labels:
	        renderer.infos[0].label = "1";
	        renderer.infos[1].label = "2";
	        renderer.infos[2].label = "3";
	        renderLayer.setRenderer(renderer);
	        renderLayer.refresh();
	    	toc.refresh();
		} else {
			var ptSymbol = new SimpleMarkerSymbol();
	        ptSymbol.setColor(new Color([150, 150, 150, 0.5]));
			var renderer = new UniqueValueRenderer(ptSymbol, renderField);
			renderer.addValue(1, new SimpleMarkerSymbol('circle', 8, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,146,0, 0.25]), 6), new Color([255,146,0, 0.9])));
	        renderer.addValue(2, new SimpleMarkerSymbol('circle', 8, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([230,19,19, 0.25]), 6), new Color([230,19,19, 0.9])));
	    	renderer.addValue(3, new SimpleMarkerSymbol('circle', 9, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([168,41,41, 0.25]), 7), new Color([168,41,41, 0.9])));
			renderLayer.setRenderer(renderer);
	        renderLayer.refresh();
	        toc.refresh();
	   }
	};
	
	app.polyToPointLayer = function(newLyrName, polyUrl, queryParams, relateUrl, queryParamsRelate, relateField, callback) {
		// This function takes an input polygon feature service and converts to a point featureCollection, adding it to the map.
		// Query the poly feature service to get the returned objects
		$.when(app.runQuery(polyUrl, queryParams, true, function(qryResultsLyr) {
			$.when(app.appendRecsToPoint(relateUrl, queryParamsRelate, qryResultsLyr, relateField, function(ftrLayerCallback) {
				var ftrLayer = ftrLayerCallback;

				// Create the point featureCollection template
				var featureCollection = {
					"layerDefinition" : null,
					"featureSet" : {
						"features" : [],
						"geometryType" : "esriGeometryPoint"
					}
				};
				featureCollection.layerDefinition = {
					"geometryType" : "esriGeometryPoint",
					"objectIdField" : "ObjectID",
					"drawingInfo" : {
						"renderer" : {
							"type" : "simple",
							"symbol" : {
								"type" : "esriPMS",
								"url" : "http://static.arcgis.com/images/Symbols/Basic/RedSphere.png",
								"contentType" : "image/png",
								"width" : 15,
								"height" : 15
							}
						}
					},
					"fields" : [
						{ "name" : "ObjectID", "alias" : "ObjectID", "type" : "esriFieldTypeOID" }
					]
				};

				$.each(ftrLayer.fields, function(i) {
					featureCollection.layerDefinition.fields.push(ftrLayer.fields[i]);
				});

				//create a feature layer based on the feature collection
				var pointFtrLayer = new FeatureLayer(featureCollection, {
					id : newLyrName
				});

				//associate the features with the popup on click
				pointFtrLayer.on("click", function(evt) {
					map.infoWindow.setFeatures([evt.graphic]);
				});

				//map.on("layers-add-result", function(results) {
				//	loadData();
				//});

				map.addLayers([pointFtrLayer]);
				loadData();
				toc.layerInfos.push({
					"layer" : pointFtrLayer,
					"title" : pointFtrLayer.id
				});
				toc.refresh();
				//console.log("addLayers: ", pointFtrLayer);
				
				function loadData() {
					var features = [];
					var count = 0;
					$.each(qryResultsLyr.features, function(i) {
						var geom = qryResultsLyr.features[i].geometry.getCentroid();
						var graphic = new Graphic();
						graphic.setAttributes(qryResultsLyr.features[i].attributes);
						graphic.geometry = geom;
						features.push(graphic);
						count = count + 1;
						if (count == qryResultsLyr.features.length) {
							//testObj = features;
							pointFtrLayer.applyEdits(features, null, null);
							var popupInfo = generateDefaultPopupInfo(featureCollection);
							var infoTemplate = new InfoTemplate(buildInfoTemplate(popupInfo));
							pointFtrLayer.infoTemplate = infoTemplate;
							
							pointFtrLayer.setMaxScale(72000);
							
							prModelPoint = pointFtrLayer;
							//addPrioritizationLayers[1] = pointFtrLayer;
							callback("point ftr added");
						}
					});
				};
				
				
				function generateDefaultPopupInfo(featureCollection) {
					var fields = featureCollection.layerDefinition.fields;
					var decimal = {
						'esriFieldTypeDouble' : 1,
						'esriFieldTypeSingle' : 1
					};
					var integer = {
						'esriFieldTypeInteger' : 1,
						'esriFieldTypeSmallInteger' : 1
					};
					var dt = {
						'esriFieldTypeDate' : 1
					};
					var displayField = null;
					var fieldInfos = arrayUtil.map(fields, lang.hitch(this, function(item) {
						if (item.name.toUpperCase() === "NAME") {
							displayField = item.name;
						}
						var visible = (item.type !== "esriFieldTypeOID" && item.type !== "esriFieldTypeGlobalID" && item.type !== "esriFieldTypeGeometry");
						var format = null;
						if (visible) {
							var f = item.name.toLowerCase();
							var hideFieldsStr = ",stretched value,fnode_,tnode_,lpoly_,rpoly_,poly_,subclass,subclass_,rings_ok,rings_nok,";
							if (hideFieldsStr.indexOf("," + f + ",") > -1 || f.indexOf("area") > -1 || f.indexOf("length") > -1 || f.indexOf("shape") > -1 || f.indexOf("perimeter") > -1 || f.indexOf("objectid") > -1 || f.indexOf("_") == f.length - 1 || f.indexOf("_i") == f.length - 2) {
								visible = false;
							}
							if (item.type in integer) {
								format = {
									places : 0,
									digitSeparator : true
								};
							} else if (item.type in decimal) {
								format = {
									places : 2,
									digitSeparator : true
								};
							} else if (item.type in dt) {
								format = {
									dateFormat : 'shortDateShortTime'
								};
							}
						}
						return lang.mixin({}, {
							fieldName : item.name,
							label : item.alias,
							isEditable : false,
							tooltip : "",
							visible : visible,
							format : format,
							stringFieldOption : 'textbox'
						});
					}));
					var popupInfo = {
						title : displayField ? '{' + displayField + '}' : '',
						fieldInfos : fieldInfos,
						description : null,
						showAttachments : false,
						mediaInfos : []
					};
					return popupInfo;
				}

				function buildInfoTemplate(popupInfo) {
					var json = {
						content : "<table>"
					};

					json.content += "<div class='popup-header'>" + newLyrName + "<\/div><div class='popup-hz-line'><\/div>";

					arrayUtil.forEach(popupInfo.fieldInfos, function(field) {
						if (field.visible) {
							json.content += "<tr><td valign='top'>" + field.label + ": <\/td><td valign='top'>${" + field.fieldName + "}<\/td><\/tr>";
						}
					});
					json.content += "<\/table>";
					return json;
				}
			}));
		}));
	};
	
	app.appendRecsToPoint = function(relateUrl, queryParamsRelate, ftrLayer, relateField, callback) {
		// Called from app.polyToPointLayer, This appends related records to the point feature being created from a poly
		//  in a separate function to force syncronous behavior
		if (relateUrl) {
			// If relateUrl is given, append records
			$.when(app.runQuery(relateUrl, queryParamsRelate, false, function(qryResultsRelate) {
				var relateLayer = qryResultsRelate;
				$.extend(ftrLayer.fields, relateLayer.fields);
				var relateLayerAttr = [];
				$.each(relateLayer.features, function(i) {
					relateLayerAttr.push(relateLayer.features[i].attributes);
				});

				$.each(ftrLayer.features, function(i) {
					var relateId = ftrLayer.features[i].attributes[relateField];
					var relateObjects = $.grep(relateLayerAttr, function(item) {
						return item[relateField] === relateId;
					});
					$.extend(ftrLayer.features[i].attributes, ftrLayer.features[i].attributes, relateObjects[0]);

				});
				callback(ftrLayer);
			}));
		} else {
			// no relateUrl, no appending of records, just go back to parent function
			callback(ftrLayer);
		}
	}; 
	
	app.zoomToLayerExtent  = function(layerName) {
		var extentLayer = map.getLayer(layerName);
		var lyrExtent = esri.graphicsExtent(extentLayer.graphics);
		var newExtent = lyrExtent.expand(1.75);
		map.setExtent(newExtent);
	};
    
    // -- Section 9: Authentication ----------------------------------------------------
        
	// Authentication - when services come from ArcGIS Online
		if (appConfig.AUTH === "arcgisonline") {
			var info = new OAuthInfo({
				appId : appConfig.APPID,
				popup : false
			});
			esriId.registerOAuthInfos([info]);
	
			esriId.checkSignInStatus(info.portalUrl + "/sharing").then(
				function (){
					// User is signed in, show content
					$("#appContent").show();
					$("#appInit").hide();
					$("#sign-out").show();
					$("#about-cips").show();
					$("#open-editor").show();
					$("#open-modeler").show();
					app.initStats();
			    	app.buildMap();
				 }
			).otherwise(
				function (){
					// user is not signed in, show login content
					$("#appContent").html("");
					$("#appContent").hide();
					$("#appInit").show();
					$("#sign-out").hide();
					$("#about-cips").hide();
					$("#open-editor").hide();
					$("#sign-in").show();
					//$.unblockUI();
				 }
			);
	
			on(dom.byId("sign-in"), "click", function() {
				// user will be shown the OAuth Sign In page
				esriId.getCredential(info.portalUrl, {
					oAuthPopupConfirmation : false
				}).then(function() {
                    // After user signs in from the OAuth page, they will be redirected back to this one, with credentials
				});
			});
	
			on(dom.byId("sign-out"), "click", function() {
				esriId.destroyCredentials();
				window.location.reload();
			});
		}
	
		// Authentication - when services come from ArcGIS for Server
		if (appConfig.AUTH === "arcgisserver") {
	
			var idJson, idObject;
	
			esriId.on("credential-create", function() {
				storeCredentials();
			});
			if (supports_local_storage()) {
				// read from local storage
				idJson = window.localStorage.getItem(cred);
			} else {
				// read from a cookie
				idJson = cookie(cred);
			}
	
			if (idJson && idJson != "null" && idJson.length > 4) {
				idObject = JSON.parse(idJson);
				esriId.initialize(idObject);
                // User is signed in, show content
                $("#appContent").show();
                $("#appInit").hide();
                $("#sign-out").show();
                $("#about-cips").show();
                $("#open-editor").show();
                app.initStats();
                app.buildMap();
	
			} else {
                // user is not signed in, show login content
                $("#appContent").html("");
                $("#appContent").hide();
                $("#appInit").show();
                $("#sign-out").hide();
                $("#about-cips").hide();
                $("#open-editor").hide();
                $("#sign-in").show();
			}
	
			on(dom.byId("sign-in"), "click", function() {
               $("#appContent").show();
               $("#appInit").hide();
               $("#sign-out").show();
               $("#about-cips").show();
               $("#open-editor").show();
               app.initStats();
               app.buildMap();
            });
	
			on(dom.byId("sign-out"), "click", function() {
				esriId.destroyCredentials();
				localStorage.esri_jsapi_id_manager_data = null;
				window.location.reload();
			});
	
		}
	
		// Functions for ArcGIS for Server authentication --------------------------------
		function storeCredentials() {
			// make sure there are some credentials to persist
			if (esriId.credentials.length === 0) {
				return;
			}
	
			// serialize the ID manager state to a string
			var idString = JSON.stringify(esriId.toJson());
			// store it client side
			if (supports_local_storage()) {
				// use local storage
				window.localStorage.setItem(cred, idString);
				// console.log("wrote to local storage");
			} else {
				// use a cookie
				cookie(cred, idString, {
					expires : 1
				});
			}
	
			$('#personalizedPanel').css("display", "block");
			$('#anonymousPanel').css("display", "none");
	
		}
	
		function supports_local_storage() {
			try {
				return "localStorage" in window && window["localStorage"] !== null;
			} catch (e) {
				return false;
			}
		}

    // -- Section 10: Page Ready ----------------------------------------------------
        
    $(document).ready(function() {

		$.unblockUI();
		
		// resize the max height of the map toolbar contents
		$(window).resize(function () {
			var subHeight = $("#summary-container").height() + $("#header-container").height() + $("#ribbonTabs").height() + 10;
		    $('.tab-pane').css("max-height", (($(window).height()) - subHeight));
		});

        $('#mapNavPrev').on('click', function() {
            mapNav.zoomToPrevExtent();
        });
        $('#mapNavNext').on('click', function() {
            mapNav.zoomToNextExtent();
        });
        $('#mapNavFull').on('click', function() {
            map.setExtent(new Extent(appConfig.INIT_EXTENT), true);
        });
        $('#about-cips').on('click', function() {
            bootbox.alert(appConfig.ABOUT_TEXT);
        });
        $("#sumWshd-toggle").change(function() {
	    	app.summarizeWshd($(this).prop("checked"));
	    });
	    $("#sumSite-toggle").change(function() {
	    	app.summarizeSite($(this).prop("checked"));
	    });
	    
	    // show or hide a loaded prioritization model heat map
	    $("#heatmap-toggle").change(function() {
	    	if ($("#heatmap-toggle").prop('checked')) {
	    		imageServiceLayer.setVisibility(true);
	    	} else {
	    		imageServiceLayer.setVisibility(false);
	    	}
	    });
	    
	    $("#factor-toggle").change(function() {
	    	app.togglePrFactor($("#factor-toggle").prop('checked'));
	    });

    });
});
