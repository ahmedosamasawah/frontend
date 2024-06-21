import { ForgetPasswordForm } from "../../../features/Auth/ForgetPasswordForm";
import { useRouter } from "next/router";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;

  // @ts-expect-error - Type '{ token: string | string[] | undefined; }' is not assignable to type 'IntrinsicAttributes'.
  return <ForgetPasswordForm token={token} />;
};

export default ResetPasswordPage;
