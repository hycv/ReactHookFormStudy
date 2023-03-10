import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";

type UserInfoForm = {
  name: string;
  email: string;
  password: string;
};

export default function App() {
  //?const { control, handleSubmit, formState: { errors } } = useForm<UserInfoForm>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //*submit 버튼
  const onSubmit = (data: UserInfoForm) => {
    Alert.alert("submitted!");
    reset();
    //onChangeEmail(""), onChangeName(""), onChangePassword("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inside_container}>
        <Text style={styles.title}>name</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={"예시 : 홍길동"}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
          name="name"
          rules={{ required: "name required" }}
        />
        {errors.name && (
          <Text style={styles.warning}>{errors.name.message}</Text>
        )}
      </View>
      <View style={styles.inside_container}>
        <Text style={styles.title}>Email</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={"hong123@gmail.com"}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
          name="email"
          rules={{
            required: "email required",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "invalid email",
            },
          }}
        />
        {errors.email && (
          <Text style={styles.warning}>{errors.email.message}</Text>
        )}
      </View>
      <View style={styles.inside_container}>
        <Text style={styles.title}>Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={"5자 이상, 특수기호 하나 이상 포함"}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              autoCapitalize="none"
            />
          )}
          name="password"
          rules={{
            required: "password required",
            pattern: {
              value: /^.*[^a-zA-Z0-9].*$/,
              message: "invalid password",
            },
            minLength: {
              value: 5,
              message: "password : at least 5 characters",
            },
          }}
        />
        {errors.password && (
          <Text style={styles.warning}>{errors.password.message}</Text>
        )}
      </View>

      <Button
        title="submit"
        disabled={errors.password || errors.email || errors.name}
        onPress={handleSubmit(onSubmit)}
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
