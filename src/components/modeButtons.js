import React from 'react';




class ModeButtons extends React.Component {
  
    
    render(){
         
        return (
            <div className="viewing-mode">
                <button onClick={this.props.toggleFunction} className="editButton changeModeButton button-active">Edit mode</button>
                <button onClick={this.props.toggleFunction} className="previewButton changeModeButton">Preview mode</button>
            </div>
        )
    }
}
export default ModeButtons