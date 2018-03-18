// https://stackoverflow.com/questions/2332811/capitalize-words-in-string
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

String.prototype.strip = function(achar) {
  return this.replace(/achar/g,'')
}

// https://stackoverflow.com/questions/646628/how-to-check-if-a-string-startswith-another-string
String.prototype.hasPrefix = function(needle) {
  return this.lastIndexOf(needle, 0) === 0
}
