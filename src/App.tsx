import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {getItemFromLS} from "./utils";

export type FilterValuesType = "all" | "completed" | "active";

const App: React.FC = () => {

    let [tasks, setTasks] = useState<Array<TaskType>>(
        getItemFromLS()
    );
    const [filter, setFilter] = useState<FilterValuesType>("all");
    let [counterItemLeft, setCounterItemLeft] = useState<number>(0);

    useEffect(() => {
        let tasksLeft = tasks.filter(task => !task.isDone);
        let count = tasksLeft.length;
        setCounterItemLeft(count);
    }, [tasks]);
    useEffect(() => {
            localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const removeTask = (id:string) => {
        tasks = tasks.filter(task => task.id !== id);
        setTasks([...tasks]);
    }
    const addTask = (value:string) => {
            let newTask = { id: v1(), title: value, isDone: false }
            setTasks([newTask, ...tasks]);
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }
    const clearCompleted = () => {
        tasks = tasks.filter(task => !task.isDone);
        setTasks([...tasks]);
    }
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(task => task.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }

    let tasksForTodoList = tasks;

    if (filter === "completed") {
        tasksForTodoList = tasks.filter(task => task.isDone);
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(task => !task.isDone);
    }


    return (
        <div className={s.App}>
            <TodoList
                title='todos'
                tasks={tasksForTodoList}
                counterItemLeft={counterItemLeft}
                filter={filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                clearCompleted={clearCompleted}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;

