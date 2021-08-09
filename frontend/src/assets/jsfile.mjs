
// For adding and remoing classes when list/grid view changes 
$(document).ready(function () {
    $('#list').click(function (event) { event.preventDefault(); $('#photos .item').removeClass('grid-group-item'); $('#photos .item').addClass('list-group-item'); });
    $('#grid').click(function (event) { event.preventDefault(); $('#photos .item').removeClass('list-group-item'); $('#photos .item').addClass('grid-group-item'); });

});
