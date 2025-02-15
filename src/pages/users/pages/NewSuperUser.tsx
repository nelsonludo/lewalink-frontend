import { SubmitHandler, useForm } from "react-hook-form";
import { CreateAccountFormType } from "../../../types/forms";
import LoadingButton from "../../../components/Buttons/LoadingButton";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAdminCreateAdmin,
  useAdminCreateEditor,
} from "../../../api/AuthApi";
import { UserType } from "../../../types/entities/user";

const NewSuperUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CreateAccountFormType>();

  const { userType } = useParams();

  const watchedPassword = watch("password");

  const navigate = useNavigate();

  const { adminCreateAdmin, loading: loadingCreateAdmin } =
    useAdminCreateAdmin();
  const { adminCreateEditor, loading: loadingCreateEditor } =
    useAdminCreateEditor();

  const onSubmit: SubmitHandler<CreateAccountFormType> = async (data) => {
    if (userType === UserType.Admin) {
      await adminCreateAdmin(data);
      navigate("/dashboard/users");
    }

    if (userType === UserType.Editor) {
      await adminCreateEditor(data);
      navigate("/dashboard/users");
    }
  };

  return (
    <section className=" px-10">
      {" "}
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Create course
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Complete this form to create a course.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="fullname"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    id="fullname"
                    type="text"
                    autoComplete="fullname"
                    className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-3 py-3"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                  />
                </div>
                {errors.name && (
                  <span className=" text-red-700">{errors.name.message}</span>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
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
                  <span className=" text-red-700">{errors.email.message}</span>
                )}
              </div>

              <div className="sm:col-span-3">
                {" "}
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      validate: {
                        minLength: (value) =>
                          value.length >= 4 ||
                          "Must be at least 4 characters long",
                        maxLength: (value) =>
                          value.length <= 20 ||
                          "Must be at most 20 characters long",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <span className=" text-red-700">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="sm:col-span-3">
                {" "}
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Confirm confirm-password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    type="password"
                    autoComplete="current-confirm-password"
                    className="block w-full rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    {...register("confirmPassword", {
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
                  <span className=" text-red-700">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => reset()}
            className="text-sm/6 font-semibold text-gray-900"
          >
            Reset
          </button>
          {loadingCreateAdmin || loadingCreateEditor ? (
            <LoadingButton />
          ) : (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default NewSuperUser;
