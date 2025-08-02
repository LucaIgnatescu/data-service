"use client";

import { useGSAP } from "@gsap/react";
import { useState, ComponentPropsWithoutRef, useRef } from "react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

type SQLTypeProps = {
  displayName: string;
  description: string;
};

const SQLTypes = {
  float: {
    displayName: "float",
    description: "floating point numbers",
  },
  text: {
    displayName: "text",
    description: "text of any size",
  },
  dateTime: {
    displayName: "DateTime",
    description: "Date and Time",
  },

};

type SQLType = keyof typeof SQLTypes;

// attached, detaching, detached are the three states
// detaching: animates to detached and applied event handlers
// detached: animates movement and transitions back to attached

export function DataRow(
  { text, isFloating, ...props }:
    { text: string; isFloating: boolean } & ComponentPropsWithoutRef<"div">,
) {
  const ref = useRef(null);

  return (

    <div className="h-10 w-vw bg-green-500" {...props} ref={ref}>
      {text}
    </div>
  );
}

export function DataRowWrapper({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <div className="h-10 bg-black w-vw">{isActive && children}</div>
  );
}

export function FloatingDataRow({ ...props }: ComponentPropsWithoutRef<"div">) {
  const ref = useRef(null);
  useGSAP(() => {

  });
  return (
    <div className="h-9 bg-black absolute" {...props} ref={ref}>
      Floating...
    </div>
  );
}

export function DataGrid() {
  const labels = ["abc", "def", "ghi"];
  const [clicked, setClicked] = useState<null | number>(null);

  return (
    <>
      {labels.map((label, i) => (
        <DataRowWrapper isActive={clicked !== i} key={label}>
          <DataRow text={label} />
        </DataRowWrapper>
      ),
      )}
    </>

  );
}
