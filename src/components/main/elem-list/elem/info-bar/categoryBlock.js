import React from 'react';

export default class CategoryBlock extends React.Component {


    // handleChangeCategory = (event) => {
    //     let task = this.props.task;
    //     task.category = event.target.value; 
    //     this.props.onTaskSetups(task, this.props.id);
    // }

    handleChangeFavorite = (event) => {
        let task1 = this.props.task;
        task1.fav = event.target.checked; 
        this.props.onTaskSetups(task1, this.props.id);
    }

    // handleChangeNote = (event) => {
    //     let note = this.props.task;
    //     note.note = event.target.value;
    //     this.props.onTaskSetups(note, this.props.id);
    // }

    // handleChangeTime = (event) => {
    //     let time = this.props.task;
    //     time.time = event.target.value;
    //     this.props.onTaskSetups(time, this.props.id);
    // }

    handleChangeTask = (event) => {
        let task = this.props.task;
        let name = event.target.name;
        task[name] = event.target.value;
        this.props.onTaskSetups(task, this.props.id);
    }

    render() {
        return(
            <form>
                Выберите категорию<br />
                <select name="category" value={this.props.task.category} onChange={this.handleChangeTask}>
                    <option value="family">Семья</option>
                    <option value="job">Работа</option>
                    <option value="study">Учёба</option>
                    <option value="">Ничего не выбрано</option>
                </select>
                <br />
                <input 
                    type="checkbox" 
                    onChange={this.handleChangeFavorite} 
                    checked={this.props.task.fav}
                /> Добавить в важное
                <br />
                <textarea 
                    name = "note"
                    rows="5" cols="20"
                    style={{resize: 'none'}}
                    onChange={this.handleChangeTask} 
                    value={this.props.task.note}
                />
                <br />
                <input 
                    type="datetime-local" 
                    name = "time"
                    value={this.props.task.time} 
                    onChange={this.handleChangeTask}
                />
            </form>
        );
    }
}