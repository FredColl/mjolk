import NavLinks from "./navigation";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="h-screen">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="h-screen">{children}</div>
      <nav>
        <NavLinks />
      </nav>
    </body>
  );
}
