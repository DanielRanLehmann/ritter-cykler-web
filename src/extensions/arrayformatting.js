Array.prototype.contains = function(elem) {
  var _contains = false;
  for (var i = 0; i < this.length; i++) {
    if (this[i] === elem) {
      _contains = true;
      break;
    }
  }
  return _contains;
};
