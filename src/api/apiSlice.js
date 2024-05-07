import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://json-server-vercel-six-self.vercel.app/'}),
    tagTypes: ['Tasks'],
    endpoints: builder => ({
        getTasks: builder.query({
            query: () => '/tasks'
        }),
        getTasksByStatus: builder.query({
            query: req => `/tasks?status=${req.status}&_sort=${req.sortBy}&_order=desc`,
            providesTags: ['Tasks']
        }),
        addNewTask: builder.mutation({
            query: newTask => ({
                url: '/tasks',
                method: 'POST',
                body: newTask
            }),
            invalidatesTags: ['Tasks']
        }),
        updateTask: builder.mutation({
            query: task => ({
                url: `/tasks/${task.id}`,
                method: 'PATCH',
                body: task
            }),
            invalidatesTags: ['Tasks']
        }),
        deleteTask: builder.mutation({
            query: id => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tasks']
        })
    })
})

export const { 
    useGetTasksQuery, 
    useGetTasksByStatusQuery, 
    useAddNewTaskMutation, 
    useUpdateTaskMutation,
    useDeleteTaskMutation    
} = apiSlice