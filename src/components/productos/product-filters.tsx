"use client";

import { RotateCcw } from "lucide-react";
import {
    AUDIENCES,
    SUBCATEGORIES,
    type Audience,
    type ProductStatus,
    type Subcategory,
} from "@/lib/constants";

interface ProductFiltersProps {
    selectedAudiences: Audience[];
    selectedSubcategories: Subcategory[];
    selectedStatuses: ProductStatus[];
    onAudiencesChange: (next: Audience[]) => void;
    onSubcategoriesChange: (next: Subcategory[]) => void;
    onStatusesChange: (next: ProductStatus[]) => void;
    onReset: () => void;
}

const STATUS_LABELS: Record<ProductStatus, string> = {
    available: "Disponible",
    coming_soon: "Próximamente",
};

function toggle<T>(arr: T[], value: T): T[] {
    return arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
}

export function ProductFilters({
    selectedAudiences,
    selectedSubcategories,
    selectedStatuses,
    onAudiencesChange,
    onSubcategoriesChange,
    onStatusesChange,
    onReset,
}: ProductFiltersProps) {
    const hasFilters =
        selectedAudiences.length > 0 ||
        selectedSubcategories.length > 0 ||
        selectedStatuses.length > 0;

    return (
        <aside className="rounded-2xl border border-gray-200 bg-gray-50 p-5 flex flex-col gap-6">
            <header className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 tracking-tight">
                    Filtros
                </h3>
                {hasFilters && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-cyan-600 transition-colors"
                    >
                        <RotateCcw className="w-3 h-3" /> Limpiar
                    </button>
                )}
            </header>

            <FilterGroup label="Audiencia">
                {AUDIENCES.map((a) => (
                    <FilterCheckbox
                        key={a.id}
                        label={a.label}
                        checked={selectedAudiences.includes(a.id)}
                        onChange={() =>
                            onAudiencesChange(toggle(selectedAudiences, a.id))
                        }
                    />
                ))}
            </FilterGroup>

            <FilterGroup label="Categoría">
                {SUBCATEGORIES.map((s) => (
                    <FilterCheckbox
                        key={s.id}
                        label={s.label}
                        checked={selectedSubcategories.includes(s.id)}
                        onChange={() =>
                            onSubcategoriesChange(toggle(selectedSubcategories, s.id))
                        }
                    />
                ))}
            </FilterGroup>

            <FilterGroup label="Estado">
                {(Object.keys(STATUS_LABELS) as ProductStatus[]).map((s) => (
                    <FilterCheckbox
                        key={s}
                        label={STATUS_LABELS[s]}
                        checked={selectedStatuses.includes(s)}
                        onChange={() =>
                            onStatusesChange(toggle(selectedStatuses, s))
                        }
                    />
                ))}
            </FilterGroup>
        </aside>
    );
}

function FilterGroup({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2.5">
            <span className="text-[10px] tracking-[0.18em] uppercase text-gray-500 font-medium">
                {label}
            </span>
            <div className="flex flex-col gap-2">{children}</div>
        </div>
    );
}

function FilterCheckbox({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: () => void;
}) {
    return (
        <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 rounded border-gray-300 bg-white accent-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
            <span
                className={`transition-colors ${
                    checked
                        ? "text-gray-900 font-medium"
                        : "text-gray-700 group-hover:text-gray-900"
                }`}
            >
                {label}
            </span>
        </label>
    );
}
