import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { deleteUser, getAllUser, updateUser } from '@/APIs/UserAPI';

import { Card, Menu, Table, Button } from '@/components/ui';
import { IconDotsVertical } from 'justd-icons';
import { toast } from 'sonner';

const ManageUser = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser(user?.id);
        setUsers(response.data);
        setChange(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, [user?.id, change]);

  const handleDelete = async (userId) => {
    try {
      if (userId == user.id) {
        toast.error('You cannot delete yourself');
        return;
      }
      const response = await deleteUser(user?.id, userId);
      if(response.status === "success")
        setUsers(users.filter(users => users.id !== userId));
        toast.success(response.message);
        setChange(!change);
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleEdit = async (id, email, role) => {
    role = role === "ADMIN" ? "USER" : "ADMIN";
    try {
      const response = await updateUser({ id: user?.id, email: email, role: role });
      console.log(response);
      if(response.status === "success")
        toast.success(response.message);
        setChange(!change);
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user");
    }
};

  return (
    <div className="container mx-auto pt-10 p-4 sm:p-6 md:p-8 lg:p-10">
      <Card className="p-6 bg-slate-200 shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold mb-4 pl-2 text-gray-800">Manage Users</h2>
        <div className="overflow-x-auto">
          <Table aria-label="Users" className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <Table.Header>
              <Table.Column isRowHeader className="py-3 px-4 text-left sm:text-lg bg-quaternary">ID</Table.Column>
              <Table.Column className="py-3 px-4 text-left sm:text-lg bg-quaternary">Name</Table.Column>
              <Table.Column className="py-3 px-4 text-left sm:text-lg bg-quaternary">Email</Table.Column>
              <Table.Column className="py-3 px-4 text-left sm:text-lg bg-quaternary">Batch</Table.Column>
              <Table.Column className="py-3 px-4 text-left sm:text-lg bg-quaternary">Role</Table.Column>
              <Table.Column className="py-3 px-4 text-center sm:text-lg bg-quaternary">Actions</Table.Column>
            </Table.Header>
            <Table.Body items={users} className="divide-y divide-gray-200">
              {(user) => (
                <Table.Row key={user?.id} id={user?.id} className="hover:bg-gray-50 transition-all">
                  <Table.Cell className="py-3 px-4 sm:text-lg">{user?.id}</Table.Cell>
                  <Table.Cell className="py-3 px-4 sm:text-lg">{`${user?.firstName} ${user?.lastName}`}</Table.Cell>
                  <Table.Cell className="py-3 px-4 sm:text-lg">{user?.email}</Table.Cell>
                  <Table.Cell className="py-3 px-4 sm:text-lg">{user?.batch}</Table.Cell>
                  <Table.Cell className="py-3 px-4 sm:text-lg">{user?.role}</Table.Cell>
                  <Table.Cell className="py-3 px-4 w-8 text-center">
                    <Menu>
                      <Menu.Trigger>
                        <IconDotsVertical className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all" />
                      </Menu.Trigger>
                      <Menu.Content aria-label="Actions" placement="left top" className="bg-white border border-gray-200 rounded-md shadow-md">
                        <Menu.Item className="hover:bg-blue-100 text-blue-600 px-3 py-2">
                          <div className="w-full cursor-pointer" onClick={() => handleEdit(user?.id, user?.email, user?.role)}>Make {`${user.role}`==="ADMIN" ? "STUDENT" : "ADMIN"}</div>
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item className="hover:bg-red-100 text-red-600 px-3 py-2">
                          <div className="w-full cursor-pointer" onClick={() => handleDelete(user?.id)}>Delete</div>
                        </Menu.Item>
                      </Menu.Content>
                    </Menu>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default ManageUser;