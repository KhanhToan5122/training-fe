import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, bro</h1>
      <Button onClick={() => logout()} className="mt-4">
        Logout
      </Button>
    </div>
  );
}
