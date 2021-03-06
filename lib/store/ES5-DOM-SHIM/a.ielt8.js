/** @license ES6/DOM4 polyfill for IE < 8 | @version 0.8.8 | MIT License | github.com/termi */

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level VERBOSE
// @jscomp_warning missingProperties
// @output_file_name a.ielt8.js
// @check_types
// ==/ClosureCompiler==
/**
 * ES5 and DOM shim for IE < 8
 * @version 0.8.1
 * TODO::
 * 1. http://www.positioniseverything.net/explorer.html
 */

// [[[|||---=== GCC DEFINES START ===---|||]]]
/** @define {boolean} */
var __GCC__IS_DEBUG__ = false;
//IF __GCC____GCC__IS_DEBUG____ == true [
//0. Some errors in console
//1. Fix console From https://github.com/theshock/console-cap/blob/master/console.js
//]
/** @define {boolean} */
var __GCC__NODE_CONSTRUCTOR_AS_ACTIVX__ = true;
/** @define {boolean} */
var __GCC__NODE_CONSTRUCTOR_AS_DOM_ELEMENT__ = false;
/** @define {boolean} */
var __GCC__INCLUDE_DOMPARSER_SHIM__ = false;

/** @define {boolean} */
var __GCC__UNSTABLE_FUNCTIONS__ = false;
/** @define {boolean} */
var __GCC__FIX_OBJECT_DEFINE_PROPERTY_SET_VALUE_NOT_IGNORING_SETTER__ = true;
//IF __GCC____GCC__UNSTABLE_FUNCTIONS____ == true [
//]
// [[[|||---=== GCC DEFINES END ===---|||]]]

void function (_append) {

var global = this
	, _document = global.document
    , _tmp_
;

/** Browser sniffing
 * GCC W U NO SUPPORT @cc ?
 * @type {number} @const */
var _browser_msie = // paranoiac mode
	"attachEvent" in _document
	&& "all" in _document
	&& "uniqueID" in _document.documentElement
	&& +((/msie (\d+)/i.exec(navigator.userAgent) || [])[1] || 0)
	|| null
;

if( !_browser_msie
    || _browser_msie > 9
) {
    return;
}

/** @const @type {boolean} */
var DEBUG = __GCC__IS_DEBUG__;


if( !global["Element"] ) {
    (
        (global["Element"] =
			//Reprisent ActiveXObject as Node, Element and HTMLElement so `<element> instanceof Node` is working (!!!But no in IE9 with in "compatible mode")
            __GCC__NODE_CONSTRUCTOR_AS_ACTIVX__ ? global["ActiveXObject"] : __GCC__NODE_CONSTRUCTOR_AS_DOM_ELEMENT__ ? _document.createTextNode("") : {}
        ).prototype
    )["ie"] = true;//fake prototype for IE < 8
}
if(!global["HTMLElement"])global["HTMLElement"] = global["Element"];//IE8
if(!global["Node"])global["Node"] = global["Element"];//IE8



//Not sure if it wrong. TODO:: tests for this
if(!global["DocumentFragment"]) {

	global["DocumentFragment"] =
		global["Document"]
        || global["HTMLDocument"]//For IE8
        || (//For IE < 8
            _tmp_ = function(){}
            , _tmp_.prototype = {}
            , _tmp_
        );

}
if(!global["Document"])global["Document"] = global["DocumentFragment"];



global["_"] = {
	"ielt9shims": []
	, "orig_": global["_"]//Save original "_" - we will restore it in a.js
	, "isPlainObject": function(object) {
		//Alternative from jQuery https://github.com/jquery/jquery/blob/master/src/core.js#L420

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes or window - constructor is undefined (IE < 8) or internal [[Constructor]] property is not "[object Function]" (IE8)
		// - IE6 For _Object_toString_.call(undefined) return "[object Object]"
		// - IE < 9 For _Object_toString_.call(arguments) return "[object Object]"
		return object
			&& _Object_toString_.call(object) === "[object Object]"
			&& (
				(
					typeof object.constructor === "function"
					&& _Object_toString_.call(object.constructor) === "[object Function]"
				)
				|| object.__proto__ === null//Object.create(null).__proto__ === null
			)
			&& !_hasOwnProperty(object, "callee")//object is Arguments
		;
	}
    , "apply": Function.prototype.apply
};

var _ = global["_"]["ielt9shims"]//"_" - container for shims what should be use in a.js

	, /** @const */
	_document_createDocumentFragment = _document.createDocumentFragment

	, /** @const */
	_document_createElement = _document.createElement

	, /** @const */
	_document_createTextNode = _document.createTextNode

	, /** @const */
	_document_documentElement = _document.documentElement

	, /** @const */
	_throw = function(errStr) {
        throw typeof errStr == "object" && errStr instanceof Error ? errStr : new Error(errStr);
    }

	/** @const */
  , _throwDOMException = function(errStr) {
		var ex = Object.create(DOMException.prototype);
		ex.code = DOMException[errStr];
		ex.message = errStr +': DOM Exception ' + ex.code;
		throw ex;
	}

	/** @const */
  , _recursivelyWalk = function (nodes, cb) {
		for (var i = 0, len = nodes.length; i < len; i++) {
			var node = nodes[i],
				ret = cb(node);
			if (ret) {
				return ret;
			}
			if (node.childNodes && node.childNodes.length > 0) {
				ret = _recursivelyWalk(node.childNodes, cb);
				if (ret) {
					return ret;
				}
			}
		}
	}

	/** @const */
  , _safeExtend = function(obj, extention) {
		for(var key in extention)
			if(_hasOwnProperty(extention, key) && obj[key] !== extention[key])
				try {//prevent IE error "invalid argument."
					obj[key] = extention[key];
				}
				catch(e) { }

		return obj;
	}

  	/**
  	 * @const
     * Use native and probably broken function or Quick and safety for large string but non-full-standard function
	 * For system use only
	 * More standart solution in a.js
	 */
  , _String_trim_ = String.prototype.trim || function () {//Cache origin trim function
		var	str = this.replace(RE_left_spaces, ''),
			i = str.length;

		while (RE_space.test(str.charAt(--i))){}

		return str.slice(0, i + 1);
	}

	/** @const */
  , _String_split_ = String.prototype.split

	/** @const */
  , _String_substr_ = String.prototype.substr

	/** @const */
	, _Array_slice_ = Array.prototype.slice

	/** @const */
	, _Array_splice_ = Array.prototype.splice

	,
	/** @const */
	_toArray = function(iterable) {
		var result
			, length = iterable.length >>> 0
			, i
		;

		try {
			result = _Array_slice_.call(iterable);

			if(result.length === length) {
				return result;
			}
		}
		catch(e){}

		result = [];
		for(i = 0 ; i < length ; i++) {
			if( i in iterable ) {
				result[i] = iterable[i];
			}
		}

		return result;
	}

	/** @const */
  , _Function_apply_ = Function.prototype.apply

	/** @const */
  , _Function_call_ = Function.prototype.call

	/** Use native or unsafe but fast 'bind' for service and performance needs
	 * @const
	 * @param {Object} object
	 * @param {...} var_args
	 * @return {Function} */
  , _fastUnsafe_Function_bind_ = Function.prototype.bind || function(object, var_args) {
		var __method = this
			, args
		;

		if( arguments.length > 1 ) {
			args = _Array_slice_.call(arguments, 1);
			return function () {
				return _Function_apply_.call(__method, object, args.concat(_Array_slice_.call(arguments)));
			};
		}

		return function () {
			return _Function_apply_.call(__method, object, arguments);
		};
	}

  , emptyObjectPrototype

	/** @const */
	, _Object_toString_ = Object.prototype.toString

	/** @const */
  , _hasOwnProperty = _fastUnsafe_Function_bind_.call(_Function_call_, Object.prototype.hasOwnProperty)

  	/** @type {Node} */
  , _testElement = _document.createElement('p')

  //, _function_noop = function(){}

  , _txtTextElement

  , _Node_prototype = global["Node"].prototype

  , _Element_prototype = global["Element"].prototype

	/** @const */
  , _Node_contains = _testElement.contains || _Node_prototype.contains//TODO:: massive testing

	/** @const */
  , _Native_Date = Date

	/** @const @type {RegExp} */
  , RE_cloneElement_tagMatcher = /^\<([\w\:\-]*)[\>\ ]/i

	/** @const @type {RegExp} */
  , RE_left_spaces = /^\s+/

	/** @const @type {RegExp} */
  , RE_space = /\s/

	/** @type {boolean} */
  , _String_split_shim_isnonparticipating

	/** @type {Function} */
  , function_tmp

  , faked_nodeList

	/** @const */
  , RE_style_alpha_filter = /alpha\(opacity=([^\)]+)\)/

	/** @const */
  , STRING_FOR_RE_style_important = "\\s*:\\s*(\\S+)\\s*(?:[$;]|(?:(!important)\\s*[$;]))"

	/** @type {Function}
	 * @this {Node} */
  , style_getOpacityFromMSFilter = function() {
		var val = (this.filter || "").match(RE_style_alpha_filter);

		return val ? (parseInt(val[1]) / 100) + "" : "";//can't replace parseInt to '+(val[1])'
	}

  , _CSSStyleDeclaration_prototype_methods = {
		/**
		 * @param {String} propertyName
		 * @return String
		 */
		"getPropertyValue" : function(propertyName) {
			return this.getAttribute(propertyName);
		}
		/**
		 * @param {String} propertyName
		 * @return String
		 */
		, "removeProperty" : function(propertyName) {
			this.removeAttribute(propertyName);
		}
		/**
		 * @param {String} propertyName
		 * @param {String} value
		 * @param {String} priority
		 * @return void
		 */
		, "setProperty" : function(propertyName, value, priority) {
			if(priority != "important") {
				this.setAttribute(propertyName, value);
			}
			else {
				var reg = new RegExp(propertyName + STRING_FOR_RE_style_important, "i")
					, val = ";" + propertyName + ":" + value + " !important;"
				;
				if(reg.test(this.cssText)) {
					this.cssText = this.cssText.replace(reg, val)
				}
				else this.cssText = this.cssText + val;
			}
		}
		/**
		 * @param {String} propertyName
		 * @return String
		 */
		, "getPropertyPriority" : function(propertyName) {
			var reg = new RegExp(propertyName + STRING_FOR_RE_style_important, "i");
			return ((this.cssText || "").match(reg) || [])[2] || "";
		}
		/**
		 * @param {Number} index
		 * @return String
		 */
		, "item" : function(index) {
			//TODO::
		}
	}

  , ATTRIBUTES_CUSTOM = {
		'for': 'htmlFor',
		'class': 'className',
		'value': 'defaultValue'
	}

	// attribute referencing URI data values and "disabled" attribute need special treatment in IE | From nwmatcher
  , ATTRIBUTES_FROM_NODE_VALUE = {
		'action': null,
		'cite': null,
		'codebase': null,
		'data': null,
		'href': null,
		'longdesc': null,
		'lowsrc': null,
		'src': null,
		'usemap': null,

		'disabled': null
	}
  , ATTRIBUTES_DEFAULT_MAP = {
		'id': null,
		'value': null,
		'checked': null,
		'ismap': null,
		'multiple': null,
		'readonly': null,
		'selected': null
	}

	, ATTRIBUTES_SPECIAL_MAP = {
		'style': {
			"get":	function() {
				if( this.style && this.style.cssText ) {
					return this.style.cssText;
				}

				return null;
			}
			, "set": function(val) {
				if( this.style ) {
					this.style.cssText = val;
				}
				return val;
			}
			, "remove": function() {
				if( this.style && this.style.cssText ) {
					this.style.cssText = "";
					return true;
				}
				return false;
			}
			, "has": function() {
				return !!(this.style && this.style.cssText);
			}
		}
	}

	// ------------------------------ ==================  Events  ================== ------------------------------
  , _ielt9_Event
	/** @type {Object} */
  , _EventInitFunctions

  , _Event_prototype

	/** @const @type {string} */
  , _event_UUID_prop_name = "uuid" + (Math.random() + "").substr(2)

	/** @type {number} unique indentifier for event listener */
  , _event_UUID = 1//MUST be more then 0 | 0 - using for DOM0 events

	/** @const @type {string} */
  , _event_handleUUID = "_h_9e2"

	/** @const @type {string} */
  , _event_eventsUUID = "_e_8vj"

	/** @const @type {string} */
  , _event_nativeEventPropName = "ietl9_event"

	/** @const @type {Function} */
  , _event_emptyFunction = function(){}

	/** @const @type {Object} */
  , _event_needCapturing = {}

	/** @type {boolean} */
  , _event_globalIsCaptureIndicator = false

	/** @type {Array.<Node>} */
  , _event_captureHandlerNodes = []

	/** @type {Object} */
  //, customEventsMap

  , __is__DOMContentLoaded

	// ------------------------------ ==================  HTML5 shiv  ================== ------------------------------

  , html5_elements = 'abbr|article|aside|audio|canvas|command|datalist|details|figure|figcaption|footer|header|hgroup|keygen|mark|meter|main|nav|output|progress|section|source|summary|time|video'

  , html5_elements_array = html5_elements.split('|')

	/* Not all elements can be cloned in IE (this list can be shortend) **/
  , ielt9_elements = /^<|^(?:a|b|button|code|div|fieldset|form|map|h1|h2|h3|h4|h5|h6|i|object|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul|optgroup)$/i

	// feature detection: whether the browser supports unknown elements
	/** @type {boolean}*/
  , supportsUnknownElements

  , safeFragment

	/** @type {Node} */
  , safeElement

  , _nativeCloneNode

  , _getScrollX

  , _getScrollY
;

//Get prototype for NodeList polyfill and prototype for "Empty" Object
//Internet Explorer refuses to maintain the length property of a subclass created like this | http://dean.edwards.name/weblog/2006/11/hooray/
// create an <iframe>
/* TODO:: ???? ??? ?????? IE, ?? ?????, ???????? ??????? resize. ????? ??????????? ??????
_tmp_ = document.createElement("iframe");
_tmp_.style.position = "absolute";
_tmp_.style.width = "0";
_tmp_.style.height = "0";
_tmp_.style.visibility = "hidden";
_tmp_.style.display = "none";
(document.body || _document_documentElement).appendChild(_tmp_);

// write a script into the <iframe> and steal its Array object
_tmp_.contentWindow.document.write(
	"<script>parent._.NodeList=Array;parent._.EMP=Object.prototype<\/script>"
);
//faked_nodeList = global["_"]["NodeList"];
//delete global["_"]["NodeList"];

// Supporting Object.create(null)
emptyObjectPrototype = global["_"]["EMP"];
delete global["_"]["EMP"];
delete emptyObjectPrototype.constructor;
delete emptyObjectPrototype.hasOwnProperty;
delete emptyObjectPrototype.propertyIsEnumerable;
delete emptyObjectPrototype.isPrototypeOf;
delete emptyObjectPrototype.toLocaleString;
delete emptyObjectPrototype.toString;
delete emptyObjectPrototype.valueOf;
emptyObjectPrototype.__proto__ = null;
_.push(function() {
	var _origina_Object_create = Object.create;
	Object.create = function(_prototype) {
		if(_prototype === null) {
			arguments[0] = emptyObjectPrototype;
		}
		return _origina_Object_create.apply(this, arguments);
	}
});
*/
_document.compatMode === "CSS1Compat" ?
	((_getScrollX = function(){return _document_documentElement.scrollLeft}), (_getScrollY = function(){return _document_documentElement.scrollTop}))
	:
	((_getScrollX = function(){return _document.body.scrollTop}), (_getScrollY = function(){return _document.body.scrollLeft}))
;


