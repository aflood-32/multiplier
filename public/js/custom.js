$(function(){
    $('.section-one').css({ height: $(window).innerHeight() });
    $(window).resize(function(){
        $('.section-one').css({ height: $(window).innerHeight() });
    });
});
$(function(){
    $('.banner-image').css({ height: $(window).innerHeight() });
    $(window).resize(function(){
        $('.banner-image').css({ height: $(window).innerHeight() });
    });
});
$(document).ready(function(){
    $(window).scroll(function() {
        if ($(this).scrollTop() > 3){
            $('.main-header').addClass("sticky");
        }
        else{
            $('.main-header').removeClass("sticky");
        }
    });
});


function quoteFormsubmit(){
    var name = $("#quote_name").val();
    var email = $("#quote_email").val();
    var message = $("#quote_message").val();
    var isValidate = true;
    if(name== ''){
        isValidate = false;
        //alert('name');
        $('#quote_name_msg').removeClass('hidden');
    }else {
        $('#quote_name_msg').addClass('hidden');
    }
    if(email == '')
    {
        isValidate = false;
        $('#quote_email_msg1').removeClass('hidden');
        $('#quote_email_msg').addClass('hidden');
    }else{
        $('#quote_email_msg1').addClass('hidden');
        if(!validateEmail(email)){
            isValidate = false;
            $('#quote_email_msg').removeClass('hidden');
        }else {
            $('#quote_email_msg').addClass('hidden');
        }
    }
    if(message == ''){
        isValidate = false;
        $('#quote_message_msg').removeClass('hidden');
    }else {
        $('#quote_message_msg').addClass('hidden');
    }
    if(isValidate){
        $.ajax({
            type: "POST",
            url: "quote.php",
            data: "quote_name=" + name + "&quote_email=" + email + "&quote_message=" + message,
            success : function(text){
                if(text==1){
                    $("#quote_done").removeClass('hidden');
                    setTimeout(function() { $("#quote_done").addClass('hidden'); }, 5000);
                    $('input:text').val('');
                }else{
                    alert('Not Done');
                }
            }
        });
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

}

function contactFormsubmit(){
    var name = $("#contact_name").val();
    var email = $("#contact_email").val();
    var message = $("#contact_message").val();
    var isValidate = true;
    if(name== ''){
        isValidate = false;
        //alert('name');
        $('#contact_name_msg').removeClass('hidden');
    }else {
        $('#contact_name_msg').addClass('hidden');
    }
    if(email == '')
    {
        isValidate = false;
        $('#contact_email_msg').removeClass('hidden');
    }else{
        $('#contact_email_msg').addClass('hidden');
        if(!validateEmail(email)){
            isValidate = false;
            $('#contact_email_msg1').removeClass('hidden');
        }else {
            $('#contact_email_msg1').addClass('hidden');
        }
    }
    if(message == ''){
        isValidate = false;
        $('#contact_message_msg').removeClass('hidden');
    }else {
        $('#contact_message_msg').addClass('hidden');
    }
    if(isValidate){
        $.ajax({
            type: "POST",
            url: "contact.php",
            data: "contact_name=" + name + "&contact_email=" + email + "&contact_message=" + message,
            success : function(text){
                if(text==1){
                    $("#contact_done").removeClass('hidden');
                    setTimeout(function() { $("#contact_done").addClass('hidden'); }, 5000);
                    $('input:text').val('');
                    $('textarea').val('');
                }else{
                    alert('Not Done');
                }
            }
        });
    }
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
