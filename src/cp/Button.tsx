import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type IconSymbolName = React.ComponentProps<typeof FontAwesome>['name'];

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
  iconame?: IconSymbolName;
};

export function Button({ label, theme, onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.primaryButton} onPress={onPress}>
          <Text style={styles.primaryButtonText}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonWrapper}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,          
    borderColor: '#45454B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: 200,
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 25,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonLabel: {
    color: '#000',
    fontSize: 16,
  },
});
