import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { blalanceAtom } from "../store/atoms";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

export default function MoneyModal({ setShow, user }) {
  const [errMsg, setErrMsg] = useState("");
  const { auth } = useAuth();
  console.log(auth.authToken);
  const inputRef = useRef();
  const [trsaction, setTrasaction] = useState(false);
  const [value, setValue] = useState(undefined);
  const setBalance = useSetRecoilState(blalanceAtom);

  const handleOuterclick = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setShow({
        show: false,
        user: null,
      });
    }
  };
  const handleOnChange = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      if (errMsg) setErrMsg("");
      if (e.target.value) {
        setValue(parseInt(e.target.value));
      } else {
        setValue(null);
      }
    }
  };
  const handleTrasaction = async (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      if (value === null || value <= 0) {
        setErrMsg("negative value not allow");
        return;
      }
      setTrasaction(true);
      console.log(
        JSON.stringify({
          to: user._id,
          amount: value,
        })
      );
      try {
        const response = await axios.post(
          "/api/v1/account/transfer",
          JSON.stringify({
            to: user._id,
            amount: value,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.authToken}`,
            },
          }
        );
        if (response.data.message === "trasaction completed") {
          console.log(`geting balance`);
          const balnce = await axios.get("/api/v1/account/balance", {
            headers: {
              Authorization: `Bearer ${auth.authToken}`,
            },
          });
          console.log("got the balalnce");
          console.log(balnce.data.data["balance"]);
          setBalance(balnce.data.data["balance"]);
          setTrasaction(false);
          setValue("");
        } else {
          setTrasaction(false);
          setErrMsg("transaction failed");
        }
      } catch (err) {
        console.log(err.response);
        setTrasaction(false);
        setErrMsg("server not responding");
      }
    }
  };
  return (
    <div
      onClick={handleOuterclick}
      className="fixed inset-0 flex justify-center items-center bg-slate-950 bg-opacity-20 filt backdrop-blur-xs z-10"
    >
      <div className="absolute flex flex-col justify-center bg-white shadow-md rounded-md p-6 z-20">
        <h1 className="font-bold text-3xl my-auto w-full text-center">
          Send Money
        </h1>
        <div className="flex items-center h-16 w-full">
          <p
            aria-live="assertive"
            className={`text-red-500 text-base font-normal ${
              errMsg === "" ? "hidden" : "block"
            } w-full p-2 bg-red-200 rounded-md`}
          >
            &#x2022; {errMsg}
          </p>
        </div>
        <div className="flex w-96 items-center gap-3">
          <div className="w-14 h-14 flex justify-center items-center rounded-full bg-green-500 font-medium text-white text-2xl">
            {`${user.firstName.toUpperCase().charAt()}`}
          </div>
          <div className="font-bold capitalize text-2xl">{`${user.firstName}`}</div>
        </div>
        <div className="text-base font-semibold mb-1 mt-4">{`Amount (in Rs)`}</div>
        <input
          value={value}
          onChange={handleOnChange}
          ref={inputRef}
          type="number"
          placeholder="Enter your amount"
          className="w-full p-2 bg-transparent shadow-initial focus:shadow-focus text-base font-normal rounded-md pointer"
        />
        <button
          onClick={handleTrasaction}
          disabled={errMsg || trsaction || value === null || value <= 0}
          className="w-full p-2 text-base font-normal rounded-md bg-green-500 text-white mt-4 disabled:bg-slate-300"
        >
          {`${trsaction ? "Trasfering.." : "Initiat Transfer"}`}
        </button>
      </div>
    </div>
  );
}
