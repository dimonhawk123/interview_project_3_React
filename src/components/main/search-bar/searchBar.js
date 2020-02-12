import React from 'react';

export default class SearchBar extends React.Component {

    handleTaskSearch = (event) => {

        let tasks = this.props.static;
        let result = tasks.filter(item =>
            item.text.includes(event.target.value)
        );

        this.props.onTaskSearch(result, event.target.value);

    }

    render() {

        return(
            <div>
                <input type="text" 
                    value={this.props.value} 
                    placeholder="Поиск задач"
                    onChange={this.handleTaskSearch}
                    />
            </div>
        );
    }
}