(function($){var selectors=[];var checkBinded=!1;var checkLock=!1;var defaults={interval:250,force_process:!1};var $window=$(window);var $priorAppeared=[];function isAppeared(){return $(this).is(':appeared')}
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
return jQuery}()));bamQueue.addToQueue(function(){onLoadFunction()})
function onLoadFunction(){if(typeof attachRateEvents!="undefined"){attachRateEvents()};$('input[type=text],input[type=password],input[type=search],input[type=email]').keypress(function(e){if(e.keyCode==13){e.preventDefault();$(this).closest('form').submit()}})
$(".accordion.core_animated > dd:first-child > div.content, .accordion.core_animated > li:first-child > div.content").slideToggle("normal").addClass("active");tab2select();core_library=new core_dropdown();bamQueue.waitForExistance("updateTables",function(){updateTables()},500)
$(document).off('click.button-group',".button-group .button").on('click.button-group',".button-group .button",function(){$(this).closest('.button-group').find('.button').removeClass('is-active');$(this).addClass('is-active')})}
var core_dropdown=function(options){this.caller;this.ddpanel;this.toggleX;this.toggleY;this.outerW;this.alignment="";this.closeOnWindowEvents=!0;var parentObj=this;if(typeof options!="undefined"){if(typeof options.closeOnWindowEvents!="undefined"){this.closeOnWindowEvents=options.closeOnWindowEvents}}
this.reflow();$.fn.extend({close_dropdown:function(){if(typeof $(this).attr('data-coreDropdown')!='undefined'){$(this).each(function(){$(this).removeClass('is-open');$('[data-coreToggle='+$(this).attr('id')+']').removeClass('is-open')})}else{parentObj.closeall()}}})
$(document).off('click.core_dropdown').on('click.core_dropdown',function(){if($('[data-coredropdown]:hover:not([data-coretoggle])').length==0&&$('[data-coretoggle]:hover').length==0){parentObj.closeall()}})}
core_dropdown.prototype.reflow=function(dropdownToggleElem){var parentObj=this;if(typeof dropdownToggleElem!="undefined"){var attachToElem=dropdownToggleElem}else{var attachToElem=!1}
$('[data-coreToggle]').off('click.core_dropDown_Space');$('[data-coreToggle]').off('mouseenter.core_dropDown_Space');$('[data-coreToggle]').on('click.core_dropDown_Space',function(){deployDropdown(this,!1)})
$('[data-coreToggle]').on('mouseenter.core_dropDown_Space',function(){if(typeof $(this).attr('data-hover')!="undefined"){deployDropdown(this,!0)}})
if(attachToElem){if(typeof $(this).attr('data-hover')!="undefined"){deployDropdown($(attachToElem),!0)}else{deployDropdown($(attachToElem),!1)}}
function deployDropdown(elemThis,isHover){var closeme=!1;var isHover=isHover;var alignment="center";var persist=!1;if($(elemThis).hasClass('is-open')&&!isHover){closeme=!0}
if(typeof $(parentObj.caller).attr('data-persist')!="undefined"&&$(parentObj.caller).attr('data-persist')!="false"){persist=!0}
if(!persist){$('[data-coreDropdown]').close_dropdown()}
$(elemThis).addClass('is-open');$('[data-coreDropdown]#'+$(elemThis).attr('data-coreToggle')).addClass('is-open')
parentObj.caller=elemThis;parentObj.ddpanel=$('#'+$(elemThis).attr('data-coreToggle')+'[data-coreDropdown]');if(typeof $(parentObj.caller).attr('data-alignment')!="undefined"){parentObj.alignment=$(parentObj.caller).attr('data-alignment')}
if(typeof $(parentObj.caller).attr('data-moveToBody')!="undefined"&&$(parentObj.caller).attr('data-moveToBody').toLowerCase()!=="false"){$('body').append(parentObj.ddpanel)}
$(parentObj.ddpanel).css('position','absolute')
var scrollTop=$(window).scrollTop();if(typeof $(parentObj.caller).attr('data-isFixed')!="undefined"&&$(parentObj.caller).attr('data-isFixed').toLowerCase()!=="false"){parentObj.toggleY=$(elemThis).offset().top-scrollTop}else{parentObj.toggleY=$(elemThis).offset().top}
parentObj.outerW=$(elemThis).width();parentObj.toggleX=$(elemThis).offset().left+parentObj.outerW;if(parentObj.alignment=="center"){var centrarHorizontalmente=$(elemThis).outerWidth()/2;parentObj.toggleX=parentObj.toggleX-centrarHorizontalmente}
if(parentObj.alignment=="left"){parentObj.toggleX=$(elemThis).offset().left}
if(parentObj.alignment=="right"){parentObj.toggleX=$(document).width()-$(elemThis).offset().left-$(elemThis).outerWidth()}
var colocarBottom=$(elemThis).outerHeight();parentObj.toggleY=parentObj.toggleY+colocarBottom;parentObj.reposition();if(!closeme){$(parentObj.ddpanel).addClass('is-open');$(elemThis).addClass('is-open')}else{$(parentObj.ddpanel).close_dropdown()}
$(parentObj.ddpanel).data('caller',parentObj.caller);$(parentObj.caller).trigger('afterShow');if(typeof parentObj.ddpanel!="undefined"){$(parentObj.ddpanel).off('mouseleave.core_dropDown_Space').on('mouseleave.core_dropDown_Space',function(){$(parentObj.ddpanel).addClass('is-hover');if(typeof $(parentObj.caller).attr('data-hover')!="undefined"){$(parentObj.ddpanel).close_dropdown()}else{}
$(parentObj.caller).trigger('onHide')})}}
if(this.closeOnWindowEvents){}
var self=this
$(document).on('scroll resize',function(event){if(typeof $(parentObj.caller).attr('data-closeOnWindowEvents')!="undefined"&&$(parentObj.caller).attr('data-closeOnWindowEvents').toLowerCase()!=="false"){$(parentObj.ddpanel).close_dropdown()}
clearInterval(window.timerForScroll)
window.timerForScroll=setTimeout(function(){self.reposition()},500)})}
core_dropdown.prototype.reposition=function(options){var parentObj=this;var panelWidth=$(parentObj.ddpanel).outerWidth();var parentAlignment=parentObj.alignment;var xProp="left";if(parentAlignment=="left"){if((parentObj.toggleX+panelWidth)>$(window).outerWidth()){parentAlignment="right";parentObj.toggleX=$(document).width()-$(parentObj.caller).offset().left-parentObj.outerW}}
if(parentAlignment=="right"){if($(parentObj.caller).offset().left-($(parentObj.ddpanel).outerWidth()-parentObj.outerW)<0){parentAlignment="left";parentObj.toggleX=$(parentObj.caller).offset().left}}
if(parentAlignment=="right"){$(parentObj.ddpanel).css({'top':parentObj.toggleY+"px",'left':'auto','right':parentObj.toggleX+"px"})}else{$(parentObj.ddpanel).css({'top':parentObj.toggleY+"px",'left':parentObj.toggleX+"px",'right':'auto'})}}
core_dropdown.prototype.open=function(dropdownToggleElem){this.reflow($(dropdownToggleElem),!1)}
core_dropdown.prototype.closeall=function(options){var parentObj=this;$('[data-coreDropdown],[data-coreToggle]').removeClass('is-open');$(parentObj.caller).trigger('onHide')}
var core_reveal=function(options){var self=this;this.defaultZIndex=1000;this.zIndex=this.defaultZIndex;$.fn.extend({core_reveal:function(action,options,callback){switch(action){case "open":var opts={}
if(typeof options!="undefined"&&options!=null){opts=options}
self.open($(this),opts);break;case "close":var opts={}
var callbackFn=function(){}
if(typeof options!="undefined"&&options!=null){opts=options}
if(typeof callback!="undefined"){callbackFn=callback}
self.close($(this),callbackFn,opts);break;case "reflow":self.reflow($(this));break}}})
self.reflow()}
core_reveal.prototype.set_dataOpen_events=function(elem){if(typeof elem!="undefined"){var searchElem=$(elem)}else{var searchElem=$('[data-open]')}
var searchElem=$('[data-open]');$(searchElem).each(function(){var destino=$(this).attr('data-open');destino="#"+destino;$(this).off("click.reveal").on("click.reveal",function(){if(typeof $(destino).attr('data-reveal')!="undefined"){$(destino).core_reveal('open')}})})}
core_reveal.prototype.set_dataClose_events=function(elem){var self=this;if(typeof elem!="undefined"){var searchElem=$(elem)}else{var searchElem=$(this)}
var searchElem=$('[data-core_reveal-close]');$(searchElem).each(function(){$(this).off("click").on("click",function(){var revealElem=$(this).closest("[data-reveal]");$(revealElem).core_reveal('close')})})}
core_reveal.prototype.open=function(elem,options){var self=this;var revealParams={};var revealPostParams={};var multipleOpened=!1;var closeOnClick=!0;var dataVOffset=!1;if(typeof $(elem).attr('data-multiple-opened')!="undefined"){var attr=$(elem).attr('data-multiple-opened');if(attr.toLowerCase()=="true"){multipleOpened=!0}}
if(typeof $(elem).attr('data-close-on-click')!="undefined"){var attr=$(elem).attr('data-close-on-click');if(attr.toLowerCase()=="false"){closeOnClick=!1}}
if(typeof $(elem).attr('data-v-offset')!="undefined"){dataVOffset=parseInt($(elem).attr('data-v-offset'))}
if(!multipleOpened){$('.reveal-overlay').add('[data-reveal]').removeClass('is-active').hide();$(document).ready(function(){$(elem).trigger('closeme.zf.reveal')})}
if(typeof options!="undefined"){if(typeof options.params!="undefined"){revealParams=options.params;$(elem).attr('data-reveal-params',JSON.stringify(revealParams))}
if(typeof options.postparams!="undefined"){revealPostParams=options.postparams;$(elem).attr('data-reveal-postparams',JSON.stringify(revealPostParams))}}
$(elem).closest('.reveal-overlay').show(0,function(){$(elem).show().addClass('is-active');if(dataVOffset){$(elem).css('top',dataVOffset+"px")}
$(this).unbind("close.zf.trigger").bind("close.zf.trigger",function(){self.close($(this))})
if(multipleOpened){$(this).css('z-index',getHighestIndex()+1)}
$(document).ready(function(){$(elem).trigger('open.zf.reveal')})})
if(closeOnClick){$(elem).closest('.reveal-overlay').off('click').on('click',function(){if(!$(elem).closest('[data-reveal]').is(':hover')){$(elem).each(function(){if(typeof $(this).attr('data-reveal')!="undefined"){self.close($(this))}})}})}
function getHighestIndex(){$('.reveal-overlay').each(function(){if($(this).css('z-index')>self.zIndex){self.zIndex=$(this).css('z-index')}})
return parseInt(self.zIndex)}
$('body').attr('data-showingReveal',"true")}
core_reveal.prototype.reflow=function(elem){var self=this;if(typeof elem!="undefined"){var searchElem=$(elem);var dataOpenElem=$(searchElem).find('[data-open]');self.set_dataOpen_events($(dataOpenElem))}else{self.set_dataOpen_events()}
if(typeof elem!="undefined"){var searchElem=$(elem);var dataOpenElem=$(searchElem).find('[data-core_reveal-close]');self.set_dataClose_events($(dataOpenElem))}else{self.set_dataClose_events($(this))}
if(typeof elem!="undefined"){var searchElem=$(elem).find('[data-reveal]')}else{var searchElem=$('[data-reveal]')}
if($(searchElem).length>0){$(searchElem).each(function(){var currentID=$(this).attr('id');if(typeof elem!="undefined"&&(typeof $(this).attr('data-multiple-opened')!="undefined"&&$(this).attr('data-multiple-opened').toLowerCase()=="true")){if($(this).closest('[data-reveal]').length>0){$(this).data("parentModal",$(this).parent().closest('[data-reveal]'))}}
if($(this).parent('body').length==0&&$(this).parent('.reveal-overlay').length==0&&$('[id="'+currentID+'"]').length<=1){$(this).appendTo('body')}
if($(this).parent('.reveal-overlay').length==0){$(this).wrap('<div class="reveal-overlay"></div>')}})}else{$(elem).parent('.reveal-overlay').appendTo('body')}}
core_reveal.prototype.close=function(elem,callback,options){var self=this;var clearParamsOnClose=!1;if(typeof options!="undefined"){if(typeof options.clearParamsOnClose!="undefined"){clearParamsOnClose=options.clearParamsOnClose}}
$('[data-reveal]').each(function(){if(!elem[0].isSameNode($(this)[0])){if(typeof $(this).data('parentModal')!="undefined"){var parentElem=$(this).data('parentModal')
if(parentElem[0].isSameNode($(elem)[0])){$(this).closest('.reveal-overlay').remove();$(this).remove()}}}})
if(clearParamsOnClose){$(elem).removeAttr('data-reveal-params').removeAttr('data-reveal-postparams')}
$(elem).closest('.reveal-overlay').hide(0,function(){$(elem).hide().removeClass('is-active').css('z-index',self.defaultZIndex)})
$(document).ready(function(){$(elem).trigger('closed.zf.reveal');if(typeof callback!="undefined"&&callback!=null){callback(elem)}})
if($('[data-reveal].is-active').length==0||$('[data-reveal].is-active').length==1){$('body').removeAttr('data-showingReveal')}}
$(".accordion.core_animated > dd.accordion-navigation > a:first-child, .accordion.core_animated > li.accordion-navigation > a:first-child").on("click",function(event){var dd_parent=$(this).closest('.accordion-navigation');if(dd_parent.hasClass('active'))
$(".accordion.core_animated > dd > div.content:visible,.accordion.core_animated > li > div.content:visible").slideToggle("normal");else{$(".accordion.core_animated > dd > div.content:visible,.accordion.core_animated > li > div.content:visible").slideToggle("normal");$(this).closest('.accordion-navigation').find(".content:eq(0)").slideToggle("normal")}});function tab2select(){$("select[data-tab]").each(function(){var tab2convert=$(this).attr('data-tab');currentSelect=$(this);tabs=new Array();if(tab2convert!=""){tabsArray=$("#"+tab2convert+" > LI a,#"+tab2convert+" > dd a");$(tabsArray).each(function(){tabs.push([$(this).text(),$(this).attr('href')])})}
$(tabs).each(function(){var optionElem='<option value="'+this[1]+'">'+this[0]+'</option>';$(currentSelect).append(optionElem)})
$(currentSelect).find('option').eq($("#"+tab2convert+" > LI.active,#"+tab2convert+" > dd.active").index()).attr('selected','selected');$(currentSelect).change(function(){$("#"+tab2convert+" >LI a[href='"+$(this).val()+"'],#"+tab2convert+" >dd a[href='"+$(this).val()+"']").click()})})}
function attachShare(selectorForArticle,domain,twitterAccount,options){var fbMethod="normal";if(typeof options!="undefined"){if(typeof options.fbUsesIntent!="undefined"&&options.fbUsesIntent===!0){fbMethod="intent"}}
function createSharePanel(){$('#shareNews').remove();var html='<ul id="shareNews" data-dropdown class="dropdown-pane left" aria-hidden="true">'+'<li><a href="javascript:void(null)" data-shareService="tw"><i class="info icon-twitter"></i> Twitter</a></li>'+'<li><a href="javascript:void(null)" data-shareService="fb"><i class="info icon-facebook"></i> Facebook</a></li>'+'<li><a href="javascript:void(null)" data-shareService="em" disabled="disabled" class="disabled"><i class="info icon-envelope2"></i> Email</a></li>'+'</ul>';$('body').append(html)}
$('[data-share]').click(function(){createSharePanel()
$('[data-toggle="shareNews"]').removeAttr('data-toggle');$(this).attr('data-toggle','shareNews');var options={closeOnClick:!0}
var shareNews=new Foundation.Dropdown($('#shareNews'),options);$('#shareNews[data-dropdown]').removeAttr('data-newsTitleToShare');$('#shareNews[data-dropdown]').removeAttr('data-newsURLToShare');$('#shareNews[data-dropdown]').attr('data-newsTitleToShare',$(this).closest(selectorForArticle).find('[data-title]').text());$('#shareNews[data-dropdown]').attr('data-newsHeadlineToShare',$(this).closest(selectorForArticle).find('[data-headline]').text());$('#shareNews[data-dropdown]').attr('data-newsURLToShare',$(this).closest(selectorForArticle).attr('data-url'));$('#shareNews[data-dropdown]').attr('data-newsImgToShare',$(this).closest(selectorForArticle).find('[data-img]').attr("src"));attachShareEvents()})
function attachShareEvents(){$("#shareNews").on("show.zf.dropdown",function(){var title=$('#shareNews[data-dropdown]').attr('data-newsTitleToShare');var headline=$('#shareNews[data-dropdown]').attr('data-newsHeadlineToShare');var url=$('#shareNews[data-dropdown]').attr('data-newsURLToShare');var img=$('#shareNews[data-dropdown]').attr('data-newsImgToShare');$('#shareNews [data-shareService="tw"]').off("click").click(function(){twShare(url,title,twitterAccount)})
$('#shareNews [data-shareService="fb"]').off("click").click(function(){if(fbMethod=="normal"){fbShare(url,title,headline,img)}else if(fbMethod=="intent"){fbShareIntent(url,title)}})})}}
function checkSocialOnIOS(type,url){try{switch(type){case 1:webkit.messageHandlers.fbonios.postMessage("true");break;case 2:webkit.messageHandlers.fbshareonios.postMessage(url);break;case 3:webkit.messageHandlers.twshareonios.postMessage(url);break;case 4:webkit.messageHandlers.linkDeviceToUserAccount.postMessage(url);break;case 5:webkit.messageHandlers.setUserLoggedStatus.postMessage(url);break}}catch(err){return!1}}
function disableBt(elem){if(!$(elem).length)return!1;if($._data($(elem)[0],"events")){if(typeof $._data($(elem)[0],"events").click!="undefined"&&$._data($(elem)[0],"events").click.length>0){var eventosClick=$._data($(elem)[0],"events").click[0].handler}else{var eventosClick=!1}}else{var eventosClick=!1}
$(elem).data({'caption':$(elem).html(),'event':eventosClick,'onclick':$(elem).attr('onclick')})
$(elem).addClass('disabled');if($(elem).is("button")||$(elem).is("input")){$(elem).attr('disabled','disabled')}
$(elem).off('click')
$(elem).removeAttr('onclick')
$(elem).find('input,textarea').attr('disabled','disabled')}
function enableBt(elem){$(elem).removeClass('disabled');$(elem).html($(elem).data('caption'));if($(elem).data('event')!=!1){$(elem).click($(elem).data('event'))}
if($(elem).data('onclick')!=""){$(elem).attr('onclick',$(elem).data('onclick'))}
$(elem).find('input,textarea').removeAttr('disabled');if($(elem).is("button")||$(elem).is("input")){$(elem).removeAttr('disabled')}}
function holdBt(elem,message,options){var showClockIcon='<i class="icon-clock2"></i>';if(options){if(options.showClockIcon==!1){showClockIcon=""}}
disableBt(elem);$(elem).html(showClockIcon+message)}
function unholdBt(elem){enableBt(elem)}
parseInt($(this).find('[data-sharefb-value]').text())+1
function getCookie(c_name){if(document.cookie.length>0){var c_start=document.cookie.indexOf(c_name+"=");if(c_start!=-1){c_start=c_start+c_name.length+1;var c_end=document.cookie.indexOf(";",c_start);if(c_end==-1)c_end=document.cookie.length;return unescape(document.cookie.substring(c_start,c_end))}}
return""}
function setCookie(c_name,value,expiredays){var exdate=new Date();exdate.setDate(exdate.getDate()+expiredays);var expire="";if(expiredays!=null){if(expiredays!=0){expire=";expires="+exdate.toUTCString()}else{expire=";expires=0"}}
document.cookie=c_name+"="+escape(value)+(expire+";path=/;domain=."+getDomainName(window.location.hostname))}
function eraseCookie(c_name){setCookie(c_name,"",-1)}
function getDomainName(hostName){return hostName.substring(hostName.lastIndexOf(".",hostName.lastIndexOf(".")-1)+1)}
function fbShare(url,title,description,img,callback){if(!url)url=location.href;checkSocialOnIOS(2,url);if(typeof FB!="undefined"){FB.ui({method:'share',href:url,description:description,title:title,picture:img},function(response){if(response&&!response.error_message){if(callback!="undefined"){callback()}}else{}})}}
function fbShareIntent(url,title){if(!url)url=location.href;window.open('http://www.facebook.com/sharer/sharer.php?u='+url+'&title='+title,"Facebook","width=550,height=600,scrollbars=no,resizable=true")}
function ValidURL(url){return/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)}
function twShare(url,title,twitterAccount){if(!url)url=location.href;checkSocialOnIOS(3,url);window.open('https://twitter.com/intent/tweet?text='+title+'&url='+url+'&via='+twitterAccount+'&original_referer=https://'+window.location.hostname,'',"menubar=no,toolbar=no,resizable=yes,width=500, height=300")}
function sendValidateEmail(feedbackElem){var elem=$("#validationbar [data-status-msg]");if(typeof feedbackElem!="undefined"){elem=$(feedbackElem)}
$(elem).html("<i class='loader'></i> Enviando un email de activaciÃ³n a tu cuenta... Espera por favor");$.ajax({type:"POST",url:"/data/?action=sendValidateEmail",dataType:'json',success:function(data){if(data.status=="ok"){$(elem).html('Email enviado, <u>comprueba tu correo</u>')}else{$(elem).html(data.error)}},error:function(){$(elem).html('Error desconocido')}})}
$('.tabs').on('toggled',function(event,tab){var panel=$(tab).find('a').attr('href');if($(panel+" .responsive").length>0){updateTables()}});BROWSERDETECT={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.isMobile=(/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(data){for(var i=0;i<data.length;i++){var dataString=data[i].string;var dataProp=data[i].prop;this.versionSearchString=data[i].versionSearch||data[i].identity;if(dataString){if(dataString.indexOf(data[i].subString)!=-1)
return data[i].identity}else if(dataProp)
return data[i].identity}},searchVersion:function(dataString){var index=dataString.indexOf(this.versionSearchString);if(index==-1)return;return parseFloat(dataString.substring(index+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};function interceptModals(options){var holdHTMLmsg=!1;var myTimeOut={}
myTimeOut.time=8000;myTimeOut.warnMsg="Ha ocurrido un error. ReintÃ©ntelo de nuevo.";myTimeOut.timeOutCallback=function(){alert(myTimeOut.warnMsg);$('[data-reveal]').core_reveal("close")}
var URL="/modal/?option=";if(typeof options!="undefined"){if(typeof options.holdHTML!="undefined"){holdHTMLmsg=options.holdHTML}
if(typeof options.timeOut!="undefined"){if(typeof options.timeOut.time!="undefined"){myTimeOut.time=options.timeOut.time}
if(typeof options.timeOut.warnMsg!="undefined"){myTimeOut.warnMsg=options.timeOut.warnMsg}
if(typeof options.timeOut.timeOutCallback!="undefined"){myTimeOut.timeOutCallback=options.timeOut.timeOutCallback}}else{timeOut=!1}
if(typeof options.URL!="undefined"){URL=options.URL}}
clearTimeout(window.modalTimeOut)
$(document).off('open.zf.reveal','[data-reveal]');$(document).off('click',"[data-open][data-reveal-source][data-reveal-params]");$(document).off('click.params',"[data-open][data-reveal-source][data-reveal-params]");$(document).off('click',"[data-open][data-reveal-source][data-reveal-postparams]");$(document).off('click.params',"[data-open][data-reveal-source][data-reveal-postparams]");$(document).off('click.params',"[data-open][data-reveal-source][data-reveal-params]").on('click.params',"[data-open][data-reveal-source][data-reveal-params]",function(){$('#'+$(this).attr('data-open')).attr("data-reveal-params",$(this).attr('data-reveal-params')).data('paramsFromClick',!0)})
$(document).off('click.params',"[data-open][data-reveal-source][data-reveal-postparams]").on('click.params',"[data-open][data-reveal-source][data-reveal-postparams]",function(){$('#'+$(this).attr('data-open')).attr("data-reveal-postparams",$(this).attr('data-reveal-postparams')).data('paramsFromClick',!0)})
$("[data-open][data-reveal-source][data-callback]").off('click.callback').on('click.callback',function(){$('body').data('setLoginCallback',$(this))})
$(document).on('open.zf.reveal','[data-reveal]',function(el){if(typeof $(this).attr("data-reveal-source")!='undefined'){if(typeof $(this).attr('data-reveal-params')!='undefined'||typeof $(this).attr('data-reveal-postparams')!='undefined'){currentScrollFix=$(window).scrollTop();var params=!1;var postparams=!1;if(typeof $(this).attr('data-reveal-params')!='undefined'){params=$(this).attr('data-reveal-params')}
if(typeof $(this).attr('data-reveal-postparams')!='undefined'){postparams=$(this).attr('data-reveal-postparams')}
retrieveModalContent($(this),$(this).attr("data-reveal-source"),params,postparams,{holdHTML:holdHTMLmsg,timeOut:myTimeOut,URL:URL});if(typeof $(this).data("paramsFromClick")!="undefined"&&$(this).data("paramsFromClick")==!0){$(this).removeAttr('data-reveal-params');$(this).removeAttr('data-reveal-postparams')}}else{retrieveModalContent($(this),$(this).attr("data-reveal-source"),!1,!1,{holdHTML:holdHTMLmsg,timeOut:myTimeOut,URL:URL});currentScrollFix=$(window).scrollTop()}}});$(document).off('closed.zf.reveal','[data-reveal]');$(document).on('closed.zf.reveal','[data-reveal]',function(){$(window).off('scroll.reveal').on('scroll.reveal',function(e){if(typeof currentScrollFix!="undefined"){window.scrollTo(0,currentScrollFix)
$(window).off('scroll.reveal')}})})}
function retrieveModalContent(modalElem,modalToShow,parameters,postparameters,options){var paramString="";var postparamString="";var callback=!1;var postcallback=!1;var callbackInData=!1;var holdHTMLmsg='<div class="text-center core_spaceT"><div class="core_panel bordered radius core_halfThin core_inlineBlock" style="border-radius:10px"><span class="white core_light"> <img src="//d2oamtuj38i9pe.cloudfront.net/images/common/loaders/loader1.svg" class="imgSize size20 core_styleMiddle"> <small class="core_styleMiddle core_inlineBlock">CARGANDO...</small></span></div></div>';var myTimeOut=!1;var URL="/modal/?option=";if(typeof $(modalElem).data('callback')!="undefined"){callbackInData=$(modalElem).data('callback')}
if(parameters){var modalParams=jQuery.parseJSON(parameters)
for(var i in modalParams){if(i!="callback"){paramString=paramString+"&"+i+"="+modalParams[i]}else{callback=modalParams[i]}}}
if(postparameters){var modalParams=jQuery.parseJSON(postparameters)
postparameters=modalParams;for(var i in modalParams){if(i=="callback"){postcallback=modalParams[i]}}}
if(typeof options!="undefined"){if(typeof options.holdHTML!="undefined"){if(options.holdHTML){holdHTMLmsg=options.holdHTML}}
if(typeof options.timeOut!="undefined"){if(options.timeOut){myTimeOut=options.timeOut}else{myTimeOut=!1}}
if(typeof options.URL!="undefined"){URL=options.URL}}
if(typeof window.modalTimeOut!="undefined"){clearTimeout(window.modalTimeOut)
delete window.modalTimeOut}
retrieveModalContentOptions=options;$(modalElem).html(holdHTMLmsg);if(myTimeOut){window.modalTimeOut=setTimeout(function(){myTimeOut.timeOutCallback();clearTimeout(window.modalTimeOut)},myTimeOut.time)}
$.post(URL+modalToShow+paramString,postparameters,function(data){clearTimeout(window.modalTimeOut)
delete window.modalTimeOut;$(modalElem).html(data);if(callback||postcallback||callbackInData){$(document).on('ajaxComplete.modalsCallback',function(event,xhr,settings){if(settings.url==URL+modalToShow+paramString){if(callback){var callbackFn=eval('('+callback+')');if(typeof callbackFn=="undefined"){eval(callback)}else{callbackFn()}}
if(postcallback){var postcallbackFn=eval('('+postcallback+')');if(typeof postcallbackFn=="undefined"){eval(postcallback)}else{postcallbackFn()}}
if(callbackInData!=!1){callbackInData()}}
$(document).off('ajaxComplete.modalsCallback')})}
$(modalElem).off('closed.zf.reveal').on('closed.zf.reveal',function(){$(modalElem).empty()})
$(modalElem).core_reveal("reflow");reflowModals(options);if(typeof launchEventListeners==="function"){launchEventListeners()}
$(modalElem).foundation()
$(modalElem).find('form[data-abide]').off('submit.bam').on('submit.bam',function(ev,frm){ev.preventDefault()})
interceptModals(retrieveModalContentOptions);$(window).trigger('resize')})}(function(a){a.stringify=function(a){return JSON.stringify(a,function(a,b){var d;return b instanceof Function||"function"==typeof b?(d=b.toString(),8>d.length||"function"!==d.substring(0,8)?"_NuFrRa_"+d:d):b instanceof RegExp?"_PxEgEr_"+b:b})};a.parse=function(a,f){var b=f?/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/:!1;return JSON.parse(a,function(a,c){var e;if("string"!=typeof c||8>c.length)return c;e=c.substring(0,8);return b&&c.match(b)?new Date(c):"function"===e?eval("("+c+")"):"_PxEgEr_"===e||"_NuFrRa_"===e?eval(c.slice(8)):c})};a.clone=function(g,f){return a.parse(a.stringify(g),f)}})("undefined"===typeof exports?window.JSONfn={}:exports);function reflowModals(options){$('input[type="text"],input[type="password"],input[type="search"],input[type="email"]').keypress(function(e){if(e.keyCode==13){e.preventDefault();$(this).closest('form').submit()}})
if(typeof options!="undefined"){interceptModals(options)}else{interceptModals()}}
var formeSubmit=function(formElem,dataURL,options){this.formElem=formElem;this.dataURL=dataURL;this.submitBt={};if(this.formElem&&$(this.formElem).find("[data-submit]").length>0){this.submitBt.elem=$(this.formElem).find("[data-submit]");this.defaultSubmitCaption=$(this.submitBt.elem).html()}else{this.submitBt.elem=!1;this.defaultSubmitCaption=!1}
this.submitBt.holdMsg="";this.submitBt.showClockIcon=!0;this.submitBt.enableOnSuccess=!1;this.statusMsg={};if(this.formElem&&$(this.formElem).find("[data-status-msg]").length>0){this.statusMsg.elem=$(this.formElem).find("[data-status-msg]")}else{this.statusMsg.elem=!1}
this.statusMsg.ok="";this.statusMsg.ko="";this.statusMsg.hold="";this.statusMsg.error="";this.statusMsg.okClasses="success";this.statusMsg.koClasses="alert";this.statusMsg.countDownBeforeCallback=!1;this.redirectURL=!1;this.clearOnSubmit=!1;this.extraFields=!1;this.ignoreOKDefaultActions=!1;this.ignoreKODefaultActions=!1;this.callbackOnSuccess=function(){};this.callbackOnFail=function(){};this.callbackOnError=function(){};this.serializedData="";this.postData={};this.sendDataAsJSON=!1;this.ignoreFormFields=!1;var self=this;var parentObj=this;this.data=!1;this.sendAsFile=!1;this.crossDomain=!1;if(typeof options!="undefined"){if(typeof options.redirectURL!="undefined"){this.redirectURL=options.redirectURL}
if(typeof options.clearOnSubmit!="undefined"){this.clearOnSubmit=options.clearOnSubmit}
if(typeof options.callbackOnSuccess!="undefined"){this.callbackOnSuccess=options.callbackOnSuccess}
if(typeof options.callbackOnFail!="undefined"){this.callbackOnFail=options.callbackOnFail}
if(typeof options.callbackOnError!="undefined"){this.callbackOnError=options.callbackOnError}
if(typeof options.countDownCallbackOnSuccess!="undefined"){if(typeof options.countDownCallbackOnSuccess.seconds!="undefined"&&typeof options.countDownCallbackOnSuccess.callback!="undefined"){this.countDownCallbackOnSuccess=options.countDownCallbackOnSuccess}}
if(typeof options.sendDataAsJSON!="undefined"&&options.sendDataAsJSON){this.sendDataAsJSON=!0;this.serializedData={}}
if(typeof options.ignoreFormFields!="undefined"&&options.ignoreFormFields){this.ignoreFormFields=!0}
if(typeof options.ignoreOKDefaultActions!="undefined"||options.ignoreOKDefaultActions!=!1){this.ignoreOKDefaultActions==!0}
if(typeof options.ignoreKODefaultActions!="undefined"||options.ignoreKODefaultActions!=!1){this.ignoreKODefaultActions==!0}
if(typeof options.submitBt!="undefined"){if(typeof options.submitBt.elem!="undefined"&&($(options.submitBt.elem).length>0||options.submitBt.elem===!1)){this.submitBt.elem=options.submitBt.elem}
if(typeof options.submitBt.holdMsg!="undefined"){this.submitBt.holdMsg=options.submitBt.holdMsg}
if(typeof options.submitBt.showClockIcon!="undefined"){this.submitBt.showClockIcon=options.submitBt.showClockIcon}
if(typeof options.submitBt.enableOnSuccess!="undefined"){this.submitBt.enableOnSuccess=options.submitBt.enableOnSuccess}}
if(typeof options.statusMsg!="undefined"){if(typeof options.statusMsg.elem!="undefined"&&$(options.statusMsg.elem).length>0){this.statusMsg.elem=options.statusMsg.elem}
if(typeof options.statusMsg.ok!="undefined"){this.statusMsg.ok=options.statusMsg.ok;$(options.statusMsg.elem).removeClass(this.statusMsg.koClasses);$(options.statusMsg.elem).addClass(this.statusMsg.okClasses)}
if(typeof options.statusMsg.ko!="undefined"){this.statusMsg.ko=options.statusMsg.ko;$(options.statusMsg.elem).addClass(this.statusMsg.koClasses);$(options.statusMsg.elem).removeClass(this.statusMsg.okClasses)}
if(typeof options.statusMsg.hold!="undefined"){this.statusMsg.hold=options.statusMsg.hold}
if(typeof options.statusMsg.error!="undefined"){this.statusMsg.error=options.statusMsg.error}
if(typeof options.statusMsg.okClasses!="undefined"){this.statusMsg.okClasses=options.statusMsg.okClasses}
if(typeof options.statusMsg.koClasses!="undefined"){this.statusMsg.koClasses=options.statusMsg.koClasses}
if(typeof options.statusMsg.countDownBeforeCallback!="undefined"){if(typeof options.statusMsg.countDownBeforeCallback.seconds!="undefined"&&typeof options.statusMsg.countDownBeforeCallback.callback!="undefined"){this.statusMsg.countDownBeforeCallback=options.statusMsg.countDownBeforeCallback}}}
if(this.formElem&&!this.ignoreFormFields){if(!this.sendDataAsJSON){this.serializedData=$(this.formElem).serialize()+"&"}else{var serializedArr=$(this.formElem).serializeArray();$(serializedArr).each(function(k,v){self.serializedData[v.name]=v.value})}}
if(typeof options.sendAsFile!="undefined"){if(options.sendAsFile==!0){this.sendAsFile=!0}}
if(typeof options.extraFields!="undefined"){if(!this.sendDataAsJSON){this.serializedData=this.serializedData+$.param(options.extraFields)}else{for(var attrname in options.extraFields){this.serializedData[attrname]=options.extraFields[attrname]}}}
if(typeof options.extraFieldsAsPost!="undefined"){$.each(options.extraFieldsAsPost,function(k,v){self.postData[k]=v})
if(!this.sendDataAsJSON){parentObj.serializedData=parentObj.serializedData+"&"+$.param(self.postData)}else{for(var attrname in options.extraFieldsAsPost){this.serializedData[attrname]=options.extraFieldsAsPost[attrname]}}}
if(typeof options.crossDomain!="undefined"){if(options.crossDomain===!0){this.crossDomain=!0}}}
this.xhrObj=null;this.xhrObj=submitElement();function submitElement(){if(parentObj.submitBt.elem){if(parentObj.submitBt.holdMsg.length>0){var holdMsg=parentObj.submitBt.holdMsg}else{var holdMsg=$(parentObj.submitBt.elem).html()}
holdBt($(parentObj.submitBt.elem),holdMsg,{"showClockIcon":parentObj.submitBt.showClockIcon})}
if(parentObj.statusMsg.elem){$(parentObj.statusMsg.elem).hide().html('')}
if(parentObj.statusMsg.elem&&parentObj.statusMsg.hold.length>0){$(parentObj.statusMsg.elem).html(parentObj.statusMsg.hold).removeClass(parentObj.statusMsg.koClasses).removeClass(parentObj.statusMsg.okClasses).show()}
if(!parentObj.sendAsFile){if(!parentObj.sendDataAsJSON){var f_data=parentObj.serializedData;var f_contentType='application/x-www-form-urlencoded; charset=UTF-8'}else{var f_data=JSON.stringify(parentObj.serializedData);var f_contentType='application/json'}
var f_processData=!0}else{var f_data=new FormData($(parentObj.formElem)[0]);var f_contentType=!1
var f_processData=!1}
if(!parentObj.crossDomain){var dataType="json"}else{var dataType="jsonp"}
var xhrObj=$.ajax({url:parentObj.dataURL,type:'POST',data:f_data,cache:!1,contentType:f_contentType,processData:f_processData,crossDomain:parentObj.crossDomain,dataType:dataType,success:function(data){parentObj.data=data;if(data.status=="ok"){if(!parentObj.ignoreOKDefaultActions){if(parentObj.clearOnSubmit){$(parentObj.formElem).trigger("reset")}
if(parentObj.statusMsg.elem){if(parentObj.statusMsg.ok.length>0){$(parentObj.statusMsg.elem).html(parentObj.statusMsg.ok).removeClass(parentObj.statusMsg.koClasses).addClass(parentObj.statusMsg.okClasses);$(parentObj.statusMsg.elem).fadeOut(function(){$(this).fadeIn()})}else{if(typeof data.success!="undefined"&&data.success.length>0){$(parentObj.statusMsg.elem).html(data.success).removeClass(parentObj.statusMsg.koClasses).addClass(parentObj.statusMsg.okClasses);$(parentObj.statusMsg.elem).fadeOut(function(){$(this).fadeIn()})}}}}
if(parentObj.submitBt.enableOnSuccess){unholdBt($(parentObj.submitBt.elem));if(parentObj.defaultSubmitCaption){$(parentObj.submitBt.elem).html(parentObj.defaultSubmitCaption)}}
parentObj.callbackOnSuccess(data,self);if(!parentObj.ignoreOKDefaultActions&&parentObj.statusMsg.elem&&parentObj.statusMsg.countDownBeforeCallback!==!1){var text=$(parentObj.statusMsg.elem).html();var intervalo=parentObj.statusMsg.countDownBeforeCallback.seconds;$(parentObj.statusMsg.elem).html(text+" ("+intervalo+")");var closeInterval=setInterval(function(){intervalo--;if(intervalo==0){parentObj.statusMsg.countDownBeforeCallback.callback(data,self)}else{$(parentObj.statusMsg.elem).text(text+" ("+intervalo+")")}},1000)}
if(parentObj.redirectURL){window.location.href=parentObj.redirectURL}}else{if(!parentObj.ignoreKODefaultActions){if(parentObj.statusMsg.elem){if(parentObj.statusMsg.ko.length>0){$(parentObj.statusMsg.elem).html(parentObj.statusMsg.ko).removeClass(parentObj.statusMsg.okClasses).addClass(parentObj.statusMsg.koClasses);$(parentObj.statusMsg.elem).fadeOut(function(){$(this).fadeIn()})}else{if(typeof data.error!="undefined"&&(data.error).toString().length>0){$(parentObj.statusMsg.elem).html(data.error).removeClass(parentObj.statusMsg.okClasses).addClass(parentObj.statusMsg.koClasses);$(parentObj.statusMsg.elem).fadeOut(function(){$(this).fadeIn()})}}}}
parentObj.callbackOnFail(data,self);if(parentObj.submitBt.elem){unholdBt($(parentObj.submitBt.elem))}}},error:function(xhr,textStatus,errorThrown){if(parentObj.statusMsg.elem){if(parentObj.statusMsg.error.length>0){$(parentObj.statusMsg.elem).html(parentObj.statusMsg.error).removeClass(parentObj.statusMsg.okClasses).addClass(parentObj.statusMsg.koClasses);$(parentObj.statusMsg.elem).fadeOut(function(){$(this).fadeIn()})}else{$(parentObj.statusMsg.elem).html("Error â˜ ï¸ ",xhr.responseText).removeClass(parentObj.statusMsg.okClasses).addClass(parentObj.statusMsg.koClasses);$(parentObj.statusMsg.elem).fadeOut(function(){$(this).fadeIn()})}}
parentObj.callbackOnError(xhr,textStatus,errorThrown);if(parentObj.submitBt.elem){unholdBt(parentObj.submitBt.elem)}}});return xhrObj}}
formeSubmit.prototype.getStatusMsgElem=function(){var self=this;if(typeof self.statusMsg!="undefined"&&typeof self.statusMsg.elem!="undefined"){return self.statusMsg.elem}
return!1}
formeSubmit.prototype.getXHR=function(){return this.xhrObj}
function objectifyForm(formArray){var returnArray={};for(var i=0;i<formArray.length;i++){returnArray[formArray[i].name]=formArray[i].value}
return returnArray}
function parseTimezone(tz){$("time[data-style]").each(function(item){var date=new Date($(this).attr("datetime"));if($(this).data("style")=="style1"){$(this).html(date.getDate()+" / "+pad(date.getMonth()+1,2)+" ("+date.getHours()+":"+pad(date.getMinutes(),2)+")")}else if($(this).data("style")=="style2"){$(this).html(date.getDate()+" / "+pad(date.getMonth()+1,2)+"<br>"+date.getHours()+":"+pad(date.getMinutes(),2))}else if($(this).data("style")=="style3"){$(this).html(date.getHours()+":"+pad(date.getMinutes(),2))}
if(date.getTimezoneOffset()<0){$("[data-timezone]").text("UTC+"+(-date.getTimezoneOffset()/60))}else{$("[data-timezone]").text("UTC"+(-date.getTimezoneOffset()/60))}})}
function getParameterByName(name,urlvalue){var url=window.location.href;if(typeof urlvalue!="undefined"){url=urlvalue}
name=name.replace(/[\[\]]/g,'\\$&');var regex=new RegExp('[?&]'+name+'(=([^&#]*)|&|#|$)'),results=regex.exec(url);if(!results)return null;if(!results[2])return'';return decodeURIComponent(results[2].replace(/\+/g,' '))};var paymentsStorage=function(options){this.tableElem="data-paymentsStorage";this.allowOrder=!1;this.allowRemoval=!1;this.editable=!1;this.orderable=!1;this.strings={expiration:"{t}Caducidad{/t}",withdrawals:"{t}Retiradas{/t}",payments:"{t}Pagos{/t}",welcome:"{t}Puedes usar uno de estos medios que tienes almacenados:{/t}",min:"{t}min{/t}",max:"{t}max{/t}"}
this.allowNonValidMethods=!1;this.currency=null;this.showLimits=!1;this.storedPaymentsObj=new Array()
this.orderedStructure=new Array()
if(typeof options!="undefined"){if(typeof options.storedPaymentsObj!="undefined"){this.storedPaymentsObj=options.storedPaymentsObj}
if(typeof options.strings!="undefined"){if(typeof options.strings.expiration!="undefined"){this.strings.expiration=options.strings.expiration}
if(typeof options.strings.withdrawals!="undefined"){this.strings.withdrawals=options.strings.withdrawals}
if(typeof options.strings.payments!="undefined"){this.strings.payments=options.strings.payments}
if(typeof options.strings.welcome!="undefined"){this.strings.welcome=options.strings.welcome}
if(typeof options.strings.min!="undefined"){this.strings.min=options.strings.min}
if(typeof options.strings.max!="undefined"){this.strings.max=options.strings.max}}
if(typeof options.allowNonValidMethods!="undefined"){this.allowNonValidMethods=options.allowNonValidMethods}
if(typeof options.currency!="undefined"){this.currency=options.currency}}
this.hasAliases=!1;var self=this;setParentMethodOnStoredValues();if(typeof options.purgeNonShowableInPayments!="undefined"&&options.purgeNonShowableInPayments){purgeMethods(!0)}else{purgeMethods()}
function setParentMethodOnStoredValues(){$.each(self.storedPaymentsObj,function(k,v){$.each(v.storedValues,function(i,j){j.parentMethodId=v.methodId})})}
function purgeMethods(purgeNonShowable){var newStoredPaymentsObj=new Array();var purgeNonShowableInPayments=!1;if(typeof purgeNonShowable!="undefined"&&purgeNonShowable){purgeNonShowableInPayments=!0}
$.each(self.storedPaymentsObj,function(k,v){var methodTmp=new Array();var tmp=new Array();if(!purgeNonShowableInPayments||(purgeNonShowableInPayments&&self.getShowInPayments(v.methodId))){if(v.storedValues.length>0){$.each(v.storedValues,function(j,l){if(!self.allowNonValidMethods){if(l.validado==1||l.validado==null){tmp.push(l)}}else{tmp.push(l)}})
if(tmp.length>0){methodTmp=v
methodTmp.storedValues=tmp
newStoredPaymentsObj.push(methodTmp)}}}
self.storedPaymentsObj=newStoredPaymentsObj})}
addVirtualMethodsFromAliases();function addVirtualMethodsFromAliases(){var addQueue=new Array();$(self.storedPaymentsObj).each(function(k,v){if(typeof v.aliasesId!="undefined"&&v.aliasesId!=null&&v.aliasesId.length>0){$(v.aliasesId).each(function(j,i){var virtualMethodToAdd={}
if(typeof Object.assign!="undefined"){virtualMethodToAdd=Object.assign({},v)}else{var raw=JSON.parse(JSON.stringify(v));virtualMethodToAdd=toObject(raw)}
virtualMethodToAdd.methodId=String(i);virtualMethodToAdd.isAliasOf=v.methodId;delete(virtualMethodToAdd.aliasesId);addQueue.push(virtualMethodToAdd)})}});if(addQueue.length>0){self.hasAliases=!0}
$(addQueue).each(function(){self.storedPaymentsObj.push(this)})}
function orderMethods(){var storedPaymentsTmp=new Array();$(self.storedPaymentsObj).each(function(jMethod,jValue){if(typeof jValue.isAliasOf=="undefined"){$(jValue.storedValues).each(function(kMethod,kValue){if(jValue.submethodId==null){var sub=null}else{var sub=jValue.submethodId}
storedPaymentsTmp.push({orden:kValue.orden,id:kValue.id,methodId:jValue.methodId,submethodId:sub})})}})
storedPaymentsTmp.sort(function(a,b){if(a.orden>b.orden){return 1}else if(a.orden<b.orden){return-1}else{return 0}})
return storedPaymentsTmp}
self.orderedStructure=orderMethods()}
paymentsStorage.prototype.setShowLimits=function(paymentsObj){var self=this;function getSubmethod(methodId,submethodId){var returnValue=!1;if(typeof paymentsObj!="undefined"&&paymentsObj&&paymentsObj!=null){$(paymentsObj).each(function(k,v){if(v.id==methodId){$(v.limits).each(function(lk,lv){if(lv.id==submethodId){returnValue=lv;return!1}})}
if(returnValue){return!1}})}
return returnValue}
$.each(self.storedPaymentsObj,function(k,v){if(v.storedValues.length>0){$.each(v.storedValues,function(j,l){var subm=getSubmethod(l.parentMethodId,l.methodId);if(subm){l.min=subm.minLimit;l.max=subm.remaining}})}})}
paymentsStorage.prototype.getCurrency=function(){if(this.currency!=null){return this.currency}else{return!1}}
paymentsStorage.prototype.purgeNonShowableInPayments=function(){this.purgeMethods(!0)}
paymentsStorage.prototype.getShowInPayments=function(methodId){var self=this;var method=self.getMethod(methodId);if(typeof method.reqs!="undefined"&&method.reqs!=null&&typeof method.reqs.noShowOnPayments!="undefined"&&method.reqs.noShowOnPayments===!0){return!1}
return!0}
paymentsStorage.prototype.retrieveHTMLforMethod=function(methodId,submethodId,options){var self=this;var list=this.getMethod(methodId,submethodId);var ignoreVaultedItems=!1;if(typeof options!="undefined"){if(typeof options.ignoreVaultedItems&&options.ignoreVaultedItems===!0){ignoreVaultedItems=!0}}
if(list){list=list.storedValues}
if(list.length>0){var html="<table "+self.tableElem+">";if(typeof self.strings.welcome!="undefined"&&self.strings.welcome!=null&&self.strings.welcome.length>0){html=html+"<thead><tr><th colspan='3'>"+self.strings.welcome+"</th></tr></thead>"}
var html=html+"<tbody>";var checkedIndex=null;$(list).each(function(k,v){if(typeof v.selected!="undefined"&&v.selected===!0){checkedIndex=k}})
$(list).each(function(k,v){if(ignoreVaultedItems&&v.vault!=null){return}
var isActive="";var checked="";var sub="null";if(submethodId!=null){sub=submethodId}
var identifier="str_"+methodId+"_"+sub;if(!v.enabled){var enabled=" disabled";isActive="";checked=""}else{var enabled="";if(checkedIndex==k){isActive=" is-active";checked=" checked"}}
if(typeof v.expiration!="undefined"&&v.expiration!=null){var dateObj=new Date(v.expiration*1000);var month=dateObj.getMonth();var year=dateObj.getFullYear();month=month+1;if(month+1<10){month='0'+month}
var mmyy=month+"/"+year.toString().substr(2,2);var expiration="<small data-expiration>("+self.strings.expiration+": "+mmyy+")</small>"}else{var expiration=""}
var submethod=v.tag;html=html+"<tr data-value='"+v.id+"' class='"+enabled+"'>";html=html+"<td><label class='beautified"+isActive+"'"+enabled+"><span></span><input data-paymentMethodSelector type='radio'"+checked+enabled+" name='"+identifier+"'></label></td>";html=html+"<td>"+v.caption+expiration+"</td>";if(typeof v.min!="undefined"&&typeof v.max!="undefined"&&self.showLimits){var max=v.max;var min=v.min;if(v.max==null){max="âˆž"}
if(self.getCurrency()){var min=self.getCurrency().getMoneda(v.min)
if(v.max!=null){max=self.getCurrency().getMoneda(v.max)}}
html=html+"<td data-range><dl><dt>"+self.strings.min+"</dt><dd>"+min+"</dd><br><dt>"+self.strings.max+"</dt><dd>"+max+"</dd></dl></td>"}else if(submethod!=null){html=html+"<td>"+"<span data-mname>"+submethod+"</span></td>"}else{html=html+"<td>&nbsp;</td>"}
html=html+"</tr>"})
html=html+"</table></tbody>";return html}else{return""}}
paymentsStorage.prototype.retrieveHTML=function(options){var self=this;var list=self.orderedStructure;var showSelectionForMethods=new Array();var useRadio=!1;var useSwitch=!0;if(typeof options!="undefined"){if(typeof options.showSelectionForMethods!="undefined"){showSelectionForMethods=options.showSelectionForMethods}}
if(list.length>0){var html="";$(list).each(function(k,v){var payMethod=self.getMethod(v.methodId,v.submethodId);var storedValue=self.getStoredIdFromMethodObj(v.id,payMethod)
var checked="";var sub=null;if(typeof payMethod.submethodId!="undefined"&&payMethod.submethodId!=null){sub=payMethod.submethodId}
var identifier="stored_"+payMethod.methodId+"_"+sub+"_"+storedValue.id;if(!storedValue.enabled){var enabled=" disabled"}else{var enabled=""}
if(typeof storedValue.selected!="undefined"&&storedValue.selected===!0){var checked=" checked='checked'";var isActive=" is-active"}else{var checked="";var isActive=""}
if(useRadio){var inputType="radio"}else{var inputType="checkbox"}
if(useSwitch){var switchControl='	<div class="switch">'+'<input data-paymentMethodSelector '+checked+' class="switch-input" id="'+identifier+'" type="checkbox" name="'+identifier+'"'+enabled+'>'+'<label class="switch-paddle" for="'+identifier+'"></label>'+'</div>'}else{var switchControl=""}
if(typeof storedValue.expiration!="undefined"&&storedValue.expiration!=null){var dateObj=new Date(storedValue.expiration*1000);var month=dateObj.getMonth();var year=dateObj.getFullYear();month=month+1;if(month+1<10){month='0'+month}
var mmyy=month+"/"+year.toString().substr(2,2);var expiration="<small data-expiration>("+self.strings.expiration.substr(0,3)+": "+mmyy+")</small>"}else{var expiration=""}
var tags="";if(payMethod.withdrawals){tags="<span data-tag='0'>"+self.strings.withdrawals+"</span>"}
if(payMethod.payments){tags=tags+"<span data-tag='1'>"+self.strings.payments+"</span>"}
html=html+"<tr data-method-value='"+payMethod.methodId+"' data-submethod-value='"+payMethod.submethodId+"' data-value='"+storedValue.id+"' class='"+enabled+"'>";if(payMethod.autoPayment){if(useSwitch){html=html+"<td>"+switchControl+"</td>"}else{html=html+"<td><label class='beautified"+isActive+"'"+enabled+"><span></span><input data-paymentMethodSelector type='"+inputType+"'"+checked+enabled+" name='"+identifier+"'></label></td>"}}else{html=html+"<td></td>"}
html=html+"<td><img data-img src='//d2oamtuj38i9pe.cloudfront.net/images/common/art/cards/"+payMethod.methodId+".png'></td>";html=html+"<td><span data-title>"+payMethod.name+"</span><span data-value>"+storedValue.caption+"</span>"+expiration+tags+"</td>";html=html+"<td class='spacer'></td>";html=html+"<td><button data-remove type='button'></button></td>";html=html+"</tr>"})
return html}else{return""}}
paymentsStorage.prototype.getPaymentsObj=function(){return this.storedPaymentsObj}
paymentsStorage.prototype.getMethod=function(methodId,submethodId,getIndex){var self=this;var value=null;var subMethodId;$(this.storedPaymentsObj).each(function(k,v){if(v.methodId==methodId){if(typeof getIndex!="undefined"&&getIndex===!0){value=k}else{value=this}
return!1}})
if(value!=null){return value}
return!1}
paymentsStorage.prototype.getStoredId=function(id,methodId,submethodId){var method=this.getMethod(methodId,submethodId);var returnedvalue=!1;if(method){$(method.storedValues).each(function(k,v){if(v.id==id){returnedvalue=v;return!1}})}
return returnedvalue}
paymentsStorage.prototype.getStoredIdFromMethodObj=function(id,methodObj){var method=methodObj;var returnedvalue=!1;if(method){$(method.storedValues).each(function(k,v){if(v.id==id){returnedvalue=v;return!1}})}
return returnedvalue}
paymentsStorage.prototype.getSelectionFromMethod=function(methodId,submethodId){var method=this.getMethod(methodId,submethodId);var returnedvalue=!1;if(method){$(method.storedValues).each(function(k,v){if(v.selected==!0){returnedvalue=v.id;return!1}})}
return returnedvalue}
paymentsStorage.prototype.resetAllSelections=function(methodId){var self=this;$(self.storedPaymentsObj).each(function(k,v){$(v.storedValues).each(function(i,j){self.storedPaymentsObj[k].storedValues[i].selected=!1})})}
paymentsStorage.prototype.resetSelection=function(methodId,submethodId){var self=this;var method=this.getMethod(methodId,submethodId);if(method){$(method.storedValues).each(function(k,v){v.selected=!1})}}
paymentsStorage.prototype.getDefault=function(methodId,submethodId){var self=this;var method=this.getMethod(methodId,submethodId);var returnValue=!1;if(method){$(method.storedValues).each(function(k,v){if(v.isDefault===!0&&v.enabled===!0){returnValue=v;return!1}})}
return returnValue}
paymentsStorage.prototype.getSelection=function(methodId,submethodId){var self=this;var submethodId=null;var method=this.getMethod(methodId,submethodId);var returnValue=!1;if(method){$(method.storedValues).each(function(k,v){if(v.selected){returnValue=v;return!1}})}
return returnValue}
paymentsStorage.prototype.setSelection=function(id,methodId,submethodId){var self=this;var submethodId=null;var method=this.getMethod(methodId,submethodId);var methodIndex=this.getMethod(methodId,submethodId,!0);if(method){$(method.storedValues).each(function(k,v){if(v.id==id){self.resetSelection(methodId,submethodId);self.storedPaymentsObj[methodIndex].storedValues[k].selected=!0}else{self.storedPaymentsObj[methodIndex].storedValues[k].selected=!1}})}}
paymentsStorage.prototype.getHasAliases=function(){return this.hasAliases}
paymentsStorage.prototype.cvvRequired=function(id,methodId,submethodId){var self=this;var item=self.getStoredId(id,methodId,submethodId);if(item&&typeof item.reqs!="undefined"&&item.reqs!=null&&typeof item.reqs.askForCVV!="undefined"&&item.reqs.askForCVV==!0){return!0}
return!1}
const availability_available=!0;const availability_unavailable=0;const availability_minReached=1;const availability_maxReached=2;const availability_notEnoughRemaining=3;var paymentsObj=function(url,options){var self=this;this.amountToAdd=0;this.allowPayments=!0;this.purchaseURL=url;this.usingForceMinLimit=!1;this.currentBalance=0;this.shoppingCart=!1;this.usingPreviousBalance=!1;this.voucherValue=0;this.purchaseWithSuscription=!1;this.withdrawal=!1;this.onSuccess=function(){}
this.onFail=function(){}
this.debug=!1;this.payMethods=new Array()
this.firstAvailableMethod=new Array();this.availability={};this.availabilityDetailed={};this.strings={paymentDone:"{t}Pago realizado con Ã©xito.{/t}",wait:"{t}Realizando pago. Espere.{/t}..",redirecting:"{t}Redirigiendo...{/t}",validationDone:"{t}ValidaciÃ³n realizada con Ã©xito.{/t}"}
this.paymentInProgress=!1;this.providedDocuments={};this.lastPaymentResult=!1;this.additionalPaymentParameters=null;this.validationMode=!1;this.suscriptionsAllowedState=!1;if(typeof options!="undefined"){if(typeof options.payMethodObj!="undefined"){this.payMethods=options.payMethodObj}
if(typeof options.cart!="undefined"){if(typeof options.cart.currentBalance!="undefined"&&typeof options.cart.purchaseValue!="undefined"){this.currentBalance=options.cart.currentBalance;this.amountToAdd=options.cart.purchaseValue;if(typeof options.cart.voucherValue!="undefined"){this.voucherValue=options.cart.voucherValue}
this.shoppingCart=!0}}
if(typeof options.withdraw!="undefined"){if(typeof options.withdraw.currentBalance!="undefined"){this.currentBalance=options.withdraw.currentBalance;this.withdrawal=!0}}
if(typeof options.onSuccess!="undefined"){this.onSuccess=options.onSuccess}
if(typeof options.onFail!="undefined"){this.onFail=options.onFail}
if(typeof options.debug!="undefined"&&options.debug){this.debug=!0}
if(typeof options.strings!="undefined"){if(typeof options.strings.paymentDone!="undefined"){this.strings.paymentDone=options.strings.paymentDone}
if(typeof options.strings.wait!="undefined"){this.strings.wait=options.strings.wait}
if(typeof options.strings.redirecting!="undefined"){this.strings.redirecting=options.strings.redirecting}}
if(typeof options.validationMode!="undefined"&&typeof options.validationMode.method!="undefined"){this.validationMode={method:options.validationMode.method}
if(typeof options.validationMode.submethod!="undefined"){this.validationMode.submethod=options.validationMode.submethod}else{this.validationMode.submethod=null}}}}
paymentsObj.prototype.setAmount=function(amount,voucher){var self=this;this.amountToAdd=amount;this.firstAvailableMethod=new Array();this.availability={};this.availabilityDetailed={};if(self.isShoppingCart()&&typeof voucher!="undefined"){this.setVoucherValue(voucher)}
$(this.payMethods).each(function(k,v){var isAvailableValue=self.isAvailable(v.id);self.availability[v.id]=isAvailableValue;if(self.firstAvailableMethod.length==0){$(isAvailableValue).each(function(i,j){if(j){self.firstAvailableMethod=[v.id,v.limits[i].id]
return!1}})}})}
paymentsObj.prototype.getAmount=function(){return parseFloat(this.amountToAdd)}
paymentsObj.prototype.setUsePreviousBalance=function(value){var self=this;if(value===!0){self.usingPreviousBalance=!0}else if(value===!1){self.usingPreviousBalance=!1}}
paymentsObj.prototype.setSubscriptionsState=function(value){this.suscriptionsAllowedState=value}
paymentsObj.prototype.getSubscriptionsState=function(){return this.suscriptionsAllowedState}
paymentsObj.prototype.getSubscriptionsAllowed=function(methodId,subMethodId){var self=this;var elem=self.getLimit(methodId,subMethodId);if(typeof elem.allowedForSubscriptions!="undefined"&&elem.allowedForSubscriptions===!0){return!0}
return!1}
paymentsObj.prototype.setUseForceMinLimit=function(value){var self=this;if(value===!0){self.usingForceMinLimit=!0}else if(value===!1){self.usingForceMinLimit=!1}}
paymentsObj.prototype.getUseForceMinLimitState=function(){return this.usingForceMinLimit}
paymentsObj.prototype.getUseForceMinLimitForMethod=function(methodId,limitId){var self=this;var item=self.getLimit(methodId,limitId);if(typeof item.allowForceMinLimit!="undefined"){return item.allowForceMinLimit}else{return null}}
paymentsObj.prototype.getAutoSubmethod=function(methodId){var self=this;var item=self.getMethod(methodId);if(typeof item.subMethodAuto!="undefined"&&item.subMethodAuto){return!0}
return!1}
paymentsObj.prototype.getAmountWithFeesForMethod=function(amount,methodId,submethodId){if(typeof submethodId=="undefined"||(typeof subMethodId!="undefined"&&submethodId==null)){var method=this.getMethod(methodId)}else{var method=this.getLimit(methodId,submethodId)}
if(typeof method.fees!="undefined"){var fees=parseFloat(method.fees);amount=parseFloat(amount);if(fees>1.00){return(amount*fees).toFixed(2)}else{return amount}}else{return parseFloat(amount)}}
paymentsObj.prototype.getAmountToPaySubstractingBalance=function(amount,balanceToSubstractFrom,methodId,submethodId){var resultado=0;var amountWithFees=this.getAmountWithFeesForMethod(amount,methodId,submethodId);resultado=amountWithFees-balanceToSubstractFrom;if(resultado<0){resultado=amountWithFees}
return resultado}
paymentsObj.prototype.applyConversionRate=function(amount,methodID,submethodID){if(typeof submethodID!="undefined"&&submethodID!=null){var elem=this.getLimit(methodID,submethodID)}else{var elem=this.getMethod(methodID)}
if(typeof elem.localToCurrencyRate!="undefined"&&elem.ISOcurrency!="undefined"){return{value:parseFloat(elem.localToCurrencyRate*amount),ISOcurrency:elem.ISOcurrency}}else{return{value:parseFloat(amount)}}}
paymentsObj.prototype.isBelowLimit=function(amount,methodId,submethodId){var self=this;if(typeof submethodId=="undefined"||(typeof subMethodId!="undefined"&&submethodId==null)){var method=this.getLimit(methodId,methodId)}else{var method=this.getLimit(methodId,submethodId)}
var minLimit=method.minLimit;if(amount<minLimit){return!0}
return!1}
paymentsObj.prototype.isAvailable=function(methodId,optionalAmount,applyEvents){var self=this;var method=this.getMethod(methodId);var returnValue=new Array();var useEvents=!0;if(typeof optionalAmount!="undefined"&&optionalAmount!==!1){var amount=parseFloat(optionalAmount)}else{var amount=parseFloat(self.amountToAdd)}
if(typeof applyEvents!="undefined"&&!applyEvents){useEvents=!1}
if(!this.allowPayments){return!1}
self.availabilityDetailed[methodId]=[];if(method){$(method.limits).each(function(k,v){if(typeof v.enabled!="undefined"&&v.enabled===!1){self.availabilityDetailed[methodId].push(availability_unavailable);if(useEvents){v.on_methodNotAvailable_callback(self,method,v.id)}
returnValue.push(!1)}else{if((v.maxLimit!=null&&amount<=v.maxLimit&&(amount>=v.minLimit)&&(amount<=v.remaining||(v.remaining==null&&v.maxLimit==null))&&(!self.isWithdrawal()||(self.isWithdrawal()&&amount<=self.currentBalance)))||(v.maxLimit==null&&(amount>=v.minLimit||(amount<v.minLimit&&self.isShoppingCart()&&self.isForFundingOnly(methodId)))&&(!self.isWithdrawal()||(self.isWithdrawal()&&amount<=self.currentBalance)))){self.availabilityDetailed[methodId].push(availability_available);if(typeof v.on_validValues_callback!="undefined"){var limit=null
if(v.id!=null){limit=v.id}
if(useEvents){v.on_validValues_callback(self,method,limit)}}
returnValue.push(!0)}else{if((v.remaining==0||v.maxLimit==0)){self.availabilityDetailed[methodId].push(availability_notEnoughRemaining);if(typeof v.on_remainingReached_callback!="undefined"){var limit=null;if(v.id!=null){limit=v.id}
if(useEvents){v.on_remainingReached_callback(self,method,limit,v.remaining)}}
returnValue.push(!1)}else{if((v.maxLimit>0&&(amount>v.maxLimit||amount>v.remaining||v.remaining<=0))||((self.isWithdrawal())&&amount>self.currentBalance)){self.availabilityDetailed[methodId].push(availability_maxReached);if(typeof v.on_maxLimitReached_callback!="undefined"){var limit=null;if(v.id!=null){limit=v.id}
if(amount>v.maxLimit){var limitValue=v.maxLimit}else if(amount>v.remaining){var limitValue=v.remaining}
if(limitValue<0){limitValue=0}
if(useEvents){v.on_maxLimitReached_callback(self,method,limit,limitValue)}}
returnValue.push(!1)}else if(amount<v.minLimit){self.availabilityDetailed[methodId].push(availability_minReached);if(typeof v.on_minLimitReached_callback!="undefined"){var limit=null;if(v.id!=null){limit=v.id}
if(useEvents){v.on_minLimitReached_callback(self,method,limit,v.minLimit)}}
returnValue.push(!0)}}}}})
return returnValue}
return null}
paymentsObj.prototype.getMethod=function(methodId){var self=this;var value=null;$(this.payMethods).each(function(k,v){if(v.id==methodId){value=this
return!1}})
if(value!=null){return value}
return!1}
paymentsObj.prototype.getLimit=function(methodId,limitId){var method=this.getMethod(methodId);var returnValue=null;if(method){$(method.limits).each(function(k,v){if(v.id==limitId){returnValue=v;return!1}})}
if(returnValue!=null){return returnValue}
return!1}
paymentsObj.prototype.getSubmethodIndex=function(methodId,submethodId){var self=this;var submethod=self.getMethod(methodId);var valueToReturn=!1;$(submethod.limits).each(function(k,v){if(v.id==submethodId){valueToReturn=k;return!1}})
return valueToReturn}
paymentsObj.prototype.getBalance=function(){if(this.isShoppingCart()||this.isWithdrawal()){return this.currentBalance}
return!1}
paymentsObj.prototype.getCurrentAmount=function(){return this.amountToAdd}
paymentsObj.prototype.setVoucherValue=function(voucherValue){this.voucherValue=Math.abs(voucherValue)}
paymentsObj.prototype.getVoucherValue=function(){return this.voucherValue}
paymentsObj.prototype.isShoppingCart=function(){return this.shoppingCart}
paymentsObj.prototype.isWithdrawal=function(){return this.withdrawal}
paymentsObj.prototype.isUsingPreviousBalance=function(){return this.usingPreviousBalance}
paymentsObj.prototype.isUsingForceMinLimit=function(){return this.usingForceMinLimit}
paymentsObj.prototype.isDebug=function(){return this.debug}
paymentsObj.prototype.getFirstAvailableMethod=function(){if(this.firstAvailableMethod.length>0){return this.firstAvailableMethod}
return!1}
paymentsObj.prototype.setPaymentAdditionalFields=function(additionalFieldsObj){var self=this;if(typeof additionalFieldsObj==='object'){self.additionalPaymentParameters=additionalFieldsObj}else{console.log('"additionalFieldsObj" is not an object')}}
paymentsObj.prototype.performPay=function(method,submethod,paymentProtocolObj,formElem,callbackOnFail){var self=this;var form=formElem;var cbf=function(){}
this.paymentProtocolObj=paymentProtocolObj;var options={extraFields:{}}
if(typeof self.paymentProtocolObj.amount!="undefined"){options.extraFields.amount=self.paymentProtocolObj.amount}
if(typeof self.paymentProtocolObj.method!="undefined"){options.extraFields.method=self.paymentProtocolObj.method}
if(typeof self.paymentProtocolObj.submethod!="undefined"){options.extraFields.submethod=self.paymentProtocolObj.submethod}
if(typeof self.paymentProtocolObj.uid!="undefined"){options.extraFields.uid=self.paymentProtocolObj.uid}
if(typeof callbackOnFail!="undefined"){cbf=callbackOnFail}
if(typeof self.paymentProtocolObj.isShoppingCart!="undefined"){options.extraFields.isShoppingCart=self.paymentProtocolObj.isShoppingCart}
if(typeof self.paymentProtocolObj.usePreviousBalance!="undefined"){options.extraFields.usePreviousBalance=self.paymentProtocolObj.usePreviousBalance}
if(typeof self.paymentProtocolObj.forceMinLimit!="undefined"){options.extraFields.forceMinLimit=self.paymentProtocolObj.forceMinLimit}
if(typeof self.paymentProtocolObj.storedValueID!="undefined"){options.extraFields.storedValueID=self.paymentProtocolObj.storedValueID}
if(typeof self.paymentProtocolObj.customValues!="undefined"){options.extraFields.customValues=self.paymentProtocolObj.customValues}
if(typeof self.paymentProtocolObj.saveInAgenda!="undefined"){options.extraFields.saveInAgenda=self.paymentProtocolObj.saveInAgenda}
if(typeof self.paymentProtocolObj.uploadToken!="undefined"){options.extraFields.uploadToken=self.paymentProtocolObj.uploadToken}
sendDataAsJSON:ignoreFormFields:options.sendDataAsJSON=!0;options.ignoreFormFields=!0;options.extraFields.screenColorDepth=screen.colorDepth;options.extraFields.screenwidth=screen.width;options.extraFields.screenheight=screen.height;options.extraFields.language=navigator.language;options.extraFields.timezoneOffset=new Date().getTimezoneOffset();if(self.isValidationMode()){options.extraFields.method=self.isValidationMode().method;options.extraFields.submethod=self.isValidationMode().submethod}
if(self.getAutoSubmethod(paymentProtocolObj.method)&&typeof self.paymentProtocolObj.customValues!="undefined"){var lastPaymentResultSubmethod="default"}else if(!self.getAutoSubmethod(paymentProtocolObj.method)&&typeof self.paymentProtocolObj.customValues!="undefined"){var lastPaymentResultSubmethod=null}else{var lastPaymentResultSubmethod="self.paymentProtocolObj.submethod"}
options.callbackOnSuccess=function(e){self.setLastPaymentResult(self.paymentProtocolObj.method,lastPaymentResultSubmethod)
self.onSuccess(e);self.paymentInProgress=!1}
options.callbackOnFail=function(e){self.setLastPaymentResult(self.paymentProtocolObj.method,lastPaymentResultSubmethod)
cbf(e);self.onFail(e);self.paymentInProgress=!1};options.callbackOnError=self.onFail;options.submitBt={elem:$(formElem).find('[data-submit-payment]'),holdMsg:self.strings.wait,enableOnSuccess:!0};options.statusMsg={elem:$(formElem).find('[data-status-msg]')};if(!self.isValidationMode()){options.statusMsg.ok=self.strings.paymentDone}else{options.statusMsg.ok=self.strings.validationDone}
if(self.additionalPaymentParameters!=null){options.extraFields.userDefinedFields={}
$.each(self.additionalPaymentParameters,function(k,v){options.extraFields.userDefinedFields[k]=v})}
var payForme=new formeSubmit($(form),self.purchaseURL,options)}
paymentsObj.prototype.getAvailability=function(){return this.availability}
paymentsObj.prototype.getDetailedAvailability=function(methodId){if(typeof methodId!="undefined"){return this.availabilityDetailed[methodId]}else{return this.availabilityDetailed}}
paymentsObj.prototype.getSubMethodAvailability=function(methodId,limitId){var self=this;var returnedValue=!1;var limit=!1
if(methodId!==!1){var availability=self.getAvailability();$.each(availability,function(k,v){if(k==methodId&&v.length>1){var method=self.getMethod(k);$(method.limits).each(function(limitk,limitv){if(limitv.id==limitId){if(availability[k][limitk]===!0){returnedValue=!0;return!1}}})}else if(k==methodId&&v.length==1){if(limitId==null){if(availability[k][0]===!0){returnedValue=!0;return!1}}}})}
return returnedValue}
paymentsObj.prototype.getPaymentInProgressElems=function(){return this.paymentInProgress}
paymentsObj.prototype.initProvidedDocuments=function(){var self=this;if(self.isWithdrawal()){$.each(this.payMethods,function(k,v){if(v.documento){self.providedDocuments[v.id]=!1}})}}
paymentsObj.prototype.getProvidedDocumentsStatus=function(methodId){if(typeof this.providedDocuments[methodId]!="undefined"){return this.providedDocuments[methodId]}
return null}
paymentsObj.prototype.setProvidedDocumentsToken=function(methodId,token){var self=this;if(typeof this.providedDocuments[methodId]!="undefined"){this.providedDocuments[methodId]=token;self.isAvailable(methodId);return!0}else{return!1}}
paymentsObj.prototype.setLastPaymentResult=function(methodId,limitId){this.lastPaymentResult={method:methodId,submethod:limitId}}
paymentsObj.prototype.getLastPaymentResult=function(){return this.lastPaymentResult}
paymentsObj.prototype.isValidationMode=function(){if(this.validationMode){return this.validationMode}else{return!1}}
paymentsObj.prototype.isForFundingOnly=function(methodId){var self=this;var method=self.getMethod(methodId);if(method&&typeof method.useForFundingOnly!="undefined"&&typeof method.useForFundingOnly.url!="undefined"){return method.useForFundingOnly.url}else{return!1}}
paymentsObj.prototype.canUseVirtualCash=function(method,limit,options){var self=this;var saldo=self.getBalance();var importePago=self.getAmount();var limite=limit;var returnExceededMinLimit=!1;if(typeof options!="undefined"){if(typeof options.returnExceededMinLimit!="undefined"&&options.returnExceededMinLimit===!0){returnExceededMinLimit=!0}}
var availabilityz=self.getDetailedAvailability([method.id]);var valueToReturn=!0;if(method.id!="sv"){var index=self.getSubmethodIndex(method.id,limit.id);if(index!==!1&&availabilityz[index]){if(typeof limite.allowFundsCompensation!="undefined"&&limite.allowFundsCompensation===!0){if(saldo>0&&saldo<importePago&&importePago>limite.minLimit&&importePago<limite.remaining){if((importePago-saldo)>=limite.minLimit){return!0}else{return-1}}}}else{return!1}}
return!1}
paymentsObj.prototype.removeDocumentRequirement=function(methodId){var self=this;var method=self.getMethod(methodId);if(typeof self.providedDocuments[methodId]!="undefined"){delete self.providedDocuments[methodId];method.documento=!1;return!0}
return!1}
paymentsObj.prototype.setNewDocumentRequirement=function(documentId,methodId){var self=this;var method=self.getMethod(methodId);var hadPreviousDocument=!1;if(typeof method.documento!="undefined"&&method.documento!=null&&method.documento!==!1){hadPreviousDocument=method.documento}
if(typeof self.providedDocuments[methodId]=="undefined"||(typeof self.providedDocuments[methodId]!="undefined"&&hadPreviousDocument&&hadPreviousDocument!=documentId)){self.providedDocuments[methodId]=!1;method.documento=documentId;return!0}
return!1}
var paymentsManager=function(options){this.paymentsObj={};this.elem="[data-payManager]";this.payManagerSelector="[data-payManager-methods]";this.cashRegisterSelector="[data-payManager-cashRegister]";this.cashRegisterValueSelector="[data-paymanagerCashValue]";this.cashRegisterOptions={maxValue:99000,minValue:0,decimals:2,changeCallback:function(){},addCallback:function(){},remCallback:function(){}}
this.msg={selector:"[data-msg-area]",titleSelector:"[data-msg-area-title]",msgSelector:"[data-msg-area-message]"}
this.actionAreaSelector="[data-action-area]";this.totalOperationSelector="[data-total-operation]";this.totalOperationValueSelector="[data-total-operation-value]";this.storedMethodsListSelector="[data-payment-stored-list]";this.usePreviousBalanceSelector="[data-remainingbalance-area]";this.defaultSelectedMethod=!1;this.defaultSelectedSubMethod=!1;this.defaultSelectSubMethodWhenStored=!1;this.currencyObj=null;this.storedPayments={}
this.documentsObj=!1
this.onSuccess=function(){}
this.selectFirstAvailableMethod=!1;this.selectVCFirstIfAvailable=!1;this.animations=!0;this.readyForPurchase={};this.currentMethodNav=null;this.currentSubmethodAutoNav=null;if(typeof options!="undefined"){if(typeof options.elem!="undefined"){this.elem=options.elem
this.payManagerSelector=$(this.elem).find(this.payManagerSelector);this.cashRegisterSelector=$(this.elem).find(this.cashRegisterSelector);this.cashRegisterValueSelector=$(this.elem).find(this.cashRegisterValueSelector)}
if(typeof options.selectFirstAvailableMethod&&!options.selectFirstAvailableMethod){this.selectFirstAvailableMethod=!1}
if(typeof options.selectVCFirstIfAvailable&&options.selectVCFirstIfAvailable){this.selectVCFirstIfAvailable=!0;this.selectFirstAvailableMethod=!1}
if(typeof options.currencyObj!="undefined"){this.currencyObj=options.currencyObj}
if(typeof options.cashRegister!="undefined"){if(typeof options.cashRegister.maxValue!="undefined"){this.cashRegisterOptions.maxValue=options.cashRegister.maxValue}
if(typeof options.cashRegister.minValue!="undefined"){this.cashRegisterOptions.minValue=options.cashRegister.minValue}
if(typeof options.cashRegister.decimals!="undefined"){this.cashRegisterOptions.decimals=options.cashRegister.decimals}
if(typeof options.cashRegister.changeCallback!="undefined"){this.cashRegisterOptions.changeCallback=options.cashRegister.changeCallback}
if(typeof options.cashRegister.addCallback!="undefined"){this.cashRegisterOptions.addCallback=options.cashRegister.addCallback}
if(typeof options.cashRegister.remCallback!="undefined"){this.cashRegisterOptions.remCallback=options.cashRegister.remCallback}}
if(typeof options.paymentsStorageObj!="undefined"){this.storedPayments=options.paymentsStorageObj}
if(typeof options.documentsObj!="undefined"){this.documentsObj=options.documentsObj}
if(typeof options.onSuccess!="undefined"){this.onSuccess=options.onSuccess}}
var self=this;var managerRow=$(this.payManagerSelector).find('li');$(this.payManagerSelector).find('li:not([data-showmore]) > button').on('click',function(){if(!$(this).closest('li').hasClass('is-active')){if(self.getAnimation()){$(self.payManagerSelector).find('li.is-active [data-paymanagercontent]').slideUp(function(){}).closest('li').removeClass('is-active')}else{$(self.payManagerSelector).find('li.is-active [data-paymanagercontent]').hide().closest('li').removeClass('is-active')}
var method=self.getMethodFromDOM($(this))
var methodId=method.id
var selectedSubm=self.getSelectedLimitId(!0);if(typeof $(this).closest('li').attr('data-blocked')=='undefined'){if(self.getAnimation()){$(this).closest('li').find('[data-paymanagercontent]').slideDown(function(){}).closest('li').addClass('is-active')}else{$(this).closest('li').find('[data-paymanagercontent]').show().closest('li').addClass('is-active')}
if(typeof self.storedPayments.storedPaymentsObj!="undefined"&&self.storedPayments.getPaymentsObj().length>0&&self.defaultSelectSubMethodWhenStored){if(method.limits.length>1&&!self.paymentsObj.getAutoSubmethod(methodId)){var isSelectedItemFromAgenda=self.storedPayments.getSelectionFromMethod(methodId);if(isSelectedItemFromAgenda){self.setDefaultSubmethod(methodId,method.limits[0].id);self.hideSubMethods(methodId)}}}}else{$(this).closest('li').addClass('is-active')}
if(self.paymentsObj.getAutoSubmethod(method.id)){if(!self.storedPayments.getMethod(method.id)||(self.storedPayments.getMethod(method.id)&&!self.storedPayments.getShowInPayments())){self.switchToAutoSubmethod(method.id)
self.switchToDefaultMethods(method.id,"default")}else{self.paymentsObj.isAvailable(method.id)
self.unsetPaymentMethodsFromList(method.id)}}
if(selectedSubm){if(self.getForceMinAllowed(methodId,selectedSubm)){if(self.getForceMinStatus(methodId,selectedSubm)){self.paymentsObj.setUseForceMinLimit(!0)}else{self.paymentsObj.setUseForceMinLimit(!1)}}else{self.paymentsObj.setUseForceMinLimit(!1)}}}})
$(this.payManagerSelector).find('li[data-showMore] > button').on('click',function(){$(self.payManagerSelector).find('li[data-isFiltered="true"]').slideDown().attr('data-isFiltered','false');$(this).closest('li[data-showMore]').remove()})
$(this.payManagerSelector).find('[data-subMethodsTabs] input[data-submethod]').on('change',function(){var submetodo=$(this).attr('data-submethod');var metodo=$(this).attr('data-method');self.setSubmethod(metodo,submetodo)})
if(this.documentsObj){this.documentsObj.setOnAddedFileCallback(function(e,docElem){docElem.close();var selectedMethod=self.getSelectedMethodId()
var selectedLimit=self.getSelectedLimitId()
var token=e.docToken;self.paymentsObj.setProvidedDocumentsToken(selectedMethod,token);self.setDocumentStatus(!0,selectedMethod,selectedLimit);self.paymentsObj.isAvailable(selectedMethod)
if(selectedLimit==!1){selectedLimit=null}
var navMethod=self.getNavMethod(selectedMethod,selectedLimit);if(navMethod=="stored"){self.performPayFromStorage(selectedMethod,selectedLimit)}else if(navMethod=="default"){self.performPayFromDefault(selectedMethod,selectedLimit)}})}
this.hideAllTotalOperations();this.blockAllMethods()}
paymentsManager.prototype.attachPayMethodsObj=function(paymentsObj){var self=this;if(typeof paymentsObj=="undefined"||(typeof paymentsObj!="undefined"&&paymentsObj.length==0)){return!1}
this.paymentsObj=paymentsObj;if(!self.paymentsObj.isValidationMode()){if(paymentsObj.isWithdrawal()){this.paymentsObj.initProvidedDocuments()}
var cashRegisterElem=$(this.elem).find(this.cashRegisterSelector)
var cashRegisterValueElem=$(cashRegisterElem).find(this.cashRegisterValueSelector)
$(cashRegisterValueElem).on("change keyup",function(){self.setAmount($(this).val())
self.cashRegisterOptions.changeCallback($(this).val())})
countersEvents({'elem':$(cashRegisterElem),'max':this.cashRegisterOptions.maxValue,'min':this.cashRegisterOptions.minValue,'decimals':this.cashRegisterOptions.decimals,'calculatePurchaseOptionsAfterAddCallback':function(){self.cashRegisterOptions.addCallback($(cashRegisterValueElem).val());self.setAmount(parseFloat($(cashRegisterValueElem).val()))},'calculatePurchaseOptionsAfterRemCallback':function(){self.cashRegisterOptions.remCallback($(cashRegisterValueElem).val());self.setAmount(parseFloat($(cashRegisterValueElem).val()))}});$(cashRegisterElem).find('input').removeAttr('disabled');$(cashRegisterElem).find('button').removeAttr('disabled');if(this.paymentsObj.isShoppingCart()){$(this.payManagerSelector).find('[data-substractSaldo]').off('change').on('change',function(){var value=$(this).prop('checked');self.paymentsObj.setUsePreviousBalance($(this).prop('checked'));$(self.payManagerSelector).find('[data-substractSaldo]').each(function(){var elem=$(this).prop('checked',value).closest('label');var limit=self.getLimitFromDOM(elem);var lid=null;var method=self.getMethodFromDOM(elem);if(!limit){limit=null;var originalLimit=null}else{lid=limit.id;var originalLimit=lid}
if(limit==null&&self.storedPayments.getMethod(method.id)&&self.getNavMethod(method.id)=="stored"){var selected=self.storedPayments.getSelection(method.id);if(selected){var subm=selected.methodId;limit=self.getLimit(method.id,subm)
lid=subm}}
if(limit!=null||limit==null&&lid!=null){if(value===!0){$(elem).addClass('is-active');if(self.paymentsObj.canUseVirtualCash(method,limit)){self.showTotalOperation(method.id,lid)}}else{$(elem).removeClass('is-active');self.hideTotalOperation(method.id,lid)}
self.setTotalOperationForMethod(null,method.id,originalLimit)}})})
this.setAmount(this.paymentsObj.getCurrentAmount())}
$(this.payManagerSelector).find('[data-forcemin]').off('change').on('change',function(){var value=$(this).prop('checked');var methodObj=self.getMethodFromDOM($(this));var submethodObj=self.getLimitFromDOM($(this));if(!submethodObj){var subm=null}else{var subm=submethodObj.id}
if(value){self.setForceMinForMethod(methodObj.id,subm)}else{self.unsetForceMinForMethod(methodObj.id,subm)}})}
if(!self.paymentsObj.isValidationMode()){if(this.selectFirstAvailableMethod){var famethod=self.paymentsObj.getFirstAvailableMethod();if(famethod){if(famethod[1]!=null){self.setDefaultSubmethod(famethod[0],famethod[1]);self.setDefaultMethod(famethod[0])}else{self.setDefaultMethod(famethod[0])}}}else if(this.selectVCFirstIfAvailable){availableMethods=this.paymentsObj.getAvailability();if(typeof availableMethods.sv!="undefined"&&Array.isArray(availableMethods.sv)&&availableMethods.sv[0]===!0){self.setDefaultMethod("sv")}}}else{self.setAmount(0);if(this.selectFirstAvailableMethod){self.setDefaultMethod(self.paymentsObj.isValidationMode().method)}
on_validValues_functions(self.paymentsObj.isValidationMode().method,self.paymentsObj.isValidationMode().submethod,self)}
$(self.paymentsObj.payMethods).each(function(kmethod,method){if(!self.paymentsObj.isValidationMode()){var methodLimits=method.limits}else{var methodLimits=new Array({id:self.paymentsObj.isValidationMode().submethod})}
if(typeof method.documento=="undefined"||!method.documento||method.documento==null){self.removeDocumentRequirement(method.id)}
if(!self.paymentsObj.isShoppingCart()||(self.paymentsObj.isShoppingCart()&&!self.paymentsObj.isForFundingOnly(method.id))){if(methodLimits.length>1){if(self.paymentsObj.getAutoSubmethod(method.id)){var methodElem=self.getMethodDOMelem(method.id);$(methodElem).find('[data-autoSubMehod-nav]').off('change').on('change',function(){if($(this).prop("checked")){self.switchToUserChoosableSubmethod(method.id)}else{self.switchToAutoSubmethod(method.id)}})}}
var m=self.getMethodDOMelem(method.id);if(!self.storedPayments.getMethod(method.id)){$(m).find('form[data-payment-storage="stored"]').find(self.usePreviousBalanceSelector).remove()}
$(methodLimits).each(function(klimit,limit){var submethod="default";if(limit!=null){submethod=limit.id}
var methodElem=self.getLimitDOMelem(method.id,submethod);var storageDefaultElem=$(methodElem).find('form[data-payment-storage="default"]');var abideElem=$(methodElem).find('[data-payment-storage][data-abide]')
$(abideElem).each(function(ak,av){new Foundation.Abide($(av))})
var storageStoredElem=$(methodElem).find('form[data-payment-storage="stored"]');var storageDefaultElem=$(methodElem).find('form[data-payment-storage="default"]');$(storageDefaultElem).find('[data-payment-storage-navigation]').addClass('is-active');$(storageStoredElem).find('[data-payment-storage-navigation]').addClass('is-active');if((typeof limit.allowSavePaymentData!="undefined"&&!limit.allowSavePaymentData)){$(storageDefaultElem).find('[data-payment-storage-add]').remove()}
if(!self.storedPayments.getMethod(method.id)){$(storageDefaultElem).find('[data-payment-storage-nav]').remove();$(storageStoredElem).find('[data-payment-storage-nav]').remove()}
$(storageDefaultElem).find('[data-submit-payment]').off('click').on('click',function(){$(this).closest('form').submit()});$(storageDefaultElem).on('formvalid.zf.abide',function(){self.performPayFromDefault(method.id,limit.id)}).on('forminvalid.zf.abide',function(ev){}).on("submit",function(ev){ev.preventDefault()});$(storageDefaultElem).find('[data-payment-storage-request]').off('click').on('click',function(){if(typeof self.documentsObj!="undefined"){if(method.documento){self.documentsObj.open(method.documento,!0)}}else{console.log("Objeto \"Documento\" no aÃ±adido a la clase")}})})}else{var methodElem=self.getMethodDOMelem(method.id);var storageDefaultElem=$(methodElem).find('form[data-payment-storage="default"]');$(storageDefaultElem).find('[data-submit-payment]').off('click').on('click',function(){self.performPayFromDefault(method.id)})}})
self.toggleSubscriptionsMsgs();var uniqueAgendaForMethod=!0;if(this.storedPayments.getPaymentsObj().length>0){this.storedPayments.resetAllSelections();$(this.storedPayments.storedPaymentsObj).each(function(k,v){if(!self.paymentsObj.isValidationMode()){var methodLimits=self.getMethod(v.methodId).limits;var method=v.methodId;var methodElem=self.getMethodDOMelem(v.methodId)}else{var methodLimits=new Array({id:self.paymentsObj.isValidationMode().submethod})}
var storedItemsElem=$(methodElem).find(self.storedMethodsListSelector);if(!self.paymentsObj.isValidationMode()){var storedPaymentsHTMLOptions={}}else{var storedPaymentsHTMLOptions={ignoreVaultedItems:!0}}
var rendered=$(storedItemsElem).html(self.storedPayments.retrieveHTMLforMethod(method,null,storedPaymentsHTMLOptions));$(methodLimits).each(function(limK,limV){var submethod=null;if(limV.id!=null){submethod=limV.id}
var methodElem=self.getMethodDOMelem(v.methodId);var submethodDOMElem=self.getLimitDOMelem(v.methodId,limV.id);$(rendered).find('input[type=radio]').off('change').on('change',function(){if(!self.paymentsObj.getAutoSubmethod(v.methodId)){var selectedId=parseInt($(this).closest('[data-value]').attr('data-value'));var thisMethod=self.getMethodFromDOM($(this))
self.setPaymentMethodFromList(selectedId,thisMethod.id)
var selectedSubmethod=self.storedPayments.getSelection(thisMethod.id).methodId;var selectedMethod=self.storedPayments.getSelection(thisMethod.id).parentMethodId;self.unsetForceMinForMethod(selectedMethod,null,!0);self.showUsePreviousBalance(selectedMethod,null)
self.paymentsObj.isAvailable(v.methodId)
var rfp=self.getReadyForPurchase(selectedMethod,selectedSubmethod);self.setTotalOperationForMethod(null,selectedMethod,null);self.setPurchaseButtonAvailability(rfp,selectedMethod)
if(!rfp){self.showMsg(selectedMethod,null)}else{self.clearMsg(selectedMethod,null)}
if(self.paymentsObj.getSubscriptionsState()&&!self.paymentsObj.getSubscriptionsAllowed(selectedMethod,selectedSubmethod)){self.showSubscriptionsMsg(selectedMethod,null)}else{self.hideSubscriptionsMsg(selectedMethod,null)}
if(self.storedPayments.getMethod(selectedMethod)){if(self.storedPayments.cvvRequired(selectedId,selectedMethod)&&rfp){self.showRequiredFields(selectedMethod,selectedSubmethod)}else{self.hideRequiredFields(selectedMethod,selectedSubmethod)}}}else{var id=parseInt($(this).closest('[data-value]').attr('data-value'));self.storedPayments.setSelection(id,v.methodId,submethod)
var currentSelection=self.storedPayments.getSelection(v.methodId,submethod);var subm=currentSelection.methodId;var met=self.getMethodFromDOM($(this)).id;if(!self.paymentsObj.isWithdrawal()){if(self.getForceMinAllowed(met,subm)){self.paymentsObj.setUseForceMinLimit(self.getForceMinStatus(met,subm))}else{self.paymentsObj.setUseForceMinLimit(!1)}
if(self.paymentsObj.getSubscriptionsState()&&!self.paymentsObj.getSubscriptionsAllowed(met,subm)){self.showSubscriptionsMsg(met,"default")}else{self.hideSubscriptionsMsg(met,"default")}
self.setTotalOperationForMethod(null,met,"default")}
self.paymentsObj.isAvailable(v.methodId)}})
var elem=methodElem;var storageStoredElem=$(elem).find('form[data-payment-storage="stored"]');var storageDefaultElem=$(elem).find('form[data-payment-storage="default"]');var simpleNavElem=$(elem).find('[data-payment-navigation]')
$(storageDefaultElem).find('[data-payment-storage-navigation]').addClass('is-active');$(storageStoredElem).find('[data-payment-storage-navigation]').addClass('is-active');if(v.storedValues.length==0){$(storageDefaultElem).find('[data-payment-storage-nav]').attr('disabled','')}else{var cvvCounter=0;$(v.storedValues).each(function(kstoredValues,storedValue){if(storedValue.isDefault&&storedValue.enabled&&self.storedPayments.getShowInPayments(storedValue.parentMethodId)){self.switchToStoredMethods(v.methodId,submethod)}
if(self.storedPayments.cvvRequired(storedValue.id,v.methodId)){cvvCounter++}})
if(cvvCounter==0){$(elem).find('[data-payment-stored-required]').remove()}}
$(storageDefaultElem).find('[data-payment-storage-nav]').off('click').on('click',function(){self.paymentsObj.isAvailable(v.methodId)
self.switchToStoredMethods(v.methodId,null)
$.each(methodLimits,function(mm,nn){self.showStorageForMethod(v.methodId,nn.id)})
self.hideSubMethods(v.methodId)});$(simpleNavElem).find('[data-payment-nav]').off('click').on('click',function(){self.paymentsObj.isAvailable(v.methodId)
self.switchToStoredMethods(v.methodId,null)
$.each(methodLimits,function(mm,nn){self.showStorageForMethod(v.methodId,nn.id)})
self.hideSubMethods(v.methodId)})
$(storageStoredElem).find('[data-payment-storage-nav]').off('click').on('click',function(){if(!self.paymentsObj.getAutoSubmethod(v.methodId)){self.switchToDefaultMethods(v.methodId,null)
self.showSubMethods(v.methodId)
self.clearSubmethodsSelection(v.methodId)}else{self.switchToDefaultMethods(v.methodId,"default")}
self.paymentsObj.isAvailable(v.methodId)});var methodElem=self.getMethodDOMelem(v.methodId);var storageStoredElem=$(methodElem).find('form[data-payment-storage="stored"]');var storageDefaultElem=$(methodElem).find('form[data-payment-storage="default"]');var submethodElem=self.getLimitDOMelem(v.methodId,submethod);var storageStoredElemPerSubmethod=$(submethodElem).find('form[data-payment-storage="stored"]');var storageDefaultElemPerSubmethod=$(submethodElem).find('form[data-payment-storage="default"]');$(storageStoredElem).on("submit",function(ev){ev.preventDefault()});$(storageStoredElem).find('[data-submit-payment]').off('click').on('click',function(){$(this).closest('form').submit()});$(storageStoredElem).off("formvalid.zf.abide").on("formvalid.zf.abide",function(ev,frm){var selected=self.storedPayments.getSelection(self.getMethodFromDOM($(frm)).id);self.performPayFromStorage(v.methodId,selected.methodId)})
if(self.paymentsObj.getAutoSubmethod(v.methodId)&&submethod!="default"){$(storageDefaultElemPerSubmethod).find('[data-payment-storage-nav]').remove();$(storageStoredElemPerSubmethod).find('[data-payment-storage-navigation]').remove()}else if(self.paymentsObj.getAutoSubmethod(v.methodId)&&submethod=="default"){self.switchToAutoSubmethod(v.methodId);self.switchToStoredMethods(v.methodId,submethod)}
if(!self.paymentsObj.getAutoSubmethod(v.methodId)&&self.storedPayments.getPaymentsObj().length>0&&self.storedPayments.getShowInPayments(submethod)){self.switchToStoredMethods(v.methodId,submethod)}})})}
this.setAmount(this.paymentsObj.getCurrentAmount())}
paymentsManager.prototype.getCurrencyObj=function(){var self=this;if(self.currencyObj!=null){return self.currencyObj}else{return!1}}
paymentsManager.prototype.disableActionsForMethod=function(methodId,limitID){var self=this;if(typeof limitID!="undefined"&&limitID!=null){var actionMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"] '+this.actionAreaSelector)}else{var actionMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] '+this.actionAreaSelector);actionMgrElem=actionMgrElem[0]}
$(actionMgrElem).removeClass('is-active');this.setPurchaseButtonAvailability(!1,methodId,limitID)}
paymentsManager.prototype.enableActionsForMethod=function(methodId,limitID){if(typeof limitID!="undefined"&&limitID!=null){var actionMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"] '+this.actionAreaSelector)}else{var actionMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] '+this.actionAreaSelector);actionMgrElem=actionMgrElem[0]}
$(actionMgrElem).removeClass('allowNavOnly').addClass('is-active')}
paymentsManager.prototype.allowNavOnlyActionsForMethod=function(methodId,limitID){if(typeof limitID!="undefined"&&limitID!=null){var actionMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"] '+this.actionAreaSelector)}else{var actionMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] '+this.actionAreaSelector);actionMgrElem=actionMgrElem[0]}
$(actionMgrElem).removeClass('is-active').addClass('allowNavOnly')}
paymentsManager.prototype.removeActionsForMethod=function(methodId,limitID){if(typeof limitID!="undefined"&&limitID!=null){var actionMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"] '+this.actionAreaSelector)}else{var actionMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] '+this.actionAreaSelector);actionMgrElem=actionMgrElem[0]}
$(actionMgrElem).remove()}
paymentsManager.prototype.getAnimation=function(){return this.animations}
paymentsManager.prototype.setAnimation=function(value){this.animations=value}
paymentsManager.prototype.setAmount=function(amount,voucher){var self=this;if(this.paymentsObj.isShoppingCart()&&typeof voucher!="undefined"){this.paymentsObj.setVoucherValue(voucher);var hasVouchers=!0;this.paymentsObj.setAmount(amount,this.paymentsObj.getVoucherValue())}else{this.paymentsObj.setAmount(amount,voucher);var hasVouchers=!1;if(this.paymentsObj.getVoucherValue()>0&&this.paymentsObj.isShoppingCart()){hasVouchers=!0}}
if(amount==0&&!self.paymentsObj.isValidationMode()){if(hasVouchers){this.unblockAllMethods()}else{this.blockAllMethods()}}else{this.unblockAllMethods()}
this.setTotalOperation(amount);if((this.selectFirstAvailableMethod||this.selectVCFirstIfAvailable)&&self.paymentsObj.getSubMethodAvailability(this.getSelectedMethodId(),this.getSelectedLimitId())===!1){if(this.selectFirstAvailableMethod){this.selectFirstAvailableSubmethod()}else if(this.selectVCFirstIfAvailable){if(self.paymentsObj.getSubMethodAvailability(0,null)){self.setDefaultMethod(0)}}}
if(this.selectFirstAvailableMethod){var previoslySelectedMethod=this.getSelectedMethod();if(!previoslySelectedMethod){var famethod=self.paymentsObj.getFirstAvailableMethod();if(famethod){self.setDefaultMethod(famethod[0]);self.setDefaultSubmethod(famethod[0],famethod[1])}}}
self.checkCanUsePreviousBalance()}
paymentsManager.prototype.checkCanUsePreviousBalance=function(){var self=this;$(self.paymentsObj.payMethods).each(function(mkey,metodo){$(metodo.limits).each(function(lkey,limite){switch(self.paymentsObj.canUseVirtualCash(metodo,limite,{returnExceededMinLimit:!0})){case true:self.showUsePreviousBalance(metodo.id,limite.id);if(self.paymentsObj.isUsingPreviousBalance()){self.showTotalOperation(metodo.id,limite.id)}
break;case-1:self.hideUsePreviousBalance(metodo.id,limite.id,!0);self.hideTotalOperation(metodo.id,limite.id);break;case false:self.hideUsePreviousBalance(metodo.id,limite.id);self.hideTotalOperation(metodo.id,limite.id);break}})})}
paymentsManager.prototype.refresh=function(animated){var self=this;var voucher;if(this.paymentsObj.getVoucherValue()>0){voucher=this.paymentsObj.getVoucherValue()}
this.setAmount(this.paymentsObj.getAmount(),voucher);$(this.elem).find('[data-payment-storage] [data-status-msg]').empty().hide();self.toggleSubscriptionsMsgs()}
paymentsManager.prototype.setMsg=function(methodId,limitID,title,message,optionalValuesArray){if(limitID!=null){var payMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"]');var elemTitle=$(payMgrElem).find(this.msg.titleSelector);var elemContent=$(payMgrElem).find(this.msg.msgSelector);var elemMsg=$(payMgrElem).find(this.msg.selector)}else{var payMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"]');var elemTitle=$(payMgrElem).find(this.msg.titleSelector)[0];var elemContent=$(payMgrElem).find(this.msg.msgSelector)[0];var elemMsg=$(payMgrElem).find(this.msg.selector)[0]}
if(typeof optionalValuesArray!="undefined"&&Array.isArray(optionalValuesArray)){$(optionalValuesArray).each(function(k,v){var placeHolder="%"+(k+1);message=message.replace(new RegExp(placeHolder,'g'),v)})}
if(title!=null){$(elemTitle).html(title)}
$(elemContent).html(message);$(elemMsg).addClass('is-active')}
paymentsManager.prototype.showMsg=function(methodId,limitID){if(typeof limitID!="undefined"&&limitID!=null){var payMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"]');var elemMsg=$(payMgrElem).find(this.msg.selector)}else{var payMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"]');var elemMsg=$(payMgrElem).find(this.msg.selector)[0]}
$(elemMsg).addClass('is-active')}
paymentsManager.prototype.clearMsg=function(methodId,limitID){if(typeof limitID!="undefined"&&limitID!=null){var payMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"]');var elemTitle=$(payMgrElem).find(this.msg.titleSelector);var elemContent=$(payMgrElem).find(this.msg.msgSelector);var elemMsg=$(payMgrElem).find(this.msg.selector);$(payMgrElem).find('[data-payment-storage] [data-status-msg]').empty().hide()}else{var payMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"]');var elemTitle=$(payMgrElem).find(this.msg.titleSelector)[0];var elemContent=$(payMgrElem).find(this.msg.msgSelector)[0];var elemMsg=$(payMgrElem).find(this.msg.selector)[0];$(payMgrElem).find('[data-payment-storage] [data-status-msg]').empty().hide()}
$(elemTitle).empty();$(elemContent).empty();$(elemMsg).removeClass('is-active')}
paymentsManager.prototype.getMethod=function(methodId){var method=this.paymentsObj.getMethod(methodId);if(method){return method}
return!1}
paymentsManager.prototype.getMethodDOMelem=function(methodId){var self=this;var elem=$(self.payManagerSelector).find("> li[data-value='"+methodId+"']");if(elem.length>0){return $(elem)}
return!1}
paymentsManager.prototype.getMethodFromDOM=function(DOMelem){var mElem=$(DOMelem).closest('li[data-method][data-value]');var methodId=$(mElem).attr('data-value');if(typeof mElem!="undefined"){return this.getMethod(methodId)}
return!1}
paymentsManager.prototype.getLimit=function(methodId,limitId){return this.paymentsObj.getLimit(methodId,limitId)}
paymentsManager.prototype.getLimitDOMelem=function(methodId,limitId){var self=this;if(limitId==null&&self.paymentsObj.getAutoSubmethod(methodId)){limitId="default"}
var methodElem=this.getMethodDOMelem(methodId);if(methodElem){var elem=$(methodElem).find("[data-submethods] > li[data-value='"+limitId+"']");if(elem.length>0){return $(elem)}}
return!1}
paymentsManager.prototype.getLimitFromDOM=function(DOMelem){var mElem=$(DOMelem).closest('li[data-method][data-value]');var methodId=$(mElem).attr('data-value');var method=this.getMethod(methodId);var submethodId=null;if(typeof methodId!="undefined"&&method.limits.length>0){if(method.limits.length>1||(method.limits.length==1&&method.limits[0].id!=null)){var elem=$(DOMelem).closest('li[data-subMethod][data-value]');if(typeof elem!="undefined"){var submethodId=$(elem).attr('data-value')}}}
if(typeof mElem!="undefined"&&typeof submethodId!="undefined"){return this.getLimit(methodId,submethodId)}
return!1}
paymentsManager.prototype.getAmountWithFeesForMethod=function(amount,methodId,subMethodId){return this.paymentsObj.getAmountWithFeesForMethod(amount,methodId,subMethodId)}
paymentsManager.prototype.setTotalOperation=function(amount,currentBalance){var self=this;$(self.paymentsObj.payMethods).each(function(kMethod,method){$(method.limits).each(function(ksub,sub){var minLim=amount;if(amount<sub.minLimit){minLim=sub.minLimit}
var amountWithFees=self.getAmountWithFeesForMethod(minLim,method.id,sub.id)
if(self.paymentsObj.isShoppingCart()){if(self.paymentsObj.isUsingPreviousBalance()){var importeAPagar=self.paymentsObj.getAmountToPaySubstractingBalance(amountWithFees,self.paymentsObj.getBalance(),method.id);importeAPagar=parseFloat(importeAPagar).toFixed(2)}else{var importeAPagar=amountWithFees;importeAPagar=parseFloat(importeAPagar).toFixed(2)}
self.setTotalOperationForMethod(importeAPagar,method.id,sub.id)}else{var importeAPagar=amountWithFees;self.setTotalOperationForMethod(importeAPagar,method.id,sub.id)}
if(self.storedPayments.getMethod(method.id)&&self.getNavMethod(method.id)=="stored"){if(self.paymentsObj.getAutoSubmethod(method.id)){var s="default"}else{var s=null}
var selected=self.storedPayments.getSelection(method.id);if(selected){var submethod=selected.parentMethodId;var minLim=amount;if(self.paymentsObj.isBelowLimit(amount,method.id,submethod)){minLim=self.getLimit(method.id,submethod).minLimit}
var amountWithFees=self.getAmountWithFeesForMethod(minLim,method.id,submethod);if(self.paymentsObj.isUsingPreviousBalance()){var importeAPagar=self.paymentsObj.getAmountToPaySubstractingBalance(amountWithFees,self.paymentsObj.getBalance(),method.id);importeAPagar=parseFloat(importeAPagar).toFixed(2)}else{var importeAPagar=amountWithFees;importeAPagar=parseFloat(importeAPagar).toFixed(2)}
self.setTotalOperationForMethod(amountWithFees,method.id,s)}}})})}
paymentsManager.prototype.showTotalOperation=function(methodId,limitID){if(typeof limitID!="undefined"&&limitID!=null){var totalOpElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"] '+this.totalOperationSelector)}else{var totalOpElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] '+this.totalOperationSelector)}}
paymentsManager.prototype.toggleSubscriptionsMsgs=function(){var self=this;$(self.paymentsObj.payMethods).each(function(mk,m){$(m.limits).each(function(smk,sm){var isAutoSubmethod=self.paymentsObj.getAutoSubmethod(m.id);if(!isAutoSubmethod||isAutoSubmethod&&sm.id!="default"){if(!self.paymentsObj.getSubscriptionsAllowed(m.id,sm.id)&&self.paymentsObj.getSubscriptionsState()){self.showSubscriptionsMsg(m.id,sm.id)}else{self.hideSubscriptionsMsg(m.id,sm.id)}}else{if(self.storedPayments.getMethod(m.id)){var currentSelection=self.storedPayments.getSelection(m.id)
if(currentSelection){if(self.paymentsObj.getSubscriptionsState()&&!self.paymentsObj.getSubscriptionsAllowed(m.id,sm.id)){self.showSubscriptionsMsg(m.id,sm.id)}else{self.hideSubscriptionsMsg(m.id,sm.id)}}else{self.hideSubscriptionsMsg(m.id,sm.id)}}}})})}
paymentsManager.prototype.showSubscriptionsMsg=function(methodId,limitID){var self=this;var item=!1;if(limitID!=null){var elem=self.getLimitDOMelem(methodId,limitID);item=$(elem).find('[data-info-autopayment]')}else{var elem=self.getMethodDOMelem(methodId);var found=$(elem).find('[data-info-autopayment]');$(found).each(function(){if($(this).closest('[data-submethod').length==0){item=$(this);return!1}})}
if(item){$(item).addClass("is-active")}}
paymentsManager.prototype.hideSubscriptionsMsg=function(methodId,limitID){var self=this;var item=!1;if(limitID!=null){var elem=self.getLimitDOMelem(methodId,limitID);item=$(elem).find('[data-info-autopayment]')}else{var elem=self.getMethodDOMelem(methodId);var found=$(elem).find('[data-info-autopayment]');$(found).each(function(){if($(this).closest('[data-submethod').length==0){item=$(this);return!1}})}
if(item){$(item).removeClass("is-active")}}
paymentsManager.prototype.hideTotalOperation=function(methodId,limitID){if(typeof limitID!="undefined"&&limitID!=null){var totalOpElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"] '+this.totalOperationSelector)}else{var totalOpElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] '+this.totalOperationSelector)}
$(totalOpElem).removeClass('is-active')}
paymentsManager.prototype.hideAllTotalOperations=function(){var totalOpElems=$(this.elem).find(this.payManagerSelector).find(this.totalOperationSelector);$(totalOpElems).removeClass('is-active')}
paymentsManager.prototype.showAllTotalOperations=function(){var totalOpElems=$(this.elem).find(this.payManagerSelector).find(this.totalOperationSelector);$(totalOpElems).addClass('is-active')}
paymentsManager.prototype.showUsePreviousBalance=function(methodId,limitID){var self=this;var limit=limitID;if(self.storedPayments.getMethod(methodId)&&self.getNavMethod(methodId)=="stored"){var selected=self.storedPayments.getSelection(methodId);var subm=selected.methodId;if(selected){limit=subm}}
if(typeof limitID!="undefined"&&limitID!=null){var useBalanceElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"] '+this.usePreviousBalanceSelector)}else{var useBalanceElem=self.getMethodDOMelem(methodId);if(useBalanceElem){useBalanceElem=$(useBalanceElem).find('[data-payment-storage="stored"].is-active').find(this.usePreviousBalanceSelector)}}
var checkAvailability=self.paymentsObj.canUseVirtualCash(self.getMethod(methodId),self.getLimit(methodId,limit),{returnExceededMinLimit:!0});if(checkAvailability===!0){$(useBalanceElem).addClass('is-active').attr('data-remainingbalance-area','').find('input').removeAttr('disabled')}else if(checkAvailability==-1){self.hideUsePreviousBalance(methodId,limit,!0)}}
paymentsManager.prototype.hideUsePreviousBalance=function(methodId,limitID,dontHideButShowReason){var showWhyCantBeUsed=!1;if(typeof dontHideButShowReason!="undefined"&&dontHideButShowReason===!0){showWhyCantBeUsed=!0}
if(typeof limitID!="undefined"&&limitID!=null){var useBalanceElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"] '+this.usePreviousBalanceSelector)}else{var useBalanceElem=self.getMethodDOMelem(methodId)
if(useBalanceElem){useBalanceElem=$(useBalanceElem).find('[data-payment-storage="stored"].is-active').find(this.usePreviousBalanceSelector)}}
if(!showWhyCantBeUsed){$(useBalanceElem).removeClass('is-active')}else{$(useBalanceElem).addClass('is-active').attr('data-remainingbalance-area','unavailable');$(useBalanceElem).find('input').attr('disabled','disabled')}}
paymentsManager.prototype.unsetUsePreviousBalance=function(methodId,limitID){var self=this;if(typeof limitID!="undefined"&&limitID!=null){var useBalanceElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"] '+this.usePreviousBalanceSelector)}else{var useBalanceElem=self.getMethodDOMelem(methodId)
if(useBalanceElem){useBalanceElem=$(useBalanceElem).find('[data-payment-storage="stored"].is-active').find(this.usePreviousBalanceSelector)}}
$(useBalanceElem).prop('checked',!1).closest('label').removeClass('is-active');$(useBalanceElem).trigger('change')}
paymentsManager.prototype.setTotalOperationForMethod=function(amountToShow,methodId,limitID){var self=this;if(typeof limitID!="undefined"&&limitID!=null){if(self.storedPayments.getMethod(methodId)&&(self.storedPayments.getShowInPayments(methodId)||(!self.storedPayments.getShowInPayments(methodId)&&self.paymentsObj.isWithdrawal()))&&self.getNavMethod(methodId)=="stored"){var totalOpElem=self.getMethodDOMelem(methodId);if(totalOpElem){totalOpElem=$(totalOpElem).find('[data-payment-storage="stored"].is-active [data-amount]')}}else{var totalOpElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"] ul[data-submethods] > li[data-value="'+limitID+'"] [data-amount]')}}else{if(self.storedPayments.getMethod(methodId)&&(self.storedPayments.getShowInPayments(methodId)||(!self.storedPayments.getShowInPayments(methodId)&&self.paymentsObj.isWithdrawal()))&&self.getNavMethod(methodId)=="stored"){var totalOpElem=self.getMethodDOMelem(methodId);if(totalOpElem){totalOpElem=$(totalOpElem).find('[data-payment-storage="stored"].is-active [data-amount]')}}}
if(typeof limitID=="undefined"||(typeof limitID!="undefined"&&limitID==null)&&self.getNavMethod(methodId)=="stored"){var selected=self.storedPayments.getSelection(methodId);var subm=null;if(selected){var subm=selected.methodId}}else{var subm=limitID}
if(amountToShow==null){var minLim=self.paymentsObj.getAmount();if(self.paymentsObj.isBelowLimit(minLim,methodId,subm)){minLim=self.getLimit(methodId,subm).minLimit}
var amountWithFees=self.getAmountWithFeesForMethod(minLim,methodId,subm)
if(self.paymentsObj.isShoppingCart()){if(self.paymentsObj.isUsingPreviousBalance()){var importeAPagar=self.paymentsObj.getAmountToPaySubstractingBalance(minLim,self.paymentsObj.getBalance(),methodId,subm);importeAPagar=parseFloat(importeAPagar).toFixed(2)}else{var importeAPagar=amountWithFees;importeAPagar=parseFloat(importeAPagar).toFixed(2)}
var amount=importeAPagar}else{var amount=amountWithFees}}else{var amount=amountToShow}
var conversionObj=self.paymentsObj.applyConversionRate(parseFloat(amount),methodId,limitID);amount=conversionObj.value;if(typeof totalOpElem!="undefined"){if(!self.getCurrencyObj()){$(totalOpElem).text(amount.formatMoney(2,",","."))}else{if(self.getCurrencyObj().getISOCurrency()!=conversionObj.ISOcurrency){amount=self.getCurrencyObj().getMoneda(parseFloat(amount),conversionObj.ISOcurrency)}else{amount=self.getCurrencyObj().getMoneda(parseFloat(amount))}
$(totalOpElem).text(amount)}}}
paymentsManager.prototype.setDefaultMethod=function(methodId){var elem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"]');$(elem).find('>button').click();this.defaultSelectedMethod=methodId}
paymentsManager.prototype.setDefaultSubmethod=function(methodId,limitID){this.setSubmethod(methodId,limitID);this.defaultSelectedSubMethod=methodId}
paymentsManager.prototype.setSubmethod=function(methodId,limitID){var self=this;var subMethod=self.getLimitDOMelem(methodId,limitID);var method=self.getMethodDOMelem(methodId);var forceMinStatus=self.getForceMinStatus(methodId,limitID);if(forceMinStatus){self.setForceMinForMethod(methodId,limitID)}else{self.unsetForceMinForMethod(methodId,limitID)}
self.setTotalOperationForMethod(null,methodId,limitID);$(subMethod).closest("[data-paymanagerContent]").find("[data-subMethods] > li").removeClass('is-active');$(subMethod).addClass('is-active');$(method).find('[data-payment-navigation]').removeClass('is-active')}
paymentsManager.prototype.unsetSubmethod=function(methodId){this.clearSubmethodsSelection(methodId)}
paymentsManager.prototype.setSubscriptionsState=function(value){this.paymentsObj.setSubscriptionsState(value);this.toggleSubscriptionsMsgs()}
paymentsManager.prototype.blockMethod=function(methodId,animated){var animation=this.getAnimation();if(typeof animated!="undefined"){animation=animated}
var payMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"]')
$(payMgrElem).find('>button').attr('disabled','');if(animation){$(payMgrElem).find('[data-paymanagercontent]').slideUp()}else{$(payMgrElem).find('[data-paymanagercontent]').hide()}
$(payMgrElem).attr('data-blocked','');$(payMgrElem).removeClass('.is-active')}
paymentsManager.prototype.blockAllMethods=function(animated){var self=this;var animation=this.getAnimation();if(typeof animated!="undefined"){animation=animated}
var payMgrElems=$(this.elem).find(this.payManagerSelector).find('> li[data-value]')
$(payMgrElems).each(function(){$(this).find('>button').attr('disabled','');if(animation){$(this).find('[data-paymanagercontent]').slideUp()}else{$(this).find('[data-paymanagercontent]').hide()}
$(this).attr('data-blocked','')})}
paymentsManager.prototype.unblockMethod=function(methodId,animated){var self=this;var animation=this.getAnimation();if(typeof animated!="undefined"){animation=animated}
var classHTML="";if(methodId==this.defaultSelectedMethod){classHTML="is-active"}
var payMgrElem=$(this.elem).find(this.payManagerSelector).find('> li[data-value="'+methodId+'"]')
$(payMgrElem).find('>button').removeAttr('disabled','');if($(payMgrElem).hasClass('is-active')||(!$(payMgrElem).hasClass('is-active')&&methodId==this.defaultSelectedMethod)){if(animation){$(payMgrElem).find('[data-paymanagercontent]').slideDown()}else{$(payMgrElem).find('[data-paymanagercontent]').show()}}
$(payMgrElem).removeAttr('data-blocked')}
paymentsManager.prototype.unblockAllMethods=function(animated){var self=this;var animation=this.getAnimation();if(typeof animated!="undefined"){animation=animated}
var payMgrElems=$(this.elem).find(this.payManagerSelector).find('> li[data-value]');var activeElems=$(this.elem).find(this.payManagerSelector).find('> li[data-value].is-active').length;$(payMgrElems).each(function(k,v){$(v).find('>button').removeAttr('disabled','');if(activeElems==0){if($(v).attr('data-value')==this.defaultSelectedMethod){if(animation){$(v).find('[data-paymanagercontent]').slideDown()}else{$(v).find('[data-paymanagercontent]').show()}}}else{if($(v).hasClass("is-active")){if(animation){$(v).find('[data-paymanagercontent]').slideDown()}else{$(v).find('[data-paymanagercontent]').show()}}}
$(v).removeAttr('data-blocked')})}
paymentsManager.prototype.selectFirstAvailableSubmethod=function(methodId){var self=this;$.each(this.paymentsObj.getAvailability(),function(k,v){if(v.length>1){$(v).each(function(xk,xv){if(xv===!0){var method=self.getMethod(k);var subMethod=method.limits[xk];self.setDefaultSubmethod(k,subMethod.id);return!1}})}})}
paymentsManager.prototype.getSelectedMethod=function(){var self=this;var elem=$(self.payManagerSelector).find("> li[data-value].is-active");if($(elem).length>0){return $(elem)}else{return!1}}
paymentsManager.prototype.getSelectedMethodId=function(){var self=this;var elem=$(self.payManagerSelector).find("> li[data-value].is-active");if($(elem).length>0){var methodId=$(elem).attr('data-value');if(typeof methodId!="undefined"){return methodId}}else{return!1}}
paymentsManager.prototype.getSelectedLimitId=function(ignoreDefault){var self=this;var elem=self.getSelectedMethod();var methodId=self.getSelectedMethodId();var ignoreDef=!1;if(typeof ignoreDefault!="undefined"&&ignoreDefault){ignoreDef=!0}
if(elem){if(!self.paymentsObj.getAutoSubmethod(methodId)){var limitId=$(elem).find('[data-submethods] > [data-submethod].is-active').attr('data-value');if(typeof limitId!="undefined"){return limitId}}else{var limitId=$(elem).find('[data-submethods] > [data-submethod].is-active');if(limitId.length>0){var valueToReturn=!1;$(limitId).each(function(k,v){if($(v).attr('data-value')=="default"&&!ignoreDef){valueToReturn="default";return!1}else{valueToReturn=$(v).attr('data-value')}})
return valueToReturn}}}
return!1}
paymentsManager.prototype.clearSubmethodsSelection=function(methodId){var self=this;var elem=self.getMethodDOMelem(methodId);if(self.getMethod(methodId).limits.length>1){$(elem).find('[data-paymanagercontent] [data-submethodsTabs] input').prop('checked',!1);$(elem).find('[data-paymanagercontent] [data-submethods] li[data-submethod]').removeClass('is-active');if(self.storedPayments.getMethod(methodId)&&self.getNavMethod(methodId)=="default"&&!self.paymentsObj.getAutoSubmethod(methodId)){$(elem).find('[data-payment-navigation]').addClass('is-active')}}}
paymentsManager.prototype.getNavAutoSubmethod=function(){var self=this;if(self.currentSubmethodAutoNav!=null){return self.currentSubmethodAutoNav}else{return!1}}
paymentsManager.prototype.switchToAutoSubmethod=function(methodId){var self=this;self.currentSubmethodAutoNav="auto";self.hideSubMethods(methodId,!0)
self.showSubMethod(methodId,"default")
self.paymentsObj.setUseForceMinLimit(!1);self.setSubmethod(methodId,"default");var elem=self.getMethodDOMelem(methodId);self.unsetPaymentMethodsFromList(methodId);$(elem).find('[data-autoSubMehod-nav="advanced"]').addClass('is-active');$(elem).find('[data-autoSubMehod-nav="auto"]').removeClass('is-active')
$(elem).find('[data-autoSubMehod-nav]').prop('checked',!1)
self.switchToStoredMethods(methodId,"default");self.unsetUsePreviousBalance(methodId,"default")
self.paymentsObj.isAvailable(methodId)}
paymentsManager.prototype.switchToUserChoosableSubmethod=function(methodId){var self=this;self.currentSubmethodAutoNav="manual";self.showSubMethods(methodId,!0)
self.hideSubMethod(methodId,"default")
self.clearSubmethodsSelection(methodId);var elem=self.getMethodDOMelem(methodId);self.paymentsObj.setUseForceMinLimit(!1);$(elem).find('[data-autoSubMehod-nav="advanced"]').removeClass('is-active');$(elem).find('[data-autoSubMehod-nav="auto"]').addClass('is-active');$(elem).find('[data-autoSubMehod-nav]').prop('checked',!0);self.paymentsObj.isAvailable(methodId)}
paymentsManager.prototype.getNavMethod=function(methodId,limitID){var self=this;if(self.currentMethodNav!=null&&typeof methodId=="undefined"&&typeof limitID=="undefined"){return self.currentMethodNav}else{if(limitID!=null){var elem=this.getLimitDOMelem(methodId,limitID)}else{var elem=this.getMethodDOMelem(methodId)}
var storedElem=$(elem).find('[data-payment-storage].is-active');if($(storedElem).length>0){if($(storedElem).attr('data-payment-storage')=="stored"){return"stored"}else{return"default"}}else{if(self.currentMethodNav!=null){return self.currentMethodNav}}}}
paymentsManager.prototype.switchToStoredMethods=function(methodId,limitID){var self=this;self.currentMethodNav="stored";if(self.paymentsObj.getAutoSubmethod(methodId)&&self.getNavAutoSubmethod(methodId)=="auto"){autoSubmethodInProgress=!0;var elemn=this.getLimitDOMelem(methodId,"default")}else{var elemn=this.getMethodDOMelem(methodId)}
if(self.storedPayments.getMethod(methodId)){var storedElem=$(elemn).find('[data-payment-storage="stored"]');var items=$(storedElem).find('tr[data-value]');$(elemn).find('[data-payment-storage]').removeClass('is-active');$(elemn).find('[data-payment-storage="stored"]').addClass('is-active');if(!self.paymentsObj.getAutoSubmethod(methodId)){self.hideSubMethods(methodId,!0)}else{self.hideSubscriptionsMsg(methodId,"default")}
self.unsetPaymentMethodsFromList(methodId);var currentSelection=self.storedPayments.getSelection(methodId);if(currentSelection){self.setPurchaseButtonAvailability(self.getReadyForPurchase(methodId,currentSelection.methodId),methodId);self.showUsePreviousBalance(methodId,limitID)}else{self.hideForceMin(!1,methodId);self.setPurchaseButtonAvailability(!1,methodId);self.unsetUsePreviousBalance(methodId,limitID)}}}
paymentsManager.prototype.switchToDefaultMethods=function(methodId,limitID){var self=this;self.currentMethodNav="default";var autoSubmethodInProgress=!1;if(self.paymentsObj.getAutoSubmethod(methodId)&&self.getNavAutoSubmethod(methodId)=="auto"){autoSubmethodInProgress=!0;var elemn=this.getLimitDOMelem(methodId,"default");var limit="default"}else{var elemn=this.getMethodDOMelem(methodId);var limit=limitID}
$(elemn).find('[data-payment-storage]').removeClass('is-active');$(elemn).find('[data-payment-storage="default"]').addClass('is-active');self.unsetPaymentMethodsFromList(methodId);if(autoSubmethodInProgress){self.unsetForceMinForMethod(methodId,limit,!0);if(self.paymentsObj.getUseForceMinLimitForMethod(methodId,limit)){self.showForceMin(methodId,limit)}
if(self.paymentsObj.getSubscriptionsState()&&!self.paymentsObj.getSubscriptionsAllowed(methodId,limitID)){self.showSubscriptionsMsg(methodId,limitID)}else{self.hideSubscriptionsMsg(methodId,limitID)}
self.paymentsObj.isAvailable(methodId)}else{self.clearSubmethodsSelection(methodId);self.showSubMethods(methodId,!0);self.showInfoArea(methodId,limit);if(self.getMethod(methodId).limits.length==1){self.setSubmethod(methodId,self.getMethod(methodId).limits[0].id)}}
if(self.getReadyForPurchase(methodId,limitID)){if(self.paymentsObj.isWithdrawal()){var docStatus=self.paymentsObj.getProvidedDocumentsStatus(methodId);if(docStatus==null||typeof docStatus=="number"||self.getNavMethod(methodId,limitID)=="stored"){self.setPurchaseButtonAvailability(!0,methodId,limitID)}else{self.setPurchaseButtonAvailability(!1,methodId,limitID)}}}
self.clearMsg(methodId,null)}
paymentsManager.prototype.showStorageForMethod=function(methodId,limitID){var self=this;if(typeof limitID!="undefined"&&limitID!=null){var elem=this.getLimitDOMelem(methodId,limitID)}else{var elem=this.getMethodDOMelem(methodId)}
var currentNavMethod=self.getNavMethod(methodId,limitID);$(elem).find('[data-payment-storage="'+currentNavMethod+'"]').show()}
paymentsManager.prototype.hideStorageForMethod=function(methodId,limitID){var self=this;if(typeof limitID!="undefined"&&limitID!=null){var elem=this.getLimitDOMelem(methodId,limitID)}else{var elem=this.getMethodDOMelem(methodId)}
$(elem).find('[data-payment-storage]').hide()}
paymentsManager.prototype.showMethod=function(methodId){var self=this;var elem=this.getMethodDOMelem(methodId);$(elem).removeAttr('data-isVisible')}
paymentsManager.prototype.hideMethod=function(methodId){var self=this;var elem=this.getMethodDOMelem(methodId);$(elem).attr('data-isVisible',!1)}
paymentsManager.prototype.showSubMethod=function(methodId,subMethodId){var self=this;var method=self.getLimitDOMelem(methodId,subMethodId);$(method).removeAttr('data-isVisible')}
paymentsManager.prototype.hideSubMethod=function(methodId,subMethodId){var self=this;var method=self.getLimitDOMelem(methodId,subMethodId);$(method).attr('data-isVisible',!1)}
paymentsManager.prototype.showSubMethods=function(methodId,withContent){var self=this;var method=self.getMethodDOMelem(methodId);$(method).find('[data-submethodstabs]').show();if(typeof withContent!="undefined"&&withContent){$(method).find('[data-submethods] > [data-submethod]').removeAttr('data-isVisible')}}
paymentsManager.prototype.hideSubMethods=function(methodId,withContent){var self=this;var method=self.getMethodDOMelem(methodId);$(method).find('[data-submethodstabs]').hide();$(method).find('[data-payment-navigation]').removeClass('is-active');if(typeof withContent!="undefined"&&withContent){$(method).find('[data-submethods] > [data-submethod]').attr('data-isVisible',!1)}}
paymentsManager.prototype.setPaymentMethodFromList=function(id,methodId,limitID,launchChangeEvent){var self=this;if(typeof limitID!="undefined"&&limitID!=null){var elem=this.getLimitDOMelem(methodId,limitID)}else{var elem=this.getMethodDOMelem(methodId)}
$(elem).find(self.storedMethodsListSelector).find('[data-value="'+id+'"]:not(.disabled) label').addClass('is-active').find('input[data-paymentMethodSelector]:not([disabled])').prop('checked',!0);self.storedPayments.setSelection(id,methodId);if(typeof launchChangeEvent!="undefined"&&launchChangeEvent===!0){$(elem).find(self.storedMethodsListSelector).find('[data-value="'+id+'"]:not(.disabled) label').find('input[data-paymentMethodSelector]:not([disabled])').trigger("change")}else{if(typeof self.storedPayments.storedPaymentsObj!="undefined"){if(self.storedPayments.cvvRequired(id,methodId,limitID)){self.showRequiredFields(methodId,limitID)}else{self.hideRequiredFields(methodId,limitID)}}}}
paymentsManager.prototype.unsetPaymentMethodsFromList=function(methodId,limitID){var self=this;if(typeof limitID!="undefined"&&limitID!=null){var elem=this.getLimitDOMelem(methodId,limitID);self.unsetUsePreviousBalance(methodId,limitID)}else{var elem=this.getMethodDOMelem(methodId);self.unsetUsePreviousBalance(methodId,limitID)}
self.hideRequiredFields(methodId);self.storedPayments.resetSelection(methodId,limitID);if(self.paymentsObj.getAutoSubmethod(methodId)&&self.getNavAutoSubmethod()=="auto"&&self.getNavMethod("stored")){self.setPurchaseButtonAvailability(!1,methodId,"default")}else if(!self.paymentsObj.getAutoSubmethod(methodId)&&self.getNavMethod("stored")){self.setPurchaseButtonAvailability(!1,methodId,null)}
$(elem).find(self.storedMethodsListSelector).find('[data-value] label').removeClass('is-active').find('input').prop('checked',!1)}
paymentsManager.prototype.getSavingForLaterStatus=function(methodId,limitID){var self=this;var domElem=self.getLimitDOMelem(methodId,limitID);var savingForLaterElem=$(domElem).find('[data-payment-storage-add] input');if($(savingForLaterElem).length>0){return $(savingForLaterElem).prop('checked')}
return!1}
paymentsManager.prototype.setPurchaseButtonAvailability=function(state,methodId,limitID,setOnInactiveItems){var self=this;var onInactive=!1;if(typeof limitID!="undefined"&&limitID!=null){var elem=self.getLimitDOMelem(methodId,limitID);var activePaymentFormBt=$(elem).find('form[data-payment-storage] [data-submit-payment]')}else{var elem=self.getMethodDOMelem(methodId);var activePaymentFormBt=$(elem).find('form[data-payment-storage].is-active [data-submit-payment]')}
if(state){$(activePaymentFormBt).removeAttr('disabled');self.setReadyForPurchase(!0,methodId,limitID)}else{$(activePaymentFormBt).attr('disabled','');self.setReadyForPurchase(!1,methodId,limitID)}}
paymentsManager.prototype.setLimitsBadgeStatus=function(state,elemIndex,methodId){var self=this;var limit=self.getMethodDOMelem(methodId);if(Array.isArray(elemIndex)){$(elemIndex).each(function(k,v){var elem=$(limit).find("[data-limits] dd").eq(v);if(state===!0){$(elem).addClass('is-active')}else{$(elem).removeClass('is-active')}})}else{var elem=$(limit).find("[data-limits] dd").eq(elemIndex);if(state===!0){$(elem).addClass('is-active')}else{$(elem).removeClass('is-active')}}}
paymentsManager.prototype.setForceMinForMethod_legacy=function(methodId,limitID){var self=this;if(self.getForceMinAllowed(methodId,limitID)){if(!self.paymentsObj.isWithdrawal()){self.setPurchaseButtonAvailability(!0,methodId,limitID);if(self.storedPayments.getMethod(methodId)&&!self.paymentsObj.getAutoSubmethod(methodId)){}}else{}}
self.paymentsObj.setUseForceMinLimit(!0);self.enableActionsForMethod(methodId,limitID);if(self.storedPayments.getMethod(methodId)&&!self.paymentsObj.getAutoSubmethod(methodId)&&self.getNavMethod(methodId,limitID)=="stored"){var selected=self.storedPayments.getSelection(methodId);var subm=selected.methodId;if(selected){var limitMin=self.getLimit(methodId,subm).minLimit;if(self.getForceMinAllowed(methodId,limitID)){self.setReadyForPurchase(!0,methodId,subm);var importeAPager=self.getAmountWithFeesForMethod(limitMin,methodId,limitID);self.setTotalOperationForMethod(importeAPager,methodId,limitID);self.showTotalOperation(methodId,limitID)}}}else{if(self.getForceMinAllowed(methodId,limitID)){if(self.storedPayments.getMethod(methodId)&&self.paymentsObj.getAutoSubmethod(methodId)&&self.getNavMethod(methodId,limitID)=="stored"){var selected=self.storedPayments.getSelection(methodId);var subm=selected.methodId;self.setReadyForPurchase(!0,methodId,subm);var limitMin=self.getLimit(methodId,subm).minLimit}else{var subm=limitID;var limitMin=self.getLimit(methodId,limitID).minLimit}
var importeAPager=self.getAmountWithFeesForMethod(limitMin,methodId,subm);self.setTotalOperationForMethod(importeAPager,methodId,limitID);self.showTotalOperation(methodId,limitID)}}}
paymentsManager.prototype.setForceMinForMethod=function(methodId,limitID){var self=this;if(!self.paymentsObj.isWithdrawal()){self.setPurchaseButtonAvailability(!0,methodId,limitID)}
self.paymentsObj.setUseForceMinLimit(!0);self.enableActionsForMethod(methodId,limitID);if(methodId=="ccard"&&limitID=="default"){}
if(self.storedPayments.getMethod(methodId)&&!self.paymentsObj.getAutoSubmethod(methodId)&&self.getNavMethod(methodId,limitID)=="stored"){var selected=self.storedPayments.getSelection(methodId);var subm=selected.methodId;if(selected){var limitMin=self.getLimit(methodId,subm).minLimit;var importeAPager=self.getAmountWithFeesForMethod(limitMin,methodId,limitID);self.setReadyForPurchase(!0,methodId,subm);self.setTotalOperationForMethod(importeAPager,methodId,limitID);self.showTotalOperation(methodId,limitID)}}else{if(self.storedPayments.getMethod(methodId)&&self.paymentsObj.getAutoSubmethod(methodId)&&self.getNavMethod(methodId,limitID)=="stored"){var selected=self.storedPayments.getSelection(methodId);var subm=selected.methodId;var limitMin=self.getLimit(methodId,subm).minLimit;self.setReadyForPurchase(!0,methodId,subm)}else{var subm=limitID;var limitMin=self.getLimit(methodId,limitID).minLimit;self.setReadyForPurchase(!0,methodId,subm)}
var importeAPager=self.getAmountWithFeesForMethod(limitMin,methodId,subm);self.setTotalOperationForMethod(importeAPager,methodId,limitID);self.showTotalOperation(methodId,limitID)}}
paymentsManager.prototype.unsetForceMinForMethod_legacy=function(methodId,limitID,enableVisuals){var self=this;var subm=limitID;if(self.getForceMinAllowed(methodId,limitID)){self.setPurchaseButtonAvailability(!1,methodId,limitID);if(self.storedPayments.getMethod(methodId)&&self.getNavMethod(methodId,limitID)=="stored"){var selected=self.storedPayments.getSelection(methodId);var subm=selected.methodId;if(!self.paymentsObj.getAutoSubmethod(methodId)){if(selected){self.setReadyForPurchase(!1,methodId,subm)}}}}
self.hideTotalOperation(methodId,limitID);var importeAPager=self.getAmountWithFeesForMethod(self.paymentsObj.getAmount(),methodId,subm);self.setTotalOperationForMethod(importeAPager,methodId,limitID);self.paymentsObj.setUseForceMinLimit(!1);if(typeof enableVisuals!="undefined"&&enableVisuals){if(limitID!=null&&limitID){var elem=self.getLimitDOMelem(methodId,limitID);var bt=$(elem).find('[data-forcemin]')}else{var elem=self.getMethodDOMelem(methodId);var bt=$(elem).find('[data-forcemin]')[0]}
$(bt).prop('checked',!1).closest('label').removeClass('is-active')}}
paymentsManager.prototype.unsetForceMinForMethod=function(methodId,limitID,enableVisuals){var self=this;var subm=limitID;self.setPurchaseButtonAvailability(!1,methodId,limitID);if(self.storedPayments.getMethod(methodId)&&self.getNavMethod(methodId,limitID)=="stored"){var selected=self.storedPayments.getSelection(methodId);var subm=selected.methodId;if(!self.paymentsObj.getAutoSubmethod(methodId)){if(selected){self.setReadyForPurchase(!1,methodId,subm)}}}
self.hideTotalOperation(methodId,limitID);var importeAPager=self.getAmountWithFeesForMethod(self.paymentsObj.getAmount(),methodId,subm);self.setTotalOperationForMethod(importeAPager,methodId,limitID);self.paymentsObj.setUseForceMinLimit(!1);if(typeof enableVisuals!="undefined"&&enableVisuals){if(limitID!=null&&limitID){var elem=self.getLimitDOMelem(methodId,limitID);var bt=$(elem).find('[data-forcemin]')}else{var elem=self.getMethodDOMelem(methodId);var bt=$(elem).find('[data-forcemin]')[0]}
$(bt).prop('checked',!1).closest('label').removeClass('is-active')}}
paymentsManager.prototype.showInfoArea=function(methodId,limitID){var elem=this.getLimitDOMelem(methodId,limitID);$(elem).find('[data-info-area]').addClass('is-active')}
paymentsManager.prototype.hideInfoArea=function(methodId,limitID){var elem=this.getLimitDOMelem(methodId,limitID);$(elem).find('[data-info-area]').removeClass('is-active')}
paymentsManager.prototype.showForceMin=function(methodId,limitID){if(limitID!=null){var elem=$(this.getLimitDOMelem(methodId,limitID)).find('[data-forcemin-area]')}else{var elem=this.getMethodDOMelem(methodId).find('[data-forcemin-area]')[0]}
$(elem).addClass('is-active')}
paymentsManager.prototype.hideForceMin=function(methodId,limitID){if(limitID!=null){var elem=$(this.getLimitDOMelem(methodId,limitID)).find('[data-forcemin-area]')}else{var elem=this.getMethodDOMelem(methodId).find('[data-forcemin-area]')[0]}
$(elem).removeClass('is-active')}
paymentsManager.prototype.getForceMinAllowed_legacy=function(methodId,limitID){if(limitID!=null&&limitID!=!1){var elem=this.getLimitDOMelem(methodId,limitID);if($(elem).find('[data-forcemin-area]').hasClass('is-active')){return!0}}else{var elem=this.getMethodDOMelem(methodId);if($($(elem).find('[data-forcemin-area]')[0]).hasClass('is-active')){return!0}}
return!1}
paymentsManager.prototype.getForceMinAllowed=function(methodId,limitID){return!0}
paymentsManager.prototype.getForceMinStatus_legacy=function(methodId,limitID){if(this.getForceMinAllowed(methodId,limitID)){if(limitID!=null&&limitID!=!1){var elem=this.getLimitDOMelem(methodId,limitID);elem=$(elem).find('[data-forcemin]')}else{var elem=this.getMethodDOMelem(methodId);elem=$(elem).find('[data-forcemin]')[0]}
if($(elem).prop('checked')){return!0}else{return!1}}
return!1}
paymentsManager.prototype.getForceMinStatus=function(methodId,limitID){return!0}
paymentsManager.prototype.performPayFromStorage=function(methodId,limitID){var self=this;if(!self.getReadyForPurchase(methodId,limitID)){return!1}
var selectedId=self.storedPayments.getSelection(methodId,limitID).id;var formElem=self.getMethodDOMelem(methodId).find('form[data-payment-storage="stored"]');var valuesArray={};$(formElem).find('[data-payment-field]:visible').each(function(k,v){var fieldKey=$(v).attr('data-payment-field')
var fieldValue=$(v).val();valuesArray[fieldKey]=fieldValue})
if(valuesArray.length==0){valuesArray=null}
var usePrevBalance=!1;var method=self.getMethod(methodId);var limit=self.getLimit(methodId,limitID);if(self.paymentsObj.isUsingPreviousBalance()&&self.paymentsObj.canUseVirtualCash(method,limit)){usePrevBalance=!0}
var paymentProtocol={amount:self.paymentsObj.getCurrentAmount(),method:methodId,submethod:limitID,usePreviousBalance:usePrevBalance,forceMinLimit:self.paymentsObj.isUsingForceMinLimit(),isShoppingCart:self.paymentsObj.isShoppingCart(),storedValueID:self.storedPayments.getSelection(methodId,limitID).id,customValues:valuesArray,saveInAgenda:!1,}
if(self.paymentsObj.getAutoSubmethod(methodId)){if(limit.id=="default"){paymentProtocol.uid=method.uid}else{paymentProtocol.uid=limit.uid}}else{paymentProtocol.uid=limit.uid}
self.paymentsObj.performPay(methodId,limitID,paymentProtocol,$(formElem),function(){self.unblockAllMethods(!1)});self.blockAllMethods(!1);self.unblockMethod(methodId,!1)}
paymentsManager.prototype.performPayFromDefault=function(methodId,limitID){var self=this;var forFunding=self.paymentsObj.isForFundingOnly(methodId)
var amount=self.paymentsObj.getCurrentAmount();if(forFunding&&self.paymentsObj.isShoppingCart()){var url=forFunding;var pathParams="method="+methodId+"&amount="+amount;var paramPos=url.indexOf("?");var hashPos=url.indexOf("#");var hashString="";if(hashPos!=-1){var hashString=url.substring(hashPos,url.length);var url=url.substring(0,hashPos)}
if(paramPos==-1){pathParams="?"+pathParams}else{pathParams="&"+pathParams}
url=url+pathParams+hashString;window.location.href=url}
if(!self.getReadyForPurchase(methodId,limitID)){return!1}
var formElem=$(self.getLimitDOMelem(methodId,limitID)).find('form[data-payment-storage="default"]');var valuesArray={};if(self.getForceMinStatus(methodId,limitID)){self.paymentsObj.setUseForceMinLimit(!0)}else{self.paymentsObj.setUseForceMinLimit(!1)}
$(formElem).find('[data-payment-field]').each(function(k,v){var fieldKey=$(v).attr('data-payment-field')
var fieldValue=$(v).val();valuesArray[fieldKey]=fieldValue})
var saveInAgendaStatus=!1;if(!self.paymentsObj.isWithdrawal()){saveInAgendaStatus=self.getSavingForLaterStatus(methodId,limitID)}else{saveInAgendaStatus=!0;var uploadToken=self.paymentsObj.getProvidedDocumentsStatus(methodId)}
var usePrevBalance=!1;var method=self.getMethod(methodId);var limit=self.getLimit(methodId,limitID);if(self.paymentsObj.isUsingPreviousBalance()&&self.paymentsObj.canUseVirtualCash(method,limit)){usePrevBalance=!0}
var paymentProtocol={amount:amount,method:methodId,submethod:limitID,usePreviousBalance:usePrevBalance,forceMinLimit:self.paymentsObj.isUsingForceMinLimit(),isShoppingCart:self.paymentsObj.isShoppingCart(),storedValueID:null,customValues:valuesArray,saveInAgenda:saveInAgendaStatus}
if(self.paymentsObj.getAutoSubmethod(methodId)){if(limit.id=="default"){paymentProtocol.uid=method.uid}else{paymentProtocol.uid=limit.uid}}else{paymentProtocol.uid=limit.uid}
if(typeof uploadToken!="undefined"&&uploadToken!=null){paymentProtocol.uploadToken=uploadToken}
if(!forFunding||Â forFunding&&!self.paymentsObj.isShoppingCart()){self.paymentsObj.performPay(methodId,limitID,paymentProtocol,$(formElem),function(){self.unblockAllMethods(!1)});self.blockAllMethods(!1);self.unblockMethod(methodId,!1)}}
paymentsManager.prototype.setPaymentAdditionalFields=function(additionalFieldsObj){var self=this;self.paymentsObj.setPaymentAdditionalFields(additionalFieldsObj)}
paymentsManager.prototype.setReadyForPurchase=function(state,methodId,limitID){var self=this;if(typeof self.readyForPurchase[methodId]!="undefined"){if(self.readyForPurchase[methodId]!=null){var limitIndex=!1;if(limitID!=null){limitIndex=self.readyForPurchase[methodId].indexOf(limitID);if(limitIndex!=-1){if(state===!1){self.readyForPurchase[methodId].splice(limitIndex,1);if(self.readyForPurchase[methodId].length==0){delete self.readyForPurchase[methodId]}}}else{if(state===!0){self.readyForPurchase[methodId].push(limitID)}}}}else{if(state===!1){delete self.readyForPurchase[methodId]}}}else{if(state===!0){if(typeof limitID!="undefined"&&limitID!=null){self.readyForPurchase[methodId]=[limitID]}else{self.readyForPurchase[methodId]=null}}}}
paymentsManager.prototype.getReadyForPurchase=function(methodId,limitID){var self=this;if(typeof self.readyForPurchase[methodId]!="undefined"){if(self.readyForPurchase[methodId]!=null){if(limitID!=null){if(self.readyForPurchase[methodId].indexOf(limitID)!=-1){return!0}else{return!1}}else{var expected=self.getMethod(methodId).limits.length;if(self.readyForPurchase[methodId].length!=expected){return!1}else{return!0}}}else{return!0}}
return!1}
paymentsManager.prototype.getPaymentInProgressElems=function(){return self.paymentsObj.getPaymentInProgressElems()}
paymentsManager.prototype.setDocumentStatus=function(status,methodId,limitID){var self=this;if(typeof limitID!="undefined"&&limitID){var docBoxElem=self.getLimitDOMelem(methodId,limitID)}else{var docBoxElem=self.getMethodDOMelem(methodId)}
var docValElem=$(docBoxElem).find('[data-payment-storage-validation] [data-payment-storage-request]')
switch(status){case true:$(docValElem).attr('data-status',1).html(self.documentsObj.strings.waitingForApproval);break;case "init":$(docValElem).attr('data-status',0).html(self.documentsObj.strings.send);break;default:$(docValElem).attr('data-status',0).html(self.documentsObj.strings.waitingForApproval);break}}
paymentsManager.prototype.setNewDocumentRequirement=function(documentId,methodId){var self=this;self.paymentsObj.setNewDocumentRequirement(documentId,methodId);var methodDOM=self.getMethodDOMelem(methodId);$(methodDOM).find('[data-payment-storage-validation]').addClass('is-active');self.refresh()}
paymentsManager.prototype.removeDocumentRequirement=function(methodId){var self=this;self.paymentsObj.removeDocumentRequirement(methodId);var methodDOM=self.getMethodDOMelem(methodId);$(methodDOM).find('[data-payment-storage-validation]').removeClass('is-active');self.refresh()}
paymentsManager.prototype.isValidationMode=function(){var self=this;if(self.paymentsObj.isValidationMode()){return self.paymentsObj.isValidationMode()}else{return!1}}
paymentsManager.prototype.isDebug=function(){return this.paymentsObj.isDebug()}
paymentsManager.prototype.setNavElemStatus=function(state,methodId,subMethodId){var self=this;var elem=self.getMethodDOMelem(methodId);var item=$(elem).find('[data-submethodstabs] [data-submethod="'+subMethodId+'"]').closest('label');if(state!=null){$(item).attr('data-status',state)}else{$(item).removeAttr('data-status')}
return!1}
paymentsManager.prototype.showRequiredFields=function(methodId,subMethodId){var self=this;if(self.paymentsObj.getAutoSubmethod(methodId)&&self.getNavAutoSubmethod()=="auto"&&self.getNavMethod()=="stored"&&self.storedPayments.getPaymentsObj().length>0){var selected=self.storedPayments.getSelection(methodId);var submethod=selected.methodId;if(subMethodId==submethod){var elem=self.getLimitDOMelem(methodId,"default")}}else{if(typeof subMethodId!="undefined"&&subMethodId!=null){var elem=self.getLimitDOMelem(methodId,subMethodId)}else{var elem=self.getMethodDOMelem(methodId)}}
$(elem).find('[data-payment-stored-required]').addClass('is-visible');$(elem).find('[data-payment-stored-required] [required]').removeAttr('data-abide-ignore')}
paymentsManager.prototype.hideRequiredFields=function(methodId,subMethodId){var self=this;if(typeof subMethodId!="undefined"&&subMethodId!=null){var elem=self.getLimitDOMelem(methodId,subMethodId)}else{var elem=self.getMethodDOMelem(methodId)}
$(elem).find('[data-payment-stored-required]').removeClass('is-visible');$(elem).find('[data-payment-stored-required] [required]').attr('data-abide-ignore','')}
paymentsManager.prototype.setStorageElemStatus=function(state,affectedSubmethods,methodId,submethod){var self=this;if(typeof submethod!="undefined"&&submethod!=null){var elem=self.getLimitDOMelem(methodId,submethod)}else{var elem=self.getMethodDOMelem(methodId)}
$(self.storedPayments.getMethod(methodId).storedValues).each(function(k,v){if(v.methodId==affectedSubmethods){var item=$(elem).find(self.storedMethodsListSelector).find('[data-value="'+v.id+'"]');$(item).attr('data-status',state)}})
return!1}
function on_methodNotAvailable_functions(methodID,limitID,paymentsManagerObj,options){var strings={unavailableMethodTitle:"{t}MÃ©todo de pago no disponible{/t}",unavailableMethodMsg:"<p>{t}Este mÃ©todo de pago no estÃ¡ disponible para los items de tu compra actual{/t}</p>",}
if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(typeof options.strings.unavailableMethodTitle!="undefined"){strings.unavailableMethodTitle=options.strings.unavailableMethodTitle}
if(typeof options.strings.unavailableMethodMsg!="undefined"){strings.unavailableMethodMsg=options.strings.unavailableMethodMsg}}}
var elem=paymentsManagerObj.getMethodDOMelem(methodID);if(!paymentsManagerObj.storedPayments.getMethod(methodID)&&paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){paymentsManagerObj.clearMsg(methodID,null)}
if(!paymentsManagerObj.paymentsObj.isWithdrawal()){paymentsManagerObj.setMsg(methodID,limitID,strings.unavailableMethodTitle,strings.unavailableMethodMsg)
paymentsManagerObj.hideTotalOperation(methodID,limitID);paymentsManagerObj.hideForceMin(methodID,limitID);paymentsManagerObj.disableActionsForMethod(methodID,limitID);paymentsManagerObj.hideRequiredFields(methodID,limitID);paymentsManagerObj.setNavElemStatus(0,methodID,limitID);paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,limitID);paymentsManagerObj.setStorageElemStatus(0,limitID,methodID);if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){paymentsManagerObj.setStorageElemStatus(0,limitID,methodID,"default");if(paymentsManagerObj.getNavAutoSubmethod(methodID)=="auto"){if(paymentsManagerObj.getNavMethod(methodID)=="stored"){var selected=paymentsManagerObj.storedPayments.getSelection(methodID);var submethod=selected.methodId;if(limitID==submethod){paymentsManagerObj.setMsg(methodID,"default",strings.unavailableMethodTitle,strings.unavailableMethodTitleMsg);paymentsManagerObj.hideForceMin(methodID,"default");paymentsManagerObj.hideTotalOperation(methodID,"default");paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,"default")
paymentsManagerObj.hideRequiredFields(methodID,"default")}}else if(paymentsManagerObj.getNavMethod(methodID)=="default"){var defaultIndexItem=paymentsManagerObj.paymentsObj.getSubmethodIndex(methodID,"default");if(!paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID)[defaultIndexItem]){if(paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,"default")}}else{paymentsManagerObj.enableActionsForMethod(methodID,"default")}}}}}else{if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){var navMethod=paymentsManagerObj.getNavMethod(methodID);if(paymentsManagerObj.storedPayments.getMethod(methodID)&&navMethod=="stored"){var lim="default"
var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.hideRequiredFields(methodID)}else{selected=!1}
paymentsManagerObj.clearMsg(methodID,lim)}else{var lim=limitID}}else{var navMethod=paymentsManagerObj.getNavMethod(methodID);paymentsManagerObj.clearMsg(methodID,null);if(paymentsManagerObj.storedPayments.getMethod(methodID)&&navMethod=="stored"){var lim=null;var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.hideRequiredFields(methodID)}else{selected=!1}}else{var lim=limitID}}
if(!paymentsManagerObj.storedPayments.getMethod(methodID)||navMethod!="stored"||selected){paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,lim);paymentsManagerObj.setMsg(methodID,lim,strings.unavailableMethodTitle,strings.unavailableMethodMsg);paymentsManagerObj.setReadyForPurchase(!1,methodID,lim)}
if(paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.setStorageElemStatus(0,limitID,methodID,lim);if(navMethod!="stored"){paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,lim)}}else{paymentsManagerObj.disableActionsForMethod(methodID,lim)}
paymentsManagerObj.setNavElemStatus(0,methodID,lim);paymentsManagerObj.hideInfoArea(methodID,lim)}
var method=paymentsManagerObj.getMethod(methodID);var submethods=JSON.parse(JSON.stringify(method.limits));var submethodsCount=0;var expectedMethods=0;expectedMethods=method.limits.length;submethodsCount=paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID).length;if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){if(paymentsManagerObj.getNavAutoSubmethod()!="manual"&&paymentsManagerObj.getNavMethod(methodID,limitID)!="default"){expectedMethods=expectedMethods-1;submethodsCount=submethodsCount-1}}
if(expectedMethods==submethodsCount){var defaultIndex=null;if(paymentsManagerObj.getNavAutoSubmethod()!="manual"&&paymentsManagerObj.getNavMethod(methodID,limitID)!="default"){$(submethods).each(function(k,v){if(v.id=="default"){defaultIndex=k}})
if(defaultIndex!=null){submethods.splice(defaultIndex,1)}}
var falseElems=0;var thisKindElems=0;var critical=0;$(paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID)).each(function(k,v){if(v===availability_unavailable){thisKindElems ++}else if(v===availability_maxReached||v===availability_unavailable||v===availability_notEnoughRemaining){critical ++}else if(v!==availability_available){falseElems++}})
if(thisKindElems===submethods.length){paymentsManagerObj.setMsg(methodID,null,strings.unavailableMethodTitle,strings.unavailableMethodMsg);paymentsManagerObj.disableActionsForMethod(methodID,null);$(elem).attr('data-status',"0");paymentsManagerObj.unsetPaymentMethodsFromList(methodID,null)
paymentsManagerObj.unsetPaymentMethodsFromList(methodID,"default")}else if(critical==submethods.length){$(elem).attr('data-status',"0")}else{$(elem).attr('data-status',"2")}}}
function on_minLimitReached_functions_legacy(methodID,limitID,paymentsManagerObj,limitValue,options){var strings={minLimitReachedTitle:"{t}La compra <strong>no alcanza el mÃ­nimo</strong> para este mÃ©todo{/t}",minLimitReachedMsg:"<p>{t}El importe de compra es inferior al importe mÃ­nimo aceptado en este mÃ©todo de pago:{/t} <strong>%1</strong></p><p>{t}Puedes utilizar otro mÃ©todo de pago o bien aÃ±adir mÃ¡s artÃ­culos hasta alcanzar el mÃ­nimo. TambiÃ©n puedes aÃ±adir la cantidad mÃ­nima como Saldo Virtual y usarlo en cualquier momento{/t}</p>",}
if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(typeof options.strings.minLimitReachedTitle!="undefined"){strings.minLimitReachedTitle=options.strings.minLimitReachedTitle}
if(typeof options.strings.minLimitReachedMsg!="undefined"){strings.minLimitReachedMsg=options.strings.minLimitReachedMsg}}}
var referenceValue=limitValue;var elem=paymentsManagerObj.getMethodDOMelem(methodID);var limit=paymentsManagerObj.getLimit(methodID,limitID);if(!paymentsManagerObj.storedPayments.getMethod(methodID)&&paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){paymentsManagerObj.clearMsg(methodID,null)}
if(!paymentsManagerObj.getCurrencyObj()){var currencyValue=referenceValue+"â‚¬"}else{var currencyValue=paymentsManagerObj.getCurrencyObj().getMoneda(parseFloat(referenceValue))}
paymentsManagerObj.setMsg(methodID,limitID,strings.minLimitReachedTitle,strings.minLimitReachedMsg,[currencyValue]);if(!paymentsManagerObj.paymentsObj.isWithdrawal()){if(limit.allowForceMinLimit){if(paymentsManagerObj.storedPayments.getMethod(methodID)&&paymentsManagerObj.getNavMethod(methodID)=="stored"){var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.showForceMin(methodID,null)}else{if(!selected){paymentsManagerObj.hideForceMin(methodID,null)}}}else{paymentsManagerObj.showForceMin(methodID,limitID)}
paymentsManagerObj.setNavElemStatus(2,methodID,limitID);paymentsManagerObj.setStorageElemStatus(2,limitID,methodID);$(elem).attr('data-status',"2")}else{if(paymentsManagerObj.storedPayments.getMethod(methodID)&&paymentsManagerObj.getNavMethod(methodID)=="stored"){var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.hideForceMin(methodID,null)}}else{paymentsManagerObj.hideForceMin(methodID,limitID)}
paymentsManagerObj.hideForceMin(methodID,limitID);paymentsManagerObj.setNavElemStatus(0,methodID,limitID);paymentsManagerObj.setStorageElemStatus(0,limitID,methodID);$(elem).attr('data-status',"0")}
if(paymentsManagerObj.paymentsObj.getUseForceMinLimitForMethod(methodID,limitID)){if(paymentsManagerObj.paymentsObj.isUsingForceMinLimit()){paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,limitID);paymentsManagerObj.showTotalOperation(methodID,limitID);paymentsManagerObj.paymentsObj.setUseForceMinLimit(!0);paymentsManagerObj.setStorageElemStatus(1,limitID,methodID)}else{paymentsManagerObj.hideTotalOperation(methodID,limitID);paymentsManagerObj.paymentsObj.setUseForceMinLimit(!1);paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,limitID);paymentsManagerObj.hideRequiredFields(methodID,limitID);paymentsManagerObj.setStorageElemStatus(2,limitID,methodID)}}else{if(!paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.disableActionsForMethod(methodID,limitID)}else{paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,limitID)}
paymentsManagerObj.setStorageElemStatus(2,limitID,methodID);paymentsManagerObj.paymentsObj.setUseForceMinLimit(!1);paymentsManagerObj.hideTotalOperation(methodID,limitID);paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,limitID);paymentsManagerObj.hideRequiredFields(methodID,limitID)}
if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){if(limit.allowForceMinLimit){paymentsManagerObj.setStorageElemStatus(2,limitID,methodID,"default")}else{paymentsManagerObj.setStorageElemStatus(0,limitID,methodID,"default")}
if(paymentsManagerObj.getNavAutoSubmethod(methodID)=="auto"&&paymentsManagerObj.getNavMethod(methodID)=="stored"){var selected=paymentsManagerObj.storedPayments.getSelection(methodID);var submethod=selected.methodId;paymentsManagerObj.enableActionsForMethod(methodID,"default");if(limitID==submethod){if(limit.allowForceMinLimit){paymentsManagerObj.showForceMin(methodID,"default")}else{paymentsManagerObj.hideForceMin(methodID,"default")}
paymentsManagerObj.setMsg(methodID,"default",strings.minLimitReachedTitle,strings.minLimitReachedMsg,[currencyValue]);if(paymentsManagerObj.getForceMinStatus(methodID,"default")){paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,"default")
paymentsManagerObj.showTotalOperation(methodID,"default");paymentsManagerObj.paymentsObj.setUseForceMinLimit(!0)}else{paymentsManagerObj.hideTotalOperation(methodID,"default");paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,"default")
paymentsManagerObj.hideRequiredFields(methodID,"default");paymentsManagerObj.paymentsObj.setUseForceMinLimit(!1)}}}else if(paymentsManagerObj.getNavAutoSubmethod(methodID)=="auto"&&paymentsManagerObj.getNavMethod(methodID)=="default"){if(limit.allowForceMinLimit&&limitID=="default"){if(paymentsManagerObj.paymentsObj.getUseForceMinLimitState()){paymentsManagerObj.enableActionsForMethod(methodID,"default")}else{if(paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,"default")}}}else{var defaultIndexItem=paymentsManagerObj.paymentsObj.getSubmethodIndex(methodID,"default");if(!paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID)[defaultIndexItem]&&paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,"default")}else{paymentsManagerObj.enableActionsForMethod(methodID,"default")}}}}else{var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.setMsg(methodID,null,strings.minLimitReachedTitle,strings.minLimitReachedMsg,[currencyValue])}}}else{if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){var navMethod=paymentsManagerObj.getNavMethod(methodID);if(paymentsManagerObj.storedPayments.getMethod(methodID)&&navMethod=="stored"){var lim="default"
var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.hideRequiredFields(methodID)}else{selected=!1}
paymentsManagerObj.clearMsg(methodID,lim)}else{var lim=limitID}}else{var navMethod=paymentsManagerObj.getNavMethod(methodID);paymentsManagerObj.clearMsg(methodID,null);if(paymentsManagerObj.storedPayments.getMethod(methodID)&&navMethod=="stored"){var lim=null;var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.hideRequiredFields(methodID)}else{selected=!1}}else{var lim=limitID}}
if(!paymentsManagerObj.storedPayments.getMethod(methodID)||navMethod!="stored"||selected){paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,lim);paymentsManagerObj.setMsg(methodID,lim,strings.minLimitReachedTitle,strings.minLimitReachedMsg,[currencyValue]);paymentsManagerObj.setReadyForPurchase(!1,methodID,lim)}
if(paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.setStorageElemStatus(0,limitID,methodID,lim);if(navMethod!="stored"){paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,lim)}}else{paymentsManagerObj.disableActionsForMethod(methodID,lim)}
paymentsManagerObj.setNavElemStatus(0,methodID,lim);paymentsManagerObj.hideInfoArea(methodID,lim)}
var method=paymentsManagerObj.getMethod(methodID);var submethods=JSON.parse(JSON.stringify(method.limits));var submethodsCount=0;var expectedMethods=0;expectedMethods=method.limits.length;submethodsCount=paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID).length;if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){if(paymentsManagerObj.getNavAutoSubmethod()!="manual"&&paymentsManagerObj.getNavMethod(methodID,limitID)!="default"){expectedMethods=expectedMethods-1;submethodsCount=submethodsCount-1}}
if(expectedMethods==submethodsCount){var defaultIndex=null;if(paymentsManagerObj.getNavAutoSubmethod()!="manual"&&paymentsManagerObj.getNavMethod(methodID,limitID)!="default"){$(submethods).each(function(k,v){if(v.id=="default"){defaultIndex=k}})
if(defaultIndex!=null){submethods.splice(defaultIndex,1)}}
var falseElems=0;var thisKindElems=0;var critical=0;$(paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID)).each(function(k,v){if(k!=defaultIndex||Â defaultIndex==null){if(v===availability_minReached){thisKindElems ++}else if(v===availability_maxReached||v===availability_unavailable||v===availability_notEnoughRemaining){critical ++}else if(v!==availability_available){falseElems++}}})
if(thisKindElems==submethods.length){var nonPermitted=0;$(submethods).each(function(k,v){if(!v.allowForceMinLimit){nonPermitted++}})
if(nonPermitted==submethods.length){paymentsManagerObj.setMsg(methodID,null,strings.minLimitReachedTitle,strings.minLimitReachedMsg,[currencyValue]);paymentsManagerObj.disableActionsForMethod(methodID,null);$(elem).attr('data-status',"0");paymentsManagerObj.setLimitsBadgeStatus(!0,0,methodID);paymentsManagerObj.unsetPaymentMethodsFromList(methodID,null)
paymentsManagerObj.unsetPaymentMethodsFromList(methodID,"default")
if(paymentsManagerObj.paymentsObj.isWithdrawal()){paymentsManagerObj.disableActionsForMethod(methodID)}}}else if(critical==submethods.length){$(elem).attr('data-status',"0")}else if(falseElems>0){$(elem).attr('data-status',"2");paymentsManagerObj.setLimitsBadgeStatus(!0,0,methodID)}else{$(elem).attr('data-status',"2")}}}
function on_minLimitReached_functions(methodID,limitID,paymentsManagerObj,limitValue,options){var strings={minLimitReachedTitle:null,minLimitReachedMsg:"{t}El importe mÃ­nimo es de:{/t} <strong>%1</strong>. {t}La diferencia <strong>(%2)</strong> se aÃ±adirÃ¡ a tu Saldo Virtual{/t} </p>",}
if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(typeof options.strings.minLimitReachedTitle!="undefined"){strings.minLimitReachedTitle=options.strings.minLimitReachedTitle}
if(typeof options.strings.minLimitReachedMsg!="undefined"){strings.minLimitReachedMsg=options.strings.minLimitReachedMsg}}}
var newOptions={minLimitNotReached:!0,minLimitCurrencyValue:limitValue,strings:{minLimitReachedMsg:strings.minLimitReachedMsg}}
if(!paymentsManagerObj.paymentsObj.isWithdrawal()){on_validValues_functions(methodID,limitID,paymentsManagerObj,newOptions);return}else{var elem=paymentsManagerObj.getMethodDOMelem(methodID);var limit=paymentsManagerObj.getLimit(methodID,limitID);if(!paymentsManagerObj.storedPayments.getMethod(methodID)&&paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){paymentsManagerObj.clearMsg(methodID,null)}
if(!paymentsManagerObj.getCurrencyObj()){var currencyValue=limitValue+"â‚¬"}else{var currencyValue=paymentsManagerObj.getCurrencyObj().getMoneda(parseFloat(limitValue))}
paymentsManagerObj.setMsg(methodID,limitID,strings.minLimitReachedTitle,strings.minLimitReachedMsg,[currencyValue]);if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){var navMethod=paymentsManagerObj.getNavMethod(methodID);if(paymentsManagerObj.storedPayments.getMethod(methodID)&&navMethod=="stored"){var lim="default"
var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.hideRequiredFields(methodID)}else{selected=!1}
paymentsManagerObj.clearMsg(methodID,lim)}else{var lim=limitID}}else{var navMethod=paymentsManagerObj.getNavMethod(methodID);paymentsManagerObj.clearMsg(methodID,null);if(paymentsManagerObj.storedPayments.getMethod(methodID)&&navMethod=="stored"){var lim=null;var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.hideRequiredFields(methodID)}else{selected=!1}}else{var lim=limitID}}
if(!paymentsManagerObj.storedPayments.getMethod(methodID)||navMethod!="stored"||selected){paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,lim);paymentsManagerObj.setMsg(methodID,lim,strings.minLimitReachedTitle,strings.minLimitReachedMsg,[currencyValue]);paymentsManagerObj.setReadyForPurchase(!1,methodID,lim)}
if(paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.setStorageElemStatus(0,limitID,methodID,lim);if(navMethod!="stored"){paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,lim)}}else{paymentsManagerObj.disableActionsForMethod(methodID,lim)}
paymentsManagerObj.setNavElemStatus(0,methodID,lim);paymentsManagerObj.hideInfoArea(methodID,lim)
var method=paymentsManagerObj.getMethod(methodID);var submethods=JSON.parse(JSON.stringify(method.limits));var submethodsCount=0;var expectedMethods=0;expectedMethods=method.limits.length;submethodsCount=paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID).length;if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){if(paymentsManagerObj.getNavAutoSubmethod()!="manual"&&paymentsManagerObj.getNavMethod(methodID,limitID)!="default"){expectedMethods=expectedMethods-1;submethodsCount=submethodsCount-1}}
if(expectedMethods==submethodsCount){var defaultIndex=null;if(paymentsManagerObj.getNavAutoSubmethod()!="manual"&&paymentsManagerObj.getNavMethod(methodID,limitID)!="default"){$(submethods).each(function(k,v){if(v.id=="default"){defaultIndex=k}})
if(defaultIndex!=null){submethods.splice(defaultIndex,1)}}
var falseElems=0;var thisKindElems=0;var critical=0;$(paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID)).each(function(k,v){if(k!=defaultIndex||Â defaultIndex==null){if(v===availability_minReached){thisKindElems ++}else if(v===availability_maxReached||v===availability_unavailable||v===availability_notEnoughRemaining){critical ++}else if(v!==availability_available){falseElems++}}})
if(thisKindElems==submethods.length){var nonPermitted=0;$(submethods).each(function(k,v){if(!v.allowForceMinLimit){nonPermitted++}})
if(nonPermitted==submethods.length){paymentsManagerObj.setMsg(methodID,null,strings.minLimitReachedTitle,strings.minLimitReachedMsg,[currencyValue]);paymentsManagerObj.disableActionsForMethod(methodID,null);$(elem).attr('data-status',"0");paymentsManagerObj.setLimitsBadgeStatus(!0,0,methodID);paymentsManagerObj.unsetPaymentMethodsFromList(methodID,null)
paymentsManagerObj.unsetPaymentMethodsFromList(methodID,"default")
if(paymentsManagerObj.paymentsObj.isWithdrawal()){paymentsManagerObj.disableActionsForMethod(methodID)}}}else if(critical==submethods.length){$(elem).attr('data-status',"0")}else if(falseElems>0){$(elem).attr('data-status',"2");paymentsManagerObj.setLimitsBadgeStatus(!0,0,methodID)}else{$(elem).attr('data-status',"2")}}}}
function on_maxLimitReached_functions(methodID,limitID,paymentsManagerObj,limitValue,options){var strings={maxLimitReachedTitle:"{t}La compra <strong>supera el mÃ¡ximo</strong> disponible para este mÃ©todo{/t}",maxLimitReachedMsg:"<p>{t}En este momento el importe mÃ¡ximo que puedes pagar usando este mÃ©todo de pago es:{/t} <strong>%1</strong></p>"+"<p><u>{t}Â¿Por quÃ© este lÃ­mite?{/t}</u></p>"+"<p{t}>Este lÃ­mite se establece para evitar un uso inadecuado de tus mÃ©todos de pago, y se tienen en cuenta: pagos realizados en los Ãºltimos 30 dÃ­as, tiempo que llevas jugando, que hayas validado tu telÃ©fono por SMS, etc. <strong>Para garantizar tu seguridad, tu gestor en %1 va a revisar tu cuenta para intentar aumentarlo</strong>{/t}</p>"+"<p>{t}Mientras tanto, puedes utilizar otros mÃ©todos de pago{/t}</p>",notEnoughVCTitle:"{t}Saldo virtual <strong>insuficiente</strong> para efectuar esta compra{/t}",notEnoughVCMsg:"<p>{t}Pero no te preocupes, puedes Â«AÃ±adir Saldo VirtualÂ» o puedes intentarlo con otro mÃ©todo de pago{/t}</p>",maxTransferableReachedTitle:"<p>{t}No dispones de suficientes fondos transferibles{/t}</p>",maxTransferableReachedMsg:"<p>{t}Recuerda que sÃ³lo son transferibles los fondos provenientes de premios. Intenta extraer un importe menor.{/t}</p>"}
if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(typeof options.strings.maxLimitReachedTitle!="undefined"){strings.maxLimitReachedTitle=options.strings.maxLimitReachedTitle}
if(typeof options.strings.maxLimitReachedMsg!="undefined"){strings.maxLimitReachedMsg=options.strings.maxLimitReachedMsg}
if(typeof options.strings.notEnoughVCTitle!="undefined"){strings.notEnoughVCTitle=options.strings.notEnoughVCTitle}
if(typeof options.strings.notEnoughVCMsg!="undefined"){strings.notEnoughVCMsg=options.strings.notEnoughVCMsg}
if(typeof options.strings.maxTransferableReachedTitle!="undefined"){strings.maxTransferableReachedTitle=options.strings.maxTransferableReachedTitle}
if(typeof options.strings.maxTransferableReachedMsg!="undefined"){strings.maxTransferableReachedMsg=options.strings.maxTransferableReachedMsg}}}
var elem=paymentsManagerObj.getMethodDOMelem(methodID);var referenceValue=limitValue;if(!paymentsManagerObj.getCurrencyObj()){var currencyValue=referenceValue+"â‚¬"}else{var currencyValue=paymentsManagerObj.getCurrencyObj().getMoneda(parseFloat(referenceValue))}
if(methodID=="sv"){paymentsManagerObj.setMsg(methodID,limitID,strings.notEnoughVCTitle,strings.notEnoughVCMsg);paymentsManagerObj.disableActionsForMethod(methodID,limitID);paymentsManagerObj.setLimitsBadgeStatus(!0,0,0);$(elem).attr('data-status',"0");return!1}else{if(!paymentsManagerObj.storedPayments.getMethod(methodID)&&paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){paymentsManagerObj.clearMsg(methodID,null)}
if(!paymentsManagerObj.paymentsObj.isWithdrawal()){paymentsManagerObj.setMsg(methodID,limitID,strings.maxLimitReachedTitle,strings.maxLimitReachedMsg,[currencyValue])
paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,limitID);if(!paymentsManagerObj.storedPayments.getMethod(methodID)||(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)&&limitID=="default")){paymentsManagerObj.disableActionsForMethod(methodID,limitID)}else{if(paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,limitID)}}
paymentsManagerObj.setNavElemStatus(0,methodID,limitID);paymentsManagerObj.hideUsePreviousBalance(methodID,limitID);paymentsManagerObj.setStorageElemStatus(0,limitID,methodID,limitID);if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){paymentsManagerObj.setStorageElemStatus(0,limitID,methodID,"default");if(paymentsManagerObj.getNavAutoSubmethod(methodID)=="auto"){if(paymentsManagerObj.getNavMethod(methodID)=="stored"){var selected=paymentsManagerObj.storedPayments.getSelection(methodID);var submethod=selected.methodId;if(limitID==submethod){paymentsManagerObj.setMsg(methodID,"default",strings.maxLimitReachedTitle,strings.maxLimitReachedMsg,[currencyValue]);paymentsManagerObj.hideForceMin(methodID,"default");paymentsManagerObj.hideTotalOperation(methodID,"default");paymentsManagerObj.hideRequiredFields(methodID,"default");paymentsManagerObj.hideUsePreviousBalance(methodID,"default");paymentsManagerObj.enableActionsForMethod(methodID,"default");paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,"default")
paymentsManagerObj.hideRequiredFields(methodID)}}else if(paymentsManagerObj.getNavMethod(methodID)=="default"){var defaultIndexItem=paymentsManagerObj.paymentsObj.getSubmethodIndex(methodID,"default");if(paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID)[defaultIndexItem]!==!0){if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)&&limitID=="default"){paymentsManagerObj.disableActionsForMethod(methodID,"default")}else{if(paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,limitID)}}}else{paymentsManagerObj.enableActionsForMethod(methodID,"default")}}}}else{var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.setMsg(methodID,null,strings.maxLimitReachedTitle,strings.maxLimitReachedMsg,[currencyValue]);paymentsManagerObj.hideRequiredFields(methodID)}}}else{if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){var navMethod=paymentsManagerObj.getNavMethod(methodID);if(paymentsManagerObj.storedPayments.getMethod(methodID)&&navMethod=="stored"){var lim="default"
var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.hideRequiredFields(methodID)}else{selected=!1}}else{var lim=limitID}}else{var navMethod=paymentsManagerObj.getNavMethod(methodID);paymentsManagerObj.clearMsg(methodID,null);if(paymentsManagerObj.storedPayments.getMethod(methodID)&&navMethod=="stored"){var lim=null;var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.hideRequiredFields(methodID)}else{selected=!1}}else{var lim=limitID}}
if(!paymentsManagerObj.storedPayments.getMethod(methodID)||navMethod!="stored"||selected){paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,lim);paymentsManagerObj.setMsg(methodID,lim,strings.maxLimitReachedTitle,strings.maxLimitReachedMsg,[currencyValue]);paymentsManagerObj.setReadyForPurchase(!1,methodID,lim)}
if(paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.setStorageElemStatus(0,limitID,methodID,lim);if(navMethod!="stored"){paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,lim)}}else{paymentsManagerObj.disableActionsForMethod(methodID,lim)}
paymentsManagerObj.setNavElemStatus(0,methodID,lim);paymentsManagerObj.hideInfoArea(methodID,lim)}}
paymentsManagerObj.hideForceMin(methodID,limitID);paymentsManagerObj.hideRequiredFields(methodID,limitID);paymentsManagerObj.setLimitsBadgeStatus(!0,1,methodID,limitID);paymentsManagerObj.hideTotalOperation(methodID,limitID);paymentsManagerObj.setStorageElemStatus(0,limitID,methodID);var method=paymentsManagerObj.getMethod(methodID);var submethods=JSON.parse(JSON.stringify(method.limits));var submethodsCount=0;var expectedMethods=0;expectedMethods=method.limits.length;submethodsCount=paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID).length;if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){if(paymentsManagerObj.getNavAutoSubmethod()!="manual"&&paymentsManagerObj.getNavMethod(methodID,limitID)!="default"){expectedMethods=expectedMethods-1;submethodsCount=submethodsCount-1}}
if(expectedMethods==submethodsCount){var defaultIndex=null;if(paymentsManagerObj.getNavAutoSubmethod()!="manual"&&paymentsManagerObj.getNavMethod(methodID,limitID)!="default"){$(submethods).each(function(k,v){if(v.id=="default"){defaultIndex=k}})
if(defaultIndex!=null){submethods.splice(defaultIndex,1)}}
var falseElems=0;var thisKindElems=0;var critical=0;$(paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID)).each(function(k,v){if(k!=defaultIndex||defaultIndex==null){if(v===availability_maxReached){thisKindElems ++}else if(v===availability_maxReached||v===availability_unavailable||v===availability_notEnoughRemaining){critical ++}else if(v!==availability_available){falseElems++}}})
if(thisKindElems==submethods.length){if(!paymentsManagerObj.paymentsObj.isWithdrawal()){paymentsManagerObj.setMsg(methodID,null,strings.maxLimitReachedTitle,strings.maxLimitReachedMsg,[currencyValue])}else{paymentsManagerObj.setMsg(methodID,null,strings.maxTransferableReachedTitle,strings.maxTransferableReachedMsg,[currencyValue])}
paymentsManagerObj.unsetPaymentMethodsFromList(methodID,null)
paymentsManagerObj.unsetPaymentMethodsFromList(methodID,"default")
paymentsManagerObj.disableActionsForMethod(methodID,null);$(elem).attr('data-status',"0");paymentsManagerObj.setLimitsBadgeStatus(!0,0,methodID)}else if(critical==submethods.length){$(elem).attr('data-status',"0")}else if(falseElems>0){$(elem).attr('data-status',"2");paymentsManagerObj.setLimitsBadgeStatus(!0,0,methodID)}else{$(elem).attr('data-status',"2")}}}
function on_remainingReached_functions(methodID,limitID,paymentsManagerObj,limitValue,options){var strings={remainingReachedTitle:"{t}MÃ©todo de pago deshabilitado{/t}",remainingReachedMsg:"<p>{t}Para utilizar este mÃ©todo de pago, debes contactar con nuestro <a href='%1'>equipo de atenciÃ³n al cliente</a>{/t}</p>"+"<p><strong>{t}Te recomendamos utilizar otros mÃ©todos de pago, como transferencia bancaria{/t}</strong></p>",notEnoughVCTitle:"{t}Saldo virtual <strong>insuficiente</strong> para efectuar esta compra{/t}",notEnoughVCMsg:"<p>{t}Pero no te preocupes, puedes Â«AÃ±adir Saldo VirtualÂ» o puedes intentarlo con otro mÃ©todo de pago{/t}</p>",}
if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(typeof options.strings.remainingReachedTitle!="undefined"){strings.remainingReachedTitle=options.strings.remainingReachedTitle}
if(typeof options.strings.remainingReachedMsg!="undefined"){strings.remainingReachedMsg=options.strings.remainingReachedMsg}
if(typeof options.strings.notEnoughVCTitle!="undefined"){strings.notEnoughVCTitle=options.strings.notEnoughVCTitle}
if(typeof options.strings.notEnoughVCMsg!="undefined"){strings.notEnoughVCMsg=options.strings.notEnoughVCMsg}}}
var elem=paymentsManagerObj.getMethodDOMelem(methodID);if(methodID=="sv"){paymentsManagerObj.setMsg(methodID,limitID,strings.notEnoughVCTitle,strings.notEnoughVCMsg);paymentsManagerObj.disableActionsForMethod(methodID,limitID);paymentsManagerObj.hideTotalOperation(methodID,limitID);paymentsManagerObj.setLimitsBadgeStatus(!1,0,0);$(elem).attr('data-status',"0");return!1}
if(!paymentsManagerObj.storedPayments.getMethod(methodID)&&paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){paymentsManagerObj.clearMsg(methodID,null)}
if(!paymentsManagerObj.paymentsObj.isWithdrawal()){paymentsManagerObj.paymentsObj.setUseForceMinLimit(!1)
paymentsManagerObj.hideForceMin(methodID,limitID);paymentsManagerObj.setMsg(methodID,limitID,strings.remainingReachedTitle,strings.remainingReachedMsg);if(!paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.disableActionsForMethod(methodID,limitID)}else{paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,limitID)}
paymentsManagerObj.setNavElemStatus(0,methodID,limitID);paymentsManagerObj.hideRequiredFields(methodID,limitID);paymentsManagerObj.setStorageElemStatus(0,limitID,methodID);if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){paymentsManagerObj.setStorageElemStatus(0,limitID,methodID,"default");if(paymentsManagerObj.getNavAutoSubmethod(methodID)=="auto"){if(paymentsManagerObj.getNavMethod(methodID)=="stored"){paymentsManagerObj.clearMsg(methodID,"default");var selected=paymentsManagerObj.storedPayments.getSelection(methodID);var submethod=selected.methodId;if(limitID==submethod){paymentsManagerObj.setMsg(methodID,"default",strings.remainingReachedTitle,strings.remainingReachedMsg);paymentsManagerObj.hideForceMin(methodID,"default");paymentsManagerObj.enableActionsForMethod(methodID,"default");paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,"default");paymentsManagerObj.hideRequiredFields(methodID,limitID)}}else if(paymentsManagerObj.getNavMethod(methodID)=="default"){var defaultIndexItem=paymentsManagerObj.paymentsObj.getSubmethodIndex(methodID,"default");if(!paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID)[defaultIndexItem]){if(paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,"default")}}}}}}else{if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){var navMethod=paymentsManagerObj.getNavMethod(methodID);if(paymentsManagerObj.storedPayments.getMethod(methodID)&&navMethod=="stored"){var lim="default"
var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(selected&&selected.methodId==limitID){paymentsManagerObj.hideRequiredFields(methodID)}else{selected=!1}
paymentsManagerObj.clearMsg(methodID,lim)}else{var lim=limitID}
if(!paymentsManagerObj.storedPayments.getMethod(methodID)||navMethod!="stored"||selected){}}else{var navMethod=paymentsManagerObj.getNavMethod(methodID);paymentsManagerObj.clearMsg(methodID,null);if(paymentsManagerObj.storedPayments.getMethod(methodID)&&navMethod=="stored"){var lim=null;if(selected&&selected.methodId==limitID){paymentsManagerObj.hideRequiredFields(methodID)}else{selected=!1}}else{var lim=limitID}}
if(!paymentsManagerObj.storedPayments.getMethod(methodID)||navMethod!="stored"||selected){paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,lim);paymentsManagerObj.setReadyForPurchase(!1,methodID,lim)
paymentsManagerObj.setMsg(methodID,lim,strings.remainingReachedTitle,strings.remainingReachedMsg)}
if(paymentsManagerObj.storedPayments.getMethod(methodID)){paymentsManagerObj.setStorageElemStatus(0,limitID,methodID,lim);if(navMethod!="stored"){paymentsManagerObj.allowNavOnlyActionsForMethod(methodID,lim)}}else{paymentsManagerObj.disableActionsForMethod(methodID,lim)}
paymentsManagerObj.hideInfoArea(methodID,lim)}
var method=paymentsManagerObj.getMethod(methodID);var submethods=JSON.parse(JSON.stringify(method.limits));var submethodsCount=0;var expectedMethods=0;expectedMethods=method.limits.length;submethodsCount=paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID).length;if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){if(paymentsManagerObj.getNavAutoSubmethod()!="manual"&&paymentsManagerObj.getNavMethod(methodID,limitID)!="default"){expectedMethods=expectedMethods-1;submethodsCount=submethodsCount-1}}
if(expectedMethods==submethodsCount){var defaultIndex=null;if(paymentsManagerObj.getNavAutoSubmethod()!="manual"&&paymentsManagerObj.getNavMethod(methodID,limitID)!="default"){$(submethods).each(function(k,v){if(v.id=="default"){defaultIndex=k}})
if(defaultIndex!=null){submethods.splice(defaultIndex,1)}}
var falseElems=0;var thisKindElems=0;var critical=0;$(paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID)).each(function(k,v){if(k!=defaultIndex||Â defaultIndex==null){if(v===availability_notEnoughRemaining){thisKindElems ++}else if(v===availability_maxReached||v===availability_unavailable||v===availability_notEnoughRemaining){critical ++}else if(v!==availability_available){falseElems++}}})
if(thisKindElems==submethods.length){paymentsManagerObj.setMsg(methodID,null,strings.remainingReachedTitle,strings.remainingReachedMsg);paymentsManagerObj.disableActionsForMethod(methodID,null);$(elem).attr('data-status',"0");paymentsManagerObj.setLimitsBadgeStatus(!1,[0,0],methodID);paymentsManagerObj.unsetPaymentMethodsFromList(methodID,null)
paymentsManagerObj.unsetPaymentMethodsFromList(methodID,"default")}else if(critical==submethods.length){$(elem).attr('data-status',"0")}else if(falseElems>0){$(elem).attr('data-status',"0");paymentsManagerObj.setLimitsBadgeStatus(!1,[0,0],methodID)}else{$(elem).attr('data-status',"2")}}}
function on_validValues_functions(methodID,limitID,paymentsManagerObj,options){var elem=paymentsManagerObj.getMethodDOMelem(methodID);var metodo=paymentsManagerObj.paymentsObj.getMethod(methodID);var minLimitNotReached=!1;var minLimitCurrencyValue=0;var vcToFundStr="";var currencyValStr="";var strings={minLimitReachedMsg:"<p>{t}El importe mÃ­nimo es de:{/t} <strong>%1</strong>. {t}La diferencia <strong>(%2)</strong> se aÃ±adirÃ¡ a tu Saldo Virtual{/t} </p>",}
if(typeof options!="undefined"){if(typeof options.minLimitNotReached!="undefined"&&options.minLimitNotReached===!0){minLimitNotReached=!0}
if(typeof options.minLimitCurrencyValue!="undefined"){minLimitCurrencyValue=options.minLimitCurrencyValue}
if(typeof options.strings!="undefined"){if(typeof options.strings.minLimitReachedMsg!="undefined"){strings.minLimitReachedMsg=options.strings.minLimitReachedMsg}}}
if((!paymentsManagerObj.storedPayments.getMethod(methodID)||(paymentsManagerObj.storedPayments.getMethod(methodID)&&!paymentsManagerObj.storedPayments.getShowInPayments(methodID)))&&paymentsManagerObj.getMethod(methodID).limits.length==1){paymentsManagerObj.switchToDefaultMethods(methodID,limitID)}
paymentsManagerObj.clearMsg(methodID,limitID)
if(minLimitNotReached){var am=paymentsManagerObj.paymentsObj.getAmount();if(!paymentsManagerObj.getCurrencyObj()){currencyValStr=minLimitCurrencyValue+"â‚¬";vcToFundStr=minLimitCurrencyValue-am+"â‚¬"}else{currencyValStr=paymentsManagerObj.getCurrencyObj().getMoneda(parseFloat(minLimitCurrencyValue));vcToFundStr=paymentsManagerObj.getCurrencyObj().getMoneda(parseFloat(minLimitCurrencyValue-am))}
paymentsManagerObj.setMsg(methodID,limitID,null,strings.minLimitReachedMsg,[currencyValStr,vcToFundStr]);paymentsManagerObj.setForceMinForMethod(methodID,limitID)}
paymentsManagerObj.enableActionsForMethod(methodID,limitID);paymentsManagerObj.hideTotalOperation(methodID,limitID);paymentsManagerObj.hideForceMin(methodID,limitID);paymentsManagerObj.setNavElemStatus(null,methodID,limitID);paymentsManagerObj.showUsePreviousBalance(methodID,limitID);if(!paymentsManagerObj.isValidationMode()){if(!paymentsManagerObj.paymentsObj.isWithdrawal()){if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){paymentsManagerObj.setStorageElemStatus(null,limitID,methodID,"default");if(paymentsManagerObj.getNavAutoSubmethod(methodID)=="auto"){if(paymentsManagerObj.storedPayments.getMethod(methodID)){if(paymentsManagerObj.getNavMethod(methodID)=="stored"){var selected=paymentsManagerObj.storedPayments.getSelection(methodID);var submethod=selected.methodId;if(limitID==submethod){paymentsManagerObj.clearMsg(methodID,"default")
if(minLimitNotReached){paymentsManagerObj.setMsg(methodID,"default",null,strings.minLimitReachedMsg,[currencyValStr,vcToFundStr]);paymentsManagerObj.setForceMinForMethod(methodID,"default")}
paymentsManagerObj.enableActionsForMethod(methodID,"default");paymentsManagerObj.hideTotalOperation(methodID,"default");paymentsManagerObj.hideForceMin(methodID,"default");paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,"default")
paymentsManagerObj.setReadyForPurchase(!0,methodID,submethod)
paymentsManagerObj.showUsePreviousBalance(methodID,"default");if(paymentsManagerObj.storedPayments.cvvRequired(selected.id,selected.parentMethodId,submethod)){paymentsManagerObj.showRequiredFields(methodID,submethod)}else{paymentsManagerObj.hideRequiredFields(methodID)}}else{paymentsManagerObj.clearMsg(methodID,null)}}else if(paymentsManagerObj.getNavMethod(methodID)=="default"){paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,limitID);if(minLimitNotReached){paymentsManagerObj.setForceMinForMethod(methodID,limitID)}}}else{paymentsManagerObj.enableActionsForMethod(methodID,limitID);paymentsManagerObj.clearMsg(methodID,limitID)
paymentsManagerObj.clearMsg(methodID,null)
paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,limitID);if(minLimitNotReached){paymentsManagerObj.setMsg(methodID,limitID,null,strings.minLimitReachedMsg,[currencyValStr,vcToFundStr]);paymentsManagerObj.setForceMinForMethod(methodID,limitID)}}}else{paymentsManagerObj.enableActionsForMethod(methodID,limitID);paymentsManagerObj.switchToDefaultMethods(methodID,limitID);paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,limitID);if(minLimitNotReached){paymentsManagerObj.setForceMinForMethod(methodID,limitID)}}}else{paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,limitID);if(minLimitNotReached){paymentsManagerObj.setForceMinForMethod(methodID,limitID)}
var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(minLimitNotReached&&selected&&selected.methodId==limitID){paymentsManagerObj.setMsg(methodID,null,null,strings.minLimitReachedMsg,[currencyValStr,vcToFundStr]);paymentsManagerObj.showMsg(methodID,null)}else if(selected&&selected.methodId==limitID){paymentsManagerObj.clearMsg(methodID,null)}}}else{paymentsManagerObj.enableActionsForMethod(methodID,limitID);var isValid=!0;if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){var eLID="default"
var sLID="default";var navMethod=paymentsManagerObj.getNavMethod(methodID);paymentsManagerObj.setStorageElemStatus(1,limitID,methodID,eLID);var selected=paymentsManagerObj.storedPayments.getSelection(methodID);paymentsManagerObj.clearMsg(methodID,limitID)
if(paymentsManagerObj.storedPayments.getMethod(methodID)&&navMethod=="stored"){eLID="default"
if(!selected){paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,"default");paymentsManagerObj.clearMsg(methodID,null)
isValid=!1}else if(selected&&selected.methodId==limitID){paymentsManagerObj.clearMsg(methodID,null)
paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,"default");paymentsManagerObj.setReadyForPurchase(!0,methodID,selected.methodId)}}else{eLID=limitID;paymentsManagerObj.clearMsg(methodID,null)
paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,limitID);paymentsManagerObj.setReadyForPurchase(!0,methodID,limitID)}}else{var eLID=limitID;var sLID=null;var navMethod=paymentsManagerObj.getNavMethod(methodID);var selected=paymentsManagerObj.storedPayments.getSelection(methodID);if(paymentsManagerObj.storedPayments.getMethod(methodID)&&navMethod=="stored"){eLID=null;if(!selected){paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,null);paymentsManagerObj.clearMsg(methodID,null)
isValid=!1}else if(limitID==selected.methodId){paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,null);paymentsManagerObj.setReadyForPurchase(!0,methodID,selected.methodId)
paymentsManagerObj.setStorageElemStatus(1,limitID,methodID,null)}}else{eLID=limitID
paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,limitID);paymentsManagerObj.setReadyForPurchase(!0,methodID,limitID)
paymentsManagerObj.setStorageElemStatus(1,limitID,methodID,limitID)}}
if(paymentsManagerObj.getNavMethod(methodID,eLID)=="default"){var docStatus=paymentsManagerObj.paymentsObj.getProvidedDocumentsStatus(methodID);if((docStatus==null||typeof docStatus=="number")&&isValid){paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,eLID)}else{paymentsManagerObj.setPurchaseButtonAvailability(!1,methodID,eLID)}}}
var method=paymentsManagerObj.getMethod(methodID);var submethods=JSON.parse(JSON.stringify(method.limits));var submethodsCount=0;var expectedMethods=0;expectedMethods=method.limits.length;submethodsCount=paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID).length;if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){if(paymentsManagerObj.getNavAutoSubmethod()!="manual"&&paymentsManagerObj.getNavMethod(methodID,limitID)!="default"){expectedMethods=expectedMethods-1;submethodsCount=submethodsCount-1}}
var defaultIndex=null;if(paymentsManagerObj.getNavAutoSubmethod()!="manual"&&paymentsManagerObj.getNavMethod(methodID,limitID)!="default"){$(submethods).each(function(k,v){if(v.id=="default"){defaultIndex=k}})
if(defaultIndex!=null){submethods.splice(defaultIndex,1)}}
var falseElems=0;var thisKindElems=0;var critical=0;$(paymentsManagerObj.paymentsObj.getDetailedAvailability(methodID)).each(function(k,v){if(k!=defaultIndex||defaultIndex==null){if(v===availability_available||v===availability_minReached){thisKindElems ++}else if(v===availability_maxReached||v===availability_unavailable||v===availability_notEnoughRemaining){critical ++}else if(v!==availability_available){falseElems++}}})
paymentsManagerObj.enableActionsForMethod(methodID,null);$(elem).attr('data-status',"1");paymentsManagerObj.setLimitsBadgeStatus(!1,[0,1],methodID);if(paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){paymentsManagerObj.setStorageElemStatus(null,limitID,methodID,"default")}else{paymentsManagerObj.setStorageElemStatus(null,limitID,methodID,null)}
if(thisKindElems==submethods.length){}else if(critical==submethods.length){$(elem).attr('data-status',"0")}else{$(elem).attr('data-status',"2");paymentsManagerObj.setLimitsBadgeStatus(!1,[0,0],methodID)
paymentsManagerObj.enableActionsForMethod(methodID,null)}
if(expectedMethods==submethodsCount&&thisKindElems==submethods.length&&!paymentsManagerObj.paymentsObj.getAutoSubmethod(methodID)){paymentsManagerObj.clearMsg(methodID)}}else{var elem=paymentsManagerObj.getMethodDOMelem(methodID);$(elem).attr('data-status',"1");paymentsManagerObj.setPurchaseButtonAvailability(!0,methodID,limitID)}}
function on_success_functions(e,paymentsManagerObj,options){if(typeof e!="undefined"&&(typeof e.url!="undefined"||(typeof e.params!="undefined"&&typeof e.params.url))||typeof e.type!="undefined"){var elemsObj=paymentsManagerObj.paymentsObj.getLastPaymentResult();if(elemsObj.submethod!=null){var elemsDOM=paymentsManagerObj.getLimitDOMelem(elemsObj.method,elemsObj.submethod);$(elemsDOM).find('[data-status-msg]').html(paymentsManagerObj.paymentsObj.strings.wait)}else{var elemsDOM=paymentsManagerObj.getMethodDOMelem(elemsObj.method);$(elemsDOM).find('[data-payment-storage].is-active [data-status-msg]').html(paymentsManagerObj.paymentsObj.strings.wait)}}}
function on_fail_functions(e,paymentsManagerObj,options){}
function toObject(arr){var rv={};for(var i=0;i<arr.length;++i)
rv[i]=arr[i];return rv}
var fundingBonuses=function bonusData(minToStartApplying,maxBonusValue,percentageToBonify,currencyObj){this.inputValue=0;this.minToStartApplying=minToStartApplying;this.maxBonusValue=maxBonusValue;this.percentageToBonify=percentageToBonify;this.bonusValue=0;this.currencyOb=null;if(typeof options.currencyObj!="undefined"){this.currencyOb=currencyObj}}
fundingBonuses.prototype.setValue=function(inputValue,renderElem){this.inputValue=parseFloat(inputValue);var bonusValue=((this.inputValue*this.percentageToBonify)/100);if(this.inputValue>=this.minToStartApplying&&bonusValue<=this.maxBonusValue){this.bonusValue=bonusValue}else if(this.inputValue<this.minToStartApplying){this.bonusValue=0}else if(this.inputValue>this.maxBonusValue){this.bonusValue=this.maxBonusValue}
if(typeof renderElem!="undefined"){this.renderValue($(renderElem))}else{return bonusValue}}
fundingBonuses.prototype.renderValue=function(elem){var self=this;if(!self.getCurrencyObj()){$(elem).html(this.bonusValue.formatMoney(2,'.',','))}else{var amount=self.getCurrencyObj().getMoneda(parseFloat(this.bonusValue));$(elem).html(amount)}}
fundingBonuses.prototype.getCurrencyObj=function(){var self=this;if(self.currencyOb!=null){return self.currencyObj}else{return!1}}
var cardGateway=function(URL,importe,tpvId,options){this.isDebug=!1;this.merchantAPIurl=URL;this.tpvId=tpvId;this.amount=importe;this.currency="EUR";this.onErrorCallback=function(){}
this.onSuccessCallback=function(){}
this.onCloseCallback=function(e){}
this.onGatewayLoadCallback=function(e){}
this.instance=null;this.token=null;var self=this;this.render=!1;this.companyInfo={};this.billingCycle=!1;this.language="en_US";this.gatewayErrorStrings={9064:"{t}La pasarela de pago estÃ¡ tardando en responder. Por favor, reintÃ©ntalo en unos segundos{/t}",9043:"{t}El nombre del titular no es vÃ¡lido{/t}",9044:"{t}El paÃ­s del titular no es vÃ¡lido{/t}",9045:"{t}El cÃ³digo postal del titular no es vÃ¡lido{/t}",9064:"{t}Parece que hay dificultades para mostrar la pasarela de pago. Por favor reintÃ©ntalo en unos segundos, o prueba a recargar la pÃ¡gina y a repetir la operaciÃ³n. En ambos casos asegÃºrate de que tu navegador estÃ© actualizado y no estÃ© bloqueando elementos.{/t}",9110:"{t}Ha habido un problema al iniciar el pago 3D secure. Prueba a reintentarlo pasados unos minutos, o prueba a recargar la pÃ¡gina y a repetir la operaciÃ³n. En ambos casos asegÃºrate de que tu navegador estÃ© actualizado y no estÃ© bloqueando elementos.{/t}","default":"{t}Ha ocurrido un error al procesar el pago. Contacte con soporte{/t}"}
this.card=!1;this.neteller=!1;this.skrill=!1;this.nuvei_sdk=!1;this.nuvei_gateway=!1;this.popUpSelector='[data-paymentsPopup]';if(typeof options!="undefined"){if(typeof options.render!="undefined"){this.render={}
if(typeof options.render.selectorToInject!="undefined"){this.render.selectorToInject=options.render.selectorToInject}
if(typeof options.render.openInPopup!="undefined"&&options.render.openInPopup!=!1){this.render.openInPopup={}
this.render.openInPopup.method=options.render.openInPopup.method;this.render.openInPopup.submethod=options.render.openInPopup.submethod;if(typeof options.render.openInPopup.injectionMethod!="undefined"){this.render.openInPopup.injectionMethod=options.render.openInPopup.injectionMethod}else{this.render.openInPopup.injectionMethod="iframe"}
if(typeof options.render.openInPopup.callbackOnClosePopup!="undefined"){this.render.openInPopup.callbackOnClosePopup=options.render.openInPopup.callbackOnClosePopup}else{this.render.openInPopup.callbackOnClosePopup=function(){}}
this.render.openInPopup.submethod=options.render.openInPopup.submethod;if(typeof options.render.openInPopup.width!="undefined"){this.render.openInPopup.width=options.render.openInPopup.width}
if(typeof options.render.openInPopup.height!="undefined"){this.render.openInPopup.height=options.render.openInPopup.height}
if(typeof options.render.openInPopup.allowClose!="undefined"&&options.render.openInPopup.allowClose===!0){this.render.openInPopup.allowClose=!0}else{this.render.openInPopup.allowClose=!1}
var iframeDom=this.popUpSelector+" "+this.render.selectorToInject;if(this.render.openInPopup.injectionMethod=="iframe"){$(this.popUpSelector).attr('data-iframed','')
if($(iframeDom).find('iframe').length==0){$(iframeDom).append("<iframe></iframe>")}}else if(this.render.openInPopup.injectionMethod=="html"){$(iframeDom).empty();$(iframeDom).append("<div data-injectedContent></div>")}
var prevStyle="";if(typeof this.render.openInPopup.width!="undefined"){if(typeof $(this.popUpSelector).attr('style')!="undefined"){var prevStyle=$(this.popUpSelector).attr('style')}
$(this.popUpSelector).attr('style',prevStyle+" ;max-width:"+this.render.openInPopup.width+"!important")}
if(typeof this.render.openInPopup.height!="undefined"){if(typeof $(this.popUpSelector).attr('style')!="undefined"){var prevStyle=$(this.popUpSelector).attr('style')}
$(this.popUpSelector).attr('style',prevStyle+" ;max-height:"+this.render.openInPopup.height+"!important")}
$(document).on('open.zf.reveal',this.popUpSelector,function(){if(!Foundation.MediaQuery.atLeast('medium')&&typeof $(self.popUpSelector).attr('data-iframed')!="undefined"){$(iframeDom+":visible").css('padding-top',$(self.popUpSelector+":visible").find('[data-modal-title]').outerHeight()+"px")}
$(self.popUpSelector).closest('.reveal-overlay').appendTo('body');if(!self.render.openInPopup.allowClose){$(self.popUpSelector).find('[data-core_reveal-close]').remove()}})
$(document).off('closed.zf.reveal',this.popUpSelector).on('closed.zf.reveal',this.popUpSelector,function(){$(iframeDom).removeAttr('style');$(self.popUpSelector).removeAttr('data-iframed')
self.render.openInPopup.callbackOnClosePopup();$(iframeDom).find('iframe').remove()})}else{this.render.openInPopup=!1}}
if(typeof options.company!="undefined"&&typeof options.company.name!="undefined"){this.companyInfo.name=options.company.name}
if(typeof options.company!="undefined"&&typeof options.company.logoURL!="undefined"){this.companyInfo.logoURL=options.company.logoURL}
if(typeof options.company!="undefined"&&typeof options.company.color!="undefined"){this.companyInfo.color=options.company.color}
if(typeof options.currency!="undefined"){this.currency=options.currency}
if(typeof options.language!="undefined"){if(options.language=="es_ES"||options.language=="fr_CA")
this.language=options.language}
if(typeof options.onErrorCallback!="undefined"){this.onErrorCallback=options.onErrorCallback}
if(typeof options.onSuccessCallback!="undefined"){this.onSuccessCallback=options.onSuccessCallback}
if(typeof options.onResultCallback!="undefined"){this.onResultCallback=options.onResultCallback}
if(typeof options.onCloseCallback!="undefined"){this.onCloseCallback=options.onCloseCallback}
if(typeof options.onGatewayLoadCallback!="undefined"){this.onGatewayLoadCallback=options.onGatewayLoadCallback}
if(typeof options.gatewayErrorStrings!="undefined"){this.gatewayErrorStrings=options.gatewayErrorStrings}
if(typeof options.billingCycle!="undefined"){this.billingCycle=options.billingCycle}
if(typeof options.debug!="undefined"&&options.debug===!0){this.isDebug=!0}
if(typeof options.card!="undefined"){if(typeof options.card.merchantAccountID!="undefined"&&typeof options.card.cardHolderName){self.card={}
self.card.merchantAccountID=options.card.merchantAccountID;self.card.cardHolderName=options.card.cardHolderName;self.card.key=options.card.key;self.card.zip=options.card.zip;self.card.country=options.card.country;self.card.state=options.card.state}
if(typeof options.card.usePreviousBalance!="undefined"){self.card.usePreviousBalance=options.card.usePreviousBalance}}
if(typeof options.neteller!="undefined"){}
if(typeof options.skrill!="undefined"){self.skrill=options.skrill}
if(typeof options.nuvei_gateway!="undefined"){self.nuvei_gateway=options.nuvei_gateway}
if(typeof options.nuvei_sdk!="undefined"){self.nuvei_sdk=options.nuvei_sdk}}}
cardGateway.prototype.getIsDebug=function(){return this.isDebug}
cardGateway.prototype.init=function(){var self=this;if(self.card){var options={amount:self.amount,currency:self.currency,environment:"TEST",holderName:self.card.cardHolderName,billingAddress:{country:self.card.country,zip:self.card.zip,useAsShippingAddress:!0},threeDS:{useThreeDSecureVersion2:!0,transactionIntent:"GOODS_OR_SERVICE_PURCHASE"},locale:self.language,accounts:{CC:self.card.merchantAccountID},preferredPaymentMethod:"Cards",}
if(self.card.state){options.billingAddress.state=self.card.state}
if(self.getIsDebug()===!1){options.environment="LIVE"}else if(self.getIsDebug()===!0){options.environment="TEST"}}
if(self.neteller){var options={amount:self.amount,merchantRefNum:self.neteller.merchantRefNum,currency:self.currency,environment:"TEST",billingAddress:{country:self.country,zip:self.zip,useAsShippingAddress:!0},locale:self.language,paymentMethodDetails:{neteller:self.neteller}}
if(self.getIsDebug()===!1){options.environment="LIVE"}else if(self.getIsDebug()===!0){options.environment="TEST"}}
if(self.nuvei_gateway){var options=self.nuvei_gateway}
if(self.nuvei_sdk){var options=self.nuvei_sdk}
if(self.skrill){var options={sid:self.skrill.sid,}
if(self.getIsDebug()===!1){options.environment="LIVE"}else if(self.getIsDebug()===!0){options.environment="TEST"}}
if(Object.keys(self.companyInfo).length>0){if(typeof self.companyInfo.name!="undefined"){options.companyName=self.companyInfo.name}
if(typeof self.companyInfo.logoURL!="undefined"){options.imageUrl=self.companyInfo.logoURL}
if(typeof self.companyInfo.color!="undefined"){options.buttonColor=self.companyInfo.color}}
if(self.billingCycle!=!1){options.threeDS.billingCycle=self.billingCycle;options.threeDS.authenticationPurpose="INSTALMENT_TRANSACTION";options.threeDS.maxAuthorizationsForInstalmentPayment=5}
if(self.card){paysafe.checkout.setup(self.card.key,options,function(instance,error,result){if(error){self.catchError(error)}else{self.instance=instance;if(result.token){self.token=result.token
if(result.paymentMethod=="Cards"){var extraFields={data:{paymentToken:self.token},refPago:self.tpvId}
if(typeof self.card.usePreviousBalance!="undefined"){extraFields.usePreviousBalance=self.card.usePreviousBalance}
var merchantAPIforme=new formeSubmit(!1,self.merchantAPIurl,{sendDataAsJSON:!0,extraFields:extraFields,callbackOnSuccess:function(e){self.onSuccessCallback(e)},callbackOnError:function(e){if(typeof e!="undefined"&&typeof e.error!="undefined"){self.catchError({code:'custom',description:e.error})}else{self.catchError({code:'default'})}
instance.close()},callbackOnFail:function(e){self.onErrorCallback(self,e.error);instance.close()}})}}else{self.catchError({code:"default"})
instance.close()}}},self.onCloseCallback)}
if(self.nuvei_gateway){var nuveiApiParams=$.param(self.nuvei_gateway);if(self.isDebug){var nuveiApiURL="https://ppp-test.safecharge.com/ppp/purchase.do?"+nuveiApiParams}else{var nuveiApiURL="https://secure.safecharge.com/ppp/purchase.do?"+nuveiApiParams}
window.location.href=nuveiApiURL}
if(self.nuvei_sdk){self.onGatewayLoadCallback(self);if(typeof self.render!="undefined"&&self.render){if(this.render.openInPopup){var inject=self.popUpSelector+" "+self.render.selectorToInject;if(this.render.openInPopup.injectionMethod=="html"){options.renderTo=inject+" [data-injectedContent]"}else{$(inject).find('iframe').prop('src',nuveiApiURL)}
$(self.popUpSelector).core_reveal("open")}else{options.renderTo=self.render.selectorToInject}}
checkout(options)}
if(self.skrill){var sid=self.skrill.sid;var skrillApiURL="https://pay.skrill.com?sid="+sid;if(typeof self.render!="undefined"&&self.render){if(this.render.openInPopup){var iframeDom=self.popUpSelector+" "+self.render.selectorToInject;$(iframeDom).find('iframe').prop('src',skrillApiURL)
$(self.popUpSelector).core_reveal("open")}else{var iframeDom=this.render.selectorToInject;$(iframeDom).append("<iframe></iframe>")
$(iframeDom).find('iframe').prop('src',skrillApiURL)
$(iframeDom).addClass('is-active')}}
self.onGatewayLoadCallback(self)}}
cardGateway.prototype.close=function(){$(this.popUpSelector).core_reveal("close")}
cardGateway.prototype.open=function(type){var self=this;if(self.card){$.getScript("https://hosted.paysafe.com/checkout/v1/latest/paysafe.checkout.min.js",function(){self.init()})}
if(self.skrill){self.init()}
if(self.nuvei_gateway){self.init()}
if(self.nuvei_sdk){if(typeof checkout!="undefined"){self.init()}else{var script=document.createElement('script');script.onload=function(){self.init()};if($('[data-externalScript="nuvei"]').length==0){script.src="https://cdn.safecharge.com/safecharge_resources/v1/checkout/checkout.js";script.setAttribute("data-externalScript","nuvei")
document.head.appendChild(script)}}}}
cardGateway.prototype.getToken=function(){var self=this;self.instance.tokenize(function(instance,error,result){if(error){self.catchError(error)}else{self.token=result.token}})}
cardGateway.prototype.catchError=function(error){var payloadURL="/data/?action=paymentManager&mode=error";var code=null;var desc=null;var self=this;if(typeof self.gatewayErrorStrings[error.code]!="undefined"){if(error.code!="default"){var errorToDisplay="("+error.code+") "+self.gatewayErrorStrings[error.code];code=error.code;desc=self.gatewayErrorStrings[error.code]}else{var errorToDisplay=self.gatewayErrorStrings[error.code];desc=self.gatewayErrorStrings[error.code]}}else{if(error.code!="custom"){var errorToDisplay="("+error.code+") "+self.gatewayErrorStrings.default;code=error.code;desc=self.gatewayErrorStrings.default}else{var errorToDisplay=error.description;desc=error.description}}
var errorPayload=new paymentErrorPayload(this.tpvId,desc,code);var errorReport=new formeSubmit(!1,payloadURL,{extraFields:errorPayload,sendDataAsJSON:!0})
this.onErrorCallback(self,errorToDisplay)}
class paymentErrorPayload{constructor(refPago,errorDescription,errorCode,operationId){this.errorCode=null;this.errorDescription=null;this.operationId=null;this.refPago=null;var resultObj={}
var tempObj={}
if(typeof errorDescription!="undefined"){this.errorDescription=errorDescription}
if(typeof refPago!="undefined"){this.refPago=refPago}
if(typeof errorCode!="undefined"){this.errorCode=errorCode}
if(typeof operationId!="undefined"){this.operationId=operationId}
if(this.errorCode!=null){tempObj.code=this.errorCode}
if(this.errorDescription!=null){tempObj.description=this.errorDescription}
if(this.operationId!=null){tempObj.operationId=this.operationId}
if(this.refPago!=null){resultObj.refPago=this.refPago}
if(Object.keys(tempObj).length>0){resultObj.data=tempObj}
return resultObj}}
class paymentsGatewayManager{constructor(paymentsManagerObj,paymentMethodDomElem){this.elem=paymentMethodDomElem;this.paymentsManagerObj=paymentsManagerObj;this.popupSelectorName="data-payments-popup";this.operationTimeOut=15000;this.timeOutHandler=null}
throwError(){}
getPaymentsManagerObj(){return this.paymentsManagerObj}
openPopUp(id,title,callback,options){var self=this;var popUpSelector='#'+id;var injectionInto="body";var contents="<div data-modal-content></div>"
var iframeURL=null;var iframed=!1;var onOpenCallback=function(){}
if(typeof options!="undefined"){if(typeof options.iFramed!="undefined"&&options.iFramed!=null&&options.iFramed!==!1){iframed=!0;if(typeof options.iFramed.url!="undefined"&&options.iFramed.url!=null){iframeURL=options.iFramed.url}}}
if(typeof callback!="undefined"){onOpenCallback=callback}
if($(injectionInto+" "+popUpSelector).length==0&&!iframed){var html='<div class="core_panel core_noPadding core_spaceBzero">'+'<div class="core_panel core_halfThin bg_coal text-center" data-modal-title>'+'<strong class="white core_smooth">'+title+'</strong>'+'<button class="white right icon-slim-times-outline core_txtSize_2" data-core_reveal-close style="margin-right:0.2rem;position: absolute;right:0px;top:0.2rem" type="button"></button>'+'<div class="clearfix"></div>'+'</div>'+'<hr class="core_spaceTzero core_spaceBzero">'+contents+'</div>'
html='<div id="'+id+'" '+self.popupSelectorName+' data-reveal class="reveal">'+html+'</div>';$(injectionInto).append(html);var gwpop=new core_reveal();$(popUpSelector).core_reveal('open');onOpenCallback()}else if(!iframed){$(popUpSelector).core_reveal('open');onOpenCallback()}
if(iframed){$(popUpSelector).attr(self.popupSelectorName,"");if(iframeURL){$(popUpSelector).find('iframe').attr('src',iframeURL)}
onOpenCallback();$(popUpSelector).core_reveal('open')}}
closePopUp(){var self=this;var popUpElem=$('['+self.popupSelectorName+']')
$(popUpElem).core_reveal('close');$(popUpElem).remove()}
setPopUpSrc(url,callback){var self=this;var popUpElem=$('['+self.popupSelectorName+'] iframe');$(popUpElem).onload=callback(self);$(popUpElem).attr('src',url)}
load_SDKjs(SDKjsURL,callbackOnSDKJsLoad,tag){var script=document.createElement('script');script.onload=function(){callbackOnSDKJsLoad(this)};script.setAttribute('type','text/javascript');script.setAttribute('src',SDKjsURL);if(typeof tag!="undefined"){script.setAttribute(tag,'')}
document.head.appendChild(script)}
errorsHandling(errorPayloadObj,callbackOnPaymentFailure,callbackScope){var self=this;var cbScope=null;var cbOnFail=function(){};if(typeof callbackScope!="undefined"){cbScope=callbackScope}
if(typeof callbackOnPaymentFailure!="undefined"){cbOnFail=callbackOnPaymentFailure}
if(typeof callbackScope!="undefined"&&callbackScope.xhrHandler!=null){self.xhrHandler.abort()}
var payloadURL="/data/?action=paymentManager&mode=error";var errorReport=new formeSubmit(!1,payloadURL,{extraFields:errorPayloadObj,sendDataAsJSON:!0,statusMsg:{elem:self.getAsyncMsgsElem()},callbackOnSuccess:function(e){if(typeof e.type=="undefined"){self.paymentsManagerObj.unblockAllMethods();self.setSubmitBtState(!0)}else{cbOnFail(e)}},callbackOnFail:function(e){self.setSubmitBtState(!0)}})}
getAsyncMsgsElem(){var self=this;var subM=self.paymentsManagerObj.getSelectedLimitId();var m=self.paymentsManagerObj.getSelectedMethodId();if((m!=null&&m!=!1)||(subM!=null&&subM!=!1)){if(subM!=null&&subM){var item=self.paymentsManagerObj.getLimitDOMelem(m,subM)
var statusMsg=$(item).find('[data-status-msg]')}else{var item=self.paymentsManagerObj.getMethodDOMelem(m)
var statusMsg=$(item).find('[data-payment-storage].is-active [data-status-msg]')}}else{if($("[data-quickpaymanager]").length>0){var statusMsg=$("[data-quickpaymanager] form[data-payment-storage] [data-status-msg]")}}
if($(statusMsg).length>0){return statusMsg}
return!1}
clearAsyncMsg(){var elem=this.getAsyncMsgsElem();$(elem).hide().empty()}
setAsyncMsgElem(content,msgStyle){var elem=this.getAsyncMsgsElem();$(elem).html(content).removeClass('success alert warning')
if(typeof msgStyle!="undefined"){switch(msgStyle){case "alert":$(elem).html(content).addClass('alert');break;case "success":$(elem).html(content).addClass('success');break;case "warning":$(elem).html(content).addClass('warning');break;case "default":break}}}
getSubmitBtElem(){var self=this;var subM=self.paymentsManagerObj.getSelectedLimitId();var m=self.paymentsManagerObj.getSelectedMethodId();if((m!=null&&m!=!1)||(subM!=null&&subM!=!1)){if(subM!=null&&subM){var item=self.paymentsManagerObj.getLimitDOMelem(m,subM)
var submitBt=$(item).find('[data-submit-payment]')}else{var item=self.paymentsManagerObj.getMethodDOMelem(m);var submitBt=$(item).find('[data-payment-storage].is-active [data-submit-payment]')}}else{if($("[data-quickpaymanager]").length>0){var submitBt=$("[data-quickpaymanager] form[data-payment-storage] [data-submit-payment]")}}
if($(submitBt).length>0){return submitBt}
return!1}
setSubmitBtState(state){var self=this;var m=self.paymentsManagerObj.getSelectedMethodId();var submitBt=self.getSubmitBtElem()
if(submitBt&&$(submitBt).length>0){if(state){self.paymentsManagerObj.unblockAllMethods(!1);$(submitBt).removeAttr('disabled')}else{self.paymentsManagerObj.blockAllMethods(!1);if(m!=null&&m!=!1){self.paymentsManagerObj.unblockMethod(m,!1)}
$(submitBt).attr('disabled','disabled')}}
return!1}
initWatch(callbackScope,operationTimeOutInMs,transactionId){var self=this;if(self.timeOutHandler!=null){self.stopWatch()}
self.timeOutHandler=setTimeout(function(){self.stopWatch();self.errorsHandling(new paymentErrorPayload(transactionId,"operation TIMED OUT"),callbackScope)},operationTimeOutInMs)}
stopWatch(){var self=this;clearTimeout(self.timeOutHandler)}}
class threeDSPlugin_paysafe{constructor(paymentsGatewayManagerObj,accountID,cardBIN,APIkey,transactionID,callbackOnFailure,options){this.pgwm=paymentsGatewayManagerObj;this.SDKjsURL="https://hosted.paysafe.com/threedsecure/js/latest/paysafe.threedsecure.min.js";this.transactionId=transactionID
this.cardBIN=cardBIN;this.APIkey=APIkey;this.accountId=accountID;this.debug=!1;this.operationTimeOut=15000;this.timeOutHandler=null;this.xhrHandler=null;this.callbackOnPaymentFailure=callbackOnFailure;if(typeof options!="undefined"){if(typeof options.debug!="undefined"&&options.debug===!0){this.debug=!0}}
this.setup(this.accountId,this.cardBIN,this.APIkey)}
setup(accountID,cardBIN,APIkey){var self=this;var setupOptions={}
if(self.debug){setupOptions.environment="TEST"}else{setupOptions.environment="LIVE"}
setupOptions.accountId=accountID;setupOptions.card={cardBin:cardBIN};self.pgwm.load_SDKjs(self.SDKjsURL,function(){self.pgwm.setSubmitBtState(!1);self.pgwm.setAsyncMsgElem(self.pgwm.getPaymentsManagerObj().paymentsObj.strings.wait)
paysafe.threedsecure.start(APIkey,setupOptions,function(fingerPrintId,error){if(typeof fingerPrintId!="undefined"){self.sendAuthenticationCall(fingerPrintId,self.transactionId)}else{self.pgwm.errorsHandling(new paymentErrorPayload(self.transactionId,error.displayMessage,error.code,error.correlationId),self.callbackOnPaymentFailure)}})})}
sendAuthenticationCall(fingerPrintId,transactionID){var url="/data/?action=paymentManager&mode=continuePayment";var payload=new formeSubmit(!1,url,{sendDataAsJSON:!0,extraFields:{data:fingerPrintId,refPago:transactionID},statusMsg:{elem:self.pgwm.getAsyncMsgsElem()},callbackOnSuccess:function(e){self.pgwm.setSubmitBtState(!1)},callbackOnFail:function(e){self.pgwm.setSubmitBtState(!0);self.pgwm.setAsyncMsgElem(e.error,"alert");self.pgwm.setSubmitBtState(!0)}})
self.xhrHandler=payload.getXHR()}
sendChallenge(APIkey,sdkChallengePayload){var self=this;var setupOptions={}
if(self.debug){setupOptions.environment="TEST"}else{setupOptions.environment="LIVE"}
setupOptions.sdkChallengePayload=sdkChallengePayload;paysafe.threedsecure.challenge(APIkey,setupOptions,function(id,error){if(typeof id!="undefined"){}else{self.pgwm.errorsHandling(new paymentErrorPayload(self.transactionId,error),self.callbackOnPaymentFailure)}})}}
class threeDSPlugin_trustpayments{constructor(paymentsGatewayManagerObj,jwt,backendURL,transactionID,callbackOnFailure,options){this.pgwm=paymentsGatewayManagerObj;this.SDKjsURL="https://webservices.securetrading.net/js/v3/st.js";this.transactionId=transactionID
this.containerAttr="data-trustpayment-container";this.debug=!1;this.elem=null;this.backendURL=backendURL;this.operationTimeOut=15000;this.timeOutHandler=null;this.xhrHandler=null;this.callbackOnPaymentFailure=callbackOnFailure;if(typeof options!="undefined"){if(typeof options.debug!="undefined"&&options.debug===!0){this.debug=!0}
if(typeof options.elem!="undefined"){this.elem=options.elem}}
this.setup(jwt)}
setup(jwt){var self=this;var setupOptions={}
self.clean();self.pgwm.setSubmitBtState(!1);self.pgwm.setAsyncMsgElem(self.pgwm.getPaymentsManagerObj().paymentsObj.strings.wait)
self.buildServerSideForm("body",jwt);self.pgwm.load_SDKjs(self.SDKjsURL,function(){try{(function(){var livestatus=1;if(self.debug){livestatus=0}
var st=SecureTrading({jwt:jwt,submitOnError:!0,livestatus:livestatus,submitCallback:function(data){if(typeof data.errorcode!="undefined"&&data.errorcode!="0"){var errorData="";if(typeof data.errordata!="undefined"){errorData="("+data.errordata+")"}
self.clean();var errorPayload=new paymentErrorPayload(self.transactionId,data.errormessage+errorData,data.errorcode);self.pgwm.errorsHandling(errorPayload,self.callbackOnPaymentFailure)}else if(typeof data.errorcode!="undefined"&&data.errorcode=="0"){var threedResponse=null;var jwtResponse=null;if(typeof data.threedresponse!="undefined"){threedResponse=data.threedresponse}
if(typeof data.jwt!="undefined"){jwtResponse=data.jwt}
self.clean();self.submitPayload(jwtResponse,self.transactionId,threedResponse)}}});st.Components({startOnLoad:!0})})()}catch(error){self.pgwm.errorsHandling(new paymentErrorPayload(self.transactionId,self.pgwm.getPaymentsManagerObj().paymentsObj.strings.error),self.callbackOnPaymentFailure)}})}
buildServerSideForm(injectToSelector,jwt){var self=this;$(injectToSelector).find('['+self.containerAttr+']').remove();var serverSideForm='<div '+self.containerAttr+' style="display:none">'+'<div id="st-notification-frame"></div>'+'<form id="st-form" method="POST" action="'+self.backendURL+'" target="threeDS_trustpayments_receiver"></form>'+'<iframe style="height:0px;width:0px;" name="threeDS_trustpayments_receiver"></iframe>'+'</div>'
$(injectToSelector).append(serverSideForm)}
clean(){var self=this;$("["+self.containerAttr+"]").remove()}
submitPayload(jwt,transactionID,threedResponse){var self=this;var payloadURL="/data/?action=paymentManager&mode=continuePayment";var payloadQuery=new formeSubmit(!1,payloadURL,{sendDataAsJSON:!0,extraFields:{data:{jwt:jwt,threedResponse:threedResponse},refPago:self.transactionId},statusMsg:{elem:self.pgwm.getAsyncMsgsElem()},callbackOnSuccess:function(j){if(typeof j.data!="undefined"&&typeof j.data.pagado!="undefined"&&j.data.pagado===!0){if(typeof j.data.url!="undefined"){window.location.href=j.data.url}else{self.pgwm.setAsyncMsgElem(self.pgwm.getPaymentsManagerObj().paymentsObj.strings.error,"alert")
self.pgwm.setSubmitBtState(!0)}}else{self.pgwm.setAsyncMsgElem(self.pgwm.getPaymentsManagerObj().paymentsObj.strings.error,"alert")
self.pgwm.setSubmitBtState(!0)}},callbackOnFail:function(j){if(typeof j.type!="undefined"){self.callbackOnPaymentFailure(j)}else{self.pgwm.setAsyncMsgElem(j.error,"alert");self.pgwm.setSubmitBtState(!0)}}})
self.xhrHandler=payloadQuery.getXHR()}}
class threeDSPlugin_nuvei{constructor(paymentsGatewayManagerObj,merchantId,merchantSiteId,paymentParams,transactionID,callbackOnFailure,options){this.pgwm=paymentsGatewayManagerObj;this.merchantId=merchantId;this.merchantSiteId=merchantSiteId;this.SDKjsURL="https://cdn.safecharge.com/safecharge_resources/v1/websdk/safecharge.js";this.transactionId=transactionID
this.containerAttr="data-safecharge-container";this.debug=!1;this.elem=null;this.sfcObj=null;this.xhrHandler=null;this.callbackOnPaymentFailure=callbackOnFailure;this.paymentParams=paymentParams;if(typeof options!="undefined"){if(typeof options.debug!="undefined"&&options.debug===!0){this.debug=!0}
if(typeof options.elem!="undefined"){this.elem=options.elem}}
this.setup()}
setup(){var self=this;var setupOptions={}
self.pgwm.setSubmitBtState(!1);self.pgwm.setAsyncMsgElem(self.pgwm.getPaymentsManagerObj().paymentsObj.strings.wait)
self.clean();self.pgwm.load_SDKjs(self.SDKjsURL,function(){self.createPayment()},"data-safecharge-script")}
createPayment(){var self=this;var environment="prod";if(self.debug){environment="int"}
try{self.clean();window.paymentsManager_refPago=self.transactionId;self.sfcObj=new SafeCharge({env:environment,merchantId:self.merchantId,merchantSiteId:self.merchantSiteId})
var style="<style data-payments-css='nuvei'>.is-in, .is-in .sfcModal-dialog, .is-in .sfcModal-content, .is-in #ifrm {height:100%!important;overflow:auto!important}</style>";$(style).appendTo('head');self.sfcObj.createPayment(self.paymentParams,function(res){if(typeof res.result!="undefined"){if(res.result=="ERROR"){self.pgwm.errorsHandling(new paymentErrorPayload(self.transactionId,res.errorDescription,res.errorCode),self.callbackOnPaymentFailure)}else if(res.result=="DECLINED"){self.pgwm.errorsHandling(new paymentErrorPayload(self.transactionId,"Declined"),self.callbackOnPaymentFailure)}else if(res.result=="APPROVED"){self.transactionId=window.paymentsManager_refPago;self.submitCompletionPayload(res)}}else{if(typeof res.error!="undefined"){self.pgwm.errorsHandling(new paymentErrorPayload(self.transactionId,res.error.message,res.error.code),self.callbackOnPaymentFailure)}else{self.pgwm.errorsHandling(new paymentErrorPayload(self.transactionId,"Unable to create payment"),self.callbackOnPaymentFailure)}}})}catch(error){self.clean();self.pgwm.errorsHandling(new paymentErrorPayload(self.transactionId,error),self.callbackOnPaymentFailure)}}
clean(){if(typeof window.paymentsManager_refPago!="undefined"){delete window.paymentsManager_refPago}
$('[data-payments-css="nuvei"]').remove()}
submitCompletionPayload(payloadData){var self=this;var payloadURL="/data/?action=paymentManager&mode=continuePayment";var checkTransactionStatus=new formeSubmit(!1,payloadURL,{sendDataAsJSON:!0,extraFields:{data:payloadData,refPago:self.transactionId},statusMsg:{elem:self.pgwm.getAsyncMsgsElem()},callbackOnSuccess:function(j){if(typeof j.data!="undefined"&&typeof j.data.pagado!="undefined"&&j.data.pagado===!0){if(typeof j.data.url!="undefined"){window.location.href=j.data.url}else{self.pgwm.setAsyncMsgElem(self.pgwm.getPaymentsManagerObj().paymentsObj.strings.error,"alert")
self.pgwm.setSubmitBtState(!0)}}else{self.pgwm.setAsyncMsgElem(self.pgwm.getPaymentsManagerObj().paymentsObj.strings.error,"alert")
self.pgwm.setSubmitBtState(!0)}},callbackOnFail:function(j){if(typeof j.type!="undefined"){self.callbackOnPaymentFailure(j)}else{self.pgwm.setAsyncMsgElem(j.error,"alert");self.pgwm.setSubmitBtState(!0)}}})}}
const QP_LEGACY=2;const QP_SV=1;const QP_FREE=0;var quickPay=function(lastPaymentMethod,lastPaymentMedio,paymentsObj,currencyObj,options){this.currencyObj=null;this.selectors={elem:"[data-quickpaymanager]",content:"[data-quickpaymanager-content]",details:"[data-qp-detailed]",detailsVC:"[data-qp-detailed='sv']",medioDetails:"[data-stored-data]",acquisitionDetails:"[data-stored-acquisition]",remainingBalance:"[data-remainingBalance-area]",amount:"[data-submit-payment] [data-amount]",saveForLater:"input[data-qp-storage-add]",submitBt:"[data-submit-payment]",submitForm:"[data-payment-storage]"}
this.classicPayments={selector:"[data-paymethodsArea]",switchBtSelector:"button[data-show-others]"}
this.strings={minLimit:"<p>{t}El importe mÃ­nimo es de:{/t} <strong>%1</strong>. {}La diferencia <strong>(%2)</strong> se aÃ±adirÃ¡ a tu Saldo Virtual{/t} </p>"}
this.paymentsObj=paymentsObj;this.method=lastPaymentMethod;this.medio=lastPaymentMedio;this.payMethodStruct={method:null,submethod:null}
this.useVCfirstIfAvailable=!0;this.isUsingPreviousBalance=!1;this.isSavingForLater=!1;this.quickPayStatus=!0;this.selectedMethod=null;var self=this;if(typeof currencyObj!="undefined"&&currencyObj!=null){this.currencyObj=currencyObj}
if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(typeof options.strings.minLimit!="undefined"){this.strings.minLimit=options.strings.minLimit}}}
function setPayMethodStruct(id){if((typeof self.method!="undefined"&&self.method!=null)){$(self.getPaymentsObj().payMethods).each(function(kmethod,vmethod){if(vmethod.uid==id){self.payMethodStruct.method=vmethod;self.payMethodStruct.submethod=vmethod;$(vmethod.limits).each(function(ksubm,vsubm){if(vsubm.uid==id){self.payMethodStruct.submethod=vsubm}})}else{$(vmethod.limits).each(function(ksubm,vsubm){if(vsubm.uid==id){self.payMethodStruct.submethod=vsubm;self.payMethodStruct.method=vmethod}})}})}}
function setEvents(){$(self.selectors.elem).find(self.classicPayments.switchBtSelector).off('click').on('click',function(){self.switchToPayments()})
$(self.selectors.elem).find(self.selectors.remainingBalance).find('input').off('click').on('click',function(){if($(this).prop('checked')){self.setUsePreviousBalance(!0)}else{self.setUsePreviousBalance(!1)}
self.refreshTotals()})
$(self.selectors.elem).find(self.selectors.saveForLater).off('click').on('click',function(){if($(this).prop('checked')){self.setSaveForLater(!0)}else{self.setSaveForLater(!1)}})
if($(self.selectors.elem).find(self.selectors.remainingBalance).find('input').prop('checked')){self.setUsePreviousBalance(!0)}else{self.setUsePreviousBalance(!1)}
if($(self.selectors.elem).find(self.selectors.saveForLater).prop('checked')){self.setSaveForLater(!0)}else{self.setSaveForLater(!1)}
$(self.selectors.elem).find(self.selectors.submitBt).off('click').on('click',function(){self.performPay()})
var form=$(self.selectors.elem).find(self.selectors.acquisitionDetails).find('form')}
setEvents();setPayMethodStruct(this.method);this.refresh();unlock('[data-locked]');$(self.selectors.elem).removeClass('loading')}
quickPay.prototype.refresh=function(){var self=this;if(self.getMethod()!=null||self.getSubMethod()!=null){if(self.paymentsObj.paymentsObj.getAmount()==0){self.switchToFreeOfChargeMethod()}else{if(self.canUseVirtualCash()){self.switchToVcMethod()}else{self.switchToChargedMethod()}}}else{self.enableQuickPay(!1);return!1}
if(self.canUsePreviousBalance()){self.showUsePreviousBalance(!0);$(self.selectors.elem).find(self.selectors.amount).html(self.getAmount(!0))}else{self.showUsePreviousBalance(!1);$(self.selectors.elem).find(self.selectors.amount).html(self.getAmount(!0))}
if(!self.getPaymentsMgr().getReadyForPurchase(self.getMethod().id,self.getSubMethod().id)&&self.getCurrentMethod==QP_LEGACY){self.enableQuickPay(!1)}
var limit=null;if(self.getCurrentMethod()==QP_LEGACY){var lim=self.getSubMethod().minLimit;var amount=self.getAmount(null,null,!0);if(amount<lim){self.setMsg(self.strings.minLimit.placeHolder([self.currencyObj.getMoneda(parseFloat(lim)),self.currencyObj.getMoneda(parseFloat(lim)-amount)]));self.showMsg(!0)}}else{self.clearMsg();self.showMsg(!1)}}
quickPay.prototype.refreshTotals=function(){var self=this;$(self.selectors.elem).find(self.selectors.amount).html(self.getAmount(!0))}
quickPay.prototype.getMethod=function(){return this.payMethodStruct.method}
quickPay.prototype.getSubMethod=function(){return this.payMethodStruct.submethod}
quickPay.prototype.getAmount=function(allowConversion,withFormat,ignoreLimit){var self=this;var amount=self.getPaymentsObj().getAmount();var allowConv=!1;var useFormat=!0;var useLimit=!0;var usePreviousBalance=self.getIsUsingPreviousBalance();if(typeof allowConversion!="undefined"&&allowConversion){allowConv=!0}
if(typeof withFormat!="undefined"&&!withFormat){useFormat=!1}
if(typeof ignoreLimit!="undefined"&&ignoreLimit){useLimit=!1}
var limite=self.getSubMethod().minLimit;if(self.getPaymentsObj().isShoppingCart()){var svBalance=self.getPaymentsObj().getBalance();if(usePreviousBalance&&self.getMethod().id!="sv"){amount=self.getPaymentsObj().getAmountToPaySubstractingBalance(amount,svBalance,self.getMethod().id,self.getSubMethod().id)}}
if(useLimit&&amount<limite&&(!self.getPaymentsObj().isShoppingCart()||(self.getPaymentsObj().isShoppingCart()&&(!self.useVCfirstIfAvailable||(self.useVCfirstIfAvailable&&svBalance<amount))))){amount=limite}
if(!allowConversion){if(self.currencyObj!=null&&useFormat){var amountFinal=self.getCurrencyObj().getMoneda(parseFloat(amount))}else{var amountFinal=amount}}else{var conversionObj=self.getPaymentsObj().applyConversionRate(parseFloat(amount),self.getMethod().id,self.getSubMethod().id);if(self.getCurrencyObj()!=null&&useFormat){if(self.getCurrencyObj().getISOCurrency()!=conversionObj.ISOcurrency){var amountFinal=self.getCurrencyObj().getMoneda(parseFloat(amount),conversionObj.ISOcurrency)}else{var amountFinal=self.getCurrencyObj().getMoneda(parseFloat(amount))}}else{amountFinal=conversionObj.value}}
return amountFinal}
quickPay.prototype.getPaymentsObj=function(){return this.paymentsObj.paymentsObj}
quickPay.prototype.getPaymentsMgr=function(){return this.paymentsObj}
quickPay.prototype.getCurrencyObj=function(){return this.currencyObj}
quickPay.prototype.switchToPayments=function(forceState){var force=null;if(typeof forceState!="undefined"){force=forceState}
if(force==null){$(this.classicPayments.selector).slideToggle('fast');if(!$(this.classicPayments.selector).hasClass('is-active')){$(this.classicPayments.switchBtSelector).add(this.classicPayments.selector).addClass('is-active');$(this.selectors.content).slideUp('fast').removeClass('is-active')}else{$(this.classicPayments.switchBtSelector).add(this.classicPayments.selector).removeClass('is-active');$(this.selectors.content).slideDown('fast').addClass('is-active')}}else{if(force){$(this.classicPayments.selector).slideDown('fast');$(this.classicPayments.switchBtSelector).add(this.classicPayments.selector).addClass('is-active');$(this.selectors.content).slideUp('fast')}else{$(this.classicPayments.selector).slideUp('fast');$(this.classicPayments.switchBtSelector).add(this.classicPayments.selector).removeClass('is-active');$(this.selectors.content).slideDown('fast')}}}
quickPay.prototype.showUsePreviousBalance=function(state){if(state){$(this.selectors.elem).find(this.selectors.remainingBalance).addClass('is-active')}else{$(this.selectors.elem).find(this.selectors.remainingBalance).removeClass('is-active')}}
quickPay.prototype.canUsePreviousBalance=function(){var self=this;var importePago=self.getAmount(!1,!1);var saldo=self.getPaymentsObj().getBalance();var method=self.getSubMethod();if(method.allowFundsCompensation&&self.getPaymentsObj().isShoppingCart()){if(typeof method.allowFundsCompensation!="undefined"&&method.allowFundsCompensation===!0){if(importePago>0&&saldo<importePago&&importePago>method.minLimit&&importePago<method.remaining){if((importePago-saldo)>=method.minLimit){return!0}else{return-1}}}}else{return!1}}
quickPay.prototype.getIsUsingPreviousBalance=function(){return this.isUsingPreviousBalance}
quickPay.prototype.setUsePreviousBalance=function(state){var self=this;if(state){this.isUsingPreviousBalance=!0}else{this.isUsingPreviousBalance=!1}}
quickPay.prototype.setMsg=function(msg,title){var self=this;var elem=$(self.selectors.elem).find('[data-msg-area]');self.clearMsg();if(typeof msg!="undefined"&&msg!=null){$(elem).find('[data-msg-area-message]').html(msg)}
if(typeof title!="undefined"&&title!=null){$(elem).find('[data-msg-area-title]').html(title)}}
quickPay.prototype.showMsg=function(state){var self=this;if(state){$(self.selectors.elem).find('[data-msg-area]').addClass('is-active')}else{$(self.selectors.elem).find('[data-msg-area]').removeClass('is-active')}}
quickPay.prototype.clearMsg=function(){var self=this;$(self.selectors.elem).find('[data-msg-area] > *').empty()}
quickPay.prototype.canUseVirtualCash=function(){var self=this;if(self.getPaymentsObj().isShoppingCart()){if(self.getPaymentsObj().isAvailable("sv",!1,!1)[0]==!0){return!0}}
return!1}
quickPay.prototype.setSaveForLater=function(status){if(status){this.isSavingForLater=!0}else{this.isSavingForLater=!1}}
quickPay.prototype.getIsUsingSaveForLater=function(){return this.isSavingForLater}
quickPay.prototype.setCurrentMethod=function(method){if(method==QP_FREE||method==QP_LEGACY||method==QP_SV){this.selectedMethod=method}}
quickPay.prototype.getCurrentMethod=function(){return this.selectedMethod}
quickPay.prototype.switchToFreeOfChargeMethod=function(){var self=this;$(self.selectors.elem).find(self.selectors.details).removeClass('is-active');$(self.selectors.elem).find(self.selectors.medioDetails).removeClass('is-active');$(self.selectors.elem).find(self.selectors.acquisitionDetails).removeClass('is-active');$(self.selectors.elem).find('[data-submit-payment]').removeClass('is-active');$(self.selectors.elem).find('[data-submit-payment="free"]').addClass('is-active');self.setCurrentMethod(QP_FREE)}
quickPay.prototype.switchToChargedMethod=function(){var self=this;$(self.selectors.elem).find(self.selectors.details).addClass('is-active');$(self.selectors.elem).find(self.selectors.medioDetails).addClass('is-active');$(self.selectors.elem).find(self.selectors.acquisitionDetails).addClass('is-active');$(self.selectors.elem).find(self.selectors.detailsVC).removeClass('is-active');$(self.selectors.elem).find('[data-submit-payment]').removeClass('is-active');$(self.selectors.elem).find('[data-submit-payment="paid"]').addClass('is-active');self.setCurrentMethod(QP_LEGACY)}
quickPay.prototype.switchToVcMethod=function(){var self=this;$(self.selectors.elem).find(self.selectors.details).removeClass('is-active');$(self.selectors.elem).find(self.selectors.medioDetails).removeClass('is-active');$(self.selectors.elem).find(self.selectors.acquisitionDetails).removeClass('is-active');$(self.selectors.elem).find(self.selectors.detailsVC).addClass('is-active');$(self.selectors.elem).find('[data-submit-payment]').removeClass('is-active');$(self.selectors.elem).find('[data-submit-payment="paid"]').addClass('is-active');self.setCurrentMethod(QP_SV)}
quickPay.prototype.performPay=function(){var self=this;if(self.getCurrentMethod()==QP_LEGACY&&self.medio==null){var form=$(self.selectors.elem).find(self.selectors.acquisitionDetails).find('form');if(form.length>0){$(form).off('formvalid.zf.abide').on('formvalid.zf.abide',function(){self.submitPay()})
$(form).foundation('validateForm')}else{self.submitPay()}}else{self.submitPay()}}
quickPay.prototype.submitPay=function(){var self=this;var form=null;var valuesArray={};var amount=null;var method=null;var submethod=null;var uid=null;var medio=null;if(self.getCurrentMethod()==QP_LEGACY){if(self.medio==null){$(self.selectors.elem).find(self.selectors.acquisitionDetails).find('[data-payment-field]').each(function(k,v){var fieldKey=$(v).attr('data-payment-field')
var fieldValue=$(v).val();valuesArray[fieldKey]=fieldValue})
method=self.getMethod().id;submethod=self.getSubMethod().id;uid=self.getSubMethod().uid}
amount=self.getAmount(!1,!1);if(self.medio!=null){medio=self.medio}}else if(self.getCurrentMethod()==QP_FREE){amount=0;amount=self.getAmount();method=submethod="sv";uid=self.getPaymentsObj().getLimit('sv','sv').uid}else if(self.getCurrentMethod()==QP_SV){amount=self.getAmount();method=submethod="sv";uid=self.getPaymentsObj().getLimit('sv','sv').uid}
form=$(self.selectors.elem).find(self.selectors.submitForm);var paymentProtocol={amount:amount,method:method,uid:parseInt(uid),submethod:submethod,usePreviousBalance:self.getIsUsingPreviousBalance(),forceMinLimit:!0,isShoppingCart:self.getPaymentsObj().isShoppingCart(),storedValueID:medio,customValues:valuesArray,saveInAgenda:self.getIsUsingSaveForLater()}
self.getPaymentsMgr().blockAllMethods();self.getPaymentsObj().performPay(method,submethod,paymentProtocol,$(form),function(){self.getPaymentsMgr().unblockAllMethods(!1)})}
quickPay.prototype.enableQuickPay=function(state){var self=this;self.quickPayStatus=state;if(state){self.switchToPayments(!1);$(self.selectors.elem).find(self.classicPayments.switchBtSelector).removeAttr('disabled','').show()}else{self.switchToPayments(!0);$(self.selectors.elem).find(self.classicPayments.switchBtSelector).attr('disabled','').hide()}}
quickPay.prototype.getQuickPayStatus=function(){return this.quickPayStatus}
function unlock(selectorsToUnlock){$(selectorsToUnlock).each(function(){if(typeof $(this).attr('data-forceLock')=="undefined"){$(this).removeAttr('disabled')}})}
String.prototype.placeHolder=function(arrayOfValues){var texto=this
if(Array.isArray(arrayOfValues)){$(arrayOfValues).each(function(k,v){var placeHolder="%"+(k+1);texto=texto.replace(new RegExp(placeHolder,'g'),v)})}else{var placeHolder="%1";texto=texto.replace(new RegExp(placeHolder,'g'),arrayOfValues)}
return texto};bamQueue.addToQueue(function(){var modalsLoader=new loaderProObject(!1);var modalLoaderHTML=modalsLoader.outputHTML();var warningMsg="Taking too much time, check your internet connection.\nContinue with the loading?";customModals=function(){interceptModals({holdHTML:modalLoaderHTML,timeOut:{time:8000,warnMsg:warningMsg,timeOutCallback:function(){try{webkit.messageHandlers.modalListener.postMessage("failed")}catch(err){console.log('The native context does not exist yet');var confValue=confirm(warningMsg);if(confValue==!1){$('[data-reveal]').core_reveal("close")}}}}})}
customLabelEvents()})
function customLabelEvents(element){var elem='body';if(typeof element!="undefined"){elem=element}
$(elem).find('label.beautifiedRadio input[type=radio]').add('label.beautified input[type=radio]').add('label.beautifiedRadio input[type=checkbox]').add('label.beautified input[type=checkbox]').off('click.beautified').on('click.beautified',function(){if($(this).attr('type')=='radio'){var name=$(this).attr('name');$('input[name="'+name+'"]').each(function(){var parent=$(this).parent();if($(parent).hasClass('beautifiedRadio')||$(parent).hasClass('beautified')){$(parent).removeClass('is-active')}})
$(this).parent('label.beautifiedRadio').addClass('is-active');$(this).parent('label.beautified').addClass('is-active')}else if($(this).attr('type')=='checkbox'){$(this).parent().toggleClass('is-active');if($(this).parent().hasClass('is-active')){$(this).prop('checked',!0)}else{$(this).prop('checked',!1)}}})
$('label.beautified input[type=checkbox]').add('label.beautifiedRadio input[type=checkbox]').each(function(){if($(this).prop('checked')){$(this).parent().addClass('is-active')}else{$(this).parent().removeClass('is-active')}})}
function setCountDown(seconds,elem,options){var strings={days:"d",hours:"h",minutes:"m",seconds:"s"}
var indicatorsTag="small";if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(options.strings.days!="undefined"){strings.days=options.strings.days}
if(options.strings.hours!="undefined"){strings.hours=options.strings.hours}
if(options.strings.minutes!="undefined"){strings.minutes=options.strings.minutes}
if(options.strings.seconds!="undefined"){strings.seconds=options.strings.seconds}}
if(typeof options.indicatorsTag!="undefined"){indicatorsTag=options.indicatorsTag}}
window.secondsRemainingCounter=setInterval(function(){countDown(seconds,elem,window.secondsRemainingCounter,options)},1000)}
function countDown(seconds,elem,timer,options){var strings={days:"d",hours:"h",minutes:"m",seconds:"s"}
var indicatorsTag="small";var tagsOpening="";var tagsClosure="";if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(options.strings.days!="undefined"){strings.days=options.strings.days}
if(options.strings.hours!="undefined"){strings.hours=options.strings.hours}
if(options.strings.minutes!="undefined"){strings.minutes=options.strings.minutes}
if(options.strings.seconds!="undefined"){strings.seconds=options.strings.seconds}}
if(typeof options.indicatorsTag!="undefined"){indicatorsTag=options.indicatorsTag}}
if(typeof $(elem).data("elapsed")=="undefined"){$(elem).data("elapsed",seconds)}
if(indicatorsTag.length>0){tagsOpening="<"+indicatorsTag+">"
tagsClosure="</"+indicatorsTag+">"}
var elapsed=$(elem).data("elapsed");var seconds=parseInt(elapsed,10);var days=Math.floor(seconds/(3600*24));seconds-=days*3600*24;var hrs=Math.floor(seconds/3600);seconds-=hrs*3600;var mnts=Math.floor(seconds/60);seconds-=mnts*60;$(elem).data("elapsed",elapsed-1)
if(days==0&&hrs==0){var resultString=pad(mnts,2)+tagsOpening+strings.minutes+" "+tagsClosure+pad(seconds,2)+tagsOpening+strings.seconds+tagsClosure}else if(days==0){var resultString=pad(hrs,2)+tagsOpening+strings.hours+" "+tagsClosure+pad(mnts,2)+tagsOpening+strings.minutes+" "+tagsClosure+pad(seconds,2)+tagsOpening+strings.seconds+tagsClosure}else{var resultString=pad(days,2)+tagsOpening+strings.days+" "+tagsClosure+pad(hrs,2)+tagsOpening+strings.hours+" "+tagsClosure+pad(mnts,2)+tagsOpening+strings.minutes+" "+tagsClosure+pad(seconds,2)+tagsOpening+strings.seconds+tagsClosure}
$(elem).html(resultString);if(elapsed<=0){clearInterval(timer)}}
function pad(num,size){return('000000000'+num).substr(-size)}
var fndt_paginationJS=function(selector,haystack,perPage){var self=this;this.pageActual=1;this.pageAnterior=!1;this.object=$(selector);this.haystack=haystack;this.perPage=perPage;this.pages=Math.ceil(this.haystack.length/perPage);this.interfaceOpts={};$(this.object).find("li").each(function(){if(typeof $(this).attr("data-prev")!="undefined"){$(this).on("click",function(){self.prev()})}else if(typeof $(this).attr("data-next")!="undefined"){$(this).on("click",function(){self.next()})}else{$(this).on("click",function(){self.goto($(this).attr("data-goto"))})}})}
fndt_paginationJS.prototype.prev=function(){if(this.pageActual>1)this.goto(this.pageActual-1)}
fndt_paginationJS.prototype.next=function(){if(this.pageActual<this.pages)this.goto(this.pageActual+1)}
fndt_paginationJS.prototype.goto=function(page){if(this.pageActual==parseInt(page))return!1;this.pageAnterior=this.pageActual;this.pageActual=parseInt(page);this.updatePagination();this.interface(this.interfaceOpts)}
fndt_paginationJS.prototype.updatePagination=function(){if(this.pageActual!=1){$(this.object).find("[data-prev].disabled").removeClass("disabled").html("<a>"+this.lang_prev+"</a>")}else{$(this.object).find("[data-prev]:not(.disabled)").addClass("disabled").html(this.lang_prev+"<span class='show-for-sr'>"+this.lang_page+"</span>")}
if(this.pageActual!=this.pages){$(this.object).find("[data-next].disabled").removeClass("disabled").html("<a>"+this.lang_next+"</a>")}else{$(this.object).find("[data-next]:not(.disabled)").addClass("disabled").html(this.lang_next+"<span class='show-for-sr'>"+this.lang_page+"</span>")}
$(this.object).find("[data-goto].current").removeClass("current").html("<a>"+this.pageAnterior+"</a>");$(this.object).find("[data-goto="+this.pageActual+"]").addClass("current").html("<span class='show-for-sr'>"+this.lang_actual+"</span> "+this.pageActual)}
function equalizeReducidasRows(containerElem){var i=0;var elem=containerElem;if(typeof elem=='undefined'){$('table.quiniela:not([data-betsSummary])  tr').each(function(){var biggestTDMAHeight=0;var biggestTDBSHeight=0;$(this).children().each(function(){if($(this).outerHeight()>biggestTDMAHeight){biggestTDMAHeight=$(this).outerHeight()}})
$('table.quiniela[data-betsSummary]:visible  tr:eq('+i+') >*').each(function(){if($(this).outerHeight()>biggestTDBSHeight){biggestTDBSHeight=$(this).outerHeight()}})
if(biggestTDMAHeight>biggestTDBSHeight){$('table.quiniela[data-betsSummary]:visible  tr:eq('+i+')').css('height',biggestTDMAHeight+'px')}else{$(this).css('height',biggestTDBSHeight+'px')}
i++})
if(/Edge/.test(navigator.userAgent)){$('table.quiniela').css('table-layout','inherit')}}else{$(containerElem).each(function(k,v){i=0;$(v).find('table.quiniela:not([data-betsSummary])  tr').each(function(){var biggestTDMAHeight=0;var biggestTDBSHeight=0;$(this).children().each(function(){if($(this).outerHeight()>biggestTDMAHeight){biggestTDMAHeight=$(this).outerHeight()}})
$(v).find('table.quiniela[data-betsSummary]:visible  tr:eq('+i+') >*').each(function(){if($(this).outerHeight()>biggestTDBSHeight){biggestTDBSHeight=$(this).outerHeight()}})
if(biggestTDMAHeight>biggestTDBSHeight){$(v).find('table.quiniela[data-betsSummary]:visible  tr:eq('+i+')').css('height',biggestTDMAHeight+'px')}else{$(this).css('height',biggestTDBSHeight+'px')}
i++})})
$('table.quiniela').css('table-layout','inherit')}}
function loadDynamicBoleto(tipoSorteo,injectTo,clearElem,callbackOnSuccess,options){var modoComunidad=!1;var periodicidad=0;var decimo=!1;var precioParticipacion=0;var dataParams={};var peticiones="";var discount="";var ignoreCookies=!1;var ignoreFileSending=!0;var sorteo;var callback=function(){};if(options){if(typeof options.modoComunidad!="undefined"){modoComunidad=options.modoComunidad}
if(typeof options.periodicidad!="undefined"){periodicidad=options.periodicidad}
if(typeof options.precioParticipacion!="undefined"){precioParticipacion=options.precioParticipacion}
if(typeof options.decimo!="undefined"){if(options.decimo.length>0){decimo=options.decimo}else{return!1}}
if(typeof options.peticiones!="undefined"){peticiones=options.peticiones}
if(typeof options.discount!="undefined"){discount=options.discount}
if(typeof options.ignoreCookies!="undefined"){ignoreCookies=options.ignoreCookies}
if(typeof options.ignoreFileSending!="undefined"){ignoreFileSending=options.ignoreFileSending}
if(typeof options.sorteo!="undefined"){sorteo=options.sorteo}
if(typeof callbackOnSuccess!="undefined"){callback=callbackOnSuccess}}
clearDynamicBoleto(clearElem);if(!modoComunidad){var ajaxURL="/data/?action=getBoleto&tipo="+tipoSorteo+"&typeDiscount="+discount+"&ignoreCookies="+ignoreCookies}else{var ajaxURL="/data/?action=getBoleto&tipo="+tipoSorteo+"&modoComunidad="+modoComunidad+"&ignoreCookies="+ignoreCookies+"&periodicidad="+periodicidad+"&sorteo="+sorteo}
ajaxURL=ajaxURL+"&precioParticipacion="+precioParticipacion;if(decimo){var ajaxURL="/data/?action=getDecimo";if(modoComunidad){ajaxURL="/data/?action=getDecimoComunidad&modoComunidad="+modoComunidad+"&periodicidad="+periodicidad}
ajaxURL+="&tipo="+tipoSorteo+"&sorteo="+decimo;dataParams={"peticiones":JSON.stringify(peticiones)}}
ajaxURL=ajaxURL+"&ignoreFileSending="+ignoreFileSending;var paramsURL=parseQueryString();if(typeof paramsURL.partner!='undefined'){ajaxURL=ajaxURL+"&partner="+paramsURL.partner}
$.ajax({type:"POST",url:ajaxURL,dataType:'json',data:dataParams,success:function(data){$(injectTo).html(data.data);callback()},error:function(){}});function clearDynamicBoleto(elemToClear){$(elemToClear).empty()}}
var parseQueryString=function(){var str=window.location.search;var objURL={};str.replace(new RegExp("([^?=&]+)(=([^&]*))?","g"),function($0,$1,$2,$3){objURL[$1]=$3});return objURL};var tramosPrice=function(precioPorDefecto,descuentosObj,purchaseOptionsObj,options){this.precioPorDefecto=precioPorDefecto;this.descuentosObj=descuentosObj;this.purchaseOptionsObj=purchaseOptionsObj;this.strings={superPrice:"{t}Â¡Super precio!{/t}",betPrice:"{t}Precio de apuesta{/t}",betsOrSubscribe:"{t}apuestas o abÃ³nate{/t}",subscribe:"{t}Si te abonas{/t}",bets:"{t}apuestas{/t}",discountAppliedToPurchase:"{t}Descuento aplicado en tu compra{/t}",discountAppliedToPurchaseExtended:"{t}Consigues un gran precio al comprar mÃºltiples apuestas, ya que se tienen en cuenta las que tienes en el carro de compra.{/t}"}
this.isAbonoActive=!1;if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(typeof options.strings.superPrice!="undefined"){this.strings.superPrice=options.strings.superPrice}
if(typeof options.strings.betPrice!="undefined"){this.strings.betPrice=options.strings.betPrice}
if(typeof options.strings.betsOrSubscribe!="undefined"){this.strings.betsOrSubscribe=options.strings.betsOrSubscribe}
if(typeof options.strings.subscribe!="undefined"){this.strings.subscribe=options.strings.subscribe}
if(typeof options.strings.bets!="undefined"){this.strings.bets=options.strings.bets}
if(typeof options.strings.discountAppliedToPurchase!="undefined"){this.strings.discountAppliedToPurchase=options.strings.discountAppliedToPurchase}
if(typeof options.strings.discountAppliedToPurchaseExtended!="undefined"){this.strings.discountAppliedToPurchaseExtended=options.strings.discountAppliedToPurchaseExtended}}}
var self=this;this.currentActiveTramo=!1}
tramosPrice.prototype.setNewTramos=function(newDescuentosObj){this.descuentosObj=newDescuentosObj;this.currentActiveTramo=!1;this.isAbonoActive=!1}
tramosPrice.prototype.render=function(renderIntoSelector){var self=this;var lowestPrice=self.precioPorDefecto;var superPrecioHTML='<span class="superPrecio"><span>'+this.strings.superPrice+'</span></span>';var inCartHTML='<dl data-bonuses-cart><dt><strong>'+this.strings.discountAppliedToPurchase+'</strong><dd>'+this.strings.discountAppliedToPurchaseExtended+'</dd></dl>';if(typeof global_currency=="undefined"){var ppp=parseFloat(this.precioPorDefecto).formatMoney(2,',','.')+'â‚¬'}else{var ppp=global_currency.getMoneda(parseFloat(this.precioPorDefecto),null,{wrapper:"small"})}
var precioPorApuestaHTML='<div class="column column-block">'+'<div data-bonusItem>'+'<span></span>'+'<p>'+this.strings.betPrice+': <strong data-price>'+ppp+'</strong></p>'+'</div>'+'</div>';var tramosHTML="";var lastTramoValue=0;var lowestPriceTramo=0;if(this.descuentosObj.tramos!=null&&this.descuentosObj.tramos.length>1){$.each(this.descuentosObj.tramos,function(k,v){if(v.fin>lastTramoValue){lastTramoValue=v.fin}
if(v.precioPorApuesta<lowestPrice){lowestPrice=v.precioPorApuesta}})}else{var lastRangoHTML="";if(self.descuentosObj.precioPorRenovacion<self.precioPorDefecto){if(typeof global_currency=="undefined"){var ppp=parseFloat(self.descuentosObj.precioPorRenovacion).formatMoney(2,',','.')+'â‚¬'}else{var ppp=global_currency.getMoneda(parseFloat(self.descuentosObj.precioPorRenovacion),null,{wrapper:"small"})}
lastRangoHTML=lastRangoHTML+'<p><strong>'+self.strings.subscribe+': </strong> <strong data-price>'+ppp+'</strong>';lastRangoHTML=lastRangoHTML+superPrecioHTML+'</p>';tramosHTML=tramosHTML+'	<div class="column column-block">'+'<div data-bonusItem>'+'<span></span>'+lastRangoHTML+'</div>'+'</div>'}}
$.each(this.descuentosObj.tramos,function(k,v){var rangoHTML="";var lastRangoHTML="";if(typeof global_currency=="undefined"){var ppp=parseFloat(v.precioPorApuesta).formatMoney(2,',','.')+'â‚¬'}else{var ppp=global_currency.getMoneda(parseFloat(v.precioPorApuesta),null,{wrapper:"small"})}
if(v.fin<lastTramoValue){if(v.inicio!=v.fin){var ran='<strong>'+v.inicio+'</strong>-<strong>'+v.fin+'</strong> '}else{var ran='<strong>'+v.inicio+'</strong> '}
if(v.precioPorApuesta==self.descuentosObj.precioPorRenovacion){rangoHTML=rangoHTML+'<p>'+ran+self.strings.betsOrSubscribe+': <strong data-price>'+ppp+'</strong>';if(lowestPrice==v.precioPorApuesta){rangoHTML=rangoHTML+superPrecioHTML}}else{rangoHTML=rangoHTML+'<p>'+ran+self.strings.bets+': <strong data-price>'+ppp+'</strong>';if(lowestPrice==v.precioPorApuesta){rangoHTML=rangoHTML+superPrecioHTML}}
rangoHTML=rangoHTML+"</p>"}else{if(v.precioPorApuesta==self.descuentosObj.precioPorRenovacion){lastRangoHTML=lastRangoHTML+'<p><strong>'+v.inicio+'</strong>+ '+self.strings.betsOrSubscribe+': <strong data-price>'+ppp+'</strong>';if(lowestPrice==v.precioPorApuesta){lastRangoHTML=lastRangoHTML+superPrecioHTML}}else{lastRangoHTML=lastRangoHTML+'<p><strong>'+v.inicio+'</strong>+ '+self.strings.bets+': <strong data-price>'+ppp+'</strong>';if(lowestPrice==v.precioPorApuesta){lastRangoHTML=lastRangoHTML+superPrecioHTML}}
lastRangoHTML=lastRangoHTML+"</p>"}
tramosHTML=tramosHTML+'	<div class="column column-block">'+'<div data-bonusItem>'+'<span></span>'+rangoHTML+lastRangoHTML+'</div>'+'</div>'})
var HTMLFinal='	<div data-bonusesPerPurchase class="is-active">'+'<div class="row small-up-3 collapse">'+precioPorApuestaHTML+tramosHTML+'</div>'+'</div>'
if(typeof self.descuentosObj.bonusesInCart!="undefined"&&self.descuentosObj.bonusesInCart===!0){var defPrice=self.getDefaultPrice();var abonoPrice=self.descuentosObj.precioPorRenovacion;var foundLowerThanPrice=!1;$(self.descuentosObj.tramos).each(function(tramokey,tramovalue){if(tramovalue.precioPorApuesta<defPrice){foundLowerThanPrice=!0}})
if(abonoPrice<defPrice){foundLowerThanPrice=!0}
if(foundLowerThanPrice){HTMLFinal=HTMLFinal+inCartHTML}}
if(typeof renderIntoSelector!="undefined"){$(renderIntoSelector).html(HTMLFinal)}else{return HTMLFinal}}
tramosPrice.prototype.updateTramoPrize=function(apuestas,dias,semanas,esDecimo){var self=this;var isDecimo=!1;var days=1;var weeks=1;var apuestasTotal=!1;if(typeof semanas=="number"){weeks=semanas}
if(typeof days=="number"){days=dias}
if(typeof esDecimo!="undefined"&&esDecimo===!0){isDecimo=!0}
if(typeof apuestas==="number"){apuestasTotal=apuestas*dias*semanas}else{apuestasTotal=apuestas}
var tramoIndex=self.getCurrentTramo(apuestasTotal);if(typeof apuestas=="number"&&apuestas>=0){if(tramoIndex!=0){if(!self.isAbonoActive){self.purchaseOptionsObj.setPrice(self.descuentosObj.tramos[tramoIndex-1].precioPorApuesta,apuestas,!0);self.purchaseOptionsObj.setManualDiscount(self.precioPorDefecto)}else{if(tramoIndex!="abonoOnly"){if(self.descuentosObj.precioPorRenovacion<=self.descuentosObj.tramos[tramoIndex-1].precioPorApuesta){self.purchaseOptionsObj.setPrice(self.descuentosObj.precioPorRenovacion,apuestas,!0);self.purchaseOptionsObj.setManualDiscount(self.precioPorDefecto)}else{self.purchaseOptionsObj.setPrice(self.descuentosObj.tramos[tramoIndex-1].precioPorApuesta,apuestas,!0);self.purchaseOptionsObj.setManualDiscount(self.precioPorDefecto)}}else{if(self.descuentosObj.precioPorRenovacion<self.precioPorDefecto){self.purchaseOptionsObj.setPrice(self.descuentosObj.precioPorRenovacion,apuestas,!0);self.purchaseOptionsObj.setManualDiscount(self.precioPorDefecto)}}}}else{self.purchaseOptionsObj.setPrice(self.precioPorDefecto,apuestas,!0)}}else{if(typeof self.purchaseOptionsObj.numeroApuestas=="number"){if(tramoIndex!=0){if(tramoIndex!="abonoOnly"){self.purchaseOptionsObj.setPrice(self.descuentosObj.tramos[tramoIndex-1].precioPorApuesta,self.purchaseOptionsObj.numeroApuestas,!0);self.purchaseOptionsObj.setManualDiscount(self.precioPorDefecto)}else{if(self.descuentosObj.precioPorRenovacion<self.precioPorDefecto){self.purchaseOptionsObj.setPrice(self.descuentosObj.precioPorRenovacion,self.purchaseOptionsObj.numeroApuestas,!0);self.purchaseOptionsObj.setManualDiscount(self.precioPorDefecto)}}}else{if(!isDecimo){if(typeof self.purchaseOptionsObj.numeroApuestas=="number"){var ap=self.purchaseOptionsObj.numeroApuestas*self.purchaseOptionsObj.dias*self.purchaseOptionsObj.semanas
var currentTramo=!1;$(this.descuentosObj.tramos).each(function(k,v){if(ap>=v.inicio&&ap<=v.fin){currentTramo=k}})
if(currentTramo!==!1&&(self.descuentosObj.tramos[currentTramo].precioPorApuesta<=self.precioPorDefecto)){self.purchaseOptionsObj.setPrice(self.descuentosObj.tramos[currentTramo].precioPorApuesta,self.purchaseOptionsObj.numeroApuestas,!0)}else{self.purchaseOptionsObj.setPrice(self.precioPorDefecto,self.purchaseOptionsObj.numeroApuestas,!0)}}else{self.purchaseOptionsObj.setPrice(self.precioPorDefecto,self.purchaseOptionsObj.numeroApuestas,!0)}}}}}}
tramosPrice.prototype.setActiveTramo=function(tramo){this.currentActiveTramo=tramo}
tramosPrice.prototype.getActiveTramo=function(){if(this.currentActiveTramo&&(this.currentActiveTramo>0||this.currentActiveTramo=="abonoOnly")){return this.currentActiveTramo}else{return!1}}
tramosPrice.prototype.setUITramo=function(apuestas,dias,semanas){var self=this;var days=1;var weeks=1;$('[data-bonusesperpurchase] [data-bonusitem]').removeClass('is-active');$('[data-bonusesperpurchase] [data-bonusitem]').closest('.column').removeClass('is-active');if(typeof apuestas!="undefined"){if(typeof semanas!="undefined"){weeks=semanas}
if(typeof dias!="undefined"){days=dias}
if(typeof apuestas==="number"){apuestas=apuestas*dias*semanas}
var tramoIndex=self.getCurrentTramo(apuestas);var activarDescuentosAbonos=!1;if(typeof apuestas==="boolean"&&self.descuentosObj.precioPorRenovacion!=self.descuentosObj.precioPorRenovacion){activarDescuentosAbonos=!0}
if(tramoIndex!==!1){if(tramoIndex!="abonoOnly"){$('[data-bonusesperpurchase] [data-bonusitem]').eq(tramoIndex).addClass('is-active');$('[data-bonusesperpurchase] [data-bonusitem]').eq(tramoIndex).closest('.column').addClass('is-active');self.setActiveTramo(tramoIndex)}else{$('[data-bonusesperpurchase] [data-bonusitem]').eq(1).addClass('is-active');$('[data-bonusesperpurchase] [data-bonusitem]').eq(1).closest('.column').addClass('is-active');self.setActiveTramo("abonoOnly")}}else if(tramoIndex===!1){$('[data-bonusesperpurchase] [data-bonusitem]').eq(0).addClass('is-active');$('[data-bonusesperpurchase] [data-bonusitem]').eq(0).closest('.column').addClass('is-active');self.setActiveTramo(0)}}}
tramosPrice.prototype.getCurrentTramo=function(apuestas){var self=this;var valueToReturn=!1;var abonoDescuentoViabilidad=!1;var thereIsABetterMatch=!1;var currentTramo=!1;var abonoTramo=!1;if(self.descuentosObj.precioPorRenovacion!=self.precioPorDefecto){abonoDescuentoViabilidad=!0}
if(typeof apuestas=="number"||apuestas===!0){if((abonoDescuentoViabilidad&&typeof apuestas=="boolean"&&apuestas===!0)||self.isAbonoActive){self.isAbonoActive=!0}
if(typeof apuestas=="boolean"){if(typeof self.purchaseOptionsObj!="undefined"&&typeof self.purchaseOptionsObj.numeroApuestas=="number"){var ap=self.purchaseOptionsObj.numeroApuestas*self.purchaseOptionsObj.dias*self.purchaseOptionsObj.semanas}}else{var ap=apuestas}
if(this.descuentosObj.tramos!=null&&this.descuentosObj.tramos.length>0){$(this.descuentosObj.tramos).each(function(k,v){if(ap>=v.inicio&&ap<=v.fin){currentTramo=k+1}
if(abonoDescuentoViabilidad&&self.isAbonoActive){if(v.precioPorApuesta==self.descuentosObj.precioPorRenovacion){abonoTramo=k+1}}})}else{if(abonoDescuentoViabilidad&&self.isAbonoActive){if(self.descuentosObj.precioPorRenovacion<=self.precioPorDefecto){abonoTramo=!0;currentTramo=null}}}
valueToReturn=currentTramo;if(!abonoTramo){self.isAbonoActive=!1;valueToReturn=currentTramo}else if(abonoTramo===!0&&currentTramo===null){return"abonoOnly"}else if(abonoTramo&&currentTramo){if(self.descuentosObj.tramos[abonoTramo-1].precioPorApuesta<self.descuentosObj.tramos[currentTramo-1].precioPorApuesta){valueToReturn=abonoTramo}else{valueToReturn=currentTramo}}else if(abonoTramo&&!currentTramo){valueToReturn=abonoTramo}}else if(apuestas===!1&&abonoDescuentoViabilidad){self.isAbonoActive=!1;valueToReturn=0;if(self.purchaseOptionsObj.numeroApuestas){if(self.descuentosObj.tramos!=null&&self.descuentosObj.tramos.length>0){$(self.descuentosObj.tramos).each(function(k,v){if(typeof self.purchaseOptionsObj!="undefined"&&typeof self.purchaseOptionsObj.numeroApuestas=="number"){if(self.purchaseOptionsObj.numeroApuestas*self.purchaseOptionsObj.dias*self.purchaseOptionsObj.semanas>=v.inicio&&self.purchaseOptionsObj.numeroApuestas*self.purchaseOptionsObj.dias*self.purchaseOptionsObj.semanas<=v.fin){valueToReturn=k+1;return!1}}})}}}
return valueToReturn}
tramosPrice.prototype.getActiveTramoPrice=function(){var self=this;var tramoActivo=self.getActiveTramo();if(tramoActivo){if(tramoActivo>0||tramoActivo=="abonoOnly"){if(tramoActivo!="abonoOnly"){return parseFloat(self.descuentosObj.tramos[tramoActivo-1].precioPorApuesta)}else{return parseFloat(self.descuentosObj.precioPorRenovacion)}}else{return self.precioPorDefecto}}else{return self.precioPorDefecto}}
tramosPrice.prototype.getTramoPriceFromApuestas=function(apuestas){var self=this;var tramo=self.getCurrentTramo(apuestas);if(tramo){if(tramo>0||tramo=="abonoOnly"){if(tramo!="abonoOnly"){return parseFloat(self.descuentosObj.tramos[tramo-1].precioPorApuesta)}else{return parseFloat(self.descuentosObj.precioPorRenovacion)}}else{return self.precioPorDefecto}}else{return self.precioPorDefecto}}
tramosPrice.prototype.getDefaultPrice=function(){return this.precioPorDefecto}
var purchaseOptions=function(game,price,options){var parentObj=this;this.game=game;this.priceBet=parseFloat(price);this.canBuy=!1;this.price=0.0;this.priceWithoutDiscount=0.0;this.numeroApuestas=0;this.semanas=1;this.dias=1;this.abono=!1;this.abonoRandom=!1;this.itemIDforEdition=!1;this.minAbonoSemanas=1;this.additionalGame=!1;this.originalGamePrice=this.priceBet;this.jokerPrice=0;this.playJoker=!1;this.pricePartDecimos=0;this.partDecimos=0;this.discount=0;this.discountPercentage=0;this.discountExtra=0;this.dataDiscount;this.discountPromo=0;this.free=!1;this.betsFromFile=!1;this.numberChooserObj=!1;if(typeof(options)!="undefined"){if(typeof(options.precioParts)!="undefined"){this.pricePartDecimos=options.precioParts}
if(typeof(options.discount)!="undefined"){this.discountPromo=options.discount}
if(typeof(options.dataDiscount)!="undefined"){this.dataDiscount=options.dataDiscount}
if(typeof(options.betsFromFile)!="undefined"){this.betsFromFile=options.betsFromFile}
if(typeof(options.numberChooserObj)!="undefined"){this.numberChooserObj=options.numberChooserObj}
if(typeof options.itemIDforEdition!="undefined"){this.itemIDforEdition=options.itemIDforEdition}
if(typeof options.additionalGame!="undefined"){this.playAdditionalGame=options.additionalGame}
if(typeof options.minAbonoSemanas!="undefined"){this.minAbonoSemanas=options.minAbonoSemanas}}
this.init()}
purchaseOptions.prototype.init=function(){var parentObj=this;this.setCanBuy=function(canBuy){this.canBuy=canBuy;updateButtonCompra(this)}
this.updatePrice=function(numeroApuestas){if(typeof(price)!="undefined"){this.priceBet=price}
this.numeroApuestas=numeroApuestas;var price=this.calculatePrice(this.numeroApuestas*this.semanas*this.dias,!1);if(this.playJoker||this.additionalGame){if(this.playJoker){price+=this.jokerPrice*this.semanas*this.dias}
if(this.additionalGame&&numeroApuestas>0){$(this.additionalGame).each(function(k,v){if(v.state){price+=v.precio*v.bets*parentObj.semanas*parentObj.dias}})}}
if(typeof(this.dataDiscount)!="undefined"||typeof(this.discountPromo)=="object"){this.calculateDiscount(price);this.priceWithoutDiscount=price.toFixed(2)}
price=price-this.discount-this.discountExtra;if(price<0&&(this.discount>0||this.discountExtra>0))price=0;if(parseFloat(this.discount)>0)this.discount=(this.discount).toFixed(2);if(parseFloat(this.discountExtra)>0)this.discountExtra=(this.discountExtra).toFixed(2);this.price=price.toFixed(2);updatePriceLabels(this)}
this.calculateDiscount=function(price){var discountPrice=0;var apuestasPart=this.numeroApuestas*this.semanas*this.dias;if(typeof this.dataDiscount!="undefined"&&(this.semanas>=this.dataDiscount.descuentoSemanasMin||(this.dataDiscount.descuentoPart&&apuestasPart>=this.dataDiscount.descuentoPart))){if(typeof(this.dataDiscount.descuentoRango)!="undefined"){var mediaRangoSemana=Math.floor((this.semanas-this.dataDiscount.descuentoSemanasMin)/parseInt(this.dataDiscount.descuentoRango));discountPrice=(Math.round(((mediaRangoSemana*this.dataDiscount.descuentoAumento)+parseFloat(this.dataDiscount.descuentoPorcentaje))*100)/100).toFixed(2)}else{discountPrice=this.dataDiscount.descuentoPorcentaje}}
this.discountPercentage=(discountPrice*100).toFixed(2);this.discount=price-(price*(1-discountPrice));this.discountExtra=0;if(typeof(this.discountPromo)=="object"){switch(this.discountPromo.type){case "bet":this.discountExtra=this.priceBet*this.discountPromo.bets;break;case "amount":this.discountExtra=this.discountPromo.amount.toFixed(2);break}}}
this.setDays=function(nameControl){this.dias=$("["+nameControl+"]").find("input:checked").length;if(this.dias==0){this.dias=$("["+nameControl+"]").find("input:not([data-value=-1])").length}}
this.calculatePrice=function(numeroApuestas,format,price){if(typeof(price)!="undefined"){this.priceBet=price}
var price=this.priceBet*numeroApuestas;price+=this.pricePartDecimos*this.partDecimos;if(format){price=Math.round(price*100)/100;price.toFixed(2)}
return price}
this.setSorteos=function(arrayOfSorteos){$('[data-daysChooser] input').prop('checked',!1).trigger('change').parent('label').removeClass('is-active')
$(arrayOfSorteos).each(function(key,value){if($('[data-daysChooser] input').length==1){$('[data-daysChooser] input:eq('+value+')').removeAttr('disabled').trigger('click').attr('disabled','disabled')}else{$('[data-daysChooser] input:eq('+value+')').trigger('click')}})
parentObj.setDays}
this.getCurrentSorteoWeek=function(){var valor=$('[data-daysChooser] input[data-orderday=0]').attr('data-value');return valor}
this.setSemanas=function(semanas){var elem=$('[data-weeksChooser] input[data-value='+semanas+']');if($(elem).length>0){$(elem).trigger('click').prop("checked",!0);this.semanas=parseInt(semanas)}}
this.setRenew=function(boolOfRenewal,boolOfRandomRenewal){if(boolOfRenewal==!0){$('[data-abonoChooser] input').prop('checked',!0).trigger('change').parent('label').addClass('is-active');if(boolOfRandomRenewal==!0){$('[data-abonoRandom] input').prop('checked',!0).trigger('change').parent('label').addClass('is-active')}else{$('[data-abonoRandom] input').prop('checked',!1).trigger('change').parent('label').removeClass('is-active')}}else{$('[data-abonoChooser] input').prop('checked',!1).trigger('change').parent('label').removeClass('is-active')}}}
purchaseOptions.prototype.setAdditionalGame=function(state,additionalGameObj){var self=this;var found=!1;$(this.additionalGame).each(function(k,v){if(v.game==additionalGameObj.game){self.additionalGame[k]=additionalGameObj;self.additionalGame[k].state=state;found=!0;return!1}})
if(!found){if(!self.additionalGame){self.additionalGame=new Array()}
var ag=additionalGameObj;ag.state=state;self.additionalGame.push(ag)}}
purchaseOptions.prototype.setPrice=function(newPrice,apuestas,updatePrice){this.priceBet=parseFloat(newPrice);if(updatePrice===!0){this.init();this.updatePrice(apuestas)}}
purchaseOptions.prototype.setManualDiscount=function(basePrice){var baseTotal=(this.numeroApuestas*basePrice*this.dias*this.semanas);var price=0;var self=this;if(self.playJoker||self.additionalGame){if(this.playJoker){price+=self.jokerPrice*self.semanas*self.dias}
if(self.additionalGame&&self.numeroApuestas>0){$(self.additionalGame).each(function(k,v){if(v.state){price+=v.precio*v.bets*self.semanas*self.dias}})}}
this.priceWithoutDiscount=(baseTotal+price).toFixed(2);updatePriceLabels(this,!0);this.discountPercentage=0;this.discount=0;this.priceWithoutDiscount=0}
purchaseOptions.prototype.reset=function(options){this.numeroApuestas=0;this.price="0,00";this.priceWithoutDiscount="0,00";this.setCanBuy(!1);updatePriceLabels(this)}
purchaseOptions.prototype.getMinAbonoSemanas=function(){return this.minAbonoSemanas}
purchaseOptions.prototype.getSemanas=function(){return this.semanas}
purchaseOptions.prototype.blockWeeksUntil=function(deactivateUntilWeek){var elem=$('[data-weeksChooser] input[data-value]');$(elem).each(function(k,v){var semana=!1;if(typeof $(v).attr('data-value')!="undefined"){semana=parseInt($(v).attr('data-value'));if(semana<deactivateUntilWeek){$(v).attr('disabled','disabled');$(v).closest('label').addClass('disabled')}}})}
purchaseOptions.prototype.unblockWeeks=function(){var elem=$('[data-weeksChooser] input[data-value]');$(elem).each(function(k,v){$(v).removeAttr('disabled');$(v).closest('label').removeClass('disabled')})}
var comunidadOptions=function(game,restantes,playGames,dataGames,importeRestantes,purchaseOptionsObj,elemInfo,elemInfoBets){this.gameSelect=game;this.restantes=restantes;this.playGames=playGames;this.priceGames=dataGames;this.importeRes=importeRestantes;this.participaciones=0;this.bets=new Array();this.decimosAdd={};this.drawPrice={};this.drawSelect=0;if(typeof(elemInfo)!="undefined"){this.elemInfo=elemInfo}else{this.elemInfo="[data-info-participaciones-ctrl-purchase-option]"}
if(typeof(elemInfoBets)!="undefined"){this.elemInfoBets=elemInfoBets}else{this.elemInfoBets="[data-participaciones-ctrl-purchase-option]"}
this.dataInfoCtrlPurchaseOption=function(){$("[data-number-of-participaciones]").html(this.formatParticipaciones(this.participaciones));$(this.elemInfo).parent().find("span").remove();$(this.elemInfoBets).html("0 apuesta")}
this.addParticipaciones=function(){this.restantes=parseFloat(this.restantes)-parseFloat(this.participaciones);this.restantes=this.formatParticipaciones(this.restantes);updateParticipacionesRestantesLabels(this.restantes)}
this.removeParticipaciones=function(){this.restantes=(parseFloat(this.restantes)+parseFloat(this.participaciones));this.restantes=this.formatParticipaciones(this.restantes);updateParticipacionesRestantesLabels(this.restantes)}
this.formatParticipaciones=function(format){if(parseFloat(format).toString()!==format.toString()){format=parseInt(format)}
var n=parseFloat(format).toFixed(2);return n}
this.setCanBuyComunidad=function(participaciones,importeAdd,setbuy){var importeAdd=importeAdd;var participaciones=participaciones;var importeRes=this.importeRes;var buy=!0;if(typeof setbuy!="undefined"){var buy=setbuy}
importeRes-=importeAdd;if(importeRes<0)importeRes=0;if(parseFloat(participaciones)>0&&parseFloat(participaciones)<=parseFloat(this.restantes)&&buy){$("[data-purchase-button]").removeClass("disabled").removeAttr('disabled');$("[data-purchase-button-small]").removeClass("disabled").removeAttr('disabled')}else{$("[data-purchase-button]").addClass("disabled").attr('disabled','');$("[data-purchase-button-small]").addClass("disabled").attr('disabled','')}
this.updateTabs(importeRes);this.participaciones=participaciones;this.dataInfoCtrlPurchaseOption()}
this.updateTabs=function(importeRes){for(var indice in this.priceGames){var betsByGame=Math.floor(importeRes/this.priceGames[indice].precioBase);if(this.priceGames[indice].tipo=="decimo"){var precioPart=this.priceGames[indice].precioBase/4;var diffDecimals=Math.floor((importeRes-(Math.floor(importeRes/this.priceGames[indice].precioBase)*this.priceGames[indice].precioBase))/precioPart)/4;if(diffDecimals>0)betsByGame+=diffDecimals}
$("[data-max-bets-"+indice+"] span").html(betsByGame);if(betsByGame<=0){$("[data-max-bets-"+indice+"]").closest("li").addClass("disabled")}else{$("[data-max-bets-"+indice+"]").closest("li").removeClass("disabled")}}}
this.setSorteoDecimos=function(data){var sorteo=data.sorteo;this.drawSelect=sorteo;var apuestasXpart=((parseFloat(data.precioBase)*parseFloat(this.priceGames[this.gameSelect].apuestasXpart))/parseFloat(this.priceGames[this.gameSelect].precioBase)).toFixed(3);if(typeof(this.decimosAdd[sorteo])=="undefined"){this.decimosAdd[sorteo]={}}
if(typeof(this.drawPrice[sorteo])=="undefined"){this.drawPrice[sorteo]={"decimo":data.precio,"participacion":data.precioParts,"apuestasXpart":apuestasXpart}}}}
function purchaseOptionsRewrite(myPurchaseOptionsObj,comunidadObject){console.log('launchPOR')
var originalEvent=purchaseOptionsObj.setDays;myPurchaseOptionsObj.setDays=function(){originalEvent.apply(this,arguments);this.setCanBuy()}
myPurchaseOptionsObj.setCanBuy=function(setBuy){var apuestas=this.numeroApuestas*this.dias;if(this.playJoker)apuestas+=1*this.dias;var importeAdd=parseInt(apuestas)*parseFloat(comunidadObject.priceGames[this.game].precioBase);var participaciones=Math.round((parseInt(apuestas)*parseFloat(comunidadObject.priceGames[this.game].apuestasXpart))*100)/100;this.canBuy=setBuy;comunidadObject.setCanBuyComunidad(participaciones,importeAdd,setBuy)}
$('[data-joker]').on("change",function(){if(myPurchaseOptionsObj.numberChooserObj.isMultipleInProgress){myPurchaseOptionsObj.setCanBuy(myPurchaseOptionsObj.canBuy)}})}
function calculatePrice(numeroApuestas,precioApuesta,comisionApuesta){return roundNumber(numeroApuestas*(precioApuesta+comisionApuesta))}
function updatePercentages(numberOfCategories,element){for(var i=1;i<numberOfCategories+1;i++){$("[data-prob-"+i+"]").html(element.attr("data-cat"+i)+"%")}}
function parseGameSelection(juego,options){var bets={rows:[],extra:[],sorteos:[],tipo:juego,idSorteos:[]};var chooserObj=!1;var purchaseOptionsObj=!1;var listDecimosBuy=!1;var gameType="boleto";if(typeof options!="undefined"){if(typeof options.chooserObj!="undefined"){chooserObj=options.chooserObj}
if(typeof options.purchaseOptionsObj!="undefined"){purchaseOptionsObj=options.purchaseOptionsObj}
if(typeof options.listDecimos!="undefined"){listDecimosBuy=options.listDecimos}
if(typeof options.gameType!="undefined"){gameType=options.gameType}
if(typeof options.discountPromo!="undefined"){discountPromo=options.discountPromo}}
if(typeof options!="undefined"&&typeof options.desarrollo!="undefined"){bets.rows=options.desarrollo.split("-")}else if(gameType=="boleto"){var apuestasUser=chooserObj.getRawValues({exportNumsAndExtras:!0});bets.rows=apuestasUser.nums;bets.extra=apuestasUser.extras;if(typeof purchaseOptionsObj!="undefined"&&purchaseOptionsObj.itemIDforEdition){bets.item=purchaseOptionsObj.itemIDforEdition}
if(typeof apuestasUser.joker!="undefined"&&apuestasUser.joker==1){bets.joker=apuestasUser.joker}
if(typeof apuestasUser.idReduccion!="undefined"){bets.reduccion=apuestasUser.idReduccion}
if(typeof apuestasUser.condicion!="undefined"){bets.condiciones=apuestasUser.condicion}
if(typeof apuestasUser.multiple!="undefined"){bets.multiple=apuestasUser.multiple}
if(typeof apuestasUser.elige8!="undefined"&&apuestasUser.elige8.length>0){bets.elige8=apuestasUser.elige8}
if(typeof discountCode!="undefined"){bets.discountCode=discountCode}}else if(listDecimosBuy){for(var sorteo in listDecimosBuy){for(var numero in listDecimosBuy[sorteo]){if(typeof(listDecimosBuy[sorteo][numero].peticion)=="undefined")listDecimosBuy[sorteo][numero].peticion=0;bets.rows.push({numero:numero,decimos:listDecimosBuy[sorteo][numero].decimos,parts:listDecimosBuy[sorteo][numero].participaciones,sorteo:sorteo,peticion:listDecimosBuy[sorteo][numero].peticion})}}}else{$('[data-purchase-id]').each(function(){if($(this).closest("[data-purchase-options]").length>0){if($(this).closest("[data-purchase-options]").is(":visible")){if($(this).text()>0){bets.rows.push({id:$(this).data("purchase-id"),parts:+$(this).text()})}}}else{if($(this).text()>0){bets.rows.push({id:$(this).data("purchase-id"),parts:+$(this).text()})}}})}
bets.semanas=parseInt($('[data-weeksChooser]').find("input:checked").data("value"));if($('[data-abonoChooser]').length)bets.abono=+$('[data-abonoChooser]').find("input").is(":checked");else bets.abono=0;if($('[data-abonoRandom]').length)bets.abonoRandom=+$('[data-abonoRandom]').find("input").is(":checked");else bets.abonoRandom=0;$('[data-daysChooser]').find("input:checked").each(function(i,obj){if(typeof($(this).attr("data-fixed-date"))!=="undefined")bets.idSorteos.push($(this).attr("data-fixed-date"));else bets.sorteos.push($(obj).data("value"))});return bets}
var updatePriceLabels=function(purchaseOptionsObject,forceManual,reset){if(typeof forceManual!="undefined"&&forceManual===!0){if(typeof reset!="undefined"&&reset===!0){$("[data-discount-price]").add("#floatingCart [data-discount-price]").html();$("[data-purchase-options]").add("#floatingCart").removeClass("hasDiscounts")}else{if(typeof global_currency=="undefined"){var ppp=purchaseOptionsObject.priceWithoutDiscount+"â‚¬"}else{var ppp=global_currency.getMoneda(parseFloat(purchaseOptionsObject.priceWithoutDiscount),null,{wrapper:"small"})}
$("[data-discount-price]").add("#floatingCart [data-discount-price]").html(ppp);$("[data-purchase-options]").add("#floatingCart").addClass("hasDiscounts")}}else{if(typeof global_currency=="undefined"){var ppp=purchaseOptionsObject.price+"â‚¬"}else{var ppp=global_currency.getMoneda(parseFloat(purchaseOptionsObject.price),null,{wrapper:"small"})}
$("[data-purchase-total]").add("[data-carttotal-importe]").html(ppp);$("[data-discount-percentage]").html(parseFloat(purchaseOptionsObject.discountPercentage)>0?"-"+purchaseOptionsObject.discountPercentage+"%":"");if(typeof global_currency=="undefined"){var ppp=parseFloat(purchaseOptionsObject.discount).formatMoney(2,",",".")+"â‚¬"}else{var ppp=global_currency.getMoneda(parseFloat(purchaseOptionsObject.discount))}
$("[data-discount-value]").html(purchaseOptionsObject.discount>0?ppp:"");if(!(purchaseOptionsObject.priceBet!=purchaseOptionsObject.originalGamePrice&&purchaseOptionsObject.numeroApuestas>0)){if(typeof global_currency=="undefined"){var ppp=parseFloat(purchaseOptionsObject.priceWithoutDiscount).formatMoney(2,",",".")+"â‚¬"}else{var ppp=global_currency.getMoneda(parseFloat(purchaseOptionsObject.priceWithoutDiscount))}
if(purchaseOptionsObject.numeroApuestas>0){$("[data-discount-price]").html(ppp)}else{$("[data-discount-price]").html("")}}else{if(typeof global_currency=="undefined"){var ppp=parseFloat(purchaseOptionsObject.originalGamePrice*purchaseOptionsObject.numeroApuestas*purchaseOptionsObject.dias*purchaseOptionsObject.semanas).formatMoney(2,",",".")+"â‚¬"}else{var ppp=global_currency.getMoneda(parseFloat(purchaseOptionsObject.originalGamePrice*purchaseOptionsObject.numeroApuestas*purchaseOptionsObject.dias*purchaseOptionsObject.semanas))}
$("[data-discount-price]").html(ppp)}
if(purchaseOptionsObject.discount>0||purchaseOptionsObject.discountExtra>0){$("[data-purchase-options]").add("#floatingCart").addClass("hasDiscounts")}else{$("[data-purchase-options]").removeClass("hasDiscounts")}
updateButtonCompra(purchaseOptionsObject)}}
var updatePriceLabelsPenyas=function(){$("[data-purchase-total]").add("[data-carttotal-importe]").html(myPurchaseOptions.numeroApuestas)
updateButtonCompra(myPurchaseOptions)}
var updateParticipacionesLabels=function(){$("[data-number-of-participaciones]").html(myPurchaseOptions.numeroParticipaciones);$("[data-participaciones-ctrl-purchase-option]").html(myPurchaseOptions.numeroApuestas+" apuestas")}
var updateButtonCompra=function(purchaseOptionsObject){if(purchaseOptionsObject.canBuy){$("[data-purchase-button]").removeClass("disabled").removeAttr('disabled');$("[data-purchase-button-small]").removeClass("disabled").removeAttr('disabled')}else{$("[data-purchase-button]").addClass("disabled").attr('disabled','');$("[data-purchase-button-small]").addClass("disabled").attr('disabled','')}}
var updateParticipacionesRestantesLabels=function(participaciones){$("[data-participaciones-restantes]").html(participaciones)}
function launchHelpdeskScripts(formElem,options){var ajaxObjParams=!1
var statusMsg={ok:"Mensaje enviado, recibirÃ¡s respuesta pronto",ko:"Error",hold:"Enviando ..."}
var submitBt={holdMsg:"..."}
var callback=function(e){$(formElem).remove();$('#helpdeskPostMessage').removeClass("hide")}
if(typeof options!="undefined"){if(typeof options.ajaxObjParams!="undefined"){ajaxObjParams=options.ajaxObjParams}}
if(ajaxObjParams){ajaxObjParams.clearOnSubmit=!0,ajaxObjParams.callbackOnSuccess=callback
if(typeof ajaxObjParams.statusMsg=="undefined"){ajaxObjParams.statusMsg=statusMsg}
if(typeof ajaxObjParams.submitBt=="undefined"){ajaxObjParams.submitBt=submitBt}}else{ajaxObjParams.clearOnSubmit=!0,ajaxObjParams.callbackOnSuccess=callback
ajaxObjParams.statusMsg=statusMsg
ajaxObjParams.submitBt=submitBt}
$(formElem).find('[data-submit]').on('click',function(){var formSubmit=new formeSubmit($(formElem),"/data/?action=helpdeskMessage",ajaxObjParams)})}
function launchChatScripts(zopimToken,zopimObj,options){var attempts=10;var callback=!1;var failedCallback=!1;if(typeof options!="undefined"){if(typeof options.callback!="undefined"){callback=options.callback}
if(typeof options.failedCallback!="undefined"){failedCallback=options.failedCallback}}
window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set._.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute("charset","utf-8");$.src="https://v2.zopim.com/?"+zopimToken+"";z.t=+new Date;$.type="text/javascript";e.parentNode.insertBefore($,e)})(document,"script");var currentAttempt=0;$zopim(function(){$zopim.livechat.window.hide()
$zopim.livechat.setOnConnected(function(){zopimObj()
if(callback){callback()}})})
var zopimLoader=setInterval(function(){if(typeof($zopim.livechat)!='undefined'){clearInterval(zopimLoader)}else{currentAttempt++}
if(currentAttempt==attempts+1){clearInterval(zopimLoader);if(failedCallback){failedCallback()}}},1000)}
function invoqueChat(zopimToken,options){var strings={chat:"Chat"}
var loadWithoutOpenChat=!1
if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(options.strings.chat!="undefined"){strings.chat=options.strings.chat}}
if(typeof options.loadWithoutOpenChat!="undefined"){if(options.loadWithoutOpenChat){loadWithoutOpenChat=!0}else{loadWithoutOpenChat=!1}}}
if(typeof $zopim=="undefined"){var zopimCallback=function(){if(!loadWithoutOpenChat){bamQueue.waitForExistance("$zopim.state",function(){if($zopim.state=="online"){$zopim.livechat.window.show()}else if($zopim.state=="offline"){$('#chatBt').removeAttr('data-online').attr('data-offline',"")
$('#helpdesk').core_reveal("open")}})}
$('#chatBt').removeAttr("disabled").removeAttr("data-loading")}
var zopimFailedCallback=function(){$('#chatBt').removeAttr("disabled").removeAttr("data-loading");$('#chatBt').removeAttr('data-online').attr('data-offline',"")
if(!loadWithoutOpenChat){$('#helpdesk').core_reveal("open")}
$('[data-chatstatus]').html("{t}No disponible{/t}")}
$('#chatBt').attr("disabled","disabled")
$('#chatBt').attr('data-loading','')
launchChatScripts(zopimToken,zopim,{"callback":zopimCallback,"failedCallback":zopimFailedCallback});$('#chatBt').removeClass('has-messages');$('#chatBt [data-btText]').html(strings.chat)}else{if($('#chatBt[data-online]').length>0){$zopim.livechat.window.show()}else if($('#chatBt[data-offline]').length>0){$('#helpdesk').core_reveal("open")}}}
function roundNumber(number){return Math.round(number*100)/100}
function factorial(n){if(n<0){return 1}
if(n==0||n==1){return 1}
return n*factorial(n-1)}
function pad_with_zeros(number,length){var my_string=''+number;while(my_string.length<length){my_string='0'+my_string}
return my_string}
function isValidField(formElem,arrayOfElemFields){var elemParsedCount=0;var errors=!1;$(arrayOfElemFields).each(function(e,v){if($(v).length>0){$(formElem).foundation('validateInput',$(v));if(typeof $(v).attr('data-invalid')!="undefined"){errors=!0}
elemParsedCount++}else{return!1}})
if(elemParsedCount>0&&!errors){return!0}else{return!1}}
function countersEvents(options){var min=1;var max=99;var dec=0;var elem=!1;var step=1;var calculatePurchaseOptionsAfterRemCallback=function(){};var calculatePurchaseOptionsAfterAddCallback=function(){};var previousValue=!1;if(typeof options.min!="undefined"){min=options.min}
if(typeof options.max!="undefined"){max=options.max}
if(typeof options.elem!="undefined"){elem=options.elem}
if(typeof options.decimals!="undefined"){dec=options.decimals}
if(typeof options.step!="undefined"){step=options.step}
if(elem){var remElem=$(elem).find('[data-rem]');var addElem=$(elem).find('[data-add]');var counterElem=$(elem).find('[data-counter]')}else{var remElem=$('[data-rem]');var addElem=$('[data-add]');var counterElem=$('[data-counter]')}
$(remElem).off('click.counterEvents').on('click.counterEvents',function(){var returnedDecs="";var countElem=$(this).parent().find('[data-counter]');if($(countElem).is('input')){var isInput=!0;var elemValue=$(countElem).val()}else{var isInput=!1;var elemValue=$(countElem).text()}
if(parseFloat(elemValue)>min&&(parseFloat(elemValue)-step)>min){if(dec>0){returnedDecs="."+getDecValue(elemValue,dec)}
if(isInput){if(dec==0){$(countElem).val(parseInt(elemValue)-step);$(countElem).val($(countElem).val()+returnedDecs)}else{$(countElem).val(parseFloat(elemValue)-parseFloat(step))}}else{if(dec==0){$(countElem).text(parseInt($(countElem).text())-step);$(countElem).text($(countElem).text()+returnedDecs)}else{$(countElem).text(parseFloat($(countElem).text())-parseFloat(step))}}}else{if(isInput){$(countElem).val(min)}else{$(countElem).text(min)}}
if(typeof options.calculatePurchaseOptionsAfterRemCallback!=="undefined"){options.calculatePurchaseOptionsAfterRemCallback($(this))}
$(counterElem).blur()});$(counterElem).off('keydown.counterEvents').on('keydown.counterEvents',function(e){if(e.keyCode==38){$(addElem).click();$(this).focus()}else if(e.keyCode==40){$(remElem).click();$(this).focus()}})
$(counterElem).off('keydown.counterEvents').on('keydown.counterEvents',function(e,elem){var countElem=$(e.target);var countElemVal=$(countElem).val();var key=e.key;var hasDec=!1;if($(countElem).is('input')){var isInput=!0}else{var isInput=!1}
if(e.keyCode==38){$(addElem).click();$(this).focus()}else if(e.keyCode==40){$(remElem).click();$(this).focus()}else if(e.keyCode==46||e.keyCode==8||e.keyCode==37||e.keyCode==39||e.keyCode==16){return!0}else if(e.keyCode==13){$(this).blur()}else if(key.match(/[^0-9.]/g)){return!1}else{if(key.match(/[.]/g)){if(isInput){if(countElemVal.indexOf('.')==-1){return!0}}else{if(countElemVal.text().indexOf('.')==-1){return!0}}}else{var posDecimal=$(countElem).val().indexOf('.');var startPos=$(counterElem)[0].selectionStart;var endPos=$(counterElem)[0].selectionEnd;if(posDecimal!=-1){if(startPos==endPos){if(startPos>posDecimal+dec){return!1}else if(startPos>posDecimal){if(countElemVal.substr(posDecimal+1,countElemVal.length).length>=dec){return!1}}else{var proposedValue=countElemVal;var output=[proposedValue.slice(0,startPos),key,proposedValue.slice(startPos)].join('');return checkValueValidity(output)}}else{var proposedValue=countElemVal;var output=[proposedValue.slice(0,startPos),key,proposedValue.slice(startPos)].join('');return checkValueValidity(output)}}else{var proposedValue=countElemVal;var output=[proposedValue.slice(0,startPos),key,proposedValue.slice(startPos)].join('');return checkValueValidity(output)}
return!0}}
return!1})
function evalNumber(elem){var valor=parseFloat($(elem).val());if($(elem).val()>0){if(valor>max){valor=max}else if(valor<min){valor=min}}
if($(elem).val().length==0){valor=0}
if(dec>0){valor=valor.toFixed(dec)}
return valor}
function checkValueValidity(value){var valor=parseFloat(value);if(valor<min||valor>max){return!1}
return!0}
$(counterElem).off('blur.counterEvents').on('blur.counterEvents',function(){var hadToChange=!1;var evaluatedNumber=evalNumber($(this));$(this).val(evaluatedNumber);$(this).change()})
$(counterElem).off('input.counterEvents').on('input.counterEvents',function(){var minOffset=4;var maxOffset=9;var baseClass="sm_";var classOutput="";var digitos=String($(this).val()).length
$(this).removeClass('sm_1 sm_2 sm_3 sm_4 sm_5')
if(digitos>=maxOffset){classOutput="5"}else{switch(digitos){case 5:classOutput="1"
break;case 6:classOutput="2"
break;case 7:classOutput="3"
break;case 8:classOutput="4"
break}}
$(this).parent().css('font-size',$(this).css('font-size'))
$(this).addClass(baseClass+classOutput)})
$(addElem).off('click.counterEvents').on('click.counterEvents',function(){if(typeof options.calculateMax!="undefined"){max=options.calculateMax($(this))}
var returnedDecs="";var countElem=$(this).parent().find('[data-counter]');if($(countElem).is('input')){var isInput=!0;var elemValue=$(countElem).val()}else{var isInput=!1;var elemValue=$(countElem).text()}
if(elemValue<max){if(dec>0){returnedDecs="."+getDecValue(elemValue,dec)}
if(isInput){if(dec==0){$(countElem).val(parseInt(elemValue)+step);$(countElem).val($(countElem).val()+returnedDecs)}else{$(countElem).val(parseFloat(elemValue)+parseFloat(step))}}else{if(dec==0){$(countElem).text(parseInt(elemValue)+step);$(countElem).text($(countElem).text()+returnedDecs)}else{$(countElem).text(parseFloat(elemValue)+parseFloat(step))}}
if(typeof options.calculatePurchaseOptionsAfterAddCallback!=="undefined"){options.calculatePurchaseOptionsAfterAddCallback($(this))}}
$(counterElem).blur()});function getDecValue(myStr,defaultDecs){var pos=myStr.indexOf('.');var decs="";if(pos>0){var currentDecValue=myStr.substr(pos+1,myStr.length);return currentDecValue}else{for(i=0;i<defaultDecs;i++){decs=decs+"0"}
return decs}}}
function animatedCounters(elemToAnimate){var durationMs=1500;var hasDecsWithZeros=!1;var hasDecimals=!1;var decPoint;$(elemToAnimate).each(function(){var elemValue=$(this).text();var hasDecimals=!1;var initialChars=0;if($(this).text().length==2&&$(this).text().substr(0,1)=="0"){hasDecsWithZeros=!0}
$(this).text($(this).text().replace(".",""));$(this).text($(this).text().replace(",","."));if(parseFloat($(this).text())%1!=0){hasDecimals=!0}
$(this).css('visibility','visible');$(this).prop('Counter',0).animate({Counter:$(this).text()},{duration:durationMs,easing:'swing',step:function(now){this.Counter.toString().replace("./g","");this.Counter.toString().replace(",/g",".");if(hasDecimals){this.Counter=parseFloat(now)}else{this.Counter=Math.ceil(now)}
if(hasDecsWithZeros){var decVal="0"}else{var decVal=""}
if(this.Counter%1!=0){$(this).text(this.Counter.formatMoney(2,',','.'))}else{$(this).text(this.Counter.formatMoney(0,',','.'))}
$(this).text(decVal+$(this).text())},complete:function(){$(this).text(elemValue)}})})}
String.prototype.placeHolder=function(arrayOfValues){var texto=this
if(Array.isArray(arrayOfValues)){$(arrayOfValues).each(function(k,v){var placeHolder="%"+(k+1);texto=texto.replace(new RegExp(placeHolder,'g'),v)})}else{var placeHolder="%1";texto=texto.replace(new RegExp(placeHolder,'g'),arrayOfValues)}
return texto}
function newPopUp(htmlMessage,options){var link=!1;var classes="";var icon=!1;var imgURL=!1;var interval=7;if(typeof options!="undefined"){if(typeof options.hasLinkToURL!="undefined"){link=options.hasLinkToURL}
if(typeof options.hasImgURL!="undefined"){imgURL=options.hasImgURL}
if(typeof options.hasClasses!="undefined"){classes=options.hasClasses}
if(typeof options.hasIcon!="undefined"){if(options.hasIcon=="true"){icon=!0}}
if(typeof options.timeOut!="undefined"){interval=options.timeOut}}
var htmlIMG="";if(imgURL&&!icon){var htmlIMG='<img src="'+imgURL+'" class="avatar">'}
if(icon&&!imgURL){var htmlIMG='<i></i>'}
if(link){var html='<a href="'+link+'?fromNotification=true" data-popup-notifier class="media-object is-active'+classes+'">';if(icon||imgURL){html=html+'<span class="media-object-section">'+htmlIMG+'</span>'}
html=html+'<span class="media-object-section">'+htmlMessage+'</span>'+'</a>'}else{var html='<button data-popup-notifier class="media-object is-active'+classes+'">';if(icon||imgURL){html=html+'<span class="media-object-section">'+htmlIMG+'</span>'}
html=html+'<span class="media-object-section">'+htmlMessage+'</span>'+'</button>'}
if($('body [data-popup-notifier]').length>0){$('[data-popup-notifier]').remove();if(typeof $('body').data('popup-notifier-timerId')!="undefined"){window.clearTimeout($('body').data('popup-notifier-timerId'))}}
$('body').append(html);myTimer=new Timer(function(){$('[data-popup-notifier]').removeClass('is-active');setTimeout(function(){$('[data-popup-notifier]').remove()},1500)
$('body').removeData('popup-notifier-timerId')},interval*1000);$('body').data('popup-notifier-timerId',myTimer.returnTimerId())
$('[data-popup-notifier]').on('mouseenter',function(){myTimer.pause()})
$('[data-popup-notifier]').on('mouseleave',function(){myTimer.resume()})}
function Timer(callback,delay){var timerId,start,remaining=delay;this.pause=function(){window.clearTimeout(timerId);remaining-=new Date()-start};this.resume=function(){start=new Date();window.clearTimeout(timerId);timerId=window.setTimeout(callback,remaining)};this.resume();this.returnTimerId=function(){return timerId}}
function setParticipantsPopupValues(participantsMode){$('[data-participants] button[data-open]').on('click',function(){var userId=$(this).attr('data-userId');switch(participantsMode){case "betsSummary":var elem="#betsSummary";var paramsString='"userId":"'+userId+'"';break;case "profile":var elem="#profileModal";var paramsString='"user":"'+userId+'"';break}
var parseParams=$(elem).attr('data-reveal-params');if(typeof $(elem).attr('originalParams')=="undefined"){if(typeof parseParams=="undefined"){$(elem).attr('originalParams',"")}else{$(elem).attr('originalParams',parseParams)}}else{$(elem).removeAttr('data-reveal-params').attr('data-reveal-params',$(elem).attr('originalParams'));parseParams=$(elem).attr('originalParams')}
if(typeof parseParams=="undefined"||parseParams==""){parseParams="{"+paramsString+"}"}else{parseParams=parseParams.substr(0,parseParams.length-1);parseParams=parseParams+','+paramsString+'}'}
$(elem).attr('data-reveal-params',parseParams)})}
function setChildLimiter(elem,options){var elem=$(elem);var limit=21;if($(elem).length==0){return!1}
var strings={remaining:"Mostrar %1 restantes",}
if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(options.strings.remaining!="undefined"){strings.remaining=options.strings.remaining}}
if(typeof options.limit!="undefined"){limit=options.limit}}
$(elem).each(function(){var elemento=$(this);if(typeof $(elemento).attr('data-limit')!="undefined"){limit=parseInt($(elemento).attr('data-limit'))}
var remainingElemCount=parseInt($(elemento).children().length)-parseInt(limit-1);var stringRpc=strings.remaining.replace("%1",remainingElemCount);var navigatorHTML='<p data-limiterNav><button type="button" data-showAllBt>'+stringRpc+'</button></p>'
if(typeof $(elemento).attr('data-limit')=="undefined"){$(elemento).attr('data-limit',limit)}
if($(elemento).children().length>=limit){$(elemento).children().eq(limit-1).prevAll().addClass('limit-show');$(elemento).children().eq(limit-1).nextAll().removeClass('limit-show');$(navigatorHTML).insertAfter(elemento);$(elemento).addClass('is-rendered');$(elemento).next('[data-limiterNav]').find('[data-showAllBt]').on('click',function(){$(elemento).children().addClass('limit-show');$(this).closest('[data-limiterNav]').remove()})}else{$(elemento).children().addClass('limit-show');$(elemento).addClass('is-rendered')}})}
function panelFilterScripts(){$('[name="filter"]').on('change',function(e){var rowsElem='[data-groups-summary] table tbody tr';var currentView=$('[name="filter"]');var expression=new Array();var notExpression=new Array();var andExpression=new Array();$(rowsElem).hide()
$(currentView).each(function(){var filterType=$(this).attr('data-filter');var filterValue=$(this).prop('checked');switch(filterType){case "o":var selector="[data-owner]";if(filterValue){expression.push(selector)}
break;case "g":var selector="[data-guest]";if(filterValue){expression.push(selector)}
break;case "j":var selector="[data-joined]";if(filterValue){expression.push(selector)}
break;case "p":var selector="[data-played]";if(!filterValue){notExpression.push(":not("+selector+")")}else{andExpression.push(selector);expression.push('[data-joined]')}
break}})
if(expression.length==0){expression.push('[data-joined]')}
var notExpr=notExpression.join("");var andExpr=andExpression.join("");if(expression.length==0){$(rowsElem).show()}else{$(expression).each(function(k,v){$(rowsElem+v+andExpr+notExpr).show()})}})}
function panelValidationScripts(options){var strings={sending:"{t}Enviando un email de activaciÃ³n a tu cuenta... Espera por favor{/t}"}
if(typeof options.strings!="undefined"){if(typeof options.strings.sending!="undefined"){strings.sending=options.strings.sending}}
$('[data-validateEmail]').on('click',function(){var emailModal=$("#validateEmail");sendValidateEmail(null,$(this),{strings:strings,callbackOnSuccess:function(e){$(emailModal).data('callback',function(e){launchEMailValidationScript({callbackOnSuccess:function(e,statusMsgElem){var text=$(statusMsgElem).text();var intervalo=3;$(statusMsgElem).text(text+" ("+intervalo+")");var closeInterval=setInterval(function(){intervalo--;if(intervalo==0){location.reload()}else{$(statusMsgElem).text(text+" ("+intervalo+")")}},1000)},callbackOnError:function(e){alert(e.error);$(emailModal).core_reveal('close');return!1},callbackOnFail:function(e,j,k){alert(j);$(emailModal).core_reveal('close');return!1}})})
$(emailModal).core_reveal('open',{params:{'ignoreScripts':!0}})}})})
$('[data-validatePhone]').on('click',function(){var phoneModal=$("#validatePhone");$(phoneModal).data('callback',function(e){launchPhoneValidationScript({callbackOnSuccess:function(e,statusMsgElem){var text=$(statusMsgElem).text();var intervalo=3;$(statusMsgElem).text(text+" ("+intervalo+")");var closeInterval=setInterval(function(){intervalo--;if(intervalo==0){location.reload()}else{$(statusMsgElem).text(text+" ("+intervalo+")")}},1000)}})})
$(phoneModal).core_reveal('open',{params:{'ignoreScripts':!0}})})}
var manageLibrariesConfig=function(elem,almacenObj,options){this.elem=elem;this.onRemoveMethodURL="/data/?action=removeStoredPayment";this.onRemoveMethod=function(){};this.onRemoveMethodCallback=function(){};this.onOrderChangeURL="/data/?action=reorderStoredPayment";this.onOrderChange=function(){};this.onOrderChangeCallback=function(){};this.onSelectionChangeURL="/data/?action=selectionStoredPayment";this.onSelectionChange=function(){};this.onSelectionChangeCallback=function(){};this.myStoredPaymentTypesTbody=$(elem).find('[data-myStoredPaymentMethods]').find('tbody');this.showSelectionForMethods=new Array();this.paymentMethodsOBJ=almacenObj;this.savingTimer=new Array(null,null,null);this.strings={confirmDeletion:"{t}Â¿Seguro que deseas eliminar este mÃ©todo de pago/retirada de premios?. PodrÃ¡s aÃ±adirlo de nuevo marcando la opciÃ³n de guardar al realizar una operaciÃ³n de pago o cobro de premios.{/t}",saving:"{t}Guardando... espere{/t}"}
if(typeof options!="undefined"){if(typeof options.selectablePaymentMethods!="undefined"){this.showSelectionForMethods=options.selectablePaymentMethods}
if(typeof options.strings!="undefined"){if(typeof options.strings.confirmDeletion!="undefined"){this.strings.confirmDeletion=options.strings.confirmDeletion}
if(typeof options.strings.saving!="undefined"){this.strings.saving=options.strings.saving}}}
var self=this;this.refresh()}
manageLibrariesConfig.prototype.refresh=function(){var self=this;$(self.myStoredPaymentTypesTbody).html(self.paymentMethodsOBJ.retrieveHTML({showSelectionForMethods:self.showSelectionForMethods}));bamQueue.waitForExistance("jQuery.ui",function(){$(function(){$(self.myStoredPaymentTypesTbody).each(function(k,v){$(v).find('[data-paymentmethodselector]:not([disabled])').closest('tr').attr('data-sortableItem',"")});$(self.myStoredPaymentTypesTbody).sortable({cancel:"[data-sortableitem] button,[data-sortableitem] input",items:$(self.myStoredPaymentTypesTbody).find('[data-sortableitem]'),stop:function(event,ui){var elemsArray=new Array()
$(self.myStoredPaymentTypesTbody).find('tr[data-value]').each(function(k,v){elemsArray.push($(v).attr('data-value'))});self.changeOrder(elemsArray)}});$(self.myStoredPaymentTypesTbody).disableSelection()})})
$(this.myStoredPaymentTypesTbody).find("[data-paymentMethodSelector]").off('change').on('change',function(){var currentElem=$(this).closest('tr[data-value]');var methodId=$(currentElem).attr('data-method-value');var submethodId=$(currentElem).attr('data-submethod-value');var value=$(currentElem).attr('data-value');self.changeSelection(methodId,submethodId,value,$(this).prop('checked'))})
$(this.myStoredPaymentTypesTbody).find("[data-remove]").off('change').on('click',function(){var currentElem=$(this).closest('tr[data-value]');var methodId=$(currentElem).attr('data-method-value');var submethodId=$(currentElem).attr('data-submethod-value');var value=$(currentElem).attr('data-value');var agree=confirm(self.strings.confirmDeletion);if(agree){self.removeMethod(methodId,submethodId,value)}})}
manageLibrariesConfig.prototype.getDOM=function(methodId,submethodId,id){var self=this;var returnValue=!1;var elem=$(self.myStoredPaymentTypesTbody).find('tr[data-method-value="'+methodId+'"][data-submethod-value="'+submethodId+'"][data-value="'+id+'"]');if($(elem).length>0){returnValue=elem}
return returnValue}
manageLibrariesConfig.prototype.changeOrder=function(elemsOrderArray){var self=this;clearTimeout(self.savingTimer[1]);$(self.elem).find("[data-status-msg]").html(self.strings.saving).removeClass('alert success').fadeIn();self.savingTimer[1]=setTimeout(function(){var manageLibrariesForme=new formeSubmit(!1,self.onOrderChangeURL,{statusMsg:{elem:$(self.elem).find("[data-status-msg]")},callbackOnSuccess:function(e){self.onOrderChangeCallback(e)},extraFields:{fieldsOrder:elemsOrderArray}})},1000)}
manageLibrariesConfig.prototype.removeMethod=function(methodId,submethodId,id){var self=this;clearTimeout(self.savingTimer[0]);var elem=self.getDOM(methodId,submethodId,id);$(self.elem).find("[data-status-msg]").html(self.strings.saving).removeClass('alert success').fadeIn();self.savingTimer[0]=setTimeout(function(){var manageLibrariesForme=new formeSubmit(!1,self.onRemoveMethodURL,{statusMsg:{elem:$(self.elem).find("[data-status-msg]")},submitBt:{elem:$(elem).find('[data-remove]')},callbackOnSuccess:function(e){self.onRemoveMethodCallback(e);$(elem).remove()},extraFields:{id:id}})},1000)}
manageLibrariesConfig.prototype.changeSelection=function(methodId,submethodId,id,value){var self=this;clearTimeout(self.savingTimer[2]);$(self.elem).find("[data-status-msg]").html(self.strings.saving).removeClass('alert success').fadeIn();self.savingTimer[1]=setTimeout(function(){var manageLibrariesForme=new formeSubmit(!1,self.onSelectionChangeURL,{statusMsg:{elem:$(self.elem).find("[data-status-msg]")},callbackOnSuccess:function(e){self.onSelectionChangeCallback(e)},extraFields:{id:id,value:value}})},1000)}
function payPanelEvents(){$('#addCash_tabs').on('change.zf.tabs',function(){var elem=new Foundation.Equalizer($('[data-equalizer]'),{})});countersEvents({'elem':$('[data-cashsummary]'),'max':999999,'min':0,'decimals':2});$('[name="subscription"]').on('change',function(){var itemId=$(this).attr('id');itemId=itemId.substr(24,itemId.length-24);if($(this).prop('checked')){$('#rndSwitch_item_'+itemId).closest('[data-randomSwitch]').slideDown()}else{$('#rndSwitch_item_'+itemId).closest('[data-randomSwitch]').slideUp()}})}
function launchCartScripts(options){var onSetAbonoCallback=function(){};var onUnsetAbonoCallback=function(){};var cartClearRedirectionURL=null;var strings={abonoError:"No se ha podido modificar el abono.",fondoError:"No se ha podido modificar el modo de juego.",removeWarning:"Esta acciÃ³n elimarÃ¡ todos los items del carro. Â¿EstÃ¡ Seguro?"}
if(typeof options!="undefined"){if(options.strings!="undefined"){if(options.strings.abonoError!="undefined"){strings.abonoError=options.strings.abonoError}
if(options.strings.fondoError!="undefined"){strings.fondoError=options.strings.fondoError}}
if(typeof options.onSetAbonoCallback!="undefined"){onSetAbonoCallback=options.onSetAbonoCallback}
if(typeof options.onUnsetAbonoCallback!="undefined"){onUnsetAbonoCallback=options.onUnsetAbonoCallback}
if(typeof options.cartClearRedirectionURL!="undefined"){cartClearRedirectionURL=options.cartClearRedirectionURL}}
var dataUrlFondo="/data/?action=modoItemCarro";var dataUrlAbono="/data/?action=abonoItemCarro";var dataUrlBorrarCarro="/data/?action=borrarItemCarro&item=0";$('[data-clearCart]').on('click',function(){clearCart(dataUrlBorrarCarro,$(this),cartClearRedirectionURL)})
$('[data-cartlines] input[type=checkbox]').on('change',function(){var elem=$(this);var elemType=$(this).attr('name');var item=$(this).closest('[data-cart-item]').attr('data-cart-item');if(elemType=='fund'){if($(elem).prop('checked')){setCartFondo(item,"2",dataUrlFondo)}else{setCartFondo(item,"1",dataUrlFondo)}}
if(elemType=='subscription'||elemType=='random'){var abono=0;var random=0;if($('#subscriptionSwitch_item_'+item).prop('checked')){abono=1
if($('#rndSwitch_item_'+item).prop('checked')){random=1}else{random=0}}else{abono=0
if($('#rndSwitch_item_'+item).prop('checked')){random=1}else{random=0}}
setCartAbono(item,abono,random,dataUrlAbono)}})
function setCartFondo(item,modo,dataUrl){var myForm=new formeSubmit(!1,dataUrlFondo,{extraFields:{"item":item,"modo":modo},statusMsg:{elem:$("[data-status-msg='"+item+"']"),error:strings.fondoError},callbackOnSuccess:function(e){holdCartContent(item,!1)},callbackOnFail:function(e){holdCartContent(item,!1,!0)},callbackOnError:function(){holdCartContent(item,!1,!0)}})}
function setCartAbono(item,modoAbono,modoRandom,dataUrl){holdCartContent(item);var myForm=new formeSubmit(!1,dataUrlAbono,{extraFields:{"item":item,"abono":modoAbono,"abonoRandom":modoRandom},statusMsg:{elem:$("[data-status-msg='"+item+"']"),error:strings.abonoError},callbackOnSuccess:function(e){holdCartContent(item,!1);refreshCartContent(e.data.carro);if(modoAbono){onSetAbonoCallback(e.data.carro)}else{onUnsetAbonoCallback(e.data.carro)}},callbackOnFail:function(e){holdCartContent(item,!1,!0)},callbackOnError:function(e){holdCartContent(item,!1,!0)}})}
function clearCart(dataUrl,elem,redirectionURL){if(confirm(strings.removeWarning)){holdCartContent(!1,!0);var myForm=new formeSubmit(!1,dataUrl,{statusMsg:{elem:$("[data-status-msg='cartRemoval']"),},submitBt:{elem:$(elem)},callbackOnSuccess:function(e){if(typeof redirectionURL!="undefined"&&redirectionURL!=null){window.location.href=cartClearRedirectionURL}else{location.reload()}},callbackOnFail:function(e){holdCartContent(!1,!1,!0)},callbackOnError:function(e){holdCartContent(!1,!1,!0)}})}}}
function holdCartContent(itemId,mode,reset){if(itemId){var item=$('[data-cartLines] tr[data-cart-item="'+itemId+'"]');var price=$(item).find('[data-itemPrice]')
var totalElem=$('[data-paymentarea] [data-purchasetotal] [data-counter]');var discount=$(item).find('[data-discountPrice]');if(typeof mode!="undefined"&&mode===!1){$(discount).add(price).add(totalElem).add(item).removeClass('onHold');if(typeof reset!="undefined"&&reset===!0){$(price).html($(price).data('previousValue')).removeClass('onHold');$(discount).html($(discount).data('previousValue')).removeClass('onHold');$(totalElem).html($(totalElem).data('previousValue')).removeClass('onHold')}}else{$(item).addClass('onHold');$(price).data('previousValue',$(price).html()).addClass('onHold');$(discount).data('previousValue',$(discount).html()).addClass('onHold');$(totalElem).data('previousValue',$(totalElem).html()).addClass('onHold')}}else{item=$('[data-cartLines] tr[data-cart-item]');$(item).each(function(k,v){var price=$(v).find('[data-itemPrice]')
var totalElem=$('[data-paymentarea] [data-purchasetotal] [data-counter]');var discount=$(v).find('[data-discountPrice]');if(typeof mode!="undefined"&&mode===!1){$(discount).add(price).add(totalElem).add(item).removeClass('onHold');if(typeof reset!="undefined"&&reset===!0){$(price).html($(price).data('previousValue')).removeClass('onHold');$(discount).html($(discount).data('previousValue')).removeClass('onHold');$(totalElem).html($(totalElem).data('previousValue')).removeClass('onHold')}}else{$(item).addClass('onHold');$(price).data('previousValue',$(price).html()).addClass('onHold');$(discount).data('previousValue',$(discount).html()).addClass('onHold');$(totalElem).data('previousValue',$(totalElem).html()).addClass('onHold')}})}}
function refreshCartContent(cartContentObj){var subtotal=0;$.each(cartContentObj.carro,function(k,v){var item=$('[data-cartLines] tr[data-cart-item="'+k+'"]');var price=$(item).find('[data-itemPrice]');var importe=parseFloat(v.importe).formatMoney(2,',','.')
if(typeof global_currency=="undefined"){var ppp=importe+"<small>â‚¬</small>"}else{var ppp=global_currency.getMoneda(parseFloat(v.importe),null,{wrapper:"small"})}
var priceHTML=ppp;subtotal=subtotal+parseFloat(v.importe);$(price).html(priceHTML);if(typeof global_currency=="undefined"){var importeOriginal=parseFloat(v.importeOriginal).formatMoney(2,',','.')}else{var importeOriginal=global_currency.getMoneda(parseFloat(v.importeOriginal),null,{wrapper:"small"})}
if(v.importe!=v.importeOriginal&&typeof(v.importeOriginal)!="undefined"){$(item).find('[data-discountPrice]').html(importeOriginal)}else{$(item).find('[data-discountPrice]').empty()}})
if(typeof cartContentObj.promo!="undefined"&&cartContentObj.promo!=null){var item=$('[data-cartLines] tr[data-cart-item].discount');var importeDescuento=cartContentObj.promo.importe;if(typeof global_currency=="undefined"){var ppp=importeDescuento+"<small>â‚¬</small>"}else{var ppp=global_currency.getMoneda(parseFloat(importeDescuento),null,{wrapper:"small"})}
var importeDescuentoHTML=ppp;$(item).find('[data-itemPrice]').html(importeDescuentoHTML)}else{var item=$('[data-cartLines] tr[data-cart-item].discount');$(item).fadeOut('fast',function(){$(this).remove()})}
if(subtotal==cartContentObj.importe){$('[data-cartLines] tr[data-subtotal]').fadeOut('fast',function(){$(this).remove()})}else{if(typeof global_currency=="undefined"){var ppp=parseFloat(subtotal).formatMoney(2,',','.')+"<small>â‚¬</small>"}else{var ppp=global_currency.getMoneda(parseFloat(subtotal),null,{wrapper:"small"})}
$('[data-cartLines] td[data-subtotal]').html(ppp)}
var totalElem=$('[data-cartLines] td[data-total]');if(typeof global_currency=="undefined"){var ppp=parseFloat(cartContentObj.importe).formatMoney(2,',','.')+"<small>â‚¬</small>"}else{var ppp=global_currency.getMoneda(parseFloat(cartContentObj.importe),null,{wrapper:"small"})}
var importeTotal=ppp;var importeTotalHTML=importeTotal;$(totalElem).html(importeTotalHTML)}
function enablePayMethod(state,paymentsManagerObj,paymentsObjOptions,methodsObj,methodToBlock,submethodToBlock){$(methodsObj).each(function(k,v){if(v.id==methodToBlock){$(v.limits).each(function(j,m){if(m.id==submethodToBlock){if(state==!0){m.enabled=!0}else{m.enabled=!1}}})}})
paymentsObjOptions.payMethodObj=methodsObj;var currentAmount=parseFloat(paymentsManagerObj.paymentsObj.getCurrentAmount());var currentVoucher=parseFloat(paymentsManagerObj.paymentsObj.getVoucherValue());paymentsObjOptions.cart.purchaseValue=currentAmount;paymentsObjOptions.cart.voucherValue=currentVoucher;paymentObj=new paymentsObj(paymentsManagerObj.paymentsObj.purchaseURL,paymentsObjOptions);paymentsManagerObj.attachPayMethodsObj(paymentObj)}
function enableOnlyPayMethod(state,paymentsManagerObj,paymentsObjOptions,methodsObj,methodToAllow,submethodToAllow){$(methodsObj).each(function(k,v){if(v.id==methodToAllow){$(v.limits).each(function(j,m){if(m.id==submethodToAllow){m.enabled=!0}else{if(state==!0){m.enabled=!1}else{m.enabled=!0}}})}else{if(v.id!=0){$(v.limits).each(function(j,m){if(state==!0){m.enabled=!1}else{m.enabled=!0}})}}})
paymentsObjOptions.payMethodObj=methodsObj;var currentAmount=parseFloat(paymentsManagerObj.paymentsObj.getCurrentAmount());var currentVoucher=parseFloat(paymentsManagerObj.paymentsObj.getVoucherValue());paymentsObjOptions.cart.purchaseValue=currentAmount;paymentsObjOptions.cart.voucherValue=currentVoucher;paymentObj=new paymentsObj(paymentsManagerObj.paymentsObj.purchaseURL,paymentsObjOptions);paymentsManagerObj.attachPayMethodsObj(paymentObj)}
function getPayMethodState(methodsObj,methodToBlock,submethodToBlock){$(methodsObj).each(function(k,v){if(v.id==methodToBlock){$(v.limits).each(function(j,m){if(m.id==submethodToBlock){if(state==!0){return!0}else{returnValue=!1}}})}})}
function getAbonos(cartItems){var counter=0;$.each(cartItems,function(k,v){if(v.abono!=null&&v.abono=="1"){counter ++}})
return counter}
function getPeticiones(cartItems){var counter=0;$.each(cartItems,function(k,v){if(typeof v.peticion!="undefined"&&v.peticion===!0){counter ++}})
return counter}
function purchaseSuccessCallback(e,payments,redirectionURL,options){var popUpSelector="[data-paymentsPopup]";var extraFields=null;var gatewayStrings={}
var gatewayMechantURL="data/?action=paymentManager&mode=continuePayment";var openExternalsInPopup=!0;var openGatewayInPopup=!1;var isDebug=!1;if(typeof $zopim!="undefined"&&typeof $zopim.livechat!="undefined"){$zopim.livechat.removeTags('paymentError');$zopim.livechat.removeTags('creditCardDirectLimit');$zopim.livechat.removeTags('creditCardGatewayLimit')}
on_success_functions(e,payments);if(typeof options!="undefined"){if(typeof options.extraFields!="undefined"){extraFields=options.extraFields}
if(typeof options.gatewayErrorStrings!="undefined"){gatewayStrings=options.gatewayErrorStrings}
if(typeof options.gatewayMechantURL!="undefined"){gatewayMechantURL=options.gatewayMechantURL}
if(typeof options.openExternalsInPopup!="undefined"&&options.openExternalsInPopup===!1){openExternalsInPopup=!1}
if(typeof options.openGatewayInPopup!="undefined"&&options.openGatewayInPopup===!1){openGatewayInPopup=!1}}
if(payments.isDebug()){isDebug=!0}
performActions(e,payments,redirectionURL,options);function getPaymentFormSelector(){var usedMethods=payments.paymentsObj.getLastPaymentResult();if(usedMethods.method!=null||usedMethods.submethod!=null){if(usedMethods.submethod!=null){var domElem=payments.getLimitDOMelem(usedMethods.method,usedMethods.submethod)}else{var domElem=payments.getMethodDOMelem(usedMethods.method)}
var el=$(domElem).find('form[data-payment-storage].is-active')}else{if($("[data-quickpaymanager]").length>0){var el=$("[data-quickpaymanager] form[data-payment-storage]")}}
return el}
function performActions(e,payments,redirectionURL,options){switch(e.type){case "gateway":if(typeof e.params.url!="undefined"&&e.params.url.length!=0){window.location.href=e.params.url}
break;case "formGateway":var el=getPaymentFormSelector();pgw=new paymentsGatewayManager(payments,el);pgw.setAsyncMsgElem(payments.paymentsObj.strings.redirecting);$('#formGateway').attr("action",e.params.action);$('#formGateway').empty();$.each(e.params.var,function(key,val){if(Array.isArray(val)){$.each(val,function(key2,val2){$('<input>').attr({type:'hidden',name:key,value:val2}).appendTo('#formGateway')})}else{$('<input>').attr({type:'hidden',name:key,value:val}).appendTo('#formGateway')}});if(openGatewayInPopup){var selectorToInject='[data-payment-externals]';var callbackOnClosePopup=function(){payments.refresh()}
var callbackOnLoad=function(){$(popUpSelector).find('[data-core_reveal-close]').remove()}
var width=!1;var height=!1;var iframeDom=popUpSelector+" "+selectorToInject;$(popUpSelector).attr('data-iframed','')
if($(iframeDom).find('iframe').length>0){$(iframeDom).find('iframe').remove()}
$(iframeDom).append("<iframe name='gateway' id='gateway'></iframe>");var prevStyle="";if(width){if(typeof $(popUpSelector).attr('style')!="undefined"){var prevStyle=$(popUpSelector).attr('style')}
$(popUpSelector).attr('style',prevStyle+" ;max-width:"+width+"!important")}
if(height){if(typeof $(popUpSelector).attr('style')!="undefined"){var prevStyle=$(popUpSelector).attr('style')}
$(popUpSelector).attr('style',prevStyle+" ;max-height:"+height+"!important")}
$(document).on('open.zf.reveal',popUpSelector,function(){if(!Foundation.MediaQuery.atLeast('medium')&&typeof $(popUpSelector).attr('data-iframed')!="undefined"){$(iframeDom).css('padding-top',$(popUpSelector).find('[data-modal-title]').outerHeight()+"px")}
callbackOnLoad()})
$(document).off('closed.zf.reveal',popUpSelector).on('closed.zf.reveal',popUpSelector,function(){$(iframeDom).removeAttr('style');$(popUpSelector).removeAttr('data-iframed')
callbackOnClosePopup();$(iframeDom).find('iframe').remove()})
$(popUpSelector).core_reveal('open')
$('#formGateway').prop('target','gateway');$('#formGateway').submit()}else{$('#formGateway').submit()}
break;case "externalValidation":var usedMethods=payments.paymentsObj.getLastPaymentResult();if(usedMethods.submethod!=null){var domElem=payments.getLimitDOMelem(usedMethods.method,usedMethods.submethod)}else{var domElem=payments.getMethodDOMelem(usedMethods.method)}
var cancelBt=$(domElem).find('[data-cancel-payment="externalvalidation"]');var dataStatusMsg=$(domElem).find('[data-payment-storage].is-active [data-status-msg]');var previousAnimationState=payments.getAnimation();$(domElem).find('[data-payment-externalvalidation]').addClass('is-active');payments.setAnimation(!1);payments.setPurchaseButtonAvailability(!1,usedMethods.method,usedMethods.submethod);payments.blockAllMethods(!1);payments.unblockMethod(usedMethods.method,!1);payments.setPurchaseButtonAvailability(!1,usedMethods.method,usedMethods.submethod);payments.hideInfoArea(usedMethods.method,usedMethods.submethod);payments.hidePaymentsMethods(usedMethods.method,usedMethods.submethod);$(dataStatusMsg).removeClass('success').html(payments.paymentsObj.strings.redirecting);var formx=new formeSubmit(!1,"");$(cancelBt).off('click').on('click',function(){$(dataStatusMsg).hide();payments.refresh(!1);payments.setDefaultMethod(usedMethods.method);$(domElem).find('[data-payment-externalvalidation]').removeClass('is-active');payments.showPaymentsMethods(usedMethods.method,usedMethods.submethod);payments.showInfoArea(usedMethods.method,usedMethods.submethod);payments.setPurchaseButtonAvailability(!0,usedMethods.method,usedMethods.submethod);formx.getXHR().abort();payments.setAnimation(previousAnimationState);payments.unblockAllMethods()})
break;case "sdk":var el=getPaymentFormSelector();pgw=new paymentsGatewayManager(payments,el);switch(e.params.sdk){case "threeds_paysafe":var options={}
if(e.environment=="sandbox"){options.debug=!0}
var callbackOnPaymentFailure=function(e){if(typeof e.type!="undefined"){performActions(e,payments,redirectionURL,options)}else{payments.unblockAllMethods()}}
var threeDS_obj=new threeDSPlugin_paysafe(pgw,e.params.accountId,e.params.card,e.params.apiKey,e.refPago,callbackOnPaymentFailure,options)
break;case "threeds_trustpay":var options={}
if(e.environment=="sandbox"){options.debug=!0}
var callbackOnPaymentFailure=function(e){if(typeof e.type!="undefined"){performActions(e,payments,redirectionURL,options)}else{payments.unblockAllMethods()}}
var threeDS_obj=new threeDSPlugin_trustpayments(pgw,e.params.jwt,"",e.refPago,callbackOnPaymentFailure,options);break;case "threeds_nuvei":var options={}
if(e.environment=="sandbox"){options.debug=!0}
var callbackOnPaymentFailure=function(e,scope){if(typeof e.type!="undefined"){performActions(e,payments,redirectionURL,options)}else{payments.unblockAllMethods()}}
var paymentParams={sessionToken:e.params.sessionToken,clientUID:e.refPago,paymentOption:e.params.paymentOption,cardHolderName:e.params.cardHolderName,}
var threeDS_obj=new threeDSPlugin_nuvei(pgw,e.params.merchantId,e.params.merchantSiteId,paymentParams,e.refPago,callbackOnPaymentFailure,options);break;case "paysafe_card_3ds":pgw.setAsyncMsgElem(payments.paymentsObj.strings.redirecting)
pgw.setSubmitBtState(!1);var gwOptions={card:{merchantAccountID:e.params.sdk_params.merchantAccountID,cardHolderName:e.params.sdk_params.cardHolderName,usePreviousBalance:payments.paymentsObj.isUsingPreviousBalance(),key:e.params.sdk_params.key,zip:e.params.sdk_params.zip,country:e.params.sdk_params.country,state:e.params.sdk_params.state,},company:{name:e.params.sdk_params.companyName,logoURL:e.params.sdk_params.logoURL,color:e.params.sdk_params.companyColor},currency:e.currency,onErrorCallback:function(e,error){pgw.setSubmitBtState(!0);pgw.setAsyncMsgElem(error,"alert")
payments.unblockAllMethods()},onCloseCallback:function(stage){if(stage=="BeforePayment"){$(pgw.getAsyncMsgsElem()).removeClass().html("").hide();pgw.clearAsyncMsg()}
pgw.setSubmitBtState(!0);payments.unblockAllMethods()},onSuccessCallback:function(e){if(typeof e.data.url!="undefined"&&e.data.url.length>0){window.location.href=e.data.url}},gatewayErrorStrings:gatewayStrings}
if(e.environment=="sandbox"){gwOptions.debug=!0}
var amount=payments.paymentsObj.getCurrentAmount()*100;if(typeof e!="undefined"&&typeof e.params.sdk_params.amount!="undefined"){amount=e.params.sdk_params.amount}
var gw=new cardGateway(gatewayMechantURL,amount,e.refPago,gwOptions);gw.open();break;case "adyen":var usedMethods=payments.paymentsObj.getLastPaymentResult();if(usedMethods.submethod!=null){var domElem=payments.getLimitDOMelem(usedMethods.method,usedMethods.submethod)}else{var domElem=payments.getMethodDOMelem(usedMethods.method)}
pgw.setAsyncMsgElem(payments.paymentsObj.strings.redirecting);pgw.setSubmitBtState(!1);var gwOptions={paymentMethodsResponse:e.params,clientKey:e.clientKey,locale:e.locale,environment:e.enviroment,onSubmit:(state,dropin)=>{console.log("submit",state);myForm=new formeSubmit(!1,"/data/?action=adyenPayment",{extraFields:{"state":JSON.stringify(state.data),"mode":"pay"},callbackOnSuccess:function(response){console.log("onSubmit, response",response);if(response.action){dropin.handleAction(response.action)}else{location.href=response.url}}})},onAdditionalDetails:(state,dropin)=>{console.log("addDetails",state);myForm=new formeSubmit(!1,"/data/?action=adyenPayment",{extraFields:{"state":JSON.stringify(state.data),"mode":"details"},callbackOnSuccess:function(response){console.log("onAdditionalDetails, response",response);if(response.action){dropin.handleAction(response.action)}else{location.href=response.url}}})},onError:(error)=>{console.log("error",error)},paymentMethodsConfiguration:e.paymentMethodsConfiguration};if(typeof isDebug){gwOptions.debug=!0}
$('<link/>',{rel:'stylesheet',type:'text/css',href:'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.18.1/adyen.css'}).appendTo('head');$.getScript("https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.18.1/adyen.js",function(){const checkout=new AdyenCheckout(gwOptions);if(openExternalsInPopup){var selectorToInject='[data-payment-externals]';$(popUpSelector).core_reveal("open");const dropin=checkout.create('dropin').mount(popUpSelector+" "+selectorToInject);$(document).off('closed.zf.reveal',popUpSelector).on('closed.zf.reveal',popUpSelector,function(){payments.refresh();$(popUpSelector+" "+selectorToInject).empty()})}else{if(typeof usedMethods.submethod!="undefined"&&usedMethods.submethod!=null){var selectorToInject='[data-payment-externals][data-method="'+usedMethods.method+'"][data-submethod="'+usedMethods.submethod+'"]'}else{var selectorToInject='[data-payment-externals][data-method="'+usedMethods.method+'"]'}
var selectorToInject='[data-payment-externals][data-method="'+usedMethods.method+'"][data-submethod="'+usedMethods.submethod+'"]';const dropin=checkout.create('dropin').mount(selectorToInject);$(pgw.getAsyncMsgsElem()).hide()}})
break;case "neteller":break;case "skrill":var subM=payments.getSelectedLimitId();var m=payments.getSelectedMethodId();var usedMethods={}
usedMethods.method=m;usedMethods.submethod=subM;if(usedMethods.submethod!=null){var domElem=payments.getLimitDOMelem(usedMethods.method,usedMethods.submethod)}else{var domElem=payments.getMethodDOMelem(usedMethods.method)}
pgw.setAsyncMsgElem(payments.paymentsObj.strings.redirecting);pgw.setSubmitBtState(!1);var gwOptions={skrill:{sid:e.params.sid},onErrorCallback:function(e,error){pgw.setSubmitBtState(!0);payments.unblockAllMethods();pgw.setAsyncMsgElem(error,"alert")},onCloseCallback:function(stage){if(stage=="BeforePayment"){pgw.clearAsyncMsg()}
pgw.setSubmitBtState(!0)},onSuccessCallback:function(e){if(typeof e.url!="undefined"&&e.url.length>0){window.location.href=e.url}},onGatewayLoadCallback:function(e){$(pgw.getAsyncMsgsElem()).remove();if(!openExternalsInPopup){$(pgw.getSubmitBtElem()).remove()}},gatewayErrorStrings:gatewayStrings,render:{}}
if(typeof isDebug){gwOptions.debug=!0}
if(!openExternalsInPopup){if(typeof usedMethods.submethod!="undefined"&&usedMethods.submethod!=null){var selectorToInject='[data-payment-externals][data-method="'+usedMethods.method+'"][data-submethod="'+usedMethods.submethod+'"]'}else{var selectorToInject='[data-payment-externals][data-method="'+usedMethods.method+'"]'}
gwOptions.render.selectorToInject=selectorToInject}else{var selectorToInject='[data-payment-externals]';gwOptions.render.openInPopup={method:usedMethods.method,submethod:usedMethods.submethod,callbackOnClosePopup:function(){payments.refresh()}}
gwOptions.render.selectorToInject=selectorToInject}
if(typeof e.environment!="undefined"&&e.environment==="production"){gwOptions.debug=!1}else{gwOptions.debug=!0}
var gw=new cardGateway(gatewayMechantURL,amount,e.refPago,gwOptions);gw.open();break;case "nuvei_gateway":var usedMethods=payments.paymentsObj.getLastPaymentResult();if(usedMethods.submethod!=null){var domElem=payments.getLimitDOMelem(usedMethods.method,usedMethods.submethod)}else{var domElem=payments.getMethodDOMelem(usedMethods.method)}
pgw.setAsyncMsgElem(payments.paymentsObj.strings.redirecting);Pgw.setSubmitBtState(!1);var gwOptions={nuvei_gateway:e.params.data,gatewayErrorStrings:"",render:{}}
if(e.environment=="sandbox"){gwOptions.debug=!0}
if(!openExternalsInPopup){if(typeof usedMethods.submethod!="undefined"&&usedMethods.submethod!=null){var selectorToInject='[data-payment-externals][data-method="'+usedMethods.method+'"][data-submethod="'+usedMethods.submethod+'"]'}else{var selectorToInject='[data-payment-externals][data-method="'+usedMethods.method+'"]'}
gwOptions.render.selectorToInject=selectorToInject}else{var selectorToInject='[data-payment-externals]';gwOptions.render.openInPopup={method:usedMethods.method,submethod:usedMethods.submethod,injectionMethod:"iframe",width:"720px",callbackOnClosePopup:function(){payments.refresh()}}
gwOptions.render.selectorToInject=selectorToInject}
var gw=new cardGateway(gatewayMechantURL,e.params.data.total_amount,e.params.id,gwOptions);gw.open();break;case "nuvei_sdk":var stage=null;var usedMethods=payments.paymentsObj.getLastPaymentResult();if(usedMethods.submethod!=null){var domElem=payments.getLimitDOMelem(usedMethods.method,usedMethods.submethod)}else{var domElem=payments.getMethodDOMelem(usedMethods.method)}
pgw.setAsyncMsgElem(payments.paymentsObj.strings.redirecting);pgw.setSubmitBtState(!1);var refPago=e.refPago;var gwOptions={nuvei_sdk:{sessionToken:e.data.sessionToken,merchantId:e.data.merchantId,merchantSiteId:e.data.merchantSiteId,userTokenId:e.data.userTokenId,country:e.country,currency:e.currency,renderTo:"",env:"prod",locale:e.locale,email:e.email,fullName:e.fullname,pmWhitelist:["cc_card"],showResponseMessage:!1},onErrorCallback:function(e,error){},onCloseCallback:function(){if(stage==null){payments.unblockAllMethods();payments.refresh()}
if(stage=="completeWithErrors"){pgw.setSubmitBtState(!0);payments.unblockAllMethods()}},onSuccessCallback:function(params){var myForm=new formeSubmit(!1,"/data/?action=updatePaymentStatus",{extraFieldsAsPost:params,callbackOnSuccess:function(response){if(typeof response.url!="undefined"){location.href=response.url}}})
if(params.status=="ok"){pgw.setAsyncMsgElem(payments.paymentsObj.strings.paymentDone,"success");stage="completeWithoutErrors"}else{pgw.setAsyncMsgElem(params.error,"alert");stage="completeWithErrors";if(openExternalsInPopup){gwOptions.render.openInPopup.callbackOnClosePopup=function(){}}}},onGatewayLoadCallback:function(e){if(!openExternalsInPopup){$(pgw.getSubmitBtElem()).remove()}},onResultCallback:function(e){if(e.result.toUpperCase()=="APPROVED"){gwOptions.onSuccessCallback({transactionID:refPago,status:"ok"})}else{gwOptions.onSuccessCallback({transactionID:refPago,status:"error",error:e.errorDescription+"("+e.errCode+")"})
gwOptions.callbackOnClosePopup=function(){}}},gatewayErrorStrings:gatewayStrings,render:{}}
gwOptions.nuvei_sdk.onResult=function(e){gwOptions.onResultCallback(e)}
if(typeof isDebug){gwOptions.debug=!0;gwOptions.nuvei_sdk.env="int"}
if(!openExternalsInPopup){if(typeof usedMethods.submethod!="undefined"&&usedMethods.submethod!=null){var selectorToInject='[data-payment-externals][data-method="'+usedMethods.method+'"][data-submethod="'+usedMethods.submethod+'"]'}else{var selectorToInject='[data-payment-externals][data-method="'+usedMethods.method+'"]'}
gwOptions.render.selectorToInject=selectorToInject}else{var selectorToInject='[data-payment-externals]';gwOptions.render.openInPopup={method:usedMethods.method,submethod:usedMethods.submethod,injectionMethod:"html",callbackOnClosePopup:function(){gwOptions.onCloseCallback()},allowClose:!0}
gwOptions.render.selectorToInject=selectorToInject}
if(typeof e.debug!="undefined"&&e.debug===!1){gwOptions.debug=!1}
if(typeof e!="undefined"&&typeof e.importe!="undefined"){amount=e.importe}
gwOptions.nuvei_sdk.amount=amount/100;var gw=new cardGateway(gatewayMechantURL,amount,e.refPago,gwOptions);gw.open();break;case "astropay":var statusMsg=pgw.getAsyncMsgsElem();var depositId=e.params.depositId;var refPago=e.refPago;if(typeof window.AstropaySDK=="undefined"){$.getScript("https://js.astropay.com/v1/sdk.js",function(){window.AstropaySDK.init(e.params.appId,{"environment":e.environment});window.AstropaySDK.showDeposit(depositId);pgw.clearAsyncMsg();pgw.setAsyncMsgElem(payments.paymentsObj.strings.wait);$(statusMsg).show();pgw.setSubmitBtState(!1)})}else{window.AstropaySDK.showDeposit(depositId);pgw.clearAsyncMsg();pgw.setAsyncMsgElem(payments.paymentsObj.strings.wait);pgw.setSubmitBtState(!1);$(statusMsg).show()}
var style="<style>#astro-container {z-index:999} </style>";$('head').append(style);$(document).off('DOMNodeRemoved').on('DOMNodeRemoved',function(e){if(e.target.localName=="div"&&typeof $(e.target).attr('id')!="undefined"&&$(e.target).attr('id')=="astro-container"){var elem=e.target
pgw.setSubmitBtState(!1);var checkTransactionStatus=new formeSubmit(!1,"/data/?action=checkPaymentStatus",{sendDataAsJSON:!0,extraFields:{refPago:refPago},statusMsg:{elem:$(statusMsg),hold:payments.paymentsObj.strings.wait},callbackOnSuccess:function(j){if(typeof j.data.pagado!="undefined"&&j.data.pagado===!0){if(typeof j.data.url!="undefined"){window.location.href=j.data.url;pgw.setAsyncMsgElem(payments.paymentsObj.strings.paymentDone,"success")
$(statusMsg).show()}}else{payments.unblockAllMethods();pgw.clearAsyncMsg();pgw.setSubmitBtState(!0)}},callbackOnFail:function(j){payments.unblockAllMethods();pgw.setSubmitBtState(!0)}})}});break}
break;default:if(typeof e.url=="undefined"||(typeof e.url!="undefined"&&e.url.length==0)){if(extraFields!=null){var serialized=$.param(extraFields)
if(redirectionURL.indexOf("/?")==-1){redirectionURL=redirectionURL+"/?"+serialized}else{redirectionURL=redirectionURL+"&"+serialized}}
window.location.href=redirectionURL}}}}
function purchaseFailCallback(e,payments,redirectionURL){if(typeof $zopim!="undefined"&&typeof $zopim.livechat!="undefined"){$zopim.livechat.addTags('paymentError')}
payments.unblockAllMethods();on_fail_functions(e,payments)}
var oneClickPurchase=function(toCartURL,tramos,tramosArray,currentCartItems,options){this.URL=toCartURL;this.tramos=!1;this.tramosArray={};this.currentCartItems=null;this.strings={"wait":"{t}Espere{/t}"}
this.elem=$('[data-oneclickpurchase]:visible');this.min=0;this.max=99;if(typeof tramos!="undefined"&&tramos!=!1){this.tramos=tramos}
if(typeof tramosArray!="undefined"&&tramosArray!=!1){this.tramosArray=tramosArray}
if(typeof currentCartItems!="undefined"&&currentCartItems!=!1){this.currentCartItems={};this.parseCartItems(currentCartItems)}
if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(typeof options.strings.wait!="undefined"){this.strings.wait=options.strings.wait}}
if(typeof options.min!="undefined"){this.min=options.min}
if(typeof options.max!="undefined"){this.max=options.max}}
this.typeGameTabs={boleto:"1",club:"4",decimo:"1",fondo:"2"};this.typeBets={};this.refresh()}
oneClickPurchase.prototype.parseCartItems=function(cartItemsObj){var self=this;$.each(cartItemsObj,function(k,v){if(typeof self.currentCartItems[v.tipo]!="undefined"){if(typeof v.tipoSorteoLoteria!="undefined"){if(typeof self.currentCartItems[v.tipo].subTipos[v.tipoSorteoLoteria]!="undefined"){self.currentCartItems[v.tipo].subTipos[v.tipoSorteoLoteria]=self.currentCartItems[v.tipo].subTipos[v.tipoSorteoLoteria]+parseFloat(v.apuestas*v.semanas)}else{self.currentCartItems[v.tipo].subTipos[v.tipoSorteoLoteria]=parseFloat(v.apuestas*v.semanas)}}else{self.currentCartItems[v.tipo].subTipos[0]=self.currentCartItems[v.tipo].subTipos[0]+parseFloat(v.apuestas*v.semanas)}}else{self.currentCartItems[v.tipo]={}
self.currentCartItems[v.tipo].subTipos={}
if(typeof v.tipoSorteoLoteria!="undefined"){self.currentCartItems[v.tipo].subTipos[v.tipoSorteoLoteria]=parseFloat(v.apuestas*v.semanas)}else{self.currentCartItems[v.tipo].subTipos[0]=parseFloat(v.apuestas*v.semanas)}}})}
oneClickPurchase.prototype.getCartBets=function(game,subtype){var self=this;var subtipo=!1;if(self.currentCartItems==null){return 0}
if(typeof subtype!="undefined"&&subtype!==!1){subtipo=subtype}else{subtipo=0}
var self=this;if(typeof self.currentCartItems[game]!="undefined"){return self.currentCartItems[game].subTipos[subtipo]}else{return 0}}
oneClickPurchase.prototype.refresh=function(){var self=this;var calculatePurchaseOptionsAdd=function(object){var valor=null;var counterElem=$(object).closest("[data-purchase-gametype]").find("[data-counter]");if($(counterElem)[0].nodeName=='INPUT'){valor=parseInt($(counterElem).val())}else{valor=parseInt($(counterElem).text())}
if((valor)<=self.max){var typeGame=$(object).closest("[data-purchase-gametype]").attr("data-purchase-gametype");var subtype=!1;if(typeof $(object).closest("[data-purchase-gamesubtype]").attr("data-purchase-gamesubtype")!="undefined"){subtype=$(object).closest("[data-purchase-gamesubtype]").attr("data-purchase-gamesubtype")}
var game=$(object).closest("[data-purchase-game]").attr("data-purchase-game");var price=$(object).closest("[data-purchase-price]").attr("data-purchase-price");var min=$(object).closest("[data-purchase-min]").attr("data-purchase-min");if(typeof(self.typeBets[self.typeGameTabs[typeGame]])=="undefined")self.typeBets[self.typeGameTabs[typeGame]]={};if(typeof(self.typeBets[self.typeGameTabs[typeGame]][game])=="undefined")self.typeBets[self.typeGameTabs[typeGame]][game]=0;if(min>1&&valor==1){self.typeBets[self.typeGameTabs[typeGame]][game]+=1;if($(counterElem)[0].nodeName=='INPUT'){$(counterElem).val(min)}else{$(counterElem).text(min)}}
self.typeBets[self.typeGameTabs[typeGame]][game]+=1;if(self.tramos&&typeof self.tramos[game]!="undefined"){if(typeof self.tramosArray[game].descuentosObj!="undefined"){var currentTramo=self.tramosArray[game].getCurrentTramo(self.getAllBetsFromGame(game)+self.getCartBets(game,subtype))}else{var currentTramo=!1}
if(currentTramo!==!1){$(self.elem).find("[data-purchase-game="+game+"]").attr("data-purchase-price",self.tramosArray[game].descuentosObj.tramos[currentTramo-1].precioPorApuesta)}else{$(self.elem).find("[data-purchase-game="+game+"]").attr("data-purchase-price",self.tramosArray[game].precioPorDefecto)}}
refreshPrice()}}
var calculatePurchaseOptionsRem=function(object){var valor=null;var counterElem=$(object).closest("[data-purchase-gametype]").find("[data-counter]");if($(counterElem)[0].nodeName=='INPUT'){valor=parseInt($(counterElem).val())}else{valor=parseInt($(counterElem).text())}
if(valor>=self.min){var typeGame=$(object).closest("[data-purchase-gametype]").attr("data-purchase-gametype");var subtype=!1;if(typeof $(object).closest("[data-purchase-gametype]").attr("data-purchase-gamesubtype")!="undefined"){subtype=$(object).closest("[data-purchase-gamesubtype]").attr("data-purchase-gamesubtype")}
var game=$(object).closest("[data-purchase-game]").attr("data-purchase-game");var price=$(object).closest("[data-purchase-price]").attr("data-purchase-price");var min=$(object).closest("[data-purchase-min]").attr("data-purchase-min");if(typeof(self.typeBets[self.typeGameTabs[typeGame]])=="undefined")self.typeBets[self.typeGameTabs[typeGame]]={};if(typeof(self.typeBets[self.typeGameTabs[typeGame]][game])=="undefined")self.typeBets[self.typeGameTabs[typeGame]][game]=0;if(self.min>valor){self.typeBets[self.typeGameTabs[typeGame]][game]=1;if($(counterElem)[0].nodeName=='INPUT'){$(counterElem).val(self.min)}else{$(counterElem).text(self.min)}}else{if(valor>=self.min||self.min==0){if(self.typeBets[self.typeGameTabs[typeGame]][game]>self.min){self.typeBets[self.typeGameTabs[typeGame]][game]-=1}}}
if(self.tramos&&typeof self.tramos[game]!="undefined"){if(typeof self.tramosArray[game].descuentosObj!="undefined"){var currentTramo=self.tramosArray[game].getCurrentTramo(self.getAllBetsFromGame(game)+self.getCartBets(game,subtype))}else{var currentTramo=!1}
if(currentTramo!==!1){$(self.elem).find("[data-purchase-game="+game+"]").attr("data-purchase-price",self.tramosArray[game].descuentosObj.tramos[currentTramo-1].precioPorApuesta)}else{$(self.elem).find("[data-purchase-game="+game+"]").attr("data-purchase-price",self.tramosArray[game].precioPorDefecto)}}
refreshPrice()}}
function refreshPrice(){var totalPrice=0;var totalDefaultPrice=0;for(var dataInfo in self.typeBets){for(var dataInfoType in self.typeBets[dataInfo]){var price=$(self.elem).find("[data-purchase-game="+dataInfoType+"]").attr("data-purchase-price");var bets=self.typeBets[dataInfo][dataInfoType];myDecimoPurchaseOptionsRefresh=new purchaseOptions(0,0);totalPrice+=myDecimoPurchaseOptionsRefresh.calculatePrice(bets,!1,price);if(self.tramos&&typeof self.tramos[dataInfoType]!="undefined"){var defaultPrice=self.tramosArray[dataInfoType].precioPorDefecto;totalDefaultPrice+=myDecimoPurchaseOptionsRefresh.calculatePrice(bets,!1,defaultPrice)}else{var defaultPrice=price;totalDefaultPrice+=myDecimoPurchaseOptionsRefresh.calculatePrice(bets,!1,price)}}}
if(totalPrice<totalDefaultPrice){myDecimoPurchaseOptionsRefresh.priceWithoutDiscount=parseFloat(totalDefaultPrice).toFixed(2);updatePriceLabels(myDecimoPurchaseOptionsRefresh,!0)}else{updatePriceLabels(null,!0,!0)}
if(totalPrice>0){myDecimoPurchaseOptionsRefresh.setCanBuy(!0)}else{myDecimoPurchaseOptionsRefresh.setCanBuy(!1)}
totalPrice=Math.round(totalPrice*100)/100;if(typeof global_currency=="undefined"){var ppp=totalPrice.toFixed(2).replace(".",",")+"â‚¬"}else{var ppp=global_currency.getMoneda(parseFloat(totalPrice.toFixed(2)),null,{wrapper:"small"})}
$(self.elem).find("[data-purchase-total]").html(ppp)}
countersEvents({'elem':$(self.elem).find('[data-gametype]'),'max':self.max,'min':self.min,'calculatePurchaseOptionsAfterAddCallback':calculatePurchaseOptionsAdd,'calculatePurchaseOptionsAfterRemCallback':calculatePurchaseOptionsRem});$(self.elem).find('[data-purchase-button]').off('click').on('click',function(){var urlCart=self.URL;myForm=new formeSubmit(!1,"/data/?action=toCart",{extraFields:{"bets":JSON.stringify(self.typeBets),"fastMode":1},redirectURL:urlCart,submitBt:{elem:$(this),holdMsg:self.strings.wait},statusMsg:{elem:$(this).closest("[data-oneClickPurchase]").find("[data-status-msg]")}})})}
oneClickPurchase.prototype.getAllBetsFromGame=function(gameId){var self=this;var totalBets=0;$.each(self.typeBets,function(){if(typeof this[gameId]!="undefined"){totalBets+=this[gameId]}})
return totalBets}
oneClickPurchase.prototype.setCartItems=function(newCart){if(typeof newCart!="undefined"&&newCart!=!1){this.cartItems=newCart;this.currentCartItems={}
this.parseCartItems(newCart)}}
oneClickPurchase.prototype.recalculateTramos=function(){var self=this;$(self.elem).find("[data-purchase-game]").each(function(){var game=$(this).attr("data-purchase-game");var subtype=$(this).attr("data-purchase-gamesubtype");if(self.tramos&&typeof self.tramos[game]!="undefined"){if(typeof self.tramosArray[game].descuentosObj!="undefined"){var currentTramo=self.tramosArray[game].getCurrentTramo(self.getAllBetsFromGame(game)+self.getCartBets(game,subtype))}else{var currentTramo=!1}
if(currentTramo!==!1){$(self.elem).find("[data-purchase-game="+game+"]").attr("data-purchase-price",self.tramosArray[game].descuentosObj.tramos[currentTramo-1].precioPorApuesta)}else{$(self.elem).find("[data-purchase-game="+game+"]").attr("data-purchase-price",self.tramosArray[game].precioPorDefecto)}}})}
oneClickPurchase.prototype.refreshPrice=function(){var self=this;var totalPrice=0;var totalDefaultPrice=0;if(Object.keys(self.typeBets).length>0){for(var dataInfo in self.typeBets){for(var dataInfoType in self.typeBets[dataInfo]){var price=$(self.elem).find("[data-purchase-game="+dataInfoType+"]").attr("data-purchase-price");var bets=self.typeBets[dataInfo][dataInfoType];self.myDecimoPurchaseOptionsRefresh=new purchaseOptions(0,0);totalPrice+=self.myDecimoPurchaseOptionsRefresh.calculatePrice(bets,!1,price);if(self.tramos&&typeof self.tramos[dataInfoType]!="undefined"){var defaultPrice=self.tramosArray[dataInfoType].precioPorDefecto;totalDefaultPrice+=self.myDecimoPurchaseOptionsRefresh.calculatePrice(bets,!1,defaultPrice)}else{var defaultPrice=price;totalDefaultPrice+=self.myDecimoPurchaseOptionsRefresh.calculatePrice(bets,!1,price)}}}
if(totalPrice<totalDefaultPrice){self.myDecimoPurchaseOptionsRefresh.priceWithoutDiscount=parseFloat(totalDefaultPrice).toFixed(2).replace(".",",");updatePriceLabels(self.myDecimoPurchaseOptionsRefresh,!0)}else{updatePriceLabels(null,!0,!0)}
if(totalPrice>0){self.myDecimoPurchaseOptionsRefresh.setCanBuy(!0)}else{self.myDecimoPurchaseOptionsRefresh.setCanBuy(!1)}
totalPrice=Math.round(totalPrice*100)/100;if(typeof global_currency=="undefined"){var ppp=totalPrice.toFixed(2).replace(".",",")+"â‚¬"}else{var ppp=global_currency.getMoneda(parseFloat(totalPrice.toFixed(2)),null,{wrapper:"small"})}
$(self.elem).find("[data-purchase-total]").html(ppp)}}
function launchLoginScripts(){var login=new loginProObject}
function recoverScript(formElem,actionURL,options){var formElem=$(formElem);var actionURL=actionURL;var ajaxObjParams=!1;if(typeof options!="undefined"){if(typeof options.ajaxObjParams!="undefined"){ajaxObjParams=options.ajaxObjParams}}
$(formElem).on("submit",function(ev){ev.preventDefault()});$(formElem).off('formvalid.zf.abide.bam').on('formvalid.zf.abide.bam',function(){ajaxObjParams.callbackOnSuccess=function(){$('#recoverFields').addClass("hide")}
myForm=new formeSubmit($(formElem),"/data/?action=recover",ajaxObjParams)})}
function setNewPassword(formElem,actionURL,options){var formElem=$(formElem);var actionURL=actionURL;var ajaxObjParams=!1;if(typeof options!="undefined"){if(typeof options.ajaxObjParams!="undefined"){ajaxObjParams=options.ajaxObjParams}}
$(formElem).on("submit",function(ev){ev.preventDefault()});$(formElem).off('formvalid.zf.abide.bam').on('formvalid.zf.abide.bam',function(){myForm=new formeSubmit($(formElem),actionURL,ajaxObjParams)})}
function launchDoubleFactorScripts(elemForCounter,timerInSeconds){function setTimeoutCounter(secondsToTimeout,callbackPerIteration,callbackAtEnd){var finishSeconds=secondsToTimeout;var currentSeconds=secondsToTimeout;var intervalo=setInterval(function(){currentSeconds--;if(currentSeconds>0){callbackPerIteration(currentSeconds)}else{callbackAtEnd();clearInterval(intervalo)}},1000)}
function showAlernate(state){var elem=$('[data-alternativeMethods]');if(state===!0){$(elem).addClass('is-active');$(elem).find('button').removeAttr('disabled')}else if(state===!1){$(elem).removeClass('is-active');$(elem).find('button').attr('disabled','disabled')}}
function isAlternateVisible(){if($('[data-alternativeMethods]').hasClass("is-active")){return!0}else{return!1}}
var btElem=$(elemForCounter)
var btText=$(btElem).text();setTimeoutCounter(timerInSeconds,function(counterValue){$(btElem).text(btText+" ("+counterValue+")")},function(){$(btElem).text(btText);showAlernate(!0)})
$('[data-validationform]').on('submit',function(e){e.preventDefault();myForm=new formeSubmit($('[data-validationForm]'),"/data/?action=deviceValidation",{extraFields:{"lv-code":$('[name="lv-code"]').val()},callbackOnSuccess:function(e){window.location.href=e.panel},callbackOnFail:function(e){if(!isAlternateVisible){showAlernate(!0)}}})})
function resendCode(mode){function bloqueosTodo(modoBloqueo){var btElem=$('[data-validationForm] [data-submitSMS]');var prevText=$(btElem).html();if(modoBloqueo===!0){holdBt($('[data-validationForm] [data-submitSMS]'),prevText)}else if(modoBloqueo===!1){unholdBt($('[data-validationForm] [data-submitSMS]'))}
var btElem=$('[data-validationForm] [data-submitEmail]');var prevText=$(btElem).html();if(modoBloqueo===!0){holdBt($('[data-validationForm] [data-submitEmail]'),prevText)}else if(modoBloqueo===!1){unholdBt($('[data-validationForm] [data-submitEmail]'))}}
bloqueosTodo(!0);myForm=new formeSubmit(!1,"/data/?action=deviceValidationResendCode",{extraFields:{"mode":mode},statusMsg:{elem:$('[data-validationForm] [data-status-msg]')},callbackOnSuccess:function(e){bloqueosTodo(!1)},callbackOnFail:function(e){bloqueosTodo(!1)},callbackOnError:function(){bloqueosTodo(!1)}})}
$('[data-submitEmail]').on('click',function(){resendCode('email')})
$('[data-submitSMS]').on('click',function(){resendCode('sms')})
$('[data-explanatoryBt]').on('click',function(){$('[data-explanatory]').addClass('is-active')})}
function launchSignUpScripts(){var login=new signUpObject}
var signUpObject=function(options){this.onStep1Success_callback=function(){};this.onStep2Success_callback=function(){};this.onFail_callback=function(){}
this.onUserNotApplicable_callback=function(){};this.onLoad_callback=function(){};this.disabledFinishOnLoad=!1;this.redirectToPanelOnSuccess=!0;this.loginObj=!1;this.onValidatePhoneCode_callback=function(){}
this.onValidateMailCode_callback=function(){}
this.onValidatePhone_callback=function(){}
this.onValidateMail_callback=function(){}
this.useSingleStep=!1;this.strings={holdOn:"Espere...",creating:"Creando tu cuenta ...",unknownError:"Error desconocido"}
var parentObj=this;if(typeof options!="undefined"){if(typeof options.onStep1Success_callback!="undefined"){this.onStep1Success_callback=options.onStep1Success_callback}
if(typeof options.onStep2Success_callback!="undefined"){this.onStep2Success_callback=options.onStep2Success_callback}
if(typeof options.onFail_callback!="undefined"){this.onFail_callback=options.onFail_callback}
if(typeof options.onUserNotApplicable_callback!="undefined"){this.onUserNotApplicable_callback=onUserNotApplicable_callback}
if(typeof options.onLoad_callback!="undefined"){this.onLoad_callback=options.onLoad_callback}
if(typeof options.redirectToPanelOnSuccess!="undefined"){this.redirectToPanelOnSuccess=options.redirectToPanelOnSuccess}
if(typeof options.disabledFinishOnLoad!="undefined"){this.disabledFinishOnLoad=options.disabledFinishOnLoad}
if(typeof options.loginObj!="undefined"){this.loginObj=options.loginObj}
if(typeof options.onValidatePhoneCode_callback!="undefined"){this.onValidatePhoneCode_callback=options.onValidatePhoneCode_callback}
if(typeof options.onValidateMailCode_callback!="undefined"){this.onValidateMailCode_callback=options.onValidateMailCode_callback}
if(typeof options.onValidatePhone_callback!="undefined"){this.onValidatePhone_callback=options.onValidatePhone_callback}
if(typeof options.onValidateMail_callback!="undefined"){this.onValidateMail_callback=options.onValidateMail_callback}
if(typeof options.useSingleStep!="undefined"){if(options.useSingleStep===!1||options.useSingleStep===!0){this.useSingleStep=options.useSingleStep}}
if(typeof options.strings!="undefined"){if(typeof options.strings.holdOn!="undefined"){this.strings.holdOn=options.strings.holdOn}
if(typeof options.strings.creating!="undefined"){this.strings.creating=options.strings.creating}
if(typeof options.strings.unknownError!="undefined"){this.strings.unknownError=options.strings.unknownError}}}
$('form[data-abide][data-signupForm]').off('submit.bam').on('submit.bam',function(ev,frm){ev.preventDefault()})
customLabelEvents();Foundation.Abide.defaults.patterns.phoneNumber=/^[0-9\s\.\-]{9,}$/;Foundation.Abide.defaults.patterns.dni_passport=/^[A-Za-z]?[0-9\.?\s?]*\-?[A-Za-z]$/;var parentObj=this;parentObj.onLoad_callback();if(this.disabledFinishOnLoad){this.setButtonAvailability(!1)}else{this.setButtonAvailability(!0)}
$('[data-pepSubmit]').off('click').on('click',function(){$(this).slideUp(function(){$(this).remove()});$('[data-pepDetails]').addClass('is-active')})
$('#emailValidation-step2 [data-resend]').off('click').on('click',function(){new formeSubmit(!1,"/data/?action=resendValidateMail",{submitBt:{elem:$(this),enableOnSuccess:!0},statusMsg:{elem:$('#emailValidation-step2 [data-status-msg3]')}})})
if(!this.useSingleStep){$('#signup-form-step1').off('formvalid.zf.abide.bam').on('formvalid.zf.abide.bam',function(){var key=$('#signup-form-step1 [data-recaptcha]').attr('data-key')
$('#signup-form-step1 [data-submit]').attr('disabled','')
$.getScript('https://www.google.com/recaptcha/api.js?render='+key).done(function(){grecaptcha.ready(function(){grecaptcha.execute(key,{action:'login'}).then(function(token){$('#signup-form-step1 [data-recaptchaResponse]').val(token)
$('#signup-form-step1 [data-submit]').removeAttr('disabled')
var step1forme=new formeSubmit($('#signup-form-step1'),"/data/?action=signup",{submitBt:{elem:$('#signup-form-step1 [data-submit]'),holdMsg:parentObj.strings.holdOn},statusMsg:{elem:$("#signup-form-step1 [data-status-msg]"),error:parentObj.strings.unknownError},callbackOnSuccess:function(e){$('#signup-form-step1').find('.registrationPanel').fadeOut(function(){$(this).removeClass('is-active');$('#registerStep2').fadeIn(function(){$(this).addClass('is-active')})})
parentObj.onStep1Success_callback(e)}})})})})});$('#signup-form-step2').off('formvalid.zf.abide.bam').on('formvalid.zf.abide.bam',function(){var key=$('#signup-form-step2 [data-recaptcha]').attr('data-key')
$('#signup-form-step2 [data-submit]').attr('disabled','')
grecaptcha.ready(function(){grecaptcha.execute(key,{action:'login'}).then(function(token){$('#signup-form-step2 [data-recaptchaResponse]').val(token)
$('#signup-form-step2 [data-submit]').removeAttr('disabled')
var step2forme=new formeSubmit($('#signup-form-step2'),"/data/?action=signup",{submitBt:{elem:$('#signup-form-step2 [data-submit]'),holdMsg:parentObj.strings.holdOn},statusMsg:{elem:$("#signup-form-step2 [data-status-msg]"),ok:parentObj.strings.creating,error:parentObj.strings.unknownError},callbackOnSuccess:function(e){parentObj.onStep2Success_callback();if(parentObj.redirectToPanelOnSuccess){window.location.href=e.panel}
$('body').attr('data-logged','')},callbackOnFail:function(e){parentObj.onFail_callback()}})})})})}else{$('#signup-form-step1').off('formvalid.zf.abide.bam').on('formvalid.zf.abide.bam',function(){var key=$('#signup-form-step1 [data-recaptcha]').attr('data-key')
$('#signup-form-step1 [data-submit]').attr('disabled','')
$.getScript('https://www.google.com/recaptcha/api.js?render='+key).done(function(){grecaptcha.ready(function(){grecaptcha.execute(key,{action:'login'}).then(function(token){$('#signup-form-step1 [data-recaptchaResponse]').val(token)
$('#signup-form-step1 [data-submit]').removeAttr('disabled')
var step1forme=new formeSubmit($('#signup-form-step1'),"/data/?action=signup",{submitBt:{elem:$('#signup-form-step1 [data-submit]'),holdMsg:parentObj.strings.holdOn},statusMsg:{elem:$("#signup-form-step1 [data-status-msg]"),ok:parentObj.strings.creating,error:parentObj.strings.unknownError},callbackOnSuccess:function(e){parentObj.onStep2Success_callback();if(parentObj.redirectToPanelOnSuccess){window.location.href=e.panel}
$('body').attr('data-logged','')},callbackOnFail:function(e){parentObj.onFail_callback()}})})})})})}
$('[data-submitValidate]').on('click',function(){var elToValidate='#'+$(this).attr('data-submitValidate');var myForm=$(this).closest('form[data-abide]');if(isValidField($(myForm),$('[data-baseForm] [required]').add('#signup_email'))){var id=$(elToValidate).attr('id');if(id=="signup_email"){var formElem=$(this).closest('[data-validationBoxes]');var statusMsg=$(formElem).find('[data-status-msg2]');var submitBt2=$(this);$(myForm).foundation('validateInput',$('#signup_email'));var errors=!1;if(typeof $('#signup_email').attr('data-invalid')!="undefined"){errors=!0;unholdBt($(submitBt2))}
if(!errors){var formValidateEmail=new formeSubmit(!1,"/data/?action=signup",{extraFields:objectifyForm($(this).closest("form").serializeArray()),submitBt:{elem:$('[data-submitvalidate="signup_email"]'),holdMsg:"...",enableOnSuccess:!0},statusMsg:{elem:$(statusMsg)},callbackOnSuccess:function(e){$('[data-form-email-helper]').text($('#signup_email').val());$('#emailValidation-step1').fadeOut(function(){$(this).removeClass('is-active');$('#emailValidation-step2').fadeIn(function(){$(this).addClass('is-active')})})
parentObj.onValidateMail_callback()},callbackOnFail:function(e){$('#signup_email').attr('data-invalid',"");checkButtonAvailability();parentObj.onFail_callback();if(parentObj.loginObj){$(statusMsg).find("a").replaceWith("<button data-loginSignUp>"+$(statusMsg).find("a").html()+"</button>")
$("[data-loginSignUp]").on("click",function(){parentObj.loginObj.open()})}}})}}
if(id=="signup_phone"){if(isValidField($(myForm),new Array($('#signup_phoneCountry'),$('#signup_phone')))){var formElem=$(myForm);var statusMsg=$(formElem).find('[data-status-msg3]');requestValCodePhone=new formeSubmit(!1,"/data/?action=validatePhone",{extraFields:objectifyForm($(formElem).serializeArray()),submitBt:{elem:$('[data-submitvalidate="signup_phone"]'),holdMsg:"...",enableOnSuccess:!0},statusMsg:{elem:$(statusMsg)},callbackOnSuccess:function(e){validationRequestSuccess("phone");$(formElem).find('#validate_signup_email').attr('required','')
checkButtonAvailability();parentObj.onValidatePhone_callback()},callbackOnFail:function(e){$('#signup_phone').attr('data-invalid',"");parentObj.onFail_callback();checkButtonAvailability()}})}}
if(id=="validate_phoneCode"){if(isValidField($(myForm),$('#validate_phoneCode'))){var codeVal=$('#validate_phoneCode').val();var extraFieldsVal=objectifyForm($(formElem).serializeArray());extraFieldsVal.validate_phoneCode=codeVal;checkValCodePhone=new formeSubmit(!1,"/data/?action=validatePhoneCode",{extraFields:extraFieldsVal,submitBt:{elem:$(this),holdMsg:"...",enableOnSuccess:!0},statusMsg:{elem:$('#phoneValidation-step2 [data-status-msg3]')},callbackOnSuccess:function(e){validationCodeSuccess("phone");parentObj.setButtonAvailability(!0);parentObj.onValidatePhoneCode_callback()},callbackOnFail:function(e){parentObj.onFail_callback()}})}}
if(id=="validate_signup_email"){if(isValidField($(myForm),$('#validate_signup_email'))){var codeVal=$('#validate_signup_email').val();var extraFieldsVal=objectifyForm($(formElem).serializeArray());extraFieldsVal.validate_signup_email=codeVal;checkValCodeMail=new formeSubmit(!1,"/data/?action=validateMailCode",{extraFields:extraFieldsVal,submitBt:{elem:$(this),holdMsg:"...",enableOnSuccess:!0},statusMsg:{elem:$('#emailValidation-step2 [data-status-msg3]')},callbackOnSuccess:function(e){validationCodeSuccess("email");parentObj.onValidateMailCode_callback()},callbackOnFail:function(e){parentObj.onFail_callback()}})}}}
function checkButtonAvailability(){var submitBt=$('#signup-form-step1').find('[data-submit]');if(typeof $('#signup_phoneCountry').attr('data-invalid')=="undefined"&&typeof $('#signup_phone').attr('data-invalid')=="undefined"&&typeof $('#signup_email').attr('data-invalid')=="undefined"){$(this).find('#validate_signup_phone').attr('required','')
$(submitBt).removeAttr('disabled');$('#registerStep1 > [data-abide-error][data-status-msg').hide()}else{$(this).find('#validate_signup_phone').removeAttr('required','')
$(submitBt).attr('disabled','disabled')}}})
$('[data-validationBoxesBack]').on('click',function(){var validationStep1Elem=$('#'+$(this).attr('data-validationBoxesBack'))
var validationStep2Elem=$(this).closest('[data-validationBoxes]')
var validationStep1MsgElem=$(validationStep1Elem).find('[data-status-msg2]')
validationRollback($(validationStep1Elem),$(validationStep2Elem),$(validationStep1MsgElem),!0);var submitBt=$('#signup-form-step1').find('[data-submit]');$(submitBt).attr('disabled','disabled');$('#registerStep1 > [data-abide-error][data-status-msg').hide()})
$('[data-stepBack]').on('click',function(){$('#registerStep2').fadeOut(function(){$(this).removeClass('is-active');$('#registerStep1').fadeIn()})})}
signUpObject.prototype.setButtonAvailability=function(mode){var submitBt=$('#signup-form-step1').find('[data-submit]');if(mode){$(submitBt).removeAttr('disabled')}else{$(submitBt).attr('disabled','disabled')}}
var loginProObject=function(options){this.loginFormElem="#loginForm";this.onSuccess_callback=function(){};this.onFail_callback=function(){};this.beforeOpen_callback=function(){};this.afterOpen_callback=function(){};this.afterClose_callback=function(){};this.delayCallbackOnSuccess=2000;this.delayCallbackOnFail=2000;this.recoveryLinkElem="[data-recoverLink]";this.recoveryLinkURL="/recuperar/";this.signupLink=!0;this.signupLinkElem="[data-signUpLink]";this.signupLinkURL=!1;this.onSignupClick_callback=function(){}
this.defaultModalElem="#loginModal";this.defaultModalSrc="login";this.defaultModalRecoverElem="#recoverModal";this.defaultRecoverySrc="recoverModal";this.closeModalOnSuccess=!0;this.redirectOnSuccessURL=!1;this.autoRedirectOnSuccess=!1;this.autoRedirectOnSuccessDataSrc="panel";this.actionURL="/data/?action=login";this.FBactionURL="/data/?action=fbLogin";this.FBactionIOSURL="/data/?action=fbLoginIOS";this.ajaxObjParams=!1;this.enableFBlogin=!0;this.FBLoginIOS=!1;this.fbUserData=!1;this.isModal=!1;this.iOSfBLoginToken=!1;this.loginUserData=!1
this.recaptchaKey=!1;this.recaptchaValue=!1;this.recaptchaValueDefaultFieldName="g-recaptcha-response"
if(typeof options!="undefined"){if(typeof options.loginFormElem!="undefined"){this.loginFormElem=options.loginFormElem}
if(typeof options.onSuccess_callback!="undefined"){this.onSuccess_callback=options.onSuccess_callback}
if(typeof options.onFail_callback!="undefined"){this.onFail_callback=options.onFail_callback}
if(typeof options.beforeOpen_callback!="undefined"){this.beforeOpen_callback=options.beforeOpen_callback}
if(typeof options.afterOpen_callback!="undefined"){this.afterOpen_callback=options.afterOpen_callback}
if(typeof options.afterClose_callback!="undefined"){this.afterClose_callback=options.afterClose_callback}
if(typeof options.delayCallbackOnSuccess!="undefined"){this.delayCallbackOnSuccess=options.delayCallbackOnSuccess}
if(typeof options.delayCallbackOnFail!="undefined"){this.delayCallbackOnFail=options.delayCallbackOnFail}
if(typeof options.recoveryLinkElem!="undefined"){this.recoveryLinkElem=options.recoveryLinkElem}
if(typeof options.recoveryLinkURL!="undefined"){this.recoveryLinkURL=options.recoveryLinkURL}
if(typeof options.signupLink!="undefined"){this.signupLink=options.signupLink}
if(typeof options.signupLinkElem!="undefined"){this.signupLinkElem=options.signupLinkElem}
if(typeof options.signupLinkURL!="undefined"){this.signupLinkURL=options.signupLinkURL}
if(typeof options.onSignupClick_callback!="undefined"){this.onSignupClick_callback=options.onSignupClick_callback}
if(typeof options.redirectOnSuccessURL!="undefined"){this.redirectOnSuccessURL=options.redirectOnSuccessURL}
if(typeof options.autoRedirectOnSuccess!="undefined"){this.autoRedirectOnSuccess=options.autoRedirectOnSuccess}
if(typeof options.autoRedirectOnSuccessDataSrc!="undefined"){this.autoRedirectOnSuccessDataSrc=options.autoRedirectOnSuccessDataSrc}
if(typeof options.defaultModalElem!="undefined"){this.defaultModalElem=options.defaultModalElem}
if(typeof options.defaultModalSrc!="undefined"){this.defaultModalSrc=options.defaultModalSrc}
if(typeof options.defaultModalRecoverElem!="undefined"){this.defaultModalRecoverElem=options.defaultModalRecoverElem}
if(typeof options.defaultRecoverySrc!="undefined"){this.defaultRecoverySrc=options.defaultRecoverySrc}
if(typeof options.closeModalOnSuccess!="undefined"){this.closeModalOnSuccess=options.closeModalOnSuccess}
if(typeof options.actionURL!="undefined"){this.actionURL=options.actionURL}
if(typeof options.ajaxObjParams!="undefined"){this.ajaxObjParams=options.ajaxObjParams}
if(typeof options.enableFBlogin!="undefined"){this.enableFBlogin=options.enableFBlogin}
if(typeof options.FBLoginIOS!="undefined"){this.FBLoginIOS=options.FBLoginIOS}
if(typeof options.iOSfBLoginToken!="undefined"){this.iOSfBLoginToken=options.iOSfBLoginToken}
if(typeof options.recaptchaKey!="undefined"){var self=this
this.recaptchaKey=options.recaptchaKey
var btElem=!1
if(self.ajaxObjParams){if(typeof self.ajaxObjParams.submitBt.elem!="undefined"){btElem=self.ajaxObjParams.submitBt.elem}}else{if(self.loginFormElem){if($(self.loginFormElem).find("[data-submit]").length>0){btElem=$(self.loginFormElem).find("[data-submit]")}}}
$(btElem).attr('disabled','disabled')
$.getScript('https://www.google.com/recaptcha/api.js?render='+this.recaptchaKey,function(){grecaptcha.ready(function(){if(btElem){$(btElem).removeAttr('disabled')}})})}
if(typeof options.recaptchaValue!="undefined"){this.recaptchaValue=options.recaptchaValue}
if(typeof options.recaptchaValueDefaultFieldName!="undefined"){this.recaptchaValueDefaultFieldName=options.recaptchaValueDefaultFieldName}}
this.loginProccessInProgress=!1;this.loginProccessInProgressInterval=!1;var parentObj=this;$(this.loginFormElem).off("submit").on("submit",function(e){e.preventDefault();if(!parentObj.loginProccessInProgress){parentObj.loginProccessInProgress=!0;parentObj.send(parentObj.ajaxObjParams);clearInterval(parentObj.loginProccessInProgressInterval);parentObj.loginProccessInProgressInterval=setTimeout(function(){parentObj.loginProccessInProgress=!1},1000)}
return!1})
this.attachRecovery();if(this.enableFBlogin){if($('[data-btFBLogin]').length>0){$('[data-btFBLogin]').off('click').on('click',function(){parentObj.fBLogin(FB)})}}
if($(this.loginFormElem).length>0){$(this.loginFormElem).data('loginObj',this)}}
loginProObject.prototype.open=function(options){parentObj=this;var callbackEvents=function(){var loginObj=parentObj;var loginFormElem=loginObj.loginFormElem;loginFormElem=$(parentObj.loginFormElem);$(loginFormElem).data('loginObj',parentObj)
$(loginFormElem).off("submit").on("submit",function(){if(loginObj.recaptchaKey){grecaptcha.ready(function(){grecaptcha.execute(loginObj.recaptchaKey,{action:'login'}).then(function(token){loginObj.recaptchaValue=token
loginObj.send(parentObj.ajaxObjParams)})})}else{loginObj.send(parentObj.ajaxObjParams)}
return!1})
$(loginFormElem).off("submit").on("submit",function(){loginObj.send(parentObj.ajaxObjParams);return!1})
loginObj.attachRecovery();if(loginObj.signupLink){if(loginObj.signupLinkURL){$(loginObj).find(loginObj.signupLinkElem).attr('href',loginObj.signupLinkURL)}
$(loginObj).find(parentObj.signupLinkElem).on('click',function(){loginObj.onSignupClick_callback()})}
if(loginObj.enableFBlogin){if($('[data-btFBLogin]').length>0){$('[data-btFBLogin]').off('click').on('click',function(){if(!loginObj.FBLoginIOS){loginObj.fBLogin(FB)}else{if(typeof(Android)!="undefined"){Android.fbLogin(parentObj.loginFormElem)}else{try{webkit.messageHandlers.fbLoginOnIOS.postMessage(parentObj.loginFormElem)}catch(err){console.log('The native context does not exist yet',err)}}}})}}
if(parentObj.recaptchaKey){var btElem=!1
if(loginObj.ajaxObjParams){if(typeof loginObj.ajaxObjParams.submitBt.elem!="undefined"&&$(loginObj.ajaxObjParams.submitBt.elem).length>0){btElem=loginObj.ajaxObjParams.submitBt.elem}else{if(loginObj.loginFormElem){if($(loginObj.loginFormElem).find("[data-submit]").length>0){btElem=$(loginObj.loginFormElem).find("[data-submit]")}}}}else{if(loginObj.loginFormElem){if($(loginObj.loginFormElem).find("[data-submit]").length>0){btElem=$(loginObj.loginFormElem).find("[data-submit]")}}}
$(btElem).attr('disabled','disabled')
grecaptcha.ready(function(){if(btElem){$(btElem).removeAttr('disabled')}})}}
$(parentObj.defaultModalElem).attr('data-reveal-source',parentObj.defaultModalSrc)
$(parentObj.defaultModalElem).attr('data-reveal-params',"{\"showSignUp\":"+parentObj.signupLink+"}")
$(parentObj.defaultModalElem).data('callback',callbackEvents);parentObj.beforeOpen_callback();$(parentObj.defaultModalElem).core_reveal("open");this.isModal=!0}
loginProObject.prototype.close=function(options){var parentObj=this;if(this.isModal){$(parentObj.defaultModalElem).core_reveal("close");parentObj.afterClose_callback()}}
loginProObject.prototype.send=function(ajaxObjOptions,options){var parentObj=this;var ajaxObjOpt=!1;var ajaxCallbackFn=!1;var ajaxCallbackFailFn=!1;var successCallbackFn=!1;var failCallbackFn=!1;var autoRedirectOnSuccess=!1;var autoRedirectOnSuccessSrc=!1;var performFBLogin=!1;var performIOSFBLoginWithToken=!1;if(typeof options!="undefined"){if(options.performFBLogin!="undefined"){performFBLogin=options.performFBLogin}
if(options.performIOSFBLoginWithToken!="undefined"){performIOSFBLoginWithToken=options.performIOSFBLoginWithToken}}
if(typeof ajaxObjOptions!="undefined"&&typeof ajaxObjOptions.callbackOnSuccess!="undefined"){ajaxCallbackFn=ajaxObjOptions.callbackOnSuccess;ajaxObjOpt=ajaxObjOptions}
if(typeof parentObj.onSuccess_callback!="undefined"){successCallbackFn=parentObj.onSuccess_callback}
if(typeof ajaxObjOptions!="undefined"&&typeof ajaxObjOptions.callbackOnFail!="undefined"){ajaxCallbackFailFn=ajaxObjOptions.callbackOnFail;ajaxObjOpt=ajaxObjOptions}
if(typeof parentObj.onFail_callback!="undefined"){failCallbackFn=parentObj.onFail_callback}
if(parentObj.autoRedirectOnSuccess){autoRedirectOnSuccess=parentObj.autoRedirectOnSuccess}
if(parentObj.autoRedirectOnSuccessDataSrc){autoRedirectOnSuccessSrc=parentObj.autoRedirectOnSuccessDataSrc}
function paramSucessCallbackFn(callbackFromAjax,callbackFromSuccess,e,autoRedirectOnSuccess,autoRedirectOnSuccessSrc){setTimeout(function(){var autoRedirectURL=!1;if(typeof e[autoRedirectOnSuccessSrc]!="undefined"){autoRedirectURL=e[autoRedirectOnSuccessSrc]}
if(callbackFromAjax){callbackFromAjax(e)}
if(callbackFromSuccess){callbackFromSuccess(e)}
$('body').attr('data-logged','');if(parentObj.closeModalOnSuccess){parentObj.close()}
if(autoRedirectOnSuccess&&autoRedirectURL){setTimeout(function(){window.location=autoRedirectURL;return!1},10)}
if(e.data!="undefined"){parentObj.loginUserData=e.data}},parentObj.delayCallbackOnSuccess)}
function paramFailCallbackFn(callbackFromAjax,callbackFromFail,e){setTimeout(function(){if(callbackFromAjax){callbackFromAjax(e)}
if(callbackFromFail){callbackFromFail(e)}},parentObj.delayCallbackOnFail)}
var paramRedirectURL=parentObj.redirectOnSuccessURL;var paramSucessCallback=function(e){paramSucessCallbackFn(ajaxCallbackFn,successCallbackFn,e,autoRedirectOnSuccess,autoRedirectOnSuccessSrc)};var paramFailCallback=function(e){paramFailCallbackFn(ajaxCallbackFailFn,failCallbackFn,e)};if(ajaxObjOptions){ajaxObjOpt=ajaxObjOptions;ajaxObjOpt.callbackOnSuccess=paramSucessCallback;ajaxObjOpt.callbackOnFail=paramFailCallback;ajaxObjOpt.redirectURL=paramRedirectURL}else{ajaxObjOpt={callbackOnSuccess:paramSucessCallback,callbackOnFail:paramFailCallback,redirectURL:paramRedirectURL}}
if(performIOSFBLoginWithToken){this.sendFBLogin(ajaxObjOpt,{"performIOSFBLoginWithToken":performIOSFBLoginWithToken})}else if(performFBLogin==!0){this.sendFBLogin(ajaxObjOpt)}else{if(parentObj.recaptchaKey){grecaptcha.ready(function(){grecaptcha.execute(parentObj.recaptchaKey,{action:'login'}).then(function(token){parentObj.recaptchaValue=token
if(typeof ajaxObjOpt.extraFields=="undefined"){ajaxObjOpt.extraFields={}}
ajaxObjOpt.extraFields[parentObj.recaptchaValueDefaultFieldName]=parentObj.recaptchaValue
myForm=new formeSubmit($(parentObj.loginFormElem),parentObj.actionURL,ajaxObjOpt)})})}else{myForm=new formeSubmit($(parentObj.loginFormElem),parentObj.actionURL,ajaxObjOpt)}}}
loginProObject.prototype.attachRecovery=function(options){var parentObj=this;$(parentObj.defaultModalRecoverElem).attr('data-reveal-source',parentObj.defaultRecoverySrc)
$(parentObj.recoveryLinkElem).on("click",function(e){e.preventDefault()})
if(parentObj.isModal){$(parentObj.recoveryLinkElem).on("click",function(){$(parentObj.defaultModalRecoverElem).core_reveal("open");parentObj.close()})}else{$(parentObj.recoveryLinkElem).on("click",function(){window.location.href=parentObj.recoveryLinkURL})}}
loginProObject.prototype.sendFBLogin=function(ajaxObjOptions,options){var parentObj=this;var successCallbackFn=!1;var autoRedirectOnSuccess=!1;var autoRedirectOnSuccessSrc=!1;var ajaxObjOpt=!1;var paramRedirectURL=parentObj.redirectOnSuccessURL;var performIOSFBLoginWithToken=!1;if(typeof parentObj.onSuccess_callback!="undefined"){successCallbackFn=parentObj.onSuccess_callback}
if(parentObj.autoRedirectOnSuccess){autoRedirectOnSuccess=parentObj.autoRedirectOnSuccess}
if(parentObj.autoRedirectOnSuccessDataSrc){autoRedirectOnSuccessSrc=parentObj.autoRedirectOnSuccessDataSrc}
if(typeof ajaxObjOptions!="undefined"){ajaxObjOpt=ajaxObjOptions;ajaxObjOpt.redirectURL=paramRedirectURL;ajaxObjOpt.submitBt=parentObj.ajaxObjParams.submitBt}
if(typeof options!="undefined"){if(options.performIOSFBLoginWithToken!="undefined"){performIOSFBLoginWithToken=options.performIOSFBLoginWithToken}}
if(!performIOSFBLoginWithToken){FB.login(function(response){if(response.status==='connected'){FB.api('/me?fields=email,name',function(response){ajaxObjOpt.extraFields=response;var currentCb=ajaxObjOpt.callbackOnSuccess;var newCallback=function(e){if(typeof e.data.fbData!='undefined'){parentObj.fbUserData=e.data.fbData}
if(typeof e.data!='undefined'){parentObj.loginUserData=e.data}
if(typeof Android!=='undefined'){if(typeof Android.getRegId==="function")Android.getRegId(data.data.id);if(typeof Android.setUserLoggedStatus==="function")Android.setUserLoggedStatus(1)}else{manageGcm(1)}
currentCb(e);$('body').data('fbId',e.data.fbId).attr('data-logged','')}
ajaxObjOpt.callbackOnSuccess=newCallback;parentObj.delayCallbackOnSuccess=!1;myForm=new formeSubmit(!1,parentObj.FBactionURL,ajaxObjOpt)})}else if(response.status==='not_authorized'){alert("Debes autorizar la aplicaciÃ³n en Facebook para proceder")}else{alert("Ha ocurrido un error al intentar conectar con Facebook")}},{scope:'public_profile,user_friends,email,user_birthday'})}else if(performIOSFBLoginWithToken){ajaxObjOpt.extraFields={"token":performIOSFBLoginWithToken}
var currentCb=ajaxObjOpt.callbackOnSuccess;var newCallback=function(e){$('body').data('fbId',e.data.fbId).attr('data-logged','');checkSocialOnIOS(4,e.data.id);currentCb(e)}
ajaxObjOpt.callbackOnSuccess=newCallback;parentObj.delayCallbackOnSuccess=!1;myForm=new formeSubmit(!1,parentObj.FBactionIOSURL,ajaxObjOpt)}}
loginProObject.prototype.fBLogin=function(){var parentObj=this;if(!parentObj.FBLoginIOS){this.send(this.ajaxObjParams,{'performFBLogin':!0})}else{if(typeof(Android)!="undefined"){Android.fbLogin(parentObj.loginFormElem)}else{try{webkit.messageHandlers.fbLoginOnIOS.postMessage(parentObj.loginFormElem)}catch(err){console.log('The native context does not exist yet')}}}}
loginProObject.prototype.fBLoginIOS=function(token){var fbToken=!1;if(typeof token=="undefined"){fbToken=this.iOSfBLoginToken}else{fbToken=token}
this.send(this.ajaxObjParams,{'performIOSFBLoginWithToken':fbToken})}
loginProObject.prototype.getFBuserData=function(){return this.fbUserData}
loginProObject.prototype.getLoginUserData=function(){return this.loginUserData}
function launchFBLoginIosFromAPP(loginFormElemSelector,token){var loginInstance=$(loginFormElemSelector).data('loginObj');loginInstance.fBLoginIOS(token)}
function IOS_sendLoginAppMsg(loginStatus){var message;if(loginStatus){message=loginStatus}else{message="ko"}
try{webkit.messageHandlers.loginListener.postMessage(message)}catch(err){console.log('The native context does not exist yet')}}
function IOS_sendMenuContent(menuContentJSON,avatarURL){message=menuContentJSON;try{webkit.messageHandlers.menuContent.postMessage(message);if(typeof avatarURL!="undefined"&&avatarURL!=null&&avatarURL!=""){webkit.messageHandlers.avatar.postMessage(avatarURL)}}catch(err){console.log('The native context does not exist yet')}}
function IOS_sendCartContent(cartContent,cartURL){try{webkit.messageHandlers.cartContent.postMessage(cartContent);if(typeof cartURL!="undefined"&&cartURL!=null){webkit.messageHandlers.cartURL.postMessage(cartURL)}}catch(err){console.log('The native context does not exist yet')}}
function IOS_sendAboutToLoginAppMsg(){try{webkit.messageHandlers.loginInProgressListener.postMessage("true")}catch(err){console.log('The native context does not exist yet')}}
function IOS_sendAppDomain(domainName){try{webkit.messageHandlers.appDomain.postMessage(domainName)}catch(err){console.log('The native context does not exist yet')}}
function IOS_sendGlobals(globalsJSON){try{webkit.messageHandlers.globals.postMessage(globalsJSON)}catch(err){console.log('The native context does not exist yet')}}
function IOS_toggleNotifications(){if(typeof core_reveal!="undefined"){$('[data-open="myNotifications"]').core_reveal('open')}}
function IOS_toggleAlerts(){if(typeof Foundation!="undefined"){$('#notifications').toggleClass('is-active');openNotificationsBox()}}
function IOS_checkBiometricCapabilities(){try{webkit.messageHandlers.checkBiometricCapabilities.postMessage(!0)}catch(err){console.log('The native context does not exist yet',err)}}
function IOS_checkBiometricCapabilitiesCallback(value){if(value===!0){$('body').attr('data-canUseBiometrics',!0)}else{$('body').attr('data-canUseBiometrics',!1)}}
function areBiometricsUsable(){if(typeof $('body').attr('data-canUseBiometrics')!="undefined"&&$('body').attr('data-canUseBiometrics')=="true"){return!0}else{return!1}}
function APP_fetchContacts(deviceType,callbackOnSuccess,callbackOnError){switch(deviceType){case "iOS":try{webkit.messageHandlers.retrieveContactsJSON.postMessage(!0)}catch(err){console.log('The native context does not exist yet',err)}
break;case "android":break}
bamQueue.waitForExistance("APP_contactsObj",function(){if(APP_contactsObj.status){if(typeof callbackOnSuccess!="undefined"){callbackOnSuccess(APP_contactsObj)}}else if(!APP_contactsObj.status&APP_contactsObj.error!=null){if(typeof callbackOnError!="undefined"){callbackOnError(APP_contactsObj)}}},1000,10)}
function APP_retrieveContactsCallback(contactsAsJSON,error){if(typeof error!="undefined"){APP_contactsObj={status:!1,contacts:null,error:error}}else{APP_contactsObj={status:!0,contacts:contactsAsJSON,error:null}
return contactsAsJSON}
return!1}
function validationRollback(step1ContainerElem,step2ContainerElem,step1MsgElem,clearState){var elRollBackTo=step1ContainerElem;var currentBox=step2ContainerElem;var statusMsg=step1MsgElem;if(clearState){$(currentBox).find('input[type="text"]').val('')}
$(statusMsg).hide();$(currentBox).fadeOut(function(){$(this).removeClass('is-active');$(elRollBackTo).fadeIn(function(){$(this).addClass('is-active')})})}
function validationRequestSuccess(type){switch(type){case "phone":$('[data-form-phone-helper]').text("+"+$('#signup_phoneCountry').val()+" "+$('#signup_phone').val());$('#validate_phoneCode').attr('required','');$('#phoneValidation-step1').fadeOut(function(){$(this).removeClass('is-active');$('#phoneValidation-step2').fadeIn(function(){$(this).addClass('is-active')})})
break;case "email":$('[data-form-email-helper]').text($('#signup_email').val());$('#emailValidation-step1').fadeOut(function(){$(this).removeClass('is-active');$('#emailValidation-step2').fadeIn(function(){$(this).addClass('is-active')})})
break;case "loggedUserEmail":$('[data-form-email-helper]').text($('#signup_email').val());$(this).removeClass('is-active');$('[data-validationboxesback="emailValidation-step1"]').remove()
break}}
function validationCodeSuccess(type){switch(type){case "phone":$('#phoneValidation-step1 [data-validationboxesinfo] p').html($('#phoneValidation-step2 [data-status-msg3]').html())
$('#phoneValidation-step1 input#signup_phone').attr('readonly','readonly');$('#phoneValidation-step1 #validatePhoneSMS').add("#phoneValidation-step1 #validatePhoneCall").add("#phoneValidation-step1 #signup_phoneCountry").attr('disabled','disabled');$('#phoneValidation-step1 #validatePhoneSMS').parent().addClass('disabled');$("#phoneValidation-step1 #validatePhoneCall").parent().addClass('disabled');$('#phoneValidation-step1 .input-group-button').remove();$('#phoneValidation-step2 [data-validationboxesback]').remove()
if($("#phoneValidation-step2").closest('[data-reveal]').length==0){validationRollback($('#phoneValidation-step1'),$('#phoneValidation-step2'),$('#validatePhone [data-status-msg2]'),!1)}
$('.form-error').removeClass('is-visible');$('#registerStep1 [data-abide-error]').hide();break;case "email":if($("#emailValidation-step2").closest('[data-reveal]').length==0){validationRollback($("#emailValidation-step1"),$("#emailValidation-step2"),$("#emailValidation-step1").find('[data-status-msg2]'),!1)}
$('#emailValidation-step1 [data-validationboxesinfo] p').html($('#emailValidation-step2 [data-status-msg3]').html())
$('#emailValidation-step1 input#signup_email').attr('readonly','readonly');$('#emailValidation-step1 .input-group-button').remove();$('#emailValidation-step2 [data-validationboxesback]').remove()
$('#phoneValidation-step1[data-validationboxes]').removeClass('disabled')
$('#phoneValidation-step1[data-validationboxes] input').add('#phoneValidation-step1[data-validationboxes] select').add('#phoneValidation-step1[data-validationboxes] button').removeAttr('disabled')
$('[data-accountsMethods]').fadeOut(function(){$(this).remove()})
$('.form-error').removeClass('is-visible');$('#registerStep1 [data-abide-error]').hide();break;case "facebook":$('.form-error').removeClass('is-visible');$('#registerStep1 [data-abide-error]').hide();validationCodeSuccess("email");$('#emailValidation-step1 [data-validationboxesinfo]').hide();$('#signup_email').add('#validate_signup_email').attr('disabled','disabled').removeAttr('required');break;case "facebookPhone":$('.form-error').removeClass('is-visible');$('#registerStep1 [data-abide-error]').hide();validationCodeSuccess("phone");$('#phoneValidation-step1 [data-validationboxesinfo]').hide();$('#signup_phone').add('#signup_phoneCountry').add('#validate_phoneCode').attr('disabled','disabled').removeAttr('required');break}}
function launchPhoneValidationScript(options){var callbackOnSuccessValidation=null;if(typeof options!="undefined"){if(typeof options.callbackOnSuccess!="undefined"){callbackOnSuccessValidation=options.callbackOnSuccess}}
Foundation.Abide.defaults.patterns.phoneNumber=/^[0-9\s\.\-]{9,}$/;$('#validatePhone [data-submitValidate="signup_phone"]').off('click').on("click",function(){if(isValidField($('#validatePhone form'),new Array($('#signup_phone'),$('#signup_phoneCountry')))){requestValCodePhone=new formeSubmit($('#validatePhone [data-signupForm] form'),"/data/?action=validatePhone",{submitBt:{elem:$('[data-submitvalidate="signup_phone"]'),holdMsg:"...",enableOnSuccess:!0},statusMsg:{elem:$('#validatePhone [data-status-msg2]')},callbackOnSuccess:function(e){validationRequestSuccess('phone')}})}})
$('#validatePhone [data-validationBoxesBack]').off('click').on('click',function(){validationRollback($('#validatePhone #phoneValidation-step1'),$('#validatePhone [data-validationBoxes]'),$('#validatePhone [data-status-msg2]'),!0)})
$('#validatePhone [data-submitValidate="validate_phoneCode"]').off('click').on('click',function(){if(isValidField($('#validatePhone form'),$('#validate_phoneCode'))){var statusMsgElem=$('#validatePhone [data-status-msg3]');var checkValCodePhone=new formeSubmit($('#validatePhone [data-signupForm] form'),"/data/?action=validatePhoneCode",{submitBt:{elem:$(this),holdMsg:"..."},statusMsg:{elem:statusMsgElem},callbackOnSuccess:function(e){if(callbackOnSuccessValidation==null){validationCodeSuccess("phone");$('[data-verifyPhoneStatus]').remove()}else{callbackOnSuccessValidation(e,statusMsgElem)}}})}})}
function launchEMailValidationScript(options){var callbackOnSuccessValidation=null;if(typeof options!="undefined"){if(typeof options.callbackOnSuccess!="undefined"){callbackOnSuccessValidation=options.callbackOnSuccess}}
$('#validateEmail [data-resend]').off('click').on('click',function(){new formeSubmit($('#validateEmail [data-signupForm] form'),"/data/?action=resendValidateMail",{submitBt:{elem:$(this),enableOnSuccess:!0},statusMsg:{elem:$('#validateEmail [data-status-msg3]')}})})
$('#validateEmail [data-validationBoxesBack]').remove();$('#validateEmail [data-submitValidate="validate_signup_email"]').off('click').on('click',function(){if(isValidField($('#validateEmail form'),$('#validate_signup_email'))){var statusMsgElem=$('#validateEmail [data-status-msg3]');var checkValCodeMail=new formeSubmit($('#validateEmail [data-signupForm] form'),"/data/?action=validateMailCode",{submitBt:{elem:$(this),holdMsg:"..."},statusMsg:{elem:statusMsgElem},callbackOnSuccess:function(e){if(callbackOnSuccessValidation==null){validationCodeSuccess("email");$('[data-verifyMailStatus]').remove()}else{callbackOnSuccessValidation(e,statusMsgElem)}}})}})}
function sendValidateEmail(feedbackElem,submitBtElem,options){var validationMethod="code"
var callbackOnSuccess=function(){}
var callbackOnError=function(e){alert(e.error);return!1}
var callbackOnFail=function(e,j,k){alert(j);return!1}
var submitElement=!1;var strings={sending:"Enviando un email de activaciÃ³n a tu cuenta... Espera por favor"}
if(typeof submitBtElem!="undefined"&&submitBtElem!=null&&submitBtElem){submitElement=submitBtElem}
if(typeof options!="undefined"){if(typeof options.callbackOnSuccess!="undefined"){callbackOnSuccess=options.callbackOnSuccess}
if(typeof options.callbackOnError!="undefined"){callbackOnError=options.callbackOnError}
if(typeof options.callbackOnFail!="undefined"){callbackOnFail=options.callbackOnFail}
if(typeof options.strings!="undefined"){if(typeof options.strings.sending!="undefined"){strings.sending=options.strings.sending}}
if(typeof options.validationMethod!="undefined"){if(options.validationMethod=="code"){validationMethod="code"}else if(options.validationMethod=="link"){validationMethod="link"}}}
var formeOptions={callbackOnSuccess:function(e){callbackOnSuccess(e)},callbackOnFail:function(e){callbackOnError(e)},callbackOnError:function(e,j,k){callbackOnFail(e,j,k)}}
if(typeof feedbackElem!="undefined"&&feedbackElem!=null&&feedbackElem!=!1){formeOptions.statusMsg={elem:$(feedbackElem),hold:strings.sending,okClasses:"",koClasses:""}}
if(typeof submitElement){formeOptions.submitBt={elem:$(submitElement),enableOnSuccess:!0,showClockIcon:!1}}
if(validationMethod=="code"){var url="/data/?action=resendValidateMail"}
if(validationMethod=="link"){var url="/data/?action=sendValidateEmail"}
new formeSubmit(!1,url,formeOptions)}
function renderDataFromFB(FBDataObj){$('[name=signup_name]').val(FBDataObj.first_name);$('[name=signup_lastname]').val(FBDataObj.last_name);$('[name=signup_email]').val(FBDataObj.email);if(typeof FBDataObj.telefono!="undefined"){$('[name=signup_phone]').val(FBDataObj.telefono.phone);$('[name=signup_phoneCountry] option').removeAttr('selected');$('[name=signup_phoneCountry] option[value='+FBDataObj.telefono.phoneCountry+']').attr('selected','selected')}
validationCodeSuccess("facebook")}
function decimoImgShow(decImgUrl,findDraw){var decDetail=new core_dropdown();var decURL="";$('[data-coreToggle="tenthDetail"]').on('afterShow',function(){if(typeof findDraw!="undefined"){if(findDraw){var sorteoNumber=$(this).closest('tr').attr('data-decimo-sorteo');decURL=decImgUrl+"/"+sorteoNumber+".jpg"}}else{decURL=decImgUrl}
var tenthNumber=$(this).closest('tr').attr('data-decimo-full')
$('#tenthDetail').find('img').attr('src',decURL);$('#tenthDetail').find('[data-number]').html(tenthNumber);$('#tenthDetail [data-close]').on('click',function(){decDetail.closeall()})})}
function videoPlay(playlistArray,videoPath,playRandom){var videoQueue=0;var video=document.getElementById('video');var source=document.createElement('source');var playRandomFile=!0;if(typeof playRandom!="undefined"){playRandomFile=playRandom}
if(playRandomFile){shuffle(playlistArray)}
source.setAttribute('src',videoPath+playlistArray[videoQueue])
video.appendChild(source);video.play();$(video).on('ended',function(){videoQueue++;if(videoQueue>=playlistArray.length){videoQueue=0}
source.setAttribute('src',videoPath+playlistArray[videoQueue])
video.load();video.play()})
function shuffle(a){var j,x,i;for(i=a.length-1;i>0;i--){j=Math.floor(Math.random()*(i+1));x=a[i];a[i]=a[j];a[j]=x}
return a}}
bamQueue.addToQueue(function(){floatingCartVisibility();$(document).on('ajaxComplete',function(){floatingCartVisibility()})})
function floatingCartVisibility(){if($('[data-purchase-options]').length>0){$('.focusableFloatingCart').add('[data-purchase-options]').appear();$('.focusableFloatingCart').on('appear',function(event,$all_appeared_elements){$('#floatingCart').addClass('is-active');$('[data-bonusesperpurchase]').addClass('is-active')});$('.focusableFloatingCart').on('disappear',function(event,$all_appeared_elements){$('#floatingCart').removeClass('is-active');$('[data-bonusesperpurchase]').removeClass('is-active')});$('[data-purchase-options]').on('appear',function(event,$all_appeared_elements){if($('#usersClubsRedeem').length==0){$('#floatingCart').removeClass('is-active');$('[data-bonusesperpurchase]').removeClass('is-active')}})}}
function urlBase64ToUint8Array(base64String){const padding='='.repeat((4-base64String.length%4)%4);const base64=(base64String+padding).replace(/\-/g,'+').replace(/_/g,'/');const rawData=window.atob(base64);const outputArray=new Uint8Array(rawData.length);for(var i=0;i<rawData.length;++i){outputArray[i]=rawData.charCodeAt(i)}
return outputArray}
var launchDecimosChooserEvents=function(options){this.randomizerRouletteSoundURL="//d2oamtuj38i9pe.cloudfront.net/sounds/common/roulette.mp3";this.randomizerStartSoundURL="//d2oamtuj38i9pe.cloudfront.net/sounds/common/start.wav";this.purchaseOptionObj=null;this.decimoChooser=null;this.tramosObj=null;this.strings={noAvailability:"{t}No hay disponibilidad{/t}",noAvailabilityDraw:"{t}No hay disponibilidad para el sorteo{/t}"}
if(typeof options!="undefined"){if(typeof options.purchaseOptionObj!="undefined"){this.purchaseOptionObj=options.purchaseOptionObj}
if(typeof options.tramosObj!="undefined"){this.tramosObj=options.tramosObj}
if(typeof options.randomizerRouletteSoundURL!="undefined"){this.randomizerRouletteSoundURL=options.randomizerRouletteSoundURL}
if(typeof options.randomizerStartSoundURL!="undefined"){this.randomizerStartSoundURL=options.randomizerStartSoundURL}
if(typeof options.strings!="undefined"){if(typeof options.strings.noAvailability!="undefined"){this.strings.noAvailability=options.strings.noAvailability}
if(typeof options.strings.noAvailabilityDraw!="undefined"){this.strings.noAvailabilityDraw=options.strings.noAvailabilityDraw}}}
var self=this
$('[data-counter-vert-number]:eq(0)').focus();$("[data-counter-vert-number]").keypress(function(e){if(isNaN(String.fromCharCode(e.which))||e.keyCode==13||e.keyCode==32){e.preventDefault()}else{if($(this).text().length>0){$(this).text("")}}}).on("blur keyup paste input",function(){if(isNaN($(this).text())||$(this).text().length>1){$(this).text("?")}});$("[data-counter-vert-number]").keyup(function(e){e.preventDefault();if($(this).text().trim().length<1){$(this).text("?")}
var parsedKey=e.keyCode||e.which;if(parsedKey>=96&&parsedKey<=105){parsedKey-=48}
if(e.keyCode!=9&&e.keyCode!=16&&e.keyCode!=32&&e.keyCode!=38&&e.keyCode!=40&&isNaN(parseInt(String.fromCharCode(parsedKey)))==!1){var nextNumber=$(this).closest('[data-counter-vert]').next('[data-counter-vert]').find('[data-counter-vert-number]')
if($(nextNumber).length!=0){$(nextNumber).focus()}else{var firstNumber=$(this).closest('div').find('[data-counter-vert-number]:eq(0)')
if($(firstNumber).length!=0){$(firstNumber).focus()}}}
if(e.keyCode==38){$(this).prev('[data-counter-vert-up]').click()}
if(e.keyCode==40){$(this).next('[data-counter-vert-down]').click()}
self.checkNumbersValidity()});this.init()}
launchDecimosChooserEvents.prototype.init=function(){var self=this;$("[data-counter-vert] button").off("click").on("click",function(){var val=$(this).closest("[data-counter-vert]").find("[data-counter-vert-number]").html();if(typeof $(this).attr("data-counter-vert-up")!=="undefined"){if(val=="9"){val=0}else if(val=="?"){val=0}else{val=parseInt(val)+1}}else if(typeof $(this).attr("data-counter-vert-down")!=="undefined"){if(val=="0"){val=9}else if(val=="?"){val=9}else{val=parseInt(val)-1}}
$(this).closest("[data-counter-vert]").find("[data-counter-vert-number]").html(val);var number=$("[data-counter-vert-number]:eq(0)").html()+$("[data-counter-vert-number]:eq(1)").html()+$("[data-counter-vert-number]:eq(2)").html()+$("[data-counter-vert-number]:eq(3)").html()+$("[data-counter-vert-number]:eq(4)").html();self.checkNumbersValidity()});function setRandomizer(elem,timer,fromNumber,toNumber,playSound,callback){if(playSound){var snd=new Audio(self.randomizerRouletteSoundURL);snd.currentTime=0;snd.play()}
var interval=setInterval(function(){var number=Math.floor((Math.random()*(toNumber+1)))+fromNumber;$(elem).html(number)},20)
setTimeout(function(){clearInterval(interval);if(playSound){snd.currentTime=0;snd.pause()}
if(typeof callback!="undefined"&&callback!=null){callback()}},timer)}
if(this.purchaseOptionObj!=null){var decimoChooser=new decimosUserChoosable({callbackOnCalculatePurchaseOptionsAdd:function(e){if(self.tramosObj!=null){var totalUnits=decimoChooser.totalUnits();self.tramosObj.setUITramo(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas);self.tramosObj.updateTramoPrize(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas)}else{self.purchaseOptionObj.updatePrice(decimoChooser.totalUnits())}
if(decimoChooser.totalUnits()>0){self.purchaseOptionObj.setCanBuy(!0)}},callbackOnCalculatePurchaseOptionsRem:function(e){if(self.tramosObj!=null){var totalUnits=decimoChooser.totalUnits();self.tramosObj.setUITramo(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas);self.tramosObj.updateTramoPrize(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas)}else{self.purchaseOptionObj.updatePrice(decimoChooser.totalUnits())}
if(decimoChooser.totalUnits()>0){self.purchaseOptionObj.setCanBuy(!0)}}});this.decimoChooser=decimoChooser}else{var decimoChooser=new decimosUserChoosable({});this.decimoChooser=decimoChooser}
self.decimoChooser.refreshList();$('[data-addtolist]').off('click').on('click',function(j){self.resetMsgs();var numberToAdd=self.checkNumbersValidity();if(numberToAdd!==!1){var formSubmit=new formeSubmit(!1,"/data/?action=numbersDisponibility",{extraFields:{"numbers":numberToAdd,"draw":self.purchaseOptionObj.drawSelect},statusMsg:{elem:$('[data-addtolist]').parent().find("div[data-status-msg]"),ko:self.strings.noAvailability},callbackOnSuccess:function(e){var number=Object.keys(e.disponibility)[0];var disponibility=e.disponibility[number];if(disponibility>0){if(self.decimoChooser.appendToList(numberToAdd,disponibility)===!1){$(j.target).closest('button').parent().find("div[data-status-msg]").html("<p>"+self.strings.noAvailability+"</p>");this.statusMsg.elem.css("display","block")}
self.decimoChooser.refreshList();$('#boleto [data-lottery-ticket] tr[data-value="'+numberToAdd+'"]').addClass('is-active')
var totalUnits=decimoChooser.totalUnits();if(self.tramosObj!=null){self.tramosObj.setUITramo(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas);self.tramosObj.updateTramoPrize(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas)}else{self.purchaseOptionObj.updatePrice(totalUnits)}}else{$(j.target).closest('button').parent().find("div[data-status-msg]").html("<p>"+self.strings.noAvailability+"</p>");this.statusMsg.elem.css("display","block")}
if(totalUnits>0){self.purchaseOptionObj.setCanBuy(!0)}else{self.purchaseOptionObj.setCanBuy(!1)}},callbackOnFail:function(e){this.statusMsg.elem.css("display","block").html(self.strings.noAvailability)}})}})
$('[data-randomchooser]').off('click').on('click',function(){var sndStop=new Audio(self.randomizerStartSoundURL);var remaining=0;blockRandom();setRandomizer($('#boleto [data-counter-vert-number]:eq(0)'),1200,0,9,!1,function(){remaining++;unblockRandom(remaining)})
setRandomizer($('#boleto [data-counter-vert-number]:eq(1)'),1400,0,9,!1,function(){remaining++;unblockRandom(remaining)})
setRandomizer($('#boleto [data-counter-vert-number]:eq(2)'),1600,0,9,!1,function(){remaining++;unblockRandom(remaining)})
setRandomizer($('#boleto [data-counter-vert-number]:eq(3)'),1800,0,9,!1,function(){remaining++;unblockRandom(remaining)})
setRandomizer($('#boleto [data-counter-vert-number]:eq(4)'),2000,0,9,!0,function(){remaining++;unblockRandom(remaining)})
function unblockRandom(remaining){sndStop.play();if(remaining==5){$('#boleto [data-randomchooser]').removeAttr('disabled');$('#boleto [data-counter-vert-up]').add('#boleto [data-counter-vert-down]').removeAttr('disabled');$('#boleto [data-counter-vert-number]').attr('contenteditable','true')
self.checkNumbersValidity()}}
function blockRandom(){$('#boleto [data-addtolist]').add('#boleto [data-randomchooser]').attr('disabled','disabled')
$('#boleto [data-counter-vert-up]').add('#boleto [data-counter-vert-down]').attr('disabled','disabled')
$('#boleto [data-counter-vert-number]').removeAttr('contenteditable')}})
$(document).off("click.decimo",'[data-lottery-ticket] [data-remove-ticket]').on("click.decimo",'[data-lottery-ticket] [data-remove-ticket]',function(){var elemValue=$(this).closest('tr').attr('data-value')
self.decimoChooser.removeFromList(elemValue,!0);self.decimoChooser.refreshList();var totalUnits=self.decimoChooser.totalUnits();if(self.tramosObj!=null){self.tramosObj.setUITramo(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas);self.tramosObj.updateTramoPrize(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas)}else{self.purchaseOptionObj.updatePrice(totalUnits)}
if(self.decimoChooser.totalUnits()>0){self.purchaseOptionObj.setCanBuy(!0)}else{self.purchaseOptionObj.setCanBuy(!1)}})
$('[data-curatedNumbers] button').off('click').on('click',function(j){self.resetMsgs();var value=$(this).attr('data-value');var formSubmit=new formeSubmit(!1,"/data/?action=numbersDisponibility",{extraFields:{"numbers":value,"draw":self.purchaseOptionObj.drawSelect},statusMsg:{elem:$(this).parent().find("div[data-status-msg]"),ko:self.strings.noAvailability},callbackOnSuccess:function(e){var number=Object.keys(e.disponibility)[0];var disponibility=e.disponibility[number];if(disponibility>0){if(self.decimoChooser.appendToList(value,disponibility)===!1){$(j.target).parent().find("div[data-status-msg]").html("<p>"+self.strings.noAvailability+"</p>");this.statusMsg.elem.css("display","block")}
self.decimoChooser.refreshList();$('#boleto [data-lottery-ticket] tr[data-value="'+value+'"]').addClass('is-active')
var totalUnits=decimoChooser.totalUnits();if(self.tramosObj!=null){self.tramosObj.setUITramo(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas);self.tramosObj.updateTramoPrize(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas)}else{self.purchaseOptionObj.updatePrice(totalUnits)}}else{$(j.target).parent().find("div[data-status-msg]").html("<p>"+self.strings.noAvailability+"</p>");this.statusMsg.elem.css("display","block")}
if(self.decimoChooser.totalUnits()>0){self.purchaseOptionObj.setCanBuy(!0)}else{self.purchaseOptionObj.setCanBuy(!1)}},callbackOnFail:function(e){this.statusMsg.elem.css("display","block").html(self.strings.noAvailability)}})})}
launchDecimosChooserEvents.prototype.checkNumbersValidity=function(){var number="";$('[data-counter-vert-number]').each(function(){if(isNaN($(this).text().trim())){number=!1;return!1}else{number=number+$(this).text().trim()}})
if(number.length>0&&number){$('[data-addtolist]').removeAttr('disabled');return number}else{$('[data-addtolist]').attr('disabled','disabled');return!1}}
launchDecimosChooserEvents.prototype.getDecimoChooserObj=function(){return this.decimoChooser}
launchDecimosChooserEvents.prototype.getPurchaseOptionsObj=function(){return this.purchaseOptionObj}
launchDecimosChooserEvents.prototype.setPurchaseOptionsObj=function(newPurchaseOptionsObj){this.purchaseOptionObj=newPurchaseOptionsObj}
launchDecimosChooserEvents.prototype.refresh=function(){var self=this
if(this.purchaseOptionObj!=null&&this.decimoChooser!=null&&this.tramosObj!=null){var totalUnits=self.decimoChooser.totalUnits();self.tramosObj.setUITramo(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas);self.tramosObj.updateTramoPrize(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas)}}
launchDecimosChooserEvents.prototype.reset=function(){var self=this
if(this.decimoChooser!=null){this.decimoChooser.reset()}
if(this.purchaseOptionObj!=null){if(self.tramosObj!=null){self.tramosObj.setUITramo();self.tramosObj.updateTramoPrize(0,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas)}else{this.purchaseOptionObj.updatePrice(0)}
this.purchaseOptionObj.setCanBuy(!1)}}
launchDecimosChooserEvents.prototype.setTramosObj=function(newTramosObj){this.tramosObj=newTramosObj;this.refresh()}
launchDecimosChooserEvents.prototype.changeDrawCheck=function(){var self=this;self.resetMsgs();var numbersCheck=new Array();$(self.decimoChooser.numbersArray).each(function(e,v){numbersCheck.push(v.number)});var formSubmit=new formeSubmit(!1,"/data/?action=numbersDisponibility",{extraFields:{"numbers":numbersCheck.join("-"),"draw":self.purchaseOptionObj.drawSelect},statusMsg:{elem:$('[data-curatedNumbers] button').parent().find("div[data-status-msg]"),ko:self.strings.noAvailabilityDraw},callbackOnSuccess:function(e){var selfForm=this;self.decimoChooser.reset();$.each(e.disponibility,function(index,value){var numberToAdd=index;var disponibility=value;if(disponibility>0){if(self.decimoChooser.appendToList(numberToAdd,disponibility)===!1){selfForm.statusMsg.elem.html("<p>"+self.strings.noAvailabilityDraw+"</p>");selfForm.statusMsg.elem.css("display","block")}
self.decimoChooser.refreshList();$('#boleto [data-lottery-ticket] tr[data-value="'+numberToAdd+'"]').addClass('is-active')
var totalUnits=self.decimoChooser.totalUnits();if(self.tramosObj!=null){self.tramosObj.setUITramo(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas);self.tramosObj.updateTramoPrize(totalUnits,self.purchaseOptionObj.dias,self.purchaseOptionObj.semanas)}else{self.purchaseOptionObj.updatePrice(totalUnits)}}else{selfForm.statusMsg.elem.html("<p>"+self.strings.noAvailabilityDraw+"</p>");selfForm.statusMsg.elem.css("display","block")}
if(totalUnits>0){self.purchaseOptionObj.setCanBuy(!0)}else{self.purchaseOptionObj.setCanBuy(!1)}})},callbackOnFail:function(e){this.statusMsg.elem.css("display","block").html(self.strings.noAvailabilityDraw)}})}
launchDecimosChooserEvents.prototype.resetMsgs=function(){$('[data-curatedNumbers] button').parent().find("div[data-status-msg]").css("display","none").html("");$('[data-addtolist]').parent().find("div[data-status-msg]").css("display","none").html("")}
var decimosUserChoosable=function(options){this.tableElem=$("[data-lottery-ticket]");this.tableBodyElem=$("[data-lottery-ticket] tbody");this.tableEmptyElem=$("[data-ticket-tutorial]");this.currentSorteo=0;this.numbersArray=new Array();this.callbackOnCalculatePurchaseOptionsAdd=function(){};this.callbackOnCalculatePurchaseOptionsRem=function(){};if(typeof options!="undefined"){if(typeof options.callbackOnCalculatePurchaseOptionsAdd!="undefined"){this.callbackOnCalculatePurchaseOptionsAdd=options.callbackOnCalculatePurchaseOptionsAdd}
if(typeof options.callbackOnCalculatePurchaseOptionsRem!="undefined"){this.callbackOnCalculatePurchaseOptionsRem=options.callbackOnCalculatePurchaseOptionsRem}}}
decimosUserChoosable.prototype.refreshList=function(){var self=this;var html="";$(this.tableBodyElem).empty();$(this.numbersArray).each(function(){var decimoCounter='<span data-addrem>'+'<button data-rem data-button-decimo aria-label="{t}Descontar dÃ©cimo{/t}"></button>'+'<span data-counter data-decimo aria-label="{t}NÃºmero de dÃ©cimos{/t}">'+this.units+'</span>'+'<button data-add data-button-decimo aria-label="{t}AÃ±adir dÃ©cimo{/t}"></button>'+'</span>';var tr="";tr='<tr data-value="'+this.number+'" data-disponible="'+this.disponibility+'"><td>'+this.number+'</td><td class="spacer"></td><td>'+decimoCounter+'</td><td data-actions><button data-remove-ticket></button></td></tr>';html=html+tr})
if(html.length==0){$(this.tableElem).removeClass('is-active')
$(this.tableEmptyElem).addClass('is-active')}else{$(this.tableElem).addClass('is-active')
$(this.tableEmptyElem).removeClass('is-active')}
$(this.tableBodyElem).html(html);var calculatePurchaseOptionsAdd=function(e){var number=$(e).closest('tr').attr('data-value');var disponibilidad=self.getDisponibility(number);if(disponibilidad!==!1){$(e).closest('tr').attr('data-disponible',disponibilidad);var disponibility=disponibilidad}else{var disponibility=$(e).closest('tr').attr('data-disponible')}
self.appendToList(number,disponibility)
self.callbackOnCalculatePurchaseOptionsAdd(e)}
var calculatePurchaseOptionsRem=function(e){var number=$(e).closest('tr').attr('data-value');var disponibilidad=self.getDisponibility(number);if(disponibilidad!==!1){$(e).closest('tr').attr('data-disponible',disponibilidad)}
self.removeFromList(number)
self.callbackOnCalculatePurchaseOptionsRem(e)}
var calculateMax=function(object){return parseInt(object.closest("tr").attr("data-disponible"))}
countersEvents({'elem':$(this.tableBodyElem),'max':99,'min':1,'calculatePurchaseOptionsAfterAddCallback':calculatePurchaseOptionsAdd,'calculatePurchaseOptionsAfterRemCallback':calculatePurchaseOptionsRem,'calculateMax':calculateMax})}
decimosUserChoosable.prototype.getDisponibility=function(numberToCheck){var foundIndex=!1;if(numberToCheck&&!isNaN(parseInt(numberToCheck))){$(this.numbersArray).each(function(e,v){if(parseInt(v.number)==parseInt(numberToCheck)){foundIndex=e;return!1}})
if(foundIndex!==!1){return this.numbersArray[foundIndex].disponibility}}
return!1}
decimosUserChoosable.prototype.appendToList=function(numberToAdd,disponibility){if(numberToAdd&&!isNaN(parseInt(numberToAdd))){var foundIndex=!1;$(this.numbersArray).each(function(e,v){if(parseInt(v.number)==parseInt(numberToAdd)){foundIndex=e;return!1}})
if(foundIndex!==!1){this.numbersArray[foundIndex].disponibility=disponibility;if(this.numbersArray[foundIndex].units+1<=this.numbersArray[foundIndex].disponibility){this.numbersArray[foundIndex].units=this.numbersArray[foundIndex].units+1}else{this.numbersArray[foundIndex].units=this.numbersArray[foundIndex].disponibility;return!1}}else{this.numbersArray.unshift({number:numberToAdd,units:1,disponibility:disponibility,})}}
return!0}
decimosUserChoosable.prototype.removeFromList=function(numberToRemove,removeAllUnits){var self=this;var deleteIndex=!1;var removeAll=!1;if(typeof removeAllUnits!="undefined"&&removeAllUnits==!0){removeAll=!0}
$(this.numbersArray).each(function(e,v){if(parseInt(v.number)==parseInt(numberToRemove)){deleteIndex=e;return!1}})
if(deleteIndex!==!1){if(removeAll){this.numbersArray.splice(deleteIndex,1)}else{if(this.numbersArray[deleteIndex].units>1){this.numbersArray[deleteIndex].units=this.numbersArray[deleteIndex].units-1}}}}
decimosUserChoosable.prototype.retrieveNumbers=function(){return this.numbersArray}
decimosUserChoosable.prototype.totalUnits=function(){var units=0;$(this.numbersArray).each(function(){units=units+this.units})
return units}
decimosUserChoosable.prototype.reset=function(){var self=this;this.numbersArray=new Array();this.refreshList()}
function showMoreComments(obj,ref){if(!$(obj).hasClass("disabled")){$(obj).addClass("disabled");var page=$('[data-comments="'+ref+'"]').data("page")+1;$('[data-comments="'+ref+'"]').data("page",page);$.post("/data/",{action:"getComments",source:ref,page:page},function(data){if(page*$('[data-comments="'+ref+'"]').data("perpage")>$('[data-comments="'+ref+'"]').data("total")){$(obj).remove()}else{$(obj).removeClass("disabled")}
$('[data-comments="'+ref+'"]').append(data.data);attachAllEvents()},"json")}}
function defaultShare(){try{webkit.messageHandlers.defaultSocialShare.postMessage("true")}catch(err){console.log('The native context does not exist yet')}}
function defaultShareRecommendToken(message){try{webkit.messageHandlers.recommendTokenShare.postMessage(message)}catch(err){console.log('The native context does not exist yet')}}
function checkPushStatus(platform){if(platform=="ios"){try{webkit.messageHandlers.checkPushStatus.postMessage(!0)}catch(err){console.log('The native context does not exist yet')}}else if(platform=="android"){if(typeof Android.checkPushStatus=="undefined"){var androidPushStatus=!0}else{var androidPushStatus=Android.checkPushStatus()}
pushStatus(androidPushStatus)}}
function pushStatus(isPushEnabled){if(isPushEnabled){$('[data-pushStatus]').hide();$('[data-notification-settings]').show();window.pushStatus=!0}else{$('[data-pushStatus]').show();$('[data-notification-settings]').hide();window.pushStatus=!1}}
function pushSyncStatus(isPushSyncingCapable){if(isPushSyncingCapable){$('[data-pushSyncStatus]').hide()}else{$('[data-pushSyncStatus]').show()}}
function confirmLogout(){$('#closeSession').core_reveal('open')}
function loginWithFinger(platform){if(platform=="ios"){try{webkit.messageHandlers.loginWithTouchID.postMessage(!0)}catch(err){console.log('The native context does not exist yet')}}else if(platform=="android"){Android.loginWithFingerprint()}}
function setPushToken(token,devicetype){var formSubmit=new formeSubmit(!1,"/data/?action=registerMobileDevice",{extraFields:{"deviceId":token,"deviceType":devicetype,"retrieveNotificationsSettings":1},callbackOnSuccess:function(e){if(e.status!="error"){$('body').attr('data-push_deviceId',e.deviceId)
if(typeof e.notificaciones!="undefined"){pushSyncStatus(!0)
if(e.notificaciones){if(typeof refreshConfigPushData!="undefined"){refreshConfigPushData(e.notificaciones)}}}else{if(typeof refreshConfigPushData!="undefined"){pushSyncStatus(!1)}}}}})}
function checkSessionStatus(interval,modalToShowElem,loginObj){var checkSessionFn=function(){var secondsInIDLE=0;if(typeof window.inactivityTime=="number"){secondsInIDLE=window.inactivityTime}
new formeSubmit(!1,"/data/?action=logged",{extraFields:{secondsInIDLE:secondsInIDLE},callbackOnFail:function(e){clearInterval(window.mySessionTimeoutTimer)
$(modalToShowElem).data('callback',function(){var loginObject=loginObj
window.retrySessionFn=function(){loginObject.open()
delete window.retrySessionFn}
$(modalToShowElem).find('[data-core_reveal-close]').remove()})
$(modalToShowElem).core_reveal("open")}})}
window.mySessionTimeoutTimer=setInterval(checkSessionFn,interval)
return window.mySessionTimeoutTimer}
var launchDocumentsManagerScripts=function(docLoad){var self=this;this.docLoad=docLoad;$('[data-addDoc]').on("click",function(){docLoad.open()})
$('[data-featuresBlock] button').on("click",function(){var docType=$(this).closest('[data-forDocument]').attr('data-forDocument');if(self.docLoad.getTypeFromID(docType)){self.docLoad.open(docType)}})
$(document).on("click","#myConfig [data-docs-list] [data-remove]",function(){var tr=$(this).closest('tr[data-temp-id]')
if($(tr).length>0){var id=$(tr).attr('data-temp-id')
self.docLoad.removeTmpDoc(id)}else{var tr=$(this).closest('tr[data-doc-id]')
var id=$(tr).attr('data-doc-id')}})
this.updateStates()}
launchDocumentsManagerScripts.prototype.updateStates=function(){var self=this;var typesObj={}
$(self.docLoad.getDocs()).each(function(){if(typeof typesObj[this.docType]!="undefined"){if(this.status<typesObj[this.docType].status){typesObj[this.docType].status=this.status}}else{typesObj[this.docType]={status:this.status}}})
var keys=Object.keys(typesObj)
$('[data-featuresBlock] li[data-forDocument]').removeClass();$(keys).each(function(k,v){var elem=$('[data-featuresBlock] li[data-forDocument="'+v+'"]')
var elemObj=typesObj[v]
if(elemObj.status==0){$(elem).removeClass()}
if(elemObj.status==1){$(elem).removeClass().addClass('is-active')}
if(elemObj.status==2){$(elem).removeClass().addClass('on-hold')}
if(elemObj.status==3){$(elem).removeClass().addClass('denied')}
if(elemObj.status==4){$(elem).removeClass().addClass('denied')}})}
function launchRealTimeForm(options){var watchForSubmitInterval=600;window.watchForSubmitTimer=!1;var isMobileApp=!1;var token=null;var strings={saved:"ConfiguraciÃ³n guardada"}
if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(typeof options.strings.saved!="undefined"){strings.saved=options.strings.saved}}}
initSlider();function initSlider(){var initEnd=!1;var elem=$('[data-slider-handle]');$(elem).each(function(){var slider=$(this).attr('data-input')
var inputElem=$("#"+slider);var value=parseInt($(this).attr('aria-valuenow'))
var step=$(elem).attr('data-step')
if(value<step){value=value*step}
$(this).attr('aria-valuenow',value)
$(inputElem).val(value.formatMoney(0,null,'.'))});setTimeout(function(){initEnd=!0},1000)
$('.slider').on('changed.zf.slider',function(){var elem=$(this).find('[data-slider-handle]');var slider=$(elem).attr('data-input')
var inputElem=$("#"+slider);var value=parseInt($(elem).attr('aria-valuenow'))
var game=$(elem).attr('data-sliderFor')
$('[data-switchFor="'+game+'"]').attr('data-value',value)
if(initEnd){if($('[data-switchFor="'+game+'"]').length>0&&$('[data-switchFor="'+game+'"]').prop('checked')==!0){submitData()}else if($('[data-switchFor="'+game+'"]').length>0&&$('[data-switchFor="'+game+'"]').prop('checked')==!1){$('[data-switchFor="'+game+'"]').trigger('click')}}})
$('.slider').on('moved.zf.slider',function(){var elem=$(this).find('[data-slider-handle]');var slider=$(elem).attr('data-input')
var inputElem=$("#"+slider);var value=parseInt($(elem).attr('aria-valuenow'))
var step=$(elem).attr('data-step')
if(value<step){value=value*step}
$(inputElem).val(value.formatMoney(0,null,'.'))})}
$('input[data-switchfor]').add('.switch-input:not([data-value])').on('change',function(){submitData()})
function submitData(){clearTimeout(window.watchForSubmitTimer);window.watchForSubmitTimer=setTimeout(function(){submitForm()},watchForSubmitInterval)
function submitForm(){var submitObj=new Array();$('[data-switchfor][data-value]').each(function(){var objElem={};objElem.elem=$(this).attr('name');objElem.value=$(this).attr('data-value');objElem.checked=$(this).prop("checked");submitObj.push(objElem)})
$('[data-switchfor]:not([data-value])').each(function(){var objElem={};objElem.elem=$(this).attr('name');objElem.value=!1;objElem.checked=$(this).prop("checked");submitObj.push(objElem)})
$('.switch-input:not([data-value])').each(function(){var objElem={};objElem.elem=$(this).attr('name');objElem.value=!1;objElem.checked=$(this).prop("checked");submitObj.push(objElem)})
if(typeof URLSearchParams!="undefined"){var searchParams=new URLSearchParams(window.location.search);if(searchParams.has('token')){var extraFieldsOBJ={"notifications":submitObj,"token":searchParams.get('token')}}else{var extraFieldsOBJ={"notifications":submitObj}}}else{var extraFieldsOBJ={"notifications":submitObj}}
myForm=new formeSubmit(!1,"/data/?action=setNotifications",{extraFields:extraFieldsOBJ,callbackOnSuccess:function(e){newPopUp("<strong>"+strings.saved+"</strong>")},callbackOnFail:function(e){newPopUp(e.error)}})}}}
function refreshConfigPushData(pushData){$('[data-push-config] #notifyByApp .switch-input').prop('checked',!1)
for(var key in pushData){if(pushData.hasOwnProperty(key)){var elem=$('[name="'+key+'"]')
if(typeof $(elem).attr('data-switchfor')!="undefined"){$(elem).prop('checked',!0)
var slideId=$(elem).attr('data-switchfor')
var sliderHandler=$('[data-sliderfor="'+slideId+'"]')
var sliderElem=$(sliderHandler).closest('[data-slider]')
var sliderInput=$(sliderElem).find('input')
if($(sliderElem).length>0){$(sliderElem).attr('data-initial-start',pushData[key])
$(sliderHandler).attr('aria-valuenow',pushData[key])
$(sliderInput).val(pushData[key])
$(sliderElem).foundation('setHandles')}}else{$(elem).prop('checked',!0)}}}
setTimeout(function(){$('[data-notification-settings]').show()},600)}
function registerNotifications(options){var unableToRegisterCallback=function(){}
var callbackOnRegistrationSuccess=function(){}
if(typeof options!="undefined"){if(typeof options.unableToRegisterCallback!="undefined"){unableToRegisterCallback=options.unableToRegisterCallback}
if(typeof options.callbackOnRegistrationSuccess!="undefined"){callbackOnRegistrationSuccess=options.callbackOnRegistrationSuccess}}
notif_suscribe(!1,!1,{unableToRegisterCallback:function(mode){unableToRegisterCallback()},callbackOnRegistrationSuccess:function(data,mode){callbackOnRegistrationSuccess()},incompatibleCallback:function(){}})}
function notif_suscribe(app,options){var unableToRegisterCallback=function(){}
var callbackOnRegistrationSuccess=function(){}
var callbackOnFail=function(){}
var callbackOnError=function(){}
var incompatibleCallback=function(){}
var webPushAPIkey=null;var safariPushParameters={serviceURL:null,pushID:null,userData:null}
var sendFormeParams={extraFields:{}}
var formElement=!1;var isSafari=!1;var permissions=!1
if(typeof options!="undefined"){if(typeof options.unableToRegisterCallback!="undefined"){unableToRegisterCallback=options.unableToRegisterCallback}
if(typeof options.incompatibleCallback!="undefined"){incompatibleCallback=options.incompatibleCallback}
if(typeof options.callbackOnRegistrationSuccess!="undefined"){callbackOnRegistrationSuccess=options.callbackOnRegistrationSuccess}
if(typeof options.formElem!="undefined"){formElem=options.formElement}
if(typeof options.sendFormeParams!="undefined"){sendFormeParams=options.sendFormeParams}
if(typeof options.safariPushParameters!="undefined"){safariPushParameters=options.safariPushParameters}
if(typeof options.webPushAPIkey!="undefined"){webPushAPIkey=options.webPushAPIkey}}
if(typeof window.safari!="undefined"){isSafari=!0}
var continueRegistering=function(options){var isSafari=!1;var safariToken=!1;if(typeof window.safari!="undefined"){isSafari=!0}
var permissions=!1
if(typeof options!="undefined"){if(typeof options.safariToken!="undefined"){safariToken=options.safariToken}}
if(app||(getCookie("gcmEndpoint"))||isSafari){if(!isSafari){$.ajax({type:"POST",url:"/data/?action=gcmRegister",data:{},dataType:'json',success:function(data){if(data.status=="ok"){callbackOnRegistrationSuccess(data,1)}else{unableToRegisterCallback(3)}}})}else{sendFormeParams.extraFields.userData=JSON.stringify({"endpoint":safariToken,"browser":"safari"});sendFormeParams.callbackOnSuccess=function(e){callbackOnRegistrationSuccess(e,1);setCookie("gcm_status",1,30)},sendFormeParams.callbackOnFail=function(e){unableToRegisterCallback(1)}
var myForm=new formeSubmit($(formElement),"/data/?action=gcmRegister",sendFormeParams)}}else{if(!isSafari&&typeof navigator.serviceWorker!="undefined"){navigator.serviceWorker.getRegistrations().then(function(reg){if(reg.length>0){reg[0].pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:urlBase64ToUint8Array(webPushAPIkey)}).then(function(sub){subscription=JSON.stringify(sub);setCookie("gcmEndpoint",sub.endpoint,30);sendFormeParams.extraFields.userData=subscription;sendFormeParams.callbackOnSuccess=function(e){callbackOnRegistrationSuccess(e,1);setCookie("gcm_status",1,30)},sendFormeParams.callbackOnFail=function(e){unableToRegisterCallback(1)}
var myForm=new formeSubmit($(formElement),"/data/?action=gcmRegister",sendFormeParams)}).catch(function(error){console.log('Service Worker error: ',error)})}else{console.log('No Service Workers Registered')}
return reg}).catch(function(error){console.log('Service Worker error: ',error)})}}}
if(!app){if(!notif_checkSupport()){incompatibleCallback()
return!1}
if(!isSafari){permissions=notif_checkPermission({})}else{permissisons=notif_checkPermission({safariPushParameters:safariPushParameters,callbackOnSuccess:continueRegistering,callbackOnFail:unableToRegisterCallback})}
if(permissions==-1&&!isSafari&&typeof Notification!="undefined"){Notification.requestPermission(function(permission){if(permission==="granted"){permissions=!0;if(getCookie("gcmEndpoint").length==0){continueRegistering()}
console.log('granted')}else{console.log('denied')}})}else if(permissions==-2&&!isSafari){console.log('denied')}}
if((permissions==!0&&!isSafari)||app){if(getCookie("gcmEndpoint").length==0){continueRegistering()}}}
function setCookieEndpoint(){if(typeof window.safari=="undefined"&&typeof navigator!="undefined"){if(notif_checkSupport()){navigator.serviceWorker.ready.then(function(serviceWorkerRegistration){if(typeof serviceWorkerRegistration!="undefined"&&typeof serviceWorkerRegistration.pushManager!="undefined"){serviceWorkerRegistration.pushManager.getSubscription().then(function(subscription){if(subscription){setCookie("gcmEndpoint",subscription.endpoint,30)}})}})}}}
function notif_userDenied(){$('#subscribeModal').attr('data-reveal-params','{ "mode":"3"}');$('#subscribeModal').foundation('open');notifyDontRemember(90)}
function notif_checkSupport(){if(typeof window.safari=="undefined"){if('serviceWorker' in navigator){return!0}else{return!1}}else{if('safari' in window&&'pushNotification' in window.safari){return!0}else{return!1}}}
function notif_checkPermission(options){var safariPushParameters={serviceURL:null,pushID:null,userData:null}
var callbackOnSuccess=function(){}
var callbackOnFail=function(){}
if(typeof options!="undefined"){if(typeof options.safariPushParameters!="undefined"){safariPushParameters=options.safariPushParameters}
if(typeof options.callbackOnSuccess!="undefined"){callbackOnSuccess=options.callbackOnSuccess}
if(typeof options.callbackOnFail!="undefined"){callbackOnFail=options.callbackOnFail}}
if(typeof window.safari=="undefined"&&typeof Notification!="undefined"){if(Notification.permission=="granted"){return!0}else if(Notification.permission=="default"){return-1}else if(Notification.permission=='denied'){return-2}}else{if(typeof window.safari!="undefined"&&typeof window.safari.pushNotification!="undefined"){if(safariPushParameters.pushID!=null){var permissionData=window.safari.pushNotification.permission(safariPushParameters.pushID);return checkRemotePermission(permissionData,options)}else{return-1}}else{return-1}}}
var checkRemotePermission=function(permissionData,options){var safariPushParameters={serviceURL:null,pushID:null,userData:null}
var callbackOnSuccess=function(){}
var callbackOnFail=function(){}
if(typeof window.firstTimeSafariOptions!="undefined"){if(window.firstTimeSafariOptions!=null){var options=window.firstTimeSafariOptions}}
if(typeof options!="undefined"){window.firstTimeSafariOptions=options
if(typeof options.safariPushParameters!="undefined"){safariPushParameters=options.safariPushParameters}
if(typeof options.callbackOnSuccess!="undefined"){callbackOnSuccess=options.callbackOnSuccess}
if(typeof options.callbackOnFail!="undefined"){callbackOnFail=options.callbackOnFail}}
if(permissionData.permission==='default'){window.safari.pushNotification.requestPermission(safariPushParameters.serviceURL,safariPushParameters.pushID,{},checkRemotePermission)}else if(permissionData.permission==='denied'){callbackOnFail(3)
delete window[firstTimeSafariOptions]
return-2}else if(permissionData.permission==='granted'){setCookie("gcmEndpoint",permissionData.deviceToken,30);console.log("TOKEN:",permissionData.deviceToken)
console.log(getCookie("gcmEndPoint"))
callbackOnSuccess({safariToken:permissionData.deviceToken})
delete window[firstTimeSafariOptions]
return permissionData.deviceToken}};function manageGcm(fieldsString){notif_suscribe(fieldsString)
notifyDontRemember(30);return!0}
function followingDontRemember(){setCookie("followingDontRemember",!0,10);return!0}
function notifyDontRemember(days){setCookie("notifyDontRemember",!0,days);return!0}
var lottoFinder=function(urlToRetrieveData,options){this.availableNumbersObj=null;this.callbackOnSuccess=function(){};this.callbackOnFail=function(){};this.availableNumbersObjArray=new Array();if(typeof options!="undefined"){if(typeof options.callbackOnSuccess!="undefined"){this.callbackOnSuccess=options.callbackOnSuccess}
if(typeof options.callbackOnFail!="undefined"){this.callbackOnFail=options.callbackOnFail}}
this.getCSV(urlToRetrieveData)}
lottoFinder.prototype.retrieveCSV=function(urlToRetrieveData){var self=this;var selfLF=this;var forme=new formeSubmit(!1,urlToRetrieveData,{callbackOnSuccess:function(e){self.availableNumbersObj=e.data;self.availableNumbersObjArray=selfLF.csvToArray(e.data,";");self.callbackOnSuccess(self,e)},callbackOnFail:function(e){self.callbackOnFail(self,e)},callbackOnError:function(){self.callbackOnFail(self)}})}
lottoFinder.prototype.getCSV=function(urlToRetrieveData){var self=this;if(self.availableNumbersObj==null||typeof self.availableNumbersObj=="undefinded"Â ||(typeof self.availableNumbersObj!="undefinded"Â &&self.availableNumbersObj.length==0)){self.retrieveCSV(urlToRetrieveData)}}
lottoFinder.prototype.csvToArray=function(strData,strDelimiter){strDelimiter=(strDelimiter||",");var objPattern=new RegExp(("(\\"+strDelimiter+"|\\r?\\n|\\r|^)"+"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|"+"([^\"\\"+strDelimiter+"\\r\\n]*))"),"gi");var arrData=[[]];var arrMatches=null;while(arrMatches=objPattern.exec(strData)){var strMatchedDelimiter=arrMatches[1];if(strMatchedDelimiter.length&&(strMatchedDelimiter!=strDelimiter)){arrData.push([])}
if(arrMatches[2]){var strMatchedValue=arrMatches[2].replace(new RegExp("\"\"","g"),"\"")}else{var strMatchedValue=arrMatches[3].trim()}
arrData[arrData.length-1].push(strMatchedValue)}
var indexesToRemove=new Array();$(arrData).each(function(k,v){if(isNaN(parseFloat(v[0]))||isNaN(parseFloat(v[1]))){indexesToRemove.push(k)}
if(v[0].length<5){var ceros="";var cerosCount=5-v[0].length;for(i=0;i<cerosCount;i++){ceros=ceros+"0"}
arrData[k][0]=ceros+v[0]}})
var tmpArray=new Array();$(arrData).each(function(k,v){if(indexesToRemove.indexOf(k)==-1){tmpArray.push(v)}})
return(tmpArray)}
lottoFinder.prototype.findValue=function(numberWithWildcard){var self=this;var regExpression="";for(i=0;i<numberWithWildcard.length;i++){if(!isNaN(parseFloat(numberWithWildcard[i]))){regExpression=regExpression+numberWithWildcard[i]}else{regExpression=regExpression+"."}}
var reg=new RegExp(regExpression);return self.availableNumbersObjArray.filter(function(item){return item[0].match(reg)})}
lottoFinder.prototype.getNumberStock=function(numberWithWildcard,callbackOnUnavailable,callbackOnAvailable){var self=this;var availableNumbers=self.findValue(numberWithWildcard);var availableUnits=0;$(availableNumbers).each(function(k,v){availableUnits=availableUnits+parseInt(v[1])})
if(availableUnits==0&&typeof callbackOnUnavailable!="undefined"){callbackOnUnavailable(numberWithWildcard,self)}
if(availableUnits>0&&typeof callbackOnAvailable!="undefined"){callbackOnAvailable(numberWithWildcard,availableUnits,self)}
return availableUnits}
lottoFinder.prototype.getNumbersLength=function(){return this.availableNumbersObjArray.length}
var documentsValidator=function(requiredItemsObj){this.requiredItems=requiredItemsObj;this.interfaceSelector="[data-featuresBlock]";this.phoneValidationModalElem='[data-reveal-source="validatePhone"]';this.emailValidationModalElem='[data-reveal-source="validateEmail"]';this.docManager=null;this.emailRequired=!1;this.phoneRequired=!1;this.strings={sending:"{t}Enviando un email de activaciÃ³n a tu cuenta... Espera por favor{/t}"}
if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(typeof options.strings.sending!="undefined"){this.strings.sending=options.strings.sending}}}}
documentsValidator.prototype.attachDocsManager=function(docsManagerObj){var self=this;self.docsManagerObj=docsManagerObj;var launchDM=new launchDocumentsManagerScripts(self.docsManagerObj);$(document).off('click',self.interfaceSelector+" button").on("click",self.interfaceSelector+" button",function(){var elem=$(this).closest('[data-forDocument]');var docType=$(this).closest('[data-forDocument]').attr('data-forDocument');switch(docType){case "phone":var phoneModal=$(self.phoneValidationModalElem);$(phoneModal).data('callback',function(e){launchPhoneValidationScript({callbackOnSuccess:function(e,statusMsgElem){var text=$(statusMsgElem).text();var intervalo=3;$(statusMsgElem).text(text+" ("+intervalo+")");var closeInterval=setInterval(function(){intervalo--;if(intervalo==0){location.reload()}else{$(statusMsgElem).text(text+" ("+intervalo+")")}},1000)
$(elem).fadeOut('slow',function(){$(this).remove()})}})})
$(phoneModal).core_reveal('open',{params:{'ignoreScripts':!0}});break;case "email":var emailModal=$(self.emailValidationModalElem);sendValidateEmail(null,$(this),{strings:{sending:self.strings.sending},callbackOnSuccess:function(e){$(emailModal).data('callback',function(e){launchEMailValidationScript({callbackOnSuccess:function(e,statusMsgElem){var text=$(statusMsgElem).text();var intervalo=3;$(statusMsgElem).text(text+" ("+intervalo+")");var closeInterval=setInterval(function(){intervalo--;if(intervalo==0){location.reload()}else{$(statusMsgElem).text(text+" ("+intervalo+")")}},1000);$(elem).fadeOut('slow',function(){$(this).remove()})}})})
$(emailModal).core_reveal('open',{params:{'ignoreScripts':!0}})},callbackOnError:function(e){alert(e.error);$(emailModal).core_reveal('close');return!1},callbackOnFail:function(e,j,k){alert(j);$(emailModal).core_reveal('close');return!1}})
break;default:break}})}
documentsValidator.prototype.render=function(injectInto,options){var self=this;var html="";var groupedHtml="";var animated=!1;var callbackOnRender=function(){};if(typeof options!="undefined"){if(typeof options.animated!="undefined"&&options.animated===!0){animated=!0}
if(typeof options.callbackOnRender!="undefined"){callbackOnRender=options.callbackOnRender}}
$.each(self.requiredItems,function(k,v){if(k=="email"){html=html+'<li data-forDocument="email">'+'<button type="button">'+'<span></span>'+'<i class="icon-slim-mail"></i>'+v.name+'</button>'+'</li>'}
if(k=="phone"){html=html+'<li data-forDocument="phone">'+'<button type="button">'+'<span></span>'+'<i class="icon-slim-phone"></i>'+v.name+'</button>'+'</li>'}
if(k=="documents"){}})
html="<ul data-featuresBlock data-docsItems>"+html+"</ul>";if(typeof injectInto!="undefined"){if(animated){$(injectInto).hide()}
$(injectInto).html(html);if(animated){$(injectInto).slideDown('fast',function(){callbackOnRender()}).addClass('animated fadeIn')}
if(!animated){callbackOnRender()}}
return html}
documentsValidator.prototype.getDocTypes=function(){var self=this;var ri=self.requiredItems;var docTypes={};if(typeof ri.documents!="undefined"&&Object.keys(ri.documents).length>0){$.each(ri.documents,function(k,v){docTypes[k]=v.properties})}
return docTypes}
Number.prototype.formatMoney=function(c,d,t){var n=this,c=isNaN(c=Math.abs(c))?2:c,d=d==undefined?",":d,t=t==undefined?".":t,s=n<0?"-":"",i=String(parseInt(n=Math.abs(Number(n)||0).toFixed(c))),j=(j=i.length)>3?j%3:0;return s+(j?i.substr(0,j)+t:"")+i.substr(j).replace(/(\d{3})(?=\d)/g,"$1"+t)+(c?d+Math.abs(n-i).toFixed(c).slice(2):"")};function unlock(selectorsToUnlock){$(selectorsToUnlock).each(function(){if(typeof $(this).attr('data-forceLock')=="undefined"){$(this).removeAttr('disabled')}})};!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var s=e();for(var i in s)("object"==typeof exports?exports:t)[i]=s[i]}}(window,function(){return function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}({"./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */function(t,e){var s;s=function(){return this}();try{s=s||new Function("return this")()}catch(t){"object"==typeof window&&(s=window)}t.exports=s},"./src/Events.ts":
/*!***********************!*\
  !*** ./src/Events.ts ***!
  \***********************/
/*! no static exports found */function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){const e={};let s;t.attach=function(t,s){e[t]||(e[t]=[]),e[t].push(s)},t.fire=function(t,s=[]){e[t]&&e[t].forEach(t=>{t(...s)})},t.remove=function(t,s){s||delete e[t],e[t]&&(e[t]=e[t].filter(t=>s!==t))},t.dom=function(t,e,i){return s||(s=t.addEventListener?(t,e,s)=>t.addEventListener(e,s,!1):"function"==typeof t.attachEvent?(t,e,s)=>t.attachEvent('on${e}',s,!1):(t,e,s)=>t['on${e}']=s),s(t,e,i)}}(e.Events||(e.Events={}))},"./src/Timer.ts":
/*!**********************!*\
  !*** ./src/Timer.ts ***!
  \**********************/
/*! no static exports found */function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(/*! ./ifvisible */"./src/ifvisible.ts");e.default=class{constructor(t,e,s){this.ifvisible=t,this.seconds=e,this.callback=s,this.stopped=!1,this.start(),this.ifvisible.on("statusChanged",t=>{!1===this.stopped&&(t.status===i.STATUS_ACTIVE?this.start():this.pause())})}start(){this.stopped=!1,clearInterval(this.token),this.token=setInterval(this.callback,1e3*this.seconds)}stop(){this.stopped=!0,clearInterval(this.token)}resume(){this.start()}pause(){this.stop()}}},"./src/ifvisible.ts":
/*!**************************!*\
  !*** ./src/ifvisible.ts ***!
  \**************************/
/*! no static exports found */function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(/*! ./Events */"./src/Events.ts"),n=s(/*! ./Timer */"./src/Timer.ts");let o,r;e.STATUS_ACTIVE="active",e.STATUS_IDLE="idle",e.STATUS_HIDDEN="hidden",e.IE=function(){let t=3;const e=document.createElement("div"),s=e.getElementsByTagName("i");for(;e.innerHTML='\x3c!--[if gt IE ${++t}]><i></i><![endif]--\x3e',s[0];);return t>4?t:void 0}();e.IfVisible=class{constructor(t,s){if(this.root=t,this.doc=s,this.status=e.STATUS_ACTIVE,this.VERSION="2.0.11",this.timers=[],this.idleTime=3e4,this.isLegacyModeOn=!1,void 0!==this.doc.hidden?(o="hidden",r="visibilitychange"):void 0!==this.doc.mozHidden?(o="mozHidden",r="mozvisibilitychange"):void 0!==this.doc.msHidden?(o="msHidden",r="msvisibilitychange"):void 0!==this.doc.webkitHidden&&(o="webkitHidden",r="webkitvisibilitychange"),void 0===o)this.legacyMode();else{const t=()=>{this.doc[o]?this.blur():this.focus()};t(),i.Events.dom(this.doc,r,t)}this.startIdleTimer(),this.trackIdleStatus()}legacyMode(){if(this.isLegacyModeOn)return;let t="blur";e.IE<9&&(t="focusout"),i.Events.dom(this.root,t,()=>this.blur()),i.Events.dom(this.root,"focus",()=>this.focus()),this.isLegacyModeOn=!0}startIdleTimer(t){t instanceof MouseEvent&&0===t.movementX&&0===t.movementY||(this.timers.map(clearTimeout),this.timers.length=0,this.status===e.STATUS_IDLE&&this.wakeup(),this.idleStartedTime=+new Date,this.timers.push(setTimeout(()=>{if(this.status===e.STATUS_ACTIVE||this.status===e.STATUS_HIDDEN)return this.idle()},this.idleTime)))}trackIdleStatus(){i.Events.dom(this.doc,"mousemove",this.startIdleTimer.bind(this)),i.Events.dom(this.doc,"mousedown",this.startIdleTimer.bind(this)),i.Events.dom(this.doc,"keyup",this.startIdleTimer.bind(this)),i.Events.dom(this.doc,"touchstart",this.startIdleTimer.bind(this)),i.Events.dom(this.root,"scroll",this.startIdleTimer.bind(this)),this.focus(this.startIdleTimer.bind(this))}on(t,e){return i.Events.attach(t,e),this}off(t,e){return i.Events.remove(t,e),this}setIdleDuration(t){return this.idleTime=1e3*t,this.startIdleTimer(),this}getIdleDuration(){return this.idleTime}getIdleInfo(){const t=+new Date;let s;if(this.status===e.STATUS_IDLE)s={isIdle:!0,idleFor:t-this.idleStartedTime,timeLeft:0,timeLeftPer:100};else{const e=this.idleStartedTime+this.idleTime-t;s={isIdle:!1,idleFor:t-this.idleStartedTime,timeLeft:e,timeLeftPer:parseFloat((100-100*e/this.idleTime).toFixed(2))}}return s}idle(t){return t?this.on("idle",t):(this.status=e.STATUS_IDLE,i.Events.fire("idle"),i.Events.fire("statusChanged",[{status:this.status}])),this}blur(t){return t?this.on("blur",t):(this.status=e.STATUS_HIDDEN,i.Events.fire("blur"),i.Events.fire("statusChanged",[{status:this.status}])),this}focus(t){return t?this.on("focus",t):this.status!==e.STATUS_ACTIVE&&(this.status=e.STATUS_ACTIVE,i.Events.fire("focus"),i.Events.fire("wakeup"),i.Events.fire("statusChanged",[{status:this.status}])),this}wakeup(t){return t?this.on("wakeup",t):this.status!==e.STATUS_ACTIVE&&(this.status=e.STATUS_ACTIVE,i.Events.fire("wakeup"),i.Events.fire("statusChanged",[{status:this.status}])),this}onEvery(t,e){return new n.default(this,t,e)}now(t){return void 0!==t?this.status===t:this.status===e.STATUS_ACTIVE}}},"./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});const i=s(/*! ./ifvisible */"./src/ifvisible.ts"),n="object"==typeof self&&self.self===self&&self||"object"==typeof t&&t.global===t&&t||this;e.ifvisible=new i.IfVisible(n,document)}).call(this,s(/*! ./../node_modules/webpack/buildin/global.js */"./node_modules/webpack/buildin/global.js"))},0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */function(t,e,s){t.exports=s(/*! ./src/main.ts */"./src/main.ts")}})});function launchMicroGamingScripts(gameProviderId,casinoURL,token,options){var strings={closeWarning:"Se estÃ¡ ejecutando una sesiÃ³n de juego. Â¿Seguro que quieres salir de esta pÃ¡gina?",error:"Error de comunicaciÃ³n con el servidor. La sesiÃ³n de juego se detendrÃ¡."}
var timer={minutes:0,callback:function(){}}
var isDemo=!1;var gameProvider=gameProviderId;var onIframeLoadedCallback=function(){}
var mGamingOptions={}
var platform=null;if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(typeof options.strings.closeWarning!="undefined"){strings.closeWarning=options.strings.closeWarning}
if(typeof options.strings.error!="undefined"){strings.error=options.strings.error}}
if(typeof options.mgOptions!="undefined"){mGamingOptions=options.mgOptions}
if(typeof options.timer!="undefined"){if(typeof options.timer.minutes!="undefined"){timer.minutes=options.timer.minutes}
if(typeof options.timer.callback!="undefined"){timer.callback=options.timer.callback}}
if(typeof options.isDemo!="undefined"&&options.isDemo===!0){isDemo=options.isDemo}
if(typeof options.onIframeLoadedCallback!="undefined"){onIframeLoadedCallback=options.onIframeLoadedCallback}
if(typeof options.platform!="undefined"){platform=options.platform}}
var prev_callbackOnGameLoad=function(){}
var prev_callbackOnExitFromGame=function(){}
var prev_callbackOnStateChange=function(){}
mGamingOptions.gameProvider=gameProvider;mGamingOptions.strings=strings;mGamingOptions.timer=timer;mGamingOptions.platform=platform;mGamingOptions.callbackOnGameLoad=function(e){if(Foundation.MediaQuery.current=="small"){e.setFullScreen(platform)}
prev_callbackOnGameLoad()}
mGamingOptions.callbackOnExitFromGame=function(e){console.log('EV: gameEXIT')
if(Foundation.MediaQuery.current=="small"){e.quitFullScreen(platform)}
prev_callbackOnExitFromGame()}
mGamingOptions.callbackOnStateChange=function(e){if(e.retrieveGameStatus()){window.onbeforeunload=function(j){$('[data-playmode] a').removeClass('is-active');if(isDemo){$('[data-playmode] a:eq(0)').addClass('is-active')}else{$('[data-playmode] a:eq(1)').addClass('is-active')}
return e.strings.closeWarning}}else{window.onbeforeunload=function(j){}}
prev_callbackOnStateChange()}
mGamingOptions.callbackOnTimerSeconds=function(e){console.log(e.getEllapsedTime(),e.getTotalTime())}
mGamingOptions.callbackOnIframeLoaded=function(e){if(getCookie("fullscreenGaming")!=""){if(getCookie("fullscreenGaming")=="true"){e.setFullWidth(platform)}}
onIframeLoadedCallback(e);window.onbeforeunload=function(j){$('[data-playmode] a').removeClass('is-active');if(isDemo){$('[data-playmode] a:eq(0)').addClass('is-active')}else{$('[data-playmode] a:eq(1)').addClass('is-active')}
return e.strings.closeWarning}}
mGamingOptions.isDemo=isDemo;var mGaming=new microGaming(gameProvider,casinoURL,token,mGamingOptions)
$('[data-casinonav-action="quitFullScreen"]').on('click',function(){mGaming.quitFullScreen(platform)})
$('[data-casinonav-action="setFullScreen"]').on('click',function(){mGaming.setFullScreen(platform)})
$('[data-casinonav-action="setFullWidth"]').on('click',function(){mGaming.setFullWidth(platform);setCookie("fullscreenGaming","true",99999)})
$('[data-casinonav-action="quitFullWidth"]').on('click',function(){mGaming.quitFullWidth(platform);setCookie("fullscreenGaming","false",99999)})
$('.top-menu [data-vcdetail]').hide()
return mGaming}
var microGaming=function(gameProviderId,casinoURL,token,options){this.microgamingFrameSelector=$('#gameFrame');this.gameURL=casinoURL;this.idleTime=999999;this.gameCurrentStatus=!1;this.strings={};this.timer={minutes:0,callback:function(){}}
this.isDemo=!1;this.token=token;this.timerIntervalHandler=null;this.timerIntervalSecondsHandler=null;this.timerIntervalSeconds=0;this.totalTime=0;this.callbackOnExitFromGame=function(){}
this.callbackOnGameLoad=function(){}
this.callbackOnStateChange=function(){}
this.callbackOnIframeLoaded=function(){}
this.callbackOnTimerSeconds=function(){}
this.gameProvider=gameProviderId;this.platform=null;this.totalTimeCookie="gameplayAccumulatedSeconds";if(typeof options!="undefined"){if(typeof options.strings!="undefined"){this.strings=options.strings}
if(typeof options.callbackOnIframeLoaded!="undefined"){this.callbackOnIframeLoaded=options.callbackOnIframeLoaded}
if(typeof options.callbackOnExitFromGame!="undefined"){this.callbackOnExitFromGame=options.callbackOnExitFromGame}
if(typeof options.callbackOnGameLoad!="undefined"){this.callbackOnGameLoad=options.callbackOnGameLoad}
if(typeof options.callbackOnStateChange!="undefined"){this.callbackOnStateChange=options.callbackOnStateChange}
if(typeof options.timer!="undefined"){if(typeof options.timer.minutes!="undefined"){this.timer.minutes=options.timer.minutes}
if(typeof options.timer.callback!="undefined"){this.timer.callback=options.timer.callback}}
if(typeof options.callbackOnTimerSeconds!="undefined"){this.callbackOnTimerSeconds=options.callbackOnTimerSeconds}
if(typeof options.platform!="undefined"){this.platform=options.platform}
if(typeof options.isDemo!="undefined"){this.isDemo=options.isDemo}}
var self=this;bamQueue.waitForExistance("getCookie",function(){if(getCookie(self.totalTimeCookie)!=""){self.totalTime=parseInt(getCookie(self.totalTimeCookie))}},100);bamQueue.waitForExistance("ifvisible",function(){ifvisible.setIdleDuration(self.idleTime)},150,10)
var eventsParser=new gamingProvider(self.gameProvider)
window.addEventListener("message",handleMessage.bind(this),!1);function handleMessage(event){var evento="";if(typeof event.data!="undefined"){eventsParser.attachEvent('launchlobby',function(){self.exitGame()})
eventsParser.attachEvent('launchbanking',function(){});eventsParser.attachEvent('gameLoaded',function(){self.gameLoaded()})
eventsParser.attachEvent('gameBusy',function(){self.setGameBusy(!0)})
eventsParser.attachEvent('gameNotBusy',function(){self.setGameBusy(!1)})
eventsParser.setEventsListener(event)}}
if(typeof casinoURL=="object"){var gameLaunchOptions={target_element:'gameFrame',launch_options:casinoURL};$('#gameFrame').replaceWith("<div id='gameFrame'></div>");SS_successFn=function(gameDispatcher){console.log(gameDispatcher)}
SS_errorFn=function(error){console.log(error)}
$.getScript("https://casino.int.a8r.games/public/sg.js",function(){window.sg.launch(gameLaunchOptions,SS_successFn,SS_errorFn)})}else{this.setGameURL()}
console.log(typeof casinoURL);this.quitFullScreen(this.platform)}
microGaming.prototype.setGameURL=function(){var self=this;var iframeElem=$(this.microgamingFrameSelector)
$(iframeElem).on('load',function(){if(self.timer.minutes>0&&!self.isDemo){self.startTimer()}
self.callbackOnIframeLoaded(self);$(this).off('load')});$(this.microgamingFrameSelector).prop('src',this.gameURL)}
microGaming.prototype.startTimer=function(){var self=this;self.timerIntervalSeconds=0;this.timerIntervalSecondsHandler=setInterval(function(){self.timerIntervalSeconds=self.timerIntervalSeconds+1;self.totalTime=self.totalTime+1;setCookie(self.totalTimeCookie,self.totalTime,0);self.callbackOnTimerSeconds(self)},1000)
if((this.timer.minutes*60*1000)-(self.totalTime*1000)<=0){self.stopTimer();self.timer.callback(self)}else{this.timerIntervalHandler=setTimeout(function(){self.stopTimer();self.timer.callback(self)},(this.timer.minutes*60*1000)-(self.totalTime*1000))}}
microGaming.prototype.clearTimer=function(){var self=this;setCookie(self.totalTimeCookie,0,0);self.totalTime=0}
microGaming.prototype.stopTimer=function(){var self=this;clearInterval(self.timerIntervalSecondsHandler);clearTimeout(self.timerIntervalHandler)}
microGaming.prototype.getEllapsedTime=function(){return this.timerIntervalSeconds}
microGaming.prototype.getTotalTime=function(){return this.totalTime}
microGaming.prototype.hideGame=function(){$(this.microgamingFrameSelector).hide()}
microGaming.prototype.showGame=function(){$(this.microgamingFrameSelector).show()}
microGaming.prototype.launchRealityCheck=function(){}
microGaming.prototype.setFullScreen=function(platform){var elem=$(this.microgamingFrameSelector)[0];try{if(elem.requestFullscreen){elem.requestFullscreen()}else if(elem.mozRequestFullScreen){elem.mozRequestFullScreen()}else if(elem.webkitRequestFullscreen){elem.webkitRequestFullscreen()}else if(elem.msRequestFullscreen){elem.msRequestFullscreen()}else{$('body').attr('data-fullScreenGaming','')}}catch{console.log("Unsupported fullscreen")}
if(typeof platform!="undefined"&&platform=="ios"){try{webkit.messageHandlers.setFullScreen.postMessage(!0)}catch(err){console.log('The native context does not exist yet')}}}
microGaming.prototype.quitFullScreen=function(platform){$('body').removeAttr('data-fullScreenGaming')
if(typeof platform!="undefined"&&platform=="ios"){try{webkit.messageHandlers.setFullScreen.postMessage(!1)}catch(err){console.log('The native context does not exist yet')}}}
microGaming.prototype.setFullWidth=function(){$('body').attr('data-fullWidthGaming','')}
microGaming.prototype.quitFullWidth=function(){$('body').removeAttr('data-fullWidthGaming')}
microGaming.prototype.exitGame=function(){this.callbackOnExitFromGame(this)}
microGaming.prototype.gameLoaded=function(){this.callbackOnGameLoad(this)}
microGaming.prototype.setGameBusy=function(state){if(state===!0||state===!1){this.gameCurrentStatus=state
this.callbackOnStateChange(this)}}
microGaming.prototype.retrieveGameStatus=function(){return this.gameCurrentStatus}
microGaming.prototype.stopGame=function(callback){$(this.microgamingFrameSelector)[0].contentWindow.postMessage("StopGamePlay","*")}
microGaming.prototype.showNotification=function(data,callback){var data={id:"shownotification",payload:{notificationid:'bonusfundsnotification',title:'Title Text',message:'Message Text with',secondstilldismiss:30,url:'https://termsandconditions.com'}};document.getElementById('gameFrame').contentWindow.postMessage(data,"*")}
function launchRealityCheckCasinoFunctions(microGamingObj,token){var query=new formeSubmit(!1,"/data/?action=realitycheck",{extraFields:{"token":token,},callbackOnSuccess:function(e){var time=microGamingObj.getEllapsedTime();microGamingObj.hideGame();$('#realityCheckCasinoModal').data('callback',function(){$('#realityCheckCasinoModal [data-continue]').on('click',function(){microGamingObj.showGame();microGamingObj.clearTimer();microGamingObj.startTimer();$('#realityCheckCasinoModal').core_reveal('close')})
$('#realityCheckCasinoModal [data-cancel]').on('click',function(){document.location.href="/";microGamingObj.clearTimer();$('#realityCheckCasinoModal').core_reveal('close')})
microGamingObj.stopTimer()})
$('#realityCheckCasinoModal').core_reveal('open',{params:{"balance":e.data,"time":microGamingObj.getTotalTime()}})},callbackOnFail:function(){microGamingObj.hideGame();if(typeof microGamingObj.strings.error!="undefined"){alert(microGamingObj.strings.error)}
window.location.reload()},callbackOnError:function(){microGamingObj.hideGame();if(typeof microGamingObj.strings.error!="undefined"){alert(microGamingObj.strings.error)}
window.location.reload()}})}
var gamingProvider=function(gameProviderId){this.gameProviderId=gameProviderId;this.events={launchLobby:function(){},launchBanking:function(){},gameLoaded:function(){},gameBusy:function(){},gameNotBusy:function(){}}}
gamingProvider.prototype.attachEvent=function(event,callback){var self=this;var id=self.getProvider();switch(event){case "launchLobby":self.events.launchLobby=function(){callback()}
break;case "launchBanking":self.events.launchBanking=function(){callback()}
break;case "gameLoaded":self.events.gameLoaded=function(){callback()};break;case "gameBusy":self.events.gameBusy=function(){callback()}
break;case "gameNotBusy":self.events.gameNotBusy=function(){callback()}
break}}
gamingProvider.prototype.getProvider=function(){return this.gameProviderId}
gamingProvider.prototype.setEventsListener=function(eventData){var self=this;var provider=self.getProvider();switch(provider){case 1:try{var evento=JSON.parse(eventData.data);if(typeof evento.event!="undefined"){evento=evento.event}}catch{console.log("Unable to parse event")}
switch(evento){case "launchlobby":self.events.launchLobby();break;case "launchbanking":self.events.launchBanking();break;case "gameLoaded":self.events.gameLoaded();break;case "gameBusy":self.events.gameBusy();break;case "gameNotBusy":self.events.gameNotBusy();break}
break;case 2:break}};var loaderProObject=function(injectTo,options){this.injectToElem=$(injectTo);this.loaderHtml='<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';this.loaderAttr='data-loaderPro';this.enabledOnLoad=!0;this.insertBefore=!1;if(typeof options!="undefined"){if(typeof options.enabledOnLoad!="undefined"){this.enabledOnLoad=options.enabledOnLoad}
if(typeof options.insertBefore!="undefined"){this.insertBefore=options.insertBefore}}
if(this.insertBefore){if($(this.injectToElem).parent().children('['+this.loaderAttr+']').length==0){$(this.injectToElem).before('<div '+this.loaderAttr+'>'+this.loaderHtml+'</div>')}}else{if($(this.injectToElem).children('['+this.loaderAttr+']').length==0){$(this.injectToElem).prepend('<div '+this.loaderAttr+'>'+this.loaderHtml+'</div>')}}
if(this.insertBefore){this.elem=$(this.injectToElem).parent().find('['+this.loaderAttr+']')}else{this.elem=$(this.injectToElem).find('['+this.loaderAttr+']')}
if(this.enabledOnLoad){this.start()}else{this.stop()}}
loaderProObject.prototype.start=function(options){var self=this;$(self.elem).addClass('is-active')}
loaderProObject.prototype.stop=function(options){var self=this;$(self.elem).removeClass('is-active')}
loaderProObject.prototype.destroy=function(options){var self=this;$(self.elem).remove()}
loaderProObject.prototype.outputHTML=function(options){var self=this;if(this.enabledOnLoad){var enabledHTML=" class='is-active'"}else{var enabledHTML=""}
return'<div '+this.loaderAttr+enabledHTML+'>'+self.loaderHtml+'</div>'};Number.prototype.formatMoney=function(c,d,t){var n=this,c=isNaN(c=Math.abs(c))?2:c,d=d==undefined?",":d,t=t==undefined?".":t,s=n<0?"-":"",i=String(parseInt(n=Math.abs(Number(n)||0).toFixed(c))),j=(j=i.length)>3?j%3:0;return s+(j?i.substr(0,j)+t:"")+i.substr(j).replace(/(\d{3})(?=\d)/g,"$1"+t)+(c?d+Math.abs(n-i).toFixed(c).slice(2):"")};var systemCurrency=function(ISOCurrency,scheme,options){this.currency=ISOCurrency;this.currencySymbol=null;this.strings={"millones":"{t}millones{/t}"}
this.modo=0;this.scheme=scheme;if(typeof scheme=="undefined"Â ||Â scheme==null){console.log("Missing object 'scheme'. Don't forget to pass the curriencies scheme.");return!1}else{var sc=this.getScheme(this.currency);if(sc){this.currencySymbol=sc.simbolo;this.modo=sc.modo}}
if(typeof options!="undefined"){if(typeof options.strings!="undefined"){if(typeof options.strings.millones!="undefined"){this.strings.millones=options.strings.millones}}}}
systemCurrency.prototype.getISOCurrency=function(){return this.currency}
systemCurrency.prototype.getSymbol=function(){return this.currencySymbol}
systemCurrency.prototype.getMode=function(){return this.modo}
systemCurrency.prototype.getMoneda=function(importe,ISOCurrency,extra){var self=this;if(typeof ISOCurrency!="undefined"){var scheme=self.getScheme(ISOCurrency);return self.mostrarMoneda(importe,ISOCurrency,scheme.simbolo,scheme.modo,extra)}else{return self.mostrarMoneda(importe,null,extra)}}
systemCurrency.prototype.getScheme=function(ISOCurrency){var self=this;if(typeof self.scheme[ISOCurrency]!="undefined"){return self.scheme[ISOCurrency]}
return!1}
systemCurrency.prototype.mostrarMoneda=function(importe,ISOCurrency,symbol,mode,extra){var self=this;if(typeof ISOCurrency=="undefined"||ISOCurrency==null){var divisa=self.getISOCurrency()}else{var divisa=ISOCurrency}
if(typeof symbol=="undefined"||symbol==null){var currencySymbol=self.getSymbol()}else{var currencySymbol=symbol}
if(typeof mode=="undefined"||mode==null){var modo=self.getMode()}else{var modo=mode}
var currentImporte=null;if(isNaN(importe)){return null}else{currentImporte=importe}
if(importe<0){var negative="-";importe=Math.abs(importe)
currentImporte=importe}else{var negative=""}
if(typeof extra!="undefined"&&extra!=null&&typeof extra.shortNumber!="undefined"&&extra.shortNumber&&String(importe).length>5){currentImporte=roundLikePHP(importe/1000000,1);if(String(currentImporte).length<3||!Number.isInteger(currentImporte)){currentImporte=currentImporte.formatMoney(1,',','.')}else{currentImporte=currentImporte.formatMoney(0,',','.')}
currentImporte=currentImporte+self.strings.millones.substring(0,1)}else{if(String(importe).length<3||!Number.isInteger(importe)){currentImporte=parseFloat(importe).formatMoney(2,',','.')}else{currentImporte=parseFloat(importe).formatMoney(0,',','.')}}
if(typeof extra!="undefined"&&extra!=null&&typeof extra.wrapper!="undefined"&&extra.wrapper){var smb="<"+extra.wrapper+">"+currencySymbol+"</"+extra.wrapper+">"}else{var smb=currencySymbol}
switch(modo){default:if(modo==1){return negative+smb+currentImporte}else{return negative+currentImporte+smb}}
function roundLikePHP(num,dec){var num_sign=num>=0?1:-1;return parseFloat((Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec))}}