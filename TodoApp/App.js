import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Pressable, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Task from './components/Task';
import axios from 'axios';

export default function App() {
    const API_URL = "https://jsonplaceholder.typicode.com/todos";

    // identifiant courant utilisé pour générer l'id d'une tâche
    const [ currentId, setCurrentId ] = useState(5);

    // Liste des tâches
    const [ tasks, setTasks ] = useState([]);

    // Valeur du champ input d'ajout
    const [ newInput, setNewInput ] = useState('');

    // Add Task
    const addTask = () => {
        if (newInput.trim() === '') return;
        let newId = currentId +1;
        setCurrentId(newId);
        setTasks([...tasks, {id:newId.toString(), title:newInput}]);
        setNewInput('');
    }

    // Update Task
    const updateTask = (id, updateTitle) => {
        const updatedTasks = tasks.map((task) =>
            id === task.id ? { ...task, title: updateTitle } : task
        );
        setTasks(updatedTasks);
    }

    // Delete Task
    const deleteTask = (id) => {
        let deletedTasks = [...tasks];
        const index = deletedTasks.findIndex((task) => task.id == id);
        if (index !== -1) {
            deletedTasks.splice(index, 1);
        }
        setTasks(deletedTasks);
    }

    // Récupére des todos à partir de jsonplaceholder
    const initTasks = async () => {
        try {
            // appel l'api et récupère la réponse
            const response = await axios.get(API_URL);
            // construit la list des tâches à partir des données de l'API
            const data = response.data.map((todo) => {
                return {
                    id: todo.id,
                    title: todo.title
                }
            });
            // prends que les 5 premières tâches
            setTasks(data.splice(0, 5));
        } catch (e) {
            console.log("Erreur lors de l'appel à l'API : " + e)
        }
    }

    useEffect(() => {
        initTasks();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Gestion de Tâches</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    value={newInput}
                    onChangeText={setNewInput}
                    placeholder="Ajouter une Tâche ..."
                />
                <Pressable style={styles.btnAdd} onPress={addTask}>
                    <Text>
                        <FontAwesomeIcon icon={faPlus} size={24} style={{ color: "black" }} />
                    </Text>
                </Pressable>
            </View>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <Task
                        task={item}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Style du container principal
    container: {
        flex: 1,
        backgroundColor: '#FEFBFE',
    },
    // Styles du titre
    title: {
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
        marginTop: 40,
        marginBottom: 20,
    },
    // Styles de la view de saisie
    inputView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginBottom: 10,
    },
    // Styles du champ input
    input: {
        flex: 1,
        backgroundColor: "#72B5FF",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "black",
        marginHorizontal: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    // Styles du bouton d'ajout
    btnAdd: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: "#7583FE",
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});
