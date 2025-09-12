// When button is pressed, take the image and push it through a model


function createImage(image_path) {

    
    let img = document.getElementById('display-image');
    if (img == null){
        // Then create the img
        img = document.createElement('img');
    }
   
    
    img.src = `${image_path}`;
    var fReader = new FileReader();

    fReader.readAsDataURL( document.getElementById('input_image').files[0]);
    
    fReader.onloadend = function(event){
        img.src = event.target.result;
    }
    img.width = 300;
    img.height = 300;
    img.id = 'display-image'
    document.getElementById('inner-container').appendChild(img);

    return 0;
}

function ImagePaser(){

    console.log(document.getElementById('input_image').value);
    let current_path = document.getElementById('input_image')
    createImage(current_path);

   return 0;
}
