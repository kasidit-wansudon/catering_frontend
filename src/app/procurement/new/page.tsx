"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { factories, procurementOrders } from "@/data/mock-dashboard";
import ProcurementForm, {
  ProcurementFormValues,
  ProcurementItemRow,
  ProcurementStatus,
} from "@/components/procurement/ProcurementForm";

const supplierList = Array.from(
  new Set(procurementOrders.map((po) => po.supplier)),
);

function NewPOPageContent() {
  const searchParams = useSearchParams();
  const poNumber = searchParams.get("po");

  const existingPO = poNumber
    ? procurementOrders.find((po) => po.poNumber === poNumber)
    : null;

  const initialValues: Partial<ProcurementFormValues> | undefined = existingPO
    ? {
        supplier: existingPO.supplier,
        kitchen: factories[0]?.name || "",
        eta: new Date().toISOString().slice(0, 16),
        status: existingPO.status as ProcurementStatus,
        notes: `แก้ไข PO: ${existingPO.poNumber} - ${existingPO.itemSummary}`,
        includeQA: true,
      }
    : undefined;

  const initialItems: ProcurementItemRow[] | undefined = existingPO
    ? [
        {
          name: existingPO.itemSummary.split(" ")[0] || "วัตถุดิบ",
          qty: parseInt(existingPO.itemSummary.split(" ")[1]) || 0,
          uom: existingPO.itemSummary.split(" ")[2] || "กก.",
          price: Math.round(
            existingPO.total /
              (parseInt(existingPO.itemSummary.split(" ")[1]) || 1),
          ),
        },
      ]
    : undefined;

  const handleSubmit = async (payload: {
    values: ProcurementFormValues;
    items: ProcurementItemRow[];
    totalAmount: number;
  }) => {
    console.log("Submitting PO:", payload);
    if (existingPO) {
      console.log("Updating existing PO:", existingPO.poNumber);
    } else {
      console.log("Creating new PO");
    }
  };

  return (
    <ProcurementForm
      title={
        existingPO ? `แก้ไขใบสั่งซื้อ ${existingPO.poNumber}` : "สร้างใบสั่งซื้อวัตถุดิบใหม่"
      }
      description={
        existingPO
          ? `แก้ไขรายละเอียดใบสั่งซื้อ ${existingPO.poNumber}`
          : "ใช้สำหรับออก PO ให้ supplier พร้อมรายละเอียดวัตถุดิบ ราคาต่อหน่วย และกำหนดส่ง (ข้อมูล mock ยังไม่เชื่อมระบบจริง)"
      }
      suppliers={supplierList}
      kitchens={factories.map((f) => f.name)}
      initialValues={initialValues}
      initialItems={initialItems}
      submitLabel={existingPO ? "บันทึกการแก้ไข" : "บันทึก PO (mock)"}
      cancelHref="/procurement"
      onSubmit={handleSubmit}
    />
  );
}

export default function NewPOPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-ink">
          กำลังโหลดฟอร์มจัดซื้อ...
        </div>
      }
    >
      <NewPOPageContent />
    </Suspense>
  );
}
