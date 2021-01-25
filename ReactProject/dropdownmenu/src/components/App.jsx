import React from 'react';
import Select from 'react-select';
import CountryList from './CountryList';
import LanguageList from './LanguageList';

function App() {

    const setCountry = (input) => {
        console.log('Selected ' + input.value);
        console.log('Selected ' + input.label);
    }
    
    return (
        <div>
            <h1>DropDown</h1>
            <div>
                <Select
                    name="country"
                    options={CountryList}                    
                    defaultValue={CountryList[0]}
                    onChange={setCountry}
                />
            </div>
            
            <br />

            <div>
                <Select
                    name="language"
                    options={LanguageList}                    
                    defaultValue={LanguageList[0]}                   
                />
            </div>

        </div>
    );
}

export default App;