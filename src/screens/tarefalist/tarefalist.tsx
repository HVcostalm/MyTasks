import { ThemedText } from '@/src/cp/ThemedText';
import { ThemedView } from '@/src/cp/ThemedView';
import { DZSQLiteSelect } from '@/src/db/drizzlesqlite';
import { tarefasTable } from '@/src/db/schema';
import { TTarefaAttr } from '@/src/model/tarefa';
import { useContextTarefa, TarefaActionTypes } from '@/src/state/tarefa';
import { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import AlterScreen from '../alter';
import DeleteScreen from '../delete';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { eq } from 'drizzle-orm';
import { Status } from '@/src/model/status';
import ConcludeScreen from '../conclude';

type TarefaListProps = {
    tarefa: TTarefaAttr
}

export function TarefaListScreen() {
    const { state, dispatch } = useContextTarefa();
    const {width} = useWindowDimensions();

    const [isAlterModalVisible, setIsAlterModalVisible] = useState<boolean>(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
    const [isConcludeModalVisible, setIsConcludeModalVisible] = useState<boolean>(false);
    const [editingTarefa, setEditingTarefa] = useState<TTarefaAttr | null>(null);
    const [deletingTarefa, setDeletingTarefa] = useState<TTarefaAttr | null>(null);
    const [concludingTarefa, setConcludingTarefa] = useState<TTarefaAttr | null>(null);

    const onAlterModalClose = () => {
        setIsAlterModalVisible(false);
    };

    const onDeleteModalClose = () => {
        setIsDeleteModalVisible(false);
    };

    const onConcludeModalClose = () => {
        setIsConcludeModalVisible(false);
    };
    
    const handleEmpty = () => {
        return (
            <View style={styles.emptyContainer}>
                <ThemedText type="defaultSemiBold" style={styles.emptyText}>
                    Sem Tarefas Pendentes
                </ThemedText>
            </View>
        );
    };

    const handleDelete = (tarefa: TTarefaAttr) => {
        setDeletingTarefa(tarefa); // Passa o produto para o estado
        setIsDeleteModalVisible(true);
    };

    const handleEdit = (tarefa: TTarefaAttr) => {
        setEditingTarefa(tarefa); // Passa o produto para o estado
        setIsAlterModalVisible(true);
    };

    const handleConclude = (tarefa: TTarefaAttr) => {
        setConcludingTarefa(tarefa); // Passa o produto para o estado
        setIsConcludeModalVisible(true);
    };

    const ItemRenderer = ({ tarefa }: TarefaListProps) => {
        return (
            <View style={[styles.card, { width: width - 24 }]}>
                <View style={styles.cardText}>
                    <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                        {tarefa.titulo}
                    </ThemedText>

                    <ThemedText type="default" style={styles.cardDescription}>
                        {tarefa.descricao}
                    </ThemedText>
                </View>
                <View style={styles.cardActions}>
                    <Pressable onPress={() => handleConclude(tarefa)}>
                        <FontAwesome name="check-square-o" size={26} color="#666" style={styles.icon} />
                    </Pressable>
                    <Pressable onPress={() => handleEdit(tarefa)}>
                        <FontAwesome name="pencil" size={26} color="#666" style={styles.icon} />
                    </Pressable>
                    <Pressable onPress={() => handleDelete(tarefa)}>
                        <FontAwesome name="trash" size={26} color="#666" style={styles.icon} />
                    </Pressable>
                </View>
            </View>
        );
    };
    
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await DZSQLiteSelect<TTarefaAttr>(
                tarefasTable,
                eq(tarefasTable.status, Status.Pendente) // <-- sem array aqui
            );
            dispatch({ type: TarefaActionTypes.ADD_TAREFA, payload: [...data] });
        };
        fetchData();
    }, []);
    
    return (
        <ThemedView>
            <FlatList
                data={state.Tarefas}
                renderItem={({ item }) => <ItemRenderer tarefa={item} />}
                ListEmptyComponent={handleEmpty}
                keyExtractor={item => item.idTarefa.toString()}
            />
            <AlterScreen visible={isAlterModalVisible} handleClose={onAlterModalClose} tarefa={editingTarefa}/>
            <DeleteScreen visible={isDeleteModalVisible} handleClose={onDeleteModalClose} tarefa={deletingTarefa}/>
            <ConcludeScreen visible={isConcludeModalVisible} handleClose={onConcludeModalClose} tarefa={concludingTarefa}/>
        </ThemedView>
    );
}

interface DividerProps {
    width?: number;
    orientation?: 'horizontal' | 'vertical';
    color?: string;
    dividerStyle?: any;
}

const Divider: React.FC<DividerProps> = ({
    width = 1,
    orientation = 'horizontal',
    color = '#DFE4EA',
    dividerStyle,
}) => {
    const dividerStyles = [
        { width: orientation === 'horizontal' ? '100%' : width },
        { height: orientation === 'vertical' ? '100%' : width },
        { backgroundColor: color },
        dividerStyle,
    ];
    
    return <View style={dividerStyles} />;
};

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
    emptyContainer: {
        backgroundColor: '#f0f0f0', // cinza claro
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignSelf: "auto",
        marginTop: 40,
    },
    emptyText: {
        color: '#333',
        fontSize: 25,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#e0e0e0',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginVertical: 20,
        marginHorizontal: 12,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: 350,
        height: 125,
    },
    
    cardText: {
        flex: 1,
    },
    
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
    },
    
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    
    cardActions: {
        marginLeft: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    
    icon: {
        padding: 0,
    },        
});
