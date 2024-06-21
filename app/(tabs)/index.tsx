import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
const index = () => {
  const [taskData, setTaskData] = useState<any>({});
  const [tasks, setTasks] = useState<any>([
    {
      id: 1,
      title: "task 1",
      description: "open Chrome",
      status: "pending",
    },
  ]);

  const indexTaskUpdate = useRef<any>(); //(trỏ đến các thẻ <> và cung cấp các ứng dụng) Lưu trữ gtri tạm thời

  const createTask = () => { //this is for create task
    const _tasks = [...tasks];
    const _taskData = {
      ...taskData,
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    };
    _tasks.push(_taskData);
    setTasks(_tasks);
  };

  const changeText = (keyTask: string) => (data: any) => {
    console.log("keyTask", keyTask, data);
    const _taskData: any = { ...taskData };
    _taskData[keyTask] = data;
    setTaskData(_taskData);
  };

  const goEditItem = (indexEdit: number) => () => {
    const _taskData = tasks[indexEdit];
    setTaskData(_taskData);
    indexTaskUpdate.current = indexEdit;
  };

  const UpdateTask = () => {
    const _tasks = [...tasks];
    _tasks[indexTaskUpdate.current] = taskData;
    setTasks(_tasks);
    setTaskData({});
  };
  const deleteTask = (taskId: number) => () => {
    const _tasks = tasks.filter((item: any) => item.id != taskId);
    setTasks(_tasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.taskName}>
          <TextInput
            editable
            placeholder="Enter task name"
            placeholderTextColor={"#808080"}
            style={styles.taskNameInput}
            onChangeText={changeText("title")}
            value={taskData.title}
          />
        </View>
        <View style={styles.taskDes}>
          <TextInput
            editable
            placeholder="Enter task description"
            placeholderTextColor={"#808080"}
            multiline
            style={styles.taskNameDes}
            onChangeText={changeText("description")}
            value={taskData.description}
          />
        </View>
        <View style={styles.taskStatus}>
          <TextInput
            editable
            placeholder="Enter status"
            placeholderTextColor={"#808080"}
            style={styles.taskNameInput}
            onChangeText={changeText("status")}
            value={taskData.status}
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.buttonView} onPress={createTask}>
            <Text style={styles.buttonText}>Create task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonView} onPress={UpdateTask}>
            <Text style={styles.buttonText}>Update task</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.list}>
        {tasks.map((items: any, index: number) => (
          <View key={index} style={styles.item}>
            <View>
              <Text>{items.title}</Text>
              <Text>{items.description}</Text>
            </View>
            <View style={styles.inRow}>
              <Button title="Edit" onPress={goEditItem(index)} />
              <Button title="Delete" onPress={deleteTask(items.id)} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  form: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  list: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  taskName: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: "90%",
    height: 55,
    marginBottom: 10,
    marginTop: 30,
  },
  taskNameInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
  },
  taskDes: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: "90%",
    height: 55,
    marginVertical: 10,
  },
  taskNameDes: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
  },
  buttonView: {
    backgroundColor: "orange",
    width: 100,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  taskStatus: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: "90%",
    height: 55,
    marginVertical: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  item: {
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 9,
    width: "100%",
  },
  inRow: {
    flexDirection: "row",
  },
});
