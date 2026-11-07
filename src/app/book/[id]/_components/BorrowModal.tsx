"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { format, addDays, isBefore, startOfToday } from "date-fns"
import { BookOpen, CalendarIcon, Loader2, User, Mail } from "lucide-react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { errorToast, successToast } from "@/lib/toasts"
import { useSession } from "@/lib/auth-client"
import { addBorrowBook } from "@/lib/bookOperation"
import getClientToken from "@/lib/clientToken"
import { TBook } from "@/schemas/book"

interface BorrowModalProps {
    book: Pick<TBook, "_id" | "title" | "image" | "authorName"> & {
        isAvailable?: boolean
    }
}

interface UserEditDialogProps {
    // onOpenChange: (open: boolean) => void;
    handleOpen: (open: boolean) => void,
    open: boolean,
    book: TBook;
    userName: string
    userEmail: string
    returnDueDate: Date
    onConfirm: () => void;
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
            <DialogContent className="max-w-md gap-0 rounded-2xl border border-border/80 bg-card p-6 shadow-xl sm:p-7">
                <DialogHeader className="space-y-2 text-left">
                    <div className="flex items-center gap-3">
                        <DialogTitle className="font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                            Borrow Book
                        </DialogTitle>
                    </div>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                        Confirm your borrower details and select your intended return date.
                    </p>
                </DialogHeader>

                {/* Selected Book Mini Card */}
                <div className="mt-4 flex items-center gap-3.5 rounded-xl border border-border/70 bg-muted/30 p-3">
                    <div className="relative aspect-2/3 h-14 w-10 shrink-0 overflow-hidden rounded-xs border border-border/60 bg-muted/60">
                        {book.image ? (
                            <Image
                                src={book.image}
                                alt={book.title}
                                fill
                                sizes="80px"
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
                <div className="mt-5 space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-foreground">User Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                readOnly
                                value={userName}
                                className="h-9 pl-9 bg-muted/50 cursor-not-allowed text-xs text-muted-foreground"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-foreground">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                readOnly
                                value={userEmail}
                                className="h-9 pl-9 bg-muted/50 cursor-not-allowed text-xs text-muted-foreground"
                            />
                        </div>
                    </div>

                    {/* Return Date Picker */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-medium text-foreground">Return Date</Label>
                            <span className="text-[11px] text-muted-foreground">(Max 30 days)</span>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-2 bg-background px-3 text-xs font-normal cursor-not-allowed hover:none"
                        >
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            {returnDueDate ? (
                                format(returnDueDate, "MMM dd, yyyy")
                            ) : (
                                <span className="text-muted-foreground">Pick a return date</span>
                            )}
                        </Button>

                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-6 flex items-center justify-end gap-3">
                    <DialogClose render={         <Button variant="outline" size="sm"
                            onClick={() => handleOpen(false)}
                        >
                            Cancel
                        </Button>}>

                    </DialogClose>

                    <Button
                        size="sm"
                        onClick={onConfirm} >
                        Confirm Borrow

                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )

    // return (
    //     <Dialog open={open} onOpenChange={onOpenChange}>
    //         <DialogContent className="sm:max-w-[425px]">
    //             <DialogHeader>
    //                 <DialogTitle>Edit Profile</DialogTitle>
    //                 <DialogDescription>
    //                     Making changes for <strong>{userName}</strong>.
    //                 </DialogDescription>
    //             </DialogHeader>

    //             <div className="py-4">
    //                 <p className="text-sm text-muted-foreground">
    //                     Dialog body content goes here.
    //                 </p>
    //             </div>

    //             <DialogFooter>
    //                 {/* Cancel Button */}
    //                 <Button
    //                     type="button"
    //                     variant="outline"
    //                     onClick={() => onOpenChange(false)}
    //                 >
    //                     Cancel
    //                 </Button>

    //                 {/* Confirm Button */}
    //                 <Button type="button" onClick={onConfirm}>
    //                     Save Changes
    //                 </Button>
    //             </DialogFooter>
    //         </DialogContent>
    //     </Dialog>
    // )

};

export default BorrowModal;