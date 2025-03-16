import { SubmitHandler, useForm } from "react-hook-form";
import { SchoolFormType } from "../../../types/forms";
import LoadingButton from "../../../components/Buttons/LoadingButton";
import { getEnumValues } from "../../../utils/smallFunctions";
import { SchoolType } from "../../../types/entities/school";
import { CheckIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { useSuperUserCreatesSchool } from "../../../api/SchoolApi";

const NewSchool = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<SchoolFormType>();

  const { loading, superUserCreatesSchool } = useSuperUserCreatesSchool();

  const watchedImages = watch("images") || [];

  const [googlePlaceValue, setGooglePlaceValue] = useState<any>(null);

  const fileSize = 50 * 1024 * 1024;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/tiff",
    "image/svg+xml",
  ];
  const onSubmit: SubmitHandler<SchoolFormType> = async (data) => {
    const formData = data;

    await superUserCreatesSchool({ formData });
  };

  useEffect(() => {
    const getAddress = async () => {
      if (googlePlaceValue) {
        try {
          const data = await geocodeByPlaceId(
            googlePlaceValue?.value?.place_id
          );
          console.log("Geocode data", data);

          const lat = data[0].geometry.location.lat();
          const lng = data[0].geometry.location.lng();

          let country = "";
          let city = "";
          let completeAddress = data[0].formatted_address;

          data[0].address_components.forEach((component) => {
            if (component.types.includes("country")) {
              country = component.long_name;
            }
            if (component.types.includes("locality")) {
              city = component.long_name;
            }
          });

          setValue("latitude", lat.toString());
          setValue("longitude", lng.toString());
          setValue("fullAddressName", completeAddress);
          setValue("country", country);
          setValue("city", city);

          console.log("Complete Address:", completeAddress);
          console.log("Country:", country);
          console.log("City:", city);
          console.log("Latitude:", lat);
          console.log("Longitude:", lng);
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      }
    };

    getAddress();
  }, [googlePlaceValue]);

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
              <div className="sm:col-span-2">
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
              <div className="sm:col-span-2">
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
                      className="block bg-white min-w-0 grow py-2.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 w-full"
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
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Search address
                </label>
                <div className="mt-2">
                  <div className="">
                    <GooglePlacesAutocomplete
                      selectProps={{
                        value: googlePlaceValue,
                        onChange: setGooglePlaceValue,
                        // placeholder: "Type the location",
                        placeholder: "Saisir l'emplacement...",
                        className: "react-select-container w-full",
                      }}
                      apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  School email
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="name"
                      type="text"
                      placeholder="School email"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <span className=" text-red-700 text-sm mt-2">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  School phone number
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="name"
                      type="text"
                      placeholder="School phone number"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      {...register("phoneNumber")}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <span className=" text-red-700 text-sm mt-2">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  School website
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="name"
                      type="text"
                      placeholder="School website"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      {...register("website")}
                    />
                  </div>
                  {errors.website && (
                    <span className=" text-red-700 text-sm mt-2">
                      {errors.website.message}
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
                          value?.length >= 4 || "Minimum 4 caractères.",
                        maxLength: (value) =>
                          value.length <= 50 || "Maximum 50 caractères.",
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
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Full address
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="name"
                      type="text"
                      placeholder="Full address"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      {...register("fullAddressName", {
                        required: {
                          value: true,
                          message: "Required field",
                        },
                      })}
                    />
                  </div>
                  {errors.fullAddressName && (
                    <span className=" text-red-700 text-sm mt-2">
                      {errors.fullAddressName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
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
                      placeholder="Yaounde"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      {...register("city", {
                        required: {
                          value: true,
                          message: "Required field",
                        },
                      })}
                    />
                  </div>
                  {errors.city && (
                    <span className=" text-red-700 text-sm mt-2">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="name"
                      type="text"
                      placeholder="Cameroon"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      {...register("country", {
                        required: {
                          value: true,
                          message: "Required field",
                        },
                      })}
                    />
                  </div>
                  {errors.country && (
                    <span className=" text-red-700 text-sm mt-2">
                      {errors.country.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
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
                      type="text"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
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
              <div className="sm:col-span-2">
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
                      type="text"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
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
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Images here
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {watchedImages?.length > 0 ? (
                      <CheckIcon
                        aria-hidden="true"
                        className="mx-auto h-12 w-12 text-green-600"
                      />
                    ) : (
                      <PhotoIcon
                        aria-hidden="true"
                        className="mx-auto h-12 w-12 text-gray-300"
                      />
                    )}

                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="video"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 flex flex-col items-center justify-center w-full"
                      >
                        <span
                          onClick={() =>
                            document.getElementById("images")?.click()
                          }
                        >
                          {watchedImages?.length > 0 ? (
                            <span>Change file</span>
                          ) : (
                            <span>Upload files</span>
                          )}
                        </span>
                        <input
                          id="images"
                          type="file"
                          multiple
                          hidden
                          {...register("images", {
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                            validate: {
                              validateType: (value) =>
                                Array.from(value).every((file) =>
                                  allowedTypes.includes(file.type)
                                ) || "Only allowed file types are accepted",
                              validateSize: (value) =>
                                Array.from(value).every(
                                  (file) => file.size <= fileSize
                                ) || "Each file must be 50MB maximum",
                              maxFiles: (value) =>
                                (value?.length || 0) <= 5 ||
                                `You can upload a maximum of ${5} files`,
                            },
                          })}
                        />
                      </label>
                    </div>
                    <p className="text-xs/5 text-gray-600">
                      jpeg, png, gif, bmp, webp, tiff, svgxml"
                    </p>
                  </div>
                </div>
                {errors.images && (
                  <span className=" text-red-700">{errors.images.message}</span>
                )}
              </div>
              <div className=" flex flex-wrap col-span-full gap-4">
                {Object.values(watchedImages).map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${index}`}
                    className=" w-[200px] h-[200px] object-cover ring-3 ring-indigo-600 rounded-md"
                  />
                ))}
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
          {loading ? (
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
