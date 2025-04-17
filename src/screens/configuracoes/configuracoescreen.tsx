import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Pressable, Switch, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/src/cp/ThemedText';
import { ThemedView } from '@/src/cp/ThemedView';
import DeleteScreen from '../delete';
import { DZSQLiteSelect } from '@/src/db/drizzlesqlite';
import { musicaTable } from '@/src/db/schema';
import { MusicaContext } from '@/src/state/musica';
import { useColorScheme } from '@/src/hooks/useColorScheme.web';

export function ConfiguracoesScreen() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [somAtivado, setSomAtivado] = useState(false);
  const musicaCtx = useContext(MusicaContext);
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#333' : '#e0e0e0';

  const carregarMusica = async () => {
    const resultado = await DZSQLiteSelect<{ id: number; somAtivado: number }>(musicaTable);
    if (resultado.length > 0) {
      setSomAtivado(resultado[0].somAtivado === 1);
    }
  };

  const salvarMusica = async (valor: boolean) => {
    setSomAtivado(valor);
    musicaCtx?.dispatch({ type: "SET_SOM", payload: valor });
  };

  useEffect(() => {
    carregarMusica();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Switch para ativar som */}
      <View style={[styles.switchContainer, { backgroundColor }]}>
        <View style={styles.labelIconContainer}>
          <MaterialIcons name="music-note" size={30} color="#000" style={{ marginRight: 6 }} />
          <ThemedText style={styles.switchLabel}>Som</ThemedText>
        </View>
        <View style={styles.switchWrapper}>
          <Switch
            value={somAtivado}
            onValueChange={salvarMusica}
            trackColor={{ false: "#888", true: "#4cd137" }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Botão de apagar tarefas */}
      <Pressable onPress={() => setIsDeleteModalVisible(true)} style={styles.card}>
        <MaterialIcons name="cleaning-services" size={26} color="#fff" style={styles.icon} />
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          Apagar Todas as Tarefas
        </ThemedText>
      </Pressable>

      {/* Modal */}
      <DeleteScreen
        visible={isDeleteModalVisible}
        handleClose={() => setIsDeleteModalVisible(false)}
        tarefa={null}
        mensagem="Tem certeza que deseja apagar todas as tarefas?"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f00',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 12,
    justifyContent: 'center',
    gap: 12,
    width: 350,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 20,
    marginBottom: 70,
    width: 350,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  labelIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  switchWrapper: {
    flexShrink: 0,
  },
});
