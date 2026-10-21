// The release the download section offers, and its files: named as shellwing's
// scripts/package_*.sh name them. A new release changes VERSION only.

import { GITHUB_URL } from './site';

export const VERSION = '0.1.0';
export const RELEASE_URL = `${GITHUB_URL}/releases/tag/v${VERSION}`;
export const RELEASES_URL = `${GITHUB_URL}/releases`;

const file = (name: string) =>
  `${GITHUB_URL}/releases/download/v${VERSION}/${name}`;
const v = VERSION;

export type OsId = 'macos' | 'windows' | 'linux';

export interface Download {
  label: string;
  /** What it is, beside the label: the file's kind or the machine. */
  note: string;
  href: string;
  /** The one the big button offers for this system. */
  primary?: boolean;
}

export interface Os {
  id: OsId;
  name: string;
  requires: string;
  downloads: Download[];
  /** How to install it, in a few steps. */
  steps: string[];
  /** The first launch, while the releases are not signed. */
  firstRun: string;
  /** Commands to paste, if any. */
  commands?: string;
}

export const systems: Os[] = [
  {
    id: 'macos',
    name: 'macOS',
    requires: 'macOS 11 Big Sur or later',
    downloads: [
      {
        label: 'Apple silicon',
        note: 'M1 and later · .dmg',
        href: file(`shellwing_${v}_macos_aarch64.dmg`),
        primary: true,
      },
      {
        label: 'Intel',
        note: '.dmg',
        href: file(`shellwing_${v}_macos_x86_64.dmg`),
      },
    ],
    steps: [
      'Open the .dmg.',
      'Drag shellwing into Applications.',
      'Open it from Applications or Spotlight.',
    ],
    firstRun:
      'Not signed by Apple yet: the first time, macOS says it cannot check the app. Open System Settings › Privacy & Security and choose Open Anyway (on macOS 14 and older, Control-click the app › Open).',
  },
  {
    id: 'windows',
    name: 'Windows',
    requires: 'Windows 10 or 11, x64',
    downloads: [
      {
        label: 'Installer',
        note: 'x64 · .exe, no admin rights',
        href: file(`shellwing_${v}_windows_x86_64-setup.exe`),
        primary: true,
      },
      {
        label: 'Portable',
        note: 'x64 · .zip',
        href: file(`shellwing_${v}_windows_x86_64.zip`),
      },
    ],
    steps: [
      'Run the installer: it installs for you, without admin rights.',
      'Start shellwing from the Start menu.',
      'Updates install themselves when you say so.',
    ],
    firstRun:
      'Not signed yet: SmartScreen may say "Windows protected your PC". Choose More info › Run anyway.',
  },
  {
    id: 'linux',
    name: 'Linux',
    requires: 'glibc 2.35+ (Ubuntu 22.04, Debian 12 or newer), Wayland or X11',
    downloads: [
      {
        label: 'AppImage',
        note: 'x86_64 · any distribution, updates itself',
        href: file(`shellwing_${v}_linux_x86_64.AppImage`),
        primary: true,
      },
      {
        label: 'AppImage',
        note: 'aarch64',
        href: file(`shellwing_${v}_linux_aarch64.AppImage`),
      },
      {
        label: 'Debian / Ubuntu',
        note: 'amd64 · .deb',
        href: file(`shellwing_${v}_amd64.deb`),
      },
      {
        label: 'Debian / Ubuntu',
        note: 'arm64 · .deb',
        href: file(`shellwing_${v}_arm64.deb`),
      },
      {
        label: 'Tarball',
        note: 'x86_64 · .tar.gz',
        href: file(`shellwing_${v}_linux_x86_64.tar.gz`),
      },
      {
        label: 'Tarball',
        note: 'aarch64 · .tar.gz',
        href: file(`shellwing_${v}_linux_aarch64.tar.gz`),
      },
    ],
    steps: [
      'AppImage: make it executable and run it. It updates itself.',
      'Debian or Ubuntu: install the .deb with apt.',
    ],
    firstRun:
      'Where FUSE is missing, run the AppImage with --appimage-extract-and-run.',
    commands: `# AppImage
chmod +x shellwing_${v}_linux_x86_64.AppImage
./shellwing_${v}_linux_x86_64.AppImage

# Debian / Ubuntu
curl -LO ${file(`shellwing_${v}_amd64.deb`)}
sudo apt install ./shellwing_${v}_amd64.deb`,
  },
];
