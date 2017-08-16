$(document).ready(function(){



    $( "input[type=checkbox]" ).on( "click", function() {

        location.reload();
    });
    //     var checkboxes = document.getElementsByClassName("onoffswitch-checkbox");
    //     var link = "/checkbox?state=" + checkboxes;
    //     //
    //     //     if (deviceid.val() == "testdevice")
    //     //     {
    //     //         window.location = "/devicedata";
    //     //     }
    //     //     else
    //     //     {
    //     //         location.reload();
    //     //     }
    //         // $.ajax({
    //         //     type: 'POST',
    //         //     url: '/login',
    //         //     data: userdata});
    //         // if()
    //     $(this).attr("href", link);
    // });
    // $('button').onclick = function () {
    //     if (!isChanged) {
    //         options.hAxis.viewWindow.min = new Date(2015, 0, 1);
    //         options.hAxis.viewWindow.max = new Date(2015, 0, 1, 3);
    //         isChanged = true;
    //     } else {
    //         options.hAxis.viewWindow.min = new Date(2014, 11, 31, 18),
    //             options.hAxis.viewWindow.max = new Date(2015, 0, 3, 1)
    //         isChanged = false;
    //     }
    //     chart.draw(data, options);
    //};
});