// The home page's questions: shown by FAQ.astro, and given to search engines
// as a FAQPage (index.astro). Plain text, as JSON-LD needs.

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: 'Is shellwing free?',
    answer:
      'Yes. shellwing is free software under the GPL-3.0. Every feature on this page works without an account, and syncing through storage of your own (a synced folder, WebDAV, S3 or a Git repository) is free and has no limits.',
  },
  {
    question: 'When can I download it?',
    answer:
      'shellwing is in active development and has no release yet. You can build it from source today on macOS, Windows and Linux: it needs Rust 1.95+ and Zig 0.16. Star the repository on GitHub to hear about the first release.',
  },
  {
    question: 'Why Rust and Zig?',
    answer:
      'The app is Rust, drawn with GPUI, the GPU UI framework Zed is built on. The terminal itself is libghostty-vt, the core of the Ghostty terminal, written in Zig: it parses on its own thread, so heavy output never stalls the window. No browser engine, no Electron.',
  },
  {
    question: 'Can it replace my terminal app?',
    answer:
      'Yes. A local terminal opens beside the SSH tabs with your own shell ($SHELL, or PowerShell on Windows), or set local_shell to fish or anything else. Splitting, find, snippets and typing into every pane work the same as over SSH.',
  },
  {
    question: 'Do I have to move my hosts over?',
    answer:
      'No. shellwing reads ~/.ssh/config as OpenSSH does: aliases, ProxyJump, forwards, identity files, known_hosts, the agent and certificates. Saved hosts in hosts.toml add groups, colors, tags and more on top.',
  },
  {
    question: 'Where are my passwords and keys kept?',
    answer:
      'In the vault, an encrypted file on your device, unlocked through the system keychain, Windows Hello, Touch ID or a passphrase. When it syncs, it is encrypted end to end before it leaves the device: the storage it syncs through sees only ciphertext. A recovery key always opens it.',
  },
  {
    question: 'Are environments safe to load on a server?',
    answer:
      'Nothing is loaded unless you choose it. Values are sent with the terminal echo off and the command kept out of the shell history, and a snippet that needs an environment runs in a subshell that drops it when done. While loaded, root on that server can read them, so load them on servers you trust and unload them when done.',
  },
  {
    question: 'Is there a mobile app?',
    answer:
      'Not yet. The core of shellwing has no UI and already builds for iOS and Android, so mobile apps can follow; the desktop app comes first.',
  },
];
