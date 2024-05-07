import { useState } from "react"
import { Dialog, DialogActions, DialogContent, Typography } from "@mui/material"
import { Box, styled } from "@mui/system"
import UIButton from "../components/button"
import UIInput from "../components/input"
import TaskBar from "../components/task-bar"

import { Styles } from "../styles/styles"
import { TypographyStyles } from "../styles/typography"
import { TASK_STATUS } from "../constant/status"
import { useAddNewTaskMutation } from "../api/apiSlice"

const TaskListContainer = styled(Box)(() => ({
    ...Styles.flexCenter,
    flexDirection: 'column',
    gap: '25px',
}))

const TaskList = () => {

    const [taskName, setTaskName] = useState('');
    const [completeDate, setCompleteDate] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const [addNewTask, { isLoading }] = useAddNewTaskMutation();
    const canSave = [taskName, completeDate].every(Boolean) && !isLoading

    const handleShowPopup = () => {
       setShowPopup(true)
    }

    const handleAddTask = async () => {
        if(canSave) {
            try {
                await addNewTask({
                    name: taskName,
                    dueDate: new Date(completeDate),
                    status: TASK_STATUS.TO_DO,
                    createdAt: new Date()
                }).unwrap();
                handleClearFields();
            } catch (error) {
                console.error('Failed to save the task: ', error)
            }
        }
    }

    const handleClearFields = () => {
        setShowPopup(false);
        setTaskName('');
        setCompleteDate('');
    }

    const renderTaskContainers = Object.entries(TASK_STATUS).map(([_,value], index) => {
        return <TaskBar taskStatus={value} key={index}/>
    })

    const isAddButtonDisabled = taskName === '' || completeDate === '' || taskName.trim() === '';

    return <TaskListContainer component={'section'}>
        <Box sx={{ ...Styles.flexBetween, width: '100%' }}>
            <Typography sx={TypographyStyles.Mulish.title}>Your Tasks</Typography>
            <UIButton
                label='Add Task'
                onClick={handleShowPopup}
            />
        </Box>
        <Box>
            <Box sx={taskListStyles.taskContainer}>
                {renderTaskContainers}
            </Box>
        </Box>
        <Dialog open={showPopup} sx={taskListStyles.dialog}>
            <DialogContent>
                <Box sx={taskListStyles.dialogContent}>
                    <Typography sx={TypographyStyles.Mulish.title}>Add Task</Typography>
                    <Box sx={taskListStyles.dialogInputs}>
                        <UIInput
                            label='Task Name'
                            type='text'
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <UIInput
                            label='Complete Date'
                            type='date'
                            value={completeDate}
                            onChange={(e) => setCompleteDate(e.target.value)}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <UIButton
                    onClick={handleClearFields}
                    label='Cancel'
                    color='error'
                />
                <UIButton
                    label='Add'
                    onClick={handleAddTask}
                    color='primary'
                    disabled={isAddButtonDisabled}
                />
            </DialogActions>
        </Dialog>
    </TaskListContainer>
}

const taskListStyles = {
    taskContainer: {
        ...Styles.flexCenter, 
        gap: '10px', 
        flexWrap: 'wrap',
        alignItems: 'baseline'
    },
    dialog: {
        '.MuiDialog-paper': {
            borderRadius: '30px',
            p:2
        }
    },
    dialogContent: {
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px', 
        alignItems: 'center'
    },
    dialogInputs: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        gap:'25px', 
        flexWrap: 'wrap'
    }
};

export default TaskList