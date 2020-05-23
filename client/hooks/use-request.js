import axios from 'axios';
import { useState } from 'react';

export const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      onSuccess(response.data);
      return response.data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {error.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>,
      );
    }
  };

  return { errors, doRequest };
};
