import { CircularProgress, Divider, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";

import TaskCard from "./task-card";

import { TypographyStyles } from "../styles/typography";
import { useGetTasksByStatusQuery } from "../api/apiSlice";

import { Styles } from "../styles/styles";
import { TASK_STATUS } from "../constant/status";

const TaskBarContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    border: "1px solid grey",
    padding: "25px",
    borderRadius: "5px",
    minWidth: "200px",
    minHeight: '70vh',
    maxHeight: '70vh',
    [theme.breakpoints.down('sm')]: {
        minHeight: 'auto'
    }
}));

const TaskCardContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflow: "auto",
}));

const TaskBar = ({ taskStatus }) => {
    const requestObject = {
        status: taskStatus,
        sortBy:
            taskStatus === TASK_STATUS.TO_DO
                ? "createdAt"
                : taskStatus === TASK_STATUS.IN_PROGRESS
                    ? "updatedAt"
                    : "completedOn",
    };

    const { data, isFetching, isSuccess } =
        useGetTasksByStatusQuery(requestObject);

    const renderTaskCards = isFetching ? (
        <Box sx={{ ...Styles.flexCenter }}>
            <CircularProgress />
        </Box>
    ) : data?.length === 0 ? (
        <Box>No Tasks</Box>
    ) : (
        isSuccess &&
        data?.map((task) => {
            return <TaskCard task={task} key={task?.id} />;
        })
    );

    return (
        <TaskBarContainer>
            <Box>
                <Typography sx={{ ...TypographyStyles.Mulish.title }}>
                    {taskStatus}
                </Typography>
            </Box>

            <Divider flexItem />

            <TaskCardContainer>{renderTaskCards}</TaskCardContainer>
        </TaskBarContainer>
    );
};

export default TaskBar;
