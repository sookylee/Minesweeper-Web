function set_cookie(document, value, cookie_name) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 3);

    var cookie_value = escape(value) + ((days == null) ? '' : ';    expires=' + exdate.toUTCString());
    document.cookie = cookie_name += '=' + cookie_value;
    console.log("set cookie! : " + cookie_name);
}