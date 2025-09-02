import React from 'react';
import { useTasks } from '../../contexts/TaskContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TaskFilters = () => {
  const { filters, setFilters, resetFilters } = useTasks();

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
      page: 1 // Reset to first page when filters change
    });
  };

  const handleClearFilters = () => {
    resetFilters();
  };

  const hasActiveFilters = filters.status || filters.priority || filters.sortBy !== 'createdAt' || filters.order !== 'desc';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
          >
            <XMarkIcon className="h-4 w-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="input-field"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="input-field"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="input-field"
          >
            <option value="createdAt">Created Date</option>
            <option value="updatedAt">Updated Date</option>
            <option value="dueDate">Due Date</option>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <select
            id="order"
            value={filters.order}
            onChange={(e) => handleFilterChange('order', e.target.value)}
            className="input-field"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
          {filters.status && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Status: {filters.status.replace('-', ' ')}
              <button
                onClick={() => handleFilterChange('status', '')}
                className="ml-1.5 text-blue-600 hover:text-blue-800"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.priority && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Priority: {filters.priority}
              <button
                onClick={() => handleFilterChange('priority', '')}
                className="ml-1.5 text-green-600 hover:text-green-800"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          )}
          {(filters.sortBy !== 'createdAt' || filters.order !== 'desc') && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Sort: {filters.sortBy} ({filters.order})
              <button
                onClick={() => {
                  handleFilterChange('sortBy', 'createdAt');
                  handleFilterChange('order', 'desc');
                }}
                className="ml-1.5 text-purple-600 hover:text-purple-800"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskFilters;