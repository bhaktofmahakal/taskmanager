import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../contexts/TaskContext';
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const { stats, getTasks, getStats, loading } = useTasks();

  useEffect(() => {
    getStats();
    getTasks({ limit: 5 }); // Get recent tasks for preview
  }, []);

  if (loading && stats.total === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: CheckCircleIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: ClockIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'In Progress',
      value: stats['in-progress'],
      icon: ArrowTrendingUpIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview of your task management progress
          </p>
        </div>
        <Link
          to="/tasks"
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Task</span>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`card ${stat.bgColor} ${stat.borderColor} border-l-4 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Completion Rate */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Completion Rate
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">
              {stats.completionRate}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {stats.completed} of {stats.total} tasks completed
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              to="/tasks"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <PlusIcon className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  Create New Task
                </span>
              </div>
              <span className="text-xs text-gray-500">→</span>
            </Link>
            
            <Link
              to="/tasks?status=pending"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <ClockIcon className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-gray-900">
                  View Pending Tasks
                </span>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                {stats.pending}
              </span>
            </Link>

            {stats.overdue > 0 && (
              <Link
                to="/tasks?overdue=true"
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Overdue Tasks
                  </span>
                </div>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  {stats.overdue}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Welcome Message for New Users */}
      {stats.total === 0 && (
        <div className="card text-center py-12">
          <CheckCircleIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Welcome to Task Manager!
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get started by creating your first task. Stay organized and boost your productivity.
          </p>
          <Link
            to="/tasks"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create Your First Task</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;