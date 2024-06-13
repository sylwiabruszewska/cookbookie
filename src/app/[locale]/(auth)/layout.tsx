import HomepageLayout from "@/ui/layouts/homepage";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HomepageLayout>{children}</HomepageLayout>;
}
