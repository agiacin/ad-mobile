import { useEffect, useState } from 'react';

function fetchData(url) {
  return fetch(url, {
    method: 'GET',
  }).then((res) => res.json());
}

/**
 * @template T expected type
 * @param {string} url
 * @return [T] data
 */
export const useGet = (url, refresh) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('LOADING');
  useEffect(() => {
    const finish = (data) => {
      setData(data);
      setStatus('DONE');
    };
    const cancel = (error) => {
      console.log('ocurrio un error', error);
      setStatus('ERROR');
    };
    fetchData(url).then(finish, cancel);
    return () => {};
  }, [url, refresh]);

  console.log(data);
  return { data, status };
};

/**
 *
 * @param {string} url
 * @param {import('./useSesion').LogIn} obj
 * @returns {Promise<import('./useSesion').Sesion>}
 */
export const logIn = async (url, obj) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      console.log();
      if (res.ok) {
        return res;
      }
      throw Error('Error');
    })
    .then((res) => res.json());
};
