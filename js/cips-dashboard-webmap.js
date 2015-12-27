// Application configuration settings

var appWebMap = dojo.getObject('appWebMap', true);

appWebMap = {
    WEBMAP_JSON: 
    // **** Copy  webmap2Json output into the section below ****
    // **** Start section ---------------------------------------------------------------------------------------------------------- **** 

{
  "item": {
    "title": "CIPS_Dashboard",
    "snippet": "CIPS",
    "extent": [
      [
        -126.2973,
        38.9189
      ],
      [
        -118.9365,
        42.0188
      ]
    ]
  },
  "itemData": {
    "operationalLayers": [
      {
        "id": "World_Hillshade_7117",
        "layerType": "ArcGISTiledMapServiceLayer",
        "url": "http://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer",
        "visibility": false,
        "opacity": 1,
        "title": "World Hillshade",
        "itemId": "1b243539f4514b6ba35e7d995890db1d"
      },
      {
        "id": "USA_Soil_Mapunits_2014_1274",
        "layerType": "ArcGISMapServiceLayer",
        "url": "http://landscape1.arcgis.com/arcgis/rest/services/USA_Soil_Mapunits_2014/MapServer",
        "visibility": false,
        "opacity": 1,
        "title": "USA_Soil_Mapunits_2014",
        "layers": [
          {
            "id": 0,
            "popupInfo": {
              "title": "Soil Map Units: {muname}",
              "fieldInfos": [
                {
                  "fieldName": "objectid",
                  "label": "OBJECTID",
                  "tooltip": "",
                  "visible": false,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "areasymbol",
                  "label": "Area Symbol",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "spatialver",
                  "label": "Spatial Version",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "musym",
                  "label": "Mapunit Symbol",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "muname",
                  "label": "Mapunit Name",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "mukind",
                  "label": "Mapunit Kind",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "farmlndcl",
                  "label": "Farmland Class",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "interpfocus",
                  "label": "Interpretive Focus",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "invesintens",
                  "label": "Intensity of Mapping",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "iacornsr",
                  "label": "Iowa Corn Suitability Rating",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "projectscale",
                  "label": "Project Scale",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "saversion",
                  "label": "Survey Area Version",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "tabularversion",
                  "label": "Tabular Version",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "slopegraddcp",
                  "label": "Slope Gradient - Dominant Component",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "slopegradwta",
                  "label": "Slope Gradient - Weighted Average",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "brockdepmin",
                  "label": "Bedrock Depth - Minimum",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wtdepannmin",
                  "label": "Water Table Depth - Annual Minimum",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wtdepaprjunmin",
                  "label": "Water Table Depth - April to June Minimum",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "flodfreqdcd",
                  "label": "Flooding Frequency - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "flodfreqmax",
                  "label": "Flooding Frequency - Maximum",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "pondfreqprs",
                  "label": "Ponding Frequency - Presence",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "aws025wta",
                  "label": "Available Water Storage 0-25 cm - Weighted Average",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "aws050wta",
                  "label": "Available Water Storage 0-50 cm - Weighted Average",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "aws0100wta",
                  "label": "Available Water Storage 0-100 cm - Weighted Average",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "aws0150wta",
                  "label": "Available Water Storage 0-150 cm - Weighted Average",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "drclassdcd",
                  "label": "Drainage Class - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "drclasswettest",
                  "label": "Drainage Class - Wettest",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "hydgrpdcd",
                  "label": "Hydrologic Group - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "iccdcd",
                  "label": "Irrigated Capability Class - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "iccdcdpct",
                  "label": "Irrigated Capability Class - Proportion of Mapunit with Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "niccdcd",
                  "label": "Non-Irrigated Capability Class - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "niccdcdpct",
                  "label": "Non-Irrigated Capability Class - Proportion of Mapunit with Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "engdwobdcd",
                  "label": "Rating for Buildings without Basements - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "engdwbdcd",
                  "label": "Rating for Buildings with Basements - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "engdwbll",
                  "label": "Rating for Buildings with Basements - Least Limiting",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "engdwbml",
                  "label": "Rating for Buildings with Basements - Most Limiting",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "engstafdcd",
                  "label": "Rating for Septic Tank Absorption Fields - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "engstafll",
                  "label": "Rating for Septic Tank Absorption Fields - Least Limiting",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "engstafml",
                  "label": "Rating for Septic Tank Absorption Fields - Most Limiting",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "engsldcd",
                  "label": "Rating for Sewage Lagoons - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "engsldcp",
                  "label": "Rating for Sewage Lagoons - Dominant Component",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "englrsdcd",
                  "label": "Rating for Roads and Streets - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "engcmssdcd",
                  "label": "Rating for Sand Source - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "engcmssmp",
                  "label": "Rating for Sand Source - Most Probable",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "urbrecptdcd",
                  "label": "Rating for Paths and Trails - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "urbrecptwta",
                  "label": "Rating for Paths and Trails - Weighted Average",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "forpehrtdcp",
                  "label": "Erosion Hazard of Forest Roads and Trails - Dominant Component",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "hydclprs",
                  "label": "Hydric Classification - Presence",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "awmmfpwwta",
                  "label": "Rating for Manure and Food Processing Waste - Weighted Average",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "comppct_l",
                  "label": "Component Percentage - Low Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "comppct_r",
                  "label": "Component Percentage - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "comppct_h",
                  "label": "Component Percentage - High Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "compname",
                  "label": "Component Name",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "compkind",
                  "label": "Component Kind",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "otherph",
                  "label": "Other Criteria Used to Identify Components",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "localphase",
                  "label": "Criteria Used to Identify Components at the Local Level",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "runoff",
                  "label": "Runoff Class",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "tfact",
                  "label": "Soil loss tolerance factor",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wei",
                  "label": "Wind Erodibility Index",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "weg",
                  "label": "Wind Erodibility Group",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "erocl",
                  "label": "Erosion Class",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "earthcovkind1",
                  "label": "Earth Cover 1",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "earthcovkind2",
                  "label": "Earth Cover 2",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "hydricon",
                  "label": "Hydric Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "hydricrating",
                  "label": "Hydric Rating",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "aspectccwise",
                  "label": "Aspect Range - Counter Clockwise Limit",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "aspectrep",
                  "label": "Aspect - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "aspectcwise",
                  "label": "Aspect Range - Clockwise Limit",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "geomdesc",
                  "label": "Geomorphic Description",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "nirrcapscl",
                  "label": "Non-Irrigated Capability Subclass",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "nirrcapunit",
                  "label": "Non-Irrigated Unit Capability Class",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "irrcapscl",
                  "label": "Irrigated Capability Subclass",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "irrcapunit",
                  "label": "Irrigated Unit Capability Class",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "constreeshrubgrp",
                  "label": "Conservation Tree Shrub Group",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wlgrain",
                  "label": "Grain Wildlife Habitat",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wlgrass",
                  "label": "Grass Wildlife Habitat",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wlherbaceous",
                  "label": "Herbaceous Wildlife Habitat",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wlshrub",
                  "label": "Shrub Wildlife Habitat",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wlconiferous",
                  "label": "Conifer Wildlife Habitat",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wlhardwood",
                  "label": "Hardwood Wildlife Habitat",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wlwetplant",
                  "label": "Wetland Wildlife Habitat",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wlshallowwat",
                  "label": "Shallow Water Wildlife Habitat",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wlrangeland",
                  "label": "Rangeland Wildlife Habitat",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wlopenland",
                  "label": "Openland Wildlife Habitat",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wlwoodland",
                  "label": "Woodland Wildlife Habitat",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "wlwetland",
                  "label": "Wetland Wildlife Habitat",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "soilslippot",
                  "label": "Soil Slip Potential",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "frostact",
                  "label": "Susceptibility to Frost Heaving",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "corcon",
                  "label": "Concrete Corrosion",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "corsteel",
                  "label": "Steel Corrosion",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "taxclname",
                  "label": "Taxonomic Class",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "taxorder",
                  "label": "Taxonomic Order",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "taxsuborder",
                  "label": "Taxonomic Suborder",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "taxgrtgroup",
                  "label": "Great Group",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "taxsubgrp",
                  "label": "Subgroup",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "taxpartsize",
                  "label": "Particle Size",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "taxpartsizemod",
                  "label": "Particle Size Mod",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "taxceactcl",
                  "label": "Cation Exchange Activity Class",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "taxreaction",
                  "label": "Carbonate Reaction",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "taxtempcl",
                  "label": "Temperature Class",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "taxmoistscl",
                  "label": "Moist Subclass",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "taxtempregime",
                  "label": "Soil Temperature Regime",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "soiltaxedition",
                  "label": "Edition of Keys to Soil Taxonomy Used to Classify Soil",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "castorieindex",
                  "label": " California Storie Index",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 0,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "cokey",
                  "label": "Component Key",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "slope_l",
                  "label": "Slope Gradient - Low Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "slope_r",
                  "label": "Slope Gradient - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "slope_h",
                  "label": "Slope Gradient - High Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "slopelen_l",
                  "label": "Slope Length USLE - Low Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "slopelen_r",
                  "label": "Slope Length USLE - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "slopelen_h",
                  "label": "Slope Length USLE - High Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "elev_l",
                  "label": "Elevation - Low Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "elev_r",
                  "label": "Elevation - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "elev_h",
                  "label": "Elevation - High Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "albedodry_l",
                  "label": "Albedo - Low Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "albedodry_r",
                  "label": "Albedo - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "albedodry_h",
                  "label": "Albedo - High Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "airtempa_l",
                  "label": "Mean Annual Air Temperature - Low Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "airtempa_r",
                  "label": "Mean Annual Air Temperature - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "airtempa_h",
                  "label": "Mean Annual Air Temperature - High Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "map_l",
                  "label": "Mean Annual Precipitation - Low Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "map_r",
                  "label": "Mean Annual Precipitation - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "map_h",
                  "label": "Mean Annual Precipitation - High Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "reannualpr_l",
                  "label": "Relative Effective Annual Precipitation - Low Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "reannualpr_r",
                  "label": "Relative Effective Annual Precipitation - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "reannualpr_h",
                  "label": "Relative Effective Annual Precipitation - High Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "ffd_l",
                  "label": "Days between Last and First Frost - Low Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "ffd_r",
                  "label": "Days between Last and First Frost - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "ffd_h",
                  "label": "Days between Last and First Frost - High Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "rsprod_l",
                  "label": "Range Forage Annual Potential Production - Low Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "rsprod_r",
                  "label": "Range Forage Annual Potential Production - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "rsprod_h",
                  "label": "Range Forage Annual Potential Production - High Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "initsub_l",
                  "label": "Initial Subsidence - Low Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "initsub_r",
                  "label": "Initial Subsidence - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "initsub_h",
                  "label": "Initial Subsidence - High Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "totalsub_l",
                  "label": "Total Subsidence - Low Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "totalsub_r",
                  "label": "Total Subsidence - Representative Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "totalsub_h",
                  "label": "Total Subsidence - High Value",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "cropprodindex",
                  "label": "Crop Productivity Index",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "esrisymbology",
                  "label": "Esri Symbology",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "kffact",
                  "label": "K-Factor Rock Free",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "alfisols_pct",
                  "label": "Percent Alfisols",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "andisols_pct",
                  "label": "Percent Andisols",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "aridisols_pct",
                  "label": "Percent Aridisols",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "entisols_pct",
                  "label": "Percent Entisols",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "gelisols_pct",
                  "label": "Percent Gelisols",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "histosols_pct",
                  "label": "Percent Histosols",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "inceptisols_pct",
                  "label": "Percent Inceptisols",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "mollisols_pct",
                  "label": "Percent Mollisols",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "spodosols_pct",
                  "label": "Percent Spodosols",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "ultisols_pct",
                  "label": "Percent Ultisols",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "vertisols_pct",
                  "label": "Percent Vertisols",
                  "tooltip": "",
                  "visible": true,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "soilorderdomcond",
                  "label": "Soil Order - Dominant Condition",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "mukey_1",
                  "label": "Mapunit Key",
                  "tooltip": "",
                  "visible": true,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "shape",
                  "label": "Shape",
                  "tooltip": "",
                  "visible": false,
                  "format": null,
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "st_area(shape)",
                  "label": "st_area(shape)",
                  "tooltip": "",
                  "visible": false,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                },
                {
                  "fieldName": "st_length(shape)",
                  "label": "st_length(shape)",
                  "tooltip": "",
                  "visible": false,
                  "format": {
                    "places": 2,
                    "digitSeparator": true
                  },
                  "stringFieldOption": "textbox"
                }
              ],
              "description": null,
              "showAttachments": true,
              "mediaInfos": []
            }
          }
        ]
      },
      {
        "id": "USA_Geology_Units_9422",
        "layerType": "ArcGISMapServiceLayer",
        "url": "http://landscape1.arcgis.com/arcgis/rest/services/USA_Geology_Units/MapServer",
        "visibility": false,
        "opacity": 1,
        "title": "USA Geology Units",
        "itemId": "65f1f4f412d94f55920e376db410f3fd"
      },
      {
        "id": "CIPS_HeatMaps_7008",
        "layerType": "ArcGISMapServiceLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_HeatMaps/MapServer",
        "visibility": true,
        "opacity": 1,
        "title": "Grow Site Heat Maps"
      },
      {
        "id": "CIPS_ModelSource_Raster_LSFactor_8620",
        "layerType": "ArcGISMapServiceLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_ModelSource_Raster_LSFactor/MapServer",
        "visibility": false,
        "visibleLayers": [
          0,
          3
        ],
        "opacity": 1,
        "title": "Model Source - LSFactor"
      },
      {
        "id": "CIPS_ModelSource_Raster_Slope_2134",
        "layerType": "ArcGISMapServiceLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_ModelSource_Raster_Slope/MapServer",
        "visibility": false,
        "visibleLayers": [
          0,
          3
        ],
        "opacity": 1,
        "title": "Model Source - Percent Slope"
      },
      {
        "id": "CIPS_ModelSource_Vector_6820",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_ModelSource_Vector/MapServer/3",
        "visibility": false,
        "opacity": 0.75,
        "mode": 1,
        "title": "Model Source - CNDDB",
        "popupInfo": {
          "title": "Model Source - CNDDB: {SNAME}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape",
              "label": "Shape",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SNAME",
              "label": "SNAME",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "CNAME",
              "label": "CNAME",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "ELMCODE",
              "label": "ELMCODE",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "OCCNUMBER",
              "label": "OCCNUMBER",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "MAPNDX",
              "label": "MAPNDX",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "EONDX",
              "label": "EONDX",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "KEYQUAD",
              "label": "KEYQUAD",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "KQUADNAME",
              "label": "KQUADNAME",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "KEYCOUNTY",
              "label": "KEYCOUNTY",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PARTS",
              "label": "PARTS",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "ELMTYPE",
              "label": "ELMTYPE",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "EOCOUNT",
              "label": "EOCOUNT",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "ACCURACY",
              "label": "ACCURACY",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PRESENCE",
              "label": "PRESENCE",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "OCCTYPE",
              "label": "OCCTYPE",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "OCCRANK",
              "label": "OCCRANK",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SENSITIVE",
              "label": "SENSITIVE",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SITEDATE",
              "label": "SITEDATE",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "ELMDATE",
              "label": "ELMDATE",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "OWNERMGT",
              "label": "OWNERMGT",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "FEDLIST",
              "label": "FEDLIST",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "CALLIST",
              "label": "CALLIST",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GRANK",
              "label": "GRANK",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SRANK",
              "label": "SRANK",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "RPLANTRANK",
              "label": "RPLANTRANK",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "LOCATION",
              "label": "LOCATION",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "LOCDETAILS",
              "label": "LOCDETAILS",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "ECOLOGICAL",
              "label": "ECOLOGICAL",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "THREAT",
              "label": "THREAT",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GENERAL",
              "label": "GENERAL",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "AREA",
              "label": "AREA",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PERIMETER",
              "label": "PERIMETER",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "AVLCODE",
              "label": "AVLCODE",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Symbology",
              "label": "Symbology",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape_Length",
              "label": "Shape_Length",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape_Area",
              "label": "Shape_Area",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_ModelSource_Vector_3782",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_ModelSource_Vector/MapServer/2",
        "visibility": false,
        "opacity": 1,
        "mode": 1,
        "title": "Model Source - Surface Water (Flowline)",
        "popupInfo": {
          "title": "Model Source - Surface Water (Flowline): {GNIS_Name}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape",
              "label": "Shape",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Permanent_Identifier",
              "label": "Permanent_Identifier",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "FDate",
              "label": "FDate",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Resolution",
              "label": "Resolution",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GNIS_ID",
              "label": "GNIS_ID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GNIS_Name",
              "label": "GNIS_Name",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "LengthKM",
              "label": "LengthKM",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "ReachCode",
              "label": "ReachCode",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "FlowDir",
              "label": "FlowDir",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "WBArea_Permanent_Identifier",
              "label": "WBArea_Permanent_Identifier",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "FType",
              "label": "FType",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "FCode",
              "label": "FCode",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Enabled",
              "label": "Enabled",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape_Length",
              "label": "Shape_Length",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_ModelSource_Vector_3903",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_ModelSource_Vector/MapServer/1",
        "visibility": false,
        "opacity": 1,
        "mode": 1,
        "title": "Model Source - Surface Water (Area)",
        "popupInfo": {
          "title": "Model Source - Surface Water (Area): {GNIS_Name}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape",
              "label": "Shape",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Permanent_Identifier",
              "label": "Permanent_Identifier",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "FDate",
              "label": "FDate",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Resolution",
              "label": "Resolution",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GNIS_ID",
              "label": "GNIS_ID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GNIS_Name",
              "label": "GNIS_Name",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "AreaSqKm",
              "label": "AreaSqKm",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Elevation",
              "label": "Elevation",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "FType",
              "label": "FType",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "FCode",
              "label": "FCode",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape_Length",
              "label": "Shape_Length",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape_Area",
              "label": "Shape_Area",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_ModelSource_Vector_6795",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_ModelSource_Vector/MapServer/0",
        "visibility": false,
        "opacity": 1,
        "mode": 1,
        "title": "Model Source - Surface Water (Waterbody)",
        "popupInfo": {
          "title": "Model Source - Surface Water (Waterbody): {GNIS_Name}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape",
              "label": "Shape",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Permanent_Identifier",
              "label": "Permanent_Identifier",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "FDate",
              "label": "FDate",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Resolution",
              "label": "Resolution",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GNIS_ID",
              "label": "GNIS_ID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GNIS_Name",
              "label": "GNIS_Name",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "AreaSqKm",
              "label": "AreaSqKm",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Elevation",
              "label": "Elevation",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "ReachCode",
              "label": "ReachCode",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "FType",
              "label": "FType",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "FCode",
              "label": "FCode",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape_Length",
              "label": "Shape_Length",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape_Area",
              "label": "Shape_Area",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_Parcels_3834",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_Base/MapServer/4",
        "visibility": false,
        "opacity": 1,
        "mode": 1,
        "title": "Parcels",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "label": "",
              "description": "",
              "symbol": {
                "color": null,
                "outline": {
                  "color": [
                    115,
                    76,
                    0,
                    255
                  ],
                  "width": 0.75,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
                },
                "type": "esriSFS",
                "style": "esriSFSSolid"
              }
            }
          }
        },
        "popupInfo": {
          "title": "Parcels: {CountyName}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SHAPE",
              "label": "SHAPE",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "CountyName",
              "label": "CountyName",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "APN",
              "label": "APN",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "DateCoDataAcquired",
              "label": "DateAcquired",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SHAPE_Length",
              "label": "SHAPE_Length",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SHAPE_Area",
              "label": "SHAPE_Area",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_Operational_rev1_6517",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_Operational/MapServer/9",
        "visibility": false,
        "opacity": 1,
        "mode": 1,
        "title": "Grow Site Parcels",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "label": "",
              "description": "",
              "symbol": {
                "color": [
                  211,
                  255,
                  190,
                  62
                ],
                "outline": {
                  "color": [
                    38,
                    115,
                    0,
                    255
                  ],
                  "width": 0.9,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
                },
                "type": "esriSFS",
                "style": "esriSFSSolid"
              }
            }
          },
          "minScale": 320000,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "Grow Site Parcels: {CountyName}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "isEditable": false,
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowSiteKey",
              "label": "GrowSiteKey",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SWRCBRegID",
              "label": "SWRCBRegID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowSiteID",
              "label": "GrowSiteID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "CountyName",
              "label": "CountyName",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "APN",
              "label": "APN",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "DateCoDataAcquired",
              "label": "DateCoDataAcquired",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "LastUpdate",
              "label": "LastUpdate",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_Base_7770",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_Base/MapServer/2",
        "visibility": false,
        "opacity": 1,
        "mode": 1,
        "title": "Nonindustrial Timber Management Plant (Cal Fire)",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "label": "",
              "description": "",
              "symbol": {
                "color": [
                  190,
                  232,
                  255,
                  124
                ],
                "outline": {
                  "color": [
                    0,
                    38,
                    115,
                    255
                  ],
                  "width": 0.5625,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
                },
                "type": "esriSFS",
                "style": "esriSFSSolid"
              }
            }
          },
          "minScale": 1500000,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "CIPS_BASE_CALFIRE_NTMPS: {County}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Year",
              "label": "Year",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "County",
              "label": "County",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "HarvestDoc_Num",
              "label": "HarvestDoc_Num",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Silviculture",
              "label": "Silviculture",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Silviculture2",
              "label": "Silviculture2",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Yarding",
              "label": "Yarding",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Status_of_Plan",
              "label": "Status_of_Plan",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Completion_Date",
              "label": "Completion_Date",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Timber_Owner",
              "label": "Timber_Owner",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Landowner",
              "label": "Landowner",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Acres",
              "label": "Acres",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "StartTHPYearDate",
              "label": "StartTHPYearDate",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "DateDataPublished",
              "label": "DateDataPublished",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SHAPE",
              "label": "SHAPE",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SHAPE.STArea()",
              "label": "SHAPE.STArea()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SHAPE.STLength()",
              "label": "SHAPE.STLength()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_Base_274",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_Base/MapServer/3",
        "visibility": false,
        "opacity": 1,
        "mode": 1,
        "title": "Timber Harvest Plans (Cal Fire)",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "label": "",
              "description": "",
              "symbol": {
                "color": [
                  255,
                  167,
                  127,
                  70
                ],
                "outline": {
                  "color": [
                    230,
                    76,
                    0,
                    255
                  ],
                  "width": 0.5625,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
                },
                "type": "esriSFS",
                "style": "esriSFSSolid"
              }
            }
          },
          "minScale": 1500000,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "CIPS_BASE_CALFIRE_THPS: {County}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Year",
              "label": "Year",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "County",
              "label": "County",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "HarvestDoc_Num",
              "label": "HarvestDoc_Num",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Silviculture",
              "label": "Silviculture",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Silviculture2",
              "label": "Silviculture2",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Yarding",
              "label": "Yarding",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Status_of_Plan",
              "label": "Status_of_Plan",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Completion_Date",
              "label": "Completion_Date",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Timber_Owner",
              "label": "Timber_Owner",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Landowner",
              "label": "Landowner",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Acres",
              "label": "Acres",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "StartYearDate",
              "label": "StartYearDate",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "StartTHPYearDate",
              "label": "StartTHPYearDate",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "DateDataPublished",
              "label": "DateDataPublished",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SHAPE",
              "label": "SHAPE",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SHAPE.STArea()",
              "label": "SHAPE.STArea()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SHAPE.STLength()",
              "label": "SHAPE.STLength()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_Operational_3220",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_Operational/MapServer/2",
        "visibility": true,
        "opacity": 1,
        "mode": 1,
        "title": "Grow Footprints",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "uniqueValue",
              "field1": "GrowType",
              "uniqueValueInfos": [
                {
                  "value": "Outdoor",
                  "symbol": {
                    "color": null,
                    "outline": {
                      "color": [
                        255,
                        0,
                        0,
                        255
                      ],
                      "width": 0.75,
                      "type": "esriSLS",
                      "style": "esriSLSSolid"
                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                  },
                  "label": "Outdoor"
                },
                {
                  "value": "Greenhouse",
                  "symbol": {
                    "color": null,
                    "outline": {
                      "color": [
                        255,
                        170,
                        0,
                        255
                      ],
                      "width": 0.75,
                      "type": "esriSLS",
                      "style": "esriSLSSolid"
                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                  },
                  "label": "Greenhouse"
                },
                {
                  "value": "Potential",
                  "symbol": {
                    "color": null,
                    "outline": {
                      "color": [
                        197,
                        0,
                        255,
                        255
                      ],
                      "width": 0.75,
                      "type": "esriSLS",
                      "style": "esriSLSSolid"
                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                  },
                  "label": "Potential"
                }
              ]
            }
          },
          "minScale": 37000,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "CIPS_Grows: {GrowKey}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowKey",
              "label": "GrowKey",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SWRCBRegID",
              "label": "SWRCBRegID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowID",
              "label": "GrowID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowYear",
              "label": "GrowYear",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowType",
              "label": "GrowType",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowSqFt",
              "label": "GrowSqFt",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowAcres",
              "label": "GrowAcres",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpMethod",
              "label": "InterpMethod",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpDate",
              "label": "InterpDate",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PreProcStatus",
              "label": "PreProcStatus",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "LastPreProcDate",
              "label": "LastPreProcDate",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape",
              "label": "Shape",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape.STArea()",
              "label": "Shape.STArea()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape.STLength()",
              "label": "Shape.STLength()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_Base_4449",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_Base/MapServer/1",
        "visibility": false,
        "opacity": 1,
        "mode": 1,
        "title": "Watershed Boundaries (HUC12)",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "label": "",
              "description": "",
              "symbol": {
                "color": null,
                "outline": {
                  "color": [
                    0,
                    92,
                    230,
                    255
                  ],
                  "width": 0.5625,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
                },
                "type": "esriSFS",
                "style": "esriSFSSolid"
              }
            }
          },
          "minScale": 937723,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "CIPS_BASE_CA_HUC12: {Name}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "TNMID",
              "label": "TNMID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "MetaSourceID",
              "label": "MetaSourceID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SourceDataDesc",
              "label": "SourceDataDesc",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SourceOriginator",
              "label": "SourceOriginator",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SourceFeatureID",
              "label": "SourceFeatureID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "LoadDate",
              "label": "LoadDate",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GNIS_ID",
              "label": "GNIS_ID",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "AreaAcres",
              "label": "AreaAcres",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "AreaSqKm",
              "label": "AreaSqKm",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "States",
              "label": "States",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "HUC12",
              "label": "HUC12",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Name",
              "label": "Name",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "HUType",
              "label": "HUType",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "HUMod",
              "label": "HUMod",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "ToHUC",
              "label": "ToHUC",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "NonContributingAcres",
              "label": "NonContributingAcres",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "NonContributingSqKm",
              "label": "NonContributingSqKm",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape",
              "label": "Shape",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape.STArea()",
              "label": "Shape.STArea()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape.STLength()",
              "label": "Shape.STLength()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_Base_7048",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_Base/MapServer/0",
        "visibility": true,
        "opacity": 1,
        "mode": 1,
        "title": "SWRCB Regions",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "label": "",
              "description": "",
              "symbol": {
                "color": null,
                "outline": {
                  "color": [
                    128,
                    128,
                    128,
                    255
                  ],
                  "width": 1.6500000000000001,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
                },
                "type": "esriSFS",
                "style": "esriSFSSolid"
              }
            }
          },
          "minScale": 13889686,
          "maxScale": 432384
        },
        "popupInfo": {
          "title": "CIPS_BASE_SWRCB_Regions: {RBNAME}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Vector103.GIS.CIPS_BASE_SWRCB_Regions.AREA",
              "label": "AREA",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PERIMETER",
              "label": "PERIMETER",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "RWQCBNDA_",
              "label": "RWQCBNDA_",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "RWQCBNDA_I",
              "label": "RWQCBNDA_I",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "RB",
              "label": "RB",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "RBNAME",
              "label": "RBNAME",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "MaxSimpTol",
              "label": "MaxSimpTol",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "MinSimpTol",
              "label": "MinSimpTol",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape",
              "label": "Shape",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape.STArea()",
              "label": "Shape.STArea()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape.STLength()",
              "label": "Shape.STLength()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_Operational_1675",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_Operational/MapServer/7",
        "visibility": true,
        "opacity": 1,
        "mode": 1,
        "title": "Interpretation Areas",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "uniqueValue",
              "field1": "StatusInterpArea",
              "field2": null,
              "field3": null,
              "fieldDelimiter": ", ",
              "defaultSymbol": null,
              "defaultLabel": null,
              "uniqueValueInfos": [
                {
                  "value": "Interp Completed",
                  "symbol": {
                    "color": null,
                    "outline": {
                      "color": [
                        169,
                        0,
                        230,
                        255
                      ],
                      "width": 0.9,
                      "type": "esriSLS",
                      "style": "esriSLSSolid"
                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                  },
                  "label": "Interp Completed"
                },
                {
                  "value": "Interp in Progress",
                  "symbol": {
                    "color": null,
                    "outline": {
                      "color": [
                        255,
                        170,
                        0,
                        255
                      ],
                      "width": 0.9,
                      "type": "esriSLS",
                      "style": "esriSLSSolid"
                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                  },
                  "label": "Interp in Progress"
                },
                {
                  "value": "In Initial Review",
                  "symbol": {
                    "color": null,
                    "outline": {
                      "color": [
                        230,
                        230,
                        0,
                        255
                      ],
                      "width": 0.9,
                      "type": "esriSLS",
                      "style": "esriSLSSolid"
                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                  },
                  "label": "In Initial Review"
                }
              ]
            }
          },
          "minScale": 5334509,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "CIPS_InterpAreas: {InterpAreaName}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpAreaKey",
              "label": "InterpAreaKey",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SWRCBRegID",
              "label": "SWRCBRegID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpAreaID",
              "label": "InterpAreaID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpAreaName",
              "label": "InterpAreaName",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpAreaSqKm",
              "label": "InterpAreaSqKm",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpAreaAcres",
              "label": "InterpAreaAcres",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowYear",
              "label": "GrowYear",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "StatusInterpArea",
              "label": "StatusInterpArea",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "DateAerialInterpCompleted",
              "label": "DateAerialInterpCompleted",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpMethod",
              "label": "InterpMethod",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpImageryNamesDates",
              "label": "InterpImageryNamesDates",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "TotalNumberGrowsIdentified",
              "label": "TotalNumberGrowsIdentified",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "NumberIdentifiedGrowsPerSqKm",
              "label": "NumberIdentifiedGrowsPerSqKm",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape",
              "label": "Shape",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape.STArea()",
              "label": "Shape.STArea()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape.STLength()",
              "label": "Shape.STLength()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_Operational_328",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_Operational/MapServer/6",
        "visibility": true,
        "opacity": 1,
        "mode": 1,
        "title": "Prioritization Areas",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "label": "",
              "description": "",
              "symbol": {
                "color": null,
                "outline": {
                  "color": [
                    255,
                    0,
                    0,
                    255
                  ],
                  "width": 1.5,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
                },
                "type": "esriSFS",
                "style": "esriSFSSolid"
              }
            }
          }
        },
        "popupInfo": {
          "title": "CIPS_PrioritizAreas: {PrioritizAreaName}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PrioritizAreaKey",
              "label": "PrioritizAreaKey",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SWRCBRegID",
              "label": "SWRCBRegID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PrioritizAreaID",
              "label": "PrioritizAreaID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PrioritizAreaName",
              "label": "PrioritizAreaName",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PrioritizAreaSqKm",
              "label": "PrioritizAreaSqKm",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PrioritizAreaAcres",
              "label": "PrioritizAreaAcres",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "DateCreated",
              "label": "DateCreated",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "DateLastPrioritizModelRun",
              "label": "DateLastPrioritizModelRun",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape",
              "label": "Shape",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape.STArea()",
              "label": "Shape.STArea()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape.STLength()",
              "label": "Shape.STLength()",
              "tooltip": "",
              "visible": false,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_Operational_rev1_1917",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_Operational/MapServer/8",
        "visibility": false,
        "opacity": 1,
        "mode": 1,
        "title": "Grow Sites",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "label": "",
              "description": "",
              "symbol": {
                "angle": 0,
                "xoffset": 0,
                "yoffset": 0,
                "type": "esriPMS",
                "url": "http://static.arcgis.com/images/Symbols/Shapes/GreenDiamondLargeB.png",
                "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMDYyRjY4M0QzMjExMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMDYyRjY4NEQzMjExMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMwNjJGNjgxRDMyMTExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMwNjJGNjgyRDMyMTExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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",
                "contentType": "image/png",
                "width": 13.5,
                "height": 13.5
              }
            }
          },
          "minScale": 73000,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "Grow Sites: {GrowSiteKey}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "isEditable": false,
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowSiteKey",
              "label": "GrowSiteKey",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SWRCBRegID",
              "label": "SWRCBRegID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowSiteID",
              "label": "GrowSiteID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowSiteStatus",
              "label": "GrowSiteStatus",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InspectionDate",
              "label": "InspectionDate",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Notes",
              "label": "Notes",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Owner",
              "label": "Owner",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Grower",
              "label": "Grower",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PermitStatus",
              "label": "PermitStatus",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PermitTier",
              "label": "PermitTier",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PermitID",
              "label": "PermitID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "LastUpDate",
              "label": "LastUpDate",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      },
      {
        "id": "CIPS_Operational_4098",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://mapserver.vestra.com/arcgis/rest/services/CIPS/CIPS_Operational/MapServer/1",
        "visibility": true,
        "opacity": 1,
        "mode": 1,
        "title": "Grow Locations",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "uniqueValue",
              "field1": "GrowType",
              "uniqueValueInfos": [
                {
                  "value": "Outdoor",
                  "symbol": {
                    "angle": 0,
                    "xoffset": 0,
                    "yoffset": 0,
                    "type": "esriPMS",
                    "url": "http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png",
                    "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RENEMEEyRkQyN0ExMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RENEMEEzMEQyN0ExMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFGMTYyNTRBRDI3OTExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlEQ0QwQTJFRDI3QTExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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",
                    "contentType": "image/png",
                    "width": 12,
                    "height": 12
                  },
                  "label": "Outdoor"
                },
                {
                  "value": "Greenhouse",
                  "symbol": {
                    "angle": 0,
                    "xoffset": 0,
                    "yoffset": 0,
                    "type": "esriPMS",
                    "url": "http://static.arcgis.com/images/Symbols/Shapes/OrangeCircleLargeB.png",
                    "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGOTY4NzM3NUQyN0YxMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGOTY4NzM3NkQyN0YxMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY5Njg3MzczRDI3RjExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY5Njg3Mzc0RDI3RjExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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",
                    "contentType": "image/png",
                    "width": 12,
                    "height": 12
                  },
                  "label": "Greenhouse"
                },
                {
                  "value": "Potential",
                  "symbol": {
                    "angle": 0,
                    "xoffset": 0,
                    "yoffset": 0,
                    "type": "esriPMS",
                    "url": "http://static.arcgis.com/images/Symbols/Shapes/PurpleCircleLargeB.png",
                    "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQ0ZGOEMxNEQzM0ExMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQ0ZGOEMxNUQzM0ExMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc5OEYzNzE1RDMzQTExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc5OEYzNzE2RDMzQTExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+qP8MSwAACqJJREFUeF7tmntQVPcVx68IdsaZGm0mmgLD05Egj4k8bJvWtkkfTk2kTQl1ko7J2NqZDp3O8A9qZDpDWy2k2mpsq9P2j2qNhgqtrwQTUZ6CvB/yxmUDCAnv5bU85HF6vr97f7t3V0woM91F2Z05A+zee3/3c873PO5vUYhIWc62rOEReJcDlrP8XQpwpYCrBriKoKsLuLqAaxJ0jcLLug4sa/hFT4LKI/BaaHFflAIeAf4Fcy34QL1H9Q5Yt26dsmHDBsXLy0vx9/dXNm3apGzevFkJCwtTtmzZokRGRipRUVFKdHS0sImJCf+ZmZmXZ2dnfz09Pf0baePj47G9vb2BfG13Nje2FbA1a9Yoq1evVlatWqV4eHgo7u7uipubm7AVK3DI/C+HKWD9+vU28CEhIUp4eLgSEREhgLdu3Sqg+YaOzc3NtfHPT32xY9pHR0dPFhcXBzPa5zSHCGcAfuXKlUvLAZ6enoqfn58l8np4gDPQaRDPmufIfO0+9f9xgjr2jJDxlWFq/eEwGX4wTHd3DtFHcSPU+1szjV6aormxOeGk4eHhtKtXr4Yz/Go2D6mMz4o+NOEwBfj4+CiBgYFKcHCwTeQhc74JE8BNfx2nttcY8lW2Hw3bwBtihsjw4hDd/d4QtXzHRM3fMlHTN0zUlzpOs6NzxNcZqaqq+ikzfUFzBFLk4drXMsJhDkDeBwUFKaGhoSLncXPIb0RwqmKG7v1sRIXfNUTGOI56LNvLHPnvM/RLbDsYfDvbtxn+BYb/pokatw1Sw1cG+b0hmsi7L9RgNBr/zNf+Itvn2Vbp6sS8RcBhDkD0UfQgfT38yNnJ+aMOcJY8wC1RZ/im59XIN35Nha//0iDVRQ5S7ZYBGvjDhHBCfX3933gNX7a1Wn2QxfIBJzjMAaj6svBpsqfhf06KiFvkzlFHrs8rdwmOqH+Vwb/MthXwA1T77ADdCRugms0D1P/WuHBCenr6AaZFt1inc4LzHAD5wwFapTdNlk0LqYsiN5/cZZ5D6l/X5M7gDQBH1KM46hEqfE0oOyC4n2qC+qlyYx+NZk3Q2NiYeffu3XGaE6AEpMMDNcFhCoADcAMc/TMoeG2v24Frcm/5Lue4JnUBLqUuI87gIuoseRH1kAGqfqafqjYBvpfKA7upOqKHzH0TVFZWlsdrPqelA2rCA4XRYQ5ACgwNDQVAnoN/GlelznluI3etwFnAddEWeY6IAzzcKnl7+NLAj6kksJOMib00MjJC27dvj2fwKK0wok2iHlheDnMAos/T3Nvo3YAWBU5Wd0QdbU1X2aXMZbRlnsuoQ/ICfqOM/CcE+NsB96gooJ1uBXxEA50m4vkgl9fewYaBCS0Sc4IlFRzqAEx4Y5fvq5Xdvq1plR3FrS5aJ3MZbc5zyF2CI98BX7Gxh2VvhS8MaKMCfyPl+Ruo7eTH1NLSMsTAe7RU8OafUIHjHYD5HfLHFCf6uSxyXN0heVHZdcXNInOGRnWX4Ii6hFdzfj74u5Tt30zVP2ml7u5u4meM3zH0S5oKUBBRC8TLUQpYwfkfBwe0cu4LuevbGvq5aGlqPxcyR8QZHMDSBDgXO6vsu21kr0ae4f2a6IZfA+WENlBXVxfFx8enM+vrbNFsT7Ph2UGowGEOMJvNh+EA5LkYZLSoi7Zm3891UrdEHOA6eEi/jKOPgqfmvCp7Fb6ePvStpWu+NdTe3k7Hjx8vYdZfsj3P5qdPA0c5wI0rcgocINraQ/q5fYGzRFwDl5G3z3sUvHz/ViF7RB7wmb7V9L5vJbXcNtCRI0cqGBqDEdIA/fgJNtENHOUAd5PJ9JYYU+fr51zopORtipwNeJ8YcmSv10cf0s/xb7GBf8+3gq76lJHBYKDU1NRqZk1me4UtjO1JWQcc5oDBwcHfwwHz9nP76v4QcMDL6JcEdrH0OzTp36Wbfo103a9ORB7wV3xK6ZJPCTU3N9OhQ4fuMPBhttfY8CT2lKMd4NHU1PSGSIFtpnmLnDW/rZEGsIRWwbttqr5F+pz3WQyPnJfwF32K6UpwMTU0NNCuXbvyGTiVbTcbhqL1bJgHHJYCHmfOnImEA7oSRi1V3RZaja4VFLAqsDR1yusSww76vTXv6wU8ch6RB/y/vQsp+9VSqqurI34Uv+xsB6DvPjU5OdmFJ0DbYqZCIqdhgLQ3QKPa66c8PfyHvncs8P/xvi3gM7wLqOhwBWVnZ4/z2u84OwXggCfb2trO3jfN2EhZwklAQKqgHTprt4y3cspTKz7anS18hvctSvfOpzSvPKoqrKaUlBQjr33a2UUQLeeJpKSkF6ampqh9/4BNRCFn5LNqRhsDMAwRF0MOg6Pg6XP+EssekQf8BQZP88qlrD2FxFtkxFtxN3jtv7M5tQ1i6sIM7tfY2HhttNdMpc/eE8BWOIMAlIa2BgOwMG26A7js8+/5lHOlB3yRkDyi/q5XDl0IyqHyggo6duxYF6+ZwXaCzamDEByA8fPpvXv3xvT395u7L/fZRBWAiCwGGavVi0hLaMhdtjn0eFnsVMnnCvjzXjep8FQx5efnT3P0c3X579RRGB0HdWAtW/CJEycO8VxAzb/qsEADEn0c0QUoqjoMwJm+VaLIIeKyv6tRt0r+vFe2gM/6xS1shNDOnTurea2LbKfYEtmc+jAEB8g0wCPpcxkZGZd6enqoPslogbaB5WEGwIi0Cq22NwluH/VznjfoenwBlZaW0r59+1D43mc7y4YnQec/DmsOwPCBTQlsTuzg2eCDzs5Oakkz0vUQdYh5EPi2gJatTS1yaq4j4gBPC7pJBX8pEvCJiYmAv8b2L7a32RKwlramUzdEoAJ0AxRD7NtjIotLSEg4y1PiZGttKxX//I5NpCU0oi2ruwqeLcDf8cyiD97Io+KcEsrLy5tm2ddo8Hj8Pcn2JtbQ1sKaTt0Sk2mAWoANSuzbY8Pyx/xdwdFz58418u4NNVY0UmlKjZjiLj5jzXEJfiEomzLj8ig7uZBKcktF1I8ePfoJf+l6S5M9Ig/4JFxbWwNrOXdTFPTaC7UAW9Rr2bBvv0270Td55/gf/OzeyBXcXFtbSzU1NaKXV1ZWUkVFBZWXl4sCB+jMzMyJ5OTkDg0ckkfBQ85D9og84HFtrIG1nLstrnMAfkUqoC3iSwvcIJQAqSawoWidCggIuBgbG1vEw1PzwYMHWw4cOGDYv3+/ISYmppKhsd2NIneFDX0eoy6qPc7FNXAtXHPpfDFi5wCoQDoB0YFEURNQrFCx0bbw+IoBBlPcaQ3yPP+EARjv4TMcg2NxDs7FNXCtpfXVmJ0D8Kd0AqSJ/ESRQndA5NCzMbhgesMIm6xB4pEWBmC8h89wDI7FOTgX11h6X47O4wD5FhyBwogKjTaFOQEQ2MDEHh7AsJODzQw8z8PwO97DZzgGx+IcnLs0vx7/FAfgI6kGzAlwxFo27N76sWEPD9tY2MmBtGH4He/hMxyDY3GOzT9IfMaa4mNHbYkt5F6kI6QiUCQBhA1M7OFhGws7OTD8jvfwGY6x+ReZhS62FB2gv3c4QioDKQKDQmDyb8s/Sf0v0Ppjl5oCFsux6PP+rw5Y6MUfheMWXCweBZjF3KPLAYvx2uN0jksBj1M0F8PiUsBivPY4nbPsFfBfpffVDI0yBFgAAAAASUVORK5CYII=",
                    "contentType": "image/png",
                    "width": 12,
                    "height": 12
                  },
                  "label": "Potential"
                }
              ]
            }
          },
          "minScale": 73000,
          "maxScale": 37000
        },
        "popupInfo": {
          "title": "CIPS_Grows_pts: {GrowKey}",
          "fieldInfos": [
            {
              "fieldName": "OBJECTID",
              "label": "OBJECTID",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowKey",
              "label": "GrowKey",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SWRCBRegID",
              "label": "SWRCBRegID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowID",
              "label": "GrowID",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowYear",
              "label": "GrowYear",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowType",
              "label": "GrowType",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowSqFt",
              "label": "GrowSqFt",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowAcres",
              "label": "GrowAcres",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpMethod",
              "label": "InterpMethod",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpDate",
              "label": "InterpDate",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PreProcStatus",
              "label": "PreProcStatus",
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "LastPreProcDate",
              "label": "LastPreProcDate",
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "ORIG_FID",
              "label": "ORIG_FID",
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Shape",
              "label": "Shape",
              "tooltip": "",
              "visible": false,
              "format": null,
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        }
      }
    ],
    "baseMap": {
      "baseMapLayers": [
        {
          "id": "defaultBasemap",
          "layerType": "ArcGISTiledMapServiceLayer",
          "opacity": 1,
          "visibility": true,
          "url": "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer"
        }
      ],
      "title": "Topographic"
    },
    "spatialReference": {
      "wkid": 102100,
      "latestWkid": 3857
    },
    "authoringApp": "WebMapViewer",
    "authoringAppVersion": "3.10",
    "version": "2.3",
    "bookmarks": [
      {
        "extent": {
          "spatialReference": {
            "wkid": 102100,
            "latestWkid": 3857
          },
          "xmax": -13297322.34501437,
          "xmin": -13964464.727887353,
          "ymax": 5123769.887129902,
          "ymin": 4635795.89855736
        },
        "name": "Home"
      }
    ],
    "applicationProperties": {
      "viewing": {
        "routing": {
          "enabled": true
        },
        "basemapGallery": {
          "enabled": true
        },
        "measure": {
          "enabled": true
        },
        "search": {
          "enabled": true,
          "disablePlaceFinder": false,
          "hintText": "Place or Address",
          "layers": []
        }
      }
    }
  }
}

	// **** End section ---------------------------------------------------------------------------------------------------------- **** 
    // **** Copy  webmap2Json output into the section above ****
    
};
