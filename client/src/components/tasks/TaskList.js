import React from 'react';
import TaskCard from './TaskCard';
import Pagination from '../common/Pagination';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const TaskList = ({ tasks, onEditTask, pagination, onPageChange, loading }) => {
  if (!loading && tasks.length === 0) {
    return (
      <div className="card text-center py-12">
        <CheckCircleIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No tasks found
        </h3>
        <p className="text-gray-600 mb-6">
          Create your first task to get started with organizing your work.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Task Cards */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => onEditTask(task)}
          />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
        />
      )}
    </div>
  );
};

export default TaskList;