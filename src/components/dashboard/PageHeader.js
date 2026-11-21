export default function PageHeader({ title, description, actions }) {

    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 className="text-3xl">{title}</h1>

                {description && <p className="mt-2 max-w-2xl text-muted">{description}</p>}
            </div>

            {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
        </div>
    );

}