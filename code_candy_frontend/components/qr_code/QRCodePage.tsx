import React from "react";
import QRCode from "react-qr-code";

interface QRCodePageProps {
  value: string;
  size: number;
  level: "L" | "M" | "Q" | "H"; // Restrict level to the allowed string values
}

const QRCodePage: React.FC<QRCodePageProps> = ({ value, size, level }) => {
  return (
    <div>
      <QRCode
        value={value}
        size={size}
        level={level}
      />
    </div>
  );
};

export default QRCodePage;
