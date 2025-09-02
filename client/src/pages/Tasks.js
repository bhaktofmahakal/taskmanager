import React, { useEffect, useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import TaskFilters from '../components/tasks/TaskFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Tasks = () => {
  const { tasks, filters, getTasks, loading, pagination } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch tasks on component mount and when filters change
  useEffect(() => {
    getTasks();
  }, [filters]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handlePageChange = (page) => {
    getTasks({ ...filters, page });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">
            Manage and organize your tasks efficiently
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center space-x-2"
          >
            <FunnelIcon className="h-5 w-5" />
            <span>Filters</span>
          </button>
          <button
            onClick={handleCreateTask}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="card">
          <TaskFilters />
        </div>
      )}

      {/* Task Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {tasks.length} of {pagination.totalTasks} tasks
          </span>
          {pagination.totalPages > 1 && (
            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
          )}
        </div>
      </div>

      {/* Task List */}
      {loading && tasks.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onEditTask={handleEditTask}
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      )}

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Tasks;