import { Button } from "@/src/cp/Button";
import { ThemedView } from "@/src/cp/ThemedView";
import { Pressable, StyleSheet } from 'react-native';
import { useState } from "react";
import RegisterScreen from "../register";
import TarefaListScreen from "../tarefalist";
import IconSymbol from "@/src/cp/iconsymbol";

export function HomeScreen() {
  
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState<boolean>(false);

  const onRegisterModalClose = () => {
    setIsRegisterModalVisible(false);
  };

  return (
    <ThemedView style={styles.container}>   

       <ThemedView style={styles.content}>
          <TarefaListScreen />
       </ThemedView>

      <Pressable style={styles.floatingButton} onPress={() => setIsRegisterModalVisible(true)}>
        <IconSymbol name="plus.circle.fill" size={50} color="blue" />
      </Pressable>

      <RegisterScreen visible={isRegisterModalVisible} handleClose={onRegisterModalClose} />

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  footerContainer: {
    height: 60,
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});