import React, { Component, createContext } from 'react';

const Context = createContext();
const { Provider, Consumer: SampleConsumer } = Context;

class SampleProvider extends Component {
  state = {
    roomNumber: {
      first: '', second: '', third: '', fourth: '',
    },
    password: {
      first: '', second: '', third: '', fourth: '',
    },
    seminars: [
      {title: '', speakerName: '', division: ''},
    ],
    userSeminarName: '',
    isWrongRoomNumber: false, // 방 번호가 잘못되었어?
    isClickedConfirmButton: false, // 방 입장하기 버튼을 눌렀어?
    isClickedCreateRoomButton: false, // 방 만들기 버튼을 눌렀어?
    isClickedAdminMode: false, // 관리자 모드를 눌렀어?
    isClickedReverseTriangle: false, // 세미나 이름 입력하는 페이지에서 삼각형 버튼 눌렀어?
    isCreatedRoom: false, // 방이 만들어졌어?
  }

  actions = {
    handleChangeInput: (value) => {
      this.setState({ roomNumber: value });
    }, 
    handleChangePassword: (value) => {
      this.setState({ password: value });
    }, 
    handleIsClickedConfirmButton: () => {
      this.setState({ isClickedConfirmButton: true })
    },
    handleIsClickedConfirmButtonToFalse: () => {
      this.setState({ isClickedConfirmButton: false })
    },
    handleIsClickedCreateRoomButton: () => {
      this.setState({ isClickedCreateRoomButton: true })
    },
    handleIsClickedAdminMode: () => {
      this.setState({ isClickedAdminMode: true })
    },
    handleIsClickedAdminModeToFalse: () => {
      this.setState({ isClickedAdminMode: false })
    },
    handleIsClickedReverseTriangle: () => {
      this.setState({ isClickedReverseTriangle: true })
      this.setState({ isClickedCreateRoomButton: false })
    },
    handleIsClickedReverseTriangleToFalse: () => {
      this.setState({ isClickedReverseTriangle: false });
    },
    handleIsCreatedRoom: () => {
      this.setState({ isCreatedRoom: true });
    },
    handleChangeSeminarTitle: (event, index) => {
      const newSeminars = this.state.seminars.concat();
      newSeminars[index].title = event.target.value;
      this.setState({
        seminars: newSeminars
      })
    },
    handleChangeSpeakerName: (event, index) => {
      const newSeminars = this.state.seminars.concat();
      newSeminars[index].speakerName = event.target.value;
      this.setState({
        seminars: newSeminars
      })
    },
    handleChangeDivision: (event, index) => {
      const newSeminars = this.state.seminars.concat();
      newSeminars[index].division = event.target.value;
      this.setState({
        seminars: newSeminars
      })
    },
    handleAddSeminarSpeaker: () => {
      const newSeminars = this.state.seminars.concat({title: '', speakerName: '', division: ''})
      this.setState({
        seminars: newSeminars
      })
    },
    handleUserSeminarName: (event) => {
      this.setState({
        userSeminarName: event.target.value
      });
    }
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions }
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}

export {
  SampleProvider,
  SampleConsumer,
};
