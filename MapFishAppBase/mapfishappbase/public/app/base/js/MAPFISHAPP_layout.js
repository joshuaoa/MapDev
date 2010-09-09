/*
* @include MAPFISHAPP_mappanel.js
*/

Ext.namespace("MAPFISHAPP");

MAPFISHAPP.layout = (function() {
   /*
    * Private
    */

   /*
    * Public
    */
   return {

       /**
        * APIMethod: init
        * Initialize the page layout.
        *
        * Parameters:
        * layerStore - {GeoExt.data.LayerStore} The application's global layer
        *  store, includes a reference to the map instance.
        */
       init: function(layerStore) {
           new Ext.Viewport({
               layout: "border",
               items: [{
                   region: "west",
                   title: "west",
                   width: 200
               }, Ext.apply({
                   region: "center",
                   title: "map"
               }, MAPFISHAPP.mappanel.create(layerStore))
               ]
           });
       }
   };
})();

