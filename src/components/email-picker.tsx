import { useState, type ReactNode } from "react";
import { Mail, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EmailPickerProps {
  email: string;
  subject?: string;
  body?: string;
  children?: ReactNode;
  className?: string;
}

export function EmailPicker({ email, subject = "", body = "", children, className }: EmailPickerProps) {
  const [open, setOpen] = useState(false);
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);

  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${s}&body=${b}`;
  const outlook = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${s}&body=${b}`;
  const mailto = `mailto:${email}${subject || body ? `?subject=${s}&body=${b}` : ""}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className={className ?? "hover:text-primary text-left break-all cursor-pointer"}>
          {children ?? email}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Enviar correo a {email}
          </DialogTitle>
          <DialogDescription>Elige cómo prefieres redactar tu mensaje.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 pt-2">
          <a
            href={gmail}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <GmailIcon />
              <div>
                <p className="font-semibold text-secondary">Gmail</p>
                <p className="text-xs text-muted-foreground">Abrir en mail.google.com</p>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </a>
          <a
            href={outlook}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <OutlookIcon />
              <div>
                <p className="font-semibold text-secondary">Outlook</p>
                <p className="text-xs text-muted-foreground">Abrir en outlook.live.com</p>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </a>
          <a
            href={mailto}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-muted">
                <Mail className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-secondary">Cliente predeterminado</p>
                <p className="text-xs text-muted-foreground">Usar la app de correo del sistema</p>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function GmailIcon() {
  return (
    <div className="grid h-9 w-9 place-items-center rounded-md bg-white border border-border">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#4285F4" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
        <path fill="#34A853" d="M5.455 4.64v7.09L0 7.64V5.457a1.638 1.638 0 0 1 2.618-1.309z"/>
        <path fill="#FBBC04" d="M24 5.457V7.64l-5.455 4.09V4.64l1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
        <path fill="#EA4335" d="M18.545 4.64v7.09L12 16.64 5.455 11.73V4.64L12 9.548z"/>
      </svg>
    </div>
  );
}

function OutlookIcon() {
  return (
    <div className="grid h-9 w-9 place-items-center rounded-md bg-white border border-border">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#0078D4" d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86 0-.46.1-.88.1-.41.33-.74.22-.33.57-.52.36-.2.85-.2.51 0 .87.2.36.19.58.52.23.33.33.75.1.41.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.31.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.39V13.5l-5.9 3.54z"/>
      </svg>
    </div>
  );
}