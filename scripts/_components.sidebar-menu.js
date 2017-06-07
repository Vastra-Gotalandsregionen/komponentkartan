/* This javascript handles the marker for the sidebar menu */
$(function() {

    //Menu-item-marker
    $('.menu__item-list > li').hover(function() {
            if (!$(this).hasClass('menu__expander'))
                $('.menu-item--selected').removeClass('menu-item--marked');

        },
        function() {
            $('.menu-item--selected').addClass('menu-item--marked');
        });


    $('.menu__subItems-list > li').hover(function() {
            if (!$(this).hasClass('menu__expander'))
                $('.menu-item--selected').removeClass('menu-item--marked');
        },
        function() {
            $('.menu-item--selected').addClass('menu-item--marked');
        });

    $('.menu').hover(function() {
            $('.menu').addClass('menu--not-hovered');
            $(this).closest('.menu').addClass('menu--hovered');
            $(this).closest('.menu').removeClass('menu--not-hovered');

        },
        function() {
            $('.menu').removeClass('menu--not-hovered');
            $(this).closest('.menu').removeClass('menu--hovered');

        });

    //Apply a scrollbar to the menu. We use jquery.scrollbar from https://github.com/gromo/jquery.scrollbar    
    $('.sidebar-menu').scrollbar();
});