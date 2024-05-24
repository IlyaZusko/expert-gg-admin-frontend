'use client';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { LayoutDashboard, LogOut, PhoneIncoming, User2 } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

import { auth, db } from '@/firebase/config';
import useUser from '@/firebase/useUser';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { IBet } from '@/lib/store/models/Bet';
import { IUser } from '@/lib/store/models/User';
import {
  setListBets,
  setTotalCoinsLost,
  setTotalCoinsWon,
} from '@/lib/store/service/betsSlice';
import { setListUsers } from '@/lib/store/service/usersSlice';
import { cn } from '@/lib/utils';

const MainAppLayout = ({ children }: { children: ReactNode }) => {
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const { listBets } = useAppSelector((state) => state.bets);
  const { listUsers } = useAppSelector((state) => state.users);

  useEffect(() => {
    const q = query(collection(db, 'bets'));
    getDocs(q).then((res) => {
      const newListBets: IBet[] = [];
      res.forEach((doc) => {
        newListBets.push(doc.data() as IBet);
      });
      newListBets.forEach((item) => {
        dispatch(setListBets(item));
      });
      const totalCoinsWon = newListBets.reduce((total, obj) => {
        if (obj.isBetWon) {
          return total + obj.coins_amount;
        }
        return total;
      }, 0);
      const totalCoinsLost = newListBets.reduce((total, obj) => {
        if (obj.isBetWon === false) {
          return total + obj.coins_amount;
        }
        return total;
      }, 0);
      dispatch(setTotalCoinsWon(totalCoinsWon));
      dispatch(setTotalCoinsLost(totalCoinsLost));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listBets]);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    getDocs(q).then((res) => {
      const newListUsers: IUser[] = [];
      res.forEach((doc) => {
        newListUsers.push(doc.data() as IUser);
      });
      newListUsers.forEach((item) => {
        dispatch(setListUsers(item));
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUsers]);

  const isActivePath = (path: string) => {
    return path === pathname;
  };

  if (user === false) {
    return (
      <div className="text-center relative">
        <div className="blur-xl">{children}</div>
      </div>
    );
  } else if (!user) {
    router.push('/auth');
    return null;
  } else {
    return (
      <div className="w-full min-h-[100vh] flex flex-row">
        <div className="min-h-[100vh] w-[220px] bg-custom-black shadow-lg py-4 pl-4 flex flex-col justify-center items-center fixed">
          <div className="w-full bg-custom-cover h-[96vh] rounded-[8px] flex flex-col justify-between">
            <div className="px-2">
              <button
                className="flex flex-row w-full justify-center pt-4 pb-3"
                onClick={() => router.push('/dashboard')}
              >
                <Image
                  src={require('@/public/images/logo.png')}
                  alt=""
                  width={122}
                  height={55}
                />
              </button>

              <div className="w-full flex flex-col gap-3 text-xs font-medium text-gray-400">
                <button
                  className={cn(
                    'w-full flex flex-row gap-x-3 truncate items-center px-3 py-2 hover:bg-gray-900 rounded-[4px]',
                    isActivePath('/dashboard') && 'text-white',
                  )}
                  onClick={() => {
                    router.push('/dashboard');
                  }}
                >
                  <LayoutDashboard
                    width={20}
                    height={20}
                    color={isActivePath('/dashboard') ? '#0166FE' : '#9E9E9E'}
                  />
                  Дашборд
                </button>
                <button
                  className={cn(
                    'w-full flex flex-row gap-x-3 truncate items-center px-3 py-2 hover:bg-gray-900 rounded-[4px]',
                    isActivePath('/users') && 'text-custom-black-title',
                  )}
                  onClick={() => {
                    router.push('/users');
                  }}
                >
                  <User2
                    width={20}
                    height={20}
                    color={isActivePath('/users') ? '#0166FE' : '#9E9E9E'}
                  />
                  Пользователи
                </button>
                <button
                  className={cn(
                    'w-full flex flex-row gap-x-3 truncate items-center px-3 py-2 hover:bg-gray-900 rounded-[4px]',
                    isActivePath('/call-requests') && 'text-custom-black-title',
                  )}
                  onClick={() => {
                    router.push('/call-request');
                  }}
                >
                  <PhoneIncoming
                    width={20}
                    height={20}
                    color={
                      isActivePath('/call-request') ? '#0166FE' : '#9E9E9E'
                    }
                  />
                  Запросы на звонок
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3 text-xs font-medium text-gray-400 px-2 pb-4">
              <button
                className={cn(
                  'w-full flex flex-row gap-x-3 truncate items-center px-3 py-2 hover:bg-gray-900 rounded-[4px]',
                )}
                onClick={() => signOut(auth)}
              >
                <LogOut width={20} height={20} color={'#9E9E9E'} />
                Выйти
              </button>
            </div>
          </div>
        </div>
        <div className=" bg-custom-black w-full pl-[220px] text-white pt-4">
          {children}
        </div>
      </div>
    );
  }
};

export default MainAppLayout;
