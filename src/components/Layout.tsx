import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}
