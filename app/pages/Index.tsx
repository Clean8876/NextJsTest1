'use client'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_COUNTIRES } from '../graphql/queries';
import SearchForm from '../components/SearchForm';

interface Country{
    code: string;
  name: string;
  emoji: string;
  currency: string | null;
  continent: {
    name: string;
  };
}
function Display() {
    const [searchTerm, setSearchTerm] = useState('');
     const [errorMessage, setErrorMessage] = useState('');
       const [countryFound, setCountryFound] = useState<Country|null>(null);
    const [getCountry, { loading, error, data }] = useLazyQuery(GET_COUNTIRES);

    const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;

    getCountry({ variables: { code: searchTerm.trim().toUpperCase() } });
     setErrorMessage('');
    setCountryFound(null);
  };


  
    useEffect(() => {
    if (error) {
      setErrorMessage('An error occurred. Please try again.');
    } else if (data?.country) {
      setCountryFound(data.country);
    } else if (data && !data.country) {
      setErrorMessage('Country not found. Please check the country code.');
    }
  }, [data, error]);
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search by Country Code</h1>

      <SearchForm
        searchTerm={searchTerm}
        loading={loading}
        onSearchChange={setSearchTerm}
        onSearchSubmit={handleSearch}
      />

       {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      {countryFound && (
        <div className="mt-6 border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">
            {countryFound.emoji} {countryFound.name}
          </h2>
          <p>Code: {countryFound.code}</p>
          <p>Currency: {countryFound.currency || 'N/A'}</p>
          <p>Continent: {countryFound.continent.name}</p>
        </div>
      )}
    </div>
  )
}

export default Display
