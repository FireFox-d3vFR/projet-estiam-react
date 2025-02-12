import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  Modal,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Task({ task, updateTask, deleteTask }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editInput, setEditInput] = useState(task.title);

  return (
    <View style={styles.task}>
      <Text style={styles.title}>{task.title}</Text>
      <View style={styles.btnGroup}>
        <Pressable style={styles.btn} onPress={() => setShowEditModal(true)}>
          <Text>
            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "black" }} />
          </Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => setShowDeleteModal(true)}>
          <Text>
            <FontAwesomeIcon icon={faTrash} style={{ color: "black" }} />
          </Text>
        </Pressable>
      </View>

      <Modal visible={showEditModal} animationType="slide">
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={editInput}
            onChangeText={setEditInput}
          />
          <Button
            title="Save"
            onPress={() => {
              updateTask(task.id, editInput);
              setShowEditModal(false);
            }}
          />
          <Button title="Cancel" onPress={() => setShowEditModal(false)} />
        </View>
      </Modal>

      <Modal visible={showDeleteModal} animationType="slide">
        <View style={styles.modalView}>
          <Text>Are you sure you want to delete this task?</Text>
          <Button
            title="Yes"
            onPress={() => {
              deleteTask(task.id);
              setShowDeleteModal(false);
            }}
          />
          <Button title="No" onPress={() => setShowDeleteModal(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // styles pour une tache
  task: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D8D8D6",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 8,
  },
  // styles du titre de la tåche
  title: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 18,
    width: "75%",
  },
  // styles du groupe de boutons d'édition et de suppression
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "25%",
  },
  // styles d'un bouton
  btn: {
    backgroundColor: " #7583FE",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  // styles pour centrer un modal
  centeredModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // styles pour la view d'un modal
  modalView: {
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: "#ECE7F2",
  },
  // styles pour le texte d'un modal
  modalText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
    marginBottom: 5,
  },
  // styles pour le champ input pour le modal d'édition
  input: {
    backgroundColor: "#72B5FF",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    marginHorizontal: 10,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  // styles pour le groupe de boutons d'un modal
  modalBtnGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
