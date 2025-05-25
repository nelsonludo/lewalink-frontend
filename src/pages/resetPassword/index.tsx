import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { ResetPasswordFormType } from "../../types/forms";
import { useResetPassword } from "../../api/AuthApi";
import LoadingLargeButton from "../../components/loading/LoadingLargeButton";
import AuthInput from "../../components/inputs/AuthInputs";
import AuthLayout from "../../components/AuthLayout";
import AuthButton from "../../components/Buttons/AuthButton";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormType>();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const watchedPassword = watch("password");

  const { loading, resetPassword } = useResetPassword();

  const onSubmit: SubmitHandler<ResetPasswordFormType> = async (data) => {
    if (code) {
      console.log("clicked");
      await resetPassword(data, code);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      isResetPwd={true}
      form={
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-500"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <AuthInput
                type="password"
                placeholder=""
                register={register("password", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  validate: {
                    minLength: (value) =>
                      value.length >= 4 || "Must be at least 4 characters long",
                    maxLength: (value) =>
                      value.length <= 20 ||
                      "Must be at most 20 characters long",
                  },
                })}
              />
            </div>
            {errors.password && (
              <span className="text-sm text-red-700">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-500"
              >
                Confirm password
              </label>
            </div>
            <div className="mt-2">
              <AuthInput
                type="password"
                placeholder=""
                register={register("confirmPassword", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  validate: {
                    equals: (value) =>
                      value === watchedPassword || "passwords must match",
                  },
                })}
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-sm text-red-700">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div>
            {loading ? (
              <LoadingLargeButton />
            ) : (
              <AuthButton type="submit" loading={false} variant="primary">
                Reset
              </AuthButton>
            )}
          </div>
        </form>
      }
    />
  );
}
