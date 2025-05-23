import axios from "axios";
import { camelizeKeys } from "humps";

export const api = axios.create({
  baseURL: "/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  transformResponse: [
    (data) => {
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return data;
        }
      }
      return camelizeKeys(data);
    },
  ],
  timeout: 50000,
});
