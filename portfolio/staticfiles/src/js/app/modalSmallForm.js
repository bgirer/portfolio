$(document).on("submit", "form[id='modal-form']", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var self = $(this);
    var data = self.serialize();
    var dataArray = self.serializeArray();
    var dataObj = Object();
    for (var i = 0; i < dataArray.length; i++) {
        dataObj[dataArray[i]['name']] = dataArray[i]['value'];
    }

    var url = self.attr("action");

    var formValid = true;
    var requiredFields = ['first_name', 'last_name', 'email', 'message'];
    for (var j = 0; j < requiredFields.length; j++) {
        if (dataObj[requiredFields[j]] == '' || !dataObj[requiredFields[j]]) {
            formValid = false
        }
    }

    if (!formValid) {
        $("#empty_form_fields").show().delay(5000).fadeOut();
    } else {
        $.ajax({
            url: url,
            type: "POST",
            crossDomain: false, // obviates need for sameOrigin test
            data: data,
            beforeSend: function (data) {
                $('#form_sending').show();
                // console.log(data);
            },
            success: function (data, textStatus, xhr) {
                $("#form_sending").hide();
                $("#form_success").show().delay(900).fadeOut();
                setTimeout(function () {
                    $('#home-modal-form').modal('hide');
                }, 1000);
            },
            error: function (data, textStatus, xhr) {
                $("#form_sending").hide();
                $("#form_failed").show().delay(5000).fadeOut();
                // console.log(data, textStatus, xhr);
            }
        });
    }
});

// get cookie
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// get token to send the post requests
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
