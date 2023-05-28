import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import boardsSlice from "../redux/boardsSlice";
import Task from "./task";

function Column({ colIndex }) {
    const handleOnDrop = (e) => {
        const { prevColIndex, taskIndex } = JSON.parse(
            e.dataTransfer.getData("text")
        );

        if (colIndex !== prevColIndex) {
            console.log('colIndex', colIndex);
            //   dispatch(
            //     boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
            //   );
        }
    };

    const handleOnDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
            className="scrollbar-hide mx-5 pt-[90px] min-w-[280px] "
        >
            <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
                <div className={`rounded-full w-4 h-4 ${color} `} />
                {col.name} ({col.tasks.length})
            </p>

            {col.tasks.map((task, index) => (
                <Task key={index} taskIndex={index} colIndex={colIndex} />
            ))}
        </div>
    );
}

export default Column;