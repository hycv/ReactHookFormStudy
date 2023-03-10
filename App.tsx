import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

type UserInfoForm = {
  name: string;
  email: string;
  password: string;
};

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, dirtyFields },
    reset,
    watch,
  } = useForm<UserInfoForm>({
    mode: "onChange",
    //mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //*test 창 submit, reserve 관리
  const {
    control: controlTest,
    handleSubmit: handleTestSubmit,
    formState: { errors: testErrors },
  } = useForm({
    defaultValues: { test: "" }, //*isDirty 를 위한 defaultValue setting
  });
  //* 위의 submit 말고 또 다른 submit 을 하고 싶다면 이를 따로 위와같이 새로운 control 등을 만들어 관리해야함
  //?

  //*test_with_register 의 submit 관리
  const {
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerError },
    register,
  } = useForm({
    //defaultValues: { register_test: "" }
  });

  const registerTest = register("registerTest", {
    required: "required",
    minLength: { value: 3, message: "minLength>3" },
  });
  //?console.log("데이터가 변할때마다 실시간으로 관찰 가능함\n", watch()); -> 수민님 코드에 있어서 저도 넣어서 테스트 해봤는데 해당 어플에서 watch 로 확인하는것 빼고 또 필요한 이유가 있는건가요? (watch 가 딱히 없어도 작동은 잘 돼서요! )

  //*submit 버튼
  const onSubmit = (data: UserInfoForm) => {
    Alert.alert("submitted!");
    console.log(data);
    reset();
    //onChangeEmail(""), onChangeName(""), onChangePassword("");
  };
  //*test submit 버튼
  const onTestSubmit = (data) => {
    Alert.alert("test submitted!");
    console.log("test!!!", data);
  };
  //*register로 만든 test submit 버튼
  const onRegisterSubmit = (data) => {
    Alert.alert("register test submitted!");
    console.log("register!!!", data);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* //*name */}
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
        {/* //*email */}
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
                //onBlur={onBlur}
                //* 위에서 useForm mode 로 all 을 해줬기 때문에 (validation before submit : includes onChange, onBlur, etc. (onBlur 필요 이유 : 다른 곳으로 넘어갈 때 이전 입력 창에서 다 입력이 안됐다면 에러 메세지 띄워야함 ))
                //*수정 : mode : "onChange" 만 해줘도 잘 됨. 해당 입력창에서 입력할때 뜨는 오류들 잡아내면 되기 때문에
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
        {/* //*password */}
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
        {/* //*submit buton */}
        <Button
          title="submit"
          //disabled={!isDirty} //* 입력창 중 하나라도 입력이 되면 abled -> not good
          // disabled={
          //   !dirtyFields.email || !dirtyFields.name || !dirtyFields.password
          // } //* 입력창의 모든 필드(네임, 이메일, 패스워드)가 입력이 있어야 abled -> validation 못잡음. not enough
          disabled={!isValid} //* 이거 하나만으로 충분. 위와 합칠 필요 없음. isValid 는 기본적으로 False 로 시작하기 때문에 첫 렌더링 화면에서 아무 입력도 없을때 submit 버튼은 활성화 되지 않음
          onPress={handleSubmit(onSubmit)}
        />
        <Text>------------------------------------------------</Text>
        {/* //*controller 내부 세부 설정들 추가 test 용 */}
        <Controller
          control={controlTest}
          rules={{ required: "any input required" }}
          // *아래의 isDirty 와 같이 controller가 가지고 있는 properties 를 이용해 각 controller의 세부 설정들 조절 가능
          // *예시 : 아래와 같이 이 controller 컴포넌트에 딸린 버튼등만 컨트롤 하고 싶다면 이런 세부 설정을 사용해야함
          render={({ field: { onChange, value }, formState: { isDirty } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder={"test"}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
              {testErrors && (
                <Text style={styles.warning}>{testErrors.test?.message}</Text>
              )}
              <Button
                title="Controller properties test(isDirty)"
                onPress={handleTestSubmit(onTestSubmit)}
                disabled={!isDirty}
              />
            </>
          )}
          name="test"
        />

        {/* //? controller 내의 rules 가 submit을 한번 누르기 전에 적용되는 방법은 없는건지? (위 처럼 useForme : mode 쓰지 않고 ) 
      //?https://stackoverflow.com/questions/62825841/react-hook-form-validation-before-submission
      //? 위처럼 mode 알려달라는 방법은 있지만 controller가 왜 초기 submit전에는 validate 을 안하는지에 대한 얘기는 없다. 
      //? chat gpt 한테 물어봤을때 답변은 coltroller 가 lazy validation strategy 를 써서 라고 하는데.. 흠.. */}
        <Text>------------------------------------------------</Text>
        <Text>여기서부터 하단부는 아직 해결 안됨</Text>
        {/* //* controller 안쓰고 register 로 만들어보기 */}
        {/* //? controller 안쓰고 register 로 만들어보려고 했는데, value update 가안돼서 막힘. 
      //?이를 해결하기 위해선 custom register 를 사용해야 하는것으로 보이는데 공식문서를 봤는데도 어떻게 써야 하는지 아직 이해가 잘 안됨. 
      //? 물론 Controller 로 쉽게 할 수 있지만 한번 register 로도 만들어보고 싶었단.. 말입니다 ㅎㅎ.. */}
        {/*//* register : regist input and provide data structure for final result */}

        <View style={styles.inside_container}>
          <Text style={styles.title}>test_with_register</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              register("register_test", {
                value: text,
                required: "required",
                minLength: { value: 3, message: "minLength > 3" },
              })
            }
            //{...register('register_test', {required: true, minLength: {3, message : "at least 3 characters"} }}
            placeholder="register use test"
            autoCapitalize="none"
          />
          {/* //? error 표출 방법?  */}
          {registerError.root && (
            <Text style={styles.warning}>{registerError.root}</Text>
          )}

          <Button
            title="register usage test"
            onPress={handleRegisterSubmit(onRegisterSubmit)}
            //disabled={!isDirty}
          />
        </View>

        {/* //* 2nd try : controller 안쓰고 register 로 만들어보기 */}
        {/* //? 뭘 하는건지 모르겠다... ㅎㅎ  */}
        <View style={styles.inside_container}>
          <Text style={styles.title}>test_with_register2</Text>
          <TextInput
            style={styles.input}
            name={registerTest.name}
            onChange={registerTest.onChange}
            inputRef={registerTest.ref}
            //{...register('register_test', {required: true, minLength: {3, message : "at least 3 characters"} }}
            placeholder="register use test"
            autoCapitalize="none"
          />
          {/* //? error 표출 방법?  */}
          {registerError && (
            <Text style={styles.warning}>{registerError.root}</Text>
          )}

          <Button
            title="register usage test"
            onPress={handleRegisterSubmit(onRegisterSubmit)}
            //disabled={!isDirty}
          />
        </View>
        <StatusBar style="auto" />
        {/* {console.log("errors", errors.password)} */}
        {/* {console.log("isDirty", isDirty)} */}
        {/* {console.log("dirtyfields", dirtyFields)} */}
      </View>
    </ScrollView>
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
