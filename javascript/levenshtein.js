var levenshtein_matrix = function(source, target) {
  var nrows = source.length + 1;
  // var source_chars = source.split('');
  var ncols = target.length + 1;
  // var target_chars = target.split('');
  // initialize to something like this:
  //     c a t
  //   0 1 2 3
  // m 1 0 0 0
  // a 2 0 0 0
  // t 3 0 0 0
  //
  // i.e.,
  //   distances = [[0, 1, 2, 3], [1, 0, 0, 0], [2, 0, 0, 0], [3, 0, 0, 0]];
  //   (the primary index is by row = by source character)
  var i; // i is for rows
  var j; // j is for cols
  var distances = [];
  for (i = 0; i < nrows; i++) {
    distances.push([]);
    for (j = 0; j < ncols; j++) {
      var cell = 0;
      // top row
      if (i === 0) cell = j;
      // left column
      if (j === 0) cell = i;
      distances[i][j] = cell;
    }
  }
  // calculate distances
  for (i = 1; i < nrows; i++) {
    for (j = 1; j < ncols; j++) {
      if (source[i-1] === target[j-1]) {
        distances[i][j] = distances[i-1][j-1]; // equal (no cost)
      }
      else {
        distances[i][j] = Math.min(
          distances[i-1][j] + 1, // a deletion
          distances[i][j-1] + 1, // an insertion
          distances[i-1][j-1] + 1 // a substitution
        );
      }
    }
  }
  return distances;
};
