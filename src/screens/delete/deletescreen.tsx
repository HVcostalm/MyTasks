import ModalScreen from "@/src/cp/ModalScreen";
import { ThemedView } from "@/src/cp/ThemedView";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from 'react-native';
import { TTarefaAttr } from "@/src/model/tarefa";
import { Button } from "@/src/cp/Button";
import { useContextTarefa, TarefaActionTypes } from "@/src/state/tarefa";
import { DZSQLiteDelete, } from "@/src/db/drizzlesqlite";
import { ThemedText } from "@/src/cp/ThemedText";

type DeleteProps = {
  visible: boolean,
  handleClose: () => void,
  tarefa: TTarefaAttr | null,
}

export function DeleteScreen({ visible, handleClose, tarefa }: DeleteProps) {
  const { dispatch } = useContextTarefa();

  const [deletingTarefa, setDeletingTarefa] = useState<TTarefaAttr | null>(tarefa);

  useEffect(() => {
    setDeletingTarefa(tarefa);
  }, [tarefa]); // Atualiza o estado quando o tarefa muda

  const handleDelete = () => {
    if (!deletingTarefa) return;

    dispatch({ type: TarefaActionTypes.DELETE_TAREFA, payload: deletingTarefa });
    DZSQLiteDelete(deletingTarefa.idTarefa); // Deleta do banco de dados
    handleClose();
  };

  return (
    <ModalScreen isVisible={visible} onClose={handleClose} title="Confirmação de Deleção">
      <ThemedView style={styles.container}>
        <ThemedText type="defaultCenter">{deletingTarefa ? `Tem certeza que deseja deletar a tarefa ${deletingTarefa.titulo}?` : "Nenhum tarefa selecionado."}</ThemedText>
        <ThemedView style={styles.container}>
          <Button label="Sim" theme="primary"  onPress={handleDelete}/>
        </ThemedView>
        <ThemedView style={styles.container}>
          <Button label="Não" theme="primary" onPress={handleClose} />
        </ThemedView>
      </ThemedView>
    </ModalScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: 'flex-start',
    padding: 10,
    gap: 8,
  },
  footer: {
    alignSelf: 'center',
  },
  input: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    marginBottom: 6,
    padding: 6,
    width: "100%",
  },
  id: {
    color: "grey",
    margin: 10,
  },
});