/*
TODO:: http://code.jquery.com/jquery-1.7.2.js:1537
var support = {};

// Run tests that need a body at doc ready
document.addEventListener('DOMContentLoaded', function() {
	var container, outer, inner, table, td, offsetSupport,
		marginDiv, conMarginTop, style, html, positionTopLeftWidthHeight,
		paddingMarginBorderVisibility, paddingMarginBorder,
		body = document.getElementsByTagName("body")[0];

	if ( !body ) {
		// Return for frameset docs that don't have a body
		return;
	}

	conMarginTop = 1;
	paddingMarginBorder = "padding:0;margin:0;border:";
	positionTopLeftWidthHeight = "position:absolute;top:0;left:0;width:1px;height:1px;";
	paddingMarginBorderVisibility = paddingMarginBorder + "0;visibility:hidden;";
	style = "style='" + positionTopLeftWidthHeight + paddingMarginBorder + "5px solid #000;";
	html = "<div " + style + "display:block;'><div style='" + paddingMarginBorder + "0;display:block;overflow:hidden;'></div></div>" +
		"<table " + style + "' cellpadding='0' cellspacing='0'>" +
		"<tr><td></td></tr></table>";

	container = document.createElement("div");
	container.style.cssText = paddingMarginBorderVisibility + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
	body.insertBefore( container, body.firstChild );

	// Construct the test element
	div = document.createElement("div");
	container.appendChild( div );

	// Check if table cells still have offsetWidth/Height when they are set
	// to display:none and there are still other visible table cells in a
	// table row; if so, offsetWidth/Height are not reliable for use when
	// determining if an element has been hidden directly using
	// display:none (it is still safe to use offsets if a parent element is
	// hidden; don safety goggles and see bug #4512 for more information).
	// (only IE 8 fails this test)
	div.innerHTML = "<table><tr><td style='" + paddingMarginBorder + "0;display:none'></td><td>t</td></tr></table>";
	tds = div.getElementsByTagName( "td" );
	isSupported = ( tds[ 0 ].offsetHeight === 0 );

	tds[ 0 ].style.display = "";
	tds[ 1 ].style.display = "none";

	// Check if empty table cells still have offsetWidth/Height
	// (IE <= 8 fail this test)
	support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

	// Check if div with explicit width and no margin-right incorrectly
	// gets computed margin-right based on width of container. For more
	// info see bug #3333
	// Fails in WebKit before Feb 2011 nightlies
	// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	if ( window.getComputedStyle ) {
		div.innerHTML = "";
		marginDiv = document.createElement( "div" );
		marginDiv.style.width = "0";
		marginDiv.style.marginRight = "0";
		div.style.width = "2px";
		div.appendChild( marginDiv );
		support.reliableMarginRight =
			( parseInt( ( window.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
	}

	if ( typeof div.style.zoom !== "undefined" ) {
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		// (IE < 8 does this)
		div.innerHTML = "";
		div.style.width = div.style.padding = "1px";
		div.style.border = 0;
		div.style.overflow = "hidden";
		div.style.display = "inline";
		div.style.zoom = 1;
		support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

		// Check if elements with layout shrink-wrap their children
		// (IE 6 does this)
		div.style.display = "block";
		div.style.overflow = "visible";
		div.innerHTML = "<div style='width:5px;'></div>";
		support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );
	}

	div.style.cssText = positionTopLeftWidthHeight + paddingMarginBorderVisibility;
	div.innerHTML = html;

	outer = div.firstChild;
	inner = outer.firstChild;
	td = outer.nextSibling.firstChild.firstChild;

	offsetSupport = {
		doesNotAddBorder: ( inner.offsetTop !== 5 ),
		doesAddBorderForTableAndCells: ( td.offsetTop === 5 )
	};

	inner.style.position = "fixed";
	inner.style.top = "20px";

	// safari subtracts parent border width here which is 5px
	offsetSupport.fixedPosition = ( inner.offsetTop === 20 || inner.offsetTop === 15 );
	inner.style.position = inner.style.top = "";

	outer.style.overflow = "hidden";
	outer.style.position = "relative";

	offsetSupport.subtractsBorderForOverflowNotVisible = ( inner.offsetTop === -5 );
	offsetSupport.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== conMarginTop );

	if ( window.getComputedStyle ) {
		div.style.marginTop = "1%";
		support.pixelMargin = ( window.getComputedStyle( div, null ) || { marginTop: 0 } ).marginTop !== "1%";
	}

	if ( typeof container.style.zoom !== "undefined" ) {
		container.style.zoom = 1;
	}

	body.removeChild( container );
	marginDiv = div = container = null;

	jQuery.extend( support, offsetSupport );
});

return support;
});
*/




//Emulating HEAD for ie < 9
_document.head || (_document.head = _document.getElementsByTagName('head')[0]);

"defaultView" in _document || (_document.defaultView = _document.parentWindow);

if(DEBUG) {
	//test DOMElement is an ActiveXObject
	if(!(_Function_call_.call(_document_createElement, _document, "div") instanceof ActiveXObject))
		console.error("DOMElement is not an ActiveXObject. Probably you in IE > 8 'compatible mode'. <element> instanceof [Node|Element|HTMLElement] wouldn't work");
}

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Function.prototype  ==================================  */
/*  =======================================================================================  */


