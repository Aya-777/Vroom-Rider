import { useEffect, useState } from 'react';
import {
  GeocodeResult,
  searchAddress,
} from '../../../core/services/location/GeoCodingService';
import { useDebounce } from './useDebounce';

export function useLocationSearch(query: string) {
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.trim().length < 3) {
      setResults([]);
      return;
    }

    let cancelled = false;

    const fetchResults = async () => {
      setIsSearching(true);

      try {
        const data = await searchAddress(debouncedQuery);

        if (!cancelled) {
          setResults(data);
        }
      } finally {
        if (!cancelled) {
          setIsSearching(false);
        }
      }
    };

    fetchResults();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const clearResults = () => {
    setResults([]);
  };

  return {
    results,
    isSearching,
    clearResults,
  };
}