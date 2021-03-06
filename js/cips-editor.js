// -- Section 1: Global Variables ----------------------------------------------------
var map, mapDeferred, mapResponse, mapNav, toc, loading; // core map objects
var layers, clickHandler, clickListener, lyrInfoTemplate = []; // used for popups
var clusterLayer, clusterLayerClickHandler; // used for clustered grow location display
var basemapGallery, measurement, tb, epWidget, lineSymbol, timeSlider; // map widgets
var showInfoWindow = "default"; // used to control map behavior based upon selected tool
var cred = "esri_jsapi_id_manager_data"; // cookie/localStorage variable for ArcGIS for Server authentication
var statsLoaded = [null, true, false, false, false, false, false, false, false, false, false]; // this is used to initialize stats carousels
var sumDataRegion, sumDataInterp; // used for query results for summary statistics
var sumRegion = {}, sumInterp = {}; // region and interpretation objects storing summary stats
var featureCollection, popupInfo, featureInfoTemplate, addLayers = [], renderer, pointFtrLayer, layerFromQuery; // for dynamic layer load and rendering
var editPointSymbol, editLineSymbol, editFillSymbol, graphicTb, addGraphicEvt, editSettings, editorWidget, attInspector, layerInfo, selLayers = ""; // editing variables
var shapeEditLayer, shapeEditStatus, shapeEditBackup, growLocationFT; // editing variables
var interpLyrIndex, regionLyrIndex, growLyrIndex, growLocLyrIndex, disturbedLyrIndex, waterTankLyrIndex, reservoirLyrIndex, growSiteLyrIndex, growSiteParcLyrIndex, parcelLyrIndex, parcelLyrIndexAlt, wshdLyrIndex; // used for getting onClick results from specific layers
var mergeSites = []; // object used for merging multiple sites into a single site
var editRadios = ["optionsRadios1", "optionsRadios2", "optionsRadios3", "optionsRadios4", "optionsRadios5", "optionsRadios6", "optionsRadios7", "optionsRadios8", "optionsRadios9", "optionsRadios10", "optionsRadios11"];
var batchGrowSite = false; // used for batch grow site creation, developer only, not included in UI.
var siteFtr;
var token; // passed when write requires authentication
var testvar; //generic variable for testing
var currentDate = new Date(), day = currentDate.getDate(), month = currentDate.getMonth() + 1, year = currentDate.getFullYear(), dateToday = (month + "/" + day + "/" + year);

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
    "dojo/Deferred",
    "dojo/dom", "dojo/on", "dojo/_base/array", "dojo/_base/lang", "dojo/_base/connect", "dojo/_base/event", "./js/agsjs/dijit/TOC.js", "dojo/domReady!"],

