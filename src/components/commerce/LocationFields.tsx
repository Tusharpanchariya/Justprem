"use client";

import { useEffect, useRef, useState } from "react";

type Country = { code: string; name: string; dialCode: string };
type LocationSuggestion = {
  display_name: string;
  address: Record<string, string | undefined>;
};
type Region = { name: string; code: string };

type LocationFieldsProps = {
  address: string;
  setAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
};

const fieldClassName = "w-full appearance-none bg-transparent border-b border-charcoal/20 py-3 text-base md:text-sm focus:outline-none focus:border-saffron transition-colors";

const fallbackCountries: Country[] = [
  ["AF", "Afghanistan", "+93"], ["AL", "Albania", "+355"], ["DZ", "Algeria", "+213"], ["AR", "Argentina", "+54"], ["AU", "Australia", "+61"], ["AT", "Austria", "+43"], ["BD", "Bangladesh", "+880"], ["BE", "Belgium", "+32"], ["BR", "Brazil", "+55"], ["BG", "Bulgaria", "+359"], ["CA", "Canada", "+1"], ["CL", "Chile", "+56"], ["CN", "China", "+86"], ["CO", "Colombia", "+57"], ["HR", "Croatia", "+385"], ["CY", "Cyprus", "+357"], ["CZ", "Czechia", "+420"], ["DK", "Denmark", "+45"], ["EG", "Egypt", "+20"], ["EE", "Estonia", "+372"], ["FI", "Finland", "+358"], ["FR", "France", "+33"], ["DE", "Germany", "+49"], ["GR", "Greece", "+30"], ["HK", "Hong Kong", "+852"], ["HU", "Hungary", "+36"], ["IS", "Iceland", "+354"], ["IN", "India", "+91"], ["ID", "Indonesia", "+62"], ["IE", "Ireland", "+353"], ["IL", "Israel", "+972"], ["IT", "Italy", "+39"], ["JP", "Japan", "+81"], ["KE", "Kenya", "+254"], ["MY", "Malaysia", "+60"], ["MX", "Mexico", "+52"], ["MA", "Morocco", "+212"], ["NL", "Netherlands", "+31"], ["NZ", "New Zealand", "+64"], ["NG", "Nigeria", "+234"], ["NO", "Norway", "+47"], ["PK", "Pakistan", "+92"], ["PH", "Philippines", "+63"], ["PL", "Poland", "+48"], ["PT", "Portugal", "+351"], ["QA", "Qatar", "+974"], ["RO", "Romania", "+40"], ["RU", "Russia", "+7"], ["SA", "Saudi Arabia", "+966"], ["SG", "Singapore", "+65"], ["ZA", "South Africa", "+27"], ["KR", "South Korea", "+82"], ["ES", "Spain", "+34"], ["SE", "Sweden", "+46"], ["CH", "Switzerland", "+41"], ["TH", "Thailand", "+66"], ["TR", "Turkey", "+90"], ["AE", "United Arab Emirates", "+971"], ["GB", "United Kingdom", "+44"], ["US", "United States", "+1"], ["VN", "Vietnam", "+84"], ["ZW", "Zimbabwe", "+263"],
].map(([code, name, dialCode]) => ({ code, name, dialCode }));

function sortCountries(countries: Country[]) {
  return [...countries].sort((a, b) => a.name.localeCompare(b.name));
}

function mergeCountries(countries: Country[]) {
  const byCode = new Map(fallbackCountries.map((country) => [country.code, country]));

  for (const country of countries) {
    if (country.code && country.name && country.dialCode) byCode.set(country.code, country);
  }

  return sortCountries([...byCode.values()]);
}

function phoneCountryValue(country: Country) {
  // The ISO code keeps options distinct when countries share a calling code.
  return `${country.code}|${country.dialCode}`;
}

export function getDialCode(phoneCountry: string) {
  return phoneCountry.split("|", 2)[1] || "";
}

