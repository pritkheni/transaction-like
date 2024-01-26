import { atom, selector } from "recoil";
import axios from "../api/axios";

export const filterAtom = atom({
  key: "filterAtom",
  default: "",
});

export const blalanceAtom = atom({
  key: "blalanceAtom",
  default: 0,
});

export const acountSelector = selector({
  key: "accountSelector",
  default: {
    users: null,
    loading: true,
    err: null,
  },
  get: async ({ get }) => {
    try {
      const filter = get(filterAtom);
      const response = await axios.get(`/api/v1/user/bulk?filter=${filter}`);
      return { users: response?.data?.data?.users, loading: false, err: null };
    } catch (err) {
      let obj = { users: null, loading: false, err: null };
      if (!err?.response) {
        obj.err = "No server Response";
      } else if (err.response.status === 500) {
        obj.err = "Internal server error";
      } else {
        obj.err = "Process Fail";
      }
      return obj;
    }
  },
});
