import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CreateAccountFormType } from "../../types/forms";
import { useSignUp } from "../../api/AuthApi";
import LoadingLargeButton from "../../components/loading/LoadingLargeButton";
import AuthLayout from "../../components/AuthLayout";
import AuthInput from "../../components/inputs/AuthInputs";
import AuthButton from "../../components/Buttons/AuthButton";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateAccountFormType>();

  const watchedPassword = watch("password");

  const { loading, signUp } = useSignUp();

  const onSubmit: SubmitHandler<CreateAccountFormType> = async (data) => {
    await signUp(data);
  };

  return (
    <AuthLayout
      title="Sign up"
      form={
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="fullname"
              className="block text-md/6 font-normal text-black"
            >
              Name
            </label>
            <div className="mt-2">
              <AuthInput
                type="text"
                placeholder=""
                register={register("name", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
            </div>
            {errors.name && (
              <span className="text-sm text-red-700">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-md/6 font-medium text-black"
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
              <span className="text-sm text-red-700">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-md/6 font-medium text-black"
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
                className="block text-md/6 font-medium text-black"
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
                Sign up
              </AuthButton>
            )}
          </div>

          <div className="flex justify-end">
            <Link
              to="/signin"
              className="font-regular text-purple-600 underline underline-offset-1 mt-1 text-md"
            >
              Sign in
            </Link>
          </div>
        </form>
      }
    />
  );
};

export default Signup;