export function PhoneCountryField({ phone, setPhone, countryCode, setCountryCode }: { phone: string; setPhone: (value: string) => void; countryCode: string; setCountryCode: (value: string) => void }) {
  const [countries, setCountries] = useState<Country[]>(sortCountries(fallbackCountries));

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd");
        if (!response.ok) throw new Error("Could not load countries");
        const data = (await response.json()) as Array<{ name: { common: string }; cca2: string; idd?: { root?: string; suffixes?: string[] } }>;
        setCountries(mergeCountries(data.map((item) => ({ code: item.cca2, name: item.name.common, dialCode: item.idd?.root && item.idd.suffixes?.[0] ? `${item.idd.root}${item.idd.suffixes[0]}` : "" }))));
      } catch {}
    };
    void loadCountries();
  }, []);

  return <div className="grid grid-cols-[minmax(9rem,0.75fr)_1.25fr] gap-4">
    <select aria-label="Phone country code" required value={countryCode} onChange={(event) => setCountryCode(event.target.value)} className={fieldClassName}>
      <option value="">Calling code</option>
      {countries.map((item) => <option key={item.code} value={phoneCountryValue(item)}>{item.name} ({item.dialCode})</option>)}
    </select>
    <input required type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Phone Number" value={phone} onChange={(event) => setPhone(event.target.value.replace(/[^0-9\s()-]/g, ""))} className={fieldClassName} />
  </div>;
}

