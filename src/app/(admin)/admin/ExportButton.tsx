"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ExportButton() {
  function handleExport() {
    window.open("/api/admin/export", "_blank");
  }

  return (
    <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
      <Download className="size-3.5" />
      Export CSV
    </Button>
  );
}
