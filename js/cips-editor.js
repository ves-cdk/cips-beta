// -- Section 1: Global Variables ----------------------------------------------------
var map, mapDeferred, mapResponse, mapNav, toc, loading; // core map objects
var layers, clickHandler, clickListener, lyrInfoTemplate = []; // used for popups
var clusterLayer, clusterLayerClickHandler; // used for clustered grow location display
var basemapGallery, measurement, tb, epWidget, lineSymbol, timeSlider; // map widgets
var showInfoWindow = "default"; // used to control map behavior based upon selected tool
var cred = "esri_jsapi_id_manager_data"; // cookie/localStorage variable for ArcGIS for Server authentication
var statsLoaded = [null,true,false,false,false,false,false,false,false,false,false]; // this is used to initialize stats carousels
var sumDataRegion, sumDataInterp; // used for query results for summary statistics
var sumRegion = {}, sumInterp = {}; // region and interpretation objects storing summary stats
var featureCollection, popupInfo, featureInfoTemplate, addLayers = [], renderer, pointFtrLayer, layerFromQuery; // for dynamic layer load and rendering
var editPointSymbol, editLineSymbol, editFillSymbol, graphicTb, addGraphicEvt, editSettings, editorWidget, attInspector, layerInfo; // editing variables
var shapeEditLayer, shapeEditStatus, shapeEditBackup; // editing variables
var interpLyrIndex, regionLyrIndex; // used for getting onClick results from specific layers
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
    "esri/geometry",
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
    Geometry,
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
        
    //var basemapGallery, scalebar, locator;
    
    document.title = appConfig.APP_NAME_HTML_TITLE;
    
    var app = dojo.getObject('app', true); // global object to allow function calls from the app.
    
    // Proxy settings
    esriConfig.defaults.geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    esriConfig.defaults.io.alwaysUseProxy = false;
    esriConfig.defaults.io.corsEnabledServers.push("tasks.arcgisonline.com");
    esriConfig.defaults.io.corsEnabledServers.push("mapserver2.vestra.com");
    esriConfig.defaults.io.corsEnabledServers.push("mapserver.vestra.com");    
    esriConfig.defaults.io.corsEnabledServers.push("map.dfg.ca.gov");  
    //esriConfig.defaults.io.corsEnabledServers.push("sampleserver6.arcgisonline.com"); 
    //esriConfig.defaults.io.corsEnabledServers.push("localhost");  
    //esriConfig.defaults.io.timeout = 12000;   
    //esriConfig.defaults.io.proxyUrl = "http://localhost/apps/cipsproxy/DotNet/proxy.ashx";
    
    urlUtils.addProxyRule({
	  urlPrefix: "tasks.arcgisonline.com",
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
            	if (lyr.title === "Interpretation Areas") {
            		interpLyrIndex = i;
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
    
    app.buildPopup = function () {
	    // Customize popup behavior when editing features
        var popup = map.infoWindow;
        
        on(popup, "SetFeatures", function() {
        	// loop through edit options to control popup behavior
        	var editRadios = ["optionsRadios1", "optionsRadios2", "optionsRadios3", "optionsRadios4", "optionsRadios5", "optionsRadios6", "optionsRadios7"];
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
        		case "optionsRadios4":
        			// Do nothing - adding new features, don't want to display popup;
        		break;
        		case "optionsRadios5": 
        		// Edit feature's attributes
            		$(".esriPopupWrapper").css("display","none");
            		var editFtr = popup.getSelectedFeature();
            		if (editFtr._layer._editable) {
            			bootbox.confirm("Edit the selected feature?", function(result) {
            				if (result) {
            					app.editFeature(editFtr, "attributes");
            					console.log(editFtr);
            				} else {
            					popup.clearFeatures();
            				}
            			});
            		} else {
            			bootbox.alert("You cannot edit features from " + editFtr._layer.name + ". <br/><br/>If you are trying to select a feature from a different layer, try turing off any other layers that might be selected instead.");
            			popup.clearFeatures();
            		}
        		break;
        		case "optionsRadios6": 
        		// Edit feature's shape
        			$(".esriPopupWrapper").css("display","none");
            		var editFtr = popup.getSelectedFeature();
            		if (editFtr._layer._editable) {
            			bootbox.confirm("Edit the selected feature?", function(result) {
            				if (result) {
            					app.editFeature(editFtr, "shape");
            				} else {
            					popup.clearFeatures();
            				}
            			});
            		} else {
            			bootbox.alert("You cannot edit features from " + editFtr._layer.name + ". <br/><br/>If you are trying to select a feature from a different layer, try turing off any other layers that might be selected instead.");
            			popup.clearFeatures();
            		}
        		break;
        		case "optionsRadios7": 
        		// Delete a feature
        			esri.show(loading);
            		$(".esriPopupWrapper").css("display","none");
            		var editFtr = popup.getSelectedFeature();
            		if (editFtr._layer._editable) {
            			bootbox.confirm("<b>Warning</b> you will permanently delete the selected feature from the " + editFtr._layer.name + " layer? <br/><br/>Click OK to proceed, or click Cancel and keep the feature.", function(result) {
            				if (result) {
            					app.deleteFeature(editFtr);

            					// If deleting grow polygon, need to also delete the point feature associated with it:
            					//   NOTE - this is commented out - the relationship class should take care of this.
            					/*if (editFtr._layer._url.path === appConfig.URL_EDIT_GROW_FOOTPRINTS) {
            						var GrowKey = editFtr.attributes.GrowKey;
            						// Query the point feature to get the objectId for deleting
            						$.when(app.runQuery(appConfig.URL_EDIT_GROW_POINTS, "GrowKey='" + GrowKey + "'", function(callback) {
            							// Now delete with an ajax call to the rest service
										var url = appConfig.URL_EDIT_GROW_POINTS + "/deleteFeatures";
										var params = "OBJECTID = " + callback.features[0].attributes.OBJECTID;
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
									        	console.log("delete grow point successful");
									        	
									        },
									        error: function (response) {
									        	console.log("An error occurred trying to delete Grow Point feature");
									        }
									    });
									    $.each(layers, function(layer) {
											//console.log(layers[layer].layer.url);
											if (layers[layer].layer.url === appConfig.URL_EDIT_GROW_POINTS) {
												layers[layer].layer.refresh();
											}
										});
            						}));
            					}*/
            					
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
    	app.buildMeasure();
    	$.when(app.buildClusterLayer(appConfig.GROW_POINTS_NAME, appConfig.URL_GROW_POINTS, appConfig.GROW_POINTS_SCALE, null, function(callback) {
			$.when(app.buildEditor(function(buildCallback) {
			}));
		}));
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
	
	app.buildElevProfile = function() {
		$("#elev-toggle").change(function() {
			//$("#sumWshd-toggle").bootstrapToggle("off");
			if ($("#elev-toggle").prop('checked') === true) {
				app.initElevToolbar("polyline");
				dojo.disconnect(clickHandler);
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

	app.buildGraphicTools = function() {
		// Graphics are used for editing - when adding new features, graphics are used while drawing, then the graphics are saved to the shape after user saves.
		map.enableSnapping();
		editPointSymbol = new SimpleMarkerSymbol();
		editLineSymbol = new CartographicLineSymbol();
		editFillSymbol = new SimpleFillSymbol();
		graphicTb = new Draw(map);
		
		graphicTb.on("draw-end", function(evt) {
			// add actions to keep or discard the graphic
			$("#saveGraphic").show();
			$("#stopEdit").show();
			$("#editInstructions").html("Click Continue to save the feature and go to the next step.<br/>Or click Cancel to start over.");
	    	addGraphicEvt = evt;
			graphicTb.deactivate();
			switch(evt.geometry.type) {
				case "polygon":
					var symbol = editFillSymbol;
				break;
				case "point":
					var symbol = editPointSymbol;
				break;
				case "polyline":
					var symbol = editLineSymbol;
				break;
			}
			map.graphics.add(new Graphic(evt.geometry, symbol));
		});
	};
        
    // -- Section 5: Map Functionality -------------------------------------------------------------
        
    app.syncMaps = function(mapObj) {
		// When map changes, record the map extent in order to keep all maps synconized
		var mapExtent = mapObj.extent;
		var mapCenter = mapObj.extent.getCenter;
		localStorage.extent = JSON.stringify(mapObj.extent);
	};

	app.initElevToolbar = function(toolName) {
		// Elevation Profile Widget - initialize
		epWidget.clearProfile();
		dojo.disconnect(clickHandler);
		//Clear profile
		map.graphics.clear();
		tb = new Draw(map);
		tb.on("draw-end", app.addElevGraphic);
		tb.activate(toolName);
		map.disableMapNavigation();
	};
	
	app.disableElevTool = function() {
		// Elevation Profile Widget - reset popup when the tool is deactivated
		tb.deactivate();
		epWidget.clearProfile();
		map.graphics.clear();
		clickHandler = dojo.connect(map, "onClick", clickListener);
	};
	
	app.addElevGraphic = function(evt) {
		// Elevation Profile Widget - Deactivate the toolbar and clear existing graphics
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
			"distance" : 20,
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
		map.addLayers([clusterLayer]);
		toc.layerInfos.push({
			"layer" : clusterLayer,
			"title" : newLyrName
		});
		toc.refresh();
		callback("clusterLayer complete");
	}; 

	app.summarizeWshd = function(option) {
		// Query HUC 12 watershed boundary and summarize grows that fall within
		
		// Switch option is used to enable or disable the tool. This avoids conflicts with Elevation Profile Widget.
		switch(option) {
			case true:
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
	
	app.menuChange = function(option) {
		// Called when map menu items are selected
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
		if (option.id === "menuEdit") {
	  		app.buildGraphicTools();
		}
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
        
    // Section 6: Map Editing Functions -------------------------------------------------------------
        
	app.startDraw = function(colorOption, source) {
		// editing - user is adding features
		// the colorOption variable defines what color the added temporary graphic is shown with. Current options are red or blue.
		dojo.disconnect(clickHandler);
		clickHandler = null;
		var type;
		
		$("#editRadios1").hide();
		$("#editRadios2").hide();
		$("#editRadios3").hide();
		$("#editRadios4").hide();
		$("#editRadios5").hide();
		$("#editRadios6").hide();
		$("#editRadios7").hide();
		$("#editLabelEdit").hide();
		$("#editLabelDelete").hide();
		$("#stopEdit").show();
		$("#editButtons").show();
		
		// hide options that are not selected
		switch(source) {
			case "grow":
				type = "polygon";
				$("#editRadios1").show();
				$("#editInstructions").html("Use single clicks to trace around the production area of a Grow. When done, double click.");
			break;
			case "disturbed":
				type = "polygon";
				$("#editRadios2").show();
				$("#editInstructions").html("Use single clicks to trace around the disturbed/graded area. When done, double click.");
			break;
			case "tank":
				type = "point";
				$("#editRadios3").show();
				$("#editInstructions").html("Single click on the Water Tank location.");
			break;
			case "reservoir":
				type = "polygon";
				$("#editRadios4").show();
				$("#editInstructions").html("Use single clicks to trace the Reservoir. When done, double click.");
			break;
		}
		switch (colorOption) {
			case "red":
				editPointSymbol.setColor(new esri.Color("#de2d26"));
				editPointSymbol.size = 12;
				editLineSymbol.setColor(new esri.Color("#de2d26"));
				//editFillSymbol.setOutline(lineSymbol);
				editFillSymbol.setColor(new esri.Color([222,45,38,0.4]));
			break;
			case "blue":
				editPointSymbol.setColor(new esri.Color("#488fc3"));
				editLineSymbol.setColor(new esri.Color("#488fc3"));
				//editFillSymbol.setOutline(lineSymbol);
				editFillSymbol.setColor(new esri.Color([4,117,229,0.4]));
			break;
		}
		graphicTb.activate(type);
		$("#editButtons").show();
	};
	
	app.startDelete = function() {
		// editing - initial steps for user to delete a feature
		if (!(clickHandler)) {
			clickHandler = dojo.connect(map, "onClick", clickListener);
		};
		$("#editRadios1").hide();
		$("#editRadios2").hide();
		$("#editRadios3").hide();
		$("#editRadios4").hide();
		$("#editRadios5").hide();
		$("#editRadios6").hide();
		$("#editLabelEdit").hide();
		$("#editLabelAdd").hide();
		$("#stopEdit").show();
		$("#editInstructions").html("Click on the feature you want to delete.");
		$("#editButtons").show();
		$("#attributesDiv").hide();
		
	};
	
	app.deleteFeature = function(ftr) {
		// user confirmed delete, now delete the feature with an ajax call
		var url = ftr._layer._url.path + "/deleteFeatures";
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
	
	app.startEdit = function(option) {
		// editing - initial steps to edit a feature's attributes or geometry
		switch(option) {
			case "attribute":
				if (!(clickHandler)) {
					clickHandler = dojo.connect(map, "onClick", clickListener);
				};
				$("#editRadios1").hide();
				$("#editRadios2").hide();
				$("#editRadios3").hide();
				$("#editRadios4").hide();
				$("#editRadios6").hide();
				$("#editRadios7").hide();
				$("#stopEdit").show();
				$("#editLabelAdd").hide();
				$("#editLabelDelete").hide();
				$("#editInstructions").html("Click on the feature you want to edit.<br/>For polygons, click on outline of the shape (not inside) to select the feature.");
				$("#editButtons").show();
			break;
			case "shape":
				dojo.disconnect(clickHandler);
				clickHandler = null;
				$("#attributesDiv").hide();
				$("#editRadios1").hide();
				$("#editRadios2").hide();
				$("#editRadios3").hide();
				$("#editRadios4").hide();
				$("#editRadios5").hide();
				$("#editRadios7").hide();
				$("#editLabelAdd").hide();
				$("#editLabelDelete").hide();
				$("#saveEdits").show();
				$("#stopEdit").show();
				$("#editInstructions").html("<b>For Polygon and Line features:</b><br/>"
					+ "Double click on the feature you want to modify.<br/>"
					+ "For polygons, click on the outline of the shape (not inside) to select the feature.<br/>"
					+ "The points (vertices) that make up the polygon or line will appear.<br/> Click and drag the points to adjust the boundary<br/>"
					+ "When done, click Save to record the edits.<br/><br/>"
					+ "<b>For Point features:</b><br/>"
					+ "Double click on the feature you want to modify.<br/>"
					+ "Your cursor should change to a hand when hovering over the point.<br/>"
					+ "Click and drag to move the point to a new location.<br/>"
					+ "When done, click Save to record the edits.s.");
				$("#editButtons").show();
			break;
		}
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
		
		// Get the region that this new feature falls within
		if ($("#optionsRadios3:checked").prop("checked")) {
			// optionRadios3 is a point feature, don't need centroid
			var center = addGraphicEvt.geometry;
		} else {
			// polygon features - get centroid for intersect with Interp Area and calculate the acreage of the poly
			var center = addGraphicEvt.geometry.getCentroid();
			var polyAcre = app.calcAcreage(addGraphicEvt.geometry);
		}
		var query = new Query();
		query.geometry = center;
		layers[regionLyrIndex].layer.queryFeatures(query, function(featureset) {
			var regionId = featureset.features[0].attributes.RB;
			console.log("regionId", regionId);
			
			if ($("#optionsRadios1:checked").prop("checked")) {
				// Save grow
				layers[interpLyrIndex].layer.queryFeatures(query, function(featureset) {
					var interpCount = featureset.features.length;
					if (interpCount === 0) {
						// New grows must fall within interp areas. This maintains the internal id's
						bootbox.alert("The new Grow Footprint falls outside of an Interpretation Area and cannot be added.");
					} else {
						// OK to proceed with creating new grow. Get the next ID based on the Interpretation Area that it falls within
						var interpId = featureset.features[0].attributes.InterpAreaID;
						
						$.when(app.runQuery(appConfig.URL_GROW_NUM, "0=0", function(callback) {
							var regAttr = "Reg" + regionId.toString() + "LastInterpAreaIDAssigned"; // LastPrioritizAreaIDAssigned 
								$.each(callback.features[0].attributes, function(i) { 
									if (i === regAttr) {
										var lastRegNum = callback.features[0].attributes[i];
										var objId = callback.features[0].attributes.OBJECTID;
										lastRegNum += 1;
										$.when(app.createNewGrowFeature(lastRegNum, regionId, polyAcre, addGraphicEvt.geometry, function(callback) {
											$.when(app.updateAttributes(appConfig.URL_GROW_NUM, objId, i, lastRegNum, function(callback) {
												esri.hide(loading);
											}));
										}));
									}
								});	
							}));
						
						}
				});
			}
			if ($("#optionsRadios2:checked").prop("checked")) {
				// save disturbed area
				$.when(app.createNewFeature("disturbed_area", regionId, polyAcre, addGraphicEvt, appConfig.URL_EDIT_DISTURBED_AREA, function(callback) {
					//console.log(callback);
					esri.hide(loading);
				}));
			}
			if ($("#optionsRadios3:checked").prop("checked")) {
				// save water tank
				$.when(app.createNewFeature("water_tank", regionId, null, addGraphicEvt, appConfig.URL_EDIT_WATER_TANK, function(callback) {
					//console.log(callback);
					esri.hide(loading);
				}));
			}
			if ($("#optionsRadios4:checked").prop("checked")) {
				// save reservoir
				$.when(app.createNewFeature("reservoir", regionId, polyAcre, addGraphicEvt, appConfig.URL_EDIT_RESERVOIR, function(callback) {
					//console.log(callback);
					esri.hide(loading);
				}));
			}
			$("#saveGraphic").hide();
			$("#saveEdits").show();
		});
	};
	
	app.calcAcreage = function(polygon) {
		// Calculate the acreage of a polygon shape
		var calculatedAcres;
		calculatedAcres = Math.round(100 * esri.geometry.geodesicAreas([esri.geometry.webMercatorToGeographic(polygon)], Units.ACRES)) / 100;
	    
	    if (!(calculatedAcres)) {
	    	console.info("error in acreage calc"); 
			origPoly = polygon;
			origPoly.rings[0].reverse();
			calculatedAcres = Math.round(100 * esri.geometry.geodesicAreas([esri.geometry.webMercatorToGeographic(origPoly)], Units.ACRES)) / 100;
			if (calculatedAcres < 0) {
				calculatedAcres = calculatedAcres * -1;
				return(calculatedAcres);
			} else {
				return(calculatedAcres);
			}
		} else {
			return(calculatedAcres);
		}
	}; 
	
	app.createNewGrowFeature = function(lastRegNum, regionId, polyAcre, graphic, callback) {
		// Create object for writing new Grow features

		var polygon = new Polygon(graphic.rings);
		var center = new Point(graphic.getCentroid());
		console.log(center);
		var addFeature = {
			"attributes": {
				//InterpAreaName: newFeatureName,
				PreProcStatus: "Not PreProcessed",
				InterpMethod: "Aerial Imagery",
				StatusInterpArea: "In Initial Review",
				GrowYear: new Date("1/1/2014"),
				GrowKey: regionId + "_" + lastRegNum,
				SWRCBRegID: regionId,
				GrowID: lastRegNum,
				GrowAcres: polyAcre,
				GrowSqFt: polyAcre * 43560,
				InterpDate: new Date()
			},
			"geometry": {
				rings: polygon.rings
			}
		};
		
		var addPointFeature = {
			"attributes": {
				//InterpAreaName: newFeatureName,
				PreProcStatus: "Not PreProcessed",
				InterpMethod: "Aerial Imagery",
				StatusInterpArea: "In Initial Review",
				GrowYear: new Date("1/1/2014"),
				GrowKey: regionId + "_" + lastRegNum,
				SWRCBRegID: regionId,
				GrowID: lastRegNum,
				GrowAcres: polyAcre,
				GrowSqFt: polyAcre * 43560,
				InterpDate: new Date()
			},
			"geometry": {
				x: center.x,
				y: center.y
			}
		};
		
		// Write first to the grow polygons layer
		$.when(app.saveNewFeature(addFeature, appConfig.URL_EDIT_GROW_FOOTPRINTS, function(saveCallback) {
			
			// then, write to grow points layer
			// Note that currently, any changes made to the poly's attributes will not be updated to the point feature.
			$.when(app.saveNewFeature(addPointFeature, appConfig.URL_EDIT_GROW_POINTS, function(saveCallback2) {
				map.graphics.clear();
				// loop through map layers to find matching edited layer, then refresh it.
				$.each(layers, function(layer) {
					if (layers[layer].layer.url === appConfig.URL_EDIT_GROW_POINTS) {
						layers[layer].layer.refresh();
					}
					if (layers[layer].layer.url === appConfig.URL_EDIT_GROW_FOOTPRINTS) {
						layers[layer].layer.refresh();
						var query = new Query();
						query.where = "objectId = " + saveCallback.addResults[0].objectId;
						layers[layer].layer.selectFeatures(query);
					}
				});
				callback("createNewPolyFeature complete");
			}));
			
		}));	
	};
	
	app.createNewFeature = function(source, attrRegion, attrAcreage, graphic, lyrSource, callback) {
		// Create object for writing new feature to the layer
		switch(source) {
			case "disturbed_area":
				var polygon = new Polygon(graphic.geometry.rings);
				$("#stopEdit").hide();
				var addFeature = {
					"attributes": {
						SWRCBRegID: attrRegion,
						DisturbedAreasAcres: attrAcreage,
						InterpMethod: "Aerial Imagery",
						InterpDate: new Date()
					},
					"geometry": {
						rings: polygon.rings
					}
				};
				$.when(app.saveNewFeature(addFeature, lyrSource, function(saveCallback) {
					map.graphics.clear();
					esri.hide(loading);
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
			case "reservoir":
				var polygon = new Polygon(graphic.geometry.rings);
				$("#stopEdit").hide();
				var addFeature = {
					"attributes": {
						SWRCBRegID: attrRegion,
						ReserviorAcres: attrAcreage,
						InterpMethod: "Aerial Imagery",
						InterpDate: new Date()
					},
					"geometry": {
						rings: polygon.rings
					}
				};
				$.when(app.saveNewFeature(addFeature, lyrSource, function(saveCallback) {
					map.graphics.clear();
					esri.hide(loading);
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
			case "water_tank":
				$("#stopEdit").hide();
				var addFeature = {
					"attributes": {
						SWRCBRegID: attrRegion,
						InterpMethod: "Aerial Imagery",
						InterpDate: new Date()
					},
					"geometry": {
						x: graphic.geometry.x,
						y: graphic.geometry.y
					}
				};
				$.when(app.saveNewFeature(addFeature, lyrSource, function(saveCallback) {
					map.graphics.clear();
					esri.hide(loading);
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
		}
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
	
	app.stopEdit = function () {
		
		// Used for cancelling an edit, and for resetting the edit menu back to default state
		
		// If editing shape, discard the edits because the user clicked the cancel button
		if ($("#optionsRadios6:checked").prop("checked")) {
			if (shapeEditStatus) {
				//console.log("shape edits discarded");
				shapeEditLayer.applyEdits(null, shapeEditBackup, null, function success() {
					console.log("update feature successful");
					shapeEditStatus = null;
					shapeEditBackup = null;
					//app.stopEdit();
					shapeEditLayer.refresh();
					editToolbar.deactivate();	
				}, function error() {
					console.log("error");
				});
			}
		}
		
		$.each(layers, function(layer) {
			layers[layer].layer.clearSelection();
		});

		// resetting edit menu to defaults
		map.graphics.clear();
		graphicTb.deactivate();
		$("#editRadios1").show();
		$("#editRadios2").show();
		$("#editRadios3").show();
		$("#editRadios4").show();
		$("#editRadios5").show();
		$("#editRadios6").show();
		$("#editRadios7").show();
		$("#editLabelAdd").show();
		$("#editLabelEdit").show();
		$("#editLabelDelete").show();
		$("#saveGraphic").hide();
		$("#saveEdits").hide();
		$("#stopEdit").hide();
		$("#saveShapeEdit").hide();
		$("#optionsRadios1:checked").prop("checked",false);
		$("#optionsRadios2:checked").prop("checked",false);
		$("#optionsRadios3:checked").prop("checked",false);
		$("#optionsRadios4:checked").prop("checked",false);
		$("#optionsRadios5:checked").prop("checked",false);
		$("#optionsRadios6:checked").prop("checked",false);
		$("#optionsRadios7:checked").prop("checked",false);
    	$("#editInstructions").html("Select an editing option.");
    	if (!(clickHandler)) {
			clickHandler = dojo.connect(map, "onClick", clickListener);
		};
		$("#attributesDiv").hide();
		$("#editButtons").hide();
		
	};
	
	app.saveEdits = function () {
		// For attribute and shape editing
		
		// Shape edit - on-deactivate, the editorToolbar will save the change to the shape
		if ($("#optionsRadios6:checked").prop("checked")) {
			editToolbar.deactivate();

		// All other edits are already recorded, just reset the menu
		} else {
			app.stopEdit();
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
	
    // -- Section 7: Authentication ----------------------------------------------------

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
            //token = info._oAuthCred.token;
            $("#appContent").show();
            $("#appInit").hide();
            $("#sign-out").show();
            $("#about-cips").show();
            $("#cips-dashboard").show();
            app.buildMap();
		} else {
            // User is not signed in
            $("#appContent").html("");
            $("#appContent").hide();
            $("#appInit").show();
            $("#sign-out").hide();
            $("#about-cips").hide();
            $("#cips-dashboard").hide();
            $("#sign-in").show();
		}

		on(dom.byId("sign-in"), "click", function() {
           // User is signed in
           //token = info._oAuthCred.token;
           $("#appContent").show();
           $("#appInit").hide();
           $("#sign-out").show();
           $("#about-cips").show();
           $("#cips-dashboard").show();
           app.buildMap();
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
        
    // -- Section 8: Page Ready ----------------------------------------------------

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
