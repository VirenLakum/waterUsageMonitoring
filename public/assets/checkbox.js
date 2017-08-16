$(document).ready(function() {

    // var autorefresh = setInterval(function(){
    //     $('#curve_chart').load('/jknfkajdnffiuofadsf12123nkjnkkjn');
    // }, 10000);

    // var autorefresh = function () {
    //     $('#curve_chart').load('/jknfkajdnffiuofadsf12123nkjnkkjn');
    //     alert("Refreshing!!!");
    // }
    //
    // var timer = setInterval(autorefresh, 10000);

    $('#myonoffswitch').click(function () {
        //clearInterval(timer);
        if (this.checked == true) {

            alert("Water Supply is turned ON");
            $.ajax({
                type: 'POST',
                url: 'checkbox',
                data: {state: true},
                success: function(data){
                    //do something with the data via front-end framework
                    //location.reload();
                }
            })
        } else {
            alert("Water Supply is turned OFF");
            $.ajax({
                type: 'POST',
                url: 'checkbox',
                data: {state: false},
                success: function(data){
                    //do something with the data via front-end framework
                    //location.reload();
                }
            })
        }
        //timer = setInterval(autorefresh, 10000);
    });
});
