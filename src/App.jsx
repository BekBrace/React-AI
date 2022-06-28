import logo from './logo.svg';
import './App.css';
import { useRef , useEffect} from 'react'; 
import * as faceapi from "face-api.js";
import { AgeGenderNet } from 'face-api.js';

function App() {
  const imageRef = useRef()
  const canvasRef = useRef()

  // Composition of Tasks [ documentation]
  // Tasks can be composed as follows:
  
  const handleImg = async() => {
    const fDetections = 
    await faceapi.detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions()
    .withAgeAndGender()
    .withFaceDescriptors()
    
    // await faceapi
    // .detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
    // .withAgeAndGender()
    // .withFaceExpressions();
    // console.log(fDetections)
    canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(imageRef.current);
    // faceapi.draw.drawDetections(canvasRef.current, fDetections);
    faceapi.matchDimensions(canvasRef.current,{
      width: 900,
      height: 600
    })
    const resized = faceapi.resizeResults(fDetections, {
      width:900,
      height:600
    } )
    // faceapi.draw.drawDetections(canvasRef.current, fDetections);
    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);

  }

  useEffect(() => {
    const Models = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        // .then (console.log("promised that i will finish"))
        .then(handleImg)
        .catch((e)=>console.log(e))
    };
    //to prevent finishing loading the models before loading the image, i'll write a condition:
    imageRef.current && Models();
  });

  return (
    <div className="App">
     {/* <img 
     crossOrigin="anonymous"
     ref={imageRef}
     src="https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg" alt="" width="900" height="600"/> */}

     <img 
     crossOrigin="anonymous"
     ref={imageRef}
     src="https://images.pexels.com/photos/601170/pexels-photo-601170.jpeg" alt="" width="900" height="600"/>

     <canvas ref ={canvasRef} width="900" height="650" >
     </canvas>
    </div>
  );
}

export default App;
