import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

class Intro extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            contactPhone: "",
            email: "",
            linkedin: "",
            location: ""
        };

        this.getCurrentMode = this.getCurrentMode.bind(this)
        this.updateState = this.updateState.bind(this);
        this.updateField = this.updateField.bind(this);
        this.renderMode = this.renderMode.bind(this);
        this.renderEditMode = this.renderEditMode.bind(this);
        this.renderPreviewMode = this.renderPreviewMode.bind(this);
    }

    getCurrentMode(){
    
        let editButton = document.querySelector(".editButton");
    
        if(editButton.classList.contains("button-active")){
            return 'edit' //we return true as the "edit mode" button is selected
            
        } else {
            return 'preview'
        }
    }

    updateState(currentState, newValue) {
        this.setState({
            [currentState]: newValue
        })
    }

    updateField(e) {
        this.updateState(e.target.className, e.target.value);
        // console.log(e.target.className)
        // console.log(this.state)
         
    }
    renderEditMode() {
        return (
            <section className="cvHeader">
            
                    <div className="name">
                        
                        <textarea className="name" type="text" rows="3" onChange={this.updateField} value={this.state.name} placeholder="name" />
                    </div>
                    <div className="generalInformation">
                        <label className="textareaLabel">Contact phone</label>
                        <textarea className="contactPhone" onChange={this.updateField} type="text" rows="1"   value={this.state.contactPhone} placeholder="phone" />
                        <label className="textareaLabel">E-mail address</label>
                        <textarea className="email" type="email" rows="1"  onChange={this.updateField} value={this.state.email}  placeholder="email" />
                        <label className="textareaLabel">LinkedIn(paste profile hyperlink)</label>
                        <textarea className="linkedin" type="text" rows="1" onChange={this.updateField} value={this.state.linkedin} placeholder="linkedin hyperlink" />
                        <label className="textareaLabel">Your current location</label>
                        <textarea className="location" type="text" rows="1" onChange={this.updateField} value={this.state.location}  placeholder="location" />
                    </div>
                 
            </section>
        )
    }
    renderPreviewMode() {
        return (
            <section className="cvHeader">
                    <div className="name">
                        <h1 className="name"> {this.state.name}</h1>
                    </div>
                    <div className="generalInformation">
                        <span className="alignHeadIcon"><p className="contactPhone">{this.state.contactPhone}</p><FontAwesomeIcon icon={faPhone} size="xs"/></span>
                        <span className="alignHeadIcon"><p className="email">{this.state.email}</p> <FontAwesomeIcon icon={faEnvelope} size="xs"/></span>
                        <span className="alignHeadIcon"><p className="linkedin"><a href={this.state.linkedin} target="_blank">{this.state.name}</a></p> <FontAwesomeIcon icon={faLinkedin } size="xs"/></span>
                        <span className="alignHeadIcon"><p className="location">{this.state.location }</p> <FontAwesomeIcon icon={faMapMarkerAlt} size="xs"/></span>
                    </div>
                 
            </section>
        )
    }
    renderMode(mode) {
        if(mode === 'edit') {
            return <this.renderEditMode />
        } else {
            return <this.renderPreviewMode />
        }
    }
    render(){
        return (
             this.renderMode(this.props.mode)
            
        )
    }
}
export default Intro