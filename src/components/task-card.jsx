import React from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { TypographyStyles } from "../styles/typography";
import { TASK_STATUS } from "../constant/status";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../api/apiSlice";
import { getDateDifference } from "../utils/date-helper";

//get background color of an task card.
const determineBackgroundColor = (task) => {
    if (task.status !== TASK_STATUS.COMPLETED) {
        const taskDueDate = new Date(task.dueDate);
        const today = new Date();
        if (taskDueDate.toDateString() !== today.toDateString() && taskDueDate < today) {
            return '#F5CDC8'; // Past due
        }
    }
    return task.status === TASK_STATUS.COMPLETED ? '#cefad0' : '#FFFFFF';
};

// Function to format the task status message
function getTaskStatusMessage(task) {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const completedOn = new Date(task.completedOn);

    if (task.status === TASK_STATUS.COMPLETED) {
        return `Done on ${completedOn.toLocaleDateString()}`;
    }

    const isDueToday = dueDate.toLocaleDateString() === today.toLocaleDateString();
    const isOverdue = dueDate < today;
    const daysDue = getDateDifference(today, task.dueDate);
    const daysOverdue = getDateDifference(task.createdAt, dueDate);

    let dueStatusMessage = '';

    if (isDueToday) {
        dueStatusMessage = 'Due today';
    } else if (isOverdue) {
        dueStatusMessage = `Overdue by ${Math.abs(daysOverdue)} day${Math.abs(daysOverdue) !== 1 ? 's' : ''}`;
    } else {
        dueStatusMessage = `Due in ${daysDue} day${daysDue !== 1 ? 's' : ''}`;
    }

    return dueStatusMessage;
}


const TaskCard = ({ task }) => {

    const [updateTask, { isLoading }] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleStartTask = async () => {
        if (task && !isLoading) {
            await updateTask({
                id: task.id,
                updatedAt: new Date(),
                status: TASK_STATUS.IN_PROGRESS
            })
        }
    }

    const handleMarkCompleteTask = async () => {
        if (task && !isLoading) {
            await updateTask({
                id: task.id,
                completedOn: new Date(),
                status: TASK_STATUS.COMPLETED
            })
        }
    }

    const handleDeleteTask = async () => {
        await deleteTask(task.id);
    }

    const statusMessage = getTaskStatusMessage(task);

    const isTaskInProgress = task.status === TASK_STATUS.IN_PROGRESS;
    const isTaskToDo = task.status === TASK_STATUS.TO_DO;

    const renderMenuItems = () => {
        let items = [];

        if (isTaskToDo) {
            items.push(<MenuItem key="start" onClick={handleStartTask}>Start task</MenuItem>);
        }

        if (isTaskInProgress) {
            items.push(<MenuItem key="complete" onClick={handleMarkCompleteTask}>Mark complete</MenuItem>);
        }

        if (isTaskToDo || isTaskInProgress) {
            items.push(<MenuItem key="delete" onClick={handleDeleteTask} sx={menuStyles.deleteTask}>Delete task</MenuItem>);
        }

        return items;
    };

    return <Box sx={taskCardContainerStyles(task)}>
        <Typography title={task.name} sx={{ ...TypographyStyles.Mulish.taskTitle, maxWidth: '100px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {task.name}
        </Typography>
        <Typography sx={{ ...TypographyStyles.Mulish.taskTimeLine }}>
            {statusMessage}
        </Typography>
        {
            task.status !== TASK_STATUS.COMPLETED &&
            <IconButton
                sx={menuStyles.button}
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <ArrowDropDownIcon />
            </IconButton>
        }
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={
                menuStyles.menu
            }
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {renderMenuItems()}
        </Menu>
    </Box>
}

/** Styles for the menu and items */
const menuStyles = {
    button: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    menu: {
        elevation: 0,
        sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
            },
        },
    },
    deleteTask: {
        color: 'red'
    }
};

const taskCardContainerStyles = (task) => ({
    border: '1px solid grey',
    borderRadius: '5px',
    padding: '5px 20px',
    position: 'relative',
    minWidth: '150px',
    backgroundColor: determineBackgroundColor(task),
    ':hover': {
        cursor: 'pointer'
    }
});

export default TaskCard;
