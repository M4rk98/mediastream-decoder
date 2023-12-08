import { Switch } from "@headlessui/react";
import React, { SetStateAction, Dispatch } from "react";

import { cn } from "utils";

export default function Toggle({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={cn(
        "mx-4 bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
        {
          "bg-indigo-600": enabled,
        },
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={cn(
          "translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          { "translate-x-5": enabled },
        )}
      />
    </Switch>
  );
}
