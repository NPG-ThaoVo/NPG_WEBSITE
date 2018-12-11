
var jq = jQuery.noConflict();
less = {
    async: true,
};

jq(window).load(function () {
    jq('.sildeshow').bxSlider({
        slideWidth: 300,
        minSlides: 2,
        maxSlides: 4,
        moveSlides: 1,
        slideMargin: 10
    });

    setHeightHeader();
    scrollMenu();
    // Scroll to current page
    id = window.location.href.replace(window.location.origin + '/#', '')
    element = document.getElementById(id);
    if (element != null) {
        var pos = element.offsetTop - jq('#navbar-collapse').height();
        jq('body, html').animate({ scrollTop: pos }, 1000);
    }
    currentPage();
    jq(window).resize(function () {
        setHeightHeader();
        scrollMenu();
    });
    jq(document).on('click', 'a[href*="#"]', function (e) {
        console.log(jq(this));
        if (!jq(this).hasClass("btn-popup")) {
            // Use window.location.origin for full url
            jq("div#myNavbar .navbar-nav li").each(function () { jq(this).removeClass("active"); })
            jq(this).parent("li").addClass("active");
            var tagA_id = jq(this).attr('href').replace(window.location.origin + '/', ''),
                id = jq(tagA_id);
            if (id.length === 0) { return; }
            e.preventDefault();
            var pos = id.offset().top - jq('#menu').height();
            jq('body, html').animate({ scrollTop: pos }, 1000);
            // Set current location to reference link
            window.location = jq(this).attr('href');
            currentPage();
        }
    });
  
})

function setHeightHeader() {
    jq('#page-headers').css('height', window.innerHeight);
    // if()
    jq('#menus').removeAttr('style');
    if (window.innerWidth < 991) {
        clickMenu();
        jq('#menus').css('height', window.innerHeight - 0);
        jq('.navBlock-tel').show();
    } else {
        jq('#menus').removeAttr('style');
        jq('.navBlock-tel').show();
    }
}

function clickMenu() {
    jq('ul.nav.navbar-nav li a').click(function () {
        jq('button.navbar-toggle').click();
    });
}

function scrollMenu() {
    // Use window.location.origin for full url
    var locationUrl = window.location.origin + '/';
    // if(window.location.href == locationUrl || window.location.href.includes(locationUrl + '#') ){
    jq(window).scroll(function () {
        var menuItems = jq('#menus a[href*="#"]');
        jq('#menus a[href*="#"]').parent("li").removeClass("active");
        for (var i = 0; i < menuItems.length; i++) {
            var topIdCurrent = Math.round(jq(jq(menuItems[i]).attr('href').replace(locationUrl, '')).offset().top - jq('#menu').height()),
                topIdNext = (i < menuItems.length - 1)
                ? Math.round(jq(jq(menuItems[i + 1]).attr('href').replace(locationUrl, '')).offset().top - jq('#menu').height())
                // Distance from topIdCurrent to bottom of document
                : Math.round(jq(document).height() - jq('#news').offset().top + topIdCurrent);
            if (topIdCurrent <= Math.round(jq(window).scrollTop()) + 1 && Math.round(jq(window).scrollTop()) + 1 < topIdNext) {
                jq(menuItems[i]).parent("li").addClass('active');
            }
        }
    });
    //   }
}

function currentPage() {
    var menuItems = jq("#menus").find('a[href*="#"]');
    var url = window.location.href.toString();
    for (var i = 0; i < menuItems.length; i++) {
        var hrefA = jq(menuItems[i]).attr('href');
        (url.includes(hrefA)) ? jq(menuItems[i]).parent("li").addClass('active') : jq(menuItems[i]).parent("li").removeClass('active');
    }
    if (url.includes('/request-quote/')) {
        menuItems.filter("[href*='#contact']").addClass("active");
    }
    if (url.includes('/news/')) {
        menuItems.filter("[href*='#news']").addClass("active");
    }
}

jQuery(document).scroll(function () {
    if (jQuery(this).scrollTop() > 400) {
        $('.web-logo').addClass('tiny');
    } else {
        $('.web-logo').removeClass('tiny');

    }
});
