import { StatusBar } from 'expo-status-bar';
import {
  getCurrentConfigurations,
  reloadAllTimelines,
  reloadTimelines,
  type WidgetInfo,
} from 'expo-widgetkit-bridge';
import { useCallback, useEffect, useState } from 'react';
import { Button, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [kind, setKind] = useState('ScheduleWidget');
  const [installed, setInstalled] = useState<WidgetInfo[]>([]);

  const refresh = useCallback(async () => {
    setInstalled(await getCurrentConfigurations());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>expo-widgetkit-bridge</Text>
      <Text style={styles.subtitle}>Platform: {Platform.OS}</Text>

      <View style={styles.block}>
        <Button title="Reload all timelines" onPress={reloadAllTimelines} />
      </View>

      <View style={styles.block}>
        <Text style={styles.label}>Widget kind</Text>
        <TextInput
          value={kind}
          onChangeText={setKind}
          style={styles.input}
          autoCapitalize="none"
        />
        <Button title="Reload this kind" onPress={() => reloadTimelines(kind)} />
      </View>

      <View style={styles.block}>
        <Button title="Refresh installed widgets" onPress={refresh} />
        <Text style={styles.list}>
          {installed.length === 0
            ? 'No widgets installed yet.'
            : installed.map((w) => `- ${w.kind} (${w.family})`).join('\n')}
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16, backgroundColor: '#fff', paddingTop: 80 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { color: '#666' },
  block: { gap: 8, paddingVertical: 8 },
  label: { fontSize: 14, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  list: { marginTop: 8, fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }) },
});
