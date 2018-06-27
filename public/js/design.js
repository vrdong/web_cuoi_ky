var imghtml = '<img class="framed-image img-responsive" src="#" alt="picture to be framed">';
var imgurl;
var uploadCrop;
var firsttime = true;
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
    if (firsttime) {
        uploadCrop = $('#upload-img').croppie({
            viewport: {
                width: 400,
                height: 300,
                type: 'square'
            },
            boundary: {
                width: 500,
                height: 500
            }
        });
        firsttime = false;
    } 
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            imgurl = e.target.result;
            /*var container = document.getElementById('framed-image-container');
            container.innerHTML = '';
            container.innerHTML = imghtml;
            $('.framed-image')
                .attr('src', imgurl);*/
            uploadCrop.croppie('bind', {
                url: imgurl
            });
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function Crop() {
    uploadCrop.croppie('result', {
        type: 'canvas',
        size: 'viewport'
    }).then(function (resp) {
        imgurl = resp;
        var container = document.getElementById('framed-image-container');
        container.innerHTML = '';
        container.innerHTML = imghtml;
        $('.framed-image')
            .attr('src', imgurl);
    });
}
function Full() {
    uploadCrop.croppie('result', {
        type: 'canvas',
        size: 'original'
    }).then(function (resp) {
        imgurl = resp;
        var container = document.getElementById('framed-image-container');
        container.innerHTML = '';
        container.innerHTML = imghtml;
        $('.framed-image')
            .attr('src', imgurl);
    });
}