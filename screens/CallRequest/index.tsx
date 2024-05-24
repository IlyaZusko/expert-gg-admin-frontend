'use client';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { DataTable } from '@/components/DataTable';
import ScreenHeader from '@/components/ScreenHeader';
import { db } from '@/firebase/config';
import { useAppSelector } from '@/lib/store';
import { ICallRequest } from '@/lib/store/models/CallRequest';
import { setListCallRequests } from '@/lib/store/service/callRequestsSlice';

import { callRequestsColumns } from './columns';

const CallRequestsScreen = () => {
  const dispatch = useDispatch();
  const { listCallRequests } = useAppSelector((state) => state.callRequests);

  useEffect(() => {
    const q = query(collection(db, 'callRequest'));
    getDocs(q).then((res) => {
      const newListRequests: ICallRequest[] = [];
      res.forEach((doc) => {
        newListRequests.push(doc.data() as ICallRequest);
      });
      newListRequests.forEach((item) => {
        dispatch(setListCallRequests(item));
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listCallRequests]);

  return (
    <div className="w-full px-4">
      <ScreenHeader
        title="Пользователи"
        description="Просматривайте и модерируйте профили пользователей"
      />
      <div className="w-full px-8 pt-4">
        <DataTable
          data={listCallRequests}
          columns={callRequestsColumns}
          isForCallRequests
        />
      </div>
    </div>
  );
};

export default CallRequestsScreen;
