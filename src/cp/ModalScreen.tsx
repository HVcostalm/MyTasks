import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from './ThemedText';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}>;

export default function ModalScreen({ isVisible, children, onClose,title="Modal" }: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.backDrop}>
        <View style={styles.modalContainer}>
          <View style={styles.titleBar}>
            <View style={styles.titleContainer}>
              <ThemedText type='subtitle'>{title}</ThemedText>
            </View>
            <View style={styles.titleButton}>
              <Pressable onPress={onClose}>
                <MaterialIcons name="close" color="#007bff" size={22} />
              </Pressable>
            </View>
          </View>
          <View style={styles.modalContent}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backDrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    backgroundColor: '#C0C0C0', // cinza claro
    borderRadius: 20,
    borderWidth: 2,
    padding: 16,
    width: 375,
    height: 400,
  },
  modalContent: {
    marginTop: 10,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  titleContainer: {
    display: 'none', // esconder o título do modal na parte superior
  },
});
