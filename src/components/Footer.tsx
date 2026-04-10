import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
      <div className="mx-auto max-w-5xl space-y-3">
        <p className="">
          Far-Wadaadle · Somali Latin to Arabic Script Converter · Made with ❤️
          by
          <Link
            href="https://github.com/hubaydi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground transition-colors hover:text-primary px-2"
          >
            Hobaydi
          </Link>
        </p>
        <p className="flex items-center justify-center gap-2 text-[14px]">
          <span className="opacity-70">This project is open source.</span>
          <a
            href="https://github.com/hubaydi/far-wadaadle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium text-foreground transition-colors hover:text-primary"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-3 fill-current"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>Contribute on GitHub</span>
          </a>
        </p>
        <p className="mt-1 flex items-center justify-center gap-2">
          Supports{" "}
          <span
            dir="rtl"
            lang="so-Arab"
            style={{
              fontFamily: '"Scheherazade New", serif',
              fontSize: "1.3em",
            }}
          >
            خَط فارودادلي
          </span>{" "}
          script.
        </p>
      </div>
    </footer>
  );
}
