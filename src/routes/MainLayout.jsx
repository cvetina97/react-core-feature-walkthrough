import MainHeader from "../components/MainHeader";
import { Outlet }  from "react-router-dom";

function MainLayout() {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
