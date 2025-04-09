import { ThemedText } from '@/src/cp/ThemedText';
import { ThemedView } from '@/src/cp/ThemedView';
import { DZSQLiteSelect } from '@/src/db/drizzlesqlite';
import { tarefasTable } from '@/src/db/schema';
import { TTarefaAttr } from '@/src/model/tarefa';
import { useContextTarefa, TarefaActionTypes } from '@/src/state/tarefa';
import { useEffect } from 'react';
import { FlatList, View, StyleSheet, useWindowDimensions } from 'react-native';
import { eq } from 'drizzle-orm';
import { Status } from '@/src/model/status';

type TarefaListProps = {
    tarefa: TTarefaAttr
}

export function HistoricoScreen() {
    const { state, dispatch } = useContextTarefa();
    const {width} = useWindowDimensions();
    
    const handleEmpty = () => {
        return (
            <View style={styles.emptyContainer}>
                <ThemedText type="defaultSemiBold" style={styles.emptyText}>
                    Sem Tarefas Concluidas
                </ThemedText>
            </View>
        );
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
            </View>
        );
    };
    
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await DZSQLiteSelect<TTarefaAttr>(
                tarefasTable,
                eq(tarefasTable.status, Status.Concluido) // <-- sem array aqui
            );
            dispatch({ type: TarefaActionTypes.ADD_TAREFA_CONCLUIDA, payload: [...data] });
        };
        fetchData();
    }, []);
    
    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={state.TarefasConcluidas}
                renderItem={({ item }) => <ItemRenderer tarefa={item} />}
                ListEmptyComponent={handleEmpty}
                keyExtractor={item => item.idTarefa.toString()}
            />
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    emptyContainer: {
        backgroundColor: '#f0f0f0', 
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
        backgroundColor: '#9ddf87',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginVertical: 20,
        marginHorizontal: 12,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
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
});
