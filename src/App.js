import './App.css';
import Controller from './controller'

function App() {
  const Header = Controller.Header
  const Footer = Controller.Footer
  const PCB = Controller.PCB
  return (
    <div className="App">
     <Header/>
     <PCB/>
     <Footer/>
    </div>
  );
}

export default App;
