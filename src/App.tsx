import { App, ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/route";
import { validateMessages } from "./app/utils/validate-messages";

function AppWrapper() {


  return (
    <>
    <ConfigProvider
    form={{ validateMessages }}
  >
    <App>
      <RouterProvider router={router} />
    </App>
    </ConfigProvider>
    </>
  )
}

export default AppWrapper
