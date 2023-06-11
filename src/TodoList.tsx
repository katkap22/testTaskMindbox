import s from "./App.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    title: string;
    tasks: Array<TaskType>
    counterItemLeft: number
    filter: FilterValuesType
    removeTask: (id:string) => void;
    changeFilter: (value:FilterValuesType) => void;
    addTask: (value:string) => void;
    clearCompleted: () => void;
    changeStatus: (taskId:string, isDone:boolean) => void;
}

function TodoList(props: PropsType) {
    const [newValue, setNewValue] = useState("");
    const [error, setError] = useState<string>("");

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget.value);
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        setError('');
        if (e.charCode === 13) {
            props.addTask(newValue);
            setNewValue("");
        }
    }
    const addTask = () => {
        if (newValue.trim() === "") {
            setError('Field is required!!!');
            return;
        }
        props.addTask(newValue.trim());
        setNewValue("");
    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");


    return (
        <div className={s.container}>
            <div className={s.header}>
                <h1 className={s.title}>{props.title}</h1>
                <div className={s.input}>
                    <input type="text"
                           placeholder="What needs to be done?"
                           className={error && s.error}
                           value={newValue}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler} />
                    <button onClick={addTask}>add task</button>
                </div>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>

            <ul className={s.list}>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => props.removeTask(task.id);
                        const onChangeCheckedHandler = (e:ChangeEvent<HTMLInputElement>) => props.changeStatus(task.id, e.currentTarget.checked);
                        return (
                            <li className={task.isDone ? s.isDone: ""}
                                key={task.id}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeCheckedHandler}/>
                                <span>{task.title}</span>
                                <button onClick={onRemoveHandler}
                                         className={s.deleteBtn}>X</button>
                            </li>
                        )
                    })
                }
            </ul>

            <div className={s.footer}>
                <div className={s.messageItemsLeft}>{props.counterItemLeft} items left</div>
                <div className="buttonsFilter">
                    <button onClick={onAllClickHandler}
                            className={`${props.filter === "all" ? s.activeFilter : null}`}>All</button>
                    <button onClick={onActiveClickHandler}
                            className={`${props.filter === "active" ? s.activeFilter : null}`}>Active</button>
                    <button onClick={onCompletedClickHandler}
                            className={`${props.filter === "completed" ? s.activeFilter : null}`}>Completed</button>
                </div>
                <button onClick={props.clearCompleted}>Clear completed</button>
            </div>
        </div>
    )
}

export default TodoList;