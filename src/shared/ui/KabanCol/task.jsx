import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";

function Task({ colIndex, taskIndex }) {
    const task = { title: "task" };

    const handleOnDrag = (e) => {
        e.dataTransfer.setData(
            "text",
            JSON.stringify({ taskIndex, prevColIndex: colIndex })
        );
    };

    return (
        <div>
            <div
                draggable
                onDragStart={handleOnDrag}
                className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer"
            >
                <p className=" font-bold tracking-wide ">{task.title}</p>
            </div>
        </div>
    );
}

export default Task;