function displayEmail() {
  var username = 'rob';
  var domain   = 'hoelz' + '.' + 'ro';

  alert(username + '@' + domain);
}

(function() {
    var startTime = new Date();

    function UnloadHandler() {
        window.removeEventListener('beforeunload', UnloadHandler);
        var endTime = new Date();

        var path = document.location.pathname;
        jQuery.get('/report-visit-length?path=' + path + '&ms=' + (endTime.getTime() - startTime.getTime()));
    }

    function PageShowHandler() {
        startTime = new Date();
        window.addEventListener('beforeunload', UnloadHandler);
    }

    window.addEventListener('pageshow', PageShowHandler);
    window.addEventListener('beforeunload', UnloadHandler);

    document.addEventListener('turbolinks:load', PageShowHandler);
    document.addEventListener('turbolinks:before-visit', UnloadHandler);
})();

document.addEventListener('turbolinks:load', function() {
    $.bigfoot({
        footnoteTagname: 'span'
    });

    $('.social-icon.email').click(function() {
        displayEmail();
    });
});
