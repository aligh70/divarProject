import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AuthPage from "pages/AuthPage";
import HomePage from "pages/HomePage";
import DashboardPage from "pages/DashboardPage";
import AdminPage from "pages/AdminPage";
import PageNotFound from "pages/404";
import { getProfile } from "services/user";

function Router() {
  const { data, isLoading } = useQuery(["profile"], getProfile);
  console.log({ data, isLoading });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
