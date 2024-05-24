import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from './config';

const useUser = () => {
  const [user, setUser] = useState<FirebaseUser | null | false>(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return user;
};

export default useUser;
