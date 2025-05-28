import AuthButton from "../../../components/Buttons/AuthButton";
import ButtonsThingy from "../../../components/ButtonsThingy";
import SearchSelect from "../../../components/SearchSelect";

const SearchBar = () => {
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="w-[40%]">
        <ButtonsThingy left="Schools" right="Programs" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <SearchSelect label="School" options={[]} />
        <SearchSelect label="Program" options={[]} />
        <SearchSelect label="City" options={[]} />
        <SearchSelect label="Study Level" options={[]} />
        <SearchSelect label="Region" options={[]} />
        <SearchSelect label="Location" options={[]} />
        <SearchSelect label="By Geo-Localization" options={[]} />

        <AuthButton type="submit" loading={false} variant="primary">
          Search
        </AuthButton>
      </div>
    </div>
  );
};

export default SearchBar;
