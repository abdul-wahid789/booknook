"use client"

import Image from "next/image"
import { format } from "date-fns"
import { BookOpen, CalendarIcon, User, Mail } from "lucide-react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TBook } from "@/schemas/book"

interface UserEditDialogProps {
    handleOpen: (open: boolean) => void
    open: boolean
    book: TBook
    userName: string
    userEmail: string
    returnDueDate: Date
    onConfirm: () => void
}

const BorrowModal = ({
    handleOpen,
    open,
    book,
    userName,
    userEmail,
    returnDueDate,
    onConfirm,
}: UserEditDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-1.5 text-left">
                    <DialogTitle className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        Borrow Book
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground sm:text-sm">
                        Confirm your borrower details and review your intended return date.
                    </DialogDescription>
                </DialogHeader>

                {/* Selected Book Mini Card */}
                <div className="mt-4 flex w-full items-center gap-3 rounded-xl border border-border/70 bg-muted/30 p-3 min-w-0">
                    <div className="relative aspect-[2/3] h-14 w-10 shrink-0 overflow-hidden rounded-md border border-border/60 bg-muted/60">
                        {book.image ? (
                            <Image
                                src={book.image}
                                alt={book.title}
                                fill
                                sizes="40px"
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                <BookOpen className="h-4 w-4" />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h4 className="truncate font-heading text-sm font-medium text-foreground">
                            {book.title}
                        </h4>
                        <p className="truncate text-xs text-muted-foreground">
                            {book.authorName}
                        </p>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="mt-5 space-y-4 w-full">
                    <div className="space-y-1.5 w-full">
                        <Label className="text-xs font-medium text-foreground">User Name</Label>
                        <div className="relative w-full">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                readOnly
                                value={userName}
                                className="h-9 w-full pl-9 bg-muted/50 cursor-not-allowed text-xs text-muted-foreground truncate"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 w-full">
                        <Label className="text-xs font-medium text-foreground">Email Address</Label>
                        <div className="relative w-full">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                readOnly
                                value={userEmail}
                                className="h-9 w-full pl-9 bg-muted/50 cursor-not-allowed text-xs text-muted-foreground truncate"
                            />
                        </div>
                    </div>

                    {/* Return Date Display */}
                    <div className="space-y-1.5 w-full">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-medium text-foreground">Return Date</Label>
                            <span className="text-[11px] text-muted-foreground">(14 days standard)</span>
                        </div>
                        <div className="flex h-9 w-full items-center gap-2 rounded-md border border-input bg-muted/40 px-3 text-xs text-foreground">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="truncate">
                                {returnDueDate ? format(returnDueDate, "MMM dd, yyyy") : "Pick a return date"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <DialogFooter className="mt-6 flex flex-row items-center justify-end gap-2.5 sm:space-x-0">
                    {/* <DialogClose> */}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-9 px-4 text-xs"
                            onClick={() => handleOpen(false)}
                        >
                            Cancel
                        </Button>
                    {/* </DialogClose> */}

                    <Button
                        type="button"
                        size="sm"
                        className="h-9 px-4 text-xs font-medium"
                        onClick={onConfirm}
                    >
                        Confirm Borrow
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default BorrowModal