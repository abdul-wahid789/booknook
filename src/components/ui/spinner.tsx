import { cn } from "cn"
import { BiLoaderCircle } from "react-icons/bi";


function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <BiLoaderCircle  data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
