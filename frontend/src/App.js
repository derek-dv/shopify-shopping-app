import { Container } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        All good
      </Layout>
    </BrowserRouter>
  );
}

export default App;
