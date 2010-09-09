/*
* @include GeoExt/widgets/MapPanel.js
*/

Ext.namespace("MAPFISHAPP");

MAPFISHAPP.mappanel = (function() {
   /*
    * Private
    */

   /*
    * Public
    */
   return {

       /**
        * APIMethod: create
        * Return the map panel config.
        *
        * Parameters:
        * layerStore - {GeoExt.data.LayerStore} The application layer store.
        */
       create: function(layerStore) {
           var map = layerStore.map;
           return {
               xtype: "gx_mappanel",
               id: "mappanel",
               map: map,
               layers: layerStore
               //tbar: new Ext.Toolbar(MAPFISHAPP.controltoolbar.create(map))
           };
       }
   };
})();

