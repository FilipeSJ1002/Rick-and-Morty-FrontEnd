import { Button } from '@chakra-ui/react';

interface ButtonConfigProps {
  width?: string;
  height?: string;
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const ButtonConfig: React.FC<ButtonConfigProps> = ({ width, height, type, text, onClick, isLoading = false, isDisabled = false }) => {
  return (
    <Button
      width={width || "200px"}
      height={height || "50px"}

      bg="rgba(0, 255, 0, 0.8)"
      color="#000"
      borderRadius="12px"
      fontSize="lg"
      p="16px 20px"
      border="2px solid #00FF00"
      boxShadow="0 4px 10px rgba(0, 255, 0, 0.5)" 
      transition="all 0.3s ease-in-out"
      _hover={{
        color: "#fff",
        bg: "#00FF00", 
        textDecoration: "none", 
        boxShadow: "0 6px 12px rgba(0, 255, 0, 0.7)",
        transform: "scale(1.1)"
      }}
      _active={{
        bg: "#33cc33",
        boxShadow: "0 4px 8px rgba(0, 255, 0, 0.8)",
      }}

      isLoading={isLoading}
      isDisabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {text}
    </Button>
  );
};

export default ButtonConfig;
