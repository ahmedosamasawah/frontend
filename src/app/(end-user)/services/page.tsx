"use client";

import { useState } from "react";
import Switch from "../../../common/utils/Switch";
import ConsultationRequest from "../../../features/Services/ConsultationRequest.tsx";

export default function ServicesPage() {
  const [isActive, setIsActive] = useState(true);
  const handleSwitch = (
    isActive: boolean | ((prevState: boolean) => boolean),
  ) => setIsActive(isActive);

  return (
    <main className="container mx-auto flex flex-col gap-10 px-4 lg:px-8">
      <Switch
        active={isActive}
        firstTitle="طلب استشارة"
        secondTitle="رفع قضية"
        switchHandler={handleSwitch}
      />
      {isActive ? <ConsultationRequest /> : "b"}
    </main>
  );
}
