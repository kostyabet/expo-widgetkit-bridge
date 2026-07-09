import { requireNativeModule } from 'expo-modules-core';

import type { WidgetInfo } from './ExpoWidgetkitBridge.types';

interface Native {
  reloadAllTimelines(): void;
  reloadTimelines(kind: string): void;
  getCurrentConfigurations(): Promise<WidgetInfo[]>;
}

export default requireNativeModule<Native>('ExpoWidgetkitBridge');
