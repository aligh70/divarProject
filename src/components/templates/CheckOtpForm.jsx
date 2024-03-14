import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { checkOtp } from "services/auth";
import { getProfile } from "services/user";
import { setCookie } from "utils/cookie";
import styles from "./CheckOtpForm.module.css";

function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const navigate = useNavigate();
  const { refetch } = useQuery(["profile"], getProfile);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (code.length !== 5) return toast.error("کد وارد شده نادرست می باشد!");

    const { response, error } = await checkOtp(mobile, code);

    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch();
      console.log(response);
    }

    if (error) return toast.error("خطایی رخ داده است!");
  };
  return (
    <>
      <Toaster />
      <form onSubmit={submitHandler} className={styles.form}>
        <p>تایید کد اس ام اس شده</p>
        <span>کد پیامک شده به شماره «{mobile}» را وارد کنید</span>
        <label htmlFor="input">کد تایید را وارد کنید</label>
        <input
          type="text"
          id="input"
          placeholder="کد تایید"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">ورود</button>
        <button onClick={() => setStep(1)} className={styles.backButton}>
          تغییر شماره موبایل
        </button>
      </form>
    </>
  );
}

export default CheckOtpForm;
