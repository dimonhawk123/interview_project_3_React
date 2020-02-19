import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        // выбранные категории
        this.checkbox = [];
    }

    // обработка поля поиска
    // передача введенных значений 
    handleTaskSearch = (event) => {
        this.props.onTaskUpdate({
            tasks: this.props.tasks,
            text: event.target.value
        });
    }
    
    // добавление/удаление категорий для поиска 
    handleCheckBox = (event) => {
        let value = event.target.value;       
        if (event.target.checked) {
            this.checkbox.push(value);            
        } else {
            let index = this.checkbox.findIndex(item => item === value);
            this.checkbox.splice(index, 1);
        }
        this.props.onTaskUpdate({
            checkbox: this.checkbox,                      
        })
    } 

    // изменения состояния checkbox "избранное"
    handleFavorite= (event) => {
        this.props.onTaskUpdate({
            favorite: event.target.checked              
        })
    }

    // study: '#ff00e9',
    // job: '#4d00ff',
    // family: '#05ef5a'
    render() {

        return(
            <div>
                <input 
                    className="inputSearch"
                    name="searchField"
                    type="text" 
                    value={this.props.value} 
                    placeholder="Поиск задач"
                    onChange={this.handleTaskSearch}
                />
                <input        
                    className="inputCheckBox"             
                    name="familyCheckbox"
                    type="checkbox"
                    value="family" 
                    onChange={this.handleCheckBox}
                /> <span style={{borderBottom: '2px solid #05ef5a'}}>Семья</span>
                <input 
                    className="inputCheckBox"
                    name="jobCheckbox"
                    type="checkbox" 
                    value="job" 
                    onChange={this.handleCheckBox} 
                /> <span style={{borderBottom: '2px solid #4d00ff'}}>Работа</span>
                <input 
                    className="inputCheckBox"
                    name="studyCheckbox"
                    type="checkbox" 
                    value="study" 
                    onChange={this.handleCheckBox}
                /> <span style={{borderBottom: '2px solid #ff00e9'}}>Учёба</span>
                <input 
                    className="inputCheckBox"
                    name="favoriteCheckbox"
                    type="checkbox" 
                    value="fav" 
                    onChange={this.handleFavorite} 
                    checked={this.props.fav}    
                /> <span>Избранное</span>
            </div>
        );
    }
}