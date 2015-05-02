(function(exports) {
  "use strict";
  var ascii = [{
      "decimal": "48",
      "name": "0"
    }, {
      "decimal": "49",
      "name": "1"
    }, {
      "decimal": "50",
      "name": "2"
    }, {
      "decimal": "51",
      "name": "3"
    }, {
      "decimal": "52",
      "name": "4"
    }, {
      "decimal": "53",
      "name": "5"
    }, {
      "decimal": "54",
      "name": "6"
    }, {
      "decimal": "55",
      "name": "7"
    }, {
      "decimal": "56",
      "name": "8"
    }, {
      "decimal": "57",
      "name": "9"
    }, {
      "decimal": "8",
      "name": "backspace"
    }, {
      "decimal": "9",
      "name": "tab"
    }, {
      "decimal": "13",
      "name": "enter"
    }, {
      "decimal": "16",
      "name": "shift"
    }, {
      "decimal": "17",
      "name": "ctrl"
    }, {
      "decimal": "18",
      "name": "alt"
    }, {
      "decimal": "19",
      "name": "pause/break"
    }, {
      "decimal": "20",
      "name": "caps lock"
    }, {
      "decimal": "27",
      "name": "escape"
    }, {
      "decimal": "33",
      "name": "page up"
    }, {
      "decimal": "34",
      "name": "page down"
    }, {
      "decimal": "35",
      "name": "end"
    }, {
      "decimal": "36",
      "name": "home"
    }, {
      "decimal": "37",
      "name": "left arrow"
    }, {
      "decimal": "38",
      "name": "up arrow"
    }, {
      "decimal": "39",
      "name": "right arrow"
    }, {
      "decimal": "40",
      "name": "down arrow"
    }, {
      "decimal": "45",
      "name": "insert"
    }, {
      "decimal": "46",
      "name": "delete"
    }, {
      "decimal": "65",
      "name": "a"
    }, {
      "decimal": "66",
      "name": "b"
    }, {
      "decimal": "67",
      "name": "c"
    }, {
      "decimal": "68",
      "name": "d"
    }, {
      "decimal": "69",
      "name": "e"
    }, {
      "decimal": "70",
      "name": "f"
    }, {
      "decimal": "71",
      "name": "g"
    }, {
      "decimal": "72",
      "name": "h"
    }, {
      "decimal": "73",
      "name": "i"
    }, {
      "decimal": "74",
      "name": "j"
    }, {
      "decimal": "75",
      "name": "k"
    }, {
      "decimal": "76",
      "name": "l"
    }, {
      "decimal": "77",
      "name": "m"
    }, {
      "decimal": "78",
      "name": "n"
    }, {
      "decimal": "79",
      "name": "o"
    }, {
      "decimal": "80",
      "name": "p"
    }, {
      "decimal": "81",
      "name": "q"
    }, {
      "decimal": "82",
      "name": "r"
    }, {
      "decimal": "83",
      "name": "s"
    }, {
      "decimal": "84",
      "name": "t"
    }, {
      "decimal": "85",
      "name": "u"
    }, {
      "decimal": "86",
      "name": "v"
    }, {
      "decimal": "87",
      "name": "w"
    }, {
      "decimal": "88",
      "name": "x"
    }, {
      "decimal": "89",
      "name": "y"
    }, {
      "decimal": "90",
      "name": "z"
    }, {
      "decimal": "91",
      "name": "left window key"
    }, {
      "decimal": "92",
      "name": "right window key"
    }, {
      "decimal": "93",
      "name": "select key"
    }, {
      "decimal": "96",
      "name": "numpad 0"
    }, {
      "decimal": "97",
      "name": "numpad 1"
    }, {
      "decimal": "98",
      "name": "numpad 2"
    }, {
      "decimal": "99",
      "name": "numpad 3"
    }, {
      "decimal": "100",
      "name": "numpad 4"
    }, {
      "decimal": "101",
      "name": "numpad 5"
    }, {
      "decimal": "102",
      "name": "numpad 6"
    }, {
      "decimal": "103",
      "name": "numpad 7"
    }, {
      "decimal": "104",
      "name": "numpad 8"
    }, {
      "decimal": "105",
      "name": "numpad 9"
    }, {
      "decimal": "106",
      "name": "multiply"
    }, {
      "decimal": "107",
      "name": "add"
    }, {
      "decimal": "109",
      "name": "subtract"
    }, {
      "decimal": "110",
      "name": "decimal point"
    }, {
      "decimal": "111",
      "name": "divide"
    }, {
      "decimal": "112",
      "name": "f1"
    }, {
      "decimal": "113",
      "name": "f2"
    }, {
      "decimal": "114",
      "name": "f3"
    }, {
      "decimal": "115",
      "name": "f4"
    }, {
      "decimal": "116",
      "name": "f5"
    }, {
      "decimal": "117",
      "name": "f6"
    }, {
      "decimal": "118",
      "name": "f7"
    }, {
      "decimal": "119",
      "name": "f8"
    }, {
      "decimal": "120",
      "name": "f9"
    }, {
      "decimal": "121",
      "name": "f10"
    }, {
      "decimal": "122",
      "name": "f11"
    }, {
      "decimal": "123",
      "name": "f12"
    }, {
      "decimal": "144",
      "name": "num lock"
    }, {
      "decimal": "145",
      "name": "scroll lock"
    }, {
      "decimal": "186",
      "name": "semi-colon"
    }, {
      "decimal": "187",
      "name": "equal sign"
    }, {
      "decimal": "188",
      "name": "comma"
    }, {
      "decimal": "189",
      "name": "dash"
    }, {
      "decimal": "190",
      "name": "period"
    }, {
      "decimal": "191",
      "name": "forward slash"
    }, {
      "decimal": "192",
      "name": "grave accent"
    }, {
      "decimal": "219",
      "name": "open bracket"
    }, {
      "decimal": "220",
      "name": "back slash"
    }, {
      "decimal": "221",
      "name": "close braket"
    }, {
      "decimal": "222",
      "name": "single quote"
    }
  ];

  var char_to_int = exports.char_to_int = {};
  var int_to_char = exports.int_to_char = {};
  for (var ascii_i = 0; ascii_i < ascii.length; ascii_i++) {
    var ascii_char = ascii[ascii_i];
    char_to_int[ascii_char.decimal] = ascii_char.name;
    int_to_char[ascii_char.name] = ascii_char.decimal;
  }

  var unicode = exports.unicode = [{
      "name": "&nbsp;",
      "decimal": "&#160;",
      "description": "non-breaking space"
    }, {
      "name": "&cent;",
      "decimal": "&#162;",
      "description": "cent sign"
    }, {
      "name": "&pound;",
      "decimal": "&#163;",
      "description": "pound sign"
    }, {
      "name": "&curren;",
      "decimal": "&#164;",
      "description": "currency sign"
    }, {
      "name": "&yen;",
      "decimal": "&#165;",
      "description": "yen sign"
    }, {
      "name": "&brvbar;",
      "decimal": "&#166;",
      "description": "broken vertical bar"
    }, {
      "name": "&sect;",
      "decimal": "&#167;",
      "description": "section sign"
    }, {
      "name": "&uml;",
      "decimal": "&#168;",
      "description": "diaeresis"
    }, {
      "name": "&copy;",
      "decimal": "&#169;",
      "description": "copyright sign"
    }, {
      "name": "&ordf;",
      "decimal": "&#170;",
      "description": "feminine ordinal indicator"
    }, {
      "name": "&laquo;",
      "decimal": "&#171;",
      "description": "left-pointing double angle quotation mark"
    }, {
      "name": "&not;",
      "decimal": "&#172;",
      "description": "not sign"
    }, {
      "name": "&shy;",
      "decimal": "&#173;",
      "description": "soft hyphen"
    }, {
      "name": "&reg;",
      "decimal": "&#174;",
      "description": "registered sign"
    }, {
      "name": "&macr;",
      "decimal": "&#175;",
      "description": "macron"
    }, {
      "name": "&deg;",
      "decimal": "&#176;",
      "description": "degree sign"
    }, {
      "name": "&plusmn;",
      "decimal": "&#177;",
      "description": "plus-minus sign"
    }, {
      "name": "&sup2;",
      "decimal": "&#178;",
      "description": "superscript two"
    }, {
      "name": "&sup3;",
      "decimal": "&#179;",
      "description": "superscript three"
    }, {
      "name": "&acute;",
      "decimal": "&#180;",
      "description": "acute accent"
    }, {
      "name": "&micro;",
      "decimal": "&#181;",
      "description": "micro signB5"
    }, {
      "name": "&para;",
      "decimal": "&#182;",
      "description": "pilcrow sign"
    }, {
      "name": "&middot;",
      "decimal": "&#183;",
      "description": "middle dot"
    }, {
      "name": "&cedil;",
      "decimal": "&#184;",
      "description": "cedilla"
    }, {
      "name": "&sup1;",
      "decimal": "&#185;",
      "description": "superscript one"
    }, {
      "name": "&ordm;",
      "decimal": "&#186;",
      "description": "masculine ordinal indicator"
    }, {
      "name": "&raquo;",
      "decimal": "&#187;",
      "description": "right-pointing double angle quotation mark"
    }, {
      "name": "&frac14;",
      "decimal": "&#188;",
      "description": "vulgar fraction one- quarter"
    }, {
      "name": "&frac12;",
      "decimal": "&#189;",
      "description": "vulgar fraction one- half"
    }, {
      "name": "&frac34;",
      "decimal": "&#190;",
      "description": "vulgar fraction three- quarters"
    }, {
      "name": "&iquest;",
      "decimal": "&#191;",
      "description": "inverted question mark"
    }, {
      "name": "&Agrave;",
      "decimal": "&#192;",
      "description": "Latin capital letter A with grave"
    }, {
      "name": "&Aacute;",
      "decimal": "&#193;",
      "description": "Latin capital letter A with acute"
    }, {
      "name": "&Acirc;",
      "decimal": "&#194;",
      "description": "Latin capital letter A with circumflex"
    }, {
      "name": "&Atilde;",
      "decimal": "&#195;",
      "description": "Latin capital letter A with tilde"
    }, {
      "name": "&Auml;",
      "decimal": "&#196;",
      "description": "Latin capital letter A with diaeresis"
    }, {
      "name": "&Aring;",
      "decimal": "&#197;",
      "description": "Latin capital letter A with ring above"
    }, {
      "name": "&AElig;",
      "decimal": "&#198;",
      "description": "Latin capital letter AE"
    }, {
      "name": "&Ccedil;",
      "decimal": "&#199;",
      "description": "Latin capital letter C with cedilla"
    }, {
      "name": "&Egrave;",
      "decimal": "&#200;",
      "description": "Latin capital letter E with grave"
    }, {
      "name": "&Eacute;",
      "decimal": "&#201;",
      "description": "Latin capital letter E with acute"
    }, {
      "name": "&Ecirc;",
      "decimal": "&#202;",
      "description": "Latin capital letter E with circumflex"
    }, {
      "name": "&Euml;",
      "decimal": "&#203;",
      "description": "Latin capital letter E with diaeresis"
    }, {
      "name": "&Igrave;",
      "decimal": "&#204;",
      "description": "Latin capital letter I with grave"
    }, {
      "name": "&Iacute;",
      "decimal": "&#205;",
      "description": "Latin capital letter I with acute"
    }, {
      "name": "&Icirc;",
      "decimal": "&#206;",
      "description": "Latin capital letter I with circumflex"
    }, {
      "name": "&Iuml;",
      "decimal": "&#207;",
      "description": "Latin capital letter I with diaeresis"
    }, {
      "name": "&eth;",
      "decimal": "&#208;",
      "description": "Latin capital letter eth"
    }, {
      "name": "&Ntilde;",
      "decimal": "&#209;",
      "description": "Latin capital letter N with tilde"
    }, {
      "name": "&Ograve;",
      "decimal": "&#210;",
      "description": "Latin capital letter O with grave"
    }, {
      "name": "&Oacute;",
      "decimal": "&#211;",
      "description": "Latin capital letter O with acute"
    }, {
      "name": "&Ocirc;",
      "decimal": "&#212;",
      "description": "Latin capital letter O with circumflex"
    }, {
      "name": "&Otilde;",
      "decimal": "&#213;",
      "description": "Latin capital letter O with tilde"
    }, {
      "name": "&Ouml;",
      "decimal": "&#214;",
      "description": "Latin capital letter O with diaeresis"
    }, {
      "name": "&times;",
      "decimal": "&#215;",
      "description": "multiplication sign"
    }, {
      "name": "&Oslash;",
      "decimal": "&#216;",
      "description": "Latin capital letter O with stroke"
    }, {
      "name": "&Ugrave;",
      "decimal": "&#217;",
      "description": "Latin capital letter U with grave"
    }, {
      "name": "&Uacute;",
      "decimal": "&#218;",
      "description": "Latin capital letter U with acute"
    }, {
      "name": "&Ucirc;",
      "decimal": "&#219;",
      "description": "Latin capital letter U with circumflex"
    }, {
      "name": "&Uuml;",
      "decimal": "&#220;",
      "description": "Latin capital letter U with diaeresis"
    }, {
      "name": "&Yacute;",
      "decimal": "&#221;",
      "description": "Latin capital letter Y with acute"
    }, {
      "name": "&thorn;",
      "decimal": "&#222;",
      "description": "Latin capital letter thorn"
    }, {
      "name": "&szlig;",
      "decimal": "&#223;",
      "description": "Latin small letter sharp"
    }, {
      "name": "&agrave;",
      "decimal": "&#224;",
      "description": "Latin small letter a with grave"
    }, {
      "name": "&aacute;",
      "decimal": "&#225;",
      "description": "Latin small letter a with acute"
    }, {
      "name": "&acirc;",
      "decimal": "&#226;",
      "description": "Latin small letter a with circumflex"
    }, {
      "name": "&atilde;",
      "decimal": "&#227;",
      "description": "Latin small letter a with tilde"
    }, {
      "name": "&auml;",
      "decimal": "&#228;",
      "description": "Latin small letter a with diaeresis"
    }, {
      "name": "&aring;",
      "decimal": "&#229;",
      "description": "Latin small letter a with ring above"
    }, {
      "name": "&aelig;",
      "decimal": "&#230;",
      "description": "Latin small letter ae"
    }, {
      "name": "&ccedil;",
      "decimal": "&#231;",
      "description": "Latin small letter c with cedilla"
    }, {
      "name": "&egrave;",
      "decimal": "&#232;",
      "description": "Latin small letter e with grave"
    }, {
      "name": "&eacute;",
      "decimal": "&#233;",
      "description": "Latin small letter e with acute"
    }, {
      "name": "&ecirc;",
      "decimal": "&#234;",
      "description": "Latin small letter e with circumflex"
    }, {
      "name": "&euml;",
      "decimal": "&#235;",
      "description": "Latin small letter e with diaeresis"
    }, {
      "name": "&igrave;",
      "decimal": "&#236;",
      "description": "Latin small letter i with grave"
    }, {
      "name": "&iacute;",
      "decimal": "&#237;",
      "description": "Latin small letter i with acute"
    }, {
      "name": "&icirc;",
      "decimal": "&#238;",
      "description": "Latin small letter i with circumflex"
    }, {
      "name": "&iuml;",
      "decimal": "&#239;",
      "description": "Latin small letter i with diaeresis"
    }, {
      "name": "&eth;",
      "decimal": "&#240;",
      "description": "Latin small letter eth"
    }, {
      "name": "&ntilde;",
      "decimal": "&#241;",
      "description": "Latin small letter n with tilde"
    }, {
      "name": "&ograve;",
      "decimal": "&#242;",
      "description": "Latin small letter o with grave"
    }, {
      "name": "&oacute;",
      "decimal": "&#243;",
      "description": "Latin small letter o with acute"
    }, {
      "name": "&ocirc;",
      "decimal": "&#244;",
      "description": "Latin small letter o with circumflex"
    }, {
      "name": "&otilde;",
      "decimal": "&#245;",
      "description": "Latin small letter o with tilde"
    }, {
      "name": "&ouml;",
      "decimal": "&#246;",
      "description": "Latin small letter o with diaeresis"
    }, {
      "name": "&divide;",
      "decimal": "&#247;",
      "description": "division sign"
    }, {
      "name": "&oslash;",
      "decimal": "&#248;",
      "description": "Latin small letter o with stroke"
    }, {
      "name": "&ugrave;",
      "decimal": "&#249;",
      "description": "Latin small letter u with grave"
    }, {
      "name": "&uacute;",
      "decimal": "&#250;",
      "description": "Latin small letter u with acute"
    }, {
      "name": "&ucirc;",
      "decimal": "&#251;",
      "description": "Latin small letter u with circumflex"
    }, {
      "name": "&uuml;",
      "decimal": "&#252;",
      "description": "Latin small letter u with diaeresis"
    }, {
      "name": "&yacute;",
      "decimal": "&#253;",
      "description": "Latin small letter y with acute"
    }, {
      "name": "&thorn;",
      "decimal": "&#254;",
      "description": "Latin small letter thorn"
    }, {
      "name": "&yuml;",
      "decimal": "&#255;",
      "description": "Latin small letter y with diaeresis"
    }
  ];
})(typeof(module) != 'undefined' ? module.exports : window);
