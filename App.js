import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Button,
  FlatList //보이는 항목만 렌더링하고 화면 밖 항목은 나중에 렌더링하는 컴포넌트
} from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  };

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    // 상태 업데이트 함수에 함수를 전달하는 방식 추천: 매개변수 ccg의 값은 react가 자동으로 줌
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals, 
      {text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    })
    console.log('DELETE')
  }

  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color={"#a065ec"}
          onPress={startAddGoalHandler}
        />
        {modalIsVisible && (
          <GoalInput
            onAddGoal={addGoalHandler}
            visible={modalIsVisible}
            onCancel={endAddGoalHandler}
          />
        )}
        <View style={styles.goalsContainer}>
          {/* 외부 View 내에서 스크롤 할 수 있게 됨 */}
          <FlatList
            alwaysBounceVertical={false}
            data={courseGoals}
            // 데이터 항목마다 jsx 코드 생성
            renderItem={(itemData) => {
              //itemData: 값 + 메타데이터까지 포함하는 객체
              return (
                //Native가 View를 컴파일해 얻는 기본 요소: 스타일링은 view 요소에 적용함으로써 두 플랫폼 모두에서 둥근 모서리를 지원함
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                  id={itemData.item.id}
                />
              );
            }}
            // 데이터 항목마다 키를 가져옴
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
  
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },
  goalsContainer: {
    flex: 5,
  },
});
