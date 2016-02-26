// Application configuration settings

var appConfig = dojo.getObject('appConfig', true);
var urlRoot = "http://wb-sb-gisapp-int.ca.epa.local/arcgis/rest/services/CIPS/"; //"http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/";

appConfig = {
	APP_NAME: "CIPS",
    APP_NAME_HTML_TITLE: "CIPS Dashboard",
    APP_NAME_DIALOGUE: "CIPS",
    APP_HEADER_TITLE: '<span style="color: #335b96; font-weight: 300;">DASHBOARD</span>',
    ABOUT_TEXT: "Cannabis Identification and Prioritization System (CIPS) Dashboard</br></br>Version: Beta 1.6",
    ORGANIZATION_NAME: "California State Water Resources Control Board",
    
    PROXY_PAGE: "http://wb-sb-gisapp-int.ca.epa.local/agsproxy/DotNet/proxy.ashx",
    //PROXY_PAGE: "http://mapserver2.vestra.com/demo/cipsproxy/DotNet/proxy.ashx",
    PRINT_SERVICE: "http://wb-sb-gisapp-int.ca.epa.local/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task", //"http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
    //PRINT_SERVICE: "http://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
    INIT_EXTENT: { xmin: -14033566.61705768, ymin: 4664918.866412182, xmax: -13173191.426679777, ymax: 5168791.756868039, spatialReference: { wkid: 102100 } },
    
    AUTH: "arcgisonline", // "arcgisonline" if using OAuth to arcgis.com, "arcgisserver" if using server
    APPID: "p9Ro4eKhR5pNK3Ci", // if using ArcGIS Online authentication, this is the registered id for the app.
    WEBMAP_ID: "", // Use "" if defining below with cips-dashboard-webmap.js file. If an ID is used, the WEBMAP_JSON content below will be ignored.

	URL_REGION: urlRoot + "CIPS_Base/MapServer/0",
	URL_WATERSHED: urlRoot + "CIPS_Base/MapServer/1",

    URL_INTERP_AREA: urlRoot + "CIPS_Operational/MapServer/7",
	URL_SUMMARY_REGION: urlRoot + "CIPS_Operational/MapServer/21",
	URL_SUMMARY_INTERP_AREA: urlRoot + "CIPS_Operational/MapServer/13",
	
    URL_GROW_POLYS: urlRoot + "CIPS_Operational/MapServer/2",
    URL_GROW_POINTS: urlRoot + "CIPS_Operational/MapServer/1",
    GROW_POINTS_NAME: "Grow Locations (Grouped)", // name used for clustered point layer
    GROW_POINTS_SCALE: 73000, // minimum scale the clustered point layer will be displayed at.
    URL_GROW_PREPROC_RESULTS: urlRoot + "CIPS_Operational/MapServer/11",
    
    URL_PRIOR_AREA: urlRoot + "CIPS_Operational/MapServer/6", //"CIPS_20151123/MapServer/5", //  "CIPS_20151015/FeatureServer/3",
	URL_PRIOR_AREA_NUM: urlRoot + "CIPS_Operational/MapServer/16", //"CIPS_Operational/FeatureServer/9",
	URL_PRIOR_MODELS: urlRoot + "CIPS_Operational/MapServer/18", //"CIPS_20151123/FeatureServer/10", //"CIPS_20151015/FeatureServer/18",
	URL_PRIOR_MODELS_SUMMARY: urlRoot + "CIPS_Operational/MapServer/20", //"CIPS_20151123/FeatureServer/8",
	
	URL_PRIOR_MODELS_RESULTS: urlRoot + "CIPS_Operational/MapServer/5", //"CIPS_20151123/FeatureServer/4", // Prioritization Grows (polygons) 
	URL_PRIOR_MODELS_RESULTS_RELATE: urlRoot + "CIPS_Operational/MapServer/17", //"CIPS_20151123/FeatureServer/11", // Prioritization Model results related table 
	URL_PRIOR_MODELS_HEATMAP: urlRoot + "CIPS_CIPS_PrtizMod_HeatMap/ImageServer",
	PRIOR_MODEL_NUM_FACTORS: 10, //Total number of prioritization model factors available to select from. Used for looping through options during model editing/creation.

	URL_PRIOR_PREPROC_INPUTS: urlRoot + "CIPS_Operational/MapServer/15", //"CIPS_20151123/FeatureServer/13",
	URL_PRIOR_MODEL_NUMBER: urlRoot + "CIPS_Operational/MapServer/19", //"CIPS_20151123/FeatureServer/9",
	
	// LAYER_NAME is used to identify layers by their name, as saved in the web map JSON file. If changed here, make sure this matches the web map.
    LAYER_NAME_WSHD: "Watershed Boundaries - HUC12",
    LAYER_NAME_INTERP: "Interpretation Areas",
    LAYER_NAME_INTERP_WSHD: "Interpretation Area Watersheds",
    LAYER_NAME_SWRCB_REGIONS: "SWRCB Regions",
    LAYER_NAME_GROW_FOOTPRINTS: "Grow Footprints",
    LAYER_NAME_GROW_LOCATIONS: "Grow Locations",
    LAYER_NAME_MAIN_HEATMAPS: "Grow Site Heat Maps",
    LAYER_NAME_PRIORITIZ_HEATMAPS: "Prioritization Model Heat Map",
    LAYER_NAME_SITES: "Grow Sites",
    LAYER_NAME_SITES_PARCELS: "Grow Site Parcels",

	BASEMAPS: {
		// Add as many basemaps as desired below using the same structure.
		// Note that you can have 1, 2 or 3 layers included in the basemap (see examples of 3 in base2)
		base1:{
	    	numberOfLayers: 1,
	    	url: "http://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer",
    		title: "Topographic",
    		thumbnailUrl: "img/topo_map_2.jpg"
    	},
		base2: {
	    	numberOfLayers: 3,
	    	url1: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
	    	url2: "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer",
	    	url3: "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer",
    		title: "Esri Imagery with Transportation Overlay",
    		thumbnailUrl: "img/imagery_hybrid.jpg"
    	},
    	base3: {
    		numberOfLayers: 1,
	    	url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2014/ImageServer",
    		title: "2014 Imagery (CA NAIP)",
    		thumbnailUrl: "img/base-image-14.png"
    	},
    	base4: {
    		numberOfLayers: 1,
	    	url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2014_CIR/ImageServer",
    		title: "2014 Imagery (CA NAIP) Color Infrared",
    		thumbnailUrl: "img/base-infra.png"
    	},
    	base5: {
    		numberOfLayers: 1,
	    	url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2012/ImageServer",
    		title: "2012 Imagery (CA NAIP)",
    		thumbnailUrl: "img/base-image-12.png"
    	},
    	base6: {
    		numberOfLayers: 1,
	    	url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2010/ImageServer",
    		title: "2010 Imagery (CA NAIP)",
    		thumbnailUrl: "img/base-image-10.png"
    	},
    	base7: {
    		numberOfLayers: 1,
	    	url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2009/ImageServer",
    		title: "2009 Imagery (CA NAIP)",
    		thumbnailUrl: "img/base-image-09.png"
    	},
    	base8: {
    		numberOfLayers: 1,
	    	url: "https://map.dfg.ca.gov/arcgis/rest/services/Base_Remote_Sensing/NAIP_2005/ImageServer",
    		title: "2005 Imagery (CA NAIP)",
    		thumbnailUrl: "img/base-image-05.png"
    	}
	}
	
	};
