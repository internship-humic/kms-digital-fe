export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white relative shadow-2xl overflow-x-hidden flex flex-col">
      {children}
    </div>
  );
}
