import React, { createContext, useContext, useReducer } from 'react';
import { taskAPI } from '../services/api';
import toast from 'react-hot-toast';

const TaskContext = createContext();

// Task reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload.tasks,
        pagination: action.payload.pagination,
        loading: false
      };
    case 'SET_STATS':
      return {
        ...state,
        stats: action.payload
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  tasks: [],
  stats: {
    total: 0,
    pending: 0,
    'in-progress': 0,
    completed: 0,
    overdue: 0,
    completionRate: 0
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalTasks: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10
  },
  filters: {
    status: '',
    priority: '',
    sortBy: 'createdAt',
    order: 'desc',
    page: 1,
    limit: 10
  },
  loading: false
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Get tasks with filters
  const getTasks = async (filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const mergedFilters = { ...state.filters, ...filters };
      const response = await taskAPI.getTasks(mergedFilters);
      
      dispatch({
        type: 'SET_TASKS',
        payload: response.data.data
      });
      
      // Update filters in state
      dispatch({
        type: 'SET_FILTERS',
        payload: mergedFilters
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch tasks';
      toast.error(message);
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message };
    }
  };

  // Get task statistics
  const getStats = async () => {
    try {
      const response = await taskAPI.getStats();
      
      dispatch({
        type: 'SET_STATS',
        payload: response.data.data
      });
      
      return { success: true };
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      return { success: false };
    }
  };

  // Create new task
  const createTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      
      dispatch({
        type: 'ADD_TASK',
        payload: response.data.data
      });
      
      // Refresh stats
      getStats();
      
      toast.success('Task created successfully');
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Update task
  const updateTask = async (taskId, taskData) => {
    try {
      const response = await taskAPI.updateTask(taskId, taskData);
      
      dispatch({
        type: 'UPDATE_TASK',
        payload: response.data.data
      });
      
      // Refresh stats
      getStats();
      
      toast.success('Task updated successfully');
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Toggle task status
  const toggleTaskStatus = async (taskId) => {
    try {
      const response = await taskAPI.toggleTaskStatus(taskId);
      
      dispatch({
        type: 'UPDATE_TASK',
        payload: response.data.data
      });
      
      // Refresh stats
      getStats();
      
      const task = response.data.data;
      const statusMessage = task.status === 'completed' 
        ? 'Task marked as completed!' 
        : 'Task marked as pending';
      
      toast.success(statusMessage);
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to toggle task status';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      
      dispatch({
        type: 'DELETE_TASK',
        payload: taskId
      });
      
      // Refresh stats
      getStats();
      
      toast.success('Task deleted successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Set filters
  const setFilters = (filters) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: filters
    });
  };

  // Reset filters
  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const value = {
    ...state,
    getTasks,
    getStats,
    createTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
    setFilters,
    resetFilters
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};