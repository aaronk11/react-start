import React from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Button,
    Text
} from 'react-native';
import {
    CENTER_POINTS,
    AREAS,
    CONDITIONS,
    GAME_RESULT_NO,
    GAME_RESULT_USER,
    GAME_RESULT_AI,
    GAME_RESULT_TIE
} from '../constants/game'
import { Circle } from './Circle';
import { Cross } from './Cross';

export class GameBoard extends React.Component {    
    constructor() {
        super()
        this.state= {
            secondUserInputs: [],
            userInputs: [],
            result: GAME_RESULT_NO,
            round: 0
        }
    }

    restart() {
        this.setState({
            userInputs: [],
            secondUserInputs: [],
            result: GAME_RESULT_NO,
            round: 0
        })
    }

    boardClickHandler(e) {
        const { locationX, locationY } = e.nativeEvent
        const { secondUserInputs, userInputs, result, round } = this.state
        if (result !== -1) {
            return
        }
        const inputs = userInputs.concat(secondUserInputs)

        const area = AREAS.find(d =>
            (locationX >= d.startX && locationX <= d.endX) &&
            (locationY >= d.startY && locationY <= d.endY))

        if (area && inputs.every(d => d !== area.id)) {
            if (round % 2) {
                this.setState({ userInputs: userInputs.concat(area.id), round: round + 1 })
            } else {
                this.setState({ secondUserInputs: secondUserInputs.concat(area.id), round: round + 1})
            }
            
            setTimeout(() => {
                this.judgeWinner()
            }, 5)
        }
    }

    generateResultText(result) {
        switch (result) {
          case GAME_RESULT_USER:
            return 'Player 2 wins!'
          case GAME_RESULT_AI:
            return 'Player 1 wins!'
          case GAME_RESULT_TIE:
            return 'You tied!'
          default:
            return ''
        }
      }

    componentDidMount() {
        this.restart()
    }

    isWinner(inputs) {
        return CONDITIONS.some(d => d.every(item => inputs.indexOf(item) !== -1))
    }

    judgeWinner() {
        const { secondUserInputs, userInputs, result } = this.state
        const inputs = userInputs.concat(secondUserInputs)

        if (inputs.length >= 5 ) {
            let res = this.isWinner(userInputs)
            if (res && result !== GAME_RESULT_USER) {
                return this.setState({ result: GAME_RESULT_USER })
            }
            res = this.isWinner(secondUserInputs)
            if (res && result !== GAME_RESULT_AI) {
                return this.setState({ result: GAME_RESULT_AI })
            }
        }

        if (inputs.length === 9 &&
            result === GAME_RESULT_NO && result !== GAME_RESULT_TIE) {
            this.setState({ result: GAME_RESULT_TIE })
        }
    }

  render() {
    const { secondUserInputs, userInputs, result } = this.state
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={e => this.boardClickHandler(e)}>
                <View style={styles.board}>
                    <View style={styles.line}/>
                    <View style={[styles.line, {
                        transform: [
                            { translateX: 200 }
                        ]
                    }]}/>
                    <View style={[styles.line, {
                        height: 3,
                        width: 297,
                        transform: [
                            { translateY: 100 }
                        ]
                    }]}/>
                    <View style={[styles.line, {
                        height: 3,
                        width: 297,
                        transform: [
                            { translateY: 200 }
                        ]
                    }]}/>
                    {
                        userInputs.map((d, i) => (
                            <Circle
                            key={i}
                            xTranslate={CENTER_POINTS[d].x}
                            yTranslate={CENTER_POINTS[d].y}
                            color='deepskyblue'
                            />
                        ))
                    }
                    {
                        secondUserInputs.map((d, i) => (
                            <Cross
                            key={i}
                            xTranslate={CENTER_POINTS[d].x}
                            yTranslate={CENTER_POINTS[d].y}
                            />
                        ))
                    }
                </View>
            </TouchableWithoutFeedback>
            <Text style={styles.text}>{ this.generateResultText(result) }</Text>
            <Button onPress={() => this.restart()} title='Restart'/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    board: {
        width: 300,
        height: 300
    },
    line: {
        height: 297,
        width: 3,
        backgroundColor: 'black',
        position: 'absolute',
        transform: [
            { translateX: 100 }
        ]
    },
    text: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});