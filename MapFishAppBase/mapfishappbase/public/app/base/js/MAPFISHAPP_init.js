/*
* @include MAPFISHAPP_map.js
* @include MAPFISHAPP_layout.js
*/

Ext.namespace("MAPFISHAPP");

(function() {
   // run MAPFISHAPP.layout.init() when the page
   // is ready
   Ext.onReady(function() {
       var layerStore = MAPFISHAPP.map.create();
       MAPFISHAPP.layout.init(layerStore);
   });
})();

