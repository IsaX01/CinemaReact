import history from '@/utils/history';
import useAuthStore from '@/stores/authStore';
import SignUpForm from '@/components/auth/SignUpForm';

const SignUpContainer = () => {
  const { signUp, errorMessage } = useAuthStore((state) => state);

  const handleSubmit = (data, setSubmitting) => {
    signUp(data)
      .then((success) => {
        if (success) {
          history.push('/login');
        }
      })
      .finally(() => setSubmitting(false));
  };

  return <SignUpForm handleSubmit={handleSubmit} errorMessage={errorMessage} />;
};

export default SignUpContainer;
