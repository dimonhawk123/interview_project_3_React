import React from 'react';
import Add from './add-field/addElem';
import ElemList from './elem-list/elemList';
import SearchBar from './search-bar/searchBar';
import Toggle from './toggle-bar/toggleBar';
import Weather from './weather/weather';

class Main extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],          // массив объектов - созданных задач
            text: '',           // текст в поле поиска
            sorted: {},         // типо сортировки
            checkbox: [],       // массив категорий для выбора задач
            favorite: false     // выбор избранных задач
        }
    }
    
    // при монтировании компонента
    // получаем все задачи из localstorage, 
    // которые сохраняются с прошлого сеанса 
    componentDidMount() {
        let states = localStorage.getItem('states');
        let state = JSON.parse(states);
        let data = state === null ? [] : state;
        this.setState({
            tasks: data
        });        
    }
    
    // получаем сегодняшнюю дату 
    getDate = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        return `${day}.${month}.${year}`;
    }    
    
    // при обновлении компонента
    // записываем в localstorage текущие задачи 
    componentDidUpdate() {
        localStorage.setItem('states', JSON.stringify(this.state.tasks));  
    }  

    // обновление состояния 
    handleTaskUpdate = (states) => {        
        this.setState(states);      
    }

    render(){         
        return(
            <div>
                <div>
                    Задачи на {this.getDate()}
                    <SearchBar 
                        value={this.state.text}
                        tasks={this.state.tasks}
                        fav={this.state.favorite}   
                        onTaskUpdate={this.handleTaskUpdate}                        
                    />
                    <Toggle 
                        tasks={this.state.tasks}
                        onTaskUpdate={this.handleTaskUpdate}
                    />
                    <ElemList                         
                        fav={this.state.favorite}                        
                        checkbox={this.state.checkbox}
                        sorted={this.state.sorted} 
                        value={this.state.text}
                        tasks={this.state.tasks}                        
                        onTaskUpdate={this.handleTaskUpdate}
                    />
                    <Add      
                        tasks={this.state.tasks} 
                        onTaskUpdate={this.handleTaskUpdate}
                    />
                    <Weather />
                </div>                
            </div>
        );
    }
}

export default Main;