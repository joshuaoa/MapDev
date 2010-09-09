/*
* @include OpenLayers/Map.js
* @include OpenLayers/Layer/WMS.js
* @include OpenLayers/Control/Navigation.js
*/

Ext.namespace("MAPFISHAPP");

MAPFISHAPP.map = (function() {

   /*
    * Private
    */

   /**
    * Constant: MAPFILE
    * Filesystem path to mapfile.
    */
   var MAPFILE = "/home/joshuao/mapfish/mapserver/mapfile.map";

   /**
    * Method: getDerivedMapNS
    * Returns the namespace of the derived application's map module, returns
    * undefined if there's no derived application or if the derived
    * application has no map module.
    */
   var getDerivedMapNS = function() {
       var retVal;
       var ns = window.MAPFISHAPPDERIVED;
       if(ns && ns.map) {
           retVal = ns.map;
       }
       return retVal;
   };

   /**
    * Method: createBaseLayers
    * Return the application's base layers.
    *
    * Returns:
    * {Array({OpenLayers.Layer})} Array of base layers.
    */
   var createBaseLayers = function() {
       return [
           new OpenLayers.Layer.WMS(
               "bluemarble",
               "http://localhost/cgi-bin/mapserv?",
               {
                   map: MAPFILE,
                   layers: "bluemarble"
               }
           )
      ];
   };

   /**
    * Method: createLayers
    * Return the application's layers.
    *
    * Returns:
    * {Array({OpenLayers.Layer})} Array of layers.
    */
   var createLayers = function() {
       var layers = createBaseLayers();
       var derivedMap = getDerivedMapNS();
       if(derivedMap) {
           layers = layers.concat(
               derivedMap.createLayers()
           );
       }
       return layers;
   };

   /**
    * Method: createMap
    * Return the application's map instance.
    *
    * Parameters:
    * div - {String} The id of the div the created map must
    * be placed into, if undefined a non-rendered map is
    * returned.
    *
    * Returns:
    * {OpenLayers.Map} The map instance.
    */
   var createMap = function(div) {
       var map = new OpenLayers.Map({
           div: div,
           controls: [
               new OpenLayers.Control.Navigation()
           ]
       });

       // a map searcher is added to the map
       var searcher = new mapfish.Searcher.Map({
           map: map,
           protocol: mapfish.Protocol.MapFish.create({
               url: "countries",
               params: {
                   no_geom: true,
                   attrs: ["continent", "pays"],
                   limit: 10
               }
           }),
           searchTolerance: null,
           displayDefaultPopup: true
       });
       map.addControl(searcher);
       searcher.activate();

       return map;
   };

   /**
    * Method: createLayerStore
    * Return the application's global layer store.
    *
    * Returns:
    * {GeoExt.data.LayerStore} The global layer store.
    */
   var createLayerStore = function() {
       return new GeoExt.data.LayerStore({
           map: createMap(),
           layers: createLayers()
       });
   };

   /*
    * Public
    */

   return {

       /**
        * APIMethod: create
        * Create the application's global layer store.
        *
        * Returns:
        * {GeoExt.data.LayerStore} The application's global layer store.
        */
       create: function() {
           return createLayerStore();
       },

       /**
        * APIMethod: _createMap
        * Method used from within the API module to create a map.
        *
        * Parameters:
        * div - {String} The id of the div the created map must
        * be placed into, if undefined a non-rendered map is
        * returned.
        *
        * Returns:
        * {OpenLayers.Map} The map instance.
        */
       _createMap: function(div) {
           return createMap(div);
       },

       /**
        * APIMethod: _createLayers
        * Method used from within the API module to create the layers.
        *
        * Returns:
        * {Array({OpenLayers.Layer})} Array of layers.
        */
       _createLayers: function() {
           return createLayers();
       }
   };
})();

