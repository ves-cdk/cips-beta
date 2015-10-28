var map, mapDeferred, mapResponse, mapNav, toc, loading; // core map objects
var layers, clickHandler, clickListener, lyrInfoTemplate = []; // used for popups
var cred = "esri_jsapi_id_manager_data"; // cookie/localStorage variable for ArcGIS for Server authentication
var featureCollection, popupInfo, featureInfoTemplate, addLayers = [], renderer, pointFtrLayer;
var layerFromQuery;
var clusterLayer, clusterLayerClickHandler;
var measurement;
var showInfoWindow = "default";
//var statsLoaded = [null,true,false,false,false,false,false,false,false,false,false]; // this is used to initialize stats carousels
//var sumDataRegion, sumDataInterp; // used for query results for summary statistics 
//var sumRegion = {}, sumInterp = {}; // region and interpretation objects storing summary stats
var tb, epWidget, lineSymbol; // for elevation profile
var editPointSymbol, editLineSymbol, editFillSymbol, graphicTb, addGraphicEvt, editSettings, editorWidget, attInspector, layerInfo;
//var saveFeatureShapeEdit = false;
var token;


var testvar; //generic variable for testing
	
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
    "./js/ClusterLayer.js", 
    //"./js/clusterfeaturelayer.js",
    "./js/ClusterFeatureLayer2.js",
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
    ClusterLayer,
    ClusterFeatureLayer,
    BootstrapMap,
    dom, on, arrayUtil, lang, Connect, event, TOC) {

    var basemapGallery, scalebar, locator;
    
    document.title = appConfig.APP_NAME_HTML_TITLE;
    
    var app = dojo.getObject('app', true); // global object to allow function calls from the app.
    
    // Proxy settings
    esriConfig.defaults.geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    esriConfig.defaults.io.alwaysUseProxy = false;
    esriConfig.defaults.io.corsEnabledServers.push("tasks.arcgisonline.com");
    //esriConfig.defaults.io.corsEnabledServers.push("sampleserver6.arcgisonline.com");
    esriConfig.defaults.io.corsEnabledServers.push("mapserver2.vestra.com");
    esriConfig.defaults.io.corsEnabledServers.push("mapserver.vestra.com");      
    //esriConfig.defaults.io.corsEnabledServers.push("localhost");  
    esriConfig.defaults.io.timeout = 120000;   
    //esriConfig.defaults.io.proxyUrl = "http://localhost/apps/cipsproxy/DotNet/proxy.ashx";
    
    urlUtils.addProxyRule({
	  urlPrefix: "tasks.arcgisonline.com",
	  proxyUrl: "http://localhost/apps/cipsproxy/DotNet/proxy.ashx"
	  //proxyUrl: "http://mapserver2.vestra.com/demo/cipsproxy/DotNet/proxy.ashx"
	});
	urlUtils.addProxyRule({
	  urlPrefix: "mapserver.vestra.com",
	  proxyUrl: "http://localhost/apps/cipsproxy/DotNet/proxy.ashx"
	  //proxyUrl: "http://mapserver2.vestra.com/demo/cipsproxy/DotNet/proxy.ashx"
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
    
    // Functions to initialize map elements ------------------------------------------
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
            	//console.log(i, lyr);
            	lyrInfoTemplate.push({infoTemplate: lyr.layer.infoTemplate,lyrTitle: lyr.title});
            	if (i > 0) {
            		lyr.layer.advancedQueryCapabilities.supportsPagination = true;
            	}
            });
 
            clickHandler = response.clickEventHandle;
            clickListener = response.clickEventListener;
           	
           	//on(map, "click", function(evt) {
           	//	console.log(evt);
           		// This is used for editing dialogs - turning on/off map click functionality
           	//});
            
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
            //console.log("Error loading webmap: " + dojo.toJson(error));
        });
    };
    
    app.buildPopup = function () {
	    // Customize popup behavior when editing features
        var popup = map.infoWindow;
        
        on(popup, "SetFeatures", function() {
        	// loop through edit options to control what happens with popup
        	var editRadios = ["optionsRadios4", "optionsRadios5", "optionsRadios6"];
        	var selectedRadio;
        	$.each(editRadios, function(i) {
        		if ($("#" + editRadios[i] + ":checked").prop("checked")) {
        			//console.log(editRadios[i] + " checked");
        			selectedRadio = editRadios[i];
        		};
        	});
        	switch (selectedRadio) {
        		case "optionsRadios4": 
        		// Delete a feature
        			esri.show(loading);
            		$(".esriPopupWrapper").css("display","none");
            		var editFtr = popup.getSelectedFeature();
            		if (editFtr._layer._editable) {
            			bootbox.confirm("<b>Warning</b> you will permanently delete the selected feature from the " + editFtr._layer.name + " layer? <br/><br/>Click OK to proceed, or click Cancel and keep the feature.", function(result) {
            				if (result) {
            					app.deleteFeature(editFtr);
            					
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
        		case "optionsRadios5": 
        		// Edit feature's attributes
            		$(".esriPopupWrapper").css("display","none");
            		var editFtr = popup.getSelectedFeature();
            		if (editFtr._layer._editable) {
            			bootbox.confirm("Edit the selected feature?", function(result) {
            				if (result) {
            					app.editFeature(editFtr, "attributes");
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
    	//app.buildSearchLayers();
    	//app.buildEditDropdowns();
    	//app.buildGraphicEditTools();
    	//app.buildPrint();
    	app.buildMeasure();
    	$.when(app.buildClusterLayer("Grow Locations (Grouped)", "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Operational/FeatureServer/0", 288895, null, function(callback) {
			$.when(app.buildEditor(function(buildCallback) {
			}));
		}));
    	//console.log(esriId.credentials);
    	//map.addLayer(graphicLayer);
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
        //});
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
			var currentBasemap = basemapGallery.getSelected();
		  	localStorage.currentBasemap = currentBasemap.id;
		});
		
		if (localStorage.currentBasemap) {
			console.log(localStorage.currentBasemap, basemapGallery.getSelected());
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
		    map: map//,
		    //defaultAreaUnit: Units.SQUARE_MILES,
		    //defaultLengthUnit: Units.KILOMETERS
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
		
		// enable editing shapes on with double-click event;
		var editLayer = null;
	    editToolbar = new Edit(map);
		editToolbar.on("deactivate", function(evt) {
			//if (saveFeatureShapeEdit === true) {
				editLayer.applyEdits(null, [evt.graphic], null);
				//app.cancelEdit();
			//}
		});
		
		layerInfo = [];
		$.each(layers, function(i) { 
			var lyr = layers[i];
			if (lyr.layer._editable) {
				layerInfo.push({
	            	"featureLayer": lyr.layer
	        	});
	        	
	        	var editingEnabled = false;
				lyr.layer.on("dbl-click", function(evt) {
					if ($("#optionsRadios6:checked").prop("checked")) {
						event.stop(evt);	
						if (editingEnabled === false) {
							editingEnabled = true;
							console.log(evt.graphic);
							if (evt.graphic.geometry.type === "point") {
								editToolbar.activate(Edit.MOVE, evt.graphic);
							} else {
								editToolbar.activate(Edit.EDIT_VERTICES, evt.graphic);
							}

						} else {
							editLayer = this;
							editToolbar.deactivate();
							//editLayer.refresh();
							editingEnabled = false;
						}
					}
				}); 

			}
		});

	    /*editSettings = {
	        map: map,
	        layerInfos: layerInfo,
	        isEditable: true,
	        toolbarVisible: true //use if you want to include the editing toolbar
	    };*/
	
	    /*editorWidget = new Editor({
	        settings: editSettings
	    }, "editorDiv");
	    editorWidget.startup();*/
		
	    attInspector = new AttributeInspector({
	        layerInfos: layerInfo
	    }, "attributesDiv");
		$(".atiLayerName").hide();
	    dojo.connect(attInspector, "onAttributeChange", function (feature, fieldName, newFieldValue) {
	        feature.attributes[fieldName] = newFieldValue;
	        feature.getLayer().applyEdits(null, [feature], null);
	    });
	    
	    
	    
	    callback("app.buildEditor complete.");
	    
	};
	
	app.buildGraphicTools = function() {
		map.enableSnapping();
		editPointSymbol = new SimpleMarkerSymbol();
		editLineSymbol = new CartographicLineSymbol();
		editFillSymbol = new SimpleFillSymbol();
		
		graphicTb = new Draw(map);
		graphicTb.on("draw-end", function(evt) {
			console.log("added event ", evt);
			// add actions to keep or discard the graphic
			$("#saveGraphic").show();
			$("#cancelEdit").show();
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
			
			//var symbol = editFillSymbol;
			map.graphics.add(new Graphic(evt.geometry, symbol));
		});
	};
	
	app.startDraw = function(type, colorOption) {
		
		dojo.disconnect(clickHandler);
		clickHandler = null;
		
		switch(type) {
			case "point":
				$("#editRadios2").hide();
				$("#editRadios3").hide();
				$("#editRadios4").hide();
				$("#editRadios5").hide();
				$("#editRadios6").hide();
				$("#cancelEdit").show();
				$("#editInstructions").html("Click on the map to add the point.");
			break;
			case "polyline":
				$("#editRadios1").hide();
				$("#editRadios3").hide();
				$("#editRadios4").hide();
				$("#editRadios5").hide();
				$("#editRadios6").hide();
				$("#cancelEdit").show();
				$("#editInstructions").html("Use single clicks on the map to draw the line. When done, double click.");
			break;
			case "polygon":
				$("#editRadios1").hide();
				$("#editRadios2").hide();
				$("#editRadios4").hide();
				$("#editRadios5").hide();
				$("#editRadios6").hide();
				$("#cancelEdit").show();
				$("#editInstructions").html("Use single clicks on the map to draw the polygon. When done, double click.");
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
		if (!(clickHandler)) {
			clickHandler = dojo.connect(map, "onClick", clickListener);
		};
		$("#editRadios1").hide();
		$("#editRadios2").hide();
		$("#editRadios3").hide();
		$("#editRadios5").hide();
		$("#editRadios6").hide();
		$("#cancelEdit").show();
		$("#editInstructions").html("Click on the feature you want to delete.");
		$("#editButtons").show();
		$("#attributesDiv").hide();
		
	};
	
	app.deleteFeature = function(ftr) {
		//var selectInfo = map.infoWindow.getSelectedFeature();
		//console.log(ftr);
		var url = ftr._layer._url.path + "/deleteFeatures";
		var params = "OBJECTID = " + ftr.attributes.OBJECTID;
		var dataString = {
			f: "json",
			where: params,
			token: token
		};
		// Delete feature with ajax call
	    $.ajax({
	        url: url,
	        type: "POST",
	        dataType: "json",
	        data: dataString,
	        success: function (data) {
	        	bootbox.alert("Delete feature successful.");
	        	app.cancelEdit();
	        	ftr._layer.clearSelection();
	        	ftr._layer.refresh();
	        	esri.hide(loading);
	        },
	        error: function (response) {
	            //callback(response);
	            bootbox.alert("An error occured, please try again.");
	            app.cancelEdit();
	            esri.hide(loading);
	        }
	    });
		
	};
	
	app.startEdit = function(option) {
		
		
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
				$("#cancelEdit").show();
				$("#editInstructions").html("Click on the feature you want to edit.");
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
				//$("#saveShapeEdit").show();
				$("#cancelEdit").show();
				$("#editInstructions").html("<b>For Polygon and Line features:</b><br/>"
					+ "Double click on the feature you want to modify.<br/>"
					+ "The points (vertices) that make up the polygon or line will appear.<br/> Click and drag the points to adjust the boundary<br/>"
					+ "When done, double click the shape again to save the edits.<br/><br/>"
					+ "<b>For Point features:</b><br/>"
					+ "Double click on the feature you want to modify.<br/>"
					+ "Your cursor should change to a hand when hovering over the point.<br/>"
					+ "Click and drag to move the point to a new location.<br/>"
					+ "When done, double click the shape again to save the edits.");
				$("#editButtons").show();
			break;
		}
	};
	
	app.editFeature = function(ftr, type) {
		switch(type) {
			case "attributes":
				$("#attributesDiv").show();
				$("#cancelEdit").show();
				$("#editInstructions").html("Enter any changes to the attributes, then click Finish.");
				$("#saveFinish").show();
				$("#editButtons").show();
			break;
			case "shape":
				console.log("edit shape", ftr);
				var shapeId = ftr.attributes.OBJECTID;
				console.log(shapeId);
				
			break;
			
		}
		
	};
	
	app.addGraphic = function(ev, mapObj) {
		graphicTb.deactivate();
		var symbol;
		if (evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
			symbol = editMarkerSymbol;
		} else if (evt.geometry.type === "line" || evt.geometry.type === "polyline") {
			symbol = editLineSymbol;
		} else {
			symbol = editFillSymbol;
		}
		mapObj.graphics.add(new Graphic(evt.geometry, symbol));
		if (!(clickHandler)) {
			clickHandler = dojo.connect(map, "onClick", clickListener);
		};
	};
	
	app.saveGraphic = function () {
		esri.show(loading);
		console.log("save edit");
		$("#attributesDiv").show();
		//$("#editInstructions").html("");
		if ($("#optionsRadios1:checked").prop("checked")) {
			// save point
			$.when(app.createNewFeature(addGraphicEvt, appConfig.URL_EDIT_POINT, function(callback) {
				console.log(callback);
				esri.hide(loading);
			}));
		}
		if ($("#optionsRadios2:checked").prop("checked")) {
			// save point
			$.when(app.createNewFeature(addGraphicEvt, appConfig.URL_EDIT_POLYLINE, function(callback) {
				console.log(callback);
				esri.hide(loading);
			}));
		}
		if ($("#optionsRadios3:checked").prop("checked")) {
			// save point
			$.when(app.createNewFeature(addGraphicEvt, appConfig.URL_EDIT_POLYGON, function(callback) {
				console.log(callback);
				esri.hide(loading);
			}));
		}
		$("#saveGraphic").hide();
		$("#saveFinish").show();
		//app.stopEditing();
	};
	
	app.cancelEdit = function () {
		
		/*if (shapeEditOption === "yes") {
			saveFeatureShapeEdit = true;
		} else {
			saveFeatureShapeEdit = false;
		};*/
		//console.log("discard edit");
		map.graphics.clear();
		graphicTb.deactivate();
		$("#editRadios1").show();
		$("#editRadios2").show();
		$("#editRadios3").show();
		$("#editRadios4").show();
		$("#editRadios5").show();
		$("#editRadios6").show();
		$("#saveGraphic").hide();
		$("#saveFinish").hide();
		$("#cancelEdit").hide();
		$("#saveShapeEdit").hide();
		$("#optionsRadios1:checked").prop("checked",false);
		$("#optionsRadios2:checked").prop("checked",false);
		$("#optionsRadios3:checked").prop("checked",false);
		$("#optionsRadios4:checked").prop("checked",false);
		$("#optionsRadios5:checked").prop("checked",false);
		$("#optionsRadios6:checked").prop("checked",false);
    	$("#editInstructions").html("Select an editing option.");
    	if (!(clickHandler)) {
			clickHandler = dojo.connect(map, "onClick", clickListener);
		};
		$("#attributesDiv").hide();
		$("#editButtons").hide();
		$.each(layerInfo, function(i) {
			layerInfo[i].featureLayer.refresh();
		});
		//saveFeatureShapeEdit = false;
	};
	
	app.stopEditing = function () {
		app.cancelEdit();
	};
	
	app.saveShapeEdit = function () {
	//	saveFeatureShapeEdit = true;
		app.cancelEdit();
	};
	
	//app.cancelShapeEdits = function () {
	//	
	//}
	
	
	
	app.createNewFeature = function(graphic, lyrSource, callback) {
		var type = graphic.geometry.type;
		switch(type) {
			case "point":
				$("#cancelEdit").hide();
				var addFeature = {
					"attributes": {
						
					},
					"geometry": {
						x: graphic.geometry.x,
						y: graphic.geometry.y
					}
				};
				$.when(app.saveNewFeature(addFeature, lyrSource, function(saveCallback) {
					//console.log(saveCallback, saveCallback.addResults[0].objectId);
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
			case "polyline":
				$("#cancelEdit").hide();
				var polyline = new Polyline(graphic.geometry.paths);
				var addFeature = {
					"attributes": {
						
					},
					"geometry": {
						paths: polyline.paths
					}
				};
				$.when(app.saveNewFeature(addFeature, lyrSource, function(saveCallback) {
					//console.log(saveCallback, saveCallback.addResults[0].objectId);
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
			case "polygon":
				$("#cancelEdit").hide();
				var polygon = new Polygon(graphic.geometry.rings);
				var addFeature = {
					"attributes": {
						
					},
					"geometry": {
						rings: polygon.rings
					}
				};
				$.when(app.saveNewFeature(addFeature, lyrSource, function(saveCallback) {
					//console.log(saveCallback, saveCallback.addResults[0].objectId);
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
		var mapExtent = mapObj.extent;
		var mapCetner = mapObj.extent.getCenter;
		localStorage.extent = JSON.stringify(mapObj.extent);
	};

	app.disableElevTool = function() {
		tb.deactivate();
		epWidget.clearProfile();
		map.graphics.clear();
		clickHandler = dojo.connect(map, "onClick", clickListener);
	};
	
	app.initElevToolbar = function(toolName) {
		epWidget.clearProfile();
		//Clear profile

		map.graphics.clear();
		tb = new Draw(map);
		tb.on("draw-end", app.addElevGraphic);
		tb.activate(toolName);
		map.disableMapNavigation();
	};

	app.addElevGraphic = function(evt) {
		//deactivate the toolbar and clear existing graphics
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
        //the map is in web mercator but display coordinates in geographic (lat, long)
        var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
        //display mouse coordinates
        $('#coordsText').html(mp.x.toFixed(3) + ", " + mp.y.toFixed(3));
    };

    //on(window, "resize", function(evt) {
    //    $('#btnLeftToggle').css('left', $('#leftbox').outerWidth());
    //    $('#btnBottomToggle').css('bottom', $('#bottombox').outerHeight());
    //});

    app.repositionInfoWindow = function (point) {
        // Determine the upper right, and center, coordinates of the map
        var maxPoint = new esri.geometry.Point(map.extent.xmax, map.extent.ymax, map.spatialReference);
        var centerPoint = new esri.geometry.Point(map.extent.getCenter());
        // Convert to screen coordinates
        var maxPointScreen = map.toScreen(maxPoint);
        var centerPointScreen = map.toScreen(centerPoint);
        var graphicPointScreen = map.toScreen(point);
        // Points only
        // Buffer
        var marginLR = 10;
        var marginTop = 3;
        var infoWin = map.infoWindow.domNode.childNodes[0];
        var infoWidth = infoWin.clientWidth;
        var infoHeight = infoWin.clientHeight + map.infoWindow.marginTop;
        // X
        var lOff = graphicPointScreen.x - infoWidth / 2;
        var rOff = graphicPointScreen.x + infoWidth / 2;
        var l = lOff - marginLR < 0;
        var r = rOff > maxPointScreen.x - marginLR;
        if (l) {
            centerPointScreen.x -= (Math.abs(lOff) + marginLR) < marginLR ? marginLR : Math.abs(lOff) + marginLR;
        } else if (r) {
            centerPointScreen.x += (rOff - maxPointScreen.x) + marginLR;
        }
        // Y
        var yOff = map.infoWindow.offsetY;
        var tOff = graphicPointScreen.y - infoHeight - yOff;
        var t = tOff - marginTop < 0;
        if (t) {
            centerPointScreen.y += tOff - marginTop;
        }
        //Pan the map to the new centerpoint
        if (r || l || t) {
            centerPoint = map.toMap(centerPointScreen);
            map.centerAt(centerPoint);
        }
    };
    
    
    // Menu items
    app.hideRibbonMenu = function() {
 		var tabs = $('.tabItems');
		var containers = $('#menu1, #menu2, #menu3, #menu4, #menu5, #menu6');

		//if ((!containers.is(e.target) && containers.has(e.target).length === 0) && (!tabs.is(e.target) && tabs.has(e.target).length === 0)) {
				containers.removeClass("slide-out");
				containers.removeClass("showing");
				containers.removeClass("active");
				showing = false;
		//}
		$("#ribbon-bar-toggle").hide();
 	};
 	
 	app.updateRibbonToggle = function() {
 		var toggleButtonHeight = ($('#ribbon-bar-header').height()) + ($('#ribbonTabs').height()) + ($('#topTabs').height()) + 10;
		$('#ribbon-bar-toggle').css('top', toggleButtonHeight);
 	};
 	
 	app.toggleBox = function(item, element) {
 		//console.log(element);
 		if ($("#" + item).css('display') !== 'none') {
            $("#" + item).hide();
            $('#' + element.id).html('<i class="fa fa-chevron-down"></i>');
            if (($(window).width()) > 800) {
            	var subHeight = $("#summary-container").height() + $("#header-container").height() + $("#ribbonTabs").height() + 10;
            	if (subHeight)
	            $('#mapDiv').height(($(window).height()) - subHeight);
			    map.resize();
		    }
        } else {
       		$("#" + item).show();
       		$('#' + element.id).html('<i class="fa fa-chevron-up"></i>');
       		if (($(window).width()) > 800) {
       			var subHeight = $("#summary-container").height() + $("#header-container").height() + $("#ribbonTabs").height() + 10;
	            $('#mapDiv').height(($(window).height()) - subHeight);
	            map.resize();
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
		
		/*
		$('.menuLevel3').each(function(){
		    //var itemId = $(this).attr('id');   
		    $(this).hide();
		});*/
		
		//$("#menu1A").show();
		
		//Create new Prioritization Area menu item reset
		/*$("#optStep1Existing").show();
		$("#optStep1New").show();
		$("#newStep1Existing").prop('checked', false);
		$("#newStep1New").prop('checked', false);
		$("#newStep2Existing").hide();
		$("#newStep2New").hide();*/
		//$("#optStep1New").show();
		//$("#newStep1New").show();	
		
		$("#btnLeftPanelToggle").css('left', $('#leftPanel').outerWidth()).addClass('btn-left-toggle-open');
		
	};
	
	
    

	// global functions ---------------------------------------------
	
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

	app.findRegion = function() {
		console.log($('#frmSearchRegion').val());
		//Need the url to a region service for this
		$.when(app.runQuery(appConfig.URL_REGION, "RB=" + $('#frmSearchRegion').val(), function(callback) {
			var extent = callback.features[0].geometry.getExtent();
			map.setExtent(extent);
		}));
		
	};
	
	app.findInterpArea = function() {
		//console.log($('#frmSearchRegion').val());
		$.when(app.runQuery(appConfig.URL_INTERP_AREA, "InterpAreaName='" + $('#frmSearchInterp').val() + "'", function(callback) {
			var extent = callback.features[0].geometry.getExtent();
			map.setExtent(extent);
		}));
	};
	
	app.loadPrioritization = function(action) {
		switch(action) {
			case "loadRegion":
				$("#menuLoadPA").show();
				$("#frmLoadRegion").prop("disabled",true);
				$("#modelReset").show();
			break; 
			case "loadPA":
				$("#menuLoadPM").show();
				$("#frmLoadPA").prop("disabled",true);
			break;
			case "loadPM":
				// loading Prioritization model
				$("#modelStatus").html("Status: Model loaded");
				$("#frmLoadPM").prop("disabled",true);
				$("#showModelParams").show();
				$("#menuModelRenderer").show();
				app.loadModel();
				//app.loadRenderer();
			break;
			case "showParams":
				$('#inputRegion').val($("#frmLoadRegion").val());
				$('#inputPA').val($("#frmLoadPA").val());
				$('#inputPM').val($("#frmLoadPM").val());
				$("#prioritizationModelParams").modal();
			break;
			case "reset":
				$("#frmLoadRegion").prop("disabled",false);
				$("#frmLoadPA").prop("disabled",false);
				$("#frmLoadPM").prop("disabled",false);
				$("#menuLoadPA").hide();
				$("#menuLoadPM").hide();
				$("#showModelParams").hide();
				$("#modelReset").hide();
				$("#frmLoadRegion").val("Select a Region");
				$("#frmLoadPA").val("Select an Area");
				$("#frmLoadPM").val("Select a Model");
				$("#menuModelRenderer").hide();
				$("#modelStatus").html("Status: Ready to load");
			break;
		}
		
	};
	
	app.renderPrioritization = function() {
		//console.log("render change");
		app.loadRenderer();
	};
	
	// create layer from single query (not appending related records)
	app.createLayerFromQuery = function() {
		$.when(app.runQuery("http://vags103a/arcgis/rest/services/CIPS/CIPS/FeatureServer/0", "SWRCBRegID=1 and InterpAreaID=3 and PrioritizAreaID = 1", function(qryResultsLyr) {
			//console.log(qryResultsLyr);
			$.when(app.createPolyFC("Test Poly", qryResultsLyr, function(createdFC) {
				//console.log(createdFC);
				$.when(app.addToFeature(createdFC, qryResultsLyr, function(callback) {
					console.log("createLayerFromQuery", callback);
					layerFromQuery = callback;
				}));
			}));
		})); 
	};
	
	app.createGrowSum = function() {
		
		$.when(app.runQuery(appConfig.GROW_POLYS_URL, "0=0", function(qryResultsLyr) {
			$.when(app.appendRecsToPoint(appConfig.GROW_PREPROC_RESULTS_URL, "PreProcDataSourceName='Cultivated Area'", qryResultsLyr, "GrowID", function(ftrLayerCallback) {
				console.log(ftrLayerCallback);
			}));
		}));
	};
	
	app.polyToPointLayer = function(newLyrName, polyUrl, queryParams, relateUrl, queryParamsRelate, relateField) {
		// This function takes an input polygon feature service and converts to a point featureCollection, adding it to the map.
		//   It's built to append related records from a separate service. If no related service is given, it ignores this.

		// example call, without appending records:
		//app.polyToPointLayer("test point", "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/1", "SWRCBRegID=5 and InterpAreaID=1 and PrioritizAreaID = 1 and OBJECTID < 20");

		// example call with related record:
		//app.polyToPointLayer("test point", "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/1", "SWRCBRegID=5 and InterpAreaID=1 and PrioritizAreaID = 1 and OBJECTID < 20", "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/10", "SWRCBRegID=5 and InterpAreaID=1 and PrioritizAreaID = 1", "PrioritizGrowKey");

		// Query the poly feature service to get the returned objects
		$.when(app.runQuery(polyUrl, queryParams, function(qryResultsLyr) {
			//ftrLayer = qryResultsLyr;

			// Call this function to append joined records to the first query results.
			//   if no joined table is specified, the function just returns query results.
			$.when(app.appendRecsToPoint(relateUrl, queryParamsRelate, qryResultsLyr, relateField, function(ftrLayerCallback) {
				ftrLayer = ftrLayerCallback;

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
					"fields" : []
				};

				$.each(ftrLayer.fields, function(i) {
					featureCollection.layerDefinition.fields.push(ftrLayer.fields[i]);
				});

				//create a feature layer based on the feature collection
				pointFtrLayer = new FeatureLayer(featureCollection, {
					id : newLyrName
				});

				//associate the features with the popup on click
				pointFtrLayer.on("click", function(evt) {
					map.infoWindow.setFeatures([evt.graphic]);
				});

				map.on("layers-add-result", function(results) {
					loadData();
				});

				map.addLayers([pointFtrLayer]);

				function loadData() {
					var geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
					var features = [];
					var count = 0;
					$.each(qryResultsLyr.features, function(i) {
						$.when(geometryService.labelPoints([qryResultsLyr.features[i].geometry], function(callback) {
							console.log("geometryService callback", callback);
							var geometry = callback;

							var graphic = new Graphic();
							graphic.setAttributes(qryResultsLyr.features[i].attributes);
							graphic.geometry = callback[0];
							features.push(graphic);
							count = count + 1;
							if (count == qryResultsLyr.features.length) {
								testObj = features;
								pointFtrLayer.applyEdits(features, null, null);
								var popupInfo = generateDefaultPopupInfo(featureCollection);
								var infoTemplate = new InfoTemplate(buildInfoTemplate(popupInfo));
								pointFtrLayer.infoTemplate = infoTemplate;
							}
						}));
					});
				};
				//var test = graphicsUtils.graphicsExtent(mapResponse.itemInfo.itemData.operationalLayers[6].layerObject.graphics);
				//					map.setExtent(test);
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
	
	app.removeMapLayer = function(layerName) {
		
		// remove from map
		var layerToRemove = map.getLayer(layerName);
		map.removeLayer(layerToRemove);
		
		// remove from TOC
		var tocIndex = 0;
		toc.layerInfos.forEach(function(i) {
			if(i.title === layerName) { 
				toc.layerInfos.splice(tocIndex,1);
			} else {
				tocIndex += 1;
			}
		});
		toc.refresh();
		
	};
	
	app.polyToClusterPointLayer = function(newLyrName, polyUrl, queryParams, relateUrl, queryParamsRelate, relateField, maxScale, minScale, loadCallback) {
		// TESTING - generic cluster layer
		
		// This function takes an input polygon feature service and converts to a point featureCollection, adding it to the map.
		//   It's built to append related records from a separate service. If no related service is given, it ignores this.

		// example call, without appending records:
		//app.polyToPointLayer("test point", "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/1", "SWRCBRegID=5 and InterpAreaID=1 and PrioritizAreaID = 1 and OBJECTID < 20");

		// example call with related record:
		//app.polyToPointLayer("test point", "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/1", "SWRCBRegID=5 and InterpAreaID=1 and PrioritizAreaID = 1 and OBJECTID < 20", "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/10", "SWRCBRegID=5 and InterpAreaID=1 and PrioritizAreaID = 1", "PrioritizGrowKey");

		// Query the poly feature service to get the returned objects
		$.when(app.runQuery(polyUrl, queryParams, function(qryResultsLyr) {
			
			//ftrLayer = qryResultsLyr;

			// Call this function to append joined records to the first query results.
			//   if no joined table is specified, the function just returns query results.
			$.when(app.appendRecsToPoint(relateUrl, queryParamsRelate, qryResultsLyr, relateField, function(ftrLayerCallback) {
				var geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
				var features = [];
				var count = 0;
				$.each(ftrLayerCallback.features, function(i) {
					
					//var myPolygonCenterLatLon = qryResultsLyr.features[i].getExtent().getCenter();
					var callback = qryResultsLyr.features[i].geometry.getCentroid();
					ftrLayerCallback.features[i].geometry.x = callback.x;
					ftrLayerCallback.features[i].geometry.y = callback.y;
					
					//$.when(geometryService.labelPoints([qryResultsLyr.features[i].geometry], function(callback) {
					//	console.log("geometryService callback", callback);
					//	ftrLayerCallback.features[i].geometry.x = callback[0].x;
					//	ftrLayerCallback.features[i].geometry.y = callback[0].y;
						count = count + 1;
						if (count == qryResultsLyr.features.length) {

							featureSet = ftrLayerCallback;

							var inputInfo = {};
							inputInfo.data = dojo.map(featureSet.features, function(feature) {
								var pointX = feature.geometry.x;
								var pointY = feature.geometry.y;
								var att = feature.attributes;
								return {
									"x" : pointX,
									"y" : pointY,
									"attributes" : att
								};
							});

							console.log(inputInfo);

							var popupInfo = generateDefaultPopupInfo(ftrLayerCallback.fields);
							var infoTemplate = new InfoTemplate(buildInfoTemplate(popupInfo));

							// cluster layer that uses OpenLayers style clustering
							clusterLayer = new ClusterLayer({
								"data" : inputInfo.data,
								"distance" : 40,
								"id" : newLyrName,
								"labelColor" : "#fff",
								"labelOffset" : -5,
								"resolution" : map.extent.getWidth() / map.width,
								"singleColor" : "#888",
								"showSingles" : false,
								"webmap" : true,
								"singleTemplate" : infoTemplate
							});
							var defaultSym = new esri.symbol.PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png", 12, 12);
							var renderer = new esri.renderer.ClassBreaksRenderer(defaultSym, "clusterCount");
							var group1 = new esri.symbol.PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png", 30, 30);
							var group2 = new esri.symbol.PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png", 42, 42); //GreenCircleLargeB
							var group3 = new esri.symbol.PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png", 54, 54); //RedCircleLargeB
							renderer.addBreak(0, 5, group1);
							renderer.addBreak(5, 20, group2);
							renderer.addBreak(20, 50000, group3);
							clusterLayer.setRenderer(renderer);
							if (maxScale) {
								clusterLayer.setMaxScale(maxScale);
							}
							if (minScale) {
								clusterLayer.setMinScale(minScale);
							}
							clusterLayerClickHandler = clusterLayer._onClickHandler;
							map.addLayers([clusterLayer]);
							toc.layerInfos.push({"layer": clusterLayer, "title": newLyrName});
							toc.refresh();
							loadCallback("Load complete");
						}
					//}));
				});

			}));
		}));
		
		
		
		function generateDefaultPopupInfo(fields) {
			console.log(fields);
					//var fields = featureCollection;
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
	}; 

	app.buildClusterLayer = function(newLyrName, sourceUrl, maxScale, minScale, callback) {
			// app.buildClusterLayer("Grow Locations", "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Operational/FeatureServer/0");
			// cluster layer that uses OpenLayers style clustering
			
			//var popupInfo = generateDefaultPopupInfo(ftrLayerCallback.fields);
			//var infoTemplate = new InfoTemplate(buildInfoTemplate(popupInfo));
			
			clusterLayer = new ClusterFeatureLayer({
				"url" : sourceUrl,
				"distance" : 40,
				"id" : newLyrName,
				"labelColor" : "#fff",
				"labelOffset" : -5,
				"resolution" : map.extent.getWidth() / map.width,
				"useDefaultSymbol": false,
				"singleColor" : "#888"//,
				//"showSingles" : true,
				//"webmap" : true//,
				//"singleTemplate" : infoTemplate
			});
			//var defaultSym = new esri.symbol.PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png", 12, 12);
			var defaultSym = new SimpleMarkerSymbol('circle', 10,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([252,174,145,0.5]), 6),
                        new Color([165,15,21,1]));
            var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");
			//var group1 = new esri.symbol.PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png", 30, 30);
			//var group2 = new esri.symbol.PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png", 42, 42); //GreenCircleLargeB
			//var group3 = new esri.symbol.PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png", 54, 54); //RedCircleLargeB
			var group1 = new SimpleMarkerSymbol('circle', 15,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([251,106,74,0.25]), 10),
                        new Color([251,106,74,0.5]));

            var group2 = new SimpleMarkerSymbol('circle', 20,
                         new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([222,45,38,0.25]), 15),
                         new Color([222,45,38,0.5]));
            var group3 = new SimpleMarkerSymbol('circle', 30,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([165,15,21,0.25]), 15),
                        new Color([165,15,21,0.5]));
			
			//renderer.addBreak(0, 1, defaultSym);
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
			//clusterLayerClickHandler = clusterLayer._onClickHandler;
			map.addLayers([clusterLayer]);
			toc.layerInfos.push({"layer": clusterLayer, "title": newLyrName});
			toc.refresh();
			callback("clusterLayer complete");
			
		};
	
	app.summarizeWshd = function(option) {
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
				var queryTask = new QueryTask(appConfig.SEARCH_WATERSHED);
				var queryTaskGrow = new QueryTask(appConfig.GROW_POLYS_URL);
				var query = new Query();
				var results1, results2, results3;
				query.returnGeometry = true;
				query.outFields = ["*"];
				
				map.on("click", function(evt) {
					map.graphics.clear();
					results1 = evt;
					if (showInfoWindow === "sumWshd") {
						$("#sumWshdText").html("Generating Summary - please wait.");
						//console.log(evt);
						//map.infoWindow.hide();
						//map.graphics
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
					//console.log("queryTask results:", evt);
					query.geometry = evt.featureSet.features[0].geometry;
					queryTaskGrow.execute(query);
				});
				queryTaskGrow.on("complete", function(evt) {
					//console.log("queryTaskGrow results:", evt);
					results3 = evt;
					//query.geometry = evt.featureSet.features[0].geometry;
					//queryTaskGrow.execute(query);
					//var sum1 = evt.featureSet.features.length;
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
					//console.log("outdoor: " + totalOutdoor, ", greenhouse: " + totalGreenhouse, ", area: " + totalArea);
					
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
				//map.on("click")
			break;
			
		}
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
		if (option.id === "menuEdit") {
			//$.when(app.buildEditor(function(callback) {
	  			//$("#editorDiv").hide();
	  			//$("#attributesDiv").hide();
	  			app.buildGraphicTools();
	  		//}));
		}
	};

	app.zoomToLayerExtent  = function(layerName) {
		var extentLayer = map.getLayer(layerName);
		var lyrExtent = esri.graphicsExtent(extentLayer.graphics);
		var newExtent = lyrExtent.expand(1.25);
		map.setExtent(newExtent);
	};
	

	app.loadGrow = function(option) {

		var queryParams;
		
		switch(option.id) {
			case "optionLoadAll":
				$("#loadStatus").html("Status: Adding locations, please wait");
				
				if (map.getLayer("Grow Locations")) {
					app.removeMapLayer("Grow Locations");
				};
				queryParams = "0=0";
				$.when(app.polyToClusterPointLayer("Grow Locations", appConfig.GROW_POLYS_URL, queryParams, null, null, null, 72223, null, function(callback) {
					app.zoomToLayerExtent("Grow Locations");
					$("#loadStatus").html("Status: Grow Locations added");
				}));
				$("#loadGrowReset").show();
				$("#radioLoadRegion").hide();
				//$("#radioLoadInterp").hide();
				$("#loadGrowReset").show();
			break;
			case "optionLoadRegion":
				$("#menuLoadGrowRegion").show();
				$("#radioLoadAll").hide();
				//$("#radioLoadInterp").hide();
				$("#loadGrowReset").show();
			break;
			case "optionLoadInterp":
				$("#menuLoadGrowInterp").show();
				$("#radioLoadAll").hide();
				$("#radioLoadRegion").hide();
				$("#loadGrowReset").show();
			break;
			case "frmLoadGrowRegion":
				$("#loadStatus").html("Status: Adding locations, please wait");
				if (map.getLayer("Grow Locations")) {
					app.removeMapLayer("Grow Locations");
				};
				queryParams = "SWRCBRegID=" + option.value;
				$.when(app.polyToClusterPointLayer("Grow Locations", appConfig.GROW_POLYS_URL, queryParams, null, null, null, 72223, null, function(callback) {
					app.zoomToLayerExtent("Grow Locations");
					$("#loadStatus").html("Status: Grow Locations added");
				}));
			break;
			case "frmLoadGrowInterp":
				queryParams = "InterpAreaID=" + option.value;
				$("#loadStatus").html("Status: Grow Locations added");
			break;
			case "loadGrowReset":
				if (map.getLayer("Grow Locations")) {
					app.removeMapLayer("Grow Locations");
				};
				queryParams = "";
				$("#menuLoadGrowRegion").hide();
				$("#menuLoadGrowInterp").hide();
				$("#radioLoadAll").show();
				$("#radioLoadRegion").show();
				//$("#radioLoadInterp").show();
				$("#loadGrowReset").hide();
				$("#frmLoadGrowRegion").val("Select a Region");
				$("#frmLoadGrowInterp").val("Select an Interpretation Area");
				$("#optionLoadAll").attr("checked", false);
				$("#optionLoadRegion").attr("checked", false);
				$("#optionLoadInterp").attr("checked", false);
				$("#loadStatus").html("Status: Ready to display");
			break;
		};
	};

	app.appendRecsToPoint = function(relateUrl, queryParamsRelate, ftrLayer, relateField, callback) {
		// Called from app.polyToPointLayer, This appends related records to the point feature being created from a poly
		//  in a separate function to force syncronous behavior
		if (relateUrl) {
			// If relateUrl is given, append records
			$.when(app.runQuery(relateUrl, queryParamsRelate, function(qryResultsRelate) {
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
				callback(ftrLayer);
			}));
		} else {
			// no relateUrl, no appending of records, just go back to parent function
			callback(ftrLayer);
		}
	}; 

	// create layer with appended attrbutes
	app.loadModel = function() {
		// Run from the Load Model button in the left menu.
		//var featureUrl = "http://vags103a/arcgis/rest/services/CIPS/CIPS/FeatureServer/0";
		var featureUrl = "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/1"; //"http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/PrioritizationDemo/FeatureServer/3";
		//var relateUrl = "http://vags103a/arcgis/rest/services/CIPS/CIPS/FeatureServer/8";
		var relateUrl = "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/Deliverable_20150909_forTesting_20151005/FeatureServer/10"; //"http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/PrioritizationDemo/FeatureServer/12";
		var qryWhere = "SWRCBRegID=" + $("#frmLoadRegion").val() + " and PrioritizAreaID=" + $("#frmLoadPA").val() + " and PrioritizAreaID=" + $("#frmLoadPM").val();
		//var qryWhere = "SWRCBRegID=1 and InterpAreaID=3 and PrioritizAreaID = 1";
		var relateField = "PrioritizGrowKey";
		var featureType = "poly"; // "poly" or "point" types allowed
		var featureName = "Test"; //$("#frmModelName").val();
		app.createAppendedLayer(featureUrl, relateUrl, qryWhere, relateField, featureType, featureName);
	};
	
	app.createAppendedLayer = function(featureUrl, relateUrl, qryWhere, relateField, featureType, featureName) {
		var ftrLayer, relateLayer;
		
		//testObj = ftrLayer;
		
		$.when(app.runQuery(featureUrl, qryWhere, function(qryResultsLyr) {
			ftrLayer = qryResultsLyr;
			$.when(app.runQuery(relateUrl, qryWhere, function(qryResultsRelate) {
				relateLayer = qryResultsRelate;
				
				$.extend(ftrLayer.fields, relateLayer.fields);
				//console.log(ftrLayer, relateLayer);
				var relateLayerAttr = []; 
				$.each(relateLayer.features, function(i) {
					relateLayerAttr.push(relateLayer.features[i].attributes);
				});
				
				$.each(ftrLayer.features, function(i) {
					//eval("var relateId = ftrLayer.features[i].attributes." + relateField);
					//var relateId = ftrLayer.features[i].attributes.PrioritizGrowKey;
					var relateId = ftrLayer.features[i].attributes[relateField];
					var relateObjects = $.grep(relateLayerAttr, function(item) { return item[relateField] === relateId}); 
					$.extend(ftrLayer.features[i].attributes, ftrLayer.features[i].attributes, relateObjects[0]);
				});
				
				//callback(ftrLayer);
				if (featureType === "poly") {
					$.when(app.createPolyFC(featureName, ftrLayer, function(createdFC) {
						//console.log(createdFC);
						$.when(app.addToFeature(createdFC, ftrLayer, function(addedFeature) {
							console.log("Create feature complete: ", addedFeature);
							addLayers.push(addedFeature);
							$.each(addLayers[0].fields, function(i) {
								var fldName = addLayers[0].fields[i].name;
								$('#frmModelFields').append($('<option>', {
									value : fldName
								}).text(fldName));
							}); 
						}));
					}));
				}
				
				if (featureType === "point") {
					$.when(app.createPointFC(featureName, ftrLayer, function(createdFC) {
						//console.log(createdFC);
						$.when(app.addToFeature(createdFC, ftrLayer, function(addedFeature) {
							console.log("Create feature complete: ", addedFeature);
							addLayers.push(addedFeature);
							$.each(addLayers[0].fields, function(i) {
								var fldName = addLayers[0].fields[i].name;
								$('#frmModelFields').append($('<option>', {
									value : fldName
								}).text(fldName));
							}); 
						}));
					}));
				}
				
			}));
		}));
	};
	
	app.runQuery = function(layerUrl, queryWhere, callback) {
		
		var query = new Query();
		var queryTask = new QueryTask(layerUrl);
		query.where = queryWhere;
		query.outSpatialReference = {
			wkid : 102100
		};
		query.returnGeometry = true;
		query.outFields = ["*"];
		queryTask.execute(query, function(res) {
			//qryResults = res;			
			callback(res);

			//console.log(res);
		});

	};
	
	// Creating template feature classes for on-the-fly rendering
	app.createPointFC = function(fcTitle, qryResults, callback) {
		
		if (!(fcTitle)) {
			fcTitle = "Point Layer";
		}
		
		featureCollection = {
			"layerDefinition" : null,
			"featureSet" : { "features" : [], "geometryType" : "esriGeometryPoint"}
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
						//"imageData" : "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAAB3VJREFUeF7tmPlTlEcexnve94U5mANQbgQSbgiHXHINlxpRIBpRI6wHorLERUmIisKCQWM8cqigESVQS1Kx1piNi4mW2YpbcZONrilE140RCTcy3DDAcL/zbJP8CYPDL+9Ufau7uqb7eZ7P+/a8PS8hwkcgIBAQCAgEBAICAYGAQEAgIBAQCAgEBAICAYGAQEAgIBAQCDx/AoowKXFMUhD3lQrioZaQRVRS+fxl51eBTZUTdZ41U1Rox13/0JF9csGJ05Qv4jSz/YPWohtvLmSKN5iTGGqTm1+rc6weICOBRbZs1UVnrv87T1PUeovxyNsUP9P6n5cpHtCxu24cbrmwKLdj+osWiqrVKhI0xzbmZ7m1SpJ+1pFpvE2DPvGTomOxAoNLLKGLscZYvB10cbYYjrJCb7A5mrxleOBqim+cWJRakZY0JfnD/LieI9V1MrKtwokbrAtU4Vm0A3TJnphJD4B+RxD0u0LA7w7FTE4oprOCMbklEGNrfdGf4IqnQTb4wc0MFTYibZqM7JgjO8ZdJkpMln/sKu16pHZGb7IfptIWg389DPp9kcChWODoMuDdBOhL1JgpisbUvghM7AqFbtNiaFP80RLnhbuBdqi0N+1dbUpWGde9gWpuhFi95yL7sS7BA93JAb+Fn8mh4QujgPeTgb9kAZf3Apd2A+fXQ38yHjOHozB1IAJjOSEY2RSIwVUv4dd4X9wJccGHNrJ7CYQ4GGjLeNNfM+dyvgpzQstKf3pbB2A6m97uBRE0/Ergcxr8hyqg7hrwn0vAtRIKIRX6Y2pMl0RhIj8co9nBGFrvh55l3ngU7YObng7IVnFvGS+BYUpmHziY/Ls2zgP9SX50by/G9N5w6I+ogYvpwK1SoOlHQNsGfWcd9Peqof88B/rTyzF9hAIopAByQzC0JQB9ST5oVnvhnt+LOGsprvUhxNIwa0aY7cGR6Cp7tr8+whkjawIxkRWC6YJI6N+lAKq3Qf/Tx+B77oGfaQc/8hB8w2Xwtw9Bf3kzZspXY/JIDEbfpAB2BKLvVV90Jvjgoac9vpRxE8kciTVCBMMkNirJ7k/tRHyjtxwjKV4Yp3t/6s+R4E+/DH3N6+BrS8E314Dvvg2+/Sb4hxfBf5sP/up2TF3ZhonK1zD6dhwGdwail26DzqgX8MRKiq9ZBpkSkmeYOyPM3m9Jjl+1Z9D8AgNtlAq6bZ70qsZi+q+bwV/7I/hbB8D/dAr8Axq89iz474p/G5++koHJy1sx/lkGdBc2YjA3HF0rHNHuboomuQj/5DgclIvOGCGCYRKFFuTMV7YUAD3VDQaLMfyqBcZORGPy01QKYSNm/rYV/Nd/Av9NHvgbueBrsjDzRQamKKDxT9Kgq1iLkbIUDOSHoiNcgnYHgnYZi+9ZExSbiSoMc2eE2flKcuJLa4KGRQz6/U0wlGaP0feiMH4uFpMXEjBVlYjp6lWY+SSZtim0kulYMiYuJEJXuhTDJ9UYPByOvoIwdCxfgE4bAo0Jh39xLAoVpMwIEQyTyFCQvGpLon9sJ0K3J4OBDDcMH1dj9FQsxkrjMPFRPCbOx2GyfLal9VEcxstioTulxjAFNfROJPqLl6Bnfyg6V7ugz5yBhuHwrZjBdiU5YJg7I8wOpifAKoVIW7uQ3rpOBH2b3ekVjYT2WCRG3o+mIGKgO0OrlIaebU/HYOQDNbQnojB4NJyGD0NPfjA0bwTRE6Q7hsUcWhkWN8yZqSQlWWGECAZLmJfJmbrvVSI8taK37xpbdB/wQW8xPee/8xIGjvlj8IQ/hk4G0JbWcX8MHPVDX4kveoq8ocn3xLM33NCZRcPHOGJYZIKfpQyq7JjHS6yJjcHujLHADgkpuC7h8F8zEVqXSNC2awE69lqhs8AamkO26HrbDt2H7dBVQov2NcW26CiwQtu+BWjdY4n2nZboTbfCmKcCnRyDO/YmyLPnDlHvjDH8G6zhS9/wlEnYR7X00fWrFYuWdVI0ZpuhcbcczW/R2qdAcz6t/bRov4mONeaaoYl+p22rHF0bVNAmKtBvweIXGxNcfFH8eNlC4m6wMWMusEnKpn5hyo48pj9gLe4SNG9QoGGLAk8z5XiaJUd99u8122/IpBA2K9BGg2vWWKAvRYVeLzEa7E1R422m2+MsSTem97nSYnfKyN6/mzATv7AUgqcMrUnmaFlLX3ysM0fj+t/b5lQLtK22QEfyAmiSLKFZpUJ7kBRPXKW4HqCYynWVHKSG2LkyZex1uO1mZM9lKem9Tx9jjY5iNEYo0bKMhn7ZAu0r6H5PpLXCAq0rKJClSjSGynE/QIkrQYqBPe6S2X+AJsY2Ped6iWZk6RlL0c2r5szofRsO9R5S1IfQLRCpQL1aifoYFerpsbkuTImaUJXuXIDiH6/Ys8vm3Mg8L2i20YqsO7fItKLcSXyn0kXccclVqv3MS6at9JU/Ox+ouns+SF6Z4cSupz7l8+z1ucs7LF1AQjOdxfGZzmx8Iu1TRcfnrioICAQEAgIBgYBAQCAgEBAICAQEAgIBgYBAQCAgEBAICAQEAv8H44b/6ZiGvGAAAAAASUVORK5CYII=",
						"contentType": "image/png",
						"width" : 15,
						"height" : 15
					}
				}
			},
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
		
		pointFeature = new FeatureLayer(featureCollection, { id: fcTitle });
		pointFeature.infoTemplate =  featureInfoTemplate;
		
		callback(pointFeature);
			
	};
	
	app.createPolyFC = function(fcTitle, qryResults, callback) {
		
		if (!(fcTitle)) {
			fcTitle = "Poly Layer";
		}
		
		featureCollection = {
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
						//"imageData" : "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",
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
		
		//addFeature.setRenderer(renderer);
		map.addLayer(addFeature);
		callback(addFeature);
		//testObj = addFeature;
	};

	//--Layer renderer functions - Start ----------------------------------------------------------------------	
	
	app.loadRenderer = function() {
		var renderField = $("#frmLoadRenderer").val();
		app.classBreakRenderer(renderField, addLayers[0]);
	};
	
	app.classBreakRenderer = function(renderField, renderLayer) {
		// simple class break renderer with 5 classes
		var symbol = new SimpleFillSymbol();
		symbol.setColor(new Color([150, 150, 150, 0.5]));
		renderer = new ClassBreaksRenderer(symbol, renderField);
        renderer.addBreak(0, 1, new SimpleFillSymbol().setColor(new Color([56, 168, 0, 0.5])));
        renderer.addBreak(1, 2, new SimpleFillSymbol().setColor(new Color([139, 209, 0, 0.5])));
        renderer.addBreak(2, 3, new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.5])));
        renderer.addBreak(3, 4, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 0.5])));
        renderer.addBreak(4, Infinity, new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));
        renderLayer.setRenderer(renderer);
        renderLayer.refresh();
	};
	
	app.classBreakRendererPoint = function(renderField, renderLayer) {	
		var defaultSym = new SimpleMarkerSymbol().setSize(4);
        var renderer = new ClassBreaksRenderer(defaultSym, renderField);

        var picBaseUrl = "http://static.arcgis.com/images/Symbols/Shapes/";
        var blue = new PictureMarkerSymbol(picBaseUrl + "BlueCircleLargeB.png", 15, 15).setOffset(0, 15);
        var green = new PictureMarkerSymbol(picBaseUrl + "GreenCircleLargeB.png", 15, 15).setOffset(0, 15);
        var red = new PictureMarkerSymbol(picBaseUrl + "RedCircleLargeB.png", 15, 15).setOffset(0, 15);
        renderer.addBreak(0, 1, blue);
        renderer.addBreak(1, 2, green);
        renderer.addBreak(2, 1000, red);
        renderLayer.setRenderer(renderer);
        renderLayer.refresh();
	};
	
	app.colorRampRenderer = function(renderField, renderLayer) {
		renderer = new SimpleRenderer(new SimpleFillSymbol().setOutline(new SimpleLineSymbol().setWidth(0.5)));
		renderer.setColorInfo({
			field : renderField,
			minDataValue : 0,
			maxDataValue : 5,
			colors : [new Color([255, 255, 255]), new Color([127, 127, 0])]
		});
		renderLayer.setRenderer(renderer);
        renderLayer.refresh();
	};
	
	app.smartRenderer = function(renderField, renderlayer) {
		smartMapping.createClassedColorRenderer({
           layer: renderlayer,
           field: renderField,
           //basemap: map.getBasemap(),
           classificationMethod: "quantile"
        }).then(function (response) {
           layer.setRenderer(response.renderer);
           layer.redraw();
           //createLegend(map, layer, field);
        });
	};
	
	    
    // Initialize the map during page load 
    //app.initStats();
    //app.buildMap();
    //

	//--Layer renderer functions - End -------------------------------------------------------------------------
	
	// END custom layer functions
	
	// end global functions --------------------------------------------

// User credentials (when services come from ArcGIS Online) --------------------------
	// Authentication - when services come from ArcGIS Online
		if (appConfig.AUTH === "arcgisonline") {
			var info = new OAuthInfo({
				appId : appConfig.APPID,
				popup : false
			});
			esriId.registerOAuthInfos([info]);
	
			esriId.checkSignInStatus(info.portalUrl + "/sharing").then(
				function (){
					console.log("signed in");
					console.log(info);
					token = info._oAuthCred.token;
					$("#appContent").show();
					$("#appInit").hide();
					$("#sign-out").show();
					$("#about-cips").show();
			    	app.buildMap();
				 }
			).otherwise(
				function (){
					console.log("not signed in");
					$("#appContent").html("");
					$("#appContent").hide();
					$("#appInit").show();
					$("#sign-out").hide();
					$("#about-cips").hide();
					$("#sign-in").show();
				 }
			);
	
			on(dom.byId("sign-in"), "click", function() {
				console.log("click", arguments);
				// user will be shown the OAuth Sign In page
				esriId.getCredential(info.portalUrl, {
					oAuthPopupConfirmation : false
				}).then(function() {
					//console.log("signed in");
					//displayItems();
					//$('#personalizedPanel').css("display", "block");
					//$('#anonymousPanel').css("display", "none");
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
				// console.log("wrote a cookie :-/");
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

    $(document).ready(function() {

		$.unblockUI();
		
		
		
        // Close menu
        /*$('#topTabs a').on('click', function() {
            if ($(".navbar-toggle").css('display') !== 'none') {
                $(".navbar-toggle").click();
            }
            $(this).blur();
        });*/

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
        
        //$('#signOut').on('click', function() {
            //mapNav.zoomToFullExtent();
        //    bootbox.alert('sign out');
            //map.setExtent(new Extent(appConfig.INIT_EXTENT), true);
        //});
        
        //$('#toggleDataLegend').on('click', function() {
        //    $('#reportDataLegend').fadeToggle(400);
        //    $(this).blur();
        //});
        
        $("#sumWshd-toggle").change(function() {
	    	app.summarizeWshd($(this).prop("checked"));
	    });

    });
});
