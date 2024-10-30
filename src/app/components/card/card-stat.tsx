import {cn} from "@/lib/utils";

interface StatDisplayProps {
    label: string;
    value: string | number;
    isVisible: boolean;
    className?: string;
}

export function StatDisplay({ label, value, isVisible, className }: StatDisplayProps) {
    return (
        <div
            className={cn(["flex flex-col items-center w-[80px]", { invisible: !isVisible }, className])}
        >
            <span className="text-xs font-medium text-gray-700">{label}</span>
            <span className="text-md font-semibold text-gray-900">{value}</span>
        </div>
    );
}