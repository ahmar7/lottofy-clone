
function ToggleShowHide(objectID) {
    var theElementStyle = document.getElementById(objectID);
    if (theElementStyle.style.display == "none") {
        theElementStyle.style.display = "block";
    } else {
        theElementStyle.style.display = "none";
    }
}




function popwin(url, thetitle, thewidth, theheight) {
    window.open(url, thetitle, "toolbar=no,location=no,directories=no,status=no, menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=" + thewidth + ",height=" + theheight + "");
}

function printWindow() {
    bV = parseInt(navigator.appVersion)
    if (bV >= 4) window.print()
}


function bookmark(url, title) {
    if (document.all)
        window.external.AddFavorite(url, title)
}


function FormatNumber(num, format, shortformat) {
    if (format == null) { format = "###-##-####"; }
    if (shortformat == null) { var shortformat = ""; }
    var validchars = "0123456789";
    var tempstring = "";
    var returnstring = "";
    var extension = "";
    var tempstringpointer = 0;
    var returnstringpointer = 0;
    count = 0;
    // Get the length so we can go through and remove all non-numeric characters
    var length = num.value.length;

    // We are only concerned with the format of the phone number - extensions can be left alone.
    if (length > format.length) { length = format.length; };

    // scroll through what the user has typed
    for (var x = 0; x < length; x++) {
        if (validchars.indexOf(num.value.charAt(x)) != -1) {
            tempstring = tempstring + num.value.charAt(x);
        };
    };
    // We should now have just the #'s - extract the extension if needed
    if (num.value.length > format.length) {
        length = format.length;
        extension = num.value.substr(format.length, (num.value.length - format.length));
    };

    // if we have fewer characters than our short format, we'll default to the short version.
    for (x = 0; x < shortformat.length; x++) {
        if (shortformat.substr(x, 1) == "#") {
            count++;
        };
    }
    if (tempstring.length <= count) {
        format = shortformat;
    };

    //Loop through the format string and insert the numbers where we find a # sign
    for (x = 0; x < format.length; x++) {
        if (tempstringpointer <= tempstring.length) {
            if (format.substr(x, 1) == "#") {
                returnstring = returnstring + tempstring.substr(tempstringpointer, 1);
                tempstringpointer++;
            } else {
                returnstring = returnstring + format.substr(x, 1);
            }
        }

    }

    // We have gone through the entire format, let's add the extension back on.
    returnstring = returnstring + extension;

    //we're done - let's return our value to the field.
    num.value = returnstring;
}



function filterInput(filterType, evt, allowDecimal, allowCustom) {
    var keyCode, Char, inputField, filter = '';
    var alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var num = '0123456789';
    // Get the Key Code of the Key pressed if possible else - allow
    if (window.event) {
        keyCode = window.event.keyCode;
        evt = window.event;
    } else if (evt) keyCode = evt.which;
    else return true;
    // Setup the allowed Character Set
    if (filterType == 0) filter = alpha;
    else if (filterType == 1) filter = num;
    else if (filterType == 2) filter = alpha + num;
    if (allowCustom) filter += allowCustom;
    if (filter == '') return true;
    // Get the Element that triggered the Event
    inputField = evt.srcElement ? evt.srcElement : evt.target || evt.currentTarget;
    // If the Key Pressed is a CTRL key like Esc, Enter etc - allow
    if ((keyCode == null) || (keyCode == 0) || (keyCode == 8) || (keyCode == 9) || (keyCode == 13) || (keyCode == 27)) return true;
    // Get the Pressed Character
    Char = String.fromCharCode(keyCode);
    // If the Character is a number - allow
    if ((filter.indexOf(Char) > -1)) return true;
    // Else if Decimal Point is allowed and the Character is '.' - allow
    else if (filterType == 1 && allowDecimal && (Char == '.') && inputField.value.indexOf('.') == -1) return true;
    else return false;
}

