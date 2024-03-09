import toast, { Toaster } from "react-hot-toast";
import { checkOtp } from "../../services/auth";

function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const submitHandler = async (event) => {
    event.preventDefault();

    if (code.length !== 5) return toast.error("کد وارد شده نادرست می باشد!");

    const { response, error } = await checkOtp(mobile, code);

    if (response) console.log(response);

    if (error) return toast.error("خطایی رخ داده است!");
  };
  return (
    <>
      <Toaster />
      <form onSubmit={submitHandler}>
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
        <button onClick={() => setStep(1)}>تغییر شماره موبایل</button>
      </form>
    </>
  );
}

export default CheckOtpForm;
