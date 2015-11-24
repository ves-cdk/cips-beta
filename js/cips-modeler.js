// -- Section 1: Global Variables ----------------------------------------------------
var map, mapDeferred, mapResponse, mapNav, toc, loading; // core map objects
var layers, clickHandler, clickListener, lyrInfoTemplate = []; // used for popups
var clusterLayer, clusterLayerClickHandler; // used for clustered grow location display
var basemapGallery, measurement, tb, epWidget, lineSymbol, timeSlider; // map widgets
var showInfoWindow = "default"; // used to control map behavior based upon selected tool
var cred = "esri_jsapi_id_manager_data"; // cookie/localStorage variable for ArcGIS for Server authentication
var featureCollection, popupInfo, featureInfoTemplate, addLayers = [], renderer, pointFtrLayer, layerFromQuery; // for dynamic layer load and rendering
var editPointSymbol, editLineSymbol, editFillSymbol, graphicTb, addGraphicEvt, editSettings, editorWidget, attInspector, layerInfo; // editing variables
var shapeEditLayer, shapeEditStatus, shapeEditBackup, shapeCollection = [], newFeatureName; // editing variables
var interpLyrIndex, regionLyrIndex; // used for getting onClick results from specific layers
var wshdLyrIndex, interpLyrIndex, interpWshdLyrIndex, regionLyrIndex; // used for getting onClick results from specific layers
var modelParams = ["inputWtSlope", "inputWtCult", "inputWtProx", "inputWtDrink", "inputWtRes", "inputWtWtrright", "inputWtWtrcons", "inputWtCrit", "inputWtSens", "inputWtLSA"];
var modelToggles = ["toggleElev", "toggleCult", "toggleProx", "toggleDrink", "toggleRes", "toggleWtrright", "toggleWtrcons", "toggleCrit", "toggleSens", "toggleLSA"];
var geometryService;
var token; // passed when write requires authentication
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
    "esri/geometry/webMercatorUtils",
    "esri/geometry/Extent",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon", 
    "esri/renderers/ClassBreaksRenderer",
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
    "esri/SnappingManager",
    "esri/symbols/CartographicLineSymbol",
    "esri/arcgis/Portal", 
    "esri/arcgis/OAuthInfo", 
    "esri/IdentityManager",
    //"esri/dijit/editing/Editor",
    "esri/toolbars/edit",
    "esri/dijit/AttributeInspector",
    //"./js/ClusterLayer.js", 
    //"./js/clusterfeaturelayer.js",
    "./js/lib/ClusterFeatureLayer.js",
    "./js/lib/bootstrapmap.js",
    "dojo/dom", "dojo/on", "dojo/_base/array", "dojo/_base/lang", "dojo/_base/connect", "dojo/_base/event", "./js/agsjs/dijit/TOC.js", "dojo/domReady!"], 

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
	webMercatorUtils, 
	Extent,  
	Point,
	Polyline,
	Polygon,
    ClassBreaksRenderer, 
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
    SnappingManager,
    CartographicLineSymbol,
    arcgisPortal, 
    OAuthInfo, 
    esriId, 
    //Editor,
    Edit,
    AttributeInspector,
    //ClusterLayer,
    ClusterFeatureLayer,
    BootstrapMap,
    dom, on, arrayUtil, lang, Connect, event, TOC) {
    
    // -- Section 3: On-Load Settings -------------------------------------------------------------
    
    document.title = appConfig.APP_NAME_HTML_TITLE;
    
    var app = dojo.getObject('app', true); // global object to allow function calls from the app.
    
    geometryService = new GeometryService(appConfig.GEOMETRY_SERVICE);
    
    // Proxy settings
    //esriConfig.defaults.geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    esriConfig.defaults.io.alwaysUseProxy = false;
    esriConfig.defaults.io.corsEnabledServers.push("tasks.arcgisonline.com");
    esriConfig.defaults.io.corsEnabledServers.push("mapserver2.vestra.com");
    esriConfig.defaults.io.corsEnabledServers.push("mapserver.vestra.com");    
    esriConfig.defaults.io.corsEnabledServers.push("map.dfg.ca.gov");  
    esriConfig.defaults.io.corsEnabledServers.push("services.arcgis.com");
    esriConfig.defaults.io.corsEnabledServers.push("sampleserver6.arcgisonline.com"); 
    esriConfig.defaults.io.corsEnabledServers.push("http://localhost");  
    esriConfig.defaults.io.timeout = 12000;   
    //esriConfig.defaults.io.proxyUrl = "http://localhost/apps/cipsproxy/DotNet/proxy.ashx";
    
    urlUtils.addProxyRule({
	  urlPrefix: "tasks.arcgisonline.com",
	  proxyUrl: appConfig.PROXY_PAGE
	});
	urlUtils.addProxyRule({
	  urlPrefix: "sampleserver6.arcgisonline.com",
	  proxyUrl: appConfig.PROXY_PAGE
	});
	urlUtils.addProxyRule({
	  urlPrefix: "mapserver.vestra.com",
	  proxyUrl: appConfig.PROXY_PAGE
	});

    // for the map tool container
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
		var toggleButtonHeight = ($('#ribbon-bar-header').height()) + ($('#ribbonTabs').height()) + 10;
		$("#ribbon-bar-toggle").show();
	});
    
    // -- Section 4: Build Map Elements -------------------------------------------------------------

    app.buildMap = function(e) {
    	
    	loading = dojo.byId("mapLoading");
		esri.show(loading);
		
		// getting extent from previous page (if exists). Only has to be done for first map, the rest are based on extent of this map after load
		if (localStorage.extent) {
			var ext = $.parseJSON(localStorage.extent);
			var startExtent = new esri.geometry.Extent(ext.xmin, ext.ymin, ext.xmax, ext.ymax, 
				new esri.SpatialReference({wkid:102100}));
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
              smartNavigation: false
          });

        mapDeferred.then(function(response) {
            
            if (startExtent) {
            	response.map.setExtent(startExtent);
            }
            
            mapResponse = response;
            map = response.map;
            
            // defining the layers allows for access to attributes per layer
            layers = esri.arcgis.utils.getLegendLayers(response);
           	$.each(layers, function(i, lyr) {
            	lyrInfoTemplate.push({infoTemplate: lyr.layer.infoTemplate,lyrTitle: lyr.title});
            	if (i > 0) {
            		lyr.layer.advancedQueryCapabilities.supportsPagination = true;
            	}
            	if (lyr.title === "Watershed Boundaries - HUC12") {
            		wshdLyrIndex = i;
            	}
            	if (lyr.title === "Interpretation Areas") {
            		interpLyrIndex = i;
            	}
            	if (lyr.title === "Interpretation Area Watersheds") {
            		interpWshdLyrIndex = i;
            	}
            	if (lyr.title === "SWRCB Regions") {
            		regionLyrIndex = i;
            	}
            });
 
            clickHandler = response.clickEventHandle;
            clickListener = response.clickEventListener;
            
            map.disableDoubleClickZoom();
            
            on(map, "update-start", function() {
	        	esri.show(loading);
	        });
	    	on(map, "update-end", function() {
	    		esri.hide(loading);
	    	});
	    	on(map, "extent-change", function() {
	    		app.syncMaps(map);
	    	});
	    	
			on(map, "click", function(evt) {
				//console.log("mapclick");
				//esri.show(loading);
				if ($("#optionsRadios1:checked").prop("checked")) {
					//$(".esriPopupWrapper").css("display","none");
					esri.show(loading);
					// User is creating a new Interpretation Area. Changing the map's onClick behavior to only select from the HUC 12 watershed layer.
					//map.infoWindow.clearFeatures();
					var query = new Query();
					query.geometry = evt.mapPoint;
					layers[wshdLyrIndex].layer.queryFeatures(query, function(featureset) {
						//console.log("query results", featureset);
						var evt = featureset.features[0];
						var addOrRemove;
						//console.log(evt);
						var symbol = editFillSymbol;
						var evtID = evt.attributes.OBJECTID;
						var graphicLen = map.graphics.graphics.length;
						var runCount = 0;
						if (graphicLen > 1) {

							$.each(map.graphics.graphics, function(i) {
								runCount += 1;
								if (map.graphics.graphics[i].attributes) {

									var graphID = map.graphics.graphics[i].attributes.OBJECTID;
									//console.log(graphID, evtID);
									if (graphID === evtID) {
										map.graphics.remove(map.graphics.graphics[i]);
										esri.hide(loading);
										addOrRemove = "remove";
										return false;
									}
									if (runCount === graphicLen) {
										if (!(addOrRemove === "remove")) {
											map.graphics.add(new Graphic(evt.geometry, symbol, evt.attributes));
											esri.hide(loading);
										}
									}
								}
							});

						} else {
							map.graphics.add(new Graphic(evt.geometry, symbol, evt.attributes));
							esri.hide(loading);
						}

					});
				}
				
				if ($("#optionsRadios2:checked").prop("checked")) {
					//$(".esriPopupWrapper").css("display","none");
					// User is creating a new Prioritization Area from Interp Area. Change the map's onClick behavior to only select from the HUC 12 watershed layer.
					//map.infoWindow.clearFeatures();
					esri.show(loading);
					var query = new Query();
					query.geometry = evt.mapPoint;
					
					// first query the interp area
					layers[interpLyrIndex].layer.queryFeatures(query, function(featureset) {
						//console.log(featureset);
						if (featureset.features.length === 0) {
							bootbox.alert("Prioritization Areas <b>must</b> fall within existing Interpretation Area boundaries. Please try again.");
							esri.hide(loading);
						} else {
							var evt = featureset.features[0];
							var symbol = editFillSymbol;
							var interpName = evt.attributes.InterpAreaName;
							//console.log(evt);
							map.graphics.add(new Graphic(evt.geometry, symbol, evt.attributes));
							bootbox.confirm(interpName + " was selected. Use this Interpretation Area boundary for your new Prioritization Area?", function(result) {
								if (!(result)) {
									map.graphics.clear();
								} else {
									//bootbox.alert("saving new Prioritization Area."
									// ADD CODE TO SAVE BOUNDARY TO PRIORITIZATON AREA
									app.saveEdits();
								}
							});
							esri.hide(loading);
						}
					});
				};
			
			
			if ($("#optionsRadios3:checked").prop("checked")) {
				esri.show(loading);
				// User is creating a new Prioritization Area. Changing the map's onClick behavior to only select from the HUC 12 watershed layer.
				var query = new Query();
				query.geometry = evt.mapPoint;

				// first query the interp area
				layers[interpLyrIndex].layer.queryFeatures(query, function(featuresetI) {
					//console.log(featureset);
					if (featuresetI.features.length === 0) {
						bootbox.alert("Prioritization Areas <b>must</b> fall within existing Interpretation Area boundaries. Please try again.");
						esri.hide(loading);
					} else {

						layers[wshdLyrIndex].layer.queryFeatures(query, function(featureset) {
							//console.log("query results", featureset);
							var evt = featureset.features[0];
							var addOrRemove;
							//console.log(evt);
							var symbol = editFillSymbol;
							var evtID = evt.attributes.OBJECTID;
							var graphicLen = map.graphics.graphics.length;
							var runCount = 0;
							if (graphicLen > 1) {
								$.each(map.graphics.graphics, function(i) {
									runCount += 1;
									if (map.graphics.graphics[i].attributes) {

										var graphID = map.graphics.graphics[i].attributes.OBJECTID;
										//console.log(graphID, evtID);
										if (graphID === evtID) {
											map.graphics.remove(map.graphics.graphics[i]);
											esri.hide(loading);
											addOrRemove = "remove";
											return false;
										}
										if (runCount === graphicLen) {
											if (!(addOrRemove === "remove")) {
												map.graphics.add(new Graphic(evt.geometry, symbol, evt.attributes));
												esri.hide(loading);
											}
										}
									}
								});
							} else {
								map.graphics.add(new Graphic(evt.geometry, symbol, evt.attributes));
								esri.hide(loading);
							}
						});
					}
				});
			}
			
			}); 

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
    
    // sets the popup results to a single layer, identified with the layer Title passed to the function.
	app.isolatePopup = function(item) {
		//console.log("isolatePopup:", item);
		$.each(layers, function(i, lyr) {
		  //console.log(lyr.title);
		  if (!(lyr.title === item)) {
		    lyr.layer.infoTemplate = null;
		  }
		});
	};
	
	// resets popup results to default for all layers.
	app.resetPopup = function() {
		$.each(layers, function(i, lyr) {
		  //console.log(lyr.title);
		    lyr.layer.infoTemplate = lyrInfoTemplate[i].infoTemplate;
		});
	};
    
    app.buildPopup = function () {
	    // Customize popup behavior when editing features
        var popup = map.infoWindow;
        
        on(popup, "SetFeatures", function() {
        	//esri.show(loading);
        	// loop through edit options to control popup behavior
        	var editRadios = ["optionsRadios1", "optionsRadios2", "optionsRadios3", "optionsRadios4", "optionsRadios5", "optionsRadios6", "optionsRadios7", "optionsRadios8"];
        	var selectedRadio;
        	$.each(editRadios, function(i) {
        		if ($("#" + editRadios[i] + ":checked").prop("checked")) {
        			selectedRadio = editRadios[i];
        		};
        	});
        	switch (selectedRadio) {
        		case "optionsRadios1": 
        		case "optionsRadios2":
        		case "optionsRadios3":
        			// Do nothing - adding new features, don't want to display popup;
        		break;
        		case "optionsRadios4":
        			$(".esriPopupWrapper").css("display","none");
            		var editFtr = popup.getSelectedFeature();
            		var editFtrName = editFtr.attributes.PrioritizAreaName;
            		if ((editFtr._layer._url.path).toLowerCase() === (appConfig.URL_PRIOR_AREA).toLowerCase()) {
            			bootbox.confirm("<b>" + editFtrName + "</b> was selected, continue with this Prioritization Area?", function(result) {
            				if (result) {
 								app.newModel(editFtr);
            				} else {
            					popup.clearFeatures();
            					esri.hide(loading);
            				}
            			});
            			
            		} else {
            			popup.clearFeatures();
            			bootbox.alert("A Prioritization Area feature was not selected.<br/><br/>Try turning off any other layers that might be selected instead.");
            			esri.hide(loading);
            			//popup.selectNext();
            		}
        		break;
        		case "optionsRadios6":
        			$(".esriPopupWrapper").css("display","none");
            		var editFtr = popup.getSelectedFeature();
            		if ((editFtr._layer._url.path).toLowerCase() === (appConfig.URL_PRIOR_AREA).toLowerCase()) {
            			bootbox.confirm("<b>Warning</b> you will permanently delete the selected Prioritization Area, along with any associated Prioritization Models. <br/><br/>Click OK to proceed, or click Cancel and keep the Prioritization Area.", function(result) {
            				if (result) {
            					app.deleteFeature(editFtr);
            					
            					// ALSO NEED TO ADD WARNING AND CODE TO DELETE ANY ASSOCIATED PRIORITIZATION AREA MODELS

            				} else {
            					popup.clearFeatures();
            					esri.hide(loading);
            				}
            			});
            		} else {
            			popup.clearFeatures();
            			bootbox.alert("You cannot delete features from " + editFtr._layer.name + ". <br/><br/>If you are trying to select a feature from a different layer, try turning off any other layers that might be selected instead.");
            			esri.hide(loading);
            		}
        		break;
        		case "optionsRadios7":
        			$(".esriPopupWrapper").css("display","none");
            		var editFtr = popup.getSelectedFeature();
            		console.log(editFtr);
            		if ((editFtr._layer._url.path).toLowerCase() === (appConfig.URL_INTERP_AREA).toLowerCase) {
            			if (editFtr.attributes.StatusInterpArea === "In Initial Review") {
	            			bootbox.confirm("<b>Warning</b> you will permanently delete the selected Interpretation Area. Click OK to proceed, cancel to keep the Area", function(result) {
	            				if (result) {
	            					app.deleteFeature(editFtr);
	            				} else {
	            					popup.clearFeatures();
	            					esri.hide(loading);
	            				}
	            			});
            			} else {
            				bootbox.alert("You cannot delete an Interpretation Area that is In Progress or Completed.");
            				popup.clearFeatures();
            			}
            		} else {
            			popup.clearFeatures();
            			bootbox.alert("You cannot delete features from " + editFtr._layer.name + ". <br/><br/>If you are trying to select a feature from a different layer, try turning off any other layers that might be selected instead.");
            			esri.hide(loading);
            		}
        		break;
        		default:
        		// Default popup behavior
        			$(".esriPopupWrapper").css("display","block");
        		break;
        	}
        });
    };
    
    app.buildMapItems = function (response) {

    	app.buildPopup();
    	app.buildTOC(response);
    	app.buildBasemap();
    	app.buildSearch();
    	app.buildSearchWatershed();
    	//app.buildPrint();
    	//app.buildMeasure();
    	//$.when(app.buildClusterLayer("Grow Locations (Grouped)", "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Operational/FeatureServer/0", 288895, null, function(callback) {
			//$.when(app.buildEditor(function(buildCallback) {
			//}));
		//}));
		editFillSymbol = new SimpleFillSymbol();
    };

    app.buildMapElements = function (layers) {
        on(map, "mouse-move", app.showCoordinates);
        on(map, "mouse-drag", app.showCoordinates);
    };

    app.buildTOC = function (response) {
        //this is for TOC
        var webmapLayerInfos = [];
        //this is for Legend
        var layerInfo = [];

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

        //add TOC
        webmapLayerInfos.reverse();
        toc = new agsjs.dijit.TOC({
            map : map,
            layerInfos : webmapLayerInfos
        }, "mapTocDiv");
        toc.startup();
    };
    
    app.buildBasemap = function () {
    	
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
        
        // set a listener for changing the basemap. if changed, save this to localStorage to be used next time the app loads
	    basemapGallery.on("selection-change", function(){
	    	//console.log("basemap selection change");  
			var currentBasemap = basemapGallery.getSelected();
		  	localStorage.currentBasemap = currentBasemap.id;
		  	//esri.hide(loading);
		});
		
		basemapGallery.on("error", function() {
			bootbox.alert("An error occured while trying to load the basemap.<br/><br/>Please try a different basemap.");
			//console.log("error loading basemap");
		});
		
		if (localStorage.currentBasemap) {
			//console.log(localStorage.currentBasemap, basemapGallery.getSelected());
			if (!(localStorage.currentBasemap === "basemap_0")) {
				basemapGallery.select(localStorage.currentBasemap);
			};
		};
	};
    
    app.buildSearch = function () {
    	var s = new Search({
            map: map
         }, "searchBasic");
         s.startup();
    };
    
    app.buildSearchWatershed = function () {
		// Uses the 3.13 Search function to search via both geocode and specified features
		var sL = new Search({	
			enableButtonMode: false, //this enables the search widget to display as a single button
	        enableLabel: false,
	        enableInfoWindow: true,
	        showInfoWindowOnSelect: false,
	        sources: [],
	        map: map
	     }, "searchWatershed");
	
	     var sources = sL.get("sources");
	    
	     sources.push({
	        featureLayer: new FeatureLayer(appConfig.SEARCH_WATERSHED),
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
	};
	
	app.buildMeasure = function () {
		measurement = new Measurement({
		    map: map
		}, dom.byId('measurement'));
		measurement.startup();
	};
	
	
	app.buildEditor = function(callback) {
		
		// enable editing shapes on with double-click event
		// uses the editToolbar class, (not editorWidget)
		shapeEditLayer = null;
		editToolbar = new Edit(map);
		
		// control when a save is made - using Save or Cancel buttons and not double-click
		editToolbar.on("deactivate", function(evt) {
			if (shapeEditStatus === true) {
				//console.log(shapeEditStatus);
				shapeEditLayer.applyEdits(null, [evt.graphic], null, function success() {
					console.log("update feature successful");
					shapeEditStatus = null;
					shapeEditBackup = null;
					app.stopEdit();
					shapeEditLayer.refresh();	
				}, function error() {
					console.log("error");
				});
				
				
			} else {
				$.each(layerInfo, function(i) {
					layerInfo[i].featureLayer.refresh();
				});
			}
		});

		layerInfo = [];
		$.each(layers, function(i) {
			var lyr = layers[i];
			// only enable editing on layers that have editing enabled (controlled in web map JSON)
			if (lyr.layer._editable) {
				layerInfo.push({
					"featureLayer" : lyr.layer
				});
				var editingEnabled = false;
				lyr.layer.on("dbl-click", function(evt) {
					// first double-click when editing radio option is selected starts editing on the shape that was clicked.
					// after editing is starting, the double-click defaults back to incremental zoom
					if ($("#optionsRadios6:checked").prop("checked")) {
						if (!(shapeEditStatus)) {
							shapeEditStatus = true;
							shapeEditBackup = evt.graphic;
							event.stop(evt);
							editingEnabled = true;
							// if the type is point, allow move, otherwise, allow re-shape using vertices
							if (evt.graphic.geometry.type === "point") {
								editToolbar.activate(Edit.MOVE, evt.graphic);
							} else {
								editToolbar.activate(Edit.EDIT_VERTICES, evt.graphic);
							}
							shapeEditLayer = this;
						}
					}
				});
			}
		});

		// used to edit attributes (only for editable layers defined above)
		attInspector = new AttributeInspector({
			layerInfos : layerInfo
		}, "attributesDiv");
		$(".atiLayerName").hide();
		dojo.connect(attInspector, "onAttributeChange", function(feature, fieldName, newFieldValue) {
			feature.attributes[fieldName] = newFieldValue;
			feature.getLayer().applyEdits(null, [feature], null);
		});

		callback("app.buildEditor complete.");
	}; 
	
	app.initModelMenu = function(option) {
		var selOption = option.id;

		switch(selOption) {
			case "optionsRadios1":
			// Creating a new Interpretation Area
			dojo.disconnect(clickHandler);
			clickHandler = null;
			map.graphics.clear();
				bootbox.prompt("Enter a name for the new Interpretation Area.", function(result) {
					if (!(result)) {
						//do nothing
						app.stopEdit();
					} else {
						//console.log(result);
						newFeatureName = result;
						$("#editRadios2").hide();
						$("#editRadios3").hide();
						$("#editRadios4").hide();
						$("#editRadios5").hide();
						$("#editRadios6").hide();
						$("#editRadios7").hide();
						$("#editRadios8").hide();
						$("#editLabelAddModel").hide();
						$("#editLabelDelete").hide();
						$("#editButtons").show();
						$("#stopEdit").show();
						$("#saveEdits").show();
						// Make sure watershed boundary layer is visible
						if (!(layers[wshdLyrIndex].layer.visible)) {
							layers[wshdLyrIndex].layer.setVisibility(true);
						}
						$("#editInstructions").html("All Interpretation Areas are based on one or more Watersheds.<br/> "
							+ "If you don't see the blue Watershed Boundaries, zoom in until you do.<br/><br/>"
							+ "Click on one or more Watersheds to be included in your Interpretation Area.<br/><br/>"
							+ "When done, click the Save button.");
					}
				});
			break;
			case "optionsRadios2":
				// creating new prioritization area with an interp area boundary
				dojo.disconnect(clickHandler);
				clickHandler = null;
				map.graphics.clear();
				bootbox.prompt("Enter a name for the new Prioritization Area.", function(result) {
					if (!(result)) {
						//do nothing
						app.stopEdit();
					} else {
						//console.log(result);
						newFeatureName = result;
						//map.graphics.clear();
						$("#editRadios1").hide();
						$("#editRadios3").hide();
						$("#editRadios4").hide();
						$("#editRadios5").hide();
						$("#editRadios6").hide();
						$("#editRadios7").hide();
						$("#editRadios8").hide();
						$("#editLabelAddModel").hide();
						$("#editLabelDelete").hide();
						$("#editButtons").show();
						$("#stopEdit").show();
						$("#saveEdits").show();
						// Make sure watershed boundary layer is visible
						if (!(layers[interpLyrIndex].layer.visible)) {
							layers[interpLyrIndex].layer.setVisibility(true);
						}
						if (layers[wshdLyrIndex].layer.visible) {
							layers[wshdLyrIndex].layer.setVisibility(false);
						}
						$("#editInstructions").html("Click on an Interpretation Area boundary.<br/>Once a boundary is selected, you'll be prompted for the next step");
					}
				});
			break;
			case "optionsRadios3":
				// creating new prioritization area with watershed boundaries
				dojo.disconnect(clickHandler);
				clickHandler = null;
				map.graphics.clear();
				bootbox.prompt("Enter a name for the new Prioritization Area.", function(result) {
					if (!(result)) {
						app.stopEdit();
					} else {
						newFeatureName = result;
						$("#editRadios1").hide();
						$("#editRadios2").hide();
						$("#editRadios4").hide();
						$("#editRadios5").hide();
						$("#editRadios6").hide();
						$("#editRadios7").hide();
						$("#editRadios8").hide();
						$("#editLabelAddModel").hide();
						$("#editLabelDelete").hide();
						$("#editButtons").show();
						$("#stopEdit").show();
						$("#saveEdits").show();
						// Make sure watershed boundary layer is visible
						if (!(layers[interpLyrIndex].layer.visible)) {
							layers[interpLyrIndex].layer.setVisibility(true);
						}
						if (!(layers[wshdLyrIndex].layer.visible)) {
							layers[wshdLyrIndex].layer.setVisibility(true);
						}
						//app.isolatePopup("Watershed Boundaries - HUC12");
						$("#editInstructions").html("Click on one or more Watersheds.<br/>"
							+ "All Watersheds need to be within an Interpretation Area boundary.<br/><br/>"
							+ "If you don't see the blue Watershed Boundaries, zoom in until you do.<br/><br/>"
							+ "When done, click the Save button.");
					}
				});
			break;
			case "optionsRadios4":
				// create new prioritization area model
				$("#editRadios1").hide();
				$("#editRadios2").hide();
				$("#editRadios3").hide();
				$("#editRadios5").hide();
				$("#editRadios6").hide();
				$("#editRadios7").hide();
				$("#editRadios8").hide();
				$("#editLabelAddArea").hide();
				$("#editLabelDelete").hide();
				$("#editButtons").show();
				$("#editInstructions").html("Click on the Prioritization Area that this model will be run on.");
				app.isolatePopup("Prioritization Areas");
			break;
			case "optionsRadios5":
				// edit prioritization area model
				$("#editRadios1").hide();
				$("#editRadios2").hide();
				$("#editRadios3").hide();
				$("#editRadios4").hide();
				$("#editRadios6").hide();
				$("#editRadios7").hide();
				$("#editRadios8").hide();
				$("#editLabelAddArea").hide();
				$("#editLabelDelete").hide();
				$("#editButtons").show();
				$("#editInstructions").html("Follow the popup dialogs for editing an existing model.");
				
				
				// 00000000000000000000000000000000000000000000000000000000000000000000000000000000
				var modelList = "";
				var query = new Query();
				//var queryTask = new QueryTask(appConfig.URL_PRIOR_MODELS);
				var queryTask = new QueryTask(appConfig.URL_REGION);
				query.where = "0=0";
				query.returnGeometry = false;
				query.outFields = ["*"];
				queryTask.execute(query, function(res) {	
					console.log(res);
					$.each(res.features, function(i) {
						console.log(res.features[i].attributes.RBNAME);
						modelList += "<option>" + res.features[i].attributes.RBNAME + "</option>";
					});
					$("#selectPriorModel").html(modelList);
				});
				
				$("#modelSelect").modal("show");
			break;
			case "optionsRadios6":
				// delete prioritization area
				$("#editRadios1").hide();
				$("#editRadios2").hide();
				$("#editRadios3").hide();
				$("#editRadios4").hide();
				$("#editRadios5").hide();
				$("#editRadios7").hide();
				$("#editRadios8").hide();
				$("#editLabelAddArea").hide();
				$("#editLabelAddModel").hide();
				$("#editButtons").show();
				$("#editInstructions").html("Click on the Prioritization Area you want to delete.");
				app.startDelete("prioritization");
			break;
			case "optionsRadios7":
				// delete interpretation area
				$("#editRadios1").hide();
				$("#editRadios2").hide();
				$("#editRadios3").hide();
				$("#editRadios4").hide();
				$("#editRadios5").hide();
				$("#editRadios6").hide();
				$("#editRadios8").hide();
				$("#editLabelAddArea").hide();
				$("#editLabelAddModel").hide();
				$("#editButtons").show();
				$("#editInstructions").html("Click on the Interpretation Area you want to delete.<br/><br/>Note, you can only delete areas that are 'In Initial Review'.");
			break;
			case "optionsRadios8":
				// delete model
				$("#editRadios1").hide();
				$("#editRadios2").hide();
				$("#editRadios3").hide();
				$("#editRadios4").hide();
				$("#editRadios5").hide();
				$("#editRadios6").hide();
				$("#editRadios7").hide();
				$("#editLabelAddArea").hide();
				$("#editLabelAddModel").hide();
				$("#editButtons").show();
				$("#editInstructions").html("delete a model.");
			break;
		}
		//dojo.disconnect(clickHandler);
		//clickHandler = null;
	};
	
	app.resetModelPopup = function() {
		// Reset the Model modal popup to default values
		$("#inputModelName").val("");
		$("#modelInfo").html("");
		$("#modelInstructions").html("Enter the Model Name, select the parameters you want to use, and specify weights");
		$("#modelParameters").show();
		$("#modelProgress").hide();
		$("#modelBtnCancel").show();
    	$("#modelBtnSave").show();
    	$("#modelBtnClose").hide();
    	$.each(modelParams, function(i) {
    		$("#" + modelParams[i]).val(10);
    	});
    	$.each(modelToggles, function(i) {
    		$("#" + modelToggles[i]).bootstrapToggle("on");
    	});
	};
	
	app.newModel = function(editFtr) {
		app.resetModelPopup();
		var paAttr = editFtr.attributes;
		console.log(editFtr);
		$("#modelInfo").html("SWRCBRegID: " + paAttr.SWRCBRegID + ", PrioritizAreaKey: " + paAttr.PrioritizAreaKey + ", PrioritizAreaName: " + paAttr.PrioritizAreaName + "<br/><br/>");
		$("#modelInstructions").html("Enter the Model Name, select the parameters you want to use, and specify weights");
    	$("#modelPopup").modal("show");
	};
	
	app.existingModel = function() {
		// Load existing model parameters into modal popup
		
		
		// need to load model parameters into modal popup
		
		
		console.log("load existing model");
		$("#modelSelect").modal("hide");
		$("#modelPopup").modal("show");
	};
	
	app.saveModel = function() {
		// Prioritization Model
		
		// Check to make sure a Model Name is entered
		if ($("#inputModelName").val() === "") {
			$("#modelCheck").html("<br/>Please enter a Model Name");
		} else {
			// Check to verify the total weight of all included parameters equals 100
			var modelParams = ["inputWtSlope", "inputWtCult", "inputWtProx", "inputWtDrink", "inputWtRes", "inputWtWtrright", "inputWtWtrcons", "inputWtCrit", "inputWtSens", "inputWtLSA"];
	    	var totalWeight = 0;
	    	$.each(modelParams, function(i) {
	    		var paramVal = parseInt($("#" + modelParams[i]).val());
	    		totalWeight += paramVal;
	    	});
	    	console.log(totalWeight);
	    	if (totalWeight < 100) {
	    		$("#modelCheck").html("<br/>Current total of all Weights is <b>" + totalWeight + "</b>. Please adjust the weights until the total is 100");
	    	} else {
	    		if (totalWeight > 100) {
	    			$("#modelCheck").html("<br/>Current total of all Weights is <b>" + totalWeight + "</b>. Please adjust the weights until the total is 100");
	    		} else {
	    			// OK to proceed
	    			$("#modelCheck").html("");
	    			// Build the feature to be passed via ajax call
	    			var addFeature = {
						"attributes": {
							SWRCBRegID: 1,
							PrioritizAreaID: "1_1",
							ModelRunName: $("#inputModelName").val()
						}
					};
					$.each(modelParams, function(i) {
			    		if (!($("#" + modelParams[i]).prop("disabled"))) {
			    			var fieldName = $("#" + modelParams[i]).prop("name");
			    			var fieldVal = $("#" + modelParams[i]).val();
			    			addFeature.attributes[fieldName] = fieldVal;
			    		}
			    	});
			    	
			    	console.log(addFeature);
			    	$("#modelParameters").hide();
			    	$("#modelProgress").show();
			    	$("#modelBtnCancel").hide();
			    	$("#modelBtnSave").hide();
			    	$("#modelBtnClose").show();
			    	
	    		}
	    	}
	    }
	};
	
	
	app.unionPolygons = function(outputLayer, urlSource) {
		esri.show(loading);
		var inputPolys = [];
		//var qryWhere;
		var polyCount = map.graphics.graphics.length;
		$.each(map.graphics.graphics, function(i) {
			//inputPolys.push(map.graphics.graphics[i].geometry);
			var qryWhere = "OBJECTID=" + map.graphics.graphics[i].attributes.OBJECTID;
			$.when(app.runQuery(urlSource, qryWhere, function(callback) {
				inputPolys.push(callback.features[0].geometry);
				console.log(inputPolys.length, polyCount);
				if (inputPolys.length === polyCount) {
					geometryService.union(inputPolys, function(result) {
						map.graphics.clear();
						map.graphics.add(new Graphic(result, editFillSymbol));
						esri.hide(loading);
						//bootbox.alert("union completed");
						switch(outputLayer) {
							case "interpretation":
								// new interpretation area being created
								console.log("save interpretation ", newFeatureName, result);
								//testObj = result;
								var center = result.getCentroid();
								
								//get the Region that the new interp area falls within
								var query = new Query();
								query.geometry = center;
								layers[regionLyrIndex].layer.queryFeatures(query, function(featureset) {
									//console.log("region query results", featureset);
									var regionId = featureset.features[0].attributes.RB;
									console.log("regionid", regionId);
									$.when(app.runQuery(appConfig.URL_INTERP_AREA_NUM, "0=0", function(callback) {
										//console.log("interp num callback", callback);
										//testObj = callback.features[0];
										
										//var lastNum = callback.features[0].attributes."Reg" + regionId.toString() + "LastInterpAreaIDAssigned";
										//console.log(lastNum);
										var regAttr = "Reg" + regionId.toString() + "LastInterpAreaIDAssigned";
										$.each(callback.features[0].attributes, function(i) { 
											if (i === regAttr) {
												var lastRegNum = callback.features[0].attributes[i];
												var objId = callback.features[0].attributes.OBJECTID;
												lastRegNum += 1;
												//console.log(regAttr, lastRegNum);
												$.when(app.createNewPolyFeature(outputLayer, lastRegNum, regionId, result, appConfig.URL_INTERP_AREA, function(callback) {
													$.when(app.updateAttributes(appConfig.URL_INTERP_AREA_NUM, objId, i, lastRegNum, function(callback) {
														esri.hide(loading);
														bootbox.alert(newFeatureName + " Interpretation Area successfully created.");
														layers[3].layer.refresh();
														app.stopEdit();
													}));
												}));
											}
										});
									}));
								});
							break;
							case "prioritization":
								console.log("save prioritization ", newFeatureName, result);
								var center = result.getCentroid();
								
								//get the Region that the new interp area falls within
								var query = new Query();
								query.geometry = center;
								layers[regionLyrIndex].layer.queryFeatures(query, function(featureset) {
									console.log("region query results", featureset);
									var regionId = featureset.features[0].attributes.RB;
									console.log("regionid", regionId);
									$.when(app.runQuery(appConfig.URL_PRIOR_AREA_NUM, "0=0", function(callback) {
										//console.log("interp num callback", callback);
										//testObj = callback.features[0];
										
										//var lastNum = callback.features[0].attributes."Reg" + regionId.toString() + "LastInterpAreaIDAssigned";
										//console.log(lastNum);
										var regAttr = "R" + regionId.toString() + "LastPrioritizAreaIDAssigned"; // LastPrioritizAreaIDAssigned 
										$.each(callback.features[0].attributes, function(i) { 
											if (i === regAttr) {
												var lastRegNum = callback.features[0].attributes[i];
												var objId = callback.features[0].attributes.OBJECTID;
												lastRegNum += 1;
												//console.log(regAttr, lastRegNum);
												$.when(app.createNewPolyFeature(outputLayer, lastRegNum, regionId, result, appConfig.URL_PRIOR_AREA, function(callback) {
													$.when(app.updateAttributes(appConfig.URL_PRIOR_AREA_NUM, objId, i, lastRegNum, function(callback) {
														esri.hide(loading);
														bootbox.alert(newFeatureName + " Prioritization Area successfully created.");
														app.stopEdit();
													}));
												}));
											}
										});
									}));
								});
							break;
						}
					}, function(error) {
						bootbox.alert("An error occurred, please try again.");
					});
				}
			}));
		});
	}; 
	
	app.createNewPolyFeature = function(source, param1, param2, graphic, lyrSource, callback) {
		// Create object for writing new feature to the layer

		switch(source) {
			case "interpretation":
				var polygon = new Polygon(graphic.rings);
				var addFeature = {
					"attributes": {
						InterpAreaName: newFeatureName,
						StatusInterpArea: "In Initial Review",
						InterpAreaKey: param2 + "_" + param1,
						SWRCBRegID: param2,
						InterpAreaID: param1
					},
					"geometry": {
						rings: polygon.rings
					}
				};
			break;
			case "prioritization":
				var polygon = new Polygon(graphic.rings);
				var addFeature = {
					"attributes": {
						PrioritizAreaName: newFeatureName,
						StatusPrioritizArea: "Approved for Modeling",
						PrioritizAreaKey: param2 + "_" + param1,
						SWRCBRegID: param2,
						PrioritizAreaID: param1
					},
					"geometry": {
						rings: polygon.rings
					}
				};
			break;
		}
		
		$.when(app.saveNewFeature(addFeature, lyrSource, function(saveCallback) {
			
			map.graphics.clear();
			// loop through map layers to find matching edited layer, then refresh it.
			$.each(layers, function(layer) {
				//console.log(layers[layer].layer.url);
				if (layers[layer].layer.url === lyrSource) {
					layers[layer].layer.refresh();
					var query = new Query();
					query.where = "objectId = " + saveCallback.addResults[0].objectId;
					layers[layer].layer.selectFeatures(query);
				}
			});
			callback("createNewPolyFeature complete");
			//$("#editInstructions").html("Type in the attributes for the new feature, then click Save.");
		}));	
	};
	
	app.updateAttributes = function(ftrUrl, objId, updateField, updateValue, callback) {		
		
		var updFeature = '{"attributes": { "OBJECTID": ' + objId + ', "' + updateField + '": ' + updateValue + '}}';	
		//console.log(updateAttributes);			

		var url = ftrUrl + "/updateFeatures";
		var updString = {
	        f: 'json',
	        //where: "objectId=" + objId,
	        features: updFeature,
	        token: token
	    };
		//console.log(updFeature, url, updString);
			
	    // Query feature
	    $.ajax({
	        url: url,
	        type: "POST",
	        dataType: "json",
	        data: updString,
	        success: function (data) {
	        	callback("success");
	        },
	        error: function (response) {
	        	bootbox.alert("An error occurred during saving. Please notify CIPS IT/GIS staff.");
	        	//console.log("error updating features");
	            //callback(response);
	        }
	    });
	};
	
	app.startDelete = function(source) {
		// editing - initial steps for user to delete a feature
		switch(source) {
			case "prioritization":
				if (!(clickHandler)) {
					clickHandler = dojo.connect(map, "onClick", clickListener);
				};
			break;
		}		
	};
	
	app.deleteFeature = function(ftr) {
		// user confirmed delete, now delete the feature with an ajax call
		var url = ftr._layer._url.path + "/deleteFeatures";
		var params = "OBJECTID = " + ftr.attributes.OBJECTID;
		var dataString = {
			f: "json",
			where: params,
			token: token
		};

	    $.ajax({
	        url: url,
	        type: "POST",
	        dataType: "json",
	        data: dataString,
	        success: function (data) {
	        	bootbox.alert("Delete feature successful.");
	        	app.stopEdit();
	        	ftr._layer.clearSelection();
	        	ftr._layer.refresh();
	        	esri.hide(loading);
	        },
	        error: function (response) {
	            bootbox.alert("An error occured, please try again.");
	            app.stopEdit();
	            esri.hide(loading);
	        }
	    });
		
	};
	
	app.editFeature = function(ftr, type) {
		// second step for editing attribute or shape features
		switch(type) {
			case "attributes":
				$("#attributesDiv").show();
				$("#stopEdit").show();
				$("#editInstructions").html("Enter any changes to the attributes, then click Save.");
				$("#saveEdits").show();
				$("#editButtons").show();
			break;
			case "shape":
				var shapeId = ftr.attributes.OBJECTID;
			break;
		}
	};
	
	app.saveGraphic = function () {
		// new graphic feature was added, save it to the layer
		esri.show(loading);
		$("#attributesDiv").show();
		
		if ($("#optionsRadios1:checked").prop("checked")) {
			// save point
			$.when(app.createNewFeature(addGraphicEvt, appConfig.URL_EDIT_POINT, function(callback) {
				esri.hide(loading);
			}));
		}
		if ($("#optionsRadios2:checked").prop("checked")) {
			// save point
			$.when(app.createNewFeature(addGraphicEvt, appConfig.URL_EDIT_POLYLINE, function(callback) {
				//console.log(callback);
				esri.hide(loading);
			}));
		}
		if ($("#optionsRadios3:checked").prop("checked")) {
			// save point
			$.when(app.createNewFeature(addGraphicEvt, appConfig.URL_EDIT_POLYGON, function(callback) {
				//console.log(callback);
				esri.hide(loading);
			}));
		}
		$("#saveGraphic").hide();
		$("#saveEdits").show();
	};
	
	app.stopEdit = function () {
		
		// Used for cancelling an edit, and for resetting the edit menu back to default state
		app.resetPopup();
		newFeatureName = null;
		$("#editRadios1").show();
		$("#editRadios2").show();
		$("#editRadios3").show();
		$("#editRadios4").show();
		$("#editRadios5").show();
		$("#editRadios6").show();
		$("#editRadios7").show();
		$("#editRadios8").show();
		$("#editLabelAddArea").show();
		$("#editLabelAddModel").show();
		$("#editLabelDelete").show();
		$("#optionsRadios1:checked").prop("checked",false);
		$("#optionsRadios2:checked").prop("checked",false);
		$("#optionsRadios3:checked").prop("checked",false);
		$("#optionsRadios4:checked").prop("checked",false);
		$("#optionsRadios5:checked").prop("checked",false);
		$("#optionsRadios6:checked").prop("checked",false);
		$("#optionsRadios7:checked").prop("checked",false);
		$("#optionsRadios8:checked").prop("checked",false);
		$("#editInstructions").html("Select a modeling option.");
    	if (!(clickHandler)) {
			clickHandler = dojo.connect(map, "onClick", clickListener);
		};
		$("#attributesDiv").hide();
		$("#editButtons").hide();
		map.graphics.clear();

	};
	
	app.saveEdits = function () {
		// For attribute and shape editing
		
		if ($("#optionsRadios1:checked").prop("checked")) {
			app.unionPolygons("interpretation", appConfig.URL_WATERSHED);
		}
		if ($("#optionsRadios2:checked").prop("checked")) {
			app.unionPolygons("prioritization", appConfig.URL_INTERP_AREA);
		}
		if ($("#optionsRadios3:checked").prop("checked")) {
			app.unionPolygons("prioritization", appConfig.URL_WATERSHED);
		}
		
	};
	
	app.createNewFeature = function(graphic, lyrSource, callback) {
		// Create object for writing new feature to the layer
		var type = graphic.geometry.type;
		switch(type) {
			case "point":
				$("#stopEdit").hide();
				var addFeature = {
					"attributes": {
						// currently, no attributes are written, but these will be added based on the CIPS dataset being edited
					},
					"geometry": {
						x: graphic.geometry.x,
						y: graphic.geometry.y
					}
				};
				$.when(app.saveNewFeature(addFeature, lyrSource, function(saveCallback) {
					map.graphics.clear();
					// Loop through map layers to find matching edited layer, then refresh it.
					$.each(layers, function(layer) {
						if (layers[layer].layer.url === lyrSource) {
							layers[layer].layer.refresh();
							var query = new Query();
							query.where = "objectId = " + saveCallback.addResults[0].objectId;
							layers[layer].layer.selectFeatures(query);
						}
					});
					$("#editInstructions").html("Type in the attributes for the new feature, then click Save.");
				}));
			break;
			case "polyline":
				$("#stopEdit").hide();
				var polyline = new Polyline(graphic.geometry.paths);
				var addFeature = {
					"attributes": {
						
					},
					"geometry": {
						paths: polyline.paths
					}
				};
				$.when(app.saveNewFeature(addFeature, lyrSource, function(saveCallback) {
					map.graphics.clear();
					// loop through map layers to find matching edited layer, then refresh it.
					$.each(layers, function(layer) {
						if (layers[layer].layer.url === lyrSource) {
							layers[layer].layer.refresh();
							var query = new Query();
							query.where = "objectId = " + saveCallback.addResults[0].objectId;
							layers[layer].layer.selectFeatures(query);
						}
					});
					$("#editInstructions").html("Type in the attributes for the new feature, then click Save.");
				}));
			break;
			case "polygon":
				$("#stopEdit").hide();
				var polygon = new Polygon(graphic.geometry.rings);
				var addFeature = {
					"attributes": {
						
					},
					"geometry": {
						rings: polygon.rings
					}
				};
				$.when(app.saveNewFeature(addFeature, lyrSource, function(saveCallback) {
					map.graphics.clear();
					// loop through map layers to find matching edited layer, then refresh it.
					$.each(layers, function(layer) {
						//console.log(layers[layer].layer.url);
						if (layers[layer].layer.url === lyrSource) {
							layers[layer].layer.refresh();
							var query = new Query();
							query.where = "objectId = " + saveCallback.addResults[0].objectId;
							layers[layer].layer.selectFeatures(query);
						}
					});
					$("#editInstructions").html("Type in the attributes for the new feature, then click Save.");
				}));
			break;
			
		}
	};
	
	app.saveNewFeature = function(feature, url, callback) {
		// Write new feature to layer using object created in createNewFeature
		var addFeature = JSON.stringify(feature);
		var urlEdit = url + "/addFeatures";
		var addParams = {
	        f: "json",
	        features: addFeature,
	        token: token
	    };
	
	    // Add feature
	    $.ajax({
	        url: urlEdit,
	        type: "POST",
	        dataType: "json",
	        data: addParams,
	        success: function (data) {
	            callback(data);
	        },
	        error: function (response) {
	            callback(response);
	        }
	    });
	};
	
	app.syncMaps = function(mapObj) {
		// When map changes, record the map extent in order to keep all maps synconized
		var mapExtent = mapObj.extent;
		var mapCenter = mapObj.extent.getCenter;
		localStorage.extent = JSON.stringify(mapObj.extent);
	};

    app.showCoordinates = function (evt) {
        // Show map coordinates in the lower right-hand corner of the app.
        // The map is in web mercator but display coordinates in geographic (lat, long)
        var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
        //display mouse coordinates
        $('#coordsText').html(mp.x.toFixed(3) + ", " + mp.y.toFixed(3));
    };
    
    app.hideRibbonMenu = function() {
    	// Map menu items - showing and hiding elements
 		var tabs = $('.tabItems');
		var containers = $('#menu1, #menu2, #menu3, #menu4, #menu5, #menu6');
		containers.removeClass("slide-out");
		containers.removeClass("showing");
		containers.removeClass("active");
		showing = false;
		$("#ribbon-bar-toggle").hide();
 	};

	app.findRegion = function() {
		// Search by Region tool - Query and zoom to the selected Region boundary
		$.when(app.runQuery(appConfig.URL_REGION, "RB=" + $('#frmSearchRegion').val(), function(callback) {
			var extent = callback.features[0].geometry.getExtent();
			map.setExtent(extent);
		}));
		
	};
	
	app.findInterpArea = function() {
		// Search by Interpretation Area tool - Query and zoom to the selected Interp Area boundary
		$.when(app.runQuery(appConfig.URL_INTERP_AREA, "InterpAreaName='" + $('#frmSearchInterp').val() + "'", function(callback) {
			var extent = callback.features[0].geometry.getExtent();
			map.setExtent(extent);
		}));
	};
	
	app.buildClusterLayer = function(newLyrName, sourceUrl, maxScale, minScale, callback) {
		// Create clustered layer for grow locations
		clusterLayer = new ClusterFeatureLayer({
			"url" : sourceUrl,
			"distance" : 40,
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
		var group1 = new SimpleMarkerSymbol('circle', 15, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([251, 106, 74, 0.25]), 10), new Color([251, 106, 74, 0.5]));
		var group2 = new SimpleMarkerSymbol('circle', 20, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([222, 45, 38, 0.25]), 15), new Color([222, 45, 38, 0.5]));
		var group3 = new SimpleMarkerSymbol('circle', 30, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([165, 15, 21, 0.25]), 15), new Color([165, 15, 21, 0.5]));

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
		map.addLayers([clusterLayer]);
		toc.layerInfos.push({
			"layer" : clusterLayer,
			"title" : newLyrName
		});
		toc.refresh();
		callback("clusterLayer complete");
	}; 

	app.menuChange = function(option) {
		// Called when map menu items are selected
		/*if (showInfoWindow === "sumWshd") {
			$("#sumWshd-toggle").bootstrapToggle("off");
		};*/
		if (option.id === "menuMapTools") {
			dojo.disconnect(clickHandler);
			clickHandler = null;
		} else {
			if (measurement) {
				measurement.setTool("area", false);
				measurement.setTool("distance", false);
				measurement.setTool("location", false);
				measurement.clearResult();
			}
		};
		if ((option.id === "menuSearch") || (option.id === "menuBasemap") || (option.id === "menuLayers")) {
			if (!(clickHandler)) {
				clickHandler = dojo.connect(map, "onClick", clickListener);
			}
		}
		/*if (option.id === "menuEdit") {
	  		app.buildGraphicTools();
		}*/
	};

	app.runQuery = function(layerUrl, queryWhere, callback) {
		// Query task
		var query = new Query();
		var queryTask = new QueryTask(layerUrl);
		query.where = queryWhere;
		query.outSpatialReference = {
			wkid : 102100
		};
		query.returnGeometry = true;
		query.outFields = ["*"];
		queryTask.execute(query, function(res) {	
			callback(res);
		});
	};

	// Authentication - when services come from ArcGIS Online
	if (appConfig.AUTH === "arcgisonline") {
		var info = new OAuthInfo({
			appId : appConfig.APPID,
			popup : false
		});
		esriId.registerOAuthInfos([info]);

		esriId.checkSignInStatus(info.portalUrl + "/sharing").then(function() {
			// User is signed in
			token = info._oAuthCred.token;
			$("#appContent").show();
			$("#appInit").hide();
			$("#sign-out").show();
			$("#about-cips").show();
			$("#cips-dashboard").show();
			app.buildMap();
		}).otherwise(function() {
			// User is not signed in
			$("#appContent").html("");
			$("#appContent").hide();
			$("#appInit").show();
			$("#sign-out").hide();
			$("#about-cips").hide();
			$("#cips-dashboard").hide();
			$("#sign-in").show();
		});

		on(dom.byId("sign-in"), "click", function() {
			// User will be taken to the OAuth Sign In page
			esriId.getCredential(info.portalUrl, {
				oAuthPopupConfirmation : false
			}).then(function() {
			});
		});

		on(dom.byId("sign-out"), "click", function() {
			// User signed out, destroy credentials
			esriId.destroyCredentials();
			//localStorage.clear();			
			window.location.reload();
		});
	}

	// Authentication - when services come from ArcGIS for Server
	if (appConfig.AUTH === "arcgisserver") {

		var idJson, idObject;
		esriId.on("credential-create", function() {
			//console.log("credential-create");
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
			//$('#personalizedPanel').css("display", "block");

		} else {
			//$('#anonymousPanel').css("display", "block");
		}

		on(dom.byId("sign-in"), "click", function() {
			//$('#personalizedPanel').css("display", "block");
			//$('#anonymousPanel').css("display", "none");
		});

		on(dom.byId("sign-out"), "click", function() {
			esriId.destroyCredentials();
			localStorage.esri_jsapi_id_manager_data = null;
			window.location.reload();
		});

	}

	function storeCredentials() {
		// Used for ArcGIS for Server authentication
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
			// console.log("wrote a cookie :-/");
		}

		$('#personalizedPanel').css("display", "block");
		$('#anonymousPanel').css("display", "none");

	}

	function supports_local_storage() {
		// Used for ArcGIS for Server authentication
		try {
			return "localStorage" in window && window["localStorage"] !== null;
		} catch (e) {
			return false;
		}
	}

    $(document).ready(function() {
		// Page has loaded, set on- events	
	
		$.unblockUI();

        $('#mapNavPrev').on('click', function() {
            mapNav.zoomToPrevExtent();
        });
        $('#mapNavNext').on('click', function() {
            mapNav.zoomToNextExtent();
        });
        $('#mapNavFull').on('click', function() {
            //mapNav.zoomToFullExtent();
            map.setExtent(new Extent(appConfig.INIT_EXTENT), true);
        });
        $('#about-cips').on('click', function() {
            bootbox.alert(appConfig.ABOUT_TEXT);
        });
        $("#sumWshd-toggle").change(function() {
	    	app.summarizeWshd($(this).prop("checked"));
	    });
	    
	    // Set on-change behavior for Model Parameter toggles
	    $.each(modelToggles, function(i) {
    		$("#" + modelToggles[i]).change(function() {
    			if ($(this).prop("checked")) {
		    		$("#" + modelParams[i]).prop('disabled', false);
		    	} else {
		    		$("#" + modelParams[i]).prop('disabled', true);
		    		$("#" + modelParams[i]).val(0);
		    	}
    		});
    	});
    		
	    


    });
});
