import { StyleSheet, View, TextInput, Button, Modal, Image } from 'react-native';
import { useState } from 'react'

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState("");
    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText);
    };

    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
        // 입력 시마다 빈칸이 되도록 설정
    }

    console.log('GoalInput component rendered.')
    
    return (
      <Modal visible={props.visible} animationType="slide">
        <View style={styles.inputContainer}>
          <Image source={require('../assets/images/goal.png')} style={styles.images}/>
          <TextInput
            style={styles.textInput}
            placeholder="Your courser goal!"
            onChangeText={goalInputHandler}
            value={enteredGoalText}
            //value에 enteredGoalText를 연결하면, 초기화 때마다 입력란에도 반영이 됨
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color='#f31282'/>
            </View>
            <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color='#b180f0'/>
            </View>
          </View>
          {/* 버튼은 style 프로퍼티를 지원하지 않음 */}
        </View>
      </Modal>
    );
};

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b',
      },
      images: {
        width: 100,
        height: 100,
        margin: 20
      },
      textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '100%', //퍼센트로 크기 설정 가능할 땐 문자열로 써야 함.
        padding: 16,
        borderColor: '#e4d0ff',
        borderRadius: 6,
        backgroundColor: '#e4d0ff',
        color: '#120438'
      },
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 16,
      },
      button: {
        width: 100,
        marginHorizontal: 8
      }
})