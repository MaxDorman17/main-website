import { Navigation } from "@/components/navigation"
import { BookingCalendar } from "@/components/booking-calendar"

export default function BookPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen">
        <BookingCalendar />
      </div>
    </>
  )
}
