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
<div className="max-w-xl mx-auto p-6">
  <h1 className="text-3xl font-bold mb-6 text-center tracking-tight text-neutral-800">
    Search by Country Code
  </h1>

  <SearchForm
    searchTerm={searchTerm}
    loading={loading}
    onSearchChange={setSearchTerm}
    onSearchSubmit={handleSearch}
  />

  {errorMessage && (
    <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
  )}

  {countryFound && (
    <div className="mt-8 bg-white border border-neutral-200 rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-neutral-900 flex items-center gap-2">
        <span className="text-3xl">{countryFound.emoji}</span> {countryFound.name}
      </h2>
      <div className="space-y-2 text-neutral-700">
        <p><span className="font-medium text-neutral-800">Code:</span> {countryFound.code}</p>
        <p><span className="font-medium text-neutral-800">Currency:</span> {countryFound.currency || 'N/A'}</p>
        <p><span className="font-medium text-neutral-800">Continent:</span> {countryFound.continent.name}</p>
      </div>
    </div>
  )}
</div>
  )
}

export default Display
