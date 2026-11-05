import { toast, type ExternalToast } from "sonner";

export const successToast = (message: string, description?: string) => {
  toast.success(message, {
    position: "top-right",
    description,
    style: {
      backgroundColor: "var(--primary)",
      color: "var(--primary-foreground)",
      borderColor: "transparent",
    },
  });
};

export const warningToast = (message: string, description?: string) => {
  toast.warning(message, {
    position: "top-right",
    description,
    style: {
      backgroundColor: "var(--accent)",
      color: "var(--accent-foreground)",
      borderColor: "transparent",
    },
  });
};

export const errorToast = (message: string, description?: string) => {
  toast.error(message, {
    position: "top-right",
    description,
    style: {
      backgroundColor: "var(--destructive)",
      color: "var(--destructive-foreground)",
      borderColor: "transparent",
    },
  });
};

export const infoToast = (message: string, description?: string) => {
  toast.info(message, {
    position: "top-right",
    description,
    style: {
      backgroundColor: "var(--card)",
      color: "var(--card-foreground)",
      borderColor: "var(--border)",
    },
  });
};