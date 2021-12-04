import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment'

class Custom extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            enableCustom: false,
            customArr: [],
            currentCustom: {
                customDescription: '' ,
                id: 0,
                title: '',
                description: ''
            }, 
         };

        this.renderPreviewMode = this.renderPreviewMode.bind(this)
        this.renderEditMode = this.renderEditMode.bind(this)
        this.enableCustom = this.enableCustom.bind(this)
         
        this.updateField = this.updateField.bind(this);
        this.addNewCustom = this.addNewCustom.bind(this);
        this.renderCustomItem = this.renderCustomItem.bind(this)
        this.deleteExperienceItem = this.deleteExperienceItem.bind(this)
        this.deleteCustomState = this.deleteCustomState.bind(this);
        this.swiftExperienceItemNumber = this.swiftExperienceItemNumber.bind(this)
     }
    
    renderPreviewMode(){
        if(this.state.enableCustom == true) {
            return (
                <section className="cvExperience alignIcon">
                    <div className="sectionDescription customDescription">
                        <h5>{this.state.currentCustom.customDescription}</h5>
                    </div>
                    <div className="sectionContent">
       
                        {this.state.customArr.map((experienceItem, key) => this.renderCustomItem(experienceItem, key) )} 
                    
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
            let element = document.querySelector('.description');
            element.style.height = "5px";
            element.style.height = (element.scrollHeight)+"px";
        }       
         if(this.state.enableCustom == true) {
            return (
                <section className="cvCustom alignIcon">
                    <div className="sectionDescription customDescription">
                        <textarea className="customDescription" rows="7" onChange={this.updateField} placeholder="Section title" value={this.state.currentCustom.customDescription}/>
                    </div>
                    <div className="sectionContent">
       
                        {this.state.customArr.map((experienceItem, key) => this.renderCustomItem(experienceItem, key) )} 
                         
                        <div className="addExperienceEntry">
                            <label className="textareaLabel">Custom item title*</label>
                            <textarea className="title" rows="1" onChange={this.updateField} placeholder="Title" value={this.state.currentCustom.title}/>
                            <label className="textareaLabel">Custom item description*</label>   
                            <textarea className="description" rows="1" onInput={autoHeight}onChange={this.updateField} placeholder="Description" value={this.state.currentCustom.description}/>
                           
                            <div className="alignIcon">
                                <p>Add experience</p>
                                <FontAwesomeIcon icon={faPlusSquare} onClick={this.addNewCustom}/>
                            </div>

                            <div className="deleteItemWrapper"> 
                                <p>Delete custom</p>
                                <FontAwesomeIcon icon={faTrash} onClick={this.deleteCustomState}/>
                            </div>
                        </div>
                </div>
                </section>
            )
        } else {
            return (
                <section className="cvExperience alignIcon">
                    <p className="descriptionParagraph">Add custom section</p>
                    <FontAwesomeIcon icon={faPlusSquare} onClick={this.enableCustom}/>
                </section>
            )
        } 
        
    }
    enableCustom() {
        this.setState({
            enableCustom: true
        })
    }
    
    renderMode(mode) {
        if(mode === 'edit') {
            return <this.renderEditMode />
        } else {
            return <this.renderPreviewMode />
        }
    }

    updateState(toUpdate, newValue) {
        let temp = {...this.state.currentCustom};
         
        Object.keys(temp).map( child => {
            temp.id = this.state.customArr.length;

            if(toUpdate == 'title') {
                temp.title = newValue
            } else if (toUpdate == "description"){
                temp.description = newValue
            } else if (toUpdate == 'customDescription'){
                temp.customDescription = newValue
            }  
        })
        this.setState({
            currentCustom: temp
        })
        // console.log(this.state.currentCustom.customDescription)
     }
    updateField(e) {
        this.updateState(e.target.className, e.target.value);
    }
    addNewCustom(){
        const currentCustom = this.state.currentCustom;

        if(currentCustom.title != '' && currentCustom.description != '') {
            this.setState({
                customArr: [...this.state.customArr, currentCustom], 
                currentCustom: {
                    customDescription: this.state.currentCustom.customDescription ,
                    id: this.state.customArr.length,
                    title: '',
                    description: '',
                },  
             })
            // console.log(this.state.currentCustom) 
        } else {
            alert("Please add a title and a description to your customer item.)")
        }
     }
    renderCustomItem(item, key){
        let icon

        if(this.props.mode == "edit") {
            icon =  <div className="deleteItemWrapper"> 
                        <p>Delete customer item</p>
                        <FontAwesomeIcon icon={faTrash} onClick={this.deleteExperienceItem}/>
                    </div>
        } else {
            icon = ''
        }

        return (
            <div className='customerItem' id={item.id} key={item.id}>
                <h4>{item.title}</h4>
                <p>{item.description} </p>
              
                {icon}
            </div>
        ) 
    }

    deleteExperienceItem(e) {
        let elementId = e.target.parentNode.parentNode.parentNode.id;
        let newCustomItems = this.state.customArr;

         
        newCustomItems.splice(elementId, 1)
         this.setState({
            customArr: newCustomItems
        })
        
        //after deleting an item, the Id's set up initially would remaing the same, for example: we have item0, item1, item2, we delete item1, we are left 
        //with item0 and item2, upon trying to delete item2, the delete button would ask the delete function to delete the item with the id of 2, but
        //since we've deleted item 1, our array has only 2 items, item0 and item1, the following functions iterates over the array's items, and updates the id accordingly
        this.swiftExperienceItemNumber()

    }
    deleteCustomState() {
        if( window.confirm("Are you sure you want to delete all custom items added?") ){
            this.setState({
                enableCustom: false,
                customArr: [],
                currentCustom: {
                    customDescription: '' ,
                    id: 0,
                    title: '',
                    description: ''
                },  
            })
        }
    }   
    swiftExperienceItemNumber() {
        let number = 0;
        let newExperienceItems = this.state.customArr;
        let finalExperienceItems = []

        this.setState({
            customArr: []
             
        })
         
        newExperienceItems.map(currentItem => {
            let newItem = currentItem;
            newItem.id = number;
            finalExperienceItems = [...finalExperienceItems, currentItem] 
 
            number++
            
        })
        this.setState({
            customArr: finalExperienceItems
        })

          
    }
    render(){
        return (
            this.renderMode(this.props.mode)        
        )
    }
}
export default Custom