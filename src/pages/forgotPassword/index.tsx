import { ForgotPasswordFormType } from "../../types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { useForgotPassword } from "../../api/AuthApi";
import LoadingLargeButton from "../../components/loading/LoadingLargeButton";
import AuthInput from "../../components/inputs/AuthInputs";
import AuthLayout from "../../components/AuthLayout";
import AuthButton from "../../components/Buttons/AuthButton";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>();

  const { loading, forgotPassword } = useForgotPassword();

  const onSubmit: SubmitHandler<ForgotPasswordFormType> = async (data) => {
    await forgotPassword(data);
  };

  return (
    <AuthLayout
      title="Enter Your Email"
      isResetPwd={true}
      form={
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-black"
            >
              Email
            </label>
            <div className="mt-2">
              <AuthInput
                type="email"
                placeholder=""
                register={register("email", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "This should be an email",
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="text-md text-red-700">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            {loading ? (
              <LoadingLargeButton />
            ) : (
              <AuthButton type="submit" loading={false} variant="primary">
                Submit
              </AuthButton>
            )}
          </div>
        </form>
      }
    />
  );
}
