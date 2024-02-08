import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
<<<<<<<<< Temporary merge branch 1
  TouchableOpacity,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import axios from "../../services/axiosInstance";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Loader from "../cors/Loader";


export default function AlertsComp({ onIdChange, onAlertChange, propId }) {
  const { t } = useTranslation();
  const {colors} = useTheme();
    const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState({ Hard: [], Medium: [], Easy: [] });
  const [lastIdAlert, setLastIdAlert] = useState(null);
  const [occupied, setOccupied] = useState({ flag: false, Id: null });
  const [currentAlerts, setCurrentAlerts] = useState([]);

  const isSmallDevice = Dimensions.get("window").width < 768;

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setIsLoading(true)
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
          setIsLoading(false)
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
          <Pressable  onPress={() => changeState("Hard")} style={[styles.button,{ borderColor: getBackgroundColor('Hard')}]}>
            <Text style={styles.buttonsText}>{t(`Hard ${'\n'}${alerts.Hard.length}`)}</Text></Pressable>
          <Pressable onPress={() => changeState("Medium")} style={[styles.button,{ borderColor: getBackgroundColor('Medium')}]}>
            <Text style={styles.buttonsText}>{t(`Med ${'\n'}${alerts.Medium.length}`)}</Text></Pressable>
          <Pressable onPress={() => changeState("Easy")}style={[styles.button,{ borderColor: getBackgroundColor('Easy')}]} >
            <Text style={styles.buttonsText}>{t(`Easy ${'\n'}${alerts.Easy.length}`)}</Text></Pressable>
          <Pressable onPress={() => changeState("All")} style={[styles.button,{ borderColor: "black"}]}>
            <Text style={styles.buttonsText}>{t(`All ${'\n'}${currentAlerts.length}`)}</Text></Pressable>
        </View>
      )}
      <View style={styles.containerCalls}>
        {currentAlerts.length > 0 ?
        //[setIsLoading(false),
              ( isSmallDevice && occupied.flag?
                  currentAlerts.map((alert) =>{
                  return(
                   <AntDesign
                  name={getNameIcon(alert.level)}
                  size={50}
                  color={getBackgroundColor(alert.level)}
                style={{padding:"2%"}}  
                />
                )
              }
                )
          :( currentAlerts.length>4?
          <ScrollView vertical={true} style={styles.scrollview}>
            {currentAlerts.map((alert) => renderAlert(alert))}
          </ScrollView>:currentAlerts.map((alert) => renderAlert(alert)))
        ): null}
      </View>
      <Loader loading={isLoading} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: 'center'
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
    backgroundColor:'white'
  },
  inTreatment: {
    opacity: 0.4,
  },
  alertText: {
    color: "black",
    textAlign: "center",
  },
  buttons: {
    marginRight:'40%',
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  //  paddingHorizontal: 10,
  },
  button:{ 
    width:"50%",
    height:50,
    padding: 8,
    marginTop:20,
    marginBottom: 30,
    borderWidth: 2,
    shadowColor: '#000',
    padding:'2%',
    marginLeft: '10%',


    shadowOffset: {
      width: 0,
      height: 2,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }},
  buttonsText:{
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color:"black", // Text color changes on hover or if not web
},
  noAlertsText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },
  scrollview: {
    flex: 1,
    maxHeight: "70%",
    // alignItems: "center"

  },
});
