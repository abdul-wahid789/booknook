
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const  BookContent2 = async () => {
    const session = await auth.api.getSession({
        headers: await headers(), // Note: In Next.js 15+, headers() is an async function
    });

    const email = session?.user?.email;


    return (
        <div>
            {email}
        </div>
    );
};

export default BookContent2;