import { Platform } from 'react-native';

import type { WidgetInfo, WidgetFamily } from './ExpoWidgetkitBridge.types';
import ExpoWidgetkitBridge from './ExpoWidgetkitBridgeModule';

const isIOS = Platform.OS === 'ios';

const LOCK_SCREEN_FAMILIES: readonly WidgetFamily[] = [
  'accessoryCircular',
  'accessoryRectangular',
  'accessoryInline',
];

const isLockScreenFamily = (family: WidgetFamily): boolean =>
  LOCK_SCREEN_FAMILIES.includes(family);

const parseIOSMajorVersion = (): number => {
  if (!isIOS) return 0;
  const raw = Platform.Version;
  const major = parseInt(typeof raw === 'number' ? String(raw) : raw, 10);
  return Number.isFinite(major) ? major : 0;
};

/**
 * Reload every WidgetKit timeline in the app.
 *
 * Equivalent to `WidgetCenter.shared.reloadAllTimelines()` on iOS.
 * No-op on non-iOS platforms.
 */
export function reloadAllTimelines(): void {
  if (!isIOS) return;
  ExpoWidgetkitBridge.reloadAllTimelines();
}

/**
 * Reload timelines for a single widget kind (the `kind` you pass to
 * your `Widget` configuration in Swift).
 *
 * Equivalent to `WidgetCenter.shared.reloadTimelines(ofKind:)` on iOS.
 * No-op on non-iOS platforms.
 */
export function reloadTimelines(kind: string): void {
  if (!isIOS) return;
  ExpoWidgetkitBridge.reloadTimelines(kind);
}

/**
 * List every widget the user currently has installed for this app,
 * including its `kind` and size family.
 *
 * Resolves with an empty array on non-iOS platforms and on iOS < 14.
 */
export async function getCurrentConfigurations(): Promise<WidgetInfo[]> {
  if (!isIOS) return [];
  return ExpoWidgetkitBridge.getCurrentConfigurations();
}

/**
 * Whether Lock Screen widgets (`.accessoryCircular` / `.accessoryRectangular`
 * / `.accessoryInline`) are supported at runtime. `true` only on iOS ≥ 16.
 *
 * Use this to guard onboarding UI that suggests adding a Lock Screen widget.
 */
export function isLockScreenSupported(): boolean {
  return parseIOSMajorVersion() >= 16;
}

/**
 * Widgets the user has installed on the Lock Screen (any of the three
 * accessory families). Empty on non-iOS and iOS < 16.
 */
export async function getLockScreenConfigurations(): Promise<WidgetInfo[]> {
  const all = await getCurrentConfigurations();
  return all.filter((w) => isLockScreenFamily(w.family));
}

/**
 * Widgets the user has installed on the Home Screen (system families).
 * Empty on non-iOS.
 */
export async function getHomeScreenConfigurations(): Promise<WidgetInfo[]> {
  const all = await getCurrentConfigurations();
  return all.filter((w) => !isLockScreenFamily(w.family));
}

/**
 * Whether the user has installed at least one widget of the given `kind`
 * on any screen (Home or Lock). Resolves to `false` on non-iOS.
 */
export async function hasWidget(kind: string): Promise<boolean> {
  const all = await getCurrentConfigurations();
  return all.some((w) => w.kind === kind);
}

/**
 * Families the user has installed for the given `kind`. Order matches
 * `getCurrentConfigurations()`. Empty if none installed or on non-iOS.
 */
export async function getFamiliesForKind(kind: string): Promise<WidgetFamily[]> {
  const all = await getCurrentConfigurations();
  return all.filter((w) => w.kind === kind).map((w) => w.family);
}

export type { WidgetInfo, WidgetFamily };
