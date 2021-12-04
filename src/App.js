import React from 'react';
import './App.css';
import Intro from './components/cv-intro.js';
import ModeButtons from './components/modeButtons';
import Summary from './components/cv-summary';
import Skills from './components/cv-skills'
import Education from './components/cv-education'
import Experience from './components/cv-experience'
import Custom from './components/cv-custom'

class App extends React.Component {
  constructor(props){
      super(props);

      this.state = {
        currentMode: 'edit'
      }


      this.getCurrentMode = this.getCurrentMode.bind(this);
      this.toggleButtonClass = this.toggleButtonClass.bind(this);
    }
  

  //the following two methods were lifted from the modeButton component, in order
  //to set an global currentMode state, so that all the components would update at 
  //once after we select the edit/preview mode
  toggleButtonClass(e) {
      let buttons = Array.from(document.querySelectorAll(".changeModeButton"));
      buttons.map( button => {
          button.classList.remove("button-active")
      })
      e.target.classList.add("button-active");
      this.getCurrentMode();
  }
  
  getCurrentMode() {
    let editButton = document.querySelector(".editButton");

    if(editButton.classList.contains("button-active")){
        this.setState({
          currentMode: 'edit'
        })
    } else {
        this.setState({
          currentMode: 'preview'
        })
    }
 
  }

  render() {
    
      return (
          <div className="App">            
            <ModeButtons toggleFunction={this.toggleButtonClass} onClick={this.getCurrentMode} />
            <header className="App-header">
              <Intro  mode={this.state.currentMode} />
              <Summary mode={this.state.currentMode} />
              <Skills mode={this.state.currentMode} />   
              <Education mode={this.state.currentMode} />      
              <Experience mode={this.state.currentMode} />           
              <Custom mode={this.state.currentMode} />
            </header>
          </div>
      );
      
  }
  
}

export default App;
