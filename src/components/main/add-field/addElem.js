import React from 'react';

class Additional extends React.Component {    

    // добавляем задачу 
    handleTaskAdd = (event) => {
        event.preventDefault();
        let tasks = this.props.tasks;
        let textField = event.target.elements.addField.value;
        if (textField !== '') {   
            // создаем макет для задачи 
            const elem = {
                text: textField,                                    // текст задачи
                id: Date.now() + Math.floor(Math.random() * 9),     // id задачи
                category: '',                                       // категория, к которой задача относится
                fav: false,                                         // пометка как избранное
                isDone: false,                                      // пометка как выполненное
                note: '',                                           // заметки задачи
                date: '',                                           // дата календаря, до которой нужно выполнить задачу
                time: ''                                            // часы и минуты, до которых нужно выполнить задачу
            }      
            // объединяем с уже существующими задачами 
            tasks = tasks.concat(elem);
            // обновляем состояние                  
            this.props.onTaskUpdate({
                tasks: tasks,
                text: ''
            });
        }
        event.target.elements.addField.value = '';
    }

    render() {
        return(
            <form onSubmit={this.handleTaskAdd}>
                <input 
                    className="inputSearch"
                    type="text" 
                    name="addField" 
                    placeholder="Введите задачу" />
                <button
                    className="button button_add" >
                    Добавить
                </button>
            </form>
        );
    }

}

export default Additional;