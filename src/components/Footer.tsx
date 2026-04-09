export default function Footer() {
  return (
    <footer className="border-t border-border/60 px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
      <p>
        Far-Wadaadle · Beddele Farta Soomaali Carabi/Laatiin · Waxaa ❤️ ku
        sameeyay
        <a href="https://github.com/hubaydi" className="transition-colors hover:text-primary">
          {" "}Hobaydi
        </a>
      </p>
      <p className="mt-1">
        Waxay taageertaa{" "}
        <span
          dir="rtl"
          lang="so-Arab"
          style={{
            fontFamily: '"Scheherazade New", serif',
            fontSize: "1.2em",
          }}
        >
          خَط فارودادلي
        </span>{" "}
        n.
      </p>
    </footer>
  );
}
