/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trading" element={<Home />} />
        <Route path="/capital" element={<Home />} />
        <Route path="/maritime" element={<Home />} />
        <Route path="/fort-energy" element={<Home />} />
        <Route path="/news" element={<Home />} />
        <Route path="/contact" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

