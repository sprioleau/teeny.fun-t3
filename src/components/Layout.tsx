import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
