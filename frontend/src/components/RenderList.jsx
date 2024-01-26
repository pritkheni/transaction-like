import { useRecoilValue } from "recoil";
import { acountSelector } from "../store/atoms";
import { useState } from "react";
import MoneyModal from "./MoneyModal";

export default function RenderList() {
  const { users } = useRecoilValue(acountSelector);
  const [showModal, setShowModal] = useState({
    show: false,
    user: null,
  });
  return (
    <>
      <div className="flex flex-col gap-7 mt-7">
        {users?.map((user) => (
          <User key={user._id} user={user} setShowModal={setShowModal} />
        ))}
      </div>
      {showModal.show && showModal.user && (
        <MoneyModal setShow={setShowModal} user={showModal.user} />
      )}
    </>
  );
}

function User({ user, setShowModal }) {
  return (
    <div className="text-black text-base flex items-center gap-3">
      <div className="w-10 h-10 flex justify-center items-center rounded-full bg-slate-200 font-medium">
        {`${user.firstName.toUpperCase().charAt()}`}
      </div>
      <div className="font-bold capitalize text-lg">{`${user.firstName}`}</div>
      <div className="flex flex-auto justify-end text-base font-normal">
        <button
          onClick={() =>
            setShowModal({
              show: true,
              user: user,
            })
          }
          className="p-2 bg-black text-white rounded"
        >
          Send Money
        </button>
      </div>
    </div>
  );
}
