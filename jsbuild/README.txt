To build the JavaScript code in a single, compressed file run the
following commands in the current directory:

$ jsbuild -o ../mapdev/public/build/mapfish app.cfg
$ cp -r ../mapdev/public/mfbase/mapfish/img ../mapdev/public/build/mapfish/
$ cp -r ../mapdev/public/mfbase/openlayers/img ../mapdev/public/build/openlayers/
$ cp -r ../mapdev/public/mfbase/openlayers/theme ../mapdev/public/build/openlayers/
