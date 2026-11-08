# BookNook

### Short Description
BookNook is a full-stack community library web application built to make sharing, borrowing, and managing books effortless. Designed with a decoupled architecture, it pairs a highly interactive Next.js frontend with a resilient, serverless Express.js and MongoDB backend. The platform provides users with a seamless experience to add books to a community shelf, track active borrows, manage return dates, and securely update their profiles. It features robust JWT-based authentication, interactive form validations, and beautifully crafted UI components for a modern, accessible user experience.

**Live Demo:** https://booknook-rust.vercel.app/ </br>
**Backend API:** https://booknook-server-nine-omega.vercel.app/

---

### Key Features

1. **Secure Authentication & Social Login**
   Implemented a highly secure authentication flow using **Better Auth** with the **JWT & JWKS plugins**. It supports traditional Email/Password credentials alongside seamless **Google Social Login**, ensuring users can access their libraries with zero friction.

2. **Smart Route Protection (Edge Middleware)**
   Utilizes a custom Next.js Edge middleware proxy to guard sensitive routes (like `/profile`, `/add-book`, and `/my-borrows`). It actively verifies session cookies against the backend before rendering, smoothly redirecting unauthenticated users to the callback URL while preventing unauthorized layout flashes.

3. **Drag-and-Drop Image Uploads**
   Features an intuitive drag-and-drop zone for book covers and user avatars. Images are automatically processed and hosted via the **ImgBB API**, keeping the database lightweight while serving optimized images through Next.js `<Image/>` components.

4. **Polished UI/UX with Shadcn**
   Built with a heavy emphasis on user experience using **Tailwind CSS** and **Shadcn UI**. The app leverages accessible, interactive components including animated modals and pop-ups for borrowing books, responsive popovers, and beautiful skeleton loading states for data fetching.

5. **Advanced Form Handling**
   All data entry—from complex book submissions to user profile edits—is powered by **React Hook Form**. This ensures instant, client-side validation, clean error states, and a significantly reduced number of unnecessary API calls.

6. **Real-Time Borrowing Engine**
   A robust backend system that handles book availability dynamically. Users are prevented from borrowing out-of-stock books or placing duplicate requests, while MongoDB intelligently increments and decrements available copies when books are borrowed or returned.

7. **Serverless-Optimized Backend**
   The Express backend is engineered specifically for Vercel's serverless environment, utilizing custom MongoDB connection pooling and topology health checks to ensure fast, reliable database queries without memory leaks or stale sockets.

---

### Technologies Used

**Frontend**
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** Shadcn UI (Dialogs, Popovers, UI primitives), React Icons
* **Form Management:** React Hook Form
* **Notifications:** React Hot Toast

**Backend & Database**
* **Framework:** Express.js (Serverless deployment on Vercel)
* **Database:** MongoDB (Atlas)
* **Image Hosting:** ImgBB API

**Authentication & Security**
* **Auth Provider:** Better Auth (Google, GitHub OAuth, Credentials)
* **Token Management:** JWT (JSON Web Tokens), `jose` for JWKS remote verification
* **Security:** Next.js Edge Middleware, CORS protection

