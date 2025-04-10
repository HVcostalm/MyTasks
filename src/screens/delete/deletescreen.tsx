import ModalScreen from "@/src/cp/ModalScreen";
import { ThemedView } from "@/src/cp/ThemedView";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from 'react-native';
import { TTarefaAttr } from "@/src/model/tarefa";
import { Button } from "@/src/cp/Button";
import { useContextTarefa, TarefaActionTypes } from "@/src/state/tarefa";
import { DZSQLiteDelete, DZSQLiteDeleteAll } from "@/src/db/drizzlesqlite";
import { ThemedText } from "@/src/cp/ThemedText";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

type DeleteProps = {
  visible: boolean,
  handleClose: () => void,
  tarefa: TTarefaAttr | null,
  mensagem?: string
}

export function DeleteScreen({ visible, handleClose, tarefa, mensagem }: DeleteProps) {
  const { dispatch } = useContextTarefa();
  const router = useRouter();
  const [deletingTarefa, setDeletingTarefa] = useState<TTarefaAttr | null>(tarefa);

  useEffect(() => {
    setDeletingTarefa(tarefa);
  }, [tarefa]);

  const handleDelete = async () => {
    if (deletingTarefa) {
      dispatch({ type: TarefaActionTypes.DELETE_TAREFA, payload: deletingTarefa });
      await DZSQLiteDelete(deletingTarefa.idTarefa);
      Alert.alert("Sucesso", "Tarefa apagada!");
    } else {
      await DZSQLiteDeleteAll();
      Alert.alert("Sucesso", "Todas as tarefas foram apagadas!");
      dispatch({ type: TarefaActionTypes.DELETE_ALL_TAREFAS });
    }
    router.push("/");
    handleClose();
  };
  

  return (
    <ModalScreen isVisible={visible} onClose={handleClose} title="">
      <ThemedView style={styles.modalContent}>
        <FontAwesome name="warning" size={48} color="red" style={styles.warningIcon} />

        <ThemedText type="defaultCenter" style={styles.message}>
          {mensagem
            ? mensagem
            : deletingTarefa
              ? `Tem certeza que deseja apagar a tarefa ${deletingTarefa.titulo}?`
              : "Nenhuma tarefa selecionada."}
        </ThemedText>

        <View style={styles.buttonRow}>
          <Button label="Sim" theme="primary" onPress={handleDelete} />
          <Button label="Não" theme="primary" onPress={handleClose} />
        </View>
      </ThemedView>
    </ModalScreen>
  );
}


const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    height: 300,
  },
  warningIcon: {
    marginBottom: 8,
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    color: '#222',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    height: 100,
  },
});