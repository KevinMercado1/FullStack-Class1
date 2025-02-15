import { useState, useEffect } from 'react';
import axios from 'axios';
export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.target.value);

  const reset = () => setValue('');

  return {
    type,
    value,
    onChange,
    reset,
    inputProps: { type, value, onChange },
  };
};
export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) return;
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((res) => setCountry(res.data))
      .catch(() => setCountry(null));
  }, [name]);

  return country;
};
export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((res) => setResources(res.data));
  }, [baseUrl]);

  const create = async (newResource) => {
    const res = await axios.post(baseUrl, newResource);
    setResources([...resources, res.data]);
  };

  return [resources, { create }];
};
