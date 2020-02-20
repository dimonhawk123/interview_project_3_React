import React from 'react';
import CategoryBlock from './info-bar/categoryBlock';
import star from './star.png';

class Elem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleTools: false,                     // видимость панели настроек
            textarea: false,                         // видимость блока заметок задачи
            time: Math.floor(Date.now()/1e3)         // текущее время 
        }
        // цвета разных категорий для рамки задачи
        this.color = {
            study: '#ff00e9',
            job: '#4d00ff',
            family: '#05ef5a'
        }
        this.late = false;
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
        this.late = false;
        let late = '';
        let timeStr = this.props.task.time;
        let index = timeStr.indexOf('T');
        let date = timeStr.slice(0, index);
        let clock = timeStr.slice(index + 1);
        // заданное время задачи переводим в формат timestamp
        let timestamp = Date.parse(timeStr)/1000;
        // если время задачи меньше текущего 
        if (timestamp < this.state.time) {
            this.late = true;
            late = ' - просрочено';
        }
        return 'Сделать до: ' + date + ' ' + clock + late; 
    }

    render() {
        const lateDate = this.compareTime();
        const lateColor = this.late ? 'red' : '';
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
            <section 
                className="elem elements__position"
                style={{position: 'relative', borderColor: this.color[this.props.task.category]}}>
                <div className="elem__content">
                    <div className="elem__flex">
                        <div className="elem__action">
                            {text}
                        </div>   
                        {this.props.task.fav && 
                            <div className="elem__favIcon">
                                <img className="image" src={star} alt="starIcon" />
                            </div>}
                        <div className="elem__button">
                            <button 
                                className="button elem__position"
                                onClick={this.handleTaskDone}>
                                    {textBtn}
                            </button>
                            <button
                                className="button elem__position"
                                onClick={this.handleTaskDelete}>
                                    Удалить
                            </button>
                            <button 
                                className="button elem__position"
                                onClick={this.blockAppear}>
                                    Настройка
                            </button>
                        </div>
                    </div>
                    <div className="elem__flex" style={{marginTop: '7px'}}>
                        {this.props.task.note.length > 0 && 
                            <div 
                                className="elem__noteBlock">
                                <span 
                                    className="elem__note"
                                    onClick={this.noteAppear}>
                                        Заметка...
                                </span>
                            </div>
                        }
                        {this.props.task.time.length > 0 && 
                            <div 
                                style={{color: lateColor}}
                                className="elem__date">
                                    {lateDate}
                            </div>}
                    </div>

                    {
                        this.state.textarea && 
                            <div className="elem__noteText">
                                {this.props.task.note}
                            </div>
                    }
                    

                </div>
                <div className="tools">
                    {this.state.visibleTools && block}                    
                </div>
            </section>
        );
    }

}

export default Elem;