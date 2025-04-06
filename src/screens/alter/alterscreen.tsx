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
      <ModalScreen isVisible={visible} onClose={handleClose} title="">
        <View style={styles.container}>
          <TextInput
            value={editedTitulo}
            placeholder="Título"
            onChangeText={setEditedTitulo}
            style={styles.input}
          />
          <TextInput
            value={editedDescricao}
            placeholder="Descrição (Opcional)"
            onChangeText={setEditedDescricao}
            multiline
            style={[styles.input, styles.descricaoInput]}
          />
          <View style={styles.footer}>
            <Button label="Salvar" theme="primary" onPress={handleClick} />
          </View>
        </View>
      </ModalScreen>
    );
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    alignSelf: 'center',
    paddingTop: 10,
  },
  input: {
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    width: 310,
  },
  descricaoInput: {
    height: 175,
    textAlignVertical: 'top',
  },
  footer: {
    alignItems: 'center',
  },
});
