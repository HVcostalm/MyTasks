import ModalScreen from "@/src/cp/ModalScreen";
import { ThemedView } from "@/src/cp/ThemedView";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from 'react-native';
import { TTarefaAttr } from "@/src/model/tarefa";
import { Button } from "@/src/cp/Button";
import { useContextTarefa, TarefaActionTypes } from "@/src/state/tarefa";
import { DZSQLiteUpdate } from "@/src/db/drizzlesqlite";

type AlterProps = {
  visible: boolean,
  handleClose: () => void,
  tarefa: TTarefaAttr | null,
}

export function AlterScreen({ visible, handleClose, tarefa }: AlterProps) {
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
        status: editingTarefa.status,
      };

      DZSQLiteUpdate(updatedTarefa.idTarefa, updatedTarefa); // Atualizando no banco de dados
      dispatch({ type: TarefaActionTypes.ALTER_TAREFA, payload: updatedTarefa });
      setEditingTarefa(null);
      handleClose(); // Fechar o modal
    }
  }

  return (
    <ModalScreen isVisible={visible} onClose={handleClose} title="Alteração do Produto">
      <ThemedView style={styles.container}>
        <View style={styles.input}>
          <TextInput 
            value={editedTitulo}
            placeholder="Título"
            autoCorrect={false}
            onChangeText={(text) => setEditedTitulo(text)} 
          />
        </View>

        <View style={styles.input}>
          <TextInput 
            value={editedDescricao}
            placeholder="Descrição (Opcional)"
            autoCorrect={false}
            onChangeText={(text) => setEditedDescricao(text)} 
          />
        </View>
        <ThemedView style={styles.footer}>
          <Button label="Alterar" iconame="save" theme="primary" onPress={handleClick} />
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
