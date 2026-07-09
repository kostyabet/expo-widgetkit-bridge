export type WidgetFamily =
  | 'systemSmall'
  | 'systemMedium'
  | 'systemLarge'
  | 'systemExtraLarge'
  | 'accessoryCircular'
  | 'accessoryRectangular'
  | 'accessoryInline'
  | 'unknown';

export interface WidgetInfo {
  /** The `kind` string you passed to your `Widget`'s configuration. */
  kind: string;
  /** The widget size family the user placed on the home / lock screen. */
  family: WidgetFamily;
}