function (

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
    Deferred,
    dom, on, arrayUtil, lang, Connect, event, TOC) {

    // -- Section 3: On-Load Settings -------------------------------------------------------------

    document.title = appConfig.APP_NAME_HTML_TITLE;

    var app = dojo.getObject('app', true); // global object to allow function calls from the app.

    // Proxy settings
    esriConfig.defaults.geometryService = new GeometryService(appConfig.GEOMETRY_SERVICE);
    esriConfig.defaults.io.alwaysUseProxy = false;
    esriConfig.defaults.io.corsEnabledServers.push("tasks.arcgisonline.com");
    esriConfig.defaults.io.corsEnabledServers.push("wb-sb-gisapp-int.ca.epa.local");
    esriConfig.defaults.io.corsEnabledServers.push("mapserver.vestra.com");
    esriConfig.defaults.io.corsEnabledServers.push("map.dfg.ca.gov");

    //esriConfig.defaults.io.corsEnabledServers.push("sampleserver6.arcgisonline.com"); 
    //esriConfig.defaults.io.corsEnabledServers.push("localhost");  
    //esriConfig.defaults.io.timeout = 12000;   
    esriConfig.defaults.io.proxyUrl = appConfig.PROXY_PAGE;

    urlUtils.addProxyRule({
        urlPrefix: "tasks.arcgisonline.com",
        proxyUrl: appConfig.PROXY_PAGE
    });
    /*urlUtils.addProxyRule({
	  urlPrefix: "wb-sb-gisapp-int.ca.epa.local",
	  proxyUrl: appConfig.PROXY_PAGE
	});*/

    // for the map tool container
    var showing = false;
    $(document).on("click", ".tabItems", function (e) {
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
    app.buildMap = function (e) {

        loading = dojo.byId("mapLoading");
        esri.show(loading);

        // Get the map extent from previous session or page.
        // If it exists, we replace the web map JSON content with the new extent, so that it is set before the map is created.
        if (localStorage.extent) {
            var ext = $.parseJSON(localStorage.extent);
            var startExtent = new esri.geometry.Extent(ext.xmin, ext.ymin, ext.xmax, ext.ymax,
				new esri.SpatialReference({ wkid: 102100 }));
            var convExt = esri.geometry.webMercatorToGeographic(startExtent);
            appWebMap.WEBMAP_JSON.item.extent = [[convExt.xmin, convExt.ymin], [convExt.xmax, convExt.ymax]];
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
              logo: false,
              sliderPosition: 'top-right',
              scrollWheelZoom: true,
              smartNavigation: false
          });

        mapDeferred.then(function (response) {

            mapResponse = response;
            map = response.map;

            // defining the layers allows for access to attributes per layer
            layers = esri.arcgis.utils.getLegendLayers(response);
            $.each(layers, function (i, lyr) {
                lyrInfoTemplate.push({ infoTemplate: lyr.layer.infoTemplate, lyrTitle: lyr.title });
                if (i > 0) {
                    lyr.layer.advancedQueryCapabilities.supportsPagination = true;
                }
                if (lyr.title === appConfig.LAYER_NAME_INTERP) {
                    interpLyrIndex = i;
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
                if (lyr.title === appConfig.LAYER_NAME_DISTURBED_AREAS) {
                    disturbedLyrIndex = i;
                }
                if (lyr.title === appConfig.LAYER_NAME_WATER_TANKS) {
                    waterTankLyrIndex = i;
                }
                if (lyr.title === appConfig.LAYER_NAME_RESERVOIRS) {
                    reservoirLyrIndex = i;
                }
                if (lyr.title === appConfig.LAYER_NAME_SITES) {
                    growSiteLyrIndex = i;
                }
                if (lyr.title === appConfig.LAYER_NAME_SITES_PARCELS) {
                    growSiteParcLyrIndex = i;
                }
                if (lyr.title === appConfig.LAYER_NAME_PARCELS) {
                    parcelLyrIndex = i;
                }
                if (lyr.title === appConfig.LAYER_NAME_PARCELS_ALT) {
                    parcelLyrIndexAlt = i;
                }
                if (lyr.title === appConfig.LAYER_NAME_WSHD) {
                    wshdLyrIndex = i;
                }
            });

            clickHandler = response.clickEventHandle;
            clickListener = response.clickEventListener;

            map.disableDoubleClickZoom();

            on(map, "update-start", function () {
                esri.show(loading);
            });
            on(map, "update-end", function () {
                esri.hide(loading);
            });
            on(map, "extent-change", function () {
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
                on(map, "load", function () {
                    app.buildMapElements(layers);
                    app.buildMapItems(response);
                });
            }

        }, function (error) {
            alert("An error occurred loading the map. Refresh the page and try again.");
        });
    };

    app.buildPopup = function () {
        // Customize popup behavior when editing features
        var popup = map.infoWindow;

        on(popup, "SetFeatures", function () {
            var selectedRadio;
            $.each(editRadios, function (i) {
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
                    $(".esriPopupWrapper").css("display", "none");
                    var editFtr = popup.getSelectedFeature();
                    if (editFtr._layer._editable) {
                        bootbox.confirm("Edit the selected feature?", function (result) {
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
                    $(".esriPopupWrapper").css("display", "none");
                    var editFtr = popup.getSelectedFeature();
                    if (editFtr._layer._editable) {
                        bootbox.confirm("Edit the selected feature?", function (result) {
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
                    // Merge sites
                    var selFtr = popup.getSelectedFeature();
                    $(".esriPopupWrapper").css("display", "none");
                    if (!(mergeSites[0])) {
                        var editFtr = popup.getSelectedFeature();
                        bootbox.confirm("The selected Grow Site will be used to merge other sites into. Click OK to proceed.", function (result) {
                            if (result) {
                                $("#editInstructions").html("Continue to select Grow Sites to merge into Grow Site <b>" + editFtr.attributes.GROWSITEKEY
            						+ "</b>.<br/>&nbsp;&nbsp;This site is highlighted with a blue circle.<br/>"
            						+ "&nbsp;&nbsp;All other sites that will be merged into this site are highlighed with a red circle.<br/>"
            						+ "<br/>When finished, click Save to proceed, or Cancel to start over.");
                                mergeSites.push(editFtr);
                                // add a graphic to show the selected merge site
                                var siteGraphic = new Graphic(selFtr.geometry, editPointSymbol);
                                siteGraphic.symbol.outline.setColor(new Color([37, 154, 232, 1]));
                                map.graphics.add(siteGraphic);
                            } else {
                                popup.clearFeatures();
                            }
                        });
                    } else {
                        var editFtr = popup.getSelectedFeature();
                        bootbox.confirm("The selected Grow Site will be removed, and any associated Grows will be associated with Grow Site <b>" + mergeSites[0].attributes.GROWSITEKEY + "</b>. Click OK to proceed.", function (result) {
                            if (result) {
                                mergeSites.push(editFtr);
                                // add a graphic to show the sites to be deleted
                                var siteGraphic = new Graphic(selFtr.geometry, editPointSymbol);
                                siteGraphic.symbol.outline.setColor(new Color([240, 34, 71, 1]));
                                map.graphics.add(siteGraphic);
                            } else {
                                popup.clearFeatures();
                            }
                        });
                    }
                    break;
                case "optionsRadios8":
                    // Delete a feature
                    esri.show(loading);
                    $(".esriPopupWrapper").css("display", "none");
                    var editFtr = popup.getSelectedFeature();

                    if (editFtr._layer._editable) {
                        bootbox.confirm("<b>Warning</b> you will permanently delete the selected feature from the " + editFtr._layer.name + " layer? <br/><br/>Click OK to proceed, or click Cancel and keep the feature.", function (result) {
                            if (result) {

                                switch (editFtr._layer._url.path) {
                                    case appConfig.URL_EDIT_GROW_FOOTPRINTS:
                                        // If deleting grow polygon, need to also delete any grow site that is related, as long as the grow site isnt used for other Grows
                                        var GrowKey = editFtr.attributes.GROWKEY;
                                        var query = new Query();
                                        query.where = "GROWSITEKEY = '" + GROWKEY + "'";
                                        layers[growLyrIndex].layer.queryFeatures(query, function (featureset) {
                                            var resultCount = featureset.features.length;
                                            if (resultCount === 1) {
                                                // delete associated grow site and grow site parcel
                                                layers[growSiteLyrIndex].layer.queryFeatures(query, function (ftrSite) {
                                                    app.deleteFeature(ftrSite.features[0], false);
                                                });
                                                layers[growSiteParcLyrIndex].layer.queryFeatures(query, function (ftrSiteParcel) {
                                                    $.each(ftrSiteParcel.features, function (i) {
                                                        app.deleteFeature(ftrSiteParcel.features[i], false);
                                                    });
                                                });
                                            }
                                            app.deleteFeature(editFtr, true);
                                        });
                                        break;
                                    case appConfig.URL_EDIT_GROW_SITES:
                                        // If deleting grow site, need to also delete grow site parcel.
                                        // find any grows that are associated with this grow site
                                        var GrowSiteKey = editFtr.attributes.GROWSITEKEY;
                                        var query = new Query();
                                        query.where = "GROWSITEKEY = '" + GrowSiteKey + "'";
                                        layers[growLyrIndex].layer.queryFeatures(query, function (featureset) {
                                            var resultCount = featureset.features.length;
                                            if (resultCount > 0) {
                                                bootbox.confirm(resultCount + " Grow(s) is associated with this Grow Site.<br/><br/>Deleting the Grow Site will remove the association (the Grow will NOT be deleted).<br/><br/>Click OK to continue with delete.", function (result) {
                                                    if (result) {
                                                        layers[growSiteLyrIndex].layer.queryFeatures(query, function (ftrSite) {
                                                            app.deleteFeature(ftrSite.features[0], false);
                                                        });
                                                        layers[growSiteParcLyrIndex].layer.queryFeatures(query, function (ftrSiteParcel) {
                                                            $.each(ftrSiteParcel.features, function (i) {
                                                                app.deleteFeature(ftrSiteParcel.features[i], false);
                                                            });
                                                        });
                                                        $.each(featureset.features, function (ii) {
                                                            $.when(app.updateAttributes(appConfig.URL_EDIT_GROW_FOOTPRINTS, featureset.features[ii].attributes.OBJECTID, "GROWSITEKEY", null, null, function (updCallback1) {
                                                                layers[growLyrIndex].layer.clearSelection();
                                                                layers[growLyrIndex].layer.refresh();
                                                                bootbox.alert("Grow Site features successfully deleted.");
                                                            }));
                                                        });

                                                    } else {
                                                        popup.clearFeatures();
                                                        esri.hide(loading);
                                                    }
                                                });
                                            } else {
                                                layers[growSiteLyrIndex].layer.queryFeatures(query, function (ftrSite) {
                                                    app.deleteFeature(ftrSite.features[0], false);
                                                });
                                                layers[growSiteParcLyrIndex].layer.queryFeatures(query, function (ftrSiteParcel) {
                                                    $.each(ftrSiteParcel.features, function (i) {
                                                        app.deleteFeature(ftrSiteParcel.features[i], false);
                                                    });
                                                });
                                            }
                                        });
                                        break;
                                    case appConfig.URL_EDIT_GROW_SITE_PARCELS:
                                        // check to make sure this isnt the only parcel for a Grow Site
                                        var GrowSiteKey = editFtr.attributes.GROWSITEKEY;
                                        var query = new Query();
                                        query.where = "GROWSITEKEY = '" + GrowSiteKey + "'";
                                        layers[growSiteParcLyrIndex].layer.queryFeatures(query, function (featureset) {
                                            var resultCount = featureset.features.length;
                                            if (resultCount === 1) {
                                                bootbox.alert("This Grow Site Parcel cannot be deleted: It is the only parcel associated with Grow Site " + GrowSiteKey + ". You must have at least one Grow Site Parcel per Grow Site.");
                                                //console.log("one parcel, dont delete");
                                            } else {
                                                //console.log("mult parcel, ok to delete");
                                                app.deleteFeature(editFtr, true);
                                            }
                                        });
                                        break;
                                    default:
                                        app.deleteFeature(editFtr, true);
                                        break;
                                }
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
                case "optionsRadios9":
                    // Creating new Grow Site - user needs to click on a Grow Footprint to associate site with
                    $(".esriPopupWrapper").css("display", "none");
                    var growFtr = popup.getSelectedFeature();
                    app.createGrowSite(growFtr);
                    break;
                case "optionsRadios10":
                    // Adding a Grow Site Parcel to a Grow Site
                    $(".esriPopupWrapper").css("display", "none");
                    if (!(siteFtr)) {
                        // First step - user clicked on a Site that the parcel will be associated with. Now prompt them to click on the Parcel.
                        siteFtr = popup.getSelectedFeature();
                        $.each(layers, function (i, lyr) {
                            lyr.layer.infoTemplate = null;
                        });
                        if (parcelLyrIndexAlt) {
                            if (!(layers[parcelLyrIndexAlt].layer.visible)) {
                                layers[parcelLyrIndexAlt].layer.setVisibility(true);
                            }
                            layers[parcelLyrIndexAlt].layer.infoTemplate = lyrInfoTemplate[parcelLyrIndexAlt].infoTemplate;
                        }
                        if (!(layers[parcelLyrIndex].layer.visible)) {
                            layers[parcelLyrIndex].layer.setVisibility(true);
                        }
                        layers[parcelLyrIndex].layer.infoTemplate = lyrInfoTemplate[parcelLyrIndex].infoTemplate;
                        $("#editInstructions").html("Click on the Parcel to be added to the Grow Site.");
                    } else {
                        // Second step - user click on a Parcel
                        var parcFtr = popup.getSelectedFeature();
                        bootbox.confirm("Add the highlighted Parcel to the Grow Site? Click OK to proceed, or Cancel to select a different Parcel.", function (result) {
                            if (result) {
                                app.addGrowSiteParcel(siteFtr, parcFtr);
                            }
                        });
                    }
                    //
                    break;
                case "optionsRadios11":
                    // Adding a Grow Site Parcel to a Grow Site
                    $(".esriPopupWrapper").css("display", "none");
                    if (!(siteFtr)) {
                        console.log("first step");
                        // First step - user clicked on a Site that the parcel will be associated with. Now prompt them to click on the Parcel.
                        siteFtr = popup.getSelectedFeature();
                        app.resetPopup();
                        app.isolatePopup(appConfig.LAYER_NAME_GROW_FOOTPRINTS);
                        $("#editInstructions").html("Click on the Grow Footprint to be associated with to the Grow Site.");
                    } else {
                        console.log("second step");
                        // Second step - user click on a Parcel
                        var growFtr = popup.getSelectedFeature();
                        bootbox.confirm("Associate the highlighted Grow Footprint with the Grow Site? Click OK to proceed, or Cancel to select a different Grow Footprint.", function (result) {
                            if (result) {
                                $.when(app.updateAttributes(appConfig.URL_EDIT_GROW_FOOTPRINTS, growFtr.attributes.OBJECTID, "GROWSITEKEY", siteFtr.attributes.GROWSITEKEY, null, function (updCallback1) {
                                    layers[growLyrIndex].layer.clearSelection();
                                    layers[growLyrIndex].layer.refresh();
                                    bootbox.alert("The Grow was added to the Grow Site.");
                                    app.stopEdit();
                                }));
                            }
                        });
                    }
                    //
                    break;

                default:
                    // An edit tool is not active

                    // Check to see if Grow Site summary tool is active
                    if ($("#sumSite-toggle").prop('checked') === true) {
                        $("#sumSiteText").html("Generating Summary - please wait.");
                        map.graphics.clear();
                        $(".esriPopupWrapper").css("display", "none");

                        var sitePointSymbol = new SimpleMarkerSymbol();
                        sitePointSymbol.outline.setWidth(2);
                        var siteLineSymbol = new CartographicLineSymbol();
                        sitePointSymbol.outline.setColor(new Color([0, 225, 255, 1]));
                        siteLineSymbol.setColor(new Color([0, 225, 255, 1]));

                        var growSite = popup.getSelectedFeature();

                        var siteGraphic = new Graphic(growSite.geometry, sitePointSymbol);
                        map.graphics.add(siteGraphic);

                        var GrowSiteKey = growSite.attributes.GROWSITEKEY;
                        var query = new Query();
                        query.where = "GROWSITEKEY = '" + GrowSiteKey + "'";
                        var sumText = "<b>Summary for Grow Site: " + GrowSiteKey + "</b><br/><br/>";

                        layers[growSiteParcLyrIndex].layer.queryFeatures(query, function (siteParcFeatures) {
                            var resultCount = siteParcFeatures.features.length;
                            var sumParcelText = "Grow Site Parcels:<br/>";
                            if (resultCount > 0) {
                                console.log("Site Parcels", siteParcFeatures);
                                $.each(siteParcFeatures.features, function (i) {
                                    sumParcelText += "&nbsp;&nbsp;APN: " + siteParcFeatures.features[i].attributes.APN + "<br/>";
                                    var siteParcelGraphic = new Graphic(siteParcFeatures.features[i].geometry, siteLineSymbol);
                                    map.graphics.add(siteParcelGraphic);
                                });
                            } else {
                                sumParcelText += "&nbsp;&nbsp;No Grow Site Parcels associated with Grow Site.";
                            }

                            layers[growLyrIndex].layer.queryFeatures(query, function (growFeatures) {
                                var sumGrowText = "Grows:<br/>";
                                var resultCount = growFeatures.features.length;
                                if (resultCount > 0) {
                                    $.each(growFeatures.features, function (i) {
                                        sumGrowText += "&nbsp;&nbsp;Grow: " + growFeatures.features[i].attributes.GROWID + ", Acres: " + growFeatures.features[i].attributes.GROWACRES + "<br/>";
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
                        $(".esriPopupWrapper").css("display", "block");
                    }

                    break;
            }

            if (batchGrowSite) {
                // for batch grow site creation. Not a refined function, for developer use only.
                var editFtr = popup.getSelectedFeature();
                app.batchGrowSite(editFtr);
            }
        });
    };

    app.buildMapItems = function (response) {

        app.buildPopup();
        app.buildTOC(response);
        app.buildBasemap();
        app.buildSearch();
        app.buildSearchWatershed();
        app.buildPrint();
        app.buildMeasure();
        $.when(app.buildClusterLayer(appConfig.GROW_POINTS_NAME, appConfig.URL_GROW_POINTS, appConfig.GROW_POINTS_SCALE, null, function (callback) {
            $.when(app.buildEditor(function (buildCallback) {
                app.buildEditFields();
            }));
        }));

        var subHeight = $("#header-container").height() + $("#ribbonTabs").height() + 10;
        $('.tab-pane').css("max-height", (($(window).height()) - subHeight));
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

        dojo.forEach(response.itemInfo.itemData.operationalLayers, function (olayer) {
            webmapLayerInfos.push({
                layer: olayer.layerObject,
                title: olayer.resourceInfo.name,
                slider: true,
                collapsed: false
            });
            layerInfo.push({
                layer: olayer.layerObject,
                title: olayer.resourceInfo.name
            });
        });

        //add TOC
        webmapLayerInfos.reverse();
        toc = new agsjs.dijit.TOC({
            map: map,
            layerInfos: webmapLayerInfos
        }, "mapTocDiv");
        toc.startup();
    };

    app.buildBasemap = function () {
        // builds the basemap from definition set in config file.
        var basemaps = [];

        $.each(appConfig.BASEMAPS, function (i) {
            switch (appConfig.BASEMAPS[i].numberOfLayers) {
                case 1:
                    var base = new Basemap({
                        layers: [new BasemapLayer({
                            url: appConfig.BASEMAPS[i].url
                        })],
                        title: appConfig.BASEMAPS[i].title,
                        thumbnailUrl: appConfig.BASEMAPS[i].thumbnailUrl
                    });
                    basemaps.push(base);
                    break;
                case 2:
                    var base = new Basemap({
                        layers: [
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
                        layers: [
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

        basemapGallery = new BasemapGallery({
            showArcGISBasemaps: false,
            map: map,
            basemaps: basemaps,
        }, "basemapGallery");
        basemapGallery.startup();

        basemapGallery.on("error", function () {
            bootbox.alert("An error occured while trying to load the basemap.<br/><br/>Please try a different basemap.");
        });

        // set a listener for changing the basemap. if changed, save this to localStorage to be used next time the app loads
        basemapGallery.on("selection-change", function () {
            var currentBasemap = basemapGallery.getSelected();
            localStorage.currentBasemap = currentBasemap.id;
        });

        if (localStorage.currentBasemap) {
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

    app.buildElevProfile = function () {
        $("#elev-toggle").change(function () {
            //$("#sumWshd-toggle").bootstrapToggle("off");
            if ($("#elev-toggle").prop('checked') === true) {
                app.initElevToolbar("polyline");
                dojo.disconnect(clickHandler);
            } else {
                app.disableElevTool();

            }
        });

        on(dom.byId("unitsSelect"), "change", function (evt) {
            if (epWidget) {
                epWidget.set("measureUnits", evt.target.options[evt.target.selectedIndex].value);
            }
        });

        // lineSymbol used for freehand polyline and line.
        if (!(epWidget)) {
            lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([38, 110, 235]), 4);
            var profileParams = {
                map: map,
                profileTaskUrl: "https://elevation.arcgis.com/arcgis/rest/services/Tools/ElevationSync/GPServer",
                scalebarUnits: Units.MILES
            };
            epWidget = new ElevationsProfileWidget(profileParams, dom.byId("profileChartNode"));
            epWidget.startup();
        }
    };

    app.buildEditor = function (callback) {

        //  //KRD make the Grow Location a featureLayer
        growLocationFT = new FeatureLayer(appConfig.URL_GROW_POINTS);


        // enable editing shapes on with double-click event
        // uses the editToolbar class, (not editorWidget)
        shapeEditLayer = null;
        editToolbar = new Edit(map);

        // control when a save is made - using Save or Cancel buttons and not double-click
        editToolbar.on("deactivate", function (evt) {
            if (shapeEditStatus === true) {
                //console.log(shapeEditStatus);

                //ATPNOTE: use the new edited geometry to move the grow point, if it's the grow footprint layer being edited
                if (shapeEditLayer.name === appConfig.LAYER_NAME_GROW_FOOTPRINTS) {
                    app.getPolyXY(evt.graphic, function (cent) {
                        var queryWhere = "GROWKEY = '" + evt.graphic.attributes.GROWKEY + "'";
                        app.runQuery(appConfig.URL_EDIT_GROW_POINTS, queryWhere, function (res) {
                            if (res.features.length > 0) {
                                var updatePointFeature = res.features[0];
                                if (res.length > 1) { alert("more than one grow point found for this polygon"); }

                                updatePointFeature.geometry = cent;
                                app.updateFeature(updatePointFeature, appConfig.URL_EDIT_GROW_POINTS, function (resUpdate) {
                                    //map.graphics.clear();
                                    // loop through map layers to find matching edited layer, then refresh it.
                                    layers[growLocLyrIndex].layer.refresh();
                                });
                            }
                        });
                        //evt.graphic.attributes["PreProcStatus"] = "Not PreProcessed";
                    });
                }

                shapeEditLayer.applyEdits(null, [evt.graphic], null, function (adds, updates, deletes) {
                    console.log("update feature successful");
                    shapeEditStatus = null;
                    shapeEditBackup = null;
                    app.stopEdit();
                    shapeEditLayer.refresh();

                    if (shapeEditLayer.name === appConfig.LAYER_NAME_GROW_FOOTPRINTS) {
                        app.updateAttributes(appConfig.URL_EDIT_GROW_FOOTPRINTS, updates[0].objectId, "PREPROCSTATUS", "Not PreProcessed", false, function (resp) { });
                    }
                }, function () {
                    console.log("error");
                });
            } else {
                $.each(layerInfo, function (i) {
                    layerInfo[i].featureLayer.refresh();
                });
            }
        });

        layerInfo = [];
        $.each(layers, function (i) {
            var lyr = layers[i];
            // only enable editing on layers that have editing enabled (controlled in web map JSON)
            if (lyr.layer._editable) {
                layerInfo.push({
                    "featureLayer": lyr.layer
                });

                var editingEnabled = false;
                lyr.layer.on("dbl-click", function (evt) {
                    // first double-click when editing radio option is selected starts editing on the shape that was clicked.
                    // after editing is starting, the double-click defaults back to incremental zoom
                    if ($("#optionsRadios6:checked").prop("checked")) {
                        if (lyr.layer.infoTemplate) {
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

                    }
                });
            }

        });

        layerInfo.reverse();

        $.each(layerInfo, function (i) {
            selLayers += "<option value='" + layerInfo[i].featureLayer.name + "'>" + layerInfo[i].featureLayer.name + "</option>";
        });

        // used to edit attributes (only for editable layers defined above)
        attInspector = new AttributeInspector({
            layerInfos: layerInfo
        }, "attributesDiv");
        $("#attributesDiv").hide();
        $(".atiLayerName").hide();
        dojo.connect(attInspector, "onAttributeChange", function (feature, fieldName, newFieldValue) {
            feature.attributes[fieldName] = newFieldValue;
            feature.getLayer().applyEdits(null, [feature], null);

            //KRD
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            //if editing a Grow Footprint and the field name changing is GrowType, update the attached Grow Location

            //check if the feature hasOwnProperty(GrowKey), if true it is a Grow Footprint
            //also check if we are editing the GrowType
            if(feature.attributes.hasOwnProperty("GrowKey") && fieldName == "GrowType") {
                //query the attached Grow Location
                app.runQuery(appConfig.URL_GROW_POINTS, "GrowKey = '" + feature.attributes.GrowKey + "'", function (response) {
                    //change the grow location Grow_Type
                    response.features[0].attributes.GrowType = newFieldValue;
                    //growLocationFT is a featureLayer, save the update.
                    growLocationFT.applyEdits(null, [response.features[0]], null, function () {
                        console.log("Done saving location grow_type");
                    }, function (error) {
                        console.log(error);
                    });
                });
            }
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
        });

        callback("app.buildEditor complete.");
    };

    app.buildEditFields = function () {
        // The AttributeInspector widget does not use the web map settings that define which fields are editable and which are not.
        // We have to loop through each editable layer and set these, based on the settings in the web map.
        $.each(layers, function (i) {
            if (layers[i].layer._editable) {
                $.each(appWebMap.WEBMAP_JSON.itemData.operationalLayers, function (i2) {
                    if (appWebMap.WEBMAP_JSON.itemData.operationalLayers[i2].title === layers[i].title) {
                        var editField = [], showField = [];
                        $.each(appWebMap.WEBMAP_JSON.itemData.operationalLayers[9].popupInfo.fieldInfos, function (i3) {
                            editField[appWebMap.WEBMAP_JSON.itemData.operationalLayers[9].popupInfo.fieldInfos[i3].fieldName] = appWebMap.WEBMAP_JSON.itemData.operationalLayers[9].popupInfo.fieldInfos[i3].isEditable;
                        });
                        $.each(layers[i].layer.fields, function (ii) {
                            var fieldName = layers[i].layer.fields[ii].name;
                            layers[i].layer.fields[ii].editable = editField[fieldName];
                        });
                    };
                });

            }

        });
    };

    app.buildGraphicTools = function () {
        // Graphics are used for editing - when adding new features, graphics are used while drawing, then the graphics are saved to the shape after user saves.
        map.enableSnapping();
        editPointSymbol = new SimpleMarkerSymbol();
        editPointSymbol.outline.setWidth(2);
        editLineSymbol = new CartographicLineSymbol();
        editFillSymbol = new SimpleFillSymbol();
        graphicTb = new Draw(map);

        graphicTb.on("draw-end", function (evt) {
            // add actions to keep or discard the graphic
            $("#saveGraphic").show();
            $("#stopEdit").show();
            $("#editInstructions").html("Click Continue to save the feature and go to the next step.<br/>Or click Cancel to start over.");
            addGraphicEvt = evt;
            graphicTb.deactivate();
            switch (evt.geometry.type) {
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

    app.isolatePopup = function (item) {
        // sets the popup results to a single layer, identified with the layer Title passed to the function.
        $.each(layers, function (i, lyr) {
            if (!(lyr.title === item)) {
                lyr.layer.infoTemplate = null;
            }
        });
    };

    app.resetPopup = function () {
        // resets popup results to default for all layers.
        $.each(layers, function (i, lyr) {
            lyr.layer.infoTemplate = lyrInfoTemplate[i].infoTemplate;
        });
    };

    // -- Section 5: Map Functionality -------------------------------------------------------------

    app.toggleAllLayers = function (option) {
        // turn all layers on or off by passing true or false
        $.each(layers, function (i) {
            layers[i].layer.setVisibility(option);
        });
    };

    app.syncMaps = function (mapObj) {
        // When map changes, record the map extent in order to keep all maps synconized
        var mapExtent = mapObj.extent;
        var mapCenter = mapObj.extent.getCenter;
        localStorage.extent = JSON.stringify(mapObj.extent);
    };

    app.initElevToolbar = function (toolName) {
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

    app.disableElevTool = function () {
        // Elevation Profile Widget - reset popup when the tool is deactivated
        tb.deactivate();
        epWidget.clearProfile();
        map.graphics.clear();
        clickHandler = dojo.connect(map, "onClick", clickListener);
    };

    app.addElevGraphic = function (evt) {
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

    app.hideRibbonMenu = function () {
        // Map menu items - showing and hiding elements
        var tabs = $('.tabItems');
        var containers = $('#menu1, #menu2, #menu3, #menu4, #menu5, #menu6');
        containers.removeClass("slide-out");
        containers.removeClass("showing");
        containers.removeClass("active");
        showing = false;
        $("#ribbon-bar-toggle").hide();
    };

    app.findRegion = function () {
        // Search by Region tool - Query and zoom to the selected Region boundary
        $.when(app.runQuery(appConfig.URL_REGION, "RB=" + $('#frmSearchRegion').val(), function (callback) {
            var extent = callback.features[0].geometry.getExtent();
            map.setExtent(extent);
        }));

    };

    app.findInterpArea = function () {
        // Search by Interpretation Area tool - Query and zoom to the selected Interp Area boundary
        $.when(app.runQuery(appConfig.URL_INTERP_AREA, "InterpAreaName='" + $('#frmSearchInterp').val() + "'", function (callback) {
            var extent = callback.features[0].geometry.getExtent();
            map.setExtent(extent);
        }));
    };

    app.buildClusterLayer = function (newLyrName, sourceUrl, maxScale, minScale, callback) {
        // Create clustered layer for grow locations
        clusterLayer = new ClusterFeatureLayer({
            "url": sourceUrl,
            "distance": 20,
            "id": newLyrName,
            "labelColor": "#fff",
            "labelOffset": -5,
            "resolution": map.extent.getWidth() / map.width,
            "useDefaultSymbol": false,
            "singleColor": "#888"//,
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
            "layer": clusterLayer,
            "title": newLyrName
        });
        toc.refresh();
        callback("clusterLayer complete");
    };

    app.summarizeSite = function (option) {
        // Summarize a Grow Site

        switch (option) {
            case true:
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

    app.summarizeWshd = function (option) {
        // Query HUC 12 watershed boundary and summarize grows that fall within

        // Switch option is used to enable or disable the tool. This avoids conflicts with Elevation Profile Widget.
        switch (option) {
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

                map.on("click", function (evt) {

                    if (showInfoWindow === "sumWshd") {
                        map.graphics.clear();
                        results1 = evt;
                        $("#sumWshdText").html("Generating Summary - please wait.");
                        currentClick = query.geometry = evt.mapPoint;
                        query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
                        queryTask.execute(query);
                    }
                });
                queryTask.on("complete", function (evt) {
                    testObj = evt;
                    results2 = evt;
                    var symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([38, 110, 235]), 4);
                    var resultShape = evt.featureSet.features[0];
                    resultShape.setSymbol(symbol);
                    map.graphics.add(resultShape);
                    query.geometry = evt.featureSet.features[0].geometry;
                    queryTaskGrow.execute(query);
                });
                queryTaskGrow.on("complete", function (evt) {
                    results3 = evt;
                    var totalGrows = evt.featureSet.features.length;
                    var totalOutdoor = 0, totalGreenhouse = 0, totalArea = 0;
                    $.each(evt.featureSet.features, function (i) {
                        var ftrAttr = evt.featureSet.features[i].attributes;
                        totalArea += ftrAttr.GROWSQFT;
                        if (ftrAttr.GROWTYPE === "Outdoor") {
                            totalOutdoor += 1;
                        }
                        if (ftrAttr.GROWTYPE === "Greenhouse") {
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

    app.menuChange = function (option) {
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

    app.runQuery = function (layerUrl, queryWhere, callback) {
        // Query task
        var query = new Query();
        var queryTask = new QueryTask(layerUrl);
        query.where = queryWhere;
        query.outSpatialReference = {
            wkid: 102100
        };
        query.returnGeometry = true;
        query.outFields = ["*"];
        queryTask.execute(query, function (res) {
            callback(res);
        });
    };
    
    // Section 6: Map Editing Functions -------------------------------------------------------------

    app.startDraw = function (colorOption, source) {
        // editing - user is adding features
        // the colorOption variable defines what color the added temporary graphic is shown with. Current options are red or blue.
        dojo.disconnect(clickHandler);
        clickHandler = null;
        var type;

        $.each(editRadios, function (i) {
            $("#editRadios" + (i + 1)).hide();
        });

        $("#editLabelEdit").hide();
        $("#editLabelDelete").hide();
        $("#stopEdit").show();
        $("#editButtons").show();

        // hide options that are not selected
        switch (source) {
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
                editFillSymbol.setColor(new esri.Color([222, 45, 38, 0.4]));
                break;
            case "blue":
                editPointSymbol.setColor(new esri.Color("#488fc3"));
                editLineSymbol.setColor(new esri.Color("#488fc3"));
                //editFillSymbol.setOutline(lineSymbol);
                editFillSymbol.setColor(new esri.Color([4, 117, 229, 0.4]));
                break;
        }
        graphicTb.activate(type);
        $("#editButtons").show();
    };

    app.startGrowSite = function () {
        // adding a new grow site from the "Add a New" menu item.

        $.each(editRadios, function (i) {
            $("#editRadios" + (i + 1)).hide();
        });
        $("#editRadios9").show();

        $("#editLabelEdit").hide();
        $("#editLabelDelete").hide();
        $("#stopEdit").show();
        $("#editButtons").show();
        app.isolatePopup(appConfig.LAYER_NAME_GROW_FOOTPRINTS);
        $("#editInstructions").html("The Grow Site must be associated with an existing Grow Footprint.<br/><br/>Click on the Grow Footprint that the new Grow Site will be associated with.");
        // on-click behavior handled under app.buildPopup function
    };

    app.startGrowSiteParcel = function () {
        // adding a new grow site from the "Add a New" menu item.
        $.each(editRadios, function (i) {
            $("#editRadios" + (i + 1)).hide();
        });
        $("#editRadios10").show();
        $("#editLabelEdit").hide();
        $("#editLabelDelete").hide();
        $("#stopEdit").show();
        $("#editButtons").show();
        app.isolatePopup(appConfig.LAYER_NAME_SITES);
        $("#editInstructions").html("Click on the Grow Site that the new Grow Site Parcel will be added to.");
        // on-click behavior handled under app.buildPopup function
    };

    app.startAddGrowToSite = function () {
        $.each(editRadios, function (i) {
            $("#editRadios" + (i + 1)).hide();
        });
        $("#editRadios11").show();
        $("#editLabelEdit").hide();
        $("#editLabelDelete").hide();
        $("#stopEdit").show();
        $("#editButtons").show();
        app.isolatePopup(appConfig.LAYER_NAME_SITES);
        $("#editInstructions").html("Click on the Grow Site that the Grow Footprint will be added to.");
    };

    app.startDelete = function () {
        // editing - initial steps for user to delete a feature
        app.selectEditLayer();
        if (!(clickHandler)) {
            clickHandler = dojo.connect(map, "onClick", clickListener);
        };
        $.each(editRadios, function (i) {
            $("#editRadios" + (i + 1)).hide();
        });
        $("#editRadios8").show();
        $("#editLabelEdit").hide();
        $("#editLabelAdd").hide();
        $("#stopEdit").show();
        $("#editInstructions").html("Click on the feature you want to delete.");
        $("#editButtons").show();
        $("#attributesDiv").hide();
        // Delete behavior is defined in app.buildPopup
    };

    app.deleteFeature = function (ftr, showMsg) {
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
                if (showMsg) {
                    bootbox.alert("Delete feature successful.");
                }
                app.stopEdit();
                ftr._layer.clearSelection();
                ftr._layer.refresh();
                esri.hide(loading);
            },
            error: function (response) {
                bootbox.alert("An error occured when trying to delete.");
                app.stopEdit();
                esri.hide(loading);
            }
        });

    };

    app.startEdit = function (option) {
        // editing - initial steps to edit a feature's attributes or geometry
        switch (option) {
            case "attribute":
                app.selectEditLayer();
                if (!(clickHandler)) {
                    clickHandler = dojo.connect(map, "onClick", clickListener);
                };
                $.each(editRadios, function (i) {
                    $("#editRadios" + (i + 1)).hide();
                });
                $("#editRadios5").show();
                $("#stopEdit").show();
                $("#editLabelAdd").hide();
                $("#editLabelDelete").hide();
                $("#editInstructions").html("Click on the feature you want to edit.<br/>For polygons, click on outline of the shape (not inside) to select the feature.");
                $("#editButtons").show();
                break;
            case "shape":
                app.selectEditLayer();
                dojo.disconnect(clickHandler);
                clickHandler = null;
                $("#attributesDiv").hide();
                $.each(editRadios, function (i) {
                    $("#editRadios" + (i + 1)).hide();
                });
                $("#editRadios6").show();
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
					+ "When done, click Save to record the edits.");
                $("#editButtons").show();
                break;
            case "merge":
                // Merging auto-created Grow Site points into a single point
                app.isolatePopup(appConfig.LAYER_NAME_SITES);
                if (!(layers[growSiteLyrIndex].layer.visible)) {
                    layers[growSiteLyrIndex].layer.setVisibility(true);
                }
                if (!(layers[growSiteParcLyrIndex].layer.visible)) {
                    layers[growSiteParcLyrIndex].layer.setVisibility(true);
                }
                $("#attributesDiv").hide();
                $.each(editRadios, function (i) {
                    $("#editRadios" + (i + 1)).hide();
                });
                $("#editRadios7").show();
                $("#editLabelAdd").hide();
                $("#editLabelDelete").hide();
                $("#saveEdits").show();
                $("#stopEdit").show();
                $("#editInstructions").html("Single click on the Grow Site (point feature) you want to merge other sites into.<br/>"
					+ "Additional instructions will appear after selection.");
                $("#editButtons").show();
                break;
        }
    };

    app.selectEditLayer = function () {
        // create a popup list of editable layers to select from
        bootbox.dialog({
            title: "Specify the layer to be edited.",
            message: '<select id="selLayerList" class="form-control">' +
				selLayers +
				'</select>',
            buttons: {
                success: {
                    label: "Proceed",
                    callback: function () {
                        console.log($("#selLayerList").val());
                        app.isolatePopup($("#selLayerList").val());
                    }
                }
            }
        });
    };

    app.editFeature = function (ftr, type) {
        // second step for editing attribute or shape features
        switch (type) {
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

    app.checkCenterPoint = function (feat) {
        var def = new Deferred();
        if ($("#optionsRadios3:checked").prop("checked")) {
            // optionRadios3 is a point feature, don't need centroid
            def.resolve({ center: feat.geometry, acreage: null });
        } else {
            // polygon features - get centroid for intersect with Interp Area and calculate the acreage of the poly
            app.getPolyXY(feat, function (cent) {
                def.resolve({ center: cent, acreage: app.calcAcreage(feat.geometry) });
            });
        }

        return def.promise;
    };

    app.saveGraphic = function () {
        // new graphic feature was added, save it to the layer

        esri.show(loading);
        $("#attributesDiv").show();

        //// Get the region that this new feature falls within
        //if ($("#optionsRadios3:checked").prop("checked")) {
        //    // optionRadios3 is a point feature, don't need centroid
        //    var center = addGraphicEvt.geometry;
        //} else {
        //    // polygon features - get centroid for intersect with Interp Area and calculate the acreage of the poly
        //    var center = addGraphicEvt.geometry.getCentroid();
        //    var polyAcre = app.calcAcreage(addGraphicEvt.geometry);
        //}

        app.checkCenterPoint(addGraphicEvt).then(function (promise) {
            var query = new Query();
            query.geometry = promise.center;
            layers[regionLyrIndex].layer.queryFeatures(query, function (featureset) {
                var regionId = featureset.features[0].attributes.RB;
                console.log("regionId", regionId);

                if ($("#optionsRadios1:checked").prop("checked")) {
                    // Saving Grow feature

                    var growType = "Outdoor";
                    // defaulting to Outdoor, but also prompting user to select from options below
                    var modelList = "";
                    modelList += "<option value='Outdoor'>Outdoor</option>";
                    modelList += "<option value='Greenhouse'>Greenhouse</option>";
                    bootbox.dialog({
                        title: "Specify Grow type.",
                        message: '<select id="selGrowType" class="form-control">' + modelList + '</select>',
                        buttons: {
                            success: {
                                label: "Proceed",
                                callback: function () {
                                    growType = $("#selGrowType").val();

                                    layers[interpLyrIndex].layer.queryFeatures(query, function (featureset) {
                                        console.log(featureset);
                                        var interpCount = featureset.features.length;
                                        if (interpCount === 0) {
                                            // New grows must fall within interp areas. This maintains the internal id's
                                            bootbox.alert("The new Grow Footprint falls outside of an Interpretation Area and cannot be added.");
                                        } else {
                                            // OK to proceed with creating new grow. Get the next ID based on the Interpretation Area that it falls within
                                            var interpId = featureset.features[0].attributes.INTERPAREAID;

                                            $.when(app.runQuery(appConfig.URL_GROW_NUM, "0=0", function (callback) {
                                                var regAttr = "REG" + regionId.toString() + "LASTGROWIDASSIGNED";
                                                // LastPrioritizAreaIDAssigned
                                                //$.each(callback.features[0].attributes, function(i) {
                                                //if (i === regAttr) {
                                                var i = regAttr;
                                                var lastRegNum = callback.features[0].attributes[i];
                                                var objId = callback.features[0].attributes.OBJECTID;
                                                lastRegNum += 1;
                                                console.log("lastRegNum = " + lastRegNum);

                                                // Assign a SiteID based on parcel boundary that the Grow center point intersects with
                                                var queryParcel = new Query();
                                                queryParcel.geometry = promise.center;
                                                layers[growSiteParcLyrIndex].layer.queryFeatures(queryParcel, function (siteParcel) {
                                                    if (siteParcel.features.length === 0) {
                                                        // No existing Grow Site Parcel, get one from Parcel input layer
                                                        layers[parcelLyrIndex].layer.queryFeatures(queryParcel, function (baseParcel) {
                                                            if (baseParcel.features.length === 0) {

                                                                // CDK: ADDED THIS TO USE STATE CIO PARCEL BOUNDARIES AS AN ALTERNATIVE WHEN AVAILABLE
                                                                if (parcelLyrIndexAlt) {
                                                                    // query alternate Parcel data source (if available)
                                                                    layers[parcelLyrIndexAlt].layer.queryFeatures(queryParcel, function (altParcel) {
                                                                        //console.log(baseParcel);
                                                                        if (altParcel.features.length === 0) {
                                                                            bootbox.alert("Note - Parcel data does not exist for this area.<br/><br/>This Grow will not be assigned a Grow Site and Grow Site Parcel.");

                                                                            app.createNewGrowFeature(lastRegNum, regionId, promise.acreage, addGraphicEvt.geometry, growType, null, null, function (growResult) {
                                                                                console.log("createNewGrowFeature result (a) = " + growResult);
                                                                                app.updateAttributes(appConfig.URL_GROW_NUM, objId, i, lastRegNum, null, function (growNumResult) {
                                                                                    console.log("grow number result (a) = " + growNumResult);
                                                                                    esri.hide(loading);
                                                                                });
                                                                            });
                                                                        } else {
                                                                            app.runQuery(appConfig.URL_GROW_SITE_NUM, "0=0", function (result) {
                                                                                var regSiteAttr = "REG" + regionId.toString() + "LASTSITEIDASSIGNED";
                                                                                var lastRegSiteNum = result.features[0].attributes[regSiteAttr];
                                                                                var objIdSite = result.features[0].attributes.OBJECTID;
                                                                                lastRegSiteNum += 1;
                                                                                console.log("lastRegSiteNum = " + lastRegSiteNum);

                                                                                app.createNewSiteFeature(regionId, altParcel, "alternate", lastRegSiteNum, regionId + "_" + lastRegSiteNum, function (siteResult) {
                                                                                    console.log("createNewSiteFeature result (b) = " + siteResult);
                                                                                    app.updateAttributes(appConfig.URL_GROW_SITE_NUM, objId, regSiteAttr, lastRegSiteNum, null, function (siteNumResult) {
                                                                                        console.log("site number result (b) = " + siteNumResult);
                                                                                        //esri.hide(loading);
                                                                                    });

                                                                                    app.createNewGrowFeature(lastRegNum, regionId, promise.acreage, addGraphicEvt.geometry, growType, lastRegSiteNum, regionId + "_" + lastRegSiteNum, function (growResult) {
                                                                                        console.log("createNewGrowFeature result (c) = " + growResult);
                                                                                        app.updateAttributes(appConfig.URL_GROW_NUM, objId, i, lastRegNum, null, function (growNumResult) {
                                                                                            console.log("grow number result (c) = " + growNumResult);
                                                                                            esri.hide(loading);
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        }
                                                                    });
                                                                } else {
                                                                    bootbox.alert("Note - Parcel data does not exist for this area.<br/><br/>This Grow will not be assigned a Grow Site and Grow Site Parcel.");

                                                                    app.createNewGrowFeature(lastRegNum, regionId, promise.acreage, addGraphicEvt.geometry, growType, null, null, function (growResult) {
                                                                        console.log("createNewGrowFeature result (d) = " + growResult);
                                                                        app.updateAttributes(appConfig.URL_GROW_NUM, objId, i, lastRegNum, null, function (growNumResult) {
                                                                            console.log("grow number result (d) = " + growNumResult);
                                                                            esri.hide(loading);
                                                                        });
                                                                    });
                                                                }
                                                            } else {
                                                                app.runQuery(appConfig.URL_GROW_SITE_NUM, "0=0", function (result) {
                                                                    var regSiteAttr = "REG" + regionId.toString() + "LASTSITEIDASSIGNED";
                                                                    var lastRegSiteNum = result.features[0].attributes[regSiteAttr];
                                                                    var objIdSite = result.features[0].attributes.OBJECTID;
                                                                    lastRegSiteNum += 1;
                                                                    console.log("lastRegSiteNum = " + lastRegSiteNum);

                                                                    app.createNewSiteFeature(regionId, baseParcel, "default", lastRegSiteNum, regionId + "_" + lastRegSiteNum, function (siteResult) {
                                                                        console.log("createNewSiteFeature result (e) = " + siteResult);
                                                                        app.updateAttributes(appConfig.URL_GROW_SITE_NUM, objId, regSiteAttr, lastRegSiteNum, null, function (siteNumResult) {
                                                                            console.log("grow number result (e) = " + siteNumResult);
                                                                            //esri.hide(loading);
                                                                        });

                                                                        app.createNewGrowFeature(lastRegNum, regionId, promise.acreage, addGraphicEvt.geometry, growType, lastRegSiteNum, regionId + "_" + lastRegSiteNum, function (growResult) {
                                                                            console.log("createNewGrowFeature result (f) = " + growResult);
                                                                            app.updateAttributes(appConfig.URL_GROW_NUM, objId, i, lastRegNum, null, function (growNumResult) {
                                                                                console.log("grow number result (f) = " + growNumResult);
                                                                                esri.hide(loading);
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            }
                                                        });
                                                    } else {
                                                        app.createNewGrowFeature(lastRegNum, regionId, promise.acreage, addGraphicEvt.geometry, growType, siteParcel.features[0].attributes.GROWSITEID, siteParcel.features[0].attributes.GROWSITEKEY, function (growResult) {
                                                            console.log("createNewGrowFeature result (g) = " + growResult);
                                                            app.updateAttributes(appConfig.URL_GROW_NUM, objId, i, lastRegNum, null, function (growNumResult) {
                                                                console.log("grow number result (g) = " + growNumResult);
                                                                esri.hide(loading);
                                                            });
                                                        });
                                                    }
                                                });

                                                //}
                                                //});
                                            }));

                                        }
                                    });

                                }
                            }
                        }
                    });
                }
                if ($("#optionsRadios2:checked").prop("checked")) {
                    // save disturbed area
                    app.createNewFeature("disturbed_area", regionId, promise.acreage, addGraphicEvt, appConfig.URL_EDIT_DISTURBED_AREA, function (response) {
                        //console.log(response);
                        esri.hide(loading);
                    });
                }
                if ($("#optionsRadios3:checked").prop("checked")) {
                    // save water tank
                    app.createNewFeature("water_tank", regionId, null, addGraphicEvt, appConfig.URL_EDIT_WATER_TANK, function (response) {
                        //console.log(response);
                        esri.hide(loading);
                    });
                }
                if ($("#optionsRadios4:checked").prop("checked")) {
                    // save reservoir
                    app.createNewFeature("reservoir", regionId, promise.acreage, addGraphicEvt, appConfig.URL_EDIT_RESERVOIR, function (response) {
                        //console.log(response);
                        esri.hide(loading);
                    });
                }
                $("#saveGraphic").hide();
                $("#saveEdits").show();
            });
        });
    };


    app.getPolyXY = function (polyFtr, callback) {
        // Get the center of a polygon, returns a Point feature
        // Uses the Geometry Service labelPoints function, more accurate than getCentroid. If labelPoints fails, it uses GetCentroid
        polygon = new Polygon();
        polygon.addRing(polyFtr.geometry.rings[0]);
        polygon.spatialReference = map.spatialReference;

        var geomX, geomY;
        var geometryService = new esri.tasks.GeometryService(appConfig.GEOMETRY_SERVICE);

        function labelSuccess(point) {
            //console.log("geomeetryService.labelPoints succeeded: ", point);
            geomX = point[0].x;
            geomY = point[0].y;
            console.log("geometryService.labelPoints succeeded, x: ", geomX, " and y: ", geomY);
            var center = new Point();
            center.x = geomX;
            center.y = geomY;
            center.spatialReference = map.spatialReference;
            callback(center);
        }

        function labelError(error) {
            //console.log("geomeetryService.labelPoints failed: ", error);
            var centroid = polygon.getCentroid();
            geomX = centroid.x;
            geomY = centroid.y;
            console.log("geometryService.labelPoints failed, using centroid x: ", geomX, " and y: ", geomY);
            var center = new Point();
            center.x = geomX;
            center.y = geomY;
            center.spatialReference = map.spatialReference;
            callback(center);
        }

        geometryService.labelPoints([polygon], labelSuccess, labelError);

    };

    app.initBatchGrowSite = function (wshdFtr) {
        // THIS IS A WORK IN PROGRESS - NOT COMPLETE. Used to loop through all grows in an identified Watershed and create Grow Sites when they don't exist. Still needs work.
        // This is not required functionality for project completion.
        batchGrowSite = true;
        if (!(layers[wshdLyrIndex].layer.visible)) {
            layers[wshdLyrIndex].layer.setVisibility(true);
        }
    };

    app.batchGrowSite = function (wshdFtr) {
        // THIS IS A WORK IN PROGRESS - NOT COMPLETE. Used to loop through all grows in an identified Watershed and create Grow Sites when they don't exist. Still needs work.
        // This is not required functionality for project completion.
        console.log(wshdFtr);
        if (!(wshdFtr._layer.name === "Watershed Boundaries (HUC12)")) {
            console.log("Watershed feature not selected, try again");
        } else {
            $(".esriPopupWrapper").css("display", "none");
            var queryTaskGrow = new QueryTask(appConfig.URL_GROW_POLYS);
            var query = new Query();

            query.returnGeometry = true;
            query.outFields = ["*"];
            query.geometry = wshdFtr.geometry;
            queryTaskGrow.execute(query);

            queryTaskGrow.on("complete", function (evt) {
                console.log(evt);
                $.each(evt.featureSet.features, function (i) {
                    console.log(evt.featureSet.features[i]);
                    var growFtr = evt.featureSet.features[i];

                    esri.show(loading);

                    var growKey = growFtr.attributes.GROWKEY;
                    var regionId = growFtr.attributes.SWRCBREGID;
                    var attrGrowSiteID = growFtr.attributes.GROWID;
                    var attrGrowSiteKey = growFtr.attributes.GROWKEY;

                    if (growFtr.attributes.GROWSITEKEY) {
                        console.log("Grow " + growKey + " is already associated with a Grow Site.");
                    } else {

                        $.when(app.getPolyXY(growFtr, function (center) {

                            var queryParcel = new Query();
                            queryParcel.geometry = center;
                            layers[growSiteParcLyrIndex].layer.queryFeatures(queryParcel, function (siteParcel) {
                                if (siteParcel.features.length === 0) {
                                    // No existing Grow Site Parcel, get one from Parcel input layer
                                    layers[parcelLyrIndex].layer.queryFeatures(queryParcel, function (baseParcel) {
                                        if (baseParcel.features.length === 0) {

                                            // ADDED THIS TO USE STATE CIO PARCEL BOUNDARIES AS AN ALTERNATIVE WHEN AVAILABLE
                                            if (parcelLyrIndexAlt) {
                                                // query alternate Parcel data source (if available)
                                                layers[parcelLyrIndexAlt].layer.queryFeatures(queryParcel, function (baseParcelAlt) {
                                                    if (baseParcelAlt.features.length === 0) {
                                                        console.log("Note - Parcel data does not exist for this area.<br/><br/>This Grow will not be assigned a Grow Site and Grow Site Parcel.");
                                                    } else {
                                                        console.log("ready to createNewSiteFeature", regionId, baseParcelAlt, "alternate", attrGrowSiteID, attrGrowSiteKey);
                                                        $.when(app.createNewSiteFeature(regionId, baseParcelAlt, "alternate", attrGrowSiteID, attrGrowSiteKey, function (callbackSite) {
                                                            var queryIntGrows = new Query();
                                                            queryIntGrows.geometry = baseParcelAlt.features[0].geometry;
                                                            //queryIntGrows.spatialRelationship = Query.SPATIAL_REL_WITHIN;
                                                            console.log(baseParcelAlt.features[0].geometry);
                                                            // THIS SHOULD QUERY GROW POINTS INSTEAD TO GET CENTER POINT, NOT INTERSECTING GROW
                                                            //layers[growLyrIndex].layer.queryFeatures(queryIntGrows, function(intGrows) {
                                                            layers[growLocLyrIndex].layer.queryFeatures(queryIntGrows, function (intGrows) {
                                                                //console.log(intGrows);
                                                                $.each(intGrows.features, function (i) {
                                                                    console.log("intGrows", intGrows.features[i].attributes.GROWID);
                                                                    /*var updObjectId = intGrows.features[i].attributes.OBJECTID;
                                                                    var updFeature = "[{'attributes': { 'OBJECTID': " + updObjectId + ", 'GROWSITEKEY': '" + attrGrowSiteKey + "', 'GROWSITEID': " + attrGrowSiteID + "}}]";
                                                                    $.when(app.updateAttributes(appConfig.URL_GROW_POLYS, updObjectId, null, null, updFeature, function(updCallback) {
                                                                        //console.log("updated:", updCallback);	
                                                                        //layers[growLyrIndex].layer.clearSelection();
                                                                        //layers[growLyrIndex].layer.refresh();
                                                                    }));*/
                                                                });
                                                            });
                                                            //app.stopEdit();
                                                        }));
                                                    }
                                                });
                                            } else {
                                                console.log("Note - Parcel data does not exist for this area.<br/><br/>A Grow Site cannot be created.");
                                                //app.stopEdit();
                                            }

                                        } else {
                                            console.log("start createNewSiteFeature");
                                            $.when(app.createNewSiteFeature(regionId, baseParcel, "default", attrGrowSiteID, attrGrowSiteKey, function (callbackSite) {
                                                var queryIntGrows = new Query();
                                                queryIntGrows.geometry = baseParcel.features[0].geometry;
                                                //queryIntGrows.spatialRelationship = Query.SPATIAL_REL_WITHIN;
                                                console.log(baseParcel.features[0].geometry);
                                                layers[growLyrIndex].layer.queryFeatures(queryIntGrows, function (intGrows) {
                                                    //console.log(intGrows);
                                                    $.each(intGrows.features, function (i) {
                                                        var updObjectId = intGrows.features[i].attributes.OBJECTID;
                                                        var updFeature = "[{'attributes': { 'OBJECTID': " + updObjectId + ", 'GROWSITEKEY': '" + attrGrowSiteKey + "', 'GROWSITEID': " + attrGrowSiteID + "}}]";
                                                        $.when(app.updateAttributes(appConfig.URL_GROW_POLYS, updObjectId, null, null, updFeature, function (updCallback) {
                                                            //console.log("updated:", updCallback);	
                                                            //layers[growLyrIndex].layer.clearSelection();
                                                            //layers[growLyrIndex].layer.refresh();
                                                        }));
                                                    });
                                                });
                                                //app.stopEdit();
                                            }));
                                        }
                                    });
                                } else {
                                    console.log("A Grow Site and Grow Site Parcel already exist.");
                                    //app.stopEdit();
                                }
                            });
                        }));
                    }

                });
            });
        }
    };

    app.createGrowSite = function (growFtr) {
        console.log("createGrowSite", growFtr);
        esri.show(loading);

        var growKey = growFtr.attributes.GROWKEY;
        var regionId = growFtr.attributes.SWRCBREGID;
        var attrGrowSiteID = growFtr.attributes.GROWID;
        var attrGrowSiteKey = growFtr.attributes.GROWKEY;

        if (growFtr.attributes.GROWSITEKEY) {
            bootbox.alert("This Grow Footprint is already associated with a Grow Site. You will need to delete the associated Grow Site before being able to create a new one.");
        } else {

            $.when(app.getPolyXY(growFtr, function (center) {
                var queryParcel = new Query();
                queryParcel.geometry = center;
                layers[growSiteParcLyrIndex].layer.queryFeatures(queryParcel, function (siteParcel) {
                    if (siteParcel.features.length === 0) {
                        // No existing Grow Site Parcel, get one from Parcel input layer
                        layers[parcelLyrIndex].layer.queryFeatures(queryParcel, function (baseParcel) {
                            if (baseParcel.features.length === 0) {

                                // ADDED THIS TO USE STATE CIO PARCEL BOUNDARIES AS AN ALTERNATIVE WHEN AVAILABLE
                                if (parcelLyrIndexAlt) {
                                    // query alternate Parcel data source (if available)
                                    layers[parcelLyrIndexAlt].layer.queryFeatures(queryParcel, function (baseParcelAlt) {
                                        if (baseParcelAlt.features.length === 0) {
                                            bootbox.alert("Note - Parcel data does not exist for this area.<br/><br/>This Grow will not be assigned a Grow Site and Grow Site Parcel.");
                                        } else {
                                            $.when(app.createNewSiteFeature(regionId, baseParcelAlt, "alternate", attrGrowSiteID, attrGrowSiteKey, function (callbackSite) {
                                                var queryIntGrows = new Query();
                                                queryIntGrows.geometry = baseParcelAlt.features[0].geometry;
                                                console.log(baseParcelAlt.features[0].geometry);
                                                layers[growLyrIndex].layer.queryFeatures(queryIntGrows, function (intGrows) {
                                                    console.log(intGrows);
                                                    $.each(intGrows.features, function (i) {
                                                        var updObjectId = intGrows.features[i].attributes.OBJECTID;
                                                        var updFeature = "[{'attributes': { 'OBJECTID': " + updObjectId + ", 'GROWSITEKEY': '" + attrGrowSiteKey + "', 'GROWSITEID': " + attrGrowSiteID + "}}]";
                                                        $.when(app.updateAttributes(appConfig.URL_GROW_POLYS, updObjectId, null, null, updFeature, function (updCallback) {
                                                            //console.log("updated:", updCallback);
                                                            layers[growLyrIndex].layer.clearSelection();
                                                            layers[growLyrIndex].layer.refresh();
                                                        }));
                                                    });
                                                });
                                                app.stopEdit();
                                            }));
                                        }
                                    });
                                } else {
                                    bootbox.alert("Note - Parcel data does not exist for this area.<br/><br/>A Grow Site cannot be created.");
                                    app.stopEdit();
                                }

                            } else {
                                $.when(app.createNewSiteFeature(regionId, baseParcel, "default", attrGrowSiteID, attrGrowSiteKey, function (callbackSite) {
                                    var queryIntGrows = new Query();
                                    queryIntGrows.geometry = baseParcel.features[0].geometry;
                                    console.log(baseParcel.features[0].geometry);
                                    layers[growLyrIndex].layer.queryFeatures(queryIntGrows, function (intGrows) {
                                        console.log(intGrows);
                                        $.each(intGrows.features, function (i) {
                                            var updObjectId = intGrows.features[i].attributes.OBJECTID;
                                            var updFeature = "[{'attributes': { 'OBJECTID': " + updObjectId + ", 'GROWSITEKEY': '" + attrGrowSiteKey + "', 'GROWSITEID': " + attrGrowSiteID + "}}]";
                                            $.when(app.updateAttributes(appConfig.URL_GROW_POLYS, updObjectId, null, null, updFeature, function (updCallback) {
                                                //console.log("updated:", updCallback);
                                                layers[growLyrIndex].layer.clearSelection();
                                                layers[growLyrIndex].layer.refresh();
                                            }));
                                        });
                                    });
                                    app.stopEdit();
                                }));
                            }
                        });
                    } else {
                        bootbox.alert("A Grow Site and Grow Site Parcel already exist.");
                        app.stopEdit();
                    }
                });
            }));
        }
    };

    app.addGrowSiteParcel = function (siteFtr, parcFtr) {
        var polygon = parcFtr.geometry; /// new Polygon(graphic.rings);
        if (parcFtr._layer._url.path === appConfig.URL_EDIT_PARCELS) {
            // Using the default Parcel layer
            var APN = parcFtr.attributes.APN;
            var GrowSiteKey = siteFtr.attributes.GROWSITEKEY;
            var DateCoDataAcquired = parcFtr.attributes.DATECODATAACQUIRED;
            var CountyName = parcFtr.attributes.COUNTYNAME;
        } else {
            // Using the alternate Parcel layer (OCIO UCD map service)
            var APN = parcFtr.attributes.PARNO;
            var GrowSiteKey = siteFtr.attributes.GROWSITEKEY;
            var DateCoDataAcquired = null;
            var CountyName = null;
        }

        var addFeature = {
            "attributes": {
                APN: APN,
                GROWSITEKEY: GrowSiteKey,
                DATECODATAACQUIRED: DateCoDataAcquired,
                COUNTYNAME: CountyName
            },
            "geometry": {
                rings: polygon.rings
            }
        };

        // Write first to the Grow Site Parcels polygons layer
        console.log("addGrowSiteParcel: Writing to grow site parcel layer");
        $.when(app.saveNewFeature(addFeature, appConfig.URL_EDIT_GROW_SITE_PARCELS, function (saveCallback) {
            layers[growSiteParcLyrIndex].layer.refresh();
            map.graphics.clear();
            app.stopEdit();
            bootbox.alert("The Grow Site Parcel was added.");
            console.log("addGrowSiteParcel: Written to grow site parcel layer");
        }));

    };

    app.calcAcreage = function (polygon) {
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
                return (calculatedAcres);
            } else {
                return (calculatedAcres);
            }
        } else {
            return (calculatedAcres);
        }
    };

    app.createNewGrowFeature = function (lastRegNum, regionId, polyAcre, graphic, growType, attrGrowSiteID, attrGrowSiteKey, callback) {
        // Create object for writing new Grow features
        if (!(growType)) {
            growType = "Outdoor";
        }

        var polygon = new Polygon(graphic.rings);
        var feat = new Graphic(polygon, null, null, null);

        app.getPolyXY(feat, function (center) {
            var addFeature = {
                "attributes": {
                    //InterpAreaName: newFeatureName,
                    PREPROCSTATUS: "Not PreProcessed",
                    //INTERPMETHOD: "Aerial Imagery", // ATPNOTE commented out this line, duplicate Interp methods, and this one isn't in the coded values
                    GROWTYPE: growType,
                    //StatusInterpArea: "In Initial Review",
                    GROWYEAR: 2014, //new Date("1/1/2014"),  ATPNOTE: noticed this was a hardcoded date, might need to change
                    GROWKEY: regionId + "_" + lastRegNum,
                    SWRCBREGID: regionId,
                    GROWID: lastRegNum,
                    GROWACRES: polyAcre,
                    GROWSITEID: attrGrowSiteID, // Note that we only add GrowSiteID and GrowSiteKey to polygon Grow features, not point features.
                    GROWSITEKEY: attrGrowSiteKey,
                    GROWSQFT: polyAcre * 43560,
                    INTERPMETHOD: "Field Observation",
                    INTERPDATE: dateToday
                },
                "geometry": {
                    rings: polygon.rings
                }
            };

            var addPointFeature = {
                "attributes": {
                    //InterpAreaName: newFeatureName,
                    PREPROCSTATUS: "Not PreProcessed",
                    INTERPMETHOD: "Field Observation", // ATPNOTE: was "AField Observation", removed the A
                    GROWTYPE: growType,
                    //StatusInterpArea: "In Initial Review",
                    GROWYEAR: 2014, //new Date("1/1/2014"),  ATPNOTE: hardcoded date
                    GROWKEY: regionId + "_" + lastRegNum,
                    SWRCBREGID: regionId,
                    GROWID: lastRegNum,
                    GROWACRES: polyAcre,
                    GROWSQFT: polyAcre * 43560,
                    INTERPDATE: dateToday
                },
                "geometry": {
                    x: center.x,
                    y: center.y
                }
            };

            // Write first to the grow polygons layer
            console.log("createNewGrowFeature: Writing to grow footprint layer");
            $.when(app.saveNewFeature(addFeature, appConfig.URL_EDIT_GROW_FOOTPRINTS, function (saveResponse) {

                // ATPNOTE: adding new point feature for new grow polygon
                //          look for where grow polygons are edited and see if this happens there

                // then, write to grow points layer
                // Note that currently, any changes made to the poly's attributes will not be updated to the point feature.
                console.log("createNewGrowFeature: Written to grow footprint layer");
                console.log("createNewGrowFeature: Writing to grow point layer");
                $.when(app.saveNewFeature(addPointFeature, appConfig.URL_EDIT_GROW_POINTS, function (saveCallback2) {
                    console.log("createNewGrowFeature: Written to grow point layer");
                    map.graphics.clear();
                    // loop through map layers to find matching edited layer, then refresh it.
                    layers[growLocLyrIndex].layer.refresh();
                    layers[growLyrIndex].layer.refresh();
                    var query = new Query();
                    query.where = "objectId = " + saveResponse.addResults[0].objectId;
                    layers[growLyrIndex].layer.selectFeatures(query);
                    callback(saveResponse);
                }));                
            }));
        });
    };

    app.createNewSiteFeature = function (regionId, baseParcel, baseParcelSource, attrGrowSiteID, attrGrowSiteKey, callback) {
        // Create object for writing new Site features

        var polygon = baseParcel.features[0].geometry; 

        app.getPolyXY(baseParcel.features[0], function (center) {
            if (baseParcelSource === "default") {
                var APN = baseParcel.features[0].attributes.APN;
                var DateCoDataAcquired = baseParcel.features[0].attributes.DATECODATAACQUIRED;
                var CountyName = baseParcel.features[0].attributes.COUNTYNAME;
            } else {
                var APN = baseParcel.features[0].attributes.PARNO;
                var DateCoDataAcquired = null;
                var CountyName = null;
            }

            var addFeature = {
                "attributes": {
                    GROWSITEKEY: attrGrowSiteKey,
                    SWRCBREGID: regionId,
                    GROWSITEID: attrGrowSiteID,
                    APN: APN,
                    DATECODATAACQUIRED: DateCoDataAcquired,
                    COUNTYNAME: CountyName,
                    LASTUPDATE: dateToday
                    //DateCoDataAcquired: baseParcel.features[0].attributes.DateCoDataAcquired,
                },
                "geometry": {
                    rings: polygon.rings
                }
            };

            var addPointFeature = {
                "attributes": {
                    GROWSITEKEY: attrGrowSiteKey,
                    SWRCBREGID: regionId,
                    GROWSITEID: attrGrowSiteID,
                    LASTUPDATE: dateToday
                    //GrowSiteStatus: "",
                    //InspectionDate: "",
                    //Notes: "",
                    //Owner: "",
                    //Grower: "",
                    //PermitStatus: "",
                    //PermitTier: "",
                    //PermitID: ""//,
                },
                "geometry": {
                    x: center.x,
                    y: center.y
                }
            };

            // Write first to the Grow Site Parcels polygons layer
            console.log("createNewSiteFeature: Writing to grow site parcel layer");
            $.when(app.saveNewFeature(addFeature, appConfig.URL_EDIT_GROW_SITE_PARCELS, function (parcelResonse) {
                console.log("createNewSiteFeature: Written to grow site parcel layer");
                // then, write to Grow Sites layer
                // Note that currently, any changes made to the poly's attributes will not be updated to the point feature.
                console.log("createNewSiteFeature: Writing to grow site layer");
                $.when(app.saveNewFeature(addPointFeature, appConfig.URL_EDIT_GROW_SITES, function (siteResponse) {
                    console.log("createNewSiteFeature: Written to grow site layer");
                    map.graphics.clear();
                    // loop through map layers to find matching edited layer, then refresh it.
                    layers[growSiteLyrIndex].layer.refresh();
                    layers[growSiteParcLyrIndex].layer.refresh();
                    callback(parcelResonse);
                }));
            }));
        });
    };

    app.createNewFeature = function (source, attrRegion, attrAcreage, graphic, lyrSource, callback) {
        // Create object for writing new feature to the layer
        switch (source) {
            case "disturbed_area":
                var polygon = new Polygon(graphic.geometry.rings);
                $("#stopEdit").hide();
                var addFeature = {
                    "attributes": {
                        SWRCBREGID: attrRegion,
                        DISTURBEDAREASACRES: attrAcreage,
                        INTERPMETHOD: "Field Observation",
                        INTERPDATE: dateToday
                    },
                    "geometry": {
                        rings: polygon.rings
                    }
                };
                app.saveNewFeature(addFeature, lyrSource, function (saveCallback) {
                    map.graphics.clear();
                    esri.hide(loading);

                    // Select the added feature so that its attributes can be modified.
                    var query = new Query();
                    query.where = "objectId = " + saveCallback.addResults[0].objectId;
                    layers[disturbedLyrIndex].layer.selectFeatures(query);
                    layers[disturbedLyrIndex].layer.refresh();
                    $("#editInstructions").html("Type in the attributes for the new feature, then click Save.");
                    callback(null);
                });
                break;
            case "reservoir":
                var polygon = new Polygon(graphic.geometry.rings);
                $("#stopEdit").hide();
                var addFeature = {
                    "attributes": {
                        SWRCBREGID: attrRegion,
                        RESERVIORACRES: attrAcreage,
                        INTERPMETHOD: "Field Observation",
                        INTERPDATE: dateToday
                    },
                    "geometry": {
                        rings: polygon.rings
                    }
                };
                app.saveNewFeature(addFeature, lyrSource, function (saveCallback) {
                    map.graphics.clear();
                    esri.hide(loading);

                    // Select the added feature so that its attributes can be modified.
                    var query = new Query();
                    query.where = "objectId = " + saveCallback.addResults[0].objectId;
                    layers[reservoirLyrIndex].layer.selectFeatures(query);
                    layers[reservoirLyrIndex].layer.refresh();
                    $("#editInstructions").html("Type in the attributes for the new feature, then click Save.");
                    callback(null);
                });
                break;
            case "water_tank":
                $("#stopEdit").hide();
                var addFeature = {
                    "attributes": {
                        SWRCBREGID: attrRegion,
                        INTERPMETHOD: "Field Observation",
                        INTERPDATE: dateToday
                    },
                    "geometry": {
                        x: graphic.geometry.x,
                        y: graphic.geometry.y
                    }
                };
                app.saveNewFeature(addFeature, lyrSource, function (saveCallback) {
                    map.graphics.clear();
                    esri.hide(loading);

                    // Select the added feature so that its attributes can be modified.
                    var query = new Query();
                    query.where = "objectId = " + saveCallback.addResults[0].objectId;
                    layers[waterTankLyrIndex].layer.selectFeatures(query);
                    layers[waterTankLyrIndex].layer.refresh();
                    $("#editInstructions").html("Type in the attributes for the new feature, then click Save.");
                    callback(null);
                });
                break;
        }
    };

    app.updateAttributes = function (ftrUrl, objId, updateField, updateValue, updFeature, callback) {
        //app.updateAttributes(appConfig.URL_PRIOR_MODEL_NUMBER, 1, "Reg1LastModelNumAssigned", 0, null);

        if (!(updFeature)) {
            var updFeature = '[{"attributes": { "OBJECTID": ' + objId + ', "' + updateField + '": ' + updateValue + '}}]';
        };

        var url = ftrUrl + "/updateFeatures";
        var updString = {
            f: 'json',
            //where: "objectId=" + objId,
            features: updFeature//,
            //token: token
        };

        console.log("Writing to updateAttributes: " + updFeature)

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
        // Used for saving and cancelling an edit, and for resetting the edit menu back to default state

        // If editing shape, discard the edits because the user clicked the cancel button
        if ($("#optionsRadios6:checked").prop("checked")) {
            if (shapeEditStatus) {
                console.log("shape edits discarded");

                // ATPNOTE: use the new edited geometry to move the grow point, if it's the grow layer being edited

                console.log("In stopEdit, updating feature = " + shapeEditBackup);

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

        $.each(layers, function (layer) {
            layers[layer].layer.clearSelection();
        });

        // resetting edit menu to defaults
        map.graphics.clear();
        graphicTb.deactivate();

        $.each(editRadios, function (i) {
            $("#editRadios" + (i + 1)).show();
            $("#optionsRadios" + (i + 1) + ":checked").prop("checked", false);
        });
        $("#editLabelAdd").show();
        $("#editLabelEdit").show();
        $("#editLabelDelete").show();
        $("#saveGraphic").hide();
        $("#saveEdits").hide();
        $("#stopEdit").hide();
        $("#saveShapeEdit").hide();
        $("#editInstructions").html("Select an editing option.");
        if (!(clickHandler)) {
            clickHandler = dojo.connect(map, "onClick", clickListener);
        };
        $("#attributesDiv").hide();
        $("#editButtons").hide();
        app.resetPopup();
        mergeSites = [];
        siteFtr = null;

    };

    app.saveEdits = function () {
        // For attribute and shape editing

        if ($("#optionsRadios6:checked").prop("checked")) {
            // Shape edit - on-deactivate, the editToolbar will save the change to the shape
            editToolbar.deactivate();
        } else {
            if ($("#optionsRadios7:checked").prop("checked")) {
                // Merging multiple Grow Sites into a single one
                if (mergeSites.length < 2) {
                    bootbox.alert("Only one Grow Site was specified. No merge will occur. Resetting.");
                    app.stopEdit();
                } else {
                    // There is at least one site that will be merged into another.
                    $.each(mergeSites, function (i) {
                        if (i > 0) {
                            console.log("merging " + mergeSites[i].attributes.GROWSITEKEY + "with " + mergeSites[0].attributes.GROWSITEKEY);
                            // Query the grow footprints to get any grows associated with the Grow Site to be deleted
                            $.when(app.runQuery(appConfig.URL_EDIT_GROW_FOOTPRINTS, "GROWSITEKEY = '" + mergeSites[i].attributes.GROWSITEKEY + "'", function (callback1) {
                                if (callback1) {
                                    console.log(callback1);
                                    $.each(callback1.features, function (i1) {

                                        var updObjectId = callback1.features[i1].attributes.OBJECTID;
                                        console.log("saveEdits: Grow Footprint to be updated: ", updObjectId);
                                        var updFeature = "[{'attributes': { 'OBJECTID': " + updObjectId + ", 'GROWSITEKEY': '" + mergeSites[0].attributes.GROWSITEKEY + "', 'GROWSITEID': " + mergeSites[0].attributes.GROWSITEID + "}}]";
                                        console.log("saveEdits: Grow Footprint update params:", updFeature);
                                        $.when(app.updateAttributes(appConfig.URL_EDIT_GROW_FOOTPRINTS, updObjectId, null, null, updFeature, function (updCallback1) {
                                            console.log("saveEdits: Grow Footprint updated = ", updCallback1);
                                            layers[growLyrIndex].layer.clearSelection();
                                            layers[growLyrIndex].layer.refresh();
                                        }));

                                    });
                                }

                            }));
                            $.when(app.runQuery(appConfig.URL_EDIT_GROW_SITE_PARCELS, "GROWSITEKEY = '" + mergeSites[i].attributes.GROWSITEKEY + "'", function (callback2) {
                                if (callback2) {
                                    console.log(callback2);
                                    $.each(callback2.features, function (i2) {
                                        var updObjectId = callback2.features[i2].attributes.OBJECTID;
                                        console.log("saveEdits: Grow Site Parcel to be updated: ", updObjectId);
                                        var updFeature = "[{'attributes': { 'OBJECTID': " + updObjectId + ", 'GROWSITEKEY': '" + mergeSites[0].attributes.GROWSITEKEY + "', 'GROWSITEID': " + mergeSites[0].attributes.GROWSITEID + "}}]";
                                        console.log("saveEdits: Grow Site Parcel update params:", updFeature);
                                        $.when(app.updateAttributes(appConfig.URL_EDIT_GROW_SITE_PARCELS, updObjectId, null, null, updFeature, function (updCallback2) {
                                            console.log("saveEdits: Grow Site Pacel updated = ", updCallback2);
                                        }));
                                        //callback2.features[i2].attributes.GrowSiteKey = mergeSites[0].attributes.GrowSiteKey;
                                        //layers[growSiteParcLyrIndex].layer.applyEdits(null, callback2.features[i2], null);
                                    });
                                }

                            }));

                            console.log("delete " + mergeSites[i].attributes.OBJECTID);
                            app.deleteFeature(mergeSites[i], false);
                        }
                    });
                    map.graphics.clear();
                }
            } else {
                // All other edits are already recorded, just reset the menu
                app.stopEdit();
            }

        }
    };

    app.saveNewFeature = function (feature, url, callback) {
        // Write new feature to layer using object created in createNewFeature
        // NOTES: token removed from addParams below, necessary with move of data from AGOL to AGS
        //        Added "[" and "]" to addFeature, necessary with move of data from AGOL to AGS
        var addFeature = "[" + JSON.stringify(feature) + "]";
        console.log(addFeature);
        var urlEdit = url + "/addFeatures";
        var addParams = {
            f: "json",
            features: addFeature//,
            //token: token
        };

        testvar = addFeature;

        console.log("Writing from saveNewFeature: " + addFeature)

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

    app.updateFeature = function (feature, url, callback) {
        // Write new feature to layer using object created in createNewFeature
        // NOTES: token removed from addParams below, necessary with move of data from AGOL to AGS
        //        Added "[" and "]" to addFeature, necessary with move of data from AGOL to AGS
        var updFeature = "[" + JSON.stringify(feature) + "]";
        console.log(updFeature);
        var urlEdit = url + "/updateFeatures";
        var addParams = {
            f: "json",
            features: updFeature//,
            //token: token
        };

        testvar = updFeature;

        console.log("Writing from updateFeature: " + updFeature)

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

    $("#appContent").show();
    $("#appInit").hide();
    $("#sign-out").show();
    $("#about-cips").show();
    $("#open-modeler").show();
    $("#cips-dashboard").show();
    app.buildMap();

    /*
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
			$("#open-modeler").show();
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
    */

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
                expires: 1
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

    $(document).ready(function () {
        // Page has loaded, set on- events	

        $.unblockUI();

        // resize the max height of the map toolbar contents
        $(window).resize(function () {
            var subHeight = $("#header-container").height() + $("#ribbonTabs").height() + 10;
            $('.tab-pane').css("max-height", (($(window).height()) - subHeight));
        });

        $('#mapNavPrev').on('click', function () {
            mapNav.zoomToPrevExtent();
        });
        $('#mapNavNext').on('click', function () {
            mapNav.zoomToNextExtent();
        });
        $('#mapNavFull').on('click', function () {
            //mapNav.zoomToFullExtent();
            map.setExtent(new Extent(appConfig.INIT_EXTENT), true);
        });
        $('#about-cips').on('click', function () {
            bootbox.alert(appConfig.ABOUT_TEXT);
        });
        $("#sumWshd-toggle").change(function () {
            app.summarizeWshd($(this).prop("checked"));
        });
        $("#sumSite-toggle").change(function () {
            app.summarizeSite($(this).prop("checked"));
        });

    });
});
