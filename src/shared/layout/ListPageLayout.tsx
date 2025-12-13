// src/shared/layout/ListPageLayout.tsx
import React from "react";
import Header from "./Header";

interface ListPageLayoutProps {
  heading: string;
  subheading: string;
  actionButton: React.ReactNode;
  filterBar: React.ReactNode;
  children: React.ReactNode; // For the table
}

const ListPageLayout: React.FC<ListPageLayoutProps> = ({
  heading,
  subheading,
  actionButton,
  filterBar,
  children,
}) => {
  return (
    <div className="mx-auto max-w-[1600px] space-y-8 p-6 lg:p-10">
      <Header heading={heading} subheading={subheading}>
        <div className="flex w-full items-center gap-3 md:w-auto">
          {actionButton}
        </div>
      </Header>

      {filterBar}

      {children}
    </div>
  );
};

export default ListPageLayout;
