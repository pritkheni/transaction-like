import { Suspense, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useRecoilState } from "recoil";
import { blalanceAtom, filterAtom } from "../store/atoms";
import RenderList from "./RenderList";
import axios from "../api/axios";
export default function Dhashbord() {
  const { auth } = useAuth();
  const [filter, setFilter] = useRecoilState(filterAtom);
  const firstName = auth.firstName;
  const lastName = auth.lastName;
  const [balance, setBalnce] = useRecoilState(blalanceAtom);

  useEffect(() => {
    const controller = new AbortController();
    console.log(auth.authToken);
    const getBlance = async () => {
      try {
        const balnce = await axios.get("/api/v1/account/balance", {
          signal: controller.signal,
          headers: {
            Authorization: "Bearer " + auth.authToken,
          },
        });
        console.log(balnce.data.data["balance"]);
        setBalnce(balnce.data.data["balance"]);
      } catch (err) {
        console.log(err);
      }
    };
    getBlance();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <section className="w-full min-h-screen flex flex-col divide-y-2 divide-slate-600s bg-white">
      <div className="flex justify-between mx-4 py-5">
        <h1 className="text-3xl font-bold text-black">Payment App</h1>
        <div className="flex gap-3 items-center text-black text-xl font-normal">
          <span className="capitalize">
            Hello, {firstName} {lastName}
          </span>
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-slate-300">
            {firstName.toUpperCase().charAt()}
          </div>
        </div>
      </div>
      <div className="text-black font-extrabold text-xl px-4">
        <div className="py-5">Your Balance: ${balance}</div>
        <div className="pb-5">Users</div>
        <input
          type="text"
          placeholder="Search users..."
          className="w-full font-normal text-base p-2 rounded-md bg-transparent shadow-initial focus:shadow-focus"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
        <Suspense fallback="Loading users...">
          <RenderList />
        </Suspense>
      </div>
    </section>
  );
}
