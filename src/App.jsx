import logo from './logo.svg';
import './App.css';
import { useRef } from 'react'; 

function App() {
  const imageRef = useRef()
  const canvasRef = useRef()
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
