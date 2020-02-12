import React from 'react';

class Additional extends React.Component {
    
    handleTaskAdd = (event) => {
        event.preventDefault();
        let textField = event.target.elements.addField.value;
        if (textField !== '') {
            this.props.onTaskAdd(textField);
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