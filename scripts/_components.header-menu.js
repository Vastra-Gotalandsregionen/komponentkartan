$(function () {
    $(".header-menu__trigger").on('click', function (e) {
        if (isHeaderMenuOpen())
            closeHeaderMenu();
        else
            openHeaderMenu();

        //Prevent the body to receive this event, since we handled it already
        e.stopPropagation();
        e.cancelBubble = true;
    });


    // Close the dropdown menu if the user clicks outside of it
    $('body').click(function (event) {
        //If clicked item is header-menu-item--header or is a direct child of header-menu-item--header, do nothing
        if (!eventIsFromHeaderMenu(event) && isHeaderMenuOpen())
            closeHeaderMenu();
    })

    //When hovering a menu item link or a sub menu item, mark it.
    $('.header-menu__content>ul>li>a, .header-menu-item--header>ul>li').not('.header-menu-item--marked').hover(function () {
            //$('.header-menu-item--marked').removeClass('header-menu-item--marked');
            $('.header-menu-item--selected').removeClass('header-menu-item--marked');
            $(this).addClass('header-menu-item--marked');
        },
        //When done hovering, set the marker back on the selected item
        function () {
            $(this).removeClass('header-menu-item--marked');
            $('.header-menu-item--selected').addClass('header-menu-item--marked');
        });
});

function eventIsFromHeaderMenu(event) {
    return $(event.target).hasClass('header-menu-item--header') ||
        ($('.header-menu-item--header').has(event.target).length > 0);
}



function isHeaderMenuOpen() {
    return $('.header-menu').hasClass('header-menu--displayed');
}

function openHeaderMenu() {
    $('.header-menu').addClass('header-menu--displayed');
    $('.header-menu').removeClass('header-menu--hidden');
}

function closeHeaderMenu() {
    $('.header-menu').removeClass('header-menu--displayed');
    $('.header-menu').addClass('header-menu--hidden');
}