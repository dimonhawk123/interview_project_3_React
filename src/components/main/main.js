import React from 'react';
import Add from './add-field/addElem';
import ElemList from './elem-list/elemList';
import SearchBar from './search-bar/searchBar';
import Toggle from './toggle-bar/toggleBar';
import Weather from './weather/weather';
import './main.scss';
import './searchBar.scss';
import './toggle.scss';
import './elements.scss';
import './weather.scss';
import './media.scss';


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
        let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
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
            <main className="main">
                <div className="main__title title">
                    Задачи на {this.getDate()}
                </div> 
                <div className="main__searchBar searchBar">
                    <SearchBar 
                        value={this.state.text}
                        tasks={this.state.tasks}
                        fav={this.state.favorite}   
                        onTaskUpdate={this.handleTaskUpdate}                        
                    />
                </div>
                <div className="main__toggle toggleBar">
                    <Toggle 
                        tasks={this.state.tasks}
                        onTaskUpdate={this.handleTaskUpdate}
                    />
                </div>
                <div className="main__elem elements">
                    <ElemList                         
                        fav={this.state.favorite}                        
                        checkbox={this.state.checkbox}
                        sorted={this.state.sorted} 
                        value={this.state.text}
                        tasks={this.state.tasks}                        
                        onTaskUpdate={this.handleTaskUpdate}
                    />
                </div>
                <div className="main__add ">
                    <Add      
                        tasks={this.state.tasks} 
                        onTaskUpdate={this.handleTaskUpdate}
                    />
                </div>
                <div className="main__weather weather">
                    <Weather />      
                </div>                         
            </main>
        );
    }
}

export default Main;