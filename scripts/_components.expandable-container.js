/* This javascript handles expand and collapse, in the case that Angular 2 is not available */

function toggleExpand(element) {
    //Expand or collapse this panel
    $(element).next(".expandable-container__content").slideToggle('fast');
    $(".expandable-container__content").not($(element).next()).slideUp('fast');
}