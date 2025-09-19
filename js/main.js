
import Human from '@vladmandic/human';
// import Dropzone from "dropzone";



document.addEventListener("DOMContentLoaded", function(event){
  // document.getElementById("input_image").addEventListener('change', ImagePaser);
  // const uploadButton = document.getElementById("uploadButton");
  // uploadButton.addEventListener("click", uploadFiles);
  //
  document.getElementById("file-upload").addEventListener('change', createImage)
});


// Sample configuration from docs
const humanConfig = { // user configuration for human, used to fine-tune behavior

  cacheSensitivity: 0,
  debug: true,
  modelBasePath: 'https://vladmandic.github.io/human-models/models/',
  filter: { enabled: true, equalization: false, flip: false },
  face: {
    enabled: true,
    detector: { rotation: false, maxDetected: 100, minConfidence: 0.2, return: true, square: false },
    iris: { enabled: true },
    description: { enabled: true },
    emotion: { enabled: true },
    antispoof: { enabled: true },
    liveness: { enabled: true },
  },
  body: { enabled: false },
  hand: { enabled: false },
  object: { enabled: false },
  gesture: { enabled: false },
  segmentation: { enabled: false },
};
const human = new Human(humanConfig);  



// Used to analyze image on the with Human model api
async function analyzeImageHumanModel(){


    let img = document.getElementById('display-image');
    if (img == null){
        // Then create the img
        console.log("There is no image...");
    }

  const firstImage = await human.detect(img);
  console.log(firstImage)
  console.log(firstImage.face[0].age)


  
  let age_text = document.createElement('h3');
  age_text.innerHTML = firstImage.face[0].age;
  age_text.className = 'mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance'
  document.getElementById('file-upload-div').appendChild(age_text);



  return 0;
}



// displaying image once a image has been selected
function createImage() {
  console.log("this was called")


    let img = document.getElementById('display-image');
    if (img == null){
        // Then create the img
        img = document.createElement('img');
    }
   
    
    var fReader = new FileReader();

    fReader.readAsDataURL( document.getElementById('file-upload').files[0]);
    
    fReader.onloadend = function(event){
        img.src = event.target.result;
    }
    img.width = 300;
    img.height = 300;
    img.id = 'display-image'
    document.getElementById('file-upload-div').appendChild(img);
    let upload = document.getElementById('div-upload')
    upload.remove();
    let button = document.createElement('button');
    button.innerHTML = 'Analyze';
    button.id = 'analyze_button';
    button.addEventListener('click', analyzeImageHumanModel);
    button.className = 'rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
    document.getElementById('file-upload-div').appendChild(button);
    

    return 0;
}



function fileInput(){


  let cuurent_image = document.getElementById("file-upload")


}
