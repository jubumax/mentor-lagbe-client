import { cn } from "@/lib/utils";


export default function DataTable({ columns, rows, getRowKey, empty }) {
    if (rows.length === 0) return empty ?? null;

    return (
        <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[40rem] text-left text-sm">

                    <thead className="border-b border-line bg-surface-2/60 text-xs font-semibold text-muted">
                        <tr>
                            {columns.map(({ key, header, headerClassName }) => (
                                <th key={key} scope="col" className={cn("px-5 py-3.5", headerClassName)}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-line">
                        {rows.map((row) => (
                            <tr key={getRowKey(row)} className="transition-colors hover:bg-surface-2/40">

                                {columns.map(({ key, render, className }) => (
                                    <td key={key} className={cn("px-5 py-4 align-middle", className)}>
                                        {render ? render(row) : row[key]}
                                    </td>
                                ))}

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}