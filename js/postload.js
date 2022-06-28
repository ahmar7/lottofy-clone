/*!
 * Modernizr v2.8.3
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */

window.Modernizr = (function( window, document, undefined ) {

    var version = '2.8.3',

    Modernizr = {},

    /*>>cssclasses*/
    // option for enabling the HTML classes to be added
    enableClasses = true,
    /*>>cssclasses*/

    docElement = document.documentElement,

    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    /**
     * Create the input element for various Web Forms feature tests.
     */
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

    /*>>smile*/
    smile = ':)',
    /*>>smile*/

    toString = {}.toString,

    // TODO :: make the prefixes more granular
    /*>>prefixes*/
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    /*>>prefixes*/

    /*>>domprefixes*/
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
    //   erik.eae.net/archives/2008/03/10/21.48.10/

    // More here: github.com/Modernizr/Modernizr/issues/issue/21
    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),
    /*>>domprefixes*/

    /*>>ns*/
    ns = {'svg': 'http://www.w3.org/2000/svg'},
    /*>>ns*/

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, // used in testing loop


    /*>>teststyles*/
    // Inject element with style element and some CSS rules
    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
          // After page load injecting a fake body doesn't work so check if body exists
          body = document.body,
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
          fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
          //avoid crashing IE8, if background image is used
          fakeBody.style.background = '';
          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      // If this is done after page load we don't want to remove the body so check if body exists
      if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    /*>>teststyles*/

    /*>>mq*/
    // adapted from matchMedia polyfill
    // by Scott Jehl and Paul Irish
    // gist.github.com/786768
    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq) && matchMedia(mq).matches || false;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
     /*>>mq*/


    /*>>hasevent*/
    //
    // isEventSupported determines if a given element supports the given event
    // kangax.github.com/iseventsupported/
    //
    // The following results are known incorrects:
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
    //   ...
    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            // If property was created, "remove it" (by setting value to `undefined`)
            if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),
    /*>>hasevent*/

    // TODO :: Add flag for hasownprop ? didn't last time

    // hasOwnProperty shim by kangax needed for Safari 2.0 support
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // es5.github.com/#x15.3.4.5

    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    /**
     * setCss applies given styles to the Modernizr DOM node.
     */
    function setCss( str ) {
        mStyle.cssText = str;
    }

    /**
     * setCssAll extrapolates all vendor-specific css strings.
     */
    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * is returns a boolean for if typeof obj is exactly type.
     */
    function is( obj, type ) {
        return typeof obj === type;
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    /*>>testprop*/

    // testProps is a generic CSS / DOM property test.

    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.

    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.

    // Because the testing of the CSS property names (with "-", as
    // opposed to the camelCase DOM properties) is non-portable and
    // non-standard but works in WebKit and IE (but not Gecko or Opera),
    // we explicitly reject properties with dashes so that authors
    // developing in WebKit or IE first don't end up with
    // browser-specific content by accident.

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    /*>>testprop*/

    // TODO :: add testDOMProps
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                // return the property name as a string
                if (elem === false) return props[i];

                // let's bind a function
                if (is(item, 'function')){
                  // default to autobind unless override
                  return item.bind(elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    /*>>testallprops*/
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }
    /*>>testallprops*/


    /**
     * Tests
     * -----
     */

    // The *new* flexbox
    // dev.w3.org/csswg/css3-flexbox

    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };

    // The *old* flexbox
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };

    // On the S60 and BB Storm, getContext exists, but always returns undefined
    // so we actually have to call getContext() to verify
    // github.com/Modernizr/Modernizr/issues/issue/97/

    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };

    // webk.it/70117 is tracking a legit WebGL feature detect proposal

    // We do a soft detect which may false positive in order to avoid
    // an expensive context creation: bugzil.la/732441

    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };

    /*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */

    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };


    // geolocation is often considered a trivial feature detect...
    // Turns out, it's quite tricky to get right:
    //
    // Using !!navigator.geolocation does two things we don't want. It:
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
    //   2. Disables page caching in WebKit: webk.it/43956
    //
    // Meanwhile, in Firefox < 8, an about:config setting could expose
    // a false positive that would throw an exception: bugzil.la/688158

    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    // Chrome incognito mode used to throw an exception when using openDatabase
    // It doesn't anymore.
    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    // Vendors had inconsistent prefixing with the experimental Indexed DB:
    // - Webkit's implementation is accessible through webkitIndexedDB
    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
    // For speed, we don't test the legacy (and beta-only) indexedDB
    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    // Per 1.6:
    // This used to be Modernizr.historymanagement but the longer
    // name has been deprecated in favor of a shorter and property-matching one.
    // The old API is still available in 1.6, but as of 2.0 will throw a warning,
    // and in the first release thereafter disappear entirely.
    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
    // FF10 still uses prefixes, so check for it until then.
    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    // css-tricks.com/rgba-browser-support/
    tests['rgba'] = function() {
        // Set an rgba() color and check the returned value

        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
        //   except IE9 who retains it as hsla

        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
        // Setting multiple images AND a color on the background shorthand property
        //  and then querying the style.background property value for the number of
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

        setCss('background:url(https://),url(https://),red url(https://)');

        // If the UA supports multiple backgrounds, there should be three occurrences
        //   of the string "url(" in the return value for elemStyle.background

        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };



    // this will false positive in Opera Mini
    //   github.com/Modernizr/Modernizr/issues/396

    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };


    // Super comprehensive table about all the unique implementations of
    // border-radius: muddledramblings.com/table-of-css3-border-radius-compliance

    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    // WebOS unfortunately false positives on this test.
    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    // FF3.0 will false positive on this test
    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.

        setCssAll('opacity:.55');

        // The non-literal . in this regex is intentional:
        //   German Chrome returns this value as 0,55
        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
        return (/^0.55$/).test(mStyle.opacity);
    };


    // Note, Android < 4 will pass this test, but can only animate
    //   a single property at a time
    //   goo.gl/v3V4Gp
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        /**
         * For CSS Gradients syntax, please see:
         * webkit.org/blog/175/introducing-css-gradients/
         * developer.mozilla.org/en/CSS/-moz-linear-gradient
         * developer.mozilla.org/en/CSS/-moz-radial-gradient
         * dev.w3.org/csswg/css3-images/#gradients-
         */

        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
             // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
              (str1 + '-webkit- '.split(' ').join(str2 + str1) +
             // standard syntax             // trailing 'background-image:'
              prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
        //   some conditions. As a result, Webkit typically recognizes the syntax but
        //   will sometimes throw a false positive, thus we must do a more thorough check:
        if ( ret && 'webkitPerspective' in docElement.style ) {

          // Webkit allows this media query to succeed only if the feature is enabled.
          // `@media (transform-3d),(-webkit-transform-3d){ ... }`
          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };


    /*>>fontface*/
    // @font-face detection routine by Diego Perini
    // javascript.nwbox.com/CSSSupport/

    // false positives:
    //   WebOS github.com/Modernizr/Modernizr/issues/342
    //   WP7   github.com/Modernizr/Modernizr/issues/538
    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };
    /*>>fontface*/

    // CSS generated content detection
    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };



    // These tests evaluate support of the video/audio elements, as well as
    // testing what types of content they support.
    //
    // We're using the Boolean constructor here, so that we can extend the value
    // e.g.  Modernizr.video     // true
    //       Modernizr.video.ogg // 'probably'
    //
    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
    //                     thx to NielsLeenheer and zcorpan

    // Note: in some older browsers, "no" was a return value instead of empty string.
    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    // In FF4, if disabled, window.localStorage should === null.

    // Normally, we could not test that directly and need to do a
    //   `('localStorage' in window) && ` test first because otherwise Firefox will
    //   throw bugzil.la/365772 if cookies are disabled

    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
    // will throw the exception:
    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
    // Peculiarly, getItem and removeItem calls do not throw.

    // Because we are forced to try/catch this, we'll go aggressive.

    // Just FWIW: IE8 Compat mode supports these features completely:
    //   www.quirksmode.org/dom/html5.html
    // But IE8 doesn't support either with local files

    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    // Thanks to Erik Dahlstrom
    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    // specifically for SVG inline in HTML, not within XHTML
    // test page: paulirish.com/demo/inline-svg
    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    // SVG SMIL animation
    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };

    // This test is only for clip paths in SVG proper, not clip paths on HTML content
    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg

    // However read the comments to dig into applying SVG clippaths to HTML content here:
    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    /*>>webforms*/
    // input features and input types go directly onto the ret object, bypassing the tests loop.
    // Hold this guy to execute in a moment.
    function webforms() {
        /*>>input*/
        // Run through HTML5's new input attributes to see if the UA understands any.
        // We're using f which is the <input> element created early on
        // Mike Taylr has created a comprehensive resource for testing these attributes
        //   when applied to all input types:
        //   miketaylr.com/code/input-type-attr.html
        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary

        // Only input placeholder is tested while textarea's placeholder is not.
        // Currently Safari 4 and Opera 11 have support only for the input placeholder
        // Both tests are available in feature-detects/forms-placeholder.js
        Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
              // safari false positive's on datalist: webk.it/74252
              // see also github.com/Modernizr/Modernizr/issues/146
              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        /*>>input*/

        /*>>inputtypes*/
        // Run through HTML5's new input types to see if the UA understands any.
        //   This is put behind the tests runloop because it doesn't return a
        //   true/false like all the other tests; instead, it returns an object
        //   containing each input type with its corresponding true/false value

        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
        Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                // We first check to see if the type we give it sticks..
                // If the type does, we feed it a textual value, which shouldn't be valid.
                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
                if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                      // Safari 2-4 allows the smiley as a value, despite making a slider
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              // Mobile android web browser has false positive, so must
                              // check the height to see if the widget is actually there.
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                      // Spec doesn't define any special parsing or detectable UI
                      //   behaviors so we pass these through as true

                      // Interestingly, opera fails the earlier test, so it doesn't
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        /*>>inputtypes*/
    }
    /*>>webforms*/


    // End of test definitions
    // -----------------------



    // Run through all tests and detect their support in the current UA.
    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    /*>>webforms*/
    // input tests need to run.
    Modernizr.input || webforms();
    /*>>webforms*/


    /**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
           // we're going to quit if you're trying to overwrite an existing test
           // if we were to allow it, we'd do this:
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
           //   docElement.className = docElement.className.replace( re, '' );
           // but, no rly, stuff 'em.
           return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; // allow chaining.
     };


    // Reset modElem.cssText to nothing to reduce memory footprint.
    setCss('');
    modElem = inputElem = null;

    /*>>shiv*/
    /**
     * @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
;(function(window,document){var version='3.7.0';var options=window.html5||{};var reSkip=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;var saveClones=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;var supportsHtml5Styles;var expando='_html5shiv';var expanID=0;var expandoData={};var supportsUnknownElements;(function(){try{var a=document.createElement('a');a.innerHTML='<xyz></xyz>';supportsHtml5Styles=('hidden' in a);supportsUnknownElements=a.childNodes.length==1||(function(){(document.createElement)('a');var frag=document.createDocumentFragment();return(typeof frag.cloneNode=='undefined'||typeof frag.createDocumentFragment=='undefined'||typeof frag.createElement=='undefined')}())}catch(e){supportsHtml5Styles=!0;supportsUnknownElements=!0}}());function addStyleSheet(ownerDocument,cssText){var p=ownerDocument.createElement('p'),parent=ownerDocument.getElementsByTagName('head')[0]||ownerDocument.documentElement;p.innerHTML='x<style>'+cssText+'</style>';return parent.insertBefore(p.lastChild,parent.firstChild)}
function getElements(){var elements=html5.elements;return typeof elements=='string'?elements.split(' '):elements}
function getExpandoData(ownerDocument){var data=expandoData[ownerDocument[expando]];if(!data){data={};expanID++;ownerDocument[expando]=expanID;expandoData[expanID]=data}
return data}
function createElement(nodeName,ownerDocument,data){if(!ownerDocument){ownerDocument=document}
if(supportsUnknownElements){return ownerDocument.createElement(nodeName)}
if(!data){data=getExpandoData(ownerDocument)}
var node;if(data.cache[nodeName]){node=data.cache[nodeName].cloneNode()}else if(saveClones.test(nodeName)){node=(data.cache[nodeName]=data.createElem(nodeName)).cloneNode()}else{node=data.createElem(nodeName)}
return node.canHaveChildren&&!reSkip.test(nodeName)&&!node.tagUrn?data.frag.appendChild(node):node}
function createDocumentFragment(ownerDocument,data){if(!ownerDocument){ownerDocument=document}
if(supportsUnknownElements){return ownerDocument.createDocumentFragment()}
data=data||getExpandoData(ownerDocument);var clone=data.frag.cloneNode(),i=0,elems=getElements(),l=elems.length;for(;i<l;i++){clone.createElement(elems[i])}
return clone}
function shivMethods(ownerDocument,data){if(!data.cache){data.cache={};data.createElem=ownerDocument.createElement;data.createFrag=ownerDocument.createDocumentFragment;data.frag=data.createFrag()}
ownerDocument.createElement=function(nodeName){if(!html5.shivMethods){return data.createElem(nodeName)}
return createElement(nodeName,ownerDocument,data)};ownerDocument.createDocumentFragment=Function('h,f','return function(){'+'var n=f.cloneNode(),c=n.createElement;'+'h.shivMethods&&('+getElements().join().replace(/[\w\-]+/g,function(nodeName){data.createElem(nodeName);data.frag.createElement(nodeName);return'c("'+nodeName+'")'})+');return n}')(html5,data.frag)}
function shivDocument(ownerDocument){if(!ownerDocument){ownerDocument=document}
var data=getExpandoData(ownerDocument);if(html5.shivCSS&&!supportsHtml5Styles&&!data.hasCSS){data.hasCSS=!!addStyleSheet(ownerDocument,'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}'+'mark{background:#FF0;color:#000}'+'template{display:none}')}
if(!supportsUnknownElements){shivMethods(ownerDocument,data)}
return ownerDocument}
var html5={'elements':options.elements||'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video','version':version,'shivCSS':(options.shivCSS!==!1),'supportsUnknownElements':supportsUnknownElements,'shivMethods':(options.shivMethods!==!1),'type':'default','shivDocument':shivDocument,createElement:createElement,createDocumentFragment:createDocumentFragment};window.html5=html5;shivDocument(document)}(this,document));Modernizr._version=version;Modernizr._prefixes=prefixes;Modernizr._domPrefixes=domPrefixes;Modernizr._cssomPrefixes=cssomPrefixes;Modernizr.mq=testMediaQuery;Modernizr.hasEvent=isEventSupported;Modernizr.testProp=function(prop){return testProps([prop])};Modernizr.testAllProps=testPropsAll;Modernizr.testStyles=injectElementWithStyles;Modernizr.prefixed=function(prop,obj,elem){if(!obj){return testPropsAll(prop,'pfx')}else{return testPropsAll(prop,obj,elem)}};docElement.className=docElement.className.replace(/(^|\s)no-js(\s|$)/,'$1$2')+(enableClasses?' js '+classes.join(' '):'');return Modernizr})(this,this.document);(function(){var b,f;b=this.jQuery||window.jQuery;f=b(window);b.fn.stick_in_parent=function(d){var A,w,J,n,B,K,p,q,k,E,t;null==d&&(d={});t=d.sticky_class;B=d.inner_scrolling;E=d.recalc_every;k=d.parent;q=d.offset_top;p=d.spacer;w=d.bottoming;null==q&&(q=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=b(document);null==w&&(w=!0);J=function(a,d,n,C,F,u,r,G){var v,H,m,D,I,c,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));if(!g.length)throw"failed to find stick parent";v=m=!1;(h=null!=p?p&&a.closest(p):b("<div />"))&&h.css("position",a.css("position"));x=function(){var c,f,e;if(!G&&(I=A.height(),c=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),d=parseInt(g.css("padding-bottom"),10),n=g.offset().top+c+f,C=g.height(),m&&(v=m=!1,null==p&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-q,u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:a.outerWidth(!0),height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),e))return l()};x();if(u!==C)return D=void 0,c=q,z=E,l=function(){var b,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+c>C+n,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:c}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,c=q,null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.detach()),b={position:"",width:"",top:""},a.css(b).removeClass(t).trigger("sticky_kit:unstick")),B&&(b=f.height(),u+q>b&&!v&&(c-=l,c=Math.max(b-u,c),c=Math.min(q,c),m&&a.css({top:c+"px"})))):e>F&&(m=!0,b={position:"fixed",top:c},b.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(b).addClass(t),null==p&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+c>C+n),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),a.css({position:"absolute",bottom:d,top:"auto"}).trigger("sticky_kit:bottom")},y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("scroll",l);f.off("resize",y);b(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",y),b(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,0)}};n=0;for(K=this.length;n<K;n++)d=this[n],J(b(d));return this}}).call(this);/*! cropit - v0.4.5 <https://github.com/scottcheng/cropit> */
(function webpackUniversalModuleDefinition(root,factory){if(typeof exports==='object'&&typeof module==='object')
module.exports=factory(require("jquery"));else if(typeof define==='function'&&define.amd)
define(["jquery"],factory);else if(typeof exports==='object')
exports.cropit=factory(require("jquery"));else root.cropit=factory(root.jQuery)})(this,function(__WEBPACK_EXTERNAL_MODULE_1__){return(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])
return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.loaded=!0;return module.exports}
__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.p="";return __webpack_require__(0)})([function(module,exports,__webpack_require__){function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj}}
var _jquery=__webpack_require__(1);var _jquery2=_interopRequireDefault(_jquery);var _cropit=__webpack_require__(2);var _cropit2=_interopRequireDefault(_cropit);var _constants=__webpack_require__(4);var _utils=__webpack_require__(6);var applyOnEach=function applyOnEach($el,callback){return $el.each(function(){var cropit=_jquery2['default'].data(this,_constants.PLUGIN_KEY);if(!cropit){return}
callback(cropit)})};var callOnFirst=function callOnFirst($el,method,options){var cropit=$el.first().data(_constants.PLUGIN_KEY);if(!cropit||!_jquery2['default'].isFunction(cropit[method])){return null}
return cropit[method](options)};var methods={init:function init(options){return this.each(function(){if(_jquery2['default'].data(this,_constants.PLUGIN_KEY)){return}
var cropit=new _cropit2['default'](_jquery2['default'],this,options);_jquery2['default'].data(this,_constants.PLUGIN_KEY,cropit)})},destroy:function destroy(){return this.each(function(){_jquery2['default'].removeData(this,_constants.PLUGIN_KEY)})},isZoomable:function isZoomable(){return callOnFirst(this,'isZoomable')},'export':function _export(options){return callOnFirst(this,'getCroppedImageData',options)},imageState:function imageState(){return callOnFirst(this,'getImageState')},imageSize:function imageSize(){return callOnFirst(this,'getImageSize')},prop:function prop(name,value){if((0,_utils.exists)(value)){return applyOnEach(this,function(cropit){cropit['set'+(0,_utils.capitalize)(name)](value)})}else{return callOnFirst(this,'get'+(0,_utils.capitalize)(name))}},disable:function disable(){return applyOnEach(this,function(cropit){cropit.disable()})},reenable:function reenable(){return applyOnEach(this,function(cropit){cropit.reenable()})}};_jquery2['default'].fn.cropit=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1))}else if(['imageSrc','offset','previewSize','zoom','initialZoom','exportZoom','minZoom','maxZoom'].indexOf(method)>=0){return methods.prop.apply(this,arguments)}else{return methods.init.apply(this,arguments)}}},function(module,exports){module.exports=__WEBPACK_EXTERNAL_MODULE_1__},function(module,exports,__webpack_require__){Object.defineProperty(exports,'__esModule',{value:!0});var _createClass=(function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1;descriptor.configurable=!0;if('value' in descriptor)descriptor.writable=!0;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}})();function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj}}
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}
var _jquery=__webpack_require__(1);var _jquery2=_interopRequireDefault(_jquery);var _Zoomer=__webpack_require__(3);var _Zoomer2=_interopRequireDefault(_Zoomer);var _constants=__webpack_require__(4);var _options=__webpack_require__(5);var _utils=__webpack_require__(6);var Cropit=(function(){function Cropit(jQuery,element,options){_classCallCheck(this,Cropit);this.$el=(0,_jquery2['default'])(element);var defaults=(0,_options.loadDefaults)(this.$el);this.options=_jquery2['default'].extend({},defaults,options);this.init()}
_createClass(Cropit,[{key:'init',value:function init(){var _this=this;this.image=new Image();this.preImage=new Image();this.image.onload=this.onImageLoaded.bind(this);this.preImage.onload=this.onPreImageLoaded.bind(this);this.image.onerror=this.preImage.onerror=function(){_this.onImageError.call(_this,_constants.ERRORS.IMAGE_FAILED_TO_LOAD)};this.$fileInput=this.options.$fileInput.attr({accept:'image/*'});this.$preview=this.options.$preview.css({backgroundRepeat:'no-repeat'});this.$zoomSlider=this.options.$zoomSlider.attr({min:0,max:1,step:0.01});this.previewSize={w:this.options.width||this.$preview.width(),h:this.options.height||this.$preview.height()};if(this.options.width){this.$preview.width(this.previewSize.w)}
if(this.options.height){this.$preview.height(this.previewSize.h)}
if(this.options.imageBackground){if(_jquery2['default'].isArray(this.options.imageBackgroundBorderWidth)){this.imageBgBorderWidthArray=this.options.imageBackgroundBorderWidth}else{this.imageBgBorderWidthArray=[];[0,1,2,3].forEach(function(i){_this.imageBgBorderWidthArray[i]=_this.options.imageBackgroundBorderWidth})}
var $previewContainer=this.options.$previewContainer;this.$imageBg=(0,_jquery2['default'])('<img />').addClass(_constants.CLASS_NAMES.IMAGE_BACKGROUND).attr('alt','').css('position','absolute');this.$imageBgContainer=(0,_jquery2['default'])('<div />').addClass(_constants.CLASS_NAMES.IMAGE_BACKGROUND_CONTAINER).css({position:'absolute',zIndex:0,left:-this.imageBgBorderWidthArray[3]+window.parseInt(this.$preview.css('border-left-width')||0),top:-this.imageBgBorderWidthArray[0]+window.parseInt(this.$preview.css('border-top-width')||0),width:this.previewSize.w+this.imageBgBorderWidthArray[1]+this.imageBgBorderWidthArray[3],height:this.previewSize.h+this.imageBgBorderWidthArray[0]+this.imageBgBorderWidthArray[2]}).append(this.$imageBg);if(this.imageBgBorderWidthArray[0]>0){this.$imageBgContainer.css('overflow','hidden')}
$previewContainer.css('position','relative').prepend(this.$imageBgContainer);this.$preview.css('position','relative');this.$preview.hover(function(){_this.$imageBg.addClass(_constants.CLASS_NAMES.PREVIEW_HOVERED)},function(){_this.$imageBg.removeClass(_constants.CLASS_NAMES.PREVIEW_HOVERED)})}
this.setInitialZoom(this.options.initialZoom);this.imageLoaded=!1;this.moveContinue=!1;this.zoomer=new _Zoomer2['default']();if(this.options.allowDragNDrop){_jquery2['default'].event.props.push('dataTransfer')}
this.bindListeners();if(this.options.imageState&&this.options.imageState.src){this.loadImage(this.options.imageState.src)}}},{key:'bindListeners',value:function bindListeners(){this.$fileInput.on('change.cropit',this.onFileChange.bind(this));this.$preview.on(_constants.EVENTS.PREVIEW,this.onPreviewEvent.bind(this));this.$zoomSlider.on(_constants.EVENTS.ZOOM_INPUT,this.onZoomSliderChange.bind(this));if(this.options.allowDragNDrop){this.$preview.on('dragover.cropit dragleave.cropit',this.onDragOver.bind(this));this.$preview.on('drop.cropit',this.onDrop.bind(this))}}},{key:'unbindListeners',value:function unbindListeners(){this.$fileInput.off('change.cropit');this.$preview.off(_constants.EVENTS.PREVIEW);this.$preview.off('dragover.cropit dragleave.cropit drop.cropit');this.$zoomSlider.off(_constants.EVENTS.ZOOM_INPUT)}},{key:'onFileChange',value:function onFileChange(e){this.options.onFileChange(e);if(this.$fileInput.get(0).files){this.loadFileReader(this.$fileInput.get(0).files[0])}}},{key:'loadFileReader',value:function loadFileReader(file){var fileReader=new FileReader();if(file&&file.type.match('image')){fileReader.readAsDataURL(file);fileReader.onload=this.onFileReaderLoaded.bind(this);fileReader.onerror=this.onFileReaderError.bind(this)}else if(file){this.onFileReaderError()}}},{key:'onFileReaderLoaded',value:function onFileReaderLoaded(e){this.loadImage(e.target.result)}},{key:'onFileReaderError',value:function onFileReaderError(){this.options.onFileReaderError()}},{key:'onDragOver',value:function onDragOver(e){e.preventDefault();e.dataTransfer.dropEffect='copy';this.$preview.toggleClass(_constants.CLASS_NAMES.DRAG_HOVERED,e.type==='dragover')}},{key:'onDrop',value:function onDrop(e){var _this2=this;e.preventDefault();e.stopPropagation();var files=Array.prototype.slice.call(e.dataTransfer.files,0);files.some(function(file){if(!file.type.match('image')){return!1}
_this2.loadFileReader(file);return!0});this.$preview.removeClass(_constants.CLASS_NAMES.DRAG_HOVERED)}},{key:'loadImage',value:function loadImage(imageSrc){if(!imageSrc){return}
this.options.onImageLoading();this.setImageLoadingClass();this.preImage.src=imageSrc}},{key:'setImageSrc',value:function setImageSrc(imageSrc){this.loadImage(imageSrc)}},{key:'onPreImageLoaded',value:function onPreImageLoaded(){if(this.options.smallImage==='reject'&&(this.preImage.width*this.options.maxZoom<this.previewSize.w*this.options.exportZoom||this.preImage.height*this.options.maxZoom<this.previewSize.h*this.options.exportZoom)){this.onImageError(_constants.ERRORS.SMALL_IMAGE);if(this.image.src){this.setImageLoadedClass()}
return}
if(this.options.allowCrossOrigin){this.image.crossOrigin=this.preImage.src.indexOf('data:')===0?null:'Anonymous'}
this.image.src=this.imageSrc=this.preImage.src}},{key:'onImageLoaded',value:function onImageLoaded(){this.imageSize={w:this.image.width,h:this.image.height};this.setupZoomer(this.options.imageState&&this.options.imageState.zoom||this.initialZoom);if(this.options.imageState&&this.options.imageState.offset){this.setOffset(this.options.imageState.offset)}else{this.centerImage()}
this.options.imageState={};this.$preview.css('background-image','url('+this.imageSrc+')');if(this.options.imageBackground){this.$imageBg.attr('src',this.imageSrc)}
this.setImageLoadedClass();this.imageLoaded=!0;this.options.onImageLoaded()}},{key:'onImageError',value:function onImageError(){this.options.onImageError.apply(this,arguments);this.removeImageLoadingClass()}},{key:'setImageLoadingClass',value:function setImageLoadingClass(){this.$preview.removeClass(_constants.CLASS_NAMES.IMAGE_LOADED).addClass(_constants.CLASS_NAMES.IMAGE_LOADING)}},{key:'setImageLoadedClass',value:function setImageLoadedClass(){this.$preview.removeClass(_constants.CLASS_NAMES.IMAGE_LOADING).addClass(_constants.CLASS_NAMES.IMAGE_LOADED)}},{key:'removeImageLoadingClass',value:function removeImageLoadingClass(){this.$preview.removeClass(_constants.CLASS_NAMES.IMAGE_LOADING)}},{key:'getEventPosition',value:function getEventPosition(e){if(e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches[0]){e=e.originalEvent.touches[0]}
if(e.clientX&&e.clientY){return{x:e.clientX,y:e.clientY}}}},{key:'onPreviewEvent',value:function onPreviewEvent(e){if(!this.imageLoaded){return}
this.moveContinue=!1;this.$preview.off(_constants.EVENTS.PREVIEW_MOVE);if(e.type==='mousedown'||e.type==='touchstart'){this.origin=this.getEventPosition(e);this.moveContinue=!0;this.$preview.on(_constants.EVENTS.PREVIEW_MOVE,this.onMove.bind(this))}else{(0,_jquery2['default'])(document.body).focus()}
e.stopPropagation();return!1}},{key:'onMove',value:function onMove(e){var eventPosition=this.getEventPosition(e);if(this.moveContinue&&eventPosition){this.setOffset({x:this.offset.x+eventPosition.x-this.origin.x,y:this.offset.y+eventPosition.y-this.origin.y})}
this.origin=eventPosition;e.stopPropagation();return!1}},{key:'setOffset',value:function setOffset(position){if(!position||!(0,_utils.exists)(position.x)||!(0,_utils.exists)(position.y)){return}
this.offset=this.fixOffset(position);this.$preview.css('background-position',''+this.offset.x+'px '+this.offset.y+'px');if(this.options.imageBackground){this.$imageBg.css({left:this.offset.x+this.imageBgBorderWidthArray[3],top:this.offset.y+this.imageBgBorderWidthArray[0]})}
this.options.onOffsetChange(position)}},{key:'fixOffset',value:function fixOffset(offset){if(!this.imageLoaded){return offset}
var ret={x:offset.x,y:offset.y};if(!this.options.freeMove){if(this.imageSize.w*this.zoom>=this.previewSize.w){ret.x=Math.min(0,Math.max(ret.x,this.previewSize.w-this.imageSize.w*this.zoom))}else{ret.x=Math.max(0,Math.min(ret.x,this.previewSize.w-this.imageSize.w*this.zoom))}
if(this.imageSize.h*this.zoom>=this.previewSize.h){ret.y=Math.min(0,Math.max(ret.y,this.previewSize.h-this.imageSize.h*this.zoom))}else{ret.y=Math.max(0,Math.min(ret.y,this.previewSize.h-this.imageSize.h*this.zoom))}}
ret.x=(0,_utils.round)(ret.x);ret.y=(0,_utils.round)(ret.y);return ret}},{key:'centerImage',value:function centerImage(){if(!this.imageSize||!this.zoom){return}
this.setOffset({x:(this.previewSize.w-this.imageSize.w*this.zoom)/2,y:(this.previewSize.h-this.imageSize.h*this.zoom)/2})}},{key:'onZoomSliderChange',value:function onZoomSliderChange(){if(!this.imageLoaded){return}
this.zoomSliderPos=Number(this.$zoomSlider.val());var newZoom=this.zoomer.getZoom(this.zoomSliderPos);if(newZoom===this.zoom){return}
this.setZoom(newZoom)}},{key:'enableZoomSlider',value:function enableZoomSlider(){this.$zoomSlider.removeAttr('disabled');this.options.onZoomEnabled()}},{key:'disableZoomSlider',value:function disableZoomSlider(){this.$zoomSlider.attr('disabled',!0);this.options.onZoomDisabled()}},{key:'setupZoomer',value:function setupZoomer(zoom){this.zoomer.setup({imageSize:this.imageSize,previewSize:this.previewSize,exportZoom:this.options.exportZoom,maxZoom:this.options.maxZoom,minZoom:this.options.minZoom,smallImage:this.options.smallImage});this.setZoom((0,_utils.exists)(zoom)?zoom:this.zoom);if(this.isZoomable()){this.enableZoomSlider()}else{this.disableZoomSlider()}}},{key:'setZoom',value:function setZoom(newZoom){newZoom=this.fixZoom(newZoom);var updatedWidth=(0,_utils.round)(this.imageSize.w*newZoom);var updatedHeight=(0,_utils.round)(this.imageSize.h*newZoom);if(this.imageLoaded){var oldZoom=this.zoom;var newX=this.previewSize.w/2-(this.previewSize.w/2-this.offset.x)*newZoom/oldZoom;var newY=this.previewSize.h/2-(this.previewSize.h/2-this.offset.y)*newZoom/oldZoom;this.zoom=newZoom;this.setOffset({x:newX,y:newY})}else{this.zoom=newZoom}
this.zoomSliderPos=this.zoomer.getSliderPos(this.zoom);this.$zoomSlider.val(this.zoomSliderPos);this.$preview.css('background-size',''+updatedWidth+'px '+updatedHeight+'px');if(this.options.imageBackground){this.$imageBg.css({width:updatedWidth,height:updatedHeight})}
this.options.onZoomChange(newZoom)}},{key:'fixZoom',value:function fixZoom(zoom){return this.zoomer.fixZoom(zoom)}},{key:'isZoomable',value:function isZoomable(){return this.zoomer.isZoomable()}},{key:'getCroppedImageData',value:function getCroppedImageData(exportOptions){if(!this.imageSrc){return}
var exportDefaults={type:'image/png',quality:0.75,originalSize:!1,fillBg:'#fff'};exportOptions=_jquery2['default'].extend({},exportDefaults,exportOptions);var exportZoom=exportOptions.originalSize?1/this.zoom:this.options.exportZoom;var zoomedSize={w:this.zoom*exportZoom*this.imageSize.w,h:this.zoom*exportZoom*this.imageSize.h};var canvas=(0,_jquery2['default'])('<canvas />').attr({width:this.previewSize.w*exportZoom,height:this.previewSize.h*exportZoom}).get(0);var canvasContext=canvas.getContext('2d');if(exportOptions.type==='image/jpeg'){canvasContext.fillStyle=exportOptions.fillBg;canvasContext.fillRect(0,0,canvas.width,canvas.height)}
canvasContext.drawImage(this.image,this.offset.x*exportZoom,this.offset.y*exportZoom,zoomedSize.w,zoomedSize.h);return canvas.toDataURL(exportOptions.type,exportOptions.quality)}},{key:'getImageState',value:function getImageState(){return{src:this.imageSrc,offset:this.offset,zoom:this.zoom}}},{key:'getImageSrc',value:function getImageSrc(){return this.imageSrc}},{key:'getOffset',value:function getOffset(){return this.offset}},{key:'getZoom',value:function getZoom(){return this.zoom}},{key:'getImageSize',value:function getImageSize(){if(!this.imageSize){return null}
return{width:this.imageSize.w,height:this.imageSize.h}}},{key:'getInitialZoom',value:function getInitialZoom(){return this.options.initialZoom}},{key:'setInitialZoom',value:function setInitialZoom(initialZoomOption){this.options.initialZoom=initialZoomOption;if(initialZoomOption==='min'){this.initialZoom=0}else if(initialZoomOption==='image'){this.initialZoom=1}else{this.initialZoom=0}}},{key:'getExportZoom',value:function getExportZoom(){return this.options.exportZoom}},{key:'setExportZoom',value:function setExportZoom(exportZoom){this.options.exportZoom=exportZoom;this.setupZoomer()}},{key:'getMinZoom',value:function getMinZoom(){return this.options.minZoom}},{key:'setMinZoom',value:function setMinZoom(minZoom){this.options.minZoom=minZoom;this.setupZoomer()}},{key:'getMaxZoom',value:function getMaxZoom(){return this.options.maxZoom}},{key:'setMaxZoom',value:function setMaxZoom(maxZoom){this.options.maxZoom=maxZoom;this.setupZoomer()}},{key:'getPreviewSize',value:function getPreviewSize(){return{width:this.previewSize.w,height:this.previewSize.h}}},{key:'setPreviewSize',value:function setPreviewSize(size){if(!size||size.width<=0||size.height<=0){return}
this.previewSize={w:size.width,h:size.height};this.$preview.css({width:this.previewSize.w,height:this.previewSize.h});if(this.options.imageBackground){this.$imageBgContainer.css({width:this.previewSize.w+this.imageBgBorderWidthArray[1]+this.imageBgBorderWidthArray[3],height:this.previewSize.h+this.imageBgBorderWidthArray[0]+this.imageBgBorderWidthArray[2]})}
if(this.imageLoaded){this.setupZoomer()}}},{key:'disable',value:function disable(){this.unbindListeners();this.disableZoomSlider();this.$el.addClass(_constants.CLASS_NAMES.DISABLED)}},{key:'reenable',value:function reenable(){this.bindListeners();this.enableZoomSlider();this.$el.removeClass(_constants.CLASS_NAMES.DISABLED)}},{key:'$',value:function $(selector){if(!this.$el){return null}
return this.$el.find(selector)}}]);return Cropit})();exports['default']=Cropit;module.exports=exports['default']},function(module,exports){Object.defineProperty(exports,'__esModule',{value:!0});var _createClass=(function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1;descriptor.configurable=!0;if('value' in descriptor)descriptor.writable=!0;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}})();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}
var Zoomer=(function(){function Zoomer(){_classCallCheck(this,Zoomer);this.minZoom=this.maxZoom=1}
_createClass(Zoomer,[{key:'setup',value:function setup(_ref){var imageSize=_ref.imageSize;var previewSize=_ref.previewSize;var exportZoom=_ref.exportZoom;var maxZoom=_ref.maxZoom;var minZoom=_ref.minZoom;var smallImage=_ref.smallImage;var widthRatio=previewSize.w/imageSize.w;var heightRatio=previewSize.h/imageSize.h;if(minZoom==='fit'){this.minZoom=Math.min(widthRatio,heightRatio)}else{this.minZoom=Math.max(widthRatio,heightRatio)}
if(smallImage==='allow'){this.minZoom=Math.min(this.minZoom,1)}
this.maxZoom=Math.max(this.minZoom,maxZoom/exportZoom)}},{key:'getZoom',value:function getZoom(sliderPos){if(!this.minZoom||!this.maxZoom){return null}
return sliderPos*(this.maxZoom-this.minZoom)+this.minZoom}},{key:'getSliderPos',value:function getSliderPos(zoom){if(!this.minZoom||!this.maxZoom){return null}
if(this.minZoom===this.maxZoom){return 0}else{return(zoom-this.minZoom)/(this.maxZoom-this.minZoom)}}},{key:'isZoomable',value:function isZoomable(){if(!this.minZoom||!this.maxZoom){return null}
return this.minZoom!==this.maxZoom}},{key:'fixZoom',value:function fixZoom(zoom){return Math.max(this.minZoom,Math.min(this.maxZoom,zoom))}}]);return Zoomer})();exports['default']=Zoomer;module.exports=exports['default']},function(module,exports){Object.defineProperty(exports,'__esModule',{value:!0});var PLUGIN_KEY='cropit';exports.PLUGIN_KEY=PLUGIN_KEY;var CLASS_NAMES={PREVIEW:'cropit-image-preview',PREVIEW_CONTAINER:'cropit-image-preview-container',FILE_INPUT:'cropit-image-input',ZOOM_SLIDER:'cropit-image-zoom-input',IMAGE_BACKGROUND:'cropit-image-background',IMAGE_BACKGROUND_CONTAINER:'cropit-image-background-container',PREVIEW_HOVERED:'cropit-preview-hovered',DRAG_HOVERED:'cropit-drag-hovered',IMAGE_LOADING:'cropit-image-loading',IMAGE_LOADED:'cropit-image-loaded',DISABLED:'cropit-disabled'};exports.CLASS_NAMES=CLASS_NAMES;var ERRORS={IMAGE_FAILED_TO_LOAD:{code:0,message:'Image failed to load.'},SMALL_IMAGE:{code:1,message:'Image is too small.'}};exports.ERRORS=ERRORS;var eventName=function eventName(events){return events.map(function(e){return''+e+'.cropit'}).join(' ')};var EVENTS={PREVIEW:eventName(['mousedown','mouseup','mouseleave','touchstart','touchend','touchcancel','touchleave']),PREVIEW_MOVE:eventName(['mousemove','touchmove']),ZOOM_INPUT:eventName(['mousemove','touchmove','change'])};exports.EVENTS=EVENTS},function(module,exports,__webpack_require__){Object.defineProperty(exports,'__esModule',{value:!0});var _constants=__webpack_require__(4);var options={elements:[{name:'$preview',description:'The HTML element that displays image preview.',defaultSelector:'.'+_constants.CLASS_NAMES.PREVIEW},{name:'$fileInput',description:'File input element.',defaultSelector:'input.'+_constants.CLASS_NAMES.FILE_INPUT},{name:'$zoomSlider',description:'Range input element that controls image zoom.',defaultSelector:'input.'+_constants.CLASS_NAMES.ZOOM_SLIDER},{name:'$previewContainer',description:'Preview container. Only needed when `imageBackground` is true.',defaultSelector:'.'+_constants.CLASS_NAMES.PREVIEW_CONTAINER}].map(function(o){o.type='jQuery element';o['default']='$imageCropper.find(\''+o.defaultSelector+'\')';return o}),values:[{name:'width',type:'number',description:'Width of image preview in pixels. If set, it will override the CSS property.','default':null},{name:'height',type:'number',description:'Height of image preview in pixels. If set, it will override the CSS property.','default':null},{name:'imageBackground',type:'boolean',description:'Whether or not to display the background image beyond the preview area.','default':!1},{name:'imageBackgroundBorderWidth',type:'array or number',description:'Width of background image border in pixels.\n        The four array elements specify the width of background image width on the top, right, bottom, left side respectively.\n        The background image beyond the width will be hidden.\n        If specified as a number, border with uniform width on all sides will be applied.','default':[0,0,0,0]},{name:'exportZoom',type:'number',description:'The ratio between the desired image size to export and the preview size.\n        For example, if the preview size is `300px * 200px`, and `exportZoom = 2`, then\n        the exported image size will be `600px * 400px`.\n        This also affects the maximum zoom level, since the exported image cannot be zoomed to larger than its original size.','default':1},{name:'allowDragNDrop',type:'boolean',description:'When set to true, you can load an image by dragging it from local file browser onto the preview area.','default':!0},{name:'minZoom',type:'string',description:'This options decides the minimal zoom level of the image.\n        If set to `\'fill\'`, the image has to fill the preview area, i.e. both width and height must not go smaller than the preview area.\n        If set to `\'fit\'`, the image can shrink further to fit the preview area, i.e. at least one of its edges must not go smaller than the preview area.','default':'fill'},{name:'maxZoom',type:'number',description:'Determines how big the image can be zoomed. E.g. if set to 1.5, the image can be zoomed to 150% of its original size.','default':1},{name:'initialZoom',type:'string',description:'Determines the zoom when an image is loaded.\n        When set to `\'min\'`, image is zoomed to the smallest when loaded.\n        When set to `\'image\'`, image is zoomed to 100% when loaded.','default':'min'},{name:'freeMove',type:'boolean',description:'When set to true, you can freely move the image instead of being bound to the container borders','default':!1},{name:'smallImage',type:'string',description:'When set to `\'reject\'`, `onImageError` would be called when cropit loads an image that is smaller than the container.\n        When set to `\'allow\'`, images smaller than the container can be zoomed down to its original size, overiding `minZoom` option.\n        When set to `\'stretch\'`, the minimum zoom of small images would follow `minZoom` option.','default':'reject'},{name:'allowCrossOrigin',type:'boolean',description:'Set to true if you need to crop image served from other domains.','default':!1}],callbacks:[{name:'onFileChange',description:'Called when user selects a file in the select file input.',params:[{name:'event',type:'object',description:'File change event object'}]},{name:'onFileReaderError',description:'Called when `FileReader` encounters an error while loading the image file.'},{name:'onImageLoading',description:'Called when image starts to be loaded.'},{name:'onImageLoaded',description:'Called when image is loaded.'},{name:'onImageError',description:'Called when image cannot be loaded.',params:[{name:'error',type:'object',description:'Error object.'},{name:'error.code',type:'number',description:'Error code. `0` means generic image loading failure. `1` means image is too small.'},{name:'error.message',type:'string',description:'A message explaining the error.'}]},{name:'onZoomEnabled',description:'Called when image the zoom slider is enabled.'},{name:'onZoomDisabled',description:'Called when image the zoom slider is disabled.'},{name:'onZoomChange',description:'Called when zoom changes.',params:[{name:'zoom',type:'number',description:'New zoom.'}]},{name:'onOffsetChange',description:'Called when image offset changes.',params:[{name:'offset',type:'object',description:'New offset, with `x` and `y` values.'}]}].map(function(o){o.type='function';return o})};var loadDefaults=function loadDefaults($el){var defaults={};if($el){options.elements.forEach(function(o){defaults[o.name]=$el.find(o.defaultSelector)})}
options.values.forEach(function(o){defaults[o.name]=o['default']});options.callbacks.forEach(function(o){defaults[o.name]=function(){}});return defaults};exports.loadDefaults=loadDefaults;exports['default']=options},function(module,exports){Object.defineProperty(exports,'__esModule',{value:!0});var exists=function exists(v){return typeof v!=='undefined'};exports.exists=exists;var round=function round(x){return+(Math.round(x*100)+'e-2')};exports.round=round;var capitalize=function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1)};exports.capitalize=capitalize}])});(function($){var selectors=[];var checkBinded=!1;var checkLock=!1;var defaults={interval:250,force_process:!1};var $window=$(window);var $priorAppeared=[];function isAppeared(){return $(this).is(':appeared')}
function isNotTriggered(){return!$(this).data('_appear_triggered')}
function process(){checkLock=!1;for(var index=0,selectorsLength=selectors.length;index<selectorsLength;index++){var $appeared=$(selectors[index]).filter(isAppeared);$appeared.filter(isNotTriggered).data('_appear_triggered',!0).trigger('appear',[$appeared]);if($priorAppeared[index]){var $disappeared=$priorAppeared[index].not($appeared);$disappeared.data('_appear_triggered',!1).trigger('disappear',[$disappeared])}
$priorAppeared[index]=$appeared}}
function addSelector(selector){selectors.push(selector);$priorAppeared.push()}
$.expr.pseudos.appeared=$.expr.createPseudo(function(_arg){return function(element){var $element=$(element);if(!$element.is(':visible')){return!1}
var windowLeft=$window.scrollLeft();var windowTop=$window.scrollTop();var offset=$element.offset();var left=offset.left;var top=offset.top;if(top+$element.height()>=windowTop&&top-($element.data('appear-top-offset')||0)<=windowTop+$window.height()&&left+$element.width()>=windowLeft&&left-($element.data('appear-left-offset')||0)<=windowLeft+$window.width()){return!0}
return!1}});$.fn.extend({appear:function(selector,options){$.appear(this,options);return this}});$.extend({appear:function(selector,options){var opts=$.extend({},defaults,options||{});if(!checkBinded){var onCheck=function(){if(checkLock){return}
checkLock=!0;setTimeout(process,opts.interval)};$(window).scroll(onCheck).resize(onCheck);checkBinded=!0}
if(opts.force_process){setTimeout(process,opts.interval)}
addSelector(selector)},force_appear:function(){if(checkBinded){process();return!0}
return!1}})}(function(){if(typeof module!=='undefined'){return require('jquery')}
return jQuery}()));var rateProObject=function(id,type,options){this.id=id;this.useIdInAttr=!1
this.score=0;this.elemFav=$("[data-proRate]");this.type="rate";this.contadores={};this.contadores.likePositiveSelector="[data-ratePosVotes]";this.contadores.likeNegativeSelector="[data-rateNegVotes]";this.contadores.rateVotesSelector="[data-rateTotalVotes]";this.stars={};this.stars.elemSelector="[data-currentRating]";this.stars.starSelector="[data-star]";this.stars.starsToShow=5;this.stars.maxRateValue=100;this.stars.minRateValue=0;this.stars.fullClass="full";this.stars.halfClass="half";this.stars.emplyClass="";this.dataFields={};this.dataFields.identifier="nombre";this.dataFields.score="score";this.dataFields.positive="score.positive";this.dataFields.negative="score.negative";this.cookies={};this.cookies.cookieName="";this.actionURL="";this.callbackOnFail=function(){}
this.callbackOnSuccess=function(){}
this.callbackOnError=function(){}
this.extraFields={}
if(typeof type!=!1){this.type=type}
if(typeof options!="undefined"){if(typeof options.elem!="undefined"){this.elemFav=options.elem}
if(typeof options.useIdInAttr!="undefined"){this.useIdInAttr=options.useIdInAttr}
if(typeof options.onVoteClickCallback!="undefined"){this.onVoteClickCallback=options.onVoteClickCallback}
if(typeof options.callbackOnSuccess!="undefined"){this.callbackOnSuccess=options.callbackOnSuccess}
if(typeof options.callbackOnFail!="undefined"){this.callbackOnFail=options.callbackOnFail}
if(typeof options.callbackOnError!="undefined"){this.callbackOnError=options.callbackOnError}
if(typeof options.extraFields!="undefined"){this.extraFields=options.extraFields}
if(typeof options.counters!="undefined"){if(typeof options.contadores.likePositiveSelector!="undefined"){this.contadores.likePositiveSelector=options.contadores.likePositiveSelector}
if(typeof options.contadores.likeNegativeSelector!="undefined"){this.contadores.likeNegativeSelector=options.contadores.likeNegativeSelector}
if(typeof options.contadores.rateVotesSelector!="undefined"){this.contadores.rateVotesSelector=options.contadores.rateVotesSelector}}
if(typeof options.dataFields!="undefined"){if(typeof options.dataFields.identifier!="undefined"){this.dataFields.identifier=options.dataFields.identifier}
if(typeof options.dataFields.score!="undefined"){this.dataFields.score=options.dataFields.score}
if(typeof options.dataFields.positive!="undefined"){this.dataFields.positive=options.dataFields.positive}
if(typeof options.dataFields.negative!="undefined"){this.dataFields.negative=options.dataFields.negative}}
if(typeof options.cookies!="undefined"){if(typeof options.cookies.cookieName!="undefined"){this.cookies.cookieName=options.cookies.cookieName}}
if(typeof options.actionURL!="undefined"){this.actionURL=options.actionURL}
if(typeof options.ajaxObjParams!="undefined"){this.ajaxObjParams=options.ajaxObjParams}}
this.numVotesSelector="[data-nVotes]"
this.starsSelector="[data-proRating] label";var parentObj=this;this.reflow()}
rateProObject.prototype.setOption=function(optionObj){if(typeof optionObj.elemFav!="undefined"){this.elemFav=optionObj.elemFav}}
rateProObject.prototype.reflow=function(){var parentObj=this;switch(parentObj.type){case "rate":$(parentObj.elemFav).addClass('rate');break;case "likeDislike":$(parentObj.elemFav).addClass('likeDislike');break}
this.elemNumVotes=$(this.elemFav).find(this.numVotesSelector);this.elemStars=$(this.elemFav).find(this.starsSelector);$(parentObj.elemStars).slice(1).off("mousedown.rating").on("mousedown.rating",function(){var valueToConvertToPrevious=$(this).closest($(parentObj.elemFav)).data('value');$(this).closest($(parentObj.elemFav)).data('prevValue',valueToConvertToPrevious)})
$(parentObj.elemStars).slice(1).off('touchstart.rating').on('touchstart.rating',function(){if(typeof $(this).closest($(parentObj.elemFav)).data('value')!="undefined"){$(this).closest($(parentObj.elemFav)).data('value',0)}
if($(this).find('input').prop('checked')==!0){$(this).closest($(parentObj.elemFav)).data('prevValue',$(this).find('input').val())}})
$(parentObj.elemStars).slice(1).off("mouseup.rating").on("mouseup.rating",function(){$(this).closest($(parentObj.elemFav)).data('value',$(this).find('input').val())
if($(this).closest($(parentObj.elemFav)).data('value')==$(this).closest($(parentObj.elemFav)).data('prevValue')){$(this).closest($(parentObj.elemFav)).find($(parentObj.elemStars)).eq(0).find("input").prop("checked",!0)
$(this).closest($(parentObj.elemFav)).data('prevValue',0)
$(this).closest($(parentObj.elemFav)).data('value',0)
$(this).closest($(parentObj.elemFav)).find($(parentObj.elemStars)).removeClass('is-active')}else{$(this).find('input').prop("checked",!0)
$(this).closest($(parentObj.elemFav)).data('value',$(this).find('input').val())
var clickedIndex=$(this).index();var i=0;$(this).closest($(parentObj.elemFav)).find($(parentObj.elemStars)).removeClass('is-active');if(parentObj.type=="rate"){$(this).closest($(parentObj.elemFav)).find($(parentObj.elemStars)).each(function(){if(i<clickedIndex){$(this).addClass('is-active')}
i++})}
$(this).addClass('is-active')}
parentObj.score=$(this).closest($(parentObj.elemFav)).data('value');if(parentObj.useIdInAttr){parentObj.id=$(this).closest("["+parentObj.useIdInAttr+"]").attr(parentObj.useIdInAttr)}
if(parentObj.onVoteClickCallback){parentObj.onVoteClickCallback()}else{parentObj.sendFav(parentObj.id,$(this).closest($(parentObj.elemFav)),parentObj.score)}})}
rateProObject.prototype.sendFav=function(identifier,formElem,score){if(!$(formElem).is("form")){var form=$(formElem).find('form')}else{var form=$(formElem)}
var parentObj=this;if(typeof identifier=="undefined"){var identifier=parentObj.id}
if(typeof score=="undefined"){var score=parentObj.score}
var extraFields=parentObj.extraFields;extraFields[parentObj.dataFields.identifier]=identifier;extraFields[parentObj.dataFields.score]=score;myForm=new formeSubmit($(form),parentObj.actionURL,{extraFields:extraFields,callbackOnSuccess:function(e){setVotingCounters(e,form);parentObj.callbackOnSuccess(e)}});function setVotingCounters(e,formElem){if(parentObj.type=="rate"){if(typeof e.data.votos!="undefined"){$(formElem).find(parentObj.contadores.rateVotesSelector).text(e.data.votos);var starsSelector=$(formElem).find(parentObj.stars.elemSelector);var starElem=$(starsSelector).find(parentObj.stars.starSelector);var htmlElementType=$(starElem).eq(0).removeClass();var html="";var score=e.data.score;var estrellasEnteras=Math.trunc((score*parentObj.stars.starsToShow)/parentObj.stars.maxRateValue)
var estrellasMedias=(score*parentObj.stars.starsToShow)%parentObj.stars.maxRateValue
$(starElem).remove();for(i=1;i<=parentObj.stars.starsToShow;i++){var htmlElem=htmlElementType;$(htmlElem).removeClass();if(i<=estrellasEnteras){$(htmlElem).addClass(parentObj.stars.fullClass)
html=html+$(htmlElem).prop('outerHTML')}else if(i==estrellasEnteras+1&&estrellasMedias>=49){$(htmlElem).addClass(parentObj.stars.halfClass)
html=html+$(htmlElem).prop('outerHTML')}else{$(htmlElem).addClass(parentObj.stars.emptyClass)
html=html+$(htmlElem).prop('outerHTML')}}
$(starsSelector).prepend(html)}}else{if(typeof e.data.score!="undefined"&&e.data.score.positive!="undefined"&&e.data.score.negative!="undefined"){$(formElem).find(parentObj.contadores.likePositiveSelector).text(e.data.score.positive);$(formElem).find(parentObj.contadores.likeNegativeSelector).text(e.data.score.negative)}}
if(getCookie(parentObj.cookies.cookieName)!=""){var cookie=getCookie(parentObj.cookies.cookieName);var cookieArray=cookie.split(",");var cookieFound=!1;$(cookieArray).each(function(index,value){if(value.search(parentObj.id+"_")>=0){cookieArray.splice(index,1);cookieFound=!0}})
if(parentObj.score!=0){cookieArray.push(parentObj.id+"_"+parentObj.score)}
cookieFound=!1;setCookie(parentObj.cookies.cookieName,cookieArray.join(),30)}else{if(parentObj.score!=0){setCookie(parentObj.cookies.cookieName,parentObj.id+"_"+parentObj.score,30)}}}};var docsProUploader=function(options){var self=this
this.formSelector='[data-docsUploader]'
this.docTypeSelector='[data-docsUploader] [data-docType]'
this.anversoSelector='[data-docsUploader] #localUploadFile1'
this.reversoSelector='[data-docsUploader] #localUploadFile2'
this.submitBtSelector='[data-docsUploader] [data-submit]'
this.removeBtSelector='[data-docs-list] [data-remove]'
this.onAddedFileCallback=function(){}
this.onRemovedFileCallback=function(){}
this.onSubmitEditionCallback=function(){}
this.onClosedCallback=function(){}
this.submitExtraFields={}
this.submitRemovalExtraFields={}
this.modalSelector='[data-reveal-source="addDoc"]'
this.modalAdjustSelector='[data-reveal-source="docsAdjuster"]'
this.expiration={expDaySelector:"[data-docsUploader] #docExpiration_day",expMonthSelector:"[data-docsUploader] #docExpiration_month",expYearSelector:"[data-docsUploader] #docExpiration_year",expDay:null,expMonth:null,expYear:null}
this.maxSize=5000000
this.outputCompression=1.0;this.statusMsg={};this.statusMsg.selector="[data-docsUploader] [data-status-msg]";this.statusMsg.okClasses="success";this.statusMsg.koClasses="alert";this.strings={sizeExceeds:"El tamaÃ±o del fichero excede de:",incomplete:"Error: Faltan datos por rellenar o ficheros por adjuntar.",ok:"OK, finalizando...",confirm:"Â¿Seguro que deseas eliminar el documento? TendrÃ¡s que aÃ±adirlo de nuevo.",caducidad:"Caducidad",fechaSubida:"Fecha de carga",waitingForApproval:"Recibido. Pendiente de verificaciÃ³n",send:"Enviar documento"}
this.statusTypesStr={0:"",1:"Aprobado",2:"Verificando",3:"Denegado",4:"Caducado"}
this.statusTypesStrClasses={0:"",1:"is-active",2:"on-hold",3:"denied",4:"denied"}
this.statusMsgDelete={};this.statusMsgDelete.selector="[data-status-msg]#removalError";this.statusMsgDelete.okClasses="success";this.statusMsgDelete.koClasses="alert";this.sendDataURL="/data/?action=docUpload";this.sendDeleteURL="/data/?action=docDelete";this.docsList=new Array();this.typeList={1:{name:"Documento de Identidad",hasReverso:!0,hasExpiration:!0,expirationString:"Fecha de caducidad"},2:{name:"Carnet de Conducir",hasReverso:!1,hasExpiration:!0,expirationString:"Fecha de caducidad"},3:{name:"Pasaporte",hasReverso:!1,hasExpiration:!0,expirationString:"Fecha de caducidad"},4:{name:"Origen de ingresos",hasReverso:!1,hasExpiration:!1},5:{name:"Origen de los fondos",hasReverso:!1,hasExpiration:!0,expirationString:"Fecha de caducidad"},6:{name:"Foto tarjeta de crÃ©dito",hasReverso:!1,hasExpiration:!0},expirationString:"Fecha de caducidad",7:{name:"Certificado cuenta bancaria",hasReverso:!1,hasExpiration:!0,expirationString:"Fecha de caducidad"},99:{name:"Otro documento",hasReverso:!1,hasExpiration:!1}}
this.currentType=null
this.filesTemp=new Array()
if(typeof options!="undefined"){if(typeof options.docsList!="undefined"){this.docsList=options.docsList}
if(typeof options.typeList!="undefined"){this.typeList=options.typeList}
if(typeof options.modalSelector!="undefined"){this.modalSelector=options.modalSelector}
if(typeof options.statusMsg!="undefined"){if(typeof options.statusMsg.selector!="undefined"){this.statusMsg.elem=options.statusMsg.elem}
if(typeof options.statusMsg.okClasses!="undefined"){this.statusMsg.okClasses=options.statusMsg.okClasses}
if(typeof options.statusMsg.koClasses!="undefined"){this.statusMsg.koClasses=options.statusMsg.koClasses}}
if(typeof options.statusMsgDelete!="undefined"){if(typeof options.statusMsgDelete.selector!="undefined"){this.statusMsgDelete.elem=options.statusMsgDelete.elem}
if(typeof options.statusMsgDelete.okClasses!="undefined"){this.statusMsgDelete.okClasses=options.statusMsgDelete.okClasses}
if(typeof options.statusMsgDelete.koClasses!="undefined"){this.statusMsgDelete.koClasses=options.statusMsgDelete.koClasses}}
if(typeof options.strings!="undefined"){if(typeof options.strings.sizeExceeds!="undefined"){this.strings.sizeExceeds=options.strings.sizeExceeds}
if(typeof options.strings.incomplete!="undefined"){this.strings.incomplete=options.strings.incomplete}
if(typeof options.strings.ok!="undefined"){this.strings.ok=options.strings.ok}
if(typeof options.strings.confirm!="undefined"){this.strings.confirm=options.strings.confirm}
if(typeof options.strings.caducidad!="undefined"){this.strings.caducidad=options.strings.caducidad}
if(typeof options.strings.fechaSubida!="undefined"){this.strings.fechaSubida=options.strings.fechaSubida}
if(typeof options.strings.waitingForApproval!="undefined"){this.strings.waitingForApproval=options.strings.waitingForApproval}
if(typeof options.strings.send!="undefined"){this.strings.send=options.strings.send}}
if(typeof options.expiration!="undefined"){if(typeof options.expiration.expDaySelector!="undefined"){this.expiration.expDaySelector=options.expiration.expDaySelector}
if(typeof options.expiration.expMonthSelector!="undefined"){this.expiration.expMonthSelector=options.expiration.expMonthSelector}
if(typeof options.expiration.expYearSelector!="undefined"){this.expiration.expYearSelector=options.expiration.expYearSelector}}
if(typeof options.submitBtSelector!="undefined"){this.submitBtSelector=options.submitBtSelector}
if(typeof options.onAddedFileCallback!="undefined"){this.onAddedFileCallback=options.onAddedFileCallback}
if(typeof options.onRemovedFileCallback!="undefined"){this.onRemovedFileCallback=options.onRemovedFileCallback}
if(typeof options.onSubmitEditionCallback!="undefined"){this.onSubmitEditionCallback=options.onSubmitEditionCallback}
if(typeof options.onClosedCallback!="undefined"){this.onClosedCallback=options.onClosedCallback}
if(typeof options.statusTypesStr!="undefined"){if(typeof options.statusTypesStr[0]!="undefined"){this.statusTypesStr[0]=options.statusTypesStr[0]}
if(typeof options.statusTypesStr[1]!="undefined"){this.statusTypesStr[1]=options.statusTypesStr[1]}
if(typeof options.statusTypesStr[2]!="undefined"){this.statusTypesStr[2]=options.statusTypesStr[2]}
if(typeof options.statusTypesStr[3]!="undefined"){this.statusTypesStr[3]=options.statusTypesStr[3]}
if(typeof options.statusTypesStr[4]!="undefined"){this.statusTypesStr[4]=options.statusTypesStr[4]}}
if(typeof options.submitExtraFields!="undefined"){this.submitExtraFields=options.submitExtraFields}
if(typeof options.submitRemovalExtraFields!="undefined"){this.submitRemovalExtraFields=options.submitRemovalExtraFields}
if(typeof options.sendDataURL!="undefined"){this.sendDataURL=options.sendDataURL}
if(typeof options.sendDeleteURL!="undefined"){this.sendDeleteURL=options.sendDeleteURL}
if(typeof options.maxFileSize!="undefined"){this.maxSize=options.maxFileSize}
if(typeof options.outputCompression!="undefined"){this.outputCompression=options.outputCompression}}
var elem=this.docTypeSelector
$(document).off("change",elem).on("change",elem,function(){if($(this).val().length>0){$(self.anversoSelector).removeAttr('disabled')
$('[data-anverso]').removeClass('disabled')
$('[data-expiration-form]').removeClass('disabled')
if(self.typeList[$(this).val()].hasReverso==!1){$(self.reversoSelector).attr('disabled','disabled')
$('[data-reverso]').addClass('disabled')}else{$(self.reversoSelector).removeAttr('disabled')
$('[data-reverso]').removeClass('disabled')}
if(self.typeList[$(this).val()].hasExpiration===!1){$('[data-expiration-form] #docExpiration_day').add('[data-expiration-form] #docExpiration_month').add('[data-expiration-form] #docExpiration_year').attr('disabled','disabled').attr('data-abide-ignore','');$('[data-expiration-form]').addClass('disabled')
self.expiration.expDay=null;self.expiration.expYear=null;self.expiration.expMonth=null;$('[data-expiration-form] #docExpiration_day option').eq(0).prop('selected',!0)
$('[data-expiration-form] #docExpiration_month option').eq(0).prop('selected',!0)
$('[data-expiration-form] #docExpiration_year option').eq(0).prop('selected',!0)}else{$('[data-expiration-form] #docExpiration_day').add('[data-expiration-form] #docExpiration_month').add('[data-expiration-form] #docExpiration_year').removeAttr('disabled').removeAttr('data-abide-ignore');$('[data-expiration-form]').removeClass('disabled')}
$(self.formSelector).find('[data-scheme]').removeClass('is-active');if(typeof self.typeList[$(this).val()].additional!="undefined"){$(self.typeList[$(this).val()].additional).each(function(k,v){switch(v.type){case "IBAN":var schemeElem=$(self.formSelector).find('[data-scheme = "IBAN"]');$(schemeElem).addClass('is-active');if(v.required){$(schemeElem).find('[data-field="iban"]').removeAttr('data-abide-ignore')}
break;case "SWIFT":var schemeElem=$(self.formSelector).find('[data-scheme = "SWIFT"]');$(schemeElem).addClass('is-active');if(v.required){$(schemeElem).find('[data-field="bic"]').removeAttr('data-abide-ignore')}
break;case "ADDITIONALBANKINFO":var schemeElem=$(self.formSelector).find('[data-scheme = "ADDITIONALBANKINFO"]');$(schemeElem).addClass('is-active');if(v.required){$(schemeElem).find('[data-field="bank_clabe"]').removeAttr('data-abide-ignore')}
break}})}}else{$(self.anversoSelector).attr('disabled','disabled')
$('[data-anverso]').addClass('disabled')
$('[data-expiration-form] #docExpiration_day').add('[data-expiration-form] #docExpiration_month').add('[data-expiration-form] #docExpiration_year').attr('disabled','disabled').attr('data-abide-ignore','');$('[data-expiration-form]').addClass('disabled')}})
$(document).off("change",this.expiration.expDaySelector).on("change",this.expiration.expDaySelector,function(){if($(this).val().length!=0){self.expiration.expDay=$(this).val()}else{self.expiration.expDay=null}})
$(document).off("change",this.expiration.expMonthSelector).on("change",this.expiration.expMonthSelector,function(){if($(this).val().length!=0){self.expiration.expMonth=$(this).val()}else{self.expiration.expMonth=null}})
$(document).off("change",this.expiration.expYearSelector).on("change",this.expiration.expYearSelector,function(){if($(this).val().length!=0){self.expiration.expYear=$(this).val()}else{self.expiration.expYear=null}})
$(document).off("click",this.modalSelector+" [data-core_reveal-close]").on("click",this.modalSelector+" [data-core_reveal-close]",function(){self.close()})
$(document).off("click",this.anversoSelector+","+this.formSelector+" "+this.reversoSelector).on("click",this.anversoSelector+","+this.formSelector+" "+this.reversoSelector,function(){$(this).val("")})
$(document).off("click",this.removeBtSelector).on("click",this.removeBtSelector,function(){var confirmation=confirm(self.strings.confirm)
if(confirmation){self.submitRemoval($(this).closest('[data-doc-id]').attr('data-doc-id'),{extraFields:self.submitRemovalExtraFields})}})
$(document).off("change",this.anversoSelector).on("change",this.anversoSelector,function(){retrImg(this,0)})
$(document).off("change",this.reversoSelector).on("change",this.reversoSelector,function(){retrImg(this,1)})
$(document).off("submit",this.formSelector).on("submit",this.formSelector,function(){retrieveAdditionalFieds();self.submit({extraFields:self.submitExtraFields})})
function retrImg(elem,imgStorageIndex){var msgElem=$(self.statusMsg.selector)
$(msgElem).hide()
var myPic=elem.files[0];var reader=new FileReader();reader.readAsDataURL(myPic);reader.onload=function(event){if(event.total>self.maxSize){$(msgElem).html("<p>"+self.strings.sizeExceeds+" "+self.maxSize+" bytes"+"</p>").addClass(self.statusMsg.koClasses).show()}else{self.filesTemp[imgStorageIndex]=event.target.result
markDone(imgStorageIndex,!0)
if(self.filesTemp[imgStorageIndex].substr(0,50).indexOf("application/pdf")==-1){self.openAdjuster(imgStorageIndex)}}}}
function markDone(imgStorageIndex,mode){if(imgStorageIndex==0){var elem=$(self.formSelector).find('[data-upload-status="1"]')}else if(imgStorageIndex==1){var elem=$(self.formSelector).find('[data-upload-status="2"]')}
if(mode){$(elem).addClass('is-active')}else{$(elem).removeClass('is-active')}}
function retrieveAdditionalFieds(){var elem=$(self.formSelector).find('[data-field]');var fieldsTmp={}
$(elem).each(function(k,v){fieldsTmp[$(v).attr('data-field')]=$(v).val()})
self.additionalFields=fieldsTmp;return fieldsTmp}}
docsProUploader.prototype.checkValidity=function(){var elem=this.docTypeSelector
if(this.typeList[$(elem).val()].hasReverso){if(this.filesTemp.length==2){return!0}else{return!1}}else{if(this.filesTemp.length>=1){return!0}else{return!1}}}
docsProUploader.prototype.addDoc=function(docObj){var self=this
var found=!1
$(this.docsList).each(function(){if(this.id==sansObj.docObj.id){this.docType=docObj.docType
this.expiration=docObj.expiration
if(typeof docObj.additionalFields!="undefined"){this.additionalFields=docObj.additionalFields}
found=!0
return!1}})
if(!found){this.docsList.push(docObj)}}
docsProUploader.prototype.removeDoc=function(id){var self=this
var i=0
$(this.docsList).each(function(){if(this.id==id){self.docsList.splice(i,1)
return!1}
i++})}
docsProUploader.prototype.getDocs=function(mode,filterByType){var self=this
if(mode=="editableTable"){var html=""
$(self.docsList).each(function(k,v){if(typeof filterByType!="undefined"&&filterByType!=null){if(parseInt(filterByType)!=this.docType){return!0}}
if(self.typeList[v.docType].hasExpiration===!0){var formatted_date=this.expiration.day+"/"+this.expiration.month+"/"+this.expiration.year
formatted_date="<strong>"+self.strings.caducidad+":</strong>"+formatted_date}else{var formatted_date=""}
var upload_date=" <strong>"+self.strings.fechaSubida+":</strong>"+this.uploadDate.day+"/"+this.uploadDate.month+"/"+this.uploadDate.year
formatted_date="<small>"+formatted_date+upload_date+"</small>";var content="<button data-reveal-params={\"id\":\""+this.id+"\"} data-reveal-source='add_doc' data-open='add_doc' type='button' >"+self.typeList[this.docType].name+formatted_date+"</button></td>"
if(this.deletable){var editableHTML='<div data-actions><button data-remove type="button"></button></div>'}else{var editableHTML=''}
var statusHTML='<span class="'+self.statusTypesStrClasses[this.status]+'">'+self.statusTypesStr[this.status]+'</span>'
html=html+'<tr data-doc-id="'+this.id+'"><td>'+content+'</td><td>'+statusHTML+'</td><td>'+editableHTML+'</td></tr>'})
return html}
if(mode=="nonEditableTable"){var html=""
$(self.docsList).each(function(){if(typeof filterByType!="undefined"&&filterByType!=null){if(parseInt(filterByType)!=this.docType){return!0}}
if(self.typeList[v.docType].hasExpiration===!0){var formatted_date="<strong>"+self.strings.caducidad+":</strong>"+formatted_date}else{var formatted_date=""}
var upload_date=" <strong>"+self.strings.fechaSubida+":</strong>"+this.uploadDate.day+"/"+this.uploadDate.month+"/"+this.uploadDate.year
var content="<button data-reveal-params={\"id\":\""+this.id+"\"} data-reveal-source='add_doc' data-open='add_doc' type='button' title='"+self.typeList[this.docType].name+"'>"+formatted_date+"</button></td>"
if(this.deletable){var editableHTML='<div data-actions><button data-remove type="button"></button></div>'}else{var editableHTML=''}
var statusHTML='<span class="'+self.statusTypesStrClasses[this.status]+'">'+self.statusTypesStr[this.status]+'</span>'
html=html+'<tr data-doc-id="'+this.id+'"><td>'+content+'</td><td>'+statusHTML+'</td><td>'+editableHTML+'</td></tr>'})
return html}else if(typeof mode=="undefined"||mode==null){if(typeof filterByType!="undefined"&&filterByType!=null){var filteredDocsList=new Array();$(self.docsList).each(function(){if(parseInt(filterByType)==this.docType){filteredDocsList.push(this)}})
return filteredDocsList}else{return this.docsList}}}
docsProUploader.prototype.open=function(typeID,showExclusive){var self=this
var exclusiveElem=!1;if(typeof showExclusive!="undefined"&&showExclusive===!0){exclusiveElem=!0}
if(typeof typeID!="undefined"){var type=self.getTypeFromID(typeID)}else{var type=null}
if(type!=null&&typeof type.provider!="undefined"&&type.provider!=null){self.openProvider(type)}else{self.filesTemp=new Array()
$(self.modalSelector).data('callback',function(){var keys=Object.keys(self.typeList)
$(keys).each(function(k,v){var elemObj=self.typeList[v]
if(typeof typeID!="undefined"){if(typeID==v){var selectedHTML='selected="selected"'}
$(self.modalSelector).find('[data-docs-list] tbody').html(self.getDocs("editableTable",typeID))}else{var selectedHTML=""}
if(typeof typeID!="undefined"&&((exclusiveElem&&v==typeID)||!exclusiveElem)||typeof typeID=="undefined"){$(self.docTypeSelector).append('<option value="'+v+'"'+selectedHTML+'>'+elemObj.name+'</option>')}})
if(typeof typeID!="undefined"){$(self.docTypeSelector).trigger('change')}})
if(typeof typeID!="undefined"&&typeID!=null){self.currentType=typeID}
$(self.modalSelector).core_reveal("open")}}
docsProUploader.prototype.openProvider=function(docType){var self=this;switch(docType.provider.code){case "silt":var url=docType.provider.url;window.location=url;break}}
docsProUploader.prototype.close=function(){var self=this
self.filesTemp=new Array()
self.currentType=null
self.onClosedCallback(self);$(self.modalSelector).core_reveal("close")}
docsProUploader.prototype.openAdjuster=function(imgStorageIndex){var self=this
var imgSelector='img#masterImage'
var selectionX=null
var selectionY=null
var selectionW=null
var selectionH=null
var imgLoader=null
$(self.modalAdjustSelector).data('callback',function(){imgLoader=new loaderProObject($('#picArea'),{enabledOnLoad:!0,insertBefore:!0});var parentObj=self
function loadImage(src,imgSelector){imgLoader.destroy()
var tmpUrl=src;var tmpImg=new Image;var realW=0
var realH=0
tmpImg.onload=function(){realW=tmpImg.width
realH=tmpImg.height
selectionX=0
selectionY=0
selectionW=realW
selectionH=realH};tmpImg.src=tmpUrl
$(imgSelector).attr('src',src)
$(imgSelector)[0].onload=function(){cropper=$(imgSelector).imgAreaSelect({handles:!0,imageHeight:realH,imageWidth:realW,onSelectEnd:function(img,selection){if(selection.width>0&&selection.height>0){selectionX=selection.x1
selectionY=selection.y1
selectionW=selection.width
selectionH=selection.height}},instance:!0})}};function resizeImage(url,width,height,x,y,callback){var canvas=document.createElement("canvas");var context=canvas.getContext('2d');var imageObj=new Image();canvas.width=width;canvas.height=height;imageObj.onload=function(){context.drawImage(imageObj,x,y,width,height,0,0,width,height);callback(canvas.toDataURL('image/jpeg',self.outputCompression))};imageObj.src=url}
function retrieveImg(imgSelector,callback){if(selectionW!=null&&selectionH!=null&&selectionX!=null&&selectionY!=null){resizeImage($(imgSelector)[0].src,selectionW,selectionH,selectionX,selectionY,function(e){callback(e)})}}
bamQueue.waitForExistance("$.imgAreaSelect",function(){var modalSelector=self.modalAdjustSelector
var editSelector=imgSelector
loadImage(self.filesTemp[imgStorageIndex],imgSelector)
$(modalSelector).find('[data-core_reveal-close]').off('click').on('click',function(){$('.imgareaselect-outer').remove()
$('.imgareaselect-selection').parent().remove()
$(modalSelector).core_reveal('close')})
$(modalSelector).find('button[data-submit]').off('click').on("click",function(){retrieveImg(editSelector,function(e){self.filesTemp[imgStorageIndex]=e
$('.imgareaselect-outer').remove()
$('.imgareaselect-selection').parent().remove()
if(imgStorageIndex==0){$('[data-localUploadFile1Thumb] [data-img]').css('background-image',"url("+self.filesTemp[imgStorageIndex]+")").parent().addClass('is-active')}else if(imgStorageIndex==1){$('[data-localUploadFile2Thumb] [data-img]').css('background-image',"url("+self.filesTemp[imgStorageIndex]+")").parent().addClass('is-active')}
$(self.modalAdjustSelector).core_reveal("close")})})})})
$(self.modalAdjustSelector).core_reveal("open")}
docsProUploader.prototype.submit=function(options){var self=this
var msgElem=$(self.statusMsg.selector)
var extraFields={}
var additionalFields={}
if(typeof options!="undefined"){if(typeof options.extraFields!="undefined"){extraFields=options.extraFields}}
if(this.checkValidity()){$(msgElem).html("<p>"+self.strings.ok+"</p>").removeClass(self.statusMsg.koClasses).addClass(self.statusMsg.okClasses).show()
var files=self.filesTemp
if(!self.typeList[$(self.docTypeSelector).val()].hasReverso){if(files.length>1){files=self.filesTemp.splice(1,files.length-1)}}
var docsListItem={id:null,type:$(self.docTypeSelector).val(),status:2,deletable:!0,expiration:{day:this.expiration.expDay,month:this.expiration.expMonth,year:this.expiration.expYear,},uploadDate:{day:null,month:null,year:null},files:files}
if(Object.keys(self.additionalFields).length>0){docsListItem.additionalFields=self.additionalFields}
extraFields.document=docsListItem;var forme=new formeSubmit(!1,self.sendDataURL,{submitBt:{elem:$(self.submitBtSelector),enableOnSuccess:!1},statusMsg:{elem:$(self.statusMsg.selector),},callbackOnSuccess:function(e){self.filesTemp=new Array()
self.docsList=e.data
self.onAddedFileCallback(e,self)},extraFields:extraFields})}else{$(msgElem).html("<p>"+self.strings.incomplete+"</p>").addClass(self.statusMsg.koClasses).show()}}
docsProUploader.prototype.getFiles=function(){return JSON.stringify(this.docsList)}
docsProUploader.prototype.submitRemoval=function(ID,options){var self=this
var extraFields={}
if(typeof options!="undefined"){if(typeof options.extraFields!="undefined"){extraFields=options.extraFields}}
extraFields.id=ID
var forme=new formeSubmit(!1,self.sendDeleteURL,{statusMsg:self.statusMsgDelete,callbackOnSuccess:function(e){self.docsList=e.data
self.onRemovedFileCallback(e,self)},extraFields:extraFields})}
docsProUploader.prototype.setOnAddedFileCallback=function(fn){this.onAddedFileCallback=fn}
docsProUploader.prototype.setOnRemovedFileCallback=function(fn){this.onRemovedFileCallback=fn}
docsProUploader.prototype.setOnClosedCallback=function(fn){this.onClosedCallback=fn}
docsProUploader.prototype.getTypeFromID=function(typeID){var self=this;var types=this.getTypeList();var valueToReturn=!1;$.each(types,function(key,value){if(key==typeID){valueToReturn=value;return!1}})
return valueToReturn}
docsProUploader.prototype.getTypeList=function(){return this.typeList}
docsProUploader.prototype.countItemsForDocType=function(docType,unique,ignoreRejected){var isUnique=!1;var isIgnoreRejected=!1;var total=0;var self=this;if(typeof unique!="undefined"&&unique===!0){isUnique=!0}
if(typeof ignoreRejected!="undefined"&&ignoreRejected===!0){isIgnoreRejected=!0}
var uniqueArray=new Array();$.each(self.docsList,function(k,v){if(Array.isArray(docType)){if(docType.indexOf(v.docType)!=-1){if(!isUnique){if(!isIgnoreRejected||(isIgnoreRejected&&(v.status!=3&&v.status!=4))){total++}}else{if(uniqueArray.indexOf(v.docType)==-1){if(!isIgnoreRejected||(isIgnoreRejected&&(v.status!=3&&v.status!=4))){total++;uniqueArray.push(v.docType)}}}}}else if(typeof docType!="undefined"&&docType!=null){if(v.docType==docType){if(!isUnique){if(!isIgnoreRejected||(isIgnoreRejected&&(v.status!=3&&v.status!=4))){total++}}else{if(uniqueArray.indexOf(v.docType)==-1){if(!isIgnoreRejected||(isIgnoreRejected&&(v.status!=3&&v.status!=4))){total++;uniqueArray.push(v.docType)}}}}}else{if(!unique){if(!isIgnoreRejected||(isIgnoreRejected&&(v.status!=3&&v.status!=4))){total++}}else{if(uniqueArray.indexOf(v.docType)==-1){if(!isIgnoreRejected||(isIgnoreRejected&&(v.status!=3&&v.status!=4))){total++;uniqueArray.push(v.docType)}}}}})
return total};/*! jQuery UI - v1.12.1 - 2020-06-11
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/draggable.js, widgets/droppable.js, widgets/resizable.js, widgets/selectable.js, widgets/sortable.js, widgets/mouse.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */
(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){function e(t){for(var e=t.css("visibility");"inherit"===e;)t=t.parent(),e=t.css("visibility");return"hidden"!==e}t.ui=t.ui||{},t.ui.version="1.12.1";var i=0,s=Array.prototype.slice;t.cleanData=function(e){return function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)try{s=t._data(n,"events"),s&&s.remove&&t(n).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,s){var n,o,a,r={},l=e.split(".")[0];e=e.split(".")[1];var h=l+"-"+e;return s||(s=i,i=t.Widget),t.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr[":"][h.toLowerCase()]=function(e){return!!t.data(e,h)},t[l]=t[l]||{},n=t[l][e],o=t[l][e]=function(t,e){return this._createWidget?(arguments.length&&this._createWidget(t,e),void 0):new o(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(s,function(e,s){return t.isFunction(s)?(r[e]=function(){function t(){return i.prototype[e].apply(this,arguments)}function n(t){return i.prototype[e].apply(this,t)}return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=o,e}}(),void 0):(r[e]=s,void 0)}),o.prototype=t.widget.extend(a,{widgetEventPrefix:n?a.widgetEventPrefix||e:e},r,{constructor:o,namespace:l,widgetName:e,widgetFullName:h}),n?(t.each(n._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var i,n,o=s.call(arguments,1),a=0,r=o.length;r>a;a++)for(i in o[a])n=o[a][i],o[a].hasOwnProperty(i)&&void 0!==n&&(e[i]=t.isPlainObject(n)?t.isPlainObject(e[i])?t.widget.extend({},e[i],n):t.widget.extend({},n):n);return e},t.widget.bridge=function(e,i){var n=i.prototype.widgetFullName||e;t.fn[e]=function(o){var a="string"==typeof o,r=s.call(arguments,1),l=this;return a?this.length||"instance"!==o?this.each(function(){var i,s=t.data(this,n);return"instance"===o?(l=s,!1):s?t.isFunction(s[o])&&"_"!==o.charAt(0)?(i=s[o].apply(s,r),i!==s&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+o+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; "+"attempted to call method '"+o+"'")}):l=void 0:(r.length&&(o=t.widget.extend.apply(null,[o].concat(r))),this.each(function(){var e=t.data(this,n);e?(e.option(o||{}),e._init&&e._init()):t.data(this,n,new i(o,this))})),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,function(t,i){e._removeClass(i,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;s.length-1>o;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){function i(i,o){var a,r;for(r=0;i.length>r;r++)a=n.classesElementLookup[i[r]]||t(),a=e.add?t(t.unique(a.get().concat(e.element.get()))):t(a.not(e.element).get()),n.classesElementLookup[i[r]]=a,s.push(i[r]),o&&e.classes[i[r]]&&s.push(e.classes[i[r]])}var s=[],n=this;return e=t.extend({element:this.element,classes:this.options.classes||{}},e),this._on(e.element,{remove:"_untrackClassesElement"}),e.keys&&i(e.keys.match(/\S+/g)||[],!0),e.extra&&i(e.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(e){var i=this;t.each(i.classesElementLookup,function(s,n){-1!==t.inArray(e.target,n)&&(i.classesElementLookup[s]=t(n.not(e.target).get()))})},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,function(s,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),h=l[1]+o.eventNamespace,u=l[2];u?n.on(h,u,r):i.on(h,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i).off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}}),t.widget,function(){function e(t,e,i){return[parseFloat(t[0])*(c.test(t[0])?e/100:1),parseFloat(t[1])*(c.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function s(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}var n,o=Math.max,a=Math.abs,r=/left|center|right/,l=/top|center|bottom/,h=/[\+\-]\d+(\.[\d]+)?%?/,u=/^\w+/,c=/%$/,d=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==n)return n;var e,i,s=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return t("body").append(s),e=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,e===i&&(i=s[0].clientWidth),s.remove(),n=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType,o=!s&&!n;return{element:i,isWindow:s,isDocument:n,offset:o?t(e).offset():{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.outerWidth(),height:i.outerHeight()}}},t.fn.position=function(n){if(!n||!n.of)return d.apply(this,arguments);n=t.extend({},n);var c,p,f,m,g,_,v=t(n.of),b=t.position.getWithinInfo(n.within),y=t.position.getScrollInfo(b),w=(n.collision||"flip").split(" "),k={};return _=s(v),v[0].preventDefault&&(n.at="left top"),p=_.width,f=_.height,m=_.offset,g=t.extend({},m),t.each(["my","at"],function(){var t,e,i=(n[this]||"").split(" ");1===i.length&&(i=r.test(i[0])?i.concat(["center"]):l.test(i[0])?["center"].concat(i):["center","center"]),i[0]=r.test(i[0])?i[0]:"center",i[1]=l.test(i[1])?i[1]:"center",t=h.exec(i[0]),e=h.exec(i[1]),k[this]=[t?t[0]:0,e?e[0]:0],n[this]=[u.exec(i[0])[0],u.exec(i[1])[0]]}),1===w.length&&(w[1]=w[0]),"right"===n.at[0]?g.left+=p:"center"===n.at[0]&&(g.left+=p/2),"bottom"===n.at[1]?g.top+=f:"center"===n.at[1]&&(g.top+=f/2),c=e(k.at,p,f),g.left+=c[0],g.top+=c[1],this.each(function(){var s,r,l=t(this),h=l.outerWidth(),u=l.outerHeight(),d=i(this,"marginLeft"),_=i(this,"marginTop"),D=h+d+i(this,"marginRight")+y.width,x=u+_+i(this,"marginBottom")+y.height,C=t.extend({},g),M=e(k.my,l.outerWidth(),l.outerHeight());"right"===n.my[0]?C.left-=h:"center"===n.my[0]&&(C.left-=h/2),"bottom"===n.my[1]?C.top-=u:"center"===n.my[1]&&(C.top-=u/2),C.left+=M[0],C.top+=M[1],s={marginLeft:d,marginTop:_},t.each(["left","top"],function(e,i){t.ui.position[w[e]]&&t.ui.position[w[e]][i](C,{targetWidth:p,targetHeight:f,elemWidth:h,elemHeight:u,collisionPosition:s,collisionWidth:D,collisionHeight:x,offset:[c[0]+M[0],c[1]+M[1]],my:n.my,at:n.at,within:b,elem:l})}),n.using&&(r=function(t){var e=m.left-C.left,i=e+p-h,s=m.top-C.top,r=s+f-u,c={target:{element:v,left:m.left,top:m.top,width:p,height:f},element:{element:l,left:C.left,top:C.top,width:h,height:u},horizontal:0>i?"left":e>0?"right":"center",vertical:0>r?"top":s>0?"bottom":"middle"};h>p&&p>a(e+i)&&(c.horizontal="center"),u>f&&f>a(s+r)&&(c.vertical="middle"),c.important=o(a(e),a(i))>o(a(s),a(r))?"horizontal":"vertical",n.using.call(this,t,c)}),l.offset(t.extend(C,{using:r}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,l=n-r,h=r+e.collisionWidth-a-n;e.collisionWidth>a?l>0&&0>=h?(i=t.left+l+e.collisionWidth-a-n,t.left+=l-i):t.left=h>0&&0>=l?n:l>h?n+a-e.collisionWidth:n:l>0?t.left+=l:h>0?t.left-=h:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,l=n-r,h=r+e.collisionHeight-a-n;e.collisionHeight>a?l>0&&0>=h?(i=t.top+l+e.collisionHeight-a-n,t.top+=l-i):t.top=h>0&&0>=l?n:l>h?n+a-e.collisionHeight:n:l>0?t.top+=l:h>0?t.top-=h:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,o=n.offset.left+n.scrollLeft,r=n.width,l=n.isWindow?n.scrollLeft:n.offset.left,h=t.left-e.collisionPosition.marginLeft,u=h-l,c=h+e.collisionWidth-r-l,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>u?(i=t.left+d+p+f+e.collisionWidth-r-o,(0>i||a(u)>i)&&(t.left+=d+p+f)):c>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-l,(s>0||c>a(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,o=n.offset.top+n.scrollTop,r=n.height,l=n.isWindow?n.scrollTop:n.offset.top,h=t.top-e.collisionPosition.marginTop,u=h-l,c=h+e.collisionHeight-r-l,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>u?(s=t.top+p+f+m+e.collisionHeight-r-o,(0>s||a(u)>s)&&(t.top+=p+f+m)):c>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-l,(i>0||c>a(i))&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}}}(),t.ui.position,t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,s){return!!t.data(e,s[3])}}),t.fn.extend({disableSelection:function(){var t="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.on(t+".ui-disableSelection",function(t){t.preventDefault()})}}(),enableSelection:function(){return this.off(".ui-disableSelection")}}),t.ui.focusable=function(i,s){var n,o,a,r,l,h=i.nodeName.toLowerCase();return"area"===h?(n=i.parentNode,o=n.name,i.href&&o&&"map"===n.nodeName.toLowerCase()?(a=t("img[usemap='#"+o+"']"),a.length>0&&a.is(":visible")):!1):(/^(input|select|textarea|button|object)$/.test(h)?(r=!i.disabled,r&&(l=t(i).closest("fieldset")[0],l&&(r=!l.disabled))):r="a"===h?i.href||s:s,r&&t(i).is(":visible")&&e(t(i)))},t.extend(t.expr[":"],{focusable:function(e){return t.ui.focusable(e,null!=t.attr(e,"tabindex"))}}),t.ui.focusable,t.fn.form=function(){return"string"==typeof this[0].form?this.closest("form"):t(this[0].form)},t.ui.formResetMixin={_formResetHandler:function(){var e=t(this);setTimeout(function(){var i=e.data("ui-form-reset-instances");t.each(i,function(){this.refresh()})})},_bindFormResetHandler:function(){if(this.form=this.element.form(),this.form.length){var t=this.form.data("ui-form-reset-instances")||[];t.length||this.form.on("reset.ui-form-reset",this._formResetHandler),t.push(this),this.form.data("ui-form-reset-instances",t)}},_unbindFormResetHandler:function(){if(this.form.length){var e=this.form.data("ui-form-reset-instances");e.splice(t.inArray(this,e),1),e.length?this.form.data("ui-form-reset-instances",e):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")}}},"1.7"===t.fn.jquery.substring(0,3)&&(t.each(["Width","Height"],function(e,i){function s(e,i,s,o){return t.each(n,function(){i-=parseFloat(t.css(e,"padding"+this))||0,s&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),o&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),a={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(e){return void 0===e?a["inner"+i].call(this):this.each(function(){t(this).css(o,s(this,e)+"px")})},t.fn["outer"+i]=function(e,n){return"number"!=typeof e?a["outer"+i].call(this,e):this.each(function(){t(this).css(o,s(this,e,!0,n)+"px")})}}),t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},t.ui.escapeSelector=function(){var t=/([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;return function(e){return e.replace(t,"\\$1")}}(),t.fn.labels=function(){var e,i,s,n,o;return this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(n=this.eq(0).parents("label"),s=this.attr("id"),s&&(e=this.eq(0).parents().last(),o=e.add(e.length?e.siblings():this.siblings()),i="label[for='"+t.ui.escapeSelector(s)+"']",n=n.add(o.find(i).addBack(i))),this.pushStack(n))},t.fn.scrollParent=function(e){var i=this.css("position"),s="absolute"===i,n=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return s&&"static"===e.css("position")?!1:n.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&o.length?o:t(this[0].ownerDocument||document)},t.extend(t.expr[":"],{tabbable:function(e){var i=t.attr(e,"tabindex"),s=null!=i;return(!s||i>=0)&&t.ui.focusable(e,s)}}),t.fn.extend({uniqueId:function(){var t=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++t)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&t(this).removeAttr("id")})}}),t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());var n=!1;t(document).on("mouseup",function(){n=!1}),t.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.on("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).on("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(e){if(!n){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(e),this._mouseDownEvent=e;var i=this,s=1===e.which,o="string"==typeof this.options.cancel&&e.target.nodeName?t(e.target).closest(this.options.cancel).length:!1;return s&&!o&&this._mouseCapture(e)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(e)!==!1,!this._mouseStarted)?(e.preventDefault(),!0):(!0===t.data(e.target,this.widgetName+".preventClickEvent")&&t.removeData(e.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return i._mouseMove(t)},this._mouseUpDelegate=function(t){return i._mouseUp(t)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),e.preventDefault(),n=!0,!0)):!0}},_mouseMove:function(e){if(this._mouseMoved){if(t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button)return this._mouseUp(e);if(!e.which)if(e.originalEvent.altKey||e.originalEvent.ctrlKey||e.originalEvent.metaKey||e.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(e)}return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,n=!1,e.preventDefault()},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),t.ui.plugin={add:function(e,i,s){var n,o=t.ui[e].prototype;for(n in s)o.plugins[n]=o.plugins[n]||[],o.plugins[n].push([i,s[n]])},call:function(t,e,i,s){var n,o=t.plugins[e];if(o&&(s||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(n=0;o.length>n;n++)t.options[o[n][0]]&&o[n][1].apply(t.element,i)}},t.ui.safeActiveElement=function(t){var e;try{e=t.activeElement}catch(i){e=t.body}return e||(e=t.body),e.nodeName||(e=t.body),e},t.ui.safeBlur=function(e){e&&"body"!==e.nodeName.toLowerCase()&&t(e).trigger("blur")},t.widget("ui.draggable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(e){var i=this.options;return this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),this.handle?(this._blurActiveElement(e),this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(e){this.iframeBlocks=this.document.find(e).map(function(){var e=t(this);return t("<div>").css("position","absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(e){var i=t.ui.safeActiveElement(this.document[0]),s=t(e.target);s.closest(i).length||t.ui.safeBlur(i)},_mouseStart:function(e){var i=this.options;return this.helper=this._createHelper(e),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===t(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(e),this.originalPosition=this.position=this._generatePosition(e,!1),this.originalPageX=e.pageX,this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(e,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",e,s)===!1)return this._mouseUp(new t.Event("mouseup",e)),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var i=this,s=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(s=t.ui.ddmanager.drop(this,e)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",e)!==!1&&i._clear()}):this._trigger("stop",e)!==!1&&this._clear(),!1},_mouseUp:function(e){return this._unblockFrames(),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),this.handleElement.is(e.target)&&this.element.trigger("focus"),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new t.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(e){return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper),n=s?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){var e=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position(),e=this._isRootNode(this.scrollParent[0]);return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options,o=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,t(o).width()-this.helperProportions.width-this.margins.left,(t(o).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=t(n.containment),s=i[0],s&&(e=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)},_convertPositionTo:function(t,e){e||(e=this.position);var i="absolute"===t?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:e.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:e.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(t,e){var i,s,n,o,a=this.options,r=this._isRootNode(this.scrollParent[0]),l=t.pageX,h=t.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),e&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),a.grid&&(n=a.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/a.grid[1])*a.grid[1]:this.originalPageY,h=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-a.grid[1]:n+a.grid[1]:n,o=a.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/a.grid[0])*a.grid[0]:this.originalPageX,l=i?o-this.offset.click.left>=i[0]||o-this.offset.click.left>i[2]?o:o-this.offset.click.left>=i[0]?o-a.grid[0]:o+a.grid[0]:o),"y"===a.axis&&(l=this.originalPageX),"x"===a.axis&&(h=this.originalPageY)),{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_trigger:function(e,i,s){return s=s||this._uiHash(),t.ui.plugin.call(this,e,[i,s,this],!0),/^(drag|start|stop)/.test(e)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),t.Widget.prototype._trigger.call(this,e,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,i,s){var n=t.extend({},i,{item:s.element});s.sortables=[],t(s.options.connectToSortable).each(function(){var i=t(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",e,n))})},stop:function(e,i,s){var n=t.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,t.each(s.sortables,function(){var t=this;t.isOver?(t.isOver=0,s.cancelHelperRemoval=!0,t.cancelHelperRemoval=!1,t._storedCSS={position:t.placeholder.css("position"),top:t.placeholder.css("top"),left:t.placeholder.css("left")},t._mouseStop(e),t.options.helper=t.options._helper):(t.cancelHelperRemoval=!0,t._trigger("deactivate",e,n))})},drag:function(e,i,s){t.each(s.sortables,function(){var n=!1,o=this;o.positionAbs=s.positionAbs,o.helperProportions=s.helperProportions,o.offset.click=s.offset.click,o._intersectsWith(o.containerCache)&&(n=!0,t.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==o&&this._intersectsWith(this.containerCache)&&t.contains(o.element[0],this.element[0])&&(n=!1),n})),n?(o.isOver||(o.isOver=1,s._parent=i.helper.parent(),o.currentItem=i.helper.appendTo(o.element).data("ui-sortable-item",!0),o.options._helper=o.options.helper,o.options.helper=function(){return i.helper[0]},e.target=o.currentItem[0],o._mouseCapture(e,!0),o._mouseStart(e,!0,!0),o.offset.click.top=s.offset.click.top,o.offset.click.left=s.offset.click.left,o.offset.parent.left-=s.offset.parent.left-o.offset.parent.left,o.offset.parent.top-=s.offset.parent.top-o.offset.parent.top,s._trigger("toSortable",e),s.dropped=o.element,t.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,o.fromOutside=s),o.currentItem&&(o._mouseDrag(e),i.position=o.position)):o.isOver&&(o.isOver=0,o.cancelHelperRemoval=!0,o.options._revert=o.options.revert,o.options.revert=!1,o._trigger("out",e,o._uiHash(o)),o._mouseStop(e,!0),o.options.revert=o.options._revert,o.options.helper=o.options._helper,o.placeholder&&o.placeholder.remove(),i.helper.appendTo(s._parent),s._refreshOffsets(e),i.position=s._generatePosition(e,!0),s._trigger("fromSortable",e),s.dropped=!1,t.each(s.sortables,function(){this.refreshPositions()}))})}}),t.ui.plugin.add("draggable","cursor",{start:function(e,i,s){var n=t("body"),o=s.options;n.css("cursor")&&(o._cursor=n.css("cursor")),n.css("cursor",o.cursor)},stop:function(e,i,s){var n=s.options;n._cursor&&t("body").css("cursor",n._cursor)}}),t.ui.plugin.add("draggable","opacity",{start:function(e,i,s){var n=t(i.helper),o=s.options;n.css("opacity")&&(o._opacity=n.css("opacity")),n.css("opacity",o.opacity)},stop:function(e,i,s){var n=s.options;n._opacity&&t(i.helper).css("opacity",n._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(t,e,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(e,i,s){var n=s.options,o=!1,a=s.scrollParentNotHidden[0],r=s.document[0];a!==r&&"HTML"!==a.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+a.offsetHeight-e.pageY<n.scrollSensitivity?a.scrollTop=o=a.scrollTop+n.scrollSpeed:e.pageY-s.overflowOffset.top<n.scrollSensitivity&&(a.scrollTop=o=a.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+a.offsetWidth-e.pageX<n.scrollSensitivity?a.scrollLeft=o=a.scrollLeft+n.scrollSpeed:e.pageX-s.overflowOffset.left<n.scrollSensitivity&&(a.scrollLeft=o=a.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(e.pageY-t(r).scrollTop()<n.scrollSensitivity?o=t(r).scrollTop(t(r).scrollTop()-n.scrollSpeed):t(window).height()-(e.pageY-t(r).scrollTop())<n.scrollSensitivity&&(o=t(r).scrollTop(t(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(e.pageX-t(r).scrollLeft()<n.scrollSensitivity?o=t(r).scrollLeft(t(r).scrollLeft()-n.scrollSpeed):t(window).width()-(e.pageX-t(r).scrollLeft())<n.scrollSensitivity&&(o=t(r).scrollLeft(t(r).scrollLeft()+n.scrollSpeed)))),o!==!1&&t.ui.ddmanager&&!n.dropBehaviour&&t.ui.ddmanager.prepareOffsets(s,e)}}),t.ui.plugin.add("draggable","snap",{start:function(e,i,s){var n=s.options;s.snapElements=[],t(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var e=t(this),i=e.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:e.outerWidth(),height:e.outerHeight(),top:i.top,left:i.left})})},drag:function(e,i,s){var n,o,a,r,l,h,u,c,d,p,f=s.options,m=f.snapTolerance,g=i.offset.left,_=g+s.helperProportions.width,v=i.offset.top,b=v+s.helperProportions.height;for(d=s.snapElements.length-1;d>=0;d--)l=s.snapElements[d].left-s.margins.left,h=l+s.snapElements[d].width,u=s.snapElements[d].top-s.margins.top,c=u+s.snapElements[d].height,l-m>_||g>h+m||u-m>b||v>c+m||!t.contains(s.snapElements[d].item.ownerDocument,s.snapElements[d].item)?(s.snapElements[d].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,e,t.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(n=m>=Math.abs(u-b),o=m>=Math.abs(c-v),a=m>=Math.abs(l-_),r=m>=Math.abs(h-g),n&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),o&&(i.position.top=s._convertPositionTo("relative",{top:c,left:0}).top),a&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left)),p=n||o||a||r,"outer"!==f.snapMode&&(n=m>=Math.abs(u-v),o=m>=Math.abs(c-b),a=m>=Math.abs(l-g),r=m>=Math.abs(h-_),n&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),o&&(i.position.top=s._convertPositionTo("relative",{top:c-s.helperProportions.height,left:0}).top),a&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left)),!s.snapElements[d].snapping&&(n||o||a||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,e,t.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=n||o||a||r||p)}}),t.ui.plugin.add("draggable","stack",{start:function(e,i,s){var n,o=s.options,a=t.makeArray(t(o.stack)).sort(function(e,i){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0)});a.length&&(n=parseInt(t(a[0]).css("zIndex"),10)||0,t(a).each(function(e){t(this).css("zIndex",n+e)}),this.css("zIndex",n+a.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,i,s){var n=t(i.helper),o=s.options;n.css("zIndex")&&(o._zIndex=n.css("zIndex")),n.css("zIndex",o.zIndex)},stop:function(e,i,s){var n=s.options;n._zIndex&&t(i.helper).css("zIndex",n._zIndex)}}),t.ui.draggable,t.widget("ui.droppable",{version:"1.12.1",widgetEventPrefix:"drop",options:{accept:"*",addClasses:!0,greedy:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=t.isFunction(s)?s:function(t){return t.is(s)},this.proportions=function(){return arguments.length?(e=arguments[0],void 0):e?e:e={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this._addClass("ui-droppable")},_addToManager:function(e){t.ui.ddmanager.droppables[e]=t.ui.ddmanager.droppables[e]||[],t.ui.ddmanager.droppables[e].push(this)},_splice:function(t){for(var e=0;t.length>e;e++)t[e]===this&&t.splice(e,1)},_destroy:function(){var e=t.ui.ddmanager.droppables[this.options.scope];this._splice(e)},_setOption:function(e,i){if("accept"===e)this.accept=t.isFunction(i)?i:function(t){return t.is(i)};else if("scope"===e){var s=t.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(e,i)},_activate:function(e){var i=t.ui.ddmanager.current;this._addActiveClass(),i&&this._trigger("activate",e,this.ui(i))},_deactivate:function(e){var i=t.ui.ddmanager.current;this._removeActiveClass(),i&&this._trigger("deactivate",e,this.ui(i))},_over:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this._addHoverClass(),this._trigger("over",e,this.ui(i)))},_out:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this._removeHoverClass(),this._trigger("out",e,this.ui(i)))},_drop:function(e,i){var s=i||t.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=t(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&o(s,t.extend(i,{offset:i.element.offset()}),i.options.tolerance,e)?(n=!0,!1):void 0}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this._removeActiveClass(),this._removeHoverClass(),this._trigger("drop",e,this.ui(s)),this.element):!1):!1},ui:function(t){return{draggable:t.currentItem||t.element,helper:t.helper,position:t.position,offset:t.positionAbs}},_addHoverClass:function(){this._addClass("ui-droppable-hover")},_removeHoverClass:function(){this._removeClass("ui-droppable-hover")},_addActiveClass:function(){this._addClass("ui-droppable-active")},_removeActiveClass:function(){this._removeClass("ui-droppable-active")}});var o=t.ui.intersect=function(){function t(t,e,i){return t>=e&&e+i>t}return function(e,i,s,n){if(!i.offset)return!1;var o=(e.positionAbs||e.position.absolute).left+e.margins.left,a=(e.positionAbs||e.position.absolute).top+e.margins.top,r=o+e.helperProportions.width,l=a+e.helperProportions.height,h=i.offset.left,u=i.offset.top,c=h+i.proportions().width,d=u+i.proportions().height;switch(s){case"fit":return o>=h&&c>=r&&a>=u&&d>=l;case"intersect":return o+e.helperProportions.width/2>h&&c>r-e.helperProportions.width/2&&a+e.helperProportions.height/2>u&&d>l-e.helperProportions.height/2;case"pointer":return t(n.pageY,u,i.proportions().height)&&t(n.pageX,h,i.proportions().width);case"touch":return(a>=u&&d>=a||l>=u&&d>=l||u>a&&l>d)&&(o>=h&&c>=o||r>=h&&c>=r||h>o&&r>c);default:return!1}}}();t.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,i){var s,n,o=t.ui.ddmanager.droppables[e.options.scope]||[],a=i?i.type:null,r=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();t:for(s=0;o.length>s;s++)if(!(o[s].options.disabled||e&&!o[s].accept.call(o[s].element[0],e.currentItem||e.element))){for(n=0;r.length>n;n++)if(r[n]===o[s].element[0]){o[s].proportions().height=0;continue t}o[s].visible="none"!==o[s].element.css("display"),o[s].visible&&("mousedown"===a&&o[s]._activate.call(o[s],i),o[s].offset=o[s].element.offset(),o[s].proportions({width:o[s].element[0].offsetWidth,height:o[s].element[0].offsetHeight}))}},drop:function(e,i){var s=!1;return t.each((t.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&o(e,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(e,i){e.element.parentsUntil("body").on("scroll.droppable",function(){e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)})},drag:function(e,i){e.options.refreshPositions&&t.ui.ddmanager.prepareOffsets(e,i),t.each(t.ui.ddmanager.droppables[e.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,a,r=o(e,this,this.options.tolerance,i),l=!r&&this.isover?"isout":r&&!this.isover?"isover":null;l&&(this.options.greedy&&(n=this.options.scope,a=this.element.parents(":data(ui-droppable)").filter(function(){return t(this).droppable("instance").options.scope===n}),a.length&&(s=t(a[0]).droppable("instance"),s.greedyChild="isover"===l)),s&&"isover"===l&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[l]=!0,this["isout"===l?"isover":"isout"]=!1,this["isover"===l?"_over":"_out"].call(this,i),s&&"isout"===l&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(e,i){e.element.parentsUntil("body").off("scroll.droppable"),e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)}},t.uiBackCompat!==!1&&t.widget("ui.droppable",t.ui.droppable,{options:{hoverClass:!1,activeClass:!1},_addActiveClass:function(){this._super(),this.options.activeClass&&this.element.addClass(this.options.activeClass)},_removeActiveClass:function(){this._super(),this.options.activeClass&&this.element.removeClass(this.options.activeClass)},_addHoverClass:function(){this._super(),this.options.hoverClass&&this.element.addClass(this.options.hoverClass)},_removeHoverClass:function(){this._super(),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass)}}),t.ui.droppable,t.widget("ui.resizable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(t){return parseFloat(t)||0},_isNumber:function(t){return!isNaN(parseFloat(t))},_hasScroll:function(e,i){if("hidden"===t(e).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return e[s]>0?!0:(e[s]=1,n=e[s]>0,e[s]=0,n)},_create:function(){var e,i=this.options,s=this;this._addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!i.aspectRatio,aspectRatio:i.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:i.helper||i.ghost||i.animate?i.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,e={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")},this.element.css(e),this.originalElement.css("margin",0),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css(e),this._proportionallyResize()),this._setupHandles(),i.autoHide&&t(this.element).on("mouseenter",function(){i.disabled||(s._removeClass("ui-resizable-autohide"),s._handles.show())}).on("mouseleave",function(){i.disabled||s.resizing||(s._addClass("ui-resizable-autohide"),s._handles.hide())}),this._mouseInit()},_destroy:function(){this._mouseDestroy();var e,i=function(e){t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_setOption:function(t,e){switch(this._super(t,e),t){case"handles":this._removeHandles(),this._setupHandles();break;default:}},_setupHandles:function(){var e,i,s,n,o,a=this.options,r=this;if(this.handles=a.handles||(t(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=t(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),s=this.handles.split(","),this.handles={},i=0;s.length>i;i++)e=t.trim(s[i]),n="ui-resizable-"+e,o=t("<div>"),this._addClass(o,"ui-resizable-handle "+n),o.css({zIndex:a.zIndex}),this.handles[e]=".ui-resizable-"+e,this.element.append(o);this._renderAxis=function(e){var i,s,n,o;e=e||this.element;for(i in this.handles)this.handles[i].constructor===String?this.handles[i]=this.element.children(this.handles[i]).first().show():(this.handles[i].jquery||this.handles[i].nodeType)&&(this.handles[i]=t(this.handles[i]),this._on(this.handles[i],{mousedown:r._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(s=t(this.handles[i],this.element),o=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),e.css(n,o),this._proportionallyResize()),this._handles=this._handles.add(this.handles[i])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.on("mouseover",function(){r.resizing||(this.className&&(o=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),r.axis=o&&o[1]?o[1]:"se")}),a.autoHide&&(this._handles.hide(),this._addClass("ui-resizable-autohide"))},_removeHandles:function(){this._handles.remove()},_mouseCapture:function(e){var i,s,n=!1;for(i in this.handles)s=t(this.handles[i])[0],(s===e.target||t.contains(s,e.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(e){var i,s,n,o=this.options,a=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),o.containment&&(i+=t(o.containment).scrollLeft()||0,s+=t(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:a.width(),height:a.height()},this.originalSize=this._helper?{width:a.outerWidth(),height:a.outerHeight()}:{width:a.width(),height:a.height()},this.sizeDiff={width:a.outerWidth()-a.width(),height:a.outerHeight()-a.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:e.pageX,top:e.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=t(".ui-resizable-"+this.axis).css("cursor"),t("body").css("cursor","auto"===n?this.axis+"-resize":n),this._addClass("ui-resizable-resizing"),this._propagate("start",e),!0},_mouseDrag:function(e){var i,s,n=this.originalMousePosition,o=this.axis,a=e.pageX-n.left||0,r=e.pageY-n.top||0,l=this._change[o];return this._updatePrevProperties(),l?(i=l.apply(this,[e,a,r]),this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(i=this._updateRatio(i,e)),i=this._respectSize(i,e),this._updateCache(i),this._propagate("resize",e),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",e,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(e){this.resizing=!1;var i,s,n,o,a,r,l,h=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&this._hasScroll(i[0],"left")?0:u.sizeDiff.height,o=s?0:u.sizeDiff.width,a={width:u.helper.width()-o,height:u.helper.height()-n},r=parseFloat(u.element.css("left"))+(u.position.left-u.originalPosition.left)||null,l=parseFloat(u.element.css("top"))+(u.position.top-u.originalPosition.top)||null,h.animate||this.element.css(t.extend(a,{top:l,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!h.animate&&this._proportionallyResize()),t("body").css("cursor","auto"),this._removeClass("ui-resizable-resizing"),this._propagate("stop",e),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var t={};return this.position.top!==this.prevPosition.top&&(t.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(t.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(t.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(t.height=this.size.height+"px"),this.helper.css(t),t},_updateVirtualBoundaries:function(t){var e,i,s,n,o,a=this.options;o={minWidth:this._isNumber(a.minWidth)?a.minWidth:0,maxWidth:this._isNumber(a.maxWidth)?a.maxWidth:1/0,minHeight:this._isNumber(a.minHeight)?a.minHeight:0,maxHeight:this._isNumber(a.maxHeight)?a.maxHeight:1/0},(this._aspectRatio||t)&&(e=o.minHeight*this.aspectRatio,s=o.minWidth/this.aspectRatio,i=o.maxHeight*this.aspectRatio,n=o.maxWidth/this.aspectRatio,e>o.minWidth&&(o.minWidth=e),s>o.minHeight&&(o.minHeight=s),o.maxWidth>i&&(o.maxWidth=i),o.maxHeight>n&&(o.maxHeight=n)),this._vBoundaries=o},_updateCache:function(t){this.offset=this.helper.offset(),this._isNumber(t.left)&&(this.position.left=t.left),this._isNumber(t.top)&&(this.position.top=t.top),this._isNumber(t.height)&&(this.size.height=t.height),this._isNumber(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,i=this.size,s=this.axis;return this._isNumber(t.height)?t.width=t.height*this.aspectRatio:this._isNumber(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===s&&(t.left=e.left+(i.width-t.width),t.top=null),"nw"===s&&(t.top=e.top+(i.height-t.height),t.left=e.left+(i.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,i=this.axis,s=this._isNumber(t.width)&&e.maxWidth&&e.maxWidth<t.width,n=this._isNumber(t.height)&&e.maxHeight&&e.maxHeight<t.height,o=this._isNumber(t.width)&&e.minWidth&&e.minWidth>t.width,a=this._isNumber(t.height)&&e.minHeight&&e.minHeight>t.height,r=this.originalPosition.left+this.originalSize.width,l=this.originalPosition.top+this.originalSize.height,h=/sw|nw|w/.test(i),u=/nw|ne|n/.test(i);return o&&(t.width=e.minWidth),a&&(t.height=e.minHeight),s&&(t.width=e.maxWidth),n&&(t.height=e.maxHeight),o&&h&&(t.left=r-e.minWidth),s&&h&&(t.left=r-e.maxWidth),a&&u&&(t.top=l-e.minHeight),n&&u&&(t.top=l-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_getPaddingPlusBorderDimensions:function(t){for(var e=0,i=[],s=[t.css("borderTopWidth"),t.css("borderRightWidth"),t.css("borderBottomWidth"),t.css("borderLeftWidth")],n=[t.css("paddingTop"),t.css("paddingRight"),t.css("paddingBottom"),t.css("paddingLeft")];4>e;e++)i[e]=parseFloat(s[e])||0,i[e]+=parseFloat(n[e])||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var t,e=0,i=this.helper||this.element;this._proportionallyResizeElements.length>e;e++)t=this._proportionallyResizeElements[e],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(t)),t.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var e=this.element,i=this.options;this.elementOffset=e.offset(),this._helper?(this.helper=this.helper||t("<div style='overflow:hidden;'></div>"),this._addClass(this.helper,this._helper),this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize,s=this.originalPosition;return{left:s.left+e,width:i.width-e}},n:function(t,e,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},sw:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,i,s]))},ne:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},nw:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,i,s]))}},_propagate:function(e,i){t.ui.plugin.call(this,e,[i,this.ui()]),"resize"!==e&&this._trigger(e,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),t.ui.plugin.add("resizable","animate",{stop:function(e){var i=t(this).resizable("instance"),s=i.options,n=i._proportionallyResizeElements,o=n.length&&/textarea/i.test(n[0].nodeName),a=o&&i._hasScroll(n[0],"left")?0:i.sizeDiff.height,r=o?0:i.sizeDiff.width,l={width:i.size.width-r,height:i.size.height-a},h=parseFloat(i.element.css("left"))+(i.position.left-i.originalPosition.left)||null,u=parseFloat(i.element.css("top"))+(i.position.top-i.originalPosition.top)||null;i.element.animate(t.extend(l,u&&h?{top:u,left:h}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseFloat(i.element.css("width")),height:parseFloat(i.element.css("height")),top:parseFloat(i.element.css("top")),left:parseFloat(i.element.css("left"))};n&&n.length&&t(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",e)}})}}),t.ui.plugin.add("resizable","containment",{start:function(){var e,i,s,n,o,a,r,l=t(this).resizable("instance"),h=l.options,u=l.element,c=h.containment,d=c instanceof t?c.get(0):/parent/.test(c)?u.parent().get(0):c;d&&(l.containerElement=t(d),/document/.test(c)||c===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:t(document),left:0,top:0,width:t(document).width(),height:t(document).height()||document.body.parentNode.scrollHeight}):(e=t(d),i=[],t(["Top","Right","Left","Bottom"]).each(function(t,s){i[t]=l._num(e.css("padding"+s))}),l.containerOffset=e.offset(),l.containerPosition=e.position(),l.containerSize={height:e.innerHeight()-i[3],width:e.innerWidth()-i[1]},s=l.containerOffset,n=l.containerSize.height,o=l.containerSize.width,a=l._hasScroll(d,"left")?d.scrollWidth:o,r=l._hasScroll(d)?d.scrollHeight:n,l.parentData={element:d,left:s.left,top:s.top,width:a,height:r}))},resize:function(e){var i,s,n,o,a=t(this).resizable("instance"),r=a.options,l=a.containerOffset,h=a.position,u=a._aspectRatio||e.shiftKey,c={top:0,left:0},d=a.containerElement,p=!0;d[0]!==document&&/static/.test(d.css("position"))&&(c=l),h.left<(a._helper?l.left:0)&&(a.size.width=a.size.width+(a._helper?a.position.left-l.left:a.position.left-c.left),u&&(a.size.height=a.size.width/a.aspectRatio,p=!1),a.position.left=r.helper?l.left:0),h.top<(a._helper?l.top:0)&&(a.size.height=a.size.height+(a._helper?a.position.top-l.top:a.position.top),u&&(a.size.width=a.size.height*a.aspectRatio,p=!1),a.position.top=a._helper?l.top:0),n=a.containerElement.get(0)===a.element.parent().get(0),o=/relative|absolute/.test(a.containerElement.css("position")),n&&o?(a.offset.left=a.parentData.left+a.position.left,a.offset.top=a.parentData.top+a.position.top):(a.offset.left=a.element.offset().left,a.offset.top=a.element.offset().top),i=Math.abs(a.sizeDiff.width+(a._helper?a.offset.left-c.left:a.offset.left-l.left)),s=Math.abs(a.sizeDiff.height+(a._helper?a.offset.top-c.top:a.offset.top-l.top)),i+a.size.width>=a.parentData.width&&(a.size.width=a.parentData.width-i,u&&(a.size.height=a.size.width/a.aspectRatio,p=!1)),s+a.size.height>=a.parentData.height&&(a.size.height=a.parentData.height-s,u&&(a.size.width=a.size.height*a.aspectRatio,p=!1)),p||(a.position.left=a.prevPosition.left,a.position.top=a.prevPosition.top,a.size.width=a.prevSize.width,a.size.height=a.prevSize.height)},stop:function(){var e=t(this).resizable("instance"),i=e.options,s=e.containerOffset,n=e.containerPosition,o=e.containerElement,a=t(e.helper),r=a.offset(),l=a.outerWidth()-e.sizeDiff.width,h=a.outerHeight()-e.sizeDiff.height;e._helper&&!i.animate&&/relative/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:l,height:h}),e._helper&&!i.animate&&/static/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:l,height:h})}}),t.ui.plugin.add("resizable","alsoResize",{start:function(){var e=t(this).resizable("instance"),i=e.options;t(i.alsoResize).each(function(){var e=t(this);e.data("ui-resizable-alsoresize",{width:parseFloat(e.width()),height:parseFloat(e.height()),left:parseFloat(e.css("left")),top:parseFloat(e.css("top"))})})},resize:function(e,i){var s=t(this).resizable("instance"),n=s.options,o=s.originalSize,a=s.originalPosition,r={height:s.size.height-o.height||0,width:s.size.width-o.width||0,top:s.position.top-a.top||0,left:s.position.left-a.left||0};t(n.alsoResize).each(function(){var e=t(this),s=t(this).data("ui-resizable-alsoresize"),n={},o=e.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(o,function(t,e){var i=(s[e]||0)+(r[e]||0);i&&i>=0&&(n[e]=i||null)}),e.css(n)})},stop:function(){t(this).removeData("ui-resizable-alsoresize")}}),t.ui.plugin.add("resizable","ghost",{start:function(){var e=t(this).resizable("instance"),i=e.size;e.ghost=e.originalElement.clone(),e.ghost.css({opacity:.25,display:"block",position:"relative",height:i.height,width:i.width,margin:0,left:0,top:0}),e._addClass(e.ghost,"ui-resizable-ghost"),t.uiBackCompat!==!1&&"string"==typeof e.options.ghost&&e.ghost.addClass(this.options.ghost),e.ghost.appendTo(e.helper)},resize:function(){var e=t(this).resizable("instance");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=t(this).resizable("instance");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}}),t.ui.plugin.add("resizable","grid",{resize:function(){var e,i=t(this).resizable("instance"),s=i.options,n=i.size,o=i.originalSize,a=i.originalPosition,r=i.axis,l="number"==typeof s.grid?[s.grid,s.grid]:s.grid,h=l[0]||1,u=l[1]||1,c=Math.round((n.width-o.width)/h)*h,d=Math.round((n.height-o.height)/u)*u,p=o.width+c,f=o.height+d,m=s.maxWidth&&p>s.maxWidth,g=s.maxHeight&&f>s.maxHeight,_=s.minWidth&&s.minWidth>p,v=s.minHeight&&s.minHeight>f;s.grid=l,_&&(p+=h),v&&(f+=u),m&&(p-=h),g&&(f-=u),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=a.top-d):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=a.left-c):((0>=f-u||0>=p-h)&&(e=i._getPaddingPlusBorderDimensions(this)),f-u>0?(i.size.height=f,i.position.top=a.top-d):(f=u-e.height,i.size.height=f,i.position.top=a.top+o.height-f),p-h>0?(i.size.width=p,i.position.left=a.left-c):(p=h-e.width,i.size.width=p,i.position.left=a.left+o.width-p))}}),t.ui.resizable,t.widget("ui.selectable",t.ui.mouse,{version:"1.12.1",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var e=this;this._addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){e.elementPos=t(e.element[0]).offset(),e.selectees=t(e.options.filter,e.element[0]),e._addClass(e.selectees,"ui-selectee"),e.selectees.each(function(){var i=t(this),s=i.offset(),n={left:s.left-e.elementPos.left,top:s.top-e.elementPos.top};t.data(this,"selectable-item",{element:this,$element:i,left:n.left,top:n.top,right:n.left+i.outerWidth(),bottom:n.top+i.outerHeight(),startselected:!1,selected:i.hasClass("ui-selected"),selecting:i.hasClass("ui-selecting"),unselecting:i.hasClass("ui-unselecting")})})},this.refresh(),this._mouseInit(),this.helper=t("<div>"),this._addClass(this.helper,"ui-selectable-helper")},_destroy:function(){this.selectees.removeData("selectable-item"),this._mouseDestroy()},_mouseStart:function(e){var i=this,s=this.options;this.opos=[e.pageX,e.pageY],this.elementPos=t(this.element[0]).offset(),this.options.disabled||(this.selectees=t(s.filter,this.element[0]),this._trigger("start",e),t(s.appendTo).append(this.helper),this.helper.css({left:e.pageX,top:e.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=t.data(this,"selectable-item");s.startselected=!0,e.metaKey||e.ctrlKey||(i._removeClass(s.$element,"ui-selected"),s.selected=!1,i._addClass(s.$element,"ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",e,{unselecting:s.element}))}),t(e.target).parents().addBack().each(function(){var s,n=t.data(this,"selectable-item");return n?(s=!e.metaKey&&!e.ctrlKey||!n.$element.hasClass("ui-selected"),i._removeClass(n.$element,s?"ui-unselecting":"ui-selected")._addClass(n.$element,s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",e,{selecting:n.element}):i._trigger("unselecting",e,{unselecting:n.element}),!1):void 0}))},_mouseDrag:function(e){if(this.dragged=!0,!this.options.disabled){var i,s=this,n=this.options,o=this.opos[0],a=this.opos[1],r=e.pageX,l=e.pageY;return o>r&&(i=r,r=o,o=i),a>l&&(i=l,l=a,a=i),this.helper.css({left:o,top:a,width:r-o,height:l-a}),this.selectees.each(function(){var i=t.data(this,"selectable-item"),h=!1,u={};i&&i.element!==s.element[0]&&(u.left=i.left+s.elementPos.left,u.right=i.right+s.elementPos.left,u.top=i.top+s.elementPos.top,u.bottom=i.bottom+s.elementPos.top,"touch"===n.tolerance?h=!(u.left>r||o>u.right||u.top>l||a>u.bottom):"fit"===n.tolerance&&(h=u.left>o&&r>u.right&&u.top>a&&l>u.bottom),h?(i.selected&&(s._removeClass(i.$element,"ui-selected"),i.selected=!1),i.unselecting&&(s._removeClass(i.$element,"ui-unselecting"),i.unselecting=!1),i.selecting||(s._addClass(i.$element,"ui-selecting"),i.selecting=!0,s._trigger("selecting",e,{selecting:i.element}))):(i.selecting&&((e.metaKey||e.ctrlKey)&&i.startselected?(s._removeClass(i.$element,"ui-selecting"),i.selecting=!1,s._addClass(i.$element,"ui-selected"),i.selected=!0):(s._removeClass(i.$element,"ui-selecting"),i.selecting=!1,i.startselected&&(s._addClass(i.$element,"ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",e,{unselecting:i.element}))),i.selected&&(e.metaKey||e.ctrlKey||i.startselected||(s._removeClass(i.$element,"ui-selected"),i.selected=!1,s._addClass(i.$element,"ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",e,{unselecting:i.element})))))}),!1}},_mouseStop:function(e){var i=this;return this.dragged=!1,t(".ui-unselecting",this.element[0]).each(function(){var s=t.data(this,"selectable-item");i._removeClass(s.$element,"ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",e,{unselected:s.element})}),t(".ui-selecting",this.element[0]).each(function(){var s=t.data(this,"selectable-item");i._removeClass(s.$element,"ui-selecting")._addClass(s.$element,"ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",e,{selected:s.element})}),this._trigger("stop",e),this.helper.remove(),!1}}),t.widget("ui.sortable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(t,e,i){return t>=e&&e+i>t},_isFloating:function(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))},_create:function(){this.containerCache={},this._addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(t,e){this._super(t,e),"handle"===t&&this._setHandleClassName()},_setHandleClassName:function(){var e=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle"),t.each(this.items,function(){e._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(e,i){var s=null,n=!1,o=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,o.widgetName+"-item")===o?(s=t(this),!1):void 0}),t.data(e.target,o.widgetName+"-item")===o&&(s=t(e.target)),s?!this.options.handle||i||(t(this.options.handle,s).find("*").addBack().each(function(){this===e.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(e,i,s){var n,o,a=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,a.cursorAt&&this._adjustOffsetFromHelper(a.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),a.containment&&this._setContainment(),a.cursor&&"auto"!==a.cursor&&(o=this.document.find("body"),this.storedCursor=o.css("cursor"),o.css("cursor",a.cursor),this.storedStylesheet=t("<style>*{ cursor: "+a.cursor+" !important; }</style>").appendTo(o)),a.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",a.opacity)),a.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",a.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this._addClass(this.helper,"ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,s,n,o,a=this.options,r=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<a.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+a.scrollSpeed:e.pageY-this.overflowOffset.top<a.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-a.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<a.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+a.scrollSpeed:e.pageX-this.overflowOffset.left<a.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-a.scrollSpeed)):(e.pageY-this.document.scrollTop()<a.scrollSensitivity?r=this.document.scrollTop(this.document.scrollTop()-a.scrollSpeed):this.window.height()-(e.pageY-this.document.scrollTop())<a.scrollSensitivity&&(r=this.document.scrollTop(this.document.scrollTop()+a.scrollSpeed)),e.pageX-this.document.scrollLeft()<a.scrollSensitivity?r=this.document.scrollLeft(this.document.scrollLeft()-a.scrollSpeed):this.window.width()-(e.pageX-this.document.scrollLeft())<a.scrollSensitivity&&(r=this.document.scrollLeft(this.document.scrollLeft()+a.scrollSpeed))),r!==!1&&t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],o=this._intersectsWithPointer(s),o&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===o?"next":"prev"]()[0]!==n&&!t.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],n):!0)){if(this.direction=1===o?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(e,s),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var s=this,n=this.placeholder.offset(),o=this.options.axis,a={};o&&"x"!==o||(a.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),o&&"y"!==o||(a.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(a,parseInt(this.options.revert,10)||500,function(){s._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp(new t.Event("mouseup",{target:null})),"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&s.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!s.length&&e.key&&s.push(e.key+"="),s.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},i.each(function(){s.push(t(e.item||this).attr(e.attribute||"id")||"")}),s},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,o=t.left,a=o+t.width,r=t.top,l=r+t.height,h=this.offset.click.top,u=this.offset.click.left,c="x"===this.options.axis||s+h>r&&l>s+h,d="y"===this.options.axis||e+u>o&&a>e+u,p=c&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?p:e+this.helperProportions.width/2>o&&a>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&l>n-this.helperProportions.height/2},_intersectsWithPointer:function(t){var e,i,s="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),n="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),o=s&&n;return o?(e=this._getDragVerticalDirection(),i=this._getDragHorizontalDirection(),this.floating?"right"===i||"down"===e?2:1:e&&("down"===e?2:1)):!1},_intersectsWithSides:function(t){var e=this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&e||"up"===s&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){function i(){r.push(this)}var s,n,o,a,r=[],l=[],h=this._connectWith();if(h&&e)for(s=h.length-1;s>=0;s--)for(o=t(h[s],this.document[0]),n=o.length-1;n>=0;n--)a=t.data(o[n],this.widgetFullName),a&&a!==this&&!a.options.disabled&&l.push([t.isFunction(a.options.items)?a.options.items.call(a.element):t(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a]);for(l.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=l.length-1;s>=0;s--)l[s][0].each(i);return t(r)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;e.length>i;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,s,n,o,a,r,l,h,u=this.items,c=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(n=t(d[i],this.document[0]),s=n.length-1;s>=0;s--)o=t.data(n[s],this.widgetFullName),o&&o!==this&&!o.options.disabled&&(c.push([t.isFunction(o.options.items)?o.options.items.call(o.element[0],e,{item:this.currentItem}):t(o.options.items,o.element),o]),this.containers.push(o));for(i=c.length-1;i>=0;i--)for(a=c[i][1],r=c[i][0],s=0,h=r.length;h>s;s++)l=t(r[s]),l.data(this.widgetName+"-item",a),u.push({item:l,instance:a,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.floating=this.items.length?"x"===this.options.axis||this._isFloating(this.items[0].item):!1,this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,o;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?t(this.options.toleranceElement,s.item):s.item,e||(s.width=n.outerWidth(),s.height=n.outerHeight()),o=n.offset(),s.left=o.left,s.top=o.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)o=this.containers[i].element.offset(),this.containers[i].containerCache.left=o.left,this.containers[i].containerCache.top=o.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,s=e.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=e.currentItem[0].nodeName.toLowerCase(),n=t("<"+s+">",e.document[0]);return e._addClass(n,"ui-sortable-placeholder",i||e.currentItem[0].className)._removeClass(n,"ui-sortable-helper"),"tbody"===s?e._createTrPlaceholder(e.currentItem.find("tr").eq(0),t("<tr>",e.document[0]).appendTo(n)):"tr"===s?e._createTrPlaceholder(e.currentItem,n):"img"===s&&n.attr("src",e.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(t,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(s.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),s.placeholder.update(e,e.placeholder)},_createTrPlaceholder:function(e,i){var s=this;e.children().each(function(){t("<td>&#160;</td>",s.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(i)})},_contactContainers:function(e){var i,s,n,o,a,r,l,h,u,c,d=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!t.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(d&&t.contains(this.containers[i].element[0],d.element[0]))continue;d=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",e,this._uiHash(this)),this.containers[i].containerCache.over=0);if(d)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(n=1e4,o=null,u=d.floating||this._isFloating(this.currentItem),a=u?"left":"top",r=u?"width":"height",c=u?"pageX":"pageY",s=this.items.length-1;s>=0;s--)t.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(l=this.items[s].item.offset()[a],h=!1,e[c]-l>this.items[s][r]/2&&(h=!0),n>Math.abs(e[c]-l)&&(n=Math.abs(e[c]-l),o=this.items[s],this.direction=h?"up":"down"));if(!o&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;o?this._rearrange(e,o,null,!0):this._rearrange(e,null,this.containers[p].element,!0),this._trigger("change",e,this._uiHash()),this.containers[p]._trigger("change",e,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===n.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===n.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(e=t(n.containment)[0],i=t(n.containment).offset(),s="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():o?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():o?0:n.scrollLeft())*s}},_generatePosition:function(e){var i,s,n=this.options,o=e.pageX,a=e.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(a=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(a=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((a-this.originalPageY)/n.grid[1])*n.grid[1],a=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((o-this.originalPageX)/n.grid[0])*n.grid[0],o=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:a-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():l?0:r.scrollTop()),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():l?0:r.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){function i(t,e,i){return function(s){i._trigger(t,s,e._uiHash(e))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&n.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||n.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(n.push(function(t){this._trigger("remove",t,this._uiHash())}),n.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)e||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!e){for(s=0;n.length>s;s++)n[s].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}})});/*!
 * jQuery UI Touch Punch 1.0.7 as modified by RWAP Software
 * based on original touchpunch v0.2.3 which has not been updated since 2014
 *
 * Updates by RWAP Software to take account of various suggested changes on the original code issues
 *
 * Original: https://github.com/furf/jquery-ui-touch-punch
 * Copyright 2011â€“2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Fork: https://github.com/RWAP/jquery-ui-touch-punch
 *
 * Depends:
 * jquery.ui.widget.js
 * jquery.ui.mouse.js
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery","jquery.ui"],a)}else{a(jQuery)}}(function(c){c.support.touch=("ontouchstart" in document||"ontouchstart" in window||window.TouchEvent||(window.DocumentTouch&&document instanceof DocumentTouch)||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0);if(!c.support.touch||!c.ui.mouse){return}var e=c.ui.mouse.prototype,g=e._mouseInit,d=e._mouseDestroy,b;function a(h){return{x:h.originalEvent.changedTouches[0].pageX,y:h.originalEvent.changedTouches[0].pageY}}function f(i,j){if(i.originalEvent.touches.length>1){return}if(i.cancelable){i.preventDefault()}var k=i.originalEvent.changedTouches[0],h=document.createEvent("MouseEvents");h.initMouseEvent(j,!0,!0,window,1,k.screenX,k.screenY,k.clientX,k.clientY,!1,!1,!1,!1,0,null);i.target.dispatchEvent(h)}e._touchStart=function(i){var h=this;this._startedMove=i.timeStamp;h._startPos=a(i);if(b||!h._mouseCapture(i.originalEvent.changedTouches[0])){return}b=!0;h._touchMoved=!1;f(i,"mouseover");f(i,"mousemove");f(i,"mousedown")};e._touchMove=function(h){if(!b){return}this._touchMoved=!0;f(h,"mousemove")};e._touchEnd=function(j){if(!b){return}f(j,"mouseup");f(j,"mouseout");var h=j.timeStamp-this._startedMove;if(!this._touchMoved||h<500){f(j,"click")}else{var i=a(j);if((Math.abs(i.x-this._startPos.x)<10)&&(Math.abs(i.y-this._startPos.y)<10)){if(!this._touchMoved||j.originalEvent.changedTouches[0].touchType==="stylus"){f(j,"click")}}}this._touchMoved=!1;b=!1};e._mouseInit=function(){var h=this;h.element.on({touchstart:c.proxy(h,"_touchStart"),touchmove:c.proxy(h,"_touchMove"),touchend:c.proxy(h,"_touchEnd")});g.call(h)};e._mouseDestroy=function(){var h=this;h.element.off({touchstart:c.proxy(h,"_touchStart"),touchmove:c.proxy(h,"_touchMove"),touchend:c.proxy(h,"_touchEnd")});d.call(h)}}))