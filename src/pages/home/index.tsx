import { AuthGuard } from "@/components/AuthGuard";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";

export default function Home() {
  return (
    <>
      <AuthGuard>
        <Menu />
        <Header label="Home" />
      </AuthGuard>
    </>
  );
}
