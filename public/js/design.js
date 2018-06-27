var imghtml = '<img class="framed-image" src="#" alt="picture to be framed">';
var imgurl;
$(document).ready(function(){

    $('.khung-t').click(function(){
        var obj = $(this);
            id = obj.attr('id');
            img = $('.framed-image');
        if(img.attr("src") == '#'){
            alert("Please choose your image");
        }
        else if (img.hasClass('frame')) {
            var container = document.getElementById('framed-image-container');
            container.innerHTML = '';
            container.innerHTML = imghtml;
            $('.framed-image')
                .attr('src', imgurl);
            $('.framed-image').addClass('frame');
            $('.frame').imageframer({
                frameType: id,
                callback: function(){
                },
                innerShadow: 1
            });
        }
        else {
           img.addClass('frame');
           $('.frame').imageframer({
               frameType: id,
               callback: function(){
               },
               innerShadow: 1
           });
        }
        
    })
})
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            imgurl = e.target.result;
            var container = document.getElementById('framed-image-container');
            container.innerHTML = '';
            container.innerHTML = imghtml;
            $('.framed-image')
                .attr('src', imgurl);
            $('.framed-image').croppie({
            });
        };

        reader.readAsDataURL(input.files[0]);
    }
}