//Fix Function.prototype.apply to work with generic array-like object instead of an array
// test: (function(a,b){console.log(a,b)}).apply(null, {0:1,1:2,length:2})
_tmp_ = false;
try {
	_tmp_ = isNaN.apply(null, {})
}
catch(e) { }
if(!_tmp_) {
	Function.prototype.apply = function(contexts, args) {
		var args_length;

		// 1. simple case, no args at all: no args object or toInteger(length)
		if( !args || !(args_length = +args.length) ) {
			return _Function_call_.call(this, contexts);
}

		// 2. args is not an array-like object or just an array
		if( typeof args !== "object"			// when args is not an object -> IE throw error for this case and would be right
			|| args_length < 0					// if args is an invalid array-like abject -> IE throw native error
			|| (
				"callee" in args
				&& "caller" in args
			)									// args is arguments
			|| _Object_toString_.call(args) ==
					"[object Array]"			// if args is array -> IE can eat this case
		) {
			return _Function_apply_.call(this, contexts, args);
		}

		// 3. try to reduce count of Array.from calls
		switch( args_length ) {
			case 1:	return _Function_call_.call(this, contexts, args[0]);
			case 2:	return _Function_call_.call(this, contexts, args[0], args[1]);
			case 3:	return _Function_call_.call(this, contexts, args[0], args[1], args[2]);
			case 4:	return _Function_call_.call(this, contexts, args[0], args[1], args[2], args[3]);
			case 5:	return _Function_call_.call(this, contexts, args[0], args[1], args[2], args[3], args[4]);
			case 6:	return _Function_call_.call(this, contexts, args[0], args[1], args[2], args[3], args[4], args[5]);
			case 7:	return _Function_call_.call(this, contexts, args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
		}

		// 4. args is array-like object
		return _Function_apply_.call(this, contexts, _toArray(args));
	};
}

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Function.prototype  ==================================  */
/*  =======================================================================================  */


/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  String.prototype  ==================================  */
/*  =======================================================================================  */

// String.prototype.substr shim
//[BUGFIX, IE lt 9] IE < 9 substr() with negative value not working in IE
if("ab".substr(-1) !== "b") {
	//String.prototype._itlt9_substr_ = String.prototype.substr;
	String.prototype.substr = function(start, length) {
		return _String_substr_.call(this, start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start, length);
	}
}

/*
[BUGFIX, IE lt 9, old safari] http://blog.stevenlevithan.com/archives/cross-browser-split
More better solution:: http://xregexp.com/
*/
if('ab'.split(/(?:ab)*/).length !== 2
	|| '.'.split(/(.?)(.?)/).length !== 4
	|| 'tesst'.split(/(s)*/)[1] === "t"
	|| ''.split(/.?/).length === 0
	|| '.'.split(/()()/).length > 1
) {
   _String_split_shim_isnonparticipating = /()??/.exec("")[1] === void 0; // NPCG: nonparticipating capturing group

	//http://jsperf.com/js-split
	String.prototype.split = function (separator, limit) {
		var str = this;
		// if `separator` is not a regex, use the native `split`
		if(!(separator instanceof RegExp)) {//if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
			//http://es5.github.com/#x15.5.4.14
			//If separator is undefined, then the result array contains just one String, which is the this value (converted to a String). If limit is not undefined, then the output array is truncated so that it contains no more than limit elements.
			if(separator === void 0 && limit === 0)return [];

			return _String_split_.call(str, separator, limit);
		}

		var output = []
			, flags = (separator["ignoreCase"] ? "i" : "") +
					(separator["multiline"] ? "m" : "") +
                    (separator["extended"] ? "x" : "") + // Proposed for ES6
                    (separator["sticky"]   ? "y" : "") // Firefox 3+
			, lastLastIndex = 0
            // Make `global` and avoid `lastIndex` issues by working with a copy
			, separator2
			, match
			, lastIndex
			, lastLength
		;

		separator = new RegExp(separator.source, flags + "g");

		str += ""; // Type-convert
		if (!_String_split_shim_isnonparticipating) {
            // Doesn't need flags gy, but they don't hurt
			separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
		}

		/* Values for `limit`, per the spec:
         * If undefined: 4294967295 // Math.pow(2, 32) - 1
         * If 0, Infinity, or NaN: 0
         * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
         * If negative number: 4294967296 - Math.floor(Math.abs(limit))
         * If other: Type-convert, then use the above rules
         */
        limit = limit === void 0 ?
            -1 >>> 0 : // Math.pow(2, 32) - 1
            limit >>> 0 // ToUint32(limit)
		;

		if (!limit) {
			return [];
		}

		while (match = separator.exec(str)) {
            // `separator.lastIndex` is not reliable cross-browser
            lastIndex = match.index + match[0].length;

			if (lastIndex > lastLastIndex) {
				output.push(str.slice(lastLastIndex, match.index));

				// Fix browsers whose `exec` methods don't consistently return `undefined` for
                // nonparticipating capturing groups
				// __ NOT WORKING __ !!!!
				if (!_String_split_shim_isnonparticipating && match.length > 1) {
					match[0].replace(separator2, function() {
						for (var i = 1, l = arguments.length - 2; i < l; i++) {
							if (arguments[i] === void 0) {
								match[i] = void 0;
							}
						}
					});
				}

				if (match.length > 1 && match.index < str.length) {
					output.push.apply(output, match.slice(1));//Array.prototype.push.apply(output, match.slice(1));
				}

				lastLength = match[0].length;
				lastLastIndex = lastIndex;

				if (output.length >= limit) {
					break;
				}
			}

			if (separator.lastIndex === match.index) {
				separator.lastIndex++; /// Avoid an infinite loop
			}
		}

		if (lastLastIndex === str.length) {
			if (lastLength || !separator.test("")) {
				output.push("");
			}
		} else {
			output.push(str.slice(lastLastIndex));
		}

		return output.length > limit ? output.slice(0, limit) : output;
	}
}


/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  String.prototype  ==================================  */
/*  =======================================================================================  */



/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Exception  ==================================  */
/*  =======================================================================================  */
if(!global["DOMException"]) {
	_tmp_ = (global["DOMException"] = function() { }).prototype = new Error;
	_tmp_.INDEX_SIZE_ERR = 1;
	//_tmp_.DOMSTRING_SIZE_ERR = 2; // historical
	_tmp_.HIERARCHY_REQUEST_ERR = 3;
	_tmp_.WRONG_DOCUMENT_ERR = 4;
	_tmp_.INVALID_CHARACTER_ERR = 5;
	//_tmp_.NO_DATA_ALLOWED_ERR = 6; // historical
	_tmp_.NO_MODIFICATION_ALLOWED_ERR = 7;
	_tmp_.NOT_FOUND_ERR = 8;
	_tmp_.NOT_SUPPORTED_ERR = 9;
	//_tmp_.INUSE_ATTRIBUTE_ERR = 10; // historical
	_tmp_.INVALID_STATE_ERR = 11;
	_tmp_.SYNTAX_ERR = 12;
	_tmp_.INVALID_MODIFICATION_ERR = 13;
	_tmp_.NAMESPACE_ERR = 14;
	_tmp_.INVALID_ACCESS_ERR = 15;
	//_tmp_.VALIDATION_ERR = 16; // historical
	//_tmp_.TYPE_MISMATCH_ERR = 17; // historical https://www.w3.org/Bugs/Public/show_bug.cgi?id=19898 ([Bug 19898] Deprecate TYPE_MISMATCH_ERR in favor of TypeError)
}

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Exception  ==================================  */
/*  =======================================================================================  */

/*  ======================================================================================  */
/*  ======================================  Window  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */

//http://javascript.gakaa.com/window-scrollx-2-0-scrolly.aspx
if(!("pageXOffset" in global)) {
	_.push(function() {
		Object.defineProperty(global, "pageXOffset", {"get" : _getScrollX});
		Object.defineProperty(global, "pageYOffset", {"get" : _getScrollY});
	});
}

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Window  ======================================  */
/*  ======================================================================================  */

/*  ======================================================================================  */
/*  ======================================  Events  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */

/** @constructor */
function_tmp = global["Event"] = function() {
	//new operator for Event supported in a.js
	_throw("");
};

_EventInitFunctions = {
	/**
	 * @param {string=} _type
	 * @param {boolean=} _bubbles
	 * @param {boolean=} _cancelable
	 */
	"initEvent" : function(_type, _bubbles, _cancelable) {
		if(_type == void 0 || _bubbles == void 0 || _cancelable == void 0) {
			//WRONG_ARGUMENTS_ERR
			_throw('WRONG_ARGUMENTS_ERR');
		}
		var thisObj = this;

		thisObj.type = _type;
		//this.cancelBubble = //TODO:: <-- testing | Need this ???
		//	!(this.bubbles = _bubbles);
		thisObj.bubbles = _bubbles;
		thisObj.cancelable = _cancelable;//https://developer.mozilla.org/en/DOM/event.cancelable

		thisObj.isTrusted = false;
		thisObj.target = null;

		if(!thisObj.timeStamp)thisObj.timeStamp = +new _Native_Date();
	}
	,
	"initCustomEvent" : function(_type, _bubbles, _cancelable, _detail) {
		//https://developer.mozilla.org/en/DOM/CustomEvent
		_EventInitFunctions["initEvent"].call(this, _type, _bubbles, _cancelable);

		this.detail = _detail;
	}
	,
	"initUIEvent" : function(_type, _bubbles, _cancelable, _view, _detail) {
		//https://developer.mozilla.org/en/DOM/event.initUIEvent
		_EventInitFunctions["initCustomEvent"].call(this, _type, _bubbles, _cancelable, _detail);

		this.view = _view;
	}
	,
	"initMouseEvent" : function(
		_type, _bubbles, _cancelable, _view,
		_detail, _screenX, _screenY, _clientX, _clientY,
		_ctrlKey, _altKey, _shiftKey, _metaKey,
		_button, _relatedTarget
	) {
		var thisObj = this;
		//https://developer.mozilla.org/en/DOM/event.initMouseEvent
		_EventInitFunctions["initUIEvent"].call(thisObj, _type, _bubbles, _cancelable, _view, _detail);

		thisObj.screenX = _screenX;
		thisObj.screenY = _screenY;
		thisObj.clientX = _clientX;
		thisObj.clientY = _clientY;
		thisObj.ctrlKey = _ctrlKey;
		thisObj.altKey = _altKey;
		thisObj.shiftKey = _shiftKey;
		thisObj.metaKey = _metaKey;
		thisObj.button = _button;
		thisObj.relatedTarget = _relatedTarget;
	}
};

_Event_prototype = function_tmp.prototype = {
	constructor : function_tmp,

    /** @this {_ielt9_Event} @lends {function_tmp.prototype}*/
    "preventDefault" : function() {
        if(this.cancelable === false)return;

        _ielt9_Event.getNativeEvent.call(this)["returnValue"] = this["returnValue"] = false;
        _ielt9_Event.destroyLinkToNativeEvent.call(this);
        this["defaultPrevented"] = true;
    } ,

    /** @this {_ielt9_Event} @lends {function_tmp.prototype} */
    "stopPropagation" : function() {
        _ielt9_Event.getNativeEvent.call(this)["cancelBubble"] = this["cancelBubble"] = true;
        _ielt9_Event.destroyLinkToNativeEvent.call(this);
    }
};
/** @this {_ielt9_Event} */
_Event_prototype["stopImmediatePropagation"] = function() {
	this["__stopNow"] = true;
	this.stopPropagation();
};
_Event_prototype["defaultPrevented"] = false;

for(_tmp_ in _EventInitFunctions)if(_hasOwnProperty(_EventInitFunctions, _tmp_)) {
	_Event_prototype[_tmp_] = function() {
		_EventInitFunctions[arguments.callee["name"]].apply(this, arguments);
		_safeExtend(this[_event_nativeEventPropName], this);
	};
	_Event_prototype[_tmp_]["name"] = _tmp_;
}

/** @constructor Event constructor for document.createEvent and commonHandle */
_ielt9_Event = function(nativeEvent) {
	this[_event_nativeEventPropName] = nativeEvent;

	nativeEvent.returnValue = true;//default value

	_safeExtend(this, nativeEvent);
};

/** @this {_ielt9_Event} */
_ielt9_Event.getNativeEvent = function() {
	var nativeEvent = this[_event_nativeEventPropName];
	if(nativeEvent === void 0) {
		_throw("WRONG_THIS_ERR")
	}
	else if(nativeEvent === null) {
		//_ielt9_Event.destroyLinkToNativeEvent was fired
		nativeEvent = _ielt9_Event.getNativeEvent.fakeObject;
	}

	return nativeEvent;
};
_ielt9_Event.getNativeEvent.fakeObject = {};

/** @this {_ielt9_Event} */
_ielt9_Event.destroyLinkToNativeEvent = function() {
	if(this[_event_nativeEventPropName]) {
		this[_event_nativeEventPropName] = null;
	}
};

//inherit _ielt9_Event from Event
/** @constructor */
function_tmp = function() { };
function_tmp.prototype = _Event_prototype;
function_tmp = new function_tmp;
function_tmp.constructor = _ielt9_Event;
_ielt9_Event.prototype = function_tmp;


//fix [add|remove]EventListener & dispatchEvent for IE < 9

// See: https://github.com/arexkun/Vine
//	    https://github.com/kbjr/Events.js
//	    Use this for tests: http://ie.microsoft.com/testdrive/HTML5/ComparingEventModels/Default.html


function fixEvent(event) {
	if( "__isFixed" in event || event["isTrusted"] === false )return;

	var thisObj = this,
		_button = ("button" in event) && event.button;

	event["__isFixed"] = true;// mark event as fixed

	//http://javascript.gakaa.com/event-detail.aspx
	//http://www.w3.org/TR/2011/WD-DOM-Level-3-Events-20110531/#event-type-click
	//indicates the current click count; the attribute value must be 1 when the user begins this action and increments by 1 for each click.
	if(event.type === "click" || event.type === "dblclick") {
		if(event.detail === void 0)event.detail = event.type === "click" ? 1 : 2;
		if(!event.button && fixEvent._clickButton !== void 0)_button = fixEvent._clickButton;
	}

	_append(event, _Event_prototype);

	if(!event["defaultPrevented"])event["defaultPrevented"] = false;

	if(!event.target)event.target = event.srcElement || _document;// target for IE
	/*
	if ( event.target && event.target.nodeType in {3 : void 0, 4 : void 0} ) {
		event.target = event.target.parentNode;
	}
	*/

	// add relatedTarget ? IE, if needs
	if(event.relatedTarget === void 0 && event.fromElement)
		event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
	/*
	event.relatedTarget = event.relatedTarget ||
		event.type == 'mouseout' ? event.toElement :
		event.type == 'mouseover' ? event.fromElement : null;
	*/

	// calculate pageX/pageY for IE
	if("clientX" in event && event.pageX == null) {
		event.pageX = event.clientX + _getScrollX() - (_document_documentElement.clientLeft || 0);
		event.pageY = event.clientY + _getScrollY() - (_document_documentElement.clientTop || 0);
	}

	//Add 'which' for click: 1 == left; 2 == middle; 3 == right
	if(!event.which && _button)event.which = _button & 1 ? 1 : _button & 2 ? 3 : _button & 4 ? 2 : 0;

	"timeStamp" in event || (event.timeStamp = +new _Native_Date());

	"eventPhase" in event || (event.eventPhase = (event.target == thisObj) ? 2 : 3); // "AT_TARGET" = 2, "BUBBLING_PHASE" = 3

	//"currentTarget" in event || (event.currentTarget = thisObj);

	event.keyCode || (event.keyCode = event.charCode || event.which);

	// DOMAttrModified
	//  TODO:: ??????????
	// TODO:: ???????? event ?? ???? ??????? (??? ???? ?????????) ? ?????????? ??? ? newValue, prevValue, propName ? ?.?.
	if(!event.attrName && event.propertyName)event.attrName = _String_split_.call(event.propertyName, '.')[0];//IE ??? ????????? style.width ? propertyName ???????? ?????? style.width, ? ?? style, ??? ??? ????

	return event;
}

if(  __GCC__UNSTABLE_FUNCTIONS__ ) {
	function windowCaptureHandler(nativeEvent) {
		var i,
			l = _event_captureHandlerNodes.length,
			k,
			_node;

		if(l) {
			_event_globalIsCaptureIndicator = true;
			nativeEvent.eventPhase = 1;
			for(k = l - 1 ; k >= 0 ; --k)commonHandler.call(_event_captureHandlerNodes[k], nativeEvent);
			nativeEvent.eventPhase = 3;
			for(i = 0 ; i < l ; ++i)commonHandler.call(_event_captureHandlerNodes[i], nativeEvent);
			_event_globalIsCaptureIndicator = false;
			_event_captureHandlerNodes = [];
		}
	}
}

/**
 *
 * @param nativeEvent
 * @this {Node}
 */
function commonHandler(nativeEvent) {
	if( fixEvent === void 0 ) {//????????? ????? ??????????? ??????, ????? ??????? ???????????? ????? unload'? ????????.
		return;
	}

	var thisObj = this
		, _ = thisObj["_"]
		, errors
		, errorsMessages
		, _event
		, handlersKey

		, handlers
		, localHandlersArray
		, handler
		, context
		, handlerUUID
	;

	if( _["__stop_events__"] ) {
		return;
	}

	if(    __GCC__UNSTABLE_FUNCTIONS__    && !_event_globalIsCaptureIndicator && nativeEvent.bubbles !== false && nativeEvent.type in _event_needCapturing && thisObj != global) {
		_event_captureHandlerNodes.push(this);
		_event = nativeEvent;
	}
	else {
		errors = [];
		errorsMessages = [];
		handlersKey = _event_eventsUUID + (_event_globalIsCaptureIndicator ? "-" : "");

		if( !_ || !_[handlersKey] ) {
			if( !("__dom0__" in nativeEvent) ) {
				return;
			}
			else { // commonHandler called via dispatchEvent
				_ || (_ = {});
				_[handlersKey] || (_[handlersKey] = {});
			}
		}

		// get event in IE
		nativeEvent || (nativeEvent = global.event);

		if( "__custom_event" in nativeEvent ) {// this is not a native event
			_event = nativeEvent;
		}
		else if( !(_event = nativeEvent["__customEvent__"]) ) {
			if( nativeEvent.bubbles == void 0 ) {
				nativeEvent.bubbles = true;
				//TODO::
				//nativeEvent.bubbles = bubbleEventMap[nativeEvent.type]
			}
			if( nativeEvent.cancelable == void 0 ) {
				nativeEvent.cancelable = true;
				//TODO::
				//nativeEvent.bubbles = cancelableEventMap[nativeEvent.type]
			}

			// save event properties in fake 'event' object to allow store 'event' and use it in future
			_event = nativeEvent["__customEvent__"] = new _ielt9_Event(nativeEvent);
			_event.initEvent(nativeEvent.type, nativeEvent.bubbles, nativeEvent.cancelable);
			_event.isTrusted = nativeEvent.isTrusted !== false;
			fixEvent.call(this, _event);
			_event["__custom_event"] = null;
		}

		_event[_event_nativeEventPropName] = nativeEvent;
		_event.currentTarget = thisObj;//TODO:: check it

		//if(!("__isFixed" in nativeEvent))nativeEvent = fixEvent.call(thisObj, nativeEvent);
		if( "__dom0__" in nativeEvent ) {
			handler = nativeEvent["__dom0__"];
		}

		if( (handlers = _[handlersKey][_event.type]) || handler ) {
			//make a copy of handlers array. Due in ant handler there may be a call of removeEventListener witch reduce handlers array length
			localHandlersArray = handlers ? _Array_slice_.call(handlers) : [];

			//save dom0 event handler in temporary local handlers array
			if( handler ) {
				localHandlersArray.unshift(handler)
			}
		}

		if( localHandlersArray && localHandlersArray.length ) {
			while( handler = localHandlersArray.shift() ) {
				if( !handler
					|| (// while calling any handler it could call removeEventListener for the same event type
						(handlerUUID = handler[_event_UUID_prop_name])//check out that handler have "uuid" property. "uuid" would be undefined only for "dom0" handlers
						&& !(("_" + handlerUUID) in handlers)//check out that handler still in node event handlers array
					)
				) {
					continue;
				}

				if(typeof handler === "object") {
					context = handler;
					handler = handler.handleEvent;
				}

				try {
					// Call handler with needed context and fixed event as a parameter, result saved in event['result']
					if( handler &&
						( _event['result'] = _Function_call_.call(handler, context || thisObj, _event) )	=== false
					) { // If handler return false
						if( _event.defaultPrevented === false && _event.returnValue !== false ) {//tiny optimisation  TODO:: tests
							_event.preventDefault();
						}

						_event.stopPropagation();
					}
				}
				catch(e) {
					errors.push(e);// Collect all exceptions without interrupting events queue call
					errorsMessages.push(e.message);
					if(DEBUG && console) {
						console.error(e);
					}
				}

				if( _event["__stopNow"] ) {// Immediate stop propagation
					break;
				}
			}

			//return changed properties in native 'event' object
			nativeEvent.returnValue = _event.returnValue;
			nativeEvent.cancelBubble = _event.cancelBubble;
			//TODO:: check out that properties need to be returned in native 'event' object or _extend(nativeEvent, event);

			if( errors.length == 1 ) {// If there was only one error - throw it on
				_throw(errors[0])
			}
			else if( errors.length > 1 ) {// Otherwise, do a common object with a list of errors Error in property errors and throw it
				var e = new Error("Multiple errors thrown : " + _event.type + " : " + " : " + errorsMessages.join("|"));
				e["errors"] = errors;
				_throw(e);
			}
		}
	}

	if( thisObj === _document && !_event.cancelBubble && _event.eventPhase === 3 ) {
		//Emelate bubbling from document to defaultView (window) | 2 from 2
		commonHandler.call(thisObj.defaultView, _event);
		nativeEvent.cancelBubble = true;//to prevent dubble event fire on window object. First emulated, second native bubbling
	}

	//cleanup
	_ielt9_Event.destroyLinkToNativeEvent.call(_event);
	nativeEvent["__customEvent__"] = nativeEvent = _event = handlers = handler = null;
}

if( !_testElement.addEventListener ) {
	(global["Text"] && global["Text"].prototype ||_Node_prototype).addEventListener =
		_Node_prototype.addEventListener =
			_document_documentElement.addEventListener =
				global.addEventListener = _document.addEventListener =
	function(_type, _handler, useCapture) {
		//TODO:: useCapture == true

		if(
			!(
			typeof _handler === "function"
		   	|| typeof _handler === "object"//Registering an EventListener with a function object that also has a handleEvent property -> Call EventListener as a function
			)
		) {
			return;
		}

		if(    __GCC__UNSTABLE_FUNCTIONS__     && useCapture) {
			if(!_event_needCapturing[_type]) {
				_event_needCapturing[_type] = true;
				//window.addEventListener(_type, windowCaptureHandler, true);
				global.addEventListener(_type, windowCaptureHandler);
			}
		}

		var /** @type {Node} */
			thisObj = this
			/** @type {Object} */
			, _ = thisObj["_"]
			/** @type {Function} */
			, _callback
			/** @type {boolean} */
			, doNotAttach = false
			/** @type {string} */
			, handlersKey = _event_eventsUUID + (    __GCC__UNSTABLE_FUNCTIONS__     && useCapture ? "-" : "")
		;

		if(thisObj == global && (!("_" in _document) || !(handlersKey in _document["_"]) || !(_type in _document["_"][handlersKey]))) {
			//Emulate bubbling from document to defaultView (window) | 1 from 2
			_document.addEventListener(_type, _event_emptyFunction, useCapture);
		}

		if(!_) {
			_ = thisObj["_"] = {};
		}
		//_ = _[_event_phase] || (_[_event_phase] = {});

		switch(_type) {
			case "DOMContentLoaded":
				if (_document.readyState == 'complete')return;

				if(thisObj === global) {
					thisObj = _document;
				}

				doNotAttach = true;

				if(!__is__DOMContentLoaded) {
					__is__DOMContentLoaded = true;

					function poll() {
						try { _document_documentElement.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
						commonHandler.call(thisObj, {"type" : _type, "isTrusted" : true, "__custom_event" : void 0});
					}

					if ("createEventObject" in _document && "doScroll" in _document_documentElement) {
						try { if(!global.frameElement)poll() } catch(e) { }
					}
				}
			break;
			case "load":
				if("tagName" in thisObj && "SCRIPT|IFRAME".indexOf(thisObj.tagName.toUpperCase()) != -1) {//[script:onload]
					//FROM https://github.com/jrburke/requirejs/blob/master/require.js
					//Probably IE. IE (at least 6-8) do not fire
					//script onload right after executing the script, so
					//we cannot tie the anonymous define call to a name.
					//However, IE reports the script as being in "interactive"
					//readyState at the time of the define call.
					doNotAttach = true;

					//Need to use old school onreadystate here since
					//when the event fires and the node is not attached
					//to the DOM, the evt.srcElement is null, so use
					//a closure to remember the node.
					thisObj.onreadystatechange = function (evt) {
						evt = evt || global.event;
						//Script loaded but not executed.
						//Clear loaded handler, set the real one that
						//waits for script execution.
						if (thisObj.readyState === 'loaded') {
							thisObj.onreadystatechange = null;
							thisObj.attachEvent("onreadystatechange", _fastUnsafe_Function_bind_.call(commonHandler, thisObj, {"type" : _type}));
						}
					};
					_type = "readystatechange";
				}
			break;
			case "DOMMouseScroll":
				_type = "mousewheel";//TODO:: Test it

			break;
		}

		/*
		TODO::
		Reference: http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
		If multiple identical EventListeners are registered on the same EventTarget with the same parameters the duplicate instances are discarded. They do not cause the EventListener to be called twice and since they are discarded they do not need to be removed with the removeEventListener method.
		*/


		// fix little IE bug with window object as this object
		if( thisObj.setInterval && (thisObj != global && !thisObj["frameElement"]) ) {
			thisObj = global;
		}

		// Set unique number to handler function
		if( !_handler[_event_UUID_prop_name] ) {
			_handler[_event_UUID_prop_name] = ++_event_UUID;
		}

		if( !(_callback = _[_event_handleUUID]) ) {
			_callback = _[_event_handleUUID] = _fastUnsafe_Function_bind_.call(commonHandler, thisObj);
		}

		if( !_[handlersKey] ) {
			_[handlersKey] = {};
		}

		if( !(_type in _[handlersKey]) ) {
			_ = _[handlersKey][_type] = [];

			if( !doNotAttach ) {//[script:onload]
				thisObj.attachEvent('on' + _type, _callback);
			}
		}
		else {
			_ = _[handlersKey][_type];
		}

		// We need to be sure, that one handler added with the same type name twice would be added only in first time
		if( !("_" + _handler[_event_UUID_prop_name] in _) ) {
			_.push(_handler);
			_["_" + _handler[_event_UUID_prop_name]] = null;
		}
	};

	_Node_prototype.addEventListener["__shim__"] = true;

	(global["Text"] && global["Text"].prototype ||_Node_prototype).removeEventListener =
		_Node_prototype.removeEventListener =
			_document_documentElement.removeEventListener =
				global.removeEventListener = _document.removeEventListener =
	function(_type, _handler, useCapture) {
		var /** @type {Node} */
			thisObj = this
			/** @type {Object} */
			, _ = thisObj["_"]
			/** @type {string} */
			, handlersKey = _event_eventsUUID + (    __GCC__UNSTABLE_FUNCTIONS__     && useCapture ? "-" : "")
			/** @type {Function} */
			, _callback
			/** @type {Array} */
			, handlers
			/** @type {String} */
			, any
			/** @type {number} */
			, handlerIndex
			/** @type {Function} */
			, handler
		;

		if( typeof _handler !== "function"
			&& !(typeof _handler === "object" && _handler.handleEvent)
			|| !_handler[_event_UUID_prop_name]
			|| !_
		) {
			return;
		}
		if(    __GCC__UNSTABLE_FUNCTIONS__     && useCapture && !(_type in _event_needCapturing)) {
			return;
		}
		if( !(_callback = _[_event_handleUUID]) ) {
			return;
		}

		//_ = _[_event_phase] || (_[_event_phase] = {});
		//if(!_)return;
		//Get handlers list
		handlers = _[handlersKey] && _[handlersKey][_type];
		//Find and delete handler
		handlerIndex = 0;
		while( handler = handlers[handlerIndex++] ) {
			if( handler === _handler ) {
				_Array_splice_.call(handlers, handlerIndex - 1, 1);
				delete handlers["_" + _handler[_event_UUID_prop_name]];
				break;
			}
		}

		//Check handlers list for emptiness
		if( handlers.length ) {
			return;
		}

		//If handlers list is empty - detach native event handler
		thisObj.detachEvent("on" + _type, _callback);
		//  and delete handlers container
		delete _[handlersKey][_type];

		//If no any handlers on that element
		for( any in _[handlersKey] ) {
			if( _hasOwnProperty(_[handlersKey], any) ) {
				return;
			}
		}

		// delete container of handlers containers
		delete _[handlersKey];
		delete _[_event_handleUUID];
	};

	_Node_prototype.removeEventListener["__shim__"] = true;

	_document.attachEvent("onmousedown", function(){
		fixEvent._clickButton = event.button;
	});
	_document.attachEvent("onclick", function(){
		fixEvent._clickButton = void 0;
	});
}

/**
dispatchEvent
This method allows the dispatch of events into the implementations event model. Events dispatched in this manner will have the same capturing and bubbling behavior as events dispatched directly by the implementation. The target of the event is the EventTarget on which dispatchEvent is called.
Parameters
evt of type Event
Specifies the event type, behavior, and contextual information to be used in processing the event.
Return Value
boolean
The return value of dispatchEvent indicates whether any of the listeners which handled the event called preventDefault. If preventDefault was called the value is false, else the value is true.

Exceptions
EventException
UNSPECIFIED_EVENT_TYPE_ERR: Raised if the Event's type was not specified by initializing the event before dispatchEvent was called. Specification of the Event's type as null or an empty string will also trigger this exception
 * @param {(Event|CustomEvent)} _event is an event object to be dispatched.
 * @this {Element} is the target of the event.
 * @return {boolean} The return value is false if at least one of the event handlers which handled this event called preventDefault. Otherwise it returns true.
 */
if( !_testElement.dispatchEvent ) {
	(global["Text"] && global["Text"].prototype ||_Node_prototype).dispatchEvent =
		_Node_prototype.dispatchEvent =
			_document_documentElement.dispatchEvent =
				global.dispatchEvent = _document.dispatchEvent =
	function(_event) {
		if( !_event.type ) {
			return true;
		}

		//reinit event
		if( !_event.returnValue ) {
			_event.returnValue = true;
		}
	  	if( _event.cancelBubble ) {
			_event.cancelBubble = false;
		}
        delete _event["__stopNow"];

		/**
		 * @type {Node}
		 */
		var thisObj = this;

		try {
			return thisObj.fireEvent("on" + _event.type, _event);
		}
		catch(e) {
			//Shim for Custome events in IE < 9
			if( e["number"] === -2147024809		//"invalid argument."
				|| thisObj === global			//window has no 'fireEvent' method
				|| (e["number"] === -2146827850
					&& !(_event.bubbles = false))//has no such method ("fireEvent")
			) {
				_event["__custom_event"] = true;
				var node = _event.target = thisObj
					, dom0event = "on" + _event.type
					, result
				;

				// Emulate event bubbling
				while( !_event.cancelBubble && node ) {// stopPropogation() set cancelBubble to false
					if( (
							dom0event in node
							&& typeof node[dom0event] == "function"
							&& (_event["__dom0__"] = node[dom0event])
						) // we have at least dom0 event
						|| (
							"_" in node
							&& _event_eventsUUID in node["_"]
						) // Node has events container
					) {
						commonHandler.call(node, _event);// fire event handlers
					}

					// If event has bubbles==false do not bubble it
					node = //find next node
						_event.bubbles ?
							(node === _document ?
								_document.defaultView
								:
								node.parentNode
							)
							:
							null
					;

					if("__dom0__" in _event) {
						_event["__dom0__"] = void 0;// clean
						delete _event["__dom0__"];
					}
				}

				result = !_event.cancelBubble;
				_event = node = null;// clean

				return result;
			}
			else {
				_throw(e);
			}
		}
	};

	_Node_prototype.dispatchEvent["__shim__"] = true;
}

if( !_document.createEvent ) {
	/**
	 * https://developer.mozilla.org/en/DOM/document.createEvent
	 * Not using. param {string} eventType is a string that represents the type of event to be created. Possible event types include "UIEvents", "MouseEvents", "MutationEvents", and "HTMLEvents". See https://developer.mozilla.org/en/DOM/document.createEvent#Notes section for details.
	 */
	_document.createEvent = function() {
		return new _ielt9_Event(_document.createEventObject());
	}
}

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Events  ======================================  */
/*  ======================================================================================  */


/*  ======================================================================================  */
/*  ========================================  DOM  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */

_.push(function() {
	var _InputElement_prototype = global["HTMLInputElement"] && global["HTMLInputElement"].prototype || _Element_prototype
		, _TextAreaElement_prototype = global["HTMLTextAreaElement"] && global["HTMLTextAreaElement"].prototype
		, _setSelectionRange = function (start, end/*, selectionDirection*/) {
			if( start == void 0 ) {
				return;
			}
			if( end == void 0 ) {
				end = start;
			}

			var thisObj = this
				, nodeName = thisObj.nodeName.toUpperCase()
				, selRange
			;

			if( nodeName != "INPUT" && nodeName != "TEXTAREA" ) {
				return;
			}

			selRange = thisObj.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			//selRange.moveEnd('character', end - start);
			selRange.moveEnd('character', end);
			selRange.select();
		}
		/**
		 * @param {boolean=} needStart true - return start point, otherwise - end point
		 */
		, _getSelectionStart_or_End = function(needStart) {
			var thisObj = this
				, selection
				, nodeName = thisObj.nodeName.toUpperCase()
				, range
				, stored_range
				, str
				, start
				, result
				, curElement
				, current__stop_events__1
				, current__stop_events__2
			;

			if( nodeName != "INPUT" && nodeName != "TEXTAREA" ) {
				return;
			}

			//http://code.google.com/p/ie7-js/issues/detail?id=361
			//(document.activeElement causes JavaScript error when script is used inside iframe)
			if(typeof _document.activeElement != 'unknown') {
				curElement = _document.activeElement;
			}
			selection = _document["selection"];

			if(thisObj["_"]) {
				current__stop_events__1 = thisObj["_"]["__stop_events__"];
				thisObj["_"]["__stop_events__"] = true;//flag to prevent "focus" and "blur" events
			}
			if(curElement && curElement["_"]) {
				current__stop_events__2 = curElement["_"]["__stop_events__"];
				curElement["_"]["__stop_events__"] = true;//flag to prevent "focus" and "blur" events
			}

			try {
				thisObj.focus();
				range = selection["createRange"]();
				stored_range = range["duplicate"]();

				if(nodeName == "TEXTAREA") {
					//TODO: compare with http://stackoverflow.com/a/4207763/1587897
					//TODO: has issue with new lines?
					str = thisObj.value;
					range = stored_range;

					if(needStart) {
						range.moveEnd("character", str.length);
						result = range.text == "" ? str.length : str.lastIndexOf(range.text);
					}
					else {
						range.moveStart("character", -str.length);
						result = range.text.length;
					}
				}
				else {
					stored_range.moveToElementText(this);
					stored_range.setEndPoint('EndToEnd', range);
					start = stored_range.text.length - range.text.length;
					if(needStart) {
						result = start;
					}
					else {
						result = start + range.text.length;
					}
				}

				if(curElement && curElement.focus)curElement.focus();
			}
			catch(__e__) {
				result = void 0;
			}

			if(thisObj["_"] && !current__stop_events__1) {
				delete thisObj["_"]["__stop_events__"];
			}
			if(curElement && curElement["_"] && !current__stop_events__2) {
				delete curElement["_"]["__stop_events__"];
			}

			return result;
		}
		, properties = {
			"setSelectionRange" : {
				"value" : _setSelectionRange
			}
			, "selectionStart" : {
				"get" : function() {
					return _getSelectionStart_or_End.call(this, true);
				}
				, "set" : function(val) {
					_setSelectionRange.call(this, val, _getSelectionStart_or_End.call(this));
					return val;
				}
			}
			, "selectionEnd" : {
				"get" : function() {
					return _getSelectionStart_or_End.call(this);
				}
				, "set" : function(val) {
					_setSelectionRange.call(this, _getSelectionStart_or_End.call(this, true), val);
					return val;
				}
			}
		}
	;
	Object.defineProperties(_InputElement_prototype, properties);
	if( _TextAreaElement_prototype ) {
		Object.defineProperties(_TextAreaElement_prototype, properties);
	}
});

if( _browser_msie < 8 ) {
    _Element_prototype["ielt8"] = true;
}

/*  =======================================================================================  */
/*  ================================  NodeList.prototype  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */

/** @constructor */
/*function _NodeList() {}
_NodeList.prototype = new Array;

_tmp_ = new _NodeList;
_tmp_.push(1);
if(_tmp_.length) {//IE8 standart mode
	global["NodeList"] = _NodeList;//"NodeList" in global | Rewrite broken NodeList implimentation
	faked_nodeList = null;
}
else {//IE8 quirk mode, IE lt 8
	_NodeList = global["NodeList"] = faked_nodeList;
}

_NodeList.prototype["item"] = function(index) {
	return this[index];
};
*/
/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  NodeList.prototype  ==================================  */
/*  ======================================================================================  */

/*  ================================ bug fixing  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */


// IE - contains fails if argument is textnode
if(__GCC__UNSTABLE_FUNCTIONS__) {
	_txtTextElement = _Function_call_.call(_document_createTextNode, _document, "");
	_testElement.appendChild(_txtTextElement);

	try {
	    _testElement.contains(_txtTextElement);
	    _tmp_ = false;
	} catch (e) {
		_tmp_ = true;
		_Node_prototype.contains = function contains(other) {
	    	if(other.nodeType === 3) {
			    return _recursivelyWalk(this.childNodes, function (node) {
			         if (node === other) return true;
			    }) || false;
			}
			else return _Function_call_.call(_Node_contains, this, other);
		};
	}
}

// IE8 hurr durr doctype is null
if (_document.doctype === null && _browser_msie > 7)//TODO:: this fix for IE < 8
	_.push(function() {
		var documentShim_doctype = _document.childNodes[0];
		Object.defineProperty(documentShim_doctype, "nodeType", {
			get: function () { return 10 }
		});
	    Object.defineProperty(_document, "doctype", {configurable : true, enumerable : false, get : function () { return documentShim_doctype } });
	});

// IE8 hates you and your f*ing text nodes
// I mean text node and document fragment and document no inherit from node
// Extend Text.prototype and HTMLDocument.prototype with shims
// TODO:: Do something with IE < 8
if(!_Node_prototype.contains)_Node_prototype.contains = _Node_contains;
if (!_Function_call_.call(_document_createTextNode, _document, "").contains){
	if(global["Text"] && global["Text"].prototype) {//IE8
	    _.push(_fastUnsafe_Function_bind_.call(_append, null, Text.prototype, _Node_prototype));
	}
	else if((//IE < 8 doesn't allow add 'contains' property to TextNode
		function(){
			var tmp;
			try{
				tmp = _Function_call_.call(_document_createTextNode, this, "a");
				tmp.contains = function(){}
			}
			catch(e){return false}

			return true;
		}
	)()) {
		_document.createTextNode = function(text) {
			text = _Function_call_.call(_document_createTextNode, this, text);
			text.contains = _Node_prototype.contains;
			return text;
		}
	}
}
if (!_Function_call_.call(_document_createDocumentFragment, _document).contains && global["HTMLDocument"] && global["HTMLDocument"].prototype) {
    _.push(_fastUnsafe_Function_bind_.call(_append, null, global["HTMLDocument"].prototype, _Node_prototype));
}


//https://developer.mozilla.org/en/DOM/Element.children
//[IE lt 9] Fix "children" property in IE < 9
if(!("children" in _testElement))_.push(function() {
	Object.defineProperty(_Element_prototype, "children", {"get" : function() {
		var arr = [],
			child = this.firstChild;

		while(child) {
			if(child.nodeType == 1)arr.push(child);
			child = child.nextSibling;
		}

		return arr;
	}});
});

//[IE lt 9] Fix "offsetLeft" and "offsetTop" properties in IE < 9
_.push(function() {
	/**
	 * http://javascript.ru/ui/offset#popytka-2:-getboundingclientrect
	 * @param {Node} elem
	 * @param {boolean=} X_else_Y
	 * @return {number}
	 */
	function unsafeGetOffsetRect(elem, X_else_Y) {
		if("element" in elem && "defaults" in elem && "document" in elem) {//IE < 8 with htc -> this instanceof DispHTCDefaultDispatch
			elem = elem["element"];
		}

		var box = elem.getBoundingClientRect()//It might be an error here
			, _body
			, _documentElement
			, _doc
		;

		if((_doc = elem.ownerDocument) !== _document) {
			_body = _doc && _doc.body;
			_documentElement = _doc && _doc.documentElement;
			if(!_body || !_documentElement) {
				return X_else_Y ? box.left : box.top;
			}
		}
		else {
			_body = _document.body;
			_documentElement = _document_documentElement;
		}


	 	return X_else_Y ?
	 		(box.left + _getScrollX() - (_documentElement.clientLeft || _body.clientLeft || 0))
			:
	 		(box.top + _getScrollY() - (_documentElement.clientTop || _body.clientTop || 0))
		;
	}

	/**
	 * http://javascript.ru/ui/offset#popytka-1-summiruem-offset-y
	 * @param {Node} elem
	 * @param {boolean=} X_else_Y
	 * @return {number}
	 */
	function getOffsetSum(elem, X_else_Y) {
		var result = 0,
			prop = X_else_Y ? "offsetLeft" : "offsetTop";

		while(elem) {
			result = result + parseInt(elem[prop], 10);
			elem = elem.offsetParent;
		}

		return result;
	}

	/**
	 * @param {Node} elem
	 * @param {boolean=} X_else_Y
	 * @return {number}
	 */
	function safeGetOffsetRect(elem, X_else_Y) {
		var result;
		try {
			result = unsafeGetOffsetRect(elem, X_else_Y);
		}
		catch(e) {
			result = getOffsetSum(elem, X_else_Y);
		}
		return result;

		//Broken impimintation up here
		//Here right impl from jQuery
		//TODO::

		/*
		jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});
		*/

	}
	Object.defineProperties(_Element_prototype, {
		"offsetLeft" : {
			"get" : function() {
			    return safeGetOffsetRect(this, true);
			}
		},
		"offsetTop" : {
			"get" : function() {
			    return safeGetOffsetRect(this);
			}
		}
	});
});

//TODO::window.innerWidth & window.innerHeight http://www.javascripter.net/faq/browserw.htm
//TODO::https://developer.mozilla.org/en/DOM/window.outerHeight

/*
	ep = window.Element.prototype;
	np = window.Node.prototype;

	ep.getchildElementCount = ep.getpreviousElementSibling = ep.getnextElementSibling = ep.getlastElementChild = ep.getfirstElementChild = ep.getclassList = ep.getchildren =
	ep.getcontrol = ep.getlabels = ep.getselectionStart = ep.setselectionStart = ep.getselectionEnd = ep.setselectionEnd = ep.getreversed = np.gettextContent = np.settextContent =
	np.g1 = np.g2 = np.g3 = np.g4 = np.g7 = np.g8=np.g9=np.g10=np.g11=np.g16=ep.getoffsetTop=ep.getoffsetLeft= np.__ielt8__element_init__ = function(){ return {} };
*/

//[IE lt 9, old browsers] Traversal for IE < 9 and other
if(_testElement.childElementCount == void 0)_.push(function() {
	Object.defineProperties(_Element_prototype, {
		"firstElementChild" : {//https://developer.mozilla.org/en/DOM/Element.firstElementChild
			"get" : function() {
			    var node = this;
			    node = node.firstChild;
			    while(node && node.nodeType != 1) node = node.nextSibling;
			    return node;
			}
		},
		"lastElementChild" : {//https://developer.mozilla.org/En/DOM/Element.lastElementChild
			"get" : function() {
			    var node = this;
			    node = node.lastChild;
			    while(node && node.nodeType != 1) node = node.previousSibling;
			    return node;
			}
		},
		"nextElementSibling" : {//https://developer.mozilla.org/En/DOM/Element.nextElementSibling
			"get" : function() {
			    var node = this;
			    while(node = node.nextSibling) if(node.nodeType == 1) break;
			    return node;
			}
		},
		"previousElementSibling" : {//https://developer.mozilla.org/En/DOM/Element.previousElementSibling
			"get" : function() {
			    var node = this;
			    while(node = node.previousSibling) if(node.nodeType == 1) break;
	    		return node;
			}
		}
	})
});

// IE8 can't write to ownerDocument
/*TODO:: is this realy need?
try {
    _testElement.ownerDocument = 42;
} catch (e) {
	_.push(function() {
	    var pd = Object.getOwnPropertyDescriptor(Element.prototype, "ownerDocument");
	    var ownerDocument = pd.get;
	    Object.defineProperty(Element.prototype, "ownerDocument", {
	        get: function () {
	            if (this._ownerDocument) {
	                return this._ownerDocument;
	            } else {
	                return ownerDocument.call(this);
	            }
	        },
	        set: function (v) {
	            this._ownerDocument = v;
	        },
	        configurable: true
	    });
	})
}*/


/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  bug fixing  ==================================  */






/* is this stuff defined? */
if(!_document.ELEMENT_NODE) {
	_tmp_ = {
		ELEMENT_NODE : 1,
		//ATTRIBUTE_NODE : 2,// historical
		TEXT_NODE : 3,
		//CDATA_SECTION_NODE : 4,// historical
		//ENTITY_REFERENCE_NODE : 5,// historical
		//ENTITY_NODE : 6,// historical
		PROCESSING_INSTRUCTION_NODE : 7,
		COMMENT_NODE : 8,
		DOCUMENT_NODE : 9,
		DOCUMENT_TYPE_NODE : 10,
		DOCUMENT_FRAGMENT_NODE : 11
		//NOTATION_NODE : 12// historical
	};
	_append(_document, _tmp_);
	_append(_Node_prototype, _tmp_);
	_append(global["Node"], _tmp_);
}
/*var __ielt8__element_init__ = _Node_prototype["__ielt8__element_init__"];
if(__ielt8__element_init__) {//__ielt8__element_init__ in a.ielt8.js
	__ielt8__element_init__["plugins"].push(function(el) {
		_append(el, tmp);
	})
}*/

//https://developer.mozilla.org/En/DOM/Node.textContent
if(DEBUG && !("textContent" in _testElement)) {
	if(!('innerText' in _testElement) &&
	   (!('data' in _testElement) || !_testElement.appendData))
		_throw("IE is too old");
}
if(!("textContent" in _testElement))
	_.push(function() {
		Object.defineProperty(_Node_prototype, "textContent", {
			"get" : function() {
				if('innerText' in this)return this.innerText;
				if('data' in this && this.appendData)return this.data;
			},
			"set" : function(val) {
				if('innerText' in this)this.innerText = val;
				else if('data' in this && this.replaceData)this.replaceData(0, this.length, val);

				return val;
			}
		});
	});


//https://developer.mozilla.org/en/Document_Object_Model_(DOM)/Node.isEqualNode
if(!("isEqualNode" in _testElement)) {
	_document.isEqualNode = _document_documentElement.isEqualNode = _Node_prototype.isEqualNode = function(node) {
		var i, len;

	    if(node === null ||
	       node.nodeType !== this.nodeType)return false;

	    if (node.nodeType === 10/*Node.DOCUMENT_TYPE_NODE*/) {
	        if (this.name !== node.name ||
	            this.publicId !== node.publicId ||
	            this.systemId !== node.systemId
	        )return false;
	    }

	    if (node.nodeType === 1/*Node.ELEMENT_NODE*/) {
	        if (this.namespaceURI != node.namespaceURI ||
	            this.prefix != node.prefix ||
	            this.localName != node.localName
	        ) {
	            return false;
	        }
	        for (i = 0, len = this.attributes.length; i < len; i++) {
	            var attr = this.attributes[length];
	            var nodeAttr = node.getAttributeNS(attr.namespaceURI, attr.localName);
	            if (nodeAttr === null || nodeAttr.value !== attr.value)
	                return false;
	        }
	    }

	    if (node.nodeType === 7/*Node.PROCESSING_INSTRUCTION_NODE*/) {
	        if (this.target !== node.target || this.data !== node.data)
	            return false;
	    }

	    if (node.nodeType === 3/*Node.TEXT_NODE*/ || node.nodeType === 8/*Node.COMMENT_NODE*/) {
	        if (this.data !== node.data)
	            return false;
	    }
	    if (node.childNodes.length !== this.childNodes.length)return false;

	    for (i = 0, len = node.childNodes.length; i < len; i++) {
	        var isEqual = node.childNodes[i].isEqualNode(this.childNodes[i]);
	        if (isEqual === false) {
	            return false;
	        }
	    }

	    return true;
	};
}
/*
http://www.alistapart.com/articles/crossbrowserscripting
*/
if(!_document.importNode) {
	_document.importNode = function(node, allChildren) {
		/* find the node type to import */
		switch (node.nodeType) {
			case 1://document.ELEMENT_NODE:
				var newNode = _document.createElement(node.nodeName),//create a new element
					attrs = node.attributes,
					attr,
					_childNodes,
					i,
					il;

				/* does the node have any attributes to add? */
				if (attrs && attrs.length > 0)
					/* add all of the attributes */
					for (i = 0, il = attrs.length ; i < il ;) {
						attr = node.attributes[i++];
						newNode.setAttribute(attr.nodeName, node.getAttribute(attr.nodeName));
					}
				/* are we going after children too, and does the node have any? */
				if (allChildren && (_childNodes = node.childNodes) && _childNodes.length > 0)
					/* recursively get all of the child nodes */
					for (i = 0, il = _childNodes.length; i < il;)
						newNode.appendChild(_document.importNode(_childNodes[i++], allChildren));
				return newNode;
			break;

			case 3://document.TEXT_NODE:
			case 4://document.CDATA_SECTION_NODE:
			case 8://document.COMMENT_NODE:
				return _document.createTextNode(node.nodeValue);
			break;
		}
		_throwDOMException("NOT_SUPPORTED_ERR");
		return null;
	};
	_document.importNode["shim"] = true;
}

_tmp_ = 'compareDocumentPosition';
if(!(_tmp_ in _document)) {
	var __name,
		__n1 = __name || 'DOCUMENT_POSITION_';//Use '__name || ' only for GCC not to inline __n1 param. In this case __name MUST be undefined
	_document_documentElement[_tmp_] = _document[_tmp_] = _Node_prototype[_tmp_] = function(b) {
		var a = this;

		//compareDocumentPosition from http://ejohn.org/blog/comparing-document-position/
		return a.contains ?
				(a != b && a.contains(b) && 16) +
				(a != b && b.contains(a) && 8) +
				(a["sourceIndex"] >= 0 && b["sourceIndex"] >= 0 ?
					(a["sourceIndex"] < b["sourceIndex"] && 4) +
					(a["sourceIndex"] > b["sourceIndex"] && 2) :
				1) +
			0 : 0;
	};
	__name = 'DISCONNECTED';
	_document_documentElement[__n1 + __name] = _document[__n1 + __name] = _Node_prototype[__n1 + __name] = 0x01;
	__name = 'PRECEDING';
	_document_documentElement[__n1 + __name] = _document[__n1 + __name] = _Node_prototype[__n1 + __name] = 0x02;
	__name = 'FOLLOWING';
	_document_documentElement[__n1 + __name] = _document[__n1 + __name] = _Node_prototype[__n1 + __name] = 0x04;
	__name = 'CONTAINS';
	_document_documentElement[__n1 + __name] = _document[__n1 + __name] = _Node_prototype[__n1 + __name] = 0x08;
	__name = 'CONTAINED_BY';
	_document_documentElement[__n1 + __name] = _document[__n1 + __name] = _Node_prototype[__n1 + __name] = 0x10;
}

if( !global.getComputedStyle ) {//IE < 9
	/**
	 * @link https://developer.mozilla.org/en/DOM/window.getComputedStyle
	 * getCurrentStyle - ??????? ?????????? ??????? ????? ????????
	 * @param {?Node} element HTML-???????
	 * @param {?string} pseudoElt A string specifying the pseudo-element to match. Must be null (or not specified) for regular elements.
	 * @this {Window}
	 * @return {CSSStyleDeclaration} ????? ????????
	 */
	global.getComputedStyle = function(element, pseudoElt) {
        var _currentStyle = element.currentStyle || element.runtimeStyle;
		if( !("getPropertyValue" in _currentStyle) ) {
			element.runtimeStyle.getPropertyValue = _fastUnsafe_Function_bind_.call(_CSSStyleDeclaration_prototype_methods["getPropertyValue"], element);

			element.runtimeStyle.setProperty = element.runtimeStyle.removeProperty = global.getComputedStyle._fake_removeProperty;

			element.runtimeStyle.getPropertyPriority = global.getComputedStyle._fake_getPropertyPriority;

			element.runtimeStyle.item = _CSSStyleDeclaration_prototype_methods["item"];
		}

		var propDescription
			, _CSSStyleDeclProt
			, tmp
		;

		if( (_CSSStyleDeclProt = global["CSSStyleDeclaration"])
			&& (_CSSStyleDeclProt = _CSSStyleDeclProt.prototype)
			&& (!("float" in _currentStyle) || !("opacity" in _currentStyle))
		) {
			if( !("float" in _currentStyle) ) {//TODO:: testing
				propDescription = Object.getOwnPropertyDescriptor(_CSSStyleDeclProt, "float");
				if( propDescription ) {
					delete _CSSStyleDeclProt["float"];
				}
				tmp = _fastUnsafe_Function_bind_.call(global.getComputedStyle._getCurrentFloatValue, element);
				Object.defineProperty(element.runtimeStyle, "float", {
					"value" : {
						valueOf : tmp
						, toString: tmp
					}
					, "configurable": true
					, "writable": true
				});
				if( propDescription ) {
					Object.defineProperty(_CSSStyleDeclProt, "float", propDescription);
				}
			}

			if( !("opacity" in _currentStyle) ) {//TODO:: testing
				propDescription = Object.getOwnPropertyDescriptor(_CSSStyleDeclProt, "opacity");
				if( propDescription && "opacity" in _CSSStyleDeclProt ) {
					delete _CSSStyleDeclProt["opacity"];
				}
				tmp = _fastUnsafe_Function_bind_.call(global.getComputedStyle._getCurrentOpacityValue, element);
				Object.defineProperty(element.runtimeStyle, "opacity", {
					"value" : {
						valueOf : tmp
						, toString: tmp
					}
					, "configurable": true
					, "writable": true
				});
				if( propDescription ) {
					Object.defineProperty(_CSSStyleDeclProt, "opacity", propDescription);
				}
			}
		}
		else {
			if( !("float" in _currentStyle) ) {
				tmp = _fastUnsafe_Function_bind_.call(global.getComputedStyle._getCurrentFloatValue, element);
				element.runtimeStyle["float"] = {
					valueOf : tmp
					, toString: tmp
				}
			}
			if( !("opacity" in _currentStyle) ) {
				tmp = _fastUnsafe_Function_bind_.call(global.getComputedStyle._getCurrentOpacityValue, element);
				element.runtimeStyle["opacity"] = {
					valueOf : tmp
					, toString: tmp
				}
			}
		}

		tmp = propDescription = _CSSStyleDeclProt = null;

		return element.currentStyle;
	};
	global.getComputedStyle._getCurrentOpacityValue = function() {
		return this["runtimeStyle"]["msOpacity"] || this["style"]["msOpacity"] || style_getOpacityFromMSFilter.call(this["style"]) || style_getOpacityFromMSFilter.call(this["runtimeStyle"]);
	};
	global.getComputedStyle._getCurrentFloatValue = function(){
		return this["runtimeStyle"]["styleFloat"] || this["style"]["styleFloat"];
	};
	global.getComputedStyle._fake_removeProperty = function() {
		_throwDOMException("NO_MODIFICATION_ALLOWED_ERR");
	};
	global.getComputedStyle._fake_getPropertyPriority = function(propertyName) {
		//TODO: tests
		return "";
	};
}

//HTML5 shiv for IE < 9
_document.createDocumentFragment = function() {
	var df = _Function_call_.call(_document_createDocumentFragment, this);

	if(global["DocumentFragment"] === global["Document"]) {
		//TODO:: if DocumentFragment is a fake DocumentFragment -> append each instance with Document methods
		_append(df, global["DocumentFragment"].prototype);//TODO: tests
	}

	return html5_document(df);
};

if(__GCC__INCLUDE_DOMPARSER_SHIM__) {
	if(!("DOMParser" in global)) {
		(function(global){
			var _DOMParser = global["DOMParser"] = function(){};

			function prepareTextForIFrame(text) {
				return text
					.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')//remove script tags from HTML text
					//TODO:: not remove all <script (.*?)>, just <script>, <script type="text/javascript">, <script type="">, <script type="text/vbscript">. Due <script> can contains a template
					.replace(/"/g, '\\"')
				;
			}

			//http://stackoverflow.com/questions/4935664/how-to-create-a-new-htmldocument-in-ie
			_DOMParser.prototype["parseFromString"] = function(markup, type) {
				if(!type || type == "text/html" || /xml$/.test(type)) {
					markup = prepareTextForIFrame(markup);

					var iframe = _document.createElement('iframe');
					iframe.style.display = 'none';
					iframe.src = 'javascript:document.write("' + markup + '")';
					_document.body.appendChild(iframe);
					newHTMLDocument = iframe.contentDocument || iframe.contentWindow.document;

					newHTMLDocument["__destroy__"] = _fastUnsafe_Function_bind_.call(function() {
						var _doc = this.contentWindow.document;
						_doc.documentElement.innerHTML = "";
						_doc["_"] = _doc.documentElement["_"] = null;
						/*TODO:: filter build-in properties suche as "URL", "location", etc
						 Object.keys(_doc).forEach(function(key){
						 try{
						 _doc[key] = null;
						 }
						 catch(e){}
						 })
						 */
						_document.body.removeChild(this);
					}, iframe);

					markup = iframe = null;

					//TODO::
					//shimDocument(newHTMLDocument);
					newHTMLDocument.querySelector = _document.querySelector;
					newHTMLDocument.querySelectorAll = _document.querySelectorAll;

					if( _document["find"] )newHTMLDocument["find"] = _document["find"];
					if( _document["findAll"] )newHTMLDocument["findAll"] = _document["findAll"];

					return newHTMLDocument;
				}
				else {
					//Not supported
					return null;
				}
			}
		})(global);
	}
}



/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  HTML5 shiv  ==================================  */
/*  =======================================================================================  */

supportsUnknownElements = ((_testElement.innerHTML = '<x-x></x-x>'), _testElement.childNodes.length === 1 && _testElement.childNodes[0].nodeType === 1);

html5_elements = "|" + html5_elements + "|";

function shivedCreateElement(nodeName) {
	var node = (this["__orig__createElement__"] || _document_createElement)(nodeName);// issue #3

	if(ielt9_elements.test(nodeName))return node;

	if(!~html5_elements.indexOf("|" + nodeName + "|")) {
		html5_elements_array.push(nodeName);
		html5_elements += (nodeName + "|");
		(safeFragment["__orig__createElement__"] || safeFragment.createElement/* || function(){}*/)(nodeName);
		//node.document.createElement(nodeName);
	}

	return safeFragment.appendChild(node);
}
shivedCreateElement["ielt9"] = true;

/** Making a document HTML5 element safe
 * ??????? "????????" ? IE < 9 HTML5 ????????
 * @param {Document} doc
 */
function html5_document(doc) { // pass in a document as an argument
	// create an array of elements IE does not support
	var a = -1;

	if(doc.createElement) {
		while (++a < html5_elements_array.length) { // loop through array
			doc.createElement(html5_elements_array[a]); // pass html5 element into createElement method on document
		}

		if(doc.createElement !== shivedCreateElement && !("ielt9" in doc.createElement)) {
			doc["__orig__createElement__"] = doc.createElement;
			doc.createElement = shivedCreateElement;
		}
	}

	return doc; // return document, great for safeDocumentFragment = html5_document(document.createDocumentFragment());
} // critique: array could exist outside the function for improved performance?

safeFragment = html5_document(_Function_call_.call(_document_createDocumentFragment, _document));

if(!supportsUnknownElements) {
	 html5_document(_document);
	 //style
	_document.head.insertAdjacentHTML("beforeend", "<br><style>" +//<br> need for all IE
		// corrects block display not defined in IE6/7/8/9
		"article,aside,figcaption,figure,footer,header,hgroup,nav,section,main{display:block}" +
		// adds styling not present in IE6/7/8/9
		"mark{background:#FF0;color:#000}" +
	"</style>");
}

//Test for broken 'cloneNode'
if(_Function_call_.call(_document_createElement, _document, "x-x").cloneNode().outerHTML.indexOf("<:x-x>") === 0) {
	safeElement = safeFragment.appendChild("createElement" in safeFragment && safeFragment.createElement("div") || safeFragment.ownerDocument.createElement("div"));
	_nativeCloneNode =
		_browser_msie === 8 ?
			_testElement["cloneNode"] :
			_browser_msie < 8 ?
				_Node_prototype["cloneNode"] : void 0;

	/**
	 * Issue: <HTML5_elements> become <:HTML5_elements> when element is cloneNode'd
	 * Solution: use an alternate cloneNode function, the default is broken and should not be used in IE anyway (for example: it should not clone events)
	 * ? Internet Explorer'? ??????? <HTMLElement>.cloneNode "??????" ???? HTML5 ??? ????????????,
	 *  ??????? ????? ???????????? ?????????????? ?????? ????????????
	 *
	 * ?????? ?? ????: http://pastie.org/935834
	 *
	 * ???????????? <Node>.cloneNode ? IE < 9
	 * @param {boolean=} include_all [false] ??????????? ?? ??? ???????? ????????? ??-?????????, false
	 * @this {Node} element ??????? ??? ????????????
	 * @version 4
	 */
	_Node_prototype["cloneNode"] = function(include_all) {//???????????? cloneElement ??? ????????????? ? ??? ?????? ????????
		var element = this,
			result,
			nodeBody;

		if(ielt9_elements.test(element.nodeName)) {//HTML4 element?
			result = _Function_call_.call(element["__nativeCloneNode__"] || _nativeCloneNode, element, include_all);
		}
		else {//HTML5 element?
			safeElement.innerHTML = "";//??????? ?? ?????????? ?????????

			// set HTML5-safe element's innerHTML as input element's outerHTML
			if(include_all)nodeBody = element.outerHTML;
			else nodeBody = element.outerHTML.replace(/<(\w+)([^>]*)>[\W\w]*$/, '<$1$2></$1>');//RegExp from http://www.jonathantneal.com/blog/a-close-shiv/

			safeElement.innerHTML = nodeBody.replace(/^\<\:/, "<").replace(/\<\/\:([\w\-]*\>)$/, "<$1");

			result = safeElement.firstChild; // return HTML5-safe element's first child, which is an outerHTML clone of the input element

			if(!result && !include_all) {//IE < 9 fail to create unknown tag
				//if(!result && include_all)->sinensy faild due can't write a solution
				nodeBody = nodeBody.match(RE_cloneElement_tagMatcher);
				if(nodeBody)nodeBody = nodeBody[1];
				if(nodeBody) {
					safeFragment.createElement(nodeBody);
					safeElement.innerHTML = nodeBody;
					result = safeElement.firstChild;
				}
			}
		}

		return safeFragment.appendChild(result);
	};

}


/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  HTML5 shiv  ======================================  */
/*  ======================================================================================  */


/*  ======================================================================================  */
/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  DOM  =======================================  */



_testElement = _txtTextElement = _tmp_ = function_tmp = nodeList_methods_fromArray = supportsUnknownElements = null;






if(!_Node_prototype["ie"] && _browser_msie > 7)return;
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */

//                                         IE lt 8

/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */







//CONFIG START
var /** @const*/
    __URL_TO_ELEMENT_BEHAVIOR__     = '/a.ielt8.htc'
	/** @const*/
  , __STYLE_ID                      = "ielt8_style_prev_for_behaviour"
	/** @const List of supporting tag names */
  , __SUPPORTED__TAG_NAMES__ = "*"

	/** @const*/
	, _Array_unshift = Array.prototype.unshift
;
//CONFIG END

var /** @type {boolean} */
	noDocumentReadyState = !document.readyState

	/** @const */
  , ieltbehaviorRules = [__URL_TO_ELEMENT_BEHAVIOR__]

  , ielt9BehaviorRule = "{behavior:"

  , __ielt8__wontfix = []

  , prevCreateElement

  , origCloneNode

  , __ielt8_Node_behavior_apply

	// ------------------------------ ==================  Window  ================== ------------------------------
  , _emulate_scrollX_scrollY

	/** @const */
  , originalScrollTo = global.scrollTo

	/** @const */
  , originalScrollBy = global.scrollBy

		// boolean attributes should return attribute name instead of true/false | From nwmatcher
	, ATTRIBUTES_BOOLEAN = {
		'checked': null,
		'disabled': null,
		'ismap': null,
		'multiple': null,
		'readonly': null,
		'selected': null
	}

;


_tmp_ = ieltbehaviorRules.length;
while(--_tmp_ >= 0)
	ielt9BehaviorRule += (" url(\"" + ieltbehaviorRules[_tmp_] + "\")");
ielt9BehaviorRule += "}";

function createBehaviorStyle(styleId, tags, behaviorRule) {
	var style = _document.getElementById(styleId)
		, add = ""
	;

	if(style){
		add = style.getAttribute("data-url") || "";
		style.id = "";
	}

	if(add) {
		behaviorRule.replace(" url(", " url(" + add + ") url(");
	}

	style = _document_createElement("style");
	style.id = styleId;
	style.type = 'text/css';
	style.setAttribute("data-url", behaviorRule.replace("{behavior:", "").replace(")}", ")"));
	style.styleSheet.cssText = tags + behaviorRule;
	_document.head.appendChild(style);
}

if(noDocumentReadyState)_document.readyState = "uninitialized";


_Node_prototype["ielt8"] = true;

global["__ielt8__wontfix"] = __ielt8__wontfix;

	// ------------------------------ ==================  querySelector  ================== ------------------------------
var
  /** @type {RegExp} @const */
  RE__getElementsByClassName = /\s*(\S+)\s*/g
  /** @type {string} @const */
  , STRING_FOR_RE__getElementsByClassName = '(?=(^|.*\\s)$1(\\s|$))'
  /** @type {RegExp} @const */
  , RE__selector__easySelector = /^([\w\-\|]+)?((?:\.(?:[\w-]+))+)?$|^#([\w-]+$)/
  /** @type {RegExp} @const */
  , RE__queryManySelector__doubleSpaces = /\s*([,>+~ ])\s*/g//Note: Use with "$1"
  /** @type {RegExp} @const */
  , RE__querySelector__arrtSpaceSeparated_toSafe = /\~\=/g//Note: Use with "@="
  /** @type {RegExp} @const */
  , RE__queryManySelector__selectorsMatcher = /(^[>+~ ]?|,|\>|\+|~| ).*?(?=[,>+~ ]|$)/g
  /** @type {RegExp} @const */
  , RE__querySelector__dottes = /\./g
  /** @type {RegExp} @const */
  , RE__queryOneSelector__spaces = /\s/g
  /** @type {RegExp} @const */
  , RE__queryOneSelector__selectorMatch = /^([,>+~ ])?([\|\*\w-]*)\#?([\w-]*)((?:\.?[\w-])*)(\[.+\])?(?:\:(.+))?$/
  /** @type {RegExp} @const */
  , RE__queryOneSelector__attrMatcher = /^\[?['"]?(.*?)['"]?(?:([\*~&\^\$\@!]?=)['"]?(.*?)['"]?)?\]?$/
  /** @type {RegExp} @const */
  , RE__queryOneSelector__pseudoMatcher = /^([^(]+)(?:\((.+)\))?$/ // regexpt /^([^(]+)(?:\(([^)]+)\))?$/ from jass 0.3.9 (http://yass.webo.in/) rev. 371 line 166 from right
  /** @type {RegExp} @const */
  , RE__queryOneSelector__pseudoNthChildPlus = /\-child\((\dn)\+(\d)\)/g//Note: Use with "-child\($1%$2\)"
  /** @type {RegExp} @const */
  , RE__queryOneSelector__pseudoNthChildMatcher = /(?:([-]?\d*)n)?(?:(%|-)(\d*))?//* regexpt from jass 0.3.9 (http://yass.webo.in/) rev. 371 line 181 ( mod === 'nth-last-child' ?...) */
  /** @type {RegExp} @const */
  , RE_matchSelector__isSimpleSelector = /([,>+~ ])/
  /** @type {Object} @const */
  , selectorCombinatorTypeMap = {
    "" : 1,
    " " : 1,
    "," : 1,
    ">" : 2,
    "~" : 3,
    "+" : 4
  }
  /** @type {Object} @const */
  , selectorAttrOperatorsMap = {
    "" : 1,
    '=' : 2,
    '&=' : 3,
    '^=' : 4,
    '$=' : 5,
    '*=' : 6,
    '|=' : 7,
    '!=' : 8,
    '@=' : 9//this is '~='
  }
  /** @type {Object} @const */
  , selectorPseudosMap = {
    'nth-child' : 0,
    'nth-last-child' : 1,
    'only-child' : 2,
    'first-child' : 3,
    'last-child' : 4,
    'root' : 5,
    'empty' : 6,
    'checked' : 7,
    'lang' : 8,
    'enabled' : 9,
    'disabled' : 10,
    'selected' : 11,
    'contains' : 12,
    'not' : 13,
    'matches' : 14,//:-moz-any, :-webkit-any
    'read-only' : 15,       //http://www.w3.org/TR/selectors4/#rw-pseudos
    'read-write' : 16      //http://www.w3.org/TR/selectors4/#rw-pseudos
    /*
    TODO::   http://css4-selectors.com/selector/css4/
    'scope' : 17,
    'dir' ???
    'nth-match'//nth-match(n of selector) | an E element, the n-th sibling matching selector
    'nth-last-match'//nth-last-match(n of selector) | an E element, the n-th sibling matching selector, counting from the last one
    'indeterminate' : 16,
    'default' : 17,
    'valid': 18,
    'invalid' : 19,
    'in-range' : 20,        //http://www.w3.org/TR/selectors4/#range-pseudos
    'out-of-range' : 20,    //http://www.w3.org/TR/selectors4/#range-pseudos
    'required' : 20,        //http://www.w3.org/TR/selectors4/#opt-pseudos
    'optional' : 20,        //http://www.w3.org/TR/selectors4/#opt-pseudos
    'column' : 20,          //http://www.w3.org/TR/selectors4/#column-pseudo
    'nth-column' :20,       //http://www.w3.org/TR/selectors4/#nth-column-pseudo
    'nth-last-column' : 20, //http://www.w3.org/TR/selectors4/#nth-last-column-pseudo
    'current' : 20,         //http://www.w3.org/TR/selectors4/#current-pseudo
    'past' : 20,            //http://www.w3.org/TR/selectors4/#past-pseudo
    'future' : 20           //http://www.w3.org/TR/selectors4/#future-pseudo
    */
  }
  /** @type {Object} @const */
  , urnAttributeGetFunction = function(node, attr) {
      return _Function_call_.call(node["__getAttribute__"] || node.getAttribute, node, attr, 2);
    }
  /** @type {Object} @const */
  , attributeSpecialSpecified = {"coords" : 1, "id" : 1, "name" : 1}

  , _NodeList_from = function(iterable) {
      var length = iterable.length >>> 0,
        result = [];//new _NodeList;

      for(var key = 0 ; key < length ; key++) {
        if(key in iterable)
          result.push(iterable[key]);
      }

      return result;
    }

  , getNextElement = function(node) {
		while((node = node.nextSibling) && node.nodeType != 1) {}
		return node;
	}
	, _getAttribute = function(node, attribute) {//Original from nwmatcher | Version for shimed IE < 8
		attribute = attribute.toLowerCase();
		var result;

		if( ATTRIBUTES_CUSTOM[attribute] !== void 0 ) {
			result = node[ATTRIBUTES_CUSTOM[attribute]];
		}
		else {
			result =
				// specific URI data attributes (parameter 2 to fix IE bug)
				ATTRIBUTES_FROM_NODE_VALUE[attribute] !== void 0 ?
					node["__getAttribute__"](attribute, 2)
					:
					// boolean attributes should return name instead of true/false
					ATTRIBUTES_BOOLEAN[attribute] !== void 0 ?
						node["__getAttribute__"](attribute) ? attribute : null
						:
						((node = node.getAttributeNode(attribute)) && node.value)
			;
		}

		return result;
	}
;

/*
(tmp = document_createElement("br")).id = "_" + Math.random();
_document_documentElement.appendChild(tmp);
try {
  _can_useGetElementsByName_as_getElementById = document.getElementsByName(uiid)[0].id === tmp.id;
}
catch(e) { }
finally {
  _document_documentElement.removeChild(tmp);
};*/


/**
 * @param {!string} selector CSS3-selector
 * @param {Node|Array.<Node>|Object} roots
 * @param {Array.<Node>} globalResult
 * @param {boolean} globalResultAsSparseArray
 * @param {Node|Array.<HTMLElement>=} preResult
 * @param {boolean=} onlyOne only one need
 * {(Object|boolean)=} resultKeys
 * @return {Array.<Node>}
 */
function queryOneSelector(selector, roots, globalResult, globalResultAsSparseArray, preResult, onlyOne/*, resultKeys*/) {
  var /** @type {Array.<string>} */selectorArr = selector.match(RE__queryOneSelector__selectorMatch);
  //if(selector === "," || !selectorArr)_throwDOMException("SYNTAX_ERR");

  var result = globalResult || [];

  var /** @type {boolean} */isMatchesSelector = !!preResult
    , /** @type {Node} */root = isMatchesSelector && (roots = {}) || (!roots ? document :
                                "length" in roots && !("nodeType" in roots) && !("childNodes" in roots) ? //fast and unsafe isArrayLikeObject
                                  roots[0] :
                                  roots)
    , /** @type {Node} */nextRoot
    , /** @type {number} */rootIndex = 0
    , /** @type {(Node|undefined)} */child
    , /** @type {string} */child_nodeName
    , /** @type {number} */childrenIndex
    , /** @type {Node} */brother
    , /** @type {number} */combinatorType = selectorCombinatorTypeMap[selectorArr[1] || ""] || 0
    , /** @type {boolean} */combinatorTypeMoreThen_2 = combinatorType > 2
    , /** @type {(string|undefined)} */tag = selectorArr[2]
    , /** @type {boolean} */needCheck_tag = !!tag
    , /** @type {(string|undefined)} */id = selectorArr[3]
    , /** @type {boolean} */needCheck_id = !!id
    , /** @type {(string|Array.<string>|undefined)} */classes = selectorArr[4]
    , /** @type {boolean} */needCheck_classes = !!classes
    , /** @type {boolean} */needCheck_nodeType = tag === "*"
    , /** @type {number} */kr
    , /** @type {number} */indexIn_resultKeys
    , /** @type {boolean} */match
    , /** @type {boolean} */canWeReturnUnsafeArray
    , /** @type {Array.<string>} */css3Attr_add
    , /** @type {Array.<string>} */css3Pseudo_add
    , /** @type {number} */css3PseudoOperatorType
    , /** @type {string} */nodeAttrCurrent_value
    , /** @type {string} */nodeAttrExpected_value
    , /** @type {(RegExp|string)} */klas
    , /** @type {(string|Array.<string>)} */ css3Attr
    , /** @type {(string|Array.<string>)} */ css3Pseudo
    , /** @type {Array} */elementsById_Cache
    , a, b, c, u
    , A, B, C
  ;

  if(needCheck_tag) {
    tag = (needCheck_nodeType ? void 0 : tag.replace("|", ":").toUpperCase());
  }

  if(needCheck_classes) {
    classes = classes.replace(RE__querySelector__dottes, " ");
    klas = new RegExp(classes.replace(RE__getElementsByClassName, STRING_FOR_RE__getElementsByClassName));
  }

  if(css3Attr = selectorArr[5]) {
    css3Attr = _String_split_.call(css3Attr, "][");
    kr = -1;
    while(css3Attr_add = css3Attr[++kr]) {
      css3Attr_add = css3Attr[kr] = css3Attr_add.match(RE__queryOneSelector__attrMatcher);

      //selectorAttrOperatorsMap

      css3Attr_add[2] = selectorAttrOperatorsMap[css3Attr_add[2]];

      b = css3Attr_add[3];
      if(b) {
	      if(b.substr(-2) == " i") {
	        //http://css4-selectors.com/selector/css4/attribute-case-sensitivity/
	        b = b.substr(0, b.length - 2);
	        css3Attr_add[4] = true;
	      }
	      }
	  }
    b = void 0;
  }

  if(css3Pseudo = selectorArr[6]) {
    css3Pseudo = css3Pseudo.match(RE__queryOneSelector__pseudoMatcher);
    css3PseudoOperatorType = selectorPseudosMap[css3Pseudo[1]];
    if(css3PseudoOperatorType < 2 && css3Pseudo[2]) {// 'nth-child':0 and 'nth-last-child':1
      if(!/\D/.test(css3Pseudo[2]))css3Pseudo_add = [null, 0, '%', css3Pseudo[2]];
      else if(css3Pseudo[2] === 'even')css3Pseudo_add = [null, 2];
      else if(css3Pseudo[2] === 'odd')css3Pseudo_add = [null, 2, '%', 1];
      else css3Pseudo_add = css3Pseudo[2].match(RE__queryOneSelector__pseudoNthChildMatcher);
      A = css3PseudoOperatorType ? "nodeIndexLast" : "nodeIndex";
      B = css3PseudoOperatorType ? "lastChild" : "firstChild";
      C = css3PseudoOperatorType ? "previousSibling" : "nextSibling";
    }
  }


  if(isMatchesSelector)combinatorType = 0;
  selectorArr = selector = null;

  //prepear
  if(combinatorType == 1) {
    if(!needCheck_id) {
	  if(!tag) {
		tag = "*";
		needCheck_nodeType = !needCheck_classes;
	  }
      needCheck_tag = false;
    }
    else {
        preResult = _document.getElementsByName(id);
        elementsById_Cache = [];
        kr = -1;
        while(child = preResult[++kr]) {
          if(child.id == id) {
            elementsById_Cache.push(child);
          }
        }

      preResult = needCheck_id = needCheck_tag = null;
    }
  }

  canWeReturnUnsafeArray = (!("length" in roots) || roots.length === 1) && !globalResultAsSparseArray && !css3Attr && !css3Pseudo && !needCheck_tag && !needCheck_classes && !needCheck_id;

  do {
    switch(combinatorType) {
      case 0://matchesSelector
        child = preResult[0];
      break;
      case 1://" " or ""
        //if("all" in root && !root.all.length)continue;
        if(!id) {//tagName or/and class
          if(tag === "BODY" && root.nodeType === 9) {
            preResult = [root.body];
            needCheck_classes = !!classes;
            canWeReturnUnsafeArray = canWeReturnUnsafeArray && !needCheck_classes;
          }
          else {
            preResult = root.getElementsByTagName(tag);
          }
        }
        else {//id
          preResult = [];
          if(elementsById_Cache.length) {
            kr = -1;
            while(child = elementsById_Cache[++kr]) {
              if(root === _document || root.contains(child)){
                preResult.push(child);
                elementsById_Cache.splice(kr--, 1);
              }
            }
          }
          else return result;
        }
        child = preResult[0];
      break;
      case 2://">" W3C: "an F element preceded by an E element"
        preResult = root.children;
        child = preResult[0];
      break;
      case 3://"~" W3C: "an F element preceded by an E element"
        nextRoot = roots[rootIndex + 1];
      case 4://"+"
        if(!(child = getNextElement(root)))continue;
    }

    if(canWeReturnUnsafeArray)return preResult;

    childrenIndex = 0;

    if(child) do {
        if((!needCheck_nodeType || child.nodeType === 1) && !(globalResultAsSparseArray && (indexIn_resultKeys = child["sourceIndex"]) in globalResult)) {
          if(match = !(needCheck_tag && (child_nodeName = child.nodeName.toUpperCase()) !== tag || needCheck_id && child.id !== id || needCheck_classes && !(child.className && klas.test(child.className)))) {
            if(css3Attr) {
              kr = -1;
              u = child.attributes;

              while(
				  match
					  && (css3Attr_add = css3Attr[++kr])
				  ) {

				// Save attribute check operator in a temporary variable
                a = css3Attr_add[2];
				//current_AttrCheckObject[1] is an attribute name
				nodeAttrCurrent_value = _getAttribute(child, css3Attr_add[1]);

                if(nodeAttrCurrent_value === null) {
                  if(!(match = a == 8))
                  match = false;
                  continue;
                }

				if(css3Attr_add[4]) {//Attribute case-sensitivity
					nodeAttrCurrent_value = nodeAttrCurrent_value.toUpperCase();
				}

                nodeAttrExpected_value = css3Attr_add[3];

                /* function calls for CSS2/3 attributes selectors */
                switch(a) {
                  /* W3C "an E element with a "nodeAttrCurrent_value" attribute" */
                  case 1://css3Attr[2] == ''
                    match = !!nodeAttrCurrent_value || nodeAttrCurrent_value === "";
                  break;

                  /*
                  W3C "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value is
                  exactly equal to "nodeAttrExpected_value"
                  */
                  case 2://'='
                    match = /*nodeAttrCurrent_value && */nodeAttrCurrent_value === nodeAttrExpected_value;
                  break;

                  /*
                  from w3.prg "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value is
                  a list of space-separated nodeAttrExpected_value's, one of which is exactly
                  equal to "nodeAttrExpected_value"
                  */
                  case 3://'&='
                  /* nodeAttrCurrent_value doesn't contain given nodeAttrExpected_value */
                  case 8://'!='
                    match = /*nodeAttrCurrent_value && */(new RegExp('(^| +)' + nodeAttrExpected_value + '($| +)').test(nodeAttrCurrent_value));
                    if(a == 8)match = !match;
                  break;

                  /*
                  from w3.prg "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value
                  begins exactly with the string "nodeAttrExpected_value"
                  */
                  case 4://'^='
                  /*
                  W3C "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value
                  ends exactly with the string "nodeAttrExpected_value"
                  */
                  case 5://'$='
                  /*
                  W3C "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value
                  contains the substring "nodeAttrExpected_value"
                  */
                  case 6://'*='
                    b = nodeAttrCurrent_value.indexOf(nodeAttrExpected_value);
                    match = a === 6 ? ~b : a === 5 ? (b == nodeAttrCurrent_value.length - nodeAttrExpected_value.length) : !b;
                  break;

                  /*
                  W3C "an E element whose "nodeAttrCurrent_value" attribute has
                  a hyphen-separated list of nodeAttrExpected_value's beginning (from the
                  left) with "nodeAttrExpected_value"
                  */
                  case 7://'|='
                    match = (/*nodeAttrCurrent_value && */(nodeAttrCurrent_value === nodeAttrExpected_value || !!~nodeAttrCurrent_value.indexOf(nodeAttrExpected_value + '-')));
                  break;

                  case 9://'~='
                    match = /*nodeAttrCurrent_value && */!!~(" " + nodeAttrCurrent_value.replace(RE__queryOneSelector__spaces, " ") + " ").indexOf(" " + nodeAttrExpected_value + " ");
                  break;
                }
              }
            }

            if(match && css3Pseudo) {
              /*
              function calls for CSS2/3 modificatos. Specification taken from
              http://www.w3.org/TR/2005/WD-css3-selectors-20051215/
              on success return negative result.
              */
              switch(css3PseudoOperatorType) {
                /* W3C: "an E element, the n-th child of its parent" */
                case 0://'nth-child':
                /* W3C: "an E element, the n-th rs of its parent, counting from the last one" */
                case 1://'nth-last-child':
                  if(!css3Pseudo_add[1] && !css3Pseudo_add[3])break;
                  c = child[A] || 0;
                  a = css3Pseudo_add[3] ? (css3Pseudo_add[2] === '%' ? -1 : 1) * css3Pseudo_add[3] : 0;
                  b = css3Pseudo_add[1];
                  if (c) {//check if we have already looked into siblings, using exando - very bad
                    match = !b ? !(c + a) : !((c + a) % b);
                  }
                  else {//in the other case just reverse logic for n and loop siblings
                    match = false;
                    brother = child.parentNode[B];
                    //c++;
                    do {//looping in rs to find if nth expression is correct
                      //nodeIndex expando used from Peppy / Sizzle/ jQuery
                      if (brother.nodeType == 1 &&
                        (brother[A] = ++c) &&
                        child === brother &&
                        (!b ? !(c + a) : !((c + a) % b))) {
                        match = true;
                      }
                    } while (!match && (brother = brother[C]));
                  }
                break;

                /* W3C: "an E element, only child of its parent" */
                case 2://'only-child':
                /* implementation was taken from jQuery.1.7 */
                /* W3C: "an E element, first rs of its parent" */
                case 3://'first-child':
                /* implementation was taken from jQuery.1.7 */
                  brother = child;
                  while ((brother = brother.previousSibling) && brother.nodeType !== 1) {}
                /* Check for node's existence */
                  match = !brother;

                  if(!match || css3PseudoOperatorType == 3)break;
                /* W3C: "an E element, last rs of its parent" */
                case 4://'last-child'://In this block we lose "rs" value
                /* Check for node's existence */
                  match = !getNextElement(child);
                break;

                /* W3C: "an E element, root of the document" */
                case 5://'root':
                  match = (child_nodeName || child.nodeName.toUpperCase()) == "HTML";
                break;
                /*
                Rrom w3.org: "an E element that has no rsren (including text nodes)".
                Thx to John, from Sizzle, 2008-12-05, line 416
                */
                case 6://'empty':
                  match = !child.firstChild;
                  /*
                  var n, i;
                  for (i = 0;
                  (n = e.childNodes[i]); i++) {
                    if (n.nodeType == 1 || n.nodeType == 3) return false
                  }
                  return true
                  */
                break;
                /*
                W3C: "a user interface element E which is checked
                (for instance a radio-button or checkbox)"
                */
                case 7://'checked':
                  match = !!child.checked;
                break;
                /*
                W3C: "an element of type E in language "fr"
                (the document language specifies how language is determined)"
                */
                case 8://'lang':
                  match = (child.lang == css3Pseudo_add || _document_documentElement.lang == css3Pseudo_add);
                break;

                case 9://'enabled':
                case 10://'disabled':
                  match = ("disabled" in child && "form" in child/*filter only form elements TODO::check it*/) && (css3PseudoOperatorType == 10 ? child.disabled === true && child.type !== 'hidden' : child.disabled === false);
                break;

                /* thx to John, from Sizzle, 2008-12-05, line 407 */
                case 11://'selected':
                // Accessing this property makes selected-by-default options in Safari work properly.
                  match = child.parentNode.selectedIndex && !!child.selected;//??? ??? Closure Compiler ?? ??????? ?????? ?????
                break;

                case 12://'contains':
                  match = !!~(child.textContent || child.data || child.innerText || child.nodeValue || child.value || "").indexOf(css3Pseudo[2]);
                break;

                case 13://'not':
                case 14://'matches':
                  match = _matchesSelector.call(child, css3Pseudo[2]);
                  if(css3PseudoOperatorType == 13)match = !match;
                break;

                case 15://'read-only':
                case 16://'read-write':
                  child_nodeName || (child_nodeName = child.nodeName.toUpperCase());
                  match = (child_nodeName == "INPUT" || child_nodeName == "TEXTAREA" || _Function_call_.call(child, child["__getAttribute__"] || child.getAttribute, "contenteditable") !== null) && !child.readonly;
                  if(css3PseudoOperatorType == 16)match = !match;
                break;
                /*TODO::
                default:
                  //Non-standart pseudo-classes
                  var f = $$N.nonStandartPseudoClasses[css3Pseudo[1]];
                  if(f)match = f(child);*/
              }
            }
          }

          if(match) {
            if(onlyOne)return [child];

            if(globalResultAsSparseArray) {
              result[indexIn_resultKeys] = child;
            }
            else {
              result.push(child);
            }
          }

          child_nodeName = void 0;
    }
  }
    while( child = combinatorTypeMoreThen_2 ? (combinatorType === 4 ? void 0 : child === nextRoot ? void 0 : getNextElement(child) ) : preResult[ ++childrenIndex ] );

    child = void 0;
  }
  while(root = roots[++rootIndex]);

	root = roots = preResult = child = globalResult = null;//clean

  return result;
}


/**
 * @param {!string} selector CSS3-selector
 * @param {boolean=} onlyOne only one need
 * @param {(Node|Array.<Node>)=} root
 * @this {Document|HTMLElement|Node} root
 * @return {Array.<HTMLElement>}
 * @version 4.0
 */
function queryManySelector(selector, onlyOne, root) {
  root || (root = this);

  selector = _String_trim_.call(selector.replace(RE__queryManySelector__doubleSpaces, "$1"));

  var result = []
      , rule
      , i = -1
      , selElements
      , nextRule
      , lastRule
      , firstRule = true
      , fail = false
      , need_SparseArray
      , nodeSortingNeeds
      , forseNo_need_SparseArray = !!_document.querySelector["__noorder__"] || !!_document.querySelectorAll["__noorder__"]
      , rules = selector
          .replace(RE__querySelector__arrtSpaceSeparated_toSafe, "@=")
          .replace(RE__queryOneSelector__pseudoNthChildPlus, "-child\\($1%$2\\)")
          .match(RE__queryManySelector__selectorsMatcher)
      , parsedRule
  ;

  selElements = root;

  while(rule = rules.shift()) {
    nextRule = rules[0];
    lastRule = !nextRule || nextRule.charAt(0) === ',';

    //if(nextRule && nextRule.length > 1 && !resultKeys)resultKeys = {};

    if(!fail) {
      if(firstRule && ("nodeType" in root) && root.nodeType === 9 && rule.toUpperCase() === "BODY") {
        //"Boris Zbarsky <bzbarsky@MIT.EDU>": Mapping selector == "body" to document.body. This isn't a valid optimization for querySelector, since there can in fact be multiple <body> tags and since furthermore document.body can be a <frameset>. A UA could try to optimize this case by keeping track of the <body> tags and such, at some cost on every DOM mutation.
        selElements = [root.body];
        lastRule ? (result = selElements) : result.concat(selElements);
      }
      else if(firstRule && rule === ":root") {
        selElements = [_document_documentElement];
        lastRule && (result = selElements);
      }
      else if(selElements && (!(root = selElements) || selElements.length === 0)) {//No result in previous rule -> Nothing to do
        selElements = null;
        fail = true;
      }
      else {//CSS3 selector
        if(need_SparseArray = !!(lastRule && (nodeSortingNeeds || nextRule || root.length > 1)))nodeSortingNeeds = true;
        selElements = queryOneSelector(rule, root, lastRule ? result : [], need_SparseArray, null, onlyOne && lastRule/*, lastRule && resultKeys || !firstRule && root.length > 1 && {}*/);
      }
    }

    //If last rule in this selector
    if(firstRule = lastRule) {
      if(!result.length && selElements) {
        nodeSortingNeeds = false;
        result = _NodeList_from(selElements);
      }
      selElements = null;
      root = this;
      fail = false;
    }

    if(!nextRule || nextRule === ",")break;
  }

  return nodeSortingNeeds ?
    _NodeList_from(result) :
    result;
};

/**
 * @param {!string} selector
 * @this {HTMLElement}
 * @return {boolean}
 */
function _matchesSelector(selector) {
  if(!selector)return false;
  if(selector === "*")return true;
  if(this === _document_documentElement && selector === ":root")return true;
  if(this === _document.body && selector.toUpperCase() === "BODY")return true;

  //selector = _String_trim_.call(selector.replace(RE__queryManySelector__doubleSpaces, "$1"));

  var thisObj = this,
    isSimpleSelector,
    tmp,
    match = false,
    i;

  selector = _String_trim_.call(selector);

  if(isSimpleSelector = selector.match(RE__selector__easySelector)) {
    switch (selector.charAt(0)) {
      case '#':
        return thisObj.id === selector.slice(1);
      break;
      default:
        match = !(tmp = isSimpleSelector[2]) || thisObj.className && (new RegExp(tmp.replace(RE__querySelector__dottes, " ").replace(RE__getElementsByClassName, STRING_FOR_RE__getElementsByClassName))).test(thisObj.className);
        return match && !(tmp = isSimpleSelector[1]) || (thisObj.tagName && thisObj.tagName.toUpperCase() === tmp.toUpperCase());
      break;
    }
  }
  else if(!RE_matchSelector__isSimpleSelector.test(selector)) {//easy selector
    tmp = queryOneSelector(selector, null, false, null, [thisObj], true);

    return tmp[0] === thisObj;
  }
  else {
    tmp = queryManySelector.call(thisObj.ownerDocument, selector);

    for ( i in tmp ) if(_hasOwnProperty(tmp, i)) {
          match = tmp[i] === thisObj;
          if(match)return true;
      }
      return false;
  }
}

//SHIM export
_tmp_ = "matchesSelector";
if(!_document_documentElement[_tmp_]) {
	_Element_prototype[_tmp_] = _document_documentElement[_tmp_] = _matchesSelector;
}
_tmp_ = "matches";
if(!_document_documentElement[_tmp_]) {
	_Element_prototype[_tmp_] = _document_documentElement[_tmp_] = _matchesSelector;
}

_tmp_ = "querySelectorAll";
if(!_document[_tmp_]) {
	/**
	* @param {!string} selector
	* @param {(Node|Array.<Node>)=} nodesRef
	* @this {Document|Node}
	* @return {Array.<Node>}
	*/
	_Element_prototype[_tmp_] = _document_documentElement[_tmp_] = _document[_tmp_] = function(selector, nodesRef) {
		return queryManySelector.call(this, selector, false, nodesRef);
	}
}

_tmp_ = "querySelector";
if(!_document[_tmp_]) {
	/**
	* @param {!string} selector
	* @param {(Node|Array.<Node>)=} nodesRef
	* @this {Document|Node}
	* @return {Node}
	*/
	_Element_prototype[_tmp_] = _document_documentElement[_tmp_] = _document[_tmp_] = function(selector, nodesRef) {
		return queryManySelector.call(this, selector, true, nodesRef)[0] || null;
	}
}

_tmp_ = "getElementsByClassName";
if(!_document[_tmp_]) {
	//getElementsByClassName shim
	//based on https://gist.github.com/1383091
	_Element_prototype[_tmp_] = _document_documentElement[_tmp_] = _document[_tmp_] = function(klas) {
		klas = new RegExp(klas.replace(RE__getElementsByClassName, STRING_FOR_RE__getElementsByClassName));

		var nodes = this.all,
			node,
			i = -1,
			result = [];

		while(node = nodes[++i]) {
			if(node.className && klas.test(node.className)) {
				result.push(node);
			}
		}

		return result;
	};
}
//SHIM export

ATTRIBUTES_DEFAULT_MAP.elementsToCheck = {};
ATTRIBUTES_DEFAULT_MAP.checkIfAttributeDefault = function(node, attrName) {
	if(attrName in this) {
		return true;
	}

	var nodeName = node.nodeName;
	if(!(node = ATTRIBUTES_DEFAULT_MAP.elementsToCheck[nodeName])) {
		node = ATTRIBUTES_DEFAULT_MAP.elementsToCheck[nodeName] = _document_createElement(nodeName);
	}

	return this[attrName] = (node.getAttribute(attrName) !== null);
};

_Element_prototype.setAttribute = function(name, val, flag) {
	if(flag == void 0) {
		var lowerName = name.toLowerCase();

		flag = 1;

		if( lowerName in ATTRIBUTES_SPECIAL_MAP ) {
			return ATTRIBUTES_SPECIAL_MAP[lowerName]["set"].call(this, val);
		}

		if(ATTRIBUTES_CUSTOM[lowerName] !== void 0) {
			name = ATTRIBUTES_CUSTOM[lowerName];
		}
		else if(ATTRIBUTES_FROM_NODE_VALUE[lowerName] !== void 0) {
			flag = 2;
		}
		else if(lowerName.indexOf("-") === -1 && !ATTRIBUTES_DEFAULT_MAP.checkIfAttributeDefault(this, lowerName)) {
			name = name.toUpperCase();
		}

		val = val + "";
	}

	return _Function_call_.call(this["__setAttribute__"], this, name, val, flag);
};
_Element_prototype.getAttribute = function(name, flag) {
	var upperName
		, lowerName = name.toLowerCase()
        , result
        , needAttributeShim
	;

	if(needAttributeShim = (flag == void 0)) {
		flag = 1;
	}

	if( (result = ATTRIBUTES_SPECIAL_MAP[lowerName]) !== void 0 ) {
		return result["get"].call(this);
	}

	if(ATTRIBUTES_FROM_NODE_VALUE[lowerName] !== void 0) {
		return _Function_call_.call(this["__getAttribute__"], this, name, 2);
	}

	if(ATTRIBUTES_CUSTOM[lowerName] !== void 0) {
		upperName = ATTRIBUTES_CUSTOM[lowerName];
	}
	else if(lowerName.indexOf("-") === -1 && !ATTRIBUTES_DEFAULT_MAP.checkIfAttributeDefault(this, lowerName)) {
		upperName = name.toUpperCase();
	}
	else {
		upperName = name;
	}

    result = _Function_call_.call(this["__getAttribute__"], this, upperName, flag);
	if(result !== null) {
        if(needAttributeShim)result += "";
    }
    else {
        if(!(upperName in this) && (typeof (result = this[name]) === "string")) {
            result = this[upperName] = this[name];
            this["__removeAttribute__"](name);
            result += "";
        }
        else result = null;
    }

	return result;
};
_Element_prototype.removeAttribute = function(name, flag) {
	var upperName
		, lowerName
    ;

	if(flag == void 0) {
		flag = 1;
		lowerName = name.toLowerCase();

		if( lowerName in ATTRIBUTES_SPECIAL_MAP ) {
			return ATTRIBUTES_SPECIAL_MAP[lowerName]["remove"].call(this);
		}

		if(ATTRIBUTES_CUSTOM[lowerName] !== void 0) {
			upperName = ATTRIBUTES_CUSTOM[lowerName];
		}
		else if(ATTRIBUTES_FROM_NODE_VALUE[lowerName] !== void 0) {
			flag = 2;
		}
		else if(lowerName.indexOf("-") === -1 && !ATTRIBUTES_DEFAULT_MAP.checkIfAttributeDefault(this, lowerName)) {
			upperName = name.toUpperCase();
		}
	}

	return _Function_call_.call(this["__removeAttribute__"], this, upperName || name, flag);
};

if(!_Node_prototype.hasAttribute)_Node_prototype.hasAttribute = function(name) {
	var lowerName = (name + "").toLowerCase();
	if( lowerName in ATTRIBUTES_SPECIAL_MAP ) {
		return ATTRIBUTES_SPECIAL_MAP[lowerName]["has"].call(this);
	}

	return this.getAttribute(name) !== null;
};

var _returnFirstParam = function(a) {
	return function() {
		return a
	}
};
_Node_prototype.g1 = _returnFirstParam(1);
_Node_prototype.g2 = _returnFirstParam(2);
_Node_prototype.g3 = _returnFirstParam(3);
_Node_prototype.g4 = _returnFirstParam(4);
//_Node_prototype.g5 = _returnFirstParam(5);// historical
//_Node_prototype.g6 = _returnFirstParam(6);// historical
_Node_prototype.g7 = _returnFirstParam(7);
_Node_prototype.g8 = _returnFirstParam(8);
_Node_prototype.g9 = _returnFirstParam(9);
_Node_prototype.g10 = _returnFirstParam(10);
_Node_prototype.g11 = _returnFirstParam(11);
//_Node_prototype.g12 = _returnFirstParam(12);// historical
_Node_prototype.g16 = _returnFirstParam(16);

_Node_prototype["__ielt8__element_init__"] = function __ielt8__element_init__() {
	var thisObj = this
	  , _
	;
	if(thisObj["element"])thisObj = thisObj["element"];//�_� only if the save `this` to local variable

	if(!("prepend" in thisObj)) {//DOM4 API
		thisObj["after"] = _Element_prototype["after"];
		thisObj["before"] = _Element_prototype["before"];
		thisObj["append"] = _Element_prototype["append"];
		thisObj["prepend"] = _Element_prototype["prepend"];
		thisObj["replace"] = _Element_prototype["replace"];
		thisObj["remove"] = _Element_prototype["remove"];
	}

	"isEqualNode" in thisObj || (thisObj.isEqualNode = _Node_prototype.isEqualNode);
	"compareDocumentPosition" in thisObj || (thisObj.compareDocumentPosition = _Node_prototype.compareDocumentPosition);
	"getElementsByClassName" in thisObj || (thisObj.getElementsByClassName = _Element_prototype.getElementsByClassName);

	"addEventListener" in thisObj || ((thisObj.addEventListener = global.addEventListener),
									  (thisObj.removeEventListener = global.removeEventListener),
									  (thisObj.dispatchEvent = global.dispatchEvent));


	"querySelector" in thisObj || ((thisObj.querySelectorAll = _Element_prototype.querySelectorAll),
								   (thisObj.querySelector = _Element_prototype.querySelector));

	"matchesSelector" in thisObj || (thisObj.matchesSelector = thisObj["matches"] = _matchesSelector);

	"hasAttribute" in thisObj || (thisObj.hasAttribute = _Element_prototype.hasAttribute);

	"setSelectionRange" in thisObj || (thisObj.setSelectionRange = _Element_prototype.setSelectionRange);

	/*TODO::
	if(!("getPropertyValue" in this.style)) {
		Object.keys(_CSSStyleDeclaration_prototype_methods).forEach(function(name) {
			this[name] = _CSSStyleDeclaration_prototype_methods[name];
		}, this.styl);
	}
	*/

	//Unsafe with "OBJECT" and "EMBED" tags
	try {
		if(this.setAttribute != _Element_prototype.setAttribute) {
			this["__setAttribute__"] = this.setAttribute;
			this["__getAttribute__"] = this.getAttribute;
			this["__removeAttribute__"] = this.removeAttribute;
			this.setAttribute = _Element_prototype.setAttribute;
			this.getAttribute = _Element_prototype.getAttribute;
			this.removeAttribute = _Element_prototype.removeAttribute;
		}

		if(thisObj.cloneNode !== _Node_prototype.cloneNode) {
			thisObj["__nativeCloneNode__"] = thisObj.cloneNode;
			thisObj.cloneNode = _Node_prototype.cloneNode;
		}
		if(_Node_prototype.contains)thisObj.contains = _Node_prototype.contains;
	}
	catch(e) {
		//console.error(e.message)
		__ielt8__wontfix.push(thisObj);
	}
};


__ielt8_Node_behavior_apply = _Node_prototype["__ielt8_Node_behavior_apply"] = function (el) {
	_tmp_ = ieltbehaviorRules.length;

	while(--_tmp_ >= 0) try {
		el.addBehavior(ieltbehaviorRules[_tmp_]);
	}
	catch(e) {}
};

//If we already oweride cloneNode -> safe it
origCloneNode = _Node_prototype["cloneNode"];
_Node_prototype["cloneNode"] = function(deep) {
	var el = _Function_call_.call(origCloneNode || this["__nativeCloneNode__"], this, deep);

	__ielt8_Node_behavior_apply(el);

	return el;
};

/*  ======================================================================================  */
/*  ================================  es5-shim for IE < 8   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */
// ES5 15.4.4.12
// http://es5.github.com/#x15.4.4.13
// Return len+argCount.
// [bugfix, ielt8]
// IE < 8 bug: [].unshift(0) == undefined but should be "1"
if ([].unshift(0) != 1) {
	Array.prototype.unshift = function() {
		_Array_unshift.apply(this, arguments);
		return this.length;
	};
}
/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  es5-shim for IE < 8  ==================================  */
/*  ======================================================================================  */

/*  ======================================================================================  */
/*  ================================  Document  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */

prevCreateElement = _document.createElement;
_document.createElement = function(tagName) {

	var el = _Function_call_.call(prevCreateElement, _document, tagName);

	var _tmp_ = ieltbehaviorRules.length;
	while(--_tmp_ >= 0) try {
		el.addBehavior(ieltbehaviorRules[_tmp_])
	}
	catch(e) {}

	return el;
};


/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Document  ==================================  */
/*  ======================================================================================  */

/*  =======================================================================================  */
/*  ======================================  Network  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */

if(!global.XMLHttpRequest)global.XMLHttpRequest = function() {
	//TODO:: http://code.jquery.com/jquery-1.7.2.js:8138// #5280: Internet Explorer will keep connections alive if we don't abort on unload http://bugs.jquery.com/ticket/5280
	//TODO:: http://code.jquery.com/jquery-1.7.2.js:7587// Add protocol if not provided (#5866: IE7 issue with protocol-less urls) http://bugs.jquery.com/ticket/5866
	//TODO:: full XMLHttpRequest shim
	var xhr;
	try {
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (ex) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var _xhr_send = xhr.send;

	xhr.send = function() {
		//Fixes IE Caching problem
        this.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");//TODO:: tests
        _xhr_send.apply(this, arguments);
	}
};

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Network  ======================================  */
/*  =======================================================================================  */


/*  ======================================================================================  */
/*  ======================================  Window  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */


if(!("pageXOffset" in global) && global.attachEvent) {
	global.pageXOffset = global.pageYOffset = 0;
	_emulate_scrollX_scrollY = _document.compatMode === "CSS1Compat" ?
			function() { global.scrollX = global.pageXOffset = _document.body.parentNode.scrollLeft; global.scrollY = global.pageYOffset = _document.body.parentNode.scrollTop }
			:
			function() { global.scrollX = global.pageXOffset = _document.body.scrollLeft; global.scrollY = global.pageYOffset = _document.body.scrollTop };

	global.attachEvent("onscroll", _emulate_scrollX_scrollY);

	global.scroll = global.scrollTo = function(x, y) {
		originalScrollTo(x, y);
		_emulate_scrollX_scrollY();
	};
	global.scrollBy = function(x, y) {
		originalScrollBy(x, y);
		_emulate_scrollX_scrollY();
	};
}

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Window  ======================================  */
/*  ======================================================================================  */




function _DOMContentLoaded() {
	_document.removeEventListener('DOMContentLoaded', _DOMContentLoaded);

	if(noDocumentReadyState)_document.readyState = "interactive";

	if(_emulate_scrollX_scrollY)_emulate_scrollX_scrollY();

	if(!("classList" in _document.body.firstChild)) {
		if(DEBUG && console) {
			console.error("Cannot handle htc behavior. Maybe *.htc file not allowed or not exists");
		}
		//TODO:: no htc available, do for(var node in document.all) __ielt8__element_init__(node)
	}
}
function _onload() {
	global.detachEvent('onload', _onload);

	if(noDocumentReadyState)_document.readyState = "complete";

	if(_emulate_scrollX_scrollY)_emulate_scrollX_scrollY();
}

_document.addEventListener('DOMContentLoaded', _DOMContentLoaded);//Emulated method
global.attachEvent('onload', _onload);//Native method





createBehaviorStyle(__STYLE_ID, __SUPPORTED__TAG_NAMES__, ielt9BehaviorRule);


ielt9BehaviorRule = _tmp_ = null;


}.call(window, /** @const */function(obj, extention) {
		for(var key in extention)
			if(Object.prototype.hasOwnProperty.call(extention, key) && !Object.prototype.hasOwnProperty.call(obj, key))
				obj[key] = extention[key];

		return obj;
	});
