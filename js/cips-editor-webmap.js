// Application configuration settings

var appWebMap = dojo.getObject('appWebMap', true);

appWebMap = {
    WEBMAP_JSON: 
    // **** Copy  webmap2Json output into this section - Start **** 

{
  "item": {
    "title": "CIPS_Editor_2",
    "snippet": "Editor, updated 11/3",
    "extent": [
      [
        -125.6757,
        38.7417
      ],
      [
        -118.6499,
        42.1517
      ]
    ]
  },
  "itemData": {
    "operationalLayers": [
      {
        "id": "CIPS_Base_1529",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Base/FeatureServer/1",
        "visibility": true,
        "opacity": 1,
        "title": "SWRCB Regions",
        "layerDefinition": {
          "minScale": 12000000,
          "maxScale": 80000
        },
        "popupInfo": {
          "title": "base_SWRCB_Regions: {RBNAME}",
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
              "fieldName": "AREA",
              "label": "AREA",
              "isEditable": true,
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
              "isEditable": true,
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
              "isEditable": true,
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
              "isEditable": true,
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
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "MaxSimpTol",
              "label": "MaxSimpTol",
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
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
        "id": "CIPS_Base_6733",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/ArcGIS/rest/services/CIPS_Base/FeatureServer/0",
        "visibility": false,
        "opacity": 1,
        "title": "Watershed Boundaries (HUC12)",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "label": "",
              "description": "",
              "symbol": {
                "color": [
                  0,
                  0,
                  0,
                  0
                ],
                "outline": {
                  "color": [
                    0,
                    197,
                    255,
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
          },
          "minScale": 1500000,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "base_CA_HUC12: {Name}",
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
              "fieldName": "TNMID",
              "label": "TNMID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "MetaSourceID",
              "label": "MetaSourceID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SourceDataDesc",
              "label": "SourceDataDesc",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SourceOriginator",
              "label": "SourceOriginator",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "SourceFeatureID",
              "label": "SourceFeatureID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "LoadDate",
              "label": "LoadDate",
              "isEditable": true,
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
              "isEditable": true,
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
              "isEditable": true,
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
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "HUC12",
              "label": "HUC12",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Name",
              "label": "Name",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "HUType",
              "label": "HUType",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "HUMod",
              "label": "HUMod",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "ToHUC",
              "label": "ToHUC",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "NonContributingAcres",
              "label": "NonContributingAcres",
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
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
        "id": "CIPS_Editor_9611",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Editor/FeatureServer/6",
        "visibility": false,
        "opacity": 0.8,
        "title": "Prioritization Areas",
        "itemId": "f663330105d447e89d165fb44d2dc5e7",
        "layerDefinition": {
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "symbol": {
                "color": null,
                "outline": {
                  "color": [
                    255,
                    0,
                    0,
                    255
                  ],
                  "width": 2.25,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
                },
                "type": "esriSFS",
                "style": "esriSFSSolid"
              }
            }
          },
          "minScale": 3000000,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "Prioritization Areas: {PrioritizAreaName}",
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
              "fieldName": "PrioritizAreaKey",
              "label": "PrioritizAreaKey",
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
              "fieldName": "PrioritizAreaID",
              "label": "PrioritizAreaID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PrioritizAreaName",
              "label": "PrioritizAreaName",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PrioritizAreaSqKm",
              "label": "PrioritizAreaSqKm",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowYear",
              "label": "GrowYear",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "TotalNumberGrows",
              "label": "TotalNumberGrows",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "NumberGrowsPerSqKm",
              "label": "NumberGrowsPerSqKm",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "StatusPrioritizArea",
              "label": "StatusPrioritizArea",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "DateLastPrioritizModelRun",
              "label": "DateLastPrioritizModelRun",
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
        },
        "capabilities": "Query"
      },
      {
        "id": "CIPS_Editor_262",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Editor/FeatureServer/8",
        "visibility": true,
        "opacity": 1,
        "title": "Interpretation Areas",
        "itemId": "f663330105d447e89d165fb44d2dc5e7",
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
                  "value": "Approved for Interp",
                  "symbol": {
                    "color": null,
                    "outline": {
                      "color": [
                        0,
                        92,
                        230,
                        255
                      ],
                      "width": 1.125,
                      "type": "esriSLS",
                      "style": "esriSLSSolid"
                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                  },
                  "label": "Approved for Interp"
                },
                {
                  "value": "In Initial Review",
                  "symbol": {
                    "color": null,
                    "outline": {
                      "color": [
                        56,
                        168,
                        0,
                        255
                      ],
                      "width": 1.125,
                      "type": "esriSLS",
                      "style": "esriSLSSolid"
                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                  },
                  "label": "In Initial Review"
                },
                {
                  "value": "Interp Completed",
                  "symbol": {
                    "color": null,
                    "outline": {
                      "color": [
                        197,
                        0,
                        255,
                        255
                      ],
                      "width": 1.125,
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
                        230,
                        152,
                        0,
                        255
                      ],
                      "width": 1.125,
                      "type": "esriSLS",
                      "style": "esriSLSSolid"
                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                  },
                  "label": "Interp in Progress"
                }
              ]
            }
          }
        },
        "popupInfo": {
          "title": "Interpretation Areas: {InterpAreaName}",
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
              "fieldName": "InterpAreaKey",
              "label": "InterpAreaKey",
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
              "fieldName": "InterpAreaID",
              "label": "InterpAreaID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpAreaName",
              "label": "InterpAreaName",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpAreaSqKm",
              "label": "InterpAreaSqKm",
              "isEditable": true,
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
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "StatusInterpArea",
              "label": "StatusInterpArea",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "DateAerialInterpCompleted",
              "label": "DateAerialInterpCompleted",
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpImageryNamesDates",
              "label": "InterpImageryNamesDates",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "TotalNumberGrowsIdentified",
              "label": "TotalNumberGrowsIdentified",
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
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
        },
        "capabilities": "Query"
      },
      {
        "id": "CIPS_Editor_5729",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Editor/FeatureServer/7",
        "visibility": true,
        "opacity": 1,
        "title": "Reservoirs",
        "itemId": "f663330105d447e89d165fb44d2dc5e7",
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
                    112,
                    255,
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
          },
          "minScale": 320000,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "Reservoirs: {SWRCBRegID}",
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
              "fieldName": "SWRCBRegID",
              "label": "SWRCBRegID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "ReserviorAcres",
              "label": "ReserviorAcres",
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpDate",
              "label": "InterpDate",
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
        "id": "CIPS_Editor_616",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Editor/FeatureServer/5",
        "visibility": true,
        "opacity": 1,
        "title": "Disturbed Area",
        "itemId": "f663330105d447e89d165fb44d2dc5e7",
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
                    168,
                    112,
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
          },
          "minScale": 320000,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "Disturbed Area: {SWRCBRegID}",
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
              "fieldName": "SWRCBRegID",
              "label": "SWRCBRegID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "DisturbedAreasAcres",
              "label": "DisturbedAreasAcres",
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpDate",
              "label": "InterpDate",
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
        "id": "CIPS_Editor_7329",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Editor/FeatureServer/4",
        "visibility": true,
        "opacity": 1,
        "title": "Grow Footprints",
        "itemId": "f663330105d447e89d165fb44d2dc5e7",
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
                  "width": 0.75,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
                },
                "type": "esriSFS",
                "style": "esriSFSSolid"
              }
            }
          },
          "minScale": 20000,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "Grow Footprints: {GrowKey}",
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
              "fieldName": "GrowKey",
              "label": "GrowKey",
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
              "fieldName": "GrowID",
              "label": "GrowID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowYear",
              "label": "GrowYear",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowType",
              "label": "GrowType",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowSqFt",
              "label": "GrowSqFt",
              "isEditable": true,
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
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpDate",
              "label": "InterpDate",
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PreProcDate",
              "label": "PreProcDate",
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
        "id": "CIPS_Editor_6260",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Editor/FeatureServer/1",
        "visibility": true,
        "opacity": 1,
        "title": "Water Tanks",
        "itemId": "f663330105d447e89d165fb44d2dc5e7",
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
                "url": "http://static.arcgis.com/images/Symbols/Shapes/BlueSquareLargeB.png",
                "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNUU3ODA4Q0QzMjIxMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNUU3ODA4REQzMjIxMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc4M0VFQjkzRDMyMjExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc4M0VFQjk0RDMyMjExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+trJwsAAABYpJREFUeF7tmsluXEUUhitRpEhJ2LJBbBBbXoAtGySegjdgxyLBkJCBhAwkYUyYESRAmF+BIfE8zwMGYxMDNsbggBc+nK9unevyTbeh1ep0xX0t/eqW3X3d/3BOnVvVTkRcK6OlyWN8KUArx79MQFkCZQ8om2C5CpSrQDkJlqNwS/eBliZfToLlJFjnJOgS/Kl1Wa+rByTIv2Y+Nb8hVjgSYJf+/o7+6P/ep9ir2KPYrdjF52lWAnbD3n3+j7gvInypzw3x7+PnvMfwmT7/VPGJ4mPFh3+Lu6J4X/Gu4u1b4t64JRsbG1q87n7FvYp7ghCI0DQB9ngBIFAUYTuyvN5gxK9tT95d/kvW19cR4GHFQ4r7gggkoWkC7M0FMBGKzsZEIWuEcdsA+Y/U6SrOQ969uiJra2sI8LjisSACSaAcmibAPi+AESuSLZKEaAziDnFwVfFBiP07+vhWFnt36U8l/7u4l3+TlZUVBGgLIpAEyoGe0DQB9nsBYqKxqxbrmKg5jdsA4tQ75N9TVCL/0q/iLt6UpaUlBDiveELxiOIBxf5mCnDAC7CdszFRIwthI22u0+yqkb/ws7gX5mVxcREBLiueVDyqeFBxoPkC4HDsciV3IWpk6e4Ax811Ov2bhdjjvCf/k7izP8jCwkKiAlgdW6TjWBfJ4rS5jePAyL8e1XyIPc5D3p2ekbm5uUQFqEbcHK5EGNKAZofzkA/dnobnLmrcz6vjgbw7NSmzs7OJChDXtsUc8jHxmLCRhnhM/rU/xL2ije7FXzT6Sv6cOn7me3HPT4k7OS4zMzOJClBsaDH5otNG2urdnL+0mi13t0V/WtypCXHPjcr0tD5PsgnGDe6/yLO2Gzx5HW5Y6839uPGd0cgH992JEZma0iTcdQLEcY+JG3nq3tyn9ovx19p3J8cEASYn9fldIUCxu8dxh/gW8sH9MO3lze/cj77zW/zTF8DWdWt8cYfH+SJx77yS9+7riEvzq7D05QIcH5aJCe0FSSbg/5Cn1nPSgTh178kv+1nfu593/63171SA8fHxRAUoNr4ta3tocjhthCFN5AHO57Wfjbyba3/W/SHvjg3K2Jj2giQTUKx5i7x1d3MZskYY0kTexx7ni+Q3mx/k3dF+GR1VMZIUoNJE592OHIYoHR6yHjcz0kSeiY+hJ5/61PnQ+Y28O9Irw8OahCQFsC7v1/Qw0ORNLbhrRIm4h97gQNqIRxNfHvujA+Ke7RN3pMdjaGgoUQHym5hCN4c0ZHOS2tgYbiALWOZO63THsBOmPZa72HV3uFvc4S6PgQEVJLUE+I3KeJCxTh5uYTOiRlLrGqJAZ/sM2thodBA/rg5rrRP3nPjTHeIC+vv1b6kJ4DcqWcbyETbq4jbGWj1D0hPVWvZQwr7BqbMx8Wc6M9JtNwKu+8e+Pi2H1ATwG5XV5vdoCctJUtO+rtVlD61vi7l3un2T9FPfiTv0rTge265Lb6++PjUBVle16dHN7dY1mt29u0Y2qmWHw+ZyNdKHvlHyBhUhVQGWlzX+1Ht+56Y1TbyJtdVyTtbcjaOt8Tancfvg11vhRcgESLIE2Klls3J+ft7v2HDLysg6MjIig4ODQuMiuj09PdLd3e3R1dWVo7OzU0BHR4e0t7ffBv7G63l/iqsAW9JsTbNFzVY1W9ZXFV81CFw7qW1xDiU4nOCQghMbDi34gGxdNwJcO6mDEY6lOJ7irI7jKkQgCezbNwJcO6mjMQ4mOaXloBIRSALlwKFFI8C1kzoc5WiaFCACSaAc6Amc2DQCXDup43G+nIAIJAEh6Ak0Ro6rGgGundQXJPTzpPFzR78hUus/S/H1NZ+np0iins9UClCPejvhvWUCdoKL9XAoE1CPejvhvWUCdoKL9XBo+QT8C93xcx6V+HJSAAAAAElFTkSuQmCC",
                "contentType": "image/png",
                "width": 12,
                "height": 12
              }
            }
          },
          "minScale": 1500000,
          "maxScale": 0
        },
        "popupInfo": {
          "title": "Water Tanks: {SWRCBRegID}",
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
              "fieldName": "SWRCBRegID",
              "label": "SWRCBRegID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "WaterTankType",
              "label": "WaterTankType",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "EstWaterTankSize",
              "label": "EstWaterTankSize",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "WaterTankSource",
              "label": "WaterTankSource",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpMethod",
              "label": "InterpMethod",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpDate",
              "label": "InterpDate",
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
        "id": "CIPS_Editor_2016",
        "layerType": "ArcGISFeatureLayer",
        "url": "http://services.arcgis.com/pc0EXLr0PbESBcyz/arcgis/rest/services/CIPS_Editor/FeatureServer/0",
        "visibility": true,
        "opacity": 1,
        "title": "Grow Locations",
        "itemId": "f663330105d447e89d165fb44d2dc5e7",
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
                "url": "http://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png",
                "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RENEMEEyRkQyN0ExMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RENEMEEzMEQyN0ExMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFGMTYyNTRBRDI3OTExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlEQ0QwQTJFRDI3QTExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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",
                "contentType": "image/png",
                "width": 10.5,
                "height": 10.5
              }
            }
          },
          "minScale": 80000,
          "maxScale": 20000
        },
        "popupInfo": {
          "title": "Grow Locations: {GrowKey}",
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
              "fieldName": "GrowKey",
              "label": "GrowKey",
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
              "fieldName": "GrowID",
              "label": "GrowID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowYear",
              "label": "GrowYear",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "dateFormat": "longMonthDayYear"
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowType",
              "label": "GrowType",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "GrowSqFt",
              "label": "GrowSqFt",
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "InterpDate",
              "label": "InterpDate",
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "PreProcDate",
              "label": "PreProcDate",
              "isEditable": true,
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
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 0,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": true,
          "mediaInfos": []
        },
        "capabilities": "Query"
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
    "authoringAppVersion": "3.9",
    "version": "2.2",
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
        }
      }
    }
  }
}

    // **** Copy webmap2Json output into this section - end **** 
};
