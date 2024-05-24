/* eslint-disable indent */
import { ColumnDef } from '@tanstack/react-table';
import {
  ChevronRight,
  ClipboardCopy,
  ContactRound,
  MoreHorizontal,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { IUser } from '@/lib/store/models/User';
import { cn } from '@/lib/utils';

interface ICopyButton {
  title: string;
  copyValue: string;
}

interface IGoProfileButton {
  targetId: string;
}

const GoProfileButton = ({ targetId }: IGoProfileButton) => {
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={() => router.push(`/users/${targetId}`)}
      className="flex flex-row justify-between text-white cursor-pointer"
    >
      <div className="flex flex-row items-center gap-x-2">
        <ContactRound width={20} height={20} color="#0166FE" />
        Перейти к профилю
      </div>
      <ChevronRight width={20} height={20} color="#FFFFFF" />
    </DropdownMenuItem>
  );
};

const CopyButton = ({ title, copyValue }: ICopyButton) => {
  const { toast } = useToast();
  return (
    <DropdownMenuItem
      onClick={() => {
        navigator.clipboard.writeText(copyValue);
        toast({
          isSucces: true,
          title: 'Скопировано!',
        });
      }}
      className="flex flex-row gap-x-2 text-white cursor-pointer"
    >
      <ClipboardCopy width={20} height={20} color="#0166FE" />
      {title}
    </DropdownMenuItem>
  );
};

export const usersColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => (
      <div
        className={cn(
          'w-6 h-6 rounded-[1000px]',
          row.getValue('status') === 'active' ? 'bg-custom-gold' : 'bg-red-700',
        )}
      />
    ),
  },
  {
    accessorKey: 'avatar_url',
    header: 'Аватар',
    cell: ({ row }) => (
      <div>
        <Image
          src={row.getValue('avatar_url')}
          alt=""
          width={60}
          height={60}
          className="rounded-[8px]"
        />
      </div>
    ),
  },
  {
    accessorKey: 'user_id',
    header: 'ID',
    cell: ({ row }) => <div>{row.getValue('user_id')}</div>,
  },
  {
    accessorKey: 'username',
    header: 'Имя профиля',
    cell: ({ row }) => <div>{row.getValue('username')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Электронная почта',
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'coins',
    header: 'Баланс',
    cell: ({ row }) => <div>{row.getValue('coins')} GG</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 border-2 border-custom-cover-hover hover:bg-custom-cover-hover rounded-[4px]"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col gap-y-1">
            <GoProfileButton targetId={user.user_id} />
            <DropdownMenuSeparator className="bg-gray-700" />

            <CopyButton
              title="Копировать ID пользователя"
              copyValue={user.user_id}
            />
            <CopyButton
              title="Копировать почту пользователя"
              copyValue={user.email}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
