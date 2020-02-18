import React from 'react';
import Elem from './elem/elem';

class ElemList extends React.Component {

    // удаляем задачу
    handleTaskDelete = (id) => {
        let arr = this.props.tasks;
        // ищем index задачи по её уникальному id
        let index = arr.findIndex(item => item.id === id);
        // удаляем найденную задачу
        arr.splice(index, 1);
        // устанавливаем обновленный массив задач
        this.props.onTaskUpdate({
            tasks: arr,
        });
    }    

    // обновление полей какой-либо задачи
    handleTaskSetups = (changes, id) => {
        let arr = this.props.tasks;
        let index = arr.findIndex(item => item.id === id);
        arr[index] = changes;
        this.props.onTaskUpdate({
            tasks: arr,
        });
    }

    // сортировка задач 
    sort(type, elems) {  
        if (Object.keys(type).length !== 0) {
            // определение направления сортировки
            let isSorted = type.isSorted;
            let direction = isSorted ? 1 : -1;

            let tasks = elems;
            let arr = tasks.slice();        
            arr.sort((a, b) => {            
                if (a[type.type] === b[type.type]) {
                    return 0;
                }
                if (a[type.type] > b[type.type]) {
                    return direction;
                } else {
                    return direction * -1;
                }
            })       
            return arr;        
        } else {
            return this.props.tasks;
        }
    }

    render() {
        const list = [];                          // массив для компонентов задач
        const filterText = this.props.value;      // текст из строки поиска
        const elems = this.props.tasks;           // массив текущих задач
        const checkbox = this.props.checkbox;     // выбранные типы категорий задач 
        const fav = this.props.fav;               // выбраны ли "избранные" задачи
        const sorted = this.props.sorted;         // тип сортировки
        
        // отсортированный массив задач
        const elems1 = this.sort(sorted, elems); 

        elems1.map((item, index) => {
            // вксючает ли в себя название задачи текст строки поиска
            if (!item.text.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())) {
                return;
            } 
            // есть ли задачи с выбранными категориями 
            if (!checkbox.includes(item.category) && checkbox.length > 0) {
                return;
            } 
            // есть ли задачи добавленные в избранное 
            if (!item.fav && fav) {
                return;
            } 
            // массив компонентов задач 
            list.push(
                <Elem 
                    key={item.id} 
                    id={item.id}
                    task={item}
                    index={index} 
                    onTaskDelete={this.handleTaskDelete}
                    onTaskSetups={this.handleTaskSetups}
                />
            );
            
            })
        
        return(
            <div>
                {list}
            </div>
        );
    }
}

export default ElemList;