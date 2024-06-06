import { doc, updateDoc } from 'firebase/firestore';
import { ChevronLeft, Construction, LockOpen } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/firebase/config';
import { useAppDispatch } from '@/lib/store';
import { IUser } from '@/lib/store/models/User';
import { blockUser, enableUser } from '@/lib/store/service/usersSlice';

interface IUserProfileHeader {
  userProfile: IUser;
}

const UserProfileHeader = ({ userProfile }: IUserProfileHeader) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleBlockUser = async () => {
    await updateDoc(doc(db, 'users', userProfile.user_id), {
      status: 'blocked',
    });
    dispatch(blockUser(userProfile.user_id));
    toast({
      isSucces: true,
      title: 'Пользователь заблокирован',
      description: `Пользователь ${userProfile.username} был успешно заблокирован`,
    });
  };

  const handleActivateUser = async () => {
    await updateDoc(doc(db, 'users', userProfile.user_id), {
      status: 'active',
    });
    dispatch(enableUser(userProfile.user_id));
    toast({
      isSucces: true,
      title: 'Пользователь разблокирован',
      description: `Пользователь ${userProfile.username} был успешно разблокирован`,
    });
  };

  return (
    <div className="w-full flex flex-row items-center justify-between pt-2 pb-3 px-8 border-b border-custom-cover">
      <div className="flex flex-row gap-x-4 items-center">
        {/* <Image
          src={userProfile.avatar_url}
          alt=""
          width={100}
          height={100}
          className="rounded-[8px]"
        /> */}
        {userProfile.avatar_url === '' ? (
          <div className="w-[100px] h-[100px] flex justify-center items-center">
            <Image
              src={require('@/public/icons/avatar-placeholder.svg')}
              alt=""
              width={80}
              height={80}
              className="rounded-[0px]"
            />
          </div>
        ) : (
          <Image
            src={userProfile.avatar_url}
            alt=""
            width={100}
            height={100}
            className="rounded-[8px]"
          />
        )}
        <div>
          <p className="text-lg font-semibold">{userProfile.username}</p>
          <p className="text-xs font-medium text-gray-400 pt-1">
            {userProfile.email}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-x-4 items-center">
        <Button
          className="text-sm pr-4 gap-x-1"
          size="sm"
          variant="outline"
          onClick={() => router.back()}
        >
          <ChevronLeft width={20} height={20} color="#FFFFFF" />
          Назад
        </Button>
        {userProfile.status === 'active' ? (
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                className="text-sm pr-4 gap-x-2 pl-4 hover:bg-red-600"
                size="sm"
                variant="outline"
              >
                <Construction width={20} height={20} color="#FFFFFF" />
                Заблокировать
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className="w-full text-white text-base">
                <p className=" font-medium">
                  Вы уверены, что хотите заблокировать пользователя{' '}
                  {userProfile.username}?
                </p>
                <p className="font-normal text-gray-400 text-sm pt-1">
                  После блокировки пользователь не сможет войти в мобильное
                  приложение Expert GG.
                </p>
              </div>
              <div className="w-full flex flex-row justify-end gap-x-3 pt-3">
                <AlertDialogCancel className="h-8 border border-gray-700 rounded-[4px] hover:bg-gray-700">
                  Отмена
                </AlertDialogCancel>
                <AlertDialogAction
                  className="h-8 bg-red-600 rounded-[4px] shadow-none border-0 hover:bg-red-500"
                  onClick={() => handleBlockUser()}
                >
                  Заблокировать
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            className="text-sm pr-4 gap-x-2 pl-4 hover:bg-custom-gold"
            size="sm"
            variant="outline"
            onClick={() => handleActivateUser()}
          >
            <LockOpen width={17} height={17} color="#FFFFFF" />
            Снять блокировку
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserProfileHeader;
