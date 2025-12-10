import type React from "react";

interface NavContainerProps {
  children: React.ReactNode;
  className?: string;
}

const NavContainer: React.FC<NavContainerProps> = ({ children, className }) => {
  return (
    <nav className={`flex flex-col gap-2 ${className || ""}`}>
      {children}
    </nav>
  );
};

export default NavContainer;