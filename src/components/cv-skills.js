import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class Skills extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            enableSkills: false,
            skill: [{
                skillId: 0,
            },{
                skillText: ''
            }],
            skills: []
        };
 
        this.renderPreviewMode = this.renderPreviewMode.bind(this)
        this.renderEditMode = this.renderEditMode.bind(this)
        this.renderMode = this.renderMode.bind(this)
        this.enableSkills = this.enableSkills.bind(this)
        this.updateState = this.updateState.bind(this)
        this.updateField = this.updateField.bind(this)
        this.addSkill = this.addSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
        this.deleteSkillsState = this.deleteSkillsState.bind(this)
        this.swiftSkillNumber = this.swiftSkillNumber.bind(this)
        this.renderSkill = this.renderSkill.bind(this)
    }
    renderPreviewMode(){
        if(this.state.enableSkills == true) {
            return (
                <section className="cvSummary">
                    <div className="sectionDescription">
                        <h5>Skills</h5>
                    </div>
                    <div className="sectionContent skillsWrapper">
                        {this.state.skills.map((task, key) => {
                           
                            return (
                            <div className="alignIcon skill"   key={task[0].skillId}>
                                <div>
                                    <p>{task[1].skillText}</p>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </section>
            )
        } else {
            
            return (
                 ''
            )
        } 
    }
    renderEditMode(){
        let autoHeight = function() {
            let element = document.querySelector('.skillTextarea');
            element.style.height = "5px";
            element.style.height = (element.scrollHeight)+"px";

        }
        if(this.state.enableSkills == true) {
            return (
                <section className="cvSkills">
                    <div className="sectionDescription">
                        <h5>Skills</h5>
                    </div>
                    <div className="sectionContent skillsWrapper">
                        <div className="sectionContent skillsWrapper">
                            {this.state.skills.map((task, key) => this.renderSkill(task, key) )} 

                            <div className="alignIcon alignIconCvTextarea skill ">
                                <textarea className="skill skillTextarea" rows="2" onInput={autoHeight} onChange={this.updateField} placeholder="Add skill" value={this.state.skill[1].skillText}/>
                                <FontAwesomeIcon icon={faPlusSquare} onClick={this.addSkill}/>
                                
                            </div>
                            </div>
                            
                             
                            <div className="deleteItemWrapper"> 
                                    <p>Delete skills</p>
                                    <FontAwesomeIcon icon={faTrash} onClick={this.deleteSkillsState}/>
                            </div>
                    </div>

                     
                </section>
            )
        } else {
            return (
                <section className="cvSummary alignIcon">
                    <p className="descriptionParagraph">Add skills</p>
                    <FontAwesomeIcon icon={faPlusSquare} onClick={this.enableSkills}/>
                </section>
            )
        } 
        
    }
    addSkill() {
        if(this.state.skill[1].skillText != "") {
            this.setState({
                skills: [...this.state.skills, this.state.skill], 
                skill: [{
                    skillId: this.state.skills.length
                },{
                    skillText: ''
                }],
             })
        }
         

          
    }
    deleteSkill(e) {
        let elementId = e.target.parentNode.parentNode.id;
        let newSkills = this.state.skills;

        
        newSkills.splice(elementId, 1)
        this.setState({
            skills: newSkills
        })
        
        this.swiftSkillNumber()

    }
    deleteSkillsState() {
        if( window.confirm("Are you sure you want to delete all skill items submitted?") ){
            this.setState ({
                enableSkills: false ,
                skill: [{
                    skillId: 0,
                },{
                    skillText: ''
                }],
                skills: []
            })
        }
    }   
    swiftSkillNumber() {
        let number = 0;
        let newSkills = this.state.skills;
        let finalSkills = []
        this.setState({
            skills: []
             
        })
         
        newSkills.map(currentSkill => {
            let newSkill = currentSkill;
            
            newSkill[0].skillId = number;
            finalSkills = [...finalSkills, currentSkill] 
            
            
            number++
            
        })
        this.setState({
            skills: finalSkills
        })

          
    }
    renderSkill(task, key) {
    
            return (
                <div className="alignIcon skill"  id={task[0].skillId} key={task[0].skillId}>
                    <div>
                         <p>{task[1].skillText}</p>
                    </div>
                    <FontAwesomeIcon icon={faTrash} onClick={this.deleteSkill}/>
                </div>
            )
        
         
    }
    enableSkills(){
         this.setState({
            enableSkills: true
        })
    }
    updateState(newValue) {
        // console.log(this.state.skills.length)
        this.setState({
            skill: [{
                skillId: this.state.skills.length
            },{
                skillText: newValue
            }]
        })
        // console.log(this.state.skills)
    }

    updateField(e) {
        this.updateState(e.target.value);
        // console.log(e.target.className)
         
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
export default Skills