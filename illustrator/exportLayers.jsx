#target Illustrator

var toggleLayers = function(visible) {
  each(document.layers, function(layer) {
    layer.visible = visible;
  });
};

var each = function(xs, fn) {
  for (var i = 0, l = xs.length; i < l; i++) {
    fn(xs[i], i);
  }
};

var document = app.activeDocument;
var document_name = document.fullName;

var folder = document_name.parent.selectDlg('Export each layer as PNG image...');

var artboard_index = document.artboards.getActiveArtboardIndex();
var artboard = document.artboards[artboard_index]; // get active AB

toggleLayers(true);

var options = new ExportOptionsPNG24();
options.antiAliasing = true;
options.transparency = true;
options.artBoardClipping = true;

toggleLayers(false);
each(document.layers, function(layer, i) {
  layer.visible = true;

  var file = new File(folder.fsName + '/' + layer.name + '.png');
  document.exportFile(file, ExportType.PNG24, options);
  layer.visible = false;
});
