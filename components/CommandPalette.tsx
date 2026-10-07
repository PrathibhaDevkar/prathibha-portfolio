"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactLinks } from "../data/contact";
import { project } from "../data/projects";
import {
  ArrowRightIcon,
  CopyIcon,
  DownloadIcon,
  GitHubIcon,
  HashIcon,
  LinkedInIcon,
  MailIcon,
  SearchIcon,
} from "./ui/icons";

export const OPEN_PALETTE_EVENT = "open-command-palette";

type Command = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
};

const sections = [
  ["about", "About"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["publications", "Research"],
  ["experience", "Experience"],
  ["contact", "Contact"],
] as const;

const openUrl = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = () => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  };

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    return [
      ...sections.map(([id, label]) => ({
        id: `nav-${id}`,
        group: "Navigate",
        label,
        hint: `#${id}`,
        icon: <HashIcon className="w-4 h-4" />,
        run: go(id),
      })),
      ...project
        .filter((p) => p.githubLink)
        .map((p) => ({
          id: `proj-${p.title}`,
          group: "Projects",
          label: p.title,
          hint: p.tags.slice(0, 2).join(" · "),
          icon: <GitHubIcon className="w-4 h-4" />,
          run: () => openUrl(p.githubLink!),
        })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: contactLinks.email,
        icon: <CopyIcon className="w-4 h-4" />,
        run: () => {
          navigator.clipboard?.writeText(contactLinks.email);
          setToast("Email copied to clipboard");
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Open resume",
        hint: "PDF",
        icon: <DownloadIcon className="w-4 h-4" />,
        run: () => openUrl(contactLinks.resumeLink),
      },
      {
        id: "email",
        group: "Actions",
        label: "Send an email",
        icon: <MailIcon className="w-4 h-4" />,
        run: () => (window.location.href = `mailto:${contactLinks.email}`),
      },
      {
        id: "linkedin",
        group: "Links",
        label: "LinkedIn",
        icon: <LinkedInIcon className="w-4 h-4" />,
        run: () => openUrl(contactLinks.linkedin),
      },
      {
        id: "github",
        group: "Links",
        label: "GitHub profile",
        icon: <GitHubIcon className="w-4 h-4" />,
        run: () => openUrl(contactLinks.github),
      },
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${selected}"]`)?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const runAt = (i: number) => {
    const cmd = filtered[i];
    if (!cmd) return;
    close();
    // let the modal unmount before scrolling / opening
    setTimeout(cmd.run, 60);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(selected);
    } else if (e.key === "Escape") {
      close();
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <SearchIcon className="w-4 h-4 text-dim" />
                <input
                  ref={inputRef}
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(0);
                  }}
                  onKeyDown={onInputKey}
                  placeholder="Jump to a section, open a project, copy email…"
                  className="h-14 flex-1 bg-transparent text-sm text-fg placeholder:text-dim focus:outline-none"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-list"
                  aria-activedescendant={filtered[selected] ? `cmd-${filtered[selected].id}` : undefined}
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim">esc</kbd>
              </div>

              <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-10 text-center text-sm text-dim">No results for “{query}”</li>
                )}
                {filtered.map((cmd, i) => {
                  const showGroup = cmd.group !== lastGroup;
                  lastGroup = cmd.group;
                  return (
                    <li key={cmd.id}>
                      {showGroup && (
                        <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                          {cmd.group}
                        </p>
                      )}
                      <button
                        id={`cmd-${cmd.id}`}
                        data-index={i}
                        role="option"
                        aria-selected={i === selected}
                        onPointerMove={() => setSelected(i)}
                        onClick={() => runAt(i)}
                        className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          i === selected ? "text-fg" : "text-muted"
                        }`}
                      >
                        {i === selected && (
                          <motion.span
                            layoutId="palette-highlight"
                            className="absolute inset-0 -z-10 rounded-lg bg-white/[0.06]"
                            transition={{ type: "spring", stiffness: 500, damping: 40 }}
                          />
                        )}
                        <span className={i === selected ? "text-cyan" : "text-dim"}>{cmd.icon}</span>
                        <span className="flex-1 truncate">{cmd.label}</span>
                        {cmd.hint && <span className="truncate font-mono text-[11px] text-dim">{cmd.hint}</span>}
                        {i === selected && <ArrowRightIcon className="w-3.5 h-3.5 text-dim" />}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-dim">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span className="ml-auto">⌘K toggle</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-[90] rounded-full border border-mint/30 bg-surface px-5 py-2.5 text-sm text-mint shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
