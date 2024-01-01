import { useEffect, useState } from "react";
import { DataFetchingResult } from "../types";

export const useFetch = <T>(url: string): DataFetchingResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | unknown>();

  useEffect(() => {
    setLoading(true);
    try {
      fetch(url).then((data) => {
        if (!data.ok) {
          const statusText = data.statusText || "Unknown error"; // Use a default message if statusText is null
          setError(statusText);
          throw new Error(statusText);
        }
        return data.json().then((res) => {
          setLoading(false);
          setData(res);
        });
      });
    } catch (error) {
      setLoading(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  const reFetch = () => {
    setLoading(true);
    try {
      fetch(url).then((data) => {
        if (!data.ok) {
          setLoading(false);
          throw new Error(data.statusText);
        }
        return data.json().then((res) => {
          setLoading(false);
          setData(res);
        });
      });
    } catch (err: unknown) {
      setLoading(false);
      setError(err);
    }
  };

  return { data, loading, error, reFetch };
};
