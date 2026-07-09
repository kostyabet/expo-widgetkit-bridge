import { Platform } from 'react-native';

import type { WidgetInfo, WidgetFamily } from './ExpoWidgetkitBridge.types';
import ExpoWidgetkitBridge from './ExpoWidgetkitBridgeModule';

const isIOS = Platform.OS === 'ios';

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

export type { WidgetInfo, WidgetFamily };
