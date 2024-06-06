'use client';
import { usePathname } from 'next/navigation';

import { DataTable } from '@/components/DataTable';
import { useAppSelector } from '@/lib/store';

import { betsColumns } from './columns';
import UserProfileHeader from './components/UserProfileHeader';
import UserProfileMainStats from './components/UserProfileMainStats';

const UserProfileScreen = () => {
  const userId = usePathname().split('/')[2];
  const { listUsers } = useAppSelector((state) => state.users);
  const { listBets } = useAppSelector((state) => state.bets);

  const currentUserProfile =
    listUsers.find((user) => user.user_id === userId) || null;

  const listUserBets = listBets.filter((bet) => bet.user_id === userId);

  return currentUserProfile ? (
    <div className="w-full px-4">
      <UserProfileHeader userProfile={currentUserProfile} />
      <div className="w-full px-8 pt-4 flex flex-col gap-y-5">
        <UserProfileMainStats currentUser={currentUserProfile} />
        <DataTable data={listUserBets} columns={betsColumns} />
      </div>
    </div>
  ) : null;
};

export default UserProfileScreen;
