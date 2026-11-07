import { differenceInCalendarDays, parseISO } from "date-fns";

export default function getDueStatus(dueDateStr: string | Date) {
    const targetDate = typeof dueDateStr === "string" ?
    parseISO(dueDateStr) : new Date(dueDateStr);
    const diff = differenceInCalendarDays(targetDate, new Date());
    if (diff < 0) {
        return {
            label: `Overdue by ${Math.abs(diff)}d`,
            variant: "destructive" as const,
        };
    }
    if (diff === 0) {
        return { label: "Due today", variant: "warning" as const };
    }
    return { label: `${diff} days left`, variant: "normal" as const };
};