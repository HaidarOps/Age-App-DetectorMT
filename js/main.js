
import Human from '@vladmandic/human';
import Dropzone from "dropzone";



document.addEventListener("DOMContentLoaded", function (event) {
  // document.getElementById("input_image").addEventListener('change', ImagePaser);
  // const uploadButton = document.getElementById("uploadButton");
  // uploadButton.addEventListener("click", uploadFiles);
  //
  document.getElementById("file-upload").addEventListener('change', createImage)
});

let img_arrays = [];

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
async function analyzeImageHumanModel() {
  console.log("here");

  // for each entry in the img_arrays return the age number that is presented

  let list_of_ages = [];

  for (let i = 0; i <= img_arrays.length - 1; i++) {
    let img = img_arrays[i];
    console.log('the current image is ' + img);
    const firstImage = await human.detect(img);
    console.log(firstImage)
    console.log(firstImage.face[0].age)
    list_of_ages.push(firstImage.face[0].age)



  };

  let sum = 0;
  // find the average of all the ages
  for (let i = 0; i <= list_of_ages.length - 1; i++) {

    sum += list_of_ages[i];
  };
  let average_age = sum / list_of_ages.length;
  let age_text = document.createElement('h3');
  age_text.innerHTML = average_age;
  age_text.className = 'mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance'
  document.getElementById('file-upload-div').appendChild(age_text);



  return 0;
}



// displaying image once a image has been selected
function createImage() {


  // let img = document.getElementById('display-image');
  // if (img == null){
  //     // Then create the img
  //     img = document.createElement('img');
  // }
  //

  let img = document.createElement('img');
  var fReader = new FileReader();
  let img_name;

  fReader.readAsDataURL(document.getElementById('file-upload').files[0]);

  fReader.onloadend = function (event) {
    img.src = event.target.result;
    img_name = document.getElementById('file-upload').files[0].name;

    img.onload = function(){
      img_arrays.push(img);
      console.log("img added");
    }
  }
  img.width = 50;
  img.height = 50;
  img.id = 'display-image';

  // pass img into array for later anylsis

  


  // document.getElementById('file-upload-div').appendChild(img);
  // let upload = document.getElementById('div-upload')
  // upload.remove();
  // Check if the main container exists, if not create it
  let mainContainer = document.getElementById('file-previews-container');
  if (!mainContainer) {
    let div = document.createElement('div');
    div.id = 'file-previews-container';
    div.className = 'flex flex-row';
    document.getElementById('file-upload-div').appendChild(div);
    mainContainer = div;
  }
  let div_image = document.createElement('div');
  div_image.className = 'flex flex-row items-center gap-3 p-3 mb-2 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-400 hover:bg-blue-50 transition-all';

  div_image.appendChild(img);

  let fileName = document.createElement('span');
  fileName.textContent = img_name;
  fileName.className = 'font-medium text-gray-700 flex-1';

  div_image.append(fileName);

  mainContainer.appendChild(div_image)


  let analyze_button = document.getElementById('analyze_button')
  if (!analyze_button) {
    let button = document.createElement('button');
    button.innerHTML = 'Analyze';
    button.id = 'analyze_button';
    button.addEventListener('click', analyzeImageHumanModel);
    button.className = 'rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
    document.getElementById('file-upload-div').appendChild(button);
  }

  // what is currently within the array
  console.log(img_arrays);


  return 0;
}



function fileInput() {


  let cuurent_image = document.getElementById("file-upload")


}
