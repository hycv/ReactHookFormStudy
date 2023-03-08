import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default function App() {
  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  //*username 검증
  const nameCheck = (name) => {
    if (name.length < 1) {
      return false;
    } else {
      return true;
    }
  };

  //*email 검증
  const emailCheck = (email) => {
    if (
      email.length < 1 ||
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      return false;
    } else {
      return true;
    }
  };

  //*password 검증
  const passwordCheck = (password) => {
    if (!/^.*[^a-zA-Z0-9].*$/.test(password) || password.length < 5) {
      return false;
    } else {
      return true;
    }
  };

  //*submit 버튼
  const onSubmit = () => {
    Alert.alert("submitted!");
    onChangeEmail(""), onChangeName(""), onChangePassword("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inside_container}>
        <Text style={styles.title}>name</Text>
        <TextInput
          style={styles.input}
          placeholder={"홍길동"}
          onChangeText={onChangeName}
          value={name}
          autoCapitalize="none"
        />
        {!nameCheck(name) && <Text style={styles.warning}>name unvalid</Text>}
      </View>
      <View style={styles.inside_container}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={"hong123@gmail.com"}
          onChangeText={onChangeEmail}
          value={email}
          autoCapitalize="none"
        />
        {!emailCheck(email) && (
          <Text style={styles.warning}>email unvalid</Text>
        )}
      </View>
      <View style={styles.inside_container}>
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder={"5자 이상, 특수기호 하나 이상 포함"}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry
          autoCapitalize="none"
        />
        {!passwordCheck(password) && (
          <Text style={styles.warning}>password unvalid</Text>
        )}
      </View>

      <Button
        title="submit"
        disabled={
          !nameCheck(name) || !emailCheck(email) || !passwordCheck(password)
        }
        onPress={onSubmit}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inside_container: {
    //flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: 300,
    padding: 10,
  },
  title: {
    marginLeft: 10,
  },
  warning: {
    marginLeft: 10,
    color: "red",
  },
});
// !useEffect 를 안쓰고 함수와 그 안에서 UseState 만을 사용해서 구현하다 보니 변수가 더 늘어났을 때 rerender 가 너무 많아서 오류 발생하는 문제 있었음.
