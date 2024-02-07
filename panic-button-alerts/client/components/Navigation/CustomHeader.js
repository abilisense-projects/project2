import { Image } from "react-native";

const CustomHeader = () => (
    <Image
      source={require('./../../assets/images/abilisense1.png')} // Update the path to your image
      style={{ width: '100%', height: 150 }} // Adjust the size as needed
      resizeMode="contain" // Adjust resizeMode as needed
    />
  );
  export default CustomHeader;
