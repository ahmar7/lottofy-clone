$(document).on('submit', 'form[data-abide]', function (ev, frm) { ev.preventDefault() })
function mainStringifiedLaunches(strings) {
    bamQueue.addToQueue(function () {
        setChildLimiter($('[data-participants][data-limit]'), { strings: { remaining: strings.strings.remaining } })
        setChildLimiter($('ul.extrasList[data-limit]'), { strings: { remaining: strings.strings.remaining } })
        setChildLimiter($('#fondoBets [data-club-development]'), { strings: { remaining: strings.strings.remaining }, limit: 100 })
    })
}
function openNotificationsBox() {
    if ($("#notifications").attr("aria-hidden") == "true") {
        $('#notifications [data-notificationData]').removeClass('is-active'); notificationsLoader = new loaderProObject($('#notifications ul.list'), { enabledOnLoad: !0, insertBefore: !0 }); myForm = new formeSubmit(!1, "/data/?action=notifications", {
            callbackOnSuccess: function (e) {
                if (Object.keys(e.data[0]).length > 0) {
                    $("#notifications ul").html(""); $.each(e.data[0], function (key, val) {
                        var li = "<li class=" + val.disabled + ">"; if (val.tipo == 1) { li += "<span><img src='" + val.concepto.avatar + "' class='avatar'></span>"; li += "<span><a href='" + val.concepto.url + "'>" + val.concepto.grupo + "</a></span>"; li += "<span>" + val.concepto.descripcion + "</span>"; li += "<span>" + val.fechaFormat + "</span>" } else if (val.tipo == 2) {
                            li += "<span><img src='" + val.concepto.avatar + "' class='avatar'></span>"; li += "<span><a href='" + val.concepto.url + "'>" + val.concepto.grupo + "</a></span>"; if (val.aceptada == 0) { li += "<span><strong><a href='" + val.concepto.url + "'>" + e.data.lang.verInvitacion + "</a></strong></span>" } else if (val.aceptada == 1) { li += "<span>" + e.data.lang.aceptada + "</span>" } else { li += "<span>" + e.data.lang.rechazada + "</span>" }
                            li += "<span>" + val.fechaFormat + "</span>"
                        } else if (val.tipo == 3) { li += "<span><i class='icon-games-" + val.concepto.tipo + "'></i></span>"; li += "<span>" + e.data.lang.num + ": <strong>" + val.concepto.numero + "</strong></span>"; li += "<span>" + val.concepto.descripcion + "</span>"; li += "<span>" + val.fechaFormat + "</span>" }
                        $("#notifications ul").append(li)
                    }); $('[data-usernotifications] span.badge').remove(); $('[data-usernotifications] button').removeAttr('data-alarm')
                }
                notificationsLoader.stop(); $('#notifications [data-notificationData]').addClass('is-active')
            },
        })
    }
}
bamQueue.addToQueue(function () {
    bamQueue.waitForExistance("ifvisible", function () {
        window.inactivityTime = !1; window.inactivityInterval = !1; ifvisible.on("focus", function () {
            console.log("ON")
            window.inactivityTime = !1; clearInterval(window.inactivityInterval)
        })
        ifvisible.on("blur", function () {
            console.log("OFF")
            if (typeof window.inactivityTime == Boolean) { window.inactivityTime = 0 } else { clearInterval(window.inactivityInterval) }
            window.inactivityInterval = setInterval(function () { window.inactivityTime++ }, 1000)
        })
        ifvisible.on("idle", function () {
            console.log("IDLE")
            if (typeof window.inactivityTime == Boolean) { window.inactivityTime = 0 } else { clearInterval(window.inactivityInterval) }
            window.inactivityInterval = setInterval(function () { window.inactivityTime++ }, 1000)
        }); ifvisible.on("wakeup", function () {
            console.log("AWAKEN")
            clearInterval(window.inactivityInterval); window.inactivityTime = !1
        }); ifvisible.setIdleDuration(5)
    }, 1000, 20)
    $(document).off('click.activityDetector').off('touchstart.activityDetector').on('click.activityDetector touchstart.activityDetector', function () { if (typeof window.inactivityTime != "undefined") { window.inactivityTime = 0 } })
    $('[data-menu-games] [data-coreToggle]').off('afterShow').on('afterShow', function () { if ($(this).closest('li[data-nomenu]').length == 0) { var thisElem = $(this).closest('li').attr('data-gameType'); $("#menu-gamesMode ul").removeClass('is-active'); var menuElem = $("#menu-gamesMode ul[data-gameType='" + thisElem + "']"); if ($(menuElem).length == 1) { $(menuElem).addClass('is-active') } } else { var thisElem = ""; $("#menu-gamesMode ul").removeClass('is-active') } })
    $('[data-coretoggle="menu-lang"].singlemode').on('afterShow', function () { var currentLang = $(this).find('[data-lang]').attr('data-lang'); $('#menu-lang li[data-lang="' + currentLang + '"]').hide() })
    $('#menu-lang:not(.singlemode) button:not([data-save-lang])').add('#menu-lang-mobile button:not([data-save-lang])').on('click', function () {
        if ($(this).closest('[data-menu-lang]').attr('id') == "menu-lang") { var elem = $('#menu-lang:not(.singlemode)') } else if ($(this).closest('[data-menu-lang]').attr('id') == "menu-lang-mobile") { var elem = $('#menu-lang-mobile') }
        $(elem).find('[data-save-lang]').removeAttr('disabled'); if (typeof $(this).attr('data-curr') != "undefined") { $(elem).find('button[data-curr]').removeClass('is-active') } else if (typeof $(this).attr('data-lang') != "undefined") { $(elem).find('button[data-lang]').removeClass('is-active') }
        if ($(this)[0].nodeName != "SELECT") { $(this).addClass('is-active') }
    })
    $('#menu-lang select').on('change', function () {
        if ($(this).closest('[data-menu-lang]').attr('id') == "menu-lang") { var elem = $('#menu-lang:not(.singlemode)') }
        $(elem).find('[data-save-lang]').removeAttr('disabled')
    })
    $('#menu-lang:not(.singlemode) button[data-save-lang]').add('#menu-lang-mobile button[data-save-lang]').on('click', function () {
        if ($(this).closest('[data-menu-lang]').attr('id') == "menu-lang") { var elem = $('#menu-lang:not(.singlemode)'); var currentCurrency = $(elem).find('select').val() } else if ($(this).closest('[data-menu-lang]').attr('id') == "menu-lang-mobile") { var elem = $('#menu-lang-mobile'); var currentCurrency = $(elem).find('[data-curr].is-active').attr('data-curr') }
        var currentURL = $(elem).find('[data-lang][data-url].is-active').attr('data-url')
        window.location = currentURL + "&currency=" + currentCurrency
    })
    $('#menu-lang.singlemode [data-lang] button').add('#menu-lang-mobile [data-lang] button').on('click', function () {
        var url = $(this).attr('data-url'); var value = $(this).text(); if ($(this).closest('[data-menu-lang]').attr('id') == "menu-lang") { $('[data-coreToggle="menu-lang"] [data-lang]').text(value) } else if ($(this).closest('[data-menu-lang]').attr('id') == "menu-lang-mobile") { $('[menu-lang-mobile] [data-lang]').text(value) }
        window.location = url
    }); $("[data-notifications]").on("click", function () { openNotificationsBox() }); setTimeout(function () { $('[data-top-menu-gamesnav]').animate({ scrollLeft: 70 }, 1000); $('[data-top-menu-gamesnav]').animate({ scrollLeft: 0 }, 1000) }, 1000)
    checkMenuExcess('.top-subMenu', '[data-menu-games]'); checkMenuExcess('[data-inlineGamesMenuContainer]', '[data-inlineGamesMenu]'); $('[data-gamingtabs] li a').on('click', function (e) {
        var mobileCompanion = $(e.target); $('[data-gamingtabs] li').removeClass('is-active').find('a').removeAttr('aria-selected'); $('[data-tabs-content="gamingTabs"] > .tabs-panel').removeClass('is-active'); if (typeof $(mobileCompanion).attr('data-tabs-target') != "undefined") {
            var tg = $(mobileCompanion).attr('data-tabs-target'); var elem = $('[data-top-menu-gamesnav]').find('[data-tab-id=' + tg + ']'); var optionTag = $(mobileCompanion).parent().attr('data-option-tag'); if (typeof $(elem).attr('data-hidden') != "undefined") { $('body').attr('data-notShowingSubMenu', '') } else { $('body').removeAttr('data-notShowingSubMenu') }
            if (typeof elem != "undefined" && $(elem).length > 0) {
                $('[data-top-menu-gamesnav] > ul').removeClass('is-active')
                $(elem).addClass('is-active')
            }
        }
        if (typeof core_library != "undefined") { core_library.closeall() }
        checkMenuExcess('.top-subMenu', '[data-menu-games]'); checkMenuExcess('[data-inlineGamesMenuContainer]', '[data-inlineGamesMenu]')
    })
    $('[data-gamingtabs] li a').on('click', function () { if (!Foundation.MediaQuery.atLeast('large')) { $('html, body').animate({ scrollTop: 0 }, 1000) } })
    function setGamingTabFromCookie() { }
    $(document).on('click', '[data-menu-viewmore] a,[data-menu-viewmore] button', function (e) { if ($(e.target).closest('[data-menu-games]').length > 0) { menuExcessNextItem('.top-subMenu', '[data-menu-games]') } else if ($(e.target).closest('[data-inlineGamesMenu]').length > 0) { menuExcessDropdownActions('[data-inlineGamesMenuContainer]', '[data-inlineGamesMenu]', '#overflown-gamesCategories') } })
    $('[data-sectionsNavigator] a[data-tabs-target]').off('click').on('click', function () {
        var tabId = $(this).closest('[data-tabs]').attr('id')
        var tabTag = $(this).closest('[data-option-tag]').attr('data-option-tag')
        $(this).closest('[data-tabs]').find('[tabs-title] a').each(function () { $(this).removeAttr("aria-selected") })
        $(this).attr('aria-selected', 'true')
        var lnAnchor = $(this).attr('data-tabs-target'); $('[data-tabs-content="' + tabId + '"] .tabs-panel').removeClass('is-active'); $('[data-tabs-content="' + tabId + '"]').find('#' + lnAnchor).addClass('is-active'); $('[data-gamingtabs] [data-option-tag]').removeClass('is-active').find('a').removeAttr('aria-selected'); $('[data-gamingtabs] [data-option-tag="' + tabTag + '"]').addClass('is-active').find('a').attr('aria-selected', !0)
    })
})
$(window).resize(); sbMenusTimer = !1; $(window).resize(function () {
    if (typeof core_library == "object") { core_library.closeall() }
    if (typeof sbMenusTimerThree != "undefined") { clearTimeout(sbMenusTimerThree) }
    sbMenusTimerThree = setTimeout(function () {
        if ($('#overflown-gamesCategories:visible').length > 0) { $('#overflown-gamesCategories').foundation('close') }
        checkMenuExcess('.top-subMenu', '[data-menu-games]'); checkMenuExcess('[data-inlineGamesMenuContainer]', '[data-inlineGamesMenu]')
    }, 30)
})
function checkMenuExcess(containerSelector, listItemsSelector, options) {
    var container = containerSelector; var items = containerSelector + " " + listItemsSelector; var height = $(listItemsSelector + " > *:eq(0)").height(); var stickViewMoreToLastItem = !1; if (typeof options != "undefined") { if (typeof options.stickToLast != "undefined" && options.stickToLast === !0) { stickViewMoreToLastItem = !0 } }
    if (typeof Foundation != "undefined") {
        if (Foundation.MediaQuery.atLeast('medium')) {
            if ($(items + ':visible').height() > height) {
                $(container + ' [data-menu-viewmore]').addClass('is-active')
                if (stickViewMoreToLastItem) { stickViewMoreToLast(containerSelector, listItemsSelector) }
                $(container).addClass('is-overflown')
            } else {
                $(container).removeClass('is-overflown')
                $(container + ' [data-menu-viewmore]').removeClass('is-active')
                resetExcessPosition(containerSelector, listItemsSelector)
            }
        }
    }
}
function stickViewMoreToLast(containerSelector, listItemsSelector) {
    var container = containerSelector; var items = containerSelector + " " + listItemsSelector; var height = $(listItemsSelector + " > *:eq(0)").height(); var lastVisibleItem = !1; $($(items + ':visible' + " > li:not([data-menu-viewmore])")).each(function () { if ($(this).position().top < height) { lastVisibleItem = $(this) } })
    if (lastVisibleItem) {
        $(container + ' [data-menu-viewmore]').css({ right: "none" })
        $(container + ' [data-menu-viewmore]').animate({ left: $(lastVisibleItem).position().left + $(lastVisibleItem).outerWidth() })
    }
}
function menuExcessNextItem(containerSelector, listItemsSelector, options) {
    var container = containerSelector; var items = containerSelector + " " + listItemsSelector; var stickViewMoreToLastItem = !1; if (typeof options != "undefined") { if (typeof options.stickToLast != "undefined" && options.stickToLast === !0) { stickViewMoreToLastItem = !0 } }
    var containerHeight = $(containerSelector).outerHeight()
    var pages = parseInt($(items + ':visible').outerHeight() / containerHeight)
    var elemHeight = $(items + ':visible li:eq(0)').outerHeight()
    var currentTop = $(items + ':visible li:eq(0)').position().top; var currentPage = parseInt(Math.abs(currentTop) / Math.abs(Math.floor(containerHeight))) + 1; $(items + ':visible li:not([data-menu-viewmore])').each(function () { var page = parseInt(Math.abs($(this).position().top) / Math.abs(Math.floor(containerHeight))) + 1; $(this).attr('data-page', page) })
    var itemsToMove = $(items + ':visible li')
    var endAnim = $(itemsToMove).length; if (currentPage < pages) {
        $(items + ':visible li').animate({ top: "-=" + elemHeight }, 300, function () { endAnim--; if (endAnim == 0) { if (stickViewMoreToLastItem) { stickViewMoreToLast(containerSelector, listItemsSelector, options) } } })
        $(items + ':visible li:not([data-menu-viewmore])').each(function () { if ($(this).attr('data-page') != currentPage) { $(this).css('visibility', 'visible') } else { $(this).css('visibility', 'hidden') } })
    } else {
        $(items + ':visible li').animate({ top: 0 }, 300, function () { endAnim--; if (endAnim == 0) { if (stickViewMoreToLastItem) { stickViewMoreToLast(containerSelector, listItemsSelector, options) } } })
        $(items + ':visible li:not([data-menu-viewmore])').each(function () { if ($(this).attr('data-page') != currentPage) { $(this).css('visibility', 'hidden') } else { $(this).css('visibility', 'visible') } })
    }
}
function menuExcessDropdownActions(containerSelector, listItemsSelector, dropdownItem) { var container = containerSelector; var items = containerSelector + " " + listItemsSelector; var height = $(listItemsSelector + " > *:eq(0)").height(); if (typeof Foundation != "undefined") { if (Foundation.MediaQuery.atLeast('medium')) { $(items + ':visible li:not([data-menu-viewmore])').each(function (k, v) { if (k != 0) { if (parseInt($(this).position().top) >= parseInt(height)) { $(dropdownItem).find('li:eq(' + ($(this).index() - 1) + ')').addClass('visible') } else { $(dropdownItem).find('li:eq(' + ($(this).index() - 1) + ')').removeClass('visible') } } }) } } }
function resetExcessPosition(containerSelector, listItemsSelector) { var container = containerSelector; var items = containerSelector + " " + listItemsSelector; $(items + ':visible li').animate({ top: 0 }, 300).css('visibility', 'visible') }
function manageSlideMotion(elem, startPos, time, timeToWakeUpFromTouch, startAnimating) {
    var selector = $(elem)
    inicializaScrollArea()
    var initWithAnimation = !0
    var start = 0
    var timer = 10000
    var multiplicador = 1
    var holdTime = 3000
    var holdTimeInterval = !1
    var totalScrollableArea = $(selector)[0].scrollWidth - $(selector).width()
    var direction = "right"
    var resizeId; multiplicador = $(document).width() / 320
    if (typeof startPos != "undefined") { start = startPos }
    if (typeof time != "undefined") { timer = time }
    if (typeof timeToWakeUpFromTouch != "undefined") { holdTime = timeToWakeUpFromTouch }
    if (typeof startAnimating != "undefined") { initWithAnimation = startAnimating }
    var totalToScroll = 0
    var isHover = !1
    function inicializaScrollArea() {
        if (!Foundation.MediaQuery.atLeast('large')) {
            var max = 0
            $(selector).find(' > div > *').each(function (k, v) { max = max + $(this).outerWidth(!0) })
            $(selector).find(' > div').css('width', max + 'px')
        }
    }
    $(selector).scrollLeft(start)
    if (initWithAnimation) {
        $(selector).off('scroll').on('scroll', function () {
            if ($(selector).scrollLeft() >= totalScrollableArea) {
                $(selector).stop().finish()
                start = 0
                if (!isHover) { animateToLeft() }
            }
            if ($(selector).scrollLeft() <= 0) {
                $(selector).stop().finish()
                start = 0
                if (!isHover) { animateToRight() }
            }
        })
        $(selector).trigger('scroll')
        $(selector).on('touchstart mouseenter', function (e) {
            start = $(selector).scrollLeft()
            $(selector).stop().finish()
            isHover = !0
        })
        $(selector).on('touchend mouseleave', function (e) {
            clearTimeout(holdTimeInterval)
            start = $(selector).scrollLeft()
            holdTimeInterval = setTimeout(function () { if (direction == "right") { animateToRight() } else { animateToLeft() } }, holdTime)
            isHover = !1
        })
        $(window).on('resize', function () {
            clearTimeout(resizeId); resizeId = setTimeout(function () {
                inicializaScrollArea()
                multiplicador = $(document).width() / 320
                $(selector).removeClass('non-scrollable')
                if ($(selector).find(' > div').width() > $(selector).width()) { if (direction == "right") { animateToRight() } else { animateToLeft() } } else { $(selector).addClass('non-scrollable') }
            }, 1500)
        })
    }
    function animateToRight() {
        direction = "right"
        totalToScroll = totalScrollableArea - start
        if ($(selector).find(' > div').width() > $(selector).width()) {
            $(selector).removeClass('non-scrollable')
            if ($(selector).scrollLeft() >= totalScrollableArea) { animateToLeft() } else {
                var newTime = (totalToScroll * timer) / totalScrollableArea
                newTime = newTime / multiplicador
                $(selector).animate({ scrollLeft: '+=' + totalToScroll }, newTime, "linear", function () { })
            }
        } else { $(selector).addClass('non-scrollable') }
    }
    function animateToLeft() {
        direction = "left"
        totalToScroll = (start - totalScrollableArea) * (-1)
        if ($(selector).find(' > div').width() > $(selector).width()) {
            $(selector).removeClass('non-scrollable')
            if ($(selector).scrollLeft() <= 0) { animateToRight() } else {
                var newTime = (totalToScroll * timer) / totalScrollableArea
                newTime = newTime / multiplicador
                $(selector).animate({ scrollLeft: '-=' + totalToScroll }, newTime, "linear", function () { })
            }
        } else { $(selector).addClass('non-scrollable') }
    }
}
function GetIEVersion() {
    var sAgent = window.navigator.userAgent; var Idx = sAgent.indexOf("MSIE"); if (Idx > 0)
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx))); else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11; else return 0
}
function enableLoaderWatch() {
    hideMobileMenu(); $(document).off('click', '#mobileGamesMenuOverlay').on('click', '#mobileGamesMenuOverlay', function () { hideMobileMenu() })
    $('[data-mobileGamesMenuToggle]').on('click', function () {
        if (!$('#mobileGamesMenu').is(":visible")) { showMobileMenu() } else { hideMobileMenu() }
        if ($('#mobileGamesMenu').is(":visible")) { $('[data-mobileGamesMenuToggle]').addClass('is-opened').removeClass('is-closed') } else { $('[data-mobileGamesMenuToggle]').removeClass('is-opened').addClass('is-closed') }
    })
    $('#mobileGamesMenu  ul > li').each(function () { if ($(this).find('ul').length > 0) { $(this).addClass('has-submenu'); var menuElem = $(this); $(this).find('a:eq(0)').click(function () { var elemToDeploy = $(this).parent().find('ul:eq(0)'); $(elemToDeploy).slideToggle('fast', function () { if ($(elemToDeploy).is(':visible')) { $(menuElem).addClass('is-opened') } else { $(menuElem).removeClass('is-opened') } }) }) } })
    $('body').attr('data-isloaded', '')
}
function hideMobileMenu() {
    $('[data-mobileGamesMenuToggle]').removeClass('is-opened'); $('#mobileGamesMenu').hide().removeClass('is-open'); $('#mobileMenu').removeClass('is-open')
    $('#mobileGamesMenuOverlay').remove(); $('body').removeAttr('data-mobile-menu')
}
function showMobileMenu() {
    $('#mobileGamesMenu').show().addClass('is-open'); $('#mobileMenu').addClass('is-open')
    $('#superContainer').append('<div class="reveal-overlay" id="mobileGamesMenuOverlay"></div>'); $('body').attr('data-mobile-menu', 'is-open')
}
function menuEvents() {
    $('#mobileGamesMenu').off('show.zf.dropdown').on('show.zf.dropdown', function () {
        $('[data-mobileGamesMenuToggle]').addClass('is-opened').removeClass('is-closed'); $('#mobileMenu').addClass('is-open')
        $('#superContainer').append('<div class="reveal-overlay" id="mobileGamesMenuOverlay"></div>')
    })
    $('#mobileGamesMenu').off('hide.zf.dropdown').on('hide.zf.dropdown', function () {
        $('[data-mobileGamesMenuToggle]').removeClass('is-opened').addClass('is-closed'); $('#mobileMenu').removeClass('is-open')
        $('#mobileGamesMenuOverlay').remove()
    })
}
function attachNavMenuActions() {
    $('[data-top-menu-gamesNav] li:not([data-noMenu]) a').each(function () { $(this).replaceWith("<button>" + $(this).html() + "</button>") })
    if (is_touch_device()) {
        $('[data-menu-games] li:not([data-noMenu]):not([data-menu-viewmore]) a').each(function () { $(this).replaceWith("<button>" + $(this).html() + "</button>") })
        $('[data-menu-games] button').on("click", function () { $('#navMenuGameMode[data-reveal]').attr('data-gameType', $(this).closest('li').attr('data-gameType')); $('#navMenuGameMode[data-reveal]').core_reveal("open") })
        $('[data-menu-games]').addClass('animated'); $('[data-menu-games] li a[data-coreToggle="menu-clubs"]').on('click', function (e) { if (typeof core_library != "undefined") { core_library.open($('[data-coreToggle="menu-clubs"]')) } })
        $('[data-menu-games] li a[data-coreToggle="menu-usersClubs"]').on('click', function (e) { if (typeof core_library != "undefined") { core_library.open($('[data-coreToggle="menu-usersClubs"]')) } })
    }
    $('[data-top-menu-gamesnav] button').on("click", function () { $('#navMenuGameMode[data-reveal]').attr('data-gameType', $(this).closest('li').attr('data-gameType')); $('#navMenuGameMode[data-reveal]').core_reveal("open") })
    $('body[data-app] .top-menu > .clearfix').on("click", function () { $('html, body').animate({ scrollTop: 0 }, 1000) })
    $('[data-top-menu-gamesNav]').addClass('animated')
}
function customizeGamesNav(options) {
    var modoIndividual = !1; var modoFondo = !1; var modoClub = !1; var modoGrupos = !1; var modoDemo = !1; var modoReal = !1; if (typeof options != "undefined") {
        if (typeof options.modoIndividual != "undefined") {
            modoIndividual = {}
            modoIndividual.caption = ""; modoIndividual.url = ""; modoIndividual.icon = ""; modoIndividual.extraCaption = ""; if (typeof options.modoIndividual.caption != "undefined") { modoIndividual.caption = options.modoIndividual.caption }
            if (typeof options.modoIndividual.url != "undefined") { modoIndividual.url = options.modoIndividual.url }
            if (typeof options.modoIndividual.icon != "undefined") { modoIndividual.icon = options.modoIndividual.icon }
            if (typeof options.modoIndividual.extraCaption != "undefined") { modoIndividual.extraCaption = options.modoIndividual.extraCaption }
        }
        if (typeof options.modoFondo != "undefined") {
            modoFondo = {}
            modoFondo.caption = ""; modoFondo.url = ""; modoFondo.icon = ""; modoFondo.extraCaption = ""; if (typeof options.modoFondo.caption != "undefined") { modoFondo.caption = options.modoFondo.caption }
            if (typeof options.modoFondo.url != "undefined") { modoFondo.url = options.modoFondo.url }
            if (typeof options.modoFondo.icon != "undefined") { modoFondo.icon = options.modoFondo.icon }
            if (typeof options.modoFondo.extraCaption != "undefined") { modoFondo.extraCaption = options.modoFondo.extraCaption }
        }
        if (typeof options.modoClub != "undefined") {
            modoClub = {}
            modoClub.caption = ""; modoClub.url = ""; modoClub.icon = ""; modoClub.extraCaption = ""; if (typeof options.modoClub.caption != "undefined") { modoClub.caption = options.modoClub.caption }
            if (typeof options.modoClub.url != "undefined") { modoClub.url = options.modoClub.url }
            if (typeof options.modoClub.icon != "undefined") { modoClub.icon = options.modoClub.icon }
            if (typeof options.modoClub.extraCaption != "undefined") { modoClub.extraCaption = options.modoClub.extraCaption }
        }
        if (typeof options.modoGrupos != "undefined") {
            modoGrupos = {}
            modoGrupos.caption = ""; modoGrupos.url = ""; modoGrupos.icon = ""; modoGrupos.extraCaption = ""; if (typeof options.modoGrupos.caption != "undefined") { modoGrupos.caption = options.modoGrupos.caption }
            if (typeof options.modoGrupos.url != "undefined") { modoGrupos.url = options.modoGrupos.url }
            if (typeof options.modoGrupos.icon != "undefined") { modoGrupos.icon = options.modoGrupos.icon }
            if (typeof options.modoGrupos.extraCaption != "undefined") { modoGrupos.extraCaption = options.modoGrupos.extraCaption }
        }
        if (typeof options.modoDemo != "undefined") {
            modoDemo = {}
            modoDemo.caption = ""; modoDemo.url = ""; modoDemo.icon = ""; modoDemo.extraCaption = ""; if (typeof options.modoDemo.caption != "undefined") { modoDemo.caption = options.modoDemo.caption }
            if (typeof options.modoDemo.url != "undefined") { modoDemo.url = options.modoDemo.url }
            if (typeof options.modoDemo.icon != "undefined") { modoDemo.icon = options.modoDemo.icon }
            if (typeof options.modoDemo.extraCaption != "undefined") { modoDemo.extraCaption = options.modoDemo.extraCaption }
        }
        if (typeof options.modoReal != "undefined") {
            modoReal = {}
            modoReal.caption = ""; modoReal.url = ""; modoReal.icon = ""; modoReal.extraCaption = ""; if (typeof options.modoReal.caption != "undefined") { modoReal.caption = options.modoReal.caption }
            if (typeof options.modoReal.url != "undefined") { modoReal.url = options.modoReal.url }
            if (typeof options.modoReal.icon != "undefined") { modoReal.icon = options.modoReal.icon }
            if (typeof options.modoReal.extraCaption != "undefined") { modoReal.extraCaption = options.modoReal.extraCaption }
        }
    }
    var arrayButtons = new Array(modoIndividual, modoFondo, modoClub, modoGrupos, modoDemo, modoReal); var elem = $('#navMenuGameMode'); var returnHTML = ""; for (i = 0; i < arrayButtons.length; i++) {
        var arrayElem = arrayButtons[i]; if (arrayElem) {
            var html = ""; var icon = ""; var caption = ""; if (arrayElem.icon != "") { icon = '<i class="' + arrayElem.icon + '"></i> ' }
            var caption = ""; if (arrayElem.extraCaption != "") { caption = arrayElem.caption + " " + arrayElem.extraCaption } else { caption = arrayElem.caption }
            html = '<li><button onclick="window.location.href=\'' + arrayElem.url + '\'">' + icon + caption + '</button></li>'; returnHTML = returnHTML + html
        }
    }
    return returnHTML
}
bamQueue.waitForExistance("Foundation", function () {
    $(window).scroll(function () {
        if (typeof scrollFinished != "undefined") { clearTimeout(scrollFinished) }
        scrollFinished = setTimeout(function () {
            if ($('#notifications:visible').length > 0) { $('#notifications').core_reveal('close') }
            var topMenuOffset = 0; if ($('body').hasClass('hasFixedAd')) { topMenuOffset = $('.top-menu').position().top }
            if ($(window).scrollTop() >= 48 && Foundation.MediaQuery.atLeast('large') && $('body[data-app]').length == 0) {
                $('.top-subMenu,.top-menu,body').addClass('setFixed')
                checkMenuExcess('.top-subMenu', '[data-menu-games]'); checkMenuExcess('[data-inlineGamesMenuContainer]', '[data-inlineGamesMenu]')
            } else { $('.top-subMenu,.top-menu,body').removeClass('setFixed'); checkMenuExcess('.top-subMenu', '[data-menu-games]'); checkMenuExcess('[data-inlineGamesMenuContainer]', '[data-inlineGamesMenu]') }
            if ($('[data-top-menu-gamesnav]').length > 0 && $(window).scrollTop() >= Math.abs(($('[data-top-menu-gamesnav]').outerHeight() - parseInt($('[data-top-menu-gamesnav]').css('padding-top')))) && !Foundation.MediaQuery.atLeast('large')) { $('body').attr('data-categoryTabs-hidden', 'true'); $('[data-gamingTabs]').slideUp(200) } else { $('body').removeAttr('data-categoryTabs-hidden'); $('[data-gamingTabs]').slideDown(200) }
            if ($(window).scrollTop() >= 50 && !Foundation.MediaQuery.atLeast('large')) { $('#sidebarMenus').removeClass('is-active'); if ($('#sidebarMenus').is(':visible')) { $('#sidebarMenus').hide() } } else {
                $('#sidebarMenus').show()
                $('#sidebarMenus').addClass('is-active')
            }
            if ($('#overflown-gamesCategories:visible').length > 0) { $('#overflown-gamesCategories:visible').foundation('close') }
        }, 130)
    })
    attachNavMenuActions()
}, 500)
function removeMarqueeAlert(elem) { if ($(elem).closest('[data-alertsMarquee]').length == 0 || ($(elem).closest('[data-alertsMarquee]').length > 0 && $(elem).closest('ul').find('li').length > 1)) { $(elem).closest('li').slideUp(function () { $(elem).remove() }) } else { $(elem).closest('[data-alertsMarquee]').slideUp(function () { $(this).remove() }) } }; function setAppTouchIDinUse(inUse) {
    $('body').attr('data-touchIDinUse', inUse)
    $('#myConfig [data-touchId]').show(); if (inUse == "true") { $('#myConfig #touchIDSwitch').prop('checked', !0) } else { $('#myConfig #touchIDSwitch').prop('checked', !1) }
}
function is_touch_device() {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' '); var mq = function (query) { return window.matchMedia(query).matches }
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) { return !0 }
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(''); return mq(query)
}
function dismissFloatingNotification(timeToKill, elem) {
    var ttk = 800; if (typeof timeToKill != "undefined" && timeToKill != null) { ttk = timeToKill }
    if (typeof $ != "undefined") {
        if (typeof elem != "undefined") { var daddy = $(elem).closest('[data-floatingNotifier]') } else { var daddy = $('[data-floatingNotifier]') }
        $(daddy).removeClass('is-active'); setTimeout(function () { $(daddy).remove() }, ttk)
    }
}
function dismissCookies(elem) {
    if (typeof $ != "undefined") {
        var cookiesRequestSelector = "[data-cookiesRequest]"; if ($(elem).closest('[data-reveal-source="login"]').length > 0) {
            if (typeof login != "undefined") { login.open() }
            dismissFloatingNotification(null, elem)
        } else { location.reload() }
    }
}
function check_webp_feature(feature, callback) { var kTestImages = { lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==", alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==", animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA" }; var img = new Image(); img.onload = function () { var result = (img.width > 0) && (img.height > 0); callback(feature, result) }; img.onerror = function () { callback(feature, !1) }; img.src = "data:image/webp;base64," + kTestImages[feature] }