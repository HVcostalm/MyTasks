import ModalScreen from "@/src/cp/ModalScreen";
import { ThemedView } from "@/src/cp/ThemedView";
import { Alert, StyleSheet, View } from 'react-native';
import { TTarefaAttr } from "@/src/model/tarefa";
import { Button } from "@/src/cp/Button";
import { useContextTarefa, TarefaActionTypes } from "@/src/state/tarefa";
import { DZSQLiteUpdate } from "@/src/db/drizzlesqlite";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemedText } from "@/src/cp/ThemedText";
import { Status } from "@/src/model/status";
import { tocarMusica } from "@/src/music/playMusic";

type ConcludeProps = {
  visible: boolean,
  handleClose: () => void,
  tarefa: TTarefaAttr | null,
  mensagem?: string
}

export function ConcludeScreen({ visible, handleClose, tarefa, mensagem }: ConcludeProps) {
  const { dispatch } = useContextTarefa();

  const handleClick = async () => {
    if (!tarefa) return;

    const updatedTarefa = {
      ...tarefa,
      status: Status.Concluido,
    };

    await DZSQLiteUpdate(updatedTarefa.idTarefa, updatedTarefa);
    dispatch({ type: TarefaActionTypes.CONCLUDE_TAREFA, payload: updatedTarefa });
    
    await tocarMusica();

    Alert.alert("Tarefa Concluída", "Respect +");

    handleClose();
  };

  return (
    <ModalScreen isVisible={visible} onClose={handleClose} title="">
      <ThemedView style={styles.modalContent}>
        <FontAwesome name="warning" size={48} color="blue" style={styles.warningIcon} />

        {tarefa ? (
          <ThemedText type="defaultCenter" style={styles.message}>
            {mensagem
              ? mensagem
              : `Tem certeza que concluiu a tarefa ${tarefa.titulo}?`}
          </ThemedText>
        ) : (
          <ThemedText type="defaultCenter" style={styles.message}>
            Nenhuma tarefa selecionada
          </ThemedText>
        )}

        <View style={styles.buttonRow}>
          <Button
            label="Sim"
            theme="primary"
            onPress={handleClick}
          />
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
