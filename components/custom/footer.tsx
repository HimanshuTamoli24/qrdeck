import { QrCode, Send } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { externals, internals } from "@/config/constant";



export default function Footer() {
  return (
    <footer className="w-full bg-transparent py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="border border-border rounded-2xl p-8">
          <div className="grid grid-cols-12 gap-8 items-start">

            {/* Brand Section */}
            <div className="col-span-12 md:col-span-4 space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <QrCode className="w-6 h-6 text-primary" />
                <span>QRDeck</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Your QR Code Workspace. Fast, secure and beautifully organised for smart sharing.
              </p>
            </div>

            {/* Internal Links */}
            <div className="col-span-6 sm:col-span-4 md:col-span-2">
              <h4 className="text-sm font-semibold text-primary mb-3">Internal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {internals.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* External Links */}
            <div className="col-span-6 sm:col-span-4 md:col-span-2">
              <h4 className="text-sm font-semibold text-primary mb-3">External</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {externals.map((link) => {
                  const Icon = link.icon as any;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex items-center gap-2 hover:text-foreground transition-colors"
                      >
                        {Icon ? <Icon className="w-4 h-4" /> : null}
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-10 sm:col-span-8 md:col-span-4">
              <h4 className="text-sm font-semibold text-primary mb-3">
                Newsletter
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Get product updates, tips and feature drops.
              </p>
              <form className="flex items-center gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full"
                />
                <Button >
                  <Send />
                </Button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
