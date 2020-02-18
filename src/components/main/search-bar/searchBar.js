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
                /> Семья
                <input 
                    className="inputCheckBox"
                    name="jobCheckbox"
                    type="checkbox" 
                    value="job" 
                    onChange={this.handleCheckBox} 
                /> Работа
                <input 
                    className="inputCheckBox"
                    name="studyCheckbox"
                    type="checkbox" 
                    value="study" 
                    onChange={this.handleCheckBox}
                /> Учёба
                <input 
                    className="inputCheckBox"
                    name="favoriteCheckbox"
                    type="checkbox" 
                    value="fav" 
                    onChange={this.handleFavorite} 
                    checked={this.props.fav}    
                /> Избранное
            </div>
        );
    }
}