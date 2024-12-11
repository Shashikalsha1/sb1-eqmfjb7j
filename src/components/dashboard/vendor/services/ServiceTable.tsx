import React from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, Edit, Trash2, Eye, Clock } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { deleteService, updateServiceStatus } from '@/lib/services';
import type { Service } from '@/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface ServiceTableProps {
  services: Service[];
}

export function ServiceTable({ services }: ServiceTableProps) {
  const handleDelete = async (service: Service) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const result = await deleteService(service.id);
      if (result.error) {
        alert('Error deleting service: ' + result.error);
      }
    }
  };

  const handleStatusChange = async (service: Service, status: Service['status']) => {
    const result = await updateServiceStatus(service.id, status);
    if (result.error) {
      alert('Error updating service status: ' + result.error);
    }
  };

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No services found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">
              Service
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {services.map((service) => (
            <tr key={service.id}>
              <td className="px-6 py-4">
                <div className="flex items-start">
                  <div className="max-w-xs">
                    <div className="text-sm font-medium text-gray-900 break-words line-clamp-2">
                      {service.name}
                    </div>
                    <div className="text-sm text-gray-500 break-words line-clamp-2 mt-1">
                      {service.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatPrice(service.price)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-900">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.duration} min
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${service.status === 'active' ? 'bg-green-100 text-green-800' : 
                    service.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'}`}
                >
                  {service.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {service.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[220px] bg-white rounded-md shadow-lg py-1 z-50"
                      sideOffset={5}
                    >
                      <DropdownMenu.Item className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <Link to={`/dashboard/service_vendor/services/edit/${service.id}`} className="flex items-center w-full">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="my-1 border-t border-gray-100" />
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          Status
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.SubContent
                            className="min-w-[220px] bg-white rounded-md shadow-lg py-1"
                            sideOffset={2}
                            alignOffset={-5}
                          >
                            <DropdownMenu.Item
                              onClick={() => handleStatusChange(service, 'active')}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                              Active
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              onClick={() => handleStatusChange(service, 'draft')}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                              Draft
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              onClick={() => handleStatusChange(service, 'archived')}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                              Archived
                            </DropdownMenu.Item>
                          </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Sub>
                      <DropdownMenu.Separator className="my-1 border-t border-gray-100" />
                      <DropdownMenu.Item
                        onClick={() => handleDelete(service)}
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}