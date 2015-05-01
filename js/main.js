jQuery(document).ready(function($) {
    
    $(".menu-toggle").on( "click", function(e) {
      e.preventDefault();
      $(this).toggleClass('active');
      $('.slide').toggleClass('active');
    });


});

jQuery(window).load(function($) {
	jQuery('.loader').toggleClass('loaded');
	//console.log($(".loader"));
});
