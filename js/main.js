;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};
	

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	var sliderMain = function() {
		
	  	$('#fh5co-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};



	$(function(){
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		sliderMain();
		dropdown();
		goToTop();
		loaderPage();
		counterWayPoint();
	});


	

}());

const thumbnails = document.querySelectorAll('.thumbnail-box');
const preview = document.querySelector('.main-image img');

thumbnails.forEach(thumbnail => {
  const img = thumbnail.querySelector('img');

  // Hover to preview
  thumbnail.addEventListener('mouseenter', () => {
    preview.src = img.src;
  });



  // Click to navigate
  thumbnail.addEventListener('click', () => {
    const targetPage = thumbnail.getAttribute('data-link');
    if (targetPage) {
      window.location.href = targetPage;
    }
  });
});
/*
function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    const trigger = dropdown.previousElementSibling; // gets the corresponding .dropdown-trigger

    dropdown.classList.toggle('active');
    trigger.classList.toggle('active');
  }
*/ 





// Data mapping for images and their corresponding titles
const imageData = {
    'munnar-resort-thumbnails-20': {
        src: '\images\munnar-resort\thumbnails-20.png',
        title: 'Munnar Resort, Munnar A 30 key property inside a lush green cover of jungle overlooking the tea estates of Munnar'
    },
    'asset3': {
        src: '\images\Asset3.png',
        title: 'The River Resort, Munnar A 20 key property resort at the banks of a river in Kunjithanni, Munnar  '
    },
    'stone-house-thumbnails-16': {
        src: '\images\stone-house\thumbnails-16.png',
        title: '  Stone House A weekend hideaway cradled in the warmth of stone'
    },
    'asset6': {
        src: '\images\Asset6.png',
        title: 'Vaasta Vagamon A hillside haven where every stone echoes a memory. '


    },
    'lostschool-thumbnails-23': {
        src: '\images\lostschool\thumbnails-23.png',
        title: 'Lost School Finding Forgotten Spaces and Memories '
    },
    'paul-mathew-thumbnails-19': {
        src: '\images\paul-mathew\thumbnails-19.png',
        title: 'Space Unfold Apartment interior - Modulating space as a continuous unfold '
    },
    'thumbnail-17': {
        src: '\images\thumbnail-17.png',
        title: 'Vimal Lakshmi Residence A home that upholds and enlivens the neighbourly warmth passed down through generations. '


    },
    'asset9': {
        src: '\images\Asset9.png',
        title: 'Tree Pavilion An outhouse woven into the shelter of the tree canopy.'

    }
};

// Store the original title
let originalTitle = '';

// Function to update main image title
function updateMainImageTitle(imageKey) {
    const data = imageData[imageKey];
    if (data) {
        const mainTitle = document.querySelector('.main-image-title');
        if (mainTitle) {
            mainTitle.textContent = data.title;
        }
    }
}

// Function to restore original title
function restoreOriginalTitle() {
    const mainTitle = document.querySelector('.main-image-title');
    if (mainTitle && originalTitle) {
        mainTitle.textContent = originalTitle;
    }
}

// Function to get image key from src
function getImageKey(src) {
    // Create a key based on the path and filename
    if (src.includes('munnar-resort')) {
        return 'munnar-resort-thumbnails-20';
    } else if (src.includes('Asset3')) {
        return 'asset3';
    } else if (src.includes('stone-house')) {
        return 'stone-house-thumbnails-16';
    } else if (src.includes('Asset6')) {
        return 'asset6';
    } else if (src.includes('lostschool')) {
        return 'lostschool-thumbnails-23';
    } else if (src.includes('paul-mathew')) {
        return 'paul-mathew-thumbnails-19';
    } else if (src.includes('thumbnail-17')) {
        return 'thumbnail-17';
    } else if (src.includes('Asset9')) {
        return 'asset9';
    }
    
    return null;
}

// Add hover event listeners to all thumbnail boxes
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up hover event listeners');
    
    // Store the original title
    const mainTitle = document.querySelector('.main-image-title');
    if (mainTitle) {
        originalTitle = mainTitle.textContent;
        console.log('Original title stored:', originalTitle);
    }
    
    // Add hover listeners to main thumbnail boxes
    const thumbnailBoxes = document.querySelectorAll('.thumbnail-box');
    console.log('Found', thumbnailBoxes.length, 'thumbnail boxes');
    
    thumbnailBoxes.forEach((box, index) => {
        const img = box.querySelector('img');
        if (img) {
            // Mouse enter event
            box.addEventListener('mouseenter', function() {
                console.log('Mouse entered thumbnail:', index);
                const imageKey = getImageKey(img.src);
                if (imageKey) {
                    updateMainImageTitle(imageKey);
                }
            });
            
            // Mouse leave event
            box.addEventListener('mouseleave', function() {
                console.log('Mouse left thumbnail:', index);
                restoreOriginalTitle();
            });
        }
    });
    
    // Add hover listeners to dropdown thumbnail boxes
    const dropdownThumbnails = document.querySelectorAll('.dropdown-thumbnails .thumbnail-box');
    console.log('Found', dropdownThumbnails.length, 'dropdown thumbnail boxes');
    
    dropdownThumbnails.forEach((box, index) => {
        const img = box.querySelector('img');
        if (img) {
            // Mouse enter event
            box.addEventListener('mouseenter', function() {
                console.log('Mouse entered dropdown thumbnail:', index);
                const imageKey = getImageKey(img.src);
                if (imageKey) {
                    updateMainImageTitle(imageKey);
                }
            });
            
            // Mouse leave event
            box.addEventListener('mouseleave', function() {
                console.log('Mouse left dropdown thumbnail:', index);
                restoreOriginalTitle();
            });
        }
    });
});

// Existing dropdown functionality
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.classList.toggle('show');
        console.log('Toggled dropdown:', dropdownId);
    }
} 


  
  