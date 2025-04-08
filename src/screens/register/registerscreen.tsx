import ModalScreen from "@/src/cp/ModalScreen";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput, View, Text } from 'react-native';
import { Tarefa } from "@/src/model/tarefa";
import { Button } from "@/src/cp/Button";
import { useContextTarefa, TarefaActionTypes } from "@/src/state/tarefa";
import { DZSQLiteInsert } from "@/src/db/drizzlesqlite";
import { tarefasTable } from "@/src/db/schema";
import { Status } from "@/src/model/status";

type RegisterProps = {
  visible: boolean,
  handleClose: () => void,
}

export function RegisterScreen({ visible, handleClose }: RegisterProps) {
  const { dispatch } = useContextTarefa()

  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")

  const handleClick = async () => {

    if (titulo.trim() === "") {
      Alert.alert("Título obrigatório", "Por favor, informe um título para a tarefa.");
      return;
    }
  
    if (descricao.length > 100) {
      Alert.alert("Descrição muito longa", "A descrição deve ter no máximo 100 caracteres.");
      return;
    }

    const newTarefa = new Tarefa(Status.Pendente, titulo, descricao);

    // 👇 Pegamos só os campos necessários, excluindo o idTarefa
    const { titulo: t, descricao: d, status: s } = newTarefa.data;

    const idGerado = await DZSQLiteInsert(tarefasTable, {
      titulo: t,
      descricao: d,
      status: s,
    });

    newTarefa.idTarefa = idGerado;

    dispatch({ type: TarefaActionTypes.ADD_TAREFA, payload: newTarefa.datacpy });

    handleClose();
};

  

  useEffect(() => {
    if (visible) {
      setTitulo("");
      setDescricao("");
    }
  }, [visible]);

  return (
    <ModalScreen isVisible={visible} onClose={handleClose}>
      <View style={styles.container}>
        <TextInput
          value={titulo}
          placeholder="Título"
          onChangeText={setTitulo}
          style={styles.input}
        />
        <TextInput
          value={descricao}
          placeholder="Descrição (Opcional)"
          onChangeText={setDescricao}
          multiline
          style={[styles.input, styles.descricaoInput]}
        />
        <Text style={[styles.charCounter, descricao.length > 100 && { color: 'red' }]}>
          {descricao.length}/100
        </Text>
        <View style={styles.footer}>
          <Button label="Criar" theme="primary" onPress={handleClick} />
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
  charCounter: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 12,
  },
});
