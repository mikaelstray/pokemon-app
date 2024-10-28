import clsx from "clsx";

interface StatDisplayProps {
    label: string;
    value: string | number;
    isVisible: boolean;
    width?: string;
}

export function StatDisplay({ label, value, isVisible, width = "80px" }: StatDisplayProps) {
    return (
        <div
            className={clsx("flex flex-col items-center", { invisible: !isVisible })}
            style={{ width }}
        >
            <span className="text-xs font-medium text-gray-700">{label}</span>
            <span className="text-md font-semibold text-gray-900">{value}</span>
        </div>
    );
}
