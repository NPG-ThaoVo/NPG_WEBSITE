$(function(){
	"use strict";
	

    //Google Analytics
	(function (i, s, o, g, r, a, m) {
	    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
	        (i[r].q = i[r].q || []).push(arguments)
	    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
	})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

	ga('create', 'UA-60119329-1', 'auto');
	ga('send', 'pageview');


    //Contact form
	jQuery("#contact_submit").bind("click", function (e) {

	    var contact_name = jQuery("#contact_name").val(),			// required
            contact_email = jQuery("#contact_email").val(),			// required
            contact_subject = jQuery("#contact_subject").val(),			// optional
            contact_comment = jQuery("#contact_comment").val(),			// required
            captcha = jQuery("#captcha").val(),					// required TO BE EMPTY if humans
            _action = '/sendmail', //jQuery("#contactForm").attr('action'),	// form action URL
            _method = 'post', //jQuery("#contactForm").attr('method'),	// form method
            _err = false;									// status

	    // Remove error class
	    jQuery("input, textarea").removeClass('err');

	    // Spam bots will see captcha field - that's how we decet spams.
	    // It's very simple and not very efficient antispam method but works for bots.
	    if (captcha != '') {
	        return false;
	    }

	    // Name Check
	    if (contact_name == '') {
	        jQuery("#contact_name").addClass('err');
	        var _err = true;
	    }

	    // Email Check
	    if (contact_email == '') {
	        jQuery("#contact_email").addClass('err');
	        var _err = true;
	    }

	    // Comment Check
	    if (contact_comment == '') {
	        jQuery("#contact_comment").addClass('err');
	        var _err = true;
	    }

	    // Stop here, we have empty fields!
	    if (_err !== true) {
	        e.preventDefault();

	        // SEND MAIL VIA AJAX
	        $.ajax({
	            url: _action,
	            data: { ajax: "true", action: 'email_send', contact_name: contact_name, contact_email: contact_email, contact_comment: contact_comment, contact_subject: contact_subject },
	            type: _method,
	            error: function (XMLHttpRequest, textStatus, errorThrown) {

	                alert('Server Internal Error'); // usualy on headers 404

	            },

	            success: function (data) {
	                data = data.trim(); // remove output spaces


	                // PHP RETURN: Mandatory Fields
	                if (data == '_required_') {
	                    alert('Please, complete required fields!');
	                } else

	                    // PHP RETURN: INVALID EMAIL
	                    if (data == '_invalid_email_') {
	                        alert('Invalid Email');
	                    } else

	                        // VALID EMAIL
	                        if (data == '_sent_ok_') {

	                            // append message and show ok alert
	                            jQuery("#_msg_txt_").empty().append('Message Sent, Thank you!');
	                            jQuery("#_sent_ok_").removeClass('hide');

	                            // reset form
	                            jQuery("#contact_name, #contact_email, #contact_subject, #contact_comment").val('');

	                        } else {

	                            // PHPMAILER ERROR
	                            alert(data);

	                        }
	            }
	        });

	    }
	});
	
	var scrollOffset = 100;
	
	$(window).on('scroll', function(){
		
		/*=========================================================================
			Change navigation bar from transparent to white
		=========================================================================*/
		if( $(window).scrollTop() < scrollOffset ){
			$('body').removeClass('scrolled');
		}else{
			$('body').addClass('scrolled');
		}
		
		/*=========================================================================
			Navbar ScrollSpy
		=========================================================================*/
		/*var scrollPos = $(document).scrollTop(),
			nav_height = $('#navbar').outerHeight();
		
		$('.navbar li a').each(function () {
			var currLink = $(this),
				refElement = $(currLink.attr('href'));
			if( refElement.size() > 0 ){
				if ( ( refElement.position().top - nav_height ) <= scrollPos ) {
					$('.navbar li').removeClass('active');
					currLink.closest('li').addClass('active');
				}else{
					currLink.removeClass('active');
				}
			}
		});*/
	});
	
	
	//Initialize smoothscroll plugin
	smoothScroll.init({
		updateURL: false
	});
	
	
	/*=========================================================================
		WOW.js initialization
	=========================================================================*/
	new WOW().init({
		mobile: false
	});
	
	
	/*=========================================================================
		AjaxChimp (For mailchimp subscribe form)
	=========================================================================*/
	$('.newsletter-form').ajaxChimp();
	
	
	/*=========================================================================
		Magnific Popup (Project Popup initialization)
	=========================================================================*/
	$('.view-btn').magnificPopup({
		type: 'image',
		mainClass: 'mfp-with-zoom',
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out',
			opener: function(openerElement) {
			  return openerElement.is('img') ? openerElement : openerElement.closest('figure').find('img');
			}
		  }
	});
	
	
	/*=========================================================================
		Video Section Video Popup
	=========================================================================*/
	/*$('.play-btn').magnificPopup({
		type: 'iframe'
	});*/

	$('.play-btn').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
	
	
	/*=========================================================================
		Hide Preloader When Page Is Loaded
	=========================================================================*/
	$(window).on('load',function(){
		$('body').addClass('loaded');
	});
	
	
	/*=========================================================================
		Initialize Material Design Ripples
	=========================================================================*/
	Waves.attach('.btn-custom', 'waves-classic');
	Waves.init();
	
	/*=========================================================================
		Screenshots Slider
	=========================================================================*/
	$('.screenshots-slider').owlCarousel({
		center: true,
		items:2,
		loop:false,
		margin:15,
		startPosition: 1,
		responsive:{
			600:{
				items:4
			},
			0: {
				startPosition: 0
			}
		}
	});
	
	/*=========================================================================
		Testimonials Slider
	=========================================================================*/
	$('.testimonials-slider').owlCarousel({
		items: 1,
		loop: true,
		startPosition: 1
	});
	
	$(window).on('resize', function(){
		
		// To fix the parallax.js bug
		window.setTimeout(function(){
			$(window).resize();
		},500);
	
	});
	
	// To fix the parallax.js bug
	var isMobile = {
		Android: function() { return navigator.userAgent.match(/Android/i); }, 
		BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); }, 
		iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, 
		Opera: function() { return navigator.userAgent.match(/Opera Mini/i); }, 
		Windows: function() { return navigator.userAgent.match(/IEMobile/i); }, 
		any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
	};
    jQuery(function($) {
        if (isMobile.any()) {
			document.documentElement.className = document.documentElement.className + " touch";
            $('.parallax').each(function(i, obj) {
                $(this).css("background-image", 'url('+$(this).data('image-src')+')');
                $(this).css("background-color", "#FFFFFF");
                $(this).css("background-size", "cover");
                $(this).css("background-position", "center center");
            });
        }
	});
	
	
	
	
	/*=========================================================================
		Contact Form
	=========================================================================*/
	function isJSON(val){
		var str = val.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
	}
	$('#contact-form').validator().on('submit', function (e) {
		if (!e.isDefaultPrevented()) {
			// If there is no any error in validation then send the message
			e.preventDefault();
			var $this = $(this),
				//You can edit alerts here
				alerts = {
					success: 
					"<div class='form-group' >\
						<div class='alert alert-success' role='alert'> \
							<strong>Message Sent!</strong> We'll be in touch as soon as possible\
						</div>\
					</div>",
					error: 
					"<div class='form-group' >\
						<div class='alert alert-danger' role='alert'> \
							<strong>Oops!</strong> Sorry, an error occurred. Try again.\
						</div>\
					</div>"
				};
			$.ajax({
				url: 'mail.php',
				type: 'post',
				data: $this.serialize(),
				success: function(data){
					if( isJSON(data) ){
						data = $.parseJSON(data);
						if(data['error'] == false){
							$('#contact-form-result').html(alerts.success);
							$('#contact-form').trigger('reset');
						}else{
							$('#contact-form-result').html(
							"<div class='form-group' >\
								<div class='alert alert-danger alert-dismissible' role='alert'> \
									<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
										<i class='ion-ios-close-empty' ></i> \
									</button> \
									"+ data['error'] +"\
								</div>\
							</div>"
							);
						}
					}else{
						$('#contact-form-result').html(alerts.error);
					}
				},
				error: function(){
					$('#contact-form-result').html(alerts.error);
				}
			});
		}
	});
	
	
	/*=========================================================================
		Particle BG Code
	=========================================================================*/
	var particlesSettings = {
		particles: {
			number: {
				value: 30,
				density: {
					enable: !0,
					value_area: 800
				}
			},
			color: {
				value: "#FFF"
			},
			shape: {
				type: "circle",
				stroke: {
					width: 0,
					color: "#F0F0F0"
				},
				polygon: {
					nb_sides: 5
				},
				image: {
					src: "img/github.svg",
					width: 100,
					height: 100
				}
			},
			opacity: {
				value: .5,
				random: !1,
				anim: {
					enable: !1,
					speed: .5,
					opacity_min: .1,
					sync: !1
				}
			},
			size: {
				value: 3,
				random: !0,
				anim: {
					enable: !1,
					speed: 10,
					size_min: .1,
					sync: !1
				}
			},
			line_linked: {
				enable: !0,
				distance: 150,
				color: "#FFF",
				opacity: .4,
				width: 1
			},
			move: {
				enable: !0,
				speed: 1,
				direction: "none",
				random: !1,
				straight: !1,
				out_mode: "out",
				bounce: !1,
				attract: {
					enable: !1,
					rotateX: 600,
					rotateY: 1200
				}
			}
		},
		interactivity: {
			detect_on: "canvas",
			events: {
				onhover: {
					enable: !0,
					mode: "grab"
				},
				onclick: {
					enable: !0,
					mode: "push"
				},
				resize: !0
			},
			modes: {
				grab: {
					distance: 140,
					line_linked: {
						opacity: 1
					}
				},
				bubble: {
					distance: 400,
					size: 40,
					duration: 2,
					opacity: 8,
					speed: 1.5
				},
				repulse: {
					distance: 200,
					duration: .4
				},
				push: {
					particles_nb: 4
				},
				remove: {
					particles_nb: 2
				}
			}
		},
		retina_detect: !0
	};
	if( $('#particles').length != 0 ){
		particlesJS('particles', particlesSettings);		
	}
	
});