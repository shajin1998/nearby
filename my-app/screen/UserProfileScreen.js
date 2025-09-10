            import React, { useEffect, useState,useContext } from "react";
            import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
            import Ionicons from "react-native-vector-icons/Ionicons"; 
            import { useNavigation } from "@react-navigation/native"; 
            import {
              getUserProfiles,
              createUserProfile,
              updateUserProfile,
              deleteUserProfile,
            } from "../api/userprofile";

            export default function UserProfileScreen(profile) {
              console.log("profile",profile)
              const [profiles, setProfiles] = useState([]);
              const [name, setName] = useState("");
              const [phone, setPhone] = useState("");
              const [editingId, setEditingId] = useState(null);
              const [message, setMessage] = useState("");
              const navigation = useNavigation(); 
              const fetchProfiles = async () => {
                const data = await getUserProfiles();
                console.log("profile data", data);
                if (!data.error) {
                  setProfiles(data);
                } else {
                  setMessage(`❌ ${data.error}`);
                }
              };

              useEffect(() => {
                fetchProfiles();
              }, []);

              useEffect(() => {
                if (message) {
                  const timer = setTimeout(() => setMessage(""), 3000);
                  return () => clearTimeout(timer);
                }
              }, [message]);

              const handleSave = async () => {
                if (!name || !phone) {
                  setMessage("❌ Name and phone required");
                  return;
                }

                const payload = { name, phone };
                let res;

                if (editingId) {
                  res = await updateUserProfile(editingId, payload);
                  if (res && !res.error) setMessage("✅ Profile updated successfully!");
                  else setMessage(res?.error || "❌ Failed to update profile");
                  setEditingId(null);
                } else {
                  res = await createUserProfile(payload);
                  if (res && !res.error) setMessage("✅ Profile created successfully!");
                  else setMessage(res?.error || "❌ Failed to create profile");
                }

                setName("");
                setPhone("");
                fetchProfiles();
              };

              const handleEdit = (profile) => {
                setEditingId(profile.id);
                setName(profile.name);
                setPhone(profile.phone);
              };

              const handleDelete = async (id) => {
                const res = await deleteUserProfile(id);
                if (res.success) {
                  setMessage("✅ Profile deleted successfully!");
                  fetchProfiles();
                } else {
                  setMessage(res?.error || "❌ Failed to delete profile");
                }
              };

              return (
                <View style={styles.container}>
                 
                  <View style={styles.header}>
                    <Text style={styles.heading}>User Profiles</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("ProfileDetail", { profile: profile }) }>
                      <Ionicons name="person-circle-outline" size={40} color="#333" />
                    </TouchableOpacity>
                  </View>

                  {message ? (
                    <Text
                      style={[
                        styles.message,
                        message.startsWith("✅") ? { color: "green" } : { color: "red" },
                      ]}
                    >
                      {message}
                    </Text>
                  ) : null}

                  <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    value={name}
                    onChangeText={setName}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                  <Button
                    title={editingId ? "Update Profile" : "Add Profile"}
                    onPress={handleSave}
                  />

                  {profiles.length === 0 ? (
                    <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
                      No profiles found. Please add one!
                    </Text>
                  ) : (
                    <FlatList
                      data={profiles}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <View style={styles.item}>
                          <Text>
                            {item.name} - {item.phone}
                          </Text>
                          <View style={styles.actions}>
                            <Button title="Edit" onPress={() => handleEdit(item)} />
                            <Button
                              title="Delete"
                              color="red"
                              onPress={() => handleDelete(item.id)}
                            />
                          </View>
                        </View>
                      )}
                    />
                  )}
                </View>
                
              );
            }

            const styles = StyleSheet.create({
              container: { flex: 1, padding: 20, marginTop:30, },
              header: {
                flexDirection: "row",
                justifyContent: "space-between", 
                marginBottom: 10,
                marginLeft:80
              },
              heading: { fontSize: 22, fontWeight: "bold", },
              input: {
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                marginBottom: 10,
                borderRadius: 5,
                marginTop:10
              },
              item: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
                borderBottomWidth: 1,
                borderColor: "#eee",
              },
              actions: { flexDirection: "row", gap: 10 },
              message: {
                fontSize: 16,
                marginBottom: 10,
                fontWeight: "600",
                textAlign: "center",
              },
            });
