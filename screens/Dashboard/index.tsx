'use client';
import { Coins, Ghost, Swords, Trophy, User2 } from 'lucide-react';
import React from 'react';

import ScreenHeader from '@/components/ScreenHeader';
import { useAppSelector } from '@/lib/store';

import DashboardItem from './components/DashboardItem';

const DashboardScreen = () => {
  const { listBets, totalCoinsWon, totalCoinsLost } = useAppSelector(
    (state) => state.bets,
  );
  const { listUsers } = useAppSelector((state) => state.users);

  const leaderBoardData = [
    {
      value: listUsers.length || '0',
      title: 'Пользователи',
      description: 'Общее количество пользователей',
      icon: <User2 width={40} height={40} color="#FEA800" />,
    },
    {
      value: listBets.length || '0',
      title: 'Ставки',
      description: 'Общее количество ставок',
      icon: <Swords width={40} height={40} color="#CECECE" />,
    },
    {
      value: listBets.filter((bet) => bet.isBetWon).length || '0',
      title: 'Выигранные ставки',
      description: 'Количество выигранных ставок',
      icon: <Trophy width={40} height={40} color="#FEA800" />,
    },
    {
      value: totalCoinsWon || '0',
      title: 'Общий выигрыш',
      description: 'Общий выигрыш пользователей',
      icon: <Coins width={40} height={40} color="#12CC46" />,
    },
    {
      value: totalCoinsLost ? `-${totalCoinsLost}` : '0',
      title: 'Общий проигрыш',
      description: 'Общий проигрыш пользователей',
      icon: <Ghost width={40} height={40} color="#FE0000" />,
    },
  ];

  return (
    <div className="w-full px-4">
      <ScreenHeader
        title="Дашборд"
        description="Просматривайте общую статистику пользования приложением EXPERT GG"
      />
      <div className="flex flex-row flex-wrap gap-x-5 px-8 pt-5 gap-y-4">
        {leaderBoardData.map((item, index) => (
          <DashboardItem
            key={index}
            value={item.value}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardScreen;
