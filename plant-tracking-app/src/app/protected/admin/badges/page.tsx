import { BadgeDashboard } from "@/components/badges/BadgeDashboard";

export default function AdminBadgesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Badge Management</h1>
      <BadgeDashboard userId="" />
    </div>
  );
}
