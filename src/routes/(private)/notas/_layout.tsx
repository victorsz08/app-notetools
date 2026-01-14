import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarNotes } from "./-features/sidebar-notes";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fecthNotes } from "@/infra/notes/list";

const getNotes = queryOptions({
    queryKey: ["get-notes"],
    queryFn: fecthNotes,
});

type SearchNoteParams = {
    id?: string;
};

export const Route = createFileRoute("/(private)/notas")({
    validateSearch: (search: Record<string, unknown>): SearchNoteParams => {
        return {
            id: typeof search.id === "string" ? search.id : undefined,
        };
    },
    component: LayoutNote,
});

function LayoutNote() {
    const { data } = useSuspenseQuery(getNotes);

    return (
        <main className="flex gap-1">
            <SidebarNotes items={data.notes} />
            <Outlet />
        </main>
    );
}
