"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, addDays, isBefore, startOfToday } from "date-fns"
import { BookOpen, CalendarIcon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { errorToast, successToast } from "@/lib/toasts"
import { useSession } from "@/lib/auth-client"
import { addBorrowBook } from "@/lib/bookOperation"
import getClientToken from "@/lib/clientToken"

interface BorrowActionProps {
  bookId?: string
  bookTitle: string
  isAvailable: boolean
}

export default function BorrowAction({
  bookId,
  bookTitle,
  isAvailable,
}: BorrowActionProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isBorrowing, setIsBorrowing] = useState(false)

  // 14 days
  const [returnDueDate, setReturnDueDate] = useState<Date | undefined>(() =>
    addDays(new Date(), 14)
  )

  const today = startOfToday()
  const maxBorrowDate = addDays(today, 30)

  async function handleBorrow() {
    if (!bookId) return

    if (!session?.user?.email) {
      errorToast("Please sign in to borrow books.")
      router.push("/sign-in")
      return
    }

    if (!returnDueDate) {
      errorToast("Please choose a return date.")
      return
    }

    setIsBorrowing(true)
    const token = await getClientToken()
    console.log(token)
    const res = await addBorrowBook({
      bookId,
      userEmail: session.user.email,
      userName: session.user.name || undefined,
      returnDueDate: returnDueDate.toISOString(),
    }, token)

    if (res.error) {
      errorToast(res.msg)
      return
    }
    successToast(res.msg)
    router.refresh()
    setIsBorrowing(false)

  }

  return (
    <div className="space-y-4 pt-2">
      {/* Return Date Selector */}
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
        <span className="text-xs font-medium text-foreground">
          Planned return:
        </span>
        <Popover>
          <PopoverTrigger>
            <Button
              type="button"
              variant="outline"
              disabled={!isAvailable || isBorrowing}
              className="h-9 justify-start gap-2 bg-background px-3 text-xs font-normal"
            >
              <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
              {returnDueDate ? (
                <span>{format(returnDueDate, "MMM dd, yyyy")}</span>
              ) : (
                <span className="text-muted-foreground">Pick a return date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-border" align="start">
            <Calendar
              mode="single"
              selected={returnDueDate}
              onSelect={setReturnDueDate}
              disabled={(date) =>
                isBefore(date, addDays(today, 1)) || date > maxBorrowDate
              }
            // initialFocus
            />
          </PopoverContent>
        </Popover>
        <span className="text-[11px] text-muted-foreground">
          (Up to 30 days)
        </span>
      </div>

      {/* CTA Button Row */}
      <div className="flex flex-wrap items-center gap-4">
        <Button
          size={"lg"}
          disabled={!isAvailable || isBorrowing || !returnDueDate}
          onClick={handleBorrow}
        >
          {isBorrowing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Borrow This Book</span>
              <BookOpen className="ml-2 h-4 w-4 stroke-2" />
            </>
          )}
        </Button>

        <span className="text-xs text-muted-foreground">
          Keep it until your chosen return date.
        </span>
      </div>
    </div>
  )
}