import React from 'react';

class Additional extends React.Component {
    constructor(props) {
        super(props);
        this.tasks = this.props.static;
    }

    handleTaskAdd = (event) => {
        event.preventDefault();

        let textField = event.target.elements.addField.value;
        if (textField !== '') {   

            const elem = {
                text: textField,
                id: Date.now(),
                category: '',
                fav: false,
                isDone: false
            }      
            
            this.tasks = this.tasks.concat(elem);
                            
            this.props.onTaskUpdate({
                tasks: this.tasks,
                text: ''
            }, this.tasks);
        }
        event.target.elements.addField.value = '';
    }

    render() {
        return(
            <form onSubmit={this.handleTaskAdd}>
                <input type="text" name="addField" placeholder="Введите задачу" />
                <button>Добавить</button>
            </form>
        );
    }

}

export default Additional;