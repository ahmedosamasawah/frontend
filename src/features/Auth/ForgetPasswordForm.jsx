import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Cta from "../../common/components/Cta";
import Alert from "../../common/components/Feedback/Alert";
import Loading from "../../common/components/Feedback/Loading";
import YellowContainer from "../../common/components/Feedback/YellowContainer";
import TextInput from "../../common/components/Form/TextInput";
import useInput from "../../common/hooks/useInput";
import { PASS_REGEX } from "../../constants/regexPatterns";
import { useResetPasswordMutation } from "./authApi.js";

export const ForgetPasswordForm = () => {
  const router = useRouter();
  const { token } = router.query;

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPassError, setConfirmPassError] = useState(null);

  const password = useInput(
    "",
    PASS_REGEX,
    "يجب أن لا تقل عن 8 حروف وتحتوي: حرف كبير وصغير ورمز ورقم",
  );

  const [resetPassword, { data, isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value);
    if (password === confirmPassword) {
      setConfirmPassError("كلمة المرور غير مطابقة");
    } else {
      setConfirmPassError(null);
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    if (!password.isValid && confirmPassword !== password.value) {
      return;
    }
    resetPassword({ password: password.value, confirmPassword, token });
  };

  return (
    <section className="mt-10 p-3">
      {isSuccess && <Alert status="success" message={data.msg} />}
      {isError && <Alert status="error" message={error.data.msg} />}
      <YellowContainer>
        <div className="md:w-[600px] md:rounded-md md:bg-background md:p-24">
          <article>
            <h2 className="mb-6 text-center font-medium md:text-1xl">
              تغيير كلمة السر
            </h2>
          </article>
          <form onSubmit={submitHandler}>
            <TextInput
              labelText="كلمة المرور"
              type="password"
              name="password"
              value={password.value}
              changeHandler={e => password.setValue(e.target.value)}
              error={password.error}
            />
            <TextInput
              labelText="تأكيد كلمة المرور"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              error={confirmPassError}
              changeHandler={handleConfirmPassword}
            />
            {isLoading && <Loading size={6} />}
            {!isLoading && !isSuccess && <Cta text="التالى" />}
            {!isLoading && isSuccess && (
              <Link
                href="/login"
                className="block text-center text-base text-secondary-normal underline"
              >
                تسجيل الدخول
              </Link>
            )}
          </form>
        </div>
      </YellowContainer>
    </section>
  );
};