export function LocationFields(props: LocationFieldsProps) {
  const [countries, setCountries] = useState<Country[]>(sortCountries(fallbackCountries));
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isLoadingRegions, setIsLoadingRegions] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd");
        if (!response.ok) throw new Error("Could not load countries");
        const data = (await response.json()) as Array<{ name: { common: string }; cca2: string; idd?: { root?: string; suffixes?: string[] } }>;
        setCountries(mergeCountries(data.map((item) => ({
          code: item.cca2,
          name: item.name.common,
          dialCode: item.idd?.root && item.idd.suffixes?.[0] ? `${item.idd.root}${item.idd.suffixes[0]}` : "",
        }))));
      } catch {
        // Manual address entry remains available if the country service is unavailable.
      }
    };
    void loadCountries();
  }, []);

  const loadCities = async (country: string, state: string) => {
    setIsLoadingCities(true);
    setCities([]);
    try {
      const params = new URLSearchParams({ country, cities: "1" });
      if (state) params.set("state", state);
      const response = await fetch(`/api/locations?${params.toString()}`);
      if (!response.ok) throw new Error("Could not load cities");
      const data = (await response.json()) as { cities?: string[] };
      setCities([...new Set((data.cities ?? []).filter(Boolean))].sort((a, b) => a.localeCompare(b)));
    } catch {
      setCities([]);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const loadRegions = async (country: string) => {
    setIsLoadingRegions(true);
    setRegions([]);
    setCities([]);
    try {
      const response = await fetch(`/api/locations?${new URLSearchParams({ country }).toString()}`);
      if (!response.ok) throw new Error("Could not load regions");
      const data = (await response.json()) as { regions?: Region[] };
      const availableRegions = (data.regions ?? []).sort((a, b) => a.name.localeCompare(b.name));
      setRegions(availableRegions);
      if (availableRegions.length === 0) void loadCities(country, "");
    } catch {
      setRegions([]);
    } finally {
      setIsLoadingRegions(false);
    }
  };

  const chooseCountry = (country: string) => {
    props.setCountry(country);
    props.setRegion("");
    props.setCity("");
    if (country) void loadRegions(country);
    else {
      setRegions([]);
      setCities([]);
    }
  };

  const chooseRegion = (region: string) => {
    props.setRegion(region);
    props.setCity("");
    if (props.country && region) void loadCities(props.country, region);
    else setCities([]);
  };

  const searchAddress = (value: string) => {
    props.setAddress(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    searchTimer.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const countryCode = countries.find((item) => item.name === props.country)?.code.toLowerCase();
        const params = new URLSearchParams({ q: value, format: "jsonv2", addressdetails: "1", limit: "5" });
        if (countryCode) params.set("countrycodes", countryCode);
        const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
        if (!response.ok) throw new Error("Could not search locations");
        setSuggestions((await response.json()) as LocationSuggestion[]);
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);
  };

  const selectSuggestion = (suggestion: LocationSuggestion) => {
    const details = suggestion.address;
    const street = [details.house_number, details.road].filter(Boolean).join(" ");
    props.setAddress(street || suggestion.display_name.split(",").slice(0, 2).join(","));
    const city = details.city || details.town || details.village || details.municipality || "";
    const region = details.state || details.region || details.county || "";
    props.setCity(city);
    props.setRegion(region);
    props.setPostalCode(details.postcode || "");
    const countryCode = details["ISO3166-1:alpha2"]?.toUpperCase();
    const matchedCountry = countries.find((item) => item.code === countryCode || item.name === details.country);
    const selectedCountry = matchedCountry?.name || details.country;
    if (selectedCountry) {
      props.setCountry(selectedCountry);
      void loadRegions(selectedCountry);
      if (region) void loadCities(selectedCountry, region);
    }
    setSuggestions([]);
  };

  return (
    <>
      <select required value={props.country} onChange={(event) => chooseCountry(event.target.value)} className={fieldClassName} autoComplete="country-name">
        <option value="">Select country / region</option>
        {countries.map((item) => <option key={item.code} value={item.name}>{item.name}</option>)}
      </select>

      <div className="relative">
        <input required type="text" autoComplete="street-address" placeholder="Start typing your address" value={props.address} onChange={(event) => searchAddress(event.target.value)} className={fieldClassName} />
        {(suggestions.length > 0 || isSearching) && (
          <div className="absolute z-20 mt-1 w-full border border-charcoal/15 bg-ivory shadow-lg">
            {isSearching && <p className="px-4 py-3 text-xs text-charcoal/60">Searching addresses…</p>}
            {suggestions.map((suggestion) => (
              <button key={suggestion.display_name} type="button" onClick={() => selectSuggestion(suggestion)} className="block w-full border-b border-charcoal/10 px-4 py-3 text-left text-xs leading-relaxed text-charcoal hover:bg-sage/40">
                {suggestion.display_name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {regions.length > 0 ? (
          <select required value={props.region} onChange={(event) => chooseRegion(event.target.value)} disabled={isLoadingRegions} className={fieldClassName} autoComplete="address-level1">
            <option value="">{isLoadingRegions ? "Loading states / regions…" : "Select state / region"}</option>
            {regions.map((region) => <option key={region.code} value={region.name}>{region.name}</option>)}
          </select>
        ) : (
          <input required type="text" autoComplete="address-level1" placeholder={isLoadingRegions ? "Loading states / regions…" : "State / Province"} value={props.region} onChange={(event) => props.setRegion(event.target.value)} disabled={isLoadingRegions} className={fieldClassName} />
        )}
        {cities.length > 0 ? (
          <select required value={props.city} onChange={(event) => props.setCity(event.target.value)} disabled={isLoadingCities || (!props.region && regions.length > 0)} className={fieldClassName} autoComplete="address-level2">
            <option value="">{isLoadingCities ? "Loading cities…" : "Select city"}</option>
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
        ) : (
          <input required type="text" autoComplete="address-level2" placeholder={isLoadingCities ? "Loading cities…" : "City"} value={props.city} onChange={(event) => props.setCity(event.target.value)} disabled={isLoadingCities || (!props.region && regions.length > 0)} className={fieldClassName} />
        )}
      </div>
      <input required type="text" autoComplete="postal-code" placeholder="Postal Code" value={props.postalCode} onChange={(event) => props.setPostalCode(event.target.value)} className={fieldClassName} />
    </>
  );
}
