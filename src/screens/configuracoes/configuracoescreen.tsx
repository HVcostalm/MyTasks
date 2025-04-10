import { ThemedText } from '@/src/cp/ThemedText';
import { ThemedView } from '@/src/cp/ThemedView';
import { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import DeleteScreen from '../delete';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export function ConfiguracoesScreen() {
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);

    const onDeleteModalClose = () => {
        setIsDeleteModalVisible(false);
    };

    const handleDelete = () => {
        setIsDeleteModalVisible(true);
    };

    return (
        <ThemedView style={styles.container}>
            <Pressable onPress={handleDelete} style={styles.card}>
                <MaterialIcons name="cleaning-services" size={26} color="#fff" style={styles.icon} />
                <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                    Apagar Todas as Tarefas
                </ThemedText>
            </Pressable>

            <DeleteScreen
                visible={isDeleteModalVisible}
                handleClose={onDeleteModalClose}
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
});
