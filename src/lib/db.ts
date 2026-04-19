import { db } from './firebase';
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

export interface Order {
  id?: string;
  userId: string;
  items: any[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt?: any;
  updatedAt?: any;
}

export interface Alert {
  id?: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved';
  createdAt?: any;
  updatedAt?: any;
}

// Ensure user profile exists
export const ensureUserProfile = async (user: any) => {
  if (!user || !user.uid) return;
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName || 'User',
      role: 'user',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
};

export const createOrder = async (order: Order) => {
  const newOrderRef = doc(collection(db, 'orders'));
  await setDoc(newOrderRef, {
    ...order,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return newOrderRef.id;
};

export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, {
    status,
    updatedAt: serverTimestamp()
  });
};

export const subscribeToOrders = (userId: string, callback: (orders: Order[]) => void) => {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId)
  );

  return onSnapshot(q, (snapshot) => {
    const orders: Order[] = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    // sort locally if needed because we didn't add an index for orderBy just yet
    orders.sort((a, b) => {
      const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
      return bTime - aTime;
    });
    callback(orders);
  });
};

export const createAlert = async (alert: Alert) => {
  const newAlertRef = doc(collection(db, 'alerts'));
  await setDoc(newAlertRef, {
    ...alert,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return newAlertRef.id;
};

export const subscribeToAlerts = (callback: (alerts: Alert[]) => void) => {
  const q = query(
    collection(db, 'alerts'),
    where('status', '==', 'active')
  );

  return onSnapshot(q, (snapshot) => {
    const alerts: Alert[] = [];
    snapshot.forEach((doc) => {
      alerts.push({ id: doc.id, ...doc.data() } as Alert);
    });
    callback(alerts);
  });
};
