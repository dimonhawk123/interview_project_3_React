import React from 'react';
import CategoryBlock from './info-bar/categoryBlock';

class Elem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleTools: false,                     // видимость панели настроек
            textarea: false,                         // видимость блока заметок задачи
            time: Math.floor(Date.now()/1e3)         // текущее время 
        }
    }

    // обработчик кнопки удаления задачи
    handleTaskDelete = () => {
        this.props.onTaskDelete(this.props.id);
    }

    // обработчик кнопки добавления задачи в "избранное"
    handleTaskDone = () => {   
        let isDone = this.props.task;
        isDone.isDone =  !isDone.isDone;
        this.props.onTaskSetups(isDone, this.props.id);        
    } 

    // изменение состояния видимости блока настроек 
    blockAppear = () => {
        this.setState({
            visibleTools: !this.state.visibleTools
        })
    }

    // изменение состояния видимости блока заметок 
    noteAppear = () => {
        this.setState({
            textarea: !this.state.textarea
        })
    }

    // обновление состояния текущего времени
    nextMinute() {        
        this.setState({
            time: Math.floor(Date.now()/1e3)
        })
    }
    
    // при монтировании компонента запускается интервал,
    // который обновляет состояние текущеко времени каждые 10 сек
    componentDidMount() {
        this.interval = setInterval(
            () => this.nextMinute(),
            10000           
        );
    }
    // при размонтировании интервал удаляется 
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // сравниваем заданное время задачи с текущим временем 
    compareTime() {
        let late = '';
        let timeStr = this.props.task.time;
        let index = timeStr.indexOf('T');
        let date = timeStr.slice(0, index);
        let clock = timeStr.slice(index + 1);
        // заданное время задачи переводим в формат timestamp
        let timestamp = Date.parse(timeStr)/1000;
        // если время задачи меньше текущего 
        if (timestamp < this.state.time) {
            late = ' - просрочено';
        }
        return 'Сделать до: ' + date + ' ' + clock + late; 
    }

    render() {
        const lateDate = this.compareTime();
        const done = this.props.task.isDone;
        const text = done ? 
            <span style={{textDecoration: 'line-through'}}>{this.props.task.text}</span> :
            this.props.task.text;
        
        const textBtn = done ? 'Не выполнено' : 'Выполнено';
        const block = <CategoryBlock
                            // key={this.props.id}
                            id = {this.props.id}
                            task={this.props.task}
                            onTaskSetups={this.props.onTaskSetups}
                            index={this.props.index}
                        />
        
        return(
            <div 
                className="elem"
                style={{position: 'relative', marginBottom:'40px'}}>
                <div>
                    <span >{text}</span>               
                    <button onClick={this.handleTaskDone}>{textBtn}</button>
                    <button onClick={this.handleTaskDelete}>Удалить</button>
                    <button onClick={this.blockAppear}>Настройка</button>
                    <br />
                    {this.props.task.note.length > 0 && 
                        <span onClick={this.noteAppear}>
                            Заметка
                        </span>
                    }
                    {this.state.textarea && <div>{this.props.task.note}</div>}
                    {this.props.task.time.length > 0 && lateDate}

                </div>
                <div style={{position: 'absolute', left: '500px', top: '0px'}}>
                    {this.state.visibleTools && block}                    
                </div>
            </div>
        );
    }

}

export default Elem;