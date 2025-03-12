import { SubmitHandler, useForm } from "react-hook-form";
import { SchoolFormType } from "../../../types/forms";
import LoadingButton from "../../../components/Buttons/LoadingButton";
import { getEnumValues } from "../../../utils/smallFunctions";
import { SchoolType } from "../../../types/entities/school";

const NewSchool = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm<SchoolFormType>();

  // const { loading, superUserCreatesProgram } = useSuperUserCreatesProgram();

  const onSubmit: SubmitHandler<SchoolFormType> = async (data) => {
    // const formData = data;
    // formData.duration = Number(formData.duration);
    // const program = await superUserCreatesProgram({
    //   formData,
    // });
    // if (program) {
    //   reset();
    // }
  };
  return (
    <section className=" px-10">
      {" "}
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Create a school
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Complete this form to create a school.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="name"
                      type="text"
                      placeholder="Software Engineering"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Required field",
                        },
                        validate: {
                          minLength: (value) =>
                            value.length >= 4 || "Minimum 4 caractères.",
                          maxLength: (value) =>
                            value.length <= 50 || "Maximum 50 caractères.",
                        },
                      })}
                    />
                  </div>
                  {errors.name && (
                    <span className=" text-red-700 text-sm mt-2">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="type"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  School type
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <select
                      id="type"
                      autoComplete="type"
                      className="block bg-white min-w-0 grow py-2.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      {...register("type", {
                        required: {
                          value: true,
                          message: "Required field",
                        },
                      })}
                    >
                      {getEnumValues(SchoolType).map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {errors.type && (
                    <span className=" text-red-700 text-sm mt-2">
                      {errors.type.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="name"
                      type="text"
                      placeholder="Software Engineering"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      {...register("city", {
                        required: {
                          value: true,
                          message: "Required field",
                        },
                      })}
                    />
                  </div>
                  {errors.name && (
                    <span className=" text-red-700 text-sm mt-2">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="credits"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Latitude
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="credits"
                      type="number"
                      defaultValue={1}
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      min={1}
                      placeholder="20"
                      {...register("latitude", {
                        required: {
                          value: true,
                          message: "Required field",
                        },
                      })}
                    />
                  </div>
                  {errors.latitude && (
                    <span className=" text-red-700 text-sm mt-2">
                      {errors.latitude.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="credits"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Longitude
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="credits"
                      type="number"
                      defaultValue={1}
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      min={1}
                      placeholder="20"
                      {...register("longitude", {
                        required: {
                          value: true,
                          message: "Required field",
                        },
                      })}
                    />
                  </div>
                  {errors.longitude && (
                    <span className=" text-red-700 text-sm mt-2">
                      {errors.longitude.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={""}
                    placeholder="Description of the program."
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Required field",
                      },
                      validate: {
                        minLength: (value) =>
                          value.length >= 0 || "Minimum 4 caractères.",
                        maxLength: (value) =>
                          value.length <= 500 || "Maximum 50 caractères.",
                      },
                    })}
                  />
                </div>
                {errors.description && (
                  <span className=" text-red-700 text-sm mt-2">
                    {errors.description.message}
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
          {false ? (
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

export default NewSchool;
