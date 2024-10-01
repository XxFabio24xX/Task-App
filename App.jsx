import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList, Modal, Pressable } from 'react-native';

export default function App() {
  const [taskInput, setTaskInput] = useState("")
  const [tasksList, setTasksList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [taskSelected, setTaskSelected] = useState({})

  const handlerAddItemToList = () => {
    setTasksList(prevTasksList => [...prevTasksList, { "id": Math.random(), "value": taskInput }])
    setTaskInput("")
  }

  const handleDeleteTask = ()=>{
    setTasksList(tasksList.filter((task)=>task.id != taskSelected.id))
    setModalVisible(false)
  }

  const handleSelectedTask = (item)=>{
    setTaskSelected(item)
    setModalVisible(true)
  }

  const renderTaskItem = ({item})=>(
    <View style={styles.taskContainer}>
        <Text style={styles.taskText}>{item.value}</Text>
        <Button title="x" color="#C71919" onPress={()=>handleSelectedTask(item)} />
      </View>
  )

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.TextInput} 
            placeholder='Añade una tarea'
            onChangeText={(text)=>{setTaskInput(text)}}
            value={taskInput}
          />
          <Button title='+' color="#1D9225" onPress={handlerAddItemToList}/>
        </View>
        <View style={styles.tasksContainer}>
          <Text style={styles.title}>Tareas pendientes:</Text>
          <FlatList 
            data={tasksList}
            keyExtractor={item => item.id} 
            renderItem={renderTaskItem}
          />
        </View>
      </View>
      <StatusBar style="auto" />
      <Modal
        animationType='fade'
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.closeButton} onPress={()=>setModalVisible(false)}>
            <Text style={styles.closeText}>x</Text>
          </Pressable>
          <View style={styles.textsContainer}>
            <Text style={styles.modalTitle}>Confirmar eliminación</Text>
            <Text style={styles.modalText}>{taskSelected.value}</Text>
            <Text style={styles.modalDeleteTextWarning}>
              Esta acción no se puede deshacer
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.cancelBtn}
              onPress={()=>setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={styles.deleteBtn}
              onPress={handleDeleteTask}
            >
              <Text style={styles.deleteText}>Si, eliminar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#464646',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
    borderBottomColor: '#FFF',
    borderBottomWidth: 2
  },  
  TextInput: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 40,
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  tasksContainer: {
    paddingTop: 15,
  },
  title: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
  },
  taskText: {
    color: '#FFF'
  },
  modalContainer: {
    backgroundColor: "#464646",
    flex: 1,
  },
  closeButton:{
    alignSelf: 'flex-end',
    padding:30
  },
  closeText:{
    color:"#fff",
    fontSize:30
  },
  textsContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    color: "#fff",
    fontSize: 14,
  },
  modalDeleteTextWarning: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  buttonsContainer: {
    padding: 30,
    flexDirection:'row',
    gap:10
  },
  deleteBtn: {
    backgroundColor: "#c71919",
    width: "48%",
    padding: 10,
    borderRadius: 15,
  },
  deleteText: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
    fontWeight:'bold'
  },
  cancelBtn: {
    backgroundColor: "#C5C5C5",
    width: "48%",
    padding: 10,
    borderRadius: 15,
  },
  cancelText: {
    textAlign: "center",
    fontSize: 14,
    color: "#474646",
  }
});
