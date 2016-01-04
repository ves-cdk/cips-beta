// Application configuration settings

var appConfig = dojo.getObject('appConfig', true);
var urlRoot = "http://mapserver.vestra.com/arcgis/rest/services/CIPS/";

appConfig = {
	APP_NAME: "CIPS",
    APP_NAME_HTML_TITLE: "CIPS Editor",
    APP_NAME_DIALOGUE: "CIPS",
    APP_HEADER_TITLE: '<span style="color: #335b96; font-weight: 300;">EDITOR</span>',
    ABOUT_TEXT: "Cannabis Identification and Prioritization System (CIPS) Editor</br></br>Version: Beta 1.6",
    ORGANIZATION_NAME: "California State Water Resources Control Board",
    
    PROXY_PAGE: "http://localhost/apps/cipsproxy/DotNet/proxy.ashx",
    //PROXY_PAGE: "http://mapserver2.vestra.com/demo/cipsproxy/DotNet/proxy.ashx",
    PRINT_SERVICE: "http://mapserver.vestra.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task", //"http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task", 
    INIT_EXTENT: { xmin: 	-14033566.61705768, ymin: 4664918.866412182, xmax: -13173191.426679777, ymax: 5168791.756868039, spatialReference: { wkid: 102100 } },
    GEOMETRY_SERVICE: "https://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer",
   
    AUTH: "arcgisonline", // "arcgisonline" if using OAuth to arcgis.com, "arcgisserver" if using server
    APPID: "p9Ro4eKhR5pNK3Ci", // if using ArcGIS Online authentication, this is the registered id for the app.
    
    URL_REGION: urlRoot + "CIPS_Base/MapServer/0",
	URL_WATERSHED: urlRoot + "CIPS_Base/MapServer/1",
    
    URL_GROW_POLYS: urlRoot + "CIPS_Operational/FeatureServer/2",
    URL_GROW_POINTS: urlRoot + "CIPS_Operational/FeatureServer/1",
    GROW_POINTS_NAME: "Grow Locations (Grouped)", // name used for clustered point layer
    GROW_POINTS_SCALE: 73000, // minimum scale the clustered point layer will be displayed at.

	URL_INTERP_AREA: urlRoot + "CIPS_Operational/FeatureServer/7",
	URL_GROW_NUM: urlRoot + "CIPS_Operational/FeatureServer/10",
	URL_SUMMARY_REGION: urlRoot + "CIPS_Operational/FeatureServer/21",
    URL_SUMMARY_INTERP_AREA: urlRoot + "CIPS_Operational/FeatureServer/13", //urlRoot + "CIPS_20151015/FeatureServer/11",
    URL_EDIT_WATER_TANK: urlRoot + "CIPS_Operational/FeatureServer/0",
    URL_EDIT_RESERVOIR: urlRoot + "CIPS_Operational/FeatureServer/3",
    URL_EDIT_DISTURBED_AREA: urlRoot + "CIPS_Operational/FeatureServer/4",
    URL_EDIT_GROW_POINTS: urlRoot + "CIPS_Operational/FeatureServer/1",
    URL_EDIT_GROW_FOOTPRINTS: urlRoot + "CIPS_Operational/FeatureServer/2",
    URL_EDIT_GROW_SITES: urlRoot + "CIPS_Operational/FeatureServer/8",
    URL_EDIT_GROW_SITE_PARCELS: urlRoot + "CIPS_Operational/FeatureServer/9",
    URL_EDIT_PARCELS: urlRoot + "CIPS_Base/MapServer/4",
    
    // LAYER_NAME is used to identify layers by their name, as saved in the web map JSON file. If changed here, make sure this matches the web map.
    LAYER_NAME_WSHD: "Watershed Boundaries (HUC12)",
    LAYER_NAME_INTERP: "Interpretation Areas",
    //LAYER_NAME_INTERP_WSHD: "Interpretation Area Watersheds",
    LAYER_NAME_SWRCB_REGIONS: "SWRCB Regions",
    LAYER_NAME_GROW_FOOTPRINTS: "Grow Footprints",
    LAYER_NAME_GROW_LOCATIONS: "Grow Locations",
    LAYER_NAME_DISTURBED_AREAS: "Disturbed Areas",
    LAYER_NAME_WATER_TANKS: "Water Tanks",
    LAYER_NAME_RESERVOIRS: "Reservoirs",
    LAYER_NAME_SITES: "Grow Sites",
    LAYER_NAME_SITES_PARCELS: "Grow Site Parcels",
    LAYER_NAME_PARCELS: "Parcels",
    LAYER_NAME_PARCELS_ALT: "Parcels (OCIO Statewide)", // this is an alternate source for parcel boundaries, using State CIO map service.
    
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
