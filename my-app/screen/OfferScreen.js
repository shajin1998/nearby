import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import {
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from "../api/offer"; // <-- axios file

export default function OfferScreen() {
  const [offers, setOffers] = useState([]);
  const [offerName, setOfferName] = useState("");
  const [offerPercentage, setOfferPercentage] = useState("");
  const [offerAmount, setOfferAmount] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchOffers = async () => {
    const data = await getOffers();
    if (!data.error) {
      setOffers(data);
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Auto clear message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSave = async () => {
    if (!offerName || (!offerPercentage && !offerAmount)) {
      setMessage("❌ Offer name and either percentage or amount required");
      return;
    }

    const payload = {
      offer_name: offerName,
      offer_percentage: offerPercentage || null,
      offer_amount: offerAmount ? parseInt(offerAmount) : null,
      product: 1, // TODO: change to selected product id
      category: 1, // TODO: change to selected category id
    };

    let res;

    if (editingId) {
      res = await updateOffer(editingId, payload);
      if (res && !res.error) setMessage("✅ Offer updated successfully!");
      else setMessage(res?.error || "❌ Failed to update offer");
      setEditingId(null);
    } else {
      res = await createOffer(payload);
      if (res && !res.error) setMessage("✅ Offer created successfully!");
      else setMessage(res?.error || "❌ Failed to create offer");
    }

    setOfferName("");
    setOfferPercentage("");
    setOfferAmount("");
    fetchOffers();
  };

  const handleEdit = (offer) => {
    setEditingId(offer.id);
    setOfferName(offer.offer_name);
    setOfferPercentage(offer.offer_percentage || "");
    setOfferAmount(offer.offer_amount ? String(offer.offer_amount) : "");
  };

  const handleDelete = (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this offer?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const res = await deleteOffer(id);
          if (res.success || !res.error) {
            setMessage("✅ Offer deleted successfully!");
            fetchOffers();
          } else {
            setMessage(res?.error || "❌ Failed to delete offer");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Offers</Text>

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

      {/* Form */}
      <TextInput
        style={styles.input}
        placeholder="Enter Offer Name"
        value={offerName}
        onChangeText={setOfferName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Offer Percentage"
        value={offerPercentage}
        onChangeText={setOfferPercentage}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Offer Amount"
        value={offerAmount}
        onChangeText={setOfferAmount}
        keyboardType="numeric"
      />
      <Button
        title={editingId ? "Update Offer" : "Add Offer"}
        onPress={handleSave}
      />

      {/* Offers List */}
      {offers.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
          No offers found. Please add one!
        </Text>
      ) : (
        <FlatList
          data={offers}
          extraData={offers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>
                {item.offer_name} - % {item.offer_percentage || "N/A"} - ₹{" "}
                {item.offer_amount || "N/A"}
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
  container: { flex: 1, padding: 20 },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  actions: { flexDirection: "row", justifyContent: "space-between", width: 120 },
  message: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },
});
