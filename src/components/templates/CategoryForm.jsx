import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import { addCategory } from "services/admin";
import styles from "./CategoryForm.module.css";

function CategoryForm() {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const { mutate, isLoading, error, data } = useMutation(addCategory);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();

    if (!form.name || !form.slug || !form.icon)
      return toast.error("لطفا همه فیلدها را پر کنید!");
    mutate(form);
  };
  return (
    <>
      <Toaster />
      <form
        onChange={changeHandler}
        onSubmit={submitHandler}
        className={styles.form}>
        <h3>دسته بندی جدید</h3>
        {!!error && <p>مشکلی پیش آمده است</p>}
        {data?.status === 201 && <p>دسته بندی با موفقیت اضافه شد</p>}
        <label htmlFor="name">اسم دسته بندی</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="slug">اسلاگ</label>
        <input type="text" name="slug" id="slug" />
        <label htmlFor="icon">آیکن</label>
        <input type="text" name="icon" id="icon" />
        <button type="submit" disabled={isLoading}>
          ایجاد
        </button>
      </form>
    </>
  );
}

export default CategoryForm;
