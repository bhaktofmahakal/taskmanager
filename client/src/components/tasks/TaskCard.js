import React, { useState } from 'react';
import { format } from 'date-fns';
import { useTasks } from '../../contexts/TaskContext';
import {
  CheckCircleIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import LoadingSpinner from '../common/LoadingSpinner';

const TaskCard = ({ task, onEdit }) => {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toggleTaskStatus, deleteTask } = useTasks();

  const handleToggleStatus = async () => {
    setIsToggling(true);
    await toggleTaskStatus(task._id);
    setIsToggling(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      await deleteTask(task._id);
      setIsDeleting(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className={`card transition-all duration-200 hover:shadow-md ${
      task.status === 'completed' ? 'opacity-75' : ''
    } ${isOverdue ? 'border-l-4 border-l-red-500' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Task Title and Status */}
          <div className="flex items-start justify-between mb-2">
            <h3 className={`text-lg font-medium text-gray-900 ${
              task.status === 'completed' ? 'line-through' : ''
            }`}>
              {task.title}
            </h3>
            <div className="flex items-center space-x-2 ml-4">
              <span className={`badge border ${getStatusColor(task.status)}`}>
                {task.status.replace('-', ' ')}
              </span>
              <span className={`badge border ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Due Date and Overdue Warning */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {task.dueDate && (
                <div className={`flex items-center space-x-1 ${
                  isOverdue ? 'text-red-600' : ''
                }`}>
                  {isOverdue ? (
                    <ExclamationTriangleIcon className="h-4 w-4" />
                  ) : (
                    <CalendarDaysIcon className="h-4 w-4" />
                  )}
                  <span>
                    Due {format(new Date(task.dueDate), 'MMM d, yyyy')}
                    {isOverdue && ' (Overdue)'}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-4 w-4" />
                <span>
                  Created {format(new Date(task.createdAt), 'MMM d, yyyy')}
                </span>
              </div>
            </div>

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
                {task.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{task.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={handleToggleStatus}
          disabled={isToggling}
          className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            task.status === 'completed'
              ? 'text-yellow-700 hover:text-yellow-800 hover:bg-yellow-50'
              : 'text-green-700 hover:text-green-800 hover:bg-green-50'
          } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isToggling ? (
            <LoadingSpinner size="sm" />
          ) : task.status === 'completed' ? (
            <ClockIcon className="h-4 w-4" />
          ) : (
            <CheckCircleIconSolid className="h-4 w-4" />
          )}
          <span>
            {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
          </span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
            title="Edit task"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
            title="Delete task"
          >
            {isDeleting ? (
              <LoadingSpinner size="sm" />
            ) : (
              <TrashIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;