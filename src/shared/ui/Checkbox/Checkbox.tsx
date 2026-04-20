import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "@/shared/lib/utils"

export interface CheckboxProps extends Omit<React.ComponentProps<"input">, "type"> {
    label?: string;
    ref?: React.Ref<HTMLInputElement>;
}

function Checkbox({ className, label, id, ref, ...props }: CheckboxProps) {
    const generatedId = React.useId()
    const checkboxId = id || generatedId

    return (
        <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    id={checkboxId}
                    ref={ref}
                    className={cn(
                        "peer size-4 shrink-0 appearance-none rounded-md border border-input transition-all outline-none",
                        "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring",
                        "checked:bg-primary checked:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                        "cursor-pointer aria-invalid:border-destructive",
                        className
                    )}
                    {...props}
                />
                <CheckIcon
                    className={cn(
                        "absolute size-3 text-primary-foreground pointer-events-none transition-transform scale-0 peer-checked:scale-100"
                    )}
                />
            </div>
            {label && (
                <label
                    htmlFor={checkboxId}
                    className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                >
                    {label}
                </label>
            )}
        </div>
    )
}

export { Checkbox }