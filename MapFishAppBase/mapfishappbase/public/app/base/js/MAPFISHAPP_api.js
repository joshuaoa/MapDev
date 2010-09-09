/*
* @include MAPFISHAPP_map.js
*/

Ext.namespace("MAPFISHAPP");

/**
* APIMethod: constructor
* The API constructor.
*/
MAPFISHAPP.api = function() {
};

MAPFISHAPP.api.prototype = {
   /**
    * APIMethod: createMap
    * Create a map and include it in a given div.
    *
    * Parameters:
    * config - {Object} Config object, include a property
    * named "div" whose value is the id of the div into
    * which the map is to be rendered.
    */
   createMap: function(config) {
       // create map
       var map = MAPFISHAPP.map._createMap(config.div);

       // add layers
       layers = MAPFISHAPP.map._createLayers();
       map.addLayers(layers);

       // zoom to the maximum extent
       map.zoomToMaxExtent();
   }
};

