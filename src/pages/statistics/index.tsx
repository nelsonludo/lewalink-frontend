import { ScaleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";

const cards = [
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
];

export default function Statistics() {
  const [googlePlaceValue, setGooglePlaceValue] = useState<any>(null);

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
    <>
      <div className="min-h-full">
        {/* Static sidebar for desktop */}

        <div className="flex flex-1 flex-col ">
          <main className="flex-1 pb-8">
            <div>
              <div>
                <h2 className="text-lg/6 font-medium text-gray-900">
                  Overview
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Card */}
                  {cards.map((card) => (
                    <div
                      key={card.name}
                      className="overflow-hidden rounded-lg bg-white shadow"
                    >
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="shrink-0">
                            <card.icon
                              aria-hidden="true"
                              className="size-6 text-gray-400"
                            />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="truncate text-sm font-medium text-gray-500">
                                {card.name}
                              </dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">
                                  {card.amount}
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <a
                            href={card.href}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            View all
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* Testing  */}
      <GooglePlacesAutocomplete
        selectProps={{
          value: googlePlaceValue,
          onChange: setGooglePlaceValue,
          // placeholder: "Type the location",
          placeholder: "Saisir l'emplacement...",
          className: "react-select-container",
        }}
        apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
      />

      {JSON.stringify(googlePlaceValue)}
    </>
  );
}
