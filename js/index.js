// When button is pressed, take the image and push it through a model



import Human from '@vladmandic/human';
import Dropzone from "dropzone";



document.addEventListener("DOMContentLoaded", function(event){
  document.getElementById("input_image").addEventListener('change', ImagePaser);
  document.getElementById("analyze_button").addEventListener('click', analyzeImageHumanModel);
  const uploadButton = document.getElementById("uploadButton");
  uploadButton.addEventListener("click", uploadFiles);

})   


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


// Warming up and loading model
// await human.load();
// await human.warmup();
// console.log("Model is warmed")


function uploadFiles(event){
  event.preventDefault();
  const fileInput = document.getElementById("fileInput");
  const selectedFiles = fileInput.files;
  // Check if any files are selected
  if (selectedFiles.length === 0) {
    alert("Please select at least one file to upload.");
    return;
  }
  const formData = new FormData();
  // Append each selected file to the FormData object
  for (let i = 0; i < selectedFiles.length; i++) {
    formData.append("files[]", selectedFiles[i]);
  }
  console.log([...formData])

}



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
  document.getElementById('outer-container').appendChild(age_text);



  return 0;
}

function createImage() {

   



    let img = document.getElementById('display-image');
    if (img == null){
        // Then create the img
        img = document.createElement('img');
    }
   
    
    var fReader = new FileReader();

    fReader.readAsDataURL( document.getElementById('input_image').files[0]);
    
    fReader.onloadend = function(event){
        img.src = event.target.result;
    }
    img.width = 300;
    img.height = 300;
    img.id = 'display-image'
    document.getElementById('button-container').appendChild(img);

    return 0;
}

function ImagePaser(){

    console.log(document.getElementById('input_image').value);
    let current_path = document.getElementById('input_image');
    createImage();

   return 0;
}
