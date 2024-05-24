'use client';
import React from 'react';

import { DataTable } from '@/components/DataTable';
import ScreenHeader from '@/components/ScreenHeader';
import { useAppSelector } from '@/lib/store';

import { usersColumns } from './columns';

const UsersScreen = () => {
  const { listUsers } = useAppSelector((state) => state.users);

  return (
    <div className="w-full px-4">
      <ScreenHeader
        title="Пользователи"
        description="Просматривайте и модерируйте профили пользователей"
      />
      <div className="w-full px-8 pt-4">
        <DataTable
          data={listUsers}
          columns={usersColumns}
          searchColumn="email"
          searchPlaceholder="Электронная почта..."
        />
      </div>
    </div>
  );
};

export default UsersScreen;
