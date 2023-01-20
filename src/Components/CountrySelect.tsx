import React, {useMemo, useRef, useState} from 'react';
import {MultiSelect} from "primereact/multiselect";
import {countryList} from "../Helpers/CountryList";
import {InputText} from "primereact/inputtext";
import {InputSwitch} from "primereact/inputswitch";
import './CountrySelect.css';
import {Button} from "primereact/button";

const countryTemplate = (option: string) => {
  return (
    <div className="country-item font-face-cb">
      <div>{option}</div>
    </div>
  );
}

function CountrySelect() {
  const [selectedCountries, setSelectedCountries] = useState([] as string[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const multiSelectRef = useRef(null as MultiSelect | null);

  const countries = useMemo(() => {
    if (showSelectedOnly) {
      return selectedCountries;
    }
    if (searchTerm !== '') {
      return countryList.filter(c => c.includes(searchTerm));
    }
    return countryList;
  }, [showSelectedOnly, searchTerm, selectedCountries]);

  const clearAll = () => {
    setSelectedCountries([]);
    setSearchTerm('');
    setShowSelectedOnly(false);
  }

  const closeSelect = () => {
    multiSelectRef.current?.hide();
  }

  // unfortunately prime replaces the filter box with the header if it's provided so as well
  // as the show selected we also need to implement the filter functionality
  const header = () => {
    return (
      <div className="py-2 px-3 font-face-cb">
        <InputText className="w-full input-search" placeholder="Search" value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}/>
        <div className="font-bold flex align-items-center mt-3">
          <InputSwitch className="" checked={showSelectedOnly} onChange={e => setShowSelectedOnly(e.value)}/>
          <label className="ml-2 mr-6">Show selected only</label>
          <span className="ml-auto" onClick={clearAll}>Clear all</span>
        </div>
      </div>
    );
  }

  const footer = () => {
    return (
      <div className="py-2 px-3">
        <div className="cs-footer flex">
          <Button className="save-button ml-auto mt-2 mb-2" onClick={closeSelect}>Save</Button>
        </div>
      </div>
    )
  };

  return (
    <MultiSelect options={countries} itemTemplate={countryTemplate} value={selectedCountries}
                 onChange={(e) => setSelectedCountries(e.value)} filter={true} showSelectAll={false}
                 panelHeaderTemplate={header} panelFooterTemplate={footer} className="country-select mt-6"
                 showClear={true} panelClassName="country-select" ref={multiSelectRef} placeholder="Select countries" />
  );
}

export default CountrySelect;