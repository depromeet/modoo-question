import React, { Component, createContext } from 'react';
import { enterSeminar, getMemberBySeminarId } from '../remotes/api';

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
    seminarId: '',
    userSeminarName: '',
    shortUrl: '',
    numberOfPeople: 0,
    isClickedConfirmButton: false, // 방 입장하기 버튼을 눌렀어?
    isClickedCreateRoomButton: false, // 방 만들기 버튼을 눌렀어?
    isClickedAdminMode: false, // 관리자 모드를 눌렀어?
    isClickedReverseTriangle: false, // 세미나 이름 입력하는 페이지에서 삼각형 버튼 눌렀어?
    isCreatedRoom: false, // 방이 만들어졌어?
    isInvalidRoomNumber: false,
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
    handleInvalidRoomNumber: () => {
      this.setState({ isInvalidRoomNumber: true });
    },
    handleInvalidRoomNumberToFalse: () => {
      this.setState({ isInvalidRoomNumber: false });
    },
    callApiWithEnterSeminarRoom: () => {
      const { first, second, third, fourth } = this.state.roomNumber;
      const userRoomNumber = Number(first + second + third + fourth)

      this.setState({ seminarId: userRoomNumber })
      enterSeminar(userRoomNumber).then(data => {
        this.setState({ userSeminarName: data.member.seminarRoom.seminarTitle })
        this.setState({ shortUrl: data.member.seminarRoom.shortURL })
      }).catch(err => console.log(err));

      getMemberBySeminarId(userRoomNumber).then(data => {
        this.setState({ numberOfPeople: data.length })
      }).catch(err => console.log(err));
    },
    handleChangeSeminarTitle: (event, index) => {
      const newSeminars = this.state.seminars.concat();
      newSeminars[index].title = event.target.value;
      this.setState({ seminars: newSeminars })
    },
    handleChangeSpeakerName: (event, index) => {
      const newSeminars = this.state.seminars.concat();
      newSeminars[index].speakerName = event.target.value;
      this.setState({ seminars: newSeminars })
    },
    handleChangeDivision: (event, index) => {
      const newSeminars = this.state.seminars.concat();
      newSeminars[index].division = event.target.value;
      this.setState({ seminars: newSeminars })
    },
    handleAddSeminarSpeaker: () => {
      const newSeminars = this.state.seminars.concat({title: '', speakerName: '', division: ''})
      this.setState({ seminars: newSeminars })
    },
    handleUserSeminarName: (event) => {
      this.setState({ userSeminarName: event.target.value });
    },
    setUserSeminarName: (title, id, url) => {
      this.setState({ userSeminarName: title });
      this.setState({ seminarId: id });
      this.setState({ shortUrl: url });
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
