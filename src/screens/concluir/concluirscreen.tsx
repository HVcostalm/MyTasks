import ModalScreen from "@/src/cp/ModalScreen";
import { ThemedView } from "@/src/cp/ThemedView";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from 'react-native';
import { TTarefaAttr } from "@/src/model/tarefa";
import { Button } from "@/src/cp/Button";
import { useContextTarefa, TarefaActionTypes } from "@/src/state/tarefa";
import { DZSQLiteUpdate } from "@/src/db/drizzlesqlite";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemedText } from "@/src/cp/ThemedText";
import { Status } from "@/src/model/status";

type ConcludeProps = {
  visible: boolean,
  handleClose: () => void,
  tarefa: TTarefaAttr | null,
  mensagem?: string
}

export function ConcludeScreen({ visible, handleClose, tarefa, mensagem }: ConcludeProps) {
  const { dispatch } = useContextTarefa();

  // Estado inicial para edição do produto
  const [editingTarefa, setEditingTarefa] = useState<TTarefaAttr | null>(tarefa);
  const [editedTitulo, setEditedTitulo] = useState(tarefa?.titulo || "");
  const [editedDescricao, setEditedDescricao] = useState(tarefa?.descricao || "");

  // Sempre que o produto mudar, atualiza o estado de edição
  useEffect(() => {
    if (tarefa) {
      setEditingTarefa(tarefa);
      setEditedTitulo(tarefa.titulo);
      setEditedDescricao(tarefa.descricao);
    }
  }, [tarefa]);

  const handleClick = () => {
    if (editingTarefa) {
      const updatedTarefa = {
        ...editingTarefa,
        idTarefa: editingTarefa.idTarefa,
        titulo: editedTitulo,
        descricao: editedDescricao,
        status: Status.Concluido,
      };

      DZSQLiteUpdate(updatedTarefa.idTarefa, updatedTarefa); // Atualizando no banco de dados
      dispatch({ type: TarefaActionTypes.ALTER_TAREFA, payload: updatedTarefa });
      setEditingTarefa(null);
      handleClose(); // Fechar o modal
    }
  }

  return (
    <ModalScreen isVisible={visible} onClose={handleClose} title="">
    <ThemedView style={styles.modalContent}>
      <FontAwesome name="warning" size={48} color="blue" style={styles.warningIcon} />

      <ThemedText type="defaultCenter" style={styles.message}>
        {mensagem
          ? mensagem
          : editingTarefa
            ? `Tem certeza que concluiu a tarefa ${editingTarefa.titulo}?`
            : "Nenhuma tarefa selecionada"}
      </ThemedText>

      <View style={styles.buttonRow}>
        <Button label="Sim" theme="primary" onPress={handleClick} />
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
