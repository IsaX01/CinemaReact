import create from 'zustand';
import { persist } from 'zustand/middleware';
import { cancelPaymentIntent, createPaymentIntent } from '@/api/payment';
import { userStore } from '@/stores/authStore';

const initialState = {
  id: '',
  error: null,
  clientSecret: null,
};

const usePaymentStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      createPayment: async (amount) => {
        try {
          const { user, getFullName } = userStore.getState();
          const response = await createPaymentIntent({
            amount,
            user: {
              name: getFullName(),
              email: user.email,
              phone: user.phone,
              stripeId: user.stripeId ?? null,
              id: user.id,
            },
          });
          set({ id: response.data.id, clientSecret: response.data.clientSecret });
          if (!user.stripeId && response.data.customerId) {
            userStore.setState((state) => ({
              ...state,
              user: { ...state.user, stripeId: response.data.customerId },
            }));
          }
        } catch (error) {
          set((state) => ({ ...state, error: error.message }));
        }
      },
      cancelPayment: async () => {
        await cancelPaymentIntent(get().id);
        get().reset();
      },
      reset: () => set(initialState),
    }),
    {
      name: 'payment-store',
      getStorage: () => sessionStorage,
    }
  )
);

usePaymentStore.subscribe(console.log);

export default usePaymentStore;
