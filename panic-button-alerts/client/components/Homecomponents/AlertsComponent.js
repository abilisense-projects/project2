import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from "react-native";
import axios from "../../services/axiosInstance";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../../services/CustomButton";
import { useTranslation } from "react-i18next";

export default function AlertsComp({ onIdChange, onAlertChange, propId }) {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState({ Hard: [], Medium: [], Easy: [] });
  const [lastIdAlert, setLastIdAlert] = useState(null);
  const [occupied, setOccupied] = useState({ flag: false, Id: null });
  const [currentAlerts, setCurrentAlerts] = useState([]);
  const isSmallDevice = Dimensions.get("window").width < 768;

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("/alerts");
        const fetchedAlerts = response.data;
        if (fetchedAlerts && fetchedAlerts.length > 0) {
          onAlertChange({ status: "created", arr: fetchedAlerts });

          const sortedAlerts = { Hard: [], Medium: [], Easy: [] };
          fetchedAlerts.forEach((alert) => {
            if (sortedAlerts.hasOwnProperty(alert.level)) {
              const mylevel = JSON.stringify(alert.level);
              sortedAlerts[alert.level].push(alert);
            } else {
              console.warn(`Unexpected alert level: ${alert.level}`);
            }
          });

          setAlerts(sortedAlerts);
          setCurrentAlerts([
            ...sortedAlerts.Hard,
            ...sortedAlerts.Medium,
            ...sortedAlerts.Easy,
          ]);
          setLastIdAlert(fetchedAlerts[fetchedAlerts.length - 1]._id);
        }
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  useEffect(() => {
    const fetchNewAlerts = async () => {
      if (lastIdAlert) {
        try {
          const response = await axios.get(`/alerts/${lastIdAlert}`);
          const newAlerts = response.data;
          if (newAlerts.isNew && newAlerts.newAlerts.length > 0) {
            onAlertChange({ status: "add", arr: newAlerts });

            const addAlerts = { ...alerts };
            newAlerts.newAlerts.forEach((alert) => {
              if (adddAlerts.hasOwnProperty(alert.level)) {
                addAlerts[alert.level].push(alert);
              } else {
                console.warn(`Unexpected alert level: ${alert.level}`);
              }
            });

            setAlerts(addAlerts);
            setCurrentAlerts([
              ...addAlerts.Hard,
              ...addAlerts.Medium,
              ...addAlerts.Easy,
            ]);
            setLastIdAlert(
              newAlerts.newAlerts[newAlerts.newAlerts.length - 1]._id
            );
          } 
          if (newAlerts.isUpdate && newAlerts.updateAlerts.length > 0) {
            onAlertChange({ status: "update", arr: newAlerts });

            const updatedAlerts = { ...alerts };
            newAlerts.updateAlerts.forEach((alert) => {
              updatedAlerts[alert.level].forEach((alert1) => {
                if (alert._id == alert1._id) {
                  if (
                    alert.status == "not treated" ||
                    alert.status == "in treatment"
                  ) {
                    alert1.update = alert.update;
                    alert1.status = alert.status;
                  } else {const index=updatedAlerts[alert.level].indexOf(alert1)
                  if(index!=1){
                    updatedAlerts[alert.level].splice(index,1)
                  }};
                } else {
                  console.warn(`Unexpected alert level: ${alert.level}`);
                }
              });
            });

            setAlerts(updatedAlerts);
            setCurrentAlerts([
              ...updatedAlerts.Hard,
              ...updatedAlerts.Medium,
              ...updatedAlerts.Easy,
            ]);
          }
        } catch (error) {
          console.error("Failed to fetch new alerts:", error);
        }
      }
    };

    const intervalId = setInterval(fetchNewAlerts, 10000); // Adjust the interval as needed

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [lastIdAlert, alerts]);

  useEffect(() => {
    setOccupied(
      propId ? { flag: true, Id: propId } : { flag: false, Id: null }
    );
  }, [propId]);

  const handleAlertPress = async (alertId, status) => {
    setOccupied({ flag: true, Id: alertId });
    onIdChange(
      alertId,
      status === "in treatment" ? "in treatment" : "for treatment"
    );
    if (status !== "in treatment") {
      try {
        await axios.post("alerts/", { id: alertId, status: "in treatment" });
      } catch (error) {
        console.error("Error updating alert status:", error);
      }
    }
  };

  const renderAlert = (alert) => (
    <TouchableOpacity
      key={alert._id}
      style={[
        styles.alert,
        alert.status === "in treatment" && styles.inTreatment,
        { borderColor: getBackgroundColor(alert.level) },
      ]}
      onPress={() => {
        if (!occupied.flag) {
          handleAlertPress(alert._id, alert.status);
        } else {
        window.alert(
            "You need to close the current alert before changing to a different one."
          );
        }
      }}
    >
      <AntDesign
        name={getNameIcon(alert.level)}
        size={24}
        color={getBackgroundColor(alert.level)}
      />
      <Text style={styles.alertText}>
        {`${alert.distressDescription} ${
          alert.date.split("T")[1].split(".")[0]
        }`}
      </Text>
    </TouchableOpacity>
  );

  const getBackgroundColor = (level) => {
    switch (level) {
      case "Hard":
        return "red";
      case "Medium":
        return "orange";
      case "Easy":
        return "green";
      default:
        return "#ffffff";
    }
  };

  const getNameIcon = (level) => {
    switch (level) {
      case "Hard":
        return "exclamationcircle";
      case "Medium":
        return "warning";
      case "Easy":
        return "infocirlce";
      default:
        return "exclamationcircle";
    }
  };

  const changeState = (level) => {
    setCurrentAlerts(
      level === "All"
        ? [...alerts.Hard, ...alerts.Medium, ...alerts.Easy]
        : [...alerts[level]]
    );
  };

  return (
    <View style={styles.container}>
      {(!isSmallDevice || !occupied.flag) && (
        <View style={styles.buttons}>
          <CustomButton
            label={t(`Hard${alerts.Hard.length}`)}
            onPress={() => changeState("Hard")}
          />
          <CustomButton label="Medium" onPress={() => changeState("Medium")} />
          <CustomButton label="Easy" onPress={() => changeState("Easy")} />
          <CustomButton
            label={t(`All${currentAlerts.length}`)}
            onPress={() => changeState("All")}
          />
        </View>
      )}
      <View style={styles.containerCalls}>
        {currentAlerts.length > 0 ? (
          <ScrollView vertical={true} style={styles.scrollView}>
            {currentAlerts.map((alert) => renderAlert(alert))}
          </ScrollView>
        ) : (
          <Text style={styles.noAlertsText}>No distress alerts</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  containerCalls: {
    display: "flex",
    alignItems: "center",
  },
  alert: {
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: 200,
    padding: 20,
    borderRadius: 5,
  },
  inTreatment: {
    opacity: 0.4,
  },
  alertText: {
    color: "black",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  noAlertsText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },
  scrollView: {
    width: "100%",
    height:'80%'
  },
});
