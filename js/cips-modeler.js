// -- Section 1: Global Variables ----------------------------------------------------
var map, mapDeferred, mapResponse, mapNav, toc, loading; // core map objects
var layers, clickHandler, clickListener, lyrInfoTemplate = []; // used for popups
var clusterLayer, clusterLayerClickHandler; // used for clustered grow location display
var basemapGallery, measurement, tb, epWidget, lineSymbol, timeSlider; // map widgets
var showInfoWindow = "default"; // used to control map behavior based upon selected tool
var cred = "esri_jsapi_id_manager_data"; // cookie/localStorage variable for ArcGIS for Server authentication
var popupInfo, featureInfoTemplate, prModelPoly, prModelPoint, renderer, pointFtrLayer, layerFromQuery; // for dynamic layer load and rendering
var editPointSymbol, editLineSymbol, editFillSymbol, graphicTb, addGraphicEvt, editSettings, editorWidget, attInspector, layerInfo; // editing variables
var shapeEditLayer, shapeEditStatus, shapeEditBackup, shapeCollection = [], newFeatureName; // editing variables
var interpLyrIndex, regionLyrIndex; // used for getting onClick results from specific layers
var wshdLyrIndex, interpLyrIndex, interpWshdLyrIndex, regionLyrIndex, growLyrIndex, growLocLyrIndex; // used for getting onClick results from specific layers
var modelFactors, paramFactors;  // modelFactors are the factors with _ separators, paramFactors hav spaces
var priorAreaRecs; // stored records for Priortization Areas, used for loading models
var modelNewOrEdit; // used for messaging when a Prioritization model is created
var lastModelNum, newModelNum, modelNumObjectId, regionNum;
var geometryService, gp;
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
    esriConfig.defaults.io.corsEnabledServers.push("vags102a");
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
	/*urlUtils.addProxyRule({
	  urlPrefix: "mapserver.vestra.com",
	  proxyUrl: appConfig.PROXY_PAGE
	});*/

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
							map.graphics.add(new Graphic(evt.geometry, symbol, evt.attributes));
							bootbox.confirm(interpName + " was selected. Use this Interpretation Area boundary for your new Prioritization Area?", function(result) {
								if (!(result)) {
									map.graphics.clear();
								} else {
									// saving new Prioritization Area.
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
			
			/*if ($("#optionsRadios10:checked").prop("checked")) {
				// Selecting from a list
			}*/
			
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
        	//esri.show(loading);
        	// loop through edit options to control popup behavior
        	var editRadios = ["optionsRadios0", "optionsRadios1", "optionsRadios2", "optionsRadios3", "optionsRadios4", "optionsRadios5", "optionsRadios6", "optionsRadios7", "optionsRadios8", "optionsRadios9", "optionsRadios10", "optionsRadios11"];
        	var selectedRadio;
        	$.each(editRadios, function(i) {
        		if ($("#" + editRadios[i] + ":checked").prop("checked")) {
        			selectedRadio = editRadios[i];
        		};
        	});
        	switch (selectedRadio) {
        		case "optionsRadios1": 
        		case "optionsRadios2":
				case "optionsRadios9":
				case "optionsRadios11":
        			// Do nothing - adding new features, don't want to display popup;
        		break;
        		case "optionsRadios4":
        			// New Prioritization Area Model - map click to select Pr Area
        			$(".esriPopupWrapper").css("display","none");
        			var selCount = popup.count;
            		var editFtr = popup.getSelectedFeature();
            		var editFtrName = editFtr.attributes.PrioritizAreaName;
            		if ((editFtr._layer._url.path).toLowerCase() === (appConfig.URL_PRIOR_AREA).toLowerCase()) {
            			if (selCount === 1) { // one Pr Area exists under the map click
            				bootbox.confirm("<b>" + editFtrName + "</b> was selected, continue with this Prioritization Area?", function(result) {
	            				if (result) {
	 								app.newModel(editFtr);
	            				} else {
	            					popup.clearFeatures();
	            					esri.hide(loading);
	            				}
	            			});
            			} else { // multiple Pr Areas, loop through them
            				var editFtrMult = [];
            				editFtrMult.push(editFtr);
            				for (i = 1; i < selCount; i++) { 
            					popup.selectNext();
            					var editFtr = popup.getSelectedFeature();
            					editFtrMult.push(editFtr);
            				};
            				console.log(editFtrMult);
            				var selectArea;
							var modelList = "";
							$.each(editFtrMult, function(i) {
								modelList += "<option value='" + i + "'>" + editFtrMult[i].attributes.PrioritizAreaName + "</option>";
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
											app.newModel(editFtrMult[selectArea]);
										}
									}
								}
							});
            			}
            			
            		} else {
            			popup.clearFeatures();
            			bootbox.alert("A Prioritization Area feature was not selected.<br/><br/>Try turning off any other layers that might be selected instead.");
            			esri.hide(loading);
            			//popup.selectNext();
            		}
        		break;
        		case "optionsRadios6":
            		// Delete Prioritization Model - user clicked on a Pr Area boundary
        			$(".esriPopupWrapper").css("display","none");
        			var selCount = popup.count;
            		var modelFtr = popup.getSelectedFeature();
            		var modelFtrName = modelFtr.attributes.PrioritizAreaName;
            		if ((modelFtr._layer._url.path).toLowerCase() === (appConfig.URL_PRIOR_AREA).toLowerCase()) {
            			if (selCount === 1) { // one Pr Area exists under the map click
            				bootbox.confirm("<b>Warning</b> you will permanently delete the selected Prioritization Area, along with any associated Prioritization Models. <br/><br/>Click OK to proceed, or click Cancel and keep the Prioritization Area.", function(result) {
            				if (result) {
            					console.log("delete: ", modelFtr);
            					esri.show(loading);
            					app.deleteFeature(modelFtr, null);

            					// Also delete any associated Prioritization Area Models      
             					var delPrAreaKey = modelFtr.attributes.PrioritizAreaKey;           					      					
            					app.deletePrAreaModels(delPrAreaKey);

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
								title: "Multiple Prioritization Areas exist at this location, please select one, then click 'Proceed'.<br/><br/><b>Warning</b> you will permanently delete the selected Prioritization Area, along with any associated Prioritization Models. ",
								message: '<select id="selAreaListDel" class="form-control">' +
									modelList +
									'</select>',
								buttons: {
									success: {
										label: "Proceed",
										className: "btn-danger",
										callback: function() {
											selectArea = $("#selAreaListDel").val();
											console.log("delete: ", modelFtrMult[selectArea]);
											esri.show(loading);
											app.deleteFeature(modelFtrMult[selectArea], null);
											
											// Also delete any associated Prioritization Area Models      
			             					var delPrAreaKey = modelFtrMult[selectArea].attributes.PrioritizAreaKey;           					      					
			            					app.deletePrAreaModels(delPrAreaKey);
										}
									},
									cancel: {
										label: "Cancel",
										callback: function() {
											map.graphics.clear();
										}
									}
								}
							});
            			}
            			
            		} else {
            			popup.clearFeatures();
            			bootbox.alert("You cannot delete features from " + editFtr._layer.name + ". <br/><br/>If you are trying to select a feature from a different layer, try turning off any other layers that might be selected instead.");
            			esri.hide(loading);
            		}
            		
            		
            		
        		break;
        		case "optionsRadios7":
        			$(".esriPopupWrapper").css("display","none");
            		var editFtr = popup.getSelectedFeature();
            		//console.log(editFtr);
            		var selectedUrl = (editFtr._layer._url.path).toLowerCase();
            		var checkUrl = appConfig.URL_INTERP_AREA.toLowerCase();
            		if (selectedUrl === checkUrl) {
            			//console.log(editFtr.attributes.StatusInterpArea);
            			if (editFtr.attributes.StatusInterpArea === "In Initial Review") {
	            			bootbox.confirm("<b>Warning</b> you will permanently delete the selected Interpretation Area. Click OK to proceed, cancel to keep the Area", function(result) {
	            				if (result) {
	            					esri.show(loading);
	            					app.deleteFeature(editFtr, null);
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
            			//console.log("not equal");
            			popup.clearFeatures();
            			bootbox.alert("You cannot delete features from " + editFtr._layer.name + ". <br/><br/>If you are trying to select a feature from a different layer, try turning off any other layers that might be selected instead.");
            			esri.hide(loading);
            		}
        		break;
        		case "optionsRadios10":
        			// Loading Prioritization Model - user clicked on a Pr Area boundary
        			$(".esriPopupWrapper").css("display","none");
        			var selCount = popup.count;
            		var modelFtr = popup.getSelectedFeature();
            		var modelFtrName = modelFtr.attributes.PrioritizAreaName;
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
					//console.log("update feature successful");
					shapeEditStatus = null;
					shapeEditBackup = null;
					app.stopEdit();
					shapeEditLayer.refresh();	
				}, function error() {
					bootbox.alert("An error occured when applying the update.");
					//console.log("error");
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
	
	// -- Section 5: Map Functionality -------------------------------------------------------------

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
		var containers = $('#menu1, #menu2, #menu3, #menu4, #menu5, #menu6, #menu7');
		containers.removeClass("slide-out");
		containers.removeClass("showing");
		containers.removeClass("active");
		showing = false;
		$("#ribbon-bar-toggle").hide();
 	};

	app.findRegion = function() {
		// Search by Region tool - Query and zoom to the selected Region boundary
		$.when(app.runQuery(appConfig.URL_REGION, "RB=" + $('#frmSearchRegion').val(), true, function(callback) {
			var extent = callback.features[0].geometry.getExtent();
			map.setExtent(extent);
		}));
		
	};
	
	app.findInterpArea = function() {
		// Search by Interpretation Area tool - Query and zoom to the selected Interp Area boundary
		$.when(app.runQuery(appConfig.URL_INTERP_AREA, "InterpAreaName='" + $('#frmSearchInterp').val() + "'", true, function(callback) {
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
	
	// Section 6: Model Functionality ------------------------------------------
	
	app.initModelMenu = function(option) {
		// For Model Tools menu items - sets behavior for each radio button option
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
				app.resetLoadModel();
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
				esri.show(loading);
				app.resetLoadModel();
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
				
				// Populate the drop down list based on query of existing Models
				var modelList = "";
				
				$.when(app.runQuery(appConfig.URL_PRIOR_MODELS, "0=0", false, function(res) {
					$.each(res.features, function(i) {
						//console.log(res.features[i].attributes.ModelRunName);
						modelList += "<option value='" + res.features[i].attributes.ModelRunKey + "'>" + res.features[i].attributes.ModelRunName + "</option>";
					});
					$("#selectPriorModel").html(modelList);
					app.resetModelPopup();
					$("#modelSelect").modal("show");
					esri.hide(loading);
				}));
			break;
			case "optionsRadios6":
				// delete prioritization area
				app.isolatePopup("Prioritization Areas");
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
				app.isolatePopup("Interpretation Areas");
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
				$("#editInstructions").html("Click on the Interpretation Area you want to delete.<br/><br/><b>Note</b>, you can only delete areas that are 'In Initial Review'.");
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
				app.initDelRegionList();
				$("#deleteModelFromList").show();
				$("#editInstructions").html("1. Select the Region the Model resides within.<br/>2. Select the Prioritization Area that the Model belongs to.<br/>3. A popup dialog will appear with next steps.");
			break;
		}
		//dojo.disconnect(clickHandler);
		//clickHandler = null;
	};
	
	app.resetModelPopup = function() {
		// Reset the Model modal popup to default values
		$("#inputModelName").prop("disabled", false);
		$("#inputModelName").val("");
		//$("#modelInfo").html("");
		$("#inputModelReg").val("");
		$("#inputModelPaId").val("");
		$("#inputModelPaName").val("");
		$("#modelInstructions").html("Enter the Model Name, select the parameters you want to use, and specify weights");
		$("#modelParameters").show();
		$("#modelProgress").hide();
		$("#modelBtnCancel").show();
    	$("#modelBtnSave").show();
    	$("#modelBtnClose").hide();
    	lastModelNum = null;
    	newModelNum = null;
    	modelNumObjectId = null;
    	modelNewOrEdit = null;
    	regionNum = null;
    	app.resetPopup();
	};
	
	app.newModel = function(editFtr) {
		// Create new Prioritization Model
		esri.show(loading);
		modelNewOrEdit = "new";
		app.resetModelPopup(); // removes any previously-created elements
		var paAttr = editFtr.attributes;
		regionNum = paAttr.SWRCBRegID;
		map.graphics.clear();
		
		// Get the last used model number
		$.when(app.runQuery(appConfig.URL_PRIOR_MODEL_NUMBER, "0=0", false, function(callback1) {
			lastModelNum = callback1.features[0].attributes["Reg" + regionNum + "LastModelNumAssigned"];
			newModelNum = lastModelNum + 1;
			modelNumObjectId = callback1.features[0].attributes.OBJECTID;
			
			// Update the last used model number with + 1
			//$.when(app.updateAttributes(appConfig.URL_PRIOR_MODEL_NUMBER, modelNumObjectId, "Reg" + regionNum + "LastModelNumAssigned", newModelNum, function(callback2) {
				
				// Dynamically build the elemments on the Model popup based upon what is available from the PreProcInputs table
				
				// Column headers
		    	var modelInput = '<div class="row"><b>'
					+ 	'<div class="col-md-1">Include?</div>'
					+ 	'<div class="col-md-2">Factor</div>'
					+ 	'<div class="col-md-2">Model Weight (%)</div>'
					+ 	'<div class="col-md-2">Risk Level 3</div>'
					+ 	'<div class="col-md-3">Risk Level 2</div>'
					+ 	'<div class="col-md-2">Risk Level 1</div></b>'
					+   '</div>';
		    	
		    	// Reset arrays for available Factors. paramFactors is the actual name, modelFactors is the name with underscores replacing spaces.
		    	modelFactors = [];
		    	paramFactors = [];
		    	
		    	// Query the PreProcInputs table
		    	$.when(app.runQuery(appConfig.URL_PRIOR_PREPROC_INPUTS, "SWRCBRegID = '" + paAttr.SWRCBRegID + "'", false, function(res) {
					// Dynamically build the forms for parameter input
					var qryRes = res.features;
					$.each(qryRes, function(i) {
						//console.log(qryRes[i].attributes);
						var paramName = qryRes[i].attributes.PreProcDataSourceName;
						var paramNameTrim = paramName.replace(/\s+/g , "_");
						modelFactors.push(paramNameTrim);
						paramFactors.push(paramName);
						modelInput += ""
							+ '<div class="row">'
							+ 	'<div class="col-md-1">'
							+ 		'<input id="toggle' + paramNameTrim + '" type="checkbox" checked data-toggle="toggle" data-size="small" data-on="Include" data-off="Exclude" data-width="70">'
							+ 	'</div>'
							+ 	'<div class="col-md-2">'
							+		'<label class="checkbox-inline model-label">' + paramName + '&nbsp;</label>'
							+ 	'</div>'
							+ 	'<div class="col-md-2">'
							+ 		'<div class="input-group"><div class="input-group-addon input-group-sm input-label">Weight</div>'
							+ 		'<input type="number" min="0" max="100" value="10" class="form-control form-value" id="input' + paramNameTrim + '" name=""></div>'
							+ 	'</div>'
							+ 	'<div class="col-md-2">'
							+ 		'<label class="checkbox-inline model-label">' + qryRes[i].attributes.PreProcLevel3 + '</label>'
							+ 	'</div>'
							+ 	'<div class="col-md-3">'
							+ 		'<label class="checkbox-inline model-label">' + qryRes[i].attributes.PreProcLevel2 + '</label>'
							+ 	'</div>'
							+ 	'<div class="col-md-2">'
							+ 		'<label class="checkbox-inline model-label">' + qryRes[i].attributes.PreProcLevel1 + '</label>'
							+ 	'</div>'
							+ '</div>';
					});
					$("#modelParameters").html(modelInput);
					$("#inputModelReg").val(paAttr.SWRCBRegID);
					$("#inputModelPaId").val(paAttr.PrioritizAreaKey);
					$("#inputModelPaName").val(paAttr.PrioritizAreaName);
					$("#inputModelRunId").val(newModelNum);
					$("#modelInstructions").html("Enter the Model Name, select the parameters you want to use, and specify weights");
					$("#modelPopup").modal("show");
					
					// initialize the bootstrapToggle checkbox function
					$.each(modelFactors, function(i) {
						$('#toggle' + modelFactors[i]).bootstrapToggle();
						// Set on-change behavior for Model Parameter toggles
		    			$("#toggle" + modelFactors[i]).change(function() {
			    			if ($(this).prop("checked")) {
					    		$("#input" + modelFactors[i]).prop('disabled', false);
					    	} else {
					    		$("#input" + modelFactors[i]).prop('disabled', true);
					    		$("#input" + modelFactors[i]).val(0);
					    	}
		    			});
					});
					esri.hide(loading);
				}));
			//}));
		}));
	};
	
	app.existingModel = function() {
		// Create new Prioritization Model
		esri.show(loading);
		
		$("#modelSelect").modal("hide");
		
		app.resetModelPopup(); // removes any previously-created elements
		var selModel = $("#selectPriorModel").val();
		modelNewOrEdit = "edit";
		
		
		$.when(app.runQuery(appConfig.URL_PRIOR_MODELS, "ModelRunKey = '" + selModel + "'", false, function(inputFtr) {
			//console.log(inputFtr);

			var paAttr = inputFtr.features[0].attributes;
			regionNum = paAttr.SWRCBRegID;	
			
			// Dynamically build the elemments on the Model popup based upon what is available from the PreProcInputs table
			
			// Column headers
	    	var modelInput = '<div class="row"><b>'
				+ 	'<div class="col-md-1">Include?</div>'
				+ 	'<div class="col-md-2">Factor</div>'
				+ 	'<div class="col-md-2">Model Weight (%)</div>'
				+ 	'<div class="col-md-2">Risk Level 3</div>'
				+ 	'<div class="col-md-3">Risk Level 2</div>'
				+ 	'<div class="col-md-2">Risk Level 1</div></b>'
				+   '</div>';
	    	
	    	// Reset arrays for available Factors. paramFactors is the actual name, modelFactors is the name with underscores replacing spaces.
	    	modelFactors = [];
	    	paramFactors = [];
	    	
	    	// Query the PreProcInputs table
	    	$.when(app.runQuery(appConfig.URL_PRIOR_PREPROC_INPUTS, "SWRCBRegID = '" + paAttr.SWRCBRegID + "'", false, function(res) {
				// Dynamically build the forms for parameter input
				var qryRes = res.features;
				$.each(qryRes, function(i) {

					var paramName = qryRes[i].attributes.PreProcDataSourceName;
					var paramNameTrim = paramName.replace(/\s+/g , "_");

					for (j = 1; j < appConfig.PRIOR_MODEL_NUM_FACTORS + 1; j++) { 
					    if (paAttr["Input" + j + "DataSourceName"] === paramName) {
					    	//console.log("match", paramName);
					    	var inputWeight = (parseFloat(paAttr["Input" + j + "Weight"])) * 100;
					    	//console.log(inputWeight);
					    	break;
					    }
					}
					
					modelFactors.push(paramNameTrim);
					paramFactors.push(paramName);
					modelInput += ""
						+ '<div class="row">'
						+ 	'<div class="col-md-1">'
						+ 		'<input id="toggle' + paramNameTrim + '" type="checkbox" checked data-toggle="toggle" data-size="small" data-on="Include" data-off="Exclude" data-width="70">'
						+ 	'</div>'
						+ 	'<div class="col-md-2">'
						+		'<label class="checkbox-inline model-label">' + paramName + '&nbsp;</label>'
						+ 	'</div>'
						+ 	'<div class="col-md-2">'
						+ 		'<div class="input-group"><div class="input-group-addon input-group-sm input-label">Weight</div>'
						+ 		'<input type="number" min="0" max="100" value="' + inputWeight + '" class="form-control form-value" id="input' + paramNameTrim + '" name=""></div>'
						+ 	'</div>'
						+ 	'<div class="col-md-2">'
						+ 		'<label class="checkbox-inline model-label">' + qryRes[i].attributes.PreProcLevel3 + '</label>'
						+ 	'</div>'
						+ 	'<div class="col-md-3">'
						+ 		'<label class="checkbox-inline model-label">' + qryRes[i].attributes.PreProcLevel2 + '</label>'
						+ 	'</div>'
						+ 	'<div class="col-md-2">'
						+ 		'<label class="checkbox-inline model-label">' + qryRes[i].attributes.PreProcLevel1 + '</label>'
						+ 	'</div>'
						+ '</div>';
				});
				$("#modelParameters").html(modelInput);
				$("#inputModelReg").val(paAttr.SWRCBRegID);
				$("#inputModelPaId").val(paAttr.PrioritizAreaKey);
				$("#inputModelName").val(paAttr.ModelRunName);
				$("#inputModelName").prop(paAttr.ModelRunName);
				$("#inputModelName").prop("disabled",true);
				$("#inputModelRunId").val(paAttr.ModelRunID);
				$("#modelInstructions").html("Modify the model parameters.");
				$("#modelPopup").modal("show");
				
				// initialize the bootstrapToggle checkbox function
				$.each(modelFactors, function(k) {
					$('#toggle' + modelFactors[k]).bootstrapToggle();
					// Set on-change behavior for Model Parameter toggles
	    			$("#toggle" + modelFactors[k]).change(function() {
		    			if ($(this).prop("checked")) {
				    		$("#input" + modelFactors[k]).prop('disabled', false);
				    	} else {
				    		$("#input" + modelFactors[k]).prop('disabled', true);
				    		$("#input" + modelFactors[k]).val(0);
				    	}
	    			});
				});
				esri.hide(loading);
			}));
		}));
	};
	
	app.saveModel = function() {
		esri.show(loading);
		// Save Prioritization Model from the modal popup

		// Check to make sure a Model Name is entered
		if ($("#inputModelName").val() === "") {
			$("#modelCheck").html("<br/><mark>Please enter a Model Name.</mark>");
			esri.hide(loading);
		} else {
			// Check to verify the total weight of all included parameters equals 100
			var totalWeight = 0;
	    	$.each(modelFactors, function(i) {
	    		var paramVal = parseInt($("#input" + modelFactors[i]).val());
	    		totalWeight += paramVal;
	    	});
	    	if (totalWeight < 100) {
	    		$("#modelCheck").html("<br/><mark>The current total of all Weights is <b>" + totalWeight + "</b>. Please adjust the weights until the total is 100.</mark>");
	    		esri.hide(loading);
	    	} else {
	    		if (totalWeight > 100) {
	    			$("#modelCheck").html("<br/><mark>The current total of all Weights is <b>" + totalWeight + "</b>. Please adjust the weights until the total is 100.</mark>");
	    			esri.hide(loading);
	    		} else {
	    			// OK to proceed	
	
					// If editing an existing model, alert user prior to over-writing previous run.
					if (modelNewOrEdit === "edit") {
						bootbox.confirm("<b>Warning</b> any previously generated results from this existing Prioritization Model will be overwritten. Click OK to proceed.", function(result) {
							if (result) {
								saveModelProceed();
							} else {
								esri.hide(loading);
							}
						});
					} else {
						// This is a new model. Check to make model name isn't duplicated.
						var regNum = $("#inputModelReg").val();
						$.when(app.runQuery(appConfig.URL_PRIOR_MODELS, "SWRCBRegID = '" + regNum + "'", false, function(checkNameRes) {
							if (checkNameRes.features.length > 0) {
								var proceedWithRun = true;
								$.each(checkNameRes.features, function(r) {
									if (checkNameRes.features[r].attributes.ModelRunName === $("#inputModelName").val()) {
										proceedWithRun = false;
										$("#modelCheck").html("<br/><mark>The Model Name is already in use. Please use a different name.</mark>");
										esri.hide(loading);
										//console.log("dup names");
									}
								});
								if (proceedWithRun) {
									console.log("proceed");
									// OK to proceed with saving new model.
									// Update the last used model number with + 1
									$("#modelCheck").html("");
									$.when(app.updateAttributes(appConfig.URL_PRIOR_MODEL_NUMBER, modelNumObjectId, "Reg" + regionNum + "LastModelNumAssigned", newModelNum, function(callback2) {
										saveModelProceed();
									}));
								};
							} else {
								$.when(app.updateAttributes(appConfig.URL_PRIOR_MODEL_NUMBER, modelNumObjectId, "Reg" + regionNum + "LastModelNumAssigned", newModelNum, function(callback2) {
									saveModelProceed();
								}));
							}
						}));
						
					}
					
					function saveModelProceed() {
						$("#modelCheck").html("");
		    			
		    			// build the parameters that will be submitted to the gp service
		    			var gpParams = {
							"PrioritizAreaKey" : $("#inputModelPaId").val(),
							"ModelRunID" : $("#inputModelRunId").val(),
							"Model_Run_Name" : $("#inputModelName").val(),
							"Huc12_feature_class_name" : "HUC_12_Watersheds",
						};
						// Loop through model factors to build the parameters that will be used in the gp tool
						$.each(paramFactors, function(i) {
							if (!($("#input" + modelFactors[i]).prop('disabled'))) {
								gpParams["Input" + i+1 + "_DataSource"] = paramFactors[i];
								gpParams["Input" + i+1 + "_Level_Combo"] = "1";
								gpParams["Input" + i+1 + "_Weight"] = parseInt($("#input" + modelFactors[i]).val()) / 100;
							}
						});
			
						//console.log(gpParams);
						esri.hide(loading);
				    	
				    	$("#modelParameters").hide();
				    	$("#modelInstructions").hide();
				    	$("#modelProgress").show();
				    	$("#modelProgressImage").show();
				    	$("#modelBtnCancel").hide();
				    	$("#modelBtnSave").hide();
				    	$("#modelBtnClose").show();
				    	$("#inputModelName").prop("disabled", true);
		
						// Initiate and run the geoprocessing service
						gp = new Geoprocessor(appConfig.URL_GP_MODEL_PRIOR_GROWS);
						gp.submitJob(gpParams, gpCompleteCallback, gpStatusCallback);
						$("modelProgressImage").show();

						function gpStatusCallback(jobInfo) {
							//console.log(jobInfo.jobStatus);
							$("#modelProgressText").html("Status: Modeling in Process");
						};
					
						function gpCompleteCallback(jobInfo) {
							console.log("Geoprocessing Model completed: ", jobInfo);
							$("#modelProgressText").html("<b>Status: Modeling Complete!</b><br/><br/>");
							$("#modelProgressImage").hide();
						};
					}
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
			$.when(app.runQuery(urlSource, qryWhere, true, function(callback) {
				inputPolys.push(callback.features[0].geometry);
				//console.log(inputPolys.length, polyCount);
				if (inputPolys.length === polyCount) {
					geometryService.union(inputPolys, function(result) {
						map.graphics.clear();
						map.graphics.add(new Graphic(result, editFillSymbol));
						esri.hide(loading);
						//bootbox.alert("union completed");
						switch(outputLayer) {
							case "interpretation":
								// new interpretation area being created
								//console.log("save interpretation ", newFeatureName, result);
								//testObj = result;
								var center = result.getCentroid();
								
								//get the Region that the new interp area falls within
								var query = new Query();
								query.geometry = center;
								layers[regionLyrIndex].layer.queryFeatures(query, function(featureset) {
									//console.log("region query results", featureset);
									var regionId = featureset.features[0].attributes.RB;
									//console.log("regionid", regionId);
									$.when(app.runQuery(appConfig.URL_INTERP_AREA_NUM, "0=0", false, function(callback) {
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
								//console.log("save prioritization ", newFeatureName, result);
								var center = result.getCentroid();
								
								//get the Region that the new interp area falls within
								var query = new Query();
								query.geometry = center;
								layers[regionLyrIndex].layer.queryFeatures(query, function(featureset) {
									//console.log("region query results", featureset);
									var regionId = featureset.features[0].attributes.RB;
									//console.log("regionid", regionId);
									$.when(app.runQuery(appConfig.URL_PRIOR_AREA_NUM, "0=0", false, function(callback) {
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
						//StatusPrioritizArea: "Approved for Modeling",
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
		//app.updateAttributes(appConfig.URL_PRIOR_MODEL_NUMBER, 1, "Reg1LastModelNumAssigned", 0, null);
		
		var updFeature = '[{"attributes": { "OBJECTID": ' + objId + ', "' + updateField + '": ' + updateValue + '}}]';	
		//console.log(updateAttributes);			

		var url = ftrUrl + "/updateFeatures";
		var updString = {
	        f: 'json',
	        //where: "objectId=" + objId,
	        features: updFeature//,
	        //token: token
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
	
	app.initDelRegionList = function() {
		// Populates drop down lists based on regions and models available
		var regionList = [];
		regionList += "<option value=''>Select a Region</option>";
		$.when(app.runQueryDistinctVal(appConfig.URL_PRIOR_MODELS, "0=0", "SWRCBRegID", false, function(res1) {
			$.each(res1.features, function(i) {
				//console.log(res.features[i].attributes.ModelRunName);
				regionList += "<option value='" + res1.features[i].attributes.SWRCBRegID + "'>" + res1.features[i].attributes.SWRCBRegID + "</option>";
				//modelList += "<option value='" + res.features[i].attributes.ModelRunKey + "'>" + res.features[i].attributes.ModelRunName + "</option>";
			});
			$("#selectDelPrRegion").html(regionList);
		}));
		//$.when(app.runQuery(appConfig.URL_PRIOR_MODELS, "0=0", false, function(res2) {
		//	priorModelsRecs = res2;
			//$("#selectLoadPrModel").html(modelList);
		//}));
		$.when(app.runQuery(appConfig.URL_PRIOR_AREA, "0=0", false, function(res2) {
			priorAreaRecs = res2;
			//$("#selectLoadPrModel").html(modelList);
		}));
	};
	
	app.initDelModelList = function() {
		// Populates drop down lists based on regions and models available
		var modelList = [];
		modelList += "<option value=''>Select a Prioritization Area</option>";
		$.each(priorAreaRecs.features, function(i) {
			if (priorAreaRecs.features[i].attributes.SWRCBRegID === $("#selectDelPrRegion").val()) {
				modelList += "<option value='" + priorAreaRecs.features[i].attributes.PrioritizAreaKey + "'>" + priorAreaRecs.features[i].attributes.PrioritizAreaName + "</option>";
			}
		});
		$("#selectDelPrModel").html(modelList);
		$("#selectDelPrModel").prop('disabled', false);
	};
	
	app.loadDelModel = function(prioritizAreaID, modelFtrName) {
		//esri.show(loading);
		//console.log(prioritizAreaID, modelFtrName);
		// Loads a prioritization model - the PrioritizationGrows polygons + related results
		$.when(app.runQuery(appConfig.URL_PRIOR_MODELS, "PrioritizAreaKey = '" + prioritizAreaID + "'", false, function(resModels) {
			console.log(resModels);
			var modelCount = resModels.features.length;
			if (modelCount === 0) {
				bootbox.alert("No Prioritization Models have been created for this Prioritization Area.");
				//esri.hide(loading);
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
						message: '<select id="delModelList" class="form-control">' +
							modelList +
							'</select>',
						buttons: {
							success: {
								label: "Proceed",
								callback: function() {
									selectModel = $("#delModelList").val();
									//console.log(selectModel);
									//selectModelName = resModels.features[selectModel].attributes.ModelRunKey;
									bootbox.confirm(resModels.features[selectModel].attributes.ModelRunName + " will be deleted. Are you sure?", function(result) {
										if (!(result)) {
											
										} else {
											console.log("delete:", resModels.features[selectModel].attributes.ModelRunKey, resModels.features[selectModel].attributes.OBJECTID);
											esri.show(loading);
											app.deleteFeature(resModels.features[selectModel], appConfig.URL_PRIOR_MODELS);
										}
									});
									//console.log(selectModelName, resModels.features[selectModel].attributes.OBJECTID);
									//app.deletePrAreaModels(selectModelName);
									/*if (resModels.features[selectModel].attributes.ModelRunCompleted) {
										$.when(app.runQuery(appConfig.URL_PRIOR_MODELS_SUMMARY, "ModelRunKey = '" + resModels.features[selectModel].attributes.ModelRunKey + "'", false, function(resSummary) {
											showResults(resSummary.features[0].attributes);
										}));
									} else {
										bootbox.alert("Modeling is still processing for this Prioritization Model. Please try again later.");
										map.graphics.clear();
										esri.hide(loading);
									}*/
									
								}
							}
						}
					});
				} else {
					bootbox.confirm(resModels.features[0].attributes.ModelRunName + " will be deleted. Are you sure?", function(result) {
						if (!(result)) {
							
						} else {
							console.log("delete:", resModels.features[0].attributes.ModelRunKey, resModels.features[0].attributes.OBJECTID);
							//resModels.features[0];
							esri.show(loading);
							app.deleteFeature(resModels.features[0], appConfig.URL_PRIOR_MODELS);
						}
					});
					//app.deletePrAreaModels(selectModelName);
					/*if (resModels.features[0].attributes.ModelRunCompleted) {
						$.when(app.runQuery(appConfig.URL_PRIOR_MODELS_SUMMARY, "ModelRunKey = '" + resModels.features[0].attributes.ModelRunKey + "'", false, function(resSummary) {
							showResults(resSummary.features[0].attributes);
						}));
					} else {
						bootbox.alert("Modeling is still processing for this Prioritization Model. Please try again later.");
					}*/
	
				}
			}
		}));
		
		/*
		function showResults(sumAttr) {
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
			var shortSummary = ""
				+ "Prioritization Area: <b> " + modelFtrName + "</b><br/>"
				+ "Model Name: <b> " + selectModelName + "</b><br/><br/>"
				+ "Number of Grows: " + sumAttr.NumGrows + "<br/>"
				+ "&nbsp;&nbsp;Outdoor: " + sumAttr.NumOutdoorGrows + "<br/>"
				+ "&nbsp;&nbsp;Greenhouse: " + sumAttr.NumGreenHouseGrows + "<br/>"
				+ "Total Acreage of Grows: " + sumAttr.TotalAcreageGrows + "<br/>";
			$("#modelResultsSummary").html(shortSummary);

			$.when(app.createAppendedLayer(appConfig.URL_PRIOR_MODELS_RESULTS, appConfig.URL_PRIOR_MODELS_RESULTS_RELATE, "ModelRunKey='" + sumAttr.ModelRunKey + "'", "PrioritizGrowKey", selectModelName, function(complete) {
				
				$.when(app.polyToPointLayer(selectModelName + " - point", appConfig.URL_PRIOR_MODELS_RESULTS, "ModelRunKey='" + sumAttr.ModelRunKey + "'", appConfig.URL_PRIOR_MODELS_RESULTS_RELATE, "ModelRunKey='" + sumAttr.ModelRunKey + "'", "PrioritizGrowKey", function(ptCallback) {
					
					app.updateRenderer();
					$("#optionsRadios10:checked").prop("checked",false);
					$("#optionsRadios11:checked").prop("checked",false);
					$("#editRadios10").hide();
					$("#editRadios11").hide();
					$("#loadModelFromList").hide();
					$("#loadModelStatus").html("Prioritization Model Loaded.");
					$("#modelInstructions").html("Prioritization Model Loaded.<br/>Click Reset to remove and start over.");
					app.resetPopup();
					app.zoomToLayerExtent(selectModelName);
					esri.hide(loading);
					//layers[growLyrIndex].layer.setVisibility(false);
					layers[growLocLyrIndex].layer.setVisibility(false);
					map.graphics.clear();
				}));
			}));
		}*/
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
	
	app.deleteFeature = function(ftr, url) {
		// user confirmed delete, now delete the feature with an ajax call
		//console.log(ftr);
		if (!(url)) {
			var url = ftr._layer._url.path + "/deleteFeatures";
		} else {
			url += "/deleteFeatures";
		}
		
		var params = "OBJECTID = " + ftr.attributes.OBJECTID;
		var dataString = {
			f: "json",
			where: params//,
			//token: token
		};

	    $.ajax({
	        url: url,
	        type: "POST",
	        dataType: "json",
	        data: dataString,
	        success: function (data) {
	        	//bootbox.alert("Delete feature successful.");
	        	app.stopEdit();
	        	if(ftr._layer) {
	        		ftr._layer.clearSelection();
	        		ftr._layer.refresh();
	        	} else {
	        		$.each(layers, function(i) { 
	        			layers[i].layer.clearSelection();
  						layers[i].layer.refresh();
 					});
	        	}
	        	esri.hide(loading);
	        },
	        error: function (response) {
	            bootbox.alert("An error occured, please try again.");
	            app.stopEdit();
	            esri.hide(loading);
	        }
	    });
		
	};
	
	app.deletePrAreaModels = function (delPrAreaKey) {
    	$.when(app.runQuery(appConfig.URL_PRIOR_MODELS, "PrioritizAreaKey = '" + delPrAreaKey + "'", false, function(resPrModels) {
    		var delModelId = "";
    		var resultCount = resPrModels.features.length;
    		//console.log(resultCount, resPrModels);
    		if (resultCount > 0) {
    			if (resultCount === 1) {
    				console.log("deleting", resPrModels.features[0]);
    				esri.show(loading);
    				app.deleteFeature(resPrModels.features[0], appConfig.URL_PRIOR_MODELS);
    				//delModelId += resPrModels.features[0].attributes.ModelRunKey;
    				//console.log(delModelId);
    				//app.gpDeleteModels(delModelId);
    			} else {
    				$.each(resPrModels.features, function(i) {
    					esri.show(loading);
    					app.deleteFeature(resPrModels.features[i], appConfig.URL_PRIOR_MODELS);
    					console.log("deleting", resPrModels.features[i]);
    					//delModelId += resPrModels.features[i].attributes.ModelRunKey;
    					//if (i+1 < resultCount) {
    					//	delModelId += ",";
    					//}
    					
    				});
    				//console.log(delModelId);
    				//app.gpDeleteModels(delModelId);
    			}
    		}
		}));
	};
	
	app.gpDeleteModels = function (delModelId) {
    			
		var gpParams = {
			"###" : delModelId
		};	
		
		// Initiate and run the geoprocessing service
		gp = new Geoprocessor(appConfig.URL_GP_MODEL_DELETE_MODEL);
		console.log("ready to run gp model", gpParams);
		//gp.submitJob(gpParams, gpCompleteCallback, gpStatusCallback);

		function gpStatusCallback(jobInfo) {
			console.log(jobInfo.jobStatus);
			//$("#modelProgressText").html("Status: Modeling in Process");
		};
	
		function gpCompleteCallback(jobInfo) {
			console.log("Geoprocessing Model completed: ", jobInfo);
			//$("#modelProgressText").html("<b>Status: Modeling Complete!</b><br/><br/>");
			//$("#modelProgressImage").hide();
		};
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
	
	/*app.saveGraphic = function () {
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
	};*/
	
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
		$("#editInstructions").html("Select an option.");
    	if (!(clickHandler)) {
			clickHandler = dojo.connect(map, "onClick", clickListener);
		};
		$("#attributesDiv").hide();
		$("#editButtons").hide();
		$("#deleteModelFromList").hide();
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
		// NOTES: token removed from addParams below, necessary with move of data from AGOL to AGS
		//        Added "[" and "]" to addFeature, necessary with move of data from AGOL to AGS
		var addFeature = "[" + JSON.stringify(feature) + "]";
		
		var urlEdit = url + "/addFeatures";
		var addParams = {
	        f: "json",
	        features: addFeature//,
	        //token: token
	    };
	    
	    testvar = addFeature;
	
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
		//$.when(app.runQuery(appConfig.URL_PRIOR_MODELS, "0=0", false, function(res2) {
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
		$("#modelResults").hide();
		$("#loadModelStatus").html("");
		if (prModelPoly) {
			$.when(app.removeMapLayer(prModelPoly.id, function(callback) {
			$.when(app.removeMapLayer(prModelPoint.id, function(callback) {
				esri.hide(loading);
				prModelPoly = null;
				prModelPoint = null;
			}));
		}));
		}
		ftrLayer = null;
		pointFtrLayer = null;
		map.graphics.clear();
	};
	
	app.loadModel = function(prioritizAreaID, modelFtrName) {
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
			var shortSummary = ""
				+ "Prioritization Area: <b> " + modelFtrName + "</b><br/>"
				+ "Model Name: <b> " + selectModelName + "</b><br/><br/>"
				+ "Number of Grows: " + sumAttr.NumGrows + "<br/>"
				+ "&nbsp;&nbsp;Outdoor: " + sumAttr.NumOutdoorGrows + "<br/>"
				+ "&nbsp;&nbsp;Greenhouse: " + sumAttr.NumGreenHouseGrows + "<br/>"
				+ "Total Acreage of Grows: " + sumAttr.TotalAcreageGrows + "<br/>";
			$("#modelResultsSummary").html(shortSummary);

			$.when(app.createAppendedLayer(appConfig.URL_PRIOR_MODELS_RESULTS, appConfig.URL_PRIOR_MODELS_RESULTS_RELATE, "ModelRunKey='" + sumAttr.ModelRunKey + "'", "PrioritizGrowKey", selectModelName, function(complete) {
				
				$.when(app.polyToPointLayer(selectModelName + " - point", appConfig.URL_PRIOR_MODELS_RESULTS, "ModelRunKey='" + sumAttr.ModelRunKey + "'", appConfig.URL_PRIOR_MODELS_RESULTS_RELATE, "ModelRunKey='" + sumAttr.ModelRunKey + "'", "PrioritizGrowKey", function(ptCallback) {
					
					app.updateRenderer();
					$("#optionsRadios10:checked").prop("checked",false);
					$("#optionsRadios11:checked").prop("checked",false);
					$("#editRadios10").hide();
					$("#editRadios11").hide();
					$("#loadModelFromList").hide();
					$("#loadModelStatus").html("Prioritization Model Loaded.");
					$("#modelInstructions").html("Prioritization Model Loaded.<br/>Click Reset to remove and start over.");
					app.resetPopup();
					app.zoomToLayerExtent(selectModelName);
					esri.hide(loading);
					//layers[growLyrIndex].layer.setVisibility(false);
					layers[growLocLyrIndex].layer.setVisibility(false);
					map.graphics.clear();
				}));
			}));
		}
	};
	
	app.createAppendedLayer = function(featureUrl, relateUrl, qryWhere, relateField, featureName, callback) {
		var ftrLayer, relateLayer;

		$.when(app.runQuery(featureUrl, qryWhere, true, function(qryResultsLyr) {
			ftrLayer = qryResultsLyr;
			$.when(app.runQuery(relateUrl, qryWhere, false, function(qryResultsRelate) {
				relateLayer = qryResultsRelate;

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
		app.classBreakRendererPoly('Input' + $('#modelDisplayBy').val() + 'PreProcScore', prModelPoly);
		app.classBreakRendererPoint('Input' + $('#modelDisplayBy').val() + 'PreProcScore', prModelPoint);
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
	
	// -- Section 8: Authentication ----------------------------------------------------
	
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
	
	// -- Section 9: Page Ready ----------------------------------------------------

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

    });
});
