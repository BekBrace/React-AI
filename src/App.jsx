import logo from './logo.svg';
import './App.css';
import { useRef , useEffect} from 'react'; 
import * as faceapi from "face-api.js";

function App() {
  const imageRef = useRef()
  const canvasRef = useRef()
  useEffect(() => {
    const Models = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then (console.log("promised that i will finish"))
        .catch((e)=>console.log(e))
    };
    //to prevent finishing loading the models before loading the image, i'll write a condition:
    imageRef.current && Models();
  });

  return (
    <div className="App">
     <img 
     ref={imageRef}
     src="https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg" alt="" width="940" height="650"/>
     <canvas ref ={canvasRef} width="940" height="650" >
     </canvas>
    </div>
  );
}

export default App;
