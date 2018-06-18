import React, { Component } from "react";
import Realm from "realm";
import {
  Platform,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from "react-native";
import { UserSchema } from "./model/user";
import { GroupSchema } from "./model/group";

let realm = new Realm({ schema: [UserSchema, GroupSchema] });

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      localName: "Deo co gi di",
      name: "",
      email: "",
      groupId: "",
      userCount: -1,
      users: []
    };
  }

  componentDidMount = () => {
    AsyncStorage.getItem("name").then(name =>
      this.setState({
        localName: name
      })
    );
    const users = realm
      .objects("User")
      .filtered("name BEGINSWITH[c] 'h'")
      .sorted("name", true)
      .slice(0, 1);
    const userCount = users.length;
    this.setState({
      userCount,
      users
    });
  };

  render() {
    return (
      <View>
        <Text style={{ fontSize: 20 }}>{this.state.localName}</Text>
        <Text style={{ fontSize: 20 }}>User count: {this.state.userCount}</Text>
        <TextInput
          style={{ fontSize: 20 }}
          value={this.state.name}
          placeholder="Name"
          onChangeText={name =>
            this.setState({
              name
            })
          }
        />
        <TextInput
          style={{ fontSize: 20 }}
          value={this.state.email}
          placeholder="Email"
          onChangeText={email =>
            this.setState({
              email
            })
          }
        />
        <TextInput
          style={{ fontSize: 20 }}
          value={this.state.groupId}
          placeholder="Group ID"
          onChangeText={groupId =>
            this.setState({
              groupId
            })
          }
        />
        <TouchableOpacity onPress={this.saveInput}>
          <Text style={{ fontSize: 20 }}>Save</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>Users:</Text>
        {this.state.users.map(item => (
          <Text style={{ fontSize: 20 }}>Name: {item.name}</Text>
        ))}
      </View>
    );
  }

  saveInput = () => {
    const { name, email, groupId } = this.state;
    try {
      realm.write(() => {
        realm.create("User", { name, email: null, groupId });
      });
      alert("create user successfully");
    } catch (e) {
      alert("create user falied: " + e.message);
    }
  };
}

const styles = StyleSheet.create({});
