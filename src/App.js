import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

/* Menu */
import { customerPortalMenu } from "./config/customer";

/* Customer Portal Pages */
import Dashboard from "./pages/customerportal/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout menus={customerPortalMenu}>
              <Dashboard />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;