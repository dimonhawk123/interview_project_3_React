import React from 'react';

export default class CategoryBlock extends React.Component {


    handleChangeCategory = (event) => {
        let task = this.props.task;
        task.category = event.target.value; 
        this.props.onTaskSetups(task, this.props.index);
    }

    handleChangeFavorite = (event) => {
        let task1 = this.props.task;
        task1.fav = event.target.checked; 
        this.props.onTaskSetups(task1, this.props.index);
    }

    render() {
        return(
            <form>
                Выберите категорию<br />
                <select value={this.props.task.category} onChange={this.handleChangeCategory}>
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
            </form>
        );
    }
}