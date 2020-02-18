import React from 'react';
import CategoryBlock from './info-bar/categoryBlock';

class Elem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            textarea: false,
            time: Math.floor(Date.now()/1e3)
        }
    }

    handleTaskDelete = () => {
        this.props.onTaskDelete(this.props.id);
    }

    handleTaskDone = () => {   
        let isDone = this.props.task;
        isDone.isDone =  !isDone.isDone;
        this.props.onTaskSetups(isDone, this.props.id);        
    } 

    blockAppear = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    noteAppear = () => {
        this.setState({
            textarea: !this.state.textarea
        })
    }

    nextMinute() {
        // console.log(this.state.time);
        this.setState({
            time: Math.floor(Date.now()/1e3)
        })
    }
    
    componentDidMount() {
        this.interval = setInterval(
            () => this.nextMinute(),
            10000           
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    equal() {
        let late = '';
        let timeStr = this.props.task.time;
        let index = timeStr.indexOf('T');
        let date = timeStr.slice(0, index);
        let clock = timeStr.slice(index + 1);
        let timestamp = Date.parse(timeStr)/1000;
        if (timestamp < this.state.time) {
            late = ' - просрочено';
        }
        return 'Сделать до: ' + date + ' ' + clock + late; 
    }

    render() {
        const lateDate = this.equal();
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
        // const late = 
        return(
            <div style={{position: 'relative', marginBottom:'40px'}}>
                <div>
                    <span >{text}</span>               
                    <button onClick={this.handleTaskDone}>{textBtn}</button>
                    <button onClick={this.handleTaskDelete}>Удалить</button>
                    <button onClick={this.blockAppear}>Настройка</button>
                    <br />
                    {this.props.task.note.length > 0 && 
                        <span onClick={this.noteAppear}>Заметка</span>}
                    {this.state.textarea && <div>{this.props.task.note}</div>}
                    {this.props.task.time.length > 0 && lateDate}

                </div>
                <div style={{position: 'absolute', left: '500px', top: '0px'}}>
                    {this.state.visible && block}                    
                </div>
            </div>
        );
    }

}

export default Elem;