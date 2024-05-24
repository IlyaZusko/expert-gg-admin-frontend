import { Coins, MonitorPlay, Trophy } from 'lucide-react';
import React from 'react';

import { IUser } from '@/lib/store/models/User';

interface IUserProfileMainStats {
  currentUser: IUser;
}

const UserProfileMainStats = ({ currentUser }: IUserProfileMainStats) => {
  return (
    <div className="w-full px-4 py-4 border-2 border-custom-blue bg-custom-cover rounded-[8px] flex flex-row justify-between">
      <div className="flex-[1] flex flex-col items-center justify-center">
        <Trophy width={34} height={34} color="#FFFFFF" />
        <p className="text-sm font-normal text-gray-400 pt-1">
          Количество побед
        </p>
        <p className="text-3xl font-semibold text-custom-blue">
          {currentUser.count_wins}
        </p>
      </div>
      <div className="flex-[1] flex flex-col items-center justify-center">
        <MonitorPlay width={34} height={34} color="#FFFFFF" />
        <p className="text-sm font-normal text-gray-400 pt-1">
          Просмотров рекламы
        </p>
        <p className="text-3xl font-semibold text-custom-blue">
          {currentUser.add_watch_count}
        </p>
      </div>
      <div className="flex-[1] flex flex-col items-center justify-center">
        <Coins width={34} height={34} color="#FFFFFF" />
        <p className="text-sm font-normal text-gray-400 pt-1">Общий выигрыш</p>
        <p className="text-3xl font-semibold text-custom-blue">
          {currentUser.total_earn}
        </p>
      </div>
    </div>
  );
};

export default UserProfileMainStats;
