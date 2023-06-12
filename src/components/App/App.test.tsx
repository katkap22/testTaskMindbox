import React, {useState} from 'react';
import addTask from "./App";
import {TaskType} from "../TodoList/TodoList";
import {v1} from "uuid";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });



describe('\'length of tasks should be incremented\'', function () {
    test('length of tasks should be incremented', ()=> {
        let [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: 'task # 1', isDone: false}
        ]);
        expect(addTask()).toBe(tasks.length === 1);
    })
    // test('length of tasks should be incremented', ()=> {
    //     let tasks: Array<TaskType> = [];
    //     expect(addTask('newTask')).toBe(tasks.length === 1);
    // })
    // test('length of tasks should be incremented', ()=> {
    //     let tasks: Array<TaskType> = [];
    //     expect(addTask('newTask')).toBe(tasks.length === 1);
    // })
});

// import {describe, expect, test} from '@jest/globals';

const sum = (a:number, b:number) => {
    return a + b;
}
describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});





