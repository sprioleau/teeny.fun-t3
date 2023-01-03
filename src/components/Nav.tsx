import React from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Nav() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleToggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <DesktopNav />
      <MobileNav
        isExpanded={isExpanded}
        onToggleMenu={handleToggleMenu}
      />
    </>
  );
}
