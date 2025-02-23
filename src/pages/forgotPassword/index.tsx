import { Link } from "react-router-dom";
import { ForgotPasswordFormType } from "../../types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { useForgotPassword } from "../../api/AuthApi";
import LoadingLargeButton from "../../components/loading/LoadingLargeButton";

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
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[45%] inset-shadow-sm inset-shadow-purple-500 h-fit p-5">
        <div>
          <Link
            className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 flex justify-center items-center"
            to={"/"}
          >
            <div className="w-11 h-11 mr-2 bg-gray-100 shadow-lg shadow-purple-500">
              {/* <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
              /> */}
            </div>
            <div className="bg-gray-100 py-1 px-5 shadow-lg shadow-purple-500">
              <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                LewaLink
              </h2>
            </div>
          </Link>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-purple-400">
            Enter Your Email
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-500"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="bg-white w-full border-2 border-purple-100 rounded-md py-3 px-6 text-gray-900 shadow-md shadow-purple-500 placeholder:text-gray-400 focus:border-purple-500 hover:border-purple-500 text-sm transition duration-300"
                  {...register("email", {
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
              {loading ? (
                <LoadingLargeButton />
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm font-semibold text-white hover:scale-105 shadow-lg shadow-purple-500 transition duration-300"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