function emailformatcheck(str) {

    var at = "@"
    var dot = "."
    var lat = str.indexOf(at)
    var lstr = str.length
    var ldot = str.indexOf(dot)
    if (str.indexOf(at) == -1) {
        return false
    }
    if (str.indexOf(at) == -1 || str.indexOf(at) == 0 || str.indexOf(at) == lstr) {
        return false
    }
    if (str.indexOf(dot) == -1 || str.indexOf(dot) == 0 || str.indexOf(dot) == lstr) {
        return false
    }
    if (str.indexOf(at, (lat + 1)) != -1) {
        return false
    }
    if (str.substring(lat - 1, lat) == dot || str.substring(lat + 1, lat + 2) == dot) {
        return false
    }
    if (str.indexOf(dot, (lat + 2)) == -1) {
        return false
    }
    if (str.indexOf(" ") != -1) {
        return false
    }
    return true
}


function smoothScroll(target) {
    $('body,html').animate({ 'scrollTop': target.offset().top - 110 }, 600);
}

/*
$(document).ready(function() {	
    $(".navscroll").on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
});
*/



function ReloadIMG(target) {
    target.src = target.src;
}





function loadFragmentInToElement(fragment_url, element_id, loadafter_url, loadafter_id) {
    var tmpVal = 'Loading ...';
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    var element = document.getElementById(element_id);
    element.innerHTML = tmpVal;
    //alert(fragment_url);
    xmlhttp.open("GET", fragment_url);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            element.innerHTML = xmlhttp.responseText;
            tmpVal = element.innerHTML;
            if (loadafter_id) {
                loadFragmentInToElement(loadafter_url, loadafter_id);
            }
        }
    }
    xmlhttp.send(null);
}


function postFragmentInToElement(fragment_url, element_id, postval) {
    var tmpVal = 'Loading ...';
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    var element = document.getElementById(element_id);
    element.innerHTML = tmpVal;
    //alert(fragment_url);
    xmlhttp.open("POST", fragment_url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            element.innerHTML = xmlhttp.responseText;
            tmpVal = element.innerHTML;
            if (element.innerHTML == "...") {
                document.betform.submit();
            } else {
                document.getElementById('submitbtn').disabled = false;
            }
        }
    }
    xmlhttp.send(postval);
}



function cmsBase64Encode(decStr) {
    var base64s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var bits;
    var dual;
    var i = 0;
    var encOut = "";
    while (decStr.length >= i + 3) {
        bits = (decStr.charCodeAt(i++) & 0xff) << 16 | (decStr.charCodeAt(i++) & 0xff) << 8 | decStr.charCodeAt(i++) & 0xff;
        encOut += base64s.charAt((bits & 0x00fc0000) >> 18) + base64s.charAt((bits & 0x0003f000) >> 12) + base64s.charAt((bits & 0x00000fc0) >> 6) + base64s.charAt((bits & 0x0000003f));
    }
    if (decStr.length - i > 0 && decStr.length - i < 3) {
        dual = Boolean(decStr.length - i - 1);
        bits = ((decStr.charCodeAt(i++) & 0xff) << 16) | (dual ? (decStr.charCodeAt(i) & 0xff) << 8 : 0);
        encOut += base64s.charAt((bits & 0x00fc0000) >> 18) + base64s.charAt((bits & 0x0003f000) >> 12) + (dual ? base64s.charAt((bits & 0x00000fc0) >> 6) : '=') + '=';
    }
    return (encOut);
}


function cmsBase64Decode(encStr) {
    var base64s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var bits;
    var decOut = "";
    var i = 0;
    for (; i < encStr.length; i += 4) {
        bits = (base64s.indexOf(encStr.charAt(i)) & 0xff) << 18 | (base64s.indexOf(encStr.charAt(i + 1)) & 0xff) << 12 | (base64s.indexOf(encStr.charAt(i + 2)) & 0xff) << 6 | base64s.indexOf(encStr.charAt(i + 3)) & 0xff;
        decOut += String.fromCharCode((bits & 0xff0000) >> 16, (bits & 0xff00) >> 8, bits & 0xff);
    }
    if (encStr.charCodeAt(i - 2) == 61) {
        return (decOut.substring(0, decOut.length - 2));
    } else if (encStr.charCodeAt(i - 1) == 61) {
        return (decOut.substring(0, decOut.length - 1));
    } else {
        return (decOut);
    }
}


$(document).ready(function () {
    $("a.linkclicked").click(function () {
        $(this).attr('disabled', 'disabled');
    });

});