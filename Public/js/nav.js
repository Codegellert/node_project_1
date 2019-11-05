let navLogos = $('nav .logo_wrapper img');
let helper = $('.menu_helper ');
let helperTxt = $('.menu_helper h2');


navLogos.hover(function(){
    helper.text($(this).attr('alt'));
    helper.css('left', $(this).position().left + 110)
    helper.fadeIn(20);
}, function(){
    helper.fadeOut(20);
})


$(document).on('scroll', function(){
    if($(window).scrollTop() < 100) 
        $('nav').css('top',0);
    else 
        $('nav').css('top',-105);
})
$('nav').hover(function() {
    if($('nav').css('top', -105)) $('nav').css('top',0);
},function(){
    if($('nav').css('top', 0) && $(window).scrollTop() >= 100) $('nav').css('top',-105);
})