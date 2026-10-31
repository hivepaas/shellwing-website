// The release the download section offers, and its files: named as shellwing's
// scripts/package_*.sh name them. A new release changes VERSION only.

import { GITHUB_URL } from './site';

export const VERSION = '0.2.1';
export const RELEASE_URL = `${GITHUB_URL}/releases/tag/v${VERSION}`;
export const RELEASES_URL = `${GITHUB_URL}/releases`;

const file = (name: string) =>
  `${GITHUB_URL}/releases/download/v${VERSION}/${name}`;
const v = VERSION;

export type OsId = 'macos' | 'windows' | 'linux' | 'ios' | 'android';

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
  /** The first launch: what the system asks. */
  firstRun: string;
  /** Commands to paste, if any. */
  commands?: string;
}

/** A system with an app on the way: a tab that says so, and no files. */
export interface ComingSoon {
  id: OsId;
  name: string;
  text: string;
}

export const systems: Os[] = [
  {
    id: 'macos',
    name: 'macOS',
    requires: 'macOS 13 Ventura or later',
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
      'Signed and notarized by Apple. macOS asks once whether to open an app downloaded from the internet: choose Open.',
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
    requires:
      'glibc 2.35+ (Ubuntu 22.04, Debian 12, Fedora, openSUSE Leap 15.6 or newer), Wayland or X11',
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
        label: 'Fedora / openSUSE',
        note: 'x86_64 · .rpm',
        href: file(`shellwing_${v}_x86_64.rpm`),
      },
      {
        label: 'Fedora / openSUSE',
        note: 'aarch64 · .rpm',
        href: file(`shellwing_${v}_aarch64.rpm`),
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
      'Fedora: install the .rpm with dnf. openSUSE: with zypper.',
      'The .deb and .rpm do not update themselves: the app shows the commands that do.',
    ],
    firstRun:
      'Where FUSE is missing, run the AppImage with --appimage-extract-and-run. The .rpm is not signed: dnf warns and goes on, and zypper needs --no-gpg-checks.',
    commands: `# AppImage
chmod +x shellwing_${v}_linux_x86_64.AppImage
./shellwing_${v}_linux_x86_64.AppImage

# Debian / Ubuntu
curl -LO ${file(`shellwing_${v}_amd64.deb`)}
sudo apt install ./shellwing_${v}_amd64.deb

# Fedora
curl -LO ${file(`shellwing_${v}_x86_64.rpm`)}
sudo dnf install ./shellwing_${v}_x86_64.rpm

# openSUSE
curl -LO ${file(`shellwing_${v}_x86_64.rpm`)}
sudo zypper --no-gpg-checks install ./shellwing_${v}_x86_64.rpm`,
  },
];

export const comingSoon: ComingSoon[] = [
  {
    id: 'ios',
    name: 'iOS',
    text: 'shellwing for iPhone is coming soon, with your hosts, vault and sync.',
  },
  {
    id: 'android',
    name: 'Android',
    text: 'shellwing for Android is coming soon, with your hosts, vault and sync.',
  },
];